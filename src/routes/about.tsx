import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, BarChart3, BellRing, BrainCircuit, Database, MapPinned, Radio, Sparkles, Shield, Cpu, Flame, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoBadge, PageIntro, SectionHead, Workflow } from "@/components/sports-ui";
import arenaImage from "@/assets/sports_tactical_arena_1792572299956.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About SportsMax — Full-Spectrum Sports AI Engineering & Value Realization" },
      {
        name: "description",
        content:
          "Bridging high-performance sports science, multi-modal sensor ingestion, and autonomous tactical fleets for modern sports organizations.",
      },
      { property: "og:title", content: "About SportsMax — Full-Spectrum Sports AI" },
      {
        property: "og:description",
        content: "Making sports data meaningful and accountable across athletes, coaches, and sports institutions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageIntro
        eyebrow="About SportsMax"
        title="Full-Spectrum AI Engineering for Human Athletic Performance"
        text="SportsMax is an enterprise sports AI engineering operating company. We bridge the critical gap between heavy wearable investments and hands-on pitch-side tactical execution across 24+ sporting disciplines."
        action={<DemoBadge />}
      />

      <section className="py-16 bg-background">
        <div className="content-wrap">
          {/* Mission and Purpose with Tactical Image */}
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHead
                eyebrow="Our Mission & Philosophy"
                title="Clarity Between Physical Effort & Competitive Superiority"
              />
              <p className="leading-relaxed text-sm text-muted-foreground">
                Raw kinematic numbers only become valuable when they reveal what changed, why it matters, and precisely what tactical adjustments to make. In high-stakes competition, athletic directors and head coaches don't need fragmented dashboards—they need accountable, deterministic systems that connect capture, kinematic analysis, and autonomous tactical playbooks.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-foreground">Engineering First</div>
                    <div className="text-xs text-muted-foreground">We combine elite biomechanical science with deep silicon and optical tracking implementation.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-foreground">Trust & Zero-Trust Governance</div>
                    <div className="text-xs text-muted-foreground">Athlete biological data is safeguarded with multi-tenant encryption and HIPAA/GDPR compliance.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-foreground">Value Accountability</div>
                    <div className="text-xs text-muted-foreground">Quantifiable ROI: 34% reduction in non-contact soft tissue injuries and +18% tactical efficiency gains.</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="surface-card overflow-hidden rounded-xl border border-border shadow-lg">
              <div className="relative h-80 w-full bg-muted">
                <img
                  src={arenaImage}
                  alt="SportsMax stadium tactical operations room"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-foreground font-semibold">
                  <span>Match Control Center — Olympic Stadium Pilot</span>
                  <span className="font-mono text-primary font-bold">120 FPS / Sub-38ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Core Pillars of Stakeholder Realization */}
          <div className="mt-20">
            <SectionHead
              eyebrow="Enterprise Stakeholders"
              title="Built for the Demands of Modern Sports Ecosystems"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Elite Athletes", desc: "Understand cardiac strain, biomechanical symmetry, and peak velocity capacity.", stat: "100% Personal Telemetry" },
                { title: "Coaches & Tactics", desc: "Automate pressing intensity maps, set-piece analysis, and real-time substitutions.", stat: "< 38ms Feedback Loop" },
                { title: "Sports Analysts", desc: "Cut report generation time from 5 hours to 30 seconds with auto-tagging algorithms.", stat: "90% Faster Debriefs" },
                { title: "Institutional Academies", desc: "Track longitudinal athlete growth across multi-year collegiate cohorts.", stat: "Unified Cohort Records" },
              ].map((item) => (
                <div className="surface-card p-5 border-t-2 border-t-primary" key={item.title}>
                  <p className="font-bold text-foreground text-sm">{item.title}</p>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  <div className="mt-4 pt-3 border-t border-border font-mono text-[10px] font-bold text-primary">
                    {item.stat}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Platform Architecture Tier */}
          <div className="mt-20">
            <SectionHead
              eyebrow="Unified Architecture"
              title="Four Strategic Layers. One Autonomous Platform."
            />
            <div className="grid gap-4 lg:grid-cols-3">
              <Layer
                title="Universal Sensory Layer"
                icon={<Database className="h-5 w-5" />}
                items={[
                  [Activity, "120fps Multi-Angle Optical Video Streams"],
                  [MapPinned, "10Hz Sub-Meter GNSS Tracking Pods"],
                  [Radio, "BLE & ANT+ Cardiac Telemetry (1000Hz)"],
                ]}
              />
              <Layer
                title="Biomechanical AI Layer"
                icon={<BrainCircuit className="h-5 w-5" />}
                items={[
                  [BarChart3, "24-Point Markerless Skeletal MoCap"],
                  [Sparkles, "Acute-to-Chronic Workload (ACWR) Ratios"],
                  [Activity, "Hydrodynamic SWOLF & Takeoff Kinematics"],
                ]}
              />
              <Layer
                title="Autonomous Tactical Layer"
                icon={<BellRing className="h-5 w-5" />}
                items={[
                  [BarChart3, "Automated Post-Match Tactical Dossiers"],
                  [Sparkles, "Pitch-Side Formation Anomaly Cues"],
                  [BellRing, "Soft-Tissue Overuse Warning Alerts"],
                ]}
              />
            </div>
          </div>

          {/* Automation Workflows */}
          <div className="mt-20 grid gap-6">
            <Workflow
              title="Internal Analytics Automation Pipeline"
              description="Eliminate manual analyst labor to deliver actionable tactical intelligence before halftime."
              steps={["Optical & GNSS Ingestion", "Pose Estimation", "Kinematic Physics", "Insight Synthesis", "Pitch-side Screen", "Head Coach Cue"]}
            />
            <Workflow
              title="External Athlete & Institutional Engagement"
              description="Empower athletes with private progress dashboards, personal bests, and injury recovery milestones."
              steps={["Biometric Sync", "Fatigue Analysis", "Readiness Score", "Personal Best", "Coaching Feedback", "Medical Staff Clearance"]}
            />
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg" className="font-bold shadow-md">
              <Link to="/sports">
                Explore 24+ Sports In The Hub <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function Layer({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: [typeof Activity, string][];
}) {
  return (
    <article className="surface-card p-6 shadow-xs">
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
      </div>
      <div className="mt-5 grid gap-3">
        {items.map(([Icon, label]) => (
          <div
            key={label}
            className="flex items-center gap-2.5 border-t border-border pt-3 text-xs text-muted-foreground"
          >
            <Icon className="h-4 w-4 text-primary shrink-0" />
            <span className="font-medium text-foreground">{label}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
