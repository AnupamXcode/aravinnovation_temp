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
  BarChart3,
  Search,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Quote,
  Globe2,
  Zap,
  Activity,
  Sliders,
  PieChart,
  Check,
  LineChart,
  FileCode,
  Layers,
  Eye,
  RefreshCw,
  AlertCircle,
  ArrowUpRight,
  Gauge,
  Database,
  Play,
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

interface AuditPageProps {
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
// 2. Hero Organizational Diagnostic Engine Background
// -----------------------------------------------------------------------------
function DiagnosticEngineBackground() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-25 select-none">
      <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none">
        <defs>
          <linearGradient id="audit-hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f15e1c" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#2e936f" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fab60a" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Abstract Operational Node Containers */}
        <rect x="120" y="80" width="180" height="70" rx="10" stroke="url(#audit-hero-grad)" strokeWidth="1.5" strokeDasharray="4 4" />
        <rect x="900" y="80" width="180" height="70" rx="10" stroke="url(#audit-hero-grad)" strokeWidth="1.5" />
        <rect x="140" y="380" width="200" height="120" rx="12" stroke="url(#audit-hero-grad)" strokeWidth="1.5" />
        <rect x="860" y="360" width="220" height="140" rx="12" stroke="url(#audit-hero-grad)" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Diagnostic Scan Beam */}
        <motion.line
          x1="100" y1="280" x2="1100" y2="280"
          stroke="#f15e1c" strokeWidth="2" strokeDasharray="6 6"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Connection Paths */}
        <path d="M 300 115 L 600 115 L 600 240" stroke="#f15e1c" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 900 115 L 600 115 L 600 240" stroke="#2e936f" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Floating Analytical Badges */}
        <g transform="translate(140, 104)">
          <text x="12" y="16" fill="#f15e1c" fontSize="11" fontFamily="monospace" fontWeight="bold">WORKFLOW VELOCITY</text>
        </g>
        <g transform="translate(920, 104)">
          <text x="12" y="16" fill="#2e936f" fontSize="11" fontFamily="monospace" fontWeight="bold">RESOURCE AUDIT</text>
        </g>
        <g transform="translate(160, 420)">
          <text x="12" y="16" fill="#fab60a" fontSize="11" fontFamily="monospace" fontWeight="bold">CAPITAL LEAKAGE</text>
        </g>
        <g transform="translate(880, 400)">
          <text x="12" y="16" fill="#f15e1c" fontSize="11" fontFamily="monospace" fontWeight="bold">ROI OPTIMIZATION</text>
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
const auditSolutionsData = [
  {
    numStr: "01",
    title: "Operational and Financial Audits",
    subtitle: "In-Depth Workflow & Cost Efficiency Diagnostics",
    description:
      "Our in-depth audits cover operational and financial processes to identify bottlenecks, resource misallocations, and concrete opportunities for improvement.",
    icon: <BarChart3 className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Operational Bottleneck & Resource Audit",
      "Financial Cost-Structure & Capital Leakage Review",
      "Workflow Velocity & Idle-Time Analysis",
      "Prioritized ROI Action & Optimization Plan",
    ],
    metric: "35%",
    metricLabel: "Average Operational Cost Savings",
    stageName: "OPERATIONAL DIAGNOSTIC",
  },
  {
    numStr: "02",
    title: "Compliance and Regulatory Audits",
    subtitle: "Standards Alignment & Vulnerability Scans",
    description:
      "Arav Innovations ensures your organization’s compliance with industry regulations and standards through continuous control verification and gap analysis.",
    icon: <Search className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Regulatory Gap & Standard Alignment Audit",
      "Data Governance & Privacy Checkpoint Verification",
      "Third-Party Vendor Risk & Contract Scans",
      "Audit-Ready Evidence & Compliance Reports",
    ],
    metric: "100%",
    metricLabel: "Audit Readiness & Coverage",
    stageName: "COMPLIANCE VERIFICATION",
  },
  {
    numStr: "03",
    title: "Process Improvement and Optimization",
    subtitle: "Streamlined Workflows & Friction Reduction",
    description:
      "We analyze your current workflows and processes to eliminate redundant steps, automate repetitive handoffs, and accelerate overall delivery speed.",
    icon: <Sliders className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Process Transformation & Redundancy Removal",
      "Automated Workflow Handoff Architecture",
      "Cross-Departmental Efficiency Tuning",
      "SLA & Cycle-Time Reduction Blueprint",
    ],
    metric: "2.8x",
    metricLabel: "Process Execution Velocity",
    stageName: "PROCESS OPTIMIZATION",
  },
  {
    numStr: "04",
    title: "Performance Monitoring & Continuous Improvement",
    subtitle: "Real-Time Telemetry & Ongoing Refinement",
    description:
      "Post-audit, we establish ongoing performance monitoring and support your team in implementing continuous improvement strategies for sustainable growth.",
    icon: <TrendingUp className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Real-Time Telemetry KPI Dashboards",
      "Quarterly Process Performance Reviews",
      "Continuous Optimization Feedback Loop",
      "Dedicated Audit & Efficiency Advisory",
    ],
    metric: "24/7",
    metricLabel: "Continuous Performance Tracking",
    stageName: "CONTINUOUS IMPROVEMENT",
  },
];

