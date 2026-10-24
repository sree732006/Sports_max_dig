import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Flame,
  Gauge,
  HeartPulse,
  Scale,
  Shield,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BarChartCard,
  DemoBadge,
  LineChartCard,
  MetricCard,
  PageIntro,
  SectionHead,
} from "@/components/sports-ui";
import { athletes, runTrend, weekly } from "@/lib/sports-data";
import arenaImage from "@/assets/sports_tactical_arena_1792572299956.jpg";

type CoachesTab = "team-dashboard" | "roster" | "comparison" | "load" | "injury";

export const Route = createFileRoute("/coaches")({
  validateSearch: (search: Record<string, unknown>): { tab?: CoachesTab } => {
    const validTabs: CoachesTab[] = ["team-dashboard", "roster", "comparison", "load", "injury"];
    const rawTab = search["tab"];
    if (typeof rawTab === "string" && validTabs.includes(rawTab as CoachesTab)) {
      return { tab: rawTab as CoachesTab };
    }
    return {};
  },
  head: () => ({
    meta: [
      { title: "Coaching Services & Squad Load Governance — SportsMax" },
      {
        name: "description",
        content:
          "Enterprise coaching systems: Squad readiness index, dynamic roster availability, multi-athlete radar comparisons, and automated soft-tissue injury prevention.",
      },
    ],
  }),
  component: CoachesPage,
});

const rosterMembers = [
  { name: "Aisha Raman", status: "Optimal", acwr: "1.08", weeklyLoad: "480 AU", injuryRisk: "Low (4%)", position: "Mid-distance", vo2: "58.4 ml/kg", readiness: "94%" },
  { name: "Maya Chen", status: "Optimal", acwr: "1.12", weeklyLoad: "510 AU", injuryRisk: "Low (6%)", position: "Speed / Jumps", vo2: "54.8 ml/kg", readiness: "91%" },
  { name: "Leo Martins", status: "Warning: Spike", acwr: "1.42", weeklyLoad: "640 AU", injuryRisk: "Elevated (24%)", position: "Sprint / Relay", vo2: "62.1 ml/kg", readiness: "68%" },
  { name: "Noah Williams", status: "Deloading", acwr: "0.82", weeklyLoad: "320 AU", injuryRisk: "Low (2%)", position: "Endurance", vo2: "66.5 ml/kg", readiness: "88%" },
  { name: "Elena Rostova", status: "Optimal", acwr: "1.18", weeklyLoad: "535 AU", injuryRisk: "Low (5%)", position: "Middle Distance", vo2: "59.2 ml/kg", readiness: "95%" },
  { name: "Marcus Vance", status: "Optimal", acwr: "1.04", weeklyLoad: "460 AU", injuryRisk: "Low (3%)", position: "Hurdles / Decathlon", vo2: "61.0 ml/kg", readiness: "92%" },
];

