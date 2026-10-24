import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Clock3,
  Compass,
  Gauge,
  HeartPulse,
  Milestone,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Waves,
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

export const Route = createFileRoute("/sports/swimming")({
  head: () => ({
    meta: [
      { title: "Swimming Analytics & SWOLF Telemetry — SportsMax" },
      {
        name: "description",
        content:
          "High-performance swimming telemetry: SWOLF efficiency index, turn times, stroke frequency, and underwater kick phases.",
      },
    ],
  }),
  component: SwimmingSportPage,
});

const swimTrend = [
  { label: "Lap 1", swolf: 31, strokeRate: 34, pace: 62 },
  { label: "Lap 2", swolf: 32, strokeRate: 35, pace: 63 },
  { label: "Lap 3", swolf: 32, strokeRate: 35, pace: 64 },
  { label: "Lap 4", swolf: 33, strokeRate: 36, pace: 64 },
  { label: "Lap 5", swolf: 34, strokeRate: 37, pace: 65 },
  { label: "Lap 6", swolf: 33, strokeRate: 36, pace: 64 },
  { label: "Lap 7", swolf: 35, strokeRate: 38, pace: 66 },
  { label: "Lap 8", swolf: 34, strokeRate: 37, pace: 65 },
];

const strokeBreakdown = [
  { stroke: "Freestyle", laps: "24 Laps", distance: "1,200m", avgSwolf: "31.8", efficiency: "94%" },
  { stroke: "Backstroke", laps: "12 Laps", distance: "600m", avgSwolf: "34.2", efficiency: "88%" },
  { stroke: "Breaststroke", laps: "8 Laps", distance: "400m", avgSwolf: "38.5", efficiency: "82%" },
  { stroke: "Butterfly", laps: "4 Laps", distance: "200m", avgSwolf: "36.0", efficiency: "86%" },
];

import swimImage from "@/assets/swimming_biomechanics_1792572365169.jpg";

