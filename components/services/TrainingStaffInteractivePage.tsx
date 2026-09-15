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
  Users,
  GraduationCap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Code,
  ShieldCheck,
  Cpu,
  RefreshCw,
  Target,
  ArrowUpRight,
  ChevronDown,
  Search,
  Zap,
  TrendingUp,
  BarChart3,
  Users2,
  Compass,
} from "lucide-react";
import { Service } from "@/data/services";
import { BlogPost, blogPostsData } from "@/data/insights";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";

interface TrainingStaffPageProps {
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
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#fab60a] to-transparent shadow-[0_0_10px_#fab60a]"
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
          id="training-dot-matrix-pattern"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#fab60a" opacity="0.6" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#training-dot-matrix-pattern)" />
      </svg>
    </div>
  );
}

const keywordTags = [
  "Team Upskilling",
  "Staff Augmentation",
  "Dedicated Squads",
  "Role-Based Training",
  "Knowledge Transfer",
  "Engineering Capability",
];

const capabilityMapNodes = [
  {
    id: "goal",
    step: "01",
    label: "OBJECTIVES",
    title: "Define Business & Delivery Objectives",
    desc: "We begin by understanding project scope, delivery timelines, and target technical milestones.",
    deliverables: ["Objectives Alignment Matrix", "Timeline Scoping Blueprint", "Resource Requirement Spec"],
  },
  {
    id: "need",
    step: "02",
    label: "SKILL GAP",
    title: "Isolate Skill & Capacity Gaps",
    desc: "Assess whether the challenge requires upskilling internal teams, adding specialized roles, or expanding squad velocity.",
    deliverables: ["Capability Gap Assessment", "Role Profile Mapping", "Upskilling vs Augmentation Matrix"],
  },
  {
    id: "skill",
    step: "03",
    label: "ROLE PROFILES",
    title: "Specify Technical & Domain Roles",
    desc: "Identify technical disciplines, engineering seniority levels, frameworks, and domain experience needed.",
    deliverables: ["Seniority & Stack Criteria", "Role Expectation Mapping", "Candidate Evaluation Rubric"],
  },
  {
    id: "model",
    step: "04",
    label: "MODEL SELECTION",
    title: "Select Engagement Structure",
    desc: "Choose structured training curricula, specialist staff placement, or extended delivery squad integration.",
    deliverables: ["Engagement Charter", "SLA & SLA Delivery Terms", "Team Integration Plan"],
  },
  {
    id: "delivery",
    step: "05",
    label: "EXECUTION",
    title: "Execute Within Shared Workflows",
    desc: "Integrate specialists or trained team members directly into active sprints, engineering practices, and tools.",
    deliverables: ["Sprint Integration", "Continuous Code Review", "Performance Progress Reports"],
  },
  {
    id: "transfer",
    step: "06",
    label: "TRANSFER",
    title: "Anchor Capability & Knowledge",
    desc: "Ensure long-term value through documentation, pair programming, mentorship, and operational handover.",
    deliverables: ["Knowledge Base Documentation", "Mentorship Records", "Handover Verification Report"],
  },
];

const coreCapabilities = [
  {
    num: "01",
    title: "Technical Upskilling & Training",
    description:
      "Structured learning paths and hands-on workshops covering modern development, cloud architecture, and data practices.",
    icon: <GraduationCap className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    num: "02",
    title: "Specialist Staff Placement",
    description:
      "Experienced full-stack engineers, cloud architects, and QA specialists integrated directly into your team.",
    icon: <Users className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    num: "03",
    title: "Dedicated Engineering Squads",
    description:
      "Complete cross-functional delivery squads managed collaboratively to accelerate product roadmap execution.",
    icon: <Users2 className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    num: "04",
    title: "Knowledge Transfer & Mentorship",
    description:
      "Structured pair working, documentation, and operational handovers to ensure internal team retention of skills.",
    icon: <RefreshCw className="w-5 h-5 text-[#fab60a]" />,
  },
];

