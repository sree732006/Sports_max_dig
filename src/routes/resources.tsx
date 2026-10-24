import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Code,
  FileText,
  HelpCircle,
  Lightbulb,
  Search,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoBadge, PageIntro, SectionHead } from "@/components/sports-ui";

import arenaImage from "@/assets/sports_tactical_arena_1792572299956.jpg";

type ResourcesTab = "case-studies" | "success-stories" | "video-guides" | "blog" | "knowledge-base" | "api";

export const Route = createFileRoute("/resources")({
  validateSearch: (search: Record<string, unknown>): { tab?: ResourcesTab } => {
    const rawTab = search["tab"];
    if (
      rawTab === "case-studies" ||
      rawTab === "success-stories" ||
      rawTab === "video-guides" ||
      rawTab === "blog" ||
      rawTab === "knowledge-base" ||
      rawTab === "api"
    ) {
      return { tab: rawTab };
    }
    return {};
  },
  head: () => ({
    meta: [
      { title: "Resources, Research & Documentation — SportsMax" },
      {
        name: "description",
        content:
          "Sports science articles, case studies, athletic intelligence knowledge base, and developer API documentation.",
      },
    ],
  }),
  component: ResourcesPage,
});

const articles = [
  {
    title: "The Biomechanics of Fosbury Flop Apex Clearance",
    category: "Sports Science",
    date: "Sep 28, 2026",
    readTime: "7 min read",
    author: "Dr. Marcus Vance, Lead Biomechanist",
    summary: "Optoelectronic high-speed capture (240 FPS) analyzing centripetal velocity conversion in curved approach runs and angular momentum transfer at takeoff."
  },
  {
    title: "Understanding Acute-to-Chronic Workload Ratio in Elite Runners",
    category: "Load Management",
    date: "Sep 15, 2026",
    readTime: "10 min read",
    author: "Sarah Lin, Ph.D. Exercise Physiology",
    summary: "Exponentially Weighted Moving Average (EWMA) models versus rolling averages for preventing spike-induced Achilles tendinopathy in marathon training blocks."
  },
  {
    title: "How Expected Goals (xG) is Evolving with Optical Tracking",
    category: "Tactical Analytics",
    date: "Aug 30, 2026",
    readTime: "8 min read",
    author: "Alex Rivera, Senior CV Systems Engineer",
    summary: "Integrating goalkeeper positioning angles, defender occlusion vectors, and shot velocity from 32-camera 4K stadium arrays for sub-38ms live xG."
  },
  {
    title: "Sub-Surface SWOLF and Hydrodynamic Drag Profiling",
    category: "Aquatics Research",
    date: "Aug 12, 2026",
    readTime: "6 min read",
    author: "Liam Davies, Olympic Swimming Specialist",
    summary: "Mathematical models quantifying early vertical forearm (EVF) slip, stroke cadence efficiency, and breakout velocity decay across 50m intervals."
  },
];

