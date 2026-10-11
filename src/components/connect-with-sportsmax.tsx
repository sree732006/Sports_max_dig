import React, { FormEvent, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useLocation } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  HelpCircle,
  Loader2,
  Mail,
  MessageCircle,
  MessageSquare,
  Navigation,
  Phone,
  Send,
  Sparkles,
  Trophy,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Constants & Types ─────────────────────────────────────────────────────────

export const SPORT_OPTIONS = [
  "Football",
  "Cricket",
  "Basketball",
  "Tennis",
  "Hockey",
  "Athletics",
  "Volleyball",
  "Other",
] as const;

export const REQUIREMENT_OPTIONS = [
  "Athlete Performance Analytics",
  "Team Analytics",
  "Tactical Analysis",
  "Sports Intelligence",
  "Performance Tracking",
  "Demo / Product Information",
  "Partnership",
  "Other",
] as const;

interface FormValues {
  fullName: string;
  workEmail: string;
  roleTitle: string;
  organization: string;
  sports: string[];
  requirement: string;
  phone: string;
  additionalDetails: string;
}

interface FormErrors {
  fullName?: string | undefined;
  workEmail?: string | undefined;
  roleTitle?: string | undefined;
  organization?: string | undefined;
  sports?: string | undefined;
  requirement?: string | undefined;
  phone?: string | undefined;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let vId = localStorage.getItem("smx_visitorId");
  if (!vId) {
    vId = "v_" + Math.random().toString(36).substring(2, 9);
    localStorage.setItem("smx_visitorId", vId);
  }
  return vId;
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sId = sessionStorage.getItem("smx_sessionId");
  if (!sId) {
    sId = "s_" + Math.random().toString(36).substring(2, 9);
    sessionStorage.setItem("smx_sessionId", sId);
  }
  return sId;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function sanitize(val: string): string {
  return val.trim().replace(/[\x00-\x1F\x7F]/g, "");
}

// ─── Analytics Tracker (Reuses existing GAS endpoint) ──────────────────────────

function trackAnalytics(
  eventName: string,
  data: Record<string, unknown>,
  page: string,
  visitorId: string,
  sessionId: string,
) {
  const analyticsUrl = import.meta.env["VITE_ANALYTICS_URL"] as string | undefined;

  // Safe debug log (NO personal data)
  console.log(`[SportsMax Analytics] ${eventName}`, {
    event: eventName,
    page,
    ...data,
  });

  if (!analyticsUrl) return;

  const payload = {
    event: eventName,
    ...data,
    page,
    path: page,
    visitorId,
    sessionId,
    timestamp: new Date().toISOString(),
  };

  const body = JSON.stringify(payload);

  const sent =
    typeof navigator !== "undefined" &&
    typeof navigator.sendBeacon === "function" &&
    navigator.sendBeacon(
      analyticsUrl,
      new Blob([body], { type: "text/plain;charset=UTF-8" }),
    );

  if (!sent) {
    fetch(analyticsUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body,
      keepalive: true,
    }).catch(() => {});
  }
}

// ─── Lead Submission via EmailJS ─────────────────────────────────────────────

