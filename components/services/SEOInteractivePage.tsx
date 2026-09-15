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
  Globe2,
  TrendingUp,
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Zap,
  Target,
  Layers,
  RefreshCw,
  Eye,
  ArrowUpRight,
  ChevronDown,
  Cpu,
  BookOpen,
  ShieldCheck,
  Code,
  Compass,
  Users2,
  FileCheck,
} from "lucide-react";
import { Service } from "@/data/services";
import { BlogPost, blogPostsData } from "@/data/insights";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { cn } from "@/lib/utils";

interface SEOPageProps {
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
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#2e936f] to-transparent shadow-[0_0_10px_#2e936f]"
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
          id="seo-dot-matrix-pattern"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#2e936f" opacity="0.6" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#seo-dot-matrix-pattern)" />
      </svg>
    </div>
  );
}

const keywordTags = [
  "Technical SEO",
  "Topical Authority",
  "Answer Engine Optimization",
  "Core Web Vitals",
  "Structured Schema",
  "Organic Growth",
];

const seoSystemNodes = [
  {
    id: "STAGE-01",
    step: "01",
    title: "TECHNICAL FOUNDATION",
    subtitle: "Crawlability & Rendering",
    desc: "Clean site architecture, fast server response, structured sitemaps, and error-free indexing.",
    deliverables: ["Technical Audit Report", "XML Sitemap & Robots Setup", "Core Web Vitals Blueprint"],
  },
  {
    id: "STAGE-02",
    step: "02",
    title: "SEARCH INTENT",
    subtitle: "Query Intent Mapping",
    desc: "Mapping commercial, informational, and transactional query intent behind target buyer searches.",
    deliverables: ["Search Intent Matrix", "High-Intent Keyword Map", "Competitor Gap Analysis"],
  },
  {
    id: "STAGE-03",
    step: "03",
    title: "CONTENT ARCHITECTURE",
    subtitle: "Topic Depth & Hierarchy",
    desc: "Building topic clusters, internal linking loops, and comprehensive content hubs.",
    deliverables: ["Topic Cluster Architecture", "Internal Linking Strategy", "Content Gap Blueprint"],
  },
  {
    id: "STAGE-04",
    step: "04",
    title: "ENTITY AUTHORITY",
    subtitle: "Brand Graph Alignment",
    desc: "Structuring JSON-LD schema markup so search engines and AI engines recognize brand authority.",
    deliverables: ["Organization & Service Schema", "Entity Identity Mapping", "AI Citation Audit"],
  },
  {
    id: "STAGE-05",
    step: "05",
    title: "MULTI-SURFACE DISCOVERY",
    subtitle: "Search & AI Indexing",
    desc: "Optimizing visibility across traditional web search, local maps, and generative AI search platforms.",
    deliverables: ["Multi-Surface Indexing Audit", "Local & Regional SEO Setup", "AEO Content Structuring"],
  },
  {
    id: "STAGE-06",
    step: "06",
    title: "CONVERSION & RETENTION",
    subtitle: "Landing Page Relevance",
    desc: "Connecting organic search traffic directly to relevant value propositions and clear action paths.",
    deliverables: ["SEO Landing Page Optimization", "User Journey Friction Audit", "CTA Alignment Plan"],
  },
];

const seoDimensions = [
  { num: "01", title: "Technical Infrastructure", desc: "Crawlability, indexing, clean site architecture, rendering, and site speed.", icon: <Code className="w-5 h-5 text-[#f15e1c]" /> },
  { num: "02", title: "Search Intent Mapping", desc: "Understanding what target decision-makers need behind every query.", icon: <Target className="w-5 h-5 text-[#2e936f]" /> },
  { num: "03", title: "Topical Content Hubs", desc: "Building comprehensive topic structures and internal linking loops.", icon: <BookOpen className="w-5 h-5 text-[#fab60a]" /> },
  { num: "04", title: "Entity & AI Authority", desc: "Structuring JSON-LD schema so search and AI platforms understand brand expertise.", icon: <Cpu className="w-5 h-5 text-[#2e936f]" /> },
  { num: "05", title: "Core Web Vitals & UX", desc: "Mobile responsiveness, fast rendering, accessible layouts, and low bounce rates.", icon: <Zap className="w-5 h-5 text-[#f15e1c]" /> },
  { num: "06", title: "Analytics & Measurement", desc: "Search Console tracking, organic conversion attribution, and continuous reporting.", icon: <BarChart3 className="w-5 h-5 text-[#fab60a]" /> },
];

