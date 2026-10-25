import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity, AlertTriangle, ArrowRight, Calendar, CheckCircle2,
  Milestone, Radio, Sparkles, Timer, TrendingUp,
  Trophy, User, Users, Eye,
} from "lucide-react";

export const Route = createFileRoute("/icp")({
  head: () => ({
    meta: [
      { title: "ICP & Solutions — SportsMax Intelligence Hub" },
      { name: "description", content: "SPICED-framework solutions for Elite Clubs, NCAA programs, National Federations, Elite Athletes, and Broadcasters." },
    ],
  }),
  component: ICPPage,
});

const ICP_DATA = [
  {
    id: "clubs", icon: Users, iconColor: "text-emerald-400",
    gradientFrom: "#064e3b", gradientTo: "#0f172a",
    badge: "ICP 01 · Pro Sport", role: "Head of Performance / Head Coach / GM",
    segment: "Elite Clubs & Pro Franchises",
    industry: "Professional Sport (Football, Basketball, Rugby, Cricket)",
    tagline: "Turn 90 minutes of match footage into 48-hour competitive advantage.",
    valuePromise: "Cut tactical prep time by 70% and reduce soft-tissue injuries by up to 28% — without a single additional sensor.",
    spiced: {
      situation: { icon: Eye, label: "Situation", color: "text-blue-400", heading: "You're swimming in footage but drowning in time.", body: "Your performance department currently receives 6–12 hours of raw match and training video per week. Analysts spend 14–20 hours per cycle manually tagging events, clipping highlights, and compiling PDF reports — all before the coaching staff ever sees a single insight." },
      pain: { icon: AlertTriangle, label: "Pain", color: "text-amber-400", heading: "Your rivals are seeing what you're missing.", body: "Without automated biomechanical tracking, you're guessing at soft-tissue load — and the guesses are expensive. Every sprint miscounted is a hamstring waiting to tear. Manual review can't scale to multi-camera setups, and wearable data is siloed, incomplete, and GDPR-constrained." },
      impact: { icon: TrendingUp, label: "Impact", color: "text-red-400", heading: "The cost of inaction compounds every match week.", body: "One avoidable ACL injury costs a club €500K–€2M in wages, treatment, and squad disruption — per incident. Clubs that rely on manual analysis fall 12–18 months behind peers who automate — a gap that shows up directly in league table position and transfer market valuation." },
      critical: { icon: Timer, label: "Critical Event", color: "text-orange-400", heading: "Transfer windows and pre-season camps won't wait.", body: "The January window opens in 8 weeks. Squad validation decisions must be backed by verified performance metrics, not gut feel. Pre-season infrastructure must be locked in before the first session. Teams that delay onboarding miss 6–8 weeks of baseline data that shapes the entire season model." },
      decision: { icon: CheckCircle2, label: "Decision", color: "text-emerald-400", heading: "Activate SportsMax Match Suite™ this week.", body: "SportsMax ingests your existing camera feeds — no new hardware — and delivers automated pitch control models, ACWR load scores, passing network maps, and injury-risk alerts within 24 hours of each session. Onboarding takes 48 hours. ROI is measurable by week 3.", cta: { label: "Book a Club Demo", href: "/book-appointment" } },
    },
    outcomes: [
      { metric: "70%", desc: "Reduction in analyst prep time" },
      { metric: "28%", desc: "Fewer soft-tissue injuries (avg. 12 months)" },
      { metric: "48h", desc: "Time from match to full tactical report" },
      { metric: "€2M+", desc: "Injury cost avoidance per season" },
    ],
  },
  {
    id: "ncaa", icon: Milestone, iconColor: "text-blue-400",
    gradientFrom: "#1e3a5f", gradientTo: "#0f172a",
    badge: "ICP 02 · Collegiate", role: "Athletic Director / Head Coach / Sports Science Coordinator",
    segment: "University & Collegiate (NCAA D1–D3)",
    industry: "Collegiate Athletics — North America",
    tagline: "Give your D3 budget an Olympic-grade analytics engine.",
    valuePromise: "Deploy full-squad video biomechanics and tactical AI for less than the cost of one assistant coach salary per year.",
    spiced: {
      situation: { icon: Eye, label: "Situation", color: "text-blue-400", heading: "Competing at D1 level with D3 resources.", body: "NCAA programs outside the Power Five conferences operate with performance budgets 10–40x smaller than peers they compete against. Your strength & conditioning team relies on RPE self-reporting, coach's eye, and maybe a single Catapult vest shared across three squads." },
      pain: { icon: AlertTriangle, label: "Pain", color: "text-amber-400", heading: "You're recruiting blind and recovering slow.", body: "Recruiting film analysis is manual and subjective. Objective metrics — sprint velocity, deceleration signatures, jump kinematics — are unavailable without expensive hardware your budget won't allow. Athlete recovery decisions are based on feel, not data." },
      impact: { icon: TrendingUp, label: "Impact", color: "text-red-400", heading: "Lost scholarships, lost seasons, lost recruits.", body: "A single misidentified recruit costs $100K+ in scholarship over four years. Programs that can't show objective performance metrics to blue-chip recruits lose them to data-equipped rivals. Injury-driven roster gaps average 2.3 athletes per team per season." },
      critical: { icon: Timer, label: "Critical Event", color: "text-orange-400", heading: "Early signing period and fall camp converge in 60 days.", body: "The early signing window opens alongside fall camp evaluations. You need objective performance baselines for current athletes and verifiable film metrics for prospects simultaneously. Programs that enter this window with AI-verified data close 40% more verbal commits." },
      decision: { icon: CheckCircle2, label: "Decision", color: "text-blue-400", heading: "Deploy SportsMax Collegiate Edition before fall camp.", body: "SportsMax Collegiate Edition connects to any existing camera setup — even standard iPhone rigs — to deliver automated sprint tracking, joint-angle biomechanics, and recruit comparison profiles. No hardware purchase. Full activation in 72 hours.", cta: { label: "Request NCAA Pricing", href: "/pricing" } },
    },
    outcomes: [
      { metric: "40%", desc: "Improvement in recruit commit rate" },
      { metric: "$100K+", desc: "Scholarship waste avoided per mis-recruited athlete" },
      { metric: "72h", desc: "Time to full squad baseline profiling" },
      { metric: "3x", desc: "More athletes profiled vs. wearable-only stacks" },
    ],
  },
  {
    id: "federations", icon: Trophy, iconColor: "text-amber-400",
    gradientFrom: "#451a03", gradientTo: "#0f172a",
    badge: "ICP 03 · Federation", role: "High Performance Director / Technical Director / NOC Sports Science Lead",
    segment: "National Federations & NOCs",
    industry: "Olympic & Para-Olympic Sport Governance",
    tagline: "Build a sovereign national talent pipeline — from grassroots to the podium.",
    valuePromise: "Standardise multi-sport athlete benchmarking across 12+ disciplines from a single platform — no new equipment required at any affiliated club.",
    spiced: {
      situation: { icon: Eye, label: "Situation", color: "text-amber-400", heading: "Your talent data is fragmented across 40 affiliated clubs.", body: "Your federation oversees 8–40 member clubs or national training centres. Each operates in isolation with different tracking tools — Catapult, Polar, paper-based RPE, or nothing at all. Performance benchmarks are inconsistent, and you have no unified view of your national athlete pool." },
      pain: { icon: AlertTriangle, label: "Pain", color: "text-red-400", heading: "Olympic cycle windows close before your data arrives.", body: "Building a 4-year athlete development plan requires longitudinal biomechanical and load data. Without it, selection decisions rely on coaching committees and political pressure rather than merit. WADA compliance documentation is manual and audit-prone." },
      impact: { icon: TrendingUp, label: "Impact", color: "text-red-400", heading: "Medals lost to data gaps your rivals have already closed.", body: "Nations with centralised performance data systems win 2.7× more medals per athlete compared to fragmented systems (Oxford Sports Analytics, 2023). Every 4-year cycle without a data platform is a generation of athletes developed below their ceiling." },
      critical: { icon: Timer, label: "Critical Event", color: "text-orange-400", heading: "LA 2028 qualification windows open in 18 months.", body: "Olympic qualification periods for LA 2028 begin in early 2027. Athletes competing in qualification events need longitudinal baseline data established now to demonstrate performance trajectory. Federations that begin now will have 3 full competitive seasons of evidence." },
      decision: { icon: CheckCircle2, label: "Decision", color: "text-amber-400", heading: "Deploy SportsMax Federation Edition across your affiliated clubs.", body: "SportsMax Federation Edition provides a centralised dashboard for your high-performance directorate while giving affiliated clubs an autonomous local view. One platform. 12+ sports modules. WADA ADAMS ledger integration. GDPR-sovereign data enclave.", cta: { label: "Schedule Federation Briefing", href: "/book-appointment" } },
    },
    outcomes: [
      { metric: "2.7x", desc: "More medals per athlete in centralised data systems" },
      { metric: "90 days", desc: "Full federation rollout timeline" },
      { metric: "12+", desc: "Sports disciplines on one unified platform" },
      { metric: "100%", desc: "WADA ADAMS ledger compliant" },
    ],
  },
  {
    id: "athletes", icon: User, iconColor: "text-emerald-400",
    gradientFrom: "#052e16", gradientTo: "#0f172a",
    badge: "ICP 04 · Athlete", role: "Elite Athlete / Professional Player / Agent/Manager",
    segment: "Elite Athletes & Agencies",
    industry: "Professional Sport — Individual & Team Disciplines",
    tagline: "Your performance metrics are your market value. Make them undeniable.",
    valuePromise: "Generate a video-verified athlete passport that commands higher contract valuations, speeds up transfer negotiations, and bulletproofs injury compensation claims.",
    spiced: {
      situation: { icon: Eye, label: "Situation", color: "text-emerald-400", heading: "Your performance is world-class. Your data tells no story.", body: "You're producing elite output — sprint speeds, jump heights, tackle wins, shot accuracy — but none of it is captured in a format that travels with you to the next club, federation, or contract negotiation. Scouts rely on subjective highlights. Clubs rely on their own proprietary data that stays with them, not you." },
      pain: { icon: AlertTriangle, label: "Pain", color: "text-amber-400", heading: "Your career value disappears when you leave a club.", body: "When a player transfers, their performance data stays with the selling club. The buying club runs their own tests — often undervaluing players who don't perform optimally on evaluation day. Post-injury return timelines are disputed because there's no objective biomechanical baseline." },
      impact: { icon: TrendingUp, label: "Impact", color: "text-red-400", heading: "Millions left on the table. Recoveries delayed by guesswork.", body: "Players with portable, verified performance profiles command 12–22% higher transfer fees. Without injury-baseline data, insurance claims and return-to-play disputes add 4–8 weeks to recovery timelines — $250K+ in lost earnings per incident, plus reputational cost." },
      critical: { icon: Timer, label: "Critical Event", color: "text-orange-400", heading: "Your contract window is open — and closes in 6 months.", body: "Whether you're pre-transfer, mid-season, or approaching free agency, the window to establish a verified performance baseline is now. Data collected over a 3-month continuous period creates a statistically defensible performance profile that wins negotiations." },
      decision: { icon: CheckCircle2, label: "Decision", color: "text-emerald-400", heading: "Claim your SportsMax Athlete Passport™ today.", body: "SportsMax Athlete Passport™ is your personal, portable, club-independent performance profile — continuously updated from video, verified by AI, and timestamped on an immutable data ledger. Share it with any club, agent, federation, or insurer instantly.", cta: { label: "Claim Your Athlete Passport", href: "/athletes" } },
    },
    outcomes: [
      { metric: "22%", desc: "Higher transfer fees for data-profiled athletes" },
      { metric: "4–8 wks", desc: "Faster return-to-play with objective baselines" },
      { metric: "100%", desc: "Athlete-owned, portable performance data" },
      { metric: "$250K+", desc: "Injury claim leverage per incident" },
    ],
  },
  {
    id: "broadcasters", icon: Radio, iconColor: "text-purple-400",
    gradientFrom: "#2e1065", gradientTo: "#0f172a",
    badge: "ICP 05 · Media", role: "Head of Digital / Broadcast Technology Director / Sports Content Lead",
    segment: "Broadcasters & Media Partners",
    industry: "Sports Media, Broadcast & Digital Publishing",
    tagline: "Transform every live match into an interactive intelligence broadcast.",
    valuePromise: "Overlay real-time AI stat graphics, win-probability engines, and automated highlight clips onto any broadcast feed — with zero additional camera infrastructure.",
    spiced: {
      situation: { icon: Eye, label: "Situation", color: "text-purple-400", heading: "Your audience expects ESPN Stats & Info. Your budget says otherwise.", body: "Tier-2 and regional sports broadcasters carry live rights to 200+ events per season but lack the data infrastructure to deliver AI-augmented overlays, real-time statistics, and interactive second-screen content that modern audiences demand." },
      pain: { icon: AlertTriangle, label: "Pain", color: "text-amber-400", heading: "Flat viewership, dropping dwell time, rising rights costs.", body: "Average dwell time on linear sports broadcasts has dropped 19% in 4 years (Nielsen, 2024). Without interactive data layers — real-time xG, heat maps, win probability, player speed overlays — audiences switch to platforms that offer them. Manual highlight production takes 4–6 hours, missing the peak social sharing window." },
      impact: { icon: TrendingUp, label: "Impact", color: "text-red-400", heading: "Lower CPM, churn risk, and sponsor dissatisfaction.", body: "Sponsor retention hinges on audience engagement metrics. A 20% drop in dwell time translates directly to reduced CPM rates and sponsor fee renegotiations. OTT churn accelerates when subscribers can't get the second-screen data experience they pay for." },
      critical: { icon: Timer, label: "Critical Event", color: "text-orange-400", heading: "New season broadcast rights renew in Q1 — sponsors want proof.", body: "Rights-holders and title sponsors are requesting data-augmented broadcast commitments in contract renewals. Platforms that cannot demonstrate AI-enriched content pipelines are losing preferred partner status. The new season is 12 weeks away." },
      decision: { icon: CheckCircle2, label: "Decision", color: "text-purple-400", heading: "Integrate SportsMax Broadcast Intelligence API™.", body: "SportsMax Broadcast Intelligence API™ plugs directly into your existing production stack — OBS, Vizrt, AWS Elemental — to stream real-time AI overlays: player tracking, xG, win probability, formation maps. Highlight clips auto-generated within 90 seconds of each key event.", cta: { label: "Request Broadcast API Access", href: "/book-appointment" } },
    },
    outcomes: [
      { metric: "90 sec", desc: "Auto-generated highlight clips post-event" },
      { metric: "+34%", desc: "Avg. dwell time increase with AI overlays" },
      { metric: "0", desc: "Additional cameras required" },
      { metric: "Real-time", desc: "xG, win-probability & tracking overlays" },
    ],
  },
];

