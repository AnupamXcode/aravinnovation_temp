"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Compass,
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  TrendingUp,
  Quote,
  Globe2,
  Zap,
  Cpu,
  Check,
  ChevronRight,
  Shield,
  Cloud,
  Database,
  LayoutGrid,
  Users,
  Server,
  Activity,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";
import { Service } from "@/data/services";
import { caseStudiesData } from "@/data/case-studies";
import { testimonialsData } from "@/data/testimonials";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";

interface ITStrategyPageProps {
  service: Service;
}

// -----------------------------------------------------------------------------
// 1. Scroll-Triggered Section Wrapper Component
// -----------------------------------------------------------------------------
function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// 2. System Scan Transition Line (Subtle sweeping scan line between sections)
// -----------------------------------------------------------------------------
function SystemScanTransition() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative w-full h-px my-4 overflow-hidden pointer-events-none select-none">
      <div className="w-full h-full bg-[#f7d7b0]/30 dark:bg-[#253630]" />
      {!shouldReduceMotion && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "100%" } : {}}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#f15e1c] to-transparent shadow-[0_0_10px_#f15e1c]"
        />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 3. Animated Dot Grid & Ambient Mouse Cursor Spotlight
// -----------------------------------------------------------------------------
function AnimatedDotGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-15 dark:opacity-20 select-none">
      <svg className="w-full h-full" width="100%" height="100%">
        <pattern
          id="it-dot-matrix-pattern"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.2" fill="#f15e1c" opacity="0.6" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#it-dot-matrix-pattern)" />
      </svg>
    </div>
  );
}

