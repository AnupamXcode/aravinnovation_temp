"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { BlogCardImage } from "@/components/insights/BlogCardImage";
import {
  Search,
  Activity,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Eye,
  FileCheck,
  Zap,
  Sliders,
  TrendingUp,
  BarChart3,
  Layers,
  ChevronDown,
  ArrowUpRight,
  Compass,
  Code2,
  Users2,
  ShieldCheck,
  Cpu,
  Target,
  FileText,
  Clock,
  HelpCircle,
  AlertOctagon,
  CheckSquare,
  Wrench,
  GitBranch,
  Filter,
  ArrowRightLeft,
  RotateCw,
  SlidersHorizontal,
  Crosshair,
  Maximize2,
  BookOpen,
} from "lucide-react";
import { Service } from "@/data/services";
import { BlogPost, blogPostsData } from "@/data/insights";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";

interface AuditPageProps {
  service: Service;
  relatedPosts?: BlogPost[];
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
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// 2. Diagnostic Inspection Line Scanner Effect
// -----------------------------------------------------------------------------
function DiagnosticScanTransition() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative w-full h-px overflow-hidden pointer-events-none select-none">
      <div className="w-full h-full bg-[#f7d7b0]/30 dark:bg-[#1a1a1a]" />
      {!shouldReduceMotion && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "100%" } : {}}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#f15e1c] to-transparent shadow-[0_0_10px_#f15e1c]"
        />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 3. Diagnostic Matrix Pattern Background
// -----------------------------------------------------------------------------
function DiagnosticDotGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10 dark:opacity-15 select-none">
      <svg className="w-full h-full" width="100%" height="100%">
        <pattern
          id="audit-diagnostic-matrix-pattern"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#f15e1c" opacity="0.6" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#audit-diagnostic-matrix-pattern)" />
      </svg>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Core Business Diagnostic Data
// -----------------------------------------------------------------------------

const keywordTags = [
  "Operational Audit",
  "Internal Audit Support",
  "Process Improvement",
  "Technology Assessment",
  "Control Review",
  "Performance Improvement",
];

// Signature Diagnostic Timeline Stages
const diagnosticViewStages = [
  {
    num: "01",
    title: "OBSERVE",
    question: "How is work actually flowing today?",
    desc: "We observe end-to-end workflows, system handoffs, and team practices in operation to document reality rather than assumptions.",
    output: "Current-State Observation Map & Process Baseline",
    badge: "Process Context",
  },
  {
    num: "02",
    title: "COLLECT",
    question: "What evidence exists?",
    desc: "We gather operational evidence, system integration telemetry, rework logs, policy documentation, and control records.",
    output: "Empirical Diagnostic Repository",
    badge: "Data & Telemetry",
  },
  {
    num: "03",
    title: "ANALYZE",
    question: "Where does friction occur?",
    desc: "We cross-examine evidence against operating benchmarks to isolate bottlenecks, redundancies, and control vulnerabilities.",
    output: "Friction & Gap Matrix",
    badge: "Root Cause Trace",
  },
  {
    num: "04",
    title: "FIND",
    question: "What is holding the business back?",
    desc: "We synthesize findings into clear, plain-language insights detailing operational risk, duplication, and performance gaps.",
    output: "Structured Audit Findings Report",
    badge: "Executive Insight",
  },
  {
    num: "05",
    title: "PRIORITIZE",
    question: "What should be fixed first?",
    desc: "We map all findings by business impact and implementation complexity so leadership knows exactly where to focus first.",
    output: "Impact-Ranked Remediation Roadmap",
    badge: "Action Sequence",
  },
];

// Audit -> Decision Transformation Sequence
const decisionTransformationSteps = [
  { step: "01", title: "FINDING", desc: "Observed process delay or technology control gap", icon: <AlertTriangle className="w-5 h-5 text-[#f15e1c]" /> },
  { step: "02", title: "ROOT CAUSE", desc: "Unclear ownership, legacy software, or missing data", icon: <Search className="w-5 h-5 text-[#2e936f]" /> },
  { step: "03", title: "BUSINESS IMPACT", desc: "Increased cycle time, cost leakage, or risk exposure", icon: <TrendingUp className="w-5 h-5 text-[#fab60a]" /> },
  { step: "04", title: "PRIORITY", desc: "Categorized as Quick Win or Strategic Focus", icon: <SlidersHorizontal className="w-5 h-5 text-[#f15e1c]" /> },
  { step: "05", title: "ACTION", desc: "Streamlined approval workflow & updated ownership", icon: <Wrench className="w-5 h-5 text-[#2e936f]" /> },
  { step: "06", title: "VALIDATION", desc: "Post-implementation check confirming friction reduction", icon: <CheckCircle2 className="w-5 h-5 text-[#fab60a]" /> },
];

// What We Examine (6 Diagnostic Areas)
const diagnosticAreas = [
  {
    num: "01",
    title: "OPERATIONS",
    focus: "Processes • workflows • handoffs • resource use",
    desc: "We examine operational workflows, departmental handoffs, resource allocation, and cycle times to find bottlenecks.",
    icon: <BarChart3 className="w-6 h-6 text-[#f15e1c]" />,
    details: ["Workflow step mapping", "Handoff delay analysis", "Resource allocation balance", "Manual workaround identification"],
  },
  {
    num: "02",
    title: "TECHNOLOGY",
    focus: "Systems • integrations • reliability • dependencies",
    desc: "We evaluate application health, API integration gaps, system outages, and technology debt affecting daily operations.",
    icon: <Cpu className="w-6 h-6 text-[#2e936f]" />,
    details: ["Integration architecture checks", "System uptime & reliability logs", "Technical debt hotspots", "Data flow consistency"],
  },
  {
    num: "03",
    title: "CONTROLS",
    focus: "Policies • procedures • responsibilities • effectiveness",
    desc: "We review operational policies, RACI role clarity, control design, and key control testing effectiveness.",
    icon: <ShieldCheck className="w-6 h-6 text-[#fab60a]" />,
    details: ["Policy-to-practice alignment", "RACI role clarity", "Control execution testing", "Risk mitigation adequacy"],
  },
  {
    num: "04",
    title: "COMPLIANCE",
    focus: "Requirements • documentation • evidence • readiness",
    desc: "We audit documentation completeness, evidence readiness, and internal policy adherence to ensure audit readiness.",
    icon: <FileCheck className="w-6 h-6 text-[#2e936f]" />,
    details: ["Documentation completeness", "Audit-trail verification", "Evidence collection readiness", "Standards alignment"],
  },
  {
    num: "05",
    title: "PERFORMANCE",
    focus: "KPIs • cycle times • bottlenecks • measurement gaps",
    desc: "We analyze key performance metrics, SLA breaches, measurement blind spots, and reporting accuracy.",
    icon: <Activity className="w-6 h-6 text-[#f15e1c]" />,
    details: ["KPI calculation validity", "Cycle-time variance", "Reporting blind spot identification", "SLA tracking accuracy"],
  },
  {
    num: "06",
    title: "CUSTOMER EXPERIENCE",
    focus: "Journeys • friction points • service processes",
    desc: "We evaluate front-line service delivery, customer journey friction points, onboarding delays, and support processes.",
    icon: <Eye className="w-6 h-6 text-[#fab60a]" />,
    details: ["Service process handoffs", "Onboarding bottleneck mapping", "Support escalation pathways", "Customer effort drivers"],
  },
];

