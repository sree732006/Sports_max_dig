import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText,
  Download,
  TrendingUp,
  Activity,
  Shield,
  Zap,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Filter,
  BarChart3,
  Award,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Sports Performance Reports & Intelligence Benchmarks — SportsMax" },
      {
        name: "description",
        content:
          "Access executive sports intelligence whitepapers, quarterly biomechanics indexes, and tactical match benchmarks across 24+ individual and team sports.",
      },
      { property: "og:title", content: "Sports Performance Reports & Intelligence Benchmarks — SportsMax" },
      {
        property: "og:description",
        content: "Download verified athletic telemetry benchmarks, injury reduction whitepapers, and tactical xG models.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/reports" }],
  }),
  component: UserReportsPage,
});

interface PublicReport {
  id: string;
  title: string;
  category: "Biomechanics" | "Tactical" | "Injury Prevention" | "Industry Benchmark";
  sport: string;
  publishedDate: string;
  pages: number;
  readTime: string;
  fileSize: string;
  badge: string;
  summary: string;
  keyFindings: string[];
  metrics: { label: string; value: string }[];
}

const PUBLIC_REPORTS: PublicReport[] = [
  {
    id: "rep-2026-q3-biomechanics",
    title: "Q3 2026 Elite Athletics Biomechanics & Kinetic Load Index",
    category: "Biomechanics",
    sport: "Track & Field · Distance Running",
    publishedDate: "October 2026",
    pages: 28,
    readTime: "12 min read",
    fileSize: "2.4 MB PDF",
    badge: "Quarterly Benchmark",
    summary:
      "A comprehensive longitudinal study analyzing ground contact time (GCT), vertical oscillation, and asymmetric valgus impact across 1,420 collegiate and elite sprinters and distance runners.",
    keyFindings: [
      "Sub-180ms ground contact time correlated with a 4.2% increase in forward horizontal velocity.",
      "Asymmetric footstrike impact (>6% delta) was the primary precursor in 78% of lower-leg stress fractures.",
      "Targeted cadence tuning (+5 spm) reduced patellofemoral joint loading by 14.8%.",
    ],
    metrics: [
      { label: "Athletes Evaluated", value: "1,420" },
      { label: "GCT Precision", value: "< 2ms" },
      { label: "Injury Risk Reduction", value: "31%" },
    ],
  },
  {
    id: "rep-2026-football-xg",
    title: "Tactical Pitch Control & High-Press Expected Goals (xG) Analysis",
    category: "Tactical",
    sport: "Football / Soccer",
    publishedDate: "September 2026",
    pages: 34,
    readTime: "16 min read",
    fileSize: "3.8 MB PDF",
    badge: "Tactical Whitepaper",
    summary:
      "Evaluating defensive compactness, pressing intensity (PPDA), and transition counter-attack efficiency using 60 FPS optical computer vision tracking across top professional leagues.",
    keyFindings: [
      "High-press turnovers in the attacking third yielded 0.42 xG per possession compared to 0.08 in settled buildup.",
      "Compactness variance of less than 22 meters between defensive and midfield lines minimized progressive pass completions to under 12%.",
      "Automated optical tracking delivered sub-second tactical phase transition detection.",
    ],
    metrics: [
      { label: "Matches Audited", value: "380" },
      { label: "Tracking Rate", value: "60 FPS" },
      { label: "Counter-Press Lift", value: "+28% xG" },
    ],
  },
  {
    id: "rep-2026-acl-prevention",
    title: "Computer Vision Joint Kinematics & ACL Non-Contact Prevention",
    category: "Injury Prevention",
    sport: "Basketball · Football · Multi-Sport",
    publishedDate: "August 2026",
    pages: 22,
    readTime: "10 min read",
    fileSize: "1.9 MB PDF",
    badge: "Medical & Safety",
    summary:
      "Markerless 3D pose estimation applied to jump-landing mechanics, quantifying dynamic knee valgus angles and eccentric deceleration forces to safeguard athlete longevity.",
    keyFindings: [
      "Dynamic valgus deviation exceeding 12° during decelerations flagged high-risk injury probability 3 weeks before symptom onset.",
      "Automated fatigue monitoring identified a 22% degradation in hamstring-to-quadriceps co-contraction ratio in late-game quarters.",
      "Real-time sideline camera alerts enabled coaching staffs to pull at-risk athletes for targeted neuromuscular activation.",
    ],
    metrics: [
      { label: "Markerless Accuracy", value: "99.1%" },
      { label: "Valgus Detection", value: "< 1.5°" },
      { label: "Preventable Injuries", value: "42%" },
    ],
  },
  {
    id: "rep-2026-swolf-hydrodynamics",
    title: "Hydrodynamic Velocity Curves & SWOLF Efficiency in Competitive Swimming",
    category: "Industry Benchmark",
    sport: "Aquatics · Sprint & Mid-Distance",
    publishedDate: "July 2026",
    pages: 18,
    readTime: "8 min read",
    fileSize: "1.6 MB PDF",
    badge: "Performance Guide",
    summary:
      "Mapping stroke rate, stroke count, and underwater streamline drag curves to determine optimal personal energy expenditure and turnover pacing for national-level swimmers.",
    keyFindings: [
      "Maintaining a SWOLF score between 31 and 33 preserved peak mitochondrial output through final 25m splits.",
      "Under-surface breakout angles optimized between 14° and 16° conserved 0.38 seconds per turn cycle.",
      "Automated video stroke-rate analysis replaced manual stopwatch timing with 99.8% precision.",
    ],
    metrics: [
      { label: "Stroke Cadence", value: "54 SPM" },
      { label: "Time Saved per Turn", value: "0.38s" },
      { label: "Benchmark SWOLF", value: "32.4" },
    ],
  },
];

function UserReportsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const filteredReports =
    activeCategory === "All"
      ? PUBLIC_REPORTS
      : PUBLIC_REPORTS.filter((r) => r.category === activeCategory);

  const handleDownload = (report: PublicReport) => {
    setDownloadingId(report.id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccess(report.id);
      setTimeout(() => setDownloadSuccess(null), 4000);
    }, 1200);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-background via-secondary/20 to-primary/5 py-16 lg:py-20">
        <div className="sport-grid absolute inset-0 opacity-20 pointer-events-none" />
        <div className="content-wrap relative z-10">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              <BookOpen className="h-3.5 w-3.5" />
              Intelligence &amp; Research Publications
            </div>

            <h1 className="font-display text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.05]">
              Sports Performance &amp;{" "}
              <span className="text-primary">Intelligence Reports</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
              Peer-audited research papers, quarterly sports science telemetry indexes, and tactical data benchmarks
              engineered for high-performance clubs, coaching staffs, and athletic federations.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="font-bold shadow-md">
                <a href="#featured-reports">
                  Explore Reports <ArrowRight className="h-4 w-4 ml-1.5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-semibold bg-card/80">
                <Link to="/contact">Request Custom Club Audit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Aggregate Benchmark Stats Bar */}
      <section className="border-b border-border bg-secondary/40 py-7">
        <div className="content-wrap">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="surface-card p-4 flex items-center gap-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                <Award className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-2xl font-black text-foreground">24+</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Sports Benchmarked</div>
              </div>
            </div>

            <div className="surface-card p-4 flex items-center gap-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-sky-500/10 text-sky-500 shrink-0">
                <Activity className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-2xl font-black text-foreground">1,400+</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Athletes Audited</div>
              </div>
            </div>

            <div className="surface-card p-4 flex items-center gap-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                <Shield className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-2xl font-black text-foreground">99.1%</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Pose Engine Accuracy</div>
              </div>
            </div>

            <div className="surface-card p-4 flex items-center gap-3.5">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-purple-500/10 text-purple-500 shrink-0">
                <Zap className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-2xl font-black text-foreground">&lt; 50ms</div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Telemetry Inference</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reports Directory & Filter */}
      <section id="featured-reports" className="py-14 bg-background">
        <div className="content-wrap space-y-8">
          {/* Header & Filter Pills */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-5">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Curated Research Library
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Filter by scientific domain or athletic discipline to review methodology and executive findings.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-1.5 bg-secondary/80 p-1 rounded-lg border border-border">
              {["All", "Biomechanics", "Tactical", "Injury Prevention", "Industry Benchmark"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Report Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredReports.map((report) => (
              <article
                key={report.id}
                className="surface-card flex flex-col justify-between p-6 sm:p-7 border hover:border-primary/50 transition-all shadow-xs hover:shadow-lg rounded-2xl group bg-card"
              >
                <div>
                  {/* Meta Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                      {report.badge}
                    </span>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {report.publishedDate} · {report.readTime}
                    </span>
                  </div>

                  {/* Title & Sport */}
                  <h3 className="font-display text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {report.title}
                  </h3>
                  <div className="text-xs font-semibold text-primary mt-1 mb-3">
                    Sport Discipline: {report.sport}
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                    {report.summary}
                  </p>

                  {/* Key Takeaways */}
                  <div className="rounded-xl bg-secondary/50 p-4 border border-border/60 mb-5">
                    <div className="text-xs font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-primary" /> Core Findings &amp; Takeaways:
                    </div>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {report.keyFindings.map((finding, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Statistical Key Metrics */}
                  <div className="grid grid-cols-3 gap-2 border-t border-border/60 pt-4 mb-6 text-center">
                    {report.metrics.map((m, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-background border border-border/50">
                        <div className="font-display text-base font-extrabold text-foreground">{m.value}</div>
                        <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-[11px] text-muted-foreground font-mono">
                    Format: {report.fileSize} · {report.pages} Pages
                  </div>
                  <Button
                    size="sm"
                    className="font-bold gap-1.5"
                    disabled={downloadingId === report.id}
                    onClick={() => handleDownload(report)}
                  >
                    {downloadingId === report.id ? (
                      "Generating Brief…"
                    ) : downloadSuccess === report.id ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-300" /> Brief Ready!
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" /> Download PDF Summary
                      </>
                    )}
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Custom Audit & Lead Capture Banner */}
          <div className="surface-card rounded-2xl p-8 border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-card to-background shadow-xl mt-12">
            <div className="grid gap-6 lg:grid-cols-12 items-center">
              <div className="lg:col-span-8">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary block mb-2">
                  Federation &amp; Club Audits
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                  Need a Customized Benchmark for Your Team or Athlete Roster?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  We generate tailored biometric and tactical telemetry reports configured specifically for your competition
                  schedules, athlete fatigue models, and tactical setups.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <Button asChild size="lg" className="font-bold shadow-md">
                  <Link to="/book-appointment">Book Performance Consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="font-semibold bg-card">
                  <Link to="/contact">Inquire for Academies</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
