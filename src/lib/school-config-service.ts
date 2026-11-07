export interface SchoolUserConfig {
  userId: string;
  userEmail: string;
  updatedAt: string;

  // Tab 1: School Profile & Academic Board Affiliation
  institution: {
    schoolName: string;
    boardAffiliation: string; // CBSE, ICSE, IB, Cambridge, State Board
    schoolCode: string;
    principalName: string;
    peDirectorName: string;
    officialEmail: string;
    phone: string;
    city: string;
    stateRegion: string;
  };

  // Tab 2: Student Cohorts & Sports Curriculum
  curriculum: {
    gradeBands: string; // e.g. "Grades 6 to 12"
    totalStudentAthletes: string; // e.g. "250-500 students"
    primarySports: string[]; // Football, Athletics, Cricket, Badminton, etc.
    sessionFrequency: string; // e.g. "3 sessions / week"
    interSchoolParticipation: boolean;
    annualSportsMeetMonth: string;
    facilitiesAvailable: string; // Outdoor track, grass pitch, indoor court, pool
  };

  // Tab 3: Youth Fitness Benchmarks & Khelo India Standards
  benchmarks: {
    fitnessStandard: "khelo_india" | "presidential_youth" | "eurofit" | "custom";
    beepTestPassPacer: number; // e.g. Level 6.5
    sprint50mSeconds: number; // e.g. 8.2s
    sitAndReachCm: number; // e.g. 24 cm
    bmiScreeningAlerts: boolean;
    postureGaitScreening: boolean; // Scoliosis, flat feet, genu valgum
    hydrationHeatIndexLimitC: number; // e.g. 38 C
  };

  // Tab 4: Parent Notifications & PE Report Cards
  reporting: {
    autoGenerateReportCardPdf: boolean;
    parentWhatsAppSync: boolean;
    parentEmailDispatch: boolean;
    reportFrequency: "monthly" | "termly" | "annual";
    includeGrowthTracking: boolean;
    emergencyContactAlerts: boolean;
    notesToParents: string;
  };
}

export const DEFAULT_SCHOOL_CONFIG: Omit<SchoolUserConfig, "userId" | "userEmail"> = {
  updatedAt: new Date().toISOString(),
  institution: {
    schoolName: "St. Xavier's International Sports Academy",
    boardAffiliation: "CBSE & Cambridge International",
    schoolCode: "SCH-DEL-2026",
    principalName: "Dr. Meenakshi Sundaram",
    peDirectorName: "Coach Rajesh Pillai",
    officialEmail: "sports.director@stxaviers.edu",
    phone: "+91 98401 23456",
    city: "Chennai / New Delhi",
    stateRegion: "Tamil Nadu, India",
  },
  curriculum: {
    gradeBands: "Grades 6 to 12 (Ages 11-18)",
    totalStudentAthletes: "420 Students",
    primarySports: ["Athletics / Track & Field", "Football / Soccer", "Badminton", "Basketball"],
    sessionFrequency: "4 Periods per Week (45 mins each)",
    interSchoolParticipation: true,
    annualSportsMeetMonth: "December",
    facilitiesAvailable: "400m Synthetic Track, FIFA-spec Turf, 2 Badminton Courts, 25m Pool",
  },
  benchmarks: {
    fitnessStandard: "khelo_india",
    beepTestPassPacer: 7.0,
    sprint50mSeconds: 8.4,
    sitAndReachCm: 25.0,
    bmiScreeningAlerts: true,
    postureGaitScreening: true,
    hydrationHeatIndexLimitC: 37.5,
  },
  reporting: {
    autoGenerateReportCardPdf: true,
    parentWhatsAppSync: true,
    parentEmailDispatch: true,
    reportFrequency: "termly",
    includeGrowthTracking: true,
    emergencyContactAlerts: true,
    notesToParents:
      "Term evaluation based on speed, cardiovascular aerobic stamina, agility, and joint mobility metrics.",
  },
};

const SCHOOL_CONFIG_STORAGE_PREFIX = "smx_school_config_";

