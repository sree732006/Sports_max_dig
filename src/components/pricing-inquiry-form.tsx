import React, { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getStoredUtmParams } from "@/lib/utm-tracker";

export function PricingInquiryForm() {
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadRef, setLeadRef] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !workEmail.trim() || !phone.trim()) {
      setError("Please provide your name, email, and phone number.");
      return;
    }

    setLoading(true);
    setError(null);

    const leadNumber = `PRC-${Date.now().toString().slice(-6)}`;
    const utm = getStoredUtmParams();

    const clientPayload = {
      action: "contact_lead",
      event: "pricing_inquiry",
      type: "pricing_inquiry",
      leadNumber,
      lead_number: leadNumber,
      name: fullName.trim(),
      email: workEmail.trim(),
      phone: phone.trim(),
      role: "Pricing Prospect",
      organization: "Pricing Visitor",
      sports: "General Athletics",
      requirement: "Pricing Inquiry / Quote Request",
      message: `Pricing inquiry contact request from ${fullName.trim()} (${phone.trim()}).`,
      hasPhone: true,
      hasAdditionalDetails: false,
      page: "/pricing",
      visitorId: "pricing-visitor",
      sessionId: "pricing-session",
      source: utm.utmSource || "pricing_page",
      utmSource: utm.utmSource || "pricing_page",
      utm_source: utm.utmSource || "pricing_page",
      utmMedium: utm.utmMedium || "web_pricing",
      utm_medium: utm.utmMedium || "web_pricing",
      utmCampaign: utm.utmCampaign || "pricing_inquiry",
      utm_campaign: utm.utmCampaign || "pricing_inquiry",
      landingPage: utm.landingPage || "/pricing",
      timestamp: new Date().toISOString(),
    };

    // 1. Direct Ping to Google Apps Script / Google Sheets
    const analyticsUrl = import.meta.env["VITE_ANALYTICS_URL"] as string | undefined;
    if (analyticsUrl) {
      try {
        fetch(analyticsUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify(clientPayload),
          keepalive: true,
        }).catch(() => {});
      } catch {
        // silent fallback
      }
    }

    // 2. Server workflow endpoint (Airtable + Jira KAN issue + Resend admin notification email)
    try {
      const serverPayload = {
        leadNumber,
        fullName: fullName.trim(),
        workEmail: workEmail.trim(),
        roleTitle: "Pricing Prospect",
        organization: "Pricing Visitor",
        sports: ["Multi-Sport / Platform Tier"],
        requirement: "Pricing Inquiry / Quote Request",
        phone: phone.trim(),
        additionalDetails: `Contact request from Pricing Page: Phone: ${phone.trim()}`,
        page: "/pricing",
        source: "Pricing Page Quick Form",
        utmSource: utm.utmSource || "pricing_page",
        utmMedium: utm.utmMedium || "web_pricing",
        utmCampaign: utm.utmCampaign || "pricing_inquiry",
        landingPage: utm.landingPage || "/pricing",
      };

      const res = await fetch("/api/contact/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serverPayload),
      });

      if (!res.ok) {
        console.warn("[Pricing Form] Server lead endpoint responded with status:", res.status);
      }
    } catch (err) {
      console.warn("[Pricing Form] Background server workflow warning:", err);
    }

    setLoading(false);
    setSubmitted(true);
    setLeadRef(leadNumber);
  }

  if (submitted) {
    return (
      <div className="surface-card p-6 md:p-8 rounded-2xl border border-primary/30 bg-primary/5 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="mt-3 text-lg md:text-xl font-bold text-foreground">Inquiry Received!</h3>
        <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
          Thank you, <strong className="text-foreground">{fullName}</strong>! We will reach out to you at{" "}
          <strong className="text-foreground">{phone}</strong> / <strong className="text-foreground">{workEmail}</strong> shortly.
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground">
          Reference ID: <span className="font-bold text-primary">{leadRef}</span>
        </div>
        <div className="mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setFullName("");
              setWorkEmail("");
              setPhone("");
            }}
          >
            Submit Another Inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="surface-card p-6 md:p-8 rounded-2xl border border-border bg-card shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-5 border-b border-border">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-primary">
            Instant Quote &amp; Callback
          </span>
          <h3 className="text-lg md:text-xl font-bold text-foreground mt-0.5">
            Quick Pricing Inquiry
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Leave your name, email, and phone number and our team will get in touch with you.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[11px] font-semibold text-primary self-start sm:self-center">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Quick Connect</span>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs font-medium text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1">
              <User className="h-3 w-3 text-muted-foreground" />
              Full Name *
            </label>
            <Input
              required
              placeholder="e.g., Alex Jordan"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-background text-xs"
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1">
              <Mail className="h-3 w-3 text-muted-foreground" />
              Email Address *
            </label>
            <Input
              required
              type="email"
              placeholder="alex@example.com"
              value={workEmail}
              onChange={(e) => setWorkEmail(e.target.value)}
              className="bg-background text-xs"
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1">
              <Phone className="h-3 w-3 text-muted-foreground" />
              Phone Number *
            </label>
            <Input
              required
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-background text-xs"
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <span className="text-[11px] text-muted-foreground">
            🔒 Automatically saved to Google Sheets, Jira &amp; CRM.
          </span>

          <Button type="submit" disabled={loading} className="font-bold sm:w-auto w-full">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-1.5" />
                Get Instant Quote
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