const caseStudies = [
  {
    type: "National Olympic Federation",
    team: "French Athletics Federation (FFA)",
    metric: "-42% Soft-Tissue Risk",
    roi: "€340,000 Saved / Season",
    deployment: "National Olympic Training Facility — Paris INSEP",
    story: "Deployed optical biomechanics & continuous ACWR tracking across 38 national squad sprinters and decathletes preparing for international championships. Replaced manual RPE reporting with real-time ground contact time asymmetry alerts.",
    specs: ["38 Decathletes & Sprinters", "120 FPS Optoelectronic Rig", "WADA ADAMS Sync", "4-Year Quadrennial Periodization"]
  },
  {
    type: "High-Performance Aquatics Center",
    team: "National Swimming Institute (FIN)",
    metric: "+8.4% Stroke Index",
    roi: "+3 Olympic Medal Times",
    deployment: "Federal Aquatic Training Center — Rome",
    story: "Implemented multi-angle underwater SWOLF and stroke rate computer vision cameras during live taper cycles across 100m and 200m freestyle teams, eliminating flip-turn deceleration peaks.",
    specs: ["Sub-surface 4K Refraction Fix", "12 Olympic Lane Arrays", "0.01s Precision Breakouts", "Lactate Curve Integration"]
  },
  {
    type: "Premier League Elite Academy",
    team: "Premier League Elite Academy & U21",
    metric: "+1.34 xG Differential",
    roi: "22% Faster Press Recovery",
    deployment: "First Team & Under-21 Tactical Analysis Center",
    story: "Integrated automated pitch telemetry and real-time press resistance heatmaps into halftime coaching headsets, improving high-intensity defensive recoveries within 6 seconds of possession turnover.",
    specs: ["32 Multi-Camera Stadium Rig", "< 38ms Edge Voronoi Grid", "22-Player Simultaneous Hull", "Dual Halftime Debrief Tablets"]
  },
  {
    type: "NCAA Division 1 Athletic Program",
    team: "Stanford University Sports Science",
    metric: "91% Squad Availability",
    roi: "140 Student-Athletes Monitored",
    deployment: "Multi-Sport Collegiate High-Performance Center",
    story: "Unified collegiate track, swimming, basketball, and soccer into a central FERPA/HIPAA compliant biometric lakehouse, correlating sleep HRV with sprint velocity drop-offs.",
    specs: ["Cross-Sport Biometric Vault", "FERPA/HIPAA Airgap", "Automated Coach Cues", "Individualized Academic Periodization"]
  },
];

const successStories = [
  {
    athlete: "Elena Rostova (Marathon / 10,000m)",
    badge: "World Championships Finalist",
    metric: "2h 19m 40s (PR -2m 15s)",
    quote: "SportsMax ACWR and live biomechanical fatigue detection showed my coach exactly when my ground contact time became asymmetrical in kilometer 32.",
    delta: "Ground contact symmetry balanced from 48/52 to 50.1/49.9",
    tags: ["Running", "ACWR Load", "GPS Telemetry", "Plantar Force"]
  },
  {
    athlete: "Men's 4x100m National Relay Squad",
    badge: "Continental Gold Medalists",
    metric: "0.28s Shaved on Handover Window",
    quote: "Optical velocity synchronization in the exchange zone eliminated our deceleration spikes between runner 2 and 3 at maximum incoming sprint speed.",
    delta: "Baton transit speed maintained at 10.4 m/s through the 30m box",
    tags: ["Relay", "Optical Tracking", "Split Telemetry", "Takeoff Acceleration"]
  },
  {
    athlete: "High Jump Olympic Development Program",
    badge: "National Podium Sweep",
    metric: "2.34m Clearance Peak (+5cm PR)",
    quote: "Curve acceleration and takeoff angle telemetry gave our jumpers millimeter precision on bar clearance apex points without disrupting natural style.",
    delta: "Penultimate stride velocity increased +0.42 m/s before plant",
    tags: ["High Jump", "Kinematics", "Apex Trajectory", "Takeoff Angle"]
  },
  {
    athlete: "Collegiate Rowing Varsity Eight",
    badge: "National Championship Champions",
    metric: "+3.2% Boat Speed at 36 SPM",
    quote: "Synchronized seat accelerometers and blade hydro-force sensors eliminated catch check and micro-skips across all eight oars simultaneously.",
    delta: "Catch timing variance compressed under 14 milliseconds",
    tags: ["Rowing", "Hydro-Force", "Phase Sync", "Cadence"]
  }
];