// Friction Map Workflow Inspection Points
const frictionPoints = [
  {
    id: "INPUT",
    stage: "01 INPUT",
    label: "INTAKE & REQUEST",
    frictionType: "Unstructured Data Intake",
    description: "Inconsistent request forms and incomplete information at intake lead to downstream clarifications and delays.",
    icon: <FileText className="w-4 h-4 text-[#2e936f]" />,
  },
  {
    id: "PROCESS",
    stage: "02 PROCESS",
    label: "DUPLICATE WORK",
    frictionType: "Manual Re-keying",
    description: "Repeated manual activity and data copy-pasting across systems that indicates process or integration inefficiency.",
    icon: <AlertTriangle className="w-4 h-4 text-[#f15e1c]" />,
  },
  {
    id: "HANDOFF",
    stage: "03 HANDOFF",
    label: "HANDOFF DELAY",
    frictionType: "Unclear RACI Role",
    description: "Handoff stalls caused by ambiguous operational ownership between functional departments.",
    icon: <Clock className="w-4 h-4 text-[#fab60a]" />,
  },
  {
    id: "SYSTEM",
    stage: "04 SYSTEM",
    label: "SYSTEM DEPENDENCY",
    frictionType: "Legacy Silos",
    description: "Manual spreadsheets and isolated tools used to bridge gaps between disconnected enterprise applications.",
    icon: <Wrench className="w-4 h-4 text-[#2e936f]" />,
  },
  {
    id: "DECISION",
    stage: "05 DECISION",
    label: "APPROVAL GAP",
    frictionType: "Multilayer Approvals",
    description: "Unnecessary or sequential approval sign-offs causing severe process throughput bottlenecks.",
    icon: <AlertOctagon className="w-4 h-4 text-[#f15e1c]" />,
  },
  {
    id: "OUTPUT",
    stage: "06 OUTPUT",
    label: "REWORK & DEFECT RISK",
    frictionType: "Quality Variances",
    description: "Quality defects caught late in the cycle requiring costly post-delivery rework and customer friction.",
    icon: <CheckSquare className="w-4 h-4 text-[#2e936f]" />,
  },
];

// Root-Cause Layered Visual Breakdown (Illustrative Example)
const rootCauseLayers = [
  {
    level: "STAGE 1",
    label: "VISIBLE PROBLEM",
    example: "Slow Purchase Order Approval",
    detail: "Approval cycle takes 14 business days instead of the target 2 days.",
    color: "border-l-4 border-l-[#f15e1c] bg-[#f15e1c]/5",
    icon: <Eye className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    level: "STAGE 2",
    label: "PROCESS ISSUE",
    example: "Too Many Sequential Handoffs",
    detail: "Requests pass linearly through 5 different departmental managers.",
    color: "border-l-4 border-l-[#fab60a] bg-[#fab60a]/5",
    icon: <GitBranch className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    level: "STAGE 3",
    label: "CONTRIBUTING FACTOR",
    example: "Unclear Approval Thresholds",
    detail: "Managers review low-value requests due to outdated threshold rules.",
    color: "border-l-4 border-l-[#2e936f] bg-[#2e936f]/5",
    icon: <Layers className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    level: "STAGE 4",
    label: "ROOT CAUSE",
    example: "Process & Governance Design Gap",
    detail: "Approval matrix was created 7 years ago and never updated for current operations.",
    color: "border-l-4 border-l-[#f15e1c] bg-[#f15e1c]/10",
    icon: <Target className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    level: "STAGE 5",
    label: "IMPROVEMENT ACTION",
    example: "Redesign Approval & Delegated Authority",
    detail: "Establish automated tiered approvals, raising auto-approval threshold for low-risk spend.",
    color: "border-l-4 border-l-[#2e936f] bg-[#2e936f]/10",
    icon: <CheckCircle2 className="w-5 h-5 text-[#2e936f]" />,
  },
];

// Global Audit Approach Methodology
const methodologyStages = [
  {
    step: "01",
    name: "DEFINE",
    desc: "Clarify objectives, scope, stakeholders and evaluation criteria before starting.",
    outcome: "Agreed Engagement Charter",
  },
  {
    step: "02",
    name: "UNDERSTAND",
    desc: "Understand processes, systems, controls and operating context through evidence.",
    outcome: "Current-State Baseline",
  },
  {
    step: "03",
    name: "ASSESS",
    desc: "Review empirical evidence and evaluate current-state practices against standards.",
    outcome: "Diagnostic Finding Log",
  },
  {
    step: "04",
    name: "REPORT",
    desc: "Communicate findings, root causes and practical improvement opportunities clearly.",
    outcome: "Executive Audit Report",
  },
  {
    step: "05",
    name: "PRIORITIZE",
    desc: "Separate urgent operational issues from longer-term strategic improvements.",
    outcome: "Prioritized Action Matrix",
  },
  {
    step: "06",
    name: "FOLLOW THROUGH",
    desc: "Support agreed actions and validate progress where requested.",
    outcome: "Progress Verification Check",
  },
];

// Priority Matrix Quadrants
const priorityQuadrants = [
  {
    id: "quick-win",
    title: "QUICK WIN",
    position: "High Impact • Low Effort",
    desc: "Immediate operational improvements that deliver rapid relief with minimal capital or resource commitment.",
    example: "Automating manual data intake validation to eliminate re-keying errors.",
    border: "border-[#2e936f]",
    badgeBg: "bg-[#2e936f]/10 text-[#2e936f]",
  },
  {
    id: "strategic",
    title: "STRATEGIC IMPROVEMENT",
    position: "High Impact • High Effort",
    desc: "Core structural initiatives that transform key operating capabilities and require dedicated resource allocation.",
    example: "Replacing legacy ERP integration layer with modern API architecture.",
    border: "border-[#f15e1c]",
    badgeBg: "bg-[#f15e1c]/10 text-[#f15e1c]",
  },
  {
    id: "operational-fix",
    title: "OPERATIONAL FIX",
    position: "Low Impact • Low Effort",
    desc: "Tactical process cleanups and documentation updates that maintain operating discipline.",
    example: "Updating standard operating procedure manuals for department handoffs.",
    border: "border-[#fab60a]",
    badgeBg: "bg-[#fab60a]/10 text-[#fab60a]",
  },
  {
    id: "long-term",
    title: "LONG-TERM CHANGE",
    position: "Low Impact • High Effort",
    desc: "Complex secondary adjustments evaluated carefully to determine if return on effort warrants scheduling.",
    example: "Consolidating non-critical peripheral reporting tools across regional offices.",
    border: "border-gray-300 dark:border-gray-700",
    badgeBg: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
  },
];

