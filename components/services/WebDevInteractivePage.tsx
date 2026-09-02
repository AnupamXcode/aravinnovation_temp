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
  Code2,
  Layout,
  ShoppingBag,
  Cpu,
  Server,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Quote,
  Globe2,
  Zap,
  Check,
  Activity,
  Database,
  Lock,
  Cloud,
  RefreshCw,
  Eye,
  LineChart,
  FileCode,
  ShieldCheck,
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

interface WebDevPageProps {
  service: Service;
}

// -----------------------------------------------------------------------------
// 1. System Scan Transition Line (Subtle sweeping scan line between sections)
// -----------------------------------------------------------------------------
function SystemScanTransition() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative w-full h-px my-4 overflow-hidden pointer-events-none select-none">
      <div className="w-full h-full bg-[#f7d7b0]/30 dark:bg-[#1a1a1a]" />
      {!shouldReduceMotion && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "100%" } : {}}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#f15e1c] to-transparent shadow-[0_0_8px_#f15e1c]"
        />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 2. Hero Component Assembly Background (Abstract UI Product Assembly)
// -----------------------------------------------------------------------------
function ComponentAssemblyBackground() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-25 select-none">
      <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none">
        <defs>
          <linearGradient id="comp-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f15e1c" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#2e936f" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fab60a" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Abstract Component Outlines & Connection Paths */}
        <motion.rect
          x="100" y="80" width="220" height="40" rx="8"
          stroke="url(#comp-grad)" strokeWidth="1.5" strokeDasharray="4 4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.rect
          x="880" y="90" width="200" height="120" rx="12"
          stroke="url(#comp-grad)" strokeWidth="1.5"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        <motion.rect
          x="120" y="380" width="260" height="140" rx="12"
          stroke="url(#comp-grad)" strokeWidth="1.5"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.rect
          x="840" y="360" width="240" height="160" rx="12"
          stroke="url(#comp-grad)" strokeWidth="1.5" strokeDasharray="4 4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />

        {/* Assembly Signal Connection Paths */}
        <motion.path
          d="M 320 100 L 600 100 L 600 200"
          stroke="#f15e1c" strokeWidth="1.5" strokeDasharray="3 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />
        <motion.path
          d="M 880 150 L 600 150 L 600 300"
          stroke="#2e936f" strokeWidth="1.5" strokeDasharray="3 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
        />

        {/* Floating UI Badges */}
        <g transform="translate(180, 160)">
          <rect width="100" height="24" rx="6" fill="#f15e1c" fillOpacity="0.15" stroke="#f15e1c" strokeWidth="1" />
          <text x="12" y="16" fill="#f15e1c" fontSize="10" fontFamily="monospace" fontWeight="bold">UI &bull; NEXT.JS</text>
        </g>
        <g transform="translate(900, 230)">
          <rect width="120" height="24" rx="6" fill="#2e936f" fillOpacity="0.15" stroke="#2e936f" strokeWidth="1" />
          <text x="12" y="16" fill="#2e936f" fontSize="10" fontFamily="monospace" fontWeight="bold">REST &bull; GRAPHQL</text>
        </g>
        <g transform="translate(140, 330)">
          <rect width="130" height="24" rx="6" fill="#fab60a" fillOpacity="0.15" stroke="#fab60a" strokeWidth="1" />
          <text x="12" y="16" fill="#fab60a" fontSize="10" fontFamily="monospace" fontWeight="bold">POSTGRES &bull; KAFKA</text>
        </g>
      </svg>
    </div>
  );
}

