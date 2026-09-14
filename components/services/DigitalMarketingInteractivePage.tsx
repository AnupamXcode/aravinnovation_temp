"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { CEOLeadershipSection } from "@/components/services/CEOLeadershipSection";
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

// Section 01: 4 Core Capability Areas
const positioningCapabilities = [
  {
    num: "01",
    title: "Technical SEO & On-Page Architecture",
    description:
      "Site architecture, schema markup, crawl efficiency, and page speed structured to earn organic search dominance.",
    icon: <Search className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    num: "02",
    title: "Answer Engine Optimization (AEO)",
    description:
      "Entity structuring and topical authority that ensure AI engines (ChatGPT, Claude, Gemini) extract and cite your brand directly.",
    icon: <Cpu className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    num: "03",
    title: "Google Ads & Meta Campaigns",
    description:
      "Targeted search and social campaigns with verified conversion tracking, multi-touch attribution, and disciplined ROAS.",
    icon: <Megaphone className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    num: "04",
    title: "Lead Generation & CRO",
    description:
      "Convert intent traffic into qualified opportunities through optimized landing pages, simplified forms, and clear user paths.",
    icon: <BarChart3 className="w-5 h-5 text-[#f15e1c]" />,
  },
];

// Section 02: 6-Stage Process Framework
const growthEngineStages = [
  {
    id: "PHASE-01",
    stageNum: "01",
    title: "Research & Intent Mapping",
    subtitle: "Audience & Search Query Landscape",
    description:
      "We analyze commercial goals, competitive positioning, buyer behavior, and high-intent search queries before launching spend.",
    icon: <Compass className="w-5 h-5 text-[#f15e1c]" />,
    deliverables: ["Competitive Landscape Audit", "Target Buyer Profiles", "High-Intent Query Map"],
  },
  {
    id: "PHASE-02",
    stageNum: "02",
    title: "Strategy & Offer Architecture",
    subtitle: "Messaging & Acquisition Funnels",
    description:
      "We align brand positioning, value propositions, campaign structures, and conversion paths with executive business goals.",
    icon: <Target className="w-5 h-5 text-[#2e936f]" />,
    deliverables: ["Messaging Architecture", "Brand Positioning Guide", "Funnel Conversion Blueprint"],
  },
  {
    id: "PHASE-03",
    stageNum: "03",
    title: "Asset Creation & Engineering",
    subtitle: "Landing Pages & Authoritative Content",
    description:
      "We design responsive landing pages, persuasive ad creative, and structured SEO/AEO content assets built for high conversion.",
    icon: <Layers className="w-5 h-5 text-[#fab60a]" />,
    deliverables: ["High-Converting Landing Pages", "Topical Authority Content Hubs", "Multi-Format Ad Creative Sets"],
  },
  {
    id: "PHASE-04",
    stageNum: "04",
    title: "Campaign Launch & Execution",
    subtitle: "Multi-Channel Deployment",
    description:
      "We launch search, display, and social initiatives with server-side tracking, pixel validation, and first-party attribution.",
    icon: <Megaphone className="w-5 h-5 text-[#f15e1c]" />,
    deliverables: ["Search & Social Campaigns", "Server-Side Analytics Tracking", "Attribution Pipeline Setup"],
  },
  {
    id: "PHASE-05",
    stageNum: "05",
    title: "Continuous Optimization & CRO",
    subtitle: "Performance Testing & Iteration",
    description:
      "We run continuous A/B tests, landing page adjustments, and bid optimizations to lower acquisition costs and improve quality.",
    icon: <RefreshCw className="w-5 h-5 text-[#2e936f]" />,
    deliverables: ["Conversion Rate Optimization Audits", "A/B Split Test Experiments", "CPL & CAC Reduction Audits"],
  },
  {
    id: "PHASE-06",
    stageNum: "06",
    title: "Reporting & Scaling",
    subtitle: "Attribution & Expansion",
    description:
      "We deliver clear commercial reports tracking lead quality, channel return, and clear recommendations for scaling top channels.",
    icon: <TrendingUp className="w-5 h-5 text-[#fab60a]" />,
    deliverables: ["Commercial Performance Dashboard", "Lead Quality Analysis", "Channel Scale Expansion Plan"],
  },
];