const diagnosticTimelineStages = [
  { stage: "01", name: "OBSERVE", desc: "Raw Workflows & Baseline Operational Systems" },
  { stage: "02", name: "AUDIT SCAN", desc: "Evidence Gathering & Capital Leakage Audit" },
  { stage: "03", name: "DIAGNOSE", desc: "Bottleneck Analysis & Idle-Time Identification" },
  { stage: "04", name: "OPTIMIZE", desc: "Process Redesign & Automation Blueprint" },
  { stage: "05", name: "MEASURE", desc: "Continuous Gains & Real-Time Performance Telemetry" },
];

const opportunityMatrixItems = [
  { impact: "HIGH", effort: "LOW", title: "Automate Handoffs", roi: "HIGH ROI", color: "bg-[#2e936f]/20 border-[#2e936f] text-[#2e936f]" },
  { impact: "HIGH", effort: "MED", title: "Cloud FinOps Tuning", roi: "HIGH ROI", color: "bg-[#2e936f]/20 border-[#2e936f] text-[#2e936f]" },
  { impact: "HIGH", effort: "HIGH", title: "ERP Migration", roi: "LONG-TERM", color: "bg-[#fab60a]/20 border-[#fab60a] text-[#fab60a]" },
  { impact: "MED", effort: "LOW", title: "SLA Standardisation", roi: "QUICK WIN", color: "bg-[#2e936f]/15 border-[#2e936f]/50 text-[#2e936f]" },
  { impact: "MED", effort: "MED", title: "Vendor Audit", roi: "MODERATE ROI", color: "bg-[#fab60a]/20 border-[#fab60a] text-[#fab60a]" },
  { impact: "MED", effort: "HIGH", title: "Legacy Refactoring", roi: "SELECTIVE", color: "bg-[#f15e1c]/15 border-[#f15e1c]/40 text-[#f15e1c]" },
  { impact: "LOW", effort: "LOW", title: "Policy Update", roi: "MAINTENANCE", color: "bg-[#2e936f]/10 border-[#2e936f]/30 text-[#2e936f]" },
  { impact: "LOW", effort: "MED", title: "Form Digitisation", roi: "MINOR GAIN", color: "bg-[#2e936f]/10 border-[#2e936f]/30 text-[#2e936f]" },
  { impact: "LOW", effort: "HIGH", title: "Manual Archive", roi: "LOW PRIORITY", color: "bg-[#f15e1c]/15 border-[#f15e1c]/40 text-[#f15e1c]" },
];