async function submitContactLead(
  values: FormValues,
  page: string,
  visitorId: string,
  sessionId: string,
): Promise<void> {
  const adminEmail =
    (import.meta.env["VITE_ADMIN_EMAIL"] as string | undefined) ||
    "admin@sportsmax.ai";

  const serviceId = import.meta.env["VITE_EMAILJS_SERVICE_ID"] as string | undefined;
  const templateId = import.meta.env["VITE_EMAILJS_TEMPLATE_ID"] as string | undefined;
  const publicKey = import.meta.env["VITE_EMAILJS_PUBLIC_KEY"] as string | undefined;

  const detailsParts = [
    `Sport(s): ${values.sports.join(", ")}`,
    `Requirement: ${values.requirement}`,
  ];
  if (values.additionalDetails.trim()) {
    detailsParts.push(`Additional Details: ${sanitize(values.additionalDetails)}`);
  }
  if (values.phone.trim()) {
    detailsParts.push(`Phone: ${sanitize(values.phone)}`);
  }

  const leadNumber = `LD-${Date.now().toString().slice(-6)}`;
  const analyticsUrl = import.meta.env["VITE_ANALYTICS_URL"] as string | undefined;

  // 1. Google Sheets / Apps Script Ingestion
  if (analyticsUrl) {
    const hasPhone = Boolean(values.phone.trim());
    const hasAdditionalDetails = Boolean(values.additionalDetails.trim());

    const payload = {
      action: "contact_lead",
      event: "contact_lead",
      type: "contact_lead",
      leadNumber,
      lead_number: leadNumber,
      name: sanitize(values.fullName),
      email: sanitize(values.workEmail),
      role: sanitize(values.roleTitle),
      organization: sanitize(values.organization),
      details: detailsParts.join(" | "),
      sport: sanitize(values.sports.join(", ")),
      sports: sanitize(values.sports.join(", ")),
      requirement: sanitize(values.requirement),
      phone: hasPhone ? sanitize(values.phone) : "Not provided",
      message: hasAdditionalDetails ? sanitize(values.additionalDetails) : "None",
      hasPhone,
      hasAdditionalDetails,
      page,
      visitorId,
      sessionId,
      timestamp: new Date().toISOString(),
    };

    console.log("[SportsMax Contact] Dispatching lead to Apps Script (Lead: " + leadNumber + ")");

    try {
      await fetch(analyticsUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      console.log("[SportsMax Contact] Lead transmission dispatched successfully to Apps Script.");
    } catch (err) {
      console.warn("[SportsMax Analytics] Failed to send contact lead to Apps Script:", err);
    }
  }

  // 2. Email Notification via EmailJS (if configured)
  if (serviceId && templateId && publicKey) {
    const templateParams = {
      to_email: adminEmail,
      lead_number: leadNumber,
      from_name: sanitize(values.fullName),
      from_email: sanitize(values.workEmail),
      role: sanitize(values.roleTitle),
      organization: sanitize(values.organization),
      sports: values.sports.join(", "),
      requirement: sanitize(values.requirement),
      phone: values.phone.trim() ? sanitize(values.phone) : "Not provided",
      additional_details: values.additionalDetails.trim()
        ? sanitize(values.additionalDetails)
        : "None",
      page,
      submitted_at: new Date().toLocaleString(),
      visitor_id: visitorId,
      session_id: sessionId,
      summary: detailsParts.join(" | "),
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, { publicKey });
    } catch (err) {
      console.warn("[SportsMax Contact] EmailJS dispatch failed:", err);
    }
  }
}

// ─── Interactive Assistant Chat Component (Right Column) ──────────────────────

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  link?: { href: string; label: string } | undefined;
}

const QUICK_PROMPTS = [
  {
    q: "What sports are supported?",
    a: "SportsMax currently delivers high-precision telemetry, GPS kinematic models, and video tactical analytics for 24+ individual and team disciplines including Football, Athletics, Swimming, Basketball, Cricket, and Rugby.",
    link: { href: "/sports", label: "Browse 24+ Sports Directory" },
  },
  {
    q: "How does tactical pitch analysis work?",
    a: "Our optical computer-vision models automatically track player formations, spacing density, sprint corridors, and heatmaps from standard tactical camera feeds in sub-50ms.",
    link: { href: "/sports/game-analysis", label: "Open Game Analysis Suite" },
  },
  {
    q: "Can coaches manage acute workload?",
    a: "Yes! SportsMax automatically compiles Acute:Chronic Workload Ratio (ACWR), heart rate zones, and session RPE to flag injury risks before matches.",
    link: { href: "/run-analytics", label: "View Analytics Workload" },
  },
  {
    q: "Can I request custom enterprise API access?",
    a: "Absolutely. Fill out the 'Connect with SportsMax' form on the left with 'Partnership' or 'Demo' selected, and our solutions engineers will set up sandbox access.",
  },
];

