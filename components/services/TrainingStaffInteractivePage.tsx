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
  Users,
  GraduationCap,
  UserCheck,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Quote,
  Globe2,
  Zap,
  Layers,
  HeartHandshake,
  Check,
  Code,
  ShieldCheck,
  Cpu,
  RefreshCw,
  UserPlus,
  Target,
  Clock,
  Activity,
  ArrowUpRight,
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

interface TrainingStaffPageProps {
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
// 2. Hero Team Assembly Background (Human Capability Engine)
// -----------------------------------------------------------------------------
function TeamAssemblyBackground() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-25 select-none">
      <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none">
        <defs>
          <linearGradient id="ts-hero-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f15e1c" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#2e936f" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fab60a" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Abstract Team Node Network */}
        <circle cx="600" cy="180" r="28" fill="#f15e1c" fillOpacity="0.15" stroke="#f15e1c" strokeWidth="1.5" />
        <circle cx="420" cy="320" r="24" fill="#2e936f" fillOpacity="0.15" stroke="#2e936f" strokeWidth="1.5" />
        <circle cx="780" cy="320" r="24" fill="#fab60a" fillOpacity="0.15" stroke="#fab60a" strokeWidth="1.5" />
        <circle cx="320" cy="460" r="20" fill="#f15e1c" fillOpacity="0.15" stroke="#f15e1c" strokeWidth="1.5" />
        <circle cx="520" cy="460" r="20" fill="#2e936f" fillOpacity="0.15" stroke="#2e936f" strokeWidth="1.5" />
        <circle cx="680" cy="460" r="20" fill="#fab60a" fillOpacity="0.15" stroke="#fab60a" strokeWidth="1.5" />
        <circle cx="880" cy="460" r="20" fill="#2e936f" fillOpacity="0.15" stroke="#2e936f" strokeWidth="1.5" />

        {/* Interconnecting Connection Lines */}
        <line x1="600" y1="208" x2="420" y2="296" stroke="#f15e1c" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="600" y1="208" x2="780" y2="296" stroke="#fab60a" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="420" y1="344" x2="320" y2="440" stroke="#2e936f" strokeWidth="1.5" />
        <line x1="420" y1="344" x2="520" y2="440" stroke="#2e936f" strokeWidth="1.5" />
        <line x1="780" y1="344" x2="680" y2="440" stroke="#fab60a" strokeWidth="1.5" />
        <line x1="780" y1="344" x2="880" y2="440" stroke="#fab60a" strokeWidth="1.5" />

        {/* Node Role Badges */}
        <g transform="translate(560, 174)">
          <text x="0" y="12" fill="#f15e1c" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">LEAD</text>
        </g>
        <g transform="translate(420, 314)">
          <text x="0" y="12" fill="#2e936f" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">DEV</text>
        </g>
        <g transform="translate(780, 314)">
          <text x="0" y="12" fill="#fab60a" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">ARCH</text>
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
const trainingStaffSolutionsData = [
  {
    numStr: "01",
    title: "Customized Training Programs",
    subtitle: "Specialized Upskilling & Capability Acceleration",
    description:
      "We develop and deliver specialized training programs that address your team’s unique needs in areas like compliance, governance, cloud architecture, and technical skills.",
    icon: <GraduationCap className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Custom Enterprise Tech Stack & Cloud Curriculum",
      "Hands-On Interactive Workshops & Code Labs",
      "Governance & Compliance Upskilling Seminars",
      "Role-Based Skill Certification & Verification",
    ],
    metric: "95%",
    metricLabel: "Team Skill Mastery Acceleration",
    stageName: "CAPABILITY BUILDING",
  },
  {
    numStr: "02",
    title: "Staff Augmentation & Role Recruitment",
    subtitle: "Pre-Vetted Senior Developers & Tech Specialists",
    description:
      "Arav Innovations provides skilled professionals to augment your existing teams, ensuring you have the right expertise for each project without recruitment friction.",
    icon: <UserCheck className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Pre-Vetted Full-Stack & Cloud Engineers",
      "Role-Specific Skill & Cultural Matchmaking",
      "Scalable Pod Augmentation (1 to 20+ Engineers)",
      "Zero-Friction Contract & Ownership Transition",
    ],
    metric: "48 hours",
    metricLabel: "Talent Matching & Deployment SLA",
    stageName: "TALENT MATCHING",
  },
  {
    numStr: "03",
    title: "Onboarding and Integration Support",
    subtitle: "Seamless Team Assimilation & Ramp-Up",
    description:
      "We make the onboarding process seamless, with a structured integration plan to help new team members quickly adapt to your work culture, tools, and codebases.",
    icon: <HeartHandshake className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Structured 14-Day Team Assimilation Protocol",
      "Tooling, CI/CD & Repo Onboarding Checklists",
      "Cultural & Operational Alignment Sessions",
      "Immediate Day-1 Productivity Enablement",
    ],
    metric: "Day-1",
    metricLabel: "Productive Contribution Speed",
    stageName: "TEAM INTEGRATION",
  },
  {
    numStr: "04",
    title: "Performance Management & Continuous Support",
    subtitle: "KPI Tracking & Ongoing Talent Retention",
    description:
      "We help establish performance metrics and provide ongoing support to ensure augmented staff meets performance expectations and aligns with your organizational goals.",
    icon: <Award className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Monthly Team KPI & Velocity Tracking",
      "Bi-Weekly Retrospective & Feedback Loops",
      "Ongoing Mentorship & Technical Guidance",
      "100% Talent Retention & Substitution Guarantee",
    ],
    metric: "98%",
    metricLabel: "Retention & Satisfaction Rate",
    stageName: "CONTINUOUS SUPPORT",
  },
];

