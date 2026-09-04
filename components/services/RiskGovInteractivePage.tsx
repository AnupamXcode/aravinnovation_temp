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
  ShieldCheck,
  Lock,
  FileText,
  AlertOctagon,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Globe2,
  Zap,
  Check,
  Activity,
  Eye,
  ShieldAlert,
  FileCheck,
  RefreshCw,
  AlertTriangle,
  Users,
  Scale,
  Clock,
  Layers,
  Award,
  ChevronDown,
  ArrowUpRight,
  Terminal,
  Workflow,
  Wrench,
  GitBranch,
  Shield,
  CheckSquare,
  Compass,
  TrendingUp,
  Code2,
  BarChart3,
  Users2,
  Search,
  Cpu,
} from "lucide-react";
import { Service } from "@/data/services";
import { BlogPost, blogPostsData } from "@/data/insights";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";

interface RiskGovPageProps {
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
// 2. System Scan Transition Line (Scan Beam Effect)
// -----------------------------------------------------------------------------
function SystemScanTransition() {
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
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#2e936f] to-transparent shadow-[0_0_10px_#2e936f]"
        />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 3. Matrix Pattern Background
// -----------------------------------------------------------------------------
function AnimatedDotGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10 dark:opacity-15 select-none">
      <svg className="w-full h-full" width="100%" height="100%">
        <pattern
          id="riskgov-control-matrix-pattern"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#2e936f" opacity="0.6" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#riskgov-control-matrix-pattern)" />
      </svg>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Data Collections for Enterprise Governance Control Center
// -----------------------------------------------------------------------------

const keywordTags = [
  "Risk Management",
  "Compliance",
  "Governance",
  "Privacy",
  "Cybersecurity",
  "AI Governance",
];

// Section 2: Signature Governance Chain (RISK -> OWNER -> CONTROL -> EVIDENCE -> MONITOR -> IMPROVE)
const governanceChain = [
  { id: "01", title: "RISK", label: "Exposure Identified", icon: <AlertTriangle className="w-4 h-4 text-[#f15e1c]" /> },
  { id: "02", title: "OWNER", label: "RACI Accountable", icon: <Users className="w-4 h-4 text-[#2e936f]" /> },
  { id: "03", title: "CONTROL", label: "Safeguard Active", icon: <ShieldCheck className="w-4 h-4 text-[#fab60a]" /> },
  { id: "04", title: "EVIDENCE", label: "Records Logged", icon: <FileCheck className="w-4 h-4 text-[#2e936f]" /> },
  { id: "05", title: "MONITOR", label: "Telemetry Live", icon: <Activity className="w-4 h-4 text-[#f15e1c]" /> },
  { id: "06", title: "IMPROVE", label: "Action Roadmap", icon: <RefreshCw className="w-4 h-4 text-[#2e936f]" /> },
];

// Section 4: Signature 6-Stage Risk Journey (From Uncertainty to Control)
const uncertaintyToControlFlow = [
  {
    num: "01",
    title: "IDENTIFY",
    question: "What can affect the business?",
    desc: "Catalog business assets, third-party exposures, technological dependencies, and regulatory obligations.",
    detail: "Threat Mapping & Regulatory Obligation Register",
  },
  {
    num: "02",
    title: "ASSESS",
    question: "How serious is the exposure?",
    desc: "Evaluate threat likelihood, business impact severity, control vulnerabilities, and inherent risk ratings.",
    detail: "Risk Severity Scoring & Quantitative Exposure Matrix",
  },
  {
    num: "03",
    title: "PRIORITIZE",
    question: "What needs attention first?",
    desc: "Compare risk scores against leadership risk appetite to determine critical remediation focus areas.",
    detail: "Executive Risk Dashboard & Action Plan",
  },
  {
    num: "04",
    title: "CONTROL",
    question: "What reduces the exposure?",
    desc: "Design and implement preventive, detective, and corrective controls with clear operational ownership.",
    detail: "RACI Control Ownership Architecture",
  },
  {
    num: "05",
    title: "VERIFY",
    question: "Are the controls working?",
    desc: "Review control execution, test operational effectiveness, and gather continuous compliance evidence.",
    detail: "Control Testing & Audit Evidence Repository",
  },
  {
    num: "06",
    title: "IMPROVE",
    question: "What changes next?",
    desc: "Analyze audit findings, incident post-mortems, and regulatory changes to continuously strengthen resilience.",
    detail: "Continuous Governance & Risk Update Roadmap",
  },
];

// Section 5: Layered Governance Architecture
const layeredOperatingModel = [
  {
    layer: "01",
    name: "LEADERSHIP",
    keywords: "Strategy • Risk Appetite • Executive Accountability",
    desc: "Board oversight, corporate risk tolerance bounds, and strategic business objectives.",
    icon: <Award className="w-4 h-4 text-[#2e936f]" />,
  },
  {
    layer: "02",
    name: "GOVERNANCE",
    keywords: "Policies • RACI Roles • Management Oversight",
    desc: "Corporate policies, decision charters, governance committees, and clear role ownership.",
    icon: <Scale className="w-4 h-4 text-[#f15e1c]" />,
  },
  {
    layer: "03",
    name: "RISK",
    keywords: "Identify • Assess • Prioritize • Treat",
    desc: "Structured risk registers, threat assessments, dependency mapping, and treatment plans.",
    icon: <AlertTriangle className="w-4 h-4 text-[#fab60a]" />,
  },
  {
    layer: "04",
    name: "CONTROLS",
    keywords: "Prevent • Detect • Correct • Safeguard",
    desc: "Operational safeguards, technical security controls, access rules, and anomaly detection.",
    icon: <ShieldCheck className="w-4 h-4 text-[#2e936f]" />,
  },
  {
    layer: "05",
    name: "EVIDENCE",
    keywords: "Records • Reviews • Audit Logs • Reporting",
    desc: "Audit-ready evidence repositories, compliance testing records, and management reporting.",
    icon: <FileCheck className="w-4 h-4 text-[#f15e1c]" />,
  },
  {
    layer: "06",
    name: "IMPROVEMENT",
    keywords: "Findings • Action Tracking • Policy Updates",
    desc: "Audit remediation tracking, incident lessons learned, and continuous program updates.",
    icon: <RefreshCw className="w-4 h-4 text-[#2e936f]" />,
  },
];

// Section 6: Transformation Steps
const unownedRiskSteps = [
  "UNKNOWN RISK",
  "NO OWNER",
  "NO CONTROL",
  "NO EVIDENCE",
  "NO VISIBILITY",
  "BUSINESS EXPOSURE",
];

const governedRiskSteps = [
  "DEFINED RISK",
  "ASSIGNED OWNER",
  "CONTROL IMPLEMENTED",
  "EVIDENCE AVAILABLE",
  "MONITORED",
  "BETTER DECISION",
];

// Section 7: Compact 2-Column Capability List
const compactCapabilities = [
  {
    num: "01",
    title: "Enterprise Risk Assessment",
    desc: "Identify operational, technology, information, third-party and compliance risks across the organization.",
  },
  {
    num: "02",
    title: "Compliance & Regulatory Readiness",
    desc: "Translate applicable regulatory and contractual requirements into practical controls, responsibilities and evidence.",
  },
  {
    num: "03",
    title: "Governance Frameworks",
    desc: "Build governance structures that define who decides, who owns, who approves and who is accountable.",
  },
  {
    num: "04",
    title: "Privacy & Data Governance",
    desc: "Turn privacy obligations into operational practices across how data is collected, used, stored, shared and retained.",
  },
  {
    num: "05",
    title: "Cybersecurity Governance",
    desc: "Connect cybersecurity controls with business risk rather than treating security as an isolated technical function.",
  },
  {
    num: "06",
    title: "AI Governance",
    desc: "Help organizations establish practical governance around how AI is selected, used, monitored and controlled.",
  },
];

// Section 8: Compliance Frameworks Ecosystem
const frameworkItems = [
  { name: "ISO/IEC 27001", focus: "Information Security Management Systems" },
  { name: "ISO/IEC 42001", focus: "Responsible AI Management Systems" },
  { name: "SOC 2", focus: "Trust Services Criteria & Security Controls" },
  { name: "GDPR", focus: "European Data Protection & Privacy Rights" },
  { name: "DPDP Act", focus: "India Digital Personal Data Protection Mandates" },
  { name: "Industry Requirements", focus: "Custom Sector & Contractual Obligations" },
];

// Section 9: Flowing Resilience Lifecycle
const resilienceLifecycle = [
  { step: "01", name: "PREPARE", desc: "Define escalation playbooks and incident response roles before disruption happens." },
  { step: "02", name: "DETECT", desc: "Monitor anomaly signals, control breaches, and early risk telemetry." },
  { step: "03", name: "RESPOND", desc: "Activate rapid containment playbooks and business continuity procedures." },
  { step: "04", name: "RECOVER", desc: "Restore operational systems, validate data integrity, and re-establish baseline." },
  { step: "05", name: "LEARN", desc: "Analyze root causes, update risk registers, and strengthen preventive safeguards." },
];

// Section 10: Horizontal Outcomes Strip
const horizontalOutcomes = [
  { title: "CLARITY", line: "Know which risks matter, their commercial impact, and why they require attention." },
  { title: "ACCOUNTABILITY", line: "Every important risk, policy, and safeguard has an assigned operational owner." },
  { title: "READINESS", line: "Maintain structured, audit-ready evidence repositories and repeatable review processes." },
  { title: "RESILIENCE", line: "Improve preparedness for operational disruptions, cyber incidents, and regulatory updates." },
  { title: "TRUST", line: "Provide enterprise customers, partners, and board leadership transparent risk visibility." },
  { title: "BETTER DECISIONS", line: "Connect governance insights directly into executive strategy and investment choices." },
];

// Section 11: What We Assess List
const whatWeAssessList = [
  { title: "Risk Exposure", desc: "Operational, tech, data & vendor risk scope." },
  { title: "Control Maturity", desc: "Preventive & detective control effectiveness." },
  { title: "Policy Coverage", desc: "Alignment between corporate docs and practices." },
  { title: "Governance Ownership", desc: "Clarity of RACI roles & management reporting." },
  { title: "Compliance Readiness", desc: "ISO 27001, SOC 2, GDPR & DPDP gap evaluation." },
  { title: "Evidence Quality", desc: "Structure & auditability of operational records." },
  { title: "Incident Readiness", desc: "Escalation procedures & response playbooks." },
];

// Section 13: 5 FAQs
const faqList = [
  {
    q: "What is the difference between risk, compliance and governance?",
    a: "Risk is understanding what could go wrong and how it impacts business goals. Compliance is meeting mandatory external or internal requirements. Governance is the operating system—policies, roles, and controls—that ensures risk is managed and compliance is maintained continuously.",
  },
  {
    q: "Can Arav Innovations help us prepare for ISO/IEC 27001?",
    a: "Yes. We support organizations through ISO/IEC 27001 readiness—helping perform gap assessments, establish information security management system (ISMS) policies, define control ownership, and build audit-ready evidence structures.",
  },
  {
    q: "Do you support DPDP and GDPR requirements?",
    a: "Yes. We assist businesses in translating India's DPDP Act and the EU GDPR into practical operational practices—covering data inventories, privacy impact assessments, consent frameworks, access controls, and vendor risk protocols.",
  },
  {
    q: "What does AI governance involve?",
    a: "AI governance ensures artificial intelligence technologies are selected, deployed, and monitored responsibly. It covers risk assessment of AI models, data privacy, algorithmic transparency, documentation, human oversight, and alignment with emerging frameworks like ISO/IEC 42001.",
  },
  {
    q: "Do you only work with companies preparing for audits?",
    a: "No. While we support audit readiness, our primary focus is helping organizations build continuous risk and governance programs that improve day-to-day decision making, operational resilience, and customer trust.",
  },
];

// Service Ecosystem Links
const internalServices = [
  { name: "IT Strategy & Implementation", href: "/services/it-strategy-implementation", icon: <Compass className="w-4 h-4 text-[#f15e1c]" /> },
  { name: "Digital Marketing & Brand", href: "/services/digital-marketing-brand-development", icon: <TrendingUp className="w-4 h-4 text-[#2e936f]" /> },
  { name: "Web & Application Development", href: "/services/web-app-development", icon: <Code2 className="w-4 h-4 text-[#fab60a]" /> },
  { name: "Audit & Improvement", href: "/services/audit-improvement", icon: <BarChart3 className="w-4 h-4 text-[#f15e1c]" /> },
  { name: "Training & Staff Augmentation", href: "/services/training-staff-augmentation", icon: <Users2 className="w-4 h-4 text-[#fab60a]" /> },
  { name: "SEO Services", href: "/services/seo-services", icon: <Search className="w-4 h-4 text-[#2e936f]" /> },
  { name: "AI Portfolio", href: "/services/ai-portfolio", icon: <Cpu className="w-4 h-4 text-[#f15e1c]" /> },
];

export function RiskGovInteractivePage({ service, relatedPosts }: RiskGovPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeChainIdx, setActiveChainIdx] = React.useState<number>(0);
  const [activeUncertaintyIdx, setActiveUncertaintyIdx] = React.useState<number>(0);
  const [activeCapIdx, setActiveCapIdx] = React.useState<number | null>(0);
  const [activeResilienceIdx, setActiveResilienceIdx] = React.useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(0);

  const displayPosts = React.useMemo(() => {
    if (relatedPosts && relatedPosts.length > 0) {
      return relatedPosts.slice(0, 3);
    }
    return blogPostsData.slice(0, 3);
  }, [relatedPosts]);

  const activeUncertaintyStage = uncertaintyToControlFlow[activeUncertaintyIdx];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#000000] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden selection:bg-[#2e936f]/20 selection:text-[#2e936f] relative">
      
      {/* Background Matrix Pattern */}
      <AnimatedDotGrid />

      {/* =========================================================================
          1. HERO — ENTERPRISE GOVERNANCE CONTROL CENTER DIAGRAM
          ========================================================================= */}
      <section className="relative pt-3 sm:pt-5 lg:pt-6 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] overflow-hidden select-none">
        
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, -10, 0], opacity: [0.2, 0.3, 0.2] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        >
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-radial from-[#2e936f]/15 via-transparent to-transparent blur-3xl rounded-full" />
          <div className="absolute bottom-1/3 right-1/4 w-[550px] h-[550px] bg-radial from-[#f15e1c]/12 via-transparent to-transparent blur-3xl rounded-full" />
        </motion.div>

        <div className="max-w-[1536px] mx-auto w-full space-y-6 sm:space-y-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: HERO COPY */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-4 sm:space-y-5 text-left">
              
              <AnimatedSection delay={0.05} className="space-y-2">
                <Breadcrumb
                  items={[
                    { label: "Services", href: "/services" },
                    { label: "Risk, Compliance & Governance" },
                  ]}
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e3f4ee] dark:bg-[#0a0a0a] border border-[#2e936f]/40 text-xs font-mono font-bold text-[#2e936f] shadow-2xs cursor-default transition-all duration-300"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2e936f]" />
                  <span>RISK &bull; COMPLIANCE &bull; GOVERNANCE</span>
                </motion.div>
              </AnimatedSection>

              <AnimatedSection delay={0.1} className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-display tracking-tight leading-[1.12] text-[#1b2823] dark:text-[#ffffff]">
                  Make Risk Visible.{" "}
                  <span className="text-[#2e936f]">Make Compliance Actionable.</span>
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed max-w-2xl">
                  Build a governance system that helps your organization understand its risks, meet its obligations, protect critical information, and make better decisions before problems become business disruptions.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.15} className="pt-1 flex flex-wrap items-center gap-3">
                <Link href="/contact">
                  <MagneticButton>
                    <Button3D
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1.5" />}
                      className="shadow-md shadow-[#2e936f]/20 bg-[#2e936f] hover:bg-[#25775a] hover:-translate-y-0.5 transition-all duration-300 font-bold"
                    >
                      Assess My Risk Exposure
                    </Button3D>
                  </MagneticButton>
                </Link>

                <Link href="#governance-picture">
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
                      className="px-2.5 py-1 rounded-lg bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] text-[11px] font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#2e936f] hover:border-[#2e936f]/40 transition-all duration-200 cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* RIGHT COLUMN: PRIMARY 3D GOVERNANCE VISUAL (IMAGE 1 - BLENDED NO BORDER) */}
            <div className="lg:col-span-6 xl:col-span-7 w-full flex items-center justify-center">
              <AnimatedSection delay={0.15} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full transition-all duration-300 group flex items-center justify-center"
                >
                  <Image
                    src="/images/risk-gov-primary.png"
                    alt="Arav Innovations Enterprise Risk, Compliance & Governance System Architecture"
                    width={1200}
                    height={800}
                    priority
                    className="w-full h-auto max-w-full object-contain block transition-transform duration-500 group-hover:scale-[1.02] drop-shadow-sm"
                  />
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          2. THE GOVERNANCE PICTURE — SIGNATURE VISUAL CHAIN (RISK -> OWNER -> CONTROL -> EVIDENCE -> MONITOR -> IMPROVE)
          ========================================================================= */}
      <section id="governance-picture" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-10 text-left">
          
