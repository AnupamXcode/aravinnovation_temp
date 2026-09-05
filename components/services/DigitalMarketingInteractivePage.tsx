"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogCardImage } from "@/components/insights/BlogCardImage";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
} from "framer-motion";
import {
  TrendingUp,
  Search,
  Users2,
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Globe2,
  Target,
  Megaphone,
  RefreshCw,
  Layers,
  ShieldCheck,
  Code2,
  Cpu,
  ChevronDown,
  ArrowUpRight,
  Compass,
  FileText,
  Check,
} from "lucide-react";
import { Service } from "@/data/services";
import { BlogPost, blogPostsData } from "@/data/insights";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/TiltCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";

interface DigitalMarketingPageProps {
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
// 2. System Scan Transition Line (Laser Beam Sweep Effect)
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
          id="digital-dot-matrix-pattern"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#f15e1c" opacity="0.6" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#digital-dot-matrix-pattern)" />
      </svg>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Data Collections for Digital Marketing Page
// -----------------------------------------------------------------------------

// Section 01: 4 Concise Capability Areas
const positioningCapabilities = [
  {
    num: "01",
    title: "Brand Positioning",
    description:
      "Build a clear market position, messaging system and digital identity that makes the business easier to understand and remember.",
    icon: <Target className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    num: "02",
    title: "Search & AI Visibility",
    description:
      "Improve technical SEO, content structure, topical authority and discoverability across traditional search and emerging AI-driven search experiences.",
    icon: <Search className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    num: "03",
    title: "Demand Generation",
    description:
      "Reach high-intent B2B audiences through Google Search, LinkedIn and carefully selected paid channels aligned with commercial objectives.",
    icon: <Megaphone className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    num: "04",
    title: "Conversion & Measurement",
    description:
      "Turn visits into meaningful actions through landing-page optimization, conversion journeys, analytics and continuous performance analysis.",
    icon: <BarChart3 className="w-5 h-5 text-[#f15e1c]" />,
  },
];

// Section 02: Digital Growth Engine (5 Stages)
const growthEngineStages = [
  {
    id: "POSITION",
    stageNum: "01",
    title: "POSITION",
    subtitle: "Brand & Audience Foundations",
    description:
      "Clarify brand, audience, proposition and messaging. We establish your unique market positioning, key messaging pillars, and target B2B buyer profiles.",
    icon: <Target className="w-5 h-5 text-[#f15e1c]" />,
    deliverables: ["Brand Positioning Blueprint", "Ideal Customer Profile (ICP) Matrix", "Value Proposition Architecture"],
  },
  {
    id: "DISCOVER",
    stageNum: "02",
    title: "DISCOVER",
    subtitle: "Multi-Channel Search & AI Presence",
    description:
      "Build organic and paid visibility across search, AI discovery and relevant digital channels. We establish technical SEO foundations and high-intent acquisition campaigns.",
    icon: <Search className="w-5 h-5 text-[#2e936f]" />,
    deliverables: ["Technical SEO & Crawl Audit", "AI Search & Topic Authority Hubs", "Google & LinkedIn Paid Search Campaigns"],
  },
  {
    id: "ENGAGE",
    stageNum: "03",
    title: "ENGAGE",
    subtitle: "Trust-Building Content Systems",
    description:
      "Use useful content, thought leadership, landing pages and campaigns to build trust. We equip decision-makers with insight-led articles, case studies, and executive commentary.",
    icon: <Users2 className="w-5 h-5 text-[#fab60a]" />,
    deliverables: ["Executive Thought Leadership", "B2B Insight Articles & Case Studies", "High-Converting Landing Pages"],
  },
  {
    id: "CONVERT",
    stageNum: "04",
    title: "CONVERT",
    subtitle: "Journey & Lead Optimization",
    description:
      "Optimize journeys, forms, CTAs, landing pages and lead qualification. We remove user friction to ensure high-intent traffic turns into qualified sales inquiries.",
    icon: <TrendingUp className="w-5 h-5 text-[#f15e1c]" />,
    deliverables: ["Conversion Rate Optimization (CRO)", "Form & CTA Friction Reduction", "Lead Qualification Workflows"],
  },
  {
    id: "LEARN",
    stageNum: "05",
    title: "LEARN",
    subtitle: "Continuous Analysis & Iteration",
    description:
      "Measure performance, identify friction and continuously improve the system. We connect marketing activity to commercial outcomes and continually refine growth tactics.",
    icon: <RefreshCw className="w-5 h-5 text-[#2e936f]" />,
    deliverables: ["First-Party Attribution Analytics", "Monthly Growth Audits", "Continuous Strategy Iteration"],
  },
];

// Section 03: What We Actually Do (8 Service Items)
const whatWeDoServices = [
  {
    num: "01",
    title: "B2B Digital Strategy",
    description:
      "Audience research, positioning, channel strategy, campaign planning and measurable growth roadmaps.",
    icon: <Compass className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    num: "02",
    title: "Brand Development",
    description:
      "Brand positioning, messaging, visual direction, executive presence and digital brand consistency.",
    icon: <Target className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    num: "03",
    title: "Technical SEO",
    description:
      "Technical audits, crawlability, indexing, JavaScript SEO, Core Web Vitals, structured data and site architecture.",
    icon: <Code2 className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    num: "04",
    title: "AI Search & Content Visibility",
    description:
      "Create structured, authoritative content designed to be useful for people and understandable to modern search and AI discovery systems.",
    icon: <Cpu className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    num: "05",
    title: "Content & Thought Leadership",
    description:
      "Executive content, insight-led articles, industry pages, case studies, LinkedIn content and topic authority systems.",
    icon: <FileText className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    num: "06",
    title: "Paid Acquisition",
    description:
      "High-intent Google Search, LinkedIn B2B campaigns, retargeting and audience expansion based on business objectives.",
    icon: <Megaphone className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    num: "07",
    title: "Landing Pages & CRO",
    description:
      "Improve messaging, page structure, CTAs, forms and user journeys to reduce friction and increase qualified actions.",
    icon: <TrendingUp className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    num: "08",
    title: "Analytics & Attribution",
    description:
      "Connect marketing activity to meaningful business signals instead of reporting vanity metrics alone.",
    icon: <BarChart3 className="w-5 h-5 text-[#2e936f]" />,
  },
];

// Section 04: 2026 Digital Growth Focus Areas
const modernGrowthPillars = [
  {
    title: "AI Search Visibility",
    description:
      "Optimize content for discoverability across AI-powered search experiences while retaining strong traditional SEO foundations.",
    icon: <Cpu className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    title: "Entity & Topical Authority",
    description:
      "Build connected content around important business topics instead of publishing disconnected keyword-focused articles.",
    icon: <Layers className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    title: "Technical Performance",
    description:
      "Fast, crawlable, accessible websites with strong information architecture, structured data and sound technical foundations.",
    icon: <Code2 className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    title: "B2B Thought Leadership",
    description:
      "Develop distinctive expert-led content that gives decision-makers useful reasons to trust the brand.",
    icon: <Users2 className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    title: "First-Party Measurement",
    description:
      "Use owned website, CRM and campaign data wherever available to understand meaningful user journeys and commercial performance.",
    icon: <BarChart3 className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    title: "Full-Funnel Measurement",
    description:
      "Connect awareness, engagement, lead quality and conversion instead of judging campaigns only by clicks or impressions.",
    icon: <TrendingUp className="w-5 h-5 text-[#fab60a]" />,
  },
];

// Section 05: Applicable Industry Markets
const applicableMarkets = [
  "Technology & SaaS",
  "Professional Services",
  "Real Estate",
  "Healthcare",
  "Education",
  "Financial & Business Services",
  "Enterprise & B2B Companies",
];

// Section 06: How We Work (5 Stages)
const howWeWorkProcess = [
  {
    step: "01",
    title: "DISCOVER",
    description:
      "Understand business objectives, audience, market, competitors and existing digital performance.",
  },
  {
    step: "02",
    title: "DEFINE",
    description:
      "Establish positioning, priorities, channels, content themes and measurable objectives.",
  },
  {
    step: "03",
    title: "BUILD",
    description:
      "Create campaigns, content, landing pages, SEO foundations and brand assets.",
  },
  {
    step: "04",
    title: "ACTIVATE",
    description:
      "Launch and manage organic, paid and content-led growth initiatives.",
  },
  {
    step: "05",
    title: "OPTIMIZE",
    description:
      "Analyze performance, identify opportunities and continuously improve the growth system.",
  },
];

// Section 07: What We Measure (Credible Proof System)
const whatWeMeasureItems = [
  {
    title: "Organic Visibility",
    desc: "Search engine indexation, keyword footprints, and brand search impressions.",
    icon: <Search className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    title: "Qualified Traffic",
    desc: "High-intent decision-maker visits from target organic and paid channels.",
    icon: <Users2 className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    title: "Engagement Quality",
    desc: "Time on page, key interaction events, and content consumption depth.",
    icon: <Globe2 className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    title: "Lead Conversion",
    desc: "Form submissions, meeting requests, and inbound consultation inquiries.",
    icon: <Target className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    title: "Cost Efficiency",
    desc: "Effective cost per acquisition (CAC) and media spend efficiency across campaigns.",
    icon: <TrendingUp className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    title: "Content Performance",
    desc: "Article read-through rates, resource downloads, and topic engagement.",
    icon: <FileText className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    title: "Search Visibility",
    desc: "Multi-platform presence across traditional search and AI discovery engines.",
    icon: <Cpu className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    title: "Campaign Performance",
    desc: "Click-through velocity, landing page conversion rates, and funnel health.",
    icon: <BarChart3 className="w-5 h-5 text-[#2e936f]" />,
  },
];

// Section 09: 5 FAQ Items
const faqItems = [
  {
    question: "What does Arav Innovations include in digital marketing?",
    answer:
      "Our digital marketing practice combines B2B strategy, brand positioning, technical SEO, AI-search visibility, executive content creation, high-intent paid campaigns (Google & LinkedIn), landing page CRO, and closed-loop measurement.",
  },
  {
    question: "How do you approach B2B lead generation?",
    answer:
      "We focus on high-intent buyer journeys rather than volume-only tactics. By targeting decision-makers on Google Search and LinkedIn with authoritative content and frictionless landing pages, we build qualified pipeline aligned with your commercial goals.",
  },
  {
    question: "Do you provide SEO and AI-search optimization?",
    answer:
      "Yes. We optimize your web assets for traditional search engines (Google, Bing) while structuring entity data and authoritative topic hubs so your brand is correctly understood and cited by modern AI search systems.",
  },
  {
    question: "How do you measure digital marketing performance?",
    answer:
      "We measure meaningful business indicators—including qualified inquiries, buyer engagement quality, acquisition cost efficiency, organic search coverage, and content consumption—rather than reporting vanity impressions alone.",
  },
  {
    question: "Can you manage both strategy and campaign execution?",
    answer:
      "Yes. We operate as an end-to-end growth team—from initial positioning and technical setup to campaign management, content creation, landing page design, and ongoing performance optimization.",
  },
];

// Service Ecosystem Links
const otherServices = [
  { title: "IT Strategy & Implementation", href: "/services/it-strategy-implementation", icon: <Compass className="w-4 h-4 text-[#f15e1c]" /> },
  { title: "Web & Application Development", href: "/services/web-app-development", icon: <Code2 className="w-4 h-4 text-[#2e936f]" /> },
  { title: "Risk, Compliance & Governance", href: "/services/risk-compliance-governance", icon: <ShieldCheck className="w-4 h-4 text-[#2e936f]" /> },
  { title: "Audit & Improvement", href: "/services/audit-improvement", icon: <BarChart3 className="w-4 h-4 text-[#f15e1c]" /> },
  { title: "Training & Staff Augmentation", href: "/services/training-staff-augmentation", icon: <Users2 className="w-4 h-4 text-[#fab60a]" /> },
  { title: "SEO Services", href: "/services/seo-services", icon: <Search className="w-4 h-4 text-[#2e936f]" /> },
  { title: "AI Portfolio", href: "/services/ai-portfolio", icon: <Cpu className="w-4 h-4 text-[#f15e1c]" /> },
];

const keywordTags = [
  "Brand Strategy",
  "B2B Growth",
  "SEO & AI Search",
  "Paid Media",
  "Content Engine",
  "CRO & Lead Conversion",
];

export function DigitalMarketingInteractivePage({ service, relatedPosts }: DigitalMarketingPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeStageIdx, setActiveStageIdx] = React.useState<number>(0);
  const [activeProcessIdx, setActiveProcessIdx] = React.useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(0);

