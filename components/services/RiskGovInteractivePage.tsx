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
  ShieldCheck,
  Lock,
  FileText,
  AlertOctagon,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Quote,
  Globe2,
  Zap,
  CheckSquare,
  Shield,
  Activity,
  Eye,
  Check,
  ShieldAlert,
  FileCheck,
  RefreshCw,
  AlertTriangle,
  Users,
  Scale,
  Clock,
  Layers,
  Award,
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

interface RiskGovPageProps {
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
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#2e936f] to-transparent shadow-[0_0_8px_#2e936f]"
        />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 2. Hero Protected Operating Environment Background
// -----------------------------------------------------------------------------
function ProtectedOperatingBackground() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-25 select-none">
      <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none">
        <defs>
          <linearGradient id="riskgov-hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2e936f" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#f15e1c" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fab60a" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Concentric Protection Perimeter Rings */}
        <motion.circle
          cx="600" cy="300" r="140"
          stroke="url(#riskgov-hero-grad)" strokeWidth="1.5" strokeDasharray="4 4"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="600" cy="300" r="240"
          stroke="url(#riskgov-hero-grad)" strokeWidth="1" strokeDasharray="6 6"
          initial={{ rotate: 360 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        />
        <circle cx="600" cy="300" r="320" stroke="#f7d7b0" strokeWidth="0.75" strokeDasharray="2 4" className="dark:stroke-[#253630]" />

        {/* Axis Perimeter Connection Vectors */}
        <line x1="600" y1="160" x2="600" y2="60" stroke="#2e936f" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="600" y1="440" x2="600" y2="540" stroke="#2e936f" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="460" y1="300" x2="260" y2="300" stroke="#f15e1c" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="740" y1="300" x2="940" y2="300" stroke="#fab60a" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Floating Node Badges */}
        <g transform="translate(180, 288)">
          <rect width="120" height="24" rx="6" fill="#f15e1c" fillOpacity="0.15" stroke="#f15e1c" strokeWidth="1" />
          <text x="10" y="16" fill="#f15e1c" fontSize="10" fontFamily="monospace" fontWeight="bold">RISK DETECTED</text>
        </g>
        <g transform="translate(540, 48)">
          <rect width="120" height="24" rx="6" fill="#2e936f" fillOpacity="0.15" stroke="#2e936f" strokeWidth="1" />
          <text x="14" y="16" fill="#2e936f" fontSize="10" fontFamily="monospace" fontWeight="bold">DPDP &bull; ISO 27001</text>
        </g>
        <g transform="translate(900, 288)">
          <rect width="120" height="24" rx="6" fill="#fab60a" fillOpacity="0.15" stroke="#fab60a" strokeWidth="1" />
          <text x="14" y="16" fill="#fab60a" fontSize="10" fontFamily="monospace" fontWeight="bold">RACI GOVERNANCE</text>
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
const riskGovSolutionsData = [
  {
    numStr: "01",
    title: "Risk Assessment and Mitigation",
    subtitle: "Enterprise Vulnerability & Risk Register",
    description:
      "Our team identifies potential risks across your organization, from operational to financial and compliance-related vulnerabilities, establishing prioritized mitigation controls.",
    icon: <ShieldCheck className="w-6 h-6 text-[#2e936f]" />,
    deliverables: [
      "Operational & Technology Threat Landscape Audit",
      "Quantitative Risk Matrix & Vulnerability Register",
      "Executive Financial Impact Exposure Analysis",
      "Targeted Risk Mitigation Control Roadmap",
    ],
    metric: "100%",
    metricLabel: "Organizational Risk Visibility",
    stageName: "RISK IDENTIFICATION",
    riskLevel: "MEDIUM",
    controlStatus: "MITIGATED",
  },
  {
    numStr: "02",
    title: "Regulatory Compliance",
    subtitle: "ISO, GDPR, DPDP & PCI-DSS Alignment",
    description:
      "We ensure your business meets industry regulations and standards such as ISO 27001, GDPR, DPDP Act (India), and PCI-DSS through rigorous control mapping.",
    icon: <CheckSquare className="w-6 h-6 text-[#2e936f]" />,
    deliverables: [
      "DPDP Act (India) & GDPR Data Protection Audit",
      "ISO 27001 Information Security Mapping",
      "PCI-DSS Payment Infrastructure Compliance",
      "Continuous Regulatory Policy Maintenance",
    ],
    metric: "Zero",
    metricLabel: "Compliance Penalty Exposure",
    stageName: "REGULATORY COMPLIANCE",
    riskLevel: "LOW",
    controlStatus: "VERIFIED",
  },
  {
    numStr: "03",
    title: "Governance Framework Development",
    subtitle: "Leadership Structure & Policy Accountability",
    description:
      "We work with your leadership to establish a strong governance structure, defining clear roles, policies, and responsibilities to ensure ethical and defensible operations.",
    icon: <FileText className="w-6 h-6 text-[#2e936f]" />,
    deliverables: [
      "Board-Level IT & Corporate Governance Charter",
      "Clear RACI Responsibility & Decision Framework",
      "Enterprise Policy Lifecycle & Audit Trail",
      "Vendor & Third-Party Governance Standards",
    ],
    metric: "100%",
    metricLabel: "Executive Accountability",
    stageName: "GOVERNANCE CONTROL",
    riskLevel: "LOW",
    controlStatus: "ASSESSED",
  },
  {
    numStr: "04",
    title: "Incident Response & Crisis Management",
    subtitle: "Structured Protocol & Rapid Action",
    description:
      "We offer crisis management training and establish a structured response protocol to ensure swift action in the event of a security breach or compliance violation.",
    icon: <AlertOctagon className="w-6 h-6 text-[#2e936f]" />,
    deliverables: [
      "15-Minute Guaranteed Incident SLA Protocol",
      "Executive Crisis Communication Playbooks",
      "Post-Incident Forensic Audit & Containment",
      "Simulated Threat & Emergency Response Training",
    ],
    metric: "15 min",
    metricLabel: "Incident Containment SLA",
    stageName: "RESILIENCE & RECOVERY",
    riskLevel: "HIGH",
    controlStatus: "CONTAINED",
  },
];

const riskControlPipelineStages = [
  { stage: "01", name: "BUSINESS", desc: "Baseline Operational Environment" },
  { stage: "02", name: "RISK SCAN", desc: "Threat Detection & Vulnerability Register" },
  { stage: "03", name: "GOVERNANCE", desc: "RACI Framework & Leadership Controls" },
  { stage: "04", name: "COMPLIANCE", desc: "ISO 27001, GDPR & DPDP Verification" },
  { stage: "05", name: "RESILIENCE", desc: "Protected Operating System State" },
];

const riskMatrixGrid = [
  { impact: "HIGH", likelihood: "HIGH", level: "CRITICAL", color: "bg-[#f15e1c]/20 border-[#f15e1c] text-[#f15e1c]", count: "02 Threats" },
  { impact: "HIGH", likelihood: "MED", level: "ELEVATED", color: "bg-[#fab60a]/20 border-[#fab60a] text-[#fab60a]", count: "04 Threats" },
  { impact: "HIGH", likelihood: "LOW", level: "MODERATE", color: "bg-[#2e936f]/20 border-[#2e936f] text-[#2e936f]", count: "01 Threat" },
  { impact: "MED", likelihood: "HIGH", level: "ELEVATED", color: "bg-[#fab60a]/20 border-[#fab60a] text-[#fab60a]", count: "03 Threats" },
  { impact: "MED", likelihood: "MED", level: "MODERATE", color: "bg-[#2e936f]/20 border-[#2e936f] text-[#2e936f]", count: "06 Threats" },
  { impact: "MED", likelihood: "LOW", level: "LOW", color: "bg-[#2e936f]/15 border-[#2e936f]/50 text-[#2e936f]", count: "08 Threats" },
  { impact: "LOW", likelihood: "HIGH", level: "MODERATE", color: "bg-[#2e936f]/20 border-[#2e936f] text-[#2e936f]", count: "02 Threats" },
  { impact: "LOW", likelihood: "MED", level: "LOW", color: "bg-[#2e936f]/15 border-[#2e936f]/50 text-[#2e936f]", count: "05 Threats" },
  { impact: "LOW", likelihood: "LOW", level: "MINIMAL", color: "bg-[#2e936f]/10 border-[#2e936f]/30 text-[#2e936f]", count: "12 Threats" },
];

const governanceControlGridNodes = [
  { title: "POLICY CHARTER", sub: "Enterprise Directives", icon: <FileText className="w-5 h-5 text-[#2e936f]" /> },
  { title: "ROLES & RACI", sub: "Defined Accountabilities", icon: <Users className="w-5 h-5 text-[#f15e1c]" /> },
  { title: "CONTROLS", sub: "ISO & DPDP Safeguards", icon: <ShieldCheck className="w-5 h-5 text-[#fab60a]" /> },
  { title: "APPROVALS", sub: "Board & CISO Sign-off", icon: <CheckSquare className="w-5 h-5 text-[#2e936f]" /> },
  { title: "AUDIT TRAIL", sub: "Defensible Evidence Logs", icon: <FileCheck className="w-5 h-5 text-[#f15e1c]" /> },
];

const incidentResponseSteps = [
  { step: "01", name: "DETECT", desc: "Automated Telemetry Signal" },
  { step: "02", name: "CONTAIN", desc: "Sub-15 Minute Isolation Protocol" },
  { step: "03", name: "ASSESS", desc: "Forensic Impact Analysis" },
  { step: "04", name: "RESPOND", desc: "Executive Playbook Execution" },
  { step: "05", name: "RECOVER", desc: "System Restoration & Validation" },
  { step: "06", name: "LEARN", desc: "Post-Incident Audit & Adaptation" },
];

const howWeWorkSteps = [
  {
    step: "01",
    title: "Assess and Identify Risks",
    subtitle: "Enterprise Risk Landscape Audit",
    description:
      "We start with a comprehensive assessment to identify potential risks across all areas of your organization, ensuring no blind spots in your risk landscape.",
    output: "Enterprise Risk Landscape Audit",
  },
  {
    step: "02",
    title: "Develop a Compliance & Governance Framework",
    subtitle: "Target Governance Charter & Controls",
    description:
      "We establish a customized governance and compliance framework, tailored to your organization’s unique requirements and industry standards.",
    output: "Target Governance Charter & Controls",
  },
  {
    step: "03",
    title: "Implement and Train",
    subtitle: "Policy Rollout & Executive Training",
    description:
      "Our team works alongside yours to implement the framework and provides training on compliance, governance best practices, and crisis management.",
    output: "Policy Rollout & Executive Training",
    rolloutNodes: [
      { label: "POLICY", check: true },
      { label: "TEAM", check: true },
      { label: "TRAINING", check: true },
      { label: "ACKNOWLEDGEMENT", check: true },
      { label: "ACTIVE CONTROL ●", isActive: true },
    ],
  },
  {
    step: "04",
    title: "Monitor and Adapt",
    subtitle: "Continuous Monitoring & Quarterly Audits",
    description:
      "We set up regular monitoring and review processes to adapt your framework to new challenges, ensuring ongoing protection and compliance.",
    output: "Continuous Monitoring & Quarterly Audits",
  },
];

const continuousResilienceLoopSteps = [
  { id: "monitor", name: "MONITOR", desc: "Real-Time Compliance Telemetry" },
  { id: "detect", name: "DETECT", desc: "Automated Threat & Policy Scans" },
  { id: "review", name: "REVIEW", desc: "Quarterly Board Audit & RACI Review" },
  { id: "adapt", name: "ADAPT", desc: "Continuous Policy Refactoring" },
];

const ctaWords = ["PROTECTED", "GOVERNED", "COMPLIANT", "AUDITABLE", "RESILIENT"];

export function RiskGovInteractivePage({ service }: RiskGovPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeSolutionIdx, setActiveSolutionIdx] = React.useState<number>(0);
  const [activePipelineStage, setActivePipelineStage] = React.useState<number>(0);
  const [activeWorkIdx, setActiveWorkIdx] = React.useState<number>(0);
  const [currentWordIdx, setCurrentWordIdx] = React.useState<number>(0);

  // ---------------------------------------------------------------------------
  // 1. Risk Control Pipeline Scroll Progression
  // ---------------------------------------------------------------------------
  const pipelineContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: pipelineProgress } = useScroll({
    target: pipelineContainerRef,
    offset: ["start 80%", "end 20%"],
  });
  const smoothPipelineProgress = useSpring(pipelineProgress, { stiffness: 45, damping: 25 });

