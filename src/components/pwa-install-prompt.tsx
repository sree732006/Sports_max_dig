import React, { useState, useEffect } from "react";
import { Smartphone, Download, X, ArrowUpRight, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if already running in standalone PWA mode
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
      return;
    }

    const ua = navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(ua);
    setIsIos(ios);

    const isMobile = /android|iphone|ipad|ipod/i.test(ua);

    // Listen for Chrome / Android beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    // On mobile devices, always display install card if not dismissed
    const dismissed = sessionStorage.getItem("smx_pwa_dismissed");
    if (isMobile && !dismissed) {
      const timer = setTimeout(() => setShowPrompt(true), 1200);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("beforeinstallprompt", handler);
      };
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setIsInstalled(true);
      }
      setShowPrompt(false);
      setDeferredPrompt(null);
    } else if (isIos) {
      setShowIosGuide(true);
    } else {
      // Chrome / Edge menu fallback instruction
      alert(
        "To install on Android:\n1. Tap the three dots (⋮) in the top-right of Chrome\n2. Tap 'Install app' or 'Add to Home screen'"
      );
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("smx_pwa_dismissed", "true");
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="surface-card rounded-2xl border border-primary/40 bg-card/98 backdrop-blur-xl p-4 shadow-2xl ring-1 ring-primary/20">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/20 text-primary grid place-items-center shrink-0">
            <Smartphone className="h-5 w-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <span>SportsMax Mobile App</span>
                <span className="text-[9px] bg-primary/20 text-primary px-1.5 py-0.2 rounded font-mono font-bold">PWA</span>
              </span>
              <button
                onClick={handleDismiss}
                className="text-muted-foreground hover:text-foreground text-xs p-1"
                aria-label="Close prompt"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-muted-foreground mt-0.5">
              Install to your home screen for full-screen camera video recording, sensorless kinematics &amp; offline mode.
            </p>

            {showIosGuide ? (
              <div className="mt-3 p-2.5 rounded-lg bg-secondary/80 border border-border text-[11px] text-foreground space-y-1">
                <div className="font-semibold flex items-center gap-1 text-primary">
                  <Share className="h-3.5 w-3.5" /> iOS Safari Steps:
                </div>
                <div>1. Tap the <strong>Share</strong> icon (bottom bar)</div>
                <div>2. Tap <strong>'Add to Home Screen'</strong></div>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-3">
                <Button
                  size="sm"
                  onClick={handleInstallClick}
                  className="h-7 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1"
                >
                  <Download className="h-3 w-3" />
                  <span>Install App</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="h-7 text-xs text-muted-foreground"
                >
                  Not now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
