import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoBadge, PageIntro, SectionHead } from "@/components/sports-ui";
import { AuthDialog } from "@/components/site-shell";
import { PricingInquiryForm } from "@/components/pricing-inquiry-form";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing & Plans — SportsMax" },
      {
        name: "description",
        content:
          "Transparent pricing for individual athletes, coaching staffs, sports teams, and enterprise leagues. Start with a 14-day free trial.",
      },
    ],
  }),
  component: PricingPage,
});

export function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("annual");

  return (
    <>
      <PageIntro
        eyebrow="Pricing Plans"
        title="Predictable Investment for Proven Performance"
        text="Choose the plan that fits your athletic ambitions. From dedicated individual runners to collegiate athletic departments and professional sports franchises."
        action={
          <div className="flex flex-col items-end gap-3">
            <DemoBadge />
            <div className="inline-flex rounded-lg border border-border bg-secondary p-1">
              <button
                type="button"
                onClick={() => setBillingPeriod("monthly")}
                className={`rounded px-3 py-1.5 text-xs font-bold transition ${
                  billingPeriod === "monthly" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingPeriod("annual")}
                className={`rounded px-3 py-1.5 text-xs font-bold transition ${
                  billingPeriod === "annual" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>
        }
      />

      <section className="py-12 bg-background">
        <div className="content-wrap">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Plan 1: Individual */}
            <div className="surface-card p-8 flex flex-col justify-between border hover:border-primary/40 transition">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Individual Plan</span>
                <h3 className="text-2xl font-bold mt-1 text-foreground">Athlete Pro</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  For competitive runners, swimmers, and individual athletes seeking deep biometric precision.
                </p>

                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-foreground">
                    {billingPeriod === "annual" ? "$19" : "$24"}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">/ month</span>
                </div>

                <ul className="mt-6 grid gap-2.5 text-xs text-foreground font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Unlimited wearable data sync (Garmin, Polar, Apple)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Full SWOLF, cadence & cardiac drift modeling</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Automated AI training recommendations</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Verified personal best logging</li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <AuthDialog>
                  <Button variant="outline" className="w-full font-bold">
                    Start 14-Day Free Trial
                  </Button>
                </AuthDialog>
              </div>
            </div>

            {/* Plan 2: Coach / Team */}
            <div className="surface-card p-8 flex flex-col justify-between border-2 border-primary relative shadow-lg">
              <div className="absolute -top-3.5 right-6 rounded-full bg-primary text-primary-foreground px-3 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-sm">
                Most Popular
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Team Plan</span>
                <h3 className="text-2xl font-bold mt-1 text-foreground">Coach & Squad</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  For coaching staffs, high school/collegiate teams, and athletic clubs up to 35 athletes.
                </p>

                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-foreground">
                    {billingPeriod === "annual" ? "$99" : "$129"}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">/ month</span>
                </div>

                <ul className="mt-6 grid gap-2.5 text-xs text-foreground font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Up to 35 athlete profiles included</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Acute-to-Chronic Workload Ratio (ACWR) governance</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Proactive soft-tissue injury risk alerts</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Squad comparison radar charts & reports</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Multi-coach role permission controls</li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <AuthDialog>
                  <Button className="w-full font-bold shadow-md">
                    Start 14-Day Free Trial &rarr;
                  </Button>
                </AuthDialog>
              </div>
            </div>

            {/* Plan 3: Enterprise */}
            <div className="surface-card p-8 flex flex-col justify-between border hover:border-primary/40 transition">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Enterprise Plan</span>
                <h3 className="text-2xl font-bold mt-1 text-foreground">Franchise & League</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  For professional sports clubs, national federations, stadium tracking, and broadcast data providers.
                </p>

                <div className="mt-6">
                  <span className="text-4xl font-extrabold text-foreground">Custom</span>
                  <span className="text-xs text-muted-foreground ml-1">enterprise tier</span>
                </div>

                <ul className="mt-6 grid gap-2.5 text-xs text-foreground font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Unlimited athlete & squad capacity</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> 120fps Optical Computer Vision pitch tracking</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Real-time sub-50ms WebSocket telemetry feeds</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Dedicated SportsMax sports scientist engineer</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0" /> Custom tactical algorithms & API access</li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <Button asChild variant="outline" className="w-full font-bold">
                  <Link to="/contact">Contact Enterprise Sales</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Interactive Enterprise ROI Calculator */}
          <div className="mt-16 surface-card p-8 border border-border/80">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6 mb-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Zap className="h-4 w-4" /> Sports Science ROI Calculator
                </span>
                <h3 className="text-2xl font-bold mt-1">Quantify Your Squad Injury Reduction &amp; Time Savings</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on validated clinical studies showing a 42% average reduction in preventable soft-tissue strain with SportsMax ACWR governance.
                </p>
              </div>
              <div className="rounded-xl bg-primary/10 border border-primary/30 px-4 py-3 text-right">
                <div className="text-[11px] font-mono text-muted-foreground uppercase">Estimated Annual Net Value</div>
                <div className="text-2xl font-black font-mono text-primary">$184,000+</div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-secondary/40 p-4 border border-border/50">
                <div className="text-xs font-bold uppercase text-muted-foreground">Squad Roster Size</div>
                <div className="text-3xl font-extrabold font-mono mt-1 text-foreground">30 Athletes</div>
                <p className="text-[11px] text-muted-foreground mt-2">Collegiate varsity or professional squad roster</p>
              </div>
              <div className="rounded-xl bg-secondary/40 p-4 border border-border/50">
                <div className="text-xs font-bold uppercase text-muted-foreground">Prevented Injury Days</div>
                <div className="text-3xl font-extrabold font-mono mt-1 text-emerald-500">84 Player-Days</div>
                <p className="text-[11px] text-muted-foreground mt-2">Saved per season via early kinematic fatigue alerts</p>
              </div>
              <div className="rounded-xl bg-secondary/40 p-4 border border-border/50">
                <div className="text-xs font-bold uppercase text-muted-foreground">Staff Video Tagging Hours</div>
                <div className="text-3xl font-extrabold font-mono mt-1 text-blue-500">620+ Hours</div>
                <p className="text-[11px] text-muted-foreground mt-2">Automated by SportsMax optical CV ingest</p>
              </div>
            </div>
          </div>

          {/* Detailed Feature Comparison Matrix */}
          <div className="mt-16 surface-card overflow-hidden border border-border/80">
            <div className="p-6 border-b border-border bg-secondary/30">
              <h3 className="text-xl font-bold">Comprehensive Tier Feature Matrix</h3>
              <p className="text-xs text-muted-foreground mt-1">Side-by-side engineering and sports science capabilities</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary/70 text-muted-foreground font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3.5">Capability / Specification</th>
                    <th className="px-6 py-3.5">Athlete Pro</th>
                    <th className="px-6 py-3.5">Coach &amp; Squad</th>
                    <th className="px-6 py-3.5">Franchise &amp; League</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-secondary/20 transition">
                    <td className="px-6 py-3 font-semibold text-foreground">Roster / Athlete Accounts</td>
                    <td className="px-6 py-3 text-muted-foreground">1 Athlete</td>
                    <td className="px-6 py-3 font-semibold text-primary">Up to 35 Athletes</td>
                    <td className="px-6 py-3 font-bold text-foreground">Unlimited Enterprise</td>
                  </tr>
                  <tr className="hover:bg-secondary/20 transition">
                    <td className="px-6 py-3 font-semibold text-foreground">Sensor Sampling Rate</td>
                    <td className="px-6 py-3 text-muted-foreground">60 Hz Wearables</td>
                    <td className="px-6 py-3 text-foreground">120 Hz IMU + Optical</td>
                    <td className="px-6 py-3 font-bold text-primary">240 Hz Sub-millimeter</td>
                  </tr>
                  <tr className="hover:bg-secondary/20 transition">
                    <td className="px-6 py-3 font-semibold text-foreground">Real-Time Pitch Voronoi Control</td>
                    <td className="px-6 py-3 text-muted-foreground">—</td>
                    <td className="px-6 py-3 text-foreground">Post-Match Render</td>
                    <td className="px-6 py-3 font-bold text-emerald-500">Live &lt; 38ms Edge CV</td>
                  </tr>
                  <tr className="hover:bg-secondary/20 transition">
                    <td className="px-6 py-3 font-semibold text-foreground">ACWR Load &amp; Fatigue Modeling</td>
                    <td className="px-6 py-3 text-foreground">Standard 28-day</td>
                    <td className="px-6 py-3 font-semibold text-primary">Custom EWMA Corridors</td>
                    <td className="px-6 py-3 font-bold text-primary">Multi-Year Macrocycle</td>
                  </tr>
                  <tr className="hover:bg-secondary/20 transition">
                    <td className="px-6 py-3 font-semibold text-foreground">Compliance &amp; Data Residency</td>
                    <td className="px-6 py-3 text-muted-foreground">Standard Cloud</td>
                    <td className="px-6 py-3 text-foreground">FERPA &amp; HIPAA</td>
                    <td className="px-6 py-3 font-bold text-foreground">WADA ADAMS + On-Prem Airgap</td>
                  </tr>
                  <tr className="hover:bg-secondary/20 transition">
                    <td className="px-6 py-3 font-semibold text-foreground">Dedicated Sports Scientist SLA</td>
                    <td className="px-6 py-3 text-muted-foreground">—</td>
                    <td className="px-6 py-3 text-muted-foreground">Email Support (24h)</td>
                    <td className="px-6 py-3 font-bold text-primary">Dedicated Lead Scientist (1h SLA)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Pricing Inquiry Form */}
          <div className="mt-16 max-w-4xl mx-auto">
            <PricingInquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
