"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
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
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  Quote,
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
  ChevronDown,
  Building2,
  TrendingUp,
  Target,
  BookOpen,
  Clock,
  Calendar,
} from "lucide-react";
import { BlogCardImage } from "@/components/insights/BlogCardImage";
import { Service } from "@/data/services";
import { BlogPost } from "@/data/insights";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";

interface ITStrategyPageProps {
  service: Service;
  relatedPosts?: BlogPost[];
}

// -----------------------------------------------------------------------------
// 1. Scroll-Triggered Section Wrapper Component (Optimized Mobile Viewport Entry)
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
// 2. System Scan Transition Line
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
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#f15e1c] to-transparent shadow-[0_0_10px_#f15e1c]"
        />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 3. Dot Grid Pattern Background
// -----------------------------------------------------------------------------
function AnimatedDotGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10 dark:opacity-15 select-none">
      <svg className="w-full h-full" width="100%" height="100%">
        <pattern
          id="it-dot-matrix-pattern"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#f15e1c" opacity="0.6" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#it-dot-matrix-pattern)" />
      </svg>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Data Collections for IT Strategy Page
// -----------------------------------------------------------------------------

// Hero Architecture Flow
const heroArchitectureFlow = [
  {
    stage: "01",
    label: "BUSINESS GOALS",
    desc: "Commercial priorities, budget guardrails & growth targets.",
  },
  {
    stage: "02",
    label: "IT STRATEGY",
    desc: "12–36 month technology roadmap & investment priorities.",
  },
  {
    stage: "03",
    label: "DIGITAL ARCHITECTURE",
    desc: "Scalable cloud, data pipelines & zero-trust security.",
  },
  {
    stage: "04",
    label: "IMPLEMENTATION",
    desc: "Controlled migration & zero-downtime engineering.",
  },
  {
    stage: "05",
    label: "OPTIMIZATION",
    desc: "Continuous FinOps, performance tuning & governance.",
  },
];

// Core Solutions (6 Capabilities)
const coreSolutions = [
  {
    id: "01",
    title: "IT Strategy & Roadmapping",
    desc: "Build practical technology roadmaps aligned with business priorities, budgets and growth plans.",
    icon: <Compass className="w-6 h-6 text-[#f15e1c]" />,
    href: "#inquire",
  },
  {
    id: "02",
    title: "Legacy Modernization",
    desc: "Identify technical debt, architectural bottlenecks and outdated systems, then define a realistic modernization path.",
    icon: <Cpu className="w-6 h-6 text-[#fab60a]" />,
    href: "#inquire",
  },
  {
    id: "03",
    title: "Cloud Strategy & Migration",
    desc: "Plan secure, scalable cloud environments with architecture, cost and operational requirements considered from the beginning.",
    icon: <Cloud className="w-6 h-6 text-[#2e936f]" />,
    href: "#inquire",
  },
  {
    id: "04",
    title: "Digital Architecture",
    desc: "Design connected application, data, infrastructure and security architectures that can scale with the business.",
    icon: <LayoutGrid className="w-6 h-6 text-[#f15e1c]" />,
    href: "#inquire",
  },
  {
    id: "05",
    title: "IT Governance & Security",
    desc: "Strengthen technology governance, access controls, risk management and compliance readiness.",
    icon: <Shield className="w-6 h-6 text-[#2e936f]" />,
    href: "#inquire",
  },
  {
    id: "06",
    title: "Technology Optimization",
    desc: "Improve infrastructure efficiency, system performance, deployment processes and ongoing technology operations.",
    icon: <Activity className="w-6 h-6 text-[#fab60a]" />,
    href: "#inquire",
  },
];

// Interactive Transformation Visual Sequence (5 Stages)
const transformationJourneyStages = [
  {
    num: "01",
    title: "DISCOVER",
    subtitle: "Understand the Current Environment",
    desc: "Evaluate current technology infrastructure, codebases, workflows, cloud spend, and operational constraints to identify technical debt and risks.",
  },
  {
    num: "02",
    title: "DEFINE",
    subtitle: "Identify Priorities & Requirements",
    desc: "Separate urgent friction points from strategic growth initiatives, aligning technical requirements directly with executive business priorities.",
  },
  {
    num: "03",
    title: "ARCHITECT",
    subtitle: "Design Target Ecosystem",
    desc: "Design connected cloud, data, application, and security architectures with cost models, compliance guardrails, and migration blueprints.",
  },
  {
    num: "04",
    title: "IMPLEMENT",
    subtitle: "Execute Controlled Delivery",
    desc: "Modernize legacy systems and deploy cloud infrastructure through structured engineering squads, zero-downtime cutovers, and CI/CD pipelines.",
  },
  {
    num: "05",
    title: "OPTIMIZE",
    subtitle: "Continuous Performance & Governance",
    desc: "Continuously monitor telemetry, tune system performance, manage cloud costs (FinOps), and maintain long-term architectural health.",
  },
];

// Connected Enterprise Architecture Layers
const architectureLayers = [
  { layer: "01", title: "STRATEGY LAYER", subtitle: "Business Alignment & Roadmapping" },
  { layer: "02", title: "ARCHITECTURE LAYER", subtitle: "Target System Blueprints" },
  { layer: "03", title: "CLOUD LAYER", subtitle: "AWS / Azure / Multi-Cloud" },
  { layer: "04", title: "SECURITY LAYER", subtitle: "Zero-Trust & Compliance Governance" },
  { layer: "05", title: "APPLICATION LAYER", subtitle: "Microservices & Modern Web" },
  { layer: "06", title: "DATA LAYER", subtitle: "Connected Data & Pipelines" },
  { layer: "07", title: "OPTIMIZATION LAYER", subtitle: "24/7 Telemetry & FinOps" },
];

