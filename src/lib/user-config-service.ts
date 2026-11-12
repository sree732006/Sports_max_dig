export interface SportsUserConfig {
  userId: string;
  userEmail: string;
  updatedAt: string;

  // Tab 1: Profile & Identity
  profile: {
    fullName: string;
    email: string;
    phone: string;
    role: string;
    title: string;
    country: string;
    timezone: string;
    bio: string;
  };

  // Tab 2: Athletic Program & Squad Setup
  program: {
    organizationName: string;
    institutionType: string;
    primarySport: string;
    secondarySport: string;
    squadSize: string;
    competitionTier: string;
    seasonPhase: string;
    pitchTrackingSystem: string;
    cameraSetup: string;
  };

  // Tab 3: Biometric & Kinematic Thresholds
  thresholds: {
    acwrMin: number; // e.g. 0.8
    acwrMax: number; // e.g. 1.3
    acuteDays: number; // e.g. 7
    chronicDays: number; // e.g. 28
    valgusRiskNmKg: number; // e.g. 2.5 Nm/kg
    maxGctAsymmetryPercent: number; // e.g. 8%
    maxSpeedZoneKmh: number; // e.g. 25 km/h
    highMetabolicDistanceThreshold: number; // e.g. 450 m
    preferredUnits: "metric" | "imperial";
    heartRateMaxFormula: "standard" | "tanaka" | "custom";
    hrMaxCustomBpm?: number;
  };

  // Tab 4: Wearable Telemetry & Alert Automation
  telemetry: {
    wearables: {
      catapult: boolean;
      statsports: boolean;
      whoop: boolean;
      oura: boolean;
      polar: boolean;
      garmin: boolean;
    };
    alertEmail: boolean;
    alertSms: boolean;
    halftimeAutoReport: boolean;
    postMatchPushSummary: boolean;
    injuryRiskAlertLevel: "low" | "medium" | "high" | "critical";
    webhookUrl?: string;
  };
}

export const DEFAULT_USER_CONFIG: Omit<SportsUserConfig, "userId" | "userEmail"> = {
  updatedAt: new Date().toISOString(),
  profile: {
    fullName: "",
    email: "",
    phone: "",
    role: "Head Coach",
    title: "Performance Director",
    country: "India",
    timezone: "Asia/Kolkata (UTC+05:30)",
    bio: "Olympic and elite team performance telemetry director.",
  },
  program: {
    organizationName: "SportsVectors Elite Academy",
    institutionType: "Professional Club / Franchise",
    primarySport: "Football / Soccer",
    secondarySport: "Athletics / Track & Field",
    squadSize: "26-50",
    competitionTier: "Division 1 / Premier League",
    seasonPhase: "In-Season Competition",
    pitchTrackingSystem: "Optical Tracking (4K Multi-angle)",
    cameraSetup: "Dual Catwalk 60fps Wide Dynamic",
  },
  thresholds: {
    acwrMin: 0.8,
    acwrMax: 1.3,
    acuteDays: 7,
    chronicDays: 28,
    valgusRiskNmKg: 2.5,
    maxGctAsymmetryPercent: 8,
    maxSpeedZoneKmh: 25.2,
    highMetabolicDistanceThreshold: 450,
    preferredUnits: "metric",
    heartRateMaxFormula: "tanaka",
    hrMaxCustomBpm: 195,
  },
  telemetry: {
    wearables: {
      catapult: true,
      statsports: true,
      whoop: true,
      oura: false,
      polar: true,
      garmin: false,
    },
    alertEmail: true,
    alertSms: false,
    halftimeAutoReport: true,
    postMatchPushSummary: true,
    injuryRiskAlertLevel: "medium",
    webhookUrl: "",
  },
};

const USER_CONFIG_STORAGE_PREFIX = "smx_user_config_";

