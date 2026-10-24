import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Award,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Flame,
  Globe,
  Heart,
  Layers,
  Medal,
  MessageSquare,
  Radio,
  Share2,
  Shield,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoBadge, PageIntro, SectionHead } from "@/components/sports-ui";
import { leaderboard } from "@/lib/sports-data";
import swimImage from "@/assets/swimming_biomechanics_1792572365169.jpg";

type EcosystemTab = "olympic" | "athletes" | "coaches" | "communities" | "fans";

export const Route = createFileRoute("/ecosystem")({
  validateSearch: (search: Record<string, unknown>): { tab?: EcosystemTab } => {
    const validTabs: EcosystemTab[] = ["olympic", "athletes", "coaches", "communities", "fans"];
    const rawTab = search["tab"];
    if (typeof rawTab === "string" && validTabs.includes(rawTab as EcosystemTab)) {
      return { tab: rawTab as EcosystemTab };
    }
    return {};
  },
  head: () => ({
    meta: [
      { title: "Olympic Programs & Full-Spectrum Sports Ecosystem — SportsMax" },
      {
        name: "description",
        content:
          "Olympic high-performance institutes, National Olympic Committees (NOCs), athlete self-tracking, and fan engagement unified under sovereign AI data governance.",
      },
    ],
  }),
  component: EcosystemPage,
});