const techSeoLayers = [
  { layer: "01", title: "Sitemap & Discovery", desc: "XML sitemaps, robots.txt directives, and clean URL structures allowing efficient crawling.", tags: ["Robots.txt", "XML Sitemaps", "URL Structure"] },
  { layer: "02", title: "Crawl Budget Optimization", desc: "Optimizing server response times, HTTP headers, canonical tags, and eliminating crawl loops.", tags: ["Canonicalization", "Crawl Budget", "Redirect Chains"] },
  { layer: "03", title: "SSR & Hydration", desc: "Ensuring server-side rendering (SSR) and hydration allow search bots to process full DOM content.", tags: ["Next.js SSR", "DOM Hydration", "Script Loading"] },
  { layer: "04", title: "Structured Data Schema", desc: "JSON-LD schemas (Organization, Service, FAQ, Article) providing explicit semantic context.", tags: ["JSON-LD Schemas", "Semantic HTML", "Entity Graph"] },
];

const applicableMarkets = [
  { title: "B2B Technology & SaaS", desc: "High-intent organic buyer acquisition and technical documentation search.", icon: <Code className="w-4 h-4 text-[#2e936f]" /> },
  { title: "Professional Services", desc: "Executive thought leadership, authority content, and qualified consultation leads.", icon: <Users2 className="w-4 h-4 text-[#f15e1c]" /> },
  { title: "Enterprise & Manufacturing", desc: "Product catalog indexation, global search coverage, and technical authority.", icon: <Layers className="w-4 h-4 text-[#fab60a]" /> },
  { title: "Financial & Healthcare", desc: "E-E-A-T trust signals, regulatory compliance content, and secure search presence.", icon: <ShieldCheck className="w-4 h-4 text-[#2e936f]" /> },
];

const whatWeMeasureList = [
  { title: "Organic Keyword Footprint", desc: "Growth in non-branded high-intent query rankings across search engines.", icon: <Search className="w-5 h-5 text-[#2e936f]" /> },
  { title: "Organic Qualified Traffic", desc: "Increases in visits from decision-makers landing on core service pages.", icon: <TrendingUp className="w-5 h-5 text-[#f15e1c]" /> },
  { title: "Technical Site Health Score", desc: "Zero crawl errors, fast server response, and valid structured data schemas.", icon: <CheckCircle2 className="w-5 h-5 text-[#fab60a]" /> },
  { title: "Core Web Vitals Pass Rate", desc: "Meeting performance thresholds for LCP, INP, and CLS across mobile and desktop.", icon: <Zap className="w-5 h-5 text-[#2e936f]" /> },
  { title: "AI Search Citation Rate", desc: "Presence and citations across AI generative answer boxes (ChatGPT, Gemini, SGE).", icon: <Cpu className="w-5 h-5 text-[#f15e1c]" /> },
  { title: "Inbound Search Leads", desc: "Qualified form submissions and consultation bookings originating from organic search.", icon: <BarChart3 className="w-5 h-5 text-[#fab60a]" /> },
];

const faqList = [
  {
    q: "What is included in Arav Innovations' SEO Services?",
    a: "Our SEO practice covers technical SEO audits, crawlability optimization, Core Web Vitals performance tuning, Answer Engine Optimization (AEO), JSON-LD schema markup, topical content architecture, and transparent search reporting.",
  },
  {
    q: "How does AEO (Answer Engine Optimization) connect with SEO?",
    a: "Traditional SEO focuses on earning high positions on search results pages. AEO structures entity data, topical hubs, and schema markup so AI engines (ChatGPT, Claude, Gemini) extract and cite your brand directly in AI answer summaries.",
  },
  {
    q: "How long does it take to see results from SEO improvements?",
    a: "Technical fixes (crawl errors, indexing, Core Web Vitals) often yield indexing improvements within weeks. Broader organic search visibility and competitive ranking growth typically build over 3 to 6 months.",
  },
  {
    q: "Do you provide content creation as part of SEO?",
    a: "Yes. We design topical content structures and produce authoritative, human-written B2B articles and landing pages tailored to high-intent buyer searches.",
  },
  {
    q: "How do you track and report SEO performance?",
    a: "We track meaningful commercial metrics—including organic keyword footprint, qualified traffic, Core Web Vitals, AI search citations, and inbound lead volume—through Google Search Console and analytics dashboards.",
  },
];

