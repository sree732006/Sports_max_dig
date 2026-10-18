import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BarChart2,
  BrainCircuit,
  Compass,
  Database,
  Flame,
  Gauge,
  Goal,
  HeartPulse,
  Layers,
  Milestone,
  Radio,
  RotateCcw,
  Shield,
  ShieldAlert,
  Sparkles,
  Trophy,
  Users,
  Video,
  Waves,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoBadge, Eyebrow, InsightCard, SectionHead, Workflow } from "@/components/sports-ui";
import { insights } from "@/lib/sports-data";
import { INDIVIDUAL_SPORTS, TEAM_SPORTS, GAME_ANALYSIS_MODULES } from "@/lib/sports-directory";
import runnerImage from "@/assets/sportsmax-runner.jpg";
import { ConnectWithSportsMax } from "@/components/connect-with-sportsmax";
import { SportsHeroShowcase } from "@/components/sports-hero-showcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SportsMax — Sports Analytics & Performance Intelligence" },
      {
        name: "description",
        content:
          "Turn athlete telemetry, match tracking, and tactical video into performance intelligence across 24+ individual and team sports.",
      },
      { property: "og:title", content: "SportsMax — Performance Intelligence" },
      {
        property: "og:description",
        content: "Sports data, analytics, intelligence, automation, and engagement in one platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Dynamic Thematic Telemetry Showcase Hero (GreenNext / Physiomatics Flow) */}
      <SportsHeroShowcase />

      {/* NEW PRIMARY SECTION: SPORTS INTELLIGENCE HUB */}
      <section className="py-20 bg-background border-b border-border">
        <div className="content-wrap">
          <SectionHead
            eyebrow="New Primary Section"
            title="Sports Intelligence Hub"
            text="Comprehensive telemetry, biomechanical physics, and automated tactical analytics across individual sports, team leagues, and game analysis."
            action={
              <Button asChild>
                <Link to="/sports">
                  Browse All Sports Directory <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            }
          />

          {/* Three Main Sports Pillars */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Pillar 1: Individual Sports */}
            <div className="surface-card p-6 flex flex-col justify-between border-t-4 border-t-primary shadow-xs hover:shadow-md transition">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Flame className="h-5 w-5" />
                  </span>
                  <span className="rounded bg-primary/10 text-primary text-[10px] font-black uppercase px-2 py-0.5">
                    Individual
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground">Individual Sports</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Precision biometric telemetry, cadence dynamics, ground contact time, and hydrodynamic efficiency.
                </p>

                <div className="mt-5 grid gap-2">
                  <Link
                    to="/sports/running"
                    className="flex items-center justify-between rounded-lg p-2.5 bg-secondary/50 hover:bg-secondary border border-border/50 text-xs font-semibold text-foreground group transition"
                  >
                    <span>🏃 Running (Enhanced Telemetry)</span>
                    <span className="text-[10px] text-primary font-bold group-hover:translate-x-0.5 transition-transform">
                      5:14 /km &rarr;
                    </span>
                  </Link>

                  <Link
                    to="/sports/swimming"
                    className="flex items-center justify-between rounded-lg p-2.5 bg-secondary/50 hover:bg-secondary border border-border/50 text-xs font-semibold text-foreground group transition"
                  >
                    <span>🏊 Swimming (SWOLF Index)</span>
                    <span className="text-[10px] text-primary font-bold group-hover:translate-x-0.5 transition-transform">
                      32.4 SWOLF &rarr;
                    </span>
                  </Link>

                  <Link
                    to="/sports/athletics/high-jump"
                    className="flex items-center justify-between rounded-lg p-2.5 bg-secondary/50 hover:bg-secondary border border-border/50 text-xs font-semibold text-foreground group transition"
                  >
                    <span>👟 High Jump & Field Events</span>
                    <span className="text-[10px] text-primary font-bold group-hover:translate-x-0.5 transition-transform">
                      2.28m Apex &rarr;
                    </span>
                  </Link>

                  <div className="flex flex-wrap gap-1.5 pt-2 text-[11px] text-muted-foreground">
                    <span>Sprints (100m-400m)</span> • <span>Distance</span> • <span>Cycling</span> • <span>Tennis</span> • <span>Golf</span> • <span>Combat</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <Link to="/sports" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                  View All Individual Sports &rarr;
                </Link>
              </div>
            </div>

            {/* Pillar 2: Team Sports */}
            <div className="surface-card p-6 flex flex-col justify-between border-t-4 border-t-accent shadow-xs hover:shadow-md transition">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent">
                    <Goal className="h-5 w-5" />
                  </span>
                  <span className="rounded bg-accent/15 text-accent text-[10px] font-black uppercase px-2 py-0.5">
                    Team Sports
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground">Team Sports</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Expected Goals (xG), pressing intensity (PPDA), shift length fatigue, and baton acceleration boxes.
                </p>

                <div className="mt-5 grid gap-2">
                  <Link
                    to="/sports/football"
                    className="flex items-center justify-between rounded-lg p-2.5 bg-secondary/50 hover:bg-secondary border border-border/50 text-xs font-semibold text-foreground group transition"
                  >
                    <span>⚽ Football / Soccer</span>
                    <span className="text-[10px] text-accent font-bold group-hover:translate-x-0.5 transition-transform">
                      2.48 xG &rarr;
                    </span>
                  </Link>

                  <Link
                    to="/sports/hockey"
                    className="flex items-center justify-between rounded-lg p-2.5 bg-secondary/50 hover:bg-secondary border border-border/50 text-xs font-semibold text-foreground group transition"
                  >
                    <span>🏒 Hockey (Shift & Corsi)</span>
                    <span className="text-[10px] text-accent font-bold group-hover:translate-x-0.5 transition-transform">
                      58.4% Corsi &rarr;
                    </span>
                  </Link>

                  <Link
                    to="/sports/relay"
                    className="flex items-center justify-between rounded-lg p-2.5 bg-secondary/50 hover:bg-secondary border border-border/50 text-xs font-semibold text-foreground group transition"
                  >
                    <span>🔄 Relay & Combined Events</span>
                    <span className="text-[10px] text-accent font-bold group-hover:translate-x-0.5 transition-transform">
                      1.71s Delta &rarr;
                    </span>
                  </Link>

                  <div className="flex flex-wrap gap-1.5 pt-2 text-[11px] text-muted-foreground">
                    <span>Basketball</span> • <span>Volleyball</span> • <span>Rugby / Football</span> • <span>Cricket</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <Link to="/sports" className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
                  View All Team Sports &rarr;
                </Link>
              </div>
            </div>

            {/* Pillar 3: Game Analysis Suite */}
            <div className="surface-card p-6 flex flex-col justify-between border-t-4 border-t-chart-4 shadow-xs hover:shadow-md transition">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-chart-4/15 text-chart-4">
                    <BarChart2 className="h-5 w-5" />
                  </span>
                  <span className="rounded bg-chart-4/15 text-chart-4 text-[10px] font-black uppercase px-2 py-0.5">
                    Tactical Suite
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-foreground">Game Analysis Suite</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Real-time match dashboards, tactical anomaly detection, radar player comparisons, and automated tagging.
                </p>

                <div className="mt-5 grid gap-2">
                  <Link
                    to="/sports/game-analysis"
                    className="flex items-center justify-between rounded-lg p-2.5 bg-secondary/50 hover:bg-secondary border border-border/50 text-xs font-semibold text-foreground group transition"
                  >
                    <span>📊 Match Dashboard</span>
                    <span className="text-[10px] text-chart-4 font-bold">Sub-second &rarr;</span>
                  </Link>

                  <Link
                    to="/sports/game-analysis"
                    className="flex items-center justify-between rounded-lg p-2.5 bg-secondary/50 hover:bg-secondary border border-border/50 text-xs font-semibold text-foreground group transition"
                  >
                    <span>🧠 Tactical Insights</span>
                    <span className="text-[10px] text-chart-4 font-bold">AI formations &rarr;</span>
                  </Link>

                  <Link
                    to="/sports/game-analysis"
                    className="flex items-center justify-between rounded-lg p-2.5 bg-secondary/50 hover:bg-secondary border border-border/50 text-xs font-semibold text-foreground group transition"
                  >
                    <span>👥 Player & Team Comparison</span>
                    <span className="text-[10px] text-chart-4 font-bold">Radar charts &rarr;</span>
                  </Link>

                  <div className="flex flex-wrap gap-1.5 pt-2 text-[11px] text-muted-foreground">
                    <span>Event Detection</span> • <span>Custom Reports</span> • <span>Export PDF</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <Link to="/sports/game-analysis" className="text-xs font-bold text-chart-4 hover:underline flex items-center gap-1">
                  Launch Game Analysis Suite &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architecture */}
      <section className="py-20 bg-secondary/30">
        <div className="content-wrap">
          <SectionHead
            eyebrow="Platform Architecture"
            title="From Raw Sensor Signals to Game-Winning Strategy"
            text="Every training session and competitive fixture moves through an end-to-end intelligence pipeline."
            action={
              <Button asChild variant="outline">
                <Link to="/platform">Full Technology Overview &rarr;</Link>
              </Button>
            }
          />
          <div className="grid gap-4 lg:grid-cols-3">
            <Layer
              icon={<Database className="h-5 w-5" />}
              number="01"
              title="Capture"
              text="Stream telemetry from GPS watches, heart rate straps, optical tracking cameras, and RFID chips."
              tags={["Distance", "Pace", "Speed", "Cadence", "Heart Rate", "GPS", "Optical 120fps"]}
            />
            <Layer
              icon={<BrainCircuit className="h-5 w-5" />}
              number="02"
              title="Analyze"
              text="Transform kinematics into acute-to-chronic workload ratios, fatigue markers, and tactical formations."
              tags={["ACWR Ratio", "xG / xT", "SWOLF", "Consistency", "Fatigue", "Spatial Press"]}
            />
            <Layer
              icon={<Zap className="h-5 w-5" />}
              number="03"
              title="Automate"
              text="Deliver pitch-side tactical dashboards, injury risk alerts, and tailored coaching feedback sheets."
              tags={["Live Dashboards", "Injury Alerts", "AI Cues", "Export PDF", "Personal Bests"]}
            />
          </div>
        </div>
      </section>

      {/* Automated Intelligence Signals */}
      <section className="border-y border-border bg-card py-20">
        <div className="content-wrap">
          <SectionHead
            eyebrow="Automated Intelligence"
            title="Diagnostic Signals That Drive Results"
            text="SportsMax continuously monitors physical telemetry to surface actionable adjustments."
            action={
              <Button asChild variant="outline">
                <Link to="/analytics">
                  All Analytics Insights <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            }
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {insights.map((i) => (
              <InsightCard key={i.title} {...i} />
            ))}
          </div>
        </div>
      </section>

      {/* Connected Automation Workflows */}
      <section className="py-20 bg-background">
        <div className="content-wrap">
          <SectionHead
            eyebrow="Connected Automation"
            title="Two Intelligent Feedback Loops"
            text="Reduce manual analyst workload internally while delivering timely feedback to athletes and coaches."
          />
          <div className="grid gap-5">
            <Workflow
              title="Internal Analytics Automation"
              description="For analysts, coaches, sports scientists, and athletic directors."
              steps={["Data capture", "Sensor filtering", "Kinematic models", "Insight generation", "Dashboard", "Staff Report"]}
            />
            <Workflow
              title="External Athlete & Fan Engagement"
              description="For athletes, club communities, broadcast audiences, and fans."
              steps={["Session sync", "Performance score", "Personal Best", "Coaching cue", "Community feed", "Fan Story"]}
            />
          </div>
        </div>
      </section>

      {/* Built for the Ecosystem */}
      <section className="border-t border-border bg-secondary/40 py-20">
        <div className="content-wrap">
          <SectionHead
            eyebrow="Sports Ecosystem"
            title="Purpose-Built for Every Side of Sport"
            action={
              <Button asChild variant="outline">
                <Link to="/ecosystem">Explore Ecosystem &rarr;</Link>
              </Button>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Use
              icon={<Gauge className="h-5 w-5" />}
              title="Athletes"
              text="Understand cardiac strain, pace adaptation, and verified personal best milestones."
              href="/athletes"
            />
            <Use
              icon={<BrainCircuit className="h-5 w-5" />}
              title="Coaches"
              text="Govern squad acute-to-chronic workload, manage rosters, and mitigate injury risks."
              href="/coaches"
            />
            <Use
              icon={<Users className="h-5 w-5" />}
              title="Communities"
              text="Organize local running clubs, track leaderboards, and celebrate group achievements."
              href="/ecosystem"
            />
            <Use
              icon={<Radio className="h-5 w-5" />}
              title="Fans"
              text="Engage with live broadcast sprint velocities, shot arcs, and tactical pitch overlays."
              href="/sports/game-analysis"
            />
          </div>
        </div>
      </section>

      {/* Connect with SportsMax & Assistant Section */}
      <ConnectWithSportsMax />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-black text-foreground">{value}</div>
      <div className="mt-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function Layer({
  icon,
  number,
  title,
  text,
  tags,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  text: string;
  tags: string[];
}) {
  return (
    <article className="surface-card p-6 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        <span className="font-mono text-xs font-bold text-muted-foreground">{number}</span>
      </div>
      <h3 className="mt-8 text-2xl font-bold text-foreground">{title}</h3>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{text}</p>
      <div className="mt-6 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-secondary border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

function Use({
  icon,
  title,
  text,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  href: string;
}) {
  return (
    <Link to={href} className="border-l-4 border-primary bg-card p-5 surface-card hover:border-primary/80 transition block group">
      <span className="text-primary">{icon}</span>
      <h3 className="mt-4 font-bold text-base text-foreground group-hover:text-primary transition">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p>
      <span className="mt-4 inline-flex items-center text-xs font-bold text-primary group-hover:underline">
        Explore &rarr;
      </span>
    </Link>
  );
}
