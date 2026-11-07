import React from "react";
import { useAuth } from "@/lib/auth-context";
import { KeyRound, ShieldCheck, Clock, Laptop, RefreshCw } from "lucide-react";

export function TokenSessionBanner() {
  const { user, sessionInfo, sessionToken, refreshSession } = useAuth();

  if (!user || !sessionToken) return null;

  const hoursLeft = sessionInfo?.timeLeftSeconds
    ? Math.max(0, Math.floor(sessionInfo.timeLeftSeconds / 3600))
    : 8;

  const minsLeft = sessionInfo?.timeLeftSeconds
    ? Math.max(0, Math.floor((sessionInfo.timeLeftSeconds % 3600) / 60))
    : 0;

  return (
    <div className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-primary/5 p-4 mb-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary/20 text-primary grid place-items-center shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                <KeyRound className="h-3.5 w-3.5" /> Token Session Active
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">
                HMAC-SHA256 Signed
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Signed in as <strong className="text-foreground">{user.name}</strong> ({user.role || "Athlete"}) · ID: <code className="text-[11px] bg-muted px-1 rounded">{sessionInfo?.sessionId || "sess_live"}</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span>Expires in: <strong>{hoursLeft}h {minsLeft}m</strong></span>
          </div>

          <button
            type="button"
            onClick={() => refreshSession()}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md bg-secondary hover:bg-secondary/80 text-foreground border border-border transition"
            title="Refresh session token lifetime"
          >
            <RefreshCw className="h-3 w-3" />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

