"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
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
} from "lucide-react";
import { Service } from "@/data/services";
import { BlogPost, blogPostsData } from "@/data/insights";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
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
// 2. Diagnostic Scan Transition Line (Diagnostic Inspection Line Effect)
// -----------------------------------------------------------------------------
function DiagnosticScanTransition() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative w-full h-px my-1 overflow-hidden pointer-events-none select-none">
      <div className="w-full h-full bg-[#f7d7b0]/30 dark:bg-[#1a1a1a]" />
      {!shouldReduceMotion && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "100%" } : {}}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#f15e1c] to-transparent shadow-[0_0_10px_#f15e1c]"
        />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 3. Diagnostic Matrix Grid Background
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
// Data Collections for Audit & Improvement Diagnostic System
// -----------------------------------------------------------------------------

const keywordTags = [
  "Operational Audit",
  "Process Improvement",
  "Technology Review",
  "Compliance",
  "Performance",
  "Continuous Improvement",
];

// Hero Diagnostic Nodes
const heroDiagnosticNodes = [
  { id: "BUSINESS", label: "BUSINESS HEALTH", desc: "Strategy & Operational Goals", icon: <Target className="w-4 h-4 text-[#f15e1c]" /> },
  { id: "PROCESS", label: "PROCESSES", desc: "Workflows & Handoff Friction", icon: <GitBranch className="w-4 h-4 text-[#2e936f]" /> },
  { id: "SYSTEMS", label: "SYSTEMS", desc: "Tech Stack & Reliability", icon: <Cpu className="w-4 h-4 text-[#fab60a]" /> },
  { id: "PEOPLE", label: "PEOPLE & ROLES", desc: "RACI & Operational Ownership", icon: <Users2 className="w-4 h-4 text-[#2e936f]" /> },
  { id: "EVIDENCE", label: "EVIDENCE DATA", desc: "Metrics & Incident Records", icon: <FileCheck className="w-4 h-4 text-[#f15e1c]" /> },
  { id: "IMPROVEMENT", label: "ROADMAP", desc: "Action Plan & Validation", icon: <RefreshCw className="w-4 h-4 text-[#2e936f]" /> },
];

// Section 4: Signature Diagnostic View (OBSERVE -> COLLECT -> ANALYZE -> FIND -> PRIORITIZE)
const diagnosticViewStages = [
  {
    num: "01",
    title: "OBSERVE",
    question: "How is work actually flowing today?",
    desc: "Examine end-to-end operational workflows, actual employee practices, and technology touchpoints in practice.",
    output: "Current-state process observation map",
  },
  {
    num: "02",
    title: "COLLECT",
    question: "What evidence exists?",
    desc: "Gather system performance telemetry, process handoff logs, rework metrics, and compliance records.",
    output: "Empirical diagnostic evidence repository",
  },
  {
    num: "03",
    title: "ANALYZE",
    question: "Where does friction occur?",
    desc: "Cross-examine evidence against process benchmarks to isolate bottlenecks, redundancies, and control gaps.",
    output: "Friction & root-cause diagnostic matrix",
  },
  {
    num: "04",
    title: "FIND",
    question: "What is holding the business back?",
    desc: "Synthesize diagnostic findings into clear operational insights, cost leakage points, and security vulnerabilities.",
    output: "Structured audit findings report",
  },
  {
    num: "05",
    title: "PRIORITIZE",
    question: "What should be fixed first?",
    desc: "Map findings against commercial impact and effort complexity to construct an actionable remediation sequence.",
    output: "Impact-ranked improvement roadmap",
  },
];

// Section 5: Audit Decision Transformation Sequence
const decisionTransformationSteps = [
  { step: "01", title: "AUDIT FINDING", desc: "Observed process bottleneck or system gap" },
  { step: "02", title: "WHY IT MATTERS", desc: "Commercial impact & customer friction" },
  { step: "03", title: "ROOT CAUSE", desc: "Underlying structural or tool dependency" },
  { step: "04", title: "PRIORITY", desc: "High-impact focus vs tactical fix" },
  { step: "05", title: "ACTION", desc: "Redesigned workflow & operational control" },
  { step: "06", title: "VALIDATION", desc: "Empirical metric review & continuous check" },
];

// Section 6: What We Examine (6 Diagnostic Areas)
const diagnosticAreas = [
  {
    num: "01",
    title: "OPERATIONS",
    focus: "Processes • workflows • bottlenecks • resource utilisation",
    desc: "Examine handoffs, cycle times, manual interventions, and operational bottlenecks across teams.",
    icon: <BarChart3 className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    num: "02",
    title: "TECHNOLOGY",
    focus: "Systems • integrations • technical friction • reliability",
    desc: "Evaluate software stack alignment, API integration gaps, system outages, and technical debt.",
    icon: <Cpu className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    num: "03",
    title: "FINANCE",
    focus: "Cost structures • leakage • inefficiencies • process controls",
    desc: "Identify cloud overspending, redundant tool licenses, financial workflow leaks, and cost controls.",
    icon: <TrendingUp className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    num: "04",
    title: "COMPLIANCE",
    focus: "Policies • controls • evidence • regulatory alignment",
    desc: "Audit policy adherence, RACI role clarity, control testing effectiveness, and evidence readiness.",
    icon: <FileCheck className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    num: "05",
    title: "PERFORMANCE",
    focus: "KPIs • handoffs • delays • measurement gaps",
    desc: "Review key performance indicators, SLA breaches, team handoff delays, and reporting blind spots.",
    icon: <Activity className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    num: "06",
    title: "CUSTOMER & USER EXPERIENCE",
    focus: "Journeys • friction • drop-offs • service processes",
    desc: "Diagnose user onboarding drop-offs, service desk resolution friction, and customer journey gaps.",
    icon: <Eye className="w-5 h-5 text-[#fab60a]" />,
  },
];

