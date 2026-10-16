// ─────────────────────────────────────────────────────────────────────────────
// SportsMax Reusable Email Brand Module
// Provides branded header and footer HTML blocks for all email templates.
// All layout is ~600px, table-based, with fully inline CSS for Gmail + Outlook.
// ─────────────────────────────────────────────────────────────────────────────

/** Palette shared across all branded emails */
export const BRAND = {
  primary: "#2563eb",
  primaryDark: "#1d4ed8",
  emerald: "#059669",
  emeraldLight: "#d1fae5",
  darkBg: "#0a0f1e",
  cardBg: "#0f172a",
  border: "#1e293b",
  textLight: "#94a3b8",
  textMuted: "#64748b",
  white: "#ffffff",
  accentBlue: "#38bdf8",
} as const;

/** Navigation links verified against https://sports-max-dig.vercel.app */
const NAV_LINKS = [
  { label: "Home",     url: "https://sports-max-dig.vercel.app/" },
  { label: "Services", url: "https://sports-max-dig.vercel.app/#services" },
  { label: "Pricing",  url: "https://sports-max-dig.vercel.app/#pricing" },
  { label: "About",    url: "https://sports-max-dig.vercel.app/#about" },
  { label: "Contact",  url: "https://sports-max-dig.vercel.app/#contact" },
] as const;

const YEAR = new Date().getFullYear();

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL DOCTYPE WRAPPER
// ─────────────────────────────────────────────────────────────────────────────

export function emailDocOpen(title: string): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${escHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#090e1c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#090e1c;padding:24px 16px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background-color:#0f172a;border:1px solid #1e293b;border-radius:12px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.6);">`;
}

export function emailDocClose(): string {
  return `      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// HEADER — Branded gradient banner with SportsMax wordmark
// ─────────────────────────────────────────────────────────────────────────────

export interface HeaderOptions {
  /** Gradient style. Defaults to Royal Blue primary. */
  accent?: "blue" | "emerald" | "violet" | "slate";
  /** Small label above the headline (e.g. "ANALYTICS REPORT") */
  eyebrow?: string;
  /** Main headline text */
  headline: string;
  /** Optional sub-headline / date string below the headline */
  subline?: string;
  /** Badge text shown in top-right corner (e.g. "DAILY" / "NEW LEAD") */
  badge?: string;
}

const GRADIENT_MAP: Record<string, string> = {
  blue:    "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #0ea5e9 100%)",
  emerald: "linear-gradient(135deg, #047857 0%, #059669 50%, #0d9488 100%)",
  violet:  "linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #6366f1 100%)",
  slate:   "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
};

export function emailHeader(opts: HeaderOptions): string {
  const gradient = GRADIENT_MAP[opts.accent ?? "blue"];
  const eyebrow = opts.eyebrow
    ? `<div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.75);margin-bottom:6px;">${escHtml(opts.eyebrow)}</div>`
    : "";
  const subline = opts.subline
    ? `<div style="font-size:13px;color:rgba(255,255,255,0.65);margin-top:6px;line-height:1.4;">${escHtml(opts.subline)}</div>`
    : "";
  const badge = opts.badge
    ? `<span style="display:inline-block;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.3);border-radius:20px;padding:4px 12px;font-size:10px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#ffffff;">${escHtml(opts.badge)}</span>`
    : "";

  return `
        <tr><td>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="background:${gradient};padding:28px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="vertical-align:middle;">
                      <a href="https://sports-max-dig.vercel.app/" style="text-decoration:none;">
                        <span style="font-size:22px;font-weight:900;color:#ffffff;letter-spacing:-0.02em;">Sports<span style="color:rgba(255,255,255,0.5);">Max</span></span>
                        <span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.55);vertical-align:super;margin-left:3px;">Intelligence</span>
                      </a>
                    </td>
                    <td style="text-align:right;vertical-align:top;">${badge}</td>
                  </tr>
                </table>
                <div style="height:1px;background:rgba(255,255,255,0.15);margin:16px 0;"></div>
                ${eyebrow}
                <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;line-height:1.2;">${escHtml(opts.headline)}</h1>
                ${subline}
              </td>
            </tr>
          </table>
        </td></tr>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER — Dark branded footer with nav links, contact, and unsubscribe
// ─────────────────────────────────────────────────────────────────────────────

export interface FooterOptions {
  /** Show unsubscribe / marketing opt-out line (true for marketing emails) */
  showUnsubscribe?: boolean;
  /** Unsubscribe URL */
  unsubscribeUrl?: string;
  /** Extra disclaimer text */
  disclaimer?: string;
}

export function emailFooter(opts: FooterOptions = {}): string {
  const navLinksHtml = NAV_LINKS.map(
    (l) =>
      `<a href="${l.url}" style="color:#475569;text-decoration:none;font-size:12px;font-weight:500;white-space:nowrap;">${l.label}</a>`
  ).join(`<span style="color:#1e293b;margin:0 6px;">|</span>`);

  const unsubLine = opts.showUnsubscribe
    ? `<tr><td style="padding:0 32px 12px;text-align:center;">
        <p style="margin:0;font-size:11px;color:#475569;line-height:1.5;">
          You received this email because you contacted SportsMax or opted into updates.
          <a href="${opts.unsubscribeUrl || "https://sports-max-dig.vercel.app/#contact"}" style="color:#64748b;text-decoration:underline;">Unsubscribe</a> anytime.
        </p>
      </td></tr>`
    : "";

  const extraDisclaimer = opts.disclaimer
    ? `<tr><td style="padding:0 32px 16px;text-align:center;">
        <p style="margin:0;font-size:11px;color:#334155;line-height:1.5;">${escHtml(opts.disclaimer)}</p>
      </td></tr>`
    : "";

  return `
        <tr><td style="background-color:#07091a;border-top:1px solid #0d1225;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
            <tr><td style="padding:28px 32px 16px;text-align:center;">
              <a href="https://sports-max-dig.vercel.app/" style="text-decoration:none;">
                <span style="font-size:18px;font-weight:900;color:#ffffff;letter-spacing:-0.02em;">Sports<span style="color:#334155;">Max</span></span>
              </a>
              <p style="margin:8px 0 0;font-size:12px;color:#475569;line-height:1.5;">
                Sports Analytics &amp; Intelligence Platform<br>
                <a href="mailto:sportsmax@sports-max-dig.vercel.app" style="color:#334155;text-decoration:none;">sportsmax@sports-max-dig.vercel.app</a>
              </p>
            </td></tr>
            <tr><td style="padding:0 32px 16px;text-align:center;">${navLinksHtml}</td></tr>
            <tr><td style="padding:0 32px;"><div style="height:1px;background:#0d1425;"></div></td></tr>
            ${unsubLine}
            ${extraDisclaimer}
            <tr><td style="padding:16px 32px 24px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#1e293b;">
                &copy; ${YEAR} SportsMax &mdash; All rights reserved.
                &nbsp;&middot;&nbsp;
                <a href="https://sports-max-dig.vercel.app/#contact" style="color:#1e293b;text-decoration:none;">Privacy Policy</a>
              </p>
            </td></tr>
          </table>
        </td></tr>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Escape HTML special characters for safe embedding */
