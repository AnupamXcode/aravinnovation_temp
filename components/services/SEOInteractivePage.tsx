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
  Search,
  Globe2,
  TrendingUp,
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Quote,
  Star,
  Zap,
  Target,
  FileCode,
  Layers,
  Check,
  RefreshCw,
  Eye,
  ArrowUpRight,
  Gauge,
  Database,
  Filter,
  Sliders,
  Play,
  Link2,
  ArrowUp,
  Compass,
  ChevronUp,
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

interface SEOPageProps {
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
// 2. Hero Search Results Field & Ranking Ascent Visual
// -----------------------------------------------------------------------------
function SearchAscentHeroVisual() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-25 select-none flex items-center justify-center">
      <div className="relative w-full max-w-4xl h-[420px] flex flex-col justify-between py-6 px-4">
        {/* Competitor Result Card 03 */}
        <div className="p-3 rounded-2xl bg-white/40 dark:bg-[#101b17]/40 border border-[#f7d7b0]/40 backdrop-blur-xs flex items-center justify-between opacity-40">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#7A6A5F]" />
            <span className="text-xs font-mono text-[#7A6A5F]">Competitor Result &bull; Informational</span>
          </div>
          <span className="text-[10px] font-mono text-[#7A6A5F]">POSITION 04</span>
        </div>

        {/* Competitor Result Card 02 */}
        <div className="p-3.5 rounded-2xl bg-white/50 dark:bg-[#101b17]/50 border border-[#f7d7b0]/60 backdrop-blur-xs flex items-center justify-between opacity-60">
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-[#2e936f]" />
            <span className="text-xs font-mono font-bold text-[#1b2823] dark:text-[#ffffff]">Industry Directory &bull; Listing</span>
          </div>
          <span className="text-[10px] font-mono text-[#2e936f] font-bold">POSITION 03</span>
        </div>

        {/* YOUR BRAND — ASCENDING RANKING CARD */}
        <motion.div
          initial={{ y: 40, opacity: 0.6, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1.02 }}
          transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}
          className="p-5 rounded-2xl bg-white dark:bg-[#101b17] border-2 border-[#f15e1c] shadow-2xl flex items-center justify-between z-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-[#f15e1c] flex items-center justify-center text-white text-[10px] font-bold">
              ★
            </div>
            <div>
              <span className="text-xs font-mono font-black text-[#f15e1c] block">
                YOUR BRAND &bull; ARAV INNOVATIONS
              </span>
              <span className="text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]">
                Enterprise Search Intelligence &bull; High Intent &bull; Core Web Vitals 99/100
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#fce3d3] dark:bg-[#261f1a] border border-[#f15e1c] text-xs font-mono font-bold text-[#f15e1c]">
            <ArrowUp className="w-3.5 h-3.5" />
            <span>RANK ASCENT</span>
          </div>
        </motion.div>