const howWeWorkSteps = [
  {
    step: "01",
    title: "Audit and Analyze",
    subtitle: "Operational Health Index & Audit Findings",
    description:
      "We begin by conducting detailed audits across operational, financial, and compliance areas, ensuring a comprehensive understanding of your organization’s strengths and challenges.",
    output: "Operational Health Index & Audit Findings",
  },
  {
    step: "02",
    title: "Identify Opportunities for Improvement",
    subtitle: "Prioritized Opportunity Matrix",
    description:
      "Using audit findings, we identify areas where processes can be optimized, resources can be better allocated, and compliance can be strengthened.",
    output: "Prioritized Opportunity Matrix",
  },
  {
    step: "03",
    title: "Implement Best Practices and Strategies",
    subtitle: "Process Transformation & Execution",
    description:
      "We collaborate with your team to implement targeted improvements, from refining workflows to enhancing compliance measures, for sustainable growth.",
    output: "Process Transformation & Execution",
  },
  {
    step: "04",
    title: "Monitor and Refine",
    subtitle: "Continuous Measurement & Optimization",
    description:
      "Our team establishes performance metrics and monitoring processes to track improvements, refine strategies, and maintain continuous growth and compliance.",
    output: "Continuous Measurement & Optimization",
  },
];

const continuousImprovementLoopSteps = [
  { id: "observe", name: "OBSERVE", desc: "Raw Operational Telemetry" },
  { id: "audit", name: "AUDIT", desc: "Deep Evidence Scan" },
  { id: "diagnose", name: "DIAGNOSE", desc: "Bottleneck Analysis" },
  { id: "improve", name: "IMPROVE", desc: "Process Redesign" },
  { id: "measure", name: "MEASURE", desc: "Quantified Velocity Gains" },
  { id: "refine", name: "REFINE", desc: "Continuous Optimization" },
];

const ctaWords = ["DIAGNOSTIC", "ANALYTICAL", "OPTIMIZED", "MEASURABLE", "REFINED"];