// -----------------------------------------------------------------------------
// 3. Metric Counter Number Component (Viewport Ease-Out Count-Up)
// -----------------------------------------------------------------------------
function CounterNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = React.useState<string>(
    shouldReduceMotion ? value.toFixed(decimals) : (0).toFixed(decimals)
  );

  React.useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      setDisplayValue(value.toFixed(decimals));
      return;
    }

    let startTimestamp: number | null = null;
    const duration = 1600;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = easeProgress * value;

      setDisplayValue(current.toFixed(decimals));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animFrame);
  }, [isInView, value, decimals, shouldReduceMotion]);

  return (
    <span ref={ref} className="tabular-nums font-mono font-black">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

// -----------------------------------------------------------------------------
// Data Collections
// -----------------------------------------------------------------------------
const webDevSolutionsData = [
  {
    numStr: "01",
    title: "Design & Development",
    subtitle: "Responsive, User-Centric Websites & Web Apps",
    description:
      "We specialize in creating responsive, user-centric websites and applications engineered for high performance, intuitive UX, and seamless accessibility across all viewports.",
    icon: <Code2 className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Figma Wireframes & Interactive UI Prototypes",
      "Next.js / React High-Performance Architecture",
      "Sub-Second Page Load Optimization",
      "Accessible & Responsive Design System",
    ],
    metric: "99/100",
    metricLabel: "Core Web Vitals Performance",
    stageName: "UI & FRONTEND ARCHITECTURE",
    pipelineStep: "DISCOVERY → WIREFRAME → FRONTEND",
  },
  {
    numStr: "02",
    title: "E-Commerce Solutions",
    subtitle: "Scalable Platforms & High-Converting Checkout",
    description:
      "From small businesses to large enterprises, we build scalable e-commerce platforms that offer seamless shopping experiences, multi-currency checkout, and instant inventory sync.",
    icon: <ShoppingBag className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Custom Shopify / Headless Commerce Engines",
      "Stripe, Razorpay & International Payment Gateways",
      "Real-Time Inventory & ERP Integration",
      "Frictionless One-Page Checkout Experience",
    ],
    metric: "3.8x",
    metricLabel: "Checkout Conversion Increase",
    stageName: "COMMERCE PIPELINE",
    pipelineStep: "CHECKOUT → PAYMENTS → INVENTORY",
  },
  {
    numStr: "03",
    title: "Custom Application Development",
    subtitle: "Bespoke Web, Mobile & Desktop Platforms",
    description:
      "We develop tailored applications that align with your business objectives, whether for web, mobile (iOS/Android), or desktop, with decoupled REST & GraphQL APIs.",
    icon: <Cpu className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Cross-Platform React Native / Web Applications",
      "Decoupled Microservices & GraphQL APIs",
      "PostgreSQL / MongoDB Cloud Data Schemas",
      "Zero-Trust Auth & RBAC Security Control",
    ],
    metric: "100%",
    metricLabel: "Custom Code & IP Ownership",
    stageName: "APPLICATION CORE",
    pipelineStep: "FRONTEND → BACKEND API → DATABASE",
  },
  {
    numStr: "04",
    title: "Maintenance & Support",
    subtitle: "Post-Launch Care & Continuous Telemetry",
    description:
      "Our commitment doesn’t end at launch. We offer ongoing maintenance and support to ensure your website or application remains secure, updated, and performing at its best.",
    icon: <Server className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "24/7 Automated Vulnerability & Uptime Scans",
      "Continuous Dependency & Security Patching",
      "15-Minute Critical Incident SLA Guarantee",
      "Regular Feature Updates & Version Sprints",
    ],
    metric: "99.99%",
    metricLabel: "Guaranteed Production Uptime",
    stageName: "LIFECYCLE SUPPORT",
    pipelineStep: "MONITORING → SLA → NEW VERSION",
  },
];

const howWeWorkSteps = [
  {
    step: "01",
    title: "Discovery and Planning",
    subtitle: "Product Architecture & Scope Alignment",
    description:
      "We start by understanding your vision, requirements, and objectives. Our team collaborates closely with you to define the project scope, goals, and technology stack for optimal results.",
    output: "Project Scope & Tech Stack Blueprint",
  },
  {
    step: "02",
    title: "Design and Development",
    subtitle: "Intuitive UI & Scalable Codebase",
    description:
      "Our designers create an intuitive and visually appealing user interface, while our developers build a secure, high-performance backend that brings your vision to life across devices.",
    output: "UI Prototypes & Full-Stack Codebase",
  },
  {
    step: "03",
    title: "Quality Assurance and Testing",
    subtitle: "Rigorously Validated Software Engineering",
    description:
      "Every feature and functionality is rigorously tested to ensure a flawless user experience. From security to usability, we leave no stone unturned.",
    output: "QA Validation & Penetration Audit",
    qaChecks: [
      { name: "FUNCTIONAL VALIDATION", status: "PASSED" },
      { name: "SECURITY & PENETRATION", status: "VERIFIED" },
      { name: "CORE WEB VITALS PERFORMANCE", status: "99/100" },
      { name: "USABILITY & UX TEST", status: "APPROVED" },
      { name: "ACCESSIBILITY (WCAG 2.1)", status: "COMPLIANT" },
    ],
  },
  {
    step: "04",
    title: "Launch and Ongoing Support",
    subtitle: "Zero-Downtime Deployment & 24/7 SLA",
    description:
      "After a smooth launch, we provide continuous support and maintenance to keep your web or app solution updated, secure, and optimized for evolving needs.",
    output: "Zero-Downtime Deployment & 24/7 SLA",
    launchSteps: [
      { label: "BUILD", check: true },
      { label: "TEST", check: true },
      { label: "READY", check: true },
      { label: "DEPLOY", check: true },
      { label: "LIVE ●", isLive: true },
    ],
  },
];