        {/* Competitor Result Card 01 */}
        <div className="p-3.5 rounded-2xl bg-white/40 dark:bg-[#101b17]/40 border border-[#f7d7b0]/40 backdrop-blur-xs flex items-center justify-between opacity-50">
          <div className="flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-[#7A6A5F]" />
            <span className="text-xs font-mono text-[#7A6A5F]">Legacy Domain &bull; Generic Content</span>
          </div>
          <span className="text-[10px] font-mono text-[#7A6A5F]">PREVIOUS LEADER</span>
        </div>
      </div>
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
const seoSolutionsData = [
  {
    numStr: "01",
    title: "Technical & On-Page SEO",
    subtitle: "Core Web Vitals & Semantic Content Hierarchy",
    description:
      "We optimize website speed, crawlability, mobile responsiveness, and on-page semantic structure to ensure search engines accurately understand and rank your content.",
    icon: <FileCode className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Sub-Second Core Web Vitals & Page Speed Tuning",
      "Semantic HTML5 & JSON-LD Schema Integration",
      "Mobile-First Responsive Crawl Architecture",
      "URL & Internal Link Structure Optimization",
    ],
    metric: "99/100",
    metricLabel: "Technical SEO Performance Score",
    stageName: "TECHNICAL FOUNDATION",
  },
  {
    numStr: "02",
    title: "Enterprise & E-Commerce SEO",
    subtitle: "Large-Scale Architecture & High-Intent Rankings",
    description:
      "For complex enterprise domains and e-commerce platforms, we optimize thousands of product pages, category taxonomies, and multi-region search strategies.",
    icon: <Globe2 className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Facet & Dynamic Category Indexing Control",
      "Multilingual Hreflang & Regional Search Scoping",
      "High-Volume Product Schema Optimization",
      "Cannibalization & Duplicate Content Cleanups",
    ],
    metric: "3.4x",
    metricLabel: "Organic Traffic Growth Increase",
    stageName: "ENTERPRISE SCALING",
  },
  {
    numStr: "03",
    title: "Local & Hyperlocal Marketing",
    subtitle: "Geotargeted Visibility & Reputation Care",
    description:
      "We enhance local search presence for multi-location businesses through Google Business Profile optimization, local citation building, and online reputation management.",
    icon: <Target className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Google Business Profile Optimization & Audit",
      "Geotargeted Local Citation & Directory Sync",
      "Localized Landing Page & Schema Creation",
      "Online Review & Reputation Signals Management",
    ],
    metric: "#1",
    metricLabel: "Local 3-Pack Visibility Goal",
    stageName: "LOCAL DISCOVERY",
  },
  {
    numStr: "04",
    title: "Authority Building & Search Analytics",
    subtitle: "High-Quality Backlinks & Data Science Insights",
    description:
      "We build domain authority through editorial outreach and provide AI-assisted analytics dashboards to track organic keywords, traffic quality, and conversions.",
    icon: <TrendingUp className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Editorial PR & High-Authority Backlink Scoping",
      "Topical Authority & Content Cluster Architecture",
      "AI-Assisted Keyword Intent & Gap Analysis",
      "Closed-Loop Revenue Attribution Dashboards",
    ],
    metric: "100%",
    metricLabel: "White-Hat Compliance Guarantee",
    stageName: "AUTHORITY & ANALYTICS",
  },
];

const searchJourneyStages = [
  { stage: "01", name: "DISCOVER", desc: "Search Intent & Competitor Landscape Scan" },
  { stage: "02", name: "PRIORITIZE", desc: "Search Opportunity Priority Ladder" },
  { stage: "03", name: "OPTIMIZE", desc: "Content Transformation & On-Page Schema" },
  { stage: "04", name: "AUTHORITY", desc: "Authority Layer Stack & Editorial Signals" },
  { stage: "05", name: "MEASURE", desc: "Search Performance Trend Line & Qualified Leads" },
];

const priorityLadderItems = [
  { level: "HIGH VALUE", intent: "COMMERCIAL INTENT", title: "Enterprise Cloud IT Solutions", color: "bg-[#2e936f]/20 border-[#2e936f] text-[#2e936f]" },
  { level: "HIGH INTENT", intent: "TRANSACTIONAL", title: "DPDP Compliance Advisory Dubai", color: "bg-[#2e936f]/20 border-[#2e936f] text-[#2e936f]" },
  { level: "STRONG RELEVANCE", intent: "INFORMATIONAL", title: "ISO 27001 Audit Guide 2026", color: "bg-[#fab60a]/20 border-[#fab60a] text-[#fab60a]" },
  { level: "SUPPORTING TOPIC", intent: "INFORMATIONAL", title: "What is SaaS Architecture", color: "bg-[#f15e1c]/15 border-[#f15e1c]/40 text-[#f15e1c]" },
];

const howWeWorkSteps = [
  {
    step: "01",
    title: "Discover & Audit",
    subtitle: "Technical SEO & Intent Gap Audit",
    description:
      "We analyze search intent, technical site health, and competitor gaps to establish a baseline SEO strategy for your domain.",
    output: "Technical SEO & Intent Gap Audit",
  },
  {
    step: "02",
    title: "Plan & Prioritize",
    subtitle: "Topical Cluster & Keyword Roadmap",
    description:
      "We structure high-value keyword clusters, topical pillar hierarchies, and technical optimization priorities.",
    output: "Topical Cluster & Keyword Roadmap",
  },
  {
    step: "03",
    title: "Optimize & Create",
    subtitle: "On-Page Optimization & Content Release",
    description:
      "We refine page architecture, enhance Core Web Vitals, and create search-intent aligned content for maximum engagement.",
    output: "On-Page Optimization & Content Release",
  },
  {
    step: "04",
    title: "Build Authority",
    subtitle: "High-Authority Editorial Links",
    description:
      "We build brand trust and domain authority through strategic content promotion, digital PR, and high-quality references.",
    output: "High-Authority Editorial Links",
  },
  {
    step: "05",
    title: "Measure & Refine",
    subtitle: "Continuous Search Optimization Loop",
    description:
      "We monitor organic traffic, keyword visibility, and conversion metrics to continuously refine search strategy.",
    output: "Continuous Search Optimization Loop",
  },
];