const staffAugmentationDisciplines = [
  {
    title: "Full-Stack Web Developers",
    desc: "React, Next.js, Node.js, TypeScript, and modern frontend/backend architecture specialists.",
    icon: <Code className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    title: "Cloud & DevOps Engineers",
    desc: "AWS, Azure, Docker, Kubernetes, Terraform, and automated CI/CD pipeline engineers.",
    icon: <Zap className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    title: "QA & Automation Testers",
    desc: "Automated end-to-end testing, API validation, performance load testing, and quality assurance.",
    icon: <ShieldCheck className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    title: "Data & AI Engineers",
    desc: "PostgreSQL, data pipeline engineering, analytics dashboards, and AI API integration experts.",
    icon: <Cpu className="w-5 h-5 text-[#f15e1c]" />,
  },
];

const applicableMarkets = [
  { title: "Technology & Software SaaS", desc: "Scale engineering throughput during feature build cycles.", icon: <Code className="w-4 h-4 text-[#f15e1c]" /> },
  { title: "Enterprise & Corporate IT", desc: "Modernize internal IT capabilities through role training.", icon: <Users className="w-4 h-4 text-[#2e936f]" /> },
  { title: "Financial & Professional Services", desc: "Augment security, data, and compliance engineering teams.", icon: <ShieldCheck className="w-4 h-4 text-[#fab60a]" /> },
  { title: "Digital Agencies & Integrators", desc: "Extend delivery capacity for complex client implementations.", icon: <TrendingUp className="w-4 h-4 text-[#2e936f]" /> },
];

const whatWeMeasureList = [
  { title: "Sprint Delivery Velocity", desc: "Increased feature throughput and reduced sprint backlog carryover.", icon: <Zap className="w-5 h-5 text-[#f15e1c]" /> },
  { title: "Time-to-Productivity", desc: "Accelerated onboarding time for augmented team members into active workflows.", icon: <Users className="w-5 h-5 text-[#2e936f]" /> },
  { title: "Skill Assessment Score", desc: "Quantitative measurement of team competency gains after training modules.", icon: <GraduationCap className="w-5 h-5 text-[#fab60a]" /> },
  { title: "Code Quality & Test Coverage", desc: "Maintenance of high engineering standards, review pass rates, and test coverage.", icon: <Code className="w-5 h-5 text-[#2e936f]" /> },
  { title: "Knowledge Retention Rate", desc: "Successful internal adoption of new tools and architectural patterns.", icon: <RefreshCw className="w-5 h-5 text-[#f15e1c]" /> },
  { title: "Team Capacity Retention", desc: "Long-term capability retention within your permanent engineering staff.", icon: <BarChart3 className="w-5 h-5 text-[#fab60a]" /> },
];

const faqList = [
  {
    q: "What is the difference between training and staff augmentation?",
    a: "Training builds capability within your existing internal workforce through workshops and guided learning. Staff augmentation embeds experienced external specialists directly into your team to increase delivery speed.",
  },
  {
    q: "How quickly can augmented staff join our active projects?",
    a: "Depending on role requirements and tech stack criteria, augmented specialists can typically be onboarded and integrated into your active workflows within 1 to 2 weeks.",
  },
  {
    q: "Do augmented engineers work directly under our project management?",
    a: "Yes. Augmented specialists participate in your daily standups, follow your sprint routines, submit code to your repositories, and report directly to your team leads.",
  },
  {
    q: "Can you customize training programs for our specific technology stack?",
    a: "Yes. All training curricula are tailored to your architecture, internal coding standards, active tools, and project objectives rather than generic courseware.",
  },
  {
    q: "How do you ensure knowledge transfer when an engagement ends?",
    a: "We structure every engagement with mandatory documentation, pair programming sessions, code walkthroughs, and formal handovers so your internal team retains full capability.",
  },
];

