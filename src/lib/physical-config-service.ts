export interface AthletePhysicalConfig {
  athleteId: string;
  athleteName: string;
  email: string;
  sport: string;
  positionOrEvent: string;
  updatedAt: string;

  // 1. Anthropometric Measurements
  anthropometrics: {
    ageYears: number;
    gender: "male" | "female" | "other";
    heightCm: number;
    weightKg: number;
    wingspanCm?: number;
    limbDominance: "right" | "left" | "ambidextrous";
    bodyFatPercent?: number;
    restingHeartRateBpm: number;
    maxHeartRateBpm: number;
  };

  // 2. Baseline Physical Capacities & Benchmarks
  baselines: {
    verticalJumpCm: number;
    sprint10mSec: number;
    sprint40mSec: number;
    oneRepMaxSquatKg?: number;
    vo2MaxMlKgMin?: number;
    beepTestShuttles?: number;
    sitAndReachCm?: number;
  };

  // 3. Movement Safety & Injury Guarding
  safety: {
    previousInjuries: string; // e.g. "Left ACL reconstruction (2024), Right Hamstring strain"
    asymmetryWatchLimb: "none" | "left" | "right";
    maxDailyWorkloadThresholdAu: number; // e.g. 800 Arbitrary Units
    preferredFootwear: string; // e.g. "Firm ground studs / Molded"
    medicalClearanceStatus: "CLEARED_FULL" | "MODIFIED_LOAD" | "RESTRICTED";
  };
}

export const DEFAULT_PHYSICAL_CONFIG: Omit<AthletePhysicalConfig, "athleteId" | "email"> = {
  athleteName: "Alexander Vance",
  sport: "Athletics / Sprint & Hurdles",
  positionOrEvent: "100m / 200m Sprinter",
  updatedAt: new Date().toISOString(),
  anthropometrics: {
    ageYears: 22,
    gender: "male",
    heightCm: 184,
    weightKg: 78.5,
    wingspanCm: 191,
    limbDominance: "right",
    bodyFatPercent: 9.2,
    restingHeartRateBpm: 48,
    maxHeartRateBpm: 198,
  },
  baselines: {
    verticalJumpCm: 68.5,
    sprint10mSec: 1.68,
    sprint40mSec: 4.72,
    oneRepMaxSquatKg: 165,
    vo2MaxMlKgMin: 58.4,
    beepTestShuttles: 13.2,
    sitAndReachCm: 32.0,
  },
  safety: {
    previousInjuries: "Mild right hamstring tightness (Grade 1, Oct 2025)",
    asymmetryWatchLimb: "right",
    maxDailyWorkloadThresholdAu: 750,
    preferredFootwear: "Nike Air Zoom Maxfly Sprint Spikes",
    medicalClearanceStatus: "CLEARED_FULL",
  },
};

const PHYSICAL_STORAGE_KEY_PREFIX = "smx_pwa_physical_config_";

export function loadLocalPhysicalConfig(athleteId: string, defaultName?: string, defaultEmail?: string): AthletePhysicalConfig {
  const fallback: AthletePhysicalConfig = {
    ...DEFAULT_PHYSICAL_CONFIG,
    athleteId,
    athleteName: defaultName || DEFAULT_PHYSICAL_CONFIG.athleteName,
    email: defaultEmail || "athlete@sportsvectors.org",
  };

  if (typeof window === "undefined") return fallback;

  try {
    const raw = localStorage.getItem(`${PHYSICAL_STORAGE_KEY_PREFIX}${athleteId}`);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      ...fallback,
      ...parsed,
      anthropometrics: { ...fallback.anthropometrics, ...(parsed.anthropometrics || {}) },
      baselines: { ...fallback.baselines, ...(parsed.baselines || {}) },
      safety: { ...fallback.safety, ...(parsed.safety || {}) },
    };
  } catch (e) {
    console.error("Failed to load physical config from localStorage:", e);
    return fallback;
  }
}

export function saveLocalPhysicalConfig(config: AthletePhysicalConfig): void {
  if (typeof window === "undefined") return;
  try {
    config.updatedAt = new Date().toISOString();
    localStorage.setItem(`${PHYSICAL_STORAGE_KEY_PREFIX}${config.athleteId}`, JSON.stringify(config));
  } catch (e) {
    console.error("Failed to persist physical config to localStorage:", e);
  }
}

export async function syncPhysicalConfigToGoogleSheets(config: AthletePhysicalConfig): Promise<{ success: boolean; error?: string }> {
  const apiUrl =
    import.meta.env.VITE_ANALYTICS_URL ||
    "https://script.google.com/macros/s/AKfycbzb5YnF9zLzWp_N9P5zVw6eL3t8P0v2xY7q9mK/exec";

  // Calculate BMI
  const heightM = config.anthropometrics.heightCm / 100;
  const bmi = (config.anthropometrics.weightKg / (heightM * heightM)).toFixed(1);

  const payload = {
    action: "save_physical_config",
    physical: {
      athleteId: config.athleteId,
      athleteName: config.athleteName,
      email: config.email,
      sport: config.sport,
      positionOrEvent: config.positionOrEvent,
      ageYears: config.anthropometrics.ageYears,
      gender: config.anthropometrics.gender.toUpperCase(),
      heightCm: `${config.anthropometrics.heightCm} cm`,
      weightKg: `${config.anthropometrics.weightKg} kg`,
      bmi: `${bmi} kg/m²`,
      wingspanCm: `${config.anthropometrics.wingspanCm || "-"} cm`,
      limbDominance: config.anthropometrics.limbDominance.toUpperCase(),
      bodyFatPercent: `${config.anthropometrics.bodyFatPercent || "-"}%`,
      restingHeartRate: `${config.anthropometrics.restingHeartRateBpm} bpm`,
      maxHeartRate: `${config.anthropometrics.maxHeartRateBpm} bpm`,
      verticalJump: `${config.baselines.verticalJumpCm} cm`,
      sprint10m: `${config.baselines.sprint10mSec} s`,
      sprint40m: `${config.baselines.sprint40mSec} s`,
      oneRepMaxSquat: `${config.baselines.oneRepMaxSquatKg || "-"} kg`,
      vo2Max: `${config.baselines.vo2MaxMlKgMin || "-"} ml/kg/min`,
      asymmetryWatchLimb: config.safety.asymmetryWatchLimb.toUpperCase(),
      maxDailyWorkloadThreshold: `${config.safety.maxDailyWorkloadThresholdAu} AU`,
      medicalClearanceStatus: config.safety.medicalClearanceStatus,
      previousInjuries: config.safety.previousInjuries || "None reported",
      source: "SportsVectors Mobile PWA",
      updatedAt: config.updatedAt,
    },
  };

  try {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    return { success: true };
  } catch (err: any) {
    console.warn("Offline or network issue syncing physical config to Google Sheets:", err);
    return { success: true, error: err.message };
  }
}

