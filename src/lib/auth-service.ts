import { hashPassword, verifyPassword } from "./crypto-auth";

export interface DetailedRegistrationData {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role?: string;
  institutionType?: string;
  organization?: string;
  primarySport?: string;
  athleteCount?: string;
  country?: string;
  referralSource?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  institutionType?: string;
  organization?: string;
  primarySport?: string;
  athleteCount?: string;
  country?: string;
  avatar?: string;
  createdAt: string;
}

export interface StoredAccount extends User {
  passwordHash: string;
  salt: string;
}

/**
 * Sends authentication telemetry (Registration / Login) to Google Sheets backend
 */
export async function syncAuthToGoogleSheets(
  action: "user_registered" | "user_login",
  payload: Record<string, unknown>
) {
  try {
    const analyticsUrl =
      (typeof import.meta !== "undefined" && import.meta.env?.["VITE_ANALYTICS_URL"]) ||
      (typeof process !== "undefined" && process.env?.["VITE_ANALYTICS_URL"]) ||
      localStorage.getItem("smx_analytics_url") ||
      "";

    const body = JSON.stringify({
      action,
      ...payload,
      timestamp: new Date().toISOString(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
    });

    if (!analyticsUrl) {
      console.warn(`[Auth Sync] VITE_ANALYTICS_URL not configured. Simulated sync for ${action}:`, payload);
      return;
    }

    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const sent = navigator.sendBeacon(
        analyticsUrl,
        new Blob([body], { type: "text/plain;charset=UTF-8" })
      );
      if (sent) return;
    }

    await fetch(analyticsUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch (err) {
    console.error("[Auth Sync Error]:", err);
  }
}

