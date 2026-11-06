import React, { createContext, useContext, useEffect, useState } from "react";
import { hashPassword, verifyPassword } from "./crypto-auth";
import {
  type User,
  type StoredAccount,
  type DetailedRegistrationData,
  syncAuthToGoogleSheets,
} from "./auth-service";

export type { User, DetailedRegistrationData };

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (
    data: DetailedRegistrationData | string,
    email?: string,
    password?: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AUTH_STORAGE_KEY = "smx_auth_user";
const ACCOUNTS_STORAGE_KEY = "smx_registered_accounts";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load active session and seed default admin account with hashed password
  useEffect(() => {
    (async () => {
      try {
        const saved = localStorage.getItem(AUTH_STORAGE_KEY);
        if (saved) {
          setUser(JSON.parse(saved));
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
              organization: "SportsMax Directorate",
              primarySport: "Multi-Sport Athletics",
              institutionType: "Federation / National Body",
              createdAt: new Date().toISOString(),
            },
            {
              id: "usr_demo",
              name: "Alex Jordan",
              email: "athlete@sportsmax.ai",
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
        console.error("Failed to restore auth session:", e);
      }
    })();
  }, []);

  const login = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: "Please enter your email address." };
    }

    try {
      let accounts: StoredAccount[] = [];
      const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (stored) {
        accounts = JSON.parse(stored);
      }

      let match = accounts.find((a) => a.email.toLowerCase() === cleanEmail);

      // Verify hashed password
      if (match && password && match.passwordHash && match.salt) {
        const isValid = await verifyPassword(password, match.passwordHash, match.salt);
        if (!isValid) {
          // Log failed attempt to Google Sheets
          syncAuthToGoogleSheets("user_login", {
            email: cleanEmail,
            name: match.name,
            role: match.role || "Unknown",
            status: "FAILED_INVALID_PASSWORD",
            ipInfo: "Client Browser",
          });
          return { success: false, error: "Incorrect password. Please try again." };
        }
      }

      // If user doesn't exist, create an account with hashed password
      if (!match) {
        const fallbackName = cleanEmail.split("@")[0]?.replace(/[._-]/g, " ") ?? "Member";
        const formattedName = fallbackName
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");

        const { hash, salt } = await hashPassword(password || "password123");
        match = {
          id: "usr_" + Math.random().toString(36).substring(2, 9),
          name: formattedName || "SportsMax Member",
          email: cleanEmail,
          passwordHash: hash,
          salt,
          role: "Performance Athlete",
          organization: "Independent Athletics",
          createdAt: new Date().toISOString(),
        };
        accounts.push(match);
        localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));

        // Sync new auto-registered user to Google Sheets Users tab
        syncAuthToGoogleSheets("user_registered", {
          id: match.id,
          name: match.name,
          email: match.email,
          role: match.role,
          organization: match.organization,
          passwordHash: hash,
          salt,
          status: "SUCCESS_AUTO_ONBOARD",
        });
      }

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

      setUser(sessionUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));

      // Sync successful login to Google Sheets Login_Logs tab
      syncAuthToGoogleSheets("user_login", {
        userId: sessionUser.id,
        name: sessionUser.name,
        email: sessionUser.email,
        role: sessionUser.role || "Performance Athlete",
        organization: sessionUser.organization || "Independent",
        status: "SUCCESS",
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

      setUser(sessionUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));

      // Sync registration record to Google Sheets "Registered_Users" tab with hashed password
      await syncAuthToGoogleSheets("user_registered", {
        userId: accountId,
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
    if (user) {
      syncAuthToGoogleSheets("user_login", {
        userId: user.id,
        name: user.name,
        email: user.email,
        status: "LOGOUT",
      });
    }
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
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
