import { useState } from "react";
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

export const Route = createFileRoute("/resources")({
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
  { title: "The Biomechanics of Fosbury Flop Apex Clearance", category: "Sports Science", date: "Sep 28, 2026", readTime: "5 min read" },
  { title: "Understanding Acute-to-Chronic Workload Ratio in Elite Runners", category: "Load Management", date: "Sep 15, 2026", readTime: "8 min read" },
  { title: "How Expected Goals (xG) is Evolving with Optical Tracking", category: "Tactical Analytics", date: "Aug 30, 2026", readTime: "6 min read" },
];

const caseStudies = [
  { team: "Metropolitan Athletics Club", metric: "-42% Soft Tissue Injuries", story: "How continuous ACWR tracking kept 32 sprinters healthy through national championships." },
  { team: "Premier League Division 1", metric: "+1.34 xG Differential", story: "Implementing real-time press resistance heatmaps during live tactical halftime debriefs." },
];

export function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<"blog" | "case-studies" | "knowledge-base" | "api">("blog");

  return (
    <>
      <PageIntro
        eyebrow="Resources & Research"
        title="Sports Science & Developer Documentation"
        text="Dive deep into peer-reviewed sports science methodologies, tactical whitepapers, customer case studies, and REST/WebSocket API endpoints."
        action={
          <div className="flex flex-col items-end gap-3">
            <DemoBadge />
            <div className="flex flex-wrap gap-1 bg-secondary p-1 rounded-lg border border-border">
              <button
                type="button"
                onClick={() => setActiveTab("blog")}
                className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                  activeTab === "blog" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Blog & Articles
              </button>
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
                onClick={() => setActiveTab("knowledge-base")}
                className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                  activeTab === "knowledge-base" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Knowledge Base
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("api")}
                className={`px-3 py-1.5 rounded text-xs font-bold transition ${
                  activeTab === "api" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                API Documentation
              </button>
            </div>
          </div>
        }
      />

      <section className="py-12 bg-background">
        <div className="content-wrap">
          {/* Tab 1: Blog */}
          {activeTab === "blog" && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <article key={a.title} className="surface-card p-6 flex flex-col justify-between hover:border-primary/50 transition">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{a.category}</span>
                    <h3 className="text-base font-bold mt-2 text-foreground">{a.title}</h3>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                    <span>{a.date}</span>
                    <span>{a.readTime}</span>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Tab 2: Case Studies */}
          {activeTab === "case-studies" && (
            <div className="grid gap-6 sm:grid-cols-2">
              {caseStudies.map((cs) => (
                <div key={cs.team} className="surface-card p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Case Study</span>
                  <h3 className="text-xl font-bold mt-1 text-foreground">{cs.team}</h3>
                  <div className="mt-3 inline-block rounded bg-primary/10 text-primary font-mono font-bold text-sm px-2.5 py-1">
                    {cs.metric}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{cs.story}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Knowledge Base */}
          {activeTab === "knowledge-base" && (
            <div className="surface-card p-8">
              <SectionHead eyebrow="Sports Science Guide" title="Frequently Consulted Methodologies" />
              <div className="grid gap-4 sm:grid-cols-2 mt-4 text-xs">
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <h4 className="font-bold text-sm text-foreground">How is SWOLF calculated?</h4>
                  <p className="text-muted-foreground mt-1 leading-relaxed">
                    SWOLF combines swim time in seconds plus stroke count for a single pool length. Lower scores represent greater hydrodynamic efficiency.
                  </p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-secondary/30">
                  <h4 className="font-bold text-sm text-foreground">What constitutes the ACWR sweet spot?</h4>
                  <p className="text-muted-foreground mt-1 leading-relaxed">
                    A ratio between 0.8 and 1.3 represents safe progressive adaptation. Spikes above 1.5 increase relative risk of soft-tissue fatigue by 2x to 4x.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: API */}
          {activeTab === "api" && (
            <div className="surface-card p-8">
              <SectionHead eyebrow="Developers" title="REST & Streaming WebSocket API" />
              <p className="text-xs text-muted-foreground mb-6">
                Ingest telemetry and query athlete records programmatically using SportsMax Developer APIs.
              </p>
              <div className="rounded-lg bg-secondary p-4 font-mono text-xs overflow-x-auto border border-border">
                <p className="text-muted-foreground">// Sample GET /v1/athletes/:id/telemetry/latest</p>
                <pre className="text-foreground mt-2">{`{
  "athleteId": "ath_94821",
  "sport": "running",
  "timestamp": "2026-10-03T06:45:00Z",
  "metrics": {
    "pace": 5.14,
    "cadence": 170,
    "heartRate": 156,
    "vo2MaxEst": 54.2
  }
}`}</pre>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
