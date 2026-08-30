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
} from "lucide-react";
import { Service } from "@/data/services";
import { testimonialsData } from "@/data/testimonials";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ScrollTextFlip } from "@/components/motion/ScrollTextFlip";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";

interface ITStrategyPageProps {
  service: Service;
}

/* =========================================================================
   1. HERO BACKGROUND: ANIMATED DOT GRID & CURSOR SPOTLIGHT
   ========================================================================= */
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
        background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(241, 94, 28, 0.05), transparent 80%)`,
      }}
    />
  );
}

/* =========================================================================
   2. ANIMATED METRIC COUNTER
   ========================================================================= */
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
    const duration = 1400;

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
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

/* =========================================================================
   3. STICKY STORYTELLING SOLUTION FRAMEWORK (01 ASSESS -> 05 SECURE/OPTIMIZE)
   ========================================================================= */
const storytellingStages = [
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
    color: "#f15e1c",
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
    metricLabel: "Cloud Spend Cost Savings",
    color: "#2e936f",
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
    color: "#fab60a",
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
    metricLabel: "Faster Deployment Cycles",
    color: "#f15e1c",
  },
  {
    num: "05",
    title: "SECURE / OPTIMIZE",
    subtitle: "24/7 Telemetry & Continuous FinOps",
    tagline: "Maintain high availability with proactive log monitoring and 15-minute response SLA.",
    deliverables: [
      "24/7 Log Telemetry & Automated Threat Detection",
      "Self-Healing Kubernetes Autoscaling Pods",
      "Guaranteed 15-Minute Critical Incident Response",
      "Continuous Monthly FinOps Cost Right-Sizing",
    ],
    metric: "15 min",
    metricLabel: "Guaranteed SLA",
    color: "#2e936f",
  },
];

function StickyStorytellingFramework() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = React.useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 35%"],
  });

  React.useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const count = storytellingStages.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedIdx = Math.floor(normalized * count);
      setActiveIdx(calculatedIdx);
    });
    return () => unsub();
  }, [scrollYProgress]);

  const activeStage = storytellingStages[activeIdx];

  return (
    <div ref={containerRef} className="relative w-full select-none">
      <div className="rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl p-5 sm:p-8 lg:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-radial from-[#f15e1c]/10 via-transparent to-transparent pointer-events-none rounded-full blur-3xl" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Left Column: Stage Navigation */}
          <div className="lg:col-span-5 space-y-4 lg:space-y-6 lg:sticky lg:top-28 lg:h-fit">
            <div className="space-y-2">
              <Badge variant="secondary" size="md">
                SOLUTION FRAMEWORK
              </Badge>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
                IT Transformation Journey
              </h3>
              <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                As you scroll, follow how our methodology moves seamlessly from diagnostic to continuous optimization.
              </p>
            </div>

            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 scrollbar-none snap-x">
              {storytellingStages.map((stage, idx) => {
                const isActive = activeIdx === idx;
                const isPast = idx < activeIdx;

                return (
                  <button
                    key={stage.num}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={cn(
                      "p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all duration-300 flex items-center justify-between text-left cursor-pointer shrink-0 snap-start min-w-[160px] sm:min-w-[200px] lg:min-w-0 lg:w-full",
                      isActive
                        ? "bg-white dark:bg-[#101b17] border-[#f15e1c] shadow-lg ring-2 ring-[#f15e1c]/30 lg:translate-x-1"
                        : isPast
                        ? "bg-[#fefaf5] dark:bg-[#14201b] border-[#2e936f]/60 opacity-90"
                        : "bg-white/40 dark:bg-[#14201b] border-[#f7d7b0] dark:border-[#253630] opacity-60 hover:opacity-100"
                    )}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span
                        className={cn(
                          "w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl font-mono text-xs font-black flex items-center justify-center transition-colors shrink-0",
                          isActive
                            ? "bg-[#f15e1c] text-white shadow-md shadow-[#f15e1c]/30"
                            : isPast
                            ? "bg-[#2e936f] text-white"
                            : "bg-[#fce3d3] dark:bg-[#261f1a] text-[#f15e1c]"
                        )}
                      >
                        {isPast ? <Check className="w-3.5 h-3.5 text-white" /> : stage.num}
                      </span>

                      <div>
                        <div className="text-[10px] font-mono font-extrabold text-[#7A6A5F] dark:text-[#B8ACA0] uppercase">
                          STAGE {stage.num}
                        </div>
                        <div
                          className={cn(
                            "text-xs sm:text-sm font-extrabold font-display transition-colors truncate max-w-[110px] sm:max-w-none",
                            isActive ? "text-[#f15e1c]" : "text-[#1b2823] dark:text-[#ffffff]"
                          )}
                        >
                          {stage.title}
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2">
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#f15e1c] animate-ping" />}
                      <ChevronRight
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isActive ? "text-[#f15e1c] translate-x-1" : "text-[#7A6A5F]"
                        )}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Stage Detail Card */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage.num}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="p-5 sm:p-8 lg:p-9 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#101b17] border-2 border-[#f15e1c]/40 shadow-xl space-y-5 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#f7d7b0] dark:border-[#253630] pb-4">
                  <div>
                    <span className="text-[11px] font-mono font-black text-[#f15e1c] uppercase tracking-wider block">
                      STAGE {activeStage.num} / 05 &bull; {activeStage.title}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mt-0.5">
                      {activeStage.subtitle}
                    </h4>
                  </div>

                  <div className="px-3.5 py-2 rounded-xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] text-left sm:text-right shrink-0">
                    <span className="text-xl font-black font-mono text-[#f15e1c] block leading-none">
                      {activeStage.metric}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#4a5c55] dark:text-[#d3eee4]">
                      {activeStage.metricLabel}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  {activeStage.tagline}
                </p>

                <div className="space-y-2.5 pt-1">
                  <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#f15e1c] block">
                    Execution Deliverables &amp; Artifacts
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeStage.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0]/70 dark:border-[#253630] text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2e936f] shrink-0" />
                        <span className="line-clamp-2">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. SYSTEM ARCHITECTURE VISUAL (BUSINESS -> RELIABILITY)
   ========================================================================= */
const archNodes = [
  { id: "bus", label: "BUSINESS", sub: "ROI & Drivers", icon: <Compass className="w-4 h-4 text-[#f15e1c]" /> },
  { id: "audit", label: "ASSESSMENT", sub: "Technical Audit", icon: <Cpu className="w-4 h-4 text-[#2e936f]" /> },
  { id: "road", label: "ROADMAP", sub: "3-Yr Strategy", icon: <BarChart3 className="w-4 h-4 text-[#fab60a]" /> },
  { id: "impl", label: "IMPLEMENTATION", sub: "Next.js & Containers", icon: <Zap className="w-4 h-4 text-[#f15e1c]" /> },
  { id: "sec", label: "SECURITY / CLOUD", sub: "Zero-Trust & DPDP", icon: <Lock className="w-4 h-4 text-[#2e936f]" /> },
  { id: "rel", label: "RELIABILITY", sub: "Continuous Telemetry", icon: <TrendingUp className="w-4 h-4 text-[#fab60a]" /> },
];

function SystemArchitectureDiagram() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 35%"],
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const pulseX = useTransform(pathLength, [0, 1], [40, 960]);

  return (
    <div ref={containerRef} className="relative w-full select-none">
      <div className="rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl p-5 sm:p-8 lg:p-12 space-y-6 relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-[#f7d7b0] dark:border-[#253630] pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <Badge variant="secondary" size="md">
              SYSTEM ARCHITECTURE VISUAL
            </Badge>
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
              End-to-End Infrastructure Flow
            </h3>
            <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4]">
              Connected digital topology illustrating the progressive flow from business requirements to cloud telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-[#2e936f] bg-white dark:bg-[#101b17] px-3 py-1.5 rounded-xl border border-[#f7d7b0] dark:border-[#253630]">
            <span className="w-2 h-2 rounded-full bg-[#2e936f] animate-pulse" />
            <span>CONNECTED NODE MATRIX</span>
          </div>
        </div>

        {/* Connected SVG Pipeline */}
        <div className="relative py-2">
          <div className="hidden lg:block absolute top-[44px] left-8 right-8 h-10 pointer-events-none z-0">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id="arch-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f15e1c" />
                  <stop offset="50%" stopColor="#2e936f" />
                  <stop offset="100%" stopColor="#fab60a" />
                </linearGradient>
              </defs>

              <path
                d="M 20 20 L 980 20"
                stroke="#f7d7b0"
                strokeWidth="3"
                strokeDasharray="6 6"
                className="dark:stroke-[#253630]"
              />

              <motion.path
                d="M 20 20 L 980 20"
                stroke="url(#arch-grad)"
                strokeWidth="4"
                strokeLinecap="round"
                style={{
                  pathLength: shouldReduceMotion ? 1 : pathLength,
                }}
              />

              {!shouldReduceMotion && (
                <motion.circle
                  cy="20"
                  r="6"
                  fill="#f15e1c"
                  style={{ cx: pulseX }}
                  className="shadow-lg"
                />
              )}
            </svg>
          </div>

          {/* 6 Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative z-10">
            {archNodes.map((node, idx) => (
              <div
                key={node.id}
                className="p-3.5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#101b17] border-2 border-[#f7d7b0] dark:border-[#253630] hover:border-[#f15e1c] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-2 min-h-[110px] sm:min-h-[130px] group"
              >
                <div className="flex items-center justify-between">
                  <span className="w-6 h-6 rounded-lg bg-[#fce3d3] dark:bg-[#261f1a] text-[#f15e1c] text-[11px] font-mono font-black flex items-center justify-center group-hover:bg-[#f15e1c] group-hover:text-white transition-colors">
                    0{idx + 1}
                  </span>
                  <div className="p-1 rounded-md bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0]/50">
                    {node.icon}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors leading-tight">
                    {node.label}
                  </h4>
                  <span className="text-[10px] font-mono text-[#2e936f] font-semibold block mt-0.5 truncate">
                    {node.sub}
                  </span>
                </div>

                <div className="w-full h-1 rounded-full bg-[#f7d7b0]/40 dark:bg-[#253630] overflow-hidden">
                  <div className="w-full h-full bg-[#f15e1c] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. 3D CARD STACK ON SCROLL EXECUTION FRAMEWORK (STEP 01 -> STEP 04)
   ========================================================================= */
const executionSteps = [
  {
    step: "01",
    title: "Assess and Analyze",
    tagline: "Technology Health Index & Technical Debt Audit",
    desc: "Exhaustive audit across PostgreSQL/MongoDB schemas, CloudWatch logs, and microservice dependencies to map legacy friction points.",
  },
  {
    step: "02",
    title: "Strategize and Plan",
    tagline: "Executive Roadmap & FinOps Model",
    desc: "Draft a 3-year digital modernization blueprint establishing clear architectural milestones, SOC-2 readiness, and unit cost targets.",
  },
  {
    step: "03",
    title: "Implement and Secure",
    tagline: "Production Migration & DPDP Compliance",
    desc: "Hands-on engineering squads refactor frontends to Next.js App Router, deploy containerized pipelines, and enforce zero-trust identity.",
  },
  {
    step: "04",
    title: "Support and Maintain",
    tagline: "Continuous Uptime & 15-Min SLA",
    desc: "24/7 telemetry monitoring, automated Kubernetes pod right-sizing, continuous monthly FinOps audits, and guaranteed critical SLAs.",
  },
];

function CardStackOnScroll() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"],
  });

  React.useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * 4), 3);
      setActiveStep(Math.max(0, idx));
    });
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative w-full select-none">
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <Badge variant="secondary" size="md">
            EXECUTION FRAMEWORK
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
            4-Step Disciplined Execution
          </h2>
          <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4]">
            Scroll to see each execution phase separate into focus from the 3D architecture stack.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {executionSteps.map((step, idx) => {
            const isActive = activeStep === idx;
            const isPast = idx < activeStep;

            return (
              <TiltCard key={step.step} maxTilt={5} scale={1.01}>
                <div
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    "h-full p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 min-h-[220px] sm:min-h-[280px] relative overflow-hidden group",
                    isActive
                      ? "bg-white dark:bg-[#101b17] border-[#f15e1c] shadow-xl ring-2 ring-[#f15e1c]/30"
                      : isPast
                      ? "bg-[#fefaf5] dark:bg-[#14201b] border-[#2e936f] opacity-85"
                      : "bg-[#fefaf5]/60 dark:bg-[#172420]/80 border-[#f7d7b0] dark:border-[#253630] opacity-70 hover:opacity-100"
                  )}
                >
                  <div className="space-y-3 relative z-10 text-left">
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "px-3 py-0.5 rounded-full text-[11px] font-mono font-black",
                          isActive
                            ? "bg-[#f15e1c] text-white shadow-sm"
                            : isPast
                            ? "bg-[#2e936f] text-white"
                            : "bg-[#fce3d3] text-[#f15e1c]"
                        )}
                      >
                        STEP {step.step}
                      </span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-[#f15e1c] animate-ping" />}
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#f7d7b0] dark:border-[#253630] text-left relative z-10">
                    <span className="text-[10px] font-mono font-extrabold uppercase text-[#7A6A5F] block">
                      Target Outcome:
                    </span>
                    <span className="text-xs font-bold text-[#f15e1c] mt-0.5 block truncate">
                      {step.tagline}
                    </span>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. MAIN IT STRATEGY INTERACTIVE PAGE COMPONENT
   ========================================================================= */
const ctaWords = ["STRATEGIC", "SECURE", "OPTIMIZED", "RESILIENT", "FUTURE-PROOF"];

export function ITStrategyInteractivePage({ service }: ITStrategyPageProps) {
  const [currentWordIdx, setCurrentWordIdx] = React.useState<number>(0);

  // Editorial Statement InView
  const statementRef = React.useRef<HTMLDivElement>(null);
  const isStatementInView = useInView(statementRef, { once: true, margin: "-80px" });

  // Rotating CTA Word Timer
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIdx((prev) => (prev + 1) % ctaWords.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const testimonial = testimonialsData.find((t) => t.id === "test-3") || testimonialsData[0];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#12100E] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden">
      <CursorSpotlight />

      {/* =========================================================================
          1. HERO — IMMERSIVE SCROLL INTRODUCTION
          ========================================================================= */}
      <section className="relative pt-20 pb-10 sm:pt-28 sm:pb-14 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] overflow-hidden">
        <AnimatedDotGrid />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-radial from-[#f15e1c]/10 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-radial from-[#2e936f]/8 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full space-y-6 relative z-10">
          {/* Top Breadcrumb & Tag */}
          <div className="space-y-3">
            <Breadcrumb
              items={[
                { label: "Services", href: "/services" },
                { label: "IT Strategy & Implementation" },
              ]}
            />
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] border border-[#f7d7b0] text-[11px] font-mono font-bold text-[#f15e1c]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ENTERPRISE IT STRATEGY &amp; MODERNIZATION</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Dominant Headline & Hero Copy */}
          <div className="max-w-4xl mx-auto w-full text-center space-y-4 pt-4 pb-4">
            <ScrollTextFlip>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-[1.1] text-[#1b2823] dark:text-[#ffffff]">
                Strategic IT solutions for modern <span className="text-[#f15e1c]">Business Transformation</span>
              </h1>
            </ScrollTextFlip>

            <ScrollReveal direction="up" delay={0.15}>
              <p className="text-sm sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] max-w-2xl mx-auto font-medium leading-relaxed">
                Modernizing legacy architecture, eliminating technical debt, and aligning cloud systems with CFO-backed financial predictability.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.25}>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a href="#inquire" className="w-full sm:w-auto">
                  <MagneticButton className="w-full sm:w-auto">
                    <Button3D
                      variant="primary"
                      size="lg"
                      rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                      className="w-full sm:w-auto justify-center shadow-lg shadow-[#f15e1c]/25"
                    >
                      Inquire About IT Strategy
                    </Button3D>
                  </MagneticButton>
                </a>
                <Link href="/case-studies" className="w-full sm:w-auto">
                  <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center">
                    View Case Studies
                  </Button3D>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SIGNATURE SOLUTION FRAMEWORK — STICKY STORYTELLING
          ========================================================================= */}
      <section id="solution-framework" className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <StickyStorytellingFramework />
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          3. SYSTEM ARCHITECTURE VISUAL (CONNECTED DIAGRAM)
          ========================================================================= */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <SystemArchitectureDiagram />
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          4. KEY METRICS HIGHLIGHT — COUNT-UP STATS
          ========================================================================= */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#fefaf5] dark:bg-[#172420]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              {
                value: 45,
                suffix: "%",
                label: "Technical Debt Reduction",
                desc: "Legacy friction scrubbed in 90 days",
              },
              {
                value: 99.99,
                suffix: "%",
                decimals: 2,
                label: "System Uptime SLA",
                desc: "Multi-region failover pods",
              },
              {
                value: 15,
                suffix: " min",
                label: "Critical SLA Response",
                desc: "Guaranteed 24/7 telemetry SLA",
              },
              {
                value: 3.2,
                suffix: "x",
                decimals: 1,
                label: "Release Velocity",
                desc: "Accelerated deployment pipelines",
              },
            ].map((stat, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.08} direction="up">
                <TiltCard maxTilt={5} scale={1.01}>
                  <div className="h-full p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] shadow-sm hover:shadow-md space-y-1.5 text-center flex flex-col justify-center relative overflow-hidden group">
                    <div className="text-2xl sm:text-4xl font-black font-mono text-[#f15e1c]">
                      <CounterNumber
                        value={stat.value}
                        suffix={stat.suffix}
                        decimals={stat.decimals || 0}
                      />
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4]">
                      {stat.desc}
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. EXECUTION FRAMEWORK — 3D CARD STACK ON SCROLL
          ========================================================================= */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <CardStackOnScroll />
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          6. CLIENT TESTIMONIAL & EXECUTIVE PROOF
          ========================================================================= */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <ScrollReveal direction="up">
              <Badge variant="secondary" size="md">
                EXECUTIVE ENDORSEMENT
              </Badge>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <TiltCard maxTilt={4} scale={1.01}>
                <div className="p-6 sm:p-10 lg:p-12 rounded-2xl sm:rounded-[2rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-lg space-y-5 text-center">
                  <div className="p-2.5 rounded-xl bg-[#f15e1c] text-white w-fit mx-auto shadow-sm">
                    <Quote className="w-5 h-5" />
                  </div>

                  <p className="text-base sm:text-2xl font-display font-medium text-[#1b2823] dark:text-[#ffffff] max-w-2xl mx-auto leading-relaxed italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  <div className="pt-3 border-t border-[#f7d7b0] dark:border-[#253630] space-y-0.5">
                    <div className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-[#f15e1c] font-bold">
                      {testimonial.designation} &bull; {testimonial.company}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. EDITORIAL MISSION STATEMENT
          ========================================================================= */}
      <section ref={statementRef} className="relative py-14 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#ffffff] dark:bg-[#101b17] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-left">
            <ScrollReveal direction="up">
              <Badge variant="secondary" size="md">
                STRATEGIC MISSION
              </Badge>
            </ScrollReveal>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isStatementInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-tight tracking-tight"
            >
              Helping businesses grow through <span className="text-[#f15e1c]">tailored IT strategies</span>, secure cloud adoption, and ongoing support.
            </motion.h2>

            <ScrollReveal direction="up" delay={0.15}>
              <p className="text-xs sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                We bridge the gap between CFO financial targets and engineering execution, delivering zero-downtime migrations, SOC-2 readiness, and measurable digital growth.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <TiltCard maxTilt={6} scale={1.02}>
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-2xl sm:rounded-3xl bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl p-5 flex flex-col justify-between items-center text-center overflow-hidden">
                <div className="relative z-10 flex items-center gap-2 pt-1">
                  <span className="w-2 h-2 rounded-full bg-[#f15e1c] animate-ping" />
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]">
                    SYSTEM ARCHITECTURE
                  </span>
                </div>

                <svg className="w-40 h-40 relative z-10 my-auto" viewBox="0 0 100 100" fill="none">
                  <line x1="50" y1="20" x2="20" y2="70" stroke="#f15e1c" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="50" y1="20" x2="80" y2="70" stroke="#2e936f" strokeWidth="2" strokeDasharray="3 3" />
                  <line x1="20" y1="70" x2="80" y2="70" stroke="#fab60a" strokeWidth="2" />
                  <circle cx="50" cy="20" r="7" fill="#f15e1c" />
                  <circle cx="20" cy="70" r="6" fill="#2e936f" />
                  <circle cx="80" cy="70" r="6" fill="#fab60a" />
                  <circle cx="50" cy="53" r="4" fill="#f15e1c" className="animate-pulse" />
                </svg>

                <span className="relative z-10 text-[10px] font-mono font-bold text-[#2e936f]">
                  CONNECTED DIGITAL CORE
                </span>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. ENTERPRISE PROJECT CTA
          ========================================================================= */}
      <section id="pricing" className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#fefaf5] dark:bg-[#172420] border-y border-[#f7d7b0] dark:border-[#253630]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <ScrollReveal direction="up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f15e1c]/10 border border-[#f15e1c]/30 text-[11px] font-mono font-bold text-[#f15e1c]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CUSTOM ENTERPRISE ENGAGEMENT</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <div className="space-y-2 max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                  Let&apos;s Build What Comes Next
                </h2>
                <p className="text-xs sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  Tell us what you&apos;re trying to achieve and we&apos;ll help you identify the right technology, strategy, and execution path.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                <Link href="/contact" className="w-full sm:w-auto">
                  <MagneticButton className="w-full sm:w-auto">
                    <Button3D
                      variant="primary"
                      size="lg"
                      rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                      className="w-full sm:w-auto justify-center bg-[#f15e1c] text-white"
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
                  <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center text-[#f15e1c] border-[#f15e1c]">
                    Instant WhatsApp Inquiry
                  </Button3D>
                </a>
              </div>
            </ScrollReveal>

            <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630] flex flex-wrap items-center justify-center gap-4 text-xs text-[#2e936f] font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2e936f]" /> 100% Code &amp; IP Ownership
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2e936f]" /> Strict SLA Protection
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2e936f]" /> Regional Teams in Gurgaon &amp; Dubai
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. ABOUT OUR CEO — EDITORIAL LEADERSHIP PROFILE
          ========================================================================= */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-7xl mx-auto">
          <TiltCard maxTilt={4} scale={1.01}>
            <div className="rounded-2xl sm:rounded-[2rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center text-left">
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#f15e1c] shadow-lg bg-[#fce3d3] dark:bg-[#261f1a] flex items-center justify-center text-center p-4 space-y-1.5 flex-col">
                  <div className="w-16 h-16 rounded-full bg-[#f15e1c] text-white flex items-center justify-center text-xl font-black font-display shadow-md">
                    AS
                  </div>
                  <div className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                    Aryan Sayal
                  </div>
                  <div className="text-[11px] font-mono font-bold text-[#f15e1c]">
                    CEO &amp; Managing Director
                  </div>
                  <span className="text-[10px] text-[#2e936f] font-mono">Arav Innovations</span>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-3">
                <Badge variant="secondary" size="md">
                  About Our CEO
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                  Aryan Sayal
                </h2>
                <p className="text-[11px] font-mono font-extrabold text-[#f15e1c] uppercase tracking-wider">
                  CEO, Arav Innovations
                </p>
                <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  Leading Arav Innovations with a vision for strategic excellence, Aryan Sayal orchestrates multidisciplinary technology squads across India and the UAE to help enterprises achieve measurable digital transformation and zero-trust cloud resilience.
                </p>
                <div className="pt-1">
                  <a
                    href="https://www.linkedin.com/company/aravinnovations/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f15e1c] text-white text-xs font-bold shadow-md hover:bg-[#d44e14] transition-colors"
                  >
                    <Globe2 className="w-3.5 h-3.5" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* =========================================================================
          10. FINAL CTA — ALTERNATING WORD TRANSFORMATIONAL SECTION
          ========================================================================= */}
      <section id="inquire" className="relative py-14 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl sm:rounded-[2.5rem] bg-gradient-to-br from-[#f15e1c] via-[#e55215] to-[#d8480d] text-white p-6 sm:p-12 lg:p-14 border-2 border-[#fab60a] shadow-2xl space-y-6 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/40 text-[11px] font-mono font-bold text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#ffec69]" />
                <span>START YOUR PROJECT</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
                Can&apos;t wait to start your project?
              </h2>

              {/* Alternating Animated Word Display */}
              <div className="h-10 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={ctaWords[currentWordIdx]}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl sm:text-3xl font-extrabold font-display text-[#ffec69] uppercase tracking-wider"
                  >
                    {ctaWords[currentWordIdx]}
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="text-xs sm:text-base font-bold text-white/90">
                Kick start a project with us today
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button3D
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                  className="w-full sm:w-auto justify-center bg-white text-[#f15e1c] hover:bg-[#f7d7b0]"
                >
                  Discuss a Project
                </Button3D>
              </Link>
              <a
                href="https://api.whatsapp.com/send?phone=971521555792&text=Hello%20Arav%20Innovations%2C%20I%27d%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center text-white border-white/60 hover:bg-white/10">
                  Instant WhatsApp Inquiry
                </Button3D>
              </a>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/20 flex flex-wrap items-center justify-center gap-4 text-xs text-white/90 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ffec69]" /> Strict SLA Protection
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ffec69]" /> 100% Code &amp; IP Ownership
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ffec69]" /> Regional Teams in Gurgaon &amp; Dubai
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ITStrategyInteractivePage;