function CursorSpotlight() {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const touch = window.matchMedia("(pointer: coarse)").matches;
      setIsTouch(touch);
      if (touch) return;

      const handleMove = (e: MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
      };
      window.addEventListener("mousemove", handleMove);
      return () => window.removeEventListener("mousemove", handleMove);
    }
  }, []);

  if (isTouch) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-500 hidden lg:block select-none"
      style={{
        background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(241, 94, 28, 0.05), transparent 80%)`,
      }}
    />
  );
}

// -----------------------------------------------------------------------------
// Data Collections for IT Strategy Page
// -----------------------------------------------------------------------------

// Hero Transformation Map Nodes
const transformationMapNodes = [
  {
    id: "legacy",
    title: "LEGACY ENVIRONMENT",
    subtext: "Monolithic debt, fragmented servers, and unoptimized cloud spend.",
    accent: "#f15e1c",
    status: "CURRENT STATE",
  },
  {
    id: "assess",
    title: "01 ASSESS",
    subtext: "Infrastructure diagnostic, FinOps audit, and security health assessment.",
    accent: "#fab60a",
    status: "DIAGNOSTIC",
  },
  {
    id: "strategize",
    title: "02 STRATEGIZE",
    subtext: "Executive 3-year digital roadmap, cloud architecture, and ROI targets.",
    accent: "#f15e1c",
    status: "BLUEPRINT",
  },
  {
    id: "architect",
    title: "03 ARCHITECT",
    subtext: "Kubernetes container topology, zero-trust identity, and data pipelines.",
    accent: "#2e936f",
    status: "DESIGN",
  },
  {
    id: "implement",
    title: "04 IMPLEMENT",
    subtext: "Zero-downtime microservices refactoring, Terraform IaC, and CI/CD pipelines.",
    accent: "#fab60a",
    status: "DEPLOYMENT",
  },
  {
    id: "optimize",
    title: "05 OPTIMIZE",
    subtext: "24/7 telemetry monitoring, automated autoscaling, and continuous FinOps.",
    accent: "#2e936f",
    status: "SUSTAINED GOVERNANCE",
  },
];

// Business Problems Supported by Content
const businessProblemsData = [
  {
    id: "prob-1",
    title: "Legacy Monolith & Code Complexity",
    subtext: "TECHNICAL DEBT BOTTLENECK",
    description: "Siloed legacy systems, fragile dependencies, and accumulated technical debt stall feature delivery and delay critical expansion.",
    impact: "Slow feature releases & high operational maintenance costs",
    icon: <Cpu className="w-6 h-6 text-[#f15e1c]" />,
  },
  {
    id: "prob-2",
    title: "Cloud Infrastructure Inefficiency",
    subtext: "UNCONTROLLED OPEX",
    description: "Uncontrolled cloud hosting expenditures, overprovisioned resources, and lack of FinOps governance across multi-cloud environments.",
    impact: "Unpredictable cloud spend & wasted hosting resources",
    icon: <Cloud className="w-6 h-6 text-[#fab60a]" />,
  },
  {
    id: "prob-3",
    title: "Security & Compliance Exposure",
    subtext: "REGULATORY & PRIVACY RISK",
    description: "Unresolved architectural vulnerabilities, missing zero-trust identity controls, and compliance risks under DPDP and SOC-2 standards.",
    impact: "Vendor questionnaire friction & audit readiness delays",
    icon: <Shield className="w-6 h-6 text-[#2e936f]" />,
  },
  {
    id: "prob-4",
    title: "Slow & Fragile Delivery Pipelines",
    subtext: "RELEASE BOTTLENECK",
    description: "Manual release handoffs, lack of automated CI/CD pipelines, and high downtime risks during code cutovers.",
    impact: "Release delays, deployment bugs, and customer friction",
    icon: <Activity className="w-6 h-6 text-[#f15e1c]" />,
  },
];

// Connected Digital Core Nodes
const connectedDigitalCoreNodes = [
  {
    id: "cloud",
    label: "Cloud",
    tech: "Kubernetes & Multi-Cloud",
    capability: "Multi-region AWS/Azure container topology with automated pod scaling and FinOps expense controls.",
    icon: <Cloud className="w-6 h-6 text-[#f15e1c]" />,
    accent: "#f15e1c",
  },
  {
    id: "security",
    label: "Security",
    tech: "Zero-Trust & DPDP",
    capability: "Field-level encryption, RBAC governance, and India DPDP / SOC-2 regulatory compliance frameworks.",
    icon: <Shield className="w-6 h-6 text-[#2e936f]" />,
    accent: "#2e936f",
  },
  {
    id: "data",
    label: "Data",
    tech: "PostgreSQL & Kafka",
    capability: "Event-driven data pipelines, Redis caching layers, and high-concurrency database orchestration.",
    icon: <Database className="w-6 h-6 text-[#fab60a]" />,
    accent: "#fab60a",
  },
  {
    id: "apps",
    label: "Applications",
    tech: "Next.js & Microservices",
    capability: "Modular microservices architecture with sub-second Next.js edge rendering and clean API contracts.",
    icon: <LayoutGrid className="w-6 h-6 text-[#f15e1c]" />,
    accent: "#f15e1c",
  },
  {
    id: "users",
    label: "Users",
    tech: "RBAC & SSO Identity",
    capability: "Centralized identity provider integration, Single Sign-On (SSO), and granular access policies.",
    icon: <Users className="w-6 h-6 text-[#2e936f]" />,
    accent: "#2e936f",
  },
  {
    id: "infra",
    label: "Infrastructure",
    tech: "Terraform & CI/CD",
    capability: "Infrastructure-as-Code automation, zero-downtime release pipelines, and disaster recovery failover.",
    icon: <Server className="w-6 h-6 text-[#fab60a]" />,
    accent: "#fab60a",
  },
];

// 4 Capability Groups
const capabilityGroups = [
  {
    id: "strategy",
    category: "01 STRATEGY & ADVISORY",
    accent: "#f15e1c",
    bgAccent: "rgba(241, 94, 28, 0.08)",
    description: "Formulate executive technology blueprints that align engineering execution with CFO margin goals.",
    items: [
      "Enterprise Technology Roadmapping",
      "Cloud Migration Strategy (AWS, Azure, GCP)",
      "Legacy Modernization Assessment",
      "Vendor Evaluation & Architecture Audits",
    ],
    icon: <Compass className="w-7 h-7 text-[#f15e1c]" />,
  },
  {
    id: "cloud-infra",
    category: "02 CLOUD & INFRASTRUCTURE",
    accent: "#fab60a",
    bgAccent: "rgba(250, 182, 10, 0.08)",
    description: "Build resilient multi-cloud topologies, automated autoscaling, and cloud cost governance.",
    items: [
      "Kubernetes Multi-Region Orchestration",
      "FinOps & Cloud Cost Optimization",
      "Terraform Infrastructure-as-Code (IaC)",
      "Disaster Recovery & Business Continuity",
    ],
    icon: <Cloud className="w-7 h-7 text-[#fab60a]" />,
  },
  {
    id: "security-gov",
    category: "03 SECURITY & COMPLIANCE",
    accent: "#2e936f",
    bgAccent: "rgba(46, 147, 111, 0.08)",
    description: "Protect critical enterprise data assets with zero-trust architecture and regulatory safeguards.",
    items: [
      "Zero-Trust Identity & Access Architecture",
      "India DPDP Act & SOC-2 Readiness",
      "RBAC & SSO Identity Management",
      "Data Classification & Encryption Standards",
    ],
    icon: <Shield className="w-7 h-7 text-[#2e936f]" />,
  },
  {
    id: "engineering-ops",
    category: "04 ENGINEERING & OPERATIONS",
    accent: "#f15e1c",
    bgAccent: "rgba(247, 215, 176, 0.15)",
    description: "Refactor legacy platforms into high-velocity microservices with 24/7 telemetry monitoring.",
    items: [
      "Monolith to Microservices Refactoring",
      "Automated Containerized CI/CD Pipelines",
      "24/7 Telemetry & Log Monitoring",
      "100/100 Core Web Vitals Optimization",
    ],
    icon: <Server className="w-7 h-7 text-[#f15e1c]" />,
  },
];

// Unified Transformation Journey (5 Stages)
const processTimelineStages = [
  {
    num: "01",
    title: "ASSESS",
    subtitle: "Current-State Technology Health Diagnostic",
    description: "Deep-dive audit across codebases, cloud expenditure, database schemas, and microservice dependencies to map legacy friction points.",
    deliverable: "Comprehensive Technology Health Assessment & Technical Debt Audit",
  },
  {
    num: "02",
    title: "STRATEGIZE",
    subtitle: "Target-State Blueprint & Executive Roadmap",
    description: "Translating executive business goals into a 12 to 36 month phased digital modernization plan with CFO-aligned cost projections.",
    deliverable: "12-36 Month Phased Digital Modernization Blueprint",
  },
  {
    num: "03",
    title: "ARCHITECT",
    subtitle: "Zero-Trust & Scalable Cloud Topology",
    description: "Designing multi-region Kubernetes topologies, event-driven Kafka pipelines, zero-trust access controls, and IaC templates.",
    deliverable: "Future-State Architecture Blueprint & Security Control Spec",
  },
  {
    num: "04",
    title: "IMPLEMENT",
    subtitle: "Zero-Downtime Migration & CI/CD Cutover",
    description: "Dedicated engineering squads refactor code, establish containerized pipelines, and execute seamless live cutovers with zero data loss.",
    deliverable: "Production Containerized CI/CD & Microservices Cutover",
  },
  {
    num: "05",
    title: "OPTIMIZE",
    subtitle: "24/7 Telemetry & Continuous FinOps",
    description: "Maintaining high system availability through automated log telemetry, Kubernetes pod right-sizing, and monthly cost optimization.",
    deliverable: "Post-Implementation ROI & Scalability Telemetry Review",
  },
];

// Verified Technologies Constellation
const verifiedTechConstellation = [
  {
    category: "Cloud Platforms",
    accent: "#f15e1c",
    icon: <Cloud className="w-5 h-5 text-[#f15e1c]" />,
    items: ["Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud Platform (GCP)", "Kubernetes"],
  },
  {
    category: "Data & Event Streaming",
    accent: "#fab60a",
    icon: <Database className="w-5 h-5 text-[#fab60a]" />,
    items: ["PostgreSQL", "Apache Kafka", "Redis", "Event-Driven Pipelines"],
  },
  {
    category: "Modern Application Architecture",
    accent: "#2e936f",
    icon: <LayoutGrid className="w-5 h-5 text-[#2e936f]" />,
    items: ["Next.js App Router", "TypeScript", "Microservices", "REST & GraphQL APIs"],
  },
  {
    category: "Security & Identity Controls",
    accent: "#2e936f",
    icon: <Shield className="w-5 h-5 text-[#2e936f]" />,
    items: ["Zero-Trust Security", "RBAC & Single Sign-On (SSO)", "DPDP & SOC-2 Controls", "AES-256 Encryption"],
  },
  {
    category: "DevOps & Automation",
    accent: "#f15e1c",
    icon: <Server className="w-5 h-5 text-[#f15e1c]" />,
    items: ["Terraform (IaC)", "Docker Containers", "CI/CD Pipelines", "TOGAF & ITIL Frameworks"],
  },
];

// Verified Outcome Statements & Metrics
const verifiedOutcomesData = [
  {
    headline: "LOWER TECHNICAL FRICTION",
    metric: "45%",
    metricLabel: "Cloud Cost Optimization",
    description: "Scrubbing legacy code debt, right-sizing multi-cloud pods, and eliminating unutilized cloud server resources.",
    icon: <Cpu className="w-6 h-6 text-[#f15e1c]" />,
    progressWidth: "45%",
  },
  {
    headline: "MORE PREDICTABLE INFRASTRUCTURE",
    metric: "99.99%",
    metricLabel: "Target Uptime SLA",
    description: "Active-active multi-region Kubernetes clusters designed to prevent single points of system failure.",
    icon: <Shield className="w-6 h-6 text-[#2e936f]" />,
    progressWidth: "99%",
  },
  {
    headline: "STRONGER SECURITY POSTURE",
    metric: "Zero-Trust",
    metricLabel: "DPDP & SOC-2 Guardrails",
    description: "Enforcing role-based access control, SSO integration, and strict regulatory data compliance.",
    icon: <Lock className="w-6 h-6 text-[#fab60a]" />,
    progressWidth: "88%",
  },
  {
    headline: "BETTER TECHNOLOGY DELIVERY",
    metric: "3.2x",
    metricLabel: "Deployment Velocity",
    description: "Automated containerized CI/CD pipelines enabling rapid, risk-free production releases.",
    icon: <Zap className="w-6 h-6 text-[#f15e1c]" />,
    progressWidth: "75%",
  },
];

// IT Strategy Specific FAQs
const itStrategyFaqs = [
  {
    q: "What does Arav's IT Strategy & Implementation service include?",
    a: "Our end-to-end service encompasses initial current-state technology audits, 12-36 month executive digital roadmapping, enterprise cloud architecture design, zero-trust security integration, zero-downtime microservices implementation, and ongoing FinOps cost optimization.",
  },
  {
    q: "Can Arav help modernize existing legacy technology environments?",
    a: "Yes. We specialize in incremental modernization of monolithic legacy systems into resilient, cloud-native microservices architecture without requiring complete risky rewrites or risking business disruption.",
  },
  {
    q: "How do you work alongside our existing internal IT & engineering leadership?",
    a: "We operate as a collaborative extension of your executive leadership and engineering squads. We co-design architectural blueprints with your CTO, VP of Engineering, and security leads to ensure full internal alignment and seamless adoption.",
  },
  {
    q: "How do you approach cloud cost optimization and FinOps?",
    a: "We perform deep-dive audits into your cloud infrastructure (AWS, Azure, GCP), identifying overprovisioned compute pods, orphan storage volumes, and inefficient database queries to establish automated autoscaling and cost governance guardrails.",
  },
  {
    q: "Do you support regional regulatory standards like India DPDP Act and UAE data privacy?",
    a: "Yes. Our cross-border presence in Gurgaon and Dubai allows us to architect cloud infrastructure that fully complies with India's Digital Personal Data Protection (DPDP) Act, UAE data residency mandates, and international SOC-2 / ISO standards.",
  },
  {
    q: "What happens after the implementation phase is completed?",
    a: "Following production cutover, we provide 24/7 telemetry monitoring, automated incident response SLAs, and continuous monthly FinOps reviews, or seamlessly transition governance back to your internal engineering team.",
  },
];

export function ITStrategyInteractivePage({ service }: ITStrategyPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeMapNode, setActiveMapNode] = React.useState<number>(0);
  const [activeCoreNode, setActiveCoreNode] = React.useState<number>(0);
  const [activeTechCat, setActiveTechCat] = React.useState<number>(0);
  const [activeFaqIdx, setActiveFaqIdx] = React.useState<number | null>(0);

  // Verified Case Study Data
  const verifiedCaseStudy = caseStudiesData.find(
    (c) => c.slug === "enterprise-cloud-transformation"
  ) || caseStudiesData[0];

  // Verified Testimonial Data
  const verifiedTestimonial = testimonialsData.find((t) => t.id === "test-3") || testimonialsData[0];

  // ---------------------------------------------------------------------------
  // Transformation Process Scroll Progress (Continuous Native Scroll - NO HIJACK)
  // ---------------------------------------------------------------------------
  const processContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: processProgress } = useScroll({
    target: processContainerRef,
    offset: ["start 75%", "end 25%"],
  });
  const smoothProcessProgress = useSpring(processProgress, { stiffness: 45, damping: 25 });
  const processLineWidth = useTransform(smoothProcessProgress, [0, 1], ["0%", "100%"]);

  const [activeProcessIdx, setActiveProcessIdx] = React.useState<number>(0);

  React.useEffect(() => {
    const unsub = smoothProcessProgress.on("change", (v) => {
      const count = processTimelineStages.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedIdx = Math.floor(normalized * count);
      setActiveProcessIdx(calculatedIdx);
    });
    return () => unsub();
  }, [smoothProcessProgress]);

  return (
    <main className="min-h-screen bg-[#FFFFFF] dark:bg-[#101b17] text-[#1b2823] dark:text-[#ffffff] transition-colors duration-300 overflow-x-hidden selection:bg-[#f15e1c]/20 selection:text-[#f15e1c]">
      <CursorSpotlight />
      
      {/* =========================================================================
          SECTION 01 — SERVICE HERO
          ========================================================================= */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] overflow-hidden select-none">
        <AnimatedDotGrid />

        {/* Ambient Subtle Glows (Palette ONLY) */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-radial from-[#f15e1c]/10 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-radial from-[#2e936f]/10 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-[1536px] mx-auto w-full space-y-8 relative z-10">
          
          {/* Breadcrumb & Eyebrow Badge */}
          <AnimatedSection delay={0.05} className="space-y-3">
            <Breadcrumb
              items={[
                { label: "Services", href: "/services" },
                { label: "IT Strategy & Implementation" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fce3d3] dark:bg-[#172420] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]">
              <Sparkles className="w-4 h-4" />
              <span>ENTERPRISE IT STRATEGY &amp; MODERNIZATION</span>
            </div>
          </AnimatedSection>

          {/* Hero Main Copy */}
          <AnimatedSection delay={0.15} className="max-w-4xl space-y-6 text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-[1.12] text-[#1b2823] dark:text-[#ffffff]">
              Aligning Enterprise Technology with <span className="text-[#f15e1c]">Business Growth &amp; ROI</span>
            </h1>

            <p className="text-base sm:text-xl text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed max-w-3xl">
              Arav helps organizations assess, plan, architect, and implement resilient technology foundations that eliminate legacy friction, optimize cloud spend, and drive predictable business outcomes.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a href="#inquire">
                <MagneticButton>
                  <Button3D
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />}
                    className="shadow-lg shadow-[#f15e1c]/20"
                  >
                    Talk to an IT Expert
                  </Button3D>
                </MagneticButton>
              </a>

              <a href="#how-we-work">
                <MagneticButton>
                  <Button3D variant="outline" size="lg">
                    Explore Our Approach
                  </Button3D>
                </MagneticButton>
              </a>
            </div>
          </AnimatedSection>

          {/* HERO VISUAL — ENTERPRISE TRANSFORMATION MAP WITH SVG DATA PULSE */}
          <AnimatedSection delay={0.25} className="pt-8">
            <div id="transformation-map" className="p-6 sm:p-10 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl space-y-6 relative overflow-hidden">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#253630] pb-4">
                <div>
                  <span className="text-xs font-mono font-black text-[#f15e1c] uppercase tracking-wider block">
                    ENTERPRISE ARCHITECTURE MAP
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                    Enterprise Transformation Map
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2e936f] bg-white dark:bg-[#101b17] px-3.5 py-1.5 rounded-full border border-[#f7d7b0] dark:border-[#253630]">
                  <span className="w-2 h-2 rounded-full bg-[#2e936f] animate-ping" />
                  <span>CONNECTED DIGITAL CORE TARGET</span>
                </div>
              </div>

              {/* Node Sequence Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
                {transformationMapNodes.map((node, idx) => {
                  const isActive = activeMapNode === idx;
                  return (
                    <motion.button
                      key={node.id}
                      type="button"
                      whileHover={{ y: -3, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveMapNode(idx)}
                      className={cn(
                        "p-3.5 rounded-2xl border-2 transition-all duration-300 text-left cursor-pointer space-y-1 relative overflow-hidden group",
                        isActive
                          ? "bg-white dark:bg-[#101b17] border-[#f15e1c] shadow-md ring-2 ring-[#f15e1c]/20"
                          : "bg-white/60 dark:bg-[#101b17]/60 border-[#f7d7b0] dark:border-[#253630] hover:border-[#f15e1c]/60"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#fce3d3] dark:bg-[#172420] text-[#f15e1c]">
                          {node.status}
                        </span>
                        {isActive && <span className="w-2 h-2 rounded-full bg-[#f15e1c] animate-pulse" />}
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                        {node.title}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Active Transformation Node Detail Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMapNode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="p-6 rounded-2xl bg-white dark:bg-[#101b17] border-2 border-[#f7d7b0] dark:border-[#253630] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-black text-[#f15e1c]">
                      STAGE 0{activeMapNode + 1} &bull; {transformationMapNodes[activeMapNode].title}
                    </span>
                    <p className="text-sm sm:text-base font-semibold text-[#1b2823] dark:text-[#ffffff]">
                      {transformationMapNodes[activeMapNode].subtext}
                    </p>
                  </div>
                  <a href="#inquire" className="shrink-0">
                    <Button3D variant="primary" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
                      Discuss Stage 0{activeMapNode + 1}
                    </Button3D>
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 02 — BUSINESS PROBLEM
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-[1536px] mx-auto space-y-12 select-none">
          
          <AnimatedSection className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              THE ENTERPRISE IT CHALLENGE
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              WHEN IT BECOMES A BUSINESS CONSTRAINT
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Legacy technical debt, fragmented cloud architecture, and security exposure slow down enterprise growth.
            </p>
          </AnimatedSection>

          {/* 4 Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {businessProblemsData.map((prob, idx) => (
              <AnimatedSection key={prob.id} delay={0.1 * idx}>
                <TiltCard maxTilt={4} scale={1.015}>
                  <div className="h-full p-6 sm:p-8 rounded-[2rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] hover:border-[#f15e1c] shadow-md hover:shadow-xl transition-all duration-300 space-y-4 text-left flex flex-col justify-between group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-3 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0]/70 group-hover:scale-110 transition-transform shadow-xs">
                          {prob.icon}
                        </div>
                        <span className="text-[10px] font-mono font-black text-[#f15e1c] px-2.5 py-1 rounded-full bg-[#fce3d3] dark:bg-[#101b17]">
                          {prob.subtext}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                        {prob.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                        {prob.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630] flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#f15e1c] shrink-0" />
                      <span className="text-xs font-mono font-bold text-[#1b2823] dark:text-[#ffffff]">
                        Friction Point: {prob.impact}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>

          {/* Diagnostic Sequence Transition Strip */}
          <AnimatedSection delay={0.3}>
            <div className="max-w-4xl mx-auto p-5 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#fce3d3] text-[#f15e1c]">
                  <Activity className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-xs sm:text-sm font-mono font-extrabold text-[#1b2823] dark:text-[#ffffff]">
                  System Diagnostic: Identify Bottlenecks &rarr; Stabilize Topology &rarr; Transition to Digital Core
                </div>
              </div>
              <a href="#our-solution" className="shrink-0">
                <Button3D variant="outline" size="sm">
                  View Solution
                </Button3D>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 03 — OUR SOLUTION / DIGITAL CORE
          ========================================================================= */}
      <section id="our-solution" className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#fefaf5] dark:bg-[#172420] select-none">
        <div className="max-w-[1536px] mx-auto space-y-12">
          
          <AnimatedSection className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              THE ARAV ARCHITECTURE
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              FROM FRAGMENTED INFRASTRUCTURE TO A CONNECTED DIGITAL CORE
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Hover on desktop or tap on mobile to explore how each system component connects to the central Digital Core.
            </p>
          </AnimatedSection>

          {/* Interactive Digital Core Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
            
            {/* Left Node Selector Grid */}
            <AnimatedSection delay={0.1} className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-wider block">
                SYSTEM CATEGORIES (SELECT / TAP)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {connectedDigitalCoreNodes.map((node, idx) => {
                  const isActive = activeCoreNode === idx;
                  return (
                    <motion.button
                      key={node.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveCoreNode(idx)}
                      onMouseEnter={() => setActiveCoreNode(idx)}
                      className={cn(
                        "p-4 rounded-2xl border-2 transition-all duration-300 text-left cursor-pointer flex items-center gap-3 group",
                        isActive
                          ? "bg-white dark:bg-[#101b17] border-[#f15e1c] shadow-lg ring-2 ring-[#f15e1c]/20"
                          : "bg-white/70 dark:bg-[#101b17]/70 border-[#f7d7b0] dark:border-[#253630] hover:border-[#f15e1c]"
                      )}
                    >
                      <div className="p-2 rounded-xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0]/60 group-hover:scale-110 transition-transform">
                        {node.icon}
                      </div>
                      <div>
                        <div className="text-sm font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                          {node.label}
                        </div>
                        <div className="text-[11px] font-mono font-semibold text-[#2e936f]">
                          {node.tech}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </AnimatedSection>

            {/* Right Interactive Core Display Panel */}
            <AnimatedSection delay={0.2} className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-[2.5rem] bg-white dark:bg-[#101b17] border-2 border-[#f15e1c] shadow-2xl space-y-6 relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-40 h-40 bg-radial from-[#f15e1c]/15 via-transparent to-transparent pointer-events-none" />

                <div className="flex items-center justify-between border-b border-[#f7d7b0] dark:border-[#253630] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0]">
                      {connectedDigitalCoreNodes[activeCoreNode].icon}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-black text-[#f15e1c] block">
                        DIGITAL CORE CONNECTOR &bull; AREA 0{activeCoreNode + 1}
                      </span>
                      <h3 className="text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                        {connectedDigitalCoreNodes[activeCoreNode].label}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#2e936f] px-3 py-1 rounded-full bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0]">
                    CONNECTED
                  </span>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono font-extrabold uppercase text-[#7A6A5F] block">
                    Architecture Specification:
                  </span>
                  <p className="text-base sm:text-lg text-[#1b2823] dark:text-[#ffffff] leading-relaxed font-medium">
                    {connectedDigitalCoreNodes[activeCoreNode].capability}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630] flex flex-wrap items-center justify-between gap-4 text-xs font-mono font-bold">
                  <span className="text-[#2e936f] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Integrated into Arav Blueprint
                  </span>
                  <a href="#inquire" className="text-[#f15e1c] hover:underline flex items-center gap-1">
                    Inquire About {connectedDigitalCoreNodes[activeCoreNode].label} &rarr;
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 04 — CAPABILITIES
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none">
        <div className="max-w-[1536px] mx-auto space-y-12">
          
          <AnimatedSection className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              CORE CAPABILITIES
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              ENTERPRISE CAPABILITIES
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Structured consulting and engineering services designed for predictable transformation.
            </p>
          </AnimatedSection>

          {/* 4 Premium Large Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {capabilityGroups.map((group, idx) => (
              <AnimatedSection key={group.id} delay={0.1 * idx}>
                <TiltCard maxTilt={3} scale={1.015}>
                  <div
                    className="h-full p-8 rounded-[2.5rem] border-2 shadow-lg transition-all duration-300 space-y-6 text-left flex flex-col justify-between group hover:shadow-2xl"
                    style={{
                      backgroundColor: "rgba(254, 250, 245, 0.85)",
                      borderColor: "#f7d7b0",
                    }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div
                          className="p-3.5 rounded-2xl border transition-transform group-hover:scale-105"
                          style={{ backgroundColor: group.bgAccent, borderColor: group.accent }}
                        >
                          {group.icon}
                        </div>
                        <span
                          className="text-xs font-mono font-black px-3 py-1 rounded-full border"
                          style={{ color: group.accent, borderColor: group.accent, backgroundColor: "#FFFFFF" }}
                        >
                          {group.category}
                        </span>
                      </div>

                      <h3 className="text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                        {group.category.replace(/^[0-9]+\s*/, "")}
                      </h3>

                      <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                        {group.description}
                      </p>

                      <div className="space-y-2.5 pt-2">
                        <span className="text-xs font-mono font-extrabold uppercase text-[#1b2823] dark:text-[#ffffff] block">
                          Verified Capabilities:
                        </span>
                        <div className="space-y-2">
                          {group.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#1b2823] dark:text-[#ffffff]">
                              <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630]">
                      <a href="#inquire" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#f15e1c] group-hover:translate-x-1.5 transition-transform">
                        <span>Request Capability Overview</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 05 — HOW WE WORK (UNIFIED TRANSFORMATION JOURNEY)
          ========================================================================= */}
      <section
        id="how-we-work"
        ref={processContainerRef}
        className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#fefaf5] dark:bg-[#172420] select-none"
      >
        <div className="max-w-[1536px] mx-auto space-y-12">
          
          <AnimatedSection className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              UNIFIED METHODOLOGY
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              HOW WE WORK
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              A continuous 5-stage transformation journey from legacy diagnostic to sustained 24/7 optimization.
            </p>
          </AnimatedSection>

          {/* Continuous Scroll Progress Track */}
          <AnimatedSection delay={0.1} className="max-w-5xl mx-auto relative py-4">
            <div className="w-full bg-[#f7d7b0] dark:bg-[#253630] h-2.5 rounded-full overflow-hidden">
              <motion.div
                style={{ width: processLineWidth }}
                className="h-full bg-gradient-to-r from-[#f15e1c] via-[#2e936f] to-[#fab60a]"
              />
            </div>

            {/* 5 Stage Node Buttons along the Rail */}
            <div className="flex justify-between items-center absolute inset-x-0 -top-2.5">
              {processTimelineStages.map((st, idx) => {
                const isActive = activeProcessIdx === idx;
                const isPassed = idx <= activeProcessIdx;

                return (
                  <button
                    key={st.num}
                    type="button"
                    onClick={() => setActiveProcessIdx(idx)}
                    className={cn(
                      "w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center text-xs sm:text-sm font-mono font-black cursor-pointer shrink-0",
                      isActive
                        ? "bg-[#f15e1c] border-white text-white scale-125 shadow-lg shadow-[#f15e1c]/40 ring-4 ring-[#f15e1c]/20 z-10"
                        : isPassed
                        ? "bg-[#2e936f] border-white text-white"
                        : "bg-white dark:bg-[#101b17] border-[#f7d7b0] dark:border-[#253630] text-[#7A6A5F]"
                    )}
                  >
                    {isPassed && !isActive ? <Check className="w-4 h-4 text-white" /> : st.num}
                  </button>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Active Stage Card */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProcessIdx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="p-8 sm:p-12 rounded-[2.5rem] bg-white dark:bg-[#101b17] border-2 border-[#f15e1c] shadow-2xl space-y-6 text-left"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#253630] pb-4">
                  <div>
                    <span className="text-xs font-mono font-black text-[#f15e1c] uppercase tracking-wider block">
                      STAGE {processTimelineStages[activeProcessIdx].num} / 05 &bull; {processTimelineStages[activeProcessIdx].title}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mt-1">
                      {processTimelineStages[activeProcessIdx].subtitle}
                    </h3>
                  </div>
                  <span className="px-4 py-2 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] text-xs font-mono font-bold text-[#2e936f] shrink-0">
                    PHASE DELIVERABLE
                  </span>
                </div>

                <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  {processTimelineStages[activeProcessIdx].description}
                </p>

                <div className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold text-[#7A6A5F] uppercase">Target Artifact:</span>
                  <span className="text-xs sm:text-sm font-bold text-[#f15e1c]">
                    {processTimelineStages[activeProcessIdx].deliverable}
                  </span>
                </div>

                {/* Quick Stage Switcher */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {processTimelineStages.map((st, idx) => (
                    <button
                      key={st.num}
                      type="button"
                      onClick={() => setActiveProcessIdx(idx)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer",
                        activeProcessIdx === idx
                          ? "bg-[#f15e1c] text-white"
                          : "bg-[#fefaf5] dark:bg-[#172420] text-[#7A6A5F] border border-[#f7d7b0]"
                      )}
                    >
                      {st.num} {st.title}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 06 — TECHNOLOGY / EXPERTISE (CONSTELLATION VISUAL)
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none">
        <div className="max-w-[1536px] mx-auto space-y-12">
          
          <AnimatedSection className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              VERIFIED ARCHITECTURAL STACK
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              TECHNOLOGY &amp; EXPERTISE
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Battle-tested enterprise technologies implemented across high-concurrency production systems.
            </p>
          </AnimatedSection>

          {/* Constellation Center Showcase */}
          <AnimatedSection delay={0.15} className="max-w-5xl mx-auto p-8 sm:p-12 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl space-y-8">
            
            {/* Center Core Engine */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#101b17] border-2 border-[#f15e1c] shadow-lg max-w-md mx-auto text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#f15e1c] text-white flex items-center justify-center mx-auto shadow-md">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                ARAV IT ENGINE
              </h3>
              <p className="text-xs font-mono font-bold text-[#2e936f]">
                ENTERPRISE STACK INTEGRATION
              </p>
            </div>

            {/* Category Selector Tabs */}
            <div className="flex flex-wrap justify-center gap-3">
              {verifiedTechConstellation.map((cat, idx) => (
                <motion.button
                  key={cat.category}
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTechCat(idx)}
                  className={cn(
                    "px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold font-display transition-all cursor-pointer flex items-center gap-2 border-2",
                    activeTechCat === idx
                      ? "bg-white dark:bg-[#101b17] border-[#f15e1c] text-[#f15e1c] shadow-md ring-2 ring-[#f15e1c]/20"
                      : "bg-white/60 dark:bg-[#101b17]/60 border-[#f7d7b0] dark:border-[#253630] text-[#1b2823] dark:text-[#ffffff]"
                  )}
                >
                  {cat.icon}
                  <span>{cat.category}</span>
                </motion.button>
              ))}
            </div>

            {/* Active Stack Item Badges */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTechCat}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4"
              >
                {verifiedTechConstellation[activeTechCat].items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3 }}
                    className="p-4 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] text-center shadow-xs flex items-center justify-center gap-2 group hover:border-[#f15e1c] transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#1b2823] dark:text-[#ffffff]">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </AnimatedSection>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 07 — OUTCOMES (WITH PROGRESS HIGHLIGHTS)
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#fefaf5] dark:bg-[#172420] select-none">
        <div className="max-w-[1536px] mx-auto space-y-12">
          
          <AnimatedSection className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              MEASURABLE RESULTS
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              WHAT BETTER IT SHOULD DELIVER
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Clear operational and financial improvements delivered across enterprise engagements.
            </p>
          </AnimatedSection>

          {/* 4 Outcome Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {verifiedOutcomesData.map((out, idx) => (
              <AnimatedSection key={idx} delay={0.1 * idx}>
                <TiltCard maxTilt={4} scale={1.015}>
                  <div className="h-full p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#101b17] border-2 border-[#f7d7b0] dark:border-[#253630] hover:border-[#f15e1c] shadow-md hover:shadow-xl transition-all duration-300 space-y-4 text-left flex flex-col justify-between group overflow-hidden relative">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] group-hover:scale-105 transition-transform">
                          {out.icon}
                        </div>
                        <span className="text-[#2e936f] text-xs font-bold font-mono">
                          VERIFIED BENCHMARK
                        </span>
                      </div>

                      <h3 className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-wider">
                        {out.headline}
                      </h3>

                      <div className="text-3xl sm:text-4xl font-black font-mono text-[#1b2823] dark:text-[#ffffff]">
                        {out.metric}
                      </div>

                      <div className="text-xs font-mono font-bold text-[#2e936f]">
                        {out.metricLabel}
                      </div>

                      <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed pt-1">
                        {out.description}
                      </p>
                    </div>

                    {/* Outcome Metric Progress Line */}
                    <div className="w-full bg-[#f7d7b0]/40 dark:bg-[#253630] h-1.5 rounded-full overflow-hidden mt-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: out.progressWidth }}
                        transition={{ duration: 1, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-[#f15e1c] to-[#2e936f]"
                      />
                    </div>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 08 — CASE STUDY / PROOF
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none">
        <div className="max-w-[1536px] mx-auto space-y-12">
          
          <AnimatedSection className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              VERIFIED PROOF
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              ENTERPRISE CASE STUDY
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              See how we transformed a global enterprise from legacy bottlenecks to a high-availability cloud architecture.
            </p>
          </AnimatedSection>

          {/* Structured Case Study Card */}
          <AnimatedSection delay={0.15} className="max-w-5xl mx-auto">
            <div className="p-8 sm:p-12 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl space-y-8 text-left">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#253630] pb-6">
                <div>
                  <span className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-wider block">
                    {verifiedCaseStudy.clientIndustry} &bull; {verifiedCaseStudy.location}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mt-1">
                    {verifiedCaseStudy.title}
                  </h3>
                </div>
                <span className="px-4 py-2 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] text-xs font-mono font-bold text-[#2e936f] shrink-0">
                  VERIFIED CASE STUDY
                </span>
              </div>

              {/* 4 Storytelling Pillars: CHALLENGE -> ARAV APPROACH -> IMPLEMENTATION -> RESULT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div whileHover={{ y: -3 }} className="p-5 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] space-y-2 transition-shadow hover:shadow-md">
                  <span className="text-xs font-mono font-black text-[#f15e1c] block">01 CHALLENGE</span>
                  <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                    {verifiedCaseStudy.challenge}
                  </p>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} className="p-5 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] space-y-2 transition-shadow hover:shadow-md">
                  <span className="text-xs font-mono font-black text-[#fab60a] block">02 ARAV APPROACH</span>
                  <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                    {verifiedCaseStudy.approach}
                  </p>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} className="p-5 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] space-y-2 transition-shadow hover:shadow-md">
                  <span className="text-xs font-mono font-black text-[#2e936f] block">03 IMPLEMENTATION</span>
                  <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                    {verifiedCaseStudy.solution}
                  </p>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} className="p-5 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] space-y-2 transition-shadow hover:shadow-md">
                  <span className="text-xs font-mono font-black text-[#f15e1c] block">04 VERIFIED RESULT</span>
                  <div className="space-y-1">
                    {verifiedCaseStudy.results.map((res, idx) => (
                      <div key={idx} className="text-xs font-mono font-bold text-[#1b2823] dark:text-[#ffffff]">
                        &bull; <span className="text-[#f15e1c] font-black">{res.metric}</span> {res.label}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono text-[#7A6A5F]">
                  Technologies: {verifiedCaseStudy.technologiesUsed.join(" • ")}
                </div>
                <Link href="/case-studies">
                  <Button3D variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}>
                    Explore All Case Studies
                  </Button3D>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 09 — TESTIMONIAL
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#fefaf5] dark:bg-[#172420]">
        <div className="max-w-[1536px] mx-auto text-center space-y-8">
          <AnimatedSection className="space-y-2">
            <Badge variant="secondary" size="md">
              EXECUTIVE ENDORSEMENT
            </Badge>
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="max-w-4xl mx-auto">
            <div className="p-8 sm:p-14 lg:p-16 rounded-[2.5rem] bg-white dark:bg-[#101b17] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl space-y-6 relative overflow-hidden">
              <div className="p-3 rounded-2xl bg-[#f15e1c] text-white w-fit mx-auto shadow-md">
                <Quote className="w-6 h-6" />
              </div>

              <p className="text-xl sm:text-2xl lg:text-3xl font-display font-medium text-[#1b2823] dark:text-[#ffffff] leading-relaxed italic">
                &ldquo;{verifiedTestimonial.quote}&rdquo;
              </p>

              <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630] space-y-1">
                <div className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                  {verifiedTestimonial.author}
                </div>
                <div className="text-xs text-[#f15e1c] font-bold font-mono">
                  {verifiedTestimonial.designation} &bull; {verifiedTestimonial.company}
                </div>
                <div className="text-xs font-mono font-bold text-[#2e936f] pt-1">
                  Project Context: Enterprise IT Strategy &amp; Modernization Engagement
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 10 — FAQ
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none">
        <div className="max-w-[1536px] mx-auto space-y-12">
          
          <AnimatedSection className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              CLEAR ANSWERS
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Specific answers regarding our IT Strategy &amp; Implementation practice.
            </p>
          </AnimatedSection>

          {/* Accordion List */}
          <div className="max-w-4xl mx-auto space-y-4 text-left">
            {itStrategyFaqs.map((faq, idx) => {
              const isOpen = activeFaqIdx === idx;
              return (
                <AnimatedSection key={idx} delay={0.05 * idx}>
                  <div className="rounded-2xl border-2 transition-all duration-300 overflow-hidden bg-[#fefaf5] dark:bg-[#172420] border-[#f7d7b0] dark:border-[#253630]">
                    <button
                      type="button"
                      onClick={() => setActiveFaqIdx(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-base sm:text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-[#f15e1c] shrink-0 transition-transform duration-300",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="px-5 pb-6 sm:px-6 text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed border-t border-[#f7d7b0]/50 dark:border-[#253630]"
                        >
                          <div className="pt-4">{faq.a}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11 — FINAL CTA
          ========================================================================= */}
      <section id="inquire" className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 select-none">
        <div className="max-w-[1536px] mx-auto space-y-8">
          
          <AnimatedSection>
            <div className="rounded-[3rem] bg-gradient-to-br from-[#f15e1c] via-[#e55215] to-[#d8480d] text-white p-10 sm:p-16 border-2 border-[#fab60a] shadow-2xl space-y-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
                  <Sparkles className="w-4 h-4 text-[#ffec69]" />
                  <span>START YOUR IT MODERNIZATION</span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
                  READY TO MODERNIZE YOUR IT?
                </h2>

                <p className="text-base sm:text-lg text-white/90 leading-relaxed font-medium">
                  Tell us where your technology stands today. Start a conversation about the right strategy, architecture and implementation path for your organization.
                </p>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link href="/contact" className="w-full sm:w-auto">
                  <MagneticButton className="w-full sm:w-auto">
                    <Button3D
                      variant="primary"
                      size="lg"
                      rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />}
                      className="w-full sm:w-auto justify-center bg-white text-[#f15e1c] hover:bg-[#f7d7b0]"
                    >
                      TALK TO AN IT EXPERT
                    </Button3D>
                  </MagneticButton>
                </Link>

                <a
                  href="https://api.whatsapp.com/send?phone=971521555792&text=Hello%20Arav%20Innovations%2C%20I%27d%20like%20to%20discuss%20our%20IT%20strategy%20and%20architecture%20requirements."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <MagneticButton className="w-full sm:w-auto">
                    <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center text-white border-white/60 hover:bg-white/10">
                      DISCUSS YOUR REQUIREMENTS
                    </Button3D>
                  </MagneticButton>
                </a>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-white/90 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Strict SLA Protection
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> 100% Code &amp; IP Ownership
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Regional Squads in Gurgaon &amp; Dubai
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer Brand Pathway Moment */}
      <footer className="py-6 border-t border-[#f7d7b0]/60 dark:border-[#253630] bg-[#fefaf5] dark:bg-[#172420] overflow-hidden select-none">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono font-extrabold text-[#7A6A5F] dark:text-[#B8ACA0] tracking-widest px-4">
          <span>01 ASSESS</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>02 STRATEGIZE</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>03 ARCHITECT</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>04 IMPLEMENT</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>05 OPTIMIZE</span>
        </div>
      </footer>
    </main>
  );
}

export default ITStrategyInteractivePage;
