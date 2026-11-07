import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/sports-ui";
import { SchoolUserConfigForm } from "@/components/school-user-config-form";

export const Route = createFileRoute("/schools-config")({
  head: () => ({
    meta: [
      { title: "Schools User Configuration — SportsMax PE Intelligence" },
      {
        name: "description",
        content:
          "Enterprise multi-tab configuration page for school boards, PE directors, youth cohorts, Khelo India fitness criteria, and automated report card dispatches.",
      },
      { property: "og:title", content: "Schools User Configuration — SportsMax" },
      {
        property: "og:description",
        content: "Multi-tab PE setup for academic institutions and youth sports programs.",
      },
    ],
    links: [{ rel: "canonical", href: "/schools-config" }],
  }),
  component: SchoolsConfigPage,
});

function SchoolsConfigPage() {
  return (
    <>
      <PageIntro
        eyebrow="Academic & Youth Sports Management"
        title="Schools User Configuration Page."
        text="Calibrate national physical education benchmarks, cohort age divisions, Khelo India criteria, and automated PE report cards."
      />
      <section className="py-10">
        <div className="content-wrap max-w-5xl">
          <SchoolUserConfigForm />
        </div>
      </section>
    </>
  );
}

