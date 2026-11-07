export interface VideoUploadRecord {
  uploadId: string;
  userId: string;
  userName: string;
  email: string;
  role: string;
  sport: string;
  drillType: string;
  fileName: string;
  fileSizeMb: number;
  durationSeconds: number;
  resolution: string;
  cameraAngle: string;
  biomechanicalGoal: string;
  source: string;
  status: "QUEUED" | "ANALYZING" | "PROCESSED_SUCCESS" | "FAILED";
  aiJobId: string;
  valgusMoment: string;
  keyframesExtracted: number;
  timestamp: string;
  localVideoBlobUrl?: string;
  jointAnglesDetected?: {
    kneeFlexionMaxDeg: number;
    hipExtensionDeg: number;
    groundContactTimeMs: number;
    cadenceSpm: number;
  };
}

const VIDEO_HISTORY_KEY = "smx_pwa_video_uploads_history";

export function loadLocalVideoHistory(): VideoUploadRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(VIDEO_HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLocalVideoRecord(record: VideoUploadRecord): void {
  if (typeof window === "undefined") return;
  try {
    const history = loadLocalVideoHistory();
    // Keep max 50 recent uploads
    const updated = [record, ...history.filter((x) => x.uploadId !== record.uploadId)].slice(0, 50);
    localStorage.setItem(VIDEO_HISTORY_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to store video upload record locally:", err);
  }
}

export async function syncVideoUploadToGoogleSheets(record: VideoUploadRecord): Promise<{ success: boolean; error?: string }> {
  const apiUrl =
    import.meta.env.VITE_ANALYTICS_URL ||
    "https://script.google.com/macros/s/AKfycbzb5YnF9zLzWp_N9P5zVw6eL3t8P0v2xY7q9mK/exec";

  const payload = {
    action: "log_video_upload",
    video: {
      uploadId: record.uploadId,
      userId: record.userId,
      userName: record.userName,
      email: record.email,
      role: record.role,
      sport: record.sport,
      drillType: record.drillType,
      fileName: record.fileName,
      fileSizeMb: record.fileSizeMb,
      durationSeconds: record.durationSeconds,
      resolution: record.resolution,
      cameraAngle: record.cameraAngle,
      biomechanicalGoal: record.biomechanicalGoal,
      source: record.source,
      status: record.status,
      aiJobId: record.aiJobId,
      valgusMoment: record.valgusMoment,
      keyframesExtracted: record.keyframesExtracted,
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
    console.warn("Offline or network issue syncing video to Google Sheets:", err);
    return { success: true, error: err.message };
  }
}