const teamMaturityStages = [
  { stage: "01", name: "ASSESS NEED", desc: "Role Requirements & Skill Gap Analysis" },
  { stage: "02", name: "MATCH TALENT", desc: "Pre-Vetted Pod & Specialist Matchmaking" },
  { stage: "03", name: "ONBOARD", desc: "Day-1 Zero-Downtime Integration" },
  { stage: "04", name: "PERFORM", desc: "Sprint Delivery & Coordinated Execution" },
  { stage: "05", name: "GROW TEAM", desc: "Continuous Upskilling & Capability Acceleration" },
];

const skillGapBars = [
  { skill: "FRONTEND ENGINEERING", current: 70, required: 95, color: "bg-[#f15e1c]" },
  { skill: "BACKEND ARCHITECTURE", current: 60, required: 90, color: "bg-[#2e936f]" },
  { skill: "CLOUD & FINOPS", current: 45, required: 88, color: "bg-[#fab60a]" },
  { skill: "SECURITY & COMPLIANCE", current: 40, required: 92, color: "bg-[#f15e1c]" },
];

const preVettedPodMembers = [
  { role: "LEAD ARCHITECT", exp: "10+ Yrs", status: "READY", icon: <Cpu className="w-5 h-5 text-[#f15e1c]" /> },
  { role: "SENIOR FULL-STACK", exp: "7+ Yrs", status: "READY", icon: <Code className="w-5 h-5 text-[#2e936f]" /> },
  { role: "QA AUTOMATION", exp: "5+ Yrs", status: "READY", icon: <ShieldCheck className="w-5 h-5 text-[#fab60a]" /> },
  { role: "DEVOPS ENGINEER", exp: "6+ Yrs", status: "READY", icon: <Zap className="w-5 h-5 text-[#2e936f]" /> },
];

const howWeWorkSteps = [
  {
    step: "01",
    title: "Assess and Design",
    subtitle: "Skill Gap Analysis & Staffing Blueprint",
    description:
      "We start by assessing your organization’s specific needs, whether for training or staffing. Our team designs a customized plan to address your unique requirements, setting a foundation for success.",
    output: "Skill Gap Analysis & Staffing Blueprint",
  },
  {
    step: "02",
    title: "Deliver Tailored Training & Source Top Talent",
    subtitle: "Curriculum Delivery & Talent Vetting",
    description:
      "We provide hands-on, specialized training sessions and recruit the right professionals to augment your team, ensuring alignment with your project and business objectives.",
    output: "Curriculum Delivery & Talent Vetting",
  },
  {
    step: "03",
    title: "Onboard and Integrate",
    subtitle: "Zero-Downtime Team Assimilation",
    description:
      "Our onboarding process ensures seamless integration, with support to help new team members quickly adapt and start contributing effectively, reducing downtime and accelerating productivity.",
    output: "Zero-Downtime Team Assimilation",
  },
  {
    step: "04",
    title: "Monitor and Support",
    subtitle: "Performance Tracking & Ongoing Mentorship",
    description:
      "Post-training or recruitment, we provide continuous support, monitoring performance and refining strategies to ensure ongoing alignment with your goals and high-quality results.",
    output: "Performance Tracking & Ongoing Mentorship",
  },
];

