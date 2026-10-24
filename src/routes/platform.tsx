import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Database,
  FileBarChart2,
  Gauge,
  Globe,
  HeartPulse,
  Layers,
  Lock,
  Radio,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  Video,
  Workflow as WorkflowIcon,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoBadge, PageIntro, SectionHead, Workflow } from "@/components/sports-ui";
import clusterImage from "@/assets/ai_sports_cluster_1792572342884.jpg";
import arenaImage from "@/assets/sports_tactical_arena_1792572299956.jpg";
import labImage from "@/assets/athlete_biometrics_lab_1792572320926.jpg";
import swimImage from "@/assets/swimming_biomechanics_1792572365169.jpg";
import pipelineImage from "@/assets/platform_pipeline_architecture_1792587658686.jpg";
import securityImage from "@/assets/platform_security_compliance_1792587680531.jpg";

export const Route = createFileRoute("/platform")({
  validateSearch: (search: Record<string, unknown>): { tab?: PlatformTab } => {
    const validTabs: PlatformTab[] = ["overview", "how-it-works", "technology", "integrations", "security"];
    const rawTab = search["tab"];
    if (typeof rawTab === "string" && validTabs.includes(rawTab as PlatformTab)) {
      return { tab: rawTab as PlatformTab };
    }
    return {};
  },
  head: () => ({
    meta: [
      { title: "Platform Architecture & Full-Spectrum Sports AI Engineering — SportsMax" },
      {
        name: "description",
        content:
          "Enterprise sports AI infrastructure: sub-38ms live edge inference, multi-camera 3D pose reconstruction, 24-point kinematics, federated athlete privacy, and multi-tenant high-performance computing.",
      },
    ],
  }),
  component: PlatformPage,
});

type PlatformTab = "overview" | "how-it-works" | "technology" | "integrations" | "security";

