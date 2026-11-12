import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Users,
  Target,
  BarChart3,
  Sparkles,
  Zap,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Clock,
  Layers,
  HeartHandshake,
  Download,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import {
  JOURNEY_STAGES,
  type JourneyStage,
  type CustomerJourneyRecord,
  loadLocalJourneyHistory,
  saveLocalJourneyEvent,
  syncJourneyEventToGoogleSheets,
} from "@/lib/customer-journey-service";

export function CustomerJourneyMap() {
  const { user } = useAuth();
  const [selectedStageId, setSelectedStageId] = useState<JourneyStage>("Awareness");
  const [selectedSegment, setSelectedSegment] = useState("Elite Clubs & Pro Franchises");
  const [history, setHistory] = useState<CustomerJourneyRecord[]>([]);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    setHistory(loadLocalJourneyHistory());
  }, []);

  const activeStage =
    JOURNEY_STAGES.find((s) => s.id === selectedStageId) || JOURNEY_STAGES[0];

  const handleSimulateTouchpoint = async (stage: JourneyStage, action: string, touchpoint: string) => {
    setSimulating(true);

    const record: CustomerJourneyRecord = {
      eventId: `cj_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
      userId: user?.id || "guest_prospect",
      userName: user?.name || "Visiting Sports Director",
      email: user?.email || "director@eliteclub.com",
      role: user?.role || "Head of Performance",
      segment: selectedSegment,
      stage,
      action,
      touchpoint,
      source: "SportsVectors Interactive Map",
      timeSpentSeconds: Math.floor(Math.random() * 240) + 60,
      dropOffRisk: stage === "Decision" ? "Moderate" : "Low",
      timestamp: new Date().toISOString(),
    };

    saveLocalJourneyEvent(record);
    setHistory(loadLocalJourneyHistory());
    await syncJourneyEventToGoogleSheets(record);
    setSimulating(false);
  };

  return (
    <div className="space-y-8">
      {/* Segment Selector & Funnel Metrics Overview */}
      <div className="surface-card rounded-2xl border border-border p-6 bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/20 text-primary grid place-items-center shrink-0">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-foreground">
                  SportsVectors Customer Journey Lifecycle
                </h2>
                <span className="text-[10px] font-mono uppercase bg-primary/15 text-primary border border-primary/30 px-2 py-0.5 rounded-full font-bold">
                  6-Stage Architecture
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Mapping the high-performance transition from discovery to Olympic-grade performance intelligence.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Select Segment Persona:</span>
            <select
              className="rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-medium text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
            >
              <option value="Elite Clubs & Pro Franchises">Elite Clubs &amp; Pro Franchises (Football/Basketball)</option>
              <option value="University & Collegiate (NCAA)">Collegiate Athletics (NCAA D1–D3)</option>
              <option value="National Sports Federations">National Sports Federations &amp; Olympic Committees</option>
              <option value="Schools & Academies">Schools &amp; Physical Education Academies</option>
              <option value="Elite Athletes & Agencies">Individual Elite Athletes &amp; Agencies</option>
            </select>
          </div>
        </div>

        {/* 6-Stage Progress Funnel Stepper */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mt-6">
          {JOURNEY_STAGES.map((stg, idx) => {
            const isActive = stg.id === selectedStageId;
            return (
              <button
                key={stg.id}
                type="button"
                onClick={() => setSelectedStageId(stg.id)}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden group ${
                  isActive
                    ? "bg-primary/10 border-primary ring-1 ring-primary/40 shadow-sm"
                    : "bg-background border-border hover:bg-muted/40 hover:border-border/80"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-muted-foreground">
                    STAGE 0{idx + 1}
                  </span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${stg.badgeColor}`}>
                    {stg.conversionRate}
                  </span>
                </div>
                <div className="text-xs font-bold text-foreground truncate">{stg.id}</div>
                <div className="text-[10px] text-muted-foreground mt-1">Avg: {stg.avgDuration}</div>

                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detailed Breakdown Card */}
      <div className="surface-card rounded-2xl border border-border p-6 bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase font-mono border ${activeStage.badgeColor}`}>
                {activeStage.name}
              </span>
              <span className="text-xs text-muted-foreground">
                Target: <strong className="text-foreground">{selectedSegment}</strong>
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground mt-2">{activeStage.subtitle}</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono shrink-0">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <div className="text-[10px] uppercase text-muted-foreground">Stage Conversion</div>
              <div className="text-base font-bold">{activeStage.conversionRate}</div>
            </div>
            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
              <div className="text-[10px] uppercase text-muted-foreground">Drop-off Risk</div>
              <div className="text-base font-bold">{activeStage.dropOffRate}</div>
            </div>
          </div>
        </div>

        {/* Stage Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 mt-6">
          {/* Key Touchpoints & Experiences */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" /> Key Digital &amp; Field Touchpoints
            </h4>
            <div className="space-y-2">
              {activeStage.touchpoints.map((tp) => (
                <div
                  key={tp}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-background text-xs"
                >
                  <span className="font-medium text-foreground">{tp}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={simulating}
                    onClick={() => handleSimulateTouchpoint(activeStage.id, `Explored ${tp}`, tp)}
                    className="h-6 text-[10px] px-2 font-semibold text-primary hover:bg-primary/10"
                  >
                    Simulate Touchpoint &rarr;
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Key Actions & Pain Points Addressed */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> Customer Psychology &amp; Value Realization
            </h4>
            <div className="p-3.5 rounded-xl border border-border bg-secondary/20 space-y-3 text-xs">
              <div>
                <span className="font-bold text-foreground block mb-1">Pain Point Eliminated:</span>
                <p className="text-muted-foreground">{activeStage.painPointsResolved}</p>
              </div>

              <div className="border-t border-border pt-2.5">
                <span className="font-bold text-foreground block mb-1">Exit Criteria to Next Stage:</span>
                <p className="text-muted-foreground">{activeStage.exitCriteria}</p>
              </div>

              <div className="border-t border-border pt-2.5 flex items-center justify-between">
                <span className="font-bold text-primary">Fast-Track Navigation:</span>
                {activeStage.id === "Awareness" && (
                  <Button asChild size="sm" variant="outline" className="h-7 text-xs">
                    <Link to="/about">Explore Story &rarr;</Link>
                  </Button>
                )}
                {activeStage.id === "Consideration" && (
                  <Button asChild size="sm" variant="outline" className="h-7 text-xs">
                    <Link to="/icp">SPICED Framework &rarr;</Link>
                  </Button>
                )}
                {activeStage.id === "Evaluation" && (
                  <Button asChild size="sm" variant="outline" className="h-7 text-xs">
                    <Link to="/dashboard">Analytics Hub &rarr;</Link>
                  </Button>
                )}
                {activeStage.id === "Decision" && (
                  <Button asChild size="sm" variant="outline" className="h-7 text-xs">
                    <Link to="/book-appointment">Book Consultation &rarr;</Link>
                  </Button>
                )}
                {activeStage.id === "Onboarding" && (
                  <Button asChild size="sm" variant="outline" className="h-7 text-xs">
                    <Link to="/video-upload">PWA Video Studio &rarr;</Link>
                  </Button>
                )}
                {activeStage.id === "Advocacy" && (
                  <Button asChild size="sm" variant="outline" className="h-7 text-xs">
                    <Link to="/reports">Enterprise Reports &rarr;</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Live Journey Telemetry Stream */}
      <div className="surface-card rounded-2xl border border-border p-6 bg-card text-card-foreground shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Customer Journey Telemetry Stream
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live funnel events synchronized with Google Sheets tab <strong>Customer_Journey_Events</strong>.
            </p>
          </div>
          <span className="text-xs font-mono text-muted-foreground">{history.length} Touchpoints Logged</span>
        </div>

        {history.length === 0 ? (
          <div className="p-8 text-center text-xs text-muted-foreground">
            No journey events logged yet. Tap "Simulate Touchpoint" above to record a customer interaction.
          </div>
        ) : (
          <div className="divide-y divide-border overflow-x-auto mt-2">
            {history.map((ev) => (
              <div key={ev.eventId} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5">
                    <TrendingUp className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground flex items-center gap-2">
                      <span>{ev.action}</span>
                      <span className="text-[10px] bg-primary/15 text-primary px-1.5 py-0.2 rounded font-mono font-bold">
                        {ev.stage}
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-2 mt-0.5">
                      <span>{ev.segment}</span>
                      <span>•</span>
                      <span>{ev.touchpoint}</span>
                      <span>•</span>
                      <span>{new Date(ev.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                    SYNCED TO SHEETS
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    Time: {ev.timeSpentSeconds}s
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