// Section 7: Friction Map Workflow Points
const frictionPoints = [
  {
    id: "INPUT",
    type: "WORKFLOW STEP",
    name: "INPUT & INTAKE",
    friction: "Unstructured Data Intake",
    detail: "Information gaps or inconsistent request formats at entry point.",
    icon: <FileText className="w-4 h-4 text-[#2e936f]" />,
  },
  {
    id: "PROCESS",
    type: "FRICTION POINT",
    name: "DUPLICATE WORK",
    friction: "Manual Re-keying",
    detail: "Repeated manual activity indicating process or integration inefficiency.",
    icon: <AlertTriangle className="w-4 h-4 text-[#f15e1c]" />,
  },
  {
    id: "HANDOFF",
    type: "FRICTION POINT",
    name: "HANDOFF DELAY",
    friction: "Unclear RACI Role",
    detail: "Handoff stalls caused by ambiguous ownership between departments.",
    icon: <Clock className="w-4 h-4 text-[#fab60a]" />,
  },
  {
    id: "SYSTEM",
    type: "FRICTION POINT",
    name: "SYSTEM DEPENDENCY",
    friction: "Legacy Silos",
    detail: "Manual spreadsheets filling gaps between disconnected software platforms.",
    icon: <Wrench className="w-4 h-4 text-[#2e936f]" />,
  },
  {
    id: "DECISION",
    type: "FRICTION POINT",
    name: "APPROVAL GAP",
    friction: "Multilayer Approvals",
    detail: "Unnecessary approval layers causing delivery bottlenecks.",
    icon: <AlertOctagon className="w-4 h-4 text-[#f15e1c]" />,
  },
  {
    id: "OUTPUT",
    type: "WORKFLOW STEP",
    name: "OUTPUT & DELIVERY",
    friction: "Rework & Defect Risk",
    detail: "Errors requiring post-delivery remediation and customer friction.",
    icon: <CheckSquare className="w-4 h-4 text-[#2e936f]" />,
  },
];

// Section 8: Root-Cause Illustrative Example
const rootCauseExample = [
  { stage: "VISIBLE PROBLEM", text: "Slow Approval Response Time", color: "text-[#f15e1c]" },
  { stage: "PROCESS ISSUE", text: "Too Many Handoffs Across 4 Teams", color: "text-[#fab60a]" },
  { stage: "CONTROL FACTOR", text: "Unclear RACI Ownership & Thresholds", color: "text-[#2e936f]" },
  { stage: "ROOT CAUSE", text: "Outdated Approval Matrix Design Gap", color: "text-[#f15e1c]" },
  { stage: "IMPROVEMENT ACTION", text: "Redesign Approval Flow with Automated Controls", color: "text-[#2e936f]" },
];

// Section 9: 6 Methodology Stages (From Finding to Fix)
const methodologyStages = [
  {
    step: "01",
    title: "DISCOVER",
    desc: "Understand business objectives, audit scope, key stakeholders and the operating environment.",
    output: "Audit scope & stakeholder charter",
  },
  {
    step: "02",
    title: "OBSERVE",
    desc: "Examine end-to-end workflows, system logs, control documentation and actual operating practices.",
    output: "Empirical observation records",
  },
  {
    step: "03",
    title: "ANALYZE",
    desc: "Compare evidence against performance baselines to isolate bottlenecks, gaps and dependencies.",
    output: "Root-cause analysis matrix",
  },
  {
    step: "04",
    title: "PRIORITIZE",
    desc: "Separate critical business risks and quick wins from lower-value structural improvements.",
    output: "2-Axis priority matrix",
  },
  {
    step: "05",
    title: "IMPROVE",
    desc: "Define actionable remediation plans, redesign processes and support implementation where agreed.",
    output: "Target state operating model",
  },
  {
    step: "06",
    title: "VALIDATE",
    desc: "Review post-implementation telemetry to confirm the issue was solved and plan next steps.",
    output: "Validation report & continuous check",
  },
];

// Section 10: Priority Matrix Quadrants
const priorityMatrixQuadrants = [
  {
    quadrant: "QUICK WINS",
    impact: "HIGH IMPACT",
    effort: "LOW EFFORT",
    badge: "DO FIRST",
    color: "border-[#2e936f] bg-[#f0f9f5] dark:bg-[#05140d]",
    textAccent: "text-[#2e936f]",
    items: ["Process handoff simplification", "Eliminating duplicate data entry", "Policy documentation updates"],
  },
  {
    quadrant: "STRATEGIC IMPROVEMENTS",
    impact: "HIGH IMPACT",
    effort: "HIGH EFFORT",
    badge: "PLAN & EXECUTE",
    color: "border-[#f15e1c] bg-[#fff5f2] dark:bg-[#120805]",
    textAccent: "text-[#f15e1c]",
    items: ["Core system integration", "Workflow automation engine", "Data governance framework"],
  },
  {
    quadrant: "OPERATIONAL FIXES",
    impact: "LOW IMPACT",
    effort: "LOW EFFORT",
    badge: "SCHEDULE",
    color: "border-[#fab60a] bg-[#fffdf0] dark:bg-[#141205]",
    textAccent: "text-[#fab60a]",
    items: ["Minor SLA template updates", "Form standardization", "Team checklist adjustments"],
  },
  {
    quadrant: "LONG-TERM TRANSFORMATION",
    impact: "LOW IMPACT",
    effort: "HIGH EFFORT",
    badge: "DEFER / EVALUATE",
    color: "border-[#7A6A5F] bg-[#fefaf5] dark:bg-[#0a0a0a]",
    textAccent: "text-[#7A6A5F]",
    items: ["Legacy platform replacement", "Complete org structure overhaul", "Custom internal tooling"],
  },
];

// Section 11: Roadmap Timeline (NOW -> NEXT -> LATER)
const roadmapPhases = [
  {
    phase: "NOW",
    timeframe: "IMMEDIATE FOCUS",
    color: "border-[#f15e1c]",
    items: ["Critical process bottlenecks", "Immediate control safeguards", "High-impact cost leakage fixes"],
  },
  {
    phase: "NEXT",
    timeframe: "OPERATIONAL PHASE",
    color: "border-[#2e936f]",
    items: ["Workflow redesign & optimization", "Technology integration enhancements", "SLA & handoff metrics tracking"],
  },
  {
    phase: "LATER",
    timeframe: "CONTINUOUS PHASE",
    color: "border-[#fab60a]",
    items: ["Structural business transformation", "Automated telemetry & monitoring", "Continuous audit & improvement rhythm"],
  },
];