export function SwimmingSportPage() {
  const [poolType, setPoolType] = useState<"50m" | "25m">("50m");

  return (
    <>
      <PageIntro
        eyebrow="Individual Sports · Swimming"
        title="Aquatics & Biomechanical SWOLF Intelligence"
        text="Measure stroke velocity, flip-turn breakout speed, and hydrodynamic efficiency. SportsMax tracks micro-intervals across 50m Olympic and 25m short-course pools."
        action={
          <div className="flex flex-col items-end gap-3">
            <DemoBadge />
            <div className="inline-flex rounded-md border border-border bg-secondary p-1">
              <button
                type="button"
                onClick={() => setPoolType("50m")}
                className={`rounded px-3 py-1.5 text-xs font-semibold transition ${
                  poolType === "50m"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                50m Olympic Pool
              </button>
              <button
                type="button"
                onClick={() => setPoolType("25m")}
                className={`rounded px-3 py-1.5 text-xs font-semibold transition ${
                  poolType === "25m"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                25m Short Course
              </button>
            </div>
          </div>
        }
      />

      <section className="py-12 bg-background">
        <div className="content-wrap">
          {/* Visual Showcase Card with Aquatic Telemetry */}
          <div className="mb-10 surface-card overflow-hidden border border-border/80">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[260px] overflow-hidden">
                <img
                  src={swimImage}
                  alt="Underwater stroke kinematic telemetry"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-background/95" />
                <div className="absolute bottom-4 left-4 rounded-md bg-background/80 backdrop-blur-md px-3 py-1.5 border border-primary/30">
                  <span className="text-[11px] font-mono font-semibold uppercase text-primary flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    Sub-Surface 120 FPS Optical Multi-Lane Hydrodynamics
                  </span>
                </div>
              </div>
              <div className="p-6 lg:p-8 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary">
                    <Waves className="h-3.5 w-3.5" /> Aquatic Hydro-Dynamics · SWOLF V2
                  </div>
                  <h3 className="mt-1 text-xl font-bold tracking-tight">Underwater Breakout & Stroke Vector Analysis</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    Sub-surface refraction correction algorithms tracking hand entry angle, early vertical forearm (EVF) hold, and kick propulsive amplitude across flip turn breakouts.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 border-t border-border/60 pt-4">
                  <div className="rounded-lg bg-secondary/40 p-2.5">
                    <div className="text-[11px] text-muted-foreground uppercase font-mono">SWOLF Index</div>
                    <div className="text-base font-bold font-mono text-foreground mt-0.5">32.4</div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Elite Range (&lt; 35)</div>
                  </div>
                  <div className="rounded-lg bg-secondary/40 p-2.5">
                    <div className="text-[11px] text-muted-foreground uppercase font-mono">Turn Breakout</div>
                    <div className="text-base font-bold font-mono text-foreground mt-0.5">2.42 m/s</div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">+0.18 m/s delta</div>
                  </div>
                  <div className="rounded-lg bg-secondary/40 p-2.5">
                    <div className="text-[11px] text-muted-foreground uppercase font-mono">DPS (Dist/Stroke)</div>
                    <div className="text-base font-bold font-mono text-foreground mt-0.5">2.28 m</div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">96% Propulsive</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SectionHead
            eyebrow="Session Overview"
            title="2,400m Threshold Interval Set"
            text="Completed at Aquatic Center · High-speed optical lane sensors and optical wrist sensor telemetry"
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <MetricCard
              label="Total Distance"
              value="2,400 m"
              note="48 Olympic Laps"
              icon={<Waves className="h-4 w-4 text-accent" />}
            />
            <MetricCard
              label="Avg SWOLF"
              value="32.4"
              note="Top 4% efficiency"
              icon={<Zap className="h-4 w-4 text-primary" />}
            />
            <MetricCard
              label="Pace / 100m"
              value="1:04.2"
              note="-1.4s vs baseline"
              icon={<Activity className="h-4 w-4" />}
            />
            <MetricCard
              label="Stroke Rate"
              value="35.8 spm"
              note="Optimal cadence"
              icon={<Gauge className="h-4 w-4" />}
            />
            <MetricCard
              label="Turn Time"
              value="1.42 s"
              note="Breakout at 11.2m"
              icon={<RotateCcw className="h-4 w-4" />}
            />
            <MetricCard
              label="Active Duration"
              value="38:14"
              note="Rest time: 06:20"
              icon={<Clock3 className="h-4 w-4" />}
            />
          </div>

          {/* Hydrodynamic Diagnostics */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <LineChartCard
              title="SWOLF Index vs Stroke Cadence"
              subtitle="Lower SWOLF values indicate higher hydrodynamic stroke efficiency"
              data={swimTrend}
              keys={["swolf", "strokeRate"]}
              unit=""
            />

            <div className="surface-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Flip-Turn Kinematics
                  </span>
                  <span className="text-xs font-mono font-bold text-accent">1.42s avg</span>
                </div>
                <h3 className="text-lg font-bold mt-2">Wall Approach & Push-off Velocity</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Deceleration occurs 1.8 meters before the wall. Push-off generates an initial velocity
                  of 2.84 m/s, stabilizing into a 6-kick butterfly underwater phase before stroke breakout.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-secondary/70 p-3 border border-border/60">
                    <span className="text-[11px] text-muted-foreground block">Breakout Distance</span>
                    <span className="font-mono text-base font-bold text-foreground">11.4 m</span>
                  </div>
                  <div className="rounded-lg bg-secondary/70 p-3 border border-border/60">
                    <span className="text-[11px] text-muted-foreground block">Push-off Force</span>
                    <span className="font-mono text-base font-bold text-foreground">840 N</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Stroke length: 2.14 m/stroke</span>
                <span className="font-bold text-primary">Elite Tier</span>
              </div>
            </div>
          </div>

          {/* Stroke Type Breakdown */}
          <div className="mt-10 surface-card overflow-hidden">
            <div className="border-b border-border p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Stroke Distribution & Efficiency</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Four-stroke medley distribution</p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link to="/sports">All Sports &rarr;</Link>
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary/70 text-muted-foreground font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3.5">Stroke Type</th>
                    <th className="px-6 py-3.5">Volume</th>
                    <th className="px-6 py-3.5">Distance</th>
                    <th className="px-6 py-3.5">Avg SWOLF</th>
                    <th className="px-6 py-3.5">Hydrodynamic Score</th>
                    <th className="px-6 py-3.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {strokeBreakdown.map((s) => (
                    <tr key={s.stroke} className="hover:bg-secondary/30 transition">
                      <td className="px-6 py-3.5 font-bold text-foreground">{s.stroke}</td>
                      <td className="px-6 py-3.5 text-muted-foreground">{s.laps}</td>
                      <td className="px-6 py-3.5 font-mono text-foreground">{s.distance}</td>
                      <td className="px-6 py-3.5 font-mono font-bold text-primary">{s.avgSwolf}</td>
                      <td className="px-6 py-3.5">
                        <span className="rounded bg-primary/10 text-primary font-bold px-2 py-0.5 text-[10px]">
                          {s.efficiency}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-primary">
                          View Splits
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