const productCoreFrames = [
  { frame: "01", title: "UI ARCHITECTURE", desc: "Responsive React / Next.js Component Layer", icon: <Layout className="w-5 h-5 text-[#f15e1c]" /> },
  { frame: "02", title: "REST & GRAPHQL API", desc: "Decoupled Microservice Communication", icon: <FileCode className="w-5 h-5 text-[#2e936f]" /> },
  { frame: "03", title: "DATABASE SCHEMAS", desc: "PostgreSQL & Kafka Event Stream Schemas", icon: <Database className="w-5 h-5 text-[#fab60a]" /> },
  { frame: "04", title: "SECURITY & AUTH", desc: "Zero-Trust OAuth2 & RBAC Access Controls", icon: <Lock className="w-5 h-5 text-[#f15e1c]" /> },
  { frame: "05", title: "CLOUD DEPLOYMENT", desc: "Containerized Multi-Region Kubernetes Pods", icon: <Cloud className="w-5 h-5 text-[#2e936f]" /> },
  { frame: "06", title: "MONITORING & TELEMETRY", desc: "24/7 Log Telemetry & Automated Threat Detection", icon: <Activity className="w-5 h-5 text-[#fab60a]" /> },
];

const continuousLoopSteps = [
  { id: "launch", name: "LAUNCH", desc: "Zero-Downtime Cutover" },
  { id: "monitor", name: "MONITOR", desc: "24/7 Telemetry & Logs" },
  { id: "learn", name: "LEARN", desc: "User Analytics & Feedback" },
  { id: "improve", name: "IMPROVE", desc: "Feature Refactoring" },
  { id: "version", name: "NEW VERSION", desc: "Continuous Release Sprint" },
];

const ctaWords = ["PRODUCT", "CODEBASE", "UI EXPERIENCE", "API TOPOLOGY", "DEPLOYMENT"];

