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
import { CEOLeadershipSection } from "@/components/services/CEOLeadershipSection";
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
  TrendingUp,
  BarChart3,
  ChevronDown,
  ArrowUpRight,
  Compass,
  Code2,
  Users2,
  ShieldCheck,
  Cpu,
  Target,
  FileText,
  Wrench,
} from "lucide-react";
import { Service } from "@/data/services";
import { BlogPost, blogPostsData } from "@/data/insights";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";

interface AuditPageProps {
  service: Service;
  relatedPosts?: BlogPost[];
}

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
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#f15e1c] to-transparent shadow-[0_0_10px_#f15e1c]"
        />
      )}
    </div>
  );
}

function AnimatedDotGrid() {
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

const keywordTags = [
  "Operational Audit",
  "Internal Audit Support",
  "Process Improvement",
  "Technology Assessment",
  "Control Review",
  "Performance Diagnostics",
];

const auditCapabilities = [
  {
    num: "01",
    title: "Operational Process Audits",
    description:
      "Deep-dive evaluations of operational workflows, team handoffs, and resource utilization to isolate bottlenecks.",
    icon: <Search className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    num: "02",
    title: "IT System & Architecture Audits",
    description:
      "Technical audits of infrastructure resilience, code quality, database performance, and security controls.",
    icon: <BarChart3 className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    num: "03",
    title: "Internal Control Review",
    description:
      "Assessment of internal financial, operational, and compliance controls to ensure risk policy compliance.",
    icon: <FileCheck className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    num: "04",
    title: "Remediation & Continuous Improvement",
    description:
      "Actionable remediation roadmaps, implementation guidance, and re-testing to ensure permanent gap resolution.",
    icon: <RefreshCw className="w-5 h-5 text-[#f15e1c]" />,
  },
];

const diagnosticStages = [
  {
    id: "STAGE-01",
    num: "01",
    title: "OBSERVE",
    subtitle: "Current-State Observation & Context",
    desc: "We observe end-to-end workflows, system handoffs, and team practices in operation to document reality rather than assumptions.",
    deliverables: ["Process Baseline Map", "Workflow Friction Inventory", "Stakeholder Interview Notes"],
  },
  {
    id: "STAGE-02",
    num: "02",
    title: "COLLECT",
    subtitle: "Evidence & Telemetry Gathering",
    desc: "We gather operational evidence, system integration logs, defect records, policy documentation, and control execution data.",
    deliverables: ["Empirical Data Repository", "System Telemetry Log", "Control Verification Data"],
  },
  {
    id: "STAGE-03",
    num: "03",
    title: "ANALYZE",
    subtitle: "Root Cause & Bottleneck Isolation",
    desc: "We cross-examine evidence against operating benchmarks to isolate bottlenecks, redundancies, and control vulnerabilities.",
    deliverables: ["Root-Cause Analysis Matrix", "Performance Bottleneck Map", "Risk & Control Gap Analysis"],
  },
  {
    id: "STAGE-04",
    num: "04",
    title: "FIND",
    subtitle: "Structured Audit Findings Report",
    desc: "We synthesize findings into clear, plain-language insights detailing operational risk, duplication, and performance gaps.",
    deliverables: ["Audit Findings Report", "Executive Risk Summary", "Prioritized Deficiency Register"],
  },
  {
    id: "STAGE-05",
    num: "05",
    title: "PRIORITIZE",
    subtitle: "Actionable Remediation Blueprint",
    desc: "We map all findings by business impact and implementation complexity so leadership knows exactly where to focus first.",
    deliverables: ["Remediation Roadmap", "Implementation Resource Plan", "Post-Audit Verification Plan"],
  },
];

const whatWeDoServices = [
  {
    num: "01",
    title: "Operational Process Audits",
    description:
      "Map actual operational workflows, identify task duplication, measure process velocity, and eliminate unnecessary handoff steps.",
    icon: <Search className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    num: "02",
    title: "IT & Systems Audits",
    description:
      "Evaluate software architectures, infrastructure stability, database performance, legacy technical debt, and licensing.",
    icon: <BarChart3 className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    num: "03",
    title: "Internal Control Reviews",
    description:
      "Review internal operational controls, authorization flows, and segregation of duties to prevent error and operational leakage.",
    icon: <FileCheck className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    num: "04",
    title: "Vendor & Partner Audits",
    description:
      "Audit third-party SLAs, service quality, vendor compliance, and contractual delivery commitments.",
    icon: <Users2 className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    num: "05",
    title: "Quality & Compliance Audits",
    description:
      "Verify adherence to internal quality standards, industry regulations, and operational policy mandates.",
    icon: <ShieldCheck className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    num: "06",
    title: "Remediation Planning",
    description:
      "Translate diagnostic findings into prioritized remediation plans with realistic timelines and resource requirements.",
    icon: <Wrench className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    num: "07",
    title: "Post-Audit Verification",
    description:
      "Perform follow-up reviews to verify that recommended fixes have been correctly implemented and deliver expected performance.",
    icon: <CheckCircle2 className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    num: "08",
    title: "Continuous Audit Advisory",
    description:
      "Provide ongoing internal audit support, periodic diagnostic reviews, and continuous process monitoring.",
    icon: <Activity className="w-5 h-5 text-[#f15e1c]" />,
  },
];

const applicableMarkets = [
  { title: "Enterprise & Manufacturing", desc: "Process bottleneck identification, operational efficiency, and supply chain control.", icon: <Activity className="w-4 h-4 text-[#f15e1c]" /> },
  { title: "Financial & Professional Services", desc: "Internal control verification, audit-ready compliance evidence, and risk mitigation.", icon: <FileCheck className="w-4 h-4 text-[#2e936f]" /> },
  { title: "Technology & Software Companies", desc: "Architecture audits, technical debt assessments, and infrastructure health reviews.", icon: <Code2 className="w-4 h-4 text-[#fab60a]" /> },
  { title: "Healthcare & Organizations", desc: "Operational workflow review, quality assurance audits, and regulatory alignment.", icon: <ShieldCheck className="w-4 h-4 text-[#2e936f]" /> },
];

const whatWeMeasureList = [
  { title: "Process Velocity Improvement", desc: "Quantitative reduction in workflow cycle time and operational handoff delays.", icon: <Zap className="w-5 h-5 text-[#f15e1c]" /> },
  { title: "Deficiency Resolution Rate", desc: "Percentage of identified audit findings fully resolved within the remediation window.", icon: <CheckCircle2 className="w-5 h-5 text-[#2e936f]" /> },
  { title: "Operational Cost Efficiency", desc: "Elimination of redundant processing steps, rework, and wasted staff effort.", icon: <TrendingUp className="w-5 h-5 text-[#fab60a]" /> },
  { title: "Control Effectiveness Rating", desc: "Verified score of operational and IT control execution reliability.", icon: <FileCheck className="w-5 h-5 text-[#2e936f]" /> },
  { title: "Audit Verification Speed", desc: "Time required to conduct diagnostic reviews and generate actionable evidence.", icon: <Activity className="w-5 h-5 text-[#f15e1c]" /> },
  { title: "Technology Risk Reduction", desc: "Decrease in critical system vulnerabilities, technical debt, and performance risks.", icon: <BarChart3 className="w-5 h-5 text-[#fab60a]" /> },
];

const faqList = [
  {
    q: "What types of audits does Arav Innovations perform?",
    a: "We conduct operational process audits, IT system and architecture reviews, internal control evaluations, third-party vendor audits, and compliance gap assessments.",
  },
  {
    q: "How does an audit differ from an IT Strategy or Risk service?",
    a: "Audit & Improvement focuses on empirical diagnostics—measuring how your operations, systems, and controls perform in practice today, identifying exact failure points, and delivering a prioritized remediation blueprint.",
  },
  {
    q: "Do you help fix the issues found during an audit?",
    a: "Yes. In addition to delivering detailed diagnostic reports, we provide remediation blueprints, hands-on implementation guidance, and post-audit verification to confirm issues are resolved.",
  },
  {
    q: "How long does a typical operational audit take?",
    a: "Audit timelines depend on scope. A focused operational or technical diagnostic typically takes 2 to 4 weeks, from initial observation to executive findings presentation.",
  },
  {
    q: "How do you ensure audit findings are objective?",
    a: "We rely on empirical evidence, telemetry logs, workflow observations, and quantitative benchmarks rather than subjective opinions, delivering unbiased clarity for leadership.",
  },
];

const internalServices = [
  { name: "IT Strategy & Implementation", href: "/services/it-strategy-implementation", icon: <Compass className="w-4 h-4 text-[#f15e1c]" /> },
  { name: "Digital Marketing & Brand", href: "/services/digital-marketing-brand-development", icon: <TrendingUp className="w-4 h-4 text-[#2e936f]" /> },
  { name: "Web & Application Development", href: "/services/web-app-development", icon: <Code2 className="w-4 h-4 text-[#2e936f]" /> },
  { name: "Risk, Compliance & Governance", href: "/services/risk-compliance-governance", icon: <ShieldCheck className="w-4 h-4 text-[#2e936f]" /> },
  { name: "Training & Staff Augmentation", href: "/services/training-staff-augmentation", icon: <Users2 className="w-4 h-4 text-[#fab60a]" /> },
  { name: "SEO Services", href: "/services/seo-services", icon: <Search className="w-4 h-4 text-[#2e936f]" /> },
  { name: "AI Portfolio", href: "/services/ai-portfolio", icon: <Cpu className="w-4 h-4 text-[#f15e1c]" /> },
];

export function AuditInteractivePage({ service, relatedPosts }: AuditPageProps) {
  const [activeStageIdx, setActiveStageIdx] = React.useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(0);

  const displayPosts = React.useMemo(() => {
    if (relatedPosts && relatedPosts.length > 0) {
      return relatedPosts.slice(0, 3);
    }
    return blogPostsData.slice(0, 3);
  }, [relatedPosts]);

  const activeStage = diagnosticStages[activeStageIdx];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#000000] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden selection:bg-[#f15e1c]/20 selection:text-[#f15e1c] relative">
      
      <AnimatedDotGrid />

      {/* 1. HERO */}
      <section className="relative pt-6 sm:pt-8 lg:pt-8 pb-8 sm:pb-12 lg:pb-14 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-[#FFFDF9] dark:bg-[#000000] border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] overflow-hidden select-none flex flex-col justify-start">
        
        <div className="absolute inset-0 pointer-events-none hidden lg:block select-none overflow-hidden">
          <Image
            src="/images/audit-improvement-hero-bg.webp"
            alt="Audit & Improvement Strategy"
            fill
            priority
            className="object-cover object-right opacity-95 dark:opacity-90 transition-opacity duration-500"
            sizes="(min-width: 1024px) 100vw, 1px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF9] via-[#FFFDF9]/80 via-45% to-transparent dark:from-[#000000] dark:via-[#000000]/80 dark:via-45% dark:to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9]/20 via-transparent to-[#FFFDF9]/60 dark:from-[#000000]/20 dark:via-transparent dark:to-[#000000]/60 pointer-events-none" />
        </div>

        <AnimatedDotGrid />

        <div className="max-w-[1536px] mx-auto w-full space-y-4 sm:space-y-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            
            <div className="lg:col-span-7 xl:col-span-6 space-y-4 sm:space-y-5 text-left max-w-2xl">
              
              <AnimatedSection delay={0.05} className="space-y-2">
                <Breadcrumb
                  items={[
                    { label: "Services", href: "/services" },
                    { label: "Audit & Improvement" },
                  ]}
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce3d3] dark:bg-[#0a0a0a] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c] shadow-2xs cursor-default transition-all duration-300"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#f15e1c] animate-pulse" />
                  <span>OPERATIONAL AUDITS &amp; PROCESS IMPROVEMENT</span>
                </motion.div>
              </AnimatedSection>

              <AnimatedSection delay={0.1} className="space-y-2">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight leading-[1.15] text-[#1b2823] dark:text-[#ffffff]">
                  Audit &amp; Operational <span className="text-[#f15e1c]">Improvement</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.12} className="w-full lg:hidden my-2">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl border border-[#f7d7b0] dark:border-[#1a1a1a] bg-white dark:bg-[#0a0a0a] overflow-hidden shadow-lg">
                  <Image
                    src="/images/audit-improvement-mobile-cropped.webp"
                    alt="Audit & Improvement Strategy"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.14} className="space-y-2">
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed max-w-2xl">
                  Identify operational bottlenecks, system inefficiencies, and control gaps through empirical diagnostics. We evaluate real workflows and deliver prioritized remediation plans that drive operational performance.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.16} className="pt-1 flex flex-wrap items-center gap-3">
                <Link href="/contact">
                  <MagneticButton>
                    <Button3D
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1.5" />}
                      className="shadow-md shadow-[#f15e1c]/20 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Request Diagnostic Review
                    </Button3D>
                  </MagneticButton>
                </Link>

                <Link href="#capabilities">
                  <MagneticButton>
                    <Button3D variant="outline" size="md" className="hover:-translate-y-0.5 transition-all duration-300">
                      Explore Audit Scope
                    </Button3D>
                  </MagneticButton>
                </Link>
              </AnimatedSection>

              <AnimatedSection delay={0.18} className="pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  {keywordTags.map((tag, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.04, y: -1 }}
                      transition={{ duration: 0.2 }}
                      className="px-3 py-1 rounded-lg bg-[#fefaf5]/90 dark:bg-[#0a0a0a]/90 border border-[#f7d7b0] dark:border-[#1a1a1a] text-xs font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#f15e1c] hover:border-[#f15e1c]/40 transition-all duration-200 cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            <div className="hidden lg:block lg:col-span-5 xl:col-span-6 h-full min-h-[260px]" />
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* 2. VISUAL BREAK 1 */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            
            <div className="lg:col-span-5 w-full flex items-center justify-center">
              <AnimatedSection delay={0.08} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full aspect-[16/9] rounded-2xl border border-[#f7d7b0] dark:border-[#1a1a1a] overflow-hidden bg-white dark:bg-[#080808] shadow-md hover:shadow-xl hover:border-[#f15e1c]/50 transition-all duration-300 group"
                >
                  <Image
                    src="/images/audit-and-improvement-main.webp"
                    alt="Arav Innovations Audit & Diagnostic Review"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </motion.div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-7 space-y-4 text-left">
              <AnimatedSection delay={0.12} className="space-y-2">
                <Badge variant="secondary" size="md">
                  EMPIRICAL DIAGNOSTICS
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
                  Turning Observation Into Measurable Performance
                </h2>
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
                  An audit is valuable when it produces actionable clarity. We analyze how work actually moves through your operations and systems, identifying root causes of inefficiency and establishing prioritized remediation roadmaps.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.16}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]/40 space-y-1 transition-all duration-200 cursor-default group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#f15e1c]">
                      <Search className="w-4 h-4" />
                      <span>PROCESS AUDIT</span>
                    </div>
                    <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal">
                      Workflow mapping &amp; bottleneck isolation.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f]/40 space-y-1 transition-all duration-200 cursor-default group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#2e936f]">
                      <BarChart3 className="w-4 h-4" />
                      <span>IT AUDIT</span>
                    </div>
                    <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal">
                      Technical debt &amp; architecture assessment.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#fab60a]/40 space-y-1 transition-all duration-200 cursor-default group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#fab60a]">
                      <RefreshCw className="w-4 h-4" />
                      <span>REMEDIATION</span>
                    </div>
                    <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal">
                      Prioritized fix action plan &amp; re-testing.
                    </p>
                  </motion.div>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* 3. CAPABILITIES */}
      <section id="capabilities" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="max-w-3xl space-y-3 text-left">
              <Badge variant="secondary" size="md">
                AUDIT SCOPE
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Core Diagnostic Capabilities
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
                Independent diagnostic evaluations covering operational workflows, software architecture, internal control execution, and remediation tracking.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {auditCapabilities.map((cap, idx) => (
              <AnimatedSection key={cap.num} delay={idx * 0.06} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-6 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:shadow-lg hover:border-[#f15e1c] transition-all duration-300 flex flex-col justify-between text-left group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-[#f15e1c] px-2.5 py-0.5 rounded-md bg-[#fce3d3] dark:bg-[#161616] border border-[#f15e1c]/30">
                        {cap.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#fefaf5] dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        {cap.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors leading-snug">
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                      {cap.description}
                    </p>
                  </div>

                  <div className="h-1 w-0 group-hover:w-full bg-[#f15e1c] transition-all duration-300 rounded-full mt-4" />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* 4. DIAGNOSTIC PIPELINE */}
      <section id="process" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                DIAGNOSTIC PROCESS
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
                5-Stage Audit &amp; Improvement Framework
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                A disciplined diagnostic lifecycle connecting workflow observation to evidence collection, root cause analysis, findings presentation, and action prioritization.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="rounded-2xl sm:rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-lg p-4 sm:p-6 lg:p-8 space-y-6">
              
              <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-5 gap-2 relative">
                {diagnosticStages.map((stg, idx) => {
                  const isSelected = activeStageIdx === idx;
                  return (
                    <button
                      key={stg.id}
                      type="button"
                      onClick={() => setActiveStageIdx(idx)}
                      className={cn(
                        "py-2.5 px-3 rounded-xl text-xs font-extrabold font-display transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 select-none relative z-10 border",
                        isSelected
                          ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-sm"
                          : "bg-white dark:bg-[#000000] text-[#4a5c55] dark:text-[#d3eee4] border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] hover:bg-[#f15e1c]/5"
                      )}
                    >
                      <span className={cn("font-mono text-[10px]", isSelected ? "text-white/80" : "text-[#f15e1c]")}>
                        {stg.num}.
                      </span>
                      <span className="truncate">{stg.title}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="p-5 sm:p-7 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                >
                  <div className="lg:col-span-7 space-y-3 text-left">
                    <span className="text-xs font-mono font-bold text-[#f15e1c] uppercase tracking-wider block">
                      STAGE {activeStage.num} &bull; {activeStage.title}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {activeStage.subtitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                      {activeStage.desc}
                    </p>
                  </div>

                  <div className="lg:col-span-5 space-y-2.5 text-left border-t lg:border-t-0 lg:border-l border-[#f7d7b0]/60 dark:border-[#1a1a1a] pt-4 lg:pt-0 lg:pl-6">
                    <span className="text-xs font-mono font-bold uppercase text-[#2e936f] block">
                      Core Stage Deliverables:
                    </span>
                    <div className="space-y-2">
                      {activeStage.deliverables.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs font-semibold text-[#1b2823] dark:text-[#ffffff] p-2.5 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SystemScanTransition />

      {/* 5. SERVICE ITEMS */}
      <section id="what-we-do" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                SERVICE WORKSTREAMS
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Audit &amp; Improvement Services
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Targeted diagnostic evaluations covering operational workflows, software architectures, control frameworks, and vendor delivery commitments.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {whatWeDoServices.map((svc, idx) => (
              <AnimatedSection key={svc.num} delay={idx * 0.04} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-5 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#f15e1c] hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-[#f15e1c]">
                        {svc.num}
                      </span>
                      <div className="p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] group-hover:scale-105 transition-transform">
                        {svc.icon}
                      </div>
                    </div>
                    <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                      {svc.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-2 flex items-center justify-between border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a] text-[11px] font-mono font-bold text-[#f15e1c]">
                    <span>Scope Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* 6. APPLICABLE MARKETS */}
      <section id="markets" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-8">
          
          <AnimatedSection>
            <div className="max-w-3xl space-y-3 text-left">
              <Badge variant="secondary" size="md">
                APPLICABLE MARKETS
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Tailored Sector Solutions
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                Diagnostic audits tailored to your sector’s operational complexity and regulatory requirements:
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
              {applicableMarkets.map((mkt, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] hover:bg-white dark:hover:bg-[#000000] shadow-xs transition-all duration-200 text-left flex flex-col justify-between space-y-2 group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#222222] shrink-0 group-hover:scale-105 transition-transform">
                      {mkt.icon}
                    </div>
                    <h3 className="text-sm font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                      {mkt.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal pl-0.5">
                    {mkt.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SystemScanTransition />

      {/* 7. WHAT WE MEASURE */}
      <section id="what-we-measure" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                DIAGNOSTIC METRICS
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Operational Improvement Indicators
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                We measure audit success by workflow velocity gains, deficiency resolution speed, and cost efficiency.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {whatWeMeasureList.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.04} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-5 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#2e936f] hover:shadow-md transition-all duration-300 space-y-2.5 text-left group"
                >
                  <div className="p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] w-fit group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* 8. BLOGS & INSIGHTS */}
      <section id="insights" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-8">
          
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-4">
              <div className="space-y-2 text-left">
                <Badge variant="secondary" size="md">
                  KNOWLEDGE &amp; STRATEGY
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                  Operational Audit &amp; Improvement Insights
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {displayPosts.map((post, idx) => (
              <AnimatedSection key={post.slug} delay={idx * 0.08} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-5 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#f15e1c] hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="w-full mb-2 rounded-xl overflow-hidden border border-[#f7d7b0]/60">
                      <BlogCardImage post={post} aspectRatio="aspect-video" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#2e936f]">
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
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* CEO LEADERSHIP */}
      <CEOLeadershipSection serviceContext="His perspective shapes diagnostic evaluations focused on measurable operational performance." />

      <SystemScanTransition />

      {/* 9. FAQ */}
      <section id="faq" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto space-y-8 text-left">
          
          <AnimatedSection>
            <div className="text-center space-y-3">
              <Badge variant="secondary" size="md">
                QUESTIONS &amp; ANSWERS
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Frequently Asked Questions
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-3">
            {faqList.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <AnimatedSection key={idx} delay={idx * 0.04}>
                  <div className="rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]/60 overflow-hidden transition-all shadow-xs">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group select-none"
                    >
                      <span className="text-sm sm:text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
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
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="px-5 pb-5 text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium border-t border-[#f7d7b0]/40 dark:border-[#1a1a1a] pt-3"
                        >
                          {faq.a}
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

      <SystemScanTransition />

      {/* 10. CONNECTED ECOSYSTEM */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-4 sm:space-y-6 text-left">
          
          <AnimatedSection>
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-[#f15e1c] uppercase tracking-wider block">
                ARAV SERVICE ECOSYSTEM
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
                Connected Enterprise Services
              </h3>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {internalServices.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.04}>
                <Link
                  href={item.href}
                  className="p-3.5 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] hover:shadow-sm transition-all flex items-center justify-between group cursor-pointer min-h-[56px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] group-hover:scale-105 transition-all shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors leading-snug">
                      {item.name}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#f15e1c] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* FINAL CTA */}
      <section id="contact" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-12">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#f15e1c] via-[#e55215] to-[#d8480d] text-white p-8 sm:p-14 border-2 border-[#fab60a] shadow-2xl space-y-6 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#ffec69]" />
                <span>REQUEST AN OPERATIONAL AUDIT</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                Turn Operational Observations Into Actionable Improvements
              </h2>

              <p className="text-xs sm:text-sm font-medium text-white/90 leading-relaxed max-w-2xl mx-auto">
                Discuss your operational bottlenecks, technical debt questions, and process priorities with our diagnostic advisory team.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/contact">
                <MagneticButton>
                  <Button3D
                    variant="primary"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1.5" />}
                    className="w-full sm:w-auto justify-center bg-white text-[#f15e1c] hover:bg-[#f7d7b0] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Request Diagnostic Review
                  </Button3D>
                </MagneticButton>
              </Link>

              <Link href="/services">
                <MagneticButton>
                  <Button3D variant="outline" size="md" className="w-full sm:w-auto justify-center text-white border-white/60 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300">
                    Explore Services
                  </Button3D>
                </MagneticButton>
              </Link>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/20 flex flex-wrap items-center justify-center gap-4 text-xs text-white/90 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Empirical Data-Driven Diagnostics
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Prioritized Action Roadmaps
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Advisory Teams in Gurgaon &amp; Dubai
              </span>
            </div>
          </div>
        </AnimatedSection>
      </section>

    </div>
  );
}

export default AuditInteractivePage;