  // Dynamic Blog Selection
  const displayPosts = React.useMemo(() => {
    if (relatedPosts && relatedPosts.length > 0) {
      return relatedPosts.slice(0, 3);
    }
    return blogPostsData.slice(0, 3);
  }, [relatedPosts]);

  const activeStage = growthEngineStages[activeStageIdx];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#000000] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden selection:bg-[#f15e1c]/20 selection:text-[#f15e1c] relative">
      
      {/* Background Dot Grid Matrix Pattern */}
      <AnimatedDotGrid />

      {/* =========================================================================
          1. HERO — DIGITAL GROWTH & BRAND STRATEGY (FULL-BLEED CINEMATIC BACKGROUND)
          ========================================================================= */}
      <section className="relative pt-4 sm:pt-6 lg:pt-8 pb-10 sm:pb-14 lg:pb-18 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-[#FFFDF9] dark:bg-[#000000] border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] overflow-hidden select-none min-h-[calc(100vh-80px)] flex flex-col justify-start">
        
        {/* Full-Bleed Desktop Background Visual — Crisp Integrated Background Art for PC / DESKTOP VIEW */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block select-none overflow-hidden">
          <Image
            src="/images/digital-marketing-bg.png"
            alt="Digital Marketing &amp; Brand Development Strategy"
            fill
            priority
            className="object-cover object-right opacity-95 dark:opacity-90 transition-opacity duration-500"
            sizes="(min-width: 1024px) 100vw, 1px"
          />
          {/* Subtle minimal gradient overlay providing crisp image clarity with minor soft text backdrop on desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF9] via-[#FFFDF9]/75 via-45% to-transparent dark:from-[#000000] dark:via-[#000000]/75 dark:via-45% dark:to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9]/20 via-transparent to-[#FFFDF9]/60 dark:from-[#000000]/20 dark:via-transparent dark:to-[#000000]/60 pointer-events-none" />
        </div>

        <AnimatedDotGrid />

        {/* Ambient Subtle Pulsing Glow */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-radial from-[#f15e1c]/10 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-radial from-[#2e936f]/10 via-transparent to-transparent blur-3xl rounded-full pointer-events-none lg:hidden" />

        <div className="max-w-[1536px] mx-auto w-full space-y-6 sm:space-y-8 relative z-10">
          
          {/* 2-Column Hero Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: HERO COPY ALIGNED TO THE TOP LEFT */}
            <div className="lg:col-span-7 xl:col-span-6 space-y-4 sm:space-y-5 text-left max-w-2xl">
              
              {/* Breadcrumb &amp; Eyebrow Badge */}
              <AnimatedSection delay={0.05} className="space-y-2">
                <Breadcrumb
                  items={[
                    { label: "Services", href: "/services" },
                    { label: "Digital Marketing & Brand Development" },
                  ]}
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce3d3] dark:bg-[#0a0a0a] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c] shadow-2xs cursor-default transition-all duration-300"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#f15e1c] animate-pulse" />
                  <span>DIGITAL GROWTH &amp; BRAND STRATEGY</span>
                </motion.div>
              </AnimatedSection>

              {/* Main Headline */}
              <AnimatedSection delay={0.1} className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold font-display tracking-tight leading-[1.12] text-[#1b2823] dark:text-[#ffffff]">
                  Turn Digital Presence Into{" "}
                  <span className="text-[#f15e1c]">Measurable Business Growth</span>
                </h1>
              </AnimatedSection>

              {/* Dedicated Cropped Mobile Hero Image Card (Mobile/Tablet Viewports < 1024px) */}
              <AnimatedSection delay={0.12} className="w-full lg:hidden my-3">
                <div className="relative w-full aspect-[941/970] rounded-2xl border-2 border-[#f7d7b0] dark:border-[#1a1a1a] bg-white dark:bg-[#0a0a0a] overflow-hidden shadow-xl">
                  <Image
                    src="/images/digital-marketing-mobile-hero.png"
                    alt="Digital Marketing &amp; Brand Development Strategy"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </AnimatedSection>

              {/* Supporting Text */}
              <AnimatedSection delay={0.14} className="space-y-3">
                <p className="text-sm sm:text-base lg:text-lg text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed max-w-2xl">
                  We help businesses build stronger digital brands, become easier to discover, reach high-intent audiences and turn digital activity into qualified opportunities through strategy, content, SEO, paid media and continuous optimization.
                </p>
              </AnimatedSection>

              {/* CTA Buttons */}
              <AnimatedSection delay={0.16} className="pt-1 flex flex-wrap items-center gap-3">
                <Link href="/contact">
                  <MagneticButton>
                    <Button3D
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1.5" />}
                      className="shadow-md shadow-[#f15e1c]/20 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Build My Growth Strategy
                    </Button3D>
                  </MagneticButton>
                </Link>

                <Link href="#positioning">
                  <MagneticButton>
                    <Button3D variant="outline" size="md" className="hover:-translate-y-0.5 transition-all duration-300">
                      Explore Our Approach
                    </Button3D>
                  </MagneticButton>
                </Link>
              </AnimatedSection>

              {/* Capability / Service Indicators */}
              <AnimatedSection delay={0.18} className="pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  {keywordTags.map((tag, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.06, y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="px-3 py-1.5 rounded-lg bg-[#fefaf5]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xs border border-[#f7d7b0] dark:border-[#1a1a1a] text-xs font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#f15e1c] hover:border-[#f15e1c]/40 transition-all duration-200 cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* RIGHT COLUMN: DESKTOP SPACER */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6 h-full min-h-[300px]" />
          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          EDITORIAL VISUAL BREAK 1: IMAGE 1 + SUPPORTING CONTENT (IMAGE LEFT, TEXT RIGHT)
          ========================================================================= */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: IMAGE 1 (~45% width) */}
            <div className="lg:col-span-5 w-full flex items-center justify-center">
              <AnimatedSection delay={0.08} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full rounded-2xl sm:rounded-3xl border border-[#f7d7b0] dark:border-[#1a1a1a] overflow-hidden bg-[#fefaf5] dark:bg-[#0a0a0a] shadow-lg hover:shadow-2xl hover:border-[#f15e1c]/50 transition-all duration-300 group"
                >
                  <Image
                    src="/images/digital-marketing-main-1.png"
                    alt="Arav Innovations Digital Marketing Strategy & Ecosystem Overview"
                    width={1000}
                    height={667}
                    className="w-full h-auto max-w-full object-contain block transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </motion.div>
              </AnimatedSection>
            </div>

            {/* RIGHT COLUMN: SUPPORTING CONTENT (~55% width) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              <AnimatedSection delay={0.12} className="space-y-3">
                <Badge variant="secondary" size="md">
                  BRAND AUTHORITY &amp; VISIBILITY
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
                  Connecting Brand Authority With Intent-Driven Discovery
                </h2>
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
                  In today’s multi-platform B2B landscape, decision-makers evaluate your brand long before filling out a contact form. We structure your digital presence to build immediate credibility across search engines, professional networks, and executive touchpoints.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.16}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <motion.div
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="p-3.5 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]/40 space-y-1 transition-all duration-200 cursor-default group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#f15e1c] group-hover:translate-x-0.5 transition-transform">
                      <Search className="w-4 h-4" />
                      <span>SEARCH &amp; AI</span>
                    </div>
                    <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal">
                      Structured entity &amp; topical authority hubs.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="p-3.5 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f]/40 space-y-1 transition-all duration-200 cursor-default group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#2e936f] group-hover:translate-x-0.5 transition-transform">
                      <Target className="w-4 h-4" />
                      <span>POSITIONING</span>
                    </div>
                    <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal">
                      Clear ICP messaging &amp; brand positioning.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="p-3.5 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#fab60a]/40 space-y-1 transition-all duration-200 cursor-default group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#fab60a] group-hover:translate-x-0.5 transition-transform">
                      <Megaphone className="w-4 h-4" />
                      <span>ACQUISITION</span>
                    </div>
                    <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal">
                      High-intent B2B paid &amp; organic search.
                    </p>
                  </motion.div>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 01 — POSITIONING (TILT CARDS & SCROLL REVEALS)
          ========================================================================= */}
      <section id="positioning" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-12">
          
          <AnimatedSection>
            <div className="max-w-3xl space-y-4 text-left">
              <Badge variant="secondary" size="md">
                POSITIONING
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Growth Starts With Being Found, Trusted and Chosen
              </h2>
              <p className="text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
                Digital growth is no longer just about traffic or impressions. Buyers research across search engines, professional networks, websites and increasingly AI-powered discovery experiences before they speak with a business.
              </p>
              <p className="text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
                Arav Innovations connects these touchpoints into one growth system — combining positioning, technical foundations, authoritative content, targeted acquisition and conversion optimization around clear business objectives.
              </p>
            </div>
          </AnimatedSection>

          {/* 4 Concise Capability Areas (with 3D TiltCard Effect) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {positioningCapabilities.map((cap, idx) => (
              <AnimatedSection key={cap.num} delay={idx * 0.08}>
                <TiltCard maxTilt={6} scale={1.01} glare={true} className="h-full">
                  <div className="h-full p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-md hover:shadow-2xl hover:border-[#f15e1c] transition-all duration-300 space-y-4 flex flex-col justify-between group relative overflow-hidden text-left">
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-[#f15e1c] px-3 py-1 rounded-full bg-[#fce3d3] dark:bg-[#161616] border border-[#f15e1c]/30">
                          {cap.num}
                        </span>
                        <div className="w-14 h-14 rounded-2xl bg-[#fefaf5] dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                          {React.cloneElement(cap.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7 text-[#fab60a] stroke-[2]" })}
                        </div>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors leading-snug break-words">
                        {cap.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                        {cap.description}
                      </p>
                    </div>

                    {/* Subtle Accent Bottom Indicator Line */}
                    <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#f15e1c] via-[#2e936f] to-[#fab60a] transition-all duration-300 rounded-full" />
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
          SECTION 02 — DIGITAL GROWTH ENGINE (SMOOTH SLIDING TAB INTERACTION)
          ========================================================================= */}
      <section id="growth-system" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                CONNECTED ENGINE
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                One Growth System. Connected From Discovery to Conversion.
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Select any stage below to explore how positioning, search, content, conversion and measurement fit together.
              </p>
            </div>
          </AnimatedSection>

          {/* System Interactive Container */}
          <AnimatedSection delay={0.1}>
            <div className="rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xl p-6 sm:p-10 space-y-8">
              
              {/* Stage Selector Bar with Animated Background Pill */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 relative">
                {growthEngineStages.map((stg, idx) => {
                  const isSelected = activeStageIdx === idx;
                  return (
                    <button
                      key={stg.id}
                      type="button"
                      onClick={() => setActiveStageIdx(idx)}
                      onMouseEnter={() => setActiveStageIdx(idx)}
                      className={cn(
                        "relative py-3 px-3 rounded-2xl text-xs font-extrabold font-display transition-all duration-250 cursor-pointer flex items-center justify-center gap-2 select-none z-10",
                        isSelected
                          ? "text-white shadow-md"
                          : "bg-white dark:bg-[#000000] text-[#4a5c55] dark:text-[#d3eee4] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] hover:bg-[#f15e1c]/5"
                      )}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="activeEngineTab"
                          className="absolute inset-0 bg-[#f15e1c] rounded-2xl shadow-md shadow-[#f15e1c]/20 z-[-1]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="font-mono text-[10px] opacity-80">{stg.stageNum}.</span>
                      <span>{stg.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Display Panel with Animated Stage Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-7 space-y-3 text-left">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-[#f15e1c]/10 text-[#f15e1c]">
                        {activeStage.icon}
                      </div>
                      <span className="text-xs font-mono font-bold text-[#f15e1c] uppercase tracking-wider">
                        STAGE {activeStage.stageNum} &bull; {activeStage.title}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {activeStage.subtitle}
                    </h3>
                    <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                      {activeStage.description}
                    </p>
                  </div>

                  <div className="lg:col-span-5 space-y-3 text-left">
                    <span className="text-xs font-mono font-bold uppercase text-[#2e936f] block">
                      Core Stage Deliverables:
                    </span>
                    <div className="space-y-2">
                      {activeStage.deliverables.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex items-center gap-2 text-xs font-semibold text-[#1b2823] dark:text-[#ffffff] p-2.5 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f]/40 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          EDITORIAL VISUAL BREAK 2: SUPPORTING CONTENT + IMAGE 2 (TEXT LEFT, IMAGE RIGHT)
          ========================================================================= */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#FFFDF9] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: SUPPORTING CONTENT (~55% width) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left order-2 lg:order-1">
              <AnimatedSection delay={0.08} className="space-y-3">
                <Badge variant="secondary" size="md">
                  CLOSED-LOOP PERFORMANCE
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
                  Turning Engagement Into Qualified Pipeline
                </h2>
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
                  Driving digital activity is only meaningful when it translates into qualified sales opportunities. Our growth methodology connects every touchpoint—from discovery to conversion—ensuring your marketing efforts generate verifiable ROI.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.12} className="space-y-2">
                <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f]/40 transition-all">
                  <CheckCircle2 className="w-5 h-5 text-[#2e936f] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#1b2823] dark:text-[#ffffff]">
                    Frictionless Landing Page Optimization &amp; Lead Journeys
                  </span>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f]/40 transition-all">
                  <CheckCircle2 className="w-5 h-5 text-[#2e936f] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#1b2823] dark:text-[#ffffff]">
                    First-Party Attribution &amp; Closed-Loop Analytics
                  </span>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f]/40 transition-all">
                  <CheckCircle2 className="w-5 h-5 text-[#2e936f] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#1b2823] dark:text-[#ffffff]">
                    Continuous Iteration Based on Commercial Business Signals
                  </span>
                </motion.div>
              </AnimatedSection>
            </div>

            {/* RIGHT COLUMN: IMAGE 2 (~45% width) */}
            <div className="lg:col-span-5 w-full flex items-center justify-center order-1 lg:order-2">
              <AnimatedSection delay={0.12} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.025, y: -3 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full rounded-2xl sm:rounded-3xl border-2 border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] overflow-hidden bg-[#fefaf5] dark:bg-[#0a0a0a] shadow-lg hover:shadow-[0_0_35px_rgba(241,94,28,0.45)] dark:hover:shadow-[0_0_45px_rgba(241,94,28,0.55)] transition-all duration-500 group"
                >
                  <Image
                    src="/images/digital-marketing-main-2.png"
                    alt="Arav Innovations Digital Marketing Growth System & Pipeline Optimization"
                    width={1000}
                    height={667}
                    className="w-full h-auto max-w-full object-contain block transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Radiant Outer Glowing Rectangle Border on Hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#f15e1c] rounded-2xl sm:rounded-3xl pointer-events-none transition-colors duration-300 shadow-[inset_0_0_20px_rgba(241,94,28,0.25)]" />

                  {/* Laser Beam Line Covering the Entire Rectangle on Hover */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                      className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#f15e1c] to-transparent opacity-90 blur-[1px] shadow-[0_0_25px_#f15e1c]"
                    />
                    <motion.div
                      animate={{ y: ["-100%", "200%"] }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                      className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-[#f15e1c]/40 to-transparent blur-[2px] shadow-[0_0_20px_#f15e1c]"
                    />
                  </div>
                </motion.div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 03 — WHAT WE ACTUALLY DO (TILT CARDS & HOVER SHIFTS)
          ========================================================================= */}
      <section id="what-we-do" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                CAPABILITIES
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Digital Marketing Built Around Business Outcomes
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Structured growth workstreams focused on positioning, visibility, acquisition, conversion and transparent attribution.
              </p>
            </div>
          </AnimatedSection>

          {/* 8 Clean Service Items Grid (with 3D TiltCard Effect) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatWeDoServices.map((svc, idx) => (
              <AnimatedSection key={svc.num} delay={idx * 0.05}>
                <TiltCard maxTilt={5} scale={1.01} glare={true} className="h-full">
                  <div className="h-full p-6 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#f15e1c] hover:shadow-lg transition-all duration-300 space-y-3 flex flex-col justify-between group relative overflow-hidden">
                    <div className="space-y-2 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-[#f15e1c]">
                          {svc.num}
                        </span>
                        <div className="p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] group-hover:scale-110 group-hover:rotate-3 group-hover:border-[#f15e1c]/40 transition-all duration-300">
                          {svc.icon}
                        </div>
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] group-hover:translate-x-1 transition-all duration-300">
                        {svc.title}
                      </h3>
                      <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                        {svc.description}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a] text-[11px] font-mono font-bold text-[#f15e1c] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform duration-300" />
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
          SECTION 04 — 2026 DIGITAL GROWTH
          ========================================================================= */}
      <section id="2026-growth" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                MODERN ARCHITECTURE
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Built for How Buyers Discover Businesses Now
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                No buzzword promises. Just modern discovery, authority engineering, and transparent measurement.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modernGrowthPillars.map((plr, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.06}>
                <TiltCard maxTilt={5} scale={1.01} className="h-full">
                  <div className="h-full p-6 sm:p-7 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#2e936f] hover:shadow-lg transition-all duration-300 space-y-3 text-left group">
                    <div className="p-2.5 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] w-fit group-hover:scale-110 group-hover:-rotate-3 group-hover:border-[#2e936f]/40 transition-all duration-300">
                      {plr.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] group-hover:translate-x-1 transition-all duration-300">
                      {plr.title}
                    </h3>
                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                      {plr.description}
                    </p>
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
          SECTION 05 — INDUSTRY / BUSINESS FIT
          ========================================================================= */}
      <section id="industries" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-8">
          
          <AnimatedSection>
            <div className="max-w-3xl space-y-3 text-left">
              <Badge variant="secondary" size="md">
                APPLICABLE MARKETS
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Built Around Your Market, Not a Generic Marketing Template
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                Every market has unique buyer behaviors and discovery channels. Our digital growth strategies are tailored around your specific commercial environment:
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {applicableMarkets.map((mkt, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-5 py-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] hover:bg-[#f15e1c]/5 text-xs font-bold font-display text-[#1b2823] dark:text-[#ffffff] hover:text-[#f15e1c] shadow-2xs flex items-center gap-2 transition-all duration-200 cursor-default group"
                >
                  <Check className="w-3.5 h-3.5 text-[#2e936f] group-hover:scale-110 transition-transform" />
                  <span>{mkt}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Laser Scan Beam Section Separator */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 06 — HOW WE WORK (PROGRESSIVE PROCESS PIPELINE)
          ========================================================================= */}
      <section id="how-we-work" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-12">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                METHODOLOGY
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                From Strategy to Continuous Growth
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                A 5-stage disciplined approach to building and refining your digital growth system.
              </p>
            </div>
          </AnimatedSection>

          {/* Progress Step Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
            {howWeWorkProcess.map((proc, idx) => {
              const isActive = activeProcessIdx === idx;
              return (
                <AnimatedSection key={proc.step} delay={idx * 0.08}>
                  <motion.div
                    onClick={() => setActiveProcessIdx(idx)}
                    onMouseEnter={() => setActiveProcessIdx(idx)}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={cn(
                      "p-5 rounded-3xl border-2 transition-all duration-300 cursor-pointer space-y-2 text-left flex flex-col justify-between min-h-[180px] select-none",
                      isActive
                        ? "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#f15e1c] shadow-lg ring-2 ring-[#f15e1c]/20"
                        : "bg-[#fefaf5] dark:bg-[#0a0a0a] border-[#f7d7b0] dark:border-[#1a1a1a] opacity-80 hover:opacity-100 hover:border-[#f15e1c]"
                    )}
                  >
                    <div className="space-y-1">
                      <span
                        className={cn(
                          "text-xs font-mono font-black block transition-colors",
                          isActive ? "text-[#f15e1c]" : "text-[#7A6A5F]"
                        )}
                      >
                        {proc.step}
                      </span>
                      <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                        {proc.title}
                      </h3>
                      <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium pt-1">
                        {proc.description}
                      </p>
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="activeProcessDot"
                        className="h-1 w-full bg-[#f15e1c] rounded-full mt-2"
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
          SECTION 07 — PROOF / WHAT WE MEASURE
          ========================================================================= */}
      <section id="what-we-measure" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                TRANSPARENT METRICS
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Strategy Is Better When You Can See the Work
              </h2>
              <p className="text-base font-mono font-bold text-[#f15e1c] uppercase tracking-wider">
                What We Measure
              </p>
              <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4]">
                We evaluate digital marketing success against commercial indicators that matter to your business.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatWeMeasureItems.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.05}>
                <TiltCard maxTilt={5} scale={1.01} className="h-full">
                  <div className="h-full p-6 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#2e936f] hover:shadow-lg transition-all duration-300 space-y-3 text-left group">
                    <div className="p-2.5 rounded-2xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] w-fit group-hover:scale-110 group-hover:border-[#2e936f]/40 transition-all duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] group-hover:translate-x-1 transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                      {item.desc}
                    </p>
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
          SECTION 08 — BLOGS / INSIGHTS
          ========================================================================= */}
      <section id="insights" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-4">
              <div className="space-y-2 text-left">
                <Badge variant="secondary" size="md">
                  KNOWLEDGE &amp; STRATEGY
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                  Digital Growth Insights
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
                      <div className="w-full mb-3 rounded-2xl overflow-hidden border border-[#f7d7b0]/60">
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
          SECTION 09 — FREQUENTLY ASKED QUESTIONS (SMOOTH ACCORDION)
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
            {faqItems.map((faq, idx) => {
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
                        {faq.question}
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
                          {faq.answer}
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
          SECTION 10 — CONNECTED SERVICES ECOSYSTEM
          ========================================================================= */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
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
            {otherServices.map((item, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.04}>
                <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.2 }}>
                  <Link
                    href={item.href}
                    className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c] hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] group-hover:scale-110 group-hover:border-[#f15e1c]/40 transition-all">
                        {item.icon}
                      </div>
                      <span className="text-xs font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                        {item.title}
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
      <SystemScanTransition />

      {/* =========================================================================
          FINAL CTA
          ========================================================================= */}
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-12">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#f15e1c] via-[#e55215] to-[#d8480d] text-white p-10 sm:p-16 border-2 border-[#fab60a] shadow-2xl space-y-8 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#ffec69] animate-spin" style={{ animationDuration: "6s" }} />
                <span>READY TO BUILD A STRONGER DIGITAL GROWTH ENGINE?</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                Turn Your Digital Presence Into a Growth System
              </h2>

              <p className="text-sm sm:text-base font-medium text-white/90 leading-relaxed">
                Tell us where your business is today, where you want to go, and what is getting in the way. We can help turn those challenges into a practical digital growth roadmap.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/contact">
                <MagneticButton>
                  <Button3D
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1.5" />}
                    className="w-full sm:w-auto justify-center bg-white text-[#f15e1c] hover:bg-[#f7d7b0] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Build My Growth Strategy
                  </Button3D>
                </MagneticButton>
              </Link>

              <Link href="/services">
                <MagneticButton>
                  <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center text-white border-white/60 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300">
                    Explore Our Services
                  </Button3D>
                </MagneticButton>
              </Link>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 text-xs text-white/90 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> 100% Client Ownership of Brand &amp; Ad Assets
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Transparent Reporting &amp; Attribution
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Dedicated Strategy Team in Gurgaon &amp; Dubai
              </span>
            </div>
          </div>
        </AnimatedSection>
      </section>

    </div>
  );
}

export default DigitalMarketingInteractivePage;