export function WebDevInteractivePage({ service }: WebDevPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeSolutionIdx, setActiveSolutionIdx] = React.useState<number>(0);
  const [activeWorkIdx, setActiveWorkIdx] = React.useState<number>(0);
  const [currentWordIdx, setCurrentWordIdx] = React.useState<number>(0);

  // ---------------------------------------------------------------------------
  // 1. Product Core Engine Scroll Progression (Frame 01 -> Frame 06)
  // ---------------------------------------------------------------------------
  const coreContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: coreProgress } = useScroll({
    target: coreContainerRef,
    offset: ["start 80%", "end 20%"],
  });
  const smoothCoreProgress = useSpring(coreProgress, { stiffness: 45, damping: 25 });
  const [activeCoreFrame, setActiveCoreFrame] = React.useState<number>(0);

  React.useEffect(() => {
    const unsub = smoothCoreProgress.on("change", (v) => {
      const count = productCoreFrames.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedFrame = Math.floor(normalized * count);
      setActiveCoreFrame(calculatedFrame);
    });
    return () => unsub();
  }, [smoothCoreProgress]);

  // ---------------------------------------------------------------------------
  // 2. 4-Stage Software Release Timeline Scroll Line
  // ---------------------------------------------------------------------------
  const timelineContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineContainerRef,
    offset: ["start 80%", "end 20%"],
  });
  const smoothTimelineProgress = useSpring(timelineProgress, { stiffness: 45, damping: 25 });
  const timelineLineWidth = useTransform(smoothTimelineProgress, [0, 1], ["0%", "100%"]);

  React.useEffect(() => {
    const unsub = smoothTimelineProgress.on("change", (v) => {
      const count = howWeWorkSteps.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedIdx = Math.floor(normalized * count);
      setActiveWorkIdx(calculatedIdx);
    });
    return () => unsub();
  }, [smoothTimelineProgress]);

  // ---------------------------------------------------------------------------
  // 3. Continuous Product Loop Signal Motion
  // ---------------------------------------------------------------------------
  const loopContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: loopProgress } = useScroll({
    target: loopContainerRef,
    offset: ["start end", "end start"],
  });
  const smoothLoopProgress = useSpring(loopProgress, { stiffness: 45, damping: 25 });
  const [activeLoopStep, setActiveLoopStep] = React.useState<number>(0);

  React.useEffect(() => {
    const unsub = smoothLoopProgress.on("change", (v) => {
      const count = continuousLoopSteps.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedIdx = Math.floor(normalized * count);
      setActiveLoopStep(calculatedIdx);
    });
    return () => unsub();
  }, [smoothLoopProgress]);

  // ---------------------------------------------------------------------------
  // 4. Parallax Background Typography for Product Engineering
  // ---------------------------------------------------------------------------
  const missionRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: missionProgress } = useScroll({
    target: missionRef,
    offset: ["start end", "end start"],
  });
  const backgroundTextX1 = useTransform(missionProgress, [0, 1], ["-10%", "10%"]);
  const backgroundTextX2 = useTransform(missionProgress, [0, 1], ["10%", "-10%"]);

  // InView references
  const statementRef = React.useRef<HTMLDivElement>(null);
  const isStatementInView = useInView(statementRef, { once: true, margin: "-80px" });

  const testimonialRef = React.useRef<HTMLDivElement>(null);
  const isTestimonialInView = useInView(testimonialRef, { once: true, margin: "-60px" });

  // Rotating CTA Word Timer
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIdx((prev) => (prev + 1) % ctaWords.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const activeSolution = webDevSolutionsData[activeSolutionIdx];
  const activeWorkStep = howWeWorkSteps[activeWorkIdx];
  const testimonial = testimonialsData.find((t) => t.id === "test-2") || testimonialsData[1];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#000000] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden selection:bg-[#f15e1c]/20 selection:text-[#f15e1c]">
      
      {/* =========================================================================
          1. HERO — "PRODUCT COMING TO LIFE" & COMPONENT ASSEMBLY VISUAL
          ========================================================================= */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] overflow-hidden select-none">
        <ComponentAssemblyBackground />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-radial from-[#f15e1c]/10 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-radial from-[#2e936f]/8 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-[1536px] mx-auto w-full space-y-6 relative z-10">
          {/* Top Breadcrumb & Badge */}
          <div className="space-y-3">
            <Breadcrumb
              items={[
                { label: "Services", href: "/services" },
                { label: "Web & Application Development" },
              ]}
            />
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fce3d3] dark:bg-[#161616] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]"
            >
              <Sparkles className="w-4 h-4" />
              <span>FULL-STACK WEB &amp; APP ENGINEERING</span>
            </motion.div>
          </div>

          {/* Headline & Stable Hero Copy */}
          <div className="max-w-5xl mx-auto w-full text-center space-y-5 pt-4 pb-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold font-display tracking-tight leading-[1.08] text-[#1b2823] dark:text-[#ffffff]"
            >
              WEB &amp; APPLICATION DEVELOPMENT
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-base sm:text-xl lg:text-2xl text-[#4a5c55] dark:text-[#d3eee4] max-w-3xl mx-auto font-medium leading-relaxed"
            >
              From high-conversion web experiences to complex enterprise applications, we build scalable digital products engineered around real business workflows.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto">
                  <Button3D
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />}
                    className="w-full sm:w-auto justify-center shadow-lg shadow-[#f15e1c]/25"
                  >
                    Discuss a Project
                  </Button3D>
                </MagneticButton>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto">
                  <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center">
                    Explore Services
                  </Button3D>
                </MagneticButton>
              </Link>
            </motion.div>
          </div>

          {/* Component Assembly Preview Strip */}
          <div className="pt-6 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 p-3 rounded-2xl bg-white/80 dark:bg-[#000000]/80 border border-[#f7d7b0] dark:border-[#1a1a1a] backdrop-blur-md shadow-lg text-xs font-mono font-bold text-[#f15e1c]">
              <span className="px-2.5 py-1 rounded-lg bg-[#fce3d3] dark:bg-[#161616]">[ BUTTON ]</span>
              <span className="text-[#7A6A5F]">&rarr;</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#fce3d3] dark:bg-[#161616]">[ CARD ]</span>
              <span className="text-[#7A6A5F]">&rarr;</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#fce3d3] dark:bg-[#161616]">[ API ]</span>
              <span className="text-[#7A6A5F]">&rarr;</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#fce3d3] dark:bg-[#161616]">[ DATA ]</span>
              <span className="text-[#2e936f]">&rarr;</span>
              <span className="px-3 py-1 rounded-lg bg-[#2e936f] text-white">[ DIGITAL PRODUCT ]</span>
            </div>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          2. PRODUCT CORE ENGINE — MAIN SIGNATURE INTERACTION
          ========================================================================= */}
      <section
        id="product-core"
        ref={coreContainerRef}
        className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] select-none"
      >
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              SIGNATURE VISUAL INTERACTION
            </Badge>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Product Core Engine
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Scroll down to watch a production-ready application evolve across full-stack engineering layers.
            </p>
          </div>

          {/* Signature Evolving Digital Product Interface */}
          <div className="rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl p-6 sm:p-12 space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-[#f15e1c]/8 via-transparent to-transparent pointer-events-none" />

            {/* Active Core Layer Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#f15e1c] text-white shadow-md shadow-[#f15e1c]/30">
                  {productCoreFrames[activeCoreFrame].icon}
                </div>
                <div>
                  <span className="text-xs font-mono font-black text-[#f15e1c] uppercase tracking-wider block">
                    LAYER {productCoreFrames[activeCoreFrame].frame} / 06 &bull; {productCoreFrames[activeCoreFrame].title}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                    {productCoreFrames[activeCoreFrame].desc}
                  </h3>
                </div>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] text-xs font-mono font-bold text-[#2e936f] shadow-xs">
                PRODUCTION-READY SOFTWARE
              </div>
            </div>

            {/* 6 Surrounding System Layer Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {productCoreFrames.map((frame, idx) => {
                const isActive = activeCoreFrame === idx;
                const isPassed = idx <= activeCoreFrame;

                return (
                  <TiltCard key={frame.frame} maxTilt={4} scale={1.01}>
                    <div
                      onClick={() => setActiveCoreFrame(idx)}
                      className={cn(
                        "p-6 rounded-2xl border-2 transition-all duration-300 text-left space-y-3 cursor-pointer relative overflow-hidden group",
                        isActive
                          ? "bg-white dark:bg-[#000000] border-[#f15e1c] shadow-xl ring-2 ring-[#f15e1c]/20"
                          : isPassed
                          ? "bg-white/80 dark:bg-[#000000]/80 border-[#2e936f] opacity-90"
                          : "bg-white/40 dark:bg-[#000000]/40 border-[#f7d7b0] dark:border-[#1a1a1a] opacity-60 hover:opacity-100"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0]/60">
                          {frame.icon}
                        </div>
                        <span
                          className={cn(
                            "text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full",
                            isActive
                              ? "bg-[#f15e1c] text-white"
                              : isPassed
                              ? "bg-[#2e936f] text-white"
                              : "bg-[#fce3d3] text-[#f15e1c]"
                          )}
                        >
                          FRAME {frame.frame}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                          {frame.title}
                        </h4>
                        <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] mt-0.5 leading-relaxed">
                          {frame.desc}
                        </p>
                      </div>

                      <div className="w-full h-1 rounded-full bg-[#f7d7b0]/40 dark:bg-[#1a1a1a] overflow-hidden">
                        <div
                          className={cn(
                            "w-full h-full bg-[#f15e1c] transition-transform duration-300 origin-left",
                            isPassed ? "scale-x-100" : "scale-x-0"
                          )}
                        />
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          3. OUR SOLUTIONS — PRODUCT BUILD PIPELINE & HOVER EXPANSION
          ========================================================================= */}
      <section id="our-solutions" className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-12 select-none">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              PRODUCT BUILD PIPELINE
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Transform Ideas into Digital Solutions
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Hover or click below to explore each development discipline and its build pipeline.
            </p>
          </div>

          {/* Build Pipeline Progress Strip */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-sm max-w-5xl mx-auto flex items-center justify-between overflow-x-auto gap-2">
            {[
              { num: "01", label: "DISCOVERY" },
              { num: "02", label: "WIREFRAME" },
              { num: "03", label: "FRONTEND" },
              { num: "04", label: "BACKEND API" },
              { num: "05", label: "PRODUCTION" },
            ].map((st, i) => (
              <div
                key={st.num}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold shrink-0 transition-all",
                  i <= activeSolutionIdx + 1
                    ? "bg-[#f15e1c] text-white shadow-xs"
                    : "bg-[#fefaf5] dark:bg-[#0a0a0a] text-[#7A6A5F] border border-[#f7d7b0]"
                )}
              >
                <span>{st.num}</span>
                <span>{st.label}</span>
                {i < 4 && <span className="opacity-60 ml-1">&rarr;</span>}
              </div>
            ))}
          </div>

          {/* 4 Solution Cards with Hover Expansion */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {webDevSolutionsData.map((sol, idx) => {
              const isActive = activeSolutionIdx === idx;

              return (
                <TiltCard key={sol.numStr} maxTilt={4} scale={1.01}>
                  <div
                    onClick={() => setActiveSolutionIdx(idx)}
                    onMouseEnter={() => setActiveSolutionIdx(idx)}
                    className={cn(
                      "p-8 rounded-[2.5rem] border-2 transition-all duration-300 cursor-pointer space-y-6 text-left flex flex-col justify-between min-h-[340px] relative overflow-hidden group",
                      isActive
                        ? "bg-white dark:bg-[#000000] border-[#f15e1c] shadow-2xl ring-2 ring-[#f15e1c]/20"
                        : "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#f7d7b0] dark:border-[#1a1a1a] opacity-80 hover:opacity-100"
                    )}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] group-hover:scale-110 transition-transform">
                            {sol.icon}
                          </div>
                          <span className="text-xs font-mono font-black text-[#f15e1c]">
                            DISCIPLINE {sol.numStr}
                          </span>
                        </div>

                        <div className="px-3 py-1 rounded-xl bg-[#fce3d3] dark:bg-[#161616] text-xs font-mono font-bold text-[#f15e1c]">
                          {sol.metric}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                          {sol.title}
                        </h3>
                        <p className="text-xs font-mono font-semibold text-[#2e936f] mt-1">
                          {sol.subtitle}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                        {sol.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#1a1a1a] space-y-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7A6A5F]">
                        Key Deliverables &amp; Artifacts
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]">
                        {sol.deliverables.map((del, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2e936f] shrink-0" />
                            <span className="truncate">{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          4. PERFORMANCE METRIC — 99/100 CORE WEB VITALS COUNT-UP
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#fefaf5] dark:bg-[#0a0a0a] select-none">
        <div className="max-w-[1536px] mx-auto space-y-10">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              PERFORMANCE BENCHMARK
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              99/100 Core Web Vitals
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Sub-second load speed, zero layout shift, and optimal SEO score out of the box.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: 99,
                suffix: "/100",
                label: "Performance Rating",
                desc: "Sub-second initial paint",
                icon: <Zap className="w-5 h-5 text-[#f15e1c]" />,
              },
              {
                value: 100,
                suffix: "%",
                label: "Accessibility Score",
                desc: "Full WCAG 2.1 AA compliance",
                icon: <Eye className="w-5 h-5 text-[#2e936f]" />,
              },
              {
                value: 3.8,
                suffix: "x",
                decimals: 1,
                label: "Conversion Growth",
                desc: "Optimized checkout UX",
                icon: <LineChart className="w-5 h-5 text-[#fab60a]" />,
              },
              {
                value: 99.99,
                suffix: "%",
                decimals: 2,
                label: "Production Uptime",
                desc: "Kubernetes active failover",
                icon: <ShieldCheck className="w-5 h-5 text-[#f15e1c]" />,
              },
            ].map((stat, idx) => (
              <TiltCard key={idx} maxTilt={5} scale={1.01}>
                <div className="h-full p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#000000] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-md hover:border-[#f15e1c] transition-all duration-300 space-y-4 text-left flex flex-col justify-between relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0]/60">
                      {stat.icon}
                    </div>
                    <span className="text-[#2e936f] text-sm font-bold">↗</span>
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-[#f15e1c]">
                      <CounterNumber
                        value={stat.value}
                        suffix={stat.suffix}
                        decimals={stat.decimals || 0}
                      />
                    </div>
                    <div className="text-sm sm:text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mt-1">
                      {stat.label}
                    </div>
                    <div className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] mt-0.5">
                      {stat.desc}
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. 4-STAGE PRODUCT BUILDING FRAMEWORK (SOFTWARE RELEASE TIMELINE)
          ========================================================================= */}
      <section
        ref={timelineContainerRef}
        className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] select-none"
      >
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              SOFTWARE RELEASE TIMELINE
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              4-Stage Product Building Framework
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              A controlled release timeline taking your application from scope discovery to zero-downtime deployment.
            </p>
          </div>

          {/* Software Release Timeline Progress Bar */}
          <div className="relative py-4 max-w-5xl mx-auto">
            <div className="relative w-full bg-[#f7d7b0] dark:bg-[#1a1a1a] h-2.5 rounded-full overflow-hidden">
              <motion.div
                style={{ width: timelineLineWidth }}
                className="h-full bg-gradient-to-r from-[#f15e1c] via-[#2e936f] to-[#fab60a]"
              />
            </div>

            <div className="flex justify-between items-center absolute inset-x-0 -top-2.5">
              {howWeWorkSteps.map((wf, idx) => {
                const isActive = activeWorkIdx === idx;
                const isPassed = idx <= activeWorkIdx;

                return (
                  <button
                    key={wf.step}
                    type="button"
                    onClick={() => setActiveWorkIdx(idx)}
                    className={cn(
                      "w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center text-xs sm:text-sm font-mono font-black cursor-pointer shrink-0",
                      isActive
                        ? "bg-[#f15e1c] border-white text-white scale-125 shadow-lg shadow-[#f15e1c]/40 ring-4 ring-[#f15e1c]/20 z-10"
                        : isPassed
                        ? "bg-[#2e936f] border-white text-white"
                        : "bg-white dark:bg-[#000000] border-[#f7d7b0] dark:border-[#1a1a1a] text-[#7A6A5F]"
                    )}
                  >
                    {isPassed && !isActive ? <Check className="w-4 h-4 text-white" /> : wf.step}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Detail & Special QA / Launch Animations */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWorkStep.step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="p-8 sm:p-12 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f15e1c]/40 shadow-2xl space-y-6 text-left relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-5">
                  <div>
                    <span className="text-xs font-mono font-black text-[#f15e1c] uppercase tracking-wider block">
                      STAGE {activeWorkStep.step} / 04 &bull; {activeWorkStep.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mt-1">
                      {activeWorkStep.title}
                    </h3>
                  </div>

                  <div className="px-4 py-2 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] text-xs font-mono font-bold text-[#2e936f] shadow-xs">
                    {activeWorkStep.output}
                  </div>
                </div>

                <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  {activeWorkStep.description}
                </p>

                {/* SPECIAL QA VALIDATION ANIMATION (STAGE 03) */}
                {activeWorkStep.qaChecks && (
                  <div className="pt-3 border-t border-[#f7d7b0] dark:border-[#1a1a1a] space-y-3">
                    <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#f15e1c] block">
                      SYSTEM VALIDATION CHECKS (STAGE 03 QA)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeWorkStep.qaChecks.map((check, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.1 }}
                          className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-[#000000] border border-[#2e936f]/60 shadow-xs"
                        >
                          <span className="text-xs font-mono font-bold text-[#1b2823] dark:text-[#ffffff]">
                            {check.name}
                          </span>
                          <span className="text-xs font-mono font-extrabold text-[#2e936f] flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-[#2e936f]" /> {check.status}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SPECIAL LAUNCH ANIMATION (STAGE 04) */}
                {activeWorkStep.launchSteps && (
                  <div className="pt-3 border-t border-[#f7d7b0] dark:border-[#1a1a1a] space-y-3">
                    <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#f15e1c] block">
                      DEPLOYMENT PIPELINE STATE (STAGE 04 LAUNCH)
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      {activeWorkStep.launchSteps.map((ls, i) => (
                        <div
                          key={i}
                          className={cn(
                            "px-4 py-2 rounded-xl text-xs font-mono font-extrabold flex items-center gap-2 border",
                            ls.isLive
                              ? "bg-[#2e936f] text-white border-[#2e936f] shadow-lg shadow-[#2e936f]/30"
                              : "bg-white dark:bg-[#000000] text-[#1b2823] dark:text-[#ffffff] border-[#f7d7b0]"
                          )}
                        >
                          {ls.check && <Check className="w-4 h-4 text-[#2e936f]" />}
                          <span>{ls.label}</span>
                          {ls.isLive && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          6. CONTINUOUS PRODUCT LOOP (MAJOR VISUAL MOMENT)
          ========================================================================= */}
      <section
        ref={loopContainerRef}
        className="relative py-28 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] select-none"
      >
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              CONTINUOUS PRODUCT ENGINEERING
            </Badge>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Continuous Product Iteration Loop
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Modern software products are never finished. Real-world telemetry feeds back into continuous version releases.
            </p>
          </div>

          {/* Circular Iteration Loop Display */}
          <div className="relative rounded-[3rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl p-8 sm:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-radial from-[#f15e1c]/10 via-transparent to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
              {continuousLoopSteps.map((step, idx) => {
                const isActive = activeLoopStep === idx;

                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveLoopStep(idx)}
                    className={cn(
                      "p-6 rounded-2xl border-2 transition-all duration-300 space-y-2 cursor-pointer text-center relative overflow-hidden",
                      isActive
                        ? "bg-white dark:bg-[#000000] border-[#f15e1c] shadow-xl scale-105 ring-2 ring-[#f15e1c]/20"
                        : "bg-white/60 dark:bg-[#000000]/60 border-[#f7d7b0] opacity-75 hover:opacity-100"
                    )}
                  >
                    <span className="text-[10px] font-mono font-black text-[#f15e1c] block">
                      CYCLE 0{idx + 1}
                    </span>
                    <h4 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {step.name}
                    </h4>
                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4]">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Loop Connection Statement */}
            <div className="pt-8 relative z-10 flex items-center justify-center gap-3 text-xs font-mono font-bold text-[#f15e1c]">
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
              <span>PRODUCT &rarr; FEEDBACK &rarr; IMPROVEMENT &rarr; NEW VERSION &rarr; LAUNCH</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. STRATEGIC MISSION — EDITORIAL PARALLAX TYPOGRAPHY
          ========================================================================= */}
      <section
        ref={missionRef}
        className="relative py-28 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000] overflow-hidden select-none"
      >
        {/* Subtle Background Parallax Typography */}
        <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between py-8 opacity-5 dark:opacity-10 font-display font-black text-7xl sm:text-9xl text-[#1b2823] dark:text-[#ffffff] tracking-tighter">
          <motion.div style={{ x: backgroundTextX1 }} className="whitespace-nowrap">
            BUILD &bull; ENGINEER &bull; DEPLOY
          </motion.div>
          <motion.div style={{ x: backgroundTextX2 }} className="whitespace-nowrap text-right">
            SCALE &bull; OPTIMIZE &bull; ITERATE
          </motion.div>
        </div>

        <div className="max-w-[1536px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div ref={statementRef} className="lg:col-span-7 space-y-6 text-left">
            <Badge variant="secondary" size="md">
              PRODUCT ENGINEERING
            </Badge>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isStatementInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-[1.12] tracking-tight"
            >
              At Arav Innovations we design and develop <span className="text-[#f15e1c]">custom web and app solutions</span> that fuel your growth.
            </motion.h2>

            <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
              From intuitive UI/UX design to robust cloud backends, we build scalable software products designed for zero-downtime reliability and enterprise growth.
            </p>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl p-6 flex flex-col justify-between items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-radial from-[#f15e1c]/15 via-[#2e936f]/10 to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center gap-2 pt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]">
                  PRODUCT CORE ENGINE
                </span>
              </div>

              <svg className="w-48 h-48 relative z-10 my-auto" viewBox="0 0 100 100" fill="none">
                <rect x="20" y="20" width="60" height="40" rx="6" stroke="#f15e1c" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="20" y1="35" x2="80" y2="35" stroke="#2e936f" strokeWidth="1.5" />
                <line x1="50" y1="60" x2="50" y2="80" stroke="#fab60a" strokeWidth="2" />
                <circle cx="50" cy="80" r="5" fill="#f15e1c" className="animate-pulse" />
                <circle cx="30" cy="27.5" r="2" fill="#f15e1c" />
                <circle cx="37" cy="27.5" r="2" fill="#2e936f" />
                <circle cx="44" cy="27.5" r="2" fill="#fab60a" />
              </svg>

              <span className="relative z-10 text-[11px] font-mono font-bold text-[#2e936f] pb-1">
                CONTINUOUS PRODUCT LOOP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. CLIENT TESTIMONIAL — ENTERPRISE PROOF
          ========================================================================= */}
      <section ref={testimonialRef} className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto text-center space-y-8">
          <Badge variant="secondary" size="md">
            KIND WORDS FROM OUR CLIENTS
          </Badge>

          <div className="p-8 sm:p-14 lg:p-16 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xl space-y-6 relative overflow-hidden max-w-5xl mx-auto">
            <div className="p-3 rounded-2xl bg-[#f15e1c] text-white w-fit mx-auto shadow-md">
              <Quote className="w-6 h-6" />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isTestimonialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xl sm:text-3xl lg:text-4xl font-display font-medium text-[#1b2823] dark:text-[#ffffff] max-w-4xl mx-auto leading-relaxed italic"
            >
              &ldquo;{testimonial.quote}&rdquo;
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isTestimonialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="pt-4 border-t border-[#f7d7b0] dark:border-[#1a1a1a] space-y-1"
            >
              <div className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                {testimonial.author}
              </div>
              <div className="text-xs text-[#f15e1c] font-bold">
                {testimonial.designation} &bull; {testimonial.company}
              </div>
              <div className="text-xs font-mono font-bold text-[#2e936f] pt-1">
                Web &amp; Application Engineering Partner
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. ABOUT OUR CEO — EDITORIAL LEADERSHIP PROFILE
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl p-8 sm:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border-2 border-[#f15e1c] shadow-xl bg-[#fce3d3] dark:bg-[#161616] flex items-center justify-center text-center p-6 space-y-2 flex-col">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f15e1c] text-white flex items-center justify-center text-2xl sm:text-3xl font-black font-display shadow-md">
                AS
              </div>
              <div className="text-lg sm:text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                Aryan Sayal
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-[#f15e1c]">
                CEO &amp; Managing Director
              </div>
              <span className="text-xs text-[#2e936f] font-mono">Arav Innovations</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <Badge variant="secondary" size="md">
              About Our CEO
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
              Aryan Sayal
            </h2>
            <p className="text-xs sm:text-sm font-mono font-extrabold text-[#f15e1c] uppercase tracking-wider">
              CEO, Arav Innovations
            </p>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
              Leading Arav Innovations with a commitment to engineering excellence, Aryan Sayal guides full-stack software development squads across India and the UAE to build intuitive, resilient digital products.
            </p>
            <div className="pt-2">
              <a
                href="https://www.linkedin.com/company/aravinnovations/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f15e1c] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#d44e14] transition-colors"
              >
                <Globe2 className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. FINAL CTA — PRODUCT CULMINATION SECTION
          ========================================================================= */}
      <section id="inquire" className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 select-none">
        <div className="max-w-[1536px] mx-auto space-y-8">
          {/* Connector Flow Header: IDEA -> BUILD -> TEST -> LAUNCH -> IMPROVE */}
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-widest block">
              PRODUCT LIFECYCLE CULMINATION
            </span>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">
              <span>IDEA</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>BUILD</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>TEST</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>LAUNCH</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span className="text-[#2e936f]">IMPROVE</span>
            </div>
          </div>

          <div className="rounded-[3rem] bg-gradient-to-br from-[#f15e1c] via-[#e55215] to-[#d8480d] text-white p-10 sm:p-16 border-2 border-[#fab60a] shadow-2xl space-y-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
                <Sparkles className="w-4 h-4 text-[#ffec69]" />
                <span>BUILD YOUR DIGITAL PRODUCT</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
                Let&apos;s Build What Comes Next
              </h2>

              {/* Alternating Animated Word Display */}
              <div className="h-12 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={ctaWords[currentWordIdx]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                    className="text-2xl sm:text-4xl font-extrabold font-display text-[#ffec69] uppercase tracking-wider"
                  >
                    {ctaWords[currentWordIdx]}
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="text-base sm:text-xl font-bold text-white/90">
                Kick start a project with us today
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
                    Discuss a Project
                  </Button3D>
                </MagneticButton>
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=971521555792&text=Hello%20Arav%20Innovations%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <MagneticButton className="w-full sm:w-auto">
                  <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center text-white border-white/60 hover:bg-white/10">
                    Instant WhatsApp Inquiry
                  </Button3D>
                </MagneticButton>
              </a>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-white/90 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> 100% Code &amp; IP Ownership
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Strict SLA Protection
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Regional Teams in Gurgaon &amp; Dubai
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. FOOTER BRAND MOMENT
          ========================================================================= */}
      <footer className="py-6 border-t border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#fefaf5] dark:bg-[#0a0a0a] overflow-hidden select-none">
        <div className="flex items-center justify-center gap-6 text-xs sm:text-sm font-mono font-extrabold text-[#7A6A5F] dark:text-[#B8ACA0] tracking-widest">
          <span>BUILD</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>SHIP</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>LEARN</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>IMPROVE</span>
        </div>
      </footer>
    </div>
  );
}

export default WebDevInteractivePage;