export function escHtml(str: string | undefined | null): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Wrap content in the standard padded body row.
 */
export function emailBody(innerHtml: string): string {
  return `<tr><td style="padding:32px;">${innerHtml}</td></tr>`;
}

/**
 * Render a simple info-row table (label : valueHtml pairs).
 */
export function emailInfoTable(rows: [string, string][]): string {
  const trs = rows
    .map(
      ([label, value]) => `
      <tr style="border-bottom:1px solid #1e293b;">
        <td style="padding:10px 0;color:#64748b;font-size:13px;font-weight:600;width:145px;vertical-align:top;">${escHtml(label)}</td>
        <td style="padding:10px 0;color:#f1f5f9;font-size:13px;line-height:1.5;">${value}</td>
      </tr>`
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">${trs}</table>`;
}

/**
 * Render a highlighted callout/alert box.
 */
export function emailCallout(
  label: string,
  body: string,
  color: "blue" | "emerald" | "amber" | "violet" = "blue"
): string {
  type PaletteEntry = { bg: string; border: string; labelColor: string };
  const palette: Record<"blue" | "emerald" | "amber" | "violet", PaletteEntry> = {
    blue:    { bg: "#0b1a2a", border: "#1e3a5f", labelColor: "#38bdf8" },
    emerald: { bg: "#052e16", border: "#064e3b", labelColor: "#34d399" },
    amber:   { bg: "#1c1202", border: "#451a03", labelColor: "#fbbf24" },
    violet:  { bg: "#150d2c", border: "#3b0764", labelColor: "#a78bfa" },
  };
  const p: PaletteEntry = palette[color];
  return `<div style="background:${p.bg};border:1px solid ${p.border};border-radius:8px;padding:14px 18px;margin:18px 0;">
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${p.labelColor};margin-bottom:6px;">${escHtml(label)}</div>
    <div style="font-size:13px;color:#cbd5e1;line-height:1.6;">${body}</div>
  </div>`;
}

/**
 * Render a full-width CTA button.
 */
export function emailButton(label: string, url: string, color: "blue" | "emerald" = "blue"): string {
  const bg = color === "emerald" ? "#059669" : "#2563eb";
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:24px 0;">
    <tr><td align="center">
      <a href="${url}" style="display:inline-block;background:${bg};color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:8px;letter-spacing:0.01em;">${escHtml(label)}</a>
    </td></tr>
  </table>`;
}