// Section 03: 8 Service Capabilities
const whatWeDoServices = [
  {
    num: "01",
    title: "B2B Digital Strategy",
    description:
      "Audience research, market positioning, channel selection, campaign planning, and measurable growth roadmaps.",
    icon: <Compass className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    num: "02",
    title: "Brand Development",
    description:
      "Positioning frameworks, core messaging, visual identity direction, and consistent digital brand presentation.",
    icon: <Target className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    num: "03",
    title: "Technical SEO",
    description:
      "Technical audits, crawlability, indexing, Core Web Vitals, schema markup, and clean site architecture.",
    icon: <Code2 className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    num: "04",
    title: "AI Search & AEO",
    description:
      "Structured entity data and topical hubs engineered for discovery across Google SGE, ChatGPT, Claude, and Gemini.",
    icon: <Cpu className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    num: "05",
    title: "Content & Thought Leadership",
    description:
      "Executive content, industry whitepapers, case studies, and structured articles that establish category authority.",
    icon: <FileText className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    num: "06",
    title: "Paid Acquisition",
    description:
      "Google Search campaigns, LinkedIn B2B targeting, retargeting, and audience expansion tied to pipeline metrics.",
    icon: <Megaphone className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    num: "07",
    title: "Landing Pages & CRO",
    description:
      "Frictionless page layouts, clear messaging, form optimization, and user journey improvements that increase conversion.",
    icon: <TrendingUp className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    num: "08",
    title: "Analytics & Attribution",
    description:
      "First-party tracking setup that connects marketing activity to qualified business inquiries rather than vanity clicks.",
    icon: <BarChart3 className="w-5 h-5 text-[#2e936f]" />,
  },
];

// Section 04: Modern Growth Focus Areas
const modernGrowthPillars = [
  {
    title: "AI Search Visibility",
    description:
      "Optimize web assets for discoverability across AI engine summaries alongside traditional search engine rankings.",
    icon: <Cpu className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    title: "Entity & Topical Authority",
    description:
      "Build connected content hubs around core business capabilities rather than publishing standalone keyword posts.",
    icon: <Layers className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    title: "Technical Performance",
    description:
      "Fast, accessible, and easily crawlable web foundations with valid structured data and optimized code.",
    icon: <Code2 className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    title: "B2B Thought Leadership",
    description:
      "Create expert-led insights that give prospective decision-makers genuine confidence in your commercial capability.",
    icon: <Users2 className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    title: "First-Party Data Tracking",
    description:
      "Capture reliable analytics using server-side pixels and first-party event tracking for privacy-compliant measurement.",
    icon: <BarChart3 className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    title: "Full-Funnel Attribution",
    description:
      "Connect brand discovery, search visits, and ad clicks directly to sales pipeline and customer acquisition cost.",
    icon: <TrendingUp className="w-5 h-5 text-[#fab60a]" />,
  },
];

// Section 05: Applicable Industry Markets
const applicableMarkets = [
  {
    title: "Technology & SaaS",
    desc: "Targeted buyer acquisition, technical SEO, and product positioning for software platforms.",
    icon: <Code2 className="w-4 h-4 text-[#f15e1c]" />,
  },
  {
    title: "Professional Services",
    desc: "Authority content, executive thought leadership, and high-intent inbound lead generation.",
    icon: <Users2 className="w-4 h-4 text-[#2e936f]" />,
  },
  {
    title: "Real Estate & Property",
    desc: "Local search dominance, high-converting digital landing pages, and targeted campaign capture.",
    icon: <Globe2 className="w-4 h-4 text-[#fab60a]" />,
  },
  {
    title: "Healthcare & Life Sciences",
    desc: "Compliant messaging, patient/client acquisition funnels, and authoritative entity search.",
    icon: <ShieldCheck className="w-4 h-4 text-[#2e936f]" />,
  },
  {
    title: "Education & Institutions",
    desc: "Student enrollment funnels, brand visibility, and multi-channel performance campaigns.",
    icon: <FileText className="w-4 h-4 text-[#f15e1c]" />,
  },
  {
    title: "Financial & Business Services",
    desc: "Trust-building digital presence, executive acquisition, and privacy-first measurement.",
    icon: <BarChart3 className="w-4 h-4 text-[#2e936f]" />,
  },
  {
    title: "Enterprise & B2B Companies",
    desc: "Multi-stakeholder messaging, LinkedIn account targeting, and integrated growth systems.",
    icon: <Target className="w-4 h-4 text-[#fab60a]" />,
  },
];

