import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BarChart2,
  BrainCircuit,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Database,
  FileBarChart2,
  Flame,
  Gauge,
  HeartPulse,
  Layers,
  LineChart as LineChartIcon,
  RotateCcw,
  Shield,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AreaChartCard,
  BarChartCard,
  DemoBadge,
  InsightCard,
  LineChartCard,
  MetricCard,
  PageIntro,
  SectionHead,
} from "@/components/sports-ui";
import { insights, progression, recommendations, runTrend, weekly } from "@/lib/sports-data";
import labImage from "@/assets/athlete_biometrics_lab_1792572320926.jpg";
import clusterImage from "@/assets/ai_sports_cluster_1792572342884.jpg";

type AnalyticsTab = "performance" | "load-recovery" | "comparative" | "trends" | "ai-recs";

export const Route = createFileRoute("/analytics")({
  validateSearch: (search: Record<string, unknown>): { tab?: AnalyticsTab } => {
    const validTabs: AnalyticsTab[] = ["performance", "load-recovery", "comparative", "trends", "ai-recs"];
    const rawTab = search["tab"];
    if (typeof rawTab === "string" && validTabs.includes(rawTab as AnalyticsTab)) {
      return { tab: rawTab as AnalyticsTab };
    }
    return {};
  },
  head: () => ({
    meta: [
      { title: "Enterprise Sports Analytics & Machine Learning Models — SportsMax" },
      {
        name: "description",
        content:
          "Advanced sports intelligence: Real-time cardiac drift calculation, acute-to-chronic workload ratios (ACWR), fatigue degradation curves, and AI prescriptive microcycle coaching cues.",
      },
    ],
  }),
  component: AnalyticsSuitePage,
});

