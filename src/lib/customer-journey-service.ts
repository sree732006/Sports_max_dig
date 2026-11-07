export type JourneyStage =
  | "Awareness"
  | "Consideration"
  | "Evaluation"
  | "Decision"
  | "Onboarding"
  | "Advocacy";

export interface JourneyStageDetail {
  id: JourneyStage;
  name: string;
  subtitle: string;
  color: string;
  badgeColor: string;
  conversionRate: string;
  dropOffRate: string;
  avgDuration: string;
  touchpoints: string[];
  keyActions: string[];
  painPointsResolved: string;
  exitCriteria: string;
}

export interface CustomerJourneyRecord {
  eventId: string;
  userId: string;
  userName: string;
  email: string;
  role: string;
  segment: string;
  stage: JourneyStage;
  action: string;
  touchpoint: string;
  source: string;
  timeSpentSeconds: number;
  dropOffRisk: "Low" | "Moderate" | "High";
  timestamp: string;
}

export const JOURNEY_STAGES: JourneyStageDetail[] = [
  {
    id: "Awareness",
    name: "1. Awareness & Discovery",
    subtitle: "Organic search, YouTube match breakdowns, LinkedIn case studies & referral",
    color: "from-blue-500/20 to-blue-500/5",
    badgeColor: "bg-blue-500/15 text-blue-500 border-blue-500/30",
    conversionRate: "68.4%",
    dropOffRate: "31.6%",
    avgDuration: "3m 40s",
    touchpoints: ["Homepage Hero", "45-Page Ebook Download", "YouTube Biomechanics Breakdown", "SEO Sports Hubs"],
    keyActions: ["Browses Olympic capabilities", "Downloads Ebook PDF", "Watches 3D joint tracking demo"],
    painPointsResolved: "Discovers that elite kinematic intelligence is possible without hardware sensors.",
    exitCriteria: "Clicks 'Whom We Serve' or selects their sport segment.",
  },
  {
    id: "Consideration",
    name: "2. Consideration & Segment Fit",
    subtitle: "Evaluating SPICED framework for Clubs, NCAA, Federations, or Schools",
    color: "from-teal-500/20 to-teal-500/5",
    badgeColor: "bg-teal-500/15 text-teal-500 border-teal-500/30",
    conversionRate: "52.8%",
    dropOffRate: "47.2%",
    avgDuration: "6m 15s",
    touchpoints: ["SPICED Framework (/icp)", "Sports Deep-Dive Directories", "ROI Calculator", "Case Studies"],
    keyActions: ["Selects target ICP persona", "Compares 70% analyst time-saving metric", "Reviews injury reduction case studies"],
    painPointsResolved: "Addresses skepticism around camera setup compatibility and budget thresholds.",
    exitCriteria: "Interacts with interactive demo or initiates consultation booking.",
  },
  {
    id: "Evaluation",
    name: "3. Technical Evaluation & Live Trial",
    subtitle: "Interactive dashboard telemetry, mobile PWA drill recording & ACWR corridors",
    color: "from-amber-500/20 to-amber-500/5",
    badgeColor: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    conversionRate: "38.2%",
    dropOffRate: "61.8%",
    avgDuration: "14m 20s",
    touchpoints: ["Analytics Dashboard (/dashboard)", "PWA Video Upload (/video-upload)", "Schools Config (/schools-config)", "Redis Session Inspector"],
    keyActions: ["Records live 60fps drill", "Calibrates ACWR 0.8–1.3 safety sweet spot", "Configures Khelo India / CBSE benchmarks"],
    painPointsResolved: "Validates speed of video inference (38ms turnaround) and zero-wearable convenience.",
    exitCriteria: "Completes self-registration and configures team telemetry parameters.",
  },
  {
    id: "Decision",
    name: "4. Decision & Commercial Activation",
    subtitle: "Enterprise contract agreement, pilot program launch & security compliance",
    color: "from-rose-500/20 to-rose-500/5",
    badgeColor: "bg-rose-500/15 text-rose-500 border-rose-500/30",
    conversionRate: "24.6%",
    dropOffRate: "75.4%",
    avgDuration: "2 to 5 Days",
    touchpoints: ["1-on-1 Consultation Booking (/book-appointment)", "Pricing Page", "GDPR/HIPAA Trustgrid Spec", "Procurement Proposal"],
    keyActions: ["Executes SLA agreement", "Assigns coaching staff roles & permissions", "Integrates multi-channel Google Sheets / Redis DB"],
    painPointsResolved: "Overcomes legal data privacy constraints and multi-coach access governance.",
    exitCriteria: "Signs pilot charter or provisions team workspace.",
  },
  {
    id: "Onboarding",
    name: "5. Onboarding & Field Integration",
    subtitle: "Camera calibration, athlete baseline profiling & staff certification",
    color: "from-emerald-500/20 to-emerald-500/5",
    badgeColor: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
    conversionRate: "91.2%",
    dropOffRate: "8.8%",
    avgDuration: "48 Hours",
    touchpoints: ["PWA Physical Baseline (/physical-config)", "Automated Halftime Report Setup", "Staff Video Training Portal"],
    keyActions: ["Inputs squad anthropometrics & jump baselines", "Runs first live matchday video feed", "Receives first automated PDF report card"],
    painPointsResolved: "Eliminates steep learning curves with automated AI assistance and instant reports.",
    exitCriteria: "First matchday or weekly training microcycle successfully analyzed.",
  },
  {
    id: "Advocacy",
    name: "6. Retention, Value Realization & Expansion",
    subtitle: "Longitudinal injury reduction, personal best records & multi-squad rollout",
    color: "from-purple-500/20 to-purple-500/5",
    badgeColor: "bg-purple-500/15 text-purple-500 border-purple-500/30",
    conversionRate: "94.5%",
    dropOffRate: "5.5%",
    avgDuration: "Annual Cycles",
    touchpoints: ["Executive Weekly Reports", "Olympic Federation Multi-Sport Expansion", "Peer Coach Referrals"],
    keyActions: ["Quantifies 28% soft-tissue injury avoidance", "Expands from First Team to Academy U17-U21", "Shares video-verified recruit profiles"],
    painPointsResolved: "Delivers provable ROI back to General Managers, Athletic Directors, and Club Boards.",
    exitCriteria: "Contract renewal and multi-academy enterprise tier upgrade.",
  },
];