// Business Outcomes
const businessOutcomes = [
  {
    headline: "CLEARER DECISIONS",
    desc: "Know exactly what to modernize, what to retain, and where to invest technology capital for maximum ROI.",
    icon: <Target className="w-6 h-6 text-[#f15e1c]" />,
  },
  {
    headline: "LOWER TECHNOLOGY FRICTION",
    desc: "Reduce technical debt, eliminate operational bottlenecks, and streamline fragmented legacy systems.",
    icon: <Zap className="w-6 h-6 text-[#fab60a]" />,
  },
  {
    headline: "MORE PREDICTABLE COSTS",
    desc: "Align infrastructure, cloud, and software licensing expenses directly with business growth priorities.",
    icon: <TrendingUp className="w-6 h-6 text-[#2e936f]" />,
  },
  {
    headline: "READY FOR SCALE",
    desc: "Build a resilient architecture engineered to evolve seamlessly as users, products, and markets expand.",
    icon: <Building2 className="w-6 h-6 text-[#f15e1c]" />,
  },
];

// Our Approach (5 Stacked Phase Cards)
const approachSteps = [
  {
    num: "01",
    name: "Assess",
    whatWeDo: "Architecture review, technology health assessment, technical debt analysis, and risk discovery.",
    clientOutcome: "A clear picture of the current environment and the highest-priority opportunities.",
  },
  {
    num: "02",
    name: "Prioritize",
    whatWeDo: "Separate urgent problems from strategic improvements and establish clear business priorities.",
    clientOutcome: "A prioritized transformation sequence aligned with business goals and available resources.",
  },
  {
    num: "03",
    name: "Architect",
    whatWeDo: "Create the target-state architecture, roadmap, technology choices, and implementation plan.",
    clientOutcome: "A detailed blueprint and actionable roadmap for execution.",
  },
  {
    num: "04",
    name: "Implement",
    whatWeDo: "Execute modernization through structured engineering, migration, integration, and governance.",
    clientOutcome: "Controlled delivery of modernized systems with minimal operational disruption.",
  },
  {
    num: "05",
    name: "Optimize",
    whatWeDo: "Continuously improve reliability, performance, security, cost efficiency, and scalability.",
    clientOutcome: "Sustained long-term value, lower maintenance overhead, and operational confidence.",
  },
];

// Technology Architecture (5 Categories)
const techArchitectureCategories = [
  {
    category: "CLOUD",
    desc: "Cloud architecture, migration planning and infrastructure modernization.",
    meta: ["AWS", "Microsoft Azure", "Google Cloud", "Kubernetes", "Multi-Cloud"],
    icon: <Cloud className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    category: "APPLICATIONS",
    desc: "Modern web applications, APIs, microservices and system integration.",
    meta: ["Next.js", "TypeScript", "Microservices", "REST & GraphQL APIs", "Node.js"],
    icon: <LayoutGrid className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    category: "DATA",
    desc: "Data architecture, databases, analytics and connected information flows.",
    meta: ["PostgreSQL", "Apache Kafka", "Redis", "Event-Driven Architecture", "Data Lakes"],
    icon: <Database className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    category: "SECURITY",
    desc: "Identity, access control, security architecture and governance.",
    meta: ["Zero-Trust Security", "RBAC & SSO", "DPDP Act", "SOC-2 Readiness", "Data Encryption"],
    icon: <Shield className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    category: "DEVOPS",
    desc: "CI/CD, infrastructure automation, monitoring and operational reliability.",
    meta: ["Terraform (IaC)", "Docker Containers", "CI/CD Pipelines", "Telemetry Monitoring"],
    icon: <Server className="w-5 h-5 text-[#f15e1c]" />,
  },
];

// Target Audience
const targetScenarios = [
  {
    title: "LEGACY SYSTEMS",
    desc: "Your existing systems are becoming expensive, difficult to maintain, or difficult to scale.",
    badge: "MODERNIZATION NEEDED",
  },
  {
    title: "CLOUD TRANSFORMATION",
    desc: "You want to move to cloud but need a clear architecture, migration strategy, and cost model.",
    badge: "CLOUD ADOPTION",
  },
  {
    title: "GROWTH & SCALE",
    desc: "Your technology needs to support new products, users, markets, or expanding business operations.",
    badge: "SCALE READINESS",
  },
  {
    title: "GOVERNANCE & RISK",
    desc: "You need stronger controls, security, compliance readiness, and technology governance.",
    badge: "RISK MITIGATION",
  },
];

// Differentiators
const whyChooseArav = [
  {
    title: "BUSINESS-ALIGNED TECHNOLOGY",
    desc: "We connect technology decisions to commercial priorities instead of treating IT as an isolated function.",
  },
  {
    title: "STRATEGY + EXECUTION",
    desc: "We can move from roadmap to architecture to implementation without losing context between teams.",
  },
  {
    title: "PRACTICAL MODERNIZATION",
    desc: "We focus on achievable transformation instead of recommending unnecessary technology replacements.",
  },
  {
    title: "LONG-TERM PARTNERSHIP",
    desc: "Our engagement can continue beyond implementation through optimization, support, and ongoing technology improvement.",
  },
];