// Section 13: What You Receive (Deliverables)
const auditDeliverables = [
  { title: "CURRENT-STATE FINDINGS", desc: "Empirical documentation of observed workflows, gaps, and friction points." },
  { title: "ROOT-CAUSE ANALYSIS", desc: "Detailed breakdown of underlying process, system, or RACI control causes." },
  { title: "PRIORITY MATRIX", desc: "Commercial impact vs effort framework to guide leadership decisions." },
  { title: "IMPROVEMENT ROADMAP", desc: "Sequenced execution plan categorized into Now, Next, and Later milestones." },
  { title: "MANAGEMENT INSIGHTS", desc: "Executive briefing covering key operational risks and resource priorities." },
  { title: "NEXT-ACTION PLAN", desc: "Actionable technical and procedural recommendations for immediate execution." },
];

// Section 14: Repeatable Operational Rhythm (SEE -> DECIDE -> CHANGE -> CHECK -> LEARN -> REPEAT)
const continuousRhythm = [
  { step: "01", name: "SEE", desc: "Observe operational metrics and telemetry." },
  { step: "02", name: "DECIDE", desc: "Prioritize findings based on impact." },
  { step: "03", name: "CHANGE", desc: "Implement targeted process or system fixes." },
  { step: "04", name: "CHECK", desc: "Validate operational improvements empirical output." },
  { step: "05", name: "LEARN", desc: "Incorporate findings into operational baseline." },
  { step: "06", name: "REPEAT", desc: "Maintain continuous improvement cadence." },
];

// Section 15: 6 Business Outcomes
const businessOutcomes = [
  { title: "CLARITY", desc: "Understand how your business processes and technology actually operate.", icon: <Eye className="w-5 h-5 text-[#2e936f]" /> },
  { title: "EFFICIENCY", desc: "Eliminate avoidable friction, redundant tasks, and resource leakage.", icon: <Zap className="w-5 h-5 text-[#f15e1c]" /> },
  { title: "CONTROL", desc: "Strengthen RACI role ownership, operational discipline, and safeguard rules.", icon: <ShieldCheck className="w-5 h-5 text-[#fab60a]" /> },
  { title: "PRIORITY", desc: "Focus executive bandwidth and capital on improvements that matter most.", icon: <Target className="w-5 h-5 text-[#2e936f]" /> },
  { title: "VISIBILITY", desc: "Make performance telemetry, gaps, and SLA breaches simple to monitor.", icon: <BarChart3 className="w-5 h-5 text-[#f15e1c]" /> },
  { title: "ADAPTABILITY", desc: "Create a resilient organizational foundation ready for operational change.", icon: <RefreshCw className="w-5 h-5 text-[#fab60a]" /> },
];

// Section 16: What We Can Help You Uncover
const whatWeUncover = [
  "Process bottlenecks & workflow delays",
  "Operational inefficiencies & duplicate work",
  "Technology integration friction & software debt",
  "Control gaps & RACI ownership ambiguity",
  "Resource misalignment & cost leakage",
  "Performance blind spots & reporting gaps",
];

// Section 18: 5 FAQs
const faqList = [
  {
    q: "What does an Audit & Improvement engagement cover?",
    a: "Depending on scope, we examine operational workflows, system integrations, financial cost structures, compliance controls, performance metrics, and user journey friction. We tailor each audit to your specific business priorities.",
  },
  {
    q: "How is an operational audit different from a compliance audit?",
    a: "A compliance audit verifies whether you meet specific external regulations or security standards. An operational audit examines how your business actually functions day-to-day—identifying friction, bottlenecks, and cost leakage to improve overall business performance.",
  },
  {
    q: "Do you only provide audit reports, or can you also support implementation?",
    a: "We do both. We deliver clear, prioritized diagnostic findings and actionable roadmaps. Where agreed, our team also provides hands-on technical and process implementation support to help bring the improvements to life.",
  },
  {
    q: "How do you prioritize the issues discovered during an audit?",
    a: "We use a 2-axis Priority Matrix that balances commercial business impact against effort and technical complexity. This separates quick wins from strategic multi-phase improvements so your leadership team can focus capital effectively.",
  },
  {
    q: "When should a business consider an improvement audit?",
    a: "Businesses usually reach out when experiencing rapid growth friction, recurring team handoff delays, high operational costs, upcoming digital transformations, or when launching new products requiring clean internal operations.",
  },
];

// Service Ecosystem Links
const internalServices = [
  { name: "IT Strategy & Implementation", href: "/services/it-strategy-implementation", icon: <Compass className="w-4 h-4 text-[#f15e1c]" /> },
  { name: "Digital Marketing & Brand", href: "/services/digital-marketing-brand-development", icon: <TrendingUp className="w-4 h-4 text-[#2e936f]" /> },
  { name: "Web & Application Development", href: "/services/web-app-development", icon: <Code2 className="w-4 h-4 text-[#fab60a]" /> },
  { name: "Risk, Compliance & Governance", href: "/services/risk-compliance-governance", icon: <ShieldCheck className="w-4 h-4 text-[#2e936f]" /> },
  { name: "Training & Staff Augmentation", href: "/services/training-staff-augmentation", icon: <Users2 className="w-4 h-4 text-[#fab60a]" /> },
  { name: "SEO Services", href: "/services/seo-services", icon: <Search className="w-4 h-4 text-[#2e936f]" /> },
  { name: "AI Portfolio", href: "/services/ai-portfolio", icon: <Cpu className="w-4 h-4 text-[#f15e1c]" /> },
];