const JOURNEY_HISTORY_KEY = "smx_customer_journey_events";

export function loadLocalJourneyHistory(): CustomerJourneyRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(JOURNEY_HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLocalJourneyEvent(record: CustomerJourneyRecord): void {
  if (typeof window === "undefined") return;
  try {
    const history = loadLocalJourneyHistory();
    const updated = [record, ...history.filter((x) => x.eventId !== record.eventId)].slice(0, 50);
    localStorage.setItem(JOURNEY_HISTORY_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to store customer journey event:", err);
  }
}

export async function syncJourneyEventToGoogleSheets(record: CustomerJourneyRecord): Promise<{ success: boolean; error?: string }> {
  const apiUrl =
    import.meta.env.VITE_ANALYTICS_URL ||
    "https://script.google.com/macros/s/AKfycbzb5YnF9zLzWp_N9P5zVw6eL3t8P0v2xY7q9mK/exec";

  const payload = {
    action: "log_customer_journey",
    journey: {
      userId: record.userId,
      userName: record.userName,
      email: record.email,
      role: record.role,
      segment: record.segment,
      stage: record.stage,
      action: record.action,
      touchpoint: record.touchpoint,
      source: record.source,
      timeSpentSeconds: record.timeSpentSeconds,
      dropOffRisk: record.dropOffRisk,
      timestamp: record.timestamp,
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
    console.warn("Offline or network issue syncing journey touchpoint to Google Sheets:", err);
    return { success: true, error: err.message };
  }
}