const internalServices = [
  { name: "IT Strategy & Implementation", href: "/services/it-strategy-implementation", icon: <Compass className="w-4 h-4 text-[#f15e1c]" /> },
  { name: "Digital Marketing & Brand", href: "/services/digital-marketing-brand-development", icon: <TrendingUp className="w-4 h-4 text-[#2e936f]" /> },
  { name: "Web & Application Development", href: "/services/web-app-development", icon: <Code className="w-4 h-4 text-[#2e936f]" /> },
  { name: "Risk, Compliance & Governance", href: "/services/risk-compliance-governance", icon: <ShieldCheck className="w-4 h-4 text-[#2e936f]" /> },
  { name: "Audit & Improvement", href: "/services/audit-improvement", icon: <BarChart3 className="w-4 h-4 text-[#f15e1c]" /> },
  { name: "Training & Staff Augmentation", href: "/services/training-staff-augmentation", icon: <Users2 className="w-4 h-4 text-[#fab60a]" /> },
  { name: "AI Portfolio", href: "/services/ai-portfolio", icon: <Cpu className="w-4 h-4 text-[#f15e1c]" /> },
];

export function SEOInteractivePage({ service, relatedPosts }: SEOPageProps) {
  const [activeStageIdx, setActiveStageIdx] = React.useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(0);

  const displayPosts = React.useMemo(() => {
    if (relatedPosts && relatedPosts.length > 0) {
      return relatedPosts.slice(0, 3);
    }
    return blogPostsData.slice(0, 3);
  }, [relatedPosts]);

  const activeStage = seoSystemNodes[activeStageIdx];

  return (
    <div className="min-h-screen bg-[#FFFDF9] dark:bg-[#000000] text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 overflow-x-hidden selection:bg-[#2e936f]/20 selection:text-[#2e936f] relative">
      
      <AnimatedDotGrid />

      {/* 1. HERO */}
      <section className="relative pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12 lg:pb-14 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-[#FFFDF9] dark:bg-[#000000] border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] overflow-hidden select-none flex flex-col justify-start">
        
        <div className="absolute inset-0 pointer-events-none hidden lg:block select-none overflow-hidden">
          <Image
            src="/images/seo-hero-bg.webp"
            alt="SEO & Search Visibility Strategy"
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
                    { label: "SEO Services" },
                  ]}
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e2f2ec] dark:bg-[#0a0a0a] border border-[#2e936f]/40 text-xs font-mono font-bold text-[#2e936f] shadow-2xs cursor-default transition-all duration-300"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#2e936f] animate-pulse" />
                  <span>TECHNICAL SEO &amp; ANSWER ENGINE OPTIMIZATION</span>
                </motion.div>
              </AnimatedSection>

              <AnimatedSection delay={0.1} className="space-y-2">
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight leading-[1.15] text-[#1b2823] dark:text-[#ffffff]">
                  Technical SEO &amp; <span className="text-[#2e936f]">Search Visibility</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.12} className="w-full lg:hidden my-2">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl border border-[#f7d7b0] dark:border-[#1a1a1a] bg-white dark:bg-[#0a0a0a] overflow-hidden shadow-lg">
                  <Image
                    src="/images/seo-mobile-cropped.webp"
                    alt="SEO and Search Visibility Strategy"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.14} className="space-y-2">
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed max-w-2xl">
                  Build organic search dominance across search engines and AI discovery tools. We combine technical SEO architecture, JSON-LD schema, Core Web Vitals performance, and topical content hubs.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.16} className="pt-1 flex flex-wrap items-center gap-3">
                <Link href="/contact">
                  <MagneticButton>
                    <Button3D
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1.5" />}
                      className="shadow-md shadow-[#2e936f]/20 bg-[#2e936f] hover:bg-[#2e936f]/90 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Build SEO Strategy
                    </Button3D>
                  </MagneticButton>
                </Link>

                <Link href="#capabilities">
                  <MagneticButton>
                    <Button3D variant="outline" size="md" className="hover:-translate-y-0.5 transition-all duration-300">
                      Explore SEO Scope
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
                      className="px-3 py-1 rounded-lg bg-[#fefaf5]/90 dark:bg-[#0a0a0a]/90 border border-[#f7d7b0] dark:border-[#1a1a1a] text-xs font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#2e936f] hover:border-[#2e936f]/40 transition-all duration-200 cursor-default"
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
                  className="relative w-full aspect-[16/9] rounded-2xl border border-[#f7d7b0] dark:border-[#1a1a1a] overflow-hidden bg-white dark:bg-[#080808] shadow-md hover:shadow-xl hover:border-[#2e936f]/50 transition-all duration-300 group"
                >
                  <Image
                    src="/images/seo-hero.webp"
                    alt="Arav Innovations SEO Strategy & Visibility Architecture"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </motion.div>
              </AnimatedSection>
            </div>

            <div className="lg:col-span-7 space-y-4 text-left">
              <AnimatedSection delay={0.12} className="space-y-2">
                <Badge variant="secondary" size="md">
                  AUTHORITY &amp; DISCOVERY
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
                  Connecting Search Architecture With Business Intent
                </h2>
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
                  Search engines and AI discovery systems favor websites with sound technical foundations and topical authority. We optimize your digital presence to ensure your business is easily crawled, correctly indexed, and cited.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.16}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f]/40 space-y-1 transition-all duration-200 cursor-default group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#2e936f]">
                      <Code className="w-4 h-4" />
                      <span>TECHNICAL SEO</span>
                    </div>
                    <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal">
                      Crawlability, sitemaps &amp; Core Web Vitals.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]/40 space-y-1 transition-all duration-200 cursor-default group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#f15e1c]">
                      <Cpu className="w-4 h-4" />
                      <span>AEO CITATIONS</span>
                    </div>
                    <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal">
                      Structured entity data &amp; AI engine citations.
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -2 }}
                    className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#fab60a]/40 space-y-1 transition-all duration-200 cursor-default group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-[#fab60a]">
                      <BookOpen className="w-4 h-4" />
                      <span>TOPICAL HUBS</span>
                    </div>
                    <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-normal">
                      Internal linking &amp; topic authority structures.
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
                SEO DIMENSIONS
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Core SEO Dimensions
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-normal">
                Structured SEO practices connecting technical health, search intent, topic depth, schema markup, and conversion performance.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {seoDimensions.map((cap, idx) => (
              <AnimatedSection key={cap.num} delay={idx * 0.05} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-6 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:shadow-lg hover:border-[#2e936f] transition-all duration-300 flex flex-col justify-between text-left group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black text-[#2e936f] px-2.5 py-0.5 rounded-md bg-[#e2f2ec] dark:bg-[#161616] border border-[#2e936f]/30">
                        {cap.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#fefaf5] dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        {cap.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors leading-snug">
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                      {cap.desc}
                    </p>
                  </div>

                  <div className="h-1 w-0 group-hover:w-full bg-[#2e936f] transition-all duration-300 rounded-full mt-4" />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* 4. DISCOVERY PIPELINE */}
      <section id="process" className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-[#ffffff] dark:bg-[#000000]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                DISCOVERY PIPELINE
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
                6-Stage Search Discovery Framework
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                A disciplined search methodology connecting technical foundation to query intent mapping, content architecture, entity authority, and landing page conversion.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="rounded-2xl sm:rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-lg p-4 sm:p-6 lg:p-8 space-y-6">
              
              <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-6 gap-2 relative">
                {seoSystemNodes.map((stg, idx) => {
                  const isSelected = activeStageIdx === idx;
                  return (
                    <button
                      key={stg.id}
                      type="button"
                      onClick={() => setActiveStageIdx(idx)}
                      className={cn(
                        "py-2.5 px-3 rounded-xl text-xs font-extrabold font-display transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 select-none relative z-10 border",
                        isSelected
                          ? "bg-[#2e936f] text-white border-[#2e936f] shadow-sm"
                          : "bg-white dark:bg-[#000000] text-[#4a5c55] dark:text-[#d3eee4] border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f] hover:bg-[#2e936f]/5"
                      )}
                    >
                      <span className={cn("font-mono text-[10px]", isSelected ? "text-white/80" : "text-[#2e936f]")}>
                        {stg.step}.
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
                    <span className="text-xs font-mono font-bold text-[#2e936f] uppercase tracking-wider block">
                      STAGE {activeStage.step} &bull; {activeStage.title}
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

      {/* 5. TECHNICAL SEO LAYERS */}
      <section id="tech-seo" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-12 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
        <div className="max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
          
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="secondary" size="md">
                TECHNICAL ARCHITECTURE
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Technical SEO Layers
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                From sitemap discovery and crawl budget optimization to server-side rendering and structured data schema.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
            {techSeoLayers.map((layer, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.05} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-5 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#2e936f] hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left group"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono font-bold text-[#2e936f] uppercase">LAYER {layer.layer}</span>
                    <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors">
                      {layer.title}
                    </h3>
                    <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                      {layer.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-2 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a] flex flex-wrap gap-1">
                    {layer.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-mono text-[#7A6A5F] dark:text-[#B8ACA0]">#{tag} </span>
                    ))}
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
                Tailored Sector Search Strategies
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                SEO architecture aligned with specific commercial intent and target audience search behavior:
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
                  className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f] hover:bg-white dark:hover:bg-[#000000] shadow-xs transition-all duration-200 text-left flex flex-col justify-between space-y-2 group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#222222] shrink-0 group-hover:scale-105 transition-transform">
                      {mkt.icon}
                    </div>
                    <h3 className="text-sm font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors">
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
                SEARCH METRICS
              </Badge>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                Transparent Search Performance Metrics
              </h2>
              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                We measure SEO success against non-branded keyword footprint, Core Web Vitals, AI citations, and qualified organic leads.
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
                  SEO &amp; Search Visibility Insights
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {displayPosts.map((post, idx) => (
              <AnimatedSection key={post.slug} delay={idx * 0.08} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="h-full p-5 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs hover:border-[#2e936f] hover:shadow-lg transition-all duration-300 flex flex-col justify-between text-left space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="w-full mb-2 rounded-xl overflow-hidden border border-[#f7d7b0]/60">
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
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* CEO LEADERSHIP */}
      <CEOLeadershipSection serviceContext="His perspective shapes technical search architecture designed for long-term organic discovery." />

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
                  <div className="rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f]/60 overflow-hidden transition-all shadow-xs">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group select-none"
                    >
                      <span className="text-sm sm:text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors">
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
              <span className="text-xs font-mono font-bold text-[#2e936f] uppercase tracking-wider block">
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
                  className="p-3.5 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#2e936f] hover:shadow-sm transition-all flex items-center justify-between group cursor-pointer min-h-[56px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] group-hover:scale-105 transition-all shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2e936f] transition-colors leading-snug">
                      {item.name}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#2e936f] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
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
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#2e936f] via-[#247c5d] to-[#1b634a] text-white p-8 sm:p-14 border-2 border-[#fab60a] shadow-2xl space-y-6 text-center relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/40 text-xs font-mono font-bold text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#ffec69]" />
                <span>BUILD AN AUDIT-READY ORGANIC SEARCH ARCHITECTURE</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                Turn Search Visibility Into Business Growth
              </h2>

              <p className="text-xs sm:text-sm font-medium text-white/90 leading-relaxed max-w-2xl mx-auto">
                Discuss your technical SEO requirements, Core Web Vitals targets, and Answer Engine Optimization (AEO) goals with our search strategy team.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/contact">
                <MagneticButton>
                  <Button3D
                    variant="primary"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1.5" />}
                    className="w-full sm:w-auto justify-center bg-white text-[#2e936f] hover:bg-[#f7d7b0] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Build SEO Strategy
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
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> Technical SEO &amp; Core Web Vitals
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#ffec69]" /> JSON-LD Schema &amp; AEO Authority
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

export default SEOInteractivePage;