export function AuditInteractivePage({ service, relatedPosts }: AuditPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeHeroNodeIdx, setActiveHeroNodeIdx] = React.useState<number>(0);
  const [activeDiagIdx, setActiveDiagIdx] = React.useState<number>(0);
  const [activeAreaIdx, setActiveAreaIdx] = React.useState<number | null>(0);
  const [activeFrictionIdx, setActiveFrictionIdx] = React.useState<number>(1);
  const [activeMethodIdx, setActiveMethodIdx] = React.useState<number>(0);
  const [activeRhythmIdx, setActiveRhythmIdx] = React.useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(0);

  const displayPosts = React.useMemo(() => {
    if (relatedPosts && relatedPosts.length > 0) {
      return relatedPosts.slice(0, 3);
    }
    return blogPostsData.slice(0, 3);
  }, [relatedPosts]);

  const activeDiagStage = diagnosticViewStages[activeDiagIdx];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#000000] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden selection:bg-[#f15e1c]/20 selection:text-[#f15e1c] relative">
      
      {/* Background Dot Matrix Pattern */}
      <DiagnosticDotGrid />

      {/* =========================================================================
          2. HERO SECTION — AUDIT • DIAGNOSTICS • IMPROVEMENT
          ========================================================================= */}
      <section className="relative pt-3 sm:pt-5 lg:pt-6 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] overflow-hidden select-none">
        
        {/* Ambient Pulsing Background Glows */}
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, -10, 0], opacity: [0.25, 0.35, 0.25] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        >
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-radial from-[#f15e1c]/15 via-transparent to-transparent blur-3xl rounded-full" />
          <div className="absolute bottom-1/3 right-1/4 w-[550px] h-[550px] bg-radial from-[#2e936f]/12 via-transparent to-transparent blur-3xl rounded-full" />
        </motion.div>

        <div className="max-w-[1536px] mx-auto w-full space-y-6 sm:space-y-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: HERO COPY */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-4 sm:space-y-5 text-left">
              
              <AnimatedSection delay={0.05} className="space-y-2">
                <Breadcrumb
                  items={[
                    { label: "Services", href: "/services" },
                    { label: "Audit & Improvement" },
                  ]}
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fdf0e9] dark:bg-[#0a0a0a] border border-[#f15e1c]/40 text-xs font-mono font-bold text-[#f15e1c] shadow-2xs cursor-default transition-all duration-300"
                >
                  <Search className="w-3.5 h-3.5 text-[#f15e1c]" />
                  <span>AUDIT &bull; DIAGNOSTICS &bull; IMPROVEMENT</span>
                </motion.div>
              </AnimatedSection>

              <AnimatedSection delay={0.1} className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-display tracking-tight leading-[1.12] text-[#1b2823] dark:text-[#ffffff]">
                  Find What’s Holding Your Business Back.
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed max-w-2xl">
                  We examine how your processes, technology, controls and operations actually work — then turn the findings into a practical improvement roadmap your team can act on.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.15} className="pt-1 flex flex-wrap items-center gap-3">
                <Link href="/contact">
                  <MagneticButton>
                    <Button3D
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1.5" />}
                      className="shadow-md shadow-[#f15e1c]/20 bg-[#f15e1c] hover:bg-[#d64e13] hover:-translate-y-0.5 transition-all duration-300 font-bold"
                    >
                      Start an Audit
                    </Button3D>
                  </MagneticButton>
                </Link>

                <Link href="#diagnostic-view">
                  <MagneticButton>
                    <Button3D variant="outline" size="md" className="hover:-translate-y-0.5 transition-all duration-300">
                      Explore Our Approach
                    </Button3D>
                  </MagneticButton>
                </Link>
              </AnimatedSection>

              <AnimatedSection delay={0.2} className="pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  {keywordTags.map((tag, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.06, y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="px-2.5 py-1 rounded-lg bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] text-[11px] font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#f15e1c] hover:border-[#f15e1c]/40 transition-all duration-200 cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* RIGHT COLUMN: HERO VISUAL (BUSINESS DIAGNOSTIC SYSTEM) */}
            <div className="lg:col-span-6 xl:col-span-7 w-full flex items-center justify-center">
              <AnimatedSection delay={0.15} className="w-full">
                <div className="p-6 sm:p-8 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xl space-y-6 relative overflow-hidden text-left">
                  
                  <div className="flex items-center justify-between border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-3">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-[#f15e1c]" />
                      <span className="text-xs font-mono font-bold text-[#1b2823] dark:text-[#ffffff] uppercase tracking-wider">
                        BUSINESS DIAGNOSTIC SYSTEM
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#2e936f] font-bold">HEALTH ANALYSIS</span>
                  </div>

                  {/* 6-Node Diagnostic Interactive Flow */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative">
                    {heroDiagnosticNodes.map((node, idx) => {
                      const isHovered = activeHeroNodeIdx === idx;
                      return (
                        <motion.div
                          key={node.id}
                          onMouseEnter={() => setActiveHeroNodeIdx(idx)}
                          whileHover={{ scale: 1.04, y: -2 }}
                          className={cn(
                            "p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer space-y-1.5 text-left relative overflow-hidden select-none",
                            isHovered
                              ? "bg-white dark:bg-[#121212] border-[#f15e1c] shadow-md ring-1 ring-[#f15e1c]/30"
                              : "bg-white/60 dark:bg-[#050505] border-[#f7d7b0]/60 dark:border-[#1a1a1a]"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="p-1.5 rounded-lg bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a]">
                              {node.icon}
                            </div>
                            <span className="text-[10px] font-mono font-bold text-[#f15e1c]">
                              0{idx + 1}
                            </span>
                          </div>
                          <div className="font-mono text-xs font-bold text-[#1b2823] dark:text-[#ffffff]">
                            {node.label}
                          </div>
                          <div className="text-[10px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-tight line-clamp-1">
                            {node.desc}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Active Node Highlight Panel */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] flex items-center justify-between gap-4">
                    <div className="space-y-1 text-left">
                      <span className="text-[10px] font-mono font-bold text-[#f15e1c] uppercase block">
                        DIAGNOSTIC SCOPE: {heroDiagnosticNodes[activeHeroNodeIdx].label}
                      </span>
                      <p className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff]">
                        {heroDiagnosticNodes[activeHeroNodeIdx].desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#2e936f] font-bold shrink-0">
                      <span>INSPECTED</span>
                      <CheckCircle2 className="w-4 h-4 text-[#2e936f]" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <DiagnosticScanTransition />

      {/* =========================================================================
          4. SIGNATURE SECTION — THE DIAGNOSTIC VIEW (OBSERVE -> COLLECT -> ANALYZE -> FIND -> PRIORITIZE)
          ========================================================================= */}
      <section id="diagnostic-view" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center space-y-3">
              <Badge variant="secondary" size="md">
                THE DIAGNOSTIC VIEW
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                You Can't Improve What You Can't See.
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed max-w-3xl mx-auto">
                Many improvement initiatives begin with assumptions. We begin with evidence. We examine how work moves through the organization, where friction appears, where controls weaken, where resources are lost and where technology or process decisions create unnecessary complexity. Then we turn those observations into priorities.
              </p>
            </div>
          </AnimatedSection>

          {/* Interactive Diagnostic Stage Selector & Detail Display */}
          <AnimatedSection delay={0.1}>
            <div className="rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xl p-6 sm:p-10 space-y-8">
              
              {/* 5 Connected Stages Selector Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 relative">
                {diagnosticViewStages.map((stg, idx) => {
                  const isSelected = activeDiagIdx === idx;
                  return (
                    <button
                      key={stg.num}
                      type="button"
                      onClick={() => setActiveDiagIdx(idx)}
                      onMouseEnter={() => setActiveDiagIdx(idx)}
                      className={cn(
                        "relative py-3.5 px-3 rounded-2xl text-xs font-extrabold font-display transition-all duration-250 cursor-pointer flex flex-col items-center justify-center gap-1 select-none z-10",
                        isSelected
                          ? "text-white shadow-md"
                          : "bg-white dark:bg-[#000000] text-[#4a5c55] dark:text-[#d3eee4] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] hover:bg-[#f15e1c]/5"
                      )}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activeDiagStagePill"
                          className="absolute inset-0 bg-[#f15e1c] rounded-2xl shadow-md shadow-[#f15e1c]/20 z-[-1]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="font-mono text-[10px] opacity-80">{stg.num}.</span>
                      <span>{stg.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Detail Panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDiagStage.num}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left"
                >
                  <div className="lg:col-span-7 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#f15e1c] uppercase tracking-wider">
                        DIAGNOSTIC STAGE {activeDiagStage.num} &bull; {activeDiagStage.title}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {activeDiagStage.question}
                    </h3>
                    <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                      {activeDiagStage.desc}
                    </p>
                  </div>

                  <div className="lg:col-span-5 space-y-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#2e936f] block">
                      Empirical Stage Output:
                    </span>
                    <div className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#2e936f] shrink-0" />
                      <span className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff]">
                        {activeDiagStage.output}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <DiagnosticScanTransition />

      {/* =========================================================================
          5. "AN AUDIT SHOULD END WITH A DECISION" TRANSFORMATION
          ========================================================================= */}
      <section id="audit-decision" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-10 text-left">
          
          <AnimatedSection>
            <div className="max-w-3xl space-y-3">
              <Badge variant="secondary" size="md">
                DECISION-DRIVEN AUDIT
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                An Audit Should End With a Decision.
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                A report is useful only when it helps someone decide what to do next. Our approach connects findings with root causes, business impact, improvement priorities and practical next steps.
              </p>
            </div>
          </AnimatedSection>

          {/* 6-Step Connected Decision Sequence */}
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
              {decisionTransformationSteps.map((step, idx) => (
                <motion.div
                  key={step.step}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] space-y-2 text-left transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black text-[#f15e1c]">
                      STEP {step.step}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#f15e1c] group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-xs font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-tight">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <DiagnosticScanTransition />

      {/* =========================================================================
          6. WHAT WE EXAMINE (6 DIAGNOSTIC AREAS)
          ========================================================================= */}
      <section id="what-we-examine" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-10 text-left">
          
          <AnimatedSection>
            <div className="max-w-3xl space-y-3">
              <Badge variant="secondary" size="md">
                WHAT WE EXAMINE
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Look Beyond the Surface.
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                We examine six critical operational and technical domains depending on your business scope and project goals.
              </p>
            </div>
          </AnimatedSection>

          {/* 6 Diagnostic Areas Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {diagnosticAreas.map((area, idx) => (
              <AnimatedSection key={area.num} delay={idx * 0.05}>
                <TiltCard maxTilt={5} scale={1.01} className="h-full">
                  <div
                    onMouseEnter={() => setActiveAreaIdx(idx)}
                    className={cn(
                      "h-full p-6 sm:p-7 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border transition-all duration-300 space-y-3 text-left flex flex-col justify-between group",
                      activeAreaIdx === idx
                        ? "border-[#f15e1c] shadow-lg ring-1 ring-[#f15e1c]/20"
                        : "border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]"
                    )}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-[#f15e1c]">
                          {area.num}
                        </span>
                        <div className="p-2.5 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] group-hover:scale-110 transition-all duration-300">
                          {area.icon}
                        </div>
                      </div>
                      <h3 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                        {area.desc}
                      </p>
                      <div className="pt-2">
                        <span className="text-[10px] font-mono font-bold text-[#2e936f] uppercase block mb-1">
                          Diagnostic Scope Focus:
                        </span>
                        <p className="text-[11px] font-mono font-semibold text-[#1b2823] dark:text-[#ffffff] leading-tight">
                          {area.focus}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a] flex items-center justify-between text-[11px] font-mono font-bold text-[#f15e1c] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Examine Domain</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <DiagnosticScanTransition />

      {/* =========================================================================
          7. NEW ELEMENT — FRICTION MAP
          ========================================================================= */}
      <section id="friction-map" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-10 text-left">
          
          <AnimatedSection>
            <div className="max-w-3xl space-y-3">
              <Badge variant="secondary" size="md">
                BUSINESS WORKFLOW DIAGNOSTIC
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Where Does the Friction Live?
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Hover any workflow node below to examine common operational friction points we look for during business diagnostics.
              </p>
            </div>
          </AnimatedSection>

          {/* Workflow Sequence Cards */}
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {frictionPoints.map((item, idx) => {
                const isActive = activeFrictionIdx === idx;
                return (
                  <motion.div
                    key={item.id}
                    onMouseEnter={() => setActiveFrictionIdx(idx)}
                    onClick={() => setActiveFrictionIdx(idx)}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className={cn(
                      "p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer space-y-2 text-left select-none flex flex-col justify-between min-h-[140px]",
                      isActive
                        ? "bg-white dark:bg-[#121212] border-[#f15e1c] shadow-lg ring-1 ring-[#f15e1c]/30"
                        : "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#f7d7b0] dark:border-[#1a1a1a]"
                    )}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-[#f15e1c]">
                          0{idx + 1}.
                        </span>
                        <div className="p-1 rounded-md bg-[#fefaf5] dark:bg-[#0a0a0a]">
                          {item.icon}
                        </div>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-[#2e936f] uppercase block">
                        {item.type}
                      </span>
                      <h3 className="text-xs font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                        {item.name}
                      </h3>
                    </div>

                    <span className="text-[10px] font-mono font-bold text-[#f15e1c] block border-t border-[#f7d7b0]/40 dark:border-[#1a1a1a] pt-1.5">
                      {item.friction}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Active Friction Detail Panel */}
          <AnimatedSection delay={0.15}>
            <div className="p-6 rounded-3xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 text-left">
                <span className="text-xs font-mono font-bold text-[#f15e1c] uppercase block">
                  WHAT WE LOOK FOR &bull; {frictionPoints[activeFrictionIdx].name}
                </span>
                <h4 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                  {frictionPoints[activeFrictionIdx].friction}
                </h4>
                <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] font-medium max-w-3xl">
                  {frictionPoints[activeFrictionIdx].detail}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shrink-0">
                <Search className="w-5 h-5 text-[#f15e1c]" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <DiagnosticScanTransition />

      {/* =========================================================================
          8. ROOT-CAUSE SECTION
          ========================================================================= */}
      <section id="root-cause" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-10 text-left">
          
          <AnimatedSection>
            <div className="max-w-3xl space-y-3">
              <Badge variant="secondary" size="md">
                ROOT-CAUSE ANALYSIS
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Don't Fix the Symptom. Find the Cause.
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                We trace surface-level operational friction down to its underlying process design, system dependency, or RACI control cause.
              </p>
            </div>
          </AnimatedSection>

          {/* Layered Diagnostic Sequence */}
          <div className="space-y-3.5 max-w-4xl mx-auto">
            {rootCauseExample.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.06}>
                <motion.div
                  whileHover={{ scale: 1.01, x: 4 }}
                  className="p-4 sm:p-5 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] shadow-xs transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
                >
                  <div className="md:col-span-4 space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-[#f15e1c] block uppercase tracking-wider">
                      DIAGNOSTIC LAYER 0{idx + 1}
                    </span>
                    <h3 className="text-sm font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {item.stage}
                    </h3>
                  </div>
                  <div className="md:col-span-8 p-3 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a]">
                    <span className={cn("text-xs font-mono font-bold", item.color)}>
                      {item.text}
                    </span>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <DiagnosticScanTransition />

      {/* =========================================================================
          9. AUDIT -> IMPROVEMENT METHODOLOGY WORKFLOW (FROM FINDING TO FIX)
          ========================================================================= */}
      <section id="methodology" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-12">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                DIAGNOSTIC METHODOLOGY
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                From Finding to Fix
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                A disciplined 6-stage diagnostic journey designed for clarity, evidence collection, and actionable improvement.
              </p>
            </div>
          </AnimatedSection>

          {/* 6 Stage Methodology Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodologyStages.map((proc, idx) => {
              const isSelected = activeMethodIdx === idx;
              return (
                <AnimatedSection key={proc.step} delay={idx * 0.06}>
                  <motion.div
                    onClick={() => setActiveMethodIdx(idx)}
                    onMouseEnter={() => setActiveMethodIdx(idx)}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={cn(
                      "p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer space-y-3 text-left flex flex-col justify-between min-h-[210px] select-none",
                      isSelected
                        ? "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#f15e1c] shadow-lg ring-2 ring-[#f15e1c]/20"
                        : "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]"
                    )}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-[#f15e1c]">
                          STAGE {proc.step}
                        </span>
                        <div className="p-1.5 rounded-lg bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a]">
                          <Search className="w-4 h-4 text-[#f15e1c]" />
                        </div>
                      </div>
                      <h3 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                        {proc.title}
                      </h3>
                      <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                        {proc.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a]">
                      <span className="text-[10px] font-mono font-bold text-[#2e936f] uppercase block mb-0.5">
                        Key Deliverable Outcome:
                      </span>
                      <span className="text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]">
                        {proc.output}
                      </span>
                    </div>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <DiagnosticScanTransition />

      {/* =========================================================================
          10. NEW ELEMENT — PRIORITY MATRIX (2-AXIS INTERACTIVE FRAMEWORK)
          ========================================================================= */}
      <section id="priority-matrix" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-10 text-left">
          
          <AnimatedSection>
            <div className="max-w-3xl space-y-3">
              <Badge variant="secondary" size="md">
                DECISION MATRIX
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Not Every Problem Deserves the Same Response.
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                We map audit observations onto a 2-axis matrix of Commercial Impact vs Effort Complexity so your leadership team can focus capital effectively.
              </p>
            </div>
          </AnimatedSection>

          {/* 4 Quadrants Priority Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {priorityMatrixQuadrants.map((quad, idx) => (
              <AnimatedSection key={quad.quadrant} delay={idx * 0.06}>
                <TiltCard maxTilt={4} scale={1.01} className="h-full">
                  <div className={cn("h-full p-6 rounded-3xl border-2 space-y-4 text-left transition-all duration-300 shadow-sm", quad.color)}>
                    <div className="flex items-center justify-between border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] pb-3">
                      <div>
                        <span className={cn("text-xs font-mono font-black block uppercase", quad.textAccent)}>
                          {quad.quadrant}
                        </span>
                        <span className="text-[10px] font-mono text-[#7A6A5F] font-bold">
                          {quad.impact} &bull; {quad.effort}
                        </span>
                      </div>
                      <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a]", quad.textAccent)}>
                        {quad.badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono font-bold text-[#1b2823] dark:text-[#ffffff] uppercase block">
                        Illustrative Diagnostic Focus:
                      </span>
                      <ul className="space-y-1.5">
                        {quad.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2e936f] shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <DiagnosticScanTransition />

      {/* =========================================================================
          11. IMPROVEMENT ROADMAP (NOW -> NEXT -> LATER)
          ========================================================================= */}
      <section id="roadmap" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-10 text-left">
          
          <AnimatedSection>
            <div className="max-w-3xl space-y-3">
              <Badge variant="secondary" size="md">
                EXECUTION ROADMAP
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Turn Findings Into a Roadmap.
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                We organize agreed improvement actions into a structured timeline sequence so your internal team can execute cleanly.
              </p>
            </div>
          </AnimatedSection>

          {/* 3 Sequential Phases (NOW -> NEXT -> LATER) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmapPhases.map((phase, idx) => (
              <AnimatedSection key={phase.phase} delay={idx * 0.08}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={cn(
                    "p-6 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 space-y-4 text-left transition-all duration-300 shadow-sm flex flex-col justify-between h-full",
                    phase.color
                  )}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-3">
                      <span className="text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                        {phase.phase}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#f15e1c]">
                        {phase.timeframe}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {phase.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#1b2823] dark:text-[#ffffff] p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a]">
                          <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <DiagnosticScanTransition />

      {/* =========================================================================
          12. BEFORE -> AFTER TRANSFORMATION (FROM FRICTION TO FLOW)
          ========================================================================= */}
      <section id="transformation" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                OPERATIONAL TRANSFORMATION
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                From Friction to Flow
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                See the contrast between a friction-filled process and an optimized, transparent operating state.
              </p>
            </div>
          </AnimatedSection>

          {/* Side-by-Side Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
            
            {/* BEFORE (FRICTION) */}
            <AnimatedSection delay={0.08}>
              <div className="p-6 sm:p-8 rounded-3xl bg-[#fff5f2] dark:bg-[#120805] border-2 border-[#f15e1c]/40 space-y-6 h-full">
                <div className="flex items-center justify-between border-b border-[#f15e1c]/20 pb-3">
                  <div className="flex items-center gap-2 text-[#f15e1c]">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="text-xs font-mono font-extrabold uppercase tracking-wider">
                      BEFORE (CURRENT FRICTION STATE)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#f15e1c] font-bold">HIGH FRICTION</span>
                </div>

                <div className="space-y-2.5">
                  {["Fragmented Process", "Manual Handoffs", "Unclear RACI Ownership", "Limited Operational Visibility", "Reactive Management Decisions"].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 4 }}
                      className="p-3 rounded-2xl bg-white/80 dark:bg-[#000000]/60 border border-[#f15e1c]/30 flex items-center justify-between text-xs font-bold font-mono text-[#f15e1c]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="opacity-60">0{i + 1}.</span>
                        <span>{item}</span>
                      </div>
                      <AlertTriangle className="w-4 h-4 text-[#f15e1c] shrink-0" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* AFTER (FLOW) */}
            <AnimatedSection delay={0.14}>
              <div className="p-6 sm:p-8 rounded-3xl bg-[#f0f9f5] dark:bg-[#05140d] border-2 border-[#2e936f]/40 space-y-6 h-full">
                <div className="flex items-center justify-between border-b border-[#2e936f]/20 pb-3">
                  <div className="flex items-center gap-2 text-[#2e936f]">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-xs font-mono font-extrabold uppercase tracking-wider">
                      AFTER (IMPROVED FLOW STATE)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#2e936f] font-bold">OPTIMIZED</span>
                </div>

                <div className="space-y-2.5">
                  {["Clear Process Design", "Defined RACI Ownership", "Connected Systems & Integrations", "Visible Performance Telemetry", "Continuous Improvement Rhythm"].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 4 }}
                      className="p-3 rounded-2xl bg-white/80 dark:bg-[#000000]/60 border border-[#2e936f]/30 flex items-center justify-between text-xs font-bold font-mono text-[#2e936f]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="opacity-60">0{i + 1}.</span>
                        <span>{item}</span>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <DiagnosticScanTransition />

      {/* =========================================================================
          13. WHAT YOU RECEIVE (CONCISE DELIVERABLES LIST)
          ========================================================================= */}
      <section id="deliverables" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-10 text-left">
          
          <AnimatedSection>
            <div className="max-w-3xl space-y-3">
              <Badge variant="secondary" size="md">
                ENGAGEMENT DELIVERABLES
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                What Comes Out of the Audit?
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Depending on project scope, our audit and improvement engagements produce clear, management-ready documentation:
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {auditDeliverables.map((del, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.05}>
                <TiltCard maxTilt={5} scale={1.01} className="h-full">
                  <div className="h-full p-6 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#f15e1c] hover:shadow-lg transition-all duration-300 space-y-3 text-left group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#f15e1c]">DELIVERABLE 0{idx + 1}</span>
                      <FileText className="w-4 h-4 text-[#f15e1c]" />
                    </div>
                    <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                      {del.title}
                    </h3>
                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
                      {del.desc}
                    </p>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <DiagnosticScanTransition />

      {/* =========================================================================
          14. CONTINUOUS IMPROVEMENT (REPEATABLE OPERATIONAL RHYTHM)
          ========================================================================= */}
      <section id="rhythm" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-12">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                CONTINUOUS OPERATIONAL RHYTHM
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Improvement Becomes Valuable When It Becomes a Habit.
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                The objective is not to perform an audit and return to the same operating model. The objective is to create a repeatable way to identify issues, act on priorities, measure change and keep improving.
              </p>
            </div>
          </AnimatedSection>

          {/* 6 Step Rhythm Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {continuousRhythm.map((item, idx) => {
              const isActive = activeRhythmIdx === idx;
              return (
                <AnimatedSection key={item.step} delay={idx * 0.06}>
                  <motion.div
                    onClick={() => setActiveRhythmIdx(idx)}
                    onMouseEnter={() => setActiveRhythmIdx(idx)}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={cn(
                      "p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer space-y-1.5 text-left flex flex-col justify-between min-h-[120px] select-none",
                      isActive
                        ? "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#f15e1c] shadow-md ring-1 ring-[#f15e1c]/30"
                        : "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#f7d7b0] dark:border-[#1a1a1a]"
                    )}
                  >
                    <span className="text-[10px] font-mono font-black text-[#f15e1c]">
                      STEP {item.step}
                    </span>
                    <h3 className="text-sm font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-tight">
                      {item.desc}
                    </p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <DiagnosticScanTransition />

      {/* =========================================================================
          15. BUSINESS OUTCOMES (6 MINIMAL OUTCOMES)
          ========================================================================= */}
      <section id="outcomes" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                BUSINESS IMPACT
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                What Better Visibility Enables
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {businessOutcomes.map((out, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.05}>
                <TiltCard maxTilt={5} scale={1.01} className="h-full">
                  <div className="h-full p-6 sm:p-7 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#f15e1c] hover:shadow-lg transition-all duration-300 space-y-3 group">
                    <div className="p-2.5 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] w-fit group-hover:scale-110 transition-transform">
                      {out.icon}
                    </div>
                    <h3 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                      {out.title}
                    </h3>
                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                      {out.desc}
                    </p>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <DiagnosticScanTransition />

      {/* =========================================================================
          16. PROOF / WHAT WE CAN HELP YOU UNCOVER
          ========================================================================= */}
      <section id="what-we-uncover" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                DIAGNOSTIC PROOF
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                See Improvement in Practice
              </h2>
              <p className="text-base font-mono font-bold text-[#f15e1c] uppercase tracking-wider">
                What We Can Help You Uncover
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {whatWeUncover.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.05}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] flex items-center gap-3 transition-all"
                >
                  <Search className="w-4 h-4 text-[#f15e1c] shrink-0" />
                  <span className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff]">
                    {item}
                  </span>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <DiagnosticScanTransition />

      {/* =========================================================================
          17. DYNAMIC BLOG / INSIGHTS
          ========================================================================= */}
      <section id="insights" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-4">
              <div className="space-y-2 text-left">
                <Badge variant="secondary" size="md">
                  KNOWLEDGE &amp; THOUGHT LEADERSHIP
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                  Audit &amp; Improvement Insights
                </h2>
              </div>
              <Link
                href="/insights"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#f15e1c] hover:underline shrink-0 group"
              >
                <span>Explore All Insights</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayPosts.map((post, idx) => (
              <AnimatedSection key={post.slug} delay={idx * 0.08}>
                <TiltCard maxTilt={5} scale={1.01} className="h-full">
                  <div className="h-full p-6 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#f15e1c] hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left space-y-4 group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#f15e1c]">
                        <span className="uppercase tracking-wider">{post.category}</span>
                        <span>{post.publishedAt || post.dateFormatted}</span>
                      </div>
                      <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed line-clamp-3 font-medium">
                        {post.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#f7d7b0] dark:border-[#1a1a1a]">
                      <Link
                        href={`/insights/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#f15e1c] group-hover:underline"
                      >
                        <span>Read Article</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <DiagnosticScanTransition />

      {/* =========================================================================
          18. FREQUENTLY ASKED QUESTIONS (5 FAQS)
          ========================================================================= */}
      <section id="faq" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-4xl mx-auto space-y-10 text-left">
          
          <AnimatedSection>
            <div className="text-center space-y-3">
              <Badge variant="secondary" size="md">
                QUESTIONS &amp; ANSWERS
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Frequently Asked Questions
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {faqList.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <AnimatedSection key={idx} delay={idx * 0.05}>
                  <motion.div
                    whileHover={{ scale: 1.005 }}
                    className="rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]/60 overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group select-none"
                    >
                      <span className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-[#f15e1c] transition-transform duration-300 shrink-0",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="px-6 pb-6 text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium border-t border-[#f7d7b0]/40 dark:border-[#1a1a1a] pt-4"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <DiagnosticScanTransition />

      {/* =========================================================================
          SERVICE ECOSYSTEM LINKS
          ========================================================================= */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-8 text-left">
          
          <AnimatedSection>
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#f15e1c] uppercase tracking-wider block">
                ARAV SERVICE ECOSYSTEM
              </span>
              <h3 className="text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                Connected Enterprise Capabilities
              </h3>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {internalServices.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.04}>
                <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={item.href}
                    className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] group-hover:scale-110 transition-all">
                        {item.icon}
                      </div>
                      <span className="text-xs font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#f15e1c] group-hover:translate-x-1.5 transition-transform shrink-0" />
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <DiagnosticScanTransition />

      {/* =========================================================================
          19. FINAL CTA — KNOW WHERE THE FRICTION IS BEFORE YOU TRY TO FIX IT
          ========================================================================= */}
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-12">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#f15e1c] via-[#d84e12] to-[#b33d0b] text-white p-10 sm:p-16 border-2 border-[#fab60a] shadow-2xl space-y-8 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
                <Search className="w-3.5 h-3.5 text-[#ffec69]" />
                <span>EVIDENCE-BASED BUSINESS DIAGNOSTICS</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                Know Where the Friction Is Before You Try to Fix It.
              </h2>

              <p className="text-sm sm:text-base font-medium text-white/90 leading-relaxed">
                Start with evidence, understand the root causes and turn your findings into a practical path for improvement.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/contact">
                <MagneticButton>
                  <Button3D
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1.5" />}
                    className="w-full sm:w-auto justify-center bg-white text-[#f15e1c] hover:bg-[#f7d7b0] hover:-translate-y-0.5 transition-all duration-300 font-bold"
                  >
                    Start an Audit
                  </Button3D>
                </MagneticButton>
              </Link>

              <Link href="/contact">
                <MagneticButton>
                  <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center text-white border-white/60 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300">
                    Discuss an Improvement Project
                  </Button3D>
                </MagneticButton>
              </Link>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 text-xs text-white/90 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Process, Tech &amp; Operational Audits
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> 2-Axis Impact &amp; Effort Priority Matrix
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Actionable Now / Next / Later Roadmap
              </span>
            </div>
          </div>
        </AnimatedSection>
      </section>

    </div>
  );
}

export default AuditInteractivePage;
