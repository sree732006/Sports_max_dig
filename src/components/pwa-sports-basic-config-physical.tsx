import React, { useState, useEffect } from "react";
import {
  Heart,
  Scale,
  Ruler,
  Zap,
  Shield,
  Activity,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  Smartphone,
  HeartPulse,
  TrendingUp,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import {
  type AthletePhysicalConfig,
  DEFAULT_PHYSICAL_CONFIG,
  loadLocalPhysicalConfig,
  saveLocalPhysicalConfig,
  syncPhysicalConfigToGoogleSheets,
} from "@/lib/physical-config-service";

export function PwaSportsBasicConfigPhysical() {
  const { user } = useAuth();
  const athleteId = user?.id || "athlete_mobile_user";
  const athleteName = user?.name || "Olympic Athlete";
  const email = user?.email || "athlete@sportsvectors.org";

  const [activeTab, setActiveTab] = useState("anthropometrics");
  const [config, setConfig] = useState<AthletePhysicalConfig>(() =>
    loadLocalPhysicalConfig(athleteId, athleteName, email)
  );

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (user) {
      setConfig(loadLocalPhysicalConfig(user.id, user.name, user.email));
    }
  }, [user]);

  // Compute live BMI & Target Zone
  const heightM = config.anthropometrics.heightCm / 100;
  const bmi =
    heightM > 0
      ? (config.anthropometrics.weightKg / (heightM * heightM)).toFixed(1)
      : "22.5";

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      saveLocalPhysicalConfig(config);
      const res = await syncPhysicalConfigToGoogleSheets(config);

      if (res.success) {
        setStatusMessage({
          type: "success",
          text: "Physical configuration saved to device & synced to Google Sheets (Tab: PWA_Physical_Config)!",
        });
      } else {
        setStatusMessage({
          type: "info",
          text: "Saved locally. Google Sheets sync queued for next internet connection.",
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Failed to save physical configuration.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResetDefaults = () => {
    if (confirm("Reset physical measurements to standard sports science baselines?")) {
      const resetConfig: AthletePhysicalConfig = {
        ...DEFAULT_PHYSICAL_CONFIG,
        athleteId,
        athleteName,
        email,
      };
      setConfig(resetConfig);
      saveLocalPhysicalConfig(resetConfig);
      setStatusMessage({
        type: "info",
        text: "Reset back to Olympic athlete physical baseline defaults.",
      });
    }
  };

  return (
    <div className="surface-card rounded-2xl border border-border shadow-md overflow-hidden bg-card text-card-foreground">
      {/* Header Banner */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-emerald-500/10 via-background to-teal-500/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <HeartPulse className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  PWA_Sports_Basic_Config_Physical
                </h1>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  Mobile PWA Setup
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Configure baseline anthropometrics, body composition, vertical power baselines &amp; injury guarding for on-field video AI.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={handleResetDefaults}
              className="text-xs h-9 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
              Reset Standards
            </Button>
            <Button
              size="sm"
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="text-xs h-9 font-semibold shadow-xs bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {saving ? (
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Save className="h-3.5 w-3.5" />
                  Save Physical Config
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Live Athlete KPI Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
          <div className="p-2.5 rounded-xl bg-background/80 border border-border">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Body Mass Index (BMI)</span>
            <div className="text-base font-bold text-foreground mt-0.5">{bmi} kg/m²</div>
            <div className="text-[10px] text-emerald-500 font-medium">Athletic Lean Corridor</div>
          </div>

          <div className="p-2.5 rounded-xl bg-background/80 border border-border">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Resting HR / Max HR</span>
            <div className="text-base font-bold text-foreground mt-0.5">
              {config.anthropometrics.restingHeartRateBpm} / {config.anthropometrics.maxHeartRateBpm} bpm
            </div>
            <div className="text-[10px] text-muted-foreground">Aerobic reserve: {config.anthropometrics.maxHeartRateBpm - config.anthropometrics.restingHeartRateBpm} bpm</div>
          </div>

          <div className="p-2.5 rounded-xl bg-background/80 border border-border">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Vertical Jump</span>
            <div className="text-base font-bold text-primary mt-0.5">
              {config.baselines.verticalJumpCm} cm
            </div>
            <div className="text-[10px] text-muted-foreground">Explosive anaerobic power</div>
          </div>

          <div className="p-2.5 rounded-xl bg-background/80 border border-border">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">Daily Load Ceiling</span>
            <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {config.safety.maxDailyWorkloadThresholdAu} AU
            </div>
            <div className="text-[10px] text-muted-foreground">ACWR overload guard</div>
          </div>
        </div>

        {/* Feedback Alert */}
        {statusMessage && (
          <div
            className={`mt-4 p-3 rounded-lg border text-xs flex items-center gap-2 animate-in fade-in ${
              statusMessage.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                : statusMessage.type === "error"
                ? "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
                : "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : statusMessage.type === "error" ? (
              <AlertTriangle className="h-4 w-4 shrink-0" />
            ) : (
              <Info className="h-4 w-4 shrink-0" />
            )}
            <span className="font-medium">{statusMessage.text}</span>
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6 pt-4 border-b border-border bg-muted/20">
          <TabsList className="grid grid-cols-3 h-11 w-full bg-muted/50 p-1">
            <TabsTrigger
              value="anthropometrics"
              className="text-xs font-semibold flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-xs"
            >
              <Ruler className="h-3.5 w-3.5 text-emerald-500" />
              <span>1. Anthropometrics &amp; Vitals</span>
            </TabsTrigger>
            <TabsTrigger
              value="baselines"
              className="text-xs font-semibold flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-xs"
            >
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span>2. Physical Baselines &amp; Speed</span>
            </TabsTrigger>
            <TabsTrigger
              value="safety"
              className="text-xs font-semibold flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-xs"
            >
              <Shield className="h-3.5 w-3.5 text-rose-500" />
              <span>3. Injury Guard &amp; Footwear</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1: Anthropometrics */}
        <TabsContent value="anthropometrics" className="p-6 m-0 focus-visible:outline-none space-y-5">
          <div className="bg-secondary/20 p-4 rounded-xl border border-border/60">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
              <Ruler className="h-4 w-4 text-emerald-500" />
              Athlete Biological Dimensions &amp; Cardiac Range
            </h3>
            <p className="text-xs text-muted-foreground">
              Essential body metrics used by computer vision algorithms to calibrate pixel-to-meter aspect ratios and calculate joint moments.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs font-medium">Athlete Full Name</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.athleteName}
                onChange={(e) => setConfig({ ...config, athleteName: e.target.value })}
                placeholder="Marcus Vance"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Primary Sport &amp; Position</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.sport + " - " + config.positionOrEvent}
                onChange={(e) => {
                  const parts = e.target.value.split("-");
                  setConfig({
                    ...config,
                    sport: parts[0]?.trim() || config.sport,
                    positionOrEvent: parts[1]?.trim() || config.positionOrEvent,
                  });
                }}
                placeholder="Athletics - 100m Sprint"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Standing Height (cm)</Label>
              <Input
                type="number"
                step="0.5"
                className="mt-1.5 text-xs bg-background"
                value={config.anthropometrics.heightCm}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    anthropometrics: {
                      ...config.anthropometrics,
                      heightCm: parseFloat(e.target.value) || 175,
                    },
                  })
                }
              />
              <p className="text-[10px] text-muted-foreground mt-1">Crucial for video AI keypoint scale calibration.</p>
            </div>

            <div>
              <Label className="text-xs font-medium">Body Weight (kg)</Label>
              <Input
                type="number"
                step="0.1"
                className="mt-1.5 text-xs bg-background"
                value={config.anthropometrics.weightKg}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    anthropometrics: {
                      ...config.anthropometrics,
                      weightKg: parseFloat(e.target.value) || 70,
                    },
                  })
                }
              />
              <p className="text-[10px] text-muted-foreground mt-1">Used for Ground Reaction Force (GRF) modeling.</p>
            </div>

            <div>
              <Label className="text-xs font-medium">Arm Wingspan (cm)</Label>
              <Input
                type="number"
                step="0.5"
                className="mt-1.5 text-xs bg-background"
                value={config.anthropometrics.wingspanCm || 180}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    anthropometrics: {
                      ...config.anthropometrics,
                      wingspanCm: parseFloat(e.target.value) || 180,
                    },
                  })
                }
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Limb Dominance</Label>
              <select
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={config.anthropometrics.limbDominance}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    anthropometrics: {
                      ...config.anthropometrics,
                      limbDominance: e.target.value as any,
                    },
                  })
                }
              >
                <option value="right">Right Limb Dominant</option>
                <option value="left">Left Limb Dominant</option>
                <option value="ambidextrous">Ambidextrous (Bilateral Balanced)</option>
              </select>
            </div>

            <div>
              <Label className="text-xs font-medium">Resting Heart Rate (bpm)</Label>
              <Input
                type="number"
                className="mt-1.5 text-xs bg-background"
                value={config.anthropometrics.restingHeartRateBpm}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    anthropometrics: {
                      ...config.anthropometrics,
                      restingHeartRateBpm: parseInt(e.target.value, 10) || 50,
                    },
                  })
                }
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Maximum Heart Rate HR_max (bpm)</Label>
              <Input
                type="number"
                className="mt-1.5 text-xs bg-background"
                value={config.anthropometrics.maxHeartRateBpm}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    anthropometrics: {
                      ...config.anthropometrics,
                      maxHeartRateBpm: parseInt(e.target.value, 10) || 195,
                    },
                  })
                }
              />
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Baselines & Speed */}
        <TabsContent value="baselines" className="p-6 m-0 focus-visible:outline-none space-y-5">
          <div className="bg-secondary/20 p-4 rounded-xl border border-border/60">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-amber-500" />
              Explosive Power, Sprint Times &amp; Aerobic Ceiling
            </h3>
            <p className="text-xs text-muted-foreground">
              Benchmark values used by AI algorithms to score performance velocity deviations during training sessions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs font-medium">Countermovement Vertical Jump (cm)</Label>
              <Input
                type="number"
                step="0.5"
                className="mt-1.5 text-xs bg-background"
                value={config.baselines.verticalJumpCm}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    baselines: {
                      ...config.baselines,
                      verticalJumpCm: parseFloat(e.target.value) || 50,
                    },
                  })
                }
              />
              <p className="text-[10px] text-muted-foreground mt-1">Measures lower extremity reactive strength index.</p>
            </div>

            <div>
              <Label className="text-xs font-medium">10-Meter Acceleration Sprint (sec)</Label>
              <Input
                type="number"
                step="0.01"
                className="mt-1.5 text-xs bg-background"
                value={config.baselines.sprint10mSec}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    baselines: {
                      ...config.baselines,
                      sprint10mSec: parseFloat(e.target.value) || 1.7,
                    },
                  })
                }
              />
              <p className="text-[10px] text-muted-foreground mt-1">First-step acceleration &amp; drive phase baseline.</p>
            </div>

            <div>
              <Label className="text-xs font-medium">40-Meter Flying Sprint / Max Velocity (sec)</Label>
              <Input
                type="number"
                step="0.01"
                className="mt-1.5 text-xs bg-background"
                value={config.baselines.sprint40mSec}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    baselines: {
                      ...config.baselines,
                      sprint40mSec: parseFloat(e.target.value) || 4.8,
                    },
                  })
                }
              />
              <p className="text-[10px] text-muted-foreground mt-1">Upright max speed zone velocity benchmark.</p>
            </div>

            <div>
              <Label className="text-xs font-medium">1-Rep Max Back Squat (kg)</Label>
              <Input
                type="number"
                step="2.5"
                className="mt-1.5 text-xs bg-background"
                value={config.baselines.oneRepMaxSquatKg || 140}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    baselines: {
                      ...config.baselines,
                      oneRepMaxSquatKg: parseFloat(e.target.value) || 140,
                    },
                  })
                }
              />
            </div>

            <div>
              <Label className="text-xs font-medium">VO2 Max Aerobic Capacity (ml/kg/min)</Label>
              <Input
                type="number"
                step="0.5"
                className="mt-1.5 text-xs bg-background"
                value={config.baselines.vo2MaxMlKgMin || 55}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    baselines: {
                      ...config.baselines,
                      vo2MaxMlKgMin: parseFloat(e.target.value) || 55,
                    },
                  })
                }
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Sit &amp; Reach Posterior Flexibility (cm)</Label>
              <Input
                type="number"
                step="0.5"
                className="mt-1.5 text-xs bg-background"
                value={config.baselines.sitAndReachCm || 28}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    baselines: {
                      ...config.baselines,
                      sitAndReachCm: parseFloat(e.target.value) || 28,
                    },
                  })
                }
              />
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: Injury Guard & Footwear */}
        <TabsContent value="safety" className="p-6 m-0 focus-visible:outline-none space-y-5">
          <div className="bg-secondary/20 p-4 rounded-xl border border-border/60">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
              <Shield className="h-4 w-4 text-rose-500" />
              Injury Risk Guarding &amp; Movement Asymmetry Monitoring
            </h3>
            <p className="text-xs text-muted-foreground">
              Define limbs requiring automated asymmetry surveillance during video tracking and daily ACWR workload ceilings.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs font-medium">Movement Asymmetry Watch Limb</Label>
              <select
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={config.safety.asymmetryWatchLimb}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    safety: {
                      ...config.safety,
                      asymmetryWatchLimb: e.target.value as any,
                    },
                  })
                }
              >
                <option value="none">No Specific Limb Guarding (Balanced)</option>
                <option value="right">Watch Right Limb (Flags Right Knee/Ankle Asymmetry)</option>
                <option value="left">Watch Left Limb (Flags Left Knee/Ankle Asymmetry)</option>
              </select>
            </div>

            <div>
              <Label className="text-xs font-medium">Medical Clearance Status</Label>
              <select
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={config.safety.medicalClearanceStatus}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    safety: {
                      ...config.safety,
                      medicalClearanceStatus: e.target.value as any,
                    },
                  })
                }
              >
                <option value="CLEARED_FULL">Cleared for Full High-Intensity Drills</option>
                <option value="MODIFIED_LOAD">Modified Load (Non-contact / Sub-maximal)</option>
                <option value="RESTRICTED">Restricted / Return-to-Play Rehabilitation</option>
              </select>
            </div>

            <div>
              <Label className="text-xs font-medium">Daily Workload Ceiling (Arbitrary Units AU)</Label>
              <Input
                type="number"
                step="25"
                className="mt-1.5 text-xs bg-background"
                value={config.safety.maxDailyWorkloadThresholdAu}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    safety: {
                      ...config.safety,
                      maxDailyWorkloadThresholdAu: parseInt(e.target.value, 10) || 750,
                    },
                  })
                }
              />
              <p className="text-[10px] text-muted-foreground mt-1">Generates warning when daily session exertion exceeds threshold.</p>
            </div>

            <div>
              <Label className="text-xs font-medium">Standard Footwear / Cleat Model</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.safety.preferredFootwear}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    safety: { ...config.safety, preferredFootwear: e.target.value },
                  })
                }
                placeholder="Nike Mercurial Vapor 15 / Asics Metaspeed"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs font-medium">Previous Injury History &amp; Physiotherapy Notes</Label>
            <textarea
              rows={3}
              className="mt-1.5 w-full rounded-md border border-input bg-background p-2.5 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={config.safety.previousInjuries}
              onChange={(e) =>
                setConfig({
                  ...config,
                  safety: { ...config.safety, previousInjuries: e.target.value },
                })
              }
              placeholder="e.g. Mild right hamstring tightness (Grade 1, Oct 2025). Watch for decreased hip extension."
            />
          </div>
        </TabsContent>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Target Google Sheet tab: <strong>PWA_Physical_Config</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleResetDefaults} className="text-xs h-8">
              Reset
            </Button>
            <Button
              size="sm"
              onClick={() => handleSave()}
              disabled={saving}
              className="text-xs h-8 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {saving ? "Saving..." : "Save Physical Config"}
            </Button>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