export function loadLocalUserConfig(userId: string, defaultEmail?: string, defaultName?: string): SportsUserConfig {
  const fallback: SportsUserConfig = {
    ...DEFAULT_USER_CONFIG,
    userId,
    userEmail: defaultEmail || "",
    profile: {
      ...DEFAULT_USER_CONFIG.profile,
      fullName: defaultName || "",
      email: defaultEmail || "",
    },
  };

  if (typeof window === "undefined") return fallback;

  try {
    const raw = localStorage.getItem(`${USER_CONFIG_STORAGE_PREFIX}${userId}`);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      ...fallback,
      ...parsed,
      profile: { ...fallback.profile, ...(parsed.profile || {}) },
      program: { ...fallback.program, ...(parsed.program || {}) },
      thresholds: { ...fallback.thresholds, ...(parsed.thresholds || {}) },
      telemetry: {
        ...fallback.telemetry,
        ...(parsed.telemetry || {}),
        wearables: {
          ...fallback.telemetry.wearables,
          ...(parsed.telemetry?.wearables || {}),
        },
      },
    };
  } catch (e) {
    console.error("Failed to load user config from localStorage:", e);
    return fallback;
  }
}

export function saveLocalUserConfig(config: SportsUserConfig): void {
  if (typeof window === "undefined") return;
  try {
    config.updatedAt = new Date().toISOString();
    localStorage.setItem(`${USER_CONFIG_STORAGE_PREFIX}${config.userId}`, JSON.stringify(config));
  } catch (e) {
    console.error("Failed to persist user config to localStorage:", e);
  }
}

export async function syncUserConfigToGoogleSheets(config: SportsUserConfig): Promise<{ success: boolean; error?: string }> {
  const apiUrl =
    import.meta.env.VITE_ANALYTICS_URL ||
    "https://script.google.com/macros/s/AKfycbzb5YnF9zLzWp_N9P5zVw6eL3t8P0v2xY7q9mK/exec";

  const payload = {
    action: "save_user_config",
    config: {
      userId: config.userId,
      userEmail: config.userEmail,
      fullName: config.profile.fullName,
      phone: config.profile.phone,
      role: config.profile.role,
      title: config.profile.title,
      country: config.profile.country,
      timezone: config.profile.timezone,
      organizationName: config.program.organizationName,
      institutionType: config.program.institutionType,
      primarySport: config.program.primarySport,
      secondarySport: config.program.secondarySport,
      squadSize: config.program.squadSize,
      competitionTier: config.program.competitionTier,
      seasonPhase: config.program.seasonPhase,
      pitchTrackingSystem: config.program.pitchTrackingSystem,
      cameraSetup: config.program.cameraSetup,
      acwrCorridor: `${config.thresholds.acwrMin} - ${config.thresholds.acwrMax}`,
      valgusRiskThreshold: `${config.thresholds.valgusRiskNmKg} Nm/kg`,
      gctAsymmetryTolerance: `${config.thresholds.maxGctAsymmetryPercent}%`,
      maxSpeedZone: `${config.thresholds.maxSpeedZoneKmh} ${config.thresholds.preferredUnits === "metric" ? "km/h" : "mph"}`,
      highMetabolicDistanceThreshold: `${config.thresholds.highMetabolicDistanceThreshold} m`,
      preferredUnits: config.thresholds.preferredUnits,
      connectedWearables: Object.entries(config.telemetry.wearables)
        .filter(([, v]) => v)
        .map(([k]) => k.toUpperCase())
        .join(", "),
      alertEmail: config.telemetry.alertEmail ? "Yes" : "No",
      alertSms: config.telemetry.alertSms ? "Yes" : "No",
      halftimeAutoReport: config.telemetry.halftimeAutoReport ? "Enabled" : "Disabled",
      injuryRiskAlertLevel: config.telemetry.injuryRiskAlertLevel.toUpperCase(),
      webhookUrl: config.telemetry.webhookUrl || "None",
      updatedAt: config.updatedAt,
    },
  };

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.warn("Google Sheets config sync returned non-200 status:", res.status);
    }
    return { success: true };
  } catch (err: any) {
    console.error("Network error syncing config to Google Sheets:", err);
    // Return success: true so offline local save still succeeds, with warning
    return { success: true, error: err.message };
  }
}