  React.useEffect(() => {
    const unsub = smoothPipelineProgress.on("change", (v) => {
      const count = riskControlPipelineStages.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedStage = Math.floor(normalized * count);
      setActivePipelineStage(calculatedStage);
    });
    return () => unsub();
  }, [smoothPipelineProgress]);

  // ---------------------------------------------------------------------------
  // 2. 4-Stage Resilience Framework Timeline Scroll Line
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
  // 3. Continuous Resilience Loop Signal Motion
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
      const count = continuousResilienceLoopSteps.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedIdx = Math.floor(normalized * count);
      setActiveLoopStep(calculatedIdx);
    });
    return () => unsub();
  }, [smoothLoopProgress]);

  // ---------------------------------------------------------------------------
  // 4. Parallax Background Typography for Governance Statement
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

  const activeSolution = riskGovSolutionsData[activeSolutionIdx];
  const activeWorkStep = howWeWorkSteps[activeWorkIdx];
  const testimonial = testimonialsData.find((t) => t.id === "test-4") || testimonialsData[3];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#12100E] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden selection:bg-[#2e936f]/20 selection:text-[#2e936f]">
      
      {/* =========================================================================
          1. HERO — PROTECTED OPERATING ENVIRONMENT
          ========================================================================= */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] overflow-hidden select-none">
        <ProtectedOperatingBackground />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-radial from-[#2e936f]/10 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-radial from-[#f15e1c]/8 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto w-full space-y-6 relative z-10">
          {/* Top Breadcrumb & Badge */}
          <div className="space-y-3">
            <Breadcrumb
              items={[
                { label: "Services", href: "/services" },
                { label: "Risk, Compliance & Governance" },
              ]}
            />
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e8f5f1] dark:bg-[#192a24] border border-[#2e936f]/40 text-xs font-mono font-bold text-[#2e936f]"
            >
              <Sparkles className="w-4 h-4" />
              <span>ENTERPRISE GOVERNANCE &amp; RESILIENCE</span>
            </motion.div>
          </div>

          {/* Headline & Hero Copy */}
          <div className="max-w-5xl mx-auto w-full text-center space-y-5 pt-4 pb-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-display tracking-tight leading-[1.08] text-[#1b2823] dark:text-[#ffffff]"
            >
              Protecting Your Business with Comprehensive <span className="text-[#2e936f]">Risk, Compliance, and Governance</span> Solutions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-base sm:text-xl lg:text-2xl text-[#4a5c55] dark:text-[#d3eee4] max-w-3xl mx-auto font-medium leading-relaxed"
            >
              Establishing structured governance charters, ISO 27001 / DPDP compliance alignment, and rapid incident response protocols to safeguard organizational integrity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a href="#inquire" className="w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto">
                  <Button3D
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />}
                    className="w-full sm:w-auto justify-center bg-[#2e936f] hover:bg-[#247558] text-white shadow-lg shadow-[#2e936f]/25"
                  >
                    Inquire About Risk &amp; Governance
                  </Button3D>
                </MagneticButton>
              </a>
              <Link href="/case-studies" className="w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto">
                  <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center">
                    View Compliance Case Studies
                  </Button3D>
                </MagneticButton>
              </Link>
            </motion.div>
          </div>

          {/* Protected Perimeter Status Bar */}
          <div className="pt-4 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 px-4 py-2 rounded-2xl bg-white/80 dark:bg-[#101b17]/80 border border-[#2e936f]/40 backdrop-blur-md shadow-lg text-xs font-mono font-bold text-[#2e936f]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2e936f] animate-ping" />
                PERIMETER: ACTIVE
              </span>
              <span className="text-[#7A6A5F]">&bull;</span>
              <span>THREAT STATUS: CONTROLLED</span>
              <span className="text-[#7A6A5F]">&bull;</span>
              <span>COMPLIANCE: VERIFIED</span>
            </div>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          2. SOLUTIONS — RISK CONTROL PIPELINE (SIGNATURE SCROLL NARRATIVE)
          ========================================================================= */}
      <section
        id="risk-pipeline"
        ref={pipelineContainerRef}
        className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none"
      >
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              RISK CONTROL PIPELINE
            </Badge>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Risk Control Journey
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Scroll down to observe threats moving from raw operational risk to a controlled, resilient state.
            </p>
          </div>

          {/* Pipeline 5-Stage Navigation Strip */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] shadow-sm max-w-5xl mx-auto flex items-center justify-between overflow-x-auto gap-2">
            {riskControlPipelineStages.map((st, i) => (
              <div
                key={st.stage}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold shrink-0 transition-all",
                  i <= activePipelineStage
                    ? "bg-[#2e936f] text-white shadow-xs"
                    : "bg-[#fefaf5] dark:bg-[#172420] text-[#7A6A5F] border border-[#f7d7b0]"
                )}
              >
                <span>{st.stage}</span>
                <span>{st.name}</span>
                {i < 4 && <span className="opacity-60 ml-1">&rarr;</span>}
              </div>
            ))}
          </div>

          {/* Active Pipeline Stage Detail Card */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={riskControlPipelineStages[activePipelineStage].stage}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="p-8 sm:p-12 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#2e936f]/40 shadow-2xl space-y-6 text-left relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#253630] pb-5">
                  <div>
                    <span className="text-xs font-mono font-black text-[#2e936f] uppercase tracking-wider block">
                      STAGE {riskControlPipelineStages[activePipelineStage].stage} / 05 &bull; {riskControlPipelineStages[activePipelineStage].name}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mt-1">
                      {riskControlPipelineStages[activePipelineStage].desc}
                    </h3>
                  </div>

                  <div className="px-4 py-2 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] text-xs font-mono font-bold text-[#2e936f] shadow-xs">
                    PROTECTED OPERATING SYSTEM
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0]/60 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#7A6A5F] block uppercase">RISK LEVEL</span>
                    <span className="text-sm font-mono font-extrabold text-[#f15e1c]">MODERATE TO MITIGATED</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0]/60 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#7A6A5F] block uppercase">CONTROL STATUS</span>
                    <span className="text-sm font-mono font-extrabold text-[#2e936f]">CONTAINED &amp; AUDITED</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0]/60 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#7A6A5F] block uppercase">COMPLIANCE STATE</span>
                    <span className="text-sm font-mono font-extrabold text-[#fab60a]">ISO 27001 &bull; DPDP ACT</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 4 Solution Workstreams Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {riskGovSolutionsData.map((sol, idx) => {
              const isActive = activeSolutionIdx === idx;

              return (
                <TiltCard key={sol.numStr} maxTilt={4} scale={1.01}>
                  <div
                    onClick={() => setActiveSolutionIdx(idx)}
                    onMouseEnter={() => setActiveSolutionIdx(idx)}
                    className={cn(
                      "p-8 rounded-[2.5rem] border-2 transition-all duration-300 cursor-pointer space-y-6 text-left flex flex-col justify-between min-h-[340px] relative overflow-hidden group",
                      isActive
                        ? "bg-white dark:bg-[#101b17] border-[#2e936f] shadow-2xl ring-2 ring-[#2e936f]/20"
                        : "bg-[#fefaf5] dark:bg-[#172420] border-[#f7d7b0] dark:border-[#253630] opacity-80 hover:opacity-100"
                    )}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] group-hover:scale-110 transition-transform">
                            {sol.icon}
                          </div>
                          <span className="text-xs font-mono font-black text-[#2e936f]">
                            WORKSTREAM {sol.numStr}
                          </span>
                        </div>

                        <div className="px-3 py-1 rounded-xl bg-[#e8f5f1] dark:bg-[#192a24] text-xs font-mono font-bold text-[#2e936f]">
                          {sol.metric}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors">
                          {sol.title}
                        </h3>
                        <p className="text-xs font-mono font-semibold text-[#f15e1c] mt-1">
                          {sol.subtitle}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                        {sol.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630] space-y-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7A6A5F]">
                        Key Scope Deliverables
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
          3. RISK MATRIX — ENTERPRISE VULNERABILITY REGISTER
          ========================================================================= */}
      <section className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none">
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              QUANTITATIVE RISK MATRIX
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Enterprise Risk &amp; Threat Register
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Prioritizing technology, operational, and financial exposures across Likelihood vs Impact vectors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 3x3 Impact vs Likelihood Grid */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#7A6A5F] border-b border-[#f7d7b0] pb-3">
                <span>LIKELIHOOD &darr; vs IMPACT &rarr;</span>
                <span className="text-[#2e936f]">IDENTIFY &bull; PRIORITIZE &bull; MITIGATE</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {riskMatrixGrid.map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-4 rounded-2xl border-2 space-y-1 text-center transition-all duration-300 hover:scale-105",
                      item.color
                    )}
                  >
                    <span className="text-[10px] font-mono font-black block uppercase">{item.level}</span>
                    <div className="text-xs font-extrabold font-display">{item.count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Checkpoints Deliverables List */}
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2e936f]">
                CONTROL CHECKPOINTS
              </span>
              <div className="space-y-3">
                {riskGovSolutionsData[0].deliverables.map((del, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] flex items-center gap-3 shadow-xs">
                    <span className="w-7 h-7 rounded-full bg-[#2e936f] text-white flex items-center justify-center text-xs font-mono font-bold shrink-0">
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
          4. PERFORMANCE METRIC — 100% ORGANIZATIONAL RISK VISIBILITY
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#fefaf5] dark:bg-[#172420] select-none">
        <div className="max-w-[1400px] mx-auto space-y-10">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              PERFORMANCE BENCHMARK
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              100% Organizational Risk Visibility
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Complete transparency across information security, regulatory compliance, and RACI accountabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: 100,
                suffix: "%",
                label: "Risk Visibility",
                desc: "Full enterprise audit",
                icon: <Eye className="w-5 h-5 text-[#2e936f]" />,
              },
              {
                value: 0,
                prefix: "Zero",
                suffix: "",
                label: "Compliance Penalty",
                desc: "Strict DPDP / ISO mapping",
                icon: <CheckSquare className="w-5 h-5 text-[#2e936f]" />,
              },
              {
                value: 100,
                suffix: "%",
                label: "Executive Accountability",
                desc: "Board-level RACI charter",
                icon: <Users className="w-5 h-5 text-[#fab60a]" />,
              },
              {
                value: 15,
                suffix: " min",
                label: "Incident Containment SLA",
                desc: "24/7 Rapid response squad",
                icon: <Clock className="w-5 h-5 text-[#f15e1c]" />,
              },
            ].map((stat, idx) => (
              <TiltCard key={idx} maxTilt={5} scale={1.01}>
                <div className="h-full p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#101b17] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-md hover:border-[#2e936f] transition-all duration-300 space-y-4 text-left flex flex-col justify-between relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0]/60">
                      {stat.icon}
                    </div>
                    <span className="text-[#2e936f] text-sm font-bold">↗</span>
                  </div>

                  <div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono text-[#2e936f]">
                      <CounterNumber
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
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
          5. GOVERNANCE GRID & COMPLIANCE VERIFICATION PIPELINE
          ========================================================================= */}
      <section className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none">
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              GOVERNANCE &amp; VERIFICATION
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Governance Grid &amp; Verification Sequence
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Transforming policy mandates into auditable, defensible evidence logs.
            </p>
          </div>

          {/* Governance Control Grid */}
          <div className="p-8 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl space-y-6">
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#2e936f] block">
              GOVERNANCE CONTROL GRID
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {governanceControlGridNodes.map((node, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] text-center space-y-2">
                  <div className="p-2 rounded-xl bg-[#fefaf5] dark:bg-[#172420] w-fit mx-auto">
                    {node.icon}
                  </div>
                  <div className="text-xs font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                    {node.title}
                  </div>
                  <span className="text-[10px] text-[#7A6A5F] block">{node.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Incident Response Protocol Strip */}
          <div className="p-8 rounded-[2.5rem] bg-white dark:bg-[#101b17] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl space-y-6">
            <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#f15e1c] block">
              INCIDENT RESPONSE PROTOCOL (CALM RESPONSE UNDER PRESSURE)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-center">
              {incidentResponseSteps.map((st, i) => (
                <div key={st.step} className="p-3.5 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] space-y-1">
                  <span className="text-[10px] font-mono font-black text-[#f15e1c] block">STEP {st.step}</span>
                  <div className="text-xs font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">{st.name}</div>
                  <span className="text-[10px] text-[#7A6A5F] block leading-tight">{st.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          6. 4-STAGE RESILIENCE FRAMEWORK (RESILIENCE TIMELINE)
          ========================================================================= */}
      <section
        ref={timelineContainerRef}
        className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none"
      >
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              RESILIENCE TIMELINE
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              4-Stage Resilience Framework
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              An audit &rarr; control &rarr; train &rarr; monitor methodology ensuring long-term organizational stability.
            </p>
          </div>

          {/* Software Resilience Timeline Progress Bar */}
          <div className="relative py-4 max-w-5xl mx-auto">
            <div className="relative w-full bg-[#f7d7b0] dark:bg-[#253630] h-2.5 rounded-full overflow-hidden">
              <motion.div
                style={{ width: timelineLineWidth }}
                className="h-full bg-gradient-to-r from-[#2e936f] via-[#f15e1c] to-[#fab60a]"
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
                        ? "bg-[#2e936f] border-white text-white scale-125 shadow-lg shadow-[#2e936f]/40 ring-4 ring-[#2e936f]/20 z-10"
                        : isPassed
                        ? "bg-[#f15e1c] border-white text-white"
                        : "bg-white dark:bg-[#101b17] border-[#f7d7b0] dark:border-[#253630] text-[#7A6A5F]"
                    )}
                  >
                    {isPassed && !isActive ? <Check className="w-4 h-4 text-white" /> : wf.step}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Detail & Special Stage 03 Rollout */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWorkStep.step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="p-8 sm:p-12 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#2e936f]/40 shadow-2xl space-y-6 text-left relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#253630] pb-5">
                  <div>
                    <span className="text-xs font-mono font-black text-[#2e936f] uppercase tracking-wider block">
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

                {/* SPECIAL IMPLEMENT AND TRAIN CONTROL ROLLOUT (STAGE 03) */}
                {activeWorkStep.rolloutNodes && (
                  <div className="pt-3 border-t border-[#f7d7b0] dark:border-[#253630] space-y-3">
                    <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#2e936f] block">
                      CONTROL ROLLOUT (STAGE 03 ORGANIZATIONAL IMPLEMENTATION)
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      {activeWorkStep.rolloutNodes.map((rn, i) => (
                        <div
                          key={i}
                          className={cn(
                            "px-4 py-2 rounded-xl text-xs font-mono font-extrabold flex items-center gap-2 border",
                            rn.isActive
                              ? "bg-[#2e936f] text-white border-[#2e936f] shadow-lg shadow-[#2e936f]/30"
                              : "bg-white dark:bg-[#101b17] text-[#1b2823] dark:text-[#ffffff] border-[#f7d7b0]"
                          )}
                        >
                          {rn.check && <Check className="w-4 h-4 text-[#2e936f]" />}
                          <span>{rn.label}</span>
                          {rn.isActive && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
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
          7. CONTINUOUS RESILIENCE LOOP (SIGNATURE VISUAL MOMENT)
          ========================================================================= */}
      <section
        ref={loopContainerRef}
        className="relative py-28 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none"
      >
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              CONTINUOUS COMPLIANCE MONITORING
            </Badge>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Continuous Resilience Loop
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Risk management is not a one-time audit. It is an ongoing operating process protecting asset integrity.
            </p>
          </div>

          {/* Circular Iteration Loop Display */}
          <div className="relative rounded-[3rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-8 sm:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-radial from-[#2e936f]/10 via-transparent to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              {continuousResilienceLoopSteps.map((step, idx) => {
                const isActive = activeLoopStep === idx;

                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveLoopStep(idx)}
                    className={cn(
                      "p-6 rounded-2xl border-2 transition-all duration-300 space-y-2 cursor-pointer text-center relative overflow-hidden",
                      isActive
                        ? "bg-white dark:bg-[#101b17] border-[#2e936f] shadow-xl scale-105 ring-2 ring-[#2e936f]/20"
                        : "bg-white/60 dark:bg-[#101b17]/60 border-[#f7d7b0] opacity-75 hover:opacity-100"
                    )}
                  >
                    <span className="text-[10px] font-mono font-black text-[#2e936f] block">
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
            <div className="pt-8 relative z-10 flex items-center justify-center gap-3 text-xs font-mono font-bold text-[#2e936f]">
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
              <span>MONITOR &rarr; DETECT &rarr; REVIEW &rarr; ADAPT &rarr; MONITOR</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. EDITORIAL GOVERNANCE STATEMENT & BACKGROUND PARALLAX
          ========================================================================= */}
      <section
        ref={missionRef}
        className="relative py-28 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#ffffff] dark:bg-[#101b17] overflow-hidden select-none"
      >
        {/* Subtle Background Parallax Typography */}
        <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between py-8 opacity-5 dark:opacity-10 font-display font-black text-7xl sm:text-9xl text-[#1b2823] dark:text-[#ffffff] tracking-tighter">
          <motion.div style={{ x: backgroundTextX1 }} className="whitespace-nowrap">
            TRUST &bull; CONTROL &bull; GOVERN
          </motion.div>
          <motion.div style={{ x: backgroundTextX2 }} className="whitespace-nowrap text-right">
            RESILIENCE &bull; COMPLIANCE &bull; AUDIT
          </motion.div>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div ref={statementRef} className="lg:col-span-7 space-y-6 text-left">
            <Badge variant="secondary" size="md">
              GOVERNANCE PRINCIPLE
            </Badge>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isStatementInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-[1.12] tracking-tight"
            >
              Building a <span className="text-[#2e936f]">secure foundation</span> for business growth.
            </motion.h2>

            <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
              Arav Innovations empowers organizations with comprehensive risk, compliance, and governance frameworks that protect asset integrity and inspire market trust.
            </p>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-6 flex flex-col justify-between items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-radial from-[#2e936f]/15 via-[#f15e1c]/10 to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center gap-2 pt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2e936f] animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]">
                  ARAV RESILIENCE CORE
                </span>
              </div>

              <svg className="w-48 h-48 relative z-10 my-auto" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="38" stroke="#f15e1c" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="26" stroke="#2e936f" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="14" stroke="#fab60a" strokeWidth="2" />
                <circle cx="50" cy="50" r="6" fill="#2e936f" className="animate-pulse" />
              </svg>

              <span className="relative z-10 text-[11px] font-mono font-bold text-[#2e936f] pb-1">
                PROTECTED OPERATING SYSTEM
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
            <div className="p-3 rounded-2xl bg-[#2e936f] text-white w-fit mx-auto shadow-md">
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
              <div className="text-xs text-[#2e936f] font-bold">
                {testimonial.designation} &bull; {testimonial.company}
              </div>
              <div className="text-xs font-mono font-bold text-[#f15e1c] pt-1">
                Risk Governance &amp; Compliance Partner
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
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border-2 border-[#2e936f] shadow-xl bg-[#e8f5f1] dark:bg-[#192a24] flex items-center justify-center text-center p-6 space-y-2 flex-col">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#2e936f] text-white flex items-center justify-center text-2xl sm:text-3xl font-black font-display shadow-md">
                AS
              </div>
              <div className="text-lg sm:text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                Aryan Sayal
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-[#2e936f]">
                CEO &amp; Managing Director
              </div>
              <span className="text-xs text-[#f15e1c] font-mono">Arav Innovations</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <Badge variant="secondary" size="md">
              About Our CEO
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
              Aryan Sayal
            </h2>
            <p className="text-xs sm:text-sm font-mono font-extrabold text-[#2e936f] uppercase tracking-wider">
              CEO, Arav Innovations
            </p>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
              Leading Arav Innovations with a steadfast commitment to governance and risk compliance, Aryan Sayal guides enterprise advisory teams across India and the UAE to ensure complete regulatory compliance and operational resilience.
            </p>
            <div className="pt-2">
              <a
                href="https://www.linkedin.com/company/aravinnovations/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2e936f] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#247558] transition-colors"
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
          {/* Connector Flow Header: RISK -> CONTROL -> COMPLIANCE -> RESILIENCE */}
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-extrabold text-[#2e936f] uppercase tracking-widest block">
              ENTERPRISE RESILIENCE CULMINATION
            </span>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">
              <span>RISK</span>
              <span className="text-[#2e936f]">&rarr;</span>
              <span>CONTROL</span>
              <span className="text-[#2e936f]">&rarr;</span>
              <span>COMPLIANCE</span>
              <span className="text-[#2e936f]">&rarr;</span>
              <span className="text-[#f15e1c]">RESILIENCE</span>
            </div>
          </div>

          <div className="rounded-[3rem] bg-gradient-to-br from-[#2e936f] via-[#247558] to-[#1c5c45] text-white p-10 sm:p-16 border-2 border-[#fab60a] shadow-2xl space-y-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
                <Sparkles className="w-4 h-4 text-[#ffec69]" />
                <span>PROTECT YOUR ENTERPRISE</span>
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
                    className="w-full sm:w-auto justify-center bg-white text-[#2e936f] hover:bg-[#f7d7b0]"
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
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> DPDP &amp; ISO 27001 Alignment
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
          <span>ASSESS</span>
          <span className="text-[#2e936f]">&bull;</span>
          <span>CONTROL</span>
          <span className="text-[#2e936f]">&bull;</span>
          <span>GOVERN</span>
          <span className="text-[#2e936f]">&bull;</span>
          <span>VERIFY</span>
          <span className="text-[#2e936f]">&bull;</span>
          <span>RESILIENCE</span>
        </div>
      </footer>
    </div>
  );
}

export default RiskGovInteractivePage;