export function CoachesPage() {
  const search = Route.useSearch();
  const [activeTab, setActiveTab] = useState<CoachesTab>(search.tab || "team-dashboard");

  useEffect(() => {
    if (search.tab && search.tab !== activeTab) {
      setActiveTab(search.tab);
    }
  }, [search.tab]);

  return (
    <>
      <PageIntro
        eyebrow="Solutions · Coaching Services"
        title="Squad Intelligence, Workload Governance & Tactical Readiness"
        text="A unified command suite for physical performance directors, tactical coaches, and sports medical teams. Govern roster depth charts, balance training microcycles, and detect soft-tissue risk before injury occurs."
        action={
          <div className="flex flex-col items-end gap-3">
            <DemoBadge />
            <div className="flex flex-wrap gap-1 bg-secondary/80 backdrop-blur-sm p-1 rounded-lg border border-border">
              {[
                { id: "team-dashboard", label: "Team Dashboard" },
                { id: "roster", label: "Roster Management" },
                { id: "comparison", label: "Athlete Comparison" },
                { id: "load", label: "Workload Governance" },
                { id: "injury", label: "Injury Prevention" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as CoachesTab)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-xs font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        }
      />

      {/* Squad Performance KPI Bar */}
      <section className="border-y border-border/80 bg-card/60 py-4 backdrop-blur-md">
        <div className="content-wrap">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-primary font-mono tracking-tight">88.4%</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Squad Readiness</div>
            </div>
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-foreground font-mono tracking-tight">28 / 30</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Active Roster</div>
            </div>
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-primary font-mono tracking-tight">1.08 ACWR</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Squad Sweet Spot</div>
            </div>
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-foreground font-mono tracking-tight">1 Active</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Spike Alert</div>
            </div>
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-primary font-mono tracking-tight">96.2%</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Training Adherence</div>
            </div>
            <div className="p-2">
              <div className="text-xl lg:text-2xl font-black text-foreground font-mono tracking-tight">0 Missed</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Match Days</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Panels */}
      <section className="py-12 bg-background min-h-[600px]">
        <div className="content-wrap">
          {/* TAB 1: TEAM DASHBOARD */}
          {activeTab === "team-dashboard" && (
            <div className="grid gap-12">
              <SectionHead
                eyebrow="Squad Command Center"
                title="Consolidated Team Health & Tactical Readiness"
                text="Morning biometric rollups synchronizing HRV readiness, sleep staging, ACWR mechanical load, and training block progression across full squads."
              />

              {/* Arena Showcase Banner */}
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-xl bg-card">
                <img
                  src={arenaImage}
                  alt="SportsMax Tactical Arena and Squad Management"
                  className="w-full h-[320px] object-cover object-center filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex flex-col justify-end p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
                      Live Sideline Command
                    </span>
                    <span className="text-xs text-muted-foreground">Premier Division Standard</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    Synchronized Squad Biomechanics &amp; Tactical Positioning
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-2xl mt-1">
                    Delivers real-time physiological feedback directly to bench tablets, alerting fitness coaches to non-contact injury vulnerability during live competitive play.
                  </p>
                </div>
              </div>

              {/* Key Diagnostic Metrics */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard label="Average Squad ACWR" value="1.08" note="Optimal sweet spot range" icon={<Activity className="h-4 w-4 text-primary" />} />
                <MetricCard label="Readiness Index" value="88.4%" note="26 athletes primed for intensity" icon={<UserCheck className="h-4 w-4 text-accent" />} />
                <MetricCard label="Weekly Training Volume" value="14,280 AU" note="98% planned macrocycle" icon={<BarChart2 className="h-4 w-4 text-emerald-500" />} />
                <MetricCard label="Soft-Tissue Risk Alerts" value="1 Athlete" note="Requires 48-hr deload" icon={<AlertTriangle className="h-4 w-4 text-amber-500" />} />
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <BarChartCard title="Weekly Training Volume by Training Block (AU)" data={weekly} />
                <LineChartCard title="Squad Heart Rate Recovery &amp; Pace Velocity" data={runTrend} keys={["pace", "heart"]} />
              </div>
            </div>
          )}

          {/* TAB 2: ROSTER MANAGEMENT */}
          {activeTab === "roster" && (
            <div className="grid gap-8">
              <SectionHead
                eyebrow="Roster Intelligence"
                title="Squad Availability, Load Status &amp; Biometrics"
                text="Automated morning status rollups derived from wearable telemetry, resting HRV, and recent high-speed running exposure."
                action={<Button size="sm">Export Depth Chart CSV</Button>}
              />

              <div className="surface-card overflow-hidden">
                <div className="p-5 border-b border-border bg-secondary/30 flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Current Active Squad: 6 Tracked Athletes</span>
                  <span className="text-xs font-mono text-primary font-bold">Live Synced 2m Ago</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-secondary/70 text-muted-foreground font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-3.5">Athlete</th>
                        <th className="px-6 py-3.5">Discipline / Role</th>
                        <th className="px-6 py-3.5">ACWR Load</th>
                        <th className="px-6 py-3.5">Weekly AU</th>
                        <th className="px-6 py-3.5">VO2 Max</th>
                        <th className="px-6 py-3.5">Readiness</th>
                        <th className="px-6 py-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {rosterMembers.map((r) => (
                        <tr key={r.name} className="hover:bg-secondary/30 transition">
                          <td className="px-6 py-3.5 font-bold text-foreground">{r.name}</td>
                          <td className="px-6 py-3.5 text-muted-foreground">{r.position}</td>
                          <td className="px-6 py-3.5 font-mono font-bold text-foreground">{r.acwr}</td>
                          <td className="px-6 py-3.5 font-mono text-foreground">{r.weeklyLoad}</td>
                          <td className="px-6 py-3.5 font-mono text-muted-foreground">{r.vo2}</td>
                          <td className="px-6 py-3.5 font-mono font-bold text-primary">{r.readiness}</td>
                          <td className="px-6 py-3.5">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold inline-flex items-center gap-1 ${
                                r.status.includes("Warning")
                                  ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                  : r.status === "Deloading"
                                  ? "bg-accent/10 text-accent border border-accent/20"
                                  : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                              }`}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-current" />
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ATHLETE COMPARISON */}
          {activeTab === "comparison" && (
            <div className="grid gap-8">
              <SectionHead
                eyebrow="Comparative Analysis"
                title="Dual Athlete Diagnostic &amp; Benchmark Matrix"
                text="Cross-evaluate two athletes across physiological capacities, acute workload tolerance, and sprint mechanics."
              />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="surface-card p-6 border-t-4 border-t-primary">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Candidate A · Speed / Middle</span>
                    <span className="rounded bg-primary/10 text-primary px-2 py-0.5 text-xs font-mono font-bold">88th Percentile</span>
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Aisha Raman</h4>
                  <p className="text-xs text-muted-foreground mt-1">Mid-distance specialist with high cardiovascular clearance</p>

                  <div className="mt-6 space-y-3 border-t border-border pt-4 text-xs">
                    <div className="flex justify-between py-1 border-b border-border/50">
                      <span className="text-muted-foreground">VO2 Max Capacity</span>
                      <span className="font-mono font-bold text-foreground">58.4 ml/kg/min</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/50">
                      <span className="text-muted-foreground">10K Race Benchmark</span>
                      <span className="font-mono font-bold text-foreground">44:12</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/50">
                      <span className="text-muted-foreground">Resting HRV (rMSSD)</span>
                      <span className="font-mono font-bold text-foreground">72 ms</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Sprint Clearance</span>
                      <span className="font-mono font-bold text-emerald-500">44 bpm/min (Fast)</span>
                    </div>
                  </div>
                </div>

                <div className="surface-card p-6 border-t-4 border-t-accent">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">Candidate B · Power / Sprints</span>
                    <span className="rounded bg-accent/10 text-accent px-2 py-0.5 text-xs font-mono font-bold">85th Percentile</span>
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Maya Chen</h4>
                  <p className="text-xs text-muted-foreground mt-1">Explosive power profile with high ground reaction torque</p>

                  <div className="mt-6 space-y-3 border-t border-border pt-4 text-xs">
                    <div className="flex justify-between py-1 border-b border-border/50">
                      <span className="text-muted-foreground">VO2 Max Capacity</span>
                      <span className="font-mono font-bold text-foreground">54.8 ml/kg/min</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/50">
                      <span className="text-muted-foreground">10K Race Benchmark</span>
                      <span className="font-mono font-bold text-foreground">45:30</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/50">
                      <span className="text-muted-foreground">Resting HRV (rMSSD)</span>
                      <span className="font-mono font-bold text-foreground">64 ms</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Sprint Clearance</span>
                      <span className="font-mono font-bold text-emerald-500">38 bpm/min (Moderate)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WORKLOAD GOVERNANCE */}
          {activeTab === "load" && (
            <div className="grid gap-8">
              <SectionHead
                eyebrow="Workload Governance"
                title="Microcycle Periodization &amp; Progression Guardrails"
                text="Automated monitoring guarantees weekly running volume and sprint exposures stay within safe adaptation limits without triggering fatigue stagnation."
              />

              <div className="surface-card p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-bold text-base text-foreground">Acute vs. Chronic Load Progression Guardrails</h3>
                    <p className="text-xs text-muted-foreground mt-1">Continuous rolling tracking across full squad macrocycles</p>
                  </div>
                  <span className="px-3 py-1 rounded bg-primary/10 text-primary font-mono text-xs font-bold border border-primary/25">
                    98.2% SQUAD COMPLIANCE
                  </span>
                </div>

                <div className="h-44 bg-secondary/50 rounded-xl border border-border flex flex-col items-center justify-center p-6 text-center">
                  <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
                  <span className="font-semibold text-foreground text-sm">
                    All Squad Training Blocks Mapped to Safe Sweet Spot Corridor (0.80 – 1.30 ACWR)
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    Zero catastrophic overload spikes detected across rolling 28-day chronic volume.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: INJURY RISK PREVENTION */}
          {activeTab === "injury" && (
            <div className="grid gap-8">
              <SectionHead
                eyebrow="Proactive Prevention"
                title="Soft-Tissue Injury Risk Mitigation &amp; Early Warnings"
                text="Machine learning models analyze asymmetric ground contact times, sudden sprint volume surges, and HRV depression to predict fatigue before clinical symptoms appear."
              />

              <div className="surface-card p-6 md:p-8 border-l-4 border-l-destructive">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-destructive font-bold text-sm uppercase tracking-wider">
                    <ShieldAlert className="h-5 w-5" /> High Risk Alert: Leo Martins
                  </div>
                  <span className="rounded-full bg-destructive/10 text-destructive border border-destructive/20 px-3 py-1 text-xs font-bold">
                    Elevated Risk (24%)
                  </span>
                </div>
                <p className="text-xs md:text-sm text-foreground leading-relaxed">
                  Leo's acute sprint volume increased by <strong>+38%</strong> over the past 4 days, resulting in an ACWR spike to <strong>1.42</strong>.
                  Kinematic tracking detected an asymmetric ground contact balance shift of <strong>3.8%</strong> toward the right leg.
                </p>

                <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-muted-foreground font-mono">Prescription: Deload high-velocity sprints for 48 hours; assign eccentric hamstring work.</span>
                  <Button size="sm" variant="destructive">
                    Notify Athlete &amp; Physiotherapist
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Coaches Bottom CTA */}
      <section className="py-16 border-t border-border bg-card/40 backdrop-blur-md">
        <div className="content-wrap">
          <div className="surface-card p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20 inline-block mb-4">
                High-Performance Programs
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mb-4">
                Explore Olympic &amp; Elite National Programs
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Discover how National Olympic Committees and elite academies scale SportsMax across multi-sport quadrennials.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <Link to="/ecosystem">
                    View Olympic Programs <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/platform" search={{ tab: "security" }}>
                    WADA &amp; EHR Security Specs
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
