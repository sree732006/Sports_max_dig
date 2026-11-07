import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  School,
  Activity,
  Award,
  Users,
  Bell,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  HeartPulse,
  Share2,
  Check,
  FileSpreadsheet,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import {
  type SchoolUserConfig,
  DEFAULT_SCHOOL_CONFIG,
  loadSchoolUserConfig,
  saveSchoolUserConfig,
  syncSchoolUserConfigToGoogleSheets,
} from "@/lib/school-config-service";

const ALL_SPORTS = [
  "Athletics / Track & Field",
  "Football / Soccer",
  "Cricket",
  "Badminton",
  "Basketball",
  "Kho-Kho",
  "Kabaddi",
  "Swimming",
  "Table Tennis",
  "Volleyball",
  "Yoga & Asanas",
];

export function SchoolUserConfigForm() {
  const { user } = useAuth();
  const userId = user?.id || "anonymous-school-pe";
  const userEmail = user?.email || "";
  const userName = user?.name || "";

  const [activeTab, setActiveTab] = useState("institution");
  const [config, setConfig] = useState<SchoolUserConfig>(() =>
    loadSchoolUserConfig(userId, userEmail, userName)
  );
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (user) {
      setConfig(loadSchoolUserConfig(user.id, user.email, user.name));
    }
  }, [user]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      saveSchoolUserConfig(config);
      const res = await syncSchoolUserConfigToGoogleSheets(config);
      if (res.success) {
        setStatusMessage({
          type: "success",
          text: "School configuration saved and synced to Google Sheets (Tab: Schools_User_Config)!",
        });
      } else {
        setStatusMessage({
          type: "info",
          text: "Saved locally. Google Sheets sync pending network availability.",
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Failed to save school configuration.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefault = () => {
    if (confirm("Reset school parameters back to Khelo India & CBSE standard guidelines?")) {
      const resetConfig: SchoolUserConfig = {
        ...DEFAULT_SCHOOL_CONFIG,
        userId,
        userEmail,
        institution: {
          ...DEFAULT_SCHOOL_CONFIG.institution,
          peDirectorName: userName || DEFAULT_SCHOOL_CONFIG.institution.peDirectorName,
          officialEmail: userEmail || DEFAULT_SCHOOL_CONFIG.institution.officialEmail,
        },
      };
      setConfig(resetConfig);
      saveSchoolUserConfig(resetConfig);
      setStatusMessage({
        type: "info",
        text: "Reset back to national standard school PE defaults.",
      });
    }
  };

  const toggleSport = (sport: string) => {
    const list = config.curriculum.primarySports;
    if (list.includes(sport)) {
      setConfig({
        ...config,
        curriculum: {
          ...config.curriculum,
          primarySports: list.filter((s) => s !== sport),
        },
      });
    } else {
      setConfig({
        ...config,
        curriculum: {
          ...config.curriculum,
          primarySports: [...list, sport],
        },
      });
    }
  };

  return (
    <div className="surface-card rounded-2xl border border-border shadow-md overflow-hidden">
      {/* Top Header Card */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-emerald-500/10 via-background to-teal-500/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  Schools_User_Config_Page
                </h1>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  Academic &amp; PE Setup
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Configure school board affiliation, student cohorts, Khelo India fitness criteria, and parent report card sync.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={handleResetToDefault}
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
                  Save School Config
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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6 pt-4 border-b border-border bg-muted/20">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 h-11 w-full bg-muted/50 p-1">
            <TabsTrigger
              value="institution"
              className="text-xs font-semibold flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-xs"
            >
              <School className="h-3.5 w-3.5 text-emerald-500" />
              <span>1. School Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="curriculum"
              className="text-xs font-semibold flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-xs"
            >
              <Users className="h-3.5 w-3.5 text-blue-500" />
              <span>2. Cohorts &amp; Curriculum</span>
            </TabsTrigger>
            <TabsTrigger
              value="benchmarks"
              className="text-xs font-semibold flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-xs"
            >
              <HeartPulse className="h-3.5 w-3.5 text-rose-500" />
              <span>3. Fitness Benchmarks</span>
            </TabsTrigger>
            <TabsTrigger
              value="reporting"
              className="text-xs font-semibold flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-xs"
            >
              <Share2 className="h-3.5 w-3.5 text-amber-500" />
              <span>4. Report Cards &amp; Parents</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1: School Profile */}
        <TabsContent value="institution" className="p-6 m-0 focus-visible:outline-none space-y-5">
          <div className="bg-secondary/20 p-4 rounded-xl border border-border/60">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
              <School className="h-4 w-4 text-emerald-500" />
              Institution &amp; Physical Education Leadership
            </h3>
            <p className="text-xs text-muted-foreground">
              Define the school administrative profile, board affiliation, and primary PE department contact.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs font-medium">School / Academy Name</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.institution.schoolName}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    institution: { ...config.institution, schoolName: e.target.value },
                  })
                }
                placeholder="St. Xavier's International School"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Academic Board / Affiliation</Label>
              <select
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={config.institution.boardAffiliation}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    institution: { ...config.institution, boardAffiliation: e.target.value },
                  })
                }
              >
                <option value="CBSE (Central Board of Secondary Education)">CBSE (Central Board of Secondary Education)</option>
                <option value="ICSE / ISC (Council for the Indian School Certificate)">ICSE / ISC</option>
                <option value="IB (International Baccalaureate)">IB (International Baccalaureate)</option>
                <option value="Cambridge Assessment (IGCSE / A-Levels)">Cambridge Assessment (IGCSE / A-Levels)</option>
                <option value="State Secondary Education Board">State Secondary Education Board</option>
                <option value="National Open School / Independent Academy">National Open School / Independent</option>
              </select>
            </div>

            <div>
              <Label className="text-xs font-medium">School / Campus Affiliation Code</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.institution.schoolCode}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    institution: { ...config.institution, schoolCode: e.target.value },
                  })
                }
                placeholder="CBSE-AFF-193021"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Principal / Head of Institution</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.institution.principalName}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    institution: { ...config.institution, principalName: e.target.value },
                  })
                }
                placeholder="Dr. S. K. Narayanan"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">PE Director / Sports Master Name</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.institution.peDirectorName}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    institution: { ...config.institution, peDirectorName: e.target.value },
                  })
                }
                placeholder="Coach Rajesh Pillai"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Official PE Department Email</Label>
              <Input
                type="email"
                className="mt-1.5 text-xs bg-background"
                value={config.institution.officialEmail}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    institution: { ...config.institution, officialEmail: e.target.value },
                  })
                }
                placeholder="sports@stxaviers.edu"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Contact Phone / Emergency Desk</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.institution.phone}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    institution: { ...config.institution, phone: e.target.value },
                  })
                }
                placeholder="+91 98401 23456"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">City &amp; State / Region</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.institution.city + ", " + config.institution.stateRegion}
                onChange={(e) => {
                  const parts = e.target.value.split(",");
                  setConfig({
                    ...config,
                    institution: {
                      ...config.institution,
                      city: parts[0]?.trim() || "",
                      stateRegion: parts.slice(1).join(",")?.trim() || "",
                    },
                  });
                }}
                placeholder="Chennai, Tamil Nadu"
              />
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Cohorts & Curriculum */}
        <TabsContent value="curriculum" className="p-6 m-0 focus-visible:outline-none space-y-5">
          <div className="bg-secondary/20 p-4 rounded-xl border border-border/60">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-blue-500" />
              Student Cohorts, Frequency &amp; Sports Disciplines
            </h3>
            <p className="text-xs text-muted-foreground">
              Define student grade bands, weekly PE timetable periods, and inter-school competitive disciplines.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs font-medium">Grade Bands Covered</Label>
              <select
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={config.curriculum.gradeBands}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    curriculum: { ...config.curriculum, gradeBands: e.target.value },
                  })
                }
              >
                <option value="Primary (Grades 1 to 5)">Primary (Grades 1 to 5, Ages 6-10)</option>
                <option value="Middle School (Grades 6 to 8)">Middle School (Grades 6 to 8, Ages 11-13)</option>
                <option value="Secondary & Senior (Grades 9 to 12)">Secondary &amp; Senior (Grades 9 to 12, Ages 14-18)</option>
                <option value="Complete K-12 Program (Grades 1 to 12)">Complete K-12 Program (Grades 1 to 12)</option>
              </select>
            </div>

            <div>
              <Label className="text-xs font-medium">Total Student Athletes Enrolled</Label>
              <select
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={config.curriculum.totalStudentAthletes}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    curriculum: { ...config.curriculum, totalStudentAthletes: e.target.value },
                  })
                }
              >
                <option value="Under 100 students">Under 100 students</option>
                <option value="100-250 students">100-250 students</option>
                <option value="250-500 students">250-500 students</option>
                <option value="500-1000 students">500-1,000 students</option>
                <option value="1000+ students">1,000+ students</option>
              </select>
            </div>

            <div>
              <Label className="text-xs font-medium">Weekly PE Period Frequency</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.curriculum.sessionFrequency}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    curriculum: { ...config.curriculum, sessionFrequency: e.target.value },
                  })
                }
                placeholder="3 Periods per week (45 mins each)"
              />
            </div>

            <div>
              <Label className="text-xs font-medium">Annual Sports Meet Month</Label>
              <select
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={config.curriculum.annualSportsMeetMonth}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    curriculum: { ...config.curriculum, annualSportsMeetMonth: e.target.value },
                  })
                }
              >
                {["January", "February", "July", "August", "September", "October", "November", "December"].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold text-foreground block mb-2">
              Primary Sports Curriculum Disciplines (Select all that apply)
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {ALL_SPORTS.map((sport) => {
                const isSelected = config.curriculum.primarySports.includes(sport);
                return (
                  <button
                    key={sport}
                    type="button"
                    onClick={() => toggleSport(sport)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-left text-xs transition-all ${
                      isSelected
                        ? "bg-emerald-500/10 border-emerald-500/40 text-foreground font-semibold shadow-xs"
                        : "bg-background border-border text-muted-foreground hover:bg-muted/40"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded flex items-center justify-center shrink-0 border ${
                        isSelected ? "bg-emerald-600 border-emerald-600 text-white" : "border-muted-foreground"
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <span className="truncate">{sport}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label className="text-xs font-medium">On-Campus Sports Infrastructure &amp; Facilities</Label>
            <Input
              className="mt-1.5 text-xs bg-background"
              value={config.curriculum.facilitiesAvailable}
              onChange={(e) =>
                setConfig({
                  ...config,
                  curriculum: { ...config.curriculum, facilitiesAvailable: e.target.value },
                })
              }
              placeholder="400m synthetic running track, 2 covered badminton courts, standard football ground"
            />
          </div>
        </TabsContent>

        {/* Tab 3: Fitness Benchmarks */}
        <TabsContent value="benchmarks" className="p-6 m-0 focus-visible:outline-none space-y-5">
          <div className="bg-secondary/20 p-4 rounded-xl border border-border/60">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
              <HeartPulse className="h-4 w-4 text-rose-500" />
              Youth Fitness Benchmarks &amp; Health Screening
            </h3>
            <p className="text-xs text-muted-foreground">
              Calibrated to Government of India Khelo India Fitness Standards, Presidential Youth Fitness, and pediatric motor safety.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-xs text-foreground">Standard Evaluation Framework</span>
              <span className="text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono px-2 py-0.5 rounded font-bold uppercase">
                {config.benchmarks.fitnessStandard.replace("_", " ")}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Evaluates Aerobic Capacity (Beep Test / PACER), Anaerobic Speed (50m Dash), Posterior Chain Flexibility (Sit &amp; Reach), and BMI percentiles.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs font-medium">National Evaluation Standard</Label>
              <select
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={config.benchmarks.fitnessStandard}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    benchmarks: {
                      ...config.benchmarks,
                      fitnessStandard: e.target.value as any,
                    },
                  })
                }
              >
                <option value="khelo_india">Khelo India National Fitness Assessment (Ministry of Youth Affairs & Sports)</option>
                <option value="presidential_youth">Presidential Youth Fitness Program (PYFP)</option>
                <option value="eurofit">EUROFIT Physical Fitness Test Battery</option>
                <option value="custom">Custom Academy School Standards</option>
              </select>
            </div>

            <div>
              <Label className="text-xs font-medium">Multi-Stage Beep Test (PACER) Passing Level</Label>
              <Input
                type="number"
                step="0.5"
                className="mt-1.5 text-xs bg-background"
                value={config.benchmarks.beepTestPassPacer}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    benchmarks: {
                      ...config.benchmarks,
                      beepTestPassPacer: parseFloat(e.target.value) || 6.5,
                    },
                  })
                }
              />
              <p className="text-[10px] text-muted-foreground mt-1">Default 7.0 shuttle level for secondary boys/girls.</p>
            </div>

            <div>
              <Label className="text-xs font-medium">50-Meter Sprint Benchmark (Seconds)</Label>
              <Input
                type="number"
                step="0.1"
                className="mt-1.5 text-xs bg-background"
                value={config.benchmarks.sprint50mSeconds}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    benchmarks: {
                      ...config.benchmarks,
                      sprint50mSeconds: parseFloat(e.target.value) || 8.4,
                    },
                  })
                }
              />
              <p className="text-[10px] text-muted-foreground mt-1">Passing threshold for anaerobic sprint acceleration.</p>
            </div>

            <div>
              <Label className="text-xs font-medium">Sit &amp; Reach Flexibility Benchmark (cm)</Label>
              <Input
                type="number"
                step="0.5"
                className="mt-1.5 text-xs bg-background"
                value={config.benchmarks.sitAndReachCm}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    benchmarks: {
                      ...config.benchmarks,
                      sitAndReachCm: parseFloat(e.target.value) || 25,
                    },
                  })
                }
              />
              <p className="text-[10px] text-muted-foreground mt-1">Evaluates hamstring and lumbar spine flexibility.</p>
            </div>

            <div>
              <Label className="text-xs font-medium">Outdoor Wet Bulb Heat Index Limit (°C)</Label>
              <Input
                type="number"
                step="0.5"
                className="mt-1.5 text-xs bg-background"
                value={config.benchmarks.hydrationHeatIndexLimitC}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    benchmarks: {
                      ...config.benchmarks,
                      hydrationHeatIndexLimitC: parseFloat(e.target.value) || 37.5,
                    },
                  })
                }
              />
              <p className="text-[10px] text-muted-foreground mt-1">Automatically flags cancellation of strenuous outdoor sessions.</p>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.benchmarks.bmiScreeningAlerts}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      benchmarks: {
                        ...config.benchmarks,
                        bmiScreeningAlerts: e.target.checked,
                      },
                    })
                  }
                  className="rounded border-input text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <div>
                  <div className="text-xs font-medium">BMI &amp; Growth Percentile Screening</div>
                  <div className="text-[10px] text-muted-foreground">Alerts on underweight and pediatric obesity percentiles.</div>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.benchmarks.postureGaitScreening}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      benchmarks: {
                        ...config.benchmarks,
                        postureGaitScreening: e.target.checked,
                      },
                    })
                  }
                  className="rounded border-input text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <div>
                  <div className="text-xs font-medium">Posture &amp; Gait Screening (AI Vision)</div>
                  <div className="text-[10px] text-muted-foreground">Detect spinal asymmetry, flat feet, or abnormal knee valgus in PE drills.</div>
                </div>
              </label>
            </div>
          </div>
        </TabsContent>

        {/* Tab 4: Parent Report Cards & Communication */}
        <TabsContent value="reporting" className="p-6 m-0 focus-visible:outline-none space-y-5">
          <div className="bg-secondary/20 p-4 rounded-xl border border-border/60">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-1">
              <Share2 className="h-4 w-4 text-amber-500" />
              PE Report Cards &amp; Parent Communication
            </h3>
            <p className="text-xs text-muted-foreground">
              Automate digital sports report cards, parent WhatsApp/Email progress updates, and term evaluations.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background cursor-pointer hover:bg-muted/30">
              <input
                type="checkbox"
                checked={config.reporting.autoGenerateReportCardPdf}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    reporting: {
                      ...config.reporting,
                      autoGenerateReportCardPdf: e.target.checked,
                    },
                  })
                }
                className="rounded border-input text-emerald-600 focus:ring-emerald-500 h-4 w-4"
              />
              <div>
                <div className="text-xs font-medium">Auto-Generate PDF Report Cards</div>
                <div className="text-[10px] text-muted-foreground">Produces printable term PE fitness certificates.</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background cursor-pointer hover:bg-muted/30">
              <input
                type="checkbox"
                checked={config.reporting.parentWhatsAppSync}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    reporting: {
                      ...config.reporting,
                      parentWhatsAppSync: e.target.checked,
                    },
                  })
                }
                className="rounded border-input text-emerald-600 focus:ring-emerald-500 h-4 w-4"
              />
              <div>
                <div className="text-xs font-medium">Parent WhatsApp Notifications</div>
                <div className="text-[10px] text-muted-foreground">Sends individual student progress cards to parents.</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background cursor-pointer hover:bg-muted/30">
              <input
                type="checkbox"
                checked={config.reporting.parentEmailDispatch}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    reporting: {
                      ...config.reporting,
                      parentEmailDispatch: e.target.checked,
                    },
                  })
                }
                className="rounded border-input text-emerald-600 focus:ring-emerald-500 h-4 w-4"
              />
              <div>
                <div className="text-xs font-medium">Email Dispatch to Parents</div>
                <div className="text-[10px] text-muted-foreground">Official term-end progress report emailed to parents.</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background cursor-pointer hover:bg-muted/30">
              <input
                type="checkbox"
                checked={config.reporting.includeGrowthTracking}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    reporting: {
                      ...config.reporting,
                      includeGrowthTracking: e.target.checked,
                    },
                  })
                }
                className="rounded border-input text-emerald-600 focus:ring-emerald-500 h-4 w-4"
              />
              <div>
                <div className="text-xs font-medium">Growth &amp; Height Velocity Tracking</div>
                <div className="text-[10px] text-muted-foreground">Track adolescent peak height velocity (PHV) changes.</div>
              </div>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            <div>
              <Label className="text-xs font-medium">Report Card Dispatch Frequency</Label>
              <select
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={config.reporting.reportFrequency}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    reporting: {
                      ...config.reporting,
                      reportFrequency: e.target.value as any,
                    },
                  })
                }
              >
                <option value="termly">Termly (3 times per academic year)</option>
                <option value="monthly">Monthly PE Progress Snapshot</option>
                <option value="annual">Annual Sports Day Comprehensive Dossier</option>
              </select>
            </div>

            <div>
              <Label className="text-xs font-medium">Notes &amp; PE Recommendations to Parents</Label>
              <Input
                className="mt-1.5 text-xs bg-background"
                value={config.reporting.notesToParents}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    reporting: {
                      ...config.reporting,
                      notesToParents: e.target.value,
                    },
                  })
                }
                placeholder="Encourage 60 minutes of daily physical active play..."
              />
            </div>
          </div>
        </TabsContent>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Target Google Sheet tab: <strong>Schools_User_Config</strong> (Spreadsheet ID: 1fVDwq...)</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleResetToDefault} className="text-xs h-8">
              Reset
            </Button>
            <Button
              size="sm"
              onClick={() => handleSave()}
              disabled={saving}
              className="text-xs h-8 font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {saving ? "Saving..." : "Save Configuration"}
            </Button>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