// Section 07: What We Measure
const whatWeMeasureItems = [
  {
    title: "Organic Search Visibility",
    desc: "Topical indexation, keyword footprints, and branded search coverage.",
    icon: <Search className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    title: "Qualified Traffic Volume",
    desc: "Visits from verified target decision-makers across organic and paid channels.",
    icon: <Users2 className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    title: "Engagement & Dwell Time",
    desc: "Content consumption depth, key page interactions, and low bounce rates.",
    icon: <Globe2 className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    title: "Inbound Pipeline Opportunities",
    desc: "High-intent form inquiries, consultation bookings, and qualified leads.",
    icon: <Target className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    title: "Cost Per Acquisition (CAC)",
    desc: "Media spend efficiency and acquisition cost discipline across campaigns.",
    icon: <TrendingUp className="w-5 h-5 text-[#2e936f]" />,
  },
  {
    title: "Content Read-Through Rates",
    desc: "Article engagement, whitepaper downloads, and topic authority reach.",
    icon: <FileText className="w-5 h-5 text-[#fab60a]" />,
  },
  {
    title: "AI Search Citation Rate",
    desc: "Brand entity presence across generative search answer boxes and summaries.",
    icon: <Cpu className="w-5 h-5 text-[#f15e1c]" />,
  },
  {
    title: "Campaign Conversion Velocity",
    desc: "Click-to-lead conversion rates, funnel velocity, and return on ad spend.",
    icon: <BarChart3 className="w-5 h-5 text-[#2e936f]" />,
  },
];