          <AnimatedSection>
            <div className="max-w-4xl space-y-3">
              <Badge variant="secondary" size="md">
                THE GOVERNANCE PICTURE
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
                Risk Is Not a Document. It Is a Business Decision.
              </h2>
              <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] font-normal leading-relaxed">
                Organizations rarely struggle because they lack policies alone. The real challenge is connecting risks, ownership, controls, evidence and business decisions.
              </p>
            </div>
          </AnimatedSection>

          {/* Signature Connected Visual Chain */}
          <AnimatedSection delay={0.1}>
            <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xl space-y-6">
              
              <span className="text-xs font-mono font-bold text-[#2e936f] uppercase tracking-wider block border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-2">
                CONNECTED GOVERNANCE OPERATING CHAIN
              </span>

              {/* 6 Connected Small Visual Chain Nodes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {governanceChain.map((node, idx) => {
                  const isActive = activeChainIdx === idx;
                  return (
                    <motion.div
                      key={node.id}
                      onMouseEnter={() => setActiveChainIdx(idx)}
                      onClick={() => setActiveChainIdx(idx)}
                      whileHover={{ scale: 1.04, y: -2 }}
                      className={cn(
                        "p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer space-y-1.5 text-left flex flex-col justify-between min-h-[110px] select-none",
                        isActive
                          ? "bg-white dark:bg-[#121212] border-[#2e936f] shadow-md ring-1 ring-[#2e936f]/30"
                          : "bg-white/60 dark:bg-[#000000] border-[#f7d7b0] dark:border-[#1a1a1a]"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-black text-[#2e936f]">{node.id}.</span>
                        <div className="p-1 rounded-lg bg-[#fefaf5] dark:bg-[#0a0a0a]">
                          {node.icon}
                        </div>
                      </div>
                      <div className="font-mono text-xs font-extrabold text-[#1b2823] dark:text-[#ffffff]">
                        {node.title}
                      </div>
                      <div className="text-[10px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-tight">
                        {node.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          3. SIGNATURE SECTION — FROM UNCERTAINTY TO CONTROL (IMAGE 3 + 6-STAGE RISK FLOW)
          ========================================================================= */}
      <section id="uncertainty-to-control" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                RISK CONTROL JOURNEY
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                From Uncertainty to Control
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Explore how threat identification, impact assessment, risk prioritization, safeguard control, audit verification, and continuous improvement fit together.
              </p>
            </div>
          </AnimatedSection>

          {/* Asymmetric Composition: IMAGE 3 (LEFT) + INTERACTIVE PROCESS (RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT COLUMN: IMAGE 3 VISUAL ANCHOR (BLENDED NO BORDER) */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              <AnimatedSection delay={0.08} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full transition-all duration-300 group flex items-center justify-center"
                >
                  <Image
                    src="/images/risk-gov-tertiary.png"
                    alt="Arav Innovations Risk Identification, Assessment and Control Safeguard Lifecycle"
                    width={1200}
                    height={800}
                    className="w-full h-auto max-w-full object-contain block transition-transform duration-500 group-hover:scale-[1.02] drop-shadow-sm"
                  />
                </motion.div>
              </AnimatedSection>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE RISK FLOW PROCESS (~50% width) */}
            <div className="lg:col-span-6 w-full">
              <AnimatedSection delay={0.12} className="w-full">
                <div className="rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xl p-6 sm:p-8 space-y-6">
                  
                  {/* Selector Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 relative">
                    {uncertaintyToControlFlow.map((stg, idx) => {
                      const isSelected = activeUncertaintyIdx === idx;
                      return (
                        <button
                          key={stg.num}
                          type="button"
                          onClick={() => setActiveUncertaintyIdx(idx)}
                          onMouseEnter={() => setActiveUncertaintyIdx(idx)}
                          className={cn(
                            "relative py-3 px-2.5 rounded-2xl text-xs font-extrabold font-display transition-all duration-250 cursor-pointer flex flex-col items-center justify-center gap-1 select-none z-10",
                            isSelected
                              ? "text-white shadow-md"
                              : "bg-white dark:bg-[#000000] text-[#4a5c55] dark:text-[#d3eee4] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f] hover:bg-[#2e936f]/5"
                          )}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId="activeRiskJourneyStage"
                              className="absolute inset-0 bg-[#2e936f] rounded-2xl shadow-md shadow-[#2e936f]/20 z-[-1]"
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                          )}
                          <span className="font-mono text-[10px] opacity-80">{stg.num}.</span>
                          <span>{stg.title}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Stage Display Panel */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeUncertaintyStage.num}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="p-5 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] space-y-3 text-left"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#2e936f] uppercase tracking-wider">
                          STAGE {activeUncertaintyStage.num} &bull; {activeUncertaintyStage.title}
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                        {activeUncertaintyStage.question}
                      </h3>
                      <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                        {activeUncertaintyStage.desc}
                      </p>
                      <div className="pt-2 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a] flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                        <span className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff]">
                          {activeUncertaintyStage.detail}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          4. GOVERNANCE ARCHITECTURE — TURN POLICIES INTO AN OPERATING SYSTEM (IMAGE 2)
          ========================================================================= */}
      <section id="governance-architecture" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                GOVERNANCE OPERATING ARCHITECTURE
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Turn Policies Into an Operating System
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                A connected 6-layer enterprise architecture linking leadership priorities, risk assessment, controls, evidence, and continuous improvement.
              </p>
            </div>
          </AnimatedSection>

          {/* Split Layout: IMAGE 2 (LEFT) + 6-LAYER OPERATING MODEL (RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT COLUMN: GOVERNANCE ARCHITECTURE VISUAL (IMAGE 2 - BLENDED NO BORDER) */}
            <div className="lg:col-span-7 w-full flex items-center justify-center">
              <AnimatedSection delay={0.08} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full transition-all duration-300 group flex items-center justify-center"
                >
                  <Image
                    src="/images/risk-gov-secondary.png"
                    alt="Arav Innovations Governance Operating Model & Layered Architecture Diagram"
                    width={1200}
                    height={800}
                    className="w-full h-auto max-w-full object-contain block transition-transform duration-500 group-hover:scale-[1.02] drop-shadow-sm"
                  />
                </motion.div>
              </AnimatedSection>
            </div>

            {/* RIGHT COLUMN: 6 LAYERS OPERATING MODEL (~45% width) */}
            <div className="lg:col-span-5 w-full space-y-3 text-left">
              {layeredOperatingModel.map((layer, idx) => (
                <AnimatedSection key={layer.layer} delay={idx * 0.05}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="p-3.5 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f] transition-all space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded-md bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] group-hover:scale-110 transition-transform">
                          {layer.icon}
                        </div>
                        <h3 className="text-sm font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors">
                          {layer.name}
                        </h3>
                      </div>
                      <span className="text-xs font-mono font-black text-[#2e936f]">
                        {layer.layer}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#f15e1c] block pl-7">
                      {layer.keywords}
                    </span>
                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal pl-7">
                      {layer.desc}
                    </p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          5. WHAT HAPPENS WHEN RISK HAS NO OWNER? (TRANSFORMATION SEQUENCE)
          ========================================================================= */}
      <section id="risk-transformation" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-12">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                RISK TRANSFORMATION SEQUENCE
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                What Happens When Risk Has No Owner?
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                The biggest governance gaps are not always missing policies. They are unclear ownership, fragmented evidence, inconsistent controls and risks that nobody is actively responsible for managing.
              </p>
            </div>
          </AnimatedSection>

          {/* Transformation Sequence Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* UNOWNED RISK STATE */}
            <AnimatedSection delay={0.08}>
              <div className="p-6 sm:p-8 rounded-3xl bg-[#fff5f2] dark:bg-[#120805] border-2 border-[#f15e1c]/40 space-y-6 text-left relative overflow-hidden h-full">
                <div className="flex items-center justify-between border-b border-[#f15e1c]/20 pb-3">
                  <div className="flex items-center gap-2 text-[#f15e1c]">
                    <ShieldAlert className="w-5 h-5" />
                    <span className="text-xs font-mono font-extrabold uppercase tracking-wider">
                      UNOWNED RISK STATE (EXPOSED)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#f15e1c] font-bold">HIGH EXPOSURE</span>
                </div>

                <div className="space-y-2.5">
                  {unownedRiskSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 4 }}
                      className="p-3 rounded-2xl bg-white/80 dark:bg-[#000000]/60 border border-[#f15e1c]/30 flex items-center justify-between text-xs font-bold font-mono text-[#f15e1c]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="opacity-60">0{i + 1}.</span>
                        <span>{step}</span>
                      </div>
                      <AlertTriangle className="w-4 h-4 text-[#f15e1c] shrink-0" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* GOVERNED RISK STATE */}
            <AnimatedSection delay={0.14}>
              <div className="p-6 sm:p-8 rounded-3xl bg-[#f0f9f5] dark:bg-[#05140d] border-2 border-[#2e936f]/40 space-y-6 text-left relative overflow-hidden h-full">
                <div className="flex items-center justify-between border-b border-[#2e936f]/20 pb-3">
                  <div className="flex items-center gap-2 text-[#2e936f]">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-xs font-mono font-extrabold uppercase tracking-wider">
                      GOVERNED RISK STATE (ARAV APPROACH)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#2e936f] font-bold">CONTROLLED</span>
                </div>

                <div className="space-y-2.5">
                  {governedRiskSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 4 }}
                      className="p-3 rounded-2xl bg-white/80 dark:bg-[#000000]/60 border border-[#2e936f]/30 flex items-center justify-between text-xs font-bold font-mono text-[#2e936f]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="opacity-60">0{i + 1}.</span>
                        <span>{step}</span>
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
      <SystemScanTransition />

      {/* =========================================================================
          6. CAPABILITIES — COMPACT EDITORIAL TWO-COLUMN LIST
          ========================================================================= */}
      <section id="capabilities" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-10 text-left">
          
          <AnimatedSection>
            <div className="max-w-3xl space-y-3">
              <Badge variant="secondary" size="md">
                WHERE GOVERNANCE MEETS EXECUTION
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Where Governance Meets Execution
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Targeted governance and risk capabilities designed for operational practice.
              </p>
            </div>
          </AnimatedSection>

          {/* Compact 2-Column Capability List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {compactCapabilities.map((cap, idx) => (
              <AnimatedSection key={cap.num} delay={idx * 0.05}>
                <motion.div
                  onMouseEnter={() => setActiveCapIdx(idx)}
                  whileHover={{ x: 4 }}
                  className={cn(
                    "p-5 rounded-2xl border transition-all duration-300 cursor-pointer space-y-1.5 flex items-start gap-4 text-left group",
                    activeCapIdx === idx
                      ? "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#2e936f] shadow-sm"
                      : "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f]"
                  )}
                >
                  <span className="text-sm font-mono font-black text-[#2e936f] group-hover:scale-110 transition-transform shrink-0 pt-0.5">
                    {cap.num}
                  </span>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors">
                        {cap.title}
                      </h3>
                      <ArrowRight className="w-4 h-4 text-[#2e936f] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
                    </div>
                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          7. COMPLIANCE FRAMEWORKS — HORIZONTAL ECOSYSTEM
          ========================================================================= */}
      <section id="frameworks" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                COMPLIANCE ECOSYSTEM
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Frameworks We Can Help You Align With
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                We help align your operations with global information security, data privacy, and AI governance frameworks.
              </p>
            </div>
          </AnimatedSection>

          {/* Clean Horizontal Ecosystem Matrix */}
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {frameworkItems.map((fw, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f] space-y-2 text-center transition-all cursor-default group"
                >
                  <div className="p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] w-fit mx-auto group-hover:scale-110 transition-transform">
                    <ShieldCheck className="w-4 h-4 text-[#2e936f]" />
                  </div>
                  <div className="font-extrabold font-display text-xs text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors">
                    {fw.name}
                  </div>
                  <p className="text-[10px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-tight">
                    {fw.focus}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          8. RESILIENCE LIFECYCLE
          ========================================================================= */}
      <section id="resilience" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-12">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                ORGANIZATIONAL RESILIENCE
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Prepare Before the Incident Becomes the Strategy
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                A resilient organization needs more than preventive controls. It needs defined responsibilities, escalation paths, response procedures, communication mechanisms and recovery thinking before a disruptive event occurs.
              </p>
            </div>
          </AnimatedSection>

          {/* 5-Stage Resilience Lifecycle */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
            {resilienceLifecycle.map((item, idx) => {
              const isActive = activeResilienceIdx === idx;
              return (
                <AnimatedSection key={item.step} delay={idx * 0.08}>
                  <motion.div
                    onClick={() => setActiveResilienceIdx(idx)}
                    onMouseEnter={() => setActiveResilienceIdx(idx)}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={cn(
                      "p-5 rounded-3xl border-2 transition-all duration-300 cursor-pointer space-y-2 text-left flex flex-col justify-between min-h-[160px] select-none",
                      isActive
                        ? "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#2e936f] shadow-lg ring-2 ring-[#2e936f]/20"
                        : "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#f7d7b0] dark:border-[#1a1a1a] opacity-80 hover:opacity-100 hover:border-[#2e936f]"
                    )}
                  >
                    <div className="space-y-1">
                      <span
                        className={cn(
                          "text-xs font-mono font-black block transition-colors",
                          isActive ? "text-[#2e936f]" : "text-[#7A6A5F]"
                        )}
                      >
                        STEP {item.step}
                      </span>
                      <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium pt-1">
                        {item.desc}
                      </p>
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="activeResilienceDot"
                        className="h-1 w-full bg-[#2e936f] rounded-full mt-2"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          9. BUSINESS OUTCOMES — CLEAN HORIZONTAL STRIP
          ========================================================================= */}
      <section id="outcomes" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                WHAT BETTER GOVERNANCE GIVES YOU
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                What Better Governance Gives You
              </h2>
            </div>
          </AnimatedSection>

          {/* Clean Horizontal Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {horizontalOutcomes.map((out, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.05}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f] space-y-1 transition-all"
                >
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#2e936f]">
                    <CheckCircle2 className="w-4 h-4 text-[#2e936f]" />
                    <span>{out.title}</span>
                  </div>
                  <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed pl-6">
                    {out.line}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          10. COMPLIANCE VS RESILIENCE POSITIONING STATEMENT
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <Badge variant="secondary" size="md">
              THE GOVERNANCE DIFFERENCE
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
              Compliance Is the Baseline. <br />
              <span className="text-[#2e936f]">Resilience Is the Goal.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
              A checkbox can demonstrate that a requirement was addressed.
            </p>
            <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
              A strong governance system helps an organization understand what could go wrong, decide what matters, assign ownership, implement controls and continuously improve.
            </p>
            <p className="text-lg sm:text-xl font-bold font-display text-[#f15e1c]">
              That's the difference between preparing for an audit and building an organization that is ready for change.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          11. WHAT WE ASSESS
          ========================================================================= */}
      <section id="what-we-assess" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                ASSESSMENT SCOPE
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                See Governance in Practice
              </h2>
              <p className="text-base font-mono font-bold text-[#2e936f] uppercase tracking-wider">
                What We Assess
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-left">
            {whatWeAssessList.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.04}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f] space-y-1 transition-all"
                >
                  <span className="text-xs font-bold font-display text-[#1b2823] dark:text-[#ffffff] block">
                    {item.title}
                  </span>
                  <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-tight">
                    {item.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          12. DYNAMIC BLOG / INSIGHTS
          ========================================================================= */}
      <section id="insights" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-4">
              <div className="space-y-2 text-left">
                <Badge variant="secondary" size="md">
                  KNOWLEDGE &amp; THOUGHT LEADERSHIP
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                  Risk &amp; Governance Insights
                </h2>
              </div>
              <Link
                href="/insights"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2e936f] hover:underline shrink-0 group"
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
                  <div className="h-full p-6 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#2e936f] hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left space-y-4 group">
                    <div className="space-y-3">
                      <div className="w-full mb-3 rounded-2xl overflow-hidden border border-[#f7d7b0]/60">
                        <BlogCardImage post={post} aspectRatio="aspect-video" />
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#2e936f]">
                        <span className="uppercase tracking-wider">{post.category}</span>
                        <span>{post.publishedAt || post.dateFormatted}</span>
                      </div>
                      <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed line-clamp-3 font-medium">
                        {post.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#f7d7b0] dark:border-[#1a1a1a]">
                      <Link
                        href={`/insights/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#2e936f] group-hover:underline"
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
      <SystemScanTransition />

      {/* =========================================================================
          13. FREQUENTLY ASKED QUESTIONS (5 FAQS)
          ========================================================================= */}
      <section id="faq" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
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
                    className="rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f]/60 overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group select-none"
                    >
                      <span className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-[#2e936f] transition-transform duration-300 shrink-0",
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
      <SystemScanTransition />

      {/* =========================================================================
          CONNECTIVITY: INTERNAL SERVICES ECOSYSTEM
          ========================================================================= */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-8 text-left">
          
          <AnimatedSection>
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#2e936f] uppercase tracking-wider block">
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
                    className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f] hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] group-hover:scale-110 group-hover:border-[#2e936f]/40 transition-all">
                        {item.icon}
                      </div>
                      <span className="text-xs font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors">
                        {item.name}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#2e936f] group-hover:translate-x-1.5 transition-transform shrink-0" />
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          14. FINAL CTA — KNOW YOUR RISK BEFORE IT KNOWS YOU
          ========================================================================= */}
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-12">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#2e936f] via-[#267e5f] to-[#1e654c] text-white p-10 sm:p-16 border-2 border-[#fab60a] shadow-2xl space-y-8 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ffec69]" />
                <span>BUILD AN AUDIT-READY GOVERNANCE PROGRAM</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                Know Your Risk Before It Knows You.
              </h2>

              <p className="text-sm sm:text-base font-medium text-white/90 leading-relaxed">
                Build a governance program that gives your leadership clearer visibility, stronger accountability and a practical path from risk identification to continuous improvement.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/contact">
                <MagneticButton>
                  <Button3D
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1.5" />}
                    className="w-full sm:w-auto justify-center bg-white text-[#2e936f] hover:bg-[#f7d7b0] hover:-translate-y-0.5 transition-all duration-300 font-bold"
                  >
                    Start a Risk Assessment
                  </Button3D>
                </MagneticButton>
              </Link>

              <Link href="/contact">
                <MagneticButton>
                  <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center text-white border-white/60 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300">
                    Talk to Our Governance Team
                  </Button3D>
                </MagneticButton>
              </Link>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 text-xs text-white/90 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> ISO 27001, SOC 2, GDPR &amp; DPDP Readiness
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Structured RACI &amp; Control Ownership
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Enterprise Risk Intelligence Squads
              </span>
            </div>
          </div>
        </AnimatedSection>
      </section>

    </div>
  );
}

export default RiskGovInteractivePage;
