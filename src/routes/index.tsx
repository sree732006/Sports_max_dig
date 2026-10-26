import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BarChart2,
  BrainCircuit,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  Cpu,
  Database,
  Flame,
  Gauge,
  Goal,
  HeartPulse,
  Globe,
  Layers,
  Lock,
  Milestone,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Trophy,
  User,
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
import arenaImage from "@/assets/sports_tactical_arena_1792572299956.jpg";
import labImage from "@/assets/athlete_biometrics_lab_1792572320926.jpg";
import clusterImage from "@/assets/ai_sports_cluster_1792572342884.jpg";
import swimImage from "@/assets/swimming_biomechanics_1792572365169.jpg";
import pipelineImage from "@/assets/platform_pipeline_architecture_1792587658686.jpg";
import securityImage from "@/assets/platform_security_compliance_1792587680531.jpg";
import { ConnectWithSportsMax } from "@/components/connect-with-sportsmax";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SportsMax — Full-Spectrum Sports AI Engineering & Performance Intelligence" },
      {
        name: "description",
        content:
          "Enterprise-grade sports AI engineering: High-density biomechanical pipelines, computer vision inference, autonomous coaching fleets, and multi-sport telemetry across 24+ disciplines.",
      },
      { property: "og:title", content: "SportsMax — Full-Spectrum Sports AI & Tactical Engineering" },
      {
        property: "og:description",
        content: "From stadium optical tracking to athlete biometric laboratories, deploy enterprise AI systems designed for human performance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

interface HeroSlide {
  id: string;
  badge: string;
  badgeCode: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  primaryHref: string;
  primaryText: string;
  secondaryHref: string;
  secondaryText: string;
  metrics: { label: string; val: string }[];
  consoleTitle: string;
  consoleTag: string;
  consoleItems: { icon: typeof Activity; label: string; val: string; status: string; color: string }[];
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "olympic-kinematics",
    badge: "BIOMECHANICAL INFERENCE · HIGH-SPEED TRACK",
    badgeCode: "01 // 05 · KINEMATICS",
    title: "TURN SPORTS DATA INTO",
    highlight: "PERFORMANCE INTELLIGENCE",
    description:
      "SportsMax combines individual athlete biometrics, team tactics, optical computer vision, and automated coaching cues across 24+ certified disciplines with sub-38ms live edge inference.",
    image: runnerImage,
    primaryHref: "/sports",
    primaryText: "Explore Sports Hub",
    secondaryHref: "/platform",
    secondaryText: "How It Works",
    metrics: [
      { label: "DIRECTORY", val: "24+ Sports" },
      { label: "LIVE LATENCY", val: "< 38ms Edge" },
      { label: "MODEL ACCURACY", val: "99.8% Precision" },
      { label: "CERTIFICATION", val: "WADA & FIFA EPP" },
    ],
    consoleTitle: "LIVE KINEMATIC STREAM",
    consoleTag: "ATHLETE #42 · ACTIVE",
    consoleItems: [
      { icon: Gauge, label: "Cadence Velocity", val: "174 spm", status: "OPTIMAL", color: "text-emerald-500" },
      { icon: HeartPulse, label: "Heart Rate Reserve", val: "88% HRR", status: "ZONE 4", color: "text-amber-500" },
      { icon: Cpu, label: "Skeletal 3D Pose", val: "24 Points", status: "120 FPS", color: "text-primary" },
      { icon: Zap, label: "Ground Reaction", val: "2.8x BW", status: "STABLE", color: "text-teal-400" },
    ],
  },
  {
    id: "tactical-arena",
    badge: "STADIUM SPATIAL AI · FULL PITCH TRIANGULATION",
    badgeCode: "02 // 05 · SPATIAL AI",
    title: "REAL-TIME MATCH SPATIALIZATION &",
    highlight: "TACTICAL PITCH CONTROL",
    description:
      "Continuous Voronoi pitch mapping, pressing triggers (PPDA), and expected threat (xT) calculated across 32 synchronized 4K optical cameras for sideline coaching staffs.",
    image: arenaImage,
    primaryHref: "/sports/game-analysis",
    primaryText: "Tactical Analysis Suite",
    secondaryHref: "/sports/football",
    secondaryText: "Football xG Analytics",
    metrics: [
      { label: "PITCH COVERAGE", val: "105m x 68m Grid" },
      { label: "OPTICAL SYNC", val: "32 Cameras" },
      { label: "METRIC MODELS", val: "xG, xT, PPDA, OBV" },
      { label: "COMPLIANCE", val: "UEFA & Premier League" },
    ],
    consoleTitle: "PITCH SPATIAL TELEMETRY",
    consoleTag: "STADIUM CAM #08",
    consoleItems: [
      { icon: Goal, label: "Pitch Dominance", val: "61.4%", status: "ATTACK ZONE", color: "text-primary" },
      { icon: Users, label: "Compact Line Dist", val: "18.2m", status: "BALANCED", color: "text-emerald-500" },
      { icon: Radio, label: "Optical Ray Cast", val: "0.2ms Genlock", status: "SYNCED", color: "text-teal-400" },
      { icon: Trophy, label: "Expected Threat", val: "+0.18 xT", status: "HIGH RISK", color: "text-amber-500" },
    ],
  },
  {
    id: "neural-cluster",
    badge: "DISTRIBUTED GPU FABRIC · TENSORRT FP16",
    badgeCode: "03 // 05 · INFRASTRUCTURE",
    title: "MISSION-CRITICAL ATHLETIC AI AT",
    highlight: "GLOBAL SCALE & ZERO DOWNTIME",
    description:
      "Industrial edge clusters with hardware GPUDirect RDMA, custom CUDA kernels, and zero-trust sovereign athlete data enclaves operating fully air-gapped in stadium hubs.",
    image: clusterImage,
    primaryHref: "/platform",
    primaryText: "Deep Tech Architecture",
    secondaryHref: "/platform",
    secondaryText: "CUDA Kernels Spec",
    metrics: [
      { label: "GPU COMPUTE", val: "Hopper / TensorRT" },
      { label: "BUFFER LATENCY", val: "< 15ms Ingest" },
      { label: "AIR-GAP RESILIENCE", val: "100% Offline" },
      { label: "SECURITY", val: "SOC 2 Type II" },
    ],
    consoleTitle: "EDGE COMPUTE TELEMETRY",
    consoleTag: "CLUSTER 04 · MADRID",
    consoleItems: [
      { icon: Cpu, label: "TensorRT VRAM Load", val: "42% Util", status: "HEALTHY", color: "text-emerald-500" },
      { icon: Zap, label: "Inference Loop", val: "18.4ms", status: "TARGET MET", color: "text-primary" },
      { icon: Database, label: "Timeseries Ingest", val: "1.4 GB/min", status: "STREAMING", color: "text-teal-400" },
      { icon: Shield, label: "Memory Isolation", val: "AMD SEV-SNP", status: "LOCKED", color: "text-emerald-400" },
    ],
  },
  {
    id: "hydrodynamic-swimming",
    badge: "MULTI-MEDIUM OPTICS · WATER REFRACTION SOLVERS",
    badgeCode: "04 // 05 · BIOMECHANICS",
    title: "REFRACTION-COMPENSATED",
    highlight: "AQUATIC & FIELD DYNAMICS",
    description:
      "Proprietary deep neural solvers track joint kinematics through turbulent water surfaces and severe optical occlusion with 0.02° angular error across 4.8M validated frames.",
    image: swimImage,
    primaryHref: "/sports/swimming",
    primaryText: "Explore Swimming Hub",
    secondaryHref: "/sports/athletics/high-jump",
    secondaryText: "High Jump Apex",
    metrics: [
      { label: "DATA DATASET", val: "4.8M Kinetic Frames" },
      { label: "JOINT ERROR", val: "± 0.02° Margin" },
      { label: "SWOLF INDEX", val: "Real-time Strokes" },
      { label: "AQUATIC SYNC", val: "Underwater Pods" },
    ],
    consoleTitle: "HYDRODYNAMIC SOLVER",
    consoleTag: "LANE 4 · 50M OLYMPIC",
    consoleItems: [
      { icon: Waves, label: "Stroke Efficiency", val: "31.8 SWOLF", status: "PERSONAL BEST", color: "text-teal-400" },
      { icon: Gauge, label: "Stroke Cadence", val: "44.2 spm", status: "STEADY", color: "text-emerald-500" },
      { icon: BrainCircuit, label: "Surface Refraction", val: "Compensated", status: "ACTIVE", color: "text-primary" },
      { icon: Activity, label: "Hydro Drag Moment", val: "142.6 N", status: "STREAMLINED", color: "text-amber-400" },
    ],
  },
  {
    id: "sovereign-vault",
    badge: "ZERO-TRUST VAULT · SOVEREIGN ATHLETE PRIVACY",
    badgeCode: "05 // 05 · GOVERNANCE",
    title: "CONFIDENTIAL ATHLETE DATA LAKES &",
    highlight: "SOVEREIGN ENCLAVES",
    description:
      "Protect your club's biometric intellectual property. Hardware-encrypted memory with AMD SEV & Intel SGX ensures EHR-grade medical compliance under strict HIPAA and GDPR Art. 9 rules.",
    image: securityImage,
    primaryHref: "/platform",
    primaryText: "Security & Governance",
    secondaryHref: "/contact",
    secondaryText: "Request Briefing",
    metrics: [
      { label: "ENCRYPTION", val: "AES-256 GCM" },
      { label: "DATA RESIDENCY", val: "Regional Sovereign" },
      { label: "STANDARDS", val: "ISO 27001 / HIPAA" },
      { label: "AUDIT LEDGER", val: "Immutable Append" },
    ],
    consoleTitle: "CONFIDENTIAL ENCLAVE",
    consoleTag: "SECURITY VAULT",
    consoleItems: [
      { icon: Lock, label: "Biometric Schema", val: "Zero-Knowledge", status: "ENCRYPTED", color: "text-emerald-400" },
      { icon: ShieldCheck, label: "Tenant Isolation", val: "Cryptographic", status: "PASS", color: "text-primary" },
      { icon: Database, label: "Audit Ledger", val: "Immutable", status: "VERIFIED", color: "text-teal-400" },
      { icon: Globe, label: "Data Residency", val: "EU / US / UK", status: "COMPLIANT", color: "text-emerald-500" },
    ],
  },
];

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const slideDuration = 6000; // 6s per slide

  // Automatic background rotation with smooth progress bar
  useEffect(() => {
    if (isPaused) return;

    const intervalStep = 50;
    const increment = (intervalStep / slideDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % HERO_SLIDES.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentSlide((curr) => (curr + 1) % HERO_SLIDES.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((curr) => (curr - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgress(0);
  };

  const active = HERO_SLIDES[currentSlide] ?? HERO_SLIDES[0]!;

  return (
    <>
      {/* Dynamic Animated Multi-Slide Hero (Precision Motion & GreenNext Style) */}
      <section
        className="relative flex w-full min-h-[min(880px,94vh)] items-center overflow-hidden bg-slate-950 text-white select-none pt-18 border-b border-border/80"
        aria-label="SportsMax Dynamic AI Infrastructure Showcase"
      >
        {/* Layer 1: Background Images with Smooth Crossfade & Ken-Burns Zoom */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          {HERO_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                width={1920}
                height={1080}
                className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08] animate-ken-burns"
              />
            </div>
          ))}

          {/* Precision Gradient Overlays for Guaranteed Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/40 z-15" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-950/80 to-transparent z-15" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950 to-transparent z-15" />

          {/* Grid pattern aesthetic */}
          <div
            className="absolute inset-0 opacity-[0.045] pointer-events-none z-20"
            style={{
              backgroundImage: "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        {/* Layer 2: Main Hero Content Wrap */}
        <div className="content-wrap relative z-30 py-12 md:py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left 7 Cols: Dynamic Copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 border border-primary/30 bg-slate-900/90 px-3.5 py-1.5 backdrop-blur-md rounded-md mb-4 shadow-sm">
                <span className="size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(34,197,94,0.9)] animate-pulse" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
                  {active.badge}
                </span>
                <span className="text-slate-500 font-mono hidden sm:inline">|</span>
                <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                  {active.badgeCode}
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[1.02] tracking-tight text-white drop-shadow-md">
                {active.title}{" "}
                <span className="text-primary block mt-1 tracking-tight">
                  {active.highlight}
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm sm:text-base text-slate-200 leading-relaxed font-normal drop-shadow-sm min-h-[4.5rem]">
                {active.description}
              </p>

              {/* Offerings & Specs Quick Bar */}
              <div className="mt-6 w-full max-w-2xl rounded-xl border border-white/15 bg-slate-900/85 p-3.5 backdrop-blur-md shadow-xl">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                  {active.metrics.map((m, midx) => (
                    <div key={midx} className={`pt-2 sm:pt-0 ${midx > 0 ? "sm:pl-3" : ""}`}>
                      <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                        {m.label}
                      </span>
                      <p className="mt-0.5 text-xs font-semibold text-white tracking-tight">
                        {m.val}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40">
                  <Link to={active.primaryHref}>
                    {active.primaryText} <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="font-semibold bg-slate-900/60 border-white/20 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to={active.secondaryHref}>
                    {active.secondaryText}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="font-semibold text-slate-300 hover:text-white hover:bg-white/5"
                >
                  <Link to="/sports/game-analysis">
                    Match Analysis Suite &rarr;
                  </Link>
                </Button>
              </div>

              {/* Quick-Jump Sport Pills */}
              <div className="mt-8 flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
                  Jump to Sport:
                </span>
                <Link
                  to="/sports/running"
                  className="rounded-full bg-slate-900/80 border border-white/15 px-3 py-1 text-xs font-semibold text-white hover:border-primary/60 hover:text-primary shadow-xs transition"
                >
                  🏃 Running (Pace & Cadence)
                </Link>
                <Link
                  to="/sports/swimming"
                  className="rounded-full bg-slate-900/80 border border-white/15 px-3 py-1 text-xs font-semibold text-white hover:border-primary/60 hover:text-primary shadow-xs transition"
                >
                  🏊 Swimming (SWOLF)
                </Link>
                <Link
                  to="/sports/athletics/high-jump"
                  className="rounded-full bg-slate-900/80 border border-white/15 px-3 py-1 text-xs font-semibold text-white hover:border-primary/60 hover:text-primary shadow-xs transition"
                >
                  👟 High Jump (2.28m)
                </Link>
                <Link
                  to="/sports/football"
                  className="rounded-full bg-slate-900/80 border border-white/15 px-3 py-1 text-xs font-semibold text-white hover:border-primary/60 hover:text-primary shadow-xs transition"
                >
                  ⚽ Football (xG & xT)
                </Link>
                <Link
                  to="/sports/hockey"
                  className="rounded-full bg-slate-900/80 border border-white/15 px-3 py-1 text-xs font-semibold text-white hover:border-primary/60 hover:text-primary shadow-xs transition"
                >
                  🏒 Hockey (Corsi)
                </Link>
              </div>
            </div>

            {/* Right 5 Cols: Dynamic Live Telemetry Console (GreenNext Style) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-white/15 bg-slate-900/90 p-6 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300">
                      {active.consoleTitle}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-primary font-bold bg-primary/10 border border-primary/25 px-2 py-0.5 rounded">
                    {active.consoleTag}
                  </span>
                </div>

                {/* 4 Telemetry Metrics */}
                <div className="space-y-3 py-1">
                  {active.consoleItems.map((item, cidx) => (
                    <div
                      key={cidx}
                      className="p-3 rounded-lg border border-white/10 bg-slate-950/80 flex items-center justify-between hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className={`h-4 w-4 ${item.color}`} />
                        <span className="text-xs text-white font-medium">{item.label}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-white">{item.val}</div>
                        <div className="text-[9px] font-mono text-primary uppercase">{item.status}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Engine: SportsMax Neural V4.2</span>
                  <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    SUB-38MS LIVE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Slide Controller Bar (Precision Motion Style) */}
          <div className="mt-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Slide Navigation Progress Bars */}
            <div className="flex items-center gap-2 flex-1 w-full max-w-lg" role="tablist" aria-label="Hero Slide Navigation">
              {HERO_SLIDES.map((slide, sidx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(sidx)}
                  className="flex-1 h-2 rounded-full overflow-hidden bg-white/20 relative hover:bg-white/35 transition cursor-pointer"
                  aria-label={`Go to slide ${sidx + 1}: ${slide.title}`}
                  aria-selected={sidx === currentSlide}
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-primary transition-all duration-75 ease-linear rounded-full"
                    style={{
                      width: sidx === currentSlide ? `${progress}%` : sidx < currentSlide ? "100%" : "0%",
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Slide Number + Controls + Slider-level Book Appointment CTA */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end gap-3 shrink-0 w-full sm:w-auto">
              <div className="text-[11px] font-mono text-slate-300">
                <span className="text-white font-bold">0{currentSlide + 1}</span>
                <span className="text-slate-500"> / 0{HERO_SLIDES.length}</span>
              </div>
              <div className="flex items-center gap-1 pl-2 border-l border-white/15">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  aria-label="Previous slide"
                  title="Previous slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  aria-label={isPaused ? "Play slide rotation" : "Pause slide rotation"}
                  title={isPaused ? "Play" : "Pause"}
                >
                  {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  aria-label="Next slide"
                  title="Next slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Slider-Level Book Appointment CTA */}
              <div className="pl-1 sm:pl-3 sm:border-l sm:border-white/15">
                <Button
                  asChild
                  size="sm"
                  className="font-bold text-xs bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-lg shadow-emerald-950/40 border border-emerald-300/40 px-3.5 py-1.5 h-8 transition-transform hover:scale-[1.03]"
                >
                  <Link to="/book-appointment">
                    <Calendar className="h-3.5 w-3.5 mr-1.5 text-slate-950" />
                    Book Appointment
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deployments & Standards Horizontal Marquee Bar (Precision Motion Style) */}
      <section className="bg-slate-950 border-b border-border/80 py-4 px-4 sm:px-6">
        <div className="content-wrap">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <span className="size-2 rounded-full bg-primary animate-ping" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-300">
                Validated Deployments &amp; Standards
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {[
                { label: "Olympic Track & Field", spec: "Sub-Millimeter Kinematics" },
                { label: "Premier League Pitch", spec: "32-Camera Optical Sync" },
                { label: "Aquatic Hydrodynamics", spec: "Refraction Solvers" },
                { label: "WADA Compliance", spec: "Anti-Doping Ledger" },
                { label: "SOC 2 Type II", spec: "AICPA Audited" },
                { label: "ISO 27001", spec: "EHR-Grade Vault" },
                { label: "TensorRT Hopper", spec: "< 38ms Edge Loop" },
              ].map((badge, bidx) => (
                <div
                  key={bidx}
                  className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-primary/40 px-3 py-1.5 transition-all shadow-xs"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200 group-hover:text-white">
                    {badge.label}
                  </span>
                  <span className="rounded bg-black/40 px-1.5 py-0.5 text-[9px] font-mono text-primary font-semibold border border-white/5">
                    {badge.spec}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Deployment Pathways (2-Card Fork: Precision Motion Style) */}
      <section className="bg-card border-b border-border py-12">
        <div className="content-wrap">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-[.24em] text-primary mb-1">
                Engineering Deployment Pathways
              </p>
              <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-foreground">
                Select Your Intelligence Objective
              </h2>
            </div>
            <p className="text-xs text-muted-foreground max-w-md">
              Whether deploying high-speed markerless computer vision for stadium broadcast or sovereign biomechanical data vaults for elite Olympic athletes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="group rounded-xl border border-border/80 bg-background p-6 sm:p-7 transition-all hover:border-primary/80 hover:shadow-lg flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-primary/10 border border-primary/25 text-[10px] font-mono font-bold uppercase tracking-wider text-primary mb-3">
                  For Stadium Rigs, Broadcasts &amp; Clubs
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-foreground group-hover:text-primary transition-colors">
                  Optical Tracking &amp; Pitch Spatialization
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Turnkey multi-camera computer vision infrastructure operating at 120 FPS. Generates real-time Voronoi pitch control, tactical compact lines, and passing probability vectors pushed directly into VizRT, Unreal Engine, and sideline tablet UIs in &lt;38ms.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                <Link
                  to="/sports/game-analysis"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                >
                  Explore Tactical Suite <ArrowRight className="h-3 w-3" />
                </Link>
                <span className="text-[10px] font-mono text-muted-foreground">Standard Deploy: 48 Hours</span>
              </div>
            </div>

            <div className="group rounded-xl border border-border/80 bg-background p-6 sm:p-7 transition-all hover:border-accent/80 hover:shadow-lg flex flex-col justify-between">
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-accent/10 border border-accent/25 text-[10px] font-mono font-bold uppercase tracking-wider text-accent mb-3">
                  For Olympic NOCs, Medical Staffs &amp; Academies
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wide text-foreground group-hover:text-accent transition-colors">
                  Sovereign Biomechanics &amp; Kinematics Lab
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Sub-millimeter 24-point joint kinematics, inverse dynamic torque equations, and non-contact injury forecasting. Protected by hardware-encrypted zero-knowledge confidential computing enclaves to safeguard athlete medical data.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                <Link
                  to="/platform"
                  search={{ tab: "security" }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent hover:underline"
                >
                  View Sovereign Security Enclaves <ArrowRight className="h-3 w-3" />
                </Link>
                <span className="text-[10px] font-mono text-emerald-500 font-bold">Injury Risk Reduct: -42%</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          1. PLATFORM CAPABILITIES
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-background border-b border-border">
        <div className="content-wrap">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold uppercase tracking-wider text-primary mb-3">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              Platform Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-foreground">
              From Raw Video to <span className="text-primary">Game-Winning Intelligence</span>.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              We transform unstructured video footage into automated, frame-by-frame tactical, biomechanical, and physical insights—<strong className="text-foreground">no wearables required</strong>.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Capability 1 */}
            <div className="surface-card p-6 flex flex-col justify-between hover:border-primary/50 transition group border-t-2 border-t-primary">
              <div>
                <div className="size-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-105 transition-transform">
                  <Goal className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Automated Tactical Analysis</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  AI-driven camera calibration and multi-object tracking to generate 2D/3D pitch/court control models, passing networks, and automated formation breakdowns.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <span>120 FPS Optical Tracking</span>
                <Link to="/sports/game-analysis" className="hover:underline flex items-center gap-1">
                  Explore Suite &rarr;
                </Link>
              </div>
            </div>

            {/* Capability 2 */}
            <div className="surface-card p-6 flex flex-col justify-between hover:border-primary/50 transition group border-t-2 border-t-emerald-500">
              <div>
                <div className="size-11 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 group-hover:scale-105 transition-transform">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Sensorless Biomechanics</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Advanced pose estimation to extract joint angles, stride length, swing paths, and release points directly from standard video feeds without awkward harnesses.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-emerald-500">
                <span>24-Keypoint Markerless</span>
                <Link to="/sports/running" className="hover:underline flex items-center gap-1">
                  Kinematics Lab &rarr;
                </Link>
              </div>
            </div>

            {/* Capability 3 */}
            <div className="surface-card p-6 flex flex-col justify-between hover:border-primary/50 transition group border-t-2 border-t-amber-500">
              <div>
                <div className="size-11 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4 group-hover:scale-105 transition-transform">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Intelligent Event Tagging</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Natural Language Processing (NLP) and computer vision that automatically log play-by-play events (shots, tackles, turnovers, rebounds) in real time.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-amber-500">
                <span>Zero Manual Entry</span>
                <Link to="/analytics" className="hover:underline flex items-center gap-1">
                  Live Tagging &rarr;
                </Link>
              </div>
            </div>

            {/* Capability 4 */}
            <div className="surface-card p-6 flex flex-col justify-between hover:border-primary/50 transition group border-t-2 border-t-red-500">
              <div>
                <div className="size-11 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 mb-4 group-hover:scale-105 transition-transform">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Load &amp; Injury Risk Monitoring</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Visual tracking of player acceleration, deceleration, and high-intensity distance to calculate Acute:Chronic Workload Ratios (ACWR) and flag fatigue risks.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-red-500">
                <span>-30% Soft-Tissue Risk</span>
                <Link to="/coaches" className="hover:underline flex items-center gap-1">
                  Load Governance &rarr;
                </Link>
              </div>
            </div>

            {/* Capability 5 */}
            <div className="surface-card p-6 flex flex-col justify-between hover:border-primary/50 transition group border-t-2 border-t-teal-500 md:col-span-2 lg:col-span-2">
              <div>
                <div className="size-11 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 mb-4 group-hover:scale-105 transition-transform">
                  <Video className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Automated Highlight &amp; Scouting Reels</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Instantly generate customized video clips based on natural language queries (e.g., <span className="font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">&ldquo;Show all successful defensive transitions by Player X in the last 3 matches&rdquo;</span>). Cut scouting compilation times from days to seconds.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-teal-400">
                <span>NLP Video Search Index</span>
                <Link to="/resources" search={{ tab: "video-guides" }} className="hover:underline flex items-center gap-1">
                  See Video Search Demo &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. ICP & SOLUTIONS (THE PERFORMANCE ECOSYSTEM)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-secondary/25 border-b border-border">
        <div className="content-wrap">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold uppercase tracking-wider text-primary mb-3">
              ICP &amp; Solutions · Persona Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-foreground">
              Built for Every Level of the <span className="text-primary">Performance Ecosystem</span>.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Tailored intelligence for the people who make the critical decisions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Stakeholder 1 */}
            <div className="surface-card p-6 flex flex-col justify-between hover:border-primary/50 transition">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded bg-primary/15 text-primary text-[10px] font-bold uppercase px-2 py-0.5">Professional Tier</span>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="text-base font-bold text-foreground">Elite Clubs &amp; Professional Franchises</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  For Head Coaches and Video Analysts who need to cut hours of manual film review down to seconds of AI-curated, actionable insights.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border">
                <Link to="/coaches" className="text-xs font-bold text-primary hover:underline flex items-center justify-between">
                  <span>Coaching Tactical Console</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Stakeholder 2 */}
            <div className="surface-card p-6 flex flex-col justify-between hover:border-primary/50 transition">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded bg-blue-500/15 text-blue-500 text-[10px] font-bold uppercase px-2 py-0.5">Collegiate NCAA</span>
                  <Milestone className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="text-base font-bold text-foreground">University &amp; Collegiate Programs</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  For Athletic Directors and S&amp;C Coaches seeking enterprise-level analytics to maximize roster development and gain a recruiting edge on a budget.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border">
                <Link to="/institution" className="text-xs font-bold text-blue-500 hover:underline flex items-center justify-between">
                  <span>Collegiate Solutions</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Stakeholder 3 */}
            <div className="surface-card p-6 flex flex-col justify-between hover:border-primary/50 transition">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded bg-amber-500/15 text-amber-500 text-[10px] font-bold uppercase px-2 py-0.5">National Level</span>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="text-base font-bold text-foreground">National Federations &amp; Olympic Committees</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  For high-performance directors requiring standardized, multi-sport biomechanical and tactical benchmarking across national talent pools.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border">
                <Link to="/ecosystem" className="text-xs font-bold text-amber-500 hover:underline flex items-center justify-between">
                  <span>Olympic Benchmarks</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Stakeholder 4 */}
            <div className="surface-card p-6 flex flex-col justify-between hover:border-primary/50 transition">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded bg-emerald-500/15 text-emerald-500 text-[10px] font-bold uppercase px-2 py-0.5">Individual</span>
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="text-base font-bold text-foreground">Individual Elite Athletes &amp; Agencies</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  For players and their representatives who need quantifiable, video-backed performance data to prove their market value and guide technical development.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border">
                <Link to="/athletes" className="text-xs font-bold text-emerald-500 hover:underline flex items-center justify-between">
                  <span>Athlete Verification</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Stakeholder 5 */}
            <div className="surface-card p-6 flex flex-col justify-between hover:border-primary/50 transition md:col-span-2 lg:col-span-2">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded bg-purple-500/15 text-purple-400 text-[10px] font-bold uppercase px-2 py-0.5">Media &amp; Streaming</span>
                  <Radio className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="text-base font-bold text-foreground">Broadcasters &amp; Media Partners</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  For production teams looking to automate real-time advanced stat overlays, win-probability models, and instant highlight generation for viewers across broadcast streams.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border">
                <Link to="/sports/game-analysis" className="text-xs font-bold text-purple-400 hover:underline flex items-center justify-between">
                  <span>Broadcast Integration APIs</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Full SPICED Deep-Dive Banner */}
          <div className="mt-10 rounded-2xl border border-primary/30 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/20 text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                Executive SPICED Framework
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Explore Full Situation, Pain, Impact, &amp; Decision Models
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Dive into tailored strategic breakdowns for all 5 stakeholder groups—quantifying injury cost avoidance, recruitment ROI, and 48-hour onboarding timelines.
              </p>
            </div>
            <Link
              to="/icp"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs sm:text-sm font-bold text-primary-foreground shadow-lg hover:bg-primary/90 transition whitespace-nowrap shrink-0"
            >
              <span>View Full ICP &amp; SPICED Suite</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. SPORTS DOMAINS (MULTI-SPORT INTELLIGENCE)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-background border-b border-border">
        <div className="content-wrap">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold uppercase tracking-wider text-primary mb-3">
              3. Sports Domains · Taxonomy
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-foreground">
              Multi-Sport Intelligence, <span className="text-primary">Adapted to the Physics of the Game</span>.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Our AI models are trained on the unique kinematic and tactical realities of diverse sporting environments.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Domain 1: Invasion Sports */}
            <div className="surface-card p-6 flex flex-col justify-between border-t-4 border-t-primary hover:border-primary/60 transition group">
              <div>
                <span className="text-2xl mb-3 block">⚽</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold">Category 01</span>
                <h3 className="text-lg font-bold text-foreground mt-1">Invasion Sports</h3>
                <p className="text-[11px] font-semibold text-muted-foreground mt-0.5">Soccer, Basketball, Rugby, Hockey</p>
                <div className="mt-4 rounded-lg bg-secondary/50 p-3 border border-border/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground block mb-1">Analytical Focus</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Spatial tracking, defensive shape analysis, expected goals/threat (xG/xT), and transition speed.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-xs font-bold text-primary">
                <Link to="/sports/football" className="hover:underline flex items-center gap-1">
                  Soccer Suite &rarr;
                </Link>
                <Link to="/sports/hockey" className="hover:underline">
                  Hockey &rarr;
                </Link>
              </div>
            </div>

            {/* Domain 2: Striking & Net Sports */}
            <div className="surface-card p-6 flex flex-col justify-between border-t-4 border-t-emerald-500 hover:border-emerald-500/60 transition group">
              <div>
                <span className="text-2xl mb-3 block">🎾</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-500 font-bold">Category 02</span>
                <h3 className="text-lg font-bold text-foreground mt-1">Striking &amp; Net Sports</h3>
                <p className="text-[11px] font-semibold text-muted-foreground mt-0.5">Tennis, Baseball, Cricket, Golf</p>
                <div className="mt-4 rounded-lg bg-secondary/50 p-3 border border-border/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground block mb-1">Analytical Focus</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Ball trajectory, spin-rate estimation, swing/bat path kinematics, and shot-placement heatmaps.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-border">
                <Link to="/sports" className="text-xs font-bold text-emerald-500 hover:underline flex items-center justify-between">
                  <span>Ball Trajectory Specs</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Domain 3: Racing & Endurance */}
            <div className="surface-card p-6 flex flex-col justify-between border-t-4 border-t-amber-500 hover:border-amber-500/60 transition group">
              <div>
                <span className="text-2xl mb-3 block">🏃</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500 font-bold">Category 03</span>
                <h3 className="text-lg font-bold text-foreground mt-1">Racing &amp; Endurance</h3>
                <p className="text-[11px] font-semibold text-muted-foreground mt-0.5">Track &amp; Field, Swimming, Cycling</p>
                <div className="mt-4 rounded-lg bg-secondary/50 p-3 border border-border/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground block mb-1">Analytical Focus</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Stride/stroke symmetry, pacing strategy, aerodynamic drafting analysis, and finish-line kinematics.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-xs font-bold text-amber-500">
                <Link to="/sports/running" className="hover:underline">
                  Running &rarr;
                </Link>
                <Link to="/sports/swimming" className="hover:underline">
                  Swimming &rarr;
                </Link>
              </div>
            </div>

            {/* Domain 4: Combat & Aesthetic Sports */}
            <div className="surface-card p-6 flex flex-col justify-between border-t-4 border-t-purple-500 hover:border-purple-500/60 transition group">
              <div>
                <span className="text-2xl mb-3 block">🥊</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold">Category 04</span>
                <h3 className="text-lg font-bold text-foreground mt-1">Combat &amp; Aesthetic Sports</h3>
                <p className="text-[11px] font-semibold text-muted-foreground mt-0.5">Boxing, MMA, Gymnastics, Diving</p>
                <div className="mt-4 rounded-lg bg-secondary/50 p-3 border border-border/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground block mb-1">Analytical Focus</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Strike velocity &amp; classification, ring generalship (spatial dominance), and automated form deduction scoring.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-border">
                <Link to="/sports/athletics/high-jump" className="text-xs font-bold text-purple-400 hover:underline flex items-center justify-between">
                  <span>Form Scoring Engine</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. ANALYTICAL OUTCOMES (THE MEASURABLE ROI)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-secondary/20 border-b border-border">
        <div className="content-wrap">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider text-emerald-500 mb-3">
              4. Analytical Outcomes · Measurable ROI
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-foreground">
              Analytics That <span className="text-emerald-500">Move the Needle</span>.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              We don’t just provide data; we deliver measurable improvements in performance, health, and operational efficiency. CXOs and Directors buy outcomes, not features.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {/* Outcome 1 */}
            <div className="surface-card p-6 flex flex-col justify-between border hover:border-emerald-500/50 transition">
              <div>
                <div className="text-3xl sm:text-4xl font-display font-black text-emerald-500">
                  📉 30%
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-foreground mt-2">
                  Reduction in Soft-Tissue Injuries
                </div>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  By visually monitoring high-intensity deceleration loads and flagging ACWR spikes before they result in injury.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border text-[11px] font-mono text-emerald-500 font-bold">
                $184k Avg Medical Savings
              </div>
            </div>

            {/* Outcome 2 */}
            <div className="surface-card p-6 flex flex-col justify-between border hover:border-primary/50 transition">
              <div>
                <div className="text-3xl sm:text-4xl font-display font-black text-primary">
                  ⏱️ 85%
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-foreground mt-2">
                  Less Time on Video Tagging
                </div>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  Automating the logging of events, freeing up analysts to focus on strategy rather than manual data entry.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border text-[11px] font-mono text-primary font-bold">
                48 hrs &rarr; 30 mins post-match
              </div>
            </div>

            {/* Outcome 3 */}
            <div className="surface-card p-6 flex flex-col justify-between border hover:border-amber-500/50 transition">
              <div>
                <div className="text-3xl sm:text-4xl font-display font-black text-amber-500">
                  🎯 40%
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-foreground mt-2">
                  Increase in Scouting Efficiency
                </div>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  Allowing recruiters to search thousands of hours of footage using natural language queries to find undervalued talent.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border text-[11px] font-mono text-amber-500 font-bold">
                Instant Clip Compilation
              </div>
            </div>

            {/* Outcome 4 */}
            <div className="surface-card p-6 flex flex-col justify-between border hover:border-teal-500/50 transition">
              <div>
                <div className="text-3xl sm:text-4xl font-display font-black text-teal-400">
                  📈 15%
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-foreground mt-2">
                  Tactical Execution Improvement
                </div>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  Providing coaches with immediate, post-possession visual feedback on spacing and formation adherence.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border text-[11px] font-mono text-teal-400 font-bold">
                Pitch-side Tablet Sync
              </div>
            </div>

            {/* Outcome 5 */}
            <div className="surface-card p-6 flex flex-col justify-between border hover:border-indigo-500/50 transition sm:col-span-2 lg:col-span-1">
              <div>
                <div className="text-3xl sm:text-4xl font-display font-black text-indigo-400">
                  💰 +24%
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-foreground mt-2">
                  Higher Athlete Valuation
                </div>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  Equipping players and agencies with professional-grade, video-verified performance metrics to strengthen contract negotiations.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border text-[11px] font-mono text-indigo-400 font-bold">
                Verified Telemetry Ledger
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. CASE STUDIES (PROVEN IMPACT · CHALLENGE → SOLUTION → IMPACT)
          ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-background border-b border-border">
        <div className="content-wrap">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold uppercase tracking-wider text-primary mb-3">
                5. Case Studies · Proven Impact
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-foreground">
                Proven Impact Across the <span className="text-primary">Sporting World</span>.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl">
                See how leading organizations and athletes use SportsMax to gain an unfair advantage.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/resources" search={{ tab: "case-studies" }}>
                Browse Full Case Studies Library &rarr;
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Case Study 1 */}
            <div className="surface-card p-6 flex flex-col justify-between border hover:border-primary/50 transition">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded bg-primary/15 text-primary text-[10px] font-bold uppercase px-2 py-0.5">Tier-2 Football Club</span>
                  <span className="text-xs font-mono text-muted-foreground">Europe</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">The Mid-Market Soccer Club</h3>

                {/* Challenge */}
                <div className="mt-4 rounded-lg bg-red-500/5 border border-red-500/20 p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-red-500 mb-1">
                    The Challenge
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    A Tier-2 football club lacked the budget for expensive optical tracking systems, relying on manual, error-prone video tagging that delayed post-match analysis by 48 hours.
                  </p>
                </div>

                {/* Solution */}
                <div className="mt-3 rounded-lg bg-primary/5 border border-primary/20 p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-primary mb-1">
                    The SportsMax Solution
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Deployed our single-camera AI tactical analysis module to automatically track all 22 players and the ball, generating pitch-control maps and automated event logs.
                  </p>
                </div>

                {/* Impact */}
                <div className="mt-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-500 mb-1">
                    The Impact
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Reduced video analysis time by 80%. Coaching staff identified a critical defensive spacing flaw, leading to a tactical adjustment that resulted in a <strong className="text-foreground">4-match unbeaten streak and a 25% drop in goals conceded</strong>.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary">
                <span>Outcome: -80% Analysis Time</span>
                <Link to="/resources" search={{ tab: "case-studies" }} className="hover:underline">
                  Read Case &rarr;
                </Link>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="surface-card p-6 flex flex-col justify-between border hover:border-amber-500/50 transition">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded bg-amber-500/15 text-amber-500 text-[10px] font-bold uppercase px-2 py-0.5">Olympic Track Federation</span>
                  <span className="text-xs font-mono text-muted-foreground">National</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">The Olympic Track &amp; Field Federation</h3>

                {/* Challenge */}
                <div className="mt-4 rounded-lg bg-red-500/5 border border-red-500/20 p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-red-500 mb-1">
                    The Challenge
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    National coaches needed a way to monitor the biomechanical form of 50+ sprinters across remote training centers without disrupting their natural movement with wearable sensors.
                  </p>
                </div>

                {/* Solution */}
                <div className="mt-3 rounded-lg bg-primary/5 border border-primary/20 p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-primary mb-1">
                    The SportsMax Solution
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Implemented our sensorless pose-estimation engine, allowing coaches to upload standard smartphone video and receive automated reports on stride length, ground contact time, and joint angles.
                  </p>
                </div>

                {/* Impact */}
                <div className="mt-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-500 mb-1">
                    The Impact
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Identified and corrected a recurring hamstring-risk asymmetry in 3 key athletes prior to the Olympic trials, resulting in <strong className="text-foreground">two personal bests and one national record</strong>.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-amber-500">
                <span>Outcome: 2 PBs &amp; 1 National Record</span>
                <Link to="/resources" search={{ tab: "case-studies" }} className="hover:underline">
                  Read Case &rarr;
                </Link>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="surface-card p-6 flex flex-col justify-between border hover:border-blue-500/50 transition">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded bg-blue-500/15 text-blue-500 text-[10px] font-bold uppercase px-2 py-0.5">NCAA Division-1 Program</span>
                  <span className="text-xs font-mono text-muted-foreground">Basketball</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">The Division-1 University Basketball Program</h3>

                {/* Challenge */}
                <div className="mt-4 rounded-lg bg-red-500/5 border border-red-500/20 p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-red-500 mb-1">
                    The Challenge
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    The video coordinator was overwhelmed by the need to create individualized, 3-minute highlight reels for 15 players after every game for recruitment and development.
                  </p>
                </div>

                {/* Solution */}
                <div className="mt-3 rounded-lg bg-primary/5 border border-primary/20 p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-primary mb-1">
                    The SportsMax Solution
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Utilized our Automated Highlight &amp; Scouting engine, setting up custom AI triggers for &ldquo;successful defensive closeouts&rdquo; and &ldquo;transition assists.&rdquo;
                  </p>
                </div>

                {/* Impact */}
                <div className="mt-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-500 mb-1">
                    The Impact
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Cut highlight generation time from 4 hours per game to under 15 minutes, allowing coaching staff to focus entirely on game preparation and player development.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-blue-500">
                <span>Outcome: 4 hrs &rarr; &lt;15 mins</span>
                <Link to="/resources" search={{ tab: "case-studies" }} className="hover:underline">
                  Read Case &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTGRID.AI REFERENCE SECTION: FULL-SPECTRUM SPORTS AI ARCHITECTURE */}
      <section className="py-20 bg-background border-b border-border">
        <div className="content-wrap">
          <SectionHead
            eyebrow="The Full-Spectrum Sports AI Architecture"
            title="From Physical Kinematics to Autonomous Coaching Fleets"
            text="Bridging the gap between athletic wearable sensors, stadium optical cameras, and autonomous tactical execution across 4 integrated tiers."
          />

          <div className="grid gap-6 lg:grid-cols-4">
            {/* Tier 1: Hardware & Bio-Sensory Ingestion */}
            <div className="surface-card p-6 flex flex-col justify-between border-t-4 border-t-primary shadow-xs hover:shadow-md transition">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Database className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs font-bold text-muted-foreground">TIER 01</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">Sensory & Ingestion Layer</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Real-time acquisition from multi-camera optical rigs (120fps), GNSS tracking pods, 3D force plates, and BLE/ANT+ telemetry straps.
                </p>
                <div className="mt-4 space-y-1.5 text-[11px] font-medium text-foreground">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Multi-Camera Computer Vision Rigs
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Low-Latency Edge Buffer (&lt;15ms)
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Multi-modal Sensor Normalization
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Bandwidth</span>
                <span className="font-mono font-bold text-primary">1.2 GB/min match feed</span>
              </div>
            </div>

            {/* Tier 2: Biomechanical Physics Models */}
            <div className="surface-card p-6 flex flex-col justify-between border-t-4 border-t-accent shadow-xs hover:shadow-md transition">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent">
                    <BrainCircuit className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs font-bold text-muted-foreground">TIER 02</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">Biomechanical Models</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Deep biomechanical neural inference: joint kinematics, inverse dynamic torque, ground reaction forces, and fatigue degradation indices.
                </p>
                <div className="mt-4 space-y-1.5 text-[11px] font-medium text-foreground">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" /> 24-Point Skeletal Pose Inference
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Acute-to-Chronic Ratio (ACWR)
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" /> SWOLF & Hydrodynamic Drag
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Model Accuracy</span>
                <span className="font-mono font-bold text-accent">99.4% Kinematic Precision</span>
              </div>
            </div>

            {/* Tier 3: Autonomous Tactical Agents */}
            <div className="surface-card p-6 flex flex-col justify-between border-t-4 border-t-chart-4 shadow-xs hover:shadow-md transition">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-chart-4/15 text-chart-4">
                    <Layers className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs font-bold text-muted-foreground">TIER 03</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">Agentic Intelligence Fleets</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Autonomous agents scanning live match feeds: tactical shape recognition, pressing triggers, pitch space control, and opposition counter-models.
                </p>
                <div className="mt-4 space-y-1.5 text-[11px] font-medium text-foreground">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-chart-4" /> Live Formation Distortion Alerts
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-chart-4" /> Automated Event Taggers (xG, xT)
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-chart-4" /> Real-time Tactical Play Adjuster
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Inference Speed</span>
                <span className="font-mono font-bold text-chart-4">&lt; 38ms Telemetry Loop</span>
              </div>
            </div>

            {/* Tier 4: Autonomous Strategy & Governance */}
            <div className="surface-card p-6 flex flex-col justify-between border-t-4 border-t-chart-3 shadow-xs hover:shadow-md transition">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-chart-3/15 text-chart-3">
                    <Shield className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-xs font-bold text-muted-foreground">TIER 04</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">Strategy & Value Realization</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Executive athletic dashboards, institutional compliance governance, player market value optimization, and injury risk mitigation contracts.
                </p>
                <div className="mt-4 space-y-1.5 text-[11px] font-medium text-foreground">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-chart-3" /> 90-Day Athletic Performance ROI
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-chart-3" /> HIPAA/GDPR Athlete Data Vault
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-chart-3" /> Pitch-side Automated Debriefs
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-3 border-t border-border flex items-center justify-between text-[11px]">
                <span className="text-muted-foreground">Injury Reduction</span>
                <span className="font-mono font-bold text-chart-3">-34% Soft Tissue Risk</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL SHOWCASE: TACTICAL COMMAND & BIOMETRICS LAB (WITH GENERATED IMAGES) */}
      <section className="py-20 bg-secondary/25 border-b border-border">
        <div className="content-wrap">
          <SectionHead
            eyebrow="Enterprise Visual Intelligence"
            title="High-Precision Telemetry in Action"
            text="Explore the physical and digital infrastructure powering modern professional sports organizations, national Olympic federations, and high-performance academies."
          />

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Card 1: Stadium Tactical Command */}
            <div className="surface-card overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative h-72 w-full overflow-hidden bg-muted">
                <img
                  src={arenaImage}
                  alt="Modern sports technology command center with tactical arena analytics"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <span className="absolute top-4 left-4 rounded-md bg-background/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-foreground uppercase tracking-wider border border-border shadow-xs">
                  Stadium Command Center
                </span>
                <span className="absolute top-4 right-4 rounded-full bg-primary/20 border border-primary/40 text-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Live Optical Tracking
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">Tactical Match Operations Hub</h3>
                  <span className="text-xs font-mono text-muted-foreground">120 FPS / Sub-38ms</span>
                </div>
                <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                  Pitch-side optical tracking automatically identifies player spatial vectors, passing networks, pressing lines, and expected goals (xG) probability heatmaps in real-time.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-border/60">
                  <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground">Pitch Control Meshes</span>
                  <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground">Off-the-Ball Runs</span>
                  <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground">Defensive Compression</span>
                  <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground">Instant Video Tags</span>
                </div>
                <div className="mt-5">
                  <Button asChild size="sm" variant="outline" className="w-full">
                    <Link to="/sports/game-analysis">
                      Inspect Tactical Suite <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 2: Biometrics & Kinematics Laboratory */}
            <div className="surface-card overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative h-72 w-full overflow-hidden bg-muted">
                <img
                  src={labImage}
                  alt="High-tech sports science laboratory and human performance institute"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <span className="absolute top-4 left-4 rounded-md bg-background/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-foreground uppercase tracking-wider border border-border shadow-xs">
                  Biomechanical Performance Lab
                </span>
                <span className="absolute top-4 right-4 rounded-full bg-accent/20 border border-accent/40 text-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  Kinematic AI Engine
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">Human Performance Institute Telemetry</h3>
                  <span className="text-xs font-mono text-muted-foreground">24 MoCap Keypoints</span>
                </div>
                <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                  Instrumented treadmill force plates and optical joint trackers calculate inverse dynamic torques, ground contact imbalances, and anaerobic threshold boundaries.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-border/60">
                  <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground">Ground Reaction Force</span>
                  <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground">VO2 Max Kinetics</span>
                  <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground">Tibial Shock Load</span>
                  <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground">Asymmetry Ratios</span>
                </div>
                <div className="mt-5">
                  <Button asChild size="sm" variant="outline" className="w-full">
                    <Link to="/sports/running">
                      Review Running Kinematics <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 3: Enterprise AI Cluster & Edge Compute */}
            <div className="surface-card overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative h-72 w-full overflow-hidden bg-muted">
                <img
                  src={clusterImage}
                  alt="Enterprise AI sports computing infrastructure and GPU cluster facility"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <span className="absolute top-4 left-4 rounded-md bg-background/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-foreground uppercase tracking-wider border border-border shadow-xs">
                  Sports Compute Infrastructure
                </span>
                <span className="absolute top-4 right-4 rounded-full bg-chart-4/20 border border-chart-4/40 text-chart-4 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  Edge GPU Clusters
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">Low-Latency Stadium Edge Clusters</h3>
                  <span className="text-xs font-mono text-muted-foreground">High-Throughput Vision</span>
                </div>
                <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                  Liquid-cooled high-density inference hardware stationed directly on-premise at arenas guarantees zero internet latency risk during championship game day scenarios.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-border/60">
                  <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground">Zero-Trust Network</span>
                  <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground">Local Redundancy Failover</span>
                  <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground">Encrypted Athlete Data</span>
                  <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground">High GPU Density</span>
                </div>
                <div className="mt-5">
                  <Button asChild size="sm" variant="outline" className="w-full">
                    <Link to="/platform">
                      Explore Infrastructure <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Card 4: Aquatic & Multi-Environment Kinematics */}
            <div className="surface-card overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative h-72 w-full overflow-hidden bg-muted">
                <img
                  src={swimImage}
                  alt="High-tech Olympic swimming facility with underwater SWOLF and biomechanics tracking"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <span className="absolute top-4 left-4 rounded-md bg-background/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-foreground uppercase tracking-wider border border-border shadow-xs">
                  Hydrodynamic Tracking
                </span>
                <span className="absolute top-4 right-4 rounded-full bg-accent/20 border border-accent/40 text-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  SWOLF 109 / 91% Eff.
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">Underwater Computer Vision & Kinematics</h3>
                  <span className="text-xs font-mono text-muted-foreground">Aquatic Optical Models</span>
                </div>
                <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                  Refraction-corrected underwater cameras measure body pitch, streamline velocity profiles, stroke turnover cadence, and turn propulsion efficiency in real-time.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-border/60">
                  <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground">Refraction Correction</span>
                  <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground">Turn Pushoff Velocity</span>
                  <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground">Stroke Rate & Distance</span>
                  <span className="rounded bg-secondary px-2 py-0.5 text-[11px] font-medium text-foreground">Lactate Depletion Curve</span>
                </div>
                <div className="mt-5">
                  <Button asChild size="sm" variant="outline" className="w-full">
                    <Link to="/sports/swimming">
                      View Swimming Intelligence <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