export function AuditInteractivePage({ service }: AuditPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeSolutionIdx, setActiveSolutionIdx] = React.useState<number>(0);
  const [activeScanStage, setActiveScanStage] = React.useState<number>(0);
  const [activeWorkIdx, setActiveWorkIdx] = React.useState<number>(0);
  const [currentWordIdx, setCurrentWordIdx] = React.useState<number>(0);
  const [isProcessOptimized, setIsProcessOptimized] = React.useState<boolean>(false);

  // ---------------------------------------------------------------------------
  // 1. Diagnostic Scan Timeline Scroll Progression
  // ---------------------------------------------------------------------------
  const scanContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: scanProgress } = useScroll({
    target: scanContainerRef,
    offset: ["start 80%", "end 20%"],
  });
  const smoothScanProgress = useSpring(scanProgress, { stiffness: 45, damping: 25 });

  React.useEffect(() => {
    const unsub = smoothScanProgress.on("change", (v) => {
      const count = diagnosticTimelineStages.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedStage = Math.floor(normalized * count);
      setActiveScanStage(calculatedStage);
    });
    return () => unsub();
  }, [smoothScanProgress]);

  // ---------------------------------------------------------------------------
  // 2. 4-Stage Audit Framework Timeline Scroll Line
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
  // 3. Continuous Improvement Loop Signal Motion
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
      const count = continuousImprovementLoopSteps.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedIdx = Math.floor(normalized * count);
      setActiveLoopStep(calculatedIdx);
    });
    return () => unsub();
  }, [smoothLoopProgress]);

  // ---------------------------------------------------------------------------
  // 4. Parallax Background Typography for Audit Philosophy
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

  const activeSolution = auditSolutionsData[activeSolutionIdx];
  const activeWorkStep = howWeWorkSteps[activeWorkIdx];
  const testimonial = testimonialsData.find((t) => t.id === "test-1") || testimonialsData[0];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#12100E] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden selection:bg-[#f15e1c]/20 selection:text-[#f15e1c]">
      
      {/* =========================================================================
          1. HERO — ORGANIZATIONAL DIAGNOSTIC ENGINE & SYSTEM SCAN
          ========================================================================= */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] overflow-hidden select-none">
        <DiagnosticEngineBackground />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-radial from-[#f15e1c]/10 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-radial from-[#2e936f]/8 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto w-full space-y-6 relative z-10">
          {/* Top Breadcrumb & Badge */}
          <div className="space-y-3">
            <Breadcrumb
              items={[
                { label: "Services", href: "/services" },
                { label: "Audit & Improvement" },
              ]}
            />
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]"
            >
              <Sparkles className="w-4 h-4" />
              <span>ORGANIZATIONAL DIAGNOSTICS &amp; PERFORMANCE ENGINE</span>
            </motion.div>
          </div>

          {/* Headline & Hero Copy */}
          <div className="max-w-5xl mx-auto w-full text-center space-y-5 pt-4 pb-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold font-display tracking-tight leading-[1.08] text-[#1b2823] dark:text-[#ffffff]"
            >
              Uncover Insights, Drive <span className="text-[#f15e1c]">Excellence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-base sm:text-xl lg:text-2xl text-[#4a5c55] dark:text-[#d3eee4] max-w-3xl mx-auto font-medium leading-relaxed"
            >
              Comprehensive operational, financial, and compliance audits designed to eliminate friction, optimize cost structures, and accelerate growth.
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
                    Request an Audit
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

          {/* Diagnostic System Status Bar */}
          <div className="pt-4 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 px-4 py-2 rounded-2xl bg-white/80 dark:bg-[#101b17]/80 border border-[#f7d7b0] dark:border-[#253630] backdrop-blur-md shadow-lg text-xs font-mono font-bold text-[#f15e1c]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-ping" />
                STATUS: DIAGNOSTIC ACTIVE
              </span>
              <span className="text-[#7A6A5F]">&bull;</span>
              <span>BOTTLENECKS: IDENTIFIED</span>
              <span className="text-[#7A6A5F]">&bull;</span>
              <span>VELOCITY: +2.8x</span>
            </div>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          2. SOLUTIONS — DIAGNOSTIC SCAN TIMELINE (SIGNATURE SCROLL NARRATIVE)
          ========================================================================= */}
      <section
        id="diagnostic-scan"
        ref={scanContainerRef}
        className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none"
      >
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              DIAGNOSTIC SCAN TIMELINE
            </Badge>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Diagnostic System Narrative
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Scroll down to examine how raw workflows transition from evidence gathering to measured velocity gains.
            </p>
          </div>

          {/* 5-Stage Diagnostic Scan Progress Strip */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] shadow-sm max-w-5xl mx-auto flex items-center justify-between overflow-x-auto gap-2">
            {diagnosticTimelineStages.map((st, i) => (
              <div
                key={st.stage}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold shrink-0 transition-all",
                  i <= activeScanStage
                    ? "bg-[#f15e1c] text-white shadow-xs"
                    : "bg-[#fefaf5] dark:bg-[#172420] text-[#7A6A5F] border border-[#f7d7b0]"
                )}
              >
                <span>{st.stage}</span>
                <span>{st.name}</span>
                {i < 4 && <span className="opacity-60 ml-1">&rarr;</span>}
              </div>
            ))}
          </div>

          {/* Active Diagnostic Stage Detail Card */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={diagnosticTimelineStages[activeScanStage].stage}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="p-8 sm:p-12 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f15e1c]/40 shadow-2xl space-y-6 text-left relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#253630] pb-5">
                  <div>
                    <span className="text-xs font-mono font-black text-[#f15e1c] uppercase tracking-wider block">
                      STAGE {diagnosticTimelineStages[activeScanStage].stage} / 05 &bull; {diagnosticTimelineStages[activeScanStage].name}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mt-1">
                      {diagnosticTimelineStages[activeScanStage].desc}
                    </h3>
                  </div>

                  <div className="px-4 py-2 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] text-xs font-mono font-bold text-[#2e936f] shadow-xs">
                    ORGANIZATIONAL DIAGNOSTIC CORE
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0]/60 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#7A6A5F] block uppercase">DIAGNOSTIC STATUS</span>
                    <span className="text-sm font-mono font-extrabold text-[#f15e1c]">SCAN ACTIVE</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0]/60 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#7A6A5F] block uppercase">COST REDUCTION</span>
                    <span className="text-sm font-mono font-extrabold text-[#2e936f]">35% AVG SAVINGS</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0]/60 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#7A6A5F] block uppercase">EXECUTION GAIN</span>
                    <span className="text-sm font-mono font-extrabold text-[#fab60a]">2.8x VELOCITY</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 4 Solution Workstream Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auditSolutionsData.map((sol, idx) => {
              const isActive = activeSolutionIdx === idx;

              return (
                <TiltCard key={sol.numStr} maxTilt={4} scale={1.01}>
                  <div
                    onClick={() => setActiveSolutionIdx(idx)}
                    onMouseEnter={() => setActiveSolutionIdx(idx)}
                    className={cn(
                      "p-8 rounded-[2.5rem] border-2 transition-all duration-300 cursor-pointer space-y-6 text-left flex flex-col justify-between min-h-[340px] relative overflow-hidden group",
                      isActive
                        ? "bg-white dark:bg-[#101b17] border-[#f15e1c] shadow-2xl ring-2 ring-[#f15e1c]/20"
                        : "bg-[#fefaf5] dark:bg-[#172420] border-[#f7d7b0] dark:border-[#253630] opacity-80 hover:opacity-100"
                    )}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] group-hover:scale-110 transition-transform">
                            {sol.icon}
                          </div>
                          <span className="text-xs font-mono font-black text-[#f15e1c]">
                            DISCIPLINE {sol.numStr}
                          </span>
                        </div>

                        <div className="px-3 py-1 rounded-xl bg-[#fce3d3] dark:bg-[#261f1a] text-xs font-mono font-bold text-[#f15e1c]">
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

                    <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630] space-y-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7A6A5F]">
                        Key Deliverables &amp; Artifacts
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]">
                        {sol.deliverables.map((del, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0]/60 dark:border-[#253630]">
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
          3. OPERATIONAL BOTTLENECK TRANSFORMATION (BEFORE vs AFTER)
          ========================================================================= */}
      <section className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none">
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              BOTTLENECK ANALYSIS
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Friction to Velocity Transformation
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Identifying process bottlenecks, removing idle time, and accelerating operational throughput.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl space-y-8">
            <div className="flex items-center justify-between border-b border-[#f7d7b0] pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-black text-[#f15e1c] uppercase tracking-wider">
                  VISUAL WORKFLOW TRANSFORMATION
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsProcessOptimized(!isProcessOptimized)}
                className="px-4 py-2 rounded-xl bg-[#f15e1c] text-white text-xs font-mono font-bold cursor-pointer hover:bg-[#d44e14] transition-colors"
              >
                TOGGLE STATE: {isProcessOptimized ? "VIEW BEFORE (BOTTLENECK)" : "VIEW AFTER (OPTIMIZED)"}
              </button>
            </div>

            {/* Before vs After Visual Diagram */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] overflow-x-auto">
              <AnimatePresence mode="wait">
                {!isProcessOptimized ? (
                  <motion.div
                    key="before"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between min-w-[650px] gap-3 text-center"
                  >
                    <div className="p-3.5 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] text-xs font-mono font-bold">
                      INPUT &bull; DATA
                    </div>
                    <span>&rarr;</span>
                    <div className="p-3.5 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] text-xs font-mono font-bold">
                      PROCESS A
                    </div>
                    <span>&rarr;</span>
                    <div className="p-4 rounded-2xl bg-[#f15e1c]/15 border-2 border-[#f15e1c] text-xs font-mono font-extrabold text-[#f15e1c] animate-pulse">
                      ██ BOTTLENECK (IDLE TIME) ██
                    </div>
                    <span>&rarr;</span>
                    <div className="p-3.5 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] text-xs font-mono font-bold">
                      PROCESS B
                    </div>
                    <span>&rarr;</span>
                    <div className="p-3.5 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] text-xs font-mono font-bold text-[#7A6A5F]">
                      DELAYED OUTPUT
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="after"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between min-w-[650px] gap-3 text-center"
                  >
                    <div className="p-3.5 rounded-2xl bg-[#e8f5f1] dark:bg-[#192a24] border border-[#2e936f] text-xs font-mono font-bold text-[#2e936f]">
                      INPUT &bull; DATA
                    </div>
                    <span className="text-[#2e936f]">&rarr;</span>
                    <div className="p-3.5 rounded-2xl bg-[#e8f5f1] dark:bg-[#192a24] border border-[#2e936f] text-xs font-mono font-bold text-[#2e936f]">
                      PROCESS A
                    </div>
                    <span className="text-[#2e936f]">&rarr;</span>
                    <div className="p-4 rounded-2xl bg-[#2e936f] text-white text-xs font-mono font-black shadow-lg shadow-[#2e936f]/30">
                      ✓ OPTIMIZED FLOW (+2.8x VELOCITY)
                    </div>
                    <span className="text-[#2e936f]">&rarr;</span>
                    <div className="p-3.5 rounded-2xl bg-[#e8f5f1] dark:bg-[#192a24] border border-[#2e936f] text-xs font-mono font-bold text-[#2e936f]">
                      PROCESS B
                    </div>
                    <span className="text-[#2e936f]">&rarr;</span>
                    <div className="p-3.5 rounded-2xl bg-[#2e936f] text-white text-xs font-mono font-bold">
                      ACCELERATED OUTPUT
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          4. PERFORMANCE METRIC — 35% AVERAGE COST SAVINGS
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#fefaf5] dark:bg-[#172420] select-none">
        <div className="max-w-[1400px] mx-auto space-y-10">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              EFFICIENCY BENCHMARK
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              35% Average Operational Cost Savings
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Eliminating capital leakage, streamlining workforce handoffs, and right-sizing vendor cost structures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: 35,
                suffix: "%",
                label: "Cost Savings",
                desc: "Average operational reduction",
                icon: <BarChart3 className="w-5 h-5 text-[#f15e1c]" />,
              },
              {
                value: 100,
                suffix: "%",
                label: "Audit Coverage",
                desc: "Full process transparency",
                icon: <CheckCircle2 className="w-5 h-5 text-[#2e936f]" />,
              },
              {
                value: 2.8,
                suffix: "x",
                decimals: 1,
                label: "Execution Velocity",
                desc: "Sub-second process throughput",
                icon: <Zap className="w-5 h-5 text-[#fab60a]" />,
              },
              {
                value: 24,
                suffix: "/7",
                label: "Continuous Telemetry",
                desc: "Real-time KPI monitoring",
                icon: <Activity className="w-5 h-5 text-[#f15e1c]" />,
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
          5. OPPORTUNITY MATRIX & DIAGNOSTIC FINDINGS
          ========================================================================= */}
      <section className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none">
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              PRIORITIZED OPPORTUNITY MATRIX
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Diagnostic Opportunity Grid
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Classifying audit findings across Impact vs Implementation Effort to maximize immediate ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 3x3 Impact vs Effort Matrix */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#7A6A5F] border-b border-[#f7d7b0] pb-3">
                <span>EFFORT &darr; vs IMPACT &rarr;</span>
                <span className="text-[#2e936f]">QUICK WINS &bull; HIGH ROI &bull; OPTIMIZED</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {opportunityMatrixItems.map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-4 rounded-2xl border-2 space-y-1 text-center transition-all duration-300 hover:scale-105",
                      item.color
                    )}
                  >
                    <span className="text-[10px] font-mono font-black block uppercase">{item.roi}</span>
                    <div className="text-xs font-extrabold font-display">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Checkpoint Findings Deliverables */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f15e1c]">
                DIAGNOSTIC FINDINGS DELIVERABLES
              </span>
              <div className="space-y-3">
                {auditSolutionsData[0].deliverables.map((del, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] flex items-center gap-3 shadow-xs">
                    <span className="w-7 h-7 rounded-full bg-[#f15e1c] text-white flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      0{i + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#1b2823] dark:text-[#ffffff]">{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          6. 4-STAGE AUDIT & OPTIMIZATION FRAMEWORK (CONTINUOUS TIMELINE)
          ========================================================================= */}
      <section
        ref={timelineContainerRef}
        className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none"
      >
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              CONTINUOUS PERFORMANCE TIMELINE
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              4-Stage Audit &amp; Optimization Framework
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              An audit &rarr; identify &rarr; implement &rarr; monitor methodology connecting continuously back to baseline diagnostic.
            </p>
          </div>

          {/* Framework Progress Line */}
          <div className="relative py-4 max-w-5xl mx-auto">
            <div className="relative w-full bg-[#f7d7b0] dark:bg-[#253630] h-2.5 rounded-full overflow-hidden">
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
                        : "bg-white dark:bg-[#101b17] border-[#f7d7b0] dark:border-[#253630] text-[#7A6A5F]"
                    )}
                  >
                    {isPassed && !isActive ? <Check className="w-4 h-4 text-white" /> : wf.step}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Framework Stage Content */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWorkStep.step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="p-8 sm:p-12 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f15e1c]/40 shadow-2xl space-y-6 text-left relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#253630] pb-5">
                  <div>
                    <span className="text-xs font-mono font-black text-[#f15e1c] uppercase tracking-wider block">
                      STAGE {activeWorkStep.step} / 04 &bull; {activeWorkStep.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mt-1">
                      {activeWorkStep.title}
                    </h3>
                  </div>

                  <div className="px-4 py-2 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] text-xs font-mono font-bold text-[#2e936f] shadow-xs">
                    {activeWorkStep.output}
                  </div>
                </div>

                <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  {activeWorkStep.description}
                </p>

                <div className="pt-3 border-t border-[#f7d7b0] dark:border-[#253630] flex items-center justify-between text-xs font-mono font-bold text-[#f15e1c]">
                  <span>CONTINUOUS PERFORMANCE LOOP</span>
                  <span>STAGE 04 LOOPS BACK TO STAGE 01 &rarr;</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          7. CONTINUOUS IMPROVEMENT LOOP (SIGNATURE VISUAL MOMENT)
          ========================================================================= */}
      <section
        ref={loopContainerRef}
        className="relative py-28 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none"
      >
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              CONTINUOUS IMPROVEMENT LOOP
            </Badge>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Continuous Refinement Engine
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Performance diagnostics are not a one-time report. Real-world insights continuously cycle back into operational refinement.
            </p>
          </div>

          {/* Circular Iteration Loop Display */}
          <div className="relative rounded-[3rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-8 sm:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-radial from-[#f15e1c]/10 via-transparent to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
              {continuousImprovementLoopSteps.map((step, idx) => {
                const isActive = activeLoopStep === idx;

                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveLoopStep(idx)}
                    className={cn(
                      "p-5 rounded-2xl border-2 transition-all duration-300 space-y-2 cursor-pointer text-center relative overflow-hidden",
                      isActive
                        ? "bg-white dark:bg-[#101b17] border-[#f15e1c] shadow-xl scale-105 ring-2 ring-[#f15e1c]/20"
                        : "bg-white/60 dark:bg-[#101b17]/60 border-[#f7d7b0] opacity-75 hover:opacity-100"
                    )}
                  >
                    <span className="text-[10px] font-mono font-black text-[#f15e1c] block">
                      CYCLE 0{idx + 1}
                    </span>
                    <h4 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {step.name}
                    </h4>
                    <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] leading-tight">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Loop Connection Statement */}
            <div className="pt-8 relative z-10 flex items-center justify-center gap-3 text-xs font-mono font-bold text-[#f15e1c]">
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
              <span>OBSERVE &rarr; AUDIT &rarr; DIAGNOSE &rarr; IMPROVE &rarr; MEASURE &rarr; REFINE &rarr; OBSERVE AGAIN</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. EDITORIAL AUDIT STATEMENT & BACKGROUND PARALLAX
          ========================================================================= */}
      <section
        ref={missionRef}
        className="relative py-28 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#ffffff] dark:bg-[#101b17] overflow-hidden select-none"
      >
        {/* Subtle Background Parallax Typography */}
        <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between py-8 opacity-5 dark:opacity-10 font-display font-black text-7xl sm:text-9xl text-[#1b2823] dark:text-[#ffffff] tracking-tighter">
          <motion.div style={{ x: backgroundTextX1 }} className="whitespace-nowrap">
            OBSERVE &bull; DIAGNOSE &bull; AUDIT
          </motion.div>
          <motion.div style={{ x: backgroundTextX2 }} className="whitespace-nowrap text-right">
            IMPROVE &bull; MEASURE &bull; REFINE
          </motion.div>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div ref={statementRef} className="lg:col-span-7 space-y-6 text-left">
            <Badge variant="secondary" size="md">
              AUDIT PHILOSOPHY
            </Badge>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isStatementInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-[1.12] tracking-tight"
            >
              Turning operational insight into <span className="text-[#f15e1c]">measurable improvement</span>.
            </motion.h2>

            <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
              Arav Innovations delivers clear, evidence-backed organizational diagnostics that eliminate friction, protect capital, and drive long-term business performance.
            </p>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-6 flex flex-col justify-between items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-radial from-[#f15e1c]/15 via-[#2e936f]/10 to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center gap-2 pt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]">
                  PERFORMANCE CORE
                </span>
              </div>

              <svg className="w-48 h-48 relative z-10 my-auto" viewBox="0 0 100 100" fill="none">
                <rect x="20" y="20" width="60" height="40" rx="6" stroke="#f15e1c" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="20" y1="35" x2="80" y2="35" stroke="#2e936f" strokeWidth="1.5" />
                <line x1="50" y1="60" x2="50" y2="80" stroke="#fab60a" strokeWidth="2" />
                <circle cx="50" cy="80" r="5" fill="#f15e1c" className="animate-pulse" />
              </svg>

              <span className="relative z-10 text-[11px] font-mono font-bold text-[#2e936f] pb-1">
                CONTINUOUS IMPROVEMENT ENGINE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. CLIENT TESTIMONIAL — ENTERPRISE PROOF
          ========================================================================= */}
      <section ref={testimonialRef} className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-[1400px] mx-auto text-center space-y-8">
          <Badge variant="secondary" size="md">
            KIND WORDS FROM OUR CLIENTS
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
                Audit &amp; Performance Advisory Partner
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. ABOUT OUR CEO — EDITORIAL LEADERSHIP PROFILE
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-[1400px] mx-auto rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-8 sm:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
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
              Leading Arav Innovations with analytical precision, Aryan Sayal guides diagnostic and process engineering squads across India and the UAE to uncover inefficiencies and unlock operational excellence.
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
          11. FINAL CTA — PRODUCT CULMINATION SECTION
          ========================================================================= */}
      <section id="inquire" className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 select-none">
        <div className="max-w-[1400px] mx-auto space-y-8">
          {/* Connector Flow Header: OBSERVE -> AUDIT -> DIAGNOSE -> IMPROVE -> MEASURE */}
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-widest block">
              DIAGNOSTIC CULMINATION
            </span>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">
              <span>OBSERVE</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>AUDIT</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>DIAGNOSE</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>IMPROVE</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span className="text-[#2e936f]">MEASURE</span>
            </div>
          </div>

          <div className="rounded-[3rem] bg-gradient-to-br from-[#f15e1c] via-[#e55215] to-[#d8480d] text-white p-10 sm:p-16 border-2 border-[#fab60a] shadow-2xl space-y-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
                <Sparkles className="w-4 h-4 text-[#ffec69]" />
                <span>OPTIMIZE YOUR OPERATIONS</span>
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
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Evidence-Based Diagnostic Audit
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
          12. FOOTER BRAND MOMENT
          ========================================================================= */}
      <footer className="py-6 border-t border-[#f7d7b0]/60 dark:border-[#253630] bg-[#fefaf5] dark:bg-[#172420] overflow-hidden select-none">
        <div className="flex items-center justify-center gap-6 text-xs sm:text-sm font-mono font-extrabold text-[#7A6A5F] dark:text-[#B8ACA0] tracking-widest">
          <span>OBSERVE</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>AUDIT</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>DIAGNOSE</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>IMPROVE</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>MEASURE</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>REFINE</span>
        </div>
      </footer>
    </div>
  );
}

export default AuditInteractivePage;
