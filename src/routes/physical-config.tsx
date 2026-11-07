import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/sports-ui";
import { PwaSportsBasicConfigPhysical } from "@/components/pwa-sports-basic-config-physical";

export const Route = createFileRoute("/physical-config")({
  head: () => ({
    meta: [
      { title: "PWA Athlete Basic Physical Configuration — SportsMax" },
      {
        name: "description",
        content:
          "Mobile PWA physical baseline calibration: anthropometrics, vertical jump power, sprint speeds, and injury surveillance.",
      },
      { property: "og:title", content: "PWA Physical Configuration — SportsMax" },
      {
        property: "og:description",
        content: "Calibrate athlete physical baselines for mobile PWA video intelligence.",
      },
    ],
    links: [{ rel: "canonical", href: "/physical-config" }],
  }),
  component: PhysicalConfigPage,
});

function PhysicalConfigPage() {
  return (
    <>
      <PageIntro
        eyebrow="Progressive Web App (PWA) Baseline"
        title="PWA Sports Basic Config Physical."
        text="Calibrate standing height, limb dominance, resting/max heart rate, sprint baselines, and injury risk guarding for sensorless video AI."
      />
      <section className="py-10">
        <div className="content-wrap max-w-5xl">
          <PwaSportsBasicConfigPhysical />
        </div>
      </section>
    </>
  );
}