const internalServices = [
  { name: "IT Strategy & Implementation", href: "/services/it-strategy-implementation", icon: <Compass className="w-4 h-4 text-[#f15e1c]" /> },
  { name: "Digital Marketing & Brand", href: "/services/digital-marketing-brand-development", icon: <TrendingUp className="w-4 h-4 text-[#2e936f]" /> },
  { name: "Web & Application Development", href: "/services/web-app-development", icon: <Code className="w-4 h-4 text-[#2e936f]" /> },
  { name: "Risk, Compliance & Governance", href: "/services/risk-compliance-governance", icon: <ShieldCheck className="w-4 h-4 text-[#2e936f]" /> },
  { name: "Audit & Improvement", href: "/services/audit-improvement", icon: <BarChart3 className="w-4 h-4 text-[#f15e1c]" /> },
  { name: "SEO Services", href: "/services/seo-services", icon: <Search className="w-4 h-4 text-[#2e936f]" /> },
  { name: "AI Portfolio", href: "/services/ai-portfolio", icon: <Cpu className="w-4 h-4 text-[#f15e1c]" /> },
];

export function TrainingStaffInteractivePage({ service, relatedPosts }: TrainingStaffPageProps) {
  const [activeStageIdx, setActiveStageIdx] = React.useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(0);

  const displayPosts = React.useMemo(() => {
    if (relatedPosts && relatedPosts.length > 0) {
      return relatedPosts.slice(0, 3);
    }
    return blogPostsData.slice(0, 3);
  }, [relatedPosts]);

  const activeStage = capabilityMapNodes[activeStageIdx];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#000000] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden selection:bg-[#fab60a]/20 selection:text-[#fab60a] relative">
      
      <AnimatedDotGrid />

      {/* 1. HERO */}
      <section className="relative pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12 lg:pb-14 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-[#FFFDF9] dark:bg-[#000000] border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] overflow-hidden select-none flex flex-col justify-start">
        
        <div className="absolute inset-0 pointer-events-none hidden lg:block select-none overflow-hidden">
          <Image
            src="/images/training-staff-hero-bg.webp"
            alt="Training & Staff Augmentation Strategy"
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
                    { label: "Training & Staff Augmentation" },
                  ]}
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fef5d9] dark:bg-[#0a0a0a] border border-[#fab60a]/40 text-xs font-mono font-bold text-[#d89b00] dark:text-[#fab60a] shadow-2xs cursor-default transition-all duration-300"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#fab60a] animate-pulse" />
                  <span>TEAM UPSKILLING &amp; SPECIALIST STAFF AUGMENTATION</span>
                </motion.div>
              </AnimatedSection>

              <AnimatedSection delay={0.1} className="space-y-2">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight leading-[1.15] text-[#1b2823] dark:text-[#ffffff]">
                  Training &amp; Staff <span className="text-[#fab60a]">Augmentation</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.12} className="w-full lg:hidden my-2">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl border border-[#f7d7b0] dark:border-[#1a1a1a] bg-white dark:bg-[#0a0a0a] overflow-hidden shadow-lg">
                  <Image
                    src="/images/training-staff-mobile-hero.png"
                    alt="Training & Staff Augmentation Strategy"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.14} className="space-y-2">
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed max-w-2xl">
                  Expand your engineering capability and accelerate delivery. We provide structured technical training for internal teams alongside experienced developer talent to scale project execution.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.16} className="pt-1 flex flex-wrap items-center gap-3">
                <Link href="/contact">
                  <MagneticButton>
                    <Button3D
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1.5" />}
                      className="shadow-md shadow-[#fab60a]/20 bg-[#fab60a] text-black hover:bg-[#fab60a]/90 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Build Team Capability
                    </Button3D>
                  </MagneticButton>
                </Link>

                <Link href="#capabilities">
                  <MagneticButton>
                    <Button3D variant="outline" size="md" className="hover:-translate-y-0.5 transition-all duration-300">
                      Explore Delivery Models
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
                      className="px-3 py-1 rounded-lg bg-[#fefaf5]/90 dark:bg-[#0a0a0a]/90 border border-[#f7d7b0] dark:border-[#1a1a1a] text-xs font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#fab60a] hover:border-[#fab60a]/40 transition-all duration-200 cursor-default"
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
                  className="relative w-full aspect-[16/9] rounded-2xl border border-[#f7d7b0] dark:border-[#1a1a1a] overflow-hidden bg-white dark:bg-[#080808] shadow-md hover:shadow-xl hover:border-[#fab60a]/50 transition-all duration-300 group"
                >
                  <Image
                    src="/images/training-staff-main.webp"
                    alt="Arav Innovations Team Capability & Staff Augmentation"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </motion.div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-7 space-y-4 text-left">
              <AnimatedSection delay={0.12} className="space-y-2">
                <Badge variant="secondary" size="md">
                  CAPABILITY &amp; VELOCITY
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
                  Combining Internal Skill Growth With On-Demand Talent
                </h2>
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
                  Building technical capability requires both upskilling internal teams and adding specialist talent when project deadlines demand velocity. We provide flexible engagement options that strengthen your delivery model.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.16}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#fab60a]/40 space-y-1 transition-all duration-200 cursor-default group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#fab60a]">
                      <GraduationCap className="w-4 h-4" />
                      <span>TEAM TRAINING</span>
                    </div>
                    <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal">
                      Hands-on technical upskilling workshops.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]/40 space-y-1 transition-all duration-200 cursor-default group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#f15e1c]">
                      <Users className="w-4 h-4" />
                      <span>STAFF PLACEMENT</span>
                    </div>
                    <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal">
                      Embedded full-stack &amp; cloud engineers.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f]/40 space-y-1 transition-all duration-200 cursor-default group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#2e936f]">
                      <RefreshCw className="w-4 h-4" />
                      <span>KNOWLEDGE RETENTION</span>
                    </div>
                    <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal">
                      Structured mentorship &amp; handover.
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
                SERVICE OFFERINGS
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Core Training &amp; Augmentation Offerings
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
                Structured capability programs designed around technical upskilling, role placement, dedicated squads, and long-term knowledge retention.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {coreCapabilities.map((cap, idx) => (
              <AnimatedSection key={cap.num} delay={idx * 0.06} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-6 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:shadow-lg hover:border-[#fab60a] transition-all duration-300 flex flex-col justify-between text-left group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-[#fab60a] px-2.5 py-0.5 rounded-md bg-[#fef5d9] dark:bg-[#161616] border border-[#fab60a]/30">
                        {cap.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#fefaf5] dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        {cap.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#fab60a] transition-colors leading-snug">
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                      {cap.description}
                    </p>
                  </div>

                  <div className="h-1 w-0 group-hover:w-full bg-[#fab60a] transition-all duration-300 rounded-full mt-4" />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* 4. CAPABILITY PIPELINE */}
      <section id="process" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                CAPABILITY TIMELINE
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
                6-Stage Capability Delivery Framework
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                A clear progression from initial objective definition to skill gap isolation, engagement selection, sprint execution, and permanent knowledge transfer.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="rounded-2xl sm:rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-lg p-4 sm:p-6 lg:p-8 space-y-6">
              
              <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-6 gap-2 relative">
                {capabilityMapNodes.map((stg, idx) => {
                  const isSelected = activeStageIdx === idx;
                  return (
                    <button
                      key={stg.id}
                      type="button"
                      onClick={() => setActiveStageIdx(idx)}
                      className={cn(
                        "py-2.5 px-3 rounded-xl text-xs font-extrabold font-display transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 select-none relative z-10 border",
                        isSelected
                          ? "bg-[#fab60a] text-black border-[#fab60a] shadow-sm"
                          : "bg-white dark:bg-[#000000] text-[#4a5c55] dark:text-[#d3eee4] border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#fab60a] hover:bg-[#fab60a]/5"
                      )}
                    >
                      <span className={cn("font-mono text-[10px]", isSelected ? "text-black/80" : "text-[#fab60a]")}>
                        {stg.step}.
                      </span>
                      <span className="truncate">{stg.label}</span>
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
                    <span className="text-xs font-mono font-bold text-[#fab60a] uppercase tracking-wider block">
                      STAGE {activeStage.step} &bull; {activeStage.label}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {activeStage.title}
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

      {/* 5. STAFF AUGMENTATION DISCIPLINES */}
      <section id="disciplines" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                TALENT DISCIPLINES
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Specialist Engineering Roles
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Vetted engineering talent available for team augmentation across web, cloud, QA, and data disciplines.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {staffAugmentationDisciplines.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.04} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-5 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#fab60a] hover:shadow-md transition-all duration-300 space-y-2.5 text-left group"
                >
                  <div className="p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] w-fit group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#fab60a] transition-colors">
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

      {/* 6. APPLICABLE MARKETS */}
      <section id="markets" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-8">
          
          <AnimatedSection>
            <div className="max-w-3xl space-y-3 text-left">
              <Badge variant="secondary" size="md">
                APPLICABLE MARKETS
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Tailored Organizational Support
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                Capabilities structured around your company’s engineering scale and growth stage:
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
                  className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#fab60a] hover:bg-white dark:hover:bg-[#000000] shadow-xs transition-all duration-200 text-left flex flex-col justify-between space-y-2 group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#222222] shrink-0 group-hover:scale-105 transition-transform">
                      {mkt.icon}
                    </div>
                    <h3 className="text-sm font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#fab60a] transition-colors">
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
                CAPABILITY METRICS
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Delivery &amp; Capability Indicators
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                We measure success by sprint velocity gains, code quality retention, and skill assessment outcomes.
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
                  Training &amp; Team Capability Insights
                </h2>
              </div>
              <Link
                href="/insights"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#fab60a] hover:underline shrink-0 group"
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
                  className="h-full p-5 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#fab60a] hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="w-full mb-2 rounded-xl overflow-hidden border border-[#f7d7b0]/60">
                      <BlogCardImage post={post} aspectRatio="aspect-video" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#2e936f]">
                      <span className="uppercase tracking-wider">{post.category}</span>
                      <span>{post.publishedAt || post.dateFormatted}</span>
                    </div>
                    <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#fab60a] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed line-clamp-3 font-medium">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#f7d7b0] dark:border-[#1a1a1a]">
                    <Link
                      href={`/insights/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#fab60a] group-hover:underline"
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
      <CEOLeadershipSection serviceContext="His perspective shapes technical team building and long-term capability growth." />

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
                  <div className="rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#fab60a]/60 overflow-hidden transition-all shadow-xs">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group select-none"
                    >
                      <span className="text-sm sm:text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#fab60a] transition-colors">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-[#fab60a] transition-transform duration-300 shrink-0",
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
              <span className="text-xs font-mono font-bold text-[#fab60a] uppercase tracking-wider block">
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
                  className="p-3.5 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#fab60a] hover:shadow-sm transition-all flex items-center justify-between group cursor-pointer min-h-[56px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] group-hover:scale-105 transition-all shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#fab60a] transition-colors leading-snug">
                      {item.name}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#fab60a] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
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
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#fab60a] via-[#e5a507] to-[#c98e00] text-black p-8 sm:p-14 border-2 border-[#f15e1c] shadow-2xl space-y-6 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 border border-black/20 text-xs font-mono font-bold text-black">
                <Sparkles className="w-3.5 h-3.5 text-[#f15e1c]" />
                <span>EXPAND YOUR TEAM'S CAPABILITY</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-black leading-tight">
                Scale Engineering Velocity &amp; Team Capability
              </h2>

              <p className="text-xs sm:text-sm font-medium text-black/80 leading-relaxed max-w-2xl mx-auto">
                Discuss your team upskilling requirements, developer role needs, or delivery squad capacity with our team leads.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/contact">
                <MagneticButton>
                  <Button3D
                    variant="primary"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1.5" />}
                    className="w-full sm:w-auto justify-center bg-black text-white hover:bg-black/90 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Build Team Capability
                  </Button3D>
                </MagneticButton>
              </Link>

              <Link href="/services">
                <MagneticButton>
                  <Button3D variant="outline" size="md" className="w-full sm:w-auto justify-center text-black border-black/40 hover:bg-black/10 hover:-translate-y-0.5 transition-all duration-300">
                    Explore Services
                  </Button3D>
                </MagneticButton>
              </Link>
            </div>

            <div className="relative z-10 pt-4 border-t border-black/15 flex flex-wrap items-center justify-center gap-4 text-xs text-black/80 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#f15e1c]" /> Tailored Technical Training Curricula
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#f15e1c]" /> Vetted Engineering Role Placement
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#f15e1c]" /> Teams in Gurgaon &amp; Dubai
              </span>
            </div>
          </div>
        </AnimatedSection>
      </section>

    </div>
  );
}

export default TrainingStaffInteractivePage;