// FAQ Data
const faqList = [
  {
    q: "What does IT strategy and implementation include?",
    a: "Our end-to-end service includes current-state architecture audits, phased multi-year technology roadmaps, cloud strategy & migration planning, digital architecture design, IT governance & security controls, and ongoing system optimization.",
  },
  {
    q: "When should a business consider modernizing its IT infrastructure?",
    a: "Modernization is critical when legacy technical debt slows feature delivery, cloud hosting costs become unpredictable, security risks multiply, or existing infrastructure limits business growth and market expansion.",
  },
  {
    q: "Can you help us create a technology roadmap before implementation?",
    a: "Yes. We frequently begin with a dedicated assessment and roadmapping phase to audit current state systems, align priorities with executive leadership, and establish a clear execution plan before writing code or migrating infrastructure.",
  },
  {
    q: "Do you support cloud migration and modernization?",
    a: "Yes. We plan and execute secure, scalable cloud adoption across AWS, Azure, and GCP, incorporating containerized microservices, Infrastructure-as-Code (Terraform), zero-downtime cutover plans, and FinOps cost governance.",
  },
  {
    q: "Can Arav Innovations continue supporting the technology after implementation?",
    a: "Yes. Our engagements can extend into post-implementation optimization, providing continuous telemetry monitoring, cloud cost governance, performance tuning, and ongoing technology advisory.",
  },
];

// Internal Service Links
const internalServices = [
  { name: "Web & Application Development", href: "/services/web-app-development" },
  { name: "Risk, Compliance & Governance", href: "/services/risk-compliance-governance" },
  { name: "AI Portfolio & Automation", href: "/services/ai-portfolio" },
  { name: "Audit & Improvement", href: "/services/audit-improvement" },
  { name: "Training & Staff Augmentation", href: "/services/training-staff-augmentation" },
];