export function AnalyticsSuitePage() {
  const search = Route.useSearch();
  const [activeTab, setActiveTab] = useState<AnalyticsTab>(search.tab || "performance");

  useEffect(() => {
    if (search.tab && search.tab !== activeTab) {
      setActiveTab(search.tab);
    }
  }, [search.tab]);

  return (
    <>
      <PageIntro
        eyebrow="Solutions · Analytics Services"
        title="Predictive Athletic Modeling & Automated Prescriptions"
        text="Transform high-frequency tracking streams and physiological telemetry into deterministic performance signals: sub-second ACWR load governance, fatigue velocity decay models, and cohort benchmarking."
        action={
          <div className="flex flex-col items-end gap-3">
            <DemoBadge />
            <div className="flex flex-wrap gap-1 bg-secondary/80 backdrop-blur-sm p-1 rounded-lg border border-border">
              {[
                { id: "performance", label: "Performance Insights" },
                { id: "load-recovery", label: "Training Load & Recovery" },
                { id: "comparative", label: "Comparative Analytics" },
                { id: "trends", label: "Macrocycle Trends" },
                { id: "ai-recs", label: "AI Recommendations" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as AnalyticsTab)}
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

      {/* Analytics KPI Ribbon */}
      <section className="border-y border-border/80 bg-card/60 py-4 backdrop-blur-md">
        <div className="content-wrap">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-primary font-mono tracking-tight">1.09 ACWR</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Optimal Sweet Spot</div>
            </div>
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-foreground font-mono tracking-tight">92 / 100</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Readiness Index</div>
            </div>
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-primary font-mono tracking-tight">-42%</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Soft-Tissue Risk</div>
            </div>
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-foreground font-mono tracking-tight">68ms</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Resting HRV rMSSD</div>
            </div>
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-primary font-mono tracking-tight">99.4%</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Model Reliability</div>
            </div>
            <div className="p-2">
              <div className="text-xl lg:text-2xl font-black text-foreground font-mono tracking-tight">&lt; 15ms</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Signal Processing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tab Panels */}
      <section className="py-12 bg-background min-h-[600px]">
        <div className="content-wrap">
          {/* TAB 1: PERFORMANCE INSIGHTS */}
          {activeTab === "performance" && (
            <div className="grid gap-12">
              <SectionHead
                eyebrow="Diagnostic Signals"
                title="Automated Performance Intelligence Signals"
                text="Generated autonomously across each session by synchronizing ground velocity, optical cadence, and cardiac output."
              />

              {/* Lab Visual Showcase */}
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-xl bg-card">
                <img
                  src={labImage}
                  alt="SportsMax Biomechanics Diagnostic Facility"
                  className="w-full h-[320px] object-cover object-center filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex flex-col justify-end p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
                      Live Telemetry Synthesis
                    </span>
                    <span className="text-xs text-muted-foreground">Olympic Lab Baseline Calibrated</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    Cardiac Drift vs. Mechanical Power Equilibrium
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-2xl mt-1">
                    Detects micro-inefficiencies in gait economy and energy expenditure before physical fatigue manifests outwardly to the coaching staff.
                  </p>
                </div>
              </div>

              {/* Diagnostic Signal Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {insights.map((item) => (
                  <InsightCard key={item.title} {...item} />
                ))}
              </div>

              {/* Interactive Performance Charts */}
              <div className="grid gap-6 lg:grid-cols-2">
                <LineChartCard title="Pace Adaptation vs Cardiac Decoupling" data={runTrend} keys={["pace", "heart"]} unit="" />
                <AreaChartCard title="Progression Index & Aerobic Capacity (6 Months)" data={progression} />
              </div>
            </div>
          )}

          {/* TAB 2: TRAINING LOAD & RECOVERY */}
          {activeTab === "load-recovery" && (
            <div className="grid gap-12">
              <SectionHead
                eyebrow="Biometrics & Load Governance"
                title="Acute-to-Chronic Workload Ratio (ACWR) Engine"
                text="Prevent overtraining syndroms and soft-tissue injury spikes by maintaining squad load strictly within the optimal adaptation sweet spot (0.8 - 1.3 ACWR)."
              />

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  label="Acute Workload (7 Days)"
                  value="524 AU"
                  note="Optimal training stimulus"
                  icon={<Flame className="h-4 w-4 text-primary" />}
                />
                <MetricCard
                  label="Chronic Workload (28 Days)"
                  value="480 AU"
                  note="Established fitness base"
                  icon={<Activity className="h-4 w-4 text-accent" />}
                />
                <MetricCard
                  label="ACWR Ratio Index"
                  value="1.09"
                  note="Sweet spot corridor (0.80 - 1.30)"
                  icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
                />
                <MetricCard
                  label="Autonomic Readiness"
                  value="92 / 100"
                  note="Resting HRV: 68ms · Fully primed"
                  icon={<HeartPulse className="h-4 w-4 text-primary" />}
                />
              </div>

              {/* Deep Load Distribution Diagnostic Box */}
              <div className="surface-card p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="font-bold text-lg text-foreground">Physiological Adaptation Sweet Spot Corridor</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Rolling 28-day exponential moving average (EWMA) tracking of high-speed running distance and mechanical load.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
                    STATUS: ZERO RISK OF SPIKE
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-border bg-card/60">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Under-Training Zone (&lt; 0.80)</span>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      Fitness decay, detraining markers, and reduced physical resistance to future match intensity spikes.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border-2 border-primary/40 bg-primary/5">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Sweet Spot (0.80 – 1.30)</span>
                    <p className="mt-2 text-xs text-foreground font-medium leading-relaxed">
                      Maximizes athletic performance adaptation while minimizing injury incidence. Current Squad Score: <strong className="text-primary font-mono">1.09</strong>.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-card/60">
                    <span className="text-xs font-bold text-destructive uppercase tracking-wider">Danger Zone (&gt; 1.50)</span>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      Acute workload spike drastically increases probability of non-contact hamstring, groin, and calf strains.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMPARATIVE ANALYTICS */}
          {activeTab === "comparative" && (
            <div className="grid gap-12">
              <SectionHead
                eyebrow="Cohort Benchmarks"
                title="Comparative Cohort & Division Benchmarks"
                text="Calibrate raw athlete outputs against top 10% elite collegiate, Olympic, and professional benchmarks across power, pace, and recovery indices."
              />

              <div className="surface-card overflow-hidden">
                <div className="p-5 border-b border-border bg-secondary/30 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-foreground">Peer Division Benchmarking Matrix</h3>
                    <p className="text-xs text-muted-foreground">Standardized against 14,200 verified competitive athletes</p>
                  </div>
                  <span className="text-xs font-mono text-primary font-bold">Division 1 / Olympic Pool</span>
                </div>

                <table className="w-full text-left text-xs">
                  <thead className="bg-secondary/70 text-muted-foreground font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Metric &amp; Modality</th>
                      <th className="px-6 py-3.5">Athlete Score</th>
                      <th className="px-6 py-3.5">Cohort Median</th>
                      <th className="px-6 py-3.5">Top 10% Elite Tier</th>
                      <th className="px-6 py-3.5">Percentile Rank</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-secondary/30 transition">
                      <td className="px-6 py-3.5 font-bold">10K Aerobic Race Pace</td>
                      <td className="px-6 py-3.5 font-mono text-primary font-bold">4:58 /km</td>
                      <td className="px-6 py-3.5 font-mono text-muted-foreground">5:45 /km</td>
                      <td className="px-6 py-3.5 font-mono text-foreground">4:40 /km</td>
                      <td className="px-6 py-3.5 font-bold text-primary">88th Percentile</td>
                    </tr>
                    <tr className="hover:bg-secondary/30 transition">
                      <td className="px-6 py-3.5 font-bold">Monthly Mileage &amp; Volume</td>
                      <td className="px-6 py-3.5 font-mono text-primary font-bold">124 km</td>
                      <td className="px-6 py-3.5 font-mono text-muted-foreground">85 km</td>
                      <td className="px-6 py-3.5 font-mono text-foreground">140 km</td>
                      <td className="px-6 py-3.5 font-bold text-primary">91st Percentile</td>
                    </tr>
                    <tr className="hover:bg-secondary/30 transition">
                      <td className="px-6 py-3.5 font-bold">Weekly Schedule Consistency</td>
                      <td className="px-6 py-3.5 font-mono text-primary font-bold">94%</td>
                      <td className="px-6 py-3.5 font-mono text-muted-foreground">72%</td>
                      <td className="px-6 py-3.5 font-mono text-foreground">92%</td>
                      <td className="px-6 py-3.5 font-bold text-primary">95th Percentile</td>
                    </tr>
                    <tr className="hover:bg-secondary/30 transition">
                      <td className="px-6 py-3.5 font-bold">Sprint Recovery Clearance (HRR)</td>
                      <td className="px-6 py-3.5 font-mono text-primary font-bold">42 bpm/min</td>
                      <td className="px-6 py-3.5 font-mono text-muted-foreground">28 bpm/min</td>
                      <td className="px-6 py-3.5 font-mono text-foreground">46 bpm/min</td>
                      <td className="px-6 py-3.5 font-bold text-primary">89th Percentile</td>
                    </tr>
                    <tr className="hover:bg-secondary/30 transition">
                      <td className="px-6 py-3.5 font-bold">Peak Concentric Power Output</td>
                      <td className="px-6 py-3.5 font-mono text-primary font-bold">64.2 W/kg</td>
                      <td className="px-6 py-3.5 font-mono text-muted-foreground">48.5 W/kg</td>
                      <td className="px-6 py-3.5 font-mono text-foreground">68.0 W/kg</td>
                      <td className="px-6 py-3.5 font-bold text-primary">92nd Percentile</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: MACROCYCLE TRENDS */}
          {activeTab === "trends" && (
            <div className="grid gap-12">
              <SectionHead
                eyebrow="Macrocycle Tracking"
                title="Longitudinal Trend & Periodization Detection"
                text="Multi-season telemetry tracking micro-adaptations, cardiac drift deceleration, and peak performance readiness across Olympic quadrennials."
              />

              <div className="grid gap-6 lg:grid-cols-2">
                <LineChartCard title="Pace Adaptation vs Cardiac Load" data={runTrend} keys={["pace", "heart"]} unit="" />
                <BarChartCard title="Weekly Training Volume (km)" data={weekly} />
              </div>

              {/* Cluster Infrastructure Callout */}
              <div className="surface-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Cpu className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base text-foreground">Distributed Timeseries Architecture</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Longitudinal trend engines process billions of high-frequency GPS coordinates and cardiac timestamps in under 50ms using partitioned Apache Arrow Parquet tables.
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild className="shrink-0">
                  <Link to="/platform" search={{ tab: "technology" }}>
                    Explore Lakehouse Architecture &rarr;
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* TAB 5: AI RECOMMENDATIONS */}
          {activeTab === "ai-recs" && (
            <div className="grid gap-12">
              <SectionHead
                eyebrow="Prescriptive Cues"
                title="AI Automated Training Prescriptions"
                text="Automated microcycle interventions formulated by our biomechanical physics engines to optimize volume without triggering fatigue overload."
              />

              <div className="grid gap-4 md:grid-cols-3">
                {recommendations.map((rec) => (
                  <div key={rec.number} className="surface-card p-6 flex flex-col justify-between hover:border-primary/40 transition">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-bold text-primary">Prescription #{rec.number}</span>
                        <span className="rounded bg-primary/10 text-primary px-2.5 py-0.5 text-[10px] font-bold uppercase">
                          {rec.priority}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{rec.title}</h3>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{rec.detail}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-mono">{rec.evidence}</span>
                      <span className="text-primary font-bold flex items-center gap-1 cursor-pointer hover:underline">
                        Apply Cue <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Solutions Bottom CTA */}
      <section className="py-16 border-t border-border bg-card/40 backdrop-blur-md">
        <div className="content-wrap">
          <div className="surface-card p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20 inline-block mb-4">
                Coaching &amp; Squad Deployment
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mb-4">
                Explore Squad Intelligence for Coaching Staffs
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Connect individual athlete telemetry with our squad command console: roster management, depth chart monitoring, and soft-tissue injury risk alerts.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <Link to="/coaches">
                    Open Coaching Services Hub <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/ecosystem">
                    View Olympic Programs
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