function SpicedCard({ step, label, Icon, iconColor, heading, body, accent }: {
  step: string; label: string; Icon: React.ComponentType<{ className?: string }>;
  iconColor: string; heading: string; body: string; accent: string;
}) {
  return (
    <div
      className="rounded-2xl border border-white/10 overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${accent} 0%, #0f172a 100%)` }}
    >
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 border-b border-white/10">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/15">
          <span className="text-xs font-black text-slate-200">{step}</span>
        </div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</div>
        <Icon className={`h-4 w-4 ml-auto ${iconColor}`} />
      </div>
      <div className="px-5 pt-4 pb-5">
        <h3 className="text-sm font-bold text-white mb-2">{heading}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

export function ICPPage() {
  const [activeICP, setActiveICP] = useState(0);
  const icp = ICP_DATA[activeICP];

  return (
    <div className="min-h-screen bg-[#080f1a] text-slate-100">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/10 pt-24 pb-16">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.18) 0%, transparent 70%)" }}
        />
        <div className="content-wrap relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-400 mb-6">
            <Activity className="h-3 w-3" />
            ICP &amp; Solutions — SPICED Intelligence Framework
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4">
            Built for your world.
            <span className="block text-emerald-400">Not the sport in general.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mb-10">
            Every customer segment faces a distinct situation, distinct pain, and distinct urgency. Select your profile below to see exactly how SportsMax delivers measurable value for your role, your constraints, and your timeline.
          </p>
          <div className="flex flex-wrap gap-2">
            {ICP_DATA.map((item, i) => {
              const Icon = item.icon;
              const isActive = i === activeICP;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveICP(i)}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all duration-200 border ${
                    isActive
                      ? "bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-950/50"
                      : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.segment}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SPICED Panel */}
      <div className="content-wrap py-14">
        <div className="grid lg:grid-cols-[340px_1fr] gap-8 items-start">
          {/* Identity Card */}
          <div
            className="rounded-2xl border border-white/10 overflow-hidden sticky top-24"
            style={{ background: `linear-gradient(160deg, ${icp.gradientFrom} 0%, ${icp.gradientTo} 100%)` }}
          >
            <div className="px-5 pt-5 pb-3 border-b border-white/10">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">{icp.badge}</div>
              <div className="text-2xl font-black text-white leading-tight mb-1">{icp.segment}</div>
              <div className="text-xs text-slate-300 font-medium">{icp.role}</div>
            </div>
            <div className="px-5 py-4 border-b border-white/10">
              <div className="text-sm font-bold text-white leading-snug">&ldquo;{icp.tagline}&rdquo;</div>
            </div>
            <div className="px-5 py-4 border-b border-white/10">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Value Promise</div>
              <div className="text-xs text-slate-200 leading-relaxed">{icp.valuePromise}</div>
            </div>
            <div className="px-5 py-4 border-b border-white/10">
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Measurable Outcomes</div>
              <div className="grid grid-cols-2 gap-3">
                {icp.outcomes.map((o, idx) => (
                  <div key={idx} className="bg-white/10 rounded-xl p-3 border border-white/10">
                    <div className="text-xl font-black text-white mb-0.5">{o.metric}</div>
                    <div className="text-[10px] text-slate-300 leading-snug">{o.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-5 py-4">
              <Link
                to={icp.spiced.decision.cta.href}
                className="flex items-center justify-center gap-2 w-full rounded-xl py-3 px-4 text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg transition-all"
              >
                {icp.spiced.decision.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* SPICED Cards */}
          <div className="space-y-4">
            <div className="mb-6">
              <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">
                SPICED Framework · {icp.segment}
              </div>
              <div className="text-slate-400 text-sm">
                Industry: <span className="text-slate-200 font-medium">{icp.industry}</span> · Role: <span className="text-slate-200 font-medium">{icp.role}</span>
              </div>
            </div>
            <SpicedCard
              step="S"
              label={icp.spiced.situation.label}
              Icon={icp.spiced.situation.icon}
              iconColor={icp.spiced.situation.color}
              heading={icp.spiced.situation.heading}
              body={icp.spiced.situation.body}
              accent="#1e3a5f"
            />
            <SpicedCard
              step="P"
              label={icp.spiced.pain.label}
              Icon={icp.spiced.pain.icon}
              iconColor={icp.spiced.pain.color}
              heading={icp.spiced.pain.heading}
              body={icp.spiced.pain.body}
              accent="#3b1c0a"
            />
            <SpicedCard
              step="I"
              label={icp.spiced.impact.label}
              Icon={icp.spiced.impact.icon}
              iconColor={icp.spiced.impact.color}
              heading={icp.spiced.impact.heading}
              body={icp.spiced.impact.body}
              accent="#2d1515"
            />
            <SpicedCard
              step="CE"
              label={icp.spiced.critical.label}
              Icon={icp.spiced.critical.icon}
              iconColor={icp.spiced.critical.color}
              heading={icp.spiced.critical.heading}
              body={icp.spiced.critical.body}
              accent="#2d1f08"
            />
            {/* Decision */}
            <div
              className="rounded-2xl border border-emerald-500/30 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #062318 0%, #0f172a 100%)" }}
            >
              <div className="flex items-center gap-3 px-5 pt-4 pb-3 border-b border-white/10">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                  <span className="text-xs font-black text-emerald-400">D</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Decision</div>
                <CheckCircle2 className="h-4 w-4 ml-auto text-emerald-400" />
              </div>
              <div className="px-5 pt-4 pb-5">
                <h3 className="text-base font-bold text-white mb-2">{icp.spiced.decision.heading}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">{icp.spiced.decision.body}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to={icp.spiced.decision.cta.href}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold px-5 py-2.5 transition-all shadow-lg shadow-emerald-900/30"
                  >
                    {icp.spiced.decision.cta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/book-appointment"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold px-5 py-2.5 transition-all"
                  >
                    <Calendar className="h-4 w-4 text-slate-400" />
                    Book a 30-min Call
                  </Link>
                </div>
              </div>
            </div>
            {/* CTA Strip */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="text-xs font-bold text-white mb-1">Not sure which solution fits?</div>
                <div className="text-xs text-slate-400">
                  Book a 30-minute discovery call. We&apos;ll map the right SportsMax module to your specific workflow, budget, and timeline — no sales pitch, just signal.
                </div>
              </div>
              <Link
                to="/book-appointment"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white text-slate-900 text-xs font-bold px-4 py-2.5 hover:bg-slate-100 transition-all"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Discovery Session
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* All ICPs strip */}
      <div className="border-t border-white/10 bg-white/[0.02] py-12">
        <div className="content-wrap">
          <div className="text-center mb-8">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Complete Solutions Ecosystem</div>
            <h2 className="font-display text-2xl font-black text-white">Every ICP. One platform.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {ICP_DATA.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveICP(i);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group text-left rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 p-4 transition-all duration-200"
                >
                  <Icon className="h-5 w-5 mb-3 text-emerald-400" />
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{item.badge}</div>
                  <div className="text-xs font-bold text-white leading-snug">{item.segment}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
