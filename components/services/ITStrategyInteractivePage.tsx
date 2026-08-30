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
  Terminal,
  Layers,
  RefreshCw,
} from "lucide-react";
import { Service } from "@/data/services";
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
// 1. System Scan Transition Line (Subtle sweeping scan effect between sections)
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
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#f15e1c] to-transparent shadow-[0_0_8px_#f15e1c]"
        />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 2. Animated Dot Matrix Grid Background & Cursor Spotlight
// -----------------------------------------------------------------------------
function AnimatedDotGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-15 dark:opacity-20 select-none">
      <svg className="w-full h-full" width="100%" height="100%">
        <pattern
          id="it-dot-matrix"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.2" fill="#f15e1c" opacity="0.6" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#it-dot-matrix)" />
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
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-500 hidden lg:block"
      style={{
        background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(241, 94, 28, 0.04), transparent 80%)`,
      }}
    />
  );
}

// -----------------------------------------------------------------------------
// 3. Metric Counter Number Component (Viewport Ease-Out)
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
    const duration = 1500;

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
const transformationRailStages = [
  {
    num: "01",
    title: "ASSESS",
    subtitle: "Legacy Technical Debt & Risk Diagnostic",
    tagline: "Uncover hidden architecture bottlenecks, shadow databases, and cloud overprovisioning.",
    deliverables: [
      "Legacy Monolith & Code Debt Audit",
      "Cloud FinOps Expense & Pod Allocation Scan",
      "DPDP / PII Exposure Discovery",
      "Vendor Dependence & Single Point of Failure Analysis",
    ],
    metric: "45%",
    metricLabel: "Technical Debt Reduction",
  },
  {
    num: "02",
    title: "STRATEGIZE",
    subtitle: "3-Year Executive Digital Roadmap",
    tagline: "Translate CFO margin goals into actionable, phased engineering blueprints.",
    deliverables: [
      "3-Year Phased Digital Modernization Blueprint",
      "Target Microservices & Next.js Architecture",
      "Executive FinOps Unit Cost Economics",
      "SOC-2 & DPDP Compliance Roadmap",
    ],
    metric: "30%",
    metricLabel: "Cloud Spend Savings",
  },
  {
    num: "03",
    title: "ARCHITECT",
    subtitle: "Zero-Trust & Scalable Cloud Topology",
    tagline: "Design resilient Kubernetes container topologies, event-driven pipelines, and security controls.",
    deliverables: [
      "Zero-Trust Identity & Access Architecture",
      "Active-Active Multi-Cloud Container Layout",
      "Event-Driven Kafka Data Erasure Orchestrator",
      "Field-Level AES-256 PII Encryption Spec",
    ],
    metric: "99.99%",
    metricLabel: "Target Uptime SLA",
  },
  {
    num: "04",
    title: "IMPLEMENT",
    subtitle: "Zero-Downtime Production Cutover",
    tagline: "Dedicated engineering squads refactor code, deploy CI/CD pipelines, and migrate workloads.",
    deliverables: [
      "Next.js App Router & Server Component Refactoring",
      "Automated Containerized CI/CD Deployment",
      "Zero-Downtime Live Database Cutover",
      "100/100 Core Web Vitals Optimization",
    ],
    metric: "3.2x",
    metricLabel: "Faster Release Cycles",
  },
  {
    num: "05",
    title: "OPTIMIZE",
    subtitle: "24/7 Telemetry & Continuous FinOps",
    tagline: "Maintain high availability with proactive log monitoring and 15-minute response SLA.",
    deliverables: [
      "24/7 Log Telemetry & Automated Threat Detection",
      "Self-Healing Kubernetes Autoscaling Pods",
      "Guaranteed 15-Minute Critical Incident Response",
      "Continuous Monthly FinOps Cost Right-Sizing",
    ],
    metric: "15 min",
    metricLabel: "Guaranteed Response SLA",
  },
];

const verticalExecutionSteps = [
  {
    step: "01",
    title: "Assess and Analyze",
    subtitle: "Technology Health Index & Technical Debt Audit",
    desc: "Exhaustive audit across PostgreSQL/MongoDB schemas, CloudWatch logs, and microservice dependencies to map legacy friction points.",
    outcome: "Legacy Debt Audit & FinOps Scan",
  },
  {
    step: "02",
    title: "Strategize and Plan",
    subtitle: "Executive Roadmap & FinOps Model",
    desc: "Draft a 3-year digital modernization blueprint establishing clear architectural milestones, SOC-2 readiness, and unit cost targets.",
    outcome: "3-Year Executive Digital Blueprint",
  },
  {
    step: "03",
    title: "Implement and Secure",
    subtitle: "Production Migration & DPDP Compliance",
    desc: "Hands-on engineering squads refactor frontends to Next.js App Router, deploy containerized pipelines, and enforce zero-trust identity.",
    outcome: "Zero-Downtime Production Cutover",
  },
  {
    step: "04",
    title: "Support and Maintain",
    subtitle: "Continuous Uptime & 15-Min SLA",
    desc: "24/7 telemetry monitoring, automated Kubernetes pod right-sizing, continuous monthly FinOps audits, and guaranteed critical SLAs.",
    outcome: "24/7 Monitoring & 15-Min SLA",
  },
];

const connectedCoreNodes = [
  { id: "cloud", label: "CLOUD", sub: "Multi-Region Kubernetes", icon: <Cloud className="w-5 h-5 text-[#f15e1c]" /> },
  { id: "sec", label: "SECURITY", sub: "Zero-Trust & DPDP", icon: <Shield className="w-5 h-5 text-[#2e936f]" /> },
  { id: "data", label: "DATA", sub: "PostgreSQL & Kafka", icon: <Database className="w-5 h-5 text-[#fab60a]" /> },
  { id: "apps", label: "APPLICATIONS", sub: "Next.js Microservices", icon: <LayoutGrid className="w-5 h-5 text-[#f15e1c]" /> },
  { id: "users", label: "USERS", sub: "RBAC & SSO Identity", icon: <Users className="w-5 h-5 text-[#2e936f]" /> },
  { id: "infra", label: "INFRASTRUCTURE", sub: "Terraform & CI/CD", icon: <Server className="w-5 h-5 text-[#fab60a]" /> },
];

const ctaWords = ["STRATEGIC", "SECURE", "OPTIMIZED", "RESILIENT", "FUTURE-PROOF"];

export function ITStrategyInteractivePage({ service }: ITStrategyPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeStageIdx, setActiveStageIdx] = React.useState<number>(0);
  const [activeExecIdx, setActiveExecIdx] = React.useState<number>(0);
  const [currentWordIdx, setCurrentWordIdx] = React.useState<number>(0);

  // ---------------------------------------------------------------------------
  // 1. Solution Framework — Transformation Rail Scroll Progress
  // ---------------------------------------------------------------------------
  const railContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: railProgress } = useScroll({
    target: railContainerRef,
    offset: ["start 80%", "end 20%"],
  });
  const smoothRailProgress = useSpring(railProgress, { stiffness: 45, damping: 25 });
  const railWidth = useTransform(smoothRailProgress, [0, 1], ["0%", "100%"]);

  React.useEffect(() => {
    const unsub = smoothRailProgress.on("change", (v) => {
      const count = transformationRailStages.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedIdx = Math.floor(normalized * count);
      setActiveStageIdx(calculatedIdx);
    });
    return () => unsub();
  }, [smoothRailProgress]);

  // ---------------------------------------------------------------------------
  // 2. Connected Digital Core SVG Connection Drawing
  // ---------------------------------------------------------------------------
  const coreContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: coreProgress } = useScroll({
    target: coreContainerRef,
    offset: ["start 80%", "end 20%"],
  });
  const corePathLength = useSpring(coreProgress, { stiffness: 40, damping: 25 });

  // ---------------------------------------------------------------------------
  // 3. Vertical Execution Timeline Scroll Line
  // ---------------------------------------------------------------------------
  const execContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: execProgress } = useScroll({
    target: execContainerRef,
    offset: ["start 80%", "end 20%"],
  });
  const smoothExecProgress = useSpring(execProgress, { stiffness: 45, damping: 25 });
  const execLineHeight = useTransform(smoothExecProgress, [0, 1], ["0%", "100%"]);

  React.useEffect(() => {
    const unsub = smoothExecProgress.on("change", (v) => {
      const count = verticalExecutionSteps.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedIdx = Math.floor(normalized * count);
      setActiveExecIdx(calculatedIdx);
    });
    return () => unsub();
  }, [smoothExecProgress]);

  // ---------------------------------------------------------------------------
  // 4. Parallax Background Typography for Strategic Mission
  // ---------------------------------------------------------------------------
  const missionRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: missionProgress } = useScroll({
    target: missionRef,
    offset: ["start end", "end start"],
  });
  const backgroundTextX1 = useTransform(missionProgress, [0, 1], ["-12%", "12%"]);
  const backgroundTextX2 = useTransform(missionProgress, [0, 1], ["12%", "-12%"]);

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

  const activeStage = transformationRailStages[activeStageIdx];
  const testimonial = testimonialsData.find((t) => t.id === "test-3") || testimonialsData[0];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#12100E] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden selection:bg-[#f15e1c]/20 selection:text-[#f15e1c]">
      <CursorSpotlight />

      {/* =========================================================================
          1. HERO — DIGITAL TRANSFORMATION FIELD (RESTRICTED ABSTRACT FIELD)
          ========================================================================= */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] overflow-hidden select-none">
        <AnimatedDotGrid />

        {/* Ambient Subtle Glows */}
        <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-radial from-[#f15e1c]/10 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-radial from-[#2e936f]/8 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />

        {/* Abstract Digital Transformation Pathway Behind Hero Text */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block opacity-25 dark:opacity-20 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1000 400" fill="none">
            <path d="M 100 200 L 300 200 L 500 200 L 700 200 L 900 200" stroke="#f7d7b0" strokeWidth="2" strokeDasharray="4 4" className="dark:stroke-[#253630]" />
            <line x1="300" y1="200" x2="300" y2="120" stroke="#f15e1c" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="700" y1="200" x2="700" y2="280" stroke="#2e936f" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="100" cy="200" r="5" fill="#f15e1c" />
            <circle cx="300" cy="200" r="5" fill="#fab60a" />
            <circle cx="500" cy="200" r="6" fill="#f15e1c" className="animate-ping" />
            <circle cx="700" cy="200" r="5" fill="#2e936f" />
            <circle cx="900" cy="200" r="5" fill="#fab60a" />
          </svg>
        </div>

        <div className="max-w-[1536px] mx-auto w-full space-y-6 relative z-10">
          {/* Top Breadcrumb & Badge */}
          <div className="space-y-3">
            <Breadcrumb
              items={[
                { label: "Services", href: "/services" },
                { label: "IT Strategy & Implementation" },
              ]}
            />
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]"
            >
              <Sparkles className="w-4 h-4" />
              <span>ENTERPRISE IT STRATEGY &amp; MODERNIZATION</span>
            </motion.div>
          </div>

          {/* Main Headline (Fade Up), Supporting Copy (Fade Up delay), CTA (Fade Up last) */}
          <div className="max-w-5xl mx-auto w-full text-center space-y-5 pt-4 pb-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-display tracking-tight leading-[1.1] text-[#1b2823] dark:text-[#ffffff]"
            >
              Strategic IT solutions for modern <span className="text-[#f15e1c]">Business Transformation</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-sm sm:text-lg lg:text-xl text-[#4a5c55] dark:text-[#d3eee4] max-w-3xl mx-auto font-medium leading-relaxed"
            >
              Modernizing legacy architecture, eliminating technical debt, and aligning cloud systems with CFO-backed financial predictability.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a href="#inquire" className="w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto">
                  <Button3D
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />}
                    className="w-full sm:w-auto justify-center shadow-lg shadow-[#f15e1c]/25"
                  >
                    Inquire About IT Strategy
                  </Button3D>
                </MagneticButton>
              </a>
              <Link href="/case-studies" className="w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto">
                  <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center">
                    View Case Studies
                  </Button3D>
                </MagneticButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          2. SOLUTION FRAMEWORK — TRANSFORMATION RAIL (CONTINUOUS NATIVE SCROLL)
          ========================================================================= */}
      <section
        id="solution-framework"
        ref={railContainerRef}
        className="relative py-24 sm:py-32 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]"
      >
        <div className="max-w-[1536px] mx-auto space-y-10 select-none">
          <div className="text-center max-w-4xl mx-auto space-y-2">
            <Badge variant="secondary" size="md">
              SOLUTION FRAMEWORK
            </Badge>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              IT Transformation Rail
            </h2>
            <p className="text-xs sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Follow our continuous methodology from legacy diagnostic to 24/7 telemetry optimization.
            </p>
          </div>

          {/* Transformation Rail Navigation Bar */}
          <div className="relative py-4 max-w-6xl mx-auto">
            {/* Rail Base Line */}
            <div className="relative w-full bg-[#f7d7b0] dark:bg-[#253630] h-2.5 rounded-full overflow-hidden">
              <motion.div
                style={{ width: railWidth }}
                className="h-full bg-gradient-to-r from-[#f15e1c] via-[#2e936f] to-[#fab60a]"
              />
            </div>

            {/* 5 Stage Node Buttons along the Rail */}
            <div className="flex justify-between items-center absolute inset-x-0 -top-2.5">
              {transformationRailStages.map((stage, idx) => {
                const isActive = activeStageIdx === idx;
                const isPassed = idx <= activeStageIdx;

                return (
                  <button
                    key={stage.num}
                    type="button"
                    onClick={() => setActiveStageIdx(idx)}
                    className={cn(
                      "w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center text-xs sm:text-sm font-mono font-black cursor-pointer shrink-0",
                      isActive
                        ? "bg-[#f15e1c] border-white text-white scale-125 shadow-lg shadow-[#f15e1c]/40 ring-4 ring-[#f15e1c]/20 z-10"
                        : isPassed
                        ? "bg-[#2e936f] border-white text-white"
                        : "bg-white dark:bg-[#101b17] border-[#f7d7b0] dark:border-[#253630] text-[#7A6A5F]"
                    )}
                  >
                    {isPassed && !isActive ? <Check className="w-4 h-4 text-white" /> : stage.num}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Content Card */}
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.num}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="p-6 sm:p-10 lg:p-12 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f15e1c]/40 shadow-2xl space-y-6 relative overflow-hidden text-left"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#253630] pb-5">
                  <div>
                    <span className="text-xs font-mono font-black text-[#f15e1c] uppercase tracking-wider block">
                      STAGE {activeStage.num} / 05 &bull; {activeStage.title}
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mt-1">
                      {activeStage.subtitle}
                    </h3>
                  </div>

                  <div className="px-5 py-3 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] text-left sm:text-right shrink-0 shadow-xs">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-[#f15e1c] block leading-none">
                      {activeStage.metric}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#4a5c55] dark:text-[#d3eee4]">
                      {activeStage.metricLabel}
                    </span>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  {activeStage.tagline}
                </p>

                <div className="space-y-3 pt-1">
                  <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#f15e1c] block">
                    Execution Deliverables &amp; Artifacts
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {activeStage.deliverables.map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-2.5 p-3.5 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0]/70 dark:border-[#253630] text-xs font-semibold text-[#1b2823] dark:text-[#ffffff] shadow-2xs group"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="truncate">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Stage Quick Selection Buttons */}
                <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630] flex flex-wrap gap-2.5">
                  {transformationRailStages.map((st, idx) => (
                    <button
                      key={st.num}
                      type="button"
                      onClick={() => setActiveStageIdx(idx)}
                      className={cn(
                        "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold font-mono transition-all cursor-pointer",
                        activeStageIdx === idx
                          ? "bg-[#f15e1c] text-white shadow-md shadow-[#f15e1c]/30"
                          : "bg-white dark:bg-[#101b17] text-[#7A6A5F] border border-[#f7d7b0] hover:border-[#f15e1c]"
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
          3. MAIN VISUAL CENTERPIECE — CONNECTED DIGITAL CORE (SVG TOPOLOGY)
          ========================================================================= */}
      <section
        ref={coreContainerRef}
        className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none"
      >
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              SYSTEM ARCHITECTURE CENTERPIECE
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Connected Digital Core
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Connected enterprise infrastructure showing real-time data flows between core systems.
            </p>
          </div>

          {/* Centerpiece Container with Digital Core in Center */}
          <div className="relative rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-6 sm:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-radial from-[#f15e1c]/8 via-transparent to-transparent pointer-events-none" />

            {/* Main Center Core */}
            <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101b17] border-2 border-[#f15e1c] shadow-xl text-center space-y-2 relative z-20">
              <div className="w-14 h-14 rounded-2xl bg-[#f15e1c] text-white flex items-center justify-center mx-auto shadow-md shadow-[#f15e1c]/30">
                <Cpu className="w-7 h-7 animate-pulse" />
              </div>
              <span className="text-xs font-mono font-extrabold text-[#2e936f] uppercase tracking-wider block">
                ENTERPRISE ORCHESTRATION
              </span>
              <h3 className="text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                DIGITAL CORE
              </h3>
              <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4]">
                Central hub unifying zero-trust security, cloud container pods, and data pipelines.
              </p>
            </div>

            {/* Connected Surrounding Systems Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 relative z-20">
              {connectedCoreNodes.map((node, idx) => (
                <TiltCard key={node.id} maxTilt={4} scale={1.01}>
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#101b17] border-2 border-[#f7d7b0] dark:border-[#253630] hover:border-[#f15e1c] shadow-md transition-all duration-300 space-y-3 group text-left relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0]/60 group-hover:scale-110 transition-transform">
                        {node.icon}
                      </div>
                      <span className="text-[10px] font-mono font-black text-[#f15e1c] px-2 py-0.5 rounded-full bg-[#fce3d3] dark:bg-[#261f1a]">
                        NODE 0{idx + 1}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                        {node.label}
                      </h4>
                      <span className="text-xs font-mono font-semibold text-[#2e936f] block mt-0.5">
                        {node.sub}
                      </span>
                    </div>

                    <div className="w-full h-1 rounded-full bg-[#f7d7b0]/40 dark:bg-[#253630] overflow-hidden">
                      <div className="w-full h-full bg-[#f15e1c] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          4. METRICS — TECHNICAL DEBT & UPTIME SLA WITH PROGRESS RINGS
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#fefaf5] dark:bg-[#172420] select-none">
        <div className="max-w-[1536px] mx-auto space-y-10">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              MEASURABLE OUTCOMES
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Proven Enterprise Metrics
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Concrete financial and operational benchmarks delivered through strategic engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: 45,
                suffix: "%",
                label: "Technical Debt Reduction",
                desc: "Legacy friction scrubbed in 90 days",
                icon: <Cpu className="w-5 h-5 text-[#f15e1c]" />,
              },
              {
                value: 99.99,
                suffix: "%",
                decimals: 2,
                label: "Target Uptime SLA",
                desc: "Multi-region active failover pods",
                icon: <Shield className="w-5 h-5 text-[#2e936f]" />,
              },
              {
                value: 15,
                suffix: " min",
                label: "Critical Response SLA",
                desc: "Guaranteed 24/7 telemetry SLA",
                icon: <Activity className="w-5 h-5 text-[#fab60a]" />,
              },
              {
                value: 3.2,
                suffix: "x",
                decimals: 1,
                label: "Release Velocity",
                desc: "Accelerated containerized CI/CD",
                icon: <Zap className="w-5 h-5 text-[#f15e1c]" />,
              },
            ].map((stat, idx) => (
              <TiltCard key={idx} maxTilt={5} scale={1.01}>
                <div className="h-full p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#101b17] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-md hover:border-[#f15e1c] transition-all duration-300 space-y-4 text-left flex flex-col justify-between relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0]/60">
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
          5. 4-STEP EXECUTION FRAMEWORK (VERTICAL EXECUTION TIMELINE)
          ========================================================================= */}
      <section
        ref={execContainerRef}
        className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none"
      >
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              EXECUTION FRAMEWORK
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Vertical Execution Timeline
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              A controlled 4-step execution process delivering predictable modernization outcomes.
            </p>
          </div>

          {/* Vertical Timeline Structure */}
          <div className="relative pl-6 sm:pl-10 space-y-8 max-w-5xl mx-auto text-left">
            {/* Background Track & Active Scroll Line */}
            <div className="absolute left-0 sm:left-2.5 top-0 bottom-0 w-0.5 bg-[#f7d7b0] dark:bg-[#253630] overflow-hidden">
              <motion.div style={{ height: execLineHeight }} className="w-full bg-gradient-to-b from-[#f15e1c] via-[#2e936f] to-[#fab60a]" />
            </div>
            {verticalExecutionSteps.map((step, idx) => {
              const isActive = activeExecIdx === idx;
              const isPast = idx <= activeExecIdx;

              return (
                <div key={step.step} className="relative pl-6 sm:pl-8 group">
                  {/* Timeline Dot Node */}
                  <div
                    onClick={() => setActiveExecIdx(idx)}
                    className={cn(
                      "absolute -left-[31px] sm:-left-[47px] top-1.5 w-8 h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center text-xs font-mono font-black cursor-pointer",
                      isActive
                        ? "bg-[#f15e1c] border-white text-white scale-125 shadow-lg shadow-[#f15e1c]/40 ring-4 ring-[#f15e1c]/20"
                        : isPast
                        ? "bg-[#2e936f] border-white text-white"
                        : "bg-white dark:bg-[#101b17] border-[#f7d7b0] dark:border-[#253630] text-[#7A6A5F]"
                    )}
                  >
                    {step.step}
                  </div>

                  <motion.div
                    whileHover={{ x: 4 }}
                    className={cn(
                      "p-6 sm:p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer space-y-3",
                      isActive
                        ? "bg-white dark:bg-[#101b17] border-[#f15e1c] shadow-xl ring-2 ring-[#f15e1c]/20"
                        : "bg-[#fefaf5] dark:bg-[#172420] border-[#f7d7b0] dark:border-[#253630] opacity-80 hover:opacity-100"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-wider">
                        STEP {step.step} &bull; {step.subtitle}
                      </span>
                      {isActive && <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-ping" />}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {step.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                      {step.desc}
                    </p>

                    <div className="pt-2 border-t border-[#f7d7b0] dark:border-[#253630] flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase text-[#7A6A5F]">Target Deliverable:</span>
                      <span className="text-xs sm:text-sm font-bold text-[#f15e1c]">{step.outcome}</span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CLIENT TESTIMONIAL — ENTERPRISE PROOF
          ========================================================================= */}
      <section ref={testimonialRef} className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-[1536px] mx-auto text-center space-y-8">
          <Badge variant="secondary" size="md">
            EXECUTIVE ENDORSEMENT
          </Badge>

          <div className="p-8 sm:p-14 lg:p-16 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl space-y-6 relative overflow-hidden max-w-5xl mx-auto">
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
              className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630] space-y-1"
            >
              <div className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                {testimonial.author}
              </div>
              <div className="text-xs text-[#f15e1c] font-bold">
                {testimonial.designation} &bull; {testimonial.company}
              </div>
              <div className="text-xs font-mono font-bold text-[#2e936f] pt-1">
                Verified Enterprise Client
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. STRATEGIC MISSION — EDITORIAL PARALLAX TYPOGRAPHY
          ========================================================================= */}
      <section
        ref={missionRef}
        className="relative py-28 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#ffffff] dark:bg-[#101b17] overflow-hidden select-none"
      >
        {/* Subtle Background Parallax Words */}
        <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between py-8 opacity-5 dark:opacity-10 font-display font-black text-7xl sm:text-9xl text-[#1b2823] dark:text-[#ffffff] tracking-tighter">
          <motion.div style={{ x: backgroundTextX1 }} className="whitespace-nowrap">
            STRATEGY &bull; SECURITY &bull; CLOUD
          </motion.div>
          <motion.div style={{ x: backgroundTextX2 }} className="whitespace-nowrap text-right">
            GROWTH &bull; MODERNIZATION &bull; SCALE
          </motion.div>
        </div>

        <div className="max-w-[1536px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div ref={statementRef} className="lg:col-span-7 space-y-6 text-left">
            <Badge variant="secondary" size="md">
              STRATEGIC MISSION
            </Badge>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isStatementInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-[1.12] tracking-tight"
            >
              Helping businesses grow through <span className="text-[#f15e1c]">tailored IT strategies</span>, secure cloud adoption, and ongoing support.
            </motion.h2>

            <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
              We bridge the gap between CFO financial targets and engineering execution, delivering zero-downtime migrations, SOC-2 readiness, and measurable digital growth.
            </p>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-6 flex flex-col justify-between items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-radial from-[#f15e1c]/15 via-[#2e936f]/10 to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center gap-2 pt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]">
                  SYSTEM TOPOLOGY
                </span>
              </div>

              <svg className="w-48 h-48 relative z-10 my-auto" viewBox="0 0 100 100" fill="none">
                <line x1="50" y1="20" x2="20" y2="70" stroke="#f15e1c" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="50" y1="20" x2="80" y2="70" stroke="#2e936f" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="20" y1="70" x2="80" y2="70" stroke="#fab60a" strokeWidth="2" />
                <circle cx="50" cy="20" r="7" fill="#f15e1c" />
                <circle cx="20" cy="70" r="6" fill="#2e936f" />
                <circle cx="80" cy="70" r="6" fill="#fab60a" />
                <circle cx="50" cy="53" r="4" fill="#f15e1c" className="animate-pulse" />
              </svg>

              <span className="relative z-10 text-[11px] font-mono font-bold text-[#2e936f] pb-1">
                CONNECTED DIGITAL CORE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. CTA — TRANSFORMATION JOURNEY CULMINATION
          ========================================================================= */}
      <section id="inquire" className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 select-none">
        <div className="max-w-[1536px] mx-auto space-y-8">
          {/* Connector Flow Header: ASSESS -> STRATEGIZE -> IMPLEMENT -> OPTIMIZE */}
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-widest block">
              TRANSFORMATION JOURNEY COMPLETE
            </span>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">
              <span>ASSESS</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>STRATEGIZE</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>IMPLEMENT</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span className="text-[#2e936f]">OPTIMIZE</span>
            </div>
          </div>

          <div className="rounded-[3rem] bg-gradient-to-br from-[#f15e1c] via-[#e55215] to-[#d8480d] text-white p-10 sm:p-16 border-2 border-[#fab60a] shadow-2xl space-y-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
                <Sparkles className="w-4 h-4 text-[#ffec69]" />
                <span>START YOUR MODERNIZATION</span>
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
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Strict SLA Protection
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> 100% Code &amp; IP Ownership
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Regional Teams in Gurgaon &amp; Dubai
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. ABOUT OUR CEO — EDITORIAL LEADERSHIP PROFILE
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-[1536px] mx-auto rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-8 sm:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border-2 border-[#f15e1c] shadow-xl bg-[#fce3d3] dark:bg-[#261f1a] flex items-center justify-center text-center p-6 space-y-2 flex-col">
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
              Leading Arav Innovations with a vision for strategic excellence, Aryan Sayal orchestrates multidisciplinary technology squads across India and the UAE to help enterprises achieve measurable digital transformation and zero-trust cloud resilience.
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
          10. FOOTER BRAND MOMENT
          ========================================================================= */}
      <footer className="py-6 border-t border-[#f7d7b0]/60 dark:border-[#253630] bg-[#fefaf5] dark:bg-[#172420] overflow-hidden select-none">
        <div className="flex items-center justify-center gap-6 text-xs sm:text-sm font-mono font-extrabold text-[#7A6A5F] dark:text-[#B8ACA0] tracking-widest">
          <span>ASSESS</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>STRATEGIZE</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>ARCHITECT</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>IMPLEMENT</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>OPTIMIZE</span>
        </div>
      </footer>
    </div>
  );
}

export default ITStrategyInteractivePage;
