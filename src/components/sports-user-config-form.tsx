import React, { useState, useEffect } from "react";
import {
  Sliders,
  User as UserIcon,
  Shield,
  Activity,
  Radio,
  CheckCircle2,
  Save,
  RotateCcw,
  AlertTriangle,
  Info,
  Building,
  Target,
  Bell,
  Check,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth-context";
import {
  type SportsUserConfig,
  DEFAULT_USER_CONFIG,
  loadLocalUserConfig,
  saveLocalUserConfig,
  syncUserConfigToGoogleSheets,
} from "@/lib/user-config-service";

interface SportsUserConfigFormProps {
  onSaved?: () => void;
  triggerButton?: React.ReactNode;
}

export function SportsUserConfigFormDialog({ triggerButton }: { triggerButton?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 text-xs font-semibold border-primary/40 hover:border-primary text-foreground"
          >
            <Sliders className="h-3.5 w-3.5 text-primary" />
            <span>Sports Config</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto p-0 border-border bg-card">
        <SportsUserConfigForm onSaved={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export function SportsUserConfigForm({ onSaved }: SportsUserConfigFormProps) {
  const { user } = useAuth();
  const userId = user?.id || "anonymous-coach";
  const userEmail = user?.email || "";
  const userName = user?.name || "";

  const [activeTab, setActiveTab] = useState("profile");
  const [config, setConfig] = useState<SportsUserConfig>(() =>
    loadLocalUserConfig(userId, userEmail, userName)
  );

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  useEffect(() => {
    if (user) {
      const existing = loadLocalUserConfig(user.id, user.email, user.name);
      setConfig(existing);
    }
  }, [user]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      // 1. Save to local storage
      saveLocalUserConfig(config);

      // 2. Sync to Google Sheets
      const syncRes = await syncUserConfigToGoogleSheets(config);

      if (syncRes.success) {
        setStatusMessage({
          type: "success",
          text: "Configuration saved and synchronized with Google Sheets User_Config tab!",
        });
        if (onSaved) {
          setTimeout(onSaved, 1200);
        }
      } else {
        setStatusMessage({
          type: "info",
          text: "Saved locally. Google Sheets sync will retry when connection is restored.",
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Failed to save configuration.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefault = () => {
    if (confirm("Reset all sports telemetry and squad configurations back to Olympic default thresholds?")) {
      const resetConfig: SportsUserConfig = {
        ...DEFAULT_USER_CONFIG,
        userId,
        userEmail,
        profile: {
          ...DEFAULT_USER_CONFIG.profile,
          fullName: userName || DEFAULT_USER_CONFIG.profile.fullName,
          email: userEmail || DEFAULT_USER_CONFIG.profile.email,
        },
      };
      setConfig(resetConfig);
      saveLocalUserConfig(resetConfig);
      setStatusMessage({
        type: "info",
        text: "Reset to default sports science corridor parameters.",
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      {/* Header Banner */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/10 via-background to-secondary/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shadow-xs">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight text-foreground">
                  Sports_User_Config_Form
                </h2>
                <span className="text-[10px] font-mono uppercase bg-primary/15 text-primary border border-primary/30 px-2 py-0.5 rounded-full font-bold">
                  Multi-Tab Setup
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Configure your squad kinematics, ACWR thresholds, telemetry alerts &amp; Google Sheets sync.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-center">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={handleResetToDefault}
              className="text-xs h-8 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              Reset Defaults
            </Button>
            <Button
              size="sm"
              type="button"
              onClick={() => handleSave()}
              disabled={saving}
              className="text-xs h-8 font-semibold shadow-xs bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {saving ? (
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Save className="h-3.5 w-3.5" />
                  Save Changes
                </span>
              )}
            </Button>
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
        <div className="px-6 pt-4 border-b border-border bg-muted/20">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 h-11 w-full bg-muted/50 p-1">
            <TabsTrigger
              value="profile"
              className="text-xs font-semibold flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-xs"
            >
              <UserIcon className="h-3.5 w-3.5 text-primary" />
              <span>1. Profile &amp; Role</span>
            </TabsTrigger>
            <TabsTrigger
              value="program"
              className="text-xs font-semibold flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-xs"
            >
              <Building className="h-3.5 w-3.5 text-blue-500" />
              <span>2. Squad &amp; Facility</span>
            </TabsTrigger>
            <TabsTrigger
              value="thresholds"
              className="text-xs font-semibold flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-xs"
            >
              <Activity className="h-3.5 w-3.5 text-amber-500" />
              <span>3. Kinematic Corridor</span>
            </TabsTrigger>
            <TabsTrigger
              value="telemetry"
              className="text-xs font-semibold flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-xs"
            >
              <Radio className="h-3.5 w-3.5 text-emerald-500" />
              <span>4. Wearables &amp; Alerts</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1 Content: Profile & Identity */}
        <TabsContent value="profile" className="p-6 m-0 focus-visible:outline-none space-y-5">
          <div className="bg-secondary/20 p-4 rounded-xl border border-border/60">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
              <UserIcon className="h-4 w-4 text-primary" />
              User Profile &amp; High-Performance Identity
            </h3>
            <p className="text-xs text-muted-foreground">
              Define the coaching staff credentials, sport science role, and primary communication channel.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs font-medium">Full Name</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.profile.fullName}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    profile: { ...config.profile, fullName: e.target.value },
                  })
                }
                placeholder="Dr. Alexander Vance"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Official Email Address</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                type="email"
                value={config.profile.email}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    profile: { ...config.profile, email: e.target.value },
                  })
                }
                placeholder="director@sportsacademy.org"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Contact Phone / WhatsApp</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.profile.phone}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    profile: { ...config.profile, phone: e.target.value },
                  })
                }
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Primary Role</Label>
              <select
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={config.profile.role}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    profile: { ...config.profile, role: e.target.value },
                  })
                }
              >
                <option value="Head Coach">Head Coach</option>
                <option value="Sports Science Director">Sports Science Director</option>
                <option value="Biomechanics Lead">Biomechanics Lead</option>
                <option value="Strength & Conditioning (S&C) Coach">Strength &amp; Conditioning (S&amp;C) Coach</option>
                <option value="Tactical Performance Analyst">Tactical Performance Analyst</option>
                <option value="Team Physician / Medical Lead">Team Physician / Medical Lead</option>
                <option value="Elite Athlete">Elite Athlete</option>
                <option value="Club Administrator / GM">Club Administrator / GM</option>
              </select>
            </div>

            <div>
              <Label className="text-xs font-medium">Job Title / Designation</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.profile.title}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    profile: { ...config.profile, title: e.target.value },
                  })
                }
                placeholder="Head of Biomechanical Analytics"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Country / Operating Region</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.profile.country}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    profile: { ...config.profile, country: e.target.value },
                  })
                }
                placeholder="India / United Kingdom / Global"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs font-medium">Staff Bio &amp; Program Mission</Label>
            <textarea
              rows={3}
              className="mt-1.5 w-full rounded-md border border-input bg-background p-2.5 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={config.profile.bio}
              onChange={(e) =>
                setConfig({
                  ...config,
                  profile: { ...config.profile, bio: e.target.value },
                })
              }
              placeholder="Overseeing load management, neuromuscular fatigue detection and return-to-play corridors..."
            />
          </div>
        </TabsContent>

        {/* Tab 2 Content: Athletic Program & Squad Setup */}
        <TabsContent value="program" className="p-6 m-0 focus-visible:outline-none space-y-5">
          <div className="bg-secondary/20 p-4 rounded-xl border border-border/60">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
              <Building className="h-4 w-4 text-blue-500" />
              Athletic Program &amp; Facility Setup
            </h3>
            <p className="text-xs text-muted-foreground">
              Map your organization structure, competitive tier, field capture camera systems, and squad size.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs font-medium">Organization / Team Name</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.program.organizationName}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    program: { ...config.program, organizationName: e.target.value },
                  })
                }
                placeholder="SportsVectors Olympic Training Institute"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Institution Type</Label>
              <select
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={config.program.institutionType}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    program: { ...config.program, institutionType: e.target.value },
                  })
                }
              >
                <option value="Professional Club / Franchise">Professional Club / Franchise</option>
                <option value="National Sports Federation / Olympic Committee">National Sports Federation / Olympic Committee</option>
                <option value="NCAA Division I / Collegiate Athletic Dept">NCAA Division I / Collegiate Athletic Dept</option>
                <option value="High-Performance Training Academy">High-Performance Training Academy</option>
                <option value="Sports Science Research Laboratory">Sports Science Research Laboratory</option>
                <option value="Private Athlete Training Facility">Private Athlete Training Facility</option>
              </select>
            </div>

            <div>
              <Label className="text-xs font-medium">Primary Sport</Label>
              <select
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={config.program.primarySport}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    program: { ...config.program, primarySport: e.target.value },
                  })
                }
              >
                <option value="Football / Soccer">⚽ Football / Soccer</option>
                <option value="Athletics / Track & Field">🏃 Athletics / Track &amp; Field</option>
                <option value="Basketball">🏀 Basketball</option>
                <option value="Field Hockey">🏑 Field Hockey</option>
                <option value="Rugby Union / Sevens">🏉 Rugby Union / Sevens</option>
                <option value="Cricket">🏏 Cricket</option>
                <option value="Swimming">🏊 Swimming</option>
                <option value="Tennis / Racket Sports">🎾 Tennis / Racket Sports</option>
              </select>
            </div>

            <div>
              <Label className="text-xs font-medium">Secondary Sport / Multisport</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.program.secondarySport}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    program: { ...config.program, secondarySport: e.target.value },
                  })
                }
                placeholder="Strength & Conditioning / Sprints"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Squad Size / Athlete Roster</Label>
              <select
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={config.program.squadSize}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    program: { ...config.program, squadSize: e.target.value },
                  })
                }
              >
                <option value="1-10">1-10 Athletes (Individual Elite)</option>
                <option value="11-25">11-25 Athletes (Single Squad)</option>
                <option value="26-50">26-50 Athletes (First Team + Reserves)</option>
                <option value="51-100">51-100 Athletes (Academy Program)</option>
                <option value="100+">100+ Athletes (Institutional Department)</option>
              </select>
            </div>

            <div>
              <Label className="text-xs font-medium">Competition Tier</Label>
              <select
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={config.program.competitionTier}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    program: { ...config.program, competitionTier: e.target.value },
                  })
                }
              >
                <option value="Olympic / International National Team">Olympic / International National Team</option>
                <option value="Tier-1 Professional League (EPL, MLS, ISL)">Tier-1 Professional League</option>
                <option value="Developmental / Academy U21-U17">Developmental / Academy U21-U17</option>
                <option value="Collegiate / University Varsity">Collegiate / University Varsity</option>
              </select>
            </div>

            <div>
              <Label className="text-xs font-medium">Pitch Optical Tracking System</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.program.pitchTrackingSystem}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    program: { ...config.program, pitchTrackingSystem: e.target.value },
                  })
                }
                placeholder="SportsVectors VisionAI 4K / TRACAB / Second Spectrum"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Camera Installation Setup</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.program.cameraSetup}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    program: { ...config.program, cameraSetup: e.target.value },
                  })
                }
                placeholder="Dual 60fps Catwalk + Tactical Wide Angle"
              />
            </div>
          </div>
        </TabsContent>

        {/* Tab 3 Content: Biometric & Kinematic Thresholds */}
        <TabsContent value="thresholds" className="p-6 m-0 focus-visible:outline-none space-y-5">
          <div className="bg-secondary/20 p-4 rounded-xl border border-border/60">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
              <Activity className="h-4 w-4 text-amber-500" />
              Kinematic Corridors &amp; Workload Thresholds
            </h3>
            <p className="text-xs text-muted-foreground">
              Calibrate sports science safety ranges: Acute:Chronic Workload Ratio (ACWR), Ground Contact Time asymmetry, and Valgus moment triggers.
            </p>
          </div>

          {/* ACWR Sweet Spot Visual Corridor */}
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs">Acute:Chronic Workload Ratio (ACWR) Corridor</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono px-2 py-0.5 rounded font-bold">
                  Sweet Spot: {config.thresholds.acwrMin} – {config.thresholds.acwrMax}
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground">
                Acute: {config.thresholds.acuteDays}d / Chronic: {config.thresholds.chronicDays}d
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono mt-3">
              <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                <div className="font-bold">&lt; {config.thresholds.acwrMin}</div>
                <div className="text-[9px] text-muted-foreground">Under-prepared / Detraining Risk</div>
              </div>
              <div className="p-2 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                <div className="font-bold">{config.thresholds.acwrMin} – {config.thresholds.acwrMax}</div>
                <div className="text-[9px] text-muted-foreground font-sans">Optimal Adaptation Window</div>
              </div>
              <div className="p-2 rounded bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
                <div className="font-bold">&gt; {config.thresholds.acwrMax}</div>
                <div className="text-[9px] text-muted-foreground">Injury Danger Zone (&gt;1.5 High Risk)</div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs font-medium">ACWR Corridor Min (Floor)</Label>
              <Input
                type="number"
                step="0.05"
                className="mt-1.5 text-xs bg-background"
                value={config.thresholds.acwrMin}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    thresholds: { ...config.thresholds, acwrMin: parseFloat(e.target.value) || 0.8 },
                  })
                }
              />
              <p className="text-[10px] text-muted-foreground mt-1">Default 0.80. Values below indicate chronic fitness loss.</p>
            </div>

            <div>
              <Label className="text-xs font-medium">ACWR Corridor Max (Ceiling)</Label>
              <Input
                type="number"
                step="0.05"
                className="mt-1.5 text-xs bg-background"
                value={config.thresholds.acwrMax}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    thresholds: { ...config.thresholds, acwrMax: parseFloat(e.target.value) || 1.3 },
                  })
                }
              />
              <p className="text-[10px] text-muted-foreground mt-1">Default 1.30. Spikes above 1.50 multiply soft-tissue risk by 2-4x.</p>
            </div>

            <div>
              <Label className="text-xs font-medium">Critical Knee Valgus Moment (Nm/kg)</Label>
              <Input
                type="number"
                step="0.1"
                className="mt-1.5 text-xs bg-background"
                value={config.thresholds.valgusRiskNmKg}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    thresholds: { ...config.thresholds, valgusRiskNmKg: parseFloat(e.target.value) || 2.5 },
                  })
                }
              />
              <p className="text-[10px] text-muted-foreground mt-1">Trigger ACL stress warning when dynamic valgus exceeds threshold.</p>
            </div>

            <div>
              <Label className="text-xs font-medium">Ground Contact Time (GCT) Asymmetry Tolerance (%)</Label>
              <Input
                type="number"
                step="0.5"
                className="mt-1.5 text-xs bg-background"
                value={config.thresholds.maxGctAsymmetryPercent}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    thresholds: { ...config.thresholds, maxGctAsymmetryPercent: parseFloat(e.target.value) || 8 },
                  })
                }
              />
              <p className="text-[10px] text-muted-foreground mt-1">L/R asymmetry &gt; 8% indicates subconscious limb guarding.</p>
            </div>

            <div>
              <Label className="text-xs font-medium">High Speed Sprint Threshold</Label>
              <Input
                type="number"
                step="0.5"
                className="mt-1.5 text-xs bg-background"
                value={config.thresholds.maxSpeedZoneKmh}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    thresholds: { ...config.thresholds, maxSpeedZoneKmh: parseFloat(e.target.value) || 25.2 },
                  })
                }
              />
              <p className="text-[10px] text-muted-foreground mt-1">Default 25.2 km/h (Catapult Zone 5 sprinting classification).</p>
            </div>

            <div>
              <Label className="text-xs font-medium">Preferred Units System</Label>
              <select
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={config.thresholds.preferredUnits}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    thresholds: {
                      ...config.thresholds,
                      preferredUnits: e.target.value as "metric" | "imperial",
                    },
                  })
                }
              >
                <option value="metric">Metric (km/h, meters, kg, Nm)</option>
                <option value="imperial">Imperial (mph, yards, lbs, ft-lbs)</option>
              </select>
            </div>
          </div>
        </TabsContent>

        {/* Tab 4 Content: Wearables & Telemetry Integration */}
        <TabsContent value="telemetry" className="p-6 m-0 focus-visible:outline-none space-y-5">
          <div className="bg-secondary/20 p-4 rounded-xl border border-border/60">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
              <Radio className="h-4 w-4 text-emerald-500" />
              Wearable Hardware Feeds &amp; Automated Alerts
            </h3>
            <p className="text-xs text-muted-foreground">
              Select supported telemetry hardware sync providers and set up real-time match alert workflows.
            </p>
          </div>

          <div>
            <Label className="text-xs font-semibold text-foreground block mb-2">Connected Sensor Integrations</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { key: "catapult", name: "Catapult Vector S7", desc: "10Hz GNSS + 1000Hz IMU" },
                { key: "statsports", name: "STATSports Apex", desc: "FIFA approved GPS tracker" },
                { key: "whoop", name: "WHOOP 4.0", desc: "HRV & Recovery strain" },
                { key: "polar", name: "Polar Team Pro", desc: "Live ECG heart rate belts" },
                { key: "oura", name: "Oura Ring Gen3", desc: "Circadian sleep & readiness" },
                { key: "garmin", name: "Garmin HRM-Pro", desc: "Running dynamics & power" },
              ].map((hw) => {
                const isChecked = config.telemetry.wearables[hw.key as keyof typeof config.telemetry.wearables];
                return (
                  <button
                    key={hw.key}
                    type="button"
                    onClick={() =>
                      setConfig({
                        ...config,
                        telemetry: {
                          ...config.telemetry,
                          wearables: {
                            ...config.telemetry.wearables,
                            [hw.key]: !isChecked,
                          },
                        },
                      })
                    }
                    className={`flex items-start gap-2.5 p-3 rounded-lg border text-left transition-all ${
                      isChecked
                        ? "bg-primary/10 border-primary/40 shadow-xs ring-1 ring-primary/20"
                        : "bg-background border-border hover:bg-muted/40"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                        isChecked ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground"
                      }`}
                    >
                      {isChecked && <Check className="h-3 w-3" />}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">{hw.name}</div>
                      <div className="text-[10px] text-muted-foreground">{hw.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <Label className="text-xs font-semibold text-foreground block mb-3">Automated Coaching Notifications</Label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background cursor-pointer hover:bg-muted/30">
                <input
                  type="checkbox"
                  checked={config.telemetry.alertEmail}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      telemetry: { ...config.telemetry, alertEmail: e.target.checked },
                    })
                  }
                  className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                />
                <div>
                  <div className="text-xs font-medium">Email Alert Dispatches</div>
                  <div className="text-[10px] text-muted-foreground">Receive high fatigue spikes via email notification.</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background cursor-pointer hover:bg-muted/30">
                <input
                  type="checkbox"
                  checked={config.telemetry.halftimeAutoReport}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      telemetry: { ...config.telemetry, halftimeAutoReport: e.target.checked },
                    })
                  }
                  className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                />
                <div>
                  <div className="text-xs font-medium">Automated Halftime Report PDF</div>
                  <div className="text-[10px] text-muted-foreground">Compile 45min tactical &amp; stamina report automatically.</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background cursor-pointer hover:bg-muted/30">
                <input
                  type="checkbox"
                  checked={config.telemetry.postMatchPushSummary}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      telemetry: { ...config.telemetry, postMatchPushSummary: e.target.checked },
                    })
                  }
                  className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                />
                <div>
                  <div className="text-xs font-medium">Post-Match Summary Sync</div>
                  <div className="text-[10px] text-muted-foreground">Sync complete telemetry to Google Sheets after final whistle.</div>
                </div>
              </label>

              <div>
                <Label className="text-xs font-medium">Injury Risk Notification Sensitivity</Label>
                <select
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={config.telemetry.injuryRiskAlertLevel}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      telemetry: {
                        ...config.telemetry,
                        injuryRiskAlertLevel: e.target.value as any,
                      },
                    })
                  }
                >
                  <option value="low">Low (Alert on all deviations &gt; 5%)</option>
                  <option value="medium">Medium (Standard corridor violations &gt; 15%)</option>
                  <option value="high">High (Critical acute overload spikes &gt; 25%)</option>
                  <option value="critical">Critical Only (ACWR &gt; 1.50 or severe valgus)</option>
                </select>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-muted/20 flex items-center justify-between mt-auto">
          <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Config state: Synced locally &amp; to Google Sheet (tab: <strong>Sports_User_Config</strong>)</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetToDefault}
              className="text-xs h-8"
            >
              Reset
            </Button>
            <Button
              size="sm"
              onClick={() => handleSave()}
              disabled={saving}
              className="text-xs h-8 font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {saving ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