const continuousCapabilityLoopSteps = [
  { id: "assess", name: "ASSESS", desc: "Role Requirements Audit" },
  { id: "build", name: "BUILD", desc: "Tailored Training Workshops" },
  { id: "match", name: "MATCH", desc: "Pre-Vetted Talent Matching" },
  { id: "integrate", name: "INTEGRATE", desc: "Zero-Downtime Onboarding" },
  { id: "perform", name: "PERFORM", desc: "Coordinated Sprint Delivery" },
  { id: "support", name: "SUPPORT", desc: "Continuous Mentorship & Retention" },
];

const ctaWords = ["CAPABILITY", "AUGMENTATION", "INTEGRATION", "HIGH-PERFORMING", "SCALABLE"];

export function TrainingStaffInteractivePage({ service }: TrainingStaffPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeSolutionIdx, setActiveSolutionIdx] = React.useState<number>(0);
  const [activeMaturityStage, setActiveMaturityStage] = React.useState<number>(0);
  const [activeWorkIdx, setActiveWorkIdx] = React.useState<number>(0);
  const [currentWordIdx, setCurrentWordIdx] = React.useState<number>(0);

  // ---------------------------------------------------------------------------
  // 1. Team Maturity Journey Scroll Progression
  // ---------------------------------------------------------------------------
  const journeyContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: journeyProgress } = useScroll({
    target: journeyContainerRef,
    offset: ["start 80%", "end 20%"],
  });
  const smoothJourneyProgress = useSpring(journeyProgress, { stiffness: 45, damping: 25 });

  React.useEffect(() => {
    const unsub = smoothJourneyProgress.on("change", (v) => {
      const count = teamMaturityStages.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedStage = Math.floor(normalized * count);
      setActiveMaturityStage(calculatedStage);
    });
    return () => unsub();
  }, [smoothJourneyProgress]);

  // ---------------------------------------------------------------------------
  // 2. 4-Stage Framework Timeline Scroll Line
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
  // 3. Continuous Capability Loop Signal Motion
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
      const count = continuousCapabilityLoopSteps.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedIdx = Math.floor(normalized * count);
      setActiveLoopStep(calculatedIdx);
    });
    return () => unsub();
  }, [smoothLoopProgress]);

  // ---------------------------------------------------------------------------
  // 4. Parallax Background Typography for Capability Philosophy
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

  const activeSolution = trainingStaffSolutionsData[activeSolutionIdx];
  const activeWorkStep = howWeWorkSteps[activeWorkIdx];
  const testimonial = testimonialsData.find((t) => t.id === "test-3") || testimonialsData[2];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#12100E] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden selection:bg-[#f15e1c]/20 selection:text-[#f15e1c]">
      
      {/* =========================================================================
          1. HERO — TEAM ASSEMBLY ANIMATION & HUMAN CAPABILITY ENGINE
          ========================================================================= */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] overflow-hidden select-none">
        <TeamAssemblyBackground />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-radial from-[#f15e1c]/10 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-radial from-[#2e936f]/8 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-[1536px] mx-auto w-full space-y-6 relative z-10">
          {/* Top Breadcrumb & Badge */}
          <div className="space-y-3">
            <Breadcrumb
              items={[
                { label: "Services", href: "/services" },
                { label: "Training & Staff Augmentation" },
              ]}
            />
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]"
            >
              <Sparkles className="w-4 h-4" />
              <span>TALENT AUGMENTATION &amp; TEAM CAPABILITY ENGINE</span>
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
              Empowering Teams, Enhancing <span className="text-[#f15e1c]">Capabilities</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-base sm:text-xl lg:text-2xl text-[#4a5c55] dark:text-[#d3eee4] max-w-3xl mx-auto font-medium leading-relaxed"
            >
              From tailored enterprise upskilling to pre-vetted senior software engineering pods, we build and augment high-performing teams equipped to deliver complex digital products.
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
                    Build Your Team
                  </Button3D>
                </MagneticButton>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <MagneticButton className="w-full sm:w-auto">
                  <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center">
                    Explore Disciplines
                  </Button3D>
                </MagneticButton>
              </Link>
            </motion.div>
          </div>

          {/* System Status Bar */}
          <div className="pt-4 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 px-4 py-2 rounded-2xl bg-white/80 dark:bg-[#101b17]/80 border border-[#f7d7b0] dark:border-[#253630] backdrop-blur-md shadow-lg text-xs font-mono font-bold text-[#f15e1c]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-ping" />
                STATUS: TEAM ASSEMBLED
              </span>
              <span className="text-[#7A6A5F]">&bull;</span>
              <span>DEPLOYMENT: 48 HOURS</span>
              <span className="text-[#7A6A5F]">&bull;</span>
              <span>RETENTION: 98%</span>
            </div>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          2. SOLUTIONS — TEAM MATURITY JOURNEY (SIGNATURE SCROLL NARRATIVE)
          ========================================================================= */}
      <section
        id="team-maturity"
        ref={journeyContainerRef}
        className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none"
      >
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              TEAM MATURITY JOURNEY
            </Badge>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              High-Performing Team Journey
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Scroll down to observe individual skill requirements assembling into a fully integrated, high-performing team pod.
            </p>
          </div>

          {/* 5-Stage Team Maturity Progress Strip */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] shadow-sm max-w-5xl mx-auto flex items-center justify-between overflow-x-auto gap-2">
            {teamMaturityStages.map((st, i) => (
              <div
                key={st.stage}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold shrink-0 transition-all",
                  i <= activeMaturityStage
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

          {/* Active Stage Detail Card */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={teamMaturityStages[activeMaturityStage].stage}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="p-8 sm:p-12 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f15e1c]/40 shadow-2xl space-y-6 text-left relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#253630] pb-5">
                  <div>
                    <span className="text-xs font-mono font-black text-[#f15e1c] uppercase tracking-wider block">
                      STAGE {teamMaturityStages[activeMaturityStage].stage} / 05 &bull; {teamMaturityStages[activeMaturityStage].name}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mt-1">
                      {teamMaturityStages[activeMaturityStage].desc}
                    </h3>
                  </div>

                  <div className="px-4 py-2 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] text-xs font-mono font-bold text-[#2e936f] shadow-xs">
                    HUMAN CAPABILITY ENGINE
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0]/60 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#7A6A5F] block uppercase">DEPLOYMENT SLA</span>
                    <span className="text-sm font-mono font-extrabold text-[#f15e1c]">48 HOURS</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0]/60 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#7A6A5F] block uppercase">ONBOARDING SPEED</span>
                    <span className="text-sm font-mono font-extrabold text-[#2e936f]">DAY-1 PRODUCTIVE</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0]/60 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#7A6A5F] block uppercase">RETENTION RATE</span>
                    <span className="text-sm font-mono font-extrabold text-[#fab60a]">98% SATISFACTION</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 4 Solution Workstream Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingStaffSolutionsData.map((sol, idx) => {
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
                            CAPABILITY {sol.numStr}
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
                        Key Deliverables &amp; Outcomes
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
          3. SKILL GAP ANALYSIS & PRE-VETTED POD CLUSTER
          ========================================================================= */}
      <section className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none">
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              PRE-VETTED POD &amp; SKILL GAP ANALYSIS
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Current vs Required Skill Acceleration
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Visualizing how Arav fills team capability gaps with pre-vetted senior software engineering pods.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Skill Gap Bars */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl space-y-6">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#7A6A5F] border-b border-[#f7d7b0] pb-3">
                <span>SKILL DISCIPLINE</span>
                <span className="text-[#2e936f]">CURRENT % vs REQUIRED TARGET %</span>
              </div>

              <div className="space-y-4">
                {skillGapBars.map((bar, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono font-extrabold text-[#1b2823] dark:text-[#ffffff]">
                      <span>{bar.skill}</span>
                      <span className="text-[#f15e1c]">{bar.current}% &rarr; {bar.required}%</span>
                    </div>

                    <div className="relative w-full h-3 rounded-full bg-[#f7d7b0]/50 dark:bg-[#253630] overflow-hidden">
                      <div
                        style={{ width: `${bar.current}%` }}
                        className={cn("h-full rounded-full opacity-60", bar.color)}
                      />
                      <div
                        style={{ width: `${bar.required}%` }}
                        className={cn("absolute top-0 left-0 h-full rounded-full opacity-30 border-r-2 border-white", bar.color)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Pre-Vetted Pod Cluster Grid */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-[2.5rem] bg-white dark:bg-[#101b17] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl space-y-4 text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f15e1c] block">
                PRE-VETTED POD CLUSTER (READY TO DEPLOY)
              </span>

              <div className="grid grid-cols-2 gap-3">
                {preVettedPodMembers.map((member, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] space-y-2 text-center">
                    <div className="p-2 rounded-xl bg-white dark:bg-[#101b17] w-fit mx-auto shadow-xs">
                      {member.icon}
                    </div>
                    <div className="text-xs font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {member.role}
                    </div>
                    <span className="text-[10px] font-mono text-[#2e936f] font-bold block">{member.exp} &bull; {member.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          4. PERFORMANCE METRIC — 95% TEAM SKILL MASTERY ACCELERATION
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#fefaf5] dark:bg-[#172420] select-none">
        <div className="max-w-[1536px] mx-auto space-y-10">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              HUMAN CAPABILITY BENCHMARK
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              95% Team Skill Mastery Acceleration
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Accelerating technical throughput, eliminating hiring lag, and maintaining 98% talent retention.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: 95,
                suffix: "%",
                label: "Skill Mastery Acceleration",
                desc: "Rapid technical ramp-up",
                icon: <GraduationCap className="w-5 h-5 text-[#f15e1c]" />,
              },
              {
                value: 48,
                suffix: " hours",
                label: "Talent Deployment SLA",
                desc: "Pre-vetted engineering pods",
                icon: <Clock className="w-5 h-5 text-[#2e936f]" />,
              },
              {
                value: 1,
                prefix: "Day-",
                suffix: "",
                label: "Productive Speed",
                desc: "Immediate repo contribution",
                icon: <Zap className="w-5 h-5 text-[#fab60a]" />,
              },
              {
                value: 98,
                suffix: "%",
                label: "Talent Retention Rate",
                desc: "Long-term pod stability",
                icon: <HeartHandshake className="w-5 h-5 text-[#f15e1c]" />,
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
          5. 4-STAGE TEAM BUILDING FRAMEWORK & SPLIT SOURCING VISUAL
          ========================================================================= */}
      <section
        ref={timelineContainerRef}
        className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none"
      >
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              TEAM MATURITY TIMELINE
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              4-Stage Team Building Framework
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              An assess &rarr; train/source &rarr; integrate &rarr; support methodology for sustainable team scaling.
            </p>
          </div>

          {/* Timeline Progress Bar */}
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

          {/* Active Framework Stage Content & Stage 02 Split Sourcing Visual */}
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

                {/* SPECIAL STAGE 02 SPLIT VISUAL (TRAINING + TALENT SOURCING) */}
                {activeWorkIdx === 1 && (
                  <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630] grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] space-y-2">
                      <span className="text-xs font-mono font-bold text-[#f15e1c] block uppercase">TRAINING TRACK</span>
                      <div className="text-xs text-[#1b2823] dark:text-[#ffffff] space-y-1">
                        <div>&bull; Custom Tech Stack Curriculum</div>
                        <div>&bull; Hands-on Code Labs</div>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] space-y-2">
                      <span className="text-xs font-mono font-bold text-[#2e936f] block uppercase">TALENT SOURCING TRACK</span>
                      <div className="text-xs text-[#1b2823] dark:text-[#ffffff] space-y-1">
                        <div>&bull; Pre-vetted Engineer Matching</div>
                        <div>&bull; 48-Hour SLA Deployment</div>
                      </div>
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
          6. CONTINUOUS TEAM CAPABILITY LOOP (SIGNATURE VISUAL MOMENT)
          ========================================================================= */}
      <section
        ref={loopContainerRef}
        className="relative py-28 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none"
      >
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              CONTINUOUS TEAM SUPPORT LOOP
            </Badge>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Continuous Capability Loop
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Team development is an ongoing lifecycle of upskilling, integration, performance tracking, and support.
            </p>
          </div>

          {/* Circular Iteration Loop Display */}
          <div className="relative rounded-[3rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-8 sm:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-radial from-[#f15e1c]/10 via-transparent to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
              {continuousCapabilityLoopSteps.map((step, idx) => {
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
              <span>ASSESS &rarr; BUILD &rarr; MATCH &rarr; INTEGRATE &rarr; PERFORM &rarr; SUPPORT &rarr; ASSESS AGAIN</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. EDITORIAL HUMAN CAPABILITY STATEMENT & BACKGROUND PARALLAX
          ========================================================================= */}
      <section
        ref={missionRef}
        className="relative py-28 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#ffffff] dark:bg-[#101b17] overflow-hidden select-none"
      >
        {/* Subtle Background Parallax Typography */}
        <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between py-8 opacity-5 dark:opacity-10 font-display font-black text-7xl sm:text-9xl text-[#1b2823] dark:text-[#ffffff] tracking-tighter">
          <motion.div style={{ x: backgroundTextX1 }} className="whitespace-nowrap">
            SKILLS &bull; PEOPLE &bull; SUPPORT
          </motion.div>
          <motion.div style={{ x: backgroundTextX2 }} className="whitespace-nowrap text-right">
            PERFORMANCE &bull; GROWTH &bull; TEAM
          </motion.div>
        </div>

        <div className="max-w-[1536px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div ref={statementRef} className="lg:col-span-7 space-y-6 text-left">
            <Badge variant="secondary" size="md">
              HUMAN CAPABILITY PHILOSOPHY
            </Badge>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isStatementInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-[1.12] tracking-tight"
            >
              Building stronger teams through <span className="text-[#f15e1c]">the right skills, the right people, and the right support.</span>
            </motion.h2>

            <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
              Arav Innovations delivers pre-vetted engineering talent and tailored capability building to help your enterprise scale digital products with confidence.
            </p>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-6 flex flex-col justify-between items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-radial from-[#f15e1c]/15 via-[#2e936f]/10 to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center gap-2 pt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]">
                  TEAM CORE
                </span>
              </div>

              <svg className="w-48 h-48 relative z-10 my-auto" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="32" stroke="#f15e1c" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="35" cy="40" r="6" fill="#2e936f" />
                <circle cx="65" cy="40" r="6" fill="#fab60a" />
                <circle cx="50" cy="65" r="8" fill="#f15e1c" className="animate-pulse" />
                <line x1="35" y1="40" x2="65" y2="40" stroke="#2e936f" strokeWidth="1.5" />
                <line x1="35" y1="40" x2="50" y2="65" stroke="#f15e1c" strokeWidth="1.5" />
                <line x1="65" y1="40" x2="50" y2="65" stroke="#fab60a" strokeWidth="1.5" />
              </svg>

              <span className="relative z-10 text-[11px] font-mono font-bold text-[#2e936f] pb-1">
                HIGH-PERFORMING TEAM SYSTEM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. CLIENT TESTIMONIAL — ENTERPRISE PROOF
          ========================================================================= */}
      <section ref={testimonialRef} className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-[1536px] mx-auto text-center space-y-8">
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
                Staff Augmentation &amp; Upskilling Partner
              </div>
            </motion.div>
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
              Leading Arav Innovations with a vision for human capability engineering, Aryan Sayal guides team-building advisory squads across India and the UAE to deliver top tech talent and accelerate enterprise product delivery.
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
          {/* Connector Flow Header: SKILLS -> TALENT -> TEAM -> PERFORMANCE -> GROWTH */}
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-widest block">
              HUMAN CAPABILITY CULMINATION
            </span>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">
              <span>SKILLS</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>TALENT</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>TEAM</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>PERFORMANCE</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span className="text-[#2e936f]">GROWTH</span>
            </div>
          </div>

          <div className="rounded-[3rem] bg-gradient-to-br from-[#f15e1c] via-[#e55215] to-[#d8480d] text-white p-10 sm:p-16 border-2 border-[#fab60a] shadow-2xl space-y-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
                <Sparkles className="w-4 h-4 text-[#ffec69]" />
                <span>BUILD HIGH-PERFORMING TEAMS</span>
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
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Pre-Vetted Senior Engineers
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> 48-Hour SLA Deployment
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
      <footer className="py-6 border-t border-[#f7d7b0]/60 dark:border-[#253630] bg-[#fefaf5] dark:bg-[#172420] overflow-hidden select-none">
        <div className="flex items-center justify-center gap-6 text-xs sm:text-sm font-mono font-extrabold text-[#7A6A5F] dark:text-[#B8ACA0] tracking-widest">
          <span>SKILLS</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>PEOPLE</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>PERFORMANCE</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>GROWTH</span>
        </div>
      </footer>
    </div>
  );
}

export default TrainingStaffInteractivePage;