// Deliverables List
const deliverables = [
  { title: "CURRENT-STATE FINDINGS", desc: "Comprehensive baseline documenting observed workflows, system state, and operating practices." },
  { title: "ROOT-CAUSE INSIGHTS", desc: "Detailed breakdown of underlying structural, process, or technology drivers behind friction points." },
  { title: "CONTROL & PROCESS OBSERVATIONS", desc: "Independent assessment of operating policies, RACI role clarity, and control effectiveness." },
  { title: "PRIORITIZED IMPROVEMENT OPPORTUNITIES", desc: "Ranked remediation actions categorized by commercial value and effort complexity." },
  { title: "MANAGEMENT INSIGHTS", desc: "Executive debrief highlighting critical risks, resource bottlenecks, and strategic priorities." },
  { title: "ACTION ROADMAP", desc: "Sequential execution timeline detailing quick wins, milestone dependencies, and validation criteria." },
];

// Business Outcomes
const businessOutcomes = [
  { title: "CLARITY", desc: "Understand current-state performance with an empirical, objective baseline.", icon: <Eye className="w-5 h-5 text-[#f15e1c]" /> },
  { title: "EFFICIENCY", desc: "Reduce avoidable friction, manual duplication, and process handoff stalls.", icon: <Zap className="w-5 h-5 text-[#2e936f]" /> },
  { title: "CONTROL", desc: "Strengthen operational ownership, RACI clarity, and governance discipline.", icon: <ShieldCheck className="w-5 h-5 text-[#fab60a]" /> },
  { title: "PRIORITY", desc: "Focus management attention and resources where they deliver the greatest impact.", icon: <Target className="w-5 h-5 text-[#f15e1c]" /> },
  { title: "VISIBILITY", desc: "Make operational gaps and technology dependencies easier to discuss and resolve.", icon: <BarChart3 className="w-5 h-5 text-[#2e936f]" /> },
  { title: "ADAPTABILITY", desc: "Create a resilient, evidence-backed foundation for continuous business change.", icon: <RefreshCw className="w-5 h-5 text-[#fab60a]" /> },
];

// What We Can Help Uncover
const scopeHelpUncover = [
  { title: "Process Bottlenecks", desc: "Handoff stalls, redundant reviews, and manual workarounds slowing down service delivery." },
  { title: "Control Gaps", desc: "Unclear role ownership, missing audit trails, or ineffective control execution." },
  { title: "Technology Friction", desc: "Application disconnects, fragile integrations, and system performance regressions." },
  { title: "Operational Inefficiencies", desc: "Resource allocation imbalances and duplicate data entry across departments." },
  { title: "Documentation Gaps", desc: "Outdated standard operating procedures and unmapped technical architectures." },
  { title: "Performance Blind Spots", desc: "Untracked cycle-time variances and unmeasured operational handoff delays." },
];

