import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Flame,
  Activity,
  BarChart2,
  BrainCircuit,
  Eye,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoBadge } from "@/components/sports-ui";
import runnerImage from "@/assets/sportsmax-runner.jpg";

export interface HeroSlide {
  id: string;
  badgeNumber: string;
  category: string;
  badgeIcon: React.ReactNode;
  headline: string;
  highlightText: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  telemetryTitle: string;
  telemetryStatus: string;
  metricLabel: string;
  metricValue: string;
  metricUnit: string;
  metricSubtext: string;
  chartBars: number[];
  quickPills: { label: string; link: string; icon: string }[];
  accentColor: string; // Tailwind color class helper or hex
}

const SLIDES: HeroSlide[] = [
  {
    id: "running",
    badgeNumber: "01 // 04",
    category: "Track & Field · Kinematic Biometrics",
    badgeIcon: <Flame className="h-3.5 w-3.5 fill-primary/30 text-primary" />,
    headline: "Turn Sports Data Into",
    highlightText: "Performance Intelligence",
    description:
      "SportsMax combines individual athlete biometrics, team tactics, optical computer vision, and automated coaching cues across 24+ sports.",
    primaryCtaText: "Explore Sports Hub",
    primaryCtaLink: "/sports",
    secondaryCtaText: "Tactical Analysis Suite",
    secondaryCtaLink: "/sports/game-analysis",
    telemetryTitle: "Live Runner Cadence",
    telemetryStatus: "Optimal Dynamic State",
    metricLabel: "Cadence & Pace",
    metricValue: "170",
    metricUnit: "spm",
    metricSubtext: "Pace: 5:14 /km · Stride length: 1.28m",
    chartBars: [45, 62, 54, 72, 60, 84, 70, 92, 78, 96, 82, 90],
    accentColor: "#10b981",
    quickPills: [
      { label: "Running (GPS & Pace)", link: "/sports/running", icon: "🏃" },
      { label: "High Jump (2.28m)", link: "/sports/athletics/high-jump", icon: "👟" },
      { label: "Relay Handoffs", link: "/sports/relay", icon: "🔄" },
      { label: "Swimming SWOLF", link: "/sports/swimming", icon: "🏊" },
    ],
  },
  {
    id: "football",
    badgeNumber: "02 // 04",
    category: "Team Sports · Tactical Spatial Models",
    badgeIcon: <Activity className="h-3.5 w-3.5 text-sky-500" />,
    headline: "Real-Time Spatial Pressure &",
    highlightText: "Expected Goals (xG)",
    description:
      "Continuous optical pitch tracking calculating defensive compactness, passing lane probabilities, and counter-press turnover efficiency at 60 FPS.",
    primaryCtaText: "Football Analytics",
    primaryCtaLink: "/sports/football",
    secondaryCtaText: "Explore Team Sports",
    secondaryCtaLink: "/sports",
    telemetryTitle: "Pitch Spatial Dynamics",
    telemetryStatus: "Live Event Stream",
    metricLabel: "Attacking Pressure",
    metricValue: "2.48",
    metricUnit: "xG",
    metricSubtext: "PPDA: 8.4 · Pitch Control: 64.2%",
    chartBars: [32, 48, 65, 58, 80, 74, 91, 85, 96, 88, 70, 94],
    accentColor: "#0284c7",
    quickPills: [
      { label: "Football (xG & PPDA)", link: "/sports/football", icon: "⚽" },
      { label: "Hockey (Corsi & Shifts)", link: "/sports/hockey", icon: "🏒" },
      { label: "Tactical Game Analysis", link: "/sports/game-analysis", icon: "📊" },
    ],
  },
  {
    id: "biomechanics",
    badgeNumber: "03 // 04",
    category: "Kinematic AI · Joint Symmetry & Valgus",
    badgeIcon: <BrainCircuit className="h-3.5 w-3.5 text-purple-500" />,
    headline: "Sub-Degree Joint Kinematics &",
    highlightText: "Injury Prevention AI",
    description:
      "Markerless on-device biomechanical pose evaluation quantifying bilateral symmetry, landing force dissipation, and return-to-play clearance thresholds.",
    primaryCtaText: "Athlete Biomechanics",
    primaryCtaLink: "/athlete-performance",
    secondaryCtaText: "Coaches Portal",
    secondaryCtaLink: "/coaches",
    telemetryTitle: "Pose Engine Telemetry",
    telemetryStatus: "Bilateral Symmetry Met",
    metricLabel: "Valgus Alignment",
    metricValue: "99.1%",
    metricUnit: "score",
    metricSubtext: "Angular deviation < 2.4° · GCT: 184ms",
    chartBars: [88, 92, 90, 95, 93, 98, 97, 99, 96, 99, 100, 99],
    accentColor: "#8b5cf6",
    quickPills: [
      { label: "Biomechanics Engine", link: "/athlete-performance", icon: "🧬" },
      { label: "Athletes Hub", link: "/athletes", icon: "⚡" },
      { label: "Coaching Workflows", link: "/coaches", icon: "📋" },
    ],
  },
  {
    id: "computervision",
    badgeNumber: "04 // 04",
    category: "Edge Vision · Multi-Channel Video Analysis",
    badgeIcon: <Eye className="h-3.5 w-3.5 text-amber-500" />,
    headline: "Instant Edge Detection &",
    highlightText: "Automated Coaching Cues",
    description:
      "Transform broadcast video feeds or mobile sidelines footage into high-precision frame-by-frame event tags and automated performance summaries.",
    primaryCtaText: "Launch Analysis Suite",
    primaryCtaLink: "/sports/game-analysis",
    secondaryCtaText: "Browse Platform",
    secondaryCtaLink: "/platform",
    telemetryTitle: "Edge CV Inference",
    telemetryStatus: "< 50ms Latency Active",
    metricLabel: "Detection Precision",
    metricValue: "99.2%",
    metricUnit: "acc",
    metricSubtext: "Frame latency: 16ms · Multi-camera sync",
    chartBars: [50, 68, 75, 82, 88, 90, 94, 96, 95, 98, 97, 99],
    accentColor: "#f59e0b",
    quickPills: [
      { label: "Tactical Video Tagging", link: "/sports/game-analysis", icon: "🎥" },
      { label: "Institution & Academies", link: "/institution", icon: "🏛️" },
      { label: "Live Dashboard", link: "/dashboard", icon: "📈" },
    ],
  },
];