export function PlatformPage() {
  const search = Route.useSearch();
  const [activeTab, setActiveTab] = useState<PlatformTab>(search.tab || "overview");

  // Keep state in sync if user navigates via dropdown with different search.tab
  useEffect(() => {
    if (search.tab && search.tab !== activeTab) {
      setActiveTab(search.tab);
    }
  }, [search.tab]);



  return (
    <>
      <PageIntro
        eyebrow="Enterprise AI Architecture"
        title="Mission-Critical Sports Intelligence at Millisecond Latency"
        text="SportsMax unifies edge computer vision, multi-spectral sensor telemetry, kinematic physics modeling, and sovereign athlete data lakes into a single zero-trust enterprise substrate."
        action={
          <div className="flex flex-col items-end gap-3">
            <DemoBadge />
            <div className="inline-flex flex-wrap rounded-lg border border-border bg-secondary/80 p-1 backdrop-blur-sm">
              {(
                [
                  { id: "overview", label: "Overview" },
                  { id: "how-it-works", label: "How It Works" },
                  { id: "technology", label: "Technology" },
                  { id: "integrations", label: "Integrations" },
                  { id: "security", label: "Security & Trust" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        }
      />

      {/* KPI Real-Time Platform Bar */}
      <section className="border-y border-border/80 bg-card/60 py-4 backdrop-blur-md">
        <div className="content-wrap">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-primary font-mono tracking-tight">&lt; 38ms</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">End-to-End Latency</div>
            </div>
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-foreground font-mono tracking-tight">120 FPS</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Edge Pose Tracking</div>
            </div>
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-primary font-mono tracking-tight">24 Points</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Skeletal Kinematics</div>
            </div>
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-foreground font-mono tracking-tight">99.8%</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Player Re-ID Accuracy</div>
            </div>
            <div className="p-2 border-r border-border/50 last:border-r-0">
              <div className="text-xl lg:text-2xl font-black text-primary font-mono tracking-tight">24+ Sports</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">Certified Ontologies</div>
            </div>
            <div className="p-2">
              <div className="text-xl lg:text-2xl font-black text-foreground font-mono tracking-tight">AES-256</div>
              <div className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-0.5">EHR-Grade Biometrics</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tab Viewports */}
      <section className="py-12 bg-background min-h-[600px]">
        <div className="content-wrap">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="grid gap-14">
              <SectionHead
                eyebrow="Autonomous Sports Intelligence"
                title="Unified Sports Intelligence Foundation"
                text="Engineered to meet the rigor of UEFA champions leagues, Olympic high-performance institutes, and international athletics federations. Transform raw multi-angle broadcast feeds and inertial telemetry into high-fidelity biomechanical decisions."
              />

              {/* Architecture hero image with interactive overlay callouts */}
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl bg-card">
                <img
                  src={pipelineImage}
                  alt="SportsMax Enterprise Neural Pipeline Architecture"
                  className="w-full h-[400px] object-cover object-center filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex flex-col justify-end p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
                      <Zap className="h-3 w-3" /> Production Live
                    </span>
                    <span className="text-xs text-muted-foreground">Multi-Tenant HPC GPU Pipeline V4.2</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    Sub-38ms Edge-to-Cloud Distributed Processing Grid
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-3xl mt-1">
                    Synchronized multi-camera ingest with hardware RTSP/SRT demuxing, followed by low-latency TensorRT neural inference, and real-time biometric-tactical cross-correlation.
                  </p>
                </div>
              </div>

              {/* 3 Core Pillars */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="surface-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                      <Radio className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Edge Ingestion & Demux</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Accepts 12G-SDI, SRT, and RTMP broadcast streams alongside BLE 5.4 and Ultra-Wideband (UWB) wearable telemetry. Performs genlock synchronization across up to 32 pitch-side cameras down to microsecond alignment.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-mono">Genlock &lt;0.5ms jitter</span>
                    <span className="text-primary font-semibold flex items-center gap-1">Layer 1-2 <ArrowRight className="h-3 w-3" /></span>
                  </div>
                </div>

                <div className="surface-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                      <BrainCircuit className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Kinematic Neural Fusion</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Custom YOLO-Pose and transformer-based spatio-temporal encoders reconstruct 3D joint centers without retro-reflective markers. Computes real-time angular velocities, joint moments, and ground reaction torque in 6-DOF.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-mono">FP16 TensorRT</span>
                    <span className="text-primary font-semibold flex items-center gap-1">Layer 3-4 <ArrowRight className="h-3 w-3" /></span>
                  </div>
                </div>

                <div className="surface-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Tactical Graph & Privacy</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Dynamic spatial graph neural networks (GNNs) track off-ball movement, passing lane probabilities, and formation compression while athlete biometrics remain isolated in zero-knowledge encrypted enclaves.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-mono">HIPAA / GDPR Enclaves</span>
                    <span className="text-primary font-semibold flex items-center gap-1">Layer 5-6 <ArrowRight className="h-3 w-3" /></span>
                  </div>
                </div>
              </div>

              {/* Dual Visual Showcase: High-Performance Lab & Tactical Arena */}
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div className="surface-card overflow-hidden group">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={labImage}
                      alt="Olympic Biomechanics Testing Facility"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider text-primary border border-border">
                      Biomechanics Lab Mode
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-foreground text-base mb-1">Sub-Millimeter Joint Precision</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Validates ACL strain vectors, trunk lean angles, and force plate telemetry for physical therapy, return-to-play benchmarking, and load management.
                    </p>
                  </div>
                </div>

                <div className="surface-card overflow-hidden group">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={arenaImage}
                      alt="Tactical Pitch Spatial Grid"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider text-primary border border-border">
                      Stadium Spatial AI
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-foreground text-base mb-1">Real-Time Tactical Spatialization</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Continuous pitch triangulation with Voronoi pitch control maps, expected threat (xT), and high-intensity sprint fatigue indexing for sideline coaching staffs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HOW IT WORKS */}
          {activeTab === "how-it-works" && (
            <div className="grid gap-12">
              <SectionHead
                eyebrow="Workflow Breakdown"
                title="Deterministic 5-Stage Processing Chain"
                text="Explore the computational pipeline that translates raw photons and RF signals into coaching prescriptions, broadcast overlays, and sports medical risk scores."
              />

              <div className="grid gap-6">
                {[
                  {
                    step: "01",
                    title: "Multi-Source Sensor Synchrony & Calibration",
                    badge: "Ingestion Tier",
                    desc: "Pitch-side SDI/IP cameras (up to 4K @ 120 FPS), UWB positional beacons, Catapult/Statsports GPS vests, and force plates are ingested simultaneously. SportsMax runs automated extrinsic camera calibration in under 90 seconds using pitch geometry markers.",
                    specs: ["Hardware PTP (IEEE 1588) microsecond sync", "Sub-pixel lens distortion correction", "4K HDR 10-bit ingest"],
                    icon: Video,
                  },
                  {
                    step: "02",
                    title: "Markerless 3D Skeletal Kinematics",
                    badge: "Computer Vision",
                    desc: "Our neural pose engine tracks 24 anatomical keypoints per athlete simultaneously across full rosters. Ray-casting multi-view triangulation eliminates visual occlusion and produces 3D volumetric coordinates accurate to within ±2.4mm.",
                    specs: ["24 3D keypoints at 120Hz", "Occlusion-resistant temporal smoothing", "Automatic jersey & biometric Re-ID"],
                    icon: Cpu,
                  },
                  {
                    step: "03",
                    title: "Physics-Informed Dynamic Inverse Modeling",
                    badge: "Biomechanics Engine",
                    desc: "Kinematic data passes into rigid-body dynamics solvers. SportsMax calculates joint angular acceleration, estimated patellar tendon tension, asymmetric lumbar loading, and ground reaction forces without requiring physical force plates.",
                    specs: ["Newton-Euler equations of motion", "Hamstring eccentric overload indices", "Asymmetry detection <2% threshold"],
                    icon: Gauge,
                  },
                  {
                    step: "04",
                    title: "Spatial Graph Tactical Intelligence",
                    badge: "Tactics & Strategy",
                    desc: "Athletes and the ball are modeled as nodes in a dynamic spatial-temporal graph. The network continuously projects passing lane availability, pitch control surface area, defensive compact lines, and transition vulnerability.",
                    specs: ["Voronoi & continuous pitch control", "Pressing intensity (PPDA) indexing", "Counter-attack probability modeling"],
                    icon: Target,
                  },
                  {
                    step: "05",
                    title: "Sub-Second Delivery & Actuation",
                    badge: "Edge & API Delivery",
                    desc: "Insights are formatted into real-time protobuf and WebSockets payloads. Pitch-side tablet UIs, broadcast TV augmented graphics, and medical alerts trigger within 38 milliseconds of physical ground contact.",
                    specs: ["gRPC & WebSocket real-time streams", "VizRT & Unreal Engine SDI overlays", "Automated clinician SMS/push alerts"],
                    icon: Zap,
                  },
                ].map((item, idx) => (
                  <div key={idx} className="surface-card p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex md:flex-col items-center gap-3 shrink-0">
                      <span className="font-mono text-3xl md:text-4xl font-black text-primary/40">{item.step}</span>
                      <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <item.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-secondary text-primary border border-border">
                          {item.badge}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-foreground">{item.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.specs.map((spec, sidx) => (
                          <span
                            key={sidx}
                            className="inline-flex items-center gap-1.5 text-xs font-mono bg-background px-3 py-1 rounded border border-border/80 text-foreground"
                          >
                            <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Interactive Pipeline Workflow Graphic */}
              <div className="surface-card p-6 md:p-8">
                <Workflow
                  title="Zero-Latency Video-to-Insight Autonomous Loop"
                  description="From uncompressed SDI frame arrival to pitch-side tablet broadcast overlay in under 38 milliseconds."
                  steps={[
                    "SDI / IP Frame Ingest",
                    "Extrinsic Calibration",
                    "TensorRT 3D Pose",
                    "Inverse Dynamics",
                    "Tactical Graph GNN",
                    "Sub-38ms WebSocket Push",
                  ]}
                />
              </div>
            </div>
          )}

          {/* TAB 3: TECHNOLOGY */}
          {activeTab === "technology" && (
            <div className="grid gap-12">
              <SectionHead
                eyebrow="Core Deep-Tech Stack"
                title="Industrial Machine Learning & High-Performance Compute"
                text="From custom CUDA kernels to distributed Ray clusters, explore the technological primitives enabling real-time computational sports physics at global scale."
              />

              {/* Tech Deep Dive 2-Col Image + Copy */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    <Activity className="h-3.5 w-3.5" /> Hydrodynamic & Kinematic Precision
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                    Multi-Medium Computer Vision & Surface Refraction Solvers
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Unlike standard computer vision frameworks that break down under water surface turbulence, extreme lighting glare, or heavy player pileups, SportsMax implements medium-aware optical refraction modeling.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Trained across 4.8 million high-speed frames of track, field, court, and aquatic kinetics, our spatio-temporal transformers maintain consistent skeletal joint topologies even when limb extremities are partially submerged or occluded.
                  </p>
                  <div className="pt-2 grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg border border-border bg-card/50">
                      <div className="font-mono text-xl font-bold text-primary">0.02°</div>
                      <div className="text-xs text-muted-foreground">Angular Joint Error Margin</div>
                    </div>
                    <div className="p-3 rounded-lg border border-border bg-card/50">
                      <div className="font-mono text-xl font-bold text-primary">4.8M+</div>
                      <div className="text-xs text-muted-foreground">Validated Kinetic Frames</div>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl">
                  <img
                    src={swimImage}
                    alt="Refraction-Compensated Aquatic Biomechanics AI"
                    className="w-full h-[360px] object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/90 to-transparent p-4 text-xs font-mono text-foreground flex items-center justify-between">
                    <span>PoseRefract-Net v2.1</span>
                    <span className="text-primary font-bold">Hydrodynamic Joint Reconstruction</span>
                  </div>
                </div>
              </div>

              {/* 4 Deep Tech Architecture Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="surface-card p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Server className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">Custom CUDA Kernels & TensorRT FP16</h4>
                      <p className="text-xs text-muted-foreground">Low-Level Hardware Acceleration</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    We bypass generic PyTorch/ONNX runtimes at runtime. Inference routines are compiled down to hardware-specific TensorRT engines with custom CUDA kernels for multi-camera epipolar geometry and 3D triangulation, minimizing memory copies between host and GPU VRAM.
                  </p>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> NVIDIA Hopper & Ada Lovelace TensorRT optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Zero-copy GPUDirect RDMA video frame ingest
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Quantized INT8 / FP16 dynamic weight switching
                    </li>
                  </ul>
                </div>

                <div className="surface-card p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <BrainCircuit className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">Spatio-Temporal Graph Networks (ST-GCN)</h4>
                      <p className="text-xs text-muted-foreground">High-Dimensional Motion Forensics</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Human motion is inherently non-Euclidean. SportsMax treats the human skeleton as an evolving graph where joints are nodes and bones are edges. Temporal convolution layers capture gait cadence, stride asymmetries, and micro-instabilities across multi-second movement windows.
                  </p>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Continuous kinetic energy flux calculations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Early-warning non-contact injury risk markers
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Fatigue-induced kinematics drift classification
                    </li>
                  </ul>
                </div>

                <div className="surface-card p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Database className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">Distributed Timeseries Lakehouse</h4>
                      <p className="text-xs text-muted-foreground">Petabyte-Scale Athletic Data Storage</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Athletic motion generates billions of high-frequency coordinates per fixture. Built atop Apache Arrow and partitioned Parquet time-series tables, analysts can query across seasons of tracking data in milliseconds using standard SQL or Python Pandas.
                  </p>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Columnar storage with snappy compression
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Sub-50ms analytics query latency across 100M+ data points
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Native integrations with Databricks and Snowflake
                    </li>
                  </ul>
                </div>

                <div className="surface-card p-6 md:p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base">Hybrid Edge-Cloud Topology</h4>
                      <p className="text-xs text-muted-foreground">Zero-Disruption Stadium Deployment</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    SportsMax runs fully autonomously on pitch-side ruggedized 2U edge nodes with zero reliance on cloud uplink during live matches. When connection is present, metadata and model checkpoints synchronize seamlessly to central multi-cloud clusters.
                  </p>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> 100% offline air-gapped operation capability
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Redundant dual-PSU 10GbE edge hardware appliances
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Automatic cloud reconciliation on connection restoration
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INTEGRATIONS */}
          {activeTab === "integrations" && (
            <div className="grid gap-12">
              <SectionHead
                eyebrow="Open Ecosystem"
                title="Plug-and-Play Sports Technology Interoperability"
                text="SportsMax was designed as an open enterprise hub. We ingest data from every leading sports science hardware vendor and push real-time intelligence into broadcast graphics, team databases, and clinical systems."
              />

              <div className="grid md:grid-cols-3 gap-6">
                <div className="surface-card p-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <HeartPulse className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Wearables & GPS</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Direct certified API connectors for micro-load, metabolic conditioning, and positional telemetry from elite wearable sensors.
                  </p>
                  <div className="space-y-2 border-t border-border pt-4">
                    {[
                      { name: "Catapult Sports (OpenField)", status: "Native Bi-Directional" },
                      { name: "STATSports (Sonra Apex)", status: "Real-time Telemetry" },
                      { name: "Polar Team Pro & WHOOP", status: "HRV & Sleep Staging" },
                      { name: "Kinexon UWB Positioning", status: "Sub-10cm Precision" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-foreground font-medium">{item.name}</span>
                        <span className="text-primary font-mono">{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="surface-card p-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <Video className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Cameras & Video FEEDS</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Universal optical video ingest supporting high-speed machine vision, broadcast broadcast OB trucks, and tactical pan-tilt-zoom rigs.
                  </p>
                  <div className="space-y-2 border-t border-border pt-4">
                    {[
                      { name: "SMPTE ST 2110 & NDI 6", status: "Uncompressed IP" },
                      { name: "Sony Hawk-Eye Synchrony", status: "Multi-Angle Sync" },
                      { name: "Hudl Sportscode XML", status: "Code Window Ingest" },
                      { name: "Blackmagic 12G-SDI Capture", status: "4K @ 120 FPS" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-foreground font-medium">{item.name}</span>
                        <span className="text-primary font-mono">{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="surface-card p-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <FileBarChart2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Team AMS & Analytics</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Export high-frequency metrics into Athlete Management Systems (AMS), electronic health records, and tactical scouting suites.
                  </p>
                  <div className="space-y-2 border-t border-border pt-4">
                    {[
                      { name: "Kitman Labs (IP System)", status: "Automated Push" },
                      { name: "Smartabase / Teamworks", status: "RESTful Connector" },
                      { name: "Opta / Stats Perform XML", status: "Tactical Event Map" },
                      { name: "Unreal Engine & VizRT", status: "Live AR Graphics" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-foreground font-medium">{item.name}</span>
                        <span className="text-primary font-mono">{item.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Developer API Code Sandbox Demonstration */}
              <div className="surface-card p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">SportsMax Real-Time WebSocket & gRPC Stream</h3>
                    <p className="text-xs text-muted-foreground">Subscribe to 120Hz 3D joint positions and tactical pitch vectors via sub-millisecond streaming RPCs</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-secondary text-[11px] font-mono text-muted-foreground">v2.4.0 Protobuf</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/resources">
                        View API Specs <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg bg-background/90 border border-border p-4 font-mono text-xs overflow-x-auto text-muted-foreground leading-relaxed">
                  <span className="text-primary font-bold">// WebSocket Live Kinematics Telemetry Payload Sample</span><br />
                  &#123;<br />
                  &nbsp;&nbsp;<span className="text-foreground">"fixture_id"</span>: <span className="text-emerald-400">"UEFA-2026-F09"</span>,<br />
                  &nbsp;&nbsp;<span className="text-foreground">"timestamp_ptp"</span>: <span className="text-amber-400">1774218394012480</span>,<br />
                  &nbsp;&nbsp;<span className="text-foreground">"latency_ms"</span>: <span className="text-emerald-400">22.4</span>,<br />
                  &nbsp;&nbsp;<span className="text-foreground">"athlete_id"</span>: <span className="text-emerald-400">"ATH-9921-MBAP"</span>,<br />
                  &nbsp;&nbsp;<span className="text-foreground">"sprint_velocity_mps"</span>: <span className="text-amber-400">9.84</span>,<br />
                  &nbsp;&nbsp;<span className="text-foreground">"knee_valgus_angle_deg"</span>: <span className="text-amber-400">&#123; "left": 4.2, "right": 3.8 &#125;</span>,<br />
                  &nbsp;&nbsp;<span className="text-foreground">"hamstring_eccentric_load_nm"</span>: <span className="text-amber-400">642.1</span>,<br />
                  &nbsp;&nbsp;<span className="text-foreground">"pitch_spatial_coords"</span>: <span className="text-amber-400">&#123; "x": 68.42, "y": 32.18, "z": 0.00 &#125;</span>,<br />
                  &nbsp;&nbsp;<span className="text-foreground">"injury_risk_flag"</span>: <span className="text-emerald-400">"NORMAL"</span><br />
                  &#125;
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SECURITY & COMPLIANCE */}
          {activeTab === "security" && (
            <div className="grid gap-12">
              <SectionHead
                eyebrow="Zero-Trust Sovereign Data"
                title="Sovereign Athlete Data Governance & Compliance"
                text="Elite athletic biometric data is regulated medical information. SportsMax implements hardware-enforced cryptographic enclaves, HIPAA/GDPR strict isolation, and differential privacy so your athlete intelligence remains your proprietary competitive edge."
              />

              {/* Security Centerpiece Image + Explainer */}
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl bg-card">
                <img
                  src={securityImage}
                  alt="SportsMax Sovereign Security Operations & Data Vault"
                  className="w-full h-[380px] object-cover object-center filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex flex-col justify-end p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                      <Lock className="h-3 w-3" /> Hardware Enclave Protected
                    </span>
                    <span className="text-xs text-muted-foreground">SOC2 Type II Certified & HIPAA Compliant</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    Confidential Biometric Computing with AMD SEV & Intel SGX
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-3xl mt-1">
                    Athlete biometric metrics, injury histories, and contract telemetry are encrypted in memory during execution. Even system administrators and cloud providers cannot inspect raw athletic records.
                  </p>
                </div>
              </div>

              {/* 4 Trust & Compliance Pillars */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="surface-card p-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-foreground text-base mb-2">Zero-Trust Isolation</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Club data is mathematically isolated in tenant-specific schemas. Role-based access control (RBAC) ensures coaching staff only see tactical outputs while medical staffs see clinical biometrics.
                  </p>
                </div>

                <div className="surface-card p-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-foreground text-base mb-2">GDPR & HIPAA Ready</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Built-in athlete 'Right to be Forgotten' automation. Biometric markers are anonymized via differential privacy prior to any federated AI model training across multi-club datasets.
                  </p>
                </div>

                <div className="surface-card p-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <Globe className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-foreground text-base mb-2">Data Sovereignty</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Local regional storage policies guarantee athlete records never leave sovereign jurisdictions (e.g., EU-only Frankfurt clusters, UK London zones, US East FedRAMP enclaves).
                  </p>
                </div>

                <div className="surface-card p-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <h4 className="font-bold text-foreground text-base mb-2">Immutable Audit Trails</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Every data access request, video query, and export is recorded to an append-only cryptographically verifiable audit ledger for league integrity and anti-doping verification.
                  </p>
                </div>
              </div>

              {/* Compliance Badges Matrix */}
              <div className="surface-card p-6 md:p-8">
                <div className="text-center max-w-xl mx-auto mb-6">
                  <h3 className="text-base font-bold text-foreground">Enterprise Certifications & Standards</h3>
                  <p className="text-xs text-muted-foreground mt-1">Audited annually by independent cybersecurity and sports compliance assessors</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 rounded-lg bg-background border border-border">
                    <div className="font-bold text-foreground text-sm">SOC 2 Type II</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">AICPA Audited</div>
                  </div>
                  <div className="p-4 rounded-lg bg-background border border-border">
                    <div className="font-bold text-foreground text-sm">HIPAA & HITECH</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">Medical Biometrics</div>
                  </div>
                  <div className="p-4 rounded-lg bg-background border border-border">
                    <div className="font-bold text-foreground text-sm">ISO / IEC 27001</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">Information Security</div>
                  </div>
                  <div className="p-4 rounded-lg bg-background border border-border">
                    <div className="font-bold text-foreground text-sm">EU GDPR Article 9</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">Special Category Data</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Global Bottom CTA: TrustGrid.AI Inspired Enterprise Commitment */}
      <section className="py-16 border-t border-border bg-card/40 backdrop-blur-md">
        <div className="content-wrap">
          <div className="surface-card p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20 inline-block mb-4">
                Enterprise Deployment
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Ready to Deploy Sovereign Sports AI Across Your Organization?
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                Consult with our solutions architects to benchmark your facility, deploy pitch-side edge appliances, and integrate with your existing sensor ecosystem.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <Link to="/contact">
                    Schedule Engineering Briefing <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/resources">
                    Explore Technical Documentation
                  </Link>
                </Button>
              </div>
            </div>
            {/* Subtle background tech graphic */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden lg:flex items-center justify-center">
              <BrainCircuit className="w-80 h-80 text-primary" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