// -----------------------------------------------------------------------------
// Component Implementation
// -----------------------------------------------------------------------------
export function AuditInteractivePage({ service, relatedPosts }: AuditPageProps) {
  const shouldReduceMotion = useReducedMotion();

  // State management for interactive features
  const [activeTimelineStage, setActiveTimelineStage] = React.useState(0);
  const [activeDecisionStep, setActiveDecisionStep] = React.useState(0);
  const [activeDomain, setActiveDomain] = React.useState(0);
  const [activeFrictionPoint, setActiveFrictionPoint] = React.useState(1); // Default: Duplicate Work
  const [activeRootLayer, setActiveRootLayer] = React.useState(3); // Default: Root Cause
  const [activeMatrixQuadrant, setActiveMatrixQuadrant] = React.useState<string | null>("quick-win");
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);
  const [activeLoopStep, setActiveLoopStep] = React.useState(0);

  // Auto-advance loop step for Continuous Improvement Cycle
  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveLoopStep((prev) => (prev + 1) % 6);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const articles = relatedPosts && relatedPosts.length > 0 ? relatedPosts.slice(0, 4) : blogPostsData.slice(0, 3);

  // FAQ Schema Structured Data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <div className="relative w-full min-h-screen bg-[#ffffff] dark:bg-[#000000] text-[#1b2823] dark:text-[#f3f4f6] font-sans selection:bg-[#f15e1c] selection:text-white overflow-x-hidden min-w-0 box-border">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <DiagnosticDotGrid />

      {/* Breadcrumb Navigation */}
      <div className="relative z-10 w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-3 sm:pt-4 pb-1 sm:pb-2">
        <Breadcrumb
          items={[
            { label: "Services", href: "/services" },
            { label: "Audit & Improvement", href: "/services/audit-improvement" },
          ]}
        />
      </div>

      {/* =====================================================================
          2. HERO SECTION
          ===================================================================== */}
      <section className="relative z-10 w-full border-b border-gray-100 dark:border-gray-800/60">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-2 sm:pt-4 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            
            {/* Hero Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2">
                <Badge variant="outline" className="border-[#f15e1c]/40 text-[#f15e1c] bg-[#f15e1c]/5 px-3.5 py-1.5 font-semibold tracking-wider text-xs rounded-full shadow-xs hover:bg-[#f15e1c]/10 transition-colors">
                  AUDIT • ASSURANCE • IMPROVEMENT
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-[1.12]">
                See What’s Working. <br className="hidden sm:inline" />
                Find What Isn’t. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f15e1c] via-[#fab60a] to-[#2e936f]">
                  Improve What Matters.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                We assess processes, technology, controls and operating practices to uncover gaps, understand root causes and turn evidence into practical improvement priorities.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/contact">
                  <Button3D variant="primary" size="lg" className="flex items-center gap-2 font-semibold hover:scale-102 transition-transform">
                    Start an Assessment
                    <ArrowRight className="w-4 h-4" />
                  </Button3D>
                </Link>
                <a href="#diagnostic-view">
                  <Button3D variant="secondary" size="lg" className="flex items-center gap-2 font-medium hover:scale-102 transition-transform">
                    Explore Our Approach
                  </Button3D>
                </a>
              </div>

              {/* Keywords Bar */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800/80">
                <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2.5">
                  Core Diagnostic Areas
                </p>
                <div className="flex flex-wrap gap-2">
                  {keywordTags.map((tag, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="text-xs px-3.5 py-1.5 rounded-lg bg-gray-100 dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-[#f15e1c]/60 hover:bg-[#f15e1c]/10 hover:text-[#f15e1c] transition-all duration-200 cursor-pointer shadow-xs font-medium"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Regulatory Positioning Disclaimer */}
              <p className="text-xs text-gray-500 dark:text-gray-400 italic pt-1">
                Note: Arav Innovations provides independent operational, process, and technology diagnostics. We do not act as a statutory financial auditor, regulatory authority, or accredited certification body.
              </p>
            </div>

            {/* Hero Visual Card (Side-by-side Layout with Scaled Image) */}
            <div className="lg:col-span-6 w-full">
              <TiltCard className="w-full">
                <div className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-b from-[#ffffff] to-[#fefaf5] dark:from-[#1b2823] dark:to-[#1b2823] border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden group hover:border-[#f15e1c]/50 transition-all duration-300">
                  
                  {/* Visual Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]">
                        Business Diagnostic Visual
                      </span>
                    </div>
                    <Badge variant="subtle" className="text-[10px] bg-[#2e936f]/10 text-[#2e936f] font-semibold">
                      System Blueprint
                    </Badge>
                  </div>

                  {/* Side-by-Side Content Grid inside Hero Card */}
                  <div className="my-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    {/* Compact Image */}
                    <div className="sm:col-span-7 relative rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-black/5 dark:bg-black/40 group-hover:shadow-md transition-shadow">
                      <Image
                        src="/images/audit-and-improvement-main.png"
                        alt="Arav Innovations Business Diagnostic Audit & Improvement Architecture"
                        width={600}
                        height={380}
                        priority
                        className="w-full h-auto max-h-[260px] sm:max-h-[280px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-102"
                      />
                    </div>

                    {/* Side-by-Side Key Summary Highlights */}
                    <div className="sm:col-span-5 space-y-2.5">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-[#000000] border border-gray-200 dark:border-gray-800 hover:border-[#f15e1c]/40 transition-colors">
                        <span className="text-[10px] font-mono font-bold text-[#f15e1c] uppercase block">Phase 01</span>
                        <span className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff]">Evidence Mapping</span>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">Document actual operational workflows and system telemetry.</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white dark:bg-[#000000] border border-gray-200 dark:border-gray-800 hover:border-[#fab60a]/40 transition-colors">
                        <span className="text-[10px] font-mono font-bold text-[#fab60a] uppercase block">Phase 02</span>
                        <span className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff]">Gap & Friction Trace</span>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">Isolate root cause bottlenecks and control weaknesses.</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white dark:bg-[#000000] border border-gray-200 dark:border-gray-800 hover:border-[#2e936f]/40 transition-colors">
                        <span className="text-[10px] font-mono font-bold text-[#2e936f] uppercase block">Phase 03</span>
                        <span className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff]">Action Roadmap</span>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">Deliver prioritized remediation focused on high ROI quick wins.</p>
                      </div>
                    </div>
                  </div>

                  {/* Nodes Summary Strip */}
                  <div className="grid grid-cols-3 gap-2 text-center py-2.5 border-t border-gray-200 dark:border-gray-800">
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-[#0a0a0a] hover:bg-[#f15e1c]/5 transition-colors cursor-pointer">
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 block font-mono">OBSERVE</span>
                      <span className="text-xs font-bold text-[#f15e1c]">Workflows</span>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-[#0a0a0a] hover:bg-[#fab60a]/5 transition-colors cursor-pointer">
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 block font-mono">IDENTIFY</span>
                      <span className="text-xs font-bold text-[#fab60a]">Root Cause</span>
                    </div>
                    <div className="p-2 rounded-lg bg-gray-50 dark:bg-[#0a0a0a] hover:bg-[#2e936f]/5 transition-colors cursor-pointer">
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 block font-mono">IMPROVE</span>
                      <span className="text-xs font-bold text-[#2e936f]">Validated</span>
                    </div>
                  </div>

                  {/* Visual Communication Badge */}
                  <div className="pt-2.5 border-t border-gray-200 dark:border-gray-800 text-center">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 italic">
                      “We examine how the organization actually works.”
                    </p>
                  </div>

                </div>
              </TiltCard>
            </div>

          </div>
        </div>
      </section>

      <DiagnosticScanTransition />

      {/* =====================================================================
          4. NEW SIGNATURE SECTION: THE DIAGNOSTIC VIEW
          ===================================================================== */}
      <section id="diagnostic-view" className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#ffffff] via-[#fefaf5]/40 to-[#ffffff] dark:from-[#1b2823] dark:via-[#1b2823] dark:to-[#1b2823] border-b border-gray-100 dark:border-gray-800/60">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#2e936f]/40 text-[#2e936f] bg-[#2e936f]/5 px-3 py-1 text-xs">
              THE DIAGNOSTIC VIEW
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              You Can't Improve What You Can't See.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Improvement starts with an accurate view of the current state. We examine evidence, workflows, controls, technology and operating practices to understand where friction, risk, duplication, inconsistency or performance gaps may exist. The result is not simply a report—it is a clearer basis for deciding what to improve next.
            </p>
          </AnimatedSection>

          {/* Connected Diagnostic Timeline (OBSERVE -> COLLECT -> ANALYZE -> FIND -> PRIORITIZE) */}
          <div className="w-full bg-gradient-to-b from-gray-50 to-white dark:from-[#1b2823] dark:to-[#1b2823] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg">
            
            {/* Stage Controls Header */}
            <div className="flex overflow-x-auto gap-2.5 pb-4 md:grid md:grid-cols-5 md:gap-4 sm:pb-8 border-b border-gray-200 dark:border-gray-800 scrollbar-none">
              {diagnosticViewStages.map((stage, idx) => (
                <button
                  key={stage.num}
                  onClick={() => setActiveTimelineStage(idx)}
                  className={cn(
                    "shrink-0 min-w-[130px] sm:min-w-[150px] md:min-w-0 md:shrink p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 flex flex-col justify-between border cursor-pointer group hover:scale-102 hover:shadow-md",
                    activeTimelineStage === idx
                      ? "bg-[#F15E1C] text-[#FFFFFF] border-[#f15e1c] shadow-lg ring-2 ring-[#f15e1c]/20"
                      : "bg-transparent border-transparent hover:bg-gray-100/80 dark:hover:bg-[#1b2823] hover:border-gray-300 dark:hover:border-gray-700"
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={cn(
                      "text-xs font-mono font-bold px-2 py-0.5 rounded transition-colors",
                      activeTimelineStage === idx ? "bg-[#f15e1c] text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-[#f15e1c]/20 group-hover:text-[#f15e1c]"
                    )}>
                      {stage.num}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Stage</span>
                  </div>
                  <div className="mt-2 text-sm font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                    {stage.title}
                  </div>
                </button>
              ))}
            </div>

            {/* Active Stage Display Panel (Side-by-Side Layout with Image & Text) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTimelineStage}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="pt-6 sm:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                
                {/* Left Side: Stage Text Details & Deliverables */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2">
                    <Badge variant="subtle" className="bg-[#f15e1c]/10 text-[#f15e1c] font-semibold">
                      {diagnosticViewStages[activeTimelineStage].badge}
                    </Badge>
                    <span className="text-xs text-gray-400 font-mono">
                      Phase {diagnosticViewStages[activeTimelineStage].num} of 05
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1b2823] dark:text-[#ffffff]">
                    {diagnosticViewStages[activeTimelineStage].title}: {diagnosticViewStages[activeTimelineStage].question}
                  </h3>

                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {diagnosticViewStages[activeTimelineStage].desc}
                  </p>

                  <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#000000] border border-gray-200 dark:border-gray-800 flex items-start gap-3 hover:border-[#2e936f]/40 transition-colors shadow-xs">
                    <FileCheck className="w-5 h-5 text-[#2e936f] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                        Diagnostic Output
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#1b2823] dark:text-[#ffffff]">
                        {diagnosticViewStages[activeTimelineStage].output}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Resized Visual Diagram Side-by-Side with Text */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
                  <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#000000] shadow-md group hover:border-[#f15e1c]/40 transition-all duration-300">
                    <div className="p-3 bg-gray-50 dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#f15e1c] animate-ping" />
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                          Architecture Map
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                        Stage {diagnosticViewStages[activeTimelineStage].num} Visual
                      </span>
                    </div>
                    <div className="p-2 bg-black/5 dark:bg-black/30">
                      <Image
                        src="/images/audit-and-improvement.png"
                        alt="Arav Innovations End-to-End Operational Diagnostic View Architecture"
                        width={700}
                        height={400}
                        className="w-full h-auto max-h-[260px] sm:max-h-[300px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-102"
                      />
                    </div>
                  </div>

                  {/* Interactive Timeline Visual Node Indicator */}
                  <div className="w-full p-3 rounded-xl bg-white dark:bg-[#000000] border border-gray-200 dark:border-gray-800 text-center flex items-center justify-between text-xs font-medium">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-[#f15e1c] animate-pulse" />
                      <span className="font-bold text-[#1b2823] dark:text-[#ffffff]">{diagnosticViewStages[activeTimelineStage].title} STAGE ACTIVE</span>
                    </div>
                    <div className="flex gap-1.5">
                      {diagnosticViewStages.map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-300",
                            activeTimelineStage === i ? "w-5 bg-[#f15e1c]" : "w-1.5 bg-gray-300 dark:bg-gray-700"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </section>

      <DiagnosticScanTransition />

      {/* =====================================================================
          5. AUDIT -> DECISION
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 border-b border-gray-100 dark:border-gray-800/60">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#fab60a]/40 text-[#fab60a] bg-[#fab60a]/5 px-3 py-1 text-xs">
              DECISION FRAMEWORK
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              An Audit Should Lead to a Decision.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              A finding becomes valuable when people understand why it exists, what it affects and what should happen next.
            </p>
          </AnimatedSection>

          {/* Visual Transformation Sequence Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 xl:gap-6">
            {decisionTransformationSteps.map((stepItem, idx) => (
              <motion.div
                key={stepItem.step}
                whileHover={{ scale: 1.03, y: -4 }}
                onClick={() => setActiveDecisionStep(idx)}
                className={cn(
                  "cursor-pointer p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between relative group hover:shadow-xl",
                  activeDecisionStep === idx
                    ? "bg-white dark:bg-[#000000] border-[#f15e1c] shadow-lg ring-2 ring-[#f15e1c]/20"
                    : "bg-gray-50 dark:bg-[#0a0a0a] border-gray-200 dark:border-gray-800 hover:border-[#f15e1c]/50 hover:bg-white dark:hover:bg-[#1b2823]"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#f15e1c] group-hover:scale-110 transition-transform">
                    {stepItem.step}
                  </span>
                  <div className="p-1.5 rounded-md bg-gray-100 dark:bg-[#0a0a0a] group-hover:bg-[#f15e1c]/10 transition-colors">
                    {stepItem.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                    {stepItem.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {stepItem.desc}
                  </p>
                </div>
                {idx < decisionTransformationSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-20 pointer-events-none group-hover:text-[#f15e1c] transition-colors" />
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <DiagnosticScanTransition />

      {/* =====================================================================
          6. WHAT WE ASSESS (WHAT WE EXAMINE)
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50/50 dark:bg-[#0a0a0a]/50 border-b border-gray-100 dark:border-gray-800/60">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#f15e1c]/40 text-[#f15e1c] bg-[#f15e1c]/5 px-3 py-1 text-xs">
              WHAT WE EXAMINE
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Look Beyond the Surface.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              We inspect cross-functional domains to evaluate how processes, technology, and operating discipline work together.
            </p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic">
              Note: Assessment scope is tailored to each engagement based on organizational priorities and objectives. Assessments do not necessarily cover all six domains simultaneously.
            </p>
          </AnimatedSection>

          {/* Interactive Diagnostic Map (6 Compact Areas) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Navigation Tabs */}
            <div className="flex overflow-x-auto gap-2.5 pb-3 lg:flex-col lg:space-y-3 lg:gap-0 lg:pb-0 scrollbar-none lg:col-span-5 xl:col-span-4">
              {diagnosticAreas.map((area, idx) => (
                <button
                  key={area.num}
                  onClick={() => setActiveDomain(idx)}
                  className={cn(
                    "shrink-0 min-w-[170px] sm:min-w-[200px] lg:min-w-0 lg:w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer group hover:scale-101 hover:shadow-md",
                    activeDomain === idx
                      ? "bg-white dark:bg-[#000000] border-[#f15e1c] shadow-md ring-1 ring-[#f15e1c]"
                      : "bg-gray-100/70 dark:bg-[#0a0a0a] border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-[#1b2823] hover:border-[#f15e1c]/40"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#0a0a0a] group-hover:bg-[#f15e1c]/10 transition-colors">
                      {area.icon}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#f15e1c] block">
                        {area.num}
                      </span>
                      <span className="text-sm font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                        {area.title}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className={cn("w-4 h-4 transition-transform duration-200 hidden sm:block", activeDomain === idx ? "text-[#f15e1c] translate-x-1" : "text-gray-400 group-hover:text-[#f15e1c] group-hover:translate-x-1")} />
                </button>
              ))}
            </div>

            {/* Interactive Domain Detail Viewer (Side-by-Side Image and Points Layout) */}
            <div className="lg:col-span-7 xl:col-span-8 bg-white dark:bg-[#000000] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDomain}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-[#f15e1c]/10 text-[#f15e1c]">
                        {diagnosticAreas[activeDomain].icon}
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-[#f15e1c]">
                          AREA {diagnosticAreas[activeDomain].num}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#1b2823] dark:text-[#ffffff]">
                          {diagnosticAreas[activeDomain].title}
                        </h3>
                      </div>
                    </div>
                    <Badge variant="subtle" className="text-xs bg-[#2e936f]/10 text-[#2e936f] font-semibold">
                      Diagnostic Focus
                    </Badge>
                  </div>

                  <p className="text-sm font-semibold text-[#f15e1c] font-mono">
                    {diagnosticAreas[activeDomain].focus}
                  </p>
                  <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {diagnosticAreas[activeDomain].desc}
                  </p>

                  {/* Side-by-Side Grid: Left Text Points, Right Compact Image Visual */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    
                    {/* Left Column: Key Examination Points */}
                    <div className="sm:col-span-7 space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
                        Key Examination Points
                      </span>
                      <div className="space-y-2">
                        {diagnosticAreas[activeDomain].details.map((item, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: 1.02, x: 4 }}
                            className="flex items-center gap-2.5 text-xs font-medium text-[#1b2823] dark:text-[#f3f4f6] p-3 rounded-xl bg-gray-50 dark:bg-[#0a0a0a] border border-gray-100 dark:border-gray-800 hover:border-[#2e936f]/50 hover:bg-[#2e936f]/5 transition-all cursor-pointer shadow-xs"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Resized Compact Graphic Side-by-Side */}
                    <div className="sm:col-span-5 flex justify-center">
                      <div className="w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-black/5 dark:bg-black/20 group hover:border-[#f15e1c]/40 transition-all duration-300 shadow-md">
                        <Image
                          src="/images/audit-and-improvement-secondary.png"
                          alt="Arav Innovations Process, Control & Technology Examination Scope"
                          width={500}
                          height={300}
                          className="w-full h-auto max-h-[220px] sm:max-h-[250px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-102"
                        />
                        <div className="p-2 bg-gray-50 dark:bg-[#0a0a0a] text-center border-t border-gray-200 dark:border-gray-800">
                          <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
                            {diagnosticAreas[activeDomain].title} Inspection Matrix
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      <DiagnosticScanTransition />

      {/* =====================================================================
          7. NEW INTERACTIVE ELEMENT — FRICTION MAP
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 border-b border-gray-100 dark:border-gray-800/60">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#f15e1c]/40 text-[#f15e1c] bg-[#f15e1c]/5 px-3 py-1 text-xs">
              INTERACTIVE DIAGNOSTIC MAP
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Where Does the Friction Live?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Click or select inspection points across an illustrative business workflow to reveal common operational friction points.
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 italic">
              Illustrative operational workflow showing sample diagnostic inspection points.
            </p>
          </AnimatedSection>

          {/* Workflow Track */}
          <div className="bg-gradient-to-b from-gray-50 to-white dark:from-[#1b2823] dark:to-[#1b2823] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg">
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 pb-6 sm:pb-8">
              {frictionPoints.map((fp, idx) => (
                <button
                  key={fp.id}
                  onClick={() => setActiveFrictionPoint(idx)}
                  className={cn(
                    "p-4 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between relative group cursor-pointer hover:scale-102 hover:shadow-md",
                    activeFrictionPoint === idx
                      ? "bg-white dark:bg-[#000000] border-[#f15e1c] shadow-lg ring-2 ring-[#f15e1c]/30"
                      : "bg-gray-100/70 dark:bg-[#0a0a0a] border-gray-200 dark:border-gray-800 hover:border-[#f15e1c]/50 hover:bg-white dark:hover:bg-[#1b2823]"
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400">
                      {fp.stage}
                    </span>
                    <div className="p-1 rounded bg-white dark:bg-[#000000] group-hover:bg-[#f15e1c]/10 transition-colors">
                      {fp.icon}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                    {fp.label}
                  </span>
                  <span className="text-[10px] text-[#f15e1c] font-semibold mt-1 block group-hover:translate-x-0.5 transition-transform">
                    Inspect →
                  </span>
                </button>
              ))}
            </div>

            {/* Active Friction Explanation Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFrictionPoint}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-xl bg-white dark:bg-[#000000] border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start gap-4 hover:border-[#f15e1c]/40 transition-colors shadow-sm"
              >
                <div className="p-3 rounded-xl bg-[#f15e1c]/10 text-[#f15e1c] shrink-0">
                  {frictionPoints[activeFrictionPoint].icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#f15e1c]">
                      INSPECTION POINT: {frictionPoints[activeFrictionPoint].label}
                    </span>
                    <Badge variant="subtle" className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-semibold">
                      {frictionPoints[activeFrictionPoint].frictionType}
                    </Badge>
                  </div>
                  <h4 className="text-base font-bold text-[#1b2823] dark:text-[#ffffff]">
                    {frictionPoints[activeFrictionPoint].frictionType}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {frictionPoints[activeFrictionPoint].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </section>

      <DiagnosticScanTransition />

      {/* =====================================================================
          8. ROOT-CAUSE ANALYSIS
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50/40 dark:bg-[#0d121c]/40 border-b border-gray-100 dark:border-gray-800/60">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <Badge variant="outline" className="mb-3 border-[#2e936f]/40 text-[#2e936f] bg-[#2e936f]/5 px-3 py-1 text-xs">
              DIAGNOSTIC DEPTH
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Don't Fix the Symptom. Find the Cause.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Surface problems are usually symptoms of deeper process, control, or design gaps. We trace issues layer by layer to uncover true root causes.
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 italic">
              Illustrative diagnostic breakdown showing root cause isolation sequence.
            </p>
          </AnimatedSection>

          {/* Animated Layered Visual Breakdown */}
          <div className="max-w-5xl mx-auto space-y-3 sm:space-y-4">
            {rootCauseLayers.map((layer, idx) => (
              <motion.div
                key={layer.level}
                whileHover={{ scale: 1.02, x: 4 }}
                onClick={() => setActiveRootLayer(idx)}
                className={cn(
                  "cursor-pointer p-5 rounded-xl transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border hover:shadow-lg",
                  layer.color,
                  activeRootLayer === idx
                    ? "shadow-lg scale-101 ring-1 ring-gray-400 dark:ring-gray-600"
                    : "opacity-85 hover:opacity-100"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-white dark:bg-[#000000] shadow-xs shrink-0">
                    {layer.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400 block">
                      {layer.level}: {layer.label}
                    </span>
                    <h3 className="text-base font-bold text-[#1b2823] dark:text-[#ffffff]">
                      {layer.example}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 sm:max-w-md text-left sm:text-right">
                  {layer.detail}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <DiagnosticScanTransition />

      {/* =====================================================================
          9. GLOBAL AUDIT APPROACH
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 border-b border-gray-100 dark:border-gray-800/60">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#fab60a]/40 text-[#fab60a] bg-[#fab60a]/5 px-3 py-1 text-xs">
              AUDIT METHODOLOGY
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              An Approach Built Around Evidence.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Our audit approach applies internationally recognized principles to ensure findings are objective, thorough, and practical.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <span className="text-xs px-3.5 py-1.5 rounded-full bg-gray-100 dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 font-semibold border border-gray-200 dark:border-gray-800 hover:border-[#f15e1c]/40 transition-colors cursor-pointer">
                IIA Global Internal Audit Standards Alignment
              </span>
              <span className="text-xs px-3.5 py-1.5 rounded-full bg-gray-100 dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 font-semibold border border-gray-200 dark:border-gray-800 hover:border-[#2e936f]/40 transition-colors cursor-pointer">
                ISO 19011 Auditing Principles
              </span>
            </div>
          </AnimatedSection>

          {/* 6-Stage Methodology Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {methodologyStages.map((stage) => (
              <motion.div
                key={stage.step}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#000000] border border-gray-200 dark:border-gray-800 hover:border-[#f15e1c]/60 hover:shadow-xl transition-all duration-300 shadow-sm flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#f15e1c] px-2 py-0.5 rounded bg-[#f15e1c]/10 group-hover:bg-[#f15e1c] group-hover:text-white transition-colors">
                      STAGE {stage.step}
                    </span>
                    <Badge variant="subtle" className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-semibold">
                      Standardized Step
                    </Badge>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1b2823] dark:text-[#ffffff] mb-2 group-hover:text-[#f15e1c] transition-colors">
                    {stage.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {stage.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-mono">Deliverable:</span>
                  <span className="font-semibold text-[#2e936f] group-hover:translate-x-0.5 transition-transform">{stage.outcome}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <DiagnosticScanTransition />

      {/* =====================================================================
          10. PRIORITY MATRIX
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50/50 dark:bg-[#0a0a0a]/50 border-b border-gray-100 dark:border-gray-800/60">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#f15e1c]/40 text-[#f15e1c] bg-[#f15e1c]/5 px-3 py-1 text-xs">
              ACTION PRIORITIZATION
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Not Every Finding Needs the Same Response.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              We categorize findings on an Impact vs. Effort matrix to ensure executive focus is directed toward high-value quick wins and essential strategic improvements.
            </p>
          </AnimatedSection>

          {/* Clean Interactive 2x2 Matrix */}
          <div className="bg-gradient-to-b from-gray-50 to-white dark:from-[#1b2823] dark:to-[#1b2823] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg">
            
            <div className="text-center mb-6">
              <span className="text-xs font-mono font-bold text-[#f15e1c] uppercase tracking-wider">
                Y-AXIS: BUSINESS IMPACT (LOW → HIGH) • X-AXIS: IMPLEMENTATION EFFORT (LOW → HIGH)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {priorityQuadrants.map((quad) => (
                <div
                  key={quad.id}
                  onMouseEnter={() => setActiveMatrixQuadrant(quad.id)}
                  className={cn(
                    "p-6 sm:p-8 rounded-xl border-2 transition-all duration-200 cursor-pointer bg-white dark:bg-[#000000]",
                    quad.border,
                    activeMatrixQuadrant === quad.id ? "shadow-xl ring-2 ring-[#f15e1c]/20 scale-101" : "opacity-90 hover:opacity-100"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={cn("text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider", quad.badgeBg)}>
                      {quad.title}
                    </span>
                    <span className="text-xs font-mono text-gray-400">
                      {quad.position}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {quad.desc}
                  </p>
                  <div className="p-3.5 rounded-lg bg-gray-50 dark:bg-[#0a0a0a] border border-gray-100 dark:border-gray-800">
                    <span className="text-[11px] font-semibold text-gray-400 block uppercase mb-1">Sample Finding:</span>
                    <span className="text-xs sm:text-sm font-medium text-[#1b2823] dark:text-[#f3f4f6]">{quad.example}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <DiagnosticScanTransition />

      {/* =====================================================================
          11. BEFORE -> AFTER
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 border-b border-gray-100 dark:border-gray-800/60">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#2e936f]/40 text-[#2e936f] bg-[#2e936f]/5 px-3 py-1 text-xs">
              OPERATIONAL TRANSFORMATION
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              From Findings to Better Ways of Working.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              See how evidence-based diagnostics replace operational uncertainty with structured clarity and defined ownership.
            </p>
          </AnimatedSection>

          {/* Interactive Side-by-Side State Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* BEFORE CARD */}
            <motion.div whileHover={{ y: -4 }} className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-red-50/50 to-white dark:from-[#1a1214] dark:to-[#1b2823] border border-red-200 dark:border-red-900/40 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400">
                  BEFORE ASSESSMENT
                </h3>
              </div>
              <ul className="space-y-3 pt-2">
                {[
                  "Limited Visibility into actual workflow bottlenecks",
                  "Manual Handoffs creating unnecessary delay and errors",
                  "Unclear Ownership across overlapping department roles",
                  "Process Friction requiring constant employee workarounds",
                  "Reactive Decisions based on intuition rather than data",
                ].map((item, idx) => (
                  <motion.li key={idx} whileHover={{ x: 4 }} className="flex items-start gap-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 cursor-pointer">
                    <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-1" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* AFTER CARD */}
            <motion.div whileHover={{ y: -4 }} className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-emerald-50/50 to-white dark:from-[#0d1c17] dark:to-[#1b2823] border border-emerald-200 dark:border-emerald-900/40 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#2e936f] animate-pulse" />
                <h3 className="text-xl font-bold text-[#2e936f]">
                  AFTER IMPROVEMENT
                </h3>
              </div>
              <ul className="space-y-3 pt-2">
                {[
                  "Clearer Processes mapped end-to-end with verified baselines",
                  "Defined Ownership with explicit RACI governance roles",
                  "Better Visibility across system dependencies and SLA metrics",
                  "Prioritized Actions focused on high-value quick wins",
                  "Continuous Improvement embedded into operating rhythms",
                ].map((item, idx) => (
                  <motion.li key={idx} whileHover={{ x: 4 }} className="flex items-start gap-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 cursor-pointer">
                    <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0 mt-1" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      <DiagnosticScanTransition />

      {/* =====================================================================
          12. DELIVERABLES
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50/50 dark:bg-[#0a0a0a]/50 border-b border-gray-100 dark:border-gray-800/60">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#fab60a]/40 text-[#fab60a] bg-[#fab60a]/5 px-3 py-1 text-xs">
              ENGAGEMENT OUTPUTS
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              What You Take Away.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Every engagement delivers clear, objective artifacts designed for executive decision-making and team execution.
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 italic">
              Engagement deliverables are tailored to project scope and may include:
            </p>
          </AnimatedSection>

          {/* Clean Editorial Deliverables List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {deliverables.map((del, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#000000] border border-gray-200 dark:border-gray-800 hover:border-[#f15e1c]/60 hover:shadow-xl transition-all duration-300 shadow-sm group cursor-pointer"
              >
                <span className="text-xs font-mono font-bold text-[#f15e1c] block mb-2 group-hover:translate-x-0.5 transition-transform">
                  DELIVERABLE 0{i + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#1b2823] dark:text-[#ffffff] mb-2 group-hover:text-[#f15e1c] transition-colors">
                  {del.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {del.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <DiagnosticScanTransition />

      {/* =====================================================================
          13. CONTINUOUS IMPROVEMENT
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 border-b border-gray-100 dark:border-gray-800/60">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#2e936f]/40 text-[#2e936f] bg-[#2e936f]/5 px-3 py-1 text-xs">
              OPERATIONAL RHYTHM
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Improvement Is a Cycle, Not a Report.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              The value of an assessment increases when findings lead to action, action is reviewed, and lessons become part of how the organization operates.
            </p>
          </AnimatedSection>

          {/* Unique Circular Diagnostic Cycle: SEE -> DECIDE -> CHANGE -> CHECK -> LEARN -> REPEAT */}
          <div className="bg-gradient-to-b from-gray-50 to-white dark:from-[#1b2823] dark:to-[#1b2823] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-lg">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 text-center">
              {[
                { title: "SEE", desc: "Observe current state & evidence", icon: <Eye className="w-5 h-5" /> },
                { title: "DECIDE", desc: "Prioritize high-impact changes", icon: <SlidersHorizontal className="w-5 h-5" /> },
                { title: "CHANGE", desc: "Execute agreed action plan", icon: <Wrench className="w-5 h-5" /> },
                { title: "CHECK", desc: "Validate progress & metrics", icon: <CheckCircle2 className="w-5 h-5" /> },
                { title: "LEARN", desc: "Integrate operating lessons", icon: <BookOpen className="w-5 h-5" /> },
                { title: "REPEAT", desc: "Maintain continuous cycle", icon: <RotateCw className="w-5 h-5" /> },
              ].map((cycleStep, i) => (
                <motion.div
                  key={cycleStep.title}
                  whileHover={{ scale: 1.06, y: -4 }}
                  onClick={() => setActiveLoopStep(i)}
                  className={cn(
                    "cursor-pointer p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-between h-40 group hover:shadow-xl",
                    activeLoopStep === i
                      ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-lg scale-105"
                      : "bg-white dark:bg-[#000000] text-[#1b2823] dark:text-[#ffffff] border-gray-200 dark:border-gray-800 hover:border-[#f15e1c]/50"
                  )}
                >
                  <div className={cn("p-2 rounded-lg transition-transform group-hover:rotate-6", activeLoopStep === i ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-[#0a0a0a] text-[#f15e1c]")}>
                    {cycleStep.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold block opacity-80">0{i + 1}</span>
                    <span className="text-sm font-bold block">{cycleStep.title}</span>
                  </div>
                  <p className={cn("text-[10px] leading-tight", activeLoopStep === i ? "text-white/90" : "text-gray-500 dark:text-gray-400")}>
                    {cycleStep.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <DiagnosticScanTransition />

      {/* =====================================================================
          14. BUSINESS OUTCOMES
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50/50 dark:bg-[#0a0a0a]/50 border-b border-gray-100 dark:border-gray-800/60">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#f15e1c]/40 text-[#f15e1c] bg-[#f15e1c]/5 px-3 py-1 text-xs">
              VALUE DELIVERED
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              What Better Visibility Enables.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Evidence-based diagnostics give leadership the confidence to act on facts rather than assumptions.
            </p>
          </AnimatedSection>

          {/* 6 Qualitative Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {businessOutcomes.map((out) => (
              <motion.div
                key={out.title}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#000000] border border-gray-200 dark:border-gray-800 hover:border-[#2e936f]/60 hover:shadow-xl transition-all duration-300 shadow-sm flex items-start gap-4 group cursor-pointer"
              >
                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#0a0a0a] group-hover:bg-[#2e936f]/10 transition-colors shrink-0">
                  {out.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors">
                    {out.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {out.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <DiagnosticScanTransition />

      {/* =====================================================================
          15. CASE STUDIES / SCOPE: WHAT WE CAN HELP UNCOVER
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 border-b border-gray-100 dark:border-gray-800/60">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#fab60a]/40 text-[#fab60a] bg-[#fab60a]/5 px-3 py-1 text-xs">
              DIAGNOSTIC SCOPE
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              What We Can Help Uncover.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Our diagnostics help leaders identify hidden operational risks, workflow drag, and system reliability gaps.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {scopeHelpUncover.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02, y: -4 }}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#000000] border border-gray-200 dark:border-gray-800 hover:border-[#2e936f]/60 hover:shadow-xl transition-all duration-300 shadow-sm space-y-2 group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-[#2e936f] group-hover:scale-110 transition-transform" />
                  <h3 className="text-base sm:text-lg font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <DiagnosticScanTransition />

      {/* =====================================================================
          16. INSIGHTS INTEGRATION
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50/50 dark:bg-[#0a0a0a]/50 border-b border-gray-100 dark:border-gray-800/60">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="outline" className="mb-3 border-[#f15e1c]/40 text-[#f15e1c] bg-[#f15e1c]/5 px-3 py-1 text-xs">
              KNOWLEDGE BASE
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Audit & Improvement Insights.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Read published analysis on operational audits, process optimization, and technology governance.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((post) => (
              <Link key={post.slug} href={`/insights/${post.slug}`} className="group block">
                <motion.div whileHover={{ y: -4 }} className="h-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#000000] border border-gray-200 dark:border-gray-800 hover:border-[#f15e1c] hover:shadow-xl transition-all duration-300 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-full mb-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                      <BlogCardImage post={post} aspectRatio="aspect-video" />
                    </div>
                    <Badge variant="subtle" className="mb-3 text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold">
                      {post.category}
                    </Badge>
                    <h3 className="text-base sm:text-lg font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-semibold text-[#f15e1c]">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/insights">
              <Button3D variant="secondary" size="md">
                Explore All Insights
              </Button3D>
            </Link>
          </div>

        </div>
      </section>

      <DiagnosticScanTransition />

      {/* =====================================================================
          17. FAQ SECTION
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24 border-b border-gray-100 dark:border-gray-800/60">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <Badge variant="outline" className="mb-3 border-[#2e936f]/40 text-[#2e936f] bg-[#2e936f]/5 px-3 py-1 text-xs">
              QUESTIONS & ANSWERS
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Frequently Asked Questions.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Concise answers regarding scope, methodology, prioritization, and post-audit support.
            </p>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto space-y-4">
            {service.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#000000] overflow-hidden transition-all hover:border-[#f15e1c]/40 hover:shadow-md"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between font-bold text-sm sm:text-base text-[#1b2823] dark:text-[#ffffff] hover:text-[#f15e1c] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={cn("w-5 h-5 transition-transform duration-200 text-[#f15e1c]", isOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="p-5 pt-0 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800/60 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <DiagnosticScanTransition />

      {/* =====================================================================
          18. FINAL CTA
          ===================================================================== */}
      <section className="relative z-10 w-full py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
          <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-[#1b2823] text-white border border-[#2e936f]/40 shadow-2xl overflow-hidden text-center space-y-6">
            
            {/* Ambient Brand Color Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#f15e1c]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#2e936f]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#fab60a]/15 rounded-full blur-3xl pointer-events-none" />

            <Badge variant="outline" className="border-[#f15e1c] text-[#f15e1c] bg-[#f15e1c]/10 px-3 py-1 font-semibold tracking-wider text-xs">
              TAKE THE NEXT STEP
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
              Know What Needs to Change Before You Change It.
            </h2>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Start with evidence, understand the root causes and turn your findings into a practical improvement path.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/contact">
                <Button3D variant="primary" size="lg" className="flex items-center gap-2 font-semibold hover:scale-102 transition-transform">
                  Start an Assessment
                  <ArrowRight className="w-4 h-4" />
                </Button3D>
              </Link>
              <Link href="/contact">
                <Button3D variant="secondary" size="lg" className="flex items-center gap-2 font-medium hover:scale-102 transition-transform">
                  Talk to an Advisor
                </Button3D>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