export function EcosystemPage() {
  const search = Route.useSearch();
  const [activeTab, setActiveTab] = useState<EcosystemTab>(search.tab || "olympic");

  useEffect(() => {
    if (search.tab && search.tab !== activeTab) {
      setActiveTab(search.tab);
    }
  }, [search.tab]);

  return (
    <>
      <PageIntro
        eyebrow="Solutions · Olympic &amp; Elite Programs"
        title="Unifying the Global High-Performance Sporting Ecosystem"
        text="From Olympic podium trajectories and national governing federations down to coaching staffs and community runners, SportsMax establishes a sovereign, high-precision performance currency."
        action={
          <div className="flex flex-col items-end gap-3">
            <DemoBadge />
            <div className="flex flex-wrap gap-1 bg-secondary/80 backdrop-blur-sm p-1 rounded-lg border border-border">
              {[
                { id: "olympic", label: "Olympic Programs" },
                { id: "athletes", label: "Athletes" },
                { id: "coaches", label: "Coaches" },
                { id: "communities", label: "Communities" },
                { id: "fans", label: "Broadcast & Fans" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as EcosystemTab)}
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

      {/* Ecosystem KPI Ribbon */}
      <section className="border-y border-border/80 bg-card/60 py-4 backdrop-blur-md">
        <div className="content-wrap">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-amber-500 font-mono tracking-tight">42 Medals</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Olympic Podiums</div>
            </div>
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-foreground font-mono tracking-tight">18 NOCs</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">National Federations</div>
            </div>
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-primary font-mono tracking-tight">4-Year Cycle</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Quadrennial Macro</div>
            </div>
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-foreground font-mono tracking-tight">100% WADA</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Anti-Doping Ledger</div>
            </div>
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-primary font-mono tracking-tight">24+ Sports</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Cross-Discipline</div>
            </div>
            <div className="p-2">
              <div className="text-xl lg:text-2xl font-black text-foreground font-mono tracking-tight">Sovereign</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Regional Vaults</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Viewports */}
      <section className="py-12 bg-background min-h-[600px]">
        <div className="content-wrap">
          {/* TAB 1: OLYMPIC & ELITE PROGRAMS */}
          {activeTab === "olympic" && (
            <div className="grid gap-12">
              <SectionHead
                eyebrow="Quadrennial Governance"
                title="Olympic &amp; National High-Performance Framework"
                text="Engineered for National Olympic Committees (NOCs), national governing federations, and elite sports institutes managing 4-year medal cycles."
              />

              {/* Olympic Visual Showcase */}
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-xl bg-card">
                <img
                  src={swimImage}
                  alt="Olympic High-Performance Training Facility"
                  className="w-full h-[340px] object-cover object-center filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex flex-col justify-end p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-500 border border-amber-500/30 backdrop-blur-md flex items-center gap-1">
                      <Medal className="h-3.5 w-3.5" /> Olympic Tier Certified
                    </span>
                    <span className="text-xs text-muted-foreground">Paris 2024 &amp; LA 2028 Ready</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    Sub-Millisecond Multi-Discipline Biomechanics Solvers
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-2xl mt-1">
                    Synchronizes hydrodynamics, high-jump bar apex kinematics, and sprint clearance velocities into unified Olympic quadrennial progression models.
                  </p>
                </div>
              </div>

              {/* 3 Olympic Framework Pillars */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="surface-card p-6 border-t-4 border-t-amber-500">
                  <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-base text-foreground mb-2">Quadrennial Periodization</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Long-range macrocycle modeling that aligns physiological peaking with continental qualifiers and Olympic finals windows with zero taper degradation.
                  </p>
                </div>

                <div className="surface-card p-6 border-t-4 border-t-primary">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <Award className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-base text-foreground mb-2">Talent Identification (TID)</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Machine learning discovery algorithms evaluating youth biomechanical efficiency to uncover future international medal potential across sports disciplines.
                  </p>
                </div>

                <div className="surface-card p-6 border-t-4 border-t-accent">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-base text-foreground mb-2">WADA Anti-Doping Audit</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Tamper-proof append-only ledger tracking athlete biological passport parameters and medication exemption filings under strict medical confidentiality.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ATHLETES */}
          {activeTab === "athletes" && (
            <div className="surface-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Flame className="h-6 w-6" />
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Ecosystem Layer 1</span>
                  <h3 className="text-2xl font-bold">For Athletes: Total Ownership of Performance</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl mb-6">
                Athletes retain sovereign control over their biometric data, Personal Best (PB) milestones, and recovery trajectories. Sync telemetry from Garmin, Apple Watch, WHOOP, Polar, and Catapult into a unified private ledger.
              </p>
              <Button asChild size="sm">
                <Link to="/athletes">Explore Athlete Self-Tracking &rarr;</Link>
              </Button>
            </div>
          )}

          {/* TAB 3: COACHES */}
          {activeTab === "coaches" && (
            <div className="surface-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent">
                  <BrainCircuit className="h-6 w-6" />
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">Ecosystem Layer 2</span>
                  <h3 className="text-2xl font-bold">For Coaches: Squad Load Governance &amp; Strategy</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl mb-6">
                Replace guesswork with calibrated workload telemetry. Compare athletes across positions, monitor acute-to-chronic load spikes, and prepare tactical game plans with computer vision feedback.
              </p>
              <Button asChild size="sm">
                <Link to="/coaches">Explore Coaches &amp; Teams &rarr;</Link>
              </Button>
            </div>
          )}

          {/* TAB 4: COMMUNITIES */}
          {activeTab === "communities" && (
            <div className="surface-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-chart-1/15 text-chart-1">
                  <Users className="h-6 w-6" />
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Ecosystem Layer 3</span>
                  <h3 className="text-2xl font-bold">For Communities: Social Challenges &amp; Leaderboards</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl mb-6">
                Connect running clubs, collegiate leagues, and local fitness groups with live leaderboards, collective challenges, and friendly peer competition.
              </p>
              <div className="surface-card overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-secondary/70 text-muted-foreground font-semibold uppercase">
                    <tr>
                      <th className="px-6 py-3">Rank</th>
                      <th className="px-6 py-3">Athlete</th>
                      <th className="px-6 py-3">Distance</th>
                      <th className="px-6 py-3">Sessions</th>
                      <th className="px-6 py-3">Achievement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {leaderboard.map((l) => (
                      <tr key={l.rank} className="hover:bg-secondary/30 transition">
                        <td className="px-6 py-3 font-bold text-primary">#{l.rank}</td>
                        <td className="px-6 py-3 font-semibold">{l.name}</td>
                        <td className="px-6 py-3 font-mono font-bold">{l.distance}</td>
                        <td className="px-6 py-3 text-muted-foreground">{l.sessions}</td>
                        <td className="px-6 py-3 font-semibold text-primary">{l.achievement}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: BROADCAST & FANS */}
          {activeTab === "fans" && (
            <div className="surface-card p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-chart-4/15 text-chart-4">
                  <Radio className="h-6 w-6" />
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-chart-4">Ecosystem Layer 4</span>
                  <h3 className="text-2xl font-bold">For Fans: Immersive Next-Gen Sports Data</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl mb-6">
                Deliver broadcast-quality augmented analytics to sports fans: live sprint speeds, expected goals (xG), shot apex arcs, and tactical replay telemetry.
              </p>
              <Button asChild size="sm">
                <Link to="/sports/game-analysis">View Tactical Broadcast Suite &rarr;</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Ecosystem Bottom CTA */}
      <section className="py-16 border-t border-border bg-card/40 backdrop-blur-md">
        <div className="content-wrap">
          <div className="surface-card p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20 inline-block mb-4">
                Institutional Partnership
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight mb-4">
                Deploy National Sports AI for Your Governing Federation
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Partner with our Olympic sports science engineering group to benchmark your national roster and implement sovereign AI infrastructure.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <Link to="/contact">
                    Schedule Federation Briefing <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/platform">
                    Review Security &amp; Compliance Enclaves
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
