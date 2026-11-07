import React, { useState, useEffect } from "react";
import { Smartphone, Download, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Check if user dismissed it earlier
      const dismissed = localStorage.getItem("smx_pwa_dismissed");
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // If browser doesn't support automatic prompt (like iOS Safari), show instructions
      alert(
        "To install on iOS Safari:\n1. Tap the Share button (square with arrow)\n2. Scroll down and tap 'Add to Home Screen'"
      );
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setShowPrompt(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("smx_pwa_dismissed", "true");
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="surface-card rounded-2xl border border-primary/30 bg-card/95 backdrop-blur-xl p-4 shadow-2xl flex items-start gap-3">
        <div className="h-10 w-10 rounded-xl bg-primary/20 text-primary grid place-items-center shrink-0">
          <Smartphone className="h-5 w-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground">Install SportsMax Mobile App</span>
            <button
              onClick={handleDismiss}
              className="text-muted-foreground hover:text-foreground text-xs p-1"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Install on your home screen for one-tap video recording, full-screen mode, and offline AI processing.
          </p>

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
              Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