export function loadSchoolUserConfig(userId: string, defaultEmail?: string, defaultName?: string): SchoolUserConfig {
  const fallback: SchoolUserConfig = {
    ...DEFAULT_SCHOOL_CONFIG,
    userId,
    userEmail: defaultEmail || "",
    institution: {
      ...DEFAULT_SCHOOL_CONFIG.institution,
      peDirectorName: defaultName || DEFAULT_SCHOOL_CONFIG.institution.peDirectorName,
      officialEmail: defaultEmail || DEFAULT_SCHOOL_CONFIG.institution.officialEmail,
    },
  };

  if (typeof window === "undefined") return fallback;

  try {
    const raw = localStorage.getItem(`${SCHOOL_CONFIG_STORAGE_PREFIX}${userId}`);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      ...fallback,
      ...parsed,
      institution: { ...fallback.institution, ...(parsed.institution || {}) },
      curriculum: { ...fallback.curriculum, ...(parsed.curriculum || {}) },
      benchmarks: { ...fallback.benchmarks, ...(parsed.benchmarks || {}) },
      reporting: { ...fallback.reporting, ...(parsed.reporting || {}) },
    };
  } catch (e) {
    console.error("Failed to load school user config from localStorage:", e);
    return fallback;
  }
}

export function saveSchoolUserConfig(config: SchoolUserConfig): void {
  if (typeof window === "undefined") return;
  try {
    config.updatedAt = new Date().toISOString();
    localStorage.setItem(`${SCHOOL_CONFIG_STORAGE_PREFIX}${config.userId}`, JSON.stringify(config));
  } catch (e) {
    console.error("Failed to save school user config locally:", e);
  }
}

export async function syncSchoolUserConfigToGoogleSheets(config: SchoolUserConfig): Promise<{ success: boolean; error?: string }> {
  const apiUrl =
    import.meta.env.VITE_ANALYTICS_URL ||
    "https://script.google.com/macros/s/AKfycbzb5YnF9zLzWp_N9P5zVw6eL3t8P0v2xY7q9mK/exec";

  const payload = {
    action: "save_school_config",
    config: {
      userId: config.userId,
      userEmail: config.userEmail,
      schoolName: config.institution.schoolName,
      boardAffiliation: config.institution.boardAffiliation,
      schoolCode: config.institution.schoolCode,
      principalName: config.institution.principalName,
      peDirectorName: config.institution.peDirectorName,
      officialEmail: config.institution.officialEmail,
      phone: config.institution.phone,
      city: config.institution.city,
      stateRegion: config.institution.stateRegion,
      gradeBands: config.curriculum.gradeBands,
      totalStudentAthletes: config.curriculum.totalStudentAthletes,
      primarySports: config.curriculum.primarySports.join(", "),
      sessionFrequency: config.curriculum.sessionFrequency,
      interSchoolParticipation: config.curriculum.interSchoolParticipation ? "Yes" : "No",
      annualSportsMeetMonth: config.curriculum.annualSportsMeetMonth,
      facilitiesAvailable: config.curriculum.facilitiesAvailable,
      fitnessStandard: config.benchmarks.fitnessStandard.toUpperCase(),
      beepTestTarget: `${config.benchmarks.beepTestPassPacer} Shuttle Level`,
      sprint50mTarget: `${config.benchmarks.sprint50mSeconds}s`,
      sitAndReachTarget: `${config.benchmarks.sitAndReachCm}cm`,
      bmiAlerts: config.benchmarks.bmiScreeningAlerts ? "Active" : "Off",
      postureScreening: config.benchmarks.postureGaitScreening ? "Active" : "Off",
      heatLimitC: `${config.benchmarks.hydrationHeatIndexLimitC}°C`,
      autoReportCardPdf: config.reporting.autoGenerateReportCardPdf ? "Yes" : "No",
      parentWhatsApp: config.reporting.parentWhatsAppSync ? "Enabled" : "Disabled",
      parentEmail: config.reporting.parentEmailDispatch ? "Enabled" : "Disabled",
      reportFrequency: config.reporting.reportFrequency.toUpperCase(),
      growthTracking: config.reporting.includeGrowthTracking ? "Included" : "Excluded",
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
      console.warn("Google Sheets school config sync non-200:", res.status);
    }
    return { success: true };
  } catch (err: any) {
    console.error("Network error syncing school config to Google Sheets:", err);
    return { success: true, error: err.message };
  }
}

