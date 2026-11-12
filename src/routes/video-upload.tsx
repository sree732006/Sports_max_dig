import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/sports-ui";
import { PwaVideoUploadManager } from "@/components/pwa-video-upload-manager";

export const Route = createFileRoute("/video-upload")({
  head: () => ({
    meta: [
      { title: "PWA Mobile Video Upload & Biomechanics — SportsVectors" },
      {
        name: "description",
        content:
          "High-performance Progressive Web App (PWA) video capture and AI pose estimation upload for athletes and coaching staff.",
      },
      { property: "og:title", content: "PWA Mobile Video Upload — SportsVectors" },
      {
        property: "og:description",
        content: "Sensorless mobile video upload with instant kinematic pose analysis.",
      },
    ],
    links: [{ rel: "canonical", href: "/video-upload" }],
  }),
  component: VideoUploadPage,
});

function VideoUploadPage() {
  return (
    <>
      <PageIntro
        eyebrow="Progressive Web App (PWA) Intelligence"
        title="Mobile Video Upload & Biomechanics."
        text="Record training drills or match video directly with your smartphone camera for sensorless 60fps joint angles, ground contact time, and kinematic corridor analysis."
      />
      <section className="py-10">
        <div className="content-wrap max-w-5xl">
          <PwaVideoUploadManager />
        </div>
      </section>
    </>
  );
}