const AUTOPLAY_INTERVAL = 6000; // 6 seconds per slide

export function SportsHeroShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const currentSlide = SLIDES[currentIndex] ?? SLIDES[0]!;

  // Auto-advance timer with progress bar
  useEffect(() => {
    if (!isPlaying) return;

    const intervalStep = 50; // update every 50ms for smooth progress
    const increment = (intervalStep / AUTOPLAY_INTERVAL) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((idx) => (idx + 1) % SLIDES.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentIndex((idx) => (idx + 1) % SLIDES.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentIndex((idx) => (idx - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
  };

  return (
    <section
      className="relative min-h-[min(880px,94vh)] overflow-hidden border-b border-border pt-18 bg-background select-none"
      aria-label="SportsMax Telemetry & Performance Showcase"
    >
      {/* Background Graphic with Subtle Dynamic Glow */}
      <img
        src={runnerImage}
        width={1600}
        height={1000}
        alt="Runner on track with integrated performance data traces"
        className="absolute inset-0 h-full w-full object-cover object-[68%_center] opacity-80 transition-transform duration-1000 ease-out"
      />

      {/* Dynamic radial glow orb behind active slide */}
      <div
        className="pointer-events-none absolute right-[10%] top-[20%] h-[450px] w-[450px] rounded-full blur-3xl opacity-20 transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${currentSlide.accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Luminous Light Theme Gradient Overlay for optimal contrast */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_96%,transparent)_44%,color-mix(in_oklab,var(--background)_55%,transparent)_75%,color-mix(in_oklab,var(--background)_80%,transparent)_100%)]" />
      <div className="sport-grid absolute inset-0 opacity-25 pointer-events-none" />

      <div className="content-wrap relative flex min-h-[min(790px,calc(94vh-72px))] items-center py-12 lg:py-16">
        <div className="max-w-2xl">
          {/* Top Slide Meta Header */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <DemoBadge />
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-1 text-xs font-bold text-foreground shadow-xs backdrop-blur-md">
              <span className="font-mono text-primary font-bold">{currentSlide.badgeNumber}</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                {currentSlide.badgeIcon}
                {currentSlide.category}
              </span>
            </div>
          </div>

          {/* Dynamic Headline with keyframe transition key */}
          <div key={currentSlide.id} className="reveal">
            <h1 className="text-balance text-4xl font-black leading-[1.04] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {currentSlide.headline}{" "}
              <span className="text-primary font-black block sm:inline">
                {currentSlide.highlightText}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {currentSlide.description}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="font-bold shadow-md">
                <Link to={currentSlide.primaryCtaLink}>
                  {currentSlide.primaryCtaText} <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-semibold bg-card/85">
                <Link to={currentSlide.secondaryCtaLink}>{currentSlide.secondaryCtaText}</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="font-semibold text-muted-foreground hover:text-foreground">
                <Link to="/platform">How It Works</Link>
              </Button>
            </div>

            {/* Quick Pills */}
            <div className="mt-7 flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">
                Featured:
              </span>
              {currentSlide.quickPills.map((pill, idx) => (
                <Link
                  key={idx}
                  to={pill.link}
                  className="rounded-full bg-card/90 border border-border px-3 py-1 text-xs font-semibold text-foreground hover:border-primary/50 hover:bg-card shadow-xs transition"
                >
                  <span className="mr-1">{pill.icon}</span> {pill.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Interactive Slider Navigation & Progress Bars (GreenNext / Physiomatics Flow) */}
          <div className="mt-10 max-w-xl border-t border-border/80 pt-4">
            <div className="flex items-center justify-between gap-4">
              {/* Segmented Progress Trackers */}
              <div className="flex flex-1 items-center gap-2">
                {SLIDES.map((slide, idx) => {
                  const isActive = idx === currentIndex;
                  const isPassed = idx < currentIndex;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => goToSlide(idx)}
                      className="group relative h-2 flex-1 rounded-full overflow-hidden bg-muted transition-all cursor-pointer hover:opacity-90"
                      aria-label={`Go to slide ${idx + 1}: ${slide.category}`}
                    >
                      <div
                        className="absolute inset-y-0 left-0 bg-primary transition-all duration-75"
                        style={{
                          width: isActive ? `${progress}%` : isPassed ? "100%" : "0%",
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="p-1.5 rounded-lg border border-border bg-card/80 text-muted-foreground hover:text-foreground hover:bg-card shadow-xs transition"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg border border-border bg-card/80 text-muted-foreground hover:text-foreground hover:bg-card shadow-xs transition"
                  aria-label={isPlaying ? "Pause auto-slide" : "Play auto-slide"}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="p-1.5 rounded-lg border border-border bg-card/80 text-muted-foreground hover:text-foreground hover:bg-card shadow-xs transition"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Core Metrics Footer Bar */}
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border/50 pt-4">
              <Stat value="24+ Sports" label="Directory coverage" />
              <Stat value="< 50ms" label="Live telemetry feed" />
              <Stat value="99.2%" label="Event detection precision" />
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Floating Telemetry Widget (Right side) */}
      <div
        key={`widget-${currentSlide.id}`}
        className="absolute bottom-10 right-[5%] hidden w-84 rounded-2xl border border-border/90 bg-card/95 p-5 shadow-2xl backdrop-blur-xl lg:block reveal"
      >
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {currentSlide.telemetryTitle}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold text-primary">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            {currentSlide.telemetryStatus}
          </span>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-muted-foreground">
              {currentSlide.metricLabel}
            </div>
            <div className="mt-0.5">
              <span className="font-display text-4xl font-extrabold text-foreground">
                {currentSlide.metricValue}
              </span>
              <span className="text-xs text-muted-foreground font-semibold ml-1.5">
                {currentSlide.metricUnit}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[11px] font-mono font-bold">
              <Zap className="h-3 w-3" /> Live Feed
            </span>
          </div>
        </div>

        <div className="mt-2 text-xs font-mono text-muted-foreground">
          {currentSlide.metricSubtext}
        </div>

        {/* Dynamic Animated Frequency / Telemetry Histogram */}
        <div className="mt-5 flex h-14 items-end gap-1.5 rounded-lg bg-secondary/40 p-2 border border-border/40">
          {currentSlide.chartBars.map((val, idx) => (
            <span
              key={idx}
              className="flex-1 rounded-xs bg-primary/75 transition-all duration-300 hover:bg-primary"
              style={{ height: `${val}%` }}
              title={`Frame ${idx + 1}: ${val}% intensity`}
            />
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between pt-2 border-t border-border/50 text-[10px] text-muted-foreground font-mono">
          <span>Engine: SportsMax Vision 4.2</span>
          <span className="text-primary font-semibold">Sub-second Sync</span>
        </div>
      </div>
    </section>
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