export function SportsMaxAssistantPanel() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m_welcome",
      sender: "bot",
      text: "👋 Welcome to SportsMax! I'm your AI sports performance & analytics copilot. How can I help you accelerate athlete telemetry or team tactical intelligence?",
      time: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const visitorId = useRef(getVisitorId());
  const sessionId = useRef(getSessionId());

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  function handleSend(userQuestion: string) {
    if (!userQuestion.trim()) return;

    const trimmed = userQuestion.trim();
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Append user question
    const userMsg: ChatMessage = {
      id: "u_" + Date.now(),
      sender: "user",
      text: trimmed,
      time: now,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    trackAnalytics(
      "assistant_question_asked",
      { question: trimmed },
      currentPath,
      visitorId.current,
      sessionId.current,
    );

    // Simulate intelligent bot reply
    setTimeout(() => {
      let botResponse =
        "Thanks for asking! Our performance intelligence platform connects wearable GPS sensors, biomechanical tracking, and tactical video. If you'd like a live demo or technical consultation, fill out the form right here on the left!";
      let botLink: { href: string; label: string } | undefined = undefined;

      // Matching quick responses
      const match = QUICK_PROMPTS.find(
        (p) =>
          p.q.toLowerCase() === trimmed.toLowerCase() ||
          trimmed.toLowerCase().includes(p.q.toLowerCase().slice(0, 15)),
      );

      if (match) {
        botResponse = match.a;
        botLink = match.link;
      } else if (/demo|pricing|cost|enterprise/i.test(trimmed)) {
        botResponse =
          "We offer tailored tiers for individual coaches, university institutes, and professional sports franchises. Please submit your requirement using the form on the left!";
        botLink = { href: "/pricing", label: "View Pricing Overview" };
      } else if (/sensor|wearable|garmin|gps/i.test(trimmed)) {
        botResponse =
          "SportsMax connects with Catapult, Polar, Garmin, and optical tracking cameras via open REST APIs and WebSockets.";
        botLink = { href: "/platform", label: "Read Platform Architecture" };
      }

      setMessages((prev) => [
        ...prev,
        {
          id: "b_" + Date.now(),
          sender: "bot",
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          link: botLink,
        },
      ]);
      setIsTyping(false);
    }, 600);
  }

  return (
    <div
      id="sportsmax-assistant-panel"
      className="flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-900/95 shadow-xl overflow-hidden text-slate-100"
    >
      {/* Assistant Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shadow-inner">
            <Bot className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-base font-bold text-white tracking-tight">
                SportsMax Assistant
              </h3>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                AI Copilot
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive sports analytics & platform assistant
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Online
        </div>
      </div>

      {/* Chat Messages Feed */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 min-h-[320px] max-h-[460px] bg-slate-950/60"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                m.sender === "user"
                  ? "bg-emerald-500 text-slate-950 font-medium rounded-br-xs shadow-md shadow-emerald-500/20"
                  : "bg-slate-800/90 border border-slate-700/70 text-slate-200 rounded-bl-xs shadow-sm"
              }`}
            >
              <p>{m.text}</p>
              {m.link && (
                <a
                  href={m.link.href}
                  className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 underline"
                >
                  {m.link.label} <ArrowRight className="h-3 w-3" />
                </a>
              )}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/60 text-slate-400 px-3.5 py-2 rounded-2xl w-fit text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
            <span className="ml-1 text-[11px]">SportsMax AI is thinking…</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-3 bg-slate-900 border-t border-slate-800/80">
        <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> Suggested queries:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt.q}
              type="button"
              onClick={() => handleSend(prompt.q)}
              className="rounded-lg bg-slate-800/80 hover:bg-slate-750 border border-slate-700/80 px-2.5 py-1 text-[11px] text-slate-300 hover:text-white transition-colors"
            >
              {prompt.q}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputText);
        }}
        className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask SportsMax Assistant a question…"
          className="flex-1 rounded-xl bg-slate-950 border border-slate-700 px-3.5 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

// ─── Lead Capture Form Component (Left Column) ────────────────────────────────

export function ConnectWithSportsMaxForm({
  onClose,
}: {
  onClose?: () => void;
} = {}) {
  const location = useLocation();
  const currentPath = location.pathname;

  const [values, setValues] = useState<FormValues>({
    fullName: "",
    workEmail: "",
    roleTitle: "",
    organization: "",
    sports: [],
    requirement: "",
    phone: "",
    additionalDetails: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const visitorId = useRef(getVisitorId());
  const sessionId = useRef(getSessionId());

  // Trigger contact_form_viewed on mount
  useEffect(() => {
    trackAnalytics(
      "contact_form_viewed",
      { form: "connect_with_sportsmax", path: currentPath },
      currentPath,
      visitorId.current,
      sessionId.current,
    );
  }, [currentPath]);

  function validate(): FormErrors {
    const errs: FormErrors = {};

    if (!values.fullName.trim()) {
      errs.fullName = "Full Name is required.";
    } else if (values.fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name.";
    }

    if (!values.workEmail.trim()) {
      errs.workEmail = "Work Email is required.";
    } else if (!isValidEmail(values.workEmail)) {
      errs.workEmail = "Please enter a valid work email address.";
    }

    if (!values.roleTitle.trim()) {
      errs.roleTitle = "Role / Title is required.";
    }

    if (!values.organization.trim()) {
      errs.organization = "Organization / Team is required.";
    }

    if (values.sports.length === 0) {
      errs.sports = "Please select at least one sport.";
    }

    if (!values.requirement.trim()) {
      errs.requirement = "Please select what you are looking for.";
    }

    if (
      values.phone.trim() &&
      !/^[\d\s+\-().]{7,20}$/.test(values.phone.trim())
    ) {
      errs.phone = "Please enter a valid phone number.";
    }

    return errs;
  }

  function toggleSport(sport: string) {
    setValues((prev) => {
      const exists = prev.sports.includes(sport);
      const updated = exists
        ? prev.sports.filter((s) => s !== sport)
        : [...prev.sports, sport];
      return { ...prev, sports: updated };
    });
    if (errors.sports) {
      setErrors((prev) => ({ ...prev, sports: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (isSubmitting || hasSubmitted) return;

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitContactLead(
        values,
        currentPath,
        visitorId.current,
        sessionId.current,
      );

      setHasSubmitted(true);
      setIsSuccess(true);

      trackAnalytics(
        "contact_form_submitted",
        {
          form: "connect_with_sportsmax",
          sportsCount: values.sports.length,
          requirement: values.requirement,
        },
        currentPath,
        visitorId.current,
        sessionId.current,
      );
    } catch {
      setSubmitError(
        "Unable to send your request at this time. Please retry or contact us directly.",
      );
      trackAnalytics(
        "contact_form_submission_failed",
        { form: "connect_with_sportsmax" },
        currentPath,
        visitorId.current,
        sessionId.current,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setValues({
      fullName: "",
      workEmail: "",
      roleTitle: "",
      organization: "",
      sports: [],
      requirement: "",
      phone: "",
      additionalDetails: "",
    });
    setErrors({});
    setIsSuccess(false);
    setHasSubmitted(false);
    setSubmitError(null);
  }

  const adminEmail =
    (import.meta.env["VITE_ADMIN_EMAIL"] as string | undefined) ||
    "admin@sportsmax.ai";

  if (isSuccess) {
    const mailtoSubject = encodeURIComponent(
      `[SportsMax Lead] Inquiry from ${values.fullName} (${values.organization})`,
    );
    const mailtoBody = encodeURIComponent(
      `SportsMax Analytics Lead Details:\n\n` +
        `Full Name: ${values.fullName}\n` +
        `Work Email: ${values.workEmail}\n` +
        `Role / Title: ${values.roleTitle}\n` +
        `Organization: ${values.organization}\n` +
        `Sport(s): ${values.sports.join(", ")}\n` +
        `Requirement: ${values.requirement}\n` +
        (values.phone ? `Phone: ${values.phone}\n` : "") +
        (values.additionalDetails
          ? `Additional Details: ${values.additionalDetails}\n`
          : "") +
        `\nTimestamp: ${new Date().toLocaleString()}`,
    );
    const mailtoUrl = `mailto:${adminEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    return (
      <div className="rounded-2xl border border-emerald-500/40 bg-slate-900/95 p-6 sm:p-9 text-center flex flex-col items-center justify-center gap-5 text-slate-100 shadow-2xl">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <div className="max-w-md">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-0.5 text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2">
            <Mail className="h-3 w-3" /> Dispatched to Admin
          </div>
          <h3 className="font-display text-2xl font-bold text-white">
            Lead Recorded & Admin Alerted!
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Thank you, <strong className="text-white">{values.fullName}</strong>. Your sports analytics
            inquiry has been collected and dispatched to the administrator at{" "}
            <span className="text-emerald-400 font-mono font-semibold">{adminEmail}</span>.
          </p>
        </div>

        {/* Lead summary breakdown */}
        <div className="w-full max-w-md rounded-xl bg-slate-950/80 border border-slate-800 p-4 text-left text-xs space-y-1.5 text-slate-300">
          <div className="flex justify-between border-b border-slate-800 pb-1.5 font-semibold text-white">
            <span>Organization:</span>
            <span className="text-emerald-400">{values.organization}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Role:</span>
            <span>{values.roleTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Sport(s):</span>
            <span className="text-right">{values.sports.join(", ")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Requirement:</span>
            <span className="text-right">{values.requirement}</span>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap gap-2.5 justify-center">
          <a
            href={mailtoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 px-4 py-2.5 text-xs font-semibold transition inline-flex items-center gap-1.5"
          >
            <Mail className="h-3.5 w-3.5" />
            Open Mail Client Copy
          </a>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
          >
            Submit Another
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold px-4 py-2.5 text-xs transition"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form
      id="connect-with-sportsmax-form"
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-xl text-slate-100 flex flex-col gap-5"
    >
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="rounded-md bg-emerald-500/20 border border-emerald-500/30 p-1 text-emerald-400">
            <Activity className="h-4 w-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Direct Inquiry
          </span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Connect with SportsMax
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Tell us about your sports analytics needs and our team will get in touch.
        </p>
      </div>

      {/* Row 1: Full Name & Work Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="smx-full-name"
            className="block text-xs font-semibold text-slate-200 mb-1.5"
          >
            Full Name <span className="text-emerald-400">*</span>
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              id="smx-full-name"
              type="text"
              placeholder="e.g. Elena Rostova"
              value={values.fullName}
              onChange={(e) =>
                setValues((v) => ({ ...v, fullName: e.target.value }))
              }
              className={`w-full rounded-xl bg-slate-950/90 border ${
                errors.fullName
                  ? "border-red-500 focus:border-red-400 focus:ring-red-400/20"
                  : "border-slate-700/80 focus:border-emerald-400 focus:ring-emerald-400/20"
              } pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2`}
              required
            />
          </div>
          {errors.fullName && (
            <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="smx-work-email"
            className="block text-xs font-semibold text-slate-200 mb-1.5"
          >
            Work Email <span className="text-emerald-400">*</span>
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              id="smx-work-email"
              type="email"
              placeholder="coach@club.org"
              value={values.workEmail}
              onChange={(e) =>
                setValues((v) => ({ ...v, workEmail: e.target.value }))
              }
              className={`w-full rounded-xl bg-slate-950/90 border ${
                errors.workEmail
                  ? "border-red-500 focus:border-red-400 focus:ring-red-400/20"
                  : "border-slate-700/80 focus:border-emerald-400 focus:ring-emerald-400/20"
              } pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2`}
              required
            />
          </div>
          {errors.workEmail && (
            <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.workEmail}</p>
          )}
        </div>
      </div>

      {/* Row 2: Role / Title & Organization / Team */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="smx-role-title"
            className="block text-xs font-semibold text-slate-200 mb-1.5"
          >
            Role / Title <span className="text-emerald-400">*</span>
          </label>
          <input
            id="smx-role-title"
            type="text"
            placeholder="Head Coach, Sports Scientist, Director…"
            value={values.roleTitle}
            onChange={(e) =>
              setValues((v) => ({ ...v, roleTitle: e.target.value }))
            }
            className={`w-full rounded-xl bg-slate-950/90 border ${
              errors.roleTitle
                ? "border-red-500 focus:border-red-400 focus:ring-red-400/20"
                : "border-slate-700/80 focus:border-emerald-400 focus:ring-emerald-400/20"
            } px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2`}
            required
          />
          {errors.roleTitle && (
            <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.roleTitle}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="smx-organization"
            className="block text-xs font-semibold text-slate-200 mb-1.5"
          >
            Organization / Team <span className="text-emerald-400">*</span>
          </label>
          <div className="relative">
            <Building2 className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              id="smx-organization"
              type="text"
              placeholder="e.g. Manchester City FC, British Athletics…"
              value={values.organization}
              onChange={(e) =>
                setValues((v) => ({ ...v, organization: e.target.value }))
              }
              className={`w-full rounded-xl bg-slate-950/90 border ${
                errors.organization
                  ? "border-red-500 focus:border-red-400 focus:ring-red-400/20"
                  : "border-slate-700/80 focus:border-emerald-400 focus:ring-emerald-400/20"
              } pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2`}
              required
            />
          </div>
          {errors.organization && (
            <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.organization}</p>
          )}
        </div>
      </div>

      {/* Sport / Sports Interested In (Multi-select Pills) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold text-slate-200">
            Sport / Sports Interested In <span className="text-emerald-400">*</span>
          </label>
          <span className="text-[11px] text-slate-400">(Select all that apply)</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {SPORT_OPTIONS.map((sport) => {
            const isSelected = values.sports.includes(sport);
            return (
              <button
                key={sport}
                type="button"
                onClick={() => toggleSport(sport)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 border ${
                  isSelected
                    ? "bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "bg-slate-950/90 border-slate-700/80 text-slate-300 hover:border-emerald-500/50 hover:text-white"
                }`}
              >
                {sport}
              </button>
            );
          })}
        </div>
        {errors.sports && (
          <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.sports}</p>
        )}
      </div>

      {/* Requirement / What are you looking for? */}
      <div>
        <label
          htmlFor="smx-requirement"
          className="block text-xs font-semibold text-slate-200 mb-1.5"
        >
          What are you looking for? <span className="text-emerald-400">*</span>
        </label>
        <div className="relative">
          <select
            id="smx-requirement"
            value={values.requirement}
            onChange={(e) =>
              setValues((v) => ({ ...v, requirement: e.target.value }))
            }
            className={`w-full appearance-none rounded-xl bg-slate-950/90 border ${
              errors.requirement
                ? "border-red-500 focus:border-red-400 focus:ring-red-400/20"
                : "border-slate-700/80 focus:border-emerald-400 focus:ring-emerald-400/20"
            } px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2`}
            required
          >
            <option value="" disabled className="text-slate-500">
              Select your primary analytics requirement…
            </option>
            {REQUIREMENT_OPTIONS.map((req) => (
              <option key={req} value={req} className="bg-slate-900 text-white">
                {req}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>
        {errors.requirement && (
          <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.requirement}</p>
        )}
      </div>

      {/* Optional: Phone Number */}
      <div>
        <label
          htmlFor="smx-phone"
          className="block text-xs font-semibold text-slate-200 mb-1.5"
        >
          Phone Number <span className="text-slate-500 font-normal">(Optional)</span>
        </label>
        <div className="relative">
          <Phone className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            id="smx-phone"
            type="tel"
            placeholder="+1 (555) 234-5678"
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            className={`w-full rounded-xl bg-slate-950/90 border ${
              errors.phone
                ? "border-red-500 focus:border-red-400 focus:ring-red-400/20"
                : "border-slate-700/80 focus:border-emerald-400 focus:ring-emerald-400/20"
            } pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2`}
          />
        </div>
        {errors.phone && (
          <p className="mt-1.5 text-xs text-red-400 font-medium">{errors.phone}</p>
        )}
      </div>

      {/* Optional: Additional Details */}
      <div>
        <label
          htmlFor="smx-additional-details"
          className="block text-xs font-semibold text-slate-200 mb-1.5"
        >
          Additional Details <span className="text-slate-500 font-normal">(Optional)</span>
        </label>
        <textarea
          id="smx-additional-details"
          rows={3}
          placeholder="Squad size, current wearable sensors (e.g. Catapult, Polar), specific competition level, or deployment timeline…"
          value={values.additionalDetails}
          onChange={(e) =>
            setValues((v) => ({ ...v, additionalDetails: e.target.value }))
          }
          className="w-full rounded-xl bg-slate-950/90 border border-slate-700/80 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 resize-y"
        />
      </div>

      {/* Error banner */}
      {submitError && (
        <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-3 text-xs text-red-300">
          {submitError}
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
        <p className="text-[11px] text-slate-400 leading-relaxed text-center sm:text-left">
          <span className="text-emerald-400 font-semibold">Admin Alert:</span> Form details are securely recorded and emailed directly to the SportsMax administrator ({adminEmail}).
        </p>

        <button
          type="submit"
          id="connect-with-sportsmax-btn"
          disabled={isSubmitting || hasSubmitted}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold px-7 py-3 text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
              Connecting…
            </>
          ) : (
            <>
              Connect with SportsMax
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// ─── Main Section Component: Side-by-Side Desktop / Stacked Mobile ─────────────

export function ConnectWithSportsMax() {
  return (
    <section
      id="connect-with-sportsmax"
      className="relative overflow-hidden py-16 sm:py-24 bg-slate-950 text-white border-t border-slate-800"
    >
      {/* Background aesthetics: sport-grid & radial ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.06)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 sport-grid opacity-15 pointer-events-none" />

      <div className="content-wrap relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" /> Intelligence Hub Engagement
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Connect with SportsMax & Explore Assistant
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Discuss athlete kinematic telemetry, workload analytics, and tactical computer-vision models
            with our team, or ask our interactive Assistant for immediate system guidance.
          </p>
        </div>

        {/* Desktop Side-by-Side (7 cols Form, 5 cols Assistant) / Mobile Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Connect with SportsMax Form */}
          <div className="lg:col-span-7">
            <ConnectWithSportsMaxForm />
          </div>

          {/* Right: SportsMax Assistant Chatbot Panel */}
          <div className="lg:col-span-5 flex flex-col">
            <SportsMaxAssistantPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
