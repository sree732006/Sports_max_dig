import React, { createContext, useContext, useEffect, useState } from "react";
import { hashPassword, verifyPassword } from "./crypto-auth";
import {
  type User,
  type StoredAccount,
  type DetailedRegistrationData,
  syncAuthToGoogleSheets,
  fetchUserFromGoogleSheet,
} from "./auth-service";
import {
  createSessionToken,
  verifySessionToken,
  getStoredSessionToken,
  setStoredSessionToken,
  clearStoredSessionToken,
  getActiveSessionInfo,
  type ActiveSessionInfo,
} from "./token-session";

export type { User, DetailedRegistrationData, ActiveSessionInfo };

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  sessionToken: string | null;
  sessionInfo: ActiveSessionInfo | null;
  login: (email: string, password?: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (
    data: DetailedRegistrationData | string,
    email?: string,
    password?: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshSession: () => Promise<void>;
}

const AUTH_STORAGE_KEY = "smx_auth_user";
const ACCOUNTS_STORAGE_KEY = "smx_registered_accounts";
const FAILED_ATTEMPTS_KEY = "smx_login_failed_attempts";
const LOCKOUT_EXPIRY_KEY = "smx_login_lockout_until";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60 * 1000; // 60 seconds cooldown

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [sessionInfo, setSessionInfo] = useState<ActiveSessionInfo | null>(null);

  // Validate Token-Based Session on Mount & Seed Accounts
  useEffect(() => {
    (async () => {
      try {
        const token = getStoredSessionToken();
        if (token) {
          const verification = await verifySessionToken(token);
          if (verification.valid && verification.payload) {
            setSessionToken(token);
            const info = await getActiveSessionInfo();
            setSessionInfo(info);

            // Reconstruct user state from verified token payload
            const tokenUser: User = {
              id: verification.payload.userId,
              name: verification.payload.name,
              email: verification.payload.email,
              role: verification.payload.role,
              organization: verification.payload.organization,
              createdAt: new Date(verification.payload.issuedAt * 1000).toISOString(),
            };
            setUser(tokenUser);
          } else {
            // Token expired or invalid
            console.warn("[Auth Token] Token verification failed:", verification.error);
            clearStoredSessionToken();
            localStorage.removeItem(AUTH_STORAGE_KEY);
            setUser(null);
            setSessionToken(null);
            setSessionInfo(null);
          }
        } else {
          // Fallback legacy storage check
          const saved = localStorage.getItem(AUTH_STORAGE_KEY);
          if (saved) {
            const parsed = JSON.parse(saved);
            setUser(parsed);
            // Upgrade legacy session to Token
            const newToken = await createSessionToken(parsed, false);
            setStoredSessionToken(newToken, false);
            setSessionToken(newToken);
            const info = await getActiveSessionInfo();
            setSessionInfo(info);
          }
        }

        const existingAccounts = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
        if (!existingAccounts) {
          const { hash, salt } = await hashPassword("password123");
          const seedAccounts: StoredAccount[] = [
            {
              id: "usr_admin",
              name: "Admin User",
              email: "mythrivaishnavik.int2027g3@gmail.com",
              passwordHash: hash,
              salt,
              role: "Sports Administrator",
              organization: "SportsVectors Directorate",
              primarySport: "Multi-Sport Athletics",
              institutionType: "Federation / National Body",
              createdAt: new Date().toISOString(),
            },
            {
              id: "usr_demo",
              name: "Alex Jordan",
              email: "athlete@sportsvectors.ai",
              passwordHash: hash,
              salt,
              role: "Performance Analyst",
              organization: "Olympic High Performance Lab",
              primarySport: "Track & Field",
              institutionType: "Elite Academy",
              createdAt: new Date().toISOString(),
            },
          ];
          localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(seedAccounts));
        }
      } catch (e) {
        console.error("Failed to restore token auth session:", e);
      }
    })();
  }, []);

  const login = async (
    email: string,
    password?: string,
    rememberMe = false
  ): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: "Please enter your email address." };
    }
    if (!password) {
      return { success: false, error: "Please enter your password." };
    }

    // 1. Check Brute-Force Rate Limiting Lockout
    try {
      const lockoutUntil = parseInt(localStorage.getItem(LOCKOUT_EXPIRY_KEY) || "0", 10);
      const now = Date.now();
      if (lockoutUntil && now < lockoutUntil) {
        const remainingSec = Math.ceil((lockoutUntil - now) / 1000);
        return {
          success: false,
          error: `Too many failed attempts. Account temporarily locked for security. Please wait ${remainingSec}s.`,
        };
      }
    } catch {}

    try {
      let accounts: StoredAccount[] = [];
      const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (stored) {
        accounts = JSON.parse(stored);
      }

      let match = accounts.find((a) => a.email.toLowerCase() === cleanEmail);

      // 2. Cross-Device Verification: If user not in local browser cache, check Google Sheets Registered_Users
      if (!match) {
        const remoteUser = await fetchUserFromGoogleSheet(cleanEmail);
        if (remoteUser) {
          match = remoteUser;
          accounts.push(remoteUser);
          localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
        }
      }

      // 3. Strict Mode: If user is not registered, do NOT auto-onboard
      if (!match) {
        syncAuthToGoogleSheets("user_login", {
          email: cleanEmail,
          status: "FAILED_USER_NOT_FOUND",
          ipInfo: "Client Browser",
        });
        return {
          success: false,
          error: "No account found with this email. Please register your account first.",
        };
      }

      // 4. Verify password hash & salt
      const isValid = await verifyPassword(password, match.passwordHash, match.salt);
      if (!isValid) {
        // Track failed attempt count for lockout
        let failedCount = parseInt(localStorage.getItem(FAILED_ATTEMPTS_KEY) || "0", 10) + 1;
        localStorage.setItem(FAILED_ATTEMPTS_KEY, String(failedCount));

        if (failedCount >= MAX_FAILED_ATTEMPTS) {
          const lockoutTime = Date.now() + LOCKOUT_DURATION_MS;
          localStorage.setItem(LOCKOUT_EXPIRY_KEY, String(lockoutTime));
          localStorage.removeItem(FAILED_ATTEMPTS_KEY);

          syncAuthToGoogleSheets("user_login", {
            email: cleanEmail,
            name: match.name,
            role: match.role || "Unknown",
            status: "LOCKED_OUT_EXCESSIVE_FAILURES",
            ipInfo: "Client Browser",
          });

          return {
            success: false,
            error: "Too many failed attempts (5/5). Account locked for 60 seconds for security.",
          };
        }

        // Log failed password attempt to Google Sheets
        syncAuthToGoogleSheets("user_login", {
          email: cleanEmail,
          name: match.name,
          role: match.role || "Unknown",
          status: "FAILED_INVALID_PASSWORD",
          attempts: `${failedCount}/${MAX_FAILED_ATTEMPTS}`,
          ipInfo: "Client Browser",
        });

        const attemptsLeft = MAX_FAILED_ATTEMPTS - failedCount;
        return {
          success: false,
          error: `Incorrect password. ${attemptsLeft} attempt${attemptsLeft === 1 ? "" : "s"} remaining before lockout.`,
        };
      }

      // Successful Login: Reset failed attempts counter
      localStorage.removeItem(FAILED_ATTEMPTS_KEY);
      localStorage.removeItem(LOCKOUT_EXPIRY_KEY);

      const sessionUser: User = {
        id: match.id,
        name: match.name,
        email: match.email,
        ...(match.role ? { role: match.role } : {}),
        ...(match.organization ? { organization: match.organization } : {}),
        ...(match.primarySport ? { primarySport: match.primarySport } : {}),
        ...(match.phone ? { phone: match.phone } : {}),
        createdAt: match.createdAt,
      };

      // 5. Generate and store cryptographic Session Token
      const token = await createSessionToken(sessionUser, rememberMe);
      setStoredSessionToken(token, rememberMe);
      setSessionToken(token);

      const activeInfo = await getActiveSessionInfo();
      setSessionInfo(activeInfo);

      setUser(sessionUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));

      // Sync successful login to Google Sheets Login_Logs tab
      syncAuthToGoogleSheets("user_login", {
        userId: sessionUser.id,
        sessionId: activeInfo?.sessionId || "sess_direct",
        name: sessionUser.name,
        email: sessionUser.email,
        role: sessionUser.role || "Performance Athlete",
        organization: sessionUser.organization || "Independent",
        tokenExpiresAt: activeInfo?.expiresAt || "",
        status: "SUCCESS_TOKEN_ISSUED",
      });

      return { success: true };
    } catch {
      return { success: false, error: "An unexpected error occurred during login." };
    }
  };

  const signup = async (
    dataOrName: DetailedRegistrationData | string,
    rawEmail?: string,
    rawPassword?: string
  ): Promise<{ success: boolean; error?: string }> => {
    let regData: DetailedRegistrationData;

    if (typeof dataOrName === "object") {
      regData = dataOrName;
    } else {
      regData = {
        name: dataOrName,
        email: rawEmail || "",
        password: rawPassword,
      };
    }

    const cleanEmail = (regData.email || "").trim().toLowerCase();
    const cleanName = (regData.name || "").trim();

    if (!cleanName) {
      return { success: false, error: "Please enter your full name." };
    }
    if (!cleanEmail) {
      return { success: false, error: "Please enter your email address." };
    }

    try {
      let accounts: StoredAccount[] = [];
      const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (stored) {
        accounts = JSON.parse(stored);
      }

      // Securely hash password with unique salt
      const { hash, salt } = await hashPassword(regData.password || "password123");

      const existingAccount = accounts.find((a) => a.email.toLowerCase() === cleanEmail);
      let accountId = "usr_" + Math.random().toString(36).substring(2, 9);

      if (existingAccount) {
        accountId = existingAccount.id;
        existingAccount.name = cleanName;
        existingAccount.passwordHash = hash;
        existingAccount.salt = salt;
        if (regData.phone) existingAccount.phone = regData.phone;
        if (regData.role) existingAccount.role = regData.role;
        if (regData.organization) existingAccount.organization = regData.organization;
        if (regData.institutionType) existingAccount.institutionType = regData.institutionType;
        if (regData.primarySport) existingAccount.primarySport = regData.primarySport;
        if (regData.athleteCount) existingAccount.athleteCount = regData.athleteCount;
        if (regData.country) existingAccount.country = regData.country;
      } else {
        accounts.push({
          id: accountId,
          name: cleanName,
          email: cleanEmail,
          passwordHash: hash,
          salt,
          phone: regData.phone || "",
          role: regData.role || "Performance Athlete",
          organization: regData.organization || "Independent",
          institutionType: regData.institutionType || "Collegiate / University",
          primarySport: regData.primarySport || "Athletics & Track",
          athleteCount: regData.athleteCount || "10-50",
          country: regData.country || "United States",
          createdAt: new Date().toISOString(),
        });
      }

      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));

      const sessionUser: User = {
        id: accountId,
        name: cleanName,
        email: cleanEmail,
        phone: regData.phone,
        role: regData.role || "Performance Athlete",
        organization: regData.organization || "Independent",
        primarySport: regData.primarySport,
        institutionType: regData.institutionType,
        createdAt: new Date().toISOString(),
      };

      // 5. Generate and store cryptographic Session Token on registration
      const token = await createSessionToken(sessionUser, true);
      setStoredSessionToken(token, true);
      setSessionToken(token);

      const activeInfo = await getActiveSessionInfo();
      setSessionInfo(activeInfo);

      setUser(sessionUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));

      // Sync registration record to Google Sheets "Registered_Users" tab with hashed password
      await syncAuthToGoogleSheets("user_registered", {
        userId: accountId,
        sessionId: activeInfo?.sessionId || "sess_reg",
        name: cleanName,
        email: cleanEmail,
        passwordHash: hash, // Stored as SHA-256 hash (never plain text)
        salt,
        phone: regData.phone || "",
        role: regData.role || "Performance Athlete",
        institutionType: regData.institutionType || "Collegiate / University",
        organization: regData.organization || "Independent",
        primarySport: regData.primarySport || "Athletics & Track",
        athleteCount: regData.athleteCount || "10-50",
        country: regData.country || "Global",
        referralSource: regData.referralSource || "Direct Platform",
        status: "ACTIVE_REGISTERED",
      });

      // Also log immediate first login session to "Login_Logs" tab
      await syncAuthToGoogleSheets("user_login", {
        userId: accountId,
        sessionId: activeInfo?.sessionId || "sess_reg",
        name: cleanName,
        email: cleanEmail,
        role: sessionUser.role,
        organization: sessionUser.organization,
        status: "FIRST_REGISTRATION_LOGIN",
      });

      return { success: true };
    } catch {
      return { success: false, error: "Failed to create account. Please try again." };
    }
  };

  const logout = () => {
    if (sessionInfo?.sessionId) {
      // Revoke from Redis DB asynchronously
      fetch("/api/sessions/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionInfo.sessionId }),
      }).catch(() => {});
    }

    if (user) {
      syncAuthToGoogleSheets("user_login", {
        userId: user.id,
        sessionId: sessionInfo?.sessionId || "sess_logout",
        name: user.name,
        email: user.email,
        status: "LOGOUT",
      });
    }
    clearStoredSessionToken();
    setUser(null);
    setSessionToken(null);
    setSessionInfo(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const refreshSession = async () => {
    if (!user) return;
    try {
      const refreshedToken = await createSessionToken(user, false);
      setStoredSessionToken(refreshedToken, false);
      setSessionToken(refreshedToken);
      const info = await getActiveSessionInfo();
      setSessionInfo(info);
    } catch (e) {
      console.error("[Session Refresh Failed]:", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        sessionToken,
        sessionInfo,
        login,
        signup,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