const videoGuides = [
  {
    title: "Platform Walkthrough: Setting Up Olympic Macrocycles",
    duration: "14:20",
    category: "Platform Walkthrough",
    description: "Full guide on structuring 4-year Olympic cycles, peak timing weeks, and connecting squad wearables into automated tapering models.",
    chapters: ["0:00 Cycle Architecture", "3:15 Load Distribution", "7:40 WADA Data Vault", "11:20 Peak Week Simulation"]
  },
  {
    title: "Coaching Cues: Automated Live Feedback Workflows",
    duration: "08:45",
    category: "Coaching Cue Demos",
    description: "How to trigger instant audio/tablet cues to field coaches during sprint starts, acceleration corridors, and tactical press drills.",
    chapters: ["0:00 Headset Pairing", "2:10 Trigger Thresholds", "5:30 Tablet Heatmaps", "7:45 Post-Drill Export"]
  },
  {
    title: "Analytics Tutorial: Decoding Acute-to-Chronic Workload Ratios",
    duration: "11:15",
    category: "Analytics Tutorial",
    description: "Deep dive into sweet spot calibration (0.8 - 1.3 ACWR), preventing spike-induced soft-tissue strain, and coupled fatigue models.",
    chapters: ["0:00 Rolling vs EWMA", "3:40 Sweet Spot Corridors", "6:15 Fatigue Index Drift", "9:30 Clinical Guidelines"]
  },
  {
    title: "Match Suite Masterclass: Formation Detection & Press Resistance",
    duration: "16:05",
    category: "How-To Video",
    description: "Step-by-step video on importing live optical camera feeds, calibrating camera extrinsic matrices, and generating dynamic Voronoi space models.",
    chapters: ["0:00 Ingest Setup", "4:20 Lens Calibration", "8:50 Voronoi Dominance", "13:10 Halftime PDF Export"]
  }
];

