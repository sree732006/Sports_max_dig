import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/sports-ui";
import { CustomerJourneyMap } from "@/components/customer-journey-map";

export const Route = createFileRoute("/customer-journey")({
  head: () => ({
    meta: [
      { title: "Customer Journey & Funnel Map — SportsMax" },
      {
        name: "description",
        content:
          "End-to-end customer journey lifecycle mapping for elite sports clubs, NCAA programs, national Olympic federations, and schools.",
      },
      { property: "og:title", content: "Customer Journey — SportsMax" },
      {
        property: "og:description",
        content: "Interactive customer lifecycle and conversion funnel mapping.",
      },
    ],
    links: [{ rel: "canonical", href: "/customer-journey" }],
  }),
  component: CustomerJourneyPage,
});

function CustomerJourneyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Commercial & Telemetry Lifecycle"
        title="SportsMax Customer Journey."
        text="Follow the 6-stage lifecycle from initial awareness and SPICED segment evaluation to technical PWA trial, enterprise activation, and long-term Olympic impact."
      />
      <section className="py-10">
        <div className="content-wrap max-w-5xl">
          <CustomerJourneyMap />
        </div>
      </section>
    </>
  );
}
