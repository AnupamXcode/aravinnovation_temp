"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion, useInView, useScroll, useTransform } from "framer-motion";
import {
  TrendingUp,
  Search,
  Users2,
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Quote,
  Star,
  Globe2,
  Zap,
  Target,
  Megaphone,
  Share2,
  ArrowUpRight,
  Play,
  RefreshCw,
  Eye,
  MousePointerClick,
  PieChart,
  Layers,
  Activity,
  Filter,
  Check,
} from "lucide-react";
import { Service } from "@/data/services";
import { caseStudiesData } from "@/data/case-studies";
import { testimonialsData } from "@/data/testimonials";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DigitalMarketingPageProps {
  service: Service;
}

// -----------------------------------------------------------------------------
// 1. Metric Count-Up Component (Viewport triggered, easeOut, upward arrow micro-motion)
// -----------------------------------------------------------------------------
function MetricCountUp({
  value,
  label,
  sublabel,
  className,
}: {
  value: string;
  label: string;
  sublabel?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = React.useState<string>("0");
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    const match = value.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(match[1]);
    const suffix = match[2] || "";
    const isFloat = match[1].includes(".");
    const decimals = isFloat ? match[1].split(".")[1]?.length || 1 : 0;

    let animationFrameId: number;
    const duration = 1500;
    const startTime = performance.now();

    const updateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * eased;

      setDisplayValue(current.toFixed(decimals) + suffix);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(targetNum.toFixed(decimals) + suffix);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, shouldReduceMotion]);

  return (
    <div ref={ref} className={cn("flex flex-col text-left", className)}>
      <div className="flex items-center gap-1.5">
        <span className="text-3xl sm:text-4xl font-black font-mono text-[#f15e1c] tracking-tight">
          {displayValue}
        </span>
        <motion.span
          initial={{ opacity: 0, y: 4, scale: 0.8 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.3 }}
          className="text-[#2e936f] text-base font-extrabold"
        >
          ↗
        </motion.span>
      </div>
      <span className="text-xs font-mono font-bold text-[#4a5c55] dark:text-[#d3eee4] leading-tight mt-0.5">
        {label}
      </span>
      {sublabel && (
        <span className="text-[10px] font-mono text-[#7A6A5F] dark:text-[#B8ACA0] mt-0.5">
          {sublabel}
        </span>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// 2. Magnetic Button Component (Smooth spring tracking & background wipe)
// -----------------------------------------------------------------------------
function MagneticButton({
  children,
  className,
  onClick,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const buttonRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || typeof window === "undefined" || window.innerWidth < 768) return;
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.25;
    const y = (e.clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 220, damping: 16, mass: 0.4 }}
      className={cn("inline-block relative group cursor-pointer", className)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );

  if (href) {
    if (href.startsWith("#") || href.startsWith("http")) {
      return <a href={href}>{content}</a>;
    }
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

// -----------------------------------------------------------------------------
// Data Collections
// -----------------------------------------------------------------------------
const marketingSolutionsData = [
  {
    numStr: "01",
    title: "SEO & Content Strategy",
    subtitle: "Organic Search Dominance & Topical Authority",
    description:
      "We optimize your website’s content and structure to improve search engine visibility, build topical authority, and engage high-intent B2B decision-makers.",
    icon: <Search className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Technical SEO & Core Web Vitals Optimization",
      "Topical Authority Content Hubs & Keyword Clusters",
      "On-Page & Programmatic Indexing Strategy",
      "High-Authority Backlink & Digital PR Outreach",
    ],
    metric: "3.4x",
    metricLabel: "Organic Traffic & Lead Uplift",
    stageName: "SEARCH VISIBILITY",
    route: "/services/seo-services",
  },
  {
    numStr: "02",
    title: "Social Media & Email Marketing",
    subtitle: "Audience Nurturing & Brand Engagement",
    description:
      "We help you build a strong presence on social media, engaging with your audience and creating meaningful connections through targeted nurture sequences.",
    icon: <Users2 className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Executive LinkedIn Thought Leadership Campaigns",
      "Automated Lifecycle Email Nurture Workflows",
      "Multi-Channel Community Management",
      "High-Converting Lead Magnet Assets",
    ],
    metric: "450%",
    metricLabel: "Audience Engagement Growth",
    stageName: "COMMUNITY & ENGAGEMENT",
    route: "/services/digital-marketing-brand-development",
  },
  {
    numStr: "03",
    title: "PPC & Campaign Management",
    subtitle: "High-Intent Customer Acquisition",
    description:
      "From Google Ads to social media campaigns, we create and manage targeted PPC campaigns that reach potential customers at the right time and place.",
    icon: <Megaphone className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Google Search & Display Performance Max Ads",
      "LinkedIn ABM Target Account Campaigns",
      "Retargeting & Dynamic Audience Funnels",
      "Continuous Conversion Rate Optimization (CRO)",
    ],
    metric: "42%",
    metricLabel: "Reduction in Cost Per Acquisition",
    stageName: "PAID CAMPAIGNS",
    route: "/services/digital-marketing-brand-development",
  },
  {
    numStr: "04",
    title: "Key Benefits",
    subtitle: "Closed-Loop Revenue Attribution",
    description:
      "Targeted outreach, improved lead quality, and a measurable boost in sales with 100% transparent ROI tracking.",
    icon: <TrendingUp className="w-6 h-6 text-[#f15e1c]" />,
    deliverables: [
      "Full Pipeline & Closed-Loop CRM Attribution",
      "Predictable Monthly Lead Velocity",
      "Enhanced Brand Market Recognition",
      "Maximum Return on Ad Spend (ROAS)",
    ],
    metric: "100%",
    metricLabel: "Closed-Loop Attribution",
    stageName: "MEASURABLE GROWTH",
    route: "/services/digital-marketing-brand-development",
  },
];

const howWeWorkSteps = [
  {
    step: "01",
    title: "Research and Strategize",
    description:
      "We start with a deep dive into your brand, competitors, and target audience, laying a strong foundation for a data-driven, customized digital marketing strategy.",
    output: "Audience Blueprint & Competitor Matrix",
    tag: "AWARENESS",
  },
  {
    step: "02",
    title: "Content Creation and Optimization",
    description:
      "Our team creates engaging, SEO-optimized content and designs social media campaigns that resonate with your audience and reflect your brand voice.",
    output: "Topical Content Hubs & Ad Creatives",
    tag: "INTEREST",
  },
  {
    step: "03",
    title: "Launch and Manage Campaigns",
    description:
      "We execute targeted PPC campaigns and manage social media channels, ensuring seamless, consistent brand messaging across platforms.",
    output: "Omnichannel Campaign Execution",
    tag: "ENGAGEMENT",
  },
  {
    step: "04",
    title: "Analyze and Refine",
    description:
      "Through comprehensive analytics, we monitor performance, refine strategies, and continuously optimize for better engagement and results.",
    output: "Feedback Loop & Closed-Loop ROAS Tuning",
    tag: "CONVERSION",
  },
];

const contentCapabilitiesMosaic = [
  {
    title: "SEO & Topical Authority Hubs",
    category: "SEARCH ENGINE OPTIMIZATION",
    metric: "+248% Organic Reach",
    icon: <Search className="w-5 h-5 text-[#f15e1c]" />,
    span: "col-span-1 md:col-span-2 lg:col-span-2",
  },
  {
    title: "Executive LinkedIn Thought Leadership",
    category: "BRAND POSITIONING",
    metric: "14.2k B2B Decision Makers",
    icon: <Users2 className="w-5 h-5 text-[#2e936f]" />,
    span: "col-span-1 md:col-span-1 lg:col-span-1",
  },
  {
    title: "Performance PPC & ABM Ad Campaigns",
    category: "PAID ACQUISITION",
    metric: "4.8x Return On Ad Spend",
    icon: <Megaphone className="w-5 h-5 text-[#fab60a]" />,
    span: "col-span-1 md:col-span-1 lg:col-span-1",
  },
  {
    title: "Automated Email & Lifecycle Nurture",
    category: "RETENTION & CONVERSION",
    metric: "42% Conversion Rate",
    icon: <Target className="w-5 h-5 text-[#f15e1c]" />,
    span: "col-span-1 md:col-span-2 lg:col-span-2",
  },
];

const circularLoopNodes = [
  { step: "01", name: "RESEARCH", icon: <Search className="w-4 h-4" />, angle: 0 },
  { step: "02", name: "CONTENT", icon: <Layers className="w-4 h-4" />, angle: 72 },
  { step: "03", name: "CAMPAIGN", icon: <Megaphone className="w-4 h-4" />, angle: 144 },
  { step: "04", name: "DATA", icon: <BarChart3 className="w-4 h-4" />, angle: 216 },
  { step: "05", name: "OPTIMIZE", icon: <RefreshCw className="w-4 h-4" />, angle: 288 },
];

const marqueeKeywords = [
  "SEO",
  "CONTENT",
  "SOCIAL",
  "PPC",
  "BRAND",
  "ANALYTICS",
  "CONVERSION",
  "GROWTH",
  "RETARGETING",
  "ATTRIBUTION",
  "OPTIMIZATION",
  "DEMAND GEN",
];

const ctaWords = ["engaging", "innovative", "strategic", "outstanding", "exceptional"];

export function DigitalMarketingInteractivePage({ service }: DigitalMarketingPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeSolutionIdx, setActiveSolutionIdx] = React.useState<number>(0);
  const [activeWorkIdx, setActiveWorkIdx] = React.useState<number>(0);
  const [currentWordIdx, setCurrentWordIdx] = React.useState<number>(0);

  // ---------------------------------------------------------------------------
  // Hero Mouse Parallax State (Disabled on mobile)
  // ---------------------------------------------------------------------------
  const heroRef = React.useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || typeof window === "undefined" || window.innerWidth < 768) return;
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    setMousePos({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // ---------------------------------------------------------------------------
  // Scroll Parallax for Growth Philosophy Section
  // ---------------------------------------------------------------------------
  const philosophyRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: philosophyRef,
    offset: ["start end", "end start"],
  });
  const backgroundTextX1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const backgroundTextX2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  // InView hooks
  const statementRef = React.useRef<HTMLDivElement>(null);
  const isStatementInView = useInView(statementRef, { once: true, margin: "-100px" });

  const testimonialRef = React.useRef<HTMLDivElement>(null);
  const isTestimonialInView = useInView(testimonialRef, { once: true, margin: "-80px" });

  // Rotating CTA Word Timer
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIdx((prev) => (prev + 1) % ctaWords.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const activeSolution = marketingSolutionsData[activeSolutionIdx];
  const totalSolutions = marketingSolutionsData.length;

  const testimonial = testimonialsData.find((t) => t.id === "test-1") || testimonialsData[0];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#12100E] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden selection:bg-[#f15e1c]/20 selection:text-[#f15e1c]">
      {/* =========================================================================
          1. HERO — LIVING GROWTH ENGINE (KINETIC TYPOGRAPHY + FLOATING METRICS + PARALLAX)
          ========================================================================= */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-[94vh] flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] overflow-hidden"
      >
        {/* Layer 0: Background Parallax (Very Slow: factor 8) */}
        <motion.div
          animate={shouldReduceMotion ? {} : { x: mousePos.x * 8, y: mousePos.y * 8 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-20"
        >
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <defs>
              <linearGradient id="hero-marketing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f15e1c" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#fab60a" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#2e936f" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            <line x1="600" y1="380" x2="180" y2="190" stroke="url(#hero-marketing-grad)" strokeWidth="1.5" strokeDasharray="6 6" />
            <line x1="600" y1="380" x2="1020" y2="190" stroke="url(#hero-marketing-grad)" strokeWidth="1.5" strokeDasharray="6 6" />
            <line x1="600" y1="380" x2="220" y2="580" stroke="url(#hero-marketing-grad)" strokeWidth="1.5" strokeDasharray="6 6" />
            <line x1="600" y1="380" x2="980" y2="580" stroke="url(#hero-marketing-grad)" strokeWidth="1.5" strokeDasharray="6 6" />
          </svg>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-radial from-[#f15e1c]/15 via-transparent to-transparent blur-3xl rounded-full" />
          <div className="absolute bottom-1/3 right-1/4 w-[550px] h-[550px] bg-radial from-[#2e936f]/12 via-transparent to-transparent blur-3xl rounded-full" />
        </motion.div>

        {/* Layer 1: Floating Marketing Data Elements (Medium: factor 20) */}
        <motion.div
          animate={shouldReduceMotion ? {} : { x: mousePos.x * 20, y: mousePos.y * 20 }}
          transition={{ type: "spring", stiffness: 90, damping: 22 }}
          className="absolute inset-0 pointer-events-none z-0 hidden lg:block overflow-hidden"
        >
          {/* Badge 1: Top-Left ROAS Widget */}
          <div className="absolute top-28 left-8 sm:left-16 p-3 rounded-2xl bg-white/80 dark:bg-[#172420]/80 backdrop-blur-md border border-[#f7d7b0] dark:border-[#253630] shadow-lg flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#f15e1c]/10 text-[#f15e1c]">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-extrabold text-[#f15e1c]">+248% ROAS</div>
              <div className="text-[10px] font-mono text-[#7A6A5F] dark:text-[#B8ACA0]">Paid Acquisition</div>
            </div>
          </div>

          {/* Badge 2: Top-Right Audience Signal */}
          <div className="absolute top-32 right-10 sm:right-20 p-3 rounded-2xl bg-white/80 dark:bg-[#172420]/80 backdrop-blur-md border border-[#f7d7b0] dark:border-[#253630] shadow-lg flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2e936f] animate-ping" />
            <div>
              <div className="text-xs font-mono font-extrabold text-[#1b2823] dark:text-[#ffffff]">14.2k Signals</div>
              <div className="text-[10px] font-mono text-[#2e936f]">High-Intent B2B Reach</div>
            </div>
          </div>

          {/* Badge 3: Bottom-Left CAC Pill */}
          <div className="absolute bottom-36 left-12 p-3 rounded-2xl bg-white/80 dark:bg-[#172420]/80 backdrop-blur-md border border-[#f7d7b0] dark:border-[#253630] shadow-lg flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#2e936f]/10 text-[#2e936f]">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-extrabold text-[#2e936f]">CAC -35%</div>
              <div className="text-[10px] font-mono text-[#7A6A5F] dark:text-[#B8ACA0]">Cost Efficiency</div>
            </div>
          </div>

          {/* Badge 4: Bottom-Right LTV Multiple */}
          <div className="absolute bottom-32 right-16 p-3 rounded-2xl bg-white/80 dark:bg-[#172420]/80 backdrop-blur-md border border-[#f7d7b0] dark:border-[#253630] shadow-lg flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#fab60a]/10 text-[#fab60a]">
              <PieChart className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-extrabold text-[#1b2823] dark:text-[#ffffff]">LTV / CAC 4.2x</div>
              <div className="text-[10px] font-mono text-[#f15e1c]">Closed-Loop Velocity</div>
            </div>
          </div>

          {/* Floating Subtle Indicators */}
          <span className="absolute top-1/2 left-24 text-xs font-mono font-bold text-[#f15e1c]/40 animate-pulse">CTR 4.8% ↗</span>
          <span className="absolute top-2/3 right-32 text-xs font-mono font-bold text-[#2e936f]/40 animate-pulse">Conversion +89%</span>
        </motion.div>

        {/* Top Breadcrumb & Badge */}
        <div className="relative z-10 max-w-[1536px] mx-auto w-full space-y-4">
          <Breadcrumb
            items={[
              { label: "Services", href: "/services" },
              { label: "Digital Marketing & Brand Development" },
            ]}
          />
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ARAV DIGITAL GROWTH ENGINE</span>
          </motion.div>
        </div>

        {/* Main Kinetic Typography Headline (Subtle Word-Group Stagger Reveal) */}
        <motion.div
          animate={shouldReduceMotion ? {} : { x: mousePos.x * 4, y: mousePos.y * 4 }}
          transition={{ type: "spring", stiffness: 100, damping: 25 }}
          className="relative z-10 max-w-5xl mx-auto w-full my-auto text-center space-y-6 pt-6 pb-10"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight leading-[1.08] text-[#1b2823] dark:text-[#ffffff]">
            <motion.span
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              Building Brands,
            </motion.span>{" "}
            <motion.span
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-[#f15e1c]"
            >
              Driving Growth
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg sm:text-xl text-[#4a5c55] dark:text-[#d3eee4] max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Omnichannel performance marketing, technical SEO, high-intent campaign management, and closed-loop ROI optimization.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton href="#inquire">
              <Button3D
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />}
                className="w-full sm:w-auto justify-center shadow-xl shadow-[#f15e1c]/25"
              >
                Inquire About Growth Strategy
              </Button3D>
            </MagneticButton>
            <MagneticButton href="/case-studies">
              <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center">
                View Growth Case Studies
              </Button3D>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="relative z-10 text-center pb-2">
          <a href="#our-solutions" className="inline-flex flex-col items-center gap-2 group cursor-pointer">
            <span className="text-xs font-mono font-bold tracking-widest text-[#7A6A5F] dark:text-[#B8ACA0] group-hover:text-[#f15e1c] transition-colors">
              SCROLL TO EXPLORE GROWTH SYSTEM
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-[#f7d7b0] dark:border-[#253630] flex items-start justify-center p-1.5">
              <div className="w-1.5 h-3 rounded-full bg-[#f15e1c] animate-bounce" />
            </div>
          </a>
        </div>
      </section>

      {/* =========================================================================
          2. HORIZONTAL BRAND MARQUEE (SLOW CONTINUOUS TICKER)
          ========================================================================= */}
      <section className="relative py-4 bg-[#fefaf5] dark:bg-[#172420] border-b border-[#f7d7b0]/60 dark:border-[#253630] overflow-hidden select-none">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
          {[...marqueeKeywords, ...marqueeKeywords].map((word, idx) => (
            <div key={idx} className="flex items-center gap-8 text-xs font-mono font-extrabold text-[#7A6A5F] dark:text-[#B8ACA0]">
              <span className="tracking-widest hover:text-[#f15e1c] transition-colors">{word}</span>
              <span className="text-[#f15e1c] text-xs">&bull;</span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. OUR SOLUTIONS & SIGNATURE MARKETING FUNNEL (AUDIENCE JOURNEY)
          ========================================================================= */}
      <section id="our-solutions" className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-[1536px] mx-auto space-y-12 select-none">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              OUR SOLUTIONS
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Elevate your brand and expand your Reach
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Select or click below to explore each marketing workstream and its connected audience pathway.
            </p>
          </div>

          {/* Signature Interactive Marketing Funnel Container */}
          <div className="rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-radial from-[#f15e1c]/8 via-transparent to-transparent pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#f7d7b0] dark:border-[#253630]">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#f15e1c] text-white shadow-lg shadow-[#f15e1c]/25 shrink-0">
                  {activeSolution.icon}
                </div>
                <div>
                  <span className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-wider block">
                    SOLUTION {activeSolution.numStr} / 0{totalSolutions} &bull; {activeSolution.stageName}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                    {activeSolution.title}
                  </h3>
                </div>
              </div>

              {/* Viewport Metric Count-Up Badge */}
              <div className="bg-white dark:bg-[#101b17] px-5 py-3 rounded-2xl border border-[#f7d7b0] dark:border-[#253630] shadow-xs">
                <MetricCountUp value={activeSolution.metric} label={activeSolution.metricLabel} sublabel="Verified Outcome" />
              </div>
            </div>

            {/* Signature Interaction 1: 4-Stage Marketing Funnel Journey */}
            <div className="relative py-6 px-4 bg-white dark:bg-[#101b17] rounded-3xl border border-[#f7d7b0] dark:border-[#253630] overflow-hidden">
              <div className="text-center pb-4">
                <span className="text-[11px] font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0] uppercase tracking-widest block">
                  AUDIENCE CONVERSION PATHWAY
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
                {[
                  { stage: "01", label: "CONTENT / AD", sub: "Brand Message" },
                  { stage: "02", label: "TARGET AUDIENCE", sub: "High-Intent Reach" },
                  { stage: "03", label: "ENGAGEMENT", sub: "Click & Nurture" },
                  { stage: "04", label: "CONVERSION", sub: "Pipeline Lead / Sale" },
                ].map((node, i) => {
                  const isCurrentActive = i === activeSolutionIdx;
                  const isPassed = i <= activeSolutionIdx;
                  return (
                    <motion.div
                      key={i}
                      onClick={() => setActiveSolutionIdx(i)}
                      whileHover={{ scale: 1.02 }}
                      className={cn(
                        "p-4 rounded-2xl border transition-all duration-300 cursor-pointer space-y-1 relative text-center",
                        isCurrentActive
                          ? "bg-[#fefaf5] dark:bg-[#172420] border-[#f15e1c] shadow-lg ring-2 ring-[#f15e1c]/30"
                          : isPassed
                          ? "bg-white dark:bg-[#101b17] border-[#2e936f] opacity-90"
                          : "bg-white dark:bg-[#101b17] border-[#f7d7b0] dark:border-[#253630] opacity-50"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className={cn("text-[10px] font-mono font-black", isPassed ? "text-[#f15e1c]" : "text-[#7A6A5F]")}>
                          STAGE {node.stage}
                        </span>
                        {isCurrentActive && <span className="w-2 h-2 rounded-full bg-[#f15e1c] animate-ping" />}
                      </div>
                      <div className="text-xs font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-tight pt-1">
                        {node.label}
                      </div>
                      <span className="text-[10px] text-[#2e936f] font-semibold block">{node.sub}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Description & Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
              <div className="md:col-span-6 space-y-3 text-left">
                <h4 className="text-lg font-bold font-display text-[#f15e1c]">
                  {activeSolution.subtitle}
                </h4>
                <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                  {activeSolution.description}
                </p>
              </div>

              <div className="md:col-span-6 space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f15e1c] block">
                  Key Deliverable Scope
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]">
                  {activeSolution.deliverables.map((del, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] shadow-2xs group"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="truncate">{del}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Service Selection Tabs (Fast 250-350ms transition) */}
            <div className="pt-6 border-t border-[#f7d7b0] dark:border-[#253630] space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {marketingSolutionsData.map((sol, idx) => (
                  <button
                    key={sol.numStr}
                    type="button"
                    onClick={() => setActiveSolutionIdx(idx)}
                    className={cn(
                      "py-3 px-3 rounded-xl text-xs font-bold text-center transition-all duration-300 cursor-pointer truncate",
                      activeSolutionIdx === idx
                        ? "bg-[#f15e1c] text-white shadow-md shadow-[#f15e1c]/20"
                        : "bg-white dark:bg-[#101b17] text-[#4a5c55] dark:text-[#d3eee4] border border-[#f7d7b0] dark:border-[#253630] hover:border-[#f15e1c] hover:translate-y-[-2px]"
                    )}
                  >
                    0{idx + 1} {sol.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CONTENT CREATION MOSAIC TILE REVEAL
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] bg-[#ffffff] dark:bg-[#101b17]">
        <div className="max-w-[1536px] mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              CONTENT &amp; BRAND CAPABILITIES
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              High-Converting Brand Assets
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              Data-backed content creation tailored for maximum B2B engagement and search engine dominance.
            </p>
          </div>

          {/* Mosaic Tile Grid Stagger Reveal */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {contentCapabilitiesMosaic.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className={cn(
                  "p-8 rounded-[2rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-md hover:border-[#f15e1c] transition-all duration-300 space-y-4 group relative overflow-hidden",
                  item.span
                )}
              >
                {/* Background Hover Wipe */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#f15e1c]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex items-center justify-between relative z-10">
                  <span className="text-[10px] font-mono font-extrabold text-[#f15e1c] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:translate-x-1.5 transition-transform duration-300 relative z-10">
                  {item.title}
                </h3>

                <div className="pt-2 flex items-center justify-between border-t border-[#f7d7b0] dark:border-[#253630] relative z-10">
                  <span className="text-xs font-mono font-extrabold text-[#2e936f]">
                    {item.metric}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#f15e1c] group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. GROWTH PHILOSOPHY — EDITORIAL STATEMENT WITH SCROLL PARALLAX TYPOGRAPHY
          ========================================================================= */}
      <section
        ref={philosophyRef}
        className="relative py-28 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630] overflow-hidden"
      >
        {/* Low-Opacity Scroll Parallax Typography Words Behind Content */}
        <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between py-8 opacity-5 dark:opacity-10 select-none overflow-hidden font-display font-black text-7xl sm:text-9xl text-[#1b2823] dark:text-[#ffffff] tracking-tighter">
          <motion.div style={{ x: backgroundTextX1 }} className="whitespace-nowrap">
            GROW &bull; OPTIMIZE &bull; CONVERT
          </motion.div>
          <motion.div style={{ x: backgroundTextX2 }} className="whitespace-nowrap text-right">
            SCALE &bull; ATTRIBUTE &bull; REPEAT
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Large Editorial Statement */}
          <div ref={statementRef} className="lg:col-span-7 space-y-6 text-left">
            <Badge variant="secondary" size="md">
              GROWTH PHILOSOPHY
            </Badge>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isStatementInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-[1.12] tracking-tight"
            >
              Helping businesses grow through <span className="text-[#f15e1c]">strategic digital marketing</span>, meaningful content, targeted campaigns, and continuous optimization.
            </motion.h2>

            <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
              We replace superficial ad impressions with closed-loop pipeline metrics, turning campaign traffic into predictable B2B sales revenue.
            </p>
          </div>

          {/* Right Column: Signature Interaction 2: "DIGITAL GROWTH ENGINE" Circular Loop */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-6 flex flex-col justify-between items-center text-center overflow-hidden">
              <div className="absolute inset-0 bg-radial from-[#f15e1c]/15 via-[#2e936f]/10 to-transparent pointer-events-none" />

              <div className="relative z-10 flex items-center gap-2 pt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]">
                  DIGITAL GROWTH ENGINE
                </span>
              </div>

              {/* Circular SVG Loop with Moving Data Signal Particle */}
              <div className="relative w-56 h-56 my-auto flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="38" stroke="#f7d7b0" strokeWidth="2.5" fill="none" className="dark:stroke-[#253630]" />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="#f15e1c"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="60 180"
                    animate={shouldReduceMotion ? {} : { rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    style={{ transformOrigin: "50px 50px" }}
                  />
                </svg>

                {/* Node Icons positioned on circular perimeter */}
                {circularLoopNodes.map((node, i) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const radius = 68; // px
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;

                  return (
                    <div
                      key={i}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                      className="absolute p-2 rounded-full bg-white dark:bg-[#101b17] border border-[#f15e1c] text-[#f15e1c] shadow-md flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform"
                      title={node.name}
                    >
                      {node.icon}
                    </div>
                  );
                })}

                {/* Center Core Badge */}
                <div className="absolute text-center p-3 rounded-2xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] shadow-sm">
                  <span className="text-[10px] font-mono font-extrabold text-[#2e936f] block">CLOSED-LOOP</span>
                  <span className="text-xs font-black font-display text-[#1b2823] dark:text-[#ffffff]">ENGINE</span>
                </div>
              </div>

              <span className="relative z-10 text-[11px] font-mono font-bold text-[#2e936f] pb-1">
                CONTINUOUS FEEDBACK LOOP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. 4-STAGE GROWTH FRAMEWORK (HORIZONTAL PROGRESS TIMELINE & FEEDBACK LOOP)
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-[1536px] mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="secondary" size="md">
              HOW WE WORK?
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              4-Stage Growth Framework
            </h2>
            <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
              A disciplined marketing methodology creating a continuous feedback loop from audience research to ad optimization.
            </p>
          </div>

          {/* Horizontal Campaign Performance Timeline Progress Bar */}
          <div className="relative max-w-4xl mx-auto hidden sm:block py-4">
            <div className="relative w-full bg-[#f7d7b0] dark:bg-[#253630] h-2 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${((activeWorkIdx + 1) / 4) * 100}%` }}
                transition={{ duration: 0.4 }}
                className="h-full bg-gradient-to-r from-[#f15e1c] via-[#fab60a] to-[#2e936f]"
              />
            </div>
            <div className="flex justify-between items-center absolute inset-x-0 -top-2">
              {howWeWorkSteps.map((step, idx) => {
                const isActive = activeWorkIdx === idx;
                const isPassed = idx <= activeWorkIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveWorkIdx(idx)}
                    className={cn(
                      "w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center text-[10px] font-bold cursor-pointer",
                      isActive
                        ? "bg-[#f15e1c] border-white text-white scale-125 shadow-md shadow-[#f15e1c]/40 ring-4 ring-[#f15e1c]/20"
                        : isPassed
                        ? "bg-[#2e936f] border-white text-white"
                        : "bg-white dark:bg-[#101b17] border-[#f7d7b0] dark:border-[#253630] text-[#7A6A5F]"
                    )}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {howWeWorkSteps.map((wf, idx) => {
              const isActive = activeWorkIdx === idx;
              return (
                <motion.div
                  key={wf.step}
                  onClick={() => setActiveWorkIdx(idx)}
                  onMouseEnter={() => setActiveWorkIdx(idx)}
                  whileHover={{ y: -4 }}
                  className={cn(
                    "rounded-3xl p-7 border-2 transition-all duration-300 cursor-pointer space-y-4 relative flex flex-col justify-between min-h-[310px]",
                    isActive
                      ? "bg-white dark:bg-[#101b17] border-[#f15e1c] shadow-2xl ring-4 ring-[#f15e1c]/20 scale-102 z-20"
                      : "bg-[#fefaf5] dark:bg-[#172420] border-[#f7d7b0] dark:border-[#253630] opacity-70 hover:opacity-100"
                  )}
                >
                  <div className="space-y-3 text-left">
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-mono font-black",
                          isActive ? "bg-[#f15e1c] text-white" : "bg-[#fce3d3] text-[#f15e1c]"
                        )}
                      >
                        STAGE {wf.step}
                      </span>
                      <span className="text-[10px] font-mono font-extrabold text-[#2e936f] uppercase">
                        {wf.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {wf.title}
                    </h3>

                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                      {wf.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630] text-left">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#7A6A5F] block">
                      Deliverable Outcome:
                    </span>
                    <span className="text-xs font-bold text-[#f15e1c] mt-0.5 block">
                      {wf.output}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Continuous Optimization Feedback Loop Visualizer Banner */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="p-5 rounded-2xl bg-[#fce3d3] dark:bg-[#261f1a] border border-[#f7d7b0] text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 shadow-sm"
          >
            <div className="p-2 rounded-xl bg-[#f15e1c] text-white">
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
            </div>
            <span className="text-xs font-mono font-extrabold text-[#f15e1c] tracking-wide">
              CONTINUOUS FEEDBACK LOOP: 04 ANALYZE &amp; REFINE &rarr; RE-INJECTS INTO 01 RESEARCH
            </span>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          7. TESTIMONIAL — QUOTE REVEAL & TRUSTWORTHY BADGES
          ========================================================================= */}
      <section ref={testimonialRef} className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <Badge variant="secondary" size="md">
            KIND WORDS FROM OUR CLIENTS
          </Badge>
          <div className="p-8 sm:p-14 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-xl space-y-6 relative overflow-hidden">
            <div className="p-3 rounded-2xl bg-[#f15e1c] text-white w-fit mx-auto shadow-md">
              <Quote className="w-6 h-6" />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isTestimonialInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xl sm:text-3xl font-display font-medium text-[#1b2823] dark:text-[#ffffff] max-w-3xl mx-auto leading-relaxed italic"
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
                Digital Marketing &amp; Brand Strategy Partner
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. ABOUT OUR CEO — EDITORIAL LEADERSHIP PROFILE
          ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#253630]">
        <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-2 border-[#f15e1c] shadow-xl bg-[#fce3d3] dark:bg-[#261f1a] flex items-center justify-center text-center p-6 space-y-2 flex-col">
              <div className="w-20 h-20 rounded-full bg-[#f15e1c] text-white flex items-center justify-center text-2xl font-black font-display shadow-md">
                AS
              </div>
              <div className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                Aryan Sayal
              </div>
              <div className="text-xs font-mono font-bold text-[#f15e1c]">
                CEO &amp; Managing Director
              </div>
              <span className="text-[10px] text-[#2e936f] font-mono">Arav Innovations</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <Badge variant="secondary" size="md">
              About Our CEO
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
              Aryan Sayal
            </h2>
            <p className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase tracking-wider">
              CEO, Arav Innovations
            </p>
            <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
              Leading Arav Innovations with a vision for strategic growth, Aryan Sayal orchestrates multidisciplinary digital marketing and performance engineering squads across India and the UAE to build market-dominating brands.
            </p>
            <div className="pt-2">
              <a
                href="https://www.linkedin.com/company/aravinnovations/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f15e1c] text-white text-xs font-bold shadow-md hover:bg-[#d44e14] transition-colors"
              >
                <Globe2 className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. FINAL CTA — MAGNETIC CTA & LIGHT SWEEP TRANSFORMATIONAL SECTION
          ========================================================================= */}
      <section id="inquire" className="relative py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#f15e1c] via-[#e55215] to-[#d8480d] text-white p-10 sm:p-16 border-2 border-[#fab60a] shadow-2xl space-y-8 text-center relative overflow-hidden">
          {/* Light Sweep Glow Overlay */}
          <div className="absolute inset-0 bg-radial from-white/25 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#ffec69]" />
              <span>START YOUR CAMPAIGN</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
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

            <p className="text-base sm:text-lg font-bold text-white/90">
              Kick start a project with us today
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <MagneticButton href="/contact">
              <Button3D
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />}
                className="w-full sm:w-auto justify-center bg-white text-[#f15e1c] hover:bg-[#f7d7b0]"
              >
                Discuss a Project &rarr;
              </Button3D>
            </MagneticButton>
            <MagneticButton href="https://api.whatsapp.com/send?phone=971521555792&text=Hello%20Arav%20Innovations%2C%20I%27d%20like%20to%20discuss%20a%20project.">
              <Button3D variant="outline" size="lg" className="w-full sm:w-auto justify-center text-white border-white/60 hover:bg-white/10">
                Instant WhatsApp Inquiry
              </Button3D>
            </MagneticButton>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/20 flex flex-wrap items-center justify-center gap-6 text-xs text-white/90 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Guaranteed ROAS Tracking
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> 100% Client Ad Account &amp; IP Ownership
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Dedicated Pods in Gurgaon &amp; Dubai
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. FOOTER FINAL BRAND MOMENT — SUBTLE CLOSING MARQUEE
          ========================================================================= */}
      <footer className="py-6 border-t border-[#f7d7b0]/60 dark:border-[#253630] bg-[#fefaf5] dark:bg-[#172420] overflow-hidden select-none">
        <div className="flex items-center justify-center gap-6 text-xs font-mono font-extrabold text-[#7A6A5F] dark:text-[#B8ACA0] tracking-widest">
          <span>BUILD</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>GROW</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>OPTIMIZE</span>
          <span className="text-[#f15e1c]">&bull;</span>
          <span>SCALE</span>
        </div>
      </footer>
    </div>
  );
}