export function ResourcesPage() {
  const search = Route.useSearch();
  const [activeTab, setActiveTab] = useState<ResourcesTab>(search.tab ?? "case-studies");

  useEffect(() => {
    if (search.tab && search.tab !== activeTab) {
      setActiveTab(search.tab);
    }
  }, [search.tab]);

  return (
    <>
      <PageIntro
        eyebrow="Proof & Education"
        title="Case Studies, Success Stories & Video Guides"
        text="Explore detailed national federation deployments, athlete outcome metrics, video tutorials, sports science research, and developer API documentation."
        action={
          <div className="flex flex-col items-end gap-3">
            <DemoBadge />
            <div className="flex flex-wrap gap-1 bg-secondary p-1 rounded-lg border border-border">
              <button
                type="button"
                onClick={() => setActiveTab("case-studies")}
                className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                  activeTab === "case-studies" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Case Studies
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("success-stories")}
                className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                  activeTab === "success-stories" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Success Stories
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("video-guides")}
                className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                  activeTab === "video-guides" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Video Guides
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("blog")}
                className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                  activeTab === "blog" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Blog &amp; Articles
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("knowledge-base")}
                className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                  activeTab === "knowledge-base" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Guides
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("api")}
                className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                  activeTab === "api" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                API Specs
              </button>
            </div>
          </div>
        }
      />

      <section className="py-12 bg-background">
        <div className="content-wrap">
          {/* Research & Clinical Proof Showcase Banner */}
          <div className="mb-10 surface-card overflow-hidden border border-border/80">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[250px] overflow-hidden">
                <img
                  src={arenaImage}
                  alt="Sports Science Proof & Tactical Research"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-background/95" />
                <div className="absolute bottom-4 left-4 rounded-md bg-background/80 backdrop-blur-md px-3 py-1.5 border border-primary/30">
                  <span className="text-[11px] font-mono font-semibold uppercase text-primary flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Validated Clinical &amp; Peer-Reviewed Field Proof
                  </span>
                </div>
              </div>
              <div className="p-6 lg:p-8 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary">
                    <Sparkles className="h-3.5 w-3.5" /> Peer-Reviewed Science · SportsMax Labs
                  </div>
                  <h3 className="mt-1 text-xl font-bold tracking-tight">Enterprise Deployments &amp; Verified Case Evidence</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    Explore empirical outcomes from National Olympic Centers, Premier League clubs, and European Athletics Federations implementing SportsMax computer vision and acute load governance.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 border-t border-border/60 pt-4">
                  <div className="rounded-lg bg-secondary/40 p-2.5">
                    <div className="text-[11px] text-muted-foreground uppercase font-mono">Injury Drop</div>
                    <div className="text-base font-bold font-mono text-emerald-500 mt-0.5">-42%</div>
                    <div className="text-[10px] text-muted-foreground">Soft-Tissue Risk</div>
                  </div>
                  <div className="rounded-lg bg-secondary/40 p-2.5">
                    <div className="text-[11px] text-muted-foreground uppercase font-mono">Turn Velocity</div>
                    <div className="text-base font-bold font-mono text-blue-500 mt-0.5">+8.4%</div>
                    <div className="text-[10px] text-muted-foreground">FIN Aquatics Center</div>
                  </div>
                  <div className="rounded-lg bg-secondary/40 p-2.5">
                    <div className="text-[11px] text-muted-foreground uppercase font-mono">Published Papers</div>
                    <div className="text-base font-bold font-mono text-foreground mt-0.5">14 Papers</div>
                    <div className="text-[10px] text-muted-foreground">BJSM &amp; JSCR</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Tab 1: Case Studies ─── */}
          {activeTab === "case-studies" && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Federations Studied", value: "38+", sub: "Olympic & Pro" },
                  { label: "Athletes Monitored", value: "4,200+", sub: "Multi-Sport" },
                  { label: "Avg ROI Achieved", value: "6.8×", sub: "Investment Return" },
                  { label: "Injury Rate Drop", value: "–42%", sub: "Soft-Tissue" },
                ].map((s) => (
                  <div key={s.label} className="surface-card p-4 text-center border border-border/60">
                    <div className="text-2xl font-black font-mono text-primary">{s.value}</div>
                    <div className="text-[11px] font-bold text-foreground mt-0.5">{s.label}</div>
                    <div className="text-[10px] text-muted-foreground">{s.sub}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {caseStudies.map((cs) => (
                  <div key={cs.team} className="surface-card p-6 flex flex-col justify-between hover:border-primary/50 transition group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{cs.type}</span>
                        <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">{cs.roi}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground leading-snug">{cs.team}</h3>
                      <p className="text-[11px] font-semibold text-muted-foreground mt-1">{cs.deployment}</p>
                      <div className="mt-3 inline-block rounded-md bg-primary/10 text-primary font-mono font-bold text-sm px-3 py-1.5 border border-primary/20">
                        {cs.metric}
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{cs.story}</p>
                      {cs.specs && (
                        <ul className="mt-4 space-y-1.5">
                          {cs.specs.map((spec) => (
                            <li key={spec} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                              <span className="mt-0.5 text-emerald-500 font-bold">✓</span>
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                      <span>Full Implementation Study</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="surface-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-primary/20 bg-primary/5">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-primary mb-1">White-Paper Library</div>
                  <p className="text-sm font-semibold text-foreground">Download full peer-reviewed methodology documents and IRB-approved field study protocols.</p>
                </div>
                <button type="button" className="shrink-0 rounded-lg bg-primary text-primary-foreground text-xs font-bold px-5 py-2.5 hover:bg-primary/90 transition">
                  Request Full Library →
                </button>
              </div>
            </div>
          )}

          {/* ─── Tab 2: Success Stories ─── */}
          {activeTab === "success-stories" && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Elite Athletes", value: "1,800+", sub: "Active Users" },
                  { label: "Avg PR Improvement", value: "+3.6%", sub: "Performance Gain" },
                  { label: "Injury Season Lost", value: "–58 days", sub: "Per Athlete/yr" },
                  { label: "Championship Golds", value: "47", sub: "SportsMax Athletes" },
                ].map((s) => (
                  <div key={s.label} className="surface-card p-4 text-center border border-border/60">
                    <div className="text-2xl font-black font-mono text-primary">{s.value}</div>
                    <div className="text-[11px] font-bold text-foreground mt-0.5">{s.label}</div>
                    <div className="text-[10px] text-muted-foreground">{s.sub}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {successStories.map((story) => (
                  <div key={story.athlete} className="surface-card p-5 flex flex-col justify-between hover:border-primary/50 transition group">
                    <div>
                      <span className="rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5">
                        🏅 {story.badge}
                      </span>
                      <h3 className="text-sm font-bold text-foreground mt-3 leading-snug">{story.athlete}</h3>
                      <div className="mt-2.5 inline-block rounded-md bg-primary/10 text-primary font-mono font-bold text-sm px-3 py-1.5 border border-primary/20 w-full text-center">
                        {story.metric}
                      </div>
                      <blockquote className="mt-3 text-[11px] text-muted-foreground italic leading-relaxed border-l-2 border-primary/40 pl-2.5">
                        "{story.quote}"
                      </blockquote>
                      <div className="mt-3 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold px-3 py-2">
                        📈 {story.delta}
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border flex flex-wrap gap-1.5">
                      {story.tags.map((t) => (
                        <span key={t} className="rounded bg-secondary text-foreground text-[10px] font-semibold px-2 py-0.5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="surface-card p-8 border border-amber-500/20 bg-amber-500/5">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-500 mb-3">Featured Testimonial</div>
                <blockquote className="text-lg font-semibold text-foreground italic leading-relaxed max-w-3xl">
                  "No other platform gave us submillisecond biometric latency, WADA compliance out of the box, and a coach dashboard that works offline. SportsMax changed how national programs prepare."
                </blockquote>
                <div className="mt-4 text-xs text-muted-foreground">
                  — Head of High-Performance, <span className="text-foreground font-bold">European Athletics Federation</span>
                </div>
              </div>
            </div>
          )}

          {/* ─── Tab 3: Video Guides ─── */}
          {activeTab === "video-guides" && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Training Videos", value: "84+", sub: "Expert Walkthroughs" },
                  { label: "Total Watch Hours", value: "12,000+", sub: "Community Views" },
                  { label: "Skill Levels", value: "3", sub: "Beginner → Expert" },
                  { label: "Avg Rating", value: "4.9★", sub: "Verified Coaches" },
                ].map((s) => (
                  <div key={s.label} className="surface-card p-4 text-center border border-border/60">
                    <div className="text-2xl font-black font-mono text-primary">{s.value}</div>
                    <div className="text-[11px] font-bold text-foreground mt-0.5">{s.label}</div>
                    <div className="text-[10px] text-muted-foreground">{s.sub}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {videoGuides.map((vg, i) => (
                  <div key={vg.title} className="surface-card overflow-hidden flex flex-col hover:border-primary/50 transition group">
                    <div className="relative bg-gradient-to-br from-primary/20 via-secondary to-background h-36 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
                      <div className="relative z-10 w-14 h-14 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center group-hover:scale-105 transition">
                        <span className="text-2xl">▶</span>
                      </div>
                      <div className="absolute top-3 right-3 rounded bg-background/80 backdrop-blur-sm px-2 py-1 text-[10px] font-mono font-bold text-foreground border border-border/50">
                        {vg.duration}
                      </div>
                      <div className="absolute bottom-3 left-3 rounded bg-primary/80 px-2 py-1 text-[10px] font-bold text-white uppercase tracking-wide">
                        {vg.category}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-foreground leading-snug">{vg.title}</h3>
                        <span className="shrink-0 rounded bg-secondary text-[10px] font-mono px-2 py-0.5 text-muted-foreground">#{i + 1}</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{vg.description}</p>
                      {vg.chapters && (
                        <div className="mt-4 space-y-1.5">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Chapter Timestamps</div>
                          {vg.chapters.map((ch) => (
                            <div key={ch} className="flex items-center gap-2.5 text-[11px] text-muted-foreground hover:text-foreground cursor-pointer transition">
                              <span className="font-mono text-primary">{ch.split(" ")[0]}</span>
                              <span>{ch.split(" ").slice(1).join(" ")}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                        <span className="text-xs font-semibold text-primary">▶ Watch Now</span>
                        <span className="text-[10px] text-muted-foreground font-mono">1080p · 60fps</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Tab 4: Blog & Articles ─── */}
          {activeTab === "blog" && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Published Articles", value: "230+", sub: "Sports Science & Tech" },
                  { label: "Expert Authors", value: "18", sub: "PhDs & Practitioners" },
                  { label: "Avg Read Time", value: "6 min", sub: "Peer-Vetted" },
                  { label: "Subscribers", value: "42,000", sub: "Coaches & Analysts" },
                ].map((s) => (
                  <div key={s.label} className="surface-card p-4 text-center border border-border/60">
                    <div className="text-2xl font-black font-mono text-primary">{s.value}</div>
                    <div className="text-[11px] font-bold text-foreground mt-0.5">{s.label}</div>
                    <div className="text-[10px] text-muted-foreground">{s.sub}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { cat: "Biomechanics", tag: "Research", title: "Ground Reaction Force Asymmetry as a Sprint Injury Predictor", excerpt: "Multi-season analysis of 620 sprinters reveals a >4% left-right GRF imbalance increases hamstring risk by 3.1× over the following 28 days.", author: "Dr. K. Müller", time: "8 min", badge: "BJSM Featured" },
                  { cat: "Load Management", tag: "Clinical", title: "ACWR Sweet Spot: How Elite Programs Govern Acute-to-Chronic Ratios", excerpt: "Detailed breakdown of EWMA vs rolling-window calculations, monotony avoidance, and how 0.8–1.3 zone enforcement reduced soft-tissue incidents by 38%.", author: "Prof. L. Bangsbo", time: "10 min", badge: "Editor's Pick" },
                  { cat: "Computer Vision", tag: "Technology", title: "120 FPS Optical Tracking vs IMU: Accuracy Comparison at Top Speed", excerpt: "Controlled field test comparing SportsMax optical pipeline against 9-axis IMU at 10.6 m/s sprint. Velocity error: 0.08 m/s optical vs 0.34 m/s IMU.", author: "SportsMax Labs", time: "6 min", badge: "Lab Report" },
                  { cat: "Swim Science", tag: "Research", title: "SWOLF Profiling for Olympic 400m Medley Relay Selection", excerpt: "Stroke-by-stroke SWOLF scoring used in final 8 weeks of Olympic qualifying to separate three technically identical candidates with 0.4s split margins.", author: "Dr. A. Popov", time: "7 min", badge: "Case Study" },
                  { cat: "Tactical Analysis", tag: "Game Intelligence", title: "Voronoi Dominance Maps: Quantifying Spatial Superiority in Possession Play", excerpt: "How Premier League analysts use dynamic Voronoi tessellation over 120,000 frame datasets to identify press-resistant corridor occupancy advantages.", author: "Analytics Desk", time: "9 min", badge: "Methodology" },
                  { cat: "Recovery Science", tag: "Wellness", title: "HRV-Gated Sleep Staging for Load Readiness Scoring", excerpt: "Four-week double-blind study correlating WHOOP-sourced overnight HRV coefficient with morning CTL drift and next-day session RPE outputs.", author: "Dr. S. Buchheit", time: "11 min", badge: "Peer-Reviewed" },
                ].map((a) => (
                  <div key={a.title} className="surface-card p-5 flex flex-col justify-between hover:border-primary/50 transition group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{a.cat}</span>
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">{a.tag}</span>
                      </div>
                      <h3 className="text-sm font-bold text-foreground leading-snug">{a.title}</h3>
                      <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">{a.excerpt}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-semibold text-foreground">{a.author}</div>
                        <div className="text-[10px] text-muted-foreground">{a.time} read</div>
                      </div>
                      <span className="rounded bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold px-2 py-0.5">{a.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Tab 5: Knowledge Base ─── */}
          {activeTab === "knowledge-base" && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Knowledge Articles", value: "340+", sub: "Indexed Answers" },
                  { label: "Protocols Documented", value: "86", sub: "Lab & Field" },
                  { label: "Avg Helpfulness", value: "98%", sub: "Verified Coaches" },
                  { label: "Updated", value: "Weekly", sub: "Sport Science Team" },
                ].map((s) => (
                  <div key={s.label} className="surface-card p-4 text-center border border-border/60">
                    <div className="text-2xl font-black font-mono text-primary">{s.value}</div>
                    <div className="text-[11px] font-bold text-foreground mt-0.5">{s.label}</div>
                    <div className="text-[10px] text-muted-foreground">{s.sub}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { q: "How is SWOLF calculated and interpreted?", a: "SWOLF = swim time (seconds) + stroke count per length. Lower scores indicate greater hydrodynamic efficiency. Elite competitive swimmers target SWOLF 30–38 in 50m pools. SportsMax tracks SWOLF trend over mesocycles to quantify technical gains independent of fitness improvements." },
                  { q: "What constitutes the ACWR safe zone?", a: "The acute-to-chronic workload ratio sweet spot is 0.8–1.3. Ratios above 1.5 increase soft-tissue injury risk by 2–4× based on Gabbett (2016) and cross-validated SportsMax field data across 640 professional athletes across 3 seasons." },
                  { q: "How does Ground Contact Time (GCT) affect performance?", a: "GCT under 120ms is characteristic of sub-10s sprinters. Asymmetries >4% between left and right GCT are strong predictors of hamstring and plantar fascia overuse. SportsMax raises real-time flags when GCT L/R delta exceeds user-configurable thresholds." },
                  { q: "What is CTL, ATL, and TSB in the training model?", a: "Chronic Training Load (CTL) = 42-day EWMA of daily load. Acute Training Load (ATL) = 7-day EWMA. Training Stress Balance (TSB) = CTL − ATL, indicating form. Positive TSB (>+5) = rested and peaking. SportsMax computes all three with sub-1hr refresh." },
                  { q: "How is Voronoi dominance used in tactical analysis?", a: "Voronoi tessellation assigns each field position to the nearest player, quantifying spatial dominance. SportsMax runs 50,000 Delaunay triangulations per session at 25 FPS, producing real-time Dominant Area Coverage (DAC) scores that predict press efficiency and transition vulnerability." },
                  { q: "What wearables and sensors integrate with SportsMax?", a: "Native integrations: Catapult Vector, STATSports Apex, Garmin HRM-Pro, Polar Vantage, WHOOP 4.0, Polar H10, Firstbeat Analytics, Wahoo ELEMNT. Raw CSV/JSON/FIT uploads supported for 140+ additional sensor types via the open ingest API." },
                  { q: "How does the biometric data vault achieve HIPAA/WADA compliance?", a: "Data is AES-256 encrypted at rest and TLS 1.3 in transit. Athlete records are pseudonymized at ingest using rotating SHA-256 identifiers. Vault audit logs meet HIPAA §164.312(b) and WADA ISTI Article 5.7.3 chain-of-custody requirements. SOC 2 Type II certified." },
                  { q: "How accurate is the 120 FPS computer vision tracking?", a: "In controlled ISO-8855 benchmarks, SportsMax optical tracking achieves position accuracy of ±1.2 cm and velocity accuracy of ±0.08 m/s at speeds up to 12 m/s. Multi-camera occlusion recovery maintains identity continuity in >99.4% of frames tested." },
                ].map((item) => (
                  <div key={item.q} className="border border-border rounded-xl p-5 bg-secondary/20 hover:border-primary/40 transition">
                    <h4 className="font-bold text-sm text-foreground flex items-start gap-2">
                      <span className="shrink-0 mt-0.5 text-primary font-black text-base">Q</span>
                      {item.q}
                    </h4>
                    <p className="text-[11px] text-muted-foreground mt-2.5 leading-relaxed pl-5">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── Tab 6: API Specs ─── */}
          {activeTab === "api" && (
            <div className="space-y-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "REST Endpoints", value: "120+", sub: "v1 & v2 Stable" },
                  { label: "WebSocket Streams", value: "14", sub: "Real-Time Feeds" },
                  { label: "Avg Latency", value: "<18ms", sub: "P99 @ Production" },
                  { label: "Uptime SLA", value: "99.97%", sub: "Enterprise Tier" },
                ].map((s) => (
                  <div key={s.label} className="surface-card p-4 text-center border border-border/60">
                    <div className="text-2xl font-black font-mono text-primary">{s.value}</div>
                    <div className="text-[11px] font-bold text-foreground mt-0.5">{s.label}</div>
                    <div className="text-[10px] text-muted-foreground">{s.sub}</div>
                  </div>
                ))}
              </div>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="surface-card overflow-hidden">
                  <div className="border-b border-border/60 px-5 py-3 flex items-center gap-3">
                    <span className="rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5">GET</span>
                    <span className="font-mono text-xs text-foreground">/v2/athletes/:id/telemetry/latest</span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground mb-3">Returns the most recent telemetry snapshot for a given athlete, including biometric, kinematic, and workload metrics.</p>
                    <pre className="rounded-lg bg-background border border-border p-4 font-mono text-[11px] text-foreground overflow-x-auto">{`{
  "athleteId": "ath_94821",
  "sport": "running",
  "timestamp": "2026-10-03T06:45:00Z",
  "metrics": {
    "pace_ms": 5.14,
    "cadence_spm": 170,
    "heartRate_bpm": 156,
    "vo2MaxEst": 54.2,
    "gct_ms": { "left": 118, "right": 121 },
    "vertOsc_cm": 8.3,
    "acwr": 1.12,
    "atl": 312,
    "ctl": 278
  }
}`}</pre>
                  </div>
                </div>
                <div className="surface-card overflow-hidden">
                  <div className="border-b border-border/60 px-5 py-3 flex items-center gap-3">
                    <span className="rounded bg-blue-500/15 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-0.5">POST</span>
                    <span className="font-mono text-xs text-foreground">/v2/sessions/ingest</span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground mb-3">Ingest a complete session data payload. Supports GPS, IMU, optical, and HRV streams in a single request body.</p>
                    <pre className="rounded-lg bg-background border border-border p-4 font-mono text-[11px] text-foreground overflow-x-auto">{`{
  "sessionId": "ses_2026_10_03_AM",
  "teamId": "team_sparta_fc",
  "sport": "football",
  "streams": {
    "gps": [],
    "imu": [],
    "optical": { "fps": 120, "cameras": 8 },
    "hrv": { "source": "whoop4" }
  },
  "tags": ["pre-season", "week-4"]
}`}</pre>
                  </div>
                </div>
                <div className="surface-card overflow-hidden lg:col-span-2">
                  <div className="border-b border-border/60 px-5 py-3 flex items-center gap-3">
                    <span className="rounded bg-purple-500/15 text-purple-600 dark:text-purple-400 text-[10px] font-bold px-2 py-0.5">WS</span>
                    <span className="font-mono text-xs text-foreground">wss://stream.sportsmax.io/v2/live/:sessionId</span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground mb-3">Real-time bidirectional WebSocket stream. Push sensor frames every 8ms, receive processed telemetry events, alerts, and coach cue triggers with P99 latency under 18ms.</p>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {[
                        { event: "telemetry.update", desc: "Kinematic & biometric frame at configured sample rate", rate: "8ms interval" },
                        { event: "alert.acwr_spike", desc: "Fired when ACWR exceeds configured threshold (default 1.3)", rate: "Immediate" },
                        { event: "cue.coach_trigger", desc: "Push real-time text/audio cue to coach tablet or earpiece", rate: "On-demand" },
                      ].map((ev) => (
                        <div key={ev.event} className="rounded-lg bg-secondary/40 border border-border p-3">
                          <div className="font-mono text-[10px] text-primary font-bold">{ev.event}</div>
                          <div className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{ev.desc}</div>
                          <div className="mt-1.5 text-[10px] font-mono text-foreground">{ev.rate}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="surface-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-primary/20 bg-primary/5">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-primary mb-1">Developer Sandbox</div>
                  <p className="text-sm font-semibold text-foreground">Get a free API key, explore 120+ endpoints, and stream simulated telemetry in our interactive Postman environment.</p>
                </div>
                <button type="button" className="shrink-0 rounded-lg bg-primary text-primary-foreground text-xs font-bold px-5 py-2.5 hover:bg-primary/90 transition">
                  Access Dev Portal →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