export function ITStrategyInteractivePage({ service, relatedPosts = [] }: ITStrategyPageProps) {
  const [activeHeroNode, setActiveHeroNode] = React.useState<number>(0);
  const [activeJourneyIdx, setActiveJourneyIdx] = React.useState<number>(0);
  const [activeFaqIdx, setActiveFaqIdx] = React.useState<number | null>(0);
  const [activeTechCat, setActiveTechCat] = React.useState<number>(0);

  // Unpinned Natural Scroll Progress for Transformation Journey
  const journeyContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: journeyScrollProgress } = useScroll({
    target: journeyContainerRef,
    offset: ["start 80%", "end 20%"],
  });
  const smoothJourneyProgress = useSpring(journeyScrollProgress, { stiffness: 80, damping: 35 });
  const journeyLineWidth = useTransform(smoothJourneyProgress, [0, 1], ["0%", "100%"]);

  React.useEffect(() => {
    const unsub = smoothJourneyProgress.on("change", (v) => {
      const count = transformationJourneyStages.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedIdx = Math.floor(normalized * count);
      setActiveJourneyIdx(calculatedIdx);
    });
    return () => unsub();
  }, [smoothJourneyProgress]);

  // Connected Architecture Layer Scroll Highlights
  const layersContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: layersScrollProgress } = useScroll({
    target: layersContainerRef,
    offset: ["start 75%", "end 25%"],
  });
  const smoothLayersProgress = useSpring(layersScrollProgress, { stiffness: 70, damping: 30 });
  const activeLayerIndex = useTransform(smoothLayersProgress, [0, 1], [0, architectureLayers.length - 1]);
  const [currentActiveLayer, setCurrentActiveLayer] = React.useState<number>(0);

  React.useEffect(() => {
    const unsub = activeLayerIndex.on("change", (v) => {
      setCurrentActiveLayer(Math.round(v));
    });
    return () => unsub();
  }, [activeLayerIndex]);

  return (
    <main className="min-h-screen bg-[#FFFFFF] dark:bg-[#000000] text-[#1b2823] dark:text-[#ffffff] transition-colors duration-300 overflow-x-hidden selection:bg-[#f15e1c]/20 selection:text-[#f15e1c]">
      
      {/* =========================================================================
          SECTION 01 — HERO SECTION
          ========================================================================= */}
      <section className="relative pt-3 sm:pt-5 lg:pt-6 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-[#E3E5E7] dark:bg-[#000000] border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] overflow-hidden select-none">
        <AnimatedDotGrid />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-radial from-[#f15e1c]/10 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-radial from-[#2e936f]/10 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-[1536px] mx-auto w-full space-y-6 sm:space-y-8 relative z-10">
          
          {/* 2-Column Hero Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: HERO COPY */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-5 text-left">
              
              {/* Breadcrumb & Eyebrow Badge */}
              <AnimatedSection delay={0.05} className="space-y-2">
                <Breadcrumb
                  items={[
                    { label: "Services", href: "/services" },
                    { label: "IT Strategy & Implementation" },
                  ]}
                />
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce3d3] dark:bg-[#0a0a0a] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ENTERPRISE IT STRATEGY &amp; MODERNIZATION</span>
                </div>
              </AnimatedSection>

              {/* Headline */}
              <AnimatedSection delay={0.1} className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-display tracking-tight leading-[1.12] text-[#1b2823] dark:text-[#ffffff]">
                  Turn Technology Complexity Into a <span className="text-[#f15e1c]">Clear Path Forward</span>
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed max-w-2xl">
                  We help businesses modernize legacy systems, build practical technology roadmaps, adopt cloud with confidence, and turn complex IT decisions into measurable business outcomes.
                </p>
              </AnimatedSection>

              {/* CTAs */}
              <AnimatedSection delay={0.15} className="pt-1 flex flex-wrap items-center gap-3">
                <a href="#inquire">
                  <MagneticButton>
                    <Button3D
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />}
                      className="shadow-md shadow-[#f15e1c]/20"
                    >
                      Build My Technology Roadmap
                    </Button3D>
                  </MagneticButton>
                </a>

                <a href="#our-approach">
                  <MagneticButton>
                    <Button3D variant="outline" size="md">
                      Explore Our Approach
                    </Button3D>
                  </MagneticButton>
                </a>
              </AnimatedSection>

              {/* Supporting Statement */}
              <AnimatedSection delay={0.2} className="text-xs font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0] flex items-center gap-2 flex-wrap pt-1">
                <span>Strategy</span>
                <span className="text-[#f15e1c]">•</span>
                <span>Architecture</span>
                <span className="text-[#f15e1c]">•</span>
                <span>Modernization</span>
                <span className="text-[#f15e1c]">•</span>
                <span>Cloud</span>
                <span className="text-[#f15e1c]">•</span>
                <span>Governance</span>
              </AnimatedSection>
            </div>

            {/* RIGHT COLUMN: ENTERPRISE IT STRATEGY HERO VIDEO WITH SEAMLESS EDGE BLENDING */}
            <div className="lg:col-span-6 xl:col-span-6 w-full flex items-center justify-center">
              <AnimatedSection delay={0.15} className="w-full flex justify-center">
                <div
                  className="relative w-full max-w-[840px] aspect-[16/9] bg-[#E3E5E7] dark:bg-[#0a0a0a] dark:border dark:border-[#1a1a1a] overflow-hidden transition-transform duration-300 hover:scale-[1.01] group flex items-center justify-center p-0"
                  style={{
                    maskImage: "radial-gradient(ellipse at center, black 82%, transparent 99%)",
                    WebkitMaskImage: "radial-gradient(ellipse at center, black 82%, transparent 99%)",
                  }}
                >
                  <video
                    src="/videos/it-strategy.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-contain pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* SECTION 02 — HERO VISUAL / SYSTEM ARCHITECTURE FLOW BAR */}
          <AnimatedSection delay={0.25} className="pt-2">
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-md space-y-3 relative overflow-hidden w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-2.5">
                <div>
                  <span className="text-[10px] font-mono font-black text-[#f15e1c] uppercase tracking-wider block">
                    TRANSFORMATION BLUEPRINT
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                    End-to-End Enterprise Architecture Flow
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#2e936f] bg-white dark:bg-[#000000] px-3 py-1 rounded-full border border-[#f7d7b0] dark:border-[#1a1a1a]">
                  STRATEGY &rarr; EXECUTION
                </span>
              </div>

              {/* 5 Sequence Blocks with Refined Desktop & Mobile Hover */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {heroArchitectureFlow.map((flow, idx) => {
                  const isActive = activeHeroNode === idx;
                  return (
                    <button
                      key={flow.stage}
                      type="button"
                      onClick={() => setActiveHeroNode(idx)}
                      onMouseEnter={() => setActiveHeroNode(idx)}
                      className={cn(
                        "p-3.5 rounded-xl border-2 transition-all duration-200 text-left cursor-pointer space-y-1 relative group hover:-translate-y-0.5",
                        isActive
                          ? "bg-white dark:bg-[#000000] border-[#f15e1c] shadow-xs ring-1 ring-[#f15e1c]/20"
                          : "bg-white/70 dark:bg-[#000000]/70 border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]/60"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-black text-[#f15e1c]">
                          {flow.stage}
                        </span>
                        {idx < heroArchitectureFlow.length - 1 && (
                          <ChevronRight className="w-3.5 h-3.5 text-[#7A6A5F] hidden lg:block group-hover:translate-x-0.5 transition-transform" />
                        )}
                      </div>
                      <div className="text-xs font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                        {flow.label}
                      </div>
                      <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] leading-snug line-clamp-2">
                        {flow.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 03 — VALUE PROPOSITION / CONTENT SECTION
          ========================================================================= */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1440px] mx-auto select-none">
          <AnimatedSection className="max-w-4xl lg:max-w-5xl mx-auto p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] space-y-4 text-left shadow-xs">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce3d3] dark:bg-[#000000] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]">
              <Target className="w-3.5 h-3.5" />
              <span>VALUE PROPOSITION</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-tight">
              Technology Strategy That Connects Business Goals to Engineering Execution
            </h2>

            <div className="space-y-3 text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed max-w-4xl">
              <p>
                Technology decisions should not exist in isolation. We work with leadership and engineering teams to translate business priorities into practical technology strategies — from modernizing legacy infrastructure and planning cloud adoption to improving security, governance, performance and operational efficiency.
              </p>
              <p>
                Our role is not simply to recommend technology. We help define what should change, why it should change, how it should be implemented, and how success should be measured.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 04 — DEDICATED IMAGE + TEXT CONTENT BLOCK (IT Strategy Main)
          ========================================================================= */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] select-none">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT (Desktop) / TOP (Mobile): Configurable Image Container */}
            <AnimatedSection className="lg:col-span-6 w-full order-1">
              <div className="relative w-full rounded-2xl sm:rounded-3xl border border-[#f7d7b0] dark:border-[#1a1a1a] bg-[#fefaf5] dark:bg-[#0a0a0a] shadow-md overflow-hidden p-3 sm:p-5 group">
                <Image
                  src="/images/it-strategy-main.png"
                  alt="Arav Innovation Enterprise Technology Strategy Architecture"
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto max-w-full object-contain rounded-xl sm:rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                />
              </div>
            </AnimatedSection>

            {/* RIGHT (Desktop) / BELOW (Mobile): Content Block */}
            <AnimatedSection delay={0.1} className="lg:col-span-6 space-y-4 text-left order-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce3d3] dark:bg-[#000000] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]">
                <Cpu className="w-3.5 h-3.5" />
                <span>ARCHITECTURAL FOUNDATION</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-tight">
                Architecting Resilient IT Infrastructure for Long-Term Growth
              </h2>

              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed max-w-2xl">
                Modern enterprise technology requires continuous alignment between strategic business goals and core engineering execution. We help organizations design, build, and optimize scalable digital foundations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a]">
                  <span className="text-xs font-mono font-extrabold text-[#f15e1c] block uppercase">MODERNIZED STACK</span>
                  <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] mt-1">Eliminate technical debt &amp; legacy bottlenecks.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a]">
                  <span className="text-xs font-mono font-extrabold text-[#2e936f] block uppercase">GOVERNED CLOUD</span>
                  <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] mt-1">Zero-trust security &amp; FinOps cost controls.</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 05 — CORE CAPABILITIES (WHAT WE HELP YOU SOLVE)
          ========================================================================= */}
      <section id="capabilities" className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] select-none">
        <div className="max-w-[1440px] mx-auto space-y-8">
          
          <AnimatedSection className="text-center max-w-4xl mx-auto space-y-2">
            <Badge variant="secondary" size="sm">
              CORE CAPABILITIES
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              What We Help You Solve
            </h2>
            <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4]">
              Six practical capabilities designed to move your organization from technical complexity to operational clarity.
            </p>
          </AnimatedSection>

          {/* 6 Capability Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1440px] mx-auto">
            {coreSolutions.map((card, idx) => (
              <AnimatedSection key={card.id} delay={0.04 * idx}>
                <TiltCard maxTilt={2} scale={1.01}>
                  <a
                    href={card.href}
                    className="block h-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 space-y-4 text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-[#fefaf5] dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        {React.cloneElement(card.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7 text-[#f15e1c] stroke-[2]" })}
                      </div>
                      <span className="text-xs font-mono font-black text-[#f15e1c] px-3 py-1 rounded-full bg-[#fce3d3] dark:bg-[#161616] border border-[#f15e1c]/30">
                        {card.id}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors leading-snug break-words">
                      {card.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                      {card.desc}
                    </p>

                    <div className="pt-3 border-t border-[#f7d7b0]/60 dark:border-[#1a1a1a] text-xs font-mono font-extrabold uppercase tracking-wider text-[#f15e1c] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Explore Capability</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </a>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 06 — INTERACTIVE TRANSFORMATION JOURNEY (UNPINNED NATURAL SCROLL)
          ========================================================================= */}
      <section
        id="transformation-journey"
        ref={journeyContainerRef}
        className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#fefaf5] dark:bg-[#0a0a0a] select-none"
      >
        <div className="max-w-[1440px] mx-auto space-y-8">
          
          <AnimatedSection className="text-center max-w-4xl mx-auto space-y-2">
            <Badge variant="secondary" size="sm">
              TRANSFORMATION JOURNEY
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              From Discovery to Sustained Optimization
            </h2>
            <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4]">
              Five structured stages of an enterprise technology transformation.
            </p>
          </AnimatedSection>

          {/* Progress Indicator Bar */}
          <AnimatedSection delay={0.08} className="max-w-4xl mx-auto relative py-2">
            <div className="w-full bg-[#f7d7b0] dark:bg-[#1a1a1a] h-2 rounded-full overflow-hidden">
              <motion.div
                style={{ width: journeyLineWidth }}
                className="h-full bg-gradient-to-r from-[#f15e1c] via-[#2e936f] to-[#fab60a]"
              />
            </div>

            {/* 5 Stage Nodes */}
            <div className="flex justify-between items-center absolute inset-x-0 -top-2">
              {transformationJourneyStages.map((st, idx) => {
                const isActive = activeJourneyIdx === idx;
                const isPassed = idx <= activeJourneyIdx;

                return (
                  <button
                    key={st.num}
                    type="button"
                    onClick={() => setActiveJourneyIdx(idx)}
                    onMouseEnter={() => setActiveJourneyIdx(idx)}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center text-xs font-mono font-black cursor-pointer shrink-0 hover:scale-105",
                      isActive
                        ? "bg-[#f15e1c] border-white text-white scale-110 shadow-md ring-2 ring-[#f15e1c]/30 z-10"
                        : isPassed
                        ? "bg-[#2e936f] border-white text-white"
                        : "bg-white dark:bg-[#000000] border-[#f7d7b0] dark:border-[#1a1a1a] text-[#7A6A5F]"
                    )}
                  >
                    {isPassed && !isActive ? <Check className="w-3.5 h-3.5 text-white" /> : st.num}
                  </button>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Active Stage Detail Card */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeJourneyIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#000000] border-2 border-[#f15e1c] shadow-md space-y-4 text-left"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-3">
                  <div>
                    <span className="text-xs font-mono font-black text-[#f15e1c] uppercase tracking-wider block">
                      STAGE {transformationJourneyStages[activeJourneyIdx].num} / 05 &bull; {transformationJourneyStages[activeJourneyIdx].title}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mt-0.5">
                      {transformationJourneyStages[activeJourneyIdx].subtitle}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  {transformationJourneyStages[activeJourneyIdx].desc}
                </p>

                {/* Stage Nav Tabs (Responsive Flex Wrap for Mobile) */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {transformationJourneyStages.map((st, idx) => (
                    <button
                      key={st.num}
                      type="button"
                      onClick={() => setActiveJourneyIdx(idx)}
                      onMouseEnter={() => setActiveJourneyIdx(idx)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer",
                        activeJourneyIdx === idx
                          ? "bg-[#f15e1c] text-white shadow-xs"
                          : "bg-[#fefaf5] dark:bg-[#0a0a0a] text-[#7A6A5F] border border-[#f7d7b0] hover:border-[#f15e1c]/60"
                      )}
                    >
                      {st.num} {st.title}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CONNECTED ARCHITECTURE LAYERS */}
          <div ref={layersContainerRef} className="max-w-4xl mx-auto space-y-3 pt-4">
            <span className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-wider block text-center">
              CONNECTED ARCHITECTURE LAYERS (PROGRESSIVE ASSEMBLY)
            </span>

            <div className="space-y-2">
              {architectureLayers.map((layer, idx) => {
                const isActive = currentActiveLayer === idx;
                const isAssembled = idx <= currentActiveLayer;

                return (
                  <motion.div
                    key={layer.layer}
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: isAssembled ? 1 : 0.5,
                      scale: isActive ? 1.005 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer hover:border-[#f15e1c]/60",
                      isActive
                        ? "bg-white dark:bg-[#000000] border-[#f15e1c] shadow-xs"
                        : isAssembled
                        ? "bg-white/80 dark:bg-[#000000]/80 border-[#f7d7b0] dark:border-[#1a1a1a]"
                        : "bg-white/40 dark:bg-[#000000]/40 border-[#f7d7b0]/50 dark:border-[#1a1a1a]/50 opacity-50"
                    )}
                    onClick={() => setCurrentActiveLayer(idx)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#fce3d3] dark:bg-[#0a0a0a] text-[#f15e1c] text-xs font-mono font-black flex items-center justify-center shrink-0">
                        {layer.layer}
                      </span>
                      <div>
                        <span className="text-xs sm:text-sm font-mono font-extrabold text-[#1b2823] dark:text-[#ffffff] block">
                          {layer.title}
                        </span>
                        <span className="text-xs text-[#4a5c55] dark:text-[#d3eee4]">
                          {layer.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isAssembled && (
                        <span className="text-[10px] font-mono font-bold text-[#2e936f] bg-[#fefaf5] dark:bg-[#0a0a0a] px-2.5 py-0.5 rounded-full border border-[#f7d7b0]">
                          CONNECTED
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 07 — OUR APPROACH (5 STACKED PHASE CARDS)
          ========================================================================= */}
      <section id="our-approach" className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#fefaf5] dark:bg-[#0a0a0a] select-none">
        <div className="max-w-[1440px] mx-auto space-y-8">
          
          <AnimatedSection className="text-center max-w-4xl mx-auto space-y-2">
            <Badge variant="secondary" size="sm">
              METHODOLOGY
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              From Technology Assessment to Continuous Improvement
            </h2>
            <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4]">
              A 5-step methodology that connects technical analysis with tangible business deliverables.
            </p>
          </AnimatedSection>

          {/* 5 Compact Phase Cards */}
          <div className="max-w-5xl mx-auto space-y-3.5">
            {approachSteps.map((step, idx) => (
              <AnimatedSection key={step.num} delay={0.04 * idx}>
                <div className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-3 text-left group">
                  {/* Phase Header */}
                  <div className="flex items-center justify-between border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] pb-2.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-[#fce3d3] dark:bg-[#0a0a0a] text-[#f15e1c]">
                        {step.num}
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                        {step.name}
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#2e936f]">
                      PHASE 0{idx + 1}
                    </span>
                  </div>

                  {/* 2-Column Internal Layout (Desktop) / Vertical Stack (Mobile) */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 pt-0.5">
                    <div className="md:col-span-6 space-y-1">
                      <span className="text-[11px] font-mono font-extrabold text-[#f15e1c] uppercase block tracking-wider">
                        WHAT WE DO:
                      </span>
                      <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                        {step.whatWeDo}
                      </p>
                    </div>

                    <div className="md:col-span-6 space-y-1">
                      <span className="text-[11px] font-mono font-extrabold text-[#2e936f] uppercase block tracking-wider">
                        WHAT THE CLIENT GETS:
                      </span>
                      <p className="text-xs sm:text-sm text-[#1b2823] dark:text-[#ffffff] font-semibold leading-relaxed">
                        {step.clientOutcome}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 08 — TECHNOLOGY CAPABILITIES
          ========================================================================= */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] select-none">
        <div className="max-w-[1440px] mx-auto space-y-8">
          
          <AnimatedSection className="text-center max-w-4xl mx-auto space-y-2">
            <Badge variant="secondary" size="sm">
              TECHNOLOGY CAPABILITIES
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Built Around the Systems Your Business Depends On
            </h2>
            <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4]">
              Supporting modern enterprise platforms across five core system domains.
            </p>
          </AnimatedSection>

          {/* Interactive Domain Selector & Card */}
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Category Selector Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {techArchitectureCategories.map((cat, idx) => (
                <button
                  key={cat.category}
                  type="button"
                  onClick={() => setActiveTechCat(idx)}
                  onMouseEnter={() => setActiveTechCat(idx)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer flex items-center gap-2 border hover:border-[#f15e1c]/60",
                    activeTechCat === idx
                      ? "bg-white dark:bg-[#000000] border-[#f15e1c] text-[#f15e1c] shadow-xs ring-2 ring-[#f15e1c]/10 scale-105 z-10"
                      : "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#f7d7b0] text-[#7A6A5F]"
                  )}
                >
                  {cat.icon}
                  <span>{cat.category}</span>
                </button>
              ))}
            </div>

            {/* Selected Domain Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTechCat}
                initial={{ opacity: 0, y: 6, scale: 0.99.valueOf() }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.99 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] space-y-4 text-left shadow-xs"
              >
                <div className="flex items-center gap-3 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-3">
                  <div className="p-3 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0]">
                    {techArchitectureCategories[activeTechCat].icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-black text-[#f15e1c] block">
                      DOMAIN 0{activeTechCat + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {techArchitectureCategories[activeTechCat].category}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  {techArchitectureCategories[activeTechCat].desc}
                </p>

                <div className="space-y-2 pt-1">
                  <span className="text-xs font-mono font-extrabold text-[#7A6A5F] uppercase block tracking-wider">
                    SUPPORTED SYSTEMS &amp; STACK METADATA:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {techArchitectureCategories[activeTechCat].meta.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-[#000000] border border-[#f7d7b0] text-xs sm:text-sm font-mono font-semibold text-[#1b2823] dark:text-[#ffffff]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 09 — BUSINESS OUTCOMES
          ========================================================================= */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] select-none">
        <div className="max-w-[1440px] mx-auto space-y-8">
          
          <AnimatedSection className="text-center max-w-4xl mx-auto space-y-2">
            <Badge variant="secondary" size="sm">
              BUSINESS OUTCOMES
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              What Better IT Strategy Delivers
            </h2>
            <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4]">
              Clear operational and commercial outcomes achieved through structured technology modernization.
            </p>
          </AnimatedSection>

          {/* 4 Outcome Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1440px] mx-auto">
            {businessOutcomes.map((out, idx) => (
              <AnimatedSection key={idx} delay={0.04 * idx}>
                <TiltCard maxTilt={2} scale={1.01}>
                  <div className="h-full p-6 rounded-2xl bg-white dark:bg-[#000000] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-3.5 text-left flex flex-col justify-between group">
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] w-fit group-hover:scale-105 transition-transform">
                        {out.icon}
                      </div>

                      <h3 className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-wider">
                        {out.headline}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                        {out.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#f7d7b0]/60 dark:border-[#1a1a1a] flex items-center gap-1.5 text-xs font-mono font-bold text-[#2e936f]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Commercial Value</span>
                    </div>
                  </div>
                </TiltCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 10 — WHO THIS IS FOR
          ========================================================================= */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#fefaf5] dark:bg-[#0a0a0a] select-none">
        <div className="max-w-[1440px] mx-auto space-y-8">
          
          <AnimatedSection className="text-center max-w-4xl mx-auto space-y-2">
            <Badge variant="secondary" size="sm">
              TARGET AUDIENCE
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Built for Businesses Facing Technology Complexity
            </h2>
            <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4]">
              Designed for leadership teams navigating architectural transitions and growth milestones.
            </p>
          </AnimatedSection>

          {/* 4 Scenarios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1440px] mx-auto">
            {targetScenarios.map((scen, idx) => (
              <AnimatedSection key={idx} delay={0.04 * idx}>
                <div className="h-full p-6 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-3 text-left flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                        {scen.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                      {scen.desc}
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-mono font-bold text-[#f15e1c] px-2.5 py-1 rounded-full bg-[#fce3d3] dark:bg-[#0a0a0a] inline-block">
                      {scen.badge}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 11 — WHY ARAV INNOVATIONS
          ========================================================================= */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] select-none">
        <div className="max-w-[1440px] mx-auto space-y-8">
          
          <AnimatedSection className="text-center max-w-4xl mx-auto space-y-2">
            <Badge variant="secondary" size="sm">
              WHY ARAV
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Why Businesses Choose Arav Innovations
            </h2>
            <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4]">
              Clear differentiators that separate our practice from traditional IT advisory.
            </p>
          </AnimatedSection>

          {/* 4 Differentiator Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1440px] mx-auto">
            {whyChooseArav.map((diff, idx) => (
              <AnimatedSection key={idx} delay={0.04 * idx}>
                <div className="h-full p-6 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] shadow-xs hover:-translate-y-1 transition-all duration-300 space-y-2.5 text-left flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                      <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                        {diff.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed pl-6">
                      {diff.desc}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 12 — CEO / LEADERSHIP PERSPECTIVE
          ========================================================================= */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#fefaf5] dark:bg-[#0a0a0a] select-none">
        <div className="max-w-[1440px] mx-auto space-y-8">
          
          <AnimatedSection className="text-center max-w-4xl mx-auto space-y-2">
            <Badge variant="secondary" size="sm">
              LEADERSHIP PERSPECTIVE
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Technology Leadership With a Practical Business Perspective
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.08} className="max-w-4xl mx-auto">
            <div className="p-6 sm:p-10 rounded-2xl bg-white dark:bg-[#000000] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-md space-y-4 text-left relative overflow-hidden">
              <div className="p-2.5 rounded-xl bg-[#f15e1c] text-white w-fit shadow-xs">
                <Quote className="w-5 h-5" />
              </div>

              <p className="text-base sm:text-xl font-display font-medium text-[#1b2823] dark:text-[#ffffff] leading-relaxed italic">
                &ldquo;Our focus is helping businesses make technology decisions that are commercially sensible, technically sound, secure, scalable and executable. We don&apos;t build unnecessary complexity — we build clear pathways for sustainable growth.&rdquo;
              </p>

              <div className="pt-3 border-t border-[#f7d7b0] dark:border-[#1a1a1a] flex items-center justify-between">
                <div>
                  <div className="text-sm font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                    Aryan Sayal
                  </div>
                  <div className="text-xs text-[#f15e1c] font-bold font-mono">
                    Founder &amp; Managing Partner &bull; Arav Innovations
                  </div>
                </div>
                <div className="text-xs font-mono font-bold text-[#2e936f] hidden sm:block">
                  Confidential Enterprise Engagement Standards
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 13 — FAQ SECTION
          ========================================================================= */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] select-none">
        <div className="max-w-[1440px] mx-auto space-y-8">
          
          <AnimatedSection className="text-center max-w-4xl mx-auto space-y-2">
            <Badge variant="secondary" size="sm">
              CLEAR ANSWERS
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4]">
              Common questions answered for business leaders and decision-makers.
            </p>
          </AnimatedSection>

          {/* 5 FAQs Accordion */}
          <div className="max-w-4xl mx-auto space-y-3 text-left">
            {faqList.map((faq, idx) => {
              const isOpen = activeFaqIdx === idx;
              return (
                <AnimatedSection key={idx} delay={0.04 * idx}>
                  <div className="rounded-xl border border-[#f7d7b0] dark:border-[#1a1a1a] transition-all duration-200 overflow-hidden bg-[#fefaf5] dark:bg-[#0a0a0a]">
                    <button
                      type="button"
                      onClick={() => setActiveFaqIdx(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-[#f15e1c] shrink-0 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a]"
                        >
                          <div className="pt-3">{faq.a}</div>
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

      {/* =========================================================================
          SECTION 14 — RELATED SERVICES
          ========================================================================= */}
      <section className="relative py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#fefaf5] dark:bg-[#0a0a0a] select-none">
        <div className="max-w-[1440px] mx-auto space-y-4 text-center">
          <span className="text-xs font-mono font-extrabold text-[#7A6A5F] uppercase tracking-wider block">
            EXPLORE RELATED ARAV SERVICES
          </span>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
            {internalServices.map((serv) => (
              <Link
                key={serv.name}
                href={serv.href}
                className="px-4 py-2 rounded-full bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] text-xs font-mono font-bold text-[#1b2823] dark:text-[#ffffff] hover:border-[#f15e1c] hover:text-[#f15e1c] transition-all"
              >
                {serv.name} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 15 — FINAL CTA SECTION
          ========================================================================= */}
      <section id="inquire" className="relative py-14 sm:py-18 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 select-none">
        <div className="max-w-[1440px] mx-auto">
          
          <AnimatedSection>
            <div className="rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-[#f15e1c] via-[#e55215] to-[#d8480d] text-white p-8 sm:p-12 xl:p-16 border-2 border-[#fab60a] shadow-xl space-y-6 text-center relative overflow-hidden">
              
              <div className="relative z-10 max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
                  <Sparkles className="w-3.5 h-3.5 text-[#ffec69]" />
                  <span>START YOUR TECHNOLOGY ROADMAP</span>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                  Have a Technology Challenge?<br />Let&apos;s Turn It Into a Clear Roadmap.
                </h2>

                <p className="text-xs sm:text-base text-white/90 leading-relaxed font-medium max-w-2xl mx-auto">
                  Tell us where your technology stands today, where you want to go, and what is getting in the way. We&apos;ll help you identify the right next step.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link href="/contact" className="w-full sm:w-auto">
                  <MagneticButton className="w-full sm:w-auto">
                    <Button3D
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />}
                      className="w-full sm:w-auto justify-center bg-white text-[#f15e1c] hover:bg-[#f7d7b0]"
                    >
                      Discuss Your Technology Strategy
                    </Button3D>
                  </MagneticButton>
                </Link>

                <a
                  href="https://api.whatsapp.com/send?phone=971521555792&text=Hello%20Arav%20Innovations%2C%20I%27d%20like%20to%20request%20a%20Technology%20Assessment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <MagneticButton className="w-full sm:w-auto">
                    <Button3D variant="outline" size="md" className="w-full sm:w-auto justify-center text-white border-white/60 hover:bg-white/10">
                      Request a Technology Assessment
                    </Button3D>
                  </MagneticButton>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="relative z-10 pt-4 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 text-xs text-white/90 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ffec69]" /> Confidential Discussions
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ffec69]" /> Clear Scope &amp; Roadmap
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#ffec69]" /> Flexible Engagement Models
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          SECTION 16 — RELATED INSIGHTS SECTION
          ========================================================================= */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#fefaf5] dark:bg-[#0a0a0a] select-none">
          <div className="max-w-[1440px] mx-auto space-y-8">
            
            <AnimatedSection className="text-center max-w-4xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce3d3] dark:bg-[#000000] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]">
                <BookOpen className="w-3.5 h-3.5" />
                <span>EXECUTIVE THOUGHT LEADERSHIP</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Insights for Smarter Technology Decisions
              </h2>
              <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] max-w-2xl mx-auto">
                Explore practical perspectives on IT strategy, digital transformation, technology modernization and building scalable technology foundations.
              </p>
            </AnimatedSection>

            {/* 3-Column Blog Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1440px] mx-auto">
              {relatedPosts.map((post, idx) => (
                <AnimatedSection key={post.slug} delay={0.04 * idx}>
                  <TiltCard maxTilt={2} scale={1.01}>
                    <div className="h-full p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#000000] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between group">
                      <div className="space-y-3">
                        
                        <div className="w-full mb-3 rounded-xl overflow-hidden border border-[#f7d7b0]/60">
                          <BlogCardImage post={post} aspectRatio="aspect-video" />
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#fce3d3] dark:bg-[#0a0a0a] text-[#f15e1c] border border-[#f7d7b0]/50">
                            {post.category}
                          </span>
                          {post.readTime && (
                            <span className="text-[11px] font-mono text-[#7A6A5F] flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#f15e1c]" /> {post.readTime}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors leading-snug line-clamp-2">
                          <Link href={`/insights/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed line-clamp-3">
                          {post.summary}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-[#f7d7b0]/60 dark:border-[#1a1a1a] flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#7A6A5F] flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#f15e1c]" /> {post.dateFormatted || post.publishedAt}
                        </span>
                        <Link
                          href={`/insights/${post.slug}`}
                          className="text-xs font-mono font-bold text-[#f15e1c] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                        >
                          Read Article <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </TiltCard>
                </AnimatedSection>
              ))}
            </div>

            {/* View More Blogs CTA */}
            <AnimatedSection delay={0.15} className="text-center pt-2">
              <Link href="/insights" className="inline-block">
                <MagneticButton>
                  <Button3D
                    variant="outline"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />}
                  >
                    Explore All Insights
                  </Button3D>
                </MagneticButton>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Footer Pathway */}
      <footer className="py-4 border-t border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#fefaf5] dark:bg-[#0a0a0a] overflow-hidden select-none">
        <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono font-extrabold text-[#7A6A5F] dark:text-[#B8ACA0] tracking-wider px-4">
          <span>01 ASSESS</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>02 PRIORITIZE</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>03 ARCHITECT</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>04 IMPLEMENT</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>05 OPTIMIZE</span>
        </div>
      </footer>
    </main>
  );
}

export default ITStrategyInteractivePage;