// Section 09: FAQ Items
const faqItems = [
  {
    question: "What scope is covered under Digital Marketing & Brand Development?",
    answer:
      "Our digital marketing practice integrates B2B growth strategy, brand positioning, technical SEO, Answer Engine Optimization (AEO), executive content, paid Google and LinkedIn campaigns, landing page CRO, and first-party performance tracking.",
  },
  {
    question: "How do you approach B2B lead generation?",
    answer:
      "We focus on high-intent buyer journeys rather than vanity traffic. By targeting decision-makers on Google Search and LinkedIn with clear messaging and frictionless landing pages, we generate qualified pipeline aligned with commercial goals.",
  },
  {
    question: "How does Answer Engine Optimization (AEO) differ from traditional SEO?",
    answer:
      "Traditional SEO focuses on earning organic rankings on search results pages. AEO structures entity data, topical hubs, and schema markup so AI engines (ChatGPT, Claude, Gemini, SGE) understand your business and cite your brand directly in AI answer summaries.",
  },
  {
    question: "How is campaign performance measured and reported?",
    answer:
      "We report commercial indicators—including qualified inquiries, buyer engagement quality, acquisition cost efficiency (CAC), organic visibility, and content consumption—rather than reporting impression numbers alone.",
  },
  {
    question: "Do you handle both strategy and full campaign execution?",
    answer:
      "Yes. We manage the end-to-end growth lifecycle—from initial positioning and technical site setup to content production, ad campaign management, landing page design, and ongoing CRO optimization.",
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
  "B2B Lead Acquisition",
  "SEO & AEO Search",
  "Paid Media Campaigns",
  "Content Authority",
  "CRO & Conversion",
];

export function DigitalMarketingInteractivePage({ service, relatedPosts }: DigitalMarketingPageProps) {
  const [activeStageIdx, setActiveStageIdx] = React.useState<number>(0);
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
          1. HERO — DIGITAL GROWTH & BRAND STRATEGY
          ========================================================================= */}
      <section className="relative pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12 lg:pb-14 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-[#FFFDF9] dark:bg-[#000000] border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] overflow-hidden select-none flex flex-col justify-start">
        
        {/* Full-Bleed Desktop Background Visual */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block select-none overflow-hidden">
          <Image
            src="/images/digital-marketing-bg.png"
            alt="Digital Marketing & Brand Development Strategy"
            fill
            priority
            className="object-cover object-right opacity-95 dark:opacity-90 transition-opacity duration-500"
            sizes="(min-width: 1024px) 100vw, 1px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF9] via-[#FFFDF9]/80 via-45% to-transparent dark:from-[#000000] dark:via-[#000000]/80 dark:via-45% dark:to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9]/20 via-transparent to-[#FFFDF9]/60 dark:from-[#000000]/20 dark:via-transparent dark:to-[#000000]/60 pointer-events-none" />
        </div>

        <AnimatedDotGrid />

        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-radial from-[#f15e1c]/10 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-[1536px] mx-auto w-full space-y-4 sm:space-y-6 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: HERO COPY */}
            <div className="lg:col-span-7 xl:col-span-6 space-y-4 sm:space-y-5 text-left max-w-2xl">
              
              {/* Breadcrumb & Eyebrow Badge */}
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
                  <span>B2B DIGITAL MARKETING & TECHNICAL SEO</span>
                </motion.div>
              </AnimatedSection>

              {/* Main Headline */}
              <AnimatedSection delay={0.1} className="space-y-2">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight leading-[1.15] text-[#1b2823] dark:text-[#ffffff]">
                  Digital Marketing, SEO &amp;{" "}
                  <span className="text-[#f15e1c]">Answer Engine Optimization</span>
                </h1>
              </AnimatedSection>

              {/* Mobile Hero Image Card */}
              <AnimatedSection delay={0.12} className="w-full lg:hidden my-2">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl border border-[#f7d7b0] dark:border-[#1a1a1a] bg-white dark:bg-[#0a0a0a] overflow-hidden shadow-lg">
                  <Image
                    src="/images/digital-marketing-mobile-hero.png"
                    alt="Digital Marketing, SEO and AEO Strategy"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </AnimatedSection>

              {/* Concise 5-10 Second Paragraph */}
              <AnimatedSection delay={0.14} className="space-y-2">
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed max-w-2xl">
                  We build digital growth systems that make your business visible, trusted, and chosen. By combining brand positioning, search optimization, technical SEO, and targeted campaigns, we connect audience intent to commercial outcomes.
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
                      Build Growth Strategy
                    </Button3D>
                  </MagneticButton>
                </Link>

                <Link href="#positioning">
                  <MagneticButton>
                    <Button3D variant="outline" size="md" className="hover:-translate-y-0.5 transition-all duration-300">
                      Explore Services
                    </Button3D>
                  </MagneticButton>
                </Link>
              </AnimatedSection>

              {/* Keyword Indicators */}
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

            {/* RIGHT COLUMN DESKTOP SPACER */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-6 h-full min-h-[260px]" />
          </div>
        </div>
      </section>

      {/* Laser Scan Line */}
      <SystemScanTransition />

      {/* =========================================================================
          EDITORIAL VISUAL BREAK 1: BRAND AUTHORITY & VISIBILITY
          ========================================================================= */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            
            {/* IMAGE 1 (~45% width) */}
            <div className="lg:col-span-5 w-full flex items-center justify-center">
              <AnimatedSection delay={0.08} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full aspect-[16/9] rounded-2xl border border-[#f7d7b0] dark:border-[#1a1a1a] overflow-hidden bg-white dark:bg-[#080808] shadow-md hover:shadow-xl hover:border-[#f15e1c]/50 transition-all duration-300 group"
                >
                  <Image
                    src="/images/digital-marketing-main-1.png"
                    alt="Arav Innovations Digital Marketing Strategy Overview"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </motion.div>
              </AnimatedSection>
            </div>

            {/* SUPPORTING CONTENT (~55% width) */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <AnimatedSection delay={0.12} className="space-y-2">
                <Badge variant="secondary" size="md">
                  BRAND AUTHORITY & VISIBILITY
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
                  Connecting Brand Authority With Intent-Driven Discovery
                </h2>
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
                  In today’s multi-channel B2B landscape, decision-makers evaluate your brand across search, AI platforms, and professional channels before making contact. We structure your presence so every touchpoint reinforces credibility.
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
                      <span>SEARCH &amp; AI</span>
                    </div>
                    <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal">
                      Structured entity data &amp; topical authority hubs.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f]/40 space-y-1 transition-all duration-200 cursor-default group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#2e936f]">
                      <Target className="w-4 h-4" />
                      <span>POSITIONING</span>
                    </div>
                    <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal">
                      Clear messaging for core target audiences.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#fab60a]/40 space-y-1 transition-all duration-200 cursor-default group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#fab60a]">
                      <Megaphone className="w-4 h-4" />
                      <span>ACQUISITION</span>
                    </div>
                    <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal">
                      High-intent search &amp; targeted campaigns.
                    </p>
                  </motion.div>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Laser Scan Line */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 01 — POSITIONING (4 CORE CAPABILITIES)
          ========================================================================= */}
      <section id="positioning" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="max-w-3xl space-y-3 text-left">
              <Badge variant="secondary" size="md">
                POSITIONING
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Growth Starts With Being Found, Trusted and Chosen
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
                Digital growth requires more than generic traffic. Buyers research across search engines, professional platforms, websites, and AI discovery tools before engaging. We connect these channels into a coherent growth system focused on commercial metrics.
              </p>
            </div>
          </AnimatedSection>

          {/* 4 Standardized Capability Cards with Uniform System Styling */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {positioningCapabilities.map((cap, idx) => (
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

      {/* Laser Scan Line */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 02 — PROCESS & METHODOLOGY PIPELINE (01 to 06)
          ========================================================================= */}
      <section id="process" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                METHODOLOGY &amp; PROCESS
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
                Our 6-Phase Growth Framework
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                A disciplined methodology connecting initial research to continuous optimization and channel scaling.
              </p>
            </div>
          </AnimatedSection>

          {/* Interactive Scroll & Tab Highlight Sequence Container */}
          <AnimatedSection delay={0.08}>
            <div className="rounded-2xl sm:rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-lg p-4 sm:p-6 lg:p-8 space-y-6">
              
              {/* Desktop / Mobile Stage Numbers Progress Indicator */}
              <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-6 gap-2 relative">
                {growthEngineStages.map((stg, idx) => {
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
                        {stg.stageNum}.
                      </span>
                      <span className="truncate">{stg.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Display Card */}
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
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-[#f15e1c]/10 text-[#f15e1c]">
                        {activeStage.icon}
                      </div>
                      <span className="text-xs font-mono font-bold text-[#f15e1c] uppercase tracking-wider">
                        STAGE {activeStage.stageNum} &bull; {activeStage.title}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {activeStage.subtitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                      {activeStage.description}
                    </p>
                  </div>

                  <div className="lg:col-span-5 space-y-2.5 text-left border-t lg:border-t-0 lg:border-l border-[#f7d7b0]/60 dark:border-[#1a1a1a] pt-4 lg:pt-0 lg:pl-6">
                    <span className="text-xs font-mono font-bold uppercase text-[#2e936f] block">
                      Stage Deliverables:
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

      {/* Laser Scan Line */}
      <SystemScanTransition />

      {/* =========================================================================
          EDITORIAL VISUAL BREAK 2: CLOSED-LOOP PERFORMANCE
          ========================================================================= */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#FFFDF9] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            
            {/* LEFT COLUMN (~55% width) */}
            <div className="lg:col-span-7 space-y-4 text-left order-2 lg:order-1">
              <AnimatedSection delay={0.08} className="space-y-2">
                <Badge variant="secondary" size="md">
                  CLOSED-LOOP PERFORMANCE
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
                  Turning Buyer Engagement Into Qualified Pipeline
                </h2>
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
                  Driving site visits is meaningful only when it converts into qualified sales inquiries. Our growth setup connects initial interest to clear conversion points so every campaign delivers measurable commercial return.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.12} className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a]">
                  <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#1b2823] dark:text-[#ffffff]">
                    Optimized Landing Page Journeys &amp; Frictionless Forms
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a]">
                  <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#1b2823] dark:text-[#ffffff]">
                    First-Party Attribution &amp; Closed-Loop Analytics
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a]">
                  <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-[#1b2823] dark:text-[#ffffff]">
                    Continuous Iteration Based on Qualified Pipeline Signals
                  </span>
                </div>
              </AnimatedSection>
            </div>

            {/* RIGHT COLUMN: IMAGE 2 (~45% width) */}
            <div className="lg:col-span-5 w-full flex items-center justify-center order-1 lg:order-2">
              <AnimatedSection delay={0.12} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.01, y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full aspect-[16/9] rounded-2xl border border-[#f7d7b0] dark:border-[#1a1a1a] overflow-hidden bg-white dark:bg-[#080808] shadow-md hover:shadow-xl hover:border-[#f15e1c] transition-all duration-300 group"
                >
                  <Image
                    src="/images/digital-marketing-main-2.png"
                    alt="Arav Innovations Pipeline Optimization"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </motion.div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

      {/* Laser Scan Line */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 03 — CAPABILITIES (WHAT WE ACTUALLY DO)
          ========================================================================= */}
      <section id="what-we-do" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                CORE CAPABILITIES
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Digital Marketing Services Focused on Outcomes
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Practical growth workstreams covering positioning, search, content, campaigns, and conversion.
              </p>
            </div>
          </AnimatedSection>

          {/* 8 Standardized Capability Cards in 4-Column Grid */}
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

      {/* Laser Scan Line */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 04 — 2026 DIGITAL GROWTH FOCUS AREAS
          ========================================================================= */}
      <section id="2026-growth" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                MODERN ARCHITECTURE
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Built for How Decision-Makers Research Now
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                Structured search visibility, authority building, and transparent attribution across key digital touchpoints.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {modernGrowthPillars.map((plr, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.05} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-5 sm:p-6 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#2e936f] hover:shadow-md transition-all duration-300 space-y-2.5 text-left group"
                >
                  <div className="p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] w-fit group-hover:scale-105 transition-transform">
                    {plr.icon}
                  </div>
                  <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors">
                    {plr.title}
                  </h3>
                  <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                    {plr.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Line */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 05 — APPLICABLE MARKETS (CLEAN BALANCED GRID)
          ========================================================================= */}
      <section id="markets" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-8">
          
          <AnimatedSection>
            <div className="max-w-3xl space-y-3 text-left">
              <Badge variant="secondary" size="md">
                APPLICABLE MARKETS
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Tailored Around Your Market Dynamics
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                Different industries follow distinct buying cycles and discovery channels. We adapt positioning and campaign tactics to your sector:
              </p>
            </div>
          </AnimatedSection>

          {/* Clean 2-Column / 3-Column Grid for Markets (Replacing loose scattered pills) */}
          <AnimatedSection delay={0.08}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
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

      {/* Laser Scan Line */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 06 — WHAT WE MEASURE (PROOF & METRICS)
          ========================================================================= */}
      <section id="what-we-measure" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                COMMERCIAL METRICS
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Transparent Performance Reporting
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                We measure growth against indicators directly connected to commercial capability and pipeline health.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {whatWeMeasureItems.map((item, idx) => (
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

      {/* Laser Scan Line */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 07 — BLOGS & INSIGHTS
          ========================================================================= */}
      <section id="insights" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-8">
          
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-4">
              <div className="space-y-2 text-left">
                <Badge variant="secondary" size="md">
                  KNOWLEDGE &amp; STRATEGY
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
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

      {/* Laser Scan Line */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION — ABOUT OUR CEO / LEADERSHIP PERSPECTIVE
          ========================================================================= */}
      <CEOLeadershipSection serviceContext="His perspective connects digital presence with measurable business growth." />

      {/* Laser Scan Line */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 09 — FREQUENTLY ASKED QUESTIONS
          ========================================================================= */}
      <section id="faq" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
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
            {faqItems.map((faq, idx) => {
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
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="px-5 pb-5 text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium border-t border-[#f7d7b0]/40 dark:border-[#1a1a1a] pt-3"
                        >
                          {faq.answer}
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

      {/* Laser Scan Line */}
      <SystemScanTransition />

      {/* =========================================================================
          SECTION 10 — CONNECTED SERVICES ECOSYSTEM
          ========================================================================= */}
      <section className="relative py-10 sm:py-14 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
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
            {otherServices.map((item, idx) => (
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
                      {item.title}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#f15e1c] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Laser Scan Line */}
      <SystemScanTransition />

      {/* =========================================================================
          FINAL CALL TO ACTION
          ========================================================================= */}
      <section id="contact" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-12">
        <AnimatedSection>
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#f15e1c] via-[#e55215] to-[#d8480d] text-white p-8 sm:p-14 border-2 border-[#fab60a] shadow-2xl space-y-6 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#ffec69]" />
                <span>BUILD A STRONGER DIGITAL GROWTH ENGINE</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                Turn Your Digital Presence Into a Growth System
              </h2>

              <p className="text-xs sm:text-sm font-medium text-white/90 leading-relaxed max-w-2xl mx-auto">
                Discuss your business goals, target buyer profiles, and growth targets with our strategy team. We will construct a tailored digital growth roadmap for your brand.
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
                    Build Growth Strategy
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
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> 100% Client Ownership of Brand Assets
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> First-Party Performance Tracking
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Strategy Teams in Gurgaon &amp; Dubai
              </span>
            </div>
          </div>
        </AnimatedSection>
      </section>

    </div>
  );
}

export default DigitalMarketingInteractivePage;