const continuousSearchCycleSteps = [
  { id: "discover", name: "DISCOVER", desc: "Search Intent Audit" },
  { id: "audit", name: "AUDIT", desc: "Technical Health Scan" },
  { id: "plan", name: "PLAN", desc: "Priority Ladder Roadmap" },
  { id: "optimize", name: "OPTIMIZE", desc: "Content Transformation" },
  { id: "authority", name: "AUTHORITY", desc: "Authority Stack Building" },
  { id: "measure", name: "MEASURE", desc: "Rank & Conversion Trend" },
];

const ctaWords = ["DISCOVERABLE", "RELEVANT", "VISIBLE", "AUTHORITATIVE", "GROWING"];

export function SEOInteractivePage({ service }: SEOPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeSolutionIdx, setActiveSolutionIdx] = React.useState<number>(0);
  const [activeJourneyStage, setActiveJourneyStage] = React.useState<number>(0);
  const [activeWorkIdx, setActiveWorkIdx] = React.useState<number>(0);
  const [currentWordIdx, setCurrentWordIdx] = React.useState<number>(0);
  const [isContentOptimized, setIsContentOptimized] = React.useState<boolean>(false);

  // ---------------------------------------------------------------------------
  // 1. Search Journey Scroll Progression
  // ---------------------------------------------------------------------------
  const journeyContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: journeyProgress } = useScroll({
    target: journeyContainerRef,
    offset: ["start 80%", "end 20%"],
  });
  const smoothJourneyProgress = useSpring(journeyProgress, { stiffness: 45, damping: 25 });

  React.useEffect(() => {
    const unsub = smoothJourneyProgress.on("change", (v) => {
      const count = searchJourneyStages.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedStage = Math.floor(normalized * count);
      setActiveJourneyStage(calculatedStage);
    });
    return () => unsub();
  }, [smoothJourneyProgress]);

  // ---------------------------------------------------------------------------
  // 2. 5-Stage Framework Timeline Scroll Line
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
  // 3. Continuous Search Cycle Signal Motion
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
      const count = continuousSearchCycleSteps.length;
      const normalized = Math.min(Math.max(0, v), 0.999);
      const calculatedIdx = Math.floor(normalized * count);
      setActiveLoopStep(calculatedIdx);
    });
    return () => unsub();
  }, [smoothLoopProgress]);

  // ---------------------------------------------------------------------------
  // 4. Parallax & Blur Typography for Search Discovery Philosophy
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

  const activeSolution = seoSolutionsData[activeSolutionIdx];
  const activeWorkStep = howWeWorkSteps[activeWorkIdx];
  const testimonial = testimonialsData.find((t) => t.id === "test-2") || testimonialsData[1];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#12100E] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden selection:bg-[#f15e1c]/20 selection:text-[#f15e1c]">
      
      {/* =========================================================================
          1. HERO — FROM INVISIBLE TO DISCOVERABLE (RANKING ASCENT)
          ========================================================================= */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] overflow-hidden select-none">
        <SearchAscentHeroVisual />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-radial from-[#f15e1c]/10 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-radial from-[#2e936f]/8 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-[1536px] mx-auto w-full space-y-6 relative z-10">
          {/* Top Breadcrumb & Badge */}
          <div className="space-y-3">
            <Breadcrumb
              items={[
                { label: "Services", href: "/services" },
                { label: "SEO Services" },
              ]}
            />
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]"
            >
              <Sparkles className="w-4 h-4" />
              <span>THE SEARCH JOURNEY &bull; BRAND RISING THROUGH SEARCH</span>
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
              Turn Search Visibility Into <span className="text-[#f15e1c]">Sustainable Growth</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-base sm:text-xl lg:text-2xl text-[#4a5c55] dark:text-[#d3eee4] max-w-3xl mx-auto font-medium leading-relaxed"
            >
              Data-driven search engine optimization combining technical Core Web Vitals excellence, semantic content clusters, and authoritative brand signals.
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
                    Request SEO Audit
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

          {/* Search System Status Bar */}
          <div className="pt-4 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-4 px-4 py-2 rounded-2xl bg-white/80 dark:bg-[#101b17]/80 border border-[#f7d7b0] dark:border-[#253630] backdrop-blur-md shadow-lg text-xs font-mono font-bold text-[#f15e1c]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-ping" />
                STATUS: DISCOVERABLE
              </span>
              <span className="text-[#7A6A5F]">&bull;</span>
              <span>RANKING ASCENT: ACTIVE</span>
              <span className="text-[#7A6A5F]">&bull;</span>
              <span>CORE WEB VITALS: 99/100</span>
            </div>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          2. SOLUTIONS — THE SEARCH JOURNEY (VERTICAL SEARCH ASCENT NARRATIVE)
          ========================================================================= */}
      <section
        id="search-journey"
        ref={journeyContainerRef}
        className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none"
      >
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              THE SEARCH JOURNEY
            </Badge>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Vertical Search Ascent
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Scroll down to watch a brand rise from invisible to discoverable, relevant, visible, and authoritative.
            </p>
          </div>

          {/* 5-Stage Search Journey Progress Strip */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] shadow-sm max-w-5xl mx-auto flex items-center justify-between overflow-x-auto gap-2">
            {searchJourneyStages.map((st, i) => (
              <div
                key={st.stage}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold shrink-0 transition-all",
                  i <= activeJourneyStage
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
                key={searchJourneyStages[activeJourneyStage].stage}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="p-8 sm:p-12 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f15e1c]/40 shadow-2xl space-y-6 text-left relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#253630] pb-5">
                  <div>
                    <span className="text-xs font-mono font-black text-[#f15e1c] uppercase tracking-wider block">
                      STAGE {searchJourneyStages[activeJourneyStage].stage} / 05 &bull; {searchJourneyStages[activeJourneyStage].name}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mt-1">
                      {searchJourneyStages[activeJourneyStage].desc}
                    </h3>
                  </div>

                  <div className="px-4 py-2 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] text-xs font-mono font-bold text-[#2e936f] shadow-xs">
                    SEARCH ASCENT ENGINE
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0]/60 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#7A6A5F] block uppercase">TECHNICAL SCORE</span>
                    <span className="text-sm font-mono font-extrabold text-[#f15e1c]">99/100 VITALS</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0]/60 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#7A6A5F] block uppercase">ORGANIC TRAFFIC</span>
                    <span className="text-sm font-mono font-extrabold text-[#2e936f]">3.4x INCREASE</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0]/60 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#7A6A5F] block uppercase">LOCAL VISIBILITY</span>
                    <span className="text-sm font-mono font-extrabold text-[#fab60a]">#1 RANK GOAL</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 4 Solution Workstream Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seoSolutionsData.map((sol, idx) => {
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
                            DISCIPLINE {sol.numStr}
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
          3. SEARCH OPPORTUNITY MAP (PRIORITY LADDER) & CONTENT TRANSFORMATION
          ========================================================================= */}
      <section className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none">
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              SEARCH OPPORTUNITY MAP
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Priority Ladder &amp; Content Morph
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Prioritizing high-intent keywords and transforming raw content into structured semantic assets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Priority Ladder */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-[#7A6A5F] border-b border-[#f7d7b0] pb-3">
                <span>PRIORITY LADDER &uarr;</span>
                <span className="text-[#2e936f]">KEYWORD + INTENT ALIGNMENT</span>
              </div>

              <div className="space-y-3">
                {priorityLadderItems.map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-4 rounded-2xl border-2 flex items-center justify-between transition-all duration-300 hover:scale-[1.02]",
                      item.color
                    )}
                  >
                    <div>
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider block">{item.level}</span>
                      <div className="text-xs sm:text-sm font-extrabold font-display">{item.title}</div>
                    </div>
                    <span className="px-3 py-1 rounded-xl bg-white/60 dark:bg-[#101b17]/60 text-[10px] font-mono font-bold">
                      {item.intent}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content Transformation Toggle */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-[2.5rem] bg-white dark:bg-[#101b17] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-[#f7d7b0] pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f15e1c]">
                  CONTENT TRANSFORMATION
                </span>
                <button
                  type="button"
                  onClick={() => setIsContentOptimized(!isContentOptimized)}
                  className="px-3 py-1.5 rounded-xl bg-[#f15e1c] text-white text-[11px] font-mono font-bold hover:bg-[#d44e14] transition-colors"
                >
                  {isContentOptimized ? "VIEW BEFORE" : "VIEW OPTIMIZED"}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {!isContentOptimized ? (
                  <motion.div
                    key="before"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] space-y-2 opacity-70"
                  >
                    <span className="text-[10px] font-mono text-[#7A6A5F] block uppercase">BEFORE: UNSTRUCTURED CONTENT</span>
                    <div className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff]">Generic Page Title</div>
                    <p className="text-[11px] text-[#7A6A5F] leading-tight">
                      Raw body copy with missing H1/H2 tags, missing JSON-LD schema, slow load speed.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="after"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 rounded-2xl bg-[#e8f5f1] dark:bg-[#192a24] border-2 border-[#2e936f] space-y-2 shadow-md"
                  >
                    <span className="text-[10px] font-mono font-bold text-[#2e936f] block uppercase">AFTER: OPTIMIZED SEMANTIC ASSET</span>
                    <div className="text-xs font-bold text-[#2e936f]">✓ High-Intent Title &amp; JSON-LD Schema</div>
                    <p className="text-[11px] text-[#1b2823] dark:text-[#ffffff] leading-tight">
                      Sub-second Core Web Vitals, mobile-first crawl, structured H2/H3 headers, high topical relevance.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          4. PERFORMANCE METRIC — 99/100 TECHNICAL QUALITY BAR
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#fefaf5] dark:bg-[#172420] select-none">
        <div className="max-w-[1536px] mx-auto space-y-10">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              PERFORMANCE BENCHMARK
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              99/100 Technical SEO Quality Bar
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Sub-second Core Web Vitals, mobile-first crawl architecture, and zero white-hat compliance risk.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: 99,
                suffix: "/100",
                label: "Technical SEO Score",
                desc: "Core Web Vitals tuning",
                icon: <FileCode className="w-5 h-5 text-[#f15e1c]" />,
              },
              {
                value: 3.4,
                suffix: "x",
                decimals: 1,
                label: "Organic Traffic Growth",
                desc: "Enterprise domain scaling",
                icon: <Globe2 className="w-5 h-5 text-[#2e936f]" />,
              },
              {
                value: 1,
                prefix: "#",
                suffix: " Rank",
                label: "Local 3-Pack Goal",
                desc: "Geotargeted map visibility",
                icon: <Target className="w-5 h-5 text-[#fab60a]" />,
              },
              {
                value: 100,
                suffix: "%",
                label: "White-Hat Guarantee",
                desc: "Strict search safety",
                icon: <CheckCircle2 className="w-5 h-5 text-[#f15e1c]" />,
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
                        decimals={stat.decimals || 0}
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
          5. 5-STAGE SEARCH OPTIMIZATION FRAMEWORK (VERTICAL SEARCH ASCENT)
          ========================================================================= */}
      <section
        ref={timelineContainerRef}
        className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none"
      >
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              SEARCH OPTIMIZATION TIMELINE
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              5-Stage Search Optimization Framework
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              A discover &rarr; plan &rarr; optimize &rarr; authority &rarr; measure methodology cycling back to continuous refinement.
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

          {/* Active Stage Content */}
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
                      STAGE {activeWorkStep.step} / 05 &bull; {activeWorkStep.subtitle}
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

                <div className="pt-3 border-t border-[#f7d7b0] dark:border-[#253630] flex items-center justify-between text-xs font-mono font-bold text-[#f15e1c]">
                  <span>CONTINUOUS SEARCH CYCLE</span>
                  <span>STAGE 05 LOOPS BACK TO STAGE 01 &rarr;</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =========================================================================
          6. CONTINUOUS SEARCH CYCLE (SIGNATURE VISUAL MOMENT)
          ========================================================================= */}
      <section
        ref={loopContainerRef}
        className="relative py-28 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] select-none"
      >
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              CONTINUOUS SEARCH CYCLE
            </Badge>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Continuous Search Intelligence Cycle
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              SEO is not a one-time audit. Search intent and keyword visibility cycle continuously back into strategy refinement.
            </p>
          </div>

          {/* Circular Iteration Loop Display */}
          <div className="relative rounded-[3rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-8 sm:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-radial from-[#f15e1c]/10 via-transparent to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
              {continuousSearchCycleSteps.map((step, idx) => {
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
              <span>DISCOVER &rarr; AUDIT &rarr; PLAN &rarr; OPTIMIZE &rarr; AUTHORITY &rarr; MEASURE &rarr; REFINE &rarr; DISCOVER AGAIN</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. EDITORIAL SEARCH DISCOVERY PHILOSOPHY (SCROLL BLUR TYPOGRAPHY)
          ========================================================================= */}
      <section
        ref={missionRef}
        className="relative py-28 px-4 sm:px-6 md:px-8 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#ffffff] dark:bg-[#101b17] overflow-hidden select-none"
      >
        {/* Subtle Background Parallax Typography */}
        <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between py-8 opacity-5 dark:opacity-10 font-display font-black text-7xl sm:text-9xl text-[#1b2823] dark:text-[#ffffff] tracking-tighter">
          <motion.div style={{ x: backgroundTextX1 }} className="whitespace-nowrap">
            DISCOVER &bull; INTENT &bull; RELEVANCE
          </motion.div>
          <motion.div style={{ x: backgroundTextX2 }} className="whitespace-nowrap text-right">
            AUTHORITY &bull; VISIBILITY &bull; GROWTH
          </motion.div>
        </div>

        <div className="max-w-[1536px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div ref={statementRef} className="lg:col-span-7 space-y-6 text-left">
            <Badge variant="secondary" size="md">
              SEARCH DISCOVERY PHILOSOPHY
            </Badge>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isStatementInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-[1.12] tracking-tight"
            >
              Making your business discoverable when <span className="text-[#f15e1c]">your customers are searching.</span>
            </motion.h2>

            <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
              Arav Innovations combines search intent analysis, technical Core Web Vitals optimization, and high-authority editorial outreach to capture high-intent organic traffic.
            </p>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-6 flex flex-col justify-between items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-radial from-[#f15e1c]/15 via-[#2e936f]/10 to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center gap-2 pt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]">
                  SEARCH ASCENT ENGINE
                </span>
              </div>

              <div className="my-auto space-y-2 relative z-10">
                <span className="text-3xl sm:text-4xl font-extrabold font-display text-[#f15e1c]">
                  DISCOVERABLE
                </span>
                <span className="text-xs font-mono font-bold text-[#2e936f] block">
                  BRAND RISING THROUGH SEARCH
                </span>
              </div>

              <span className="relative z-10 text-[11px] font-mono font-bold text-[#2e936f] pb-1">
                TOPICAL AUTHORITY ASCENT
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
                SEO &amp; Organic Search Growth Partner
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
              Leading Arav Innovations with data-driven search strategy, Aryan Sayal guides SEO engineering and editorial teams across India and the UAE to achieve sustainable organic growth and market dominance.
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
          {/* Connector Flow Header: INVISIBLE -> DISCOVERABLE -> RELEVANT -> VISIBLE -> AUTHORITATIVE -> GROWING */}
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-widest block">
              THE SEARCH JOURNEY CULMINATION
            </span>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0] flex-wrap">
              <span>INVISIBLE</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>DISCOVERABLE</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>RELEVANT</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>VISIBLE</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span>AUTHORITATIVE</span>
              <span className="text-[#f15e1c]">&rarr;</span>
              <span className="text-[#2e936f]">GROWING</span>
            </div>
          </div>

          <div className="rounded-[3rem] bg-gradient-to-br from-[#f15e1c] via-[#e55215] to-[#d8480d] text-white p-10 sm:p-16 border-2 border-[#fab60a] shadow-2xl space-y-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
                <Sparkles className="w-4 h-4 text-[#ffec69]" />
                <span>ACCELERATE ORGANIC GROWTH</span>
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
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> 99/100 Core Web Vitals
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> 100% White-Hat Guarantee
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
        <div className="flex items-center justify-center gap-4 text-xs sm:text-sm font-mono font-extrabold text-[#7A6A5F] dark:text-[#B8ACA0] tracking-widest flex-wrap px-4">
          <span>INVISIBLE</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>DISCOVERABLE</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>RELEVANT</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>VISIBLE</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>AUTHORITATIVE</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>GROWING</span>
        </div>
      </footer>
    </div>
  );
}

export default SEOInteractivePage;
