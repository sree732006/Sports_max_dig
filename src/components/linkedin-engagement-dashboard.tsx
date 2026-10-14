import React, { useState } from "react";
import {
  BarChart3,
  Building2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Eye,
  Globe2,
  LineChart,
  Linkedin,
  MessageSquare,
  MousePointerClick,
  Plus,
  Share2,
  Sparkles,
  ThumbsUp,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LinkedInMetricEntry {
  id: string;
  postTitle: string;
  postUrl: string;
  date: string;
  impressions: number;
  clicks: number;
  reactions: number;
  comments: number;
  shares: number;
  leadsAttributed: number;
}

const INITIAL_METRICS: LinkedInMetricEntry[] = [
  {
    id: "li_1",
    postTitle: "SportsMax AI Telemetry & Tactical Intelligence Launch",
    postUrl: "https://www.linkedin.com/company/sportsmax-tech",
    date: "2026-10-12",
    impressions: 1240,
    clicks: 184,
    reactions: 92,
    comments: 18,
    shares: 11,
    leadsAttributed: 7,
  },
  {
    id: "li_2",
    postTitle: "How Biomechanical Modeling Prevents ACL Fatigue Injuries",
    postUrl: "https://www.linkedin.com/company/sportsmax-tech",
    date: "2026-10-08",
    impressions: 890,
    clicks: 112,
    reactions: 64,
    comments: 9,
    shares: 8,
    leadsAttributed: 4,
  },
  {
    id: "li_3",
    postTitle: "Computer Vision Pitch Analysis for Academy Coaches",
    postUrl: "https://www.linkedin.com/company/sportsmax-tech",
    date: "2026-10-03",
    impressions: 1560,
    clicks: 245,
    reactions: 138,
    comments: 26,
    shares: 19,
    leadsAttributed: 12,
  },
];

export function LinkedInEngagementDashboard() {
  const [entries, setEntries] = useState<LinkedInMetricEntry[]>(INITIAL_METRICS);
  const [showAddForm, setShowAddForm] = useState(false);

  // New entry form state
  const [postTitle, setPostTitle] = useState("");
  const [postUrl, setPostUrl] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [impressions, setImpressions] = useState("");
  const [clicks, setClicks] = useState("");
  const [reactions, setReactions] = useState("");
  const [comments, setComments] = useState("");
  const [shares, setShares] = useState("");

  const totalImpressions = entries.reduce((acc, curr) => acc + curr.impressions, 0);
  const totalClicks = entries.reduce((acc, curr) => acc + curr.clicks, 0);
  const totalReactions = entries.reduce((acc, curr) => acc + curr.reactions, 0);
  const totalComments = entries.reduce((acc, curr) => acc + curr.comments, 0);
  const totalShares = entries.reduce((acc, curr) => acc + curr.shares, 0);
  const totalLeads = entries.reduce((acc, curr) => acc + curr.leadsAttributed, 0);

  const avgCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(1) : "0.0";
  const avgEngagementRate =
    totalImpressions > 0
      ? (((totalReactions + totalComments + totalShares + totalClicks) / totalImpressions) * 100).toFixed(1)
      : "0.0";

  function handleAddEntry(e: React.FormEvent) {
    e.preventDefault();
    if (!postTitle.trim()) return;

    const newEntry: LinkedInMetricEntry = {
      id: "li_" + Date.now(),
      postTitle: postTitle.trim(),
      postUrl: postUrl.trim() || "https://www.linkedin.com",
      date,
      impressions: parseInt(impressions, 10) || 0,
      clicks: parseInt(clicks, 10) || 0,
      reactions: parseInt(reactions, 10) || 0,
      comments: parseInt(comments, 10) || 0,
      shares: parseInt(shares, 10) || 0,
      leadsAttributed: 0,
    };

    setEntries([newEntry, ...entries]);
    setPostTitle("");
    setPostUrl("");
    setImpressions("");
    setClicks("");
    setReactions("");
    setComments("");
    setShares("");
    setShowAddForm(false);
  }

  return (
    <div className="surface-card p-6 md:p-8 rounded-2xl border border-sky-500/20 bg-gradient-to-b from-sky-950/20 to-card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <Linkedin className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">LinkedIn Engagement & Attribution</h2>
              <span className="rounded-full bg-sky-500/20 px-2.5 py-0.5 text-[10px] font-bold text-sky-300 border border-sky-500/30">
                UTM + Page Tracking
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Tracks visitors arriving via LinkedIn UTM links, lead conversions, and Company Page post metrics.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowAddForm(!showAddForm)}
            className="border-sky-500/30 text-sky-300 hover:bg-sky-500/10"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            {showAddForm ? "Close Entry" : "Log Post Analytics"}
          </Button>

          <a
            href="https://www.linkedin.com/company/setup/admin-hub/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/80 px-3 py-2 text-xs font-semibold text-foreground hover:bg-secondary transition"
          >
            <span>LinkedIn Admin</span>
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
          </a>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6">
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <Eye className="h-4 w-4 text-sky-400" />
            <span>Impressions</span>
          </div>
          <div className="mt-2 text-2xl font-black text-foreground">{totalImpressions.toLocaleString()}</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Across tracked updates</div>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <MousePointerClick className="h-4 w-4 text-emerald-400" />
            <span>Website Clicks</span>
          </div>
          <div className="mt-2 text-2xl font-black text-emerald-400">{totalClicks.toLocaleString()}</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">CTR: {avgCtr}%</div>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <ThumbsUp className="h-4 w-4 text-sky-400" />
            <span>Reactions</span>
          </div>
          <div className="mt-2 text-2xl font-black text-foreground">{totalReactions.toLocaleString()}</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Likes & applause</div>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <MessageSquare className="h-4 w-4 text-violet-400" />
            <span>Comments</span>
          </div>
          <div className="mt-2 text-2xl font-black text-foreground">{totalComments.toLocaleString()}</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Discussions started</div>
        </div>

        <div className="rounded-xl border border-border bg-card/60 p-4">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
            <Share2 className="h-4 w-4 text-amber-400" />
            <span>Reposts / Shares</span>
          </div>
          <div className="mt-2 text-2xl font-black text-foreground">{totalShares.toLocaleString()}</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">Viral reach boost</div>
        </div>

        <div className="rounded-xl border border-sky-500/40 bg-sky-500/10 p-4">
          <div className="flex items-center gap-2 text-sky-300 text-xs font-bold">
            <Sparkles className="h-4 w-4 text-sky-400" />
            <span>Attributed Leads</span>
          </div>
          <div className="mt-2 text-2xl font-black text-sky-400">{totalLeads.toLocaleString()}</div>
          <div className="text-[11px] text-sky-300/80 mt-0.5">via /linkedin form</div>
        </div>
      </div>

      {/* Manual Entry Form */}
      {showAddForm && (
        <form onSubmit={handleAddEntry} className="mt-6 rounded-xl border border-sky-500/30 bg-sky-950/30 p-5">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Plus className="h-4 w-4 text-sky-400" />
            Log Post Analytics from LinkedIn Page Admin
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Post Title / Topic *</label>
              <input
                required
                type="text"
                placeholder="e.g., Athlete GPS kinemetics case study"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Post URL (optional)</label>
              <input
                type="url"
                placeholder="https://www.linkedin.com/feed/update/..."
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Publish Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Impressions</label>
              <input
                type="number"
                placeholder="1200"
                value={impressions}
                onChange={(e) => setImpressions(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Website Clicks</label>
              <input
                type="number"
                placeholder="150"
                value={clicks}
                onChange={(e) => setClicks(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Reactions (Likes)</label>
              <input
                type="number"
                placeholder="75"
                value={reactions}
                onChange={(e) => setReactions(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Comments & Shares</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-2.5 py-2 text-xs text-foreground focus:border-sky-500 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Shares"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-2.5 py-2 text-xs text-foreground focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm" className="bg-sky-600 hover:bg-sky-500 text-white">
              Save Entry
            </Button>
          </div>
        </form>
      )}

      {/* Tracked Posts Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
        <div className="px-5 py-3 bg-secondary/40 border-b border-border flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Tracked LinkedIn Updates & Campaign Performance
          </span>
          <span className="text-[11px] text-muted-foreground">
            Engagement Rate: <strong className="text-foreground">{avgEngagementRate}%</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/20 text-muted-foreground font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Post / Campaign</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Impressions</th>
                <th className="px-4 py-3 text-right">Clicks</th>
                <th className="px-4 py-3 text-right">Reactions</th>
                <th className="px-4 py-3 text-right">Comments</th>
                <th className="px-4 py-3 text-right">Shares</th>
                <th className="px-5 py-3 text-right">Leads</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {entries.map((item) => {
                const ctr = item.impressions > 0 ? ((item.clicks / item.impressions) * 100).toFixed(1) : "0";
                return (
                  <tr key={item.id} className="hover:bg-secondary/30 transition">
                    <td className="px-5 py-3.5 font-semibold text-foreground max-w-xs truncate">
                      <a
                        href={item.postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sky-400 hover:underline flex items-center gap-1.5"
                      >
                        <span className="truncate">{item.postTitle}</span>
                        <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground" />
                      </a>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground font-mono">{item.date}</td>
                    <td className="px-4 py-3.5 text-right font-mono text-foreground">
                      {item.impressions.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-emerald-400">
                      {item.clicks.toLocaleString()}
                      <span className="text-[10px] text-muted-foreground ml-1">({ctr}%)</span>
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-foreground">
                      {item.reactions.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-foreground">
                      {item.comments.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 text-right font-mono text-foreground">
                      {item.shares.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono font-bold text-sky-400">
                      {item.leadsAttributed > 0 ? (
                        <span className="inline-flex items-center gap-1 bg-sky-500/10 px-2 py-0.5 rounded text-sky-400 border border-sky-500/20">
                          {item.leadsAttributed}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tracking Guide Callout */}
      <div className="mt-6 rounded-xl border border-sky-500/20 bg-sky-500/5 p-4 text-xs text-muted-foreground leading-relaxed">
        <div className="flex items-start gap-3">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sky-400 font-bold text-[11px]">
            i
          </div>
          <div>
            <strong className="text-foreground">How to track links shared on LinkedIn:</strong>
            <p className="mt-1">
              Whenever you share a link on LinkedIn, append UTM parameters so our system automatically records the lead source into Google Sheets, Jira, and Airtable:
            </p>
            <div className="mt-2 rounded bg-black/40 p-2 font-mono text-[11px] text-sky-300 select-all border border-sky-500/20">
              https://sports-max-dig.vercel.app/linkedin?utm_source=linkedin&utm_medium=organic_social&utm_campaign=launch
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
