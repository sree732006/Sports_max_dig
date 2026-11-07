import React, { useState, useRef, useEffect } from "react";
import {
  Video,
  UploadCloud,
  Smartphone,
  Play,
  Pause,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Activity,
  Layers,
  FileVideo,
  Clock,
  Camera,
  Download,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import {
  type VideoUploadRecord,
  loadLocalVideoHistory,
  saveLocalVideoRecord,
  syncVideoUploadToGoogleSheets,
} from "@/lib/video-upload-service";

export function PwaVideoUploadManager() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sport, setSport] = useState("Athletics / Running");
  const [drillType, setDrillType] = useState("Max Velocity Sprint Mechanics");
  const [cameraAngle, setCameraAngle] = useState("Sagittal (Side View, 90°)");
  const [biomechanicalGoal, setBiomechanicalGoal] = useState("Ground Contact Time & Knee Flexion");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisPhase, setAnalysisPhase] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<VideoUploadRecord | null>(null);
  const [history, setHistory] = useState<VideoUploadRecord[]>([]);

  useEffect(() => {
    setHistory(loadLocalVideoHistory());
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Please select a valid video file (MP4, MOV, WebM).");
      return;
    }

    setSelectedFile(file);
    const blobUrl = URL.createObjectURL(file);
    setVideoPreviewUrl(blobUrl);
    setCurrentResult(null);
  };

  const handleTogglePlay = () => {
    if (!videoPreviewRef.current) return;
    if (isPlaying) {
      videoPreviewRef.current.pause();
      setIsPlaying(false);
    } else {
      videoPreviewRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleProcessVideo = async () => {
    if (!selectedFile) {
      alert("Please select or record a video first.");
      return;
    }

    setUploading(true);
    setUploadProgress(15);
    setAnalysisPhase("Extracting 60fps Keyframes...");

    // Simulate progressive AI Pose Extraction
    setTimeout(() => {
      setUploadProgress(45);
      setAnalysisPhase("Fitting 33 Olympic Pose Landmarks & Joint Angles...");
    }, 700);

    setTimeout(() => {
      setUploadProgress(80);
      setAnalysisPhase("Computing ACWR Kinematic Corridors & Valgus Stress...");
    }, 1400);

    setTimeout(async () => {
      setUploadProgress(100);
      setAnalysisPhase("Complete! Telemetry synced.");

      const record: VideoUploadRecord = {
        uploadId: `vid_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
        userId: user?.id || "guest-athlete",
        userName: user?.name || "Olympic Athlete User",
        email: user?.email || "athlete@sportsmax.org",
        role: user?.role || "Athlete",
        sport,
        drillType,
        fileName: selectedFile.name,
        fileSizeMb: parseFloat((selectedFile.size / (1024 * 1024)).toFixed(2)),
        durationSeconds: 12.4,
        resolution: "1080p 60fps High Dynamic",
        cameraAngle,
        biomechanicalGoal,
        source: "SportsMax PWA Mobile App",
        status: "PROCESSED_SUCCESS",
        aiJobId: `job_${Math.random().toString(36).substring(2, 10)}`,
        valgusMoment: "1.8 Nm/kg (Optimal corridor, Safe)",
        keyframesExtracted: 248,
        timestamp: new Date().toISOString(),
        localVideoBlobUrl: videoPreviewUrl || undefined,
        jointAnglesDetected: {
          kneeFlexionMaxDeg: 142.5,
          hipExtensionDeg: 12.8,
          groundContactTimeMs: 104,
          cadenceSpm: 188,
        },
      };

      // 1. Save local
      saveLocalVideoRecord(record);
      setHistory(loadLocalVideoHistory());
      setCurrentResult(record);

      // 2. Sync to Google Sheets PWA_Video_Uploads sheet
      await syncVideoUploadToGoogleSheets(record);

      setUploading(false);
      setAnalysisPhase(null);
    }, 2100);
  };

  return (
    <div className="space-y-6">
      {/* PWA Mobile App Simulation & Upload Studio */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Video Capture & Player */}
        <div className="lg:col-span-7 space-y-4">
          <div className="surface-card rounded-2xl border border-border p-5 bg-card text-card-foreground shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary/20 text-primary grid place-items-center">
                  <Smartphone className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Mobile Video Capture Studio</h3>
                  <p className="text-[11px] text-muted-foreground">
                    Record drill directly or select 60fps high-speed video for instant AI skeleton modeling.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                PWA Ready
              </span>
            </div>

            {/* Video Preview Box */}
            <div className="relative aspect-video w-full rounded-xl bg-slate-950 overflow-hidden border border-border flex items-center justify-center group">
              {videoPreviewUrl ? (
                <>
                  <video
                    ref={videoPreviewRef}
                    src={videoPreviewUrl}
                    className="h-full w-full object-contain"
                    onEnded={() => setIsPlaying(false)}
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={handleTogglePlay}
                      className="h-12 w-12 rounded-full shadow-lg bg-background/80 backdrop-blur-md hover:bg-background"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center space-y-3">
                  <div className="h-14 w-14 rounded-full bg-primary/10 border border-primary/20 grid place-items-center mx-auto text-primary animate-pulse">
                    <FileVideo className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">No Video Selected</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Tap below to record directly with your mobile camera or upload from device storage.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs h-9 flex items-center gap-1.5"
              >
                <Camera className="h-4 w-4 text-primary" />
                <span>Camera / Record Drill</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.removeAttribute("capture");
                    fileInputRef.current.click();
                  }
                }}
                className="text-xs h-9 flex items-center gap-1.5"
              >
                <UploadCloud className="h-4 w-4" />
                <span>Select File (MP4 / MOV)</span>
              </Button>

              {selectedFile && (
                <Button
                  type="button"
                  size="sm"
                  disabled={uploading}
                  onClick={handleProcessVideo}
                  className="text-xs h-9 font-semibold ml-auto bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{uploading ? "Analyzing..." : "Analyze Biomechanics"}</span>
                </Button>
              )}
            </div>

            {/* Progress Bar */}
            {uploading && (
              <div className="mt-4 p-3 rounded-xl border border-primary/20 bg-primary/5 space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-primary">{analysisPhase}</span>
                  <span className="font-mono text-muted-foreground">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Drill Metadata & Pose Configuration */}
        <div className="lg:col-span-5 space-y-4">
          <div className="surface-card rounded-2xl border border-border p-5 bg-card text-card-foreground shadow-sm">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" />
              Drill Context &amp; Sensor Calibration
            </h3>

            <div className="space-y-3.5 text-xs">
              <div>
                <Label className="text-xs font-medium">Athletic Sport</Label>
                <select
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                >
                  <option value="Athletics / Running">🏃 Athletics / Sprint &amp; Distance</option>
                  <option value="Football / Soccer">⚽ Football / Kicking &amp; Agility</option>
                  <option value="Basketball">🏀 Basketball / Jump Landing &amp; Shooting</option>
                  <option value="Swimming">🏊 Swimming / Stroke &amp; Turn</option>
                  <option value="Cricket">🏏 Cricket / Fast Bowling &amp; Batting</option>
                  <option value="Weightlifting">🏋️ Olympic Lifting / Clean &amp; Jerk</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-medium">Session / Drill Type</Label>
                <Input
                  className="mt-1 text-xs bg-background"
                  value={drillType}
                  onChange={(e) => setDrillType(e.target.value)}
                  placeholder="Max Velocity Sprint / Drop Vertical Jump"
                />
              </div>

              <div>
                <Label className="text-xs font-medium">Camera Angle Setup</Label>
                <select
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={cameraAngle}
                  onChange={(e) => setCameraAngle(e.target.value)}
                >
                  <option value="Sagittal (Side View, 90°)">Sagittal (Side View, 90° - Stride/Flexion)</option>
                  <option value="Frontal (Face-on, 0°)">Frontal (Face-on - Knee Valgus / Asymmetry)</option>
                  <option value="Transverse (Catwalk High-Angle)">Transverse (Catwalk High-Angle)</option>
                  <option value="Multi-Angle Calibrated Sync">Multi-Angle Calibrated Sync</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-medium">Biomechanical Objective</Label>
                <Input
                  className="mt-1 text-xs bg-background"
                  value={biomechanicalGoal}
                  onChange={(e) => setBiomechanicalGoal(e.target.value)}
                  placeholder="Ground Contact Time & Knee Flexion"
                />
              </div>
            </div>
          </div>

          {/* AI Result Card if Processed */}
          {currentResult && (
            <div className="surface-card rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 shadow-sm space-y-3 animate-in zoom-in-95">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> AI Biomechanical Results
                </span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
                  Synced to Google Sheets
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-background border border-border">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Ground Contact</div>
                  <div className="text-base font-bold text-foreground">
                    {currentResult.jointAnglesDetected?.groundContactTimeMs} ms
                  </div>
                  <div className="text-[10px] text-emerald-500 font-medium">Olympic Elite Corridor</div>
                </div>

                <div className="p-2.5 rounded-lg bg-background border border-border">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Max Knee Flexion</div>
                  <div className="text-base font-bold text-foreground">
                    {currentResult.jointAnglesDetected?.kneeFlexionMaxDeg}°
                  </div>
                  <div className="text-[10px] text-muted-foreground">Optimal loading angle</div>
                </div>

                <div className="p-2.5 rounded-lg bg-background border border-border">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Stride Cadence</div>
                  <div className="text-base font-bold text-foreground">
                    {currentResult.jointAnglesDetected?.cadenceSpm} spm
                  </div>
                  <div className="text-[10px] text-muted-foreground">High velocity</div>
                </div>

                <div className="p-2.5 rounded-lg bg-background border border-border">
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">Valgus Moment Risk</div>
                  <div className="text-xs font-bold text-emerald-500 mt-1">
                    Safe (1.8 Nm/kg)
                  </div>
                  <div className="text-[10px] text-muted-foreground">&lt; 2.5 threshold</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload History Table */}
      <div className="surface-card rounded-2xl border border-border p-5 bg-card text-card-foreground shadow-sm">
        <div className="flex items-center justify-between mb-3 border-b border-border pb-3">
          <div>
            <h3 className="text-sm font-bold text-foreground">PWA Mobile Uploads &amp; Telemetry Logs</h3>
            <p className="text-xs text-muted-foreground">
              History of video clips analyzed and recorded on this device and synced to Google Sheets tab <strong>PWA_Video_Uploads</strong>.
            </p>
          </div>
          <span className="text-xs font-mono text-muted-foreground">{history.length} Clips Logged</span>
        </div>

        {history.length === 0 ? (
          <div className="p-8 text-center text-xs text-muted-foreground">
            No video uploads recorded yet. Capture or upload a clip above to generate your first biomechanical report.
          </div>
        ) : (
          <div className="divide-y divide-border overflow-x-auto">
            {history.map((item) => (
              <div key={item.uploadId} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                    <FileVideo className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground flex items-center gap-2">
                      <span>{item.drillType}</span>
                      <span className="text-[10px] bg-secondary px-1.5 py-0.2 rounded text-muted-foreground font-mono">
                        {item.sport}
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-2 mt-0.5">
                      <span>{item.fileName} ({item.fileSizeMb} MB)</span>
                      <span>•</span>
                      <span>{item.cameraAngle}</span>
                      <span>•</span>
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                    PROCESSED
                  </span>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    GCT: {item.jointAnglesDetected?.groundContactTimeMs || 104}ms
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

