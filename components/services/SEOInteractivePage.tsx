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
  FileCode,
  Layers,
  RefreshCw,
  Eye,
  ArrowUpRight,
  Database,
  Sliders,
  Workflow,
  ChevronDown,
  Cpu,
  Share2,
  BookOpen,
  Building2,
  ShieldCheck,
  Code,
  Network,
  Compass,
} from "lucide-react";
import { Service } from "@/data/services";
import { BlogPost, blogPostsData } from "@/data/insights";
import { Button3D } from "@/components/ui/button-3d";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";

interface SEOPageProps {
  service: Service;
  relatedPosts?: BlogPost[];
}

// -----------------------------------------------------------------------------
// IMAGE CONSTANTS
// -----------------------------------------------------------------------------
const SEO_HERO_IMAGE = "/images/seo-hero.png";
const SEO_SECOND_IMAGE = "/images/seo-secondary.png";

// -----------------------------------------------------------------------------
// System Scan Transition Line
// -----------------------------------------------------------------------------
function SystemScanTransition() {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative w-full h-px my-4 overflow-hidden pointer-events-none select-none">
      <div className="w-full h-full bg-[#F7D7B0]" />
      {!shouldReduceMotion && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={isInView ? { x: "100%" } : {}}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-[#F15E1C] to-transparent shadow-[0_0_8px_#F15E1C]"
        />
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Search Discovery Ecosystem Data (Section 2)
// -----------------------------------------------------------------------------
const searchDiscoveryPaths = [
  {
    id: "traditional",
    name: "TRADITIONAL SEARCH",
    title: "Organic Engine Visibility",
    desc: "Crawlable pages, clear architecture, and intent-matched content that search engines index and rank reliably.",
    icon: <Search className="w-5 h-5" />,
    focus: "Technical Crawl • Indexing • On-Page Relevance",
  },
  {
    id: "local",
    name: "LOCAL DISCOVERY",
    title: "Geographic & Hyperlocal Intent",
    desc: "Geographic search signals, location landing pages, and proximity intent for regional service discovery.",
    icon: <Globe2 className="w-5 h-5" />,
    focus: "Location Signals • Local Intent • Regional Footprint",
  },
  {
    id: "media",
    name: "IMAGE & VIDEO DISCOVERY",
    title: "Rich Media & Visual Search",
    desc: "Structured media metadata, alt architectures, and visual assets indexed across visual search experiences.",
    icon: <Eye className="w-5 h-5" />,
    focus: "Structured Alt • Media Schemas • Visual Asset Indexing",
  },
  {
    id: "ai",
    name: "AI-ASSISTED SEARCH",
    title: "Conversational & Generative Discovery",
    desc: "Entity clarity, structured data, and authoritative citations that LLMs and AI search engines synthesize.",
    icon: <Cpu className="w-5 h-5" />,
    focus: "Entity Clarity • Structured Data • AI Source Synthesis",
  },
  {
    id: "branded",
    name: "BRANDED SEARCH",
    title: "Entity Authority & Direct Intent",
    desc: "Strengthening brand entity signals, knowledge graph alignment, and branded navigation pathways.",
    icon: <Target className="w-5 h-5" />,
    focus: "Knowledge Graph • Brand Entity • Navigational Intent",
  },
  {
    id: "direct",
    name: "DIRECT & RETURNING USERS",
    title: "Sustained Audience Retention",
    desc: "Topical depth and clear internal links that convert search discovery into repeatable site visits.",
    icon: <RefreshCw className="w-5 h-5" />,
    focus: "Internal Linking • Topic Depth • Audience Retention",
  },
];

// -----------------------------------------------------------------------------
// SEO System Nodes (Section 3)
// -----------------------------------------------------------------------------
const seoSystemNodes = [
  { step: "01", label: "TECHNICAL FOUNDATION", title: "Crawlability & Rendering", desc: "Clean site structure, fast server responses, rendering pipelines, and error-free indexing." },
  { step: "02", label: "SEARCH INTENT", title: "Query Intent Mapping", desc: "Understanding exact user needs (informational, commercial, transactional) behind search terms." },
  { step: "03", label: "CONTENT ARCHITECTURE", title: "Topic Depth & Hierarchy", desc: "Building comprehensive topic structures, internal linking loops, and useful page depth." },
  { step: "04", label: "ENTITY & TOPICAL AUTHORITY", title: "Brand Expertise Graph", desc: "Establishing entity signals and topical credibility that search algorithms recognize." },
  { step: "05", label: "DISCOVERY", title: "Multi-Surface Indexing", desc: "Optimizing visibility across web, local, image, video, and conversational search surfaces." },
  { step: "06", label: "CONVERSION", title: "Landing Page Relevance", desc: "Connecting organic traffic directly to relevant value propositions and clear action paths." },
  { step: "07", label: "MEASUREMENT", title: "Search Console & Analytics", desc: "Tracking query impressions, landing page engagement, technical health, and business outcomes." },
  { step: "08", label: "REFINEMENT", title: "Continuous Optimization", desc: "Iterating architecture and content based on search algorithm updates and real performance data." },
];

// -----------------------------------------------------------------------------
// 6 SEO Dimensions (Section 5)
// -----------------------------------------------------------------------------
const seoDimensions = [
  { num: "01", title: "TECHNICAL ACCESS", desc: "Crawlability, indexing, site architecture, rendering, and technical health.", icon: <Code className="w-5 h-5 text-[#F15E1C]" /> },
  { num: "02", title: "SEARCH INTENT", desc: "Understanding what users actually need behind the query.", icon: <Target className="w-5 h-5 text-[#2E936F]" /> },
  { num: "03", title: "CONTENT ARCHITECTURE", desc: "Building useful topic structures, internal relationships, and content depth.", icon: <BookOpen className="w-5 h-5 text-[#FAB60A]" /> },
  { num: "04", title: "ENTITY & TOPICAL AUTHORITY", desc: "Helping search systems understand the business, expertise, topics, and relationships around the brand.", icon: <Network className="w-5 h-5 text-[#F15E1C]" /> },
  { num: "05", title: "EXPERIENCE & PERFORMANCE", desc: "Mobile usability, Core Web Vitals, accessibility, and fast useful experiences.", icon: <Zap className="w-5 h-5 text-[#2E936F]" /> },
  { num: "06", title: "MEASUREMENT & LEARNING", desc: "Search Console, analytics, conversions, and continuous performance analysis.", icon: <BarChart3 className="w-5 h-5 text-[#FAB60A]" /> },
];

// -----------------------------------------------------------------------------
// Technical SEO Architecture Layers (Section 6)
// -----------------------------------------------------------------------------
const techSeoLayers = [
  { layer: "01", stage: "DISCOVER", title: "Sitemap & URL Discovery", desc: "XML sitemaps, robots.txt directives, and clean URL structure allowing search bots to discover new content.", tags: ["Robots.txt", "XML Sitemaps", "URL Structure"] },
  { layer: "02", stage: "CRAWL", title: "Crawl Efficiency & Budget", desc: "Optimizing server response times, HTTP headers, canonical tags, and eliminating crawl loops.", tags: ["Canonicalization", "Crawl Budget", "Redirect Chains"] },
  { layer: "03", stage: "RENDER", title: "JavaScript & HTML Rendering", desc: "Ensuring server-side rendering (SSR) and hydration allow search bots to process full DOM content seamlessly.", tags: ["SSR / SSG", "DOM Hydration", "Script Loading"] },
  { layer: "04", stage: "INDEX", title: "Indexation & Directives", desc: "Managing meta robots tags, noindex rules, paginated series, and canonical indexation signals.", tags: ["Meta Robots", "Noindex Controls", "Pagination"] },
  { layer: "05", stage: "UNDERSTAND", title: "Structured Data & Schema", desc: "JSON-LD schemas (Organization, Article, Service, FAQ, Product) providing explicit semantic context.", tags: ["JSON-LD Schemas", "Semantic HTML", "Entity Graph"] },
  { layer: "06", stage: "SERVE", title: "Performance & Experience", desc: "Core Web Vitals (LCP, INP, CLS), mobile responsiveness, and HTTPS security standards.", tags: ["Core Web Vitals", "Mobile First", "HTTPS / SSL"] },
];

// -----------------------------------------------------------------------------
// Search Intent Categories (Section 7)
// -----------------------------------------------------------------------------
const searchIntentCategories = [
  {
    type: "INFORMATIONAL",
    query: "User is learning or researching",
    desc: "The searcher wants background information, explanations, or educational guidance on a specific topic.",
    response: "Comprehensive guides, technical explainers, educational articles, and architectural overviews.",
    icon: <BookOpen className="w-5 h-5 text-[#F15E1C]" />,
  },
  {
    type: "COMMERCIAL",
    query: "User is comparing options",
    desc: "The searcher is evaluating solutions, comparing service capabilities, or reviewing technology options.",
    response: "Comparison pages, service capability breakdowns, technology stack overviews, and case studies.",
    icon: <Sliders className="w-5 h-5 text-[#2E936F]" />,
  },
  {
    type: "TRANSACTIONAL",
    query: "User is ready to act",
    desc: "The searcher has high intent to engage, request an audit, hire a team, or initiate a consultation.",
    response: "Clear service landing pages, direct assessment request forms, and clear action pathways.",
    icon: <Zap className="w-5 h-5 text-[#FAB60A]" />,
  },
  {
    type: "NAVIGATIONAL",
    query: "User is looking for a specific brand",
    desc: "The searcher seeks the official website, specific service portal, or direct contact point for the brand.",
    response: "Strong brand entity signals, clear site structure, sitelinks, and direct homepage navigation.",
    icon: <Compass className="w-5 h-5 text-[#F15E1C]" />,
  },
];

// -----------------------------------------------------------------------------
// Entity Graph Nodes (Section 8)
// -----------------------------------------------------------------------------
const entityGraphNodes = [
  { id: "center", label: "ARAV / BRAND ENTITY", type: "core", desc: "The central business entity, core authority, and verified organizational identity." },
  { id: "services", label: "SERVICES", type: "branch", desc: "IT Strategy, Software Engineering, AI Solutions, Governance & SEO." },
  { id: "expertise", label: "TECHNICAL EXPERTISE", type: "branch", desc: "Cloud Architecture, Web Development, Data Engineering & System Audits." },
  { id: "industries", label: "INDUSTRIES", type: "branch", desc: "SaaS, Enterprise IT, Financial Services, Healthcare & Digital Platforms." },
  { id: "topics", label: "TOPICAL CLUSTERS", type: "branch", desc: "Search Intelligence, Technical SEO, Entity Visibility & AI Search." },
  { id: "people", label: "PRACTITIONERS", type: "branch", desc: "Senior Architects, Engineers, Consultants & Strategy Leads." },
  { id: "references", label: "CITATIONS & SCHEMAS", type: "branch", desc: "Structured JSON-LD, Organization Schemas & Editorial References." },
];

// -----------------------------------------------------------------------------
// Search Context Selector Data (Section 10)
// -----------------------------------------------------------------------------
const searchContexts = [
  {
    id: "enterprise",
    name: "ENTERPRISE",
    title: "Large-Scale Architecture & Multi-Domain SEO",
    desc: "Complex site structures, international subdomains, legacy redirects, and large-scale indexation management across multi-region domains.",
    focus: ["Multi-Region Indexing", "Crawl Budget Optimization", "Legacy Migration Safety"],
  },
  {
    id: "local",
    name: "LOCAL & REGIONAL",
    title: "Geographic & Hyperlocal Visibility",
    desc: "Proximity intent, regional landing page architectures, local schema markup, and geographic search presence.",
    focus: ["Location Schema", "Geographic Landing Pages", "Regional Search Signals"],
  },
  {
    id: "ecommerce",
    name: "E-COMMERCE",
    title: "Faceted Navigation & Product Indexing",
    desc: "Faceted search parameter handling, product structured data, canonical controls, and category page hierarchy.",
    focus: ["Faceted Navigation Controls", "Product Schemas", "Category Architecture"],
  },
  {
    id: "b2b",
    name: "B2B SERVICES",
    title: "High-Intent Lead & Solution Discovery",
    desc: "Commercial search intent mapping, technical service positioning, whitepaper indexation, and conversion-focused landing pages.",
    focus: ["Commercial Intent Alignment", "Solution Pages", "Lead Journey Integration"],
  },
  {
    id: "content",
    name: "CONTENT-LED",
    title: "Topical Authority & Knowledge Hubs",
    desc: "Comprehensive topic clusters, internal linking networks, editorial standards, and digital publication architectures.",
    focus: ["Topic Cluster Mapping", "Internal Link Loops", "Editorial Hub Architecture"],
  },
];

// -----------------------------------------------------------------------------
// Continuous SEO Loop Stages (Section 13)
// -----------------------------------------------------------------------------
const continuousSeoLoop = [
  { step: "01", name: "OBSERVE", desc: "Monitor search crawl patterns, ranking movements, and algorithm shifts." },
  { step: "02", name: "DIAGNOSE", desc: "Identify technical errors, intent mismatches, or indexation bottlenecks." },
  { step: "03", name: "PRIORITIZE", desc: "Focus engineering & content effort on highest impact search fixes." },
  { step: "04", name: "OPTIMIZE", desc: "Implement code updates, schema fixes, internal links, and content depth." },
  { step: "05", name: "PUBLISH", desc: "Deploy clean updates into production with validated technical metadata." },
  { step: "06", name: "MEASURE", desc: "Track query performance, organic traffic quality, and conversion signals." },
  { step: "07", name: "LEARN", desc: "Extract search insights to refine technical architecture and future roadmaps." },
];

// -----------------------------------------------------------------------------
// SEO Engagement Models (Section 14)
// -----------------------------------------------------------------------------
const seoEngagementModels = [
  {
    name: "SEARCH FOUNDATION",
    title: "Technical & Structural Clarity",
    desc: "Ideal for organizations needing an immediate technical cleanup, site architecture repair, schema implementation, and baseline search health.",
    deliverables: ["Full Technical Audit & Remediation", "JSON-LD Schema Implementation", "Indexation & Crawl Budget Cleanup", "Search Console Configuration"],
  },
  {
    name: "SEARCH GROWTH",
    title: "Organic Discovery & Content Expansion",
    desc: "For businesses ready to build comprehensive topic clusters, expand search intent coverage, and grow organic visibility systematically.",
    deliverables: ["Topic Cluster Architecture", "Intent-Driven Content Alignment", "Internal Linking Optimization", "Monthly Performance & Analytics"],
  },
  {
    name: "SEARCH TRANSFORMATION",
    title: "Ongoing Strategy & Enterprise SEO",
    desc: "Comprehensive partner engagement for complex or large-scale sites requiring ongoing technical engineering, AI search positioning, and continuous optimization.",
    deliverables: ["Dedicated Search Strategy Lead", "AI Search & Entity Graph Alignment", "Continuous Technical Engineering", "Executive Reporting & Attribution"],
  },
];

// -----------------------------------------------------------------------------
// FAQ Data (Section 17)
// -----------------------------------------------------------------------------
const seoFaqData = [
  {
    question: "What does an SEO engagement with Arav Innovations include?",
    answer:
      "Our SEO engagements cover technical site architecture, search intent mapping, content depth, JSON-LD schema engineering, entity signals, and continuous performance measurement. We focus on building a clean, discoverable search foundation rather than quick-fix tactics.",
  },
  {
    question: "How do you approach technical SEO?",
    answer:
      "We examine crawlability, indexation rules, server rendering (SSR/SSG), site speed (Core Web Vitals), canonicalization, XML sitemaps, and structured data. We fix underlying code and architectural issues directly alongside your engineering or web development team.",
  },
  {
    question: "How do you align SEO with search intent and business goals?",
    answer:
      "Rather than targeting random keyword volumes, we map search terms into distinct intent categories (informational, commercial, transactional, navigational) and ensure every target page delivers the exact content type and value proposition the searcher requires.",
  },
  {
    question: "How are AI-powered search experiences changing SEO?",
    answer:
      "AI-driven search engines and conversational LLMs rely heavily on clear entity definitions, authoritative structured data (JSON-LD), logical content architecture, and verified expertise. We optimize entity clarity so search systems can understand and reference your brand accurately.",
  },
  {
    question: "How do you measure SEO performance?",
    answer:
      "We measure performance through Google Search Console data (impressions, query clicks, average position), organic landing page traffic quality, technical crawl health, and downstream conversion events mapped to real business outcomes.",
  },
];

export function SEOInteractivePage({ service, relatedPosts }: SEOPageProps) {
  const [activeDiscoveryPath, setActiveDiscoveryPath] = React.useState<number>(0);
  const [activeSystemNode, setActiveSystemNode] = React.useState<number>(0);
  const [activeEntityId, setActiveEntityId] = React.useState<string>("center");
  const [activeContextId, setActiveContextId] = React.useState<string>("enterprise");
  const [openFaqIdx, setOpenFaqIdx] = React.useState<number | null>(0);

  // Hover states for interactive previews
  const [hoverDiscoveryIdx, setHoverDiscoveryIdx] = React.useState<number | null>(null);
  const [hoverSystemIdx, setHoverSystemIdx] = React.useState<number | null>(null);

  // Dynamic Blog Posts from real CMS data
  const articles = React.useMemo(() => {
    if (relatedPosts && relatedPosts.length > 0) {
      return relatedPosts.slice(0, 3);
    }
    return blogPostsData.slice(0, 3);
  }, [relatedPosts]);

  const displayedDiscoveryIdx = hoverDiscoveryIdx !== null ? hoverDiscoveryIdx : activeDiscoveryPath;
  const currentDiscoveryPath = searchDiscoveryPaths[displayedDiscoveryIdx];

  const displayedSystemIdx = hoverSystemIdx !== null ? hoverSystemIdx : activeSystemNode;
  const currentSystemNode = seoSystemNodes[displayedSystemIdx];

  const currentContext = searchContexts.find((c) => c.id === activeContextId) || searchContexts[0];
  const currentEntity = entityGraphNodes.find((e) => e.id === activeEntityId) || entityGraphNodes[0];

  return (
    <div className="min-h-screen bg-white dark:bg-[#000000] text-[#1b2823] dark:text-[#ffffff] transition-colors duration-300 overflow-x-hidden selection:bg-[#F15E1C]/20 selection:text-[#F15E1C]">
      
      {/* Breadcrumb Navigation */}
      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-1">
        <Breadcrumb
          items={[
            { label: "Services", href: "/services" },
            { label: "SEO Services", href: "/services/seo-services" },
          ]}
        />
      </div>

      {/* =====================================================================
          1. HERO — MAIN HERO VISUAL (IMAGE 1: SEO_HERO_IMAGE)
          ===================================================================== */}
      <section className="relative z-10 w-full border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 pb-8 sm:pb-12 md:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Hero Copy (Left Column - 50%) */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2">
                <Badge variant="outline" className="border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3.5 py-1.5 font-semibold tracking-wider text-xs rounded-full shadow-xs">
                  SEARCH INTELLIGENCE • ORGANIC VISIBILITY
                </Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-[1.12]">
                Be Found When Your Customers Are Searching.
              </h1>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed font-normal">
                We build search strategies that connect technical foundations, search intent, content, authority and measurement — helping businesses become easier to discover, understand and choose across modern search experiences.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link href="/contact">
                  <Button3D variant="primary" size="lg" className="flex items-center gap-2 font-semibold bg-[#F15E1C] text-[#FFFFFF] border-[#F15E1C] hover:opacity-95 transition-all">
                    Build My Search Strategy
                    <ArrowRight className="w-4 h-4" />
                  </Button3D>
                </Link>
                <a href="#search-discovery-map">
                  <Button3D variant="secondary" size="lg" className="flex items-center gap-2 font-semibold bg-[#2E936F] text-[#FFFFFF] border-[#2E936F] hover:opacity-95 transition-all">
                    Explore Our SEO Approach
                  </Button3D>
                </a>
              </div>

              {/* Supporting Keywords Bar */}
              <div className="pt-3 border-t border-[#F7D7B0]">
                <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2">
                  Core SEO Disciplines
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Technical SEO",
                    "Search Intent",
                    "Content",
                    "Authority",
                    "AI Search",
                    "Analytics",
                  ].map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-lg bg-gray-100 dark:bg-[#0a0a0a] text-gray-700 dark:text-gray-300 border border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F15E1C] hover:text-[#FFFFFF] transition-all duration-200 cursor-pointer shadow-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* HERO VISUAL — IMAGE 1 (Right Column - 50%) */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              <TiltCard className="w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative w-full overflow-hidden group flex items-center justify-center"
                >
                  <Image
                    priority
                    src={SEO_HERO_IMAGE}
                    alt="Search intelligence and team organic discovery workflow"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain max-h-[480px] rounded-2xl group-hover:scale-[1.02] transition-transform duration-300 drop-shadow-lg"
                  />
                </motion.div>
              </TiltCard>
            </div>

          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          2. UNIQUE SIGNATURE SECTION — SEARCH HAS CHANGED
          ===================================================================== */}
      <section id="search-discovery-map" className="relative z-10 w-full py-10 sm:py-14 md:py-16 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              SEARCH DISCOVERY MAP
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Search Has Changed. Your SEO Should Too.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              People no longer discover businesses through one search behaviour alone. Search now spans traditional results, local discovery, images, video, AI-assisted experiences and branded research journeys.
            </p>
          </div>

          {/* Interactive Discovery Ecosystem Grid */}
          <div className="bg-white dark:bg-[#000000] border border-[#F7D7B0] rounded-2xl p-6 sm:p-8 shadow-lg space-y-6">
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 border-b border-[#F7D7B0] pb-6">
              {searchDiscoveryPaths.map((path, idx) => {
                const isActive = displayedDiscoveryIdx === idx;
                return (
                  <button
                    key={path.id}
                    onClick={() => setActiveDiscoveryPath(idx)}
                    onMouseEnter={() => setHoverDiscoveryIdx(idx)}
                    onMouseLeave={() => setHoverDiscoveryIdx(null)}
                    className={cn(
                      "p-3.5 rounded-xl text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between h-28 transform",
                      isActive
                        ? "bg-[#F15E1C] text-[#FFFFFF] border-[#F15E1C] shadow-md -translate-y-0.5"
                        : "bg-white dark:bg-[#000000] text-[#1b2823] dark:text-[#ffffff] border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F7D7B0]/20"
                    )}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={cn("text-[10px] font-mono font-bold", isActive ? "text-[#FFEC69]" : "text-[#F15E1C]")}>
                        PATH 0{idx + 1}
                      </span>
                      <div className={cn("p-1 rounded-lg transition-colors", isActive ? "bg-[#FFFFFF] text-[#F15E1C]" : "bg-[#F7D7B0]/30 text-[#F15E1C]")}>
                        {path.icon}
                      </div>
                    </div>
                    <div>
                      <span className={cn("text-xs font-bold block transition-colors", isActive ? "text-[#FFFFFF]" : "text-[#1b2823] dark:text-[#ffffff]")}>
                        {path.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Path Explanation Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDiscoveryPath.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-7 rounded-xl border-2 border-[#F15E1C] bg-[#F7D7B0]/20 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#F15E1C] text-[#FFFFFF] shadow-xs">
                      {currentDiscoveryPath.icon}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#F15E1C]">DISCOVERY SURFACE &bull; {currentDiscoveryPath.name}</span>
                      <h3 className="text-xl font-bold text-[#1b2823] dark:text-[#ffffff]">{currentDiscoveryPath.title}</h3>
                    </div>
                  </div>
                  <Badge variant="subtle" className="text-xs bg-[#F15E1C]/10 text-[#F15E1C] font-semibold">
                    {currentDiscoveryPath.focus}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                  {currentDiscoveryPath.desc}
                </p>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          3. THE SEO SYSTEM — CONNECTED NETWORK
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 bg-white dark:bg-[#000000] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#2E936F] text-[#2E936F] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              THE SEARCH ARCHITECTURE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              SEO Is a System, Not a Single Task.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Hover over any stage in the search engine pipeline to explore how technical foundations, intent mapping, content depth, and measurement form a continuous organic growth engine.
            </p>
          </div>

          <div className="bg-white dark:bg-[#000000] border border-[#F7D7B0] rounded-2xl p-6 sm:p-8 shadow-lg space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 border-b border-[#F7D7B0] pb-6">
              {seoSystemNodes.map((node, idx) => {
                const isActive = displayedSystemIdx === idx;
                return (
                  <button
                    key={node.step}
                    onClick={() => setActiveSystemNode(idx)}
                    onMouseEnter={() => setHoverSystemIdx(idx)}
                    onMouseLeave={() => setHoverSystemIdx(null)}
                    className={cn(
                      "p-3 rounded-xl text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between h-26 transform",
                      isActive
                        ? "bg-[#F15E1C] text-[#FFFFFF] border-[#F15E1C] shadow-md -translate-y-0.5"
                        : "bg-white dark:bg-[#000000] text-[#1b2823] dark:text-[#ffffff] border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F7D7B0]/20"
                    )}
                  >
                    <span className={cn("text-[10px] font-mono font-bold", isActive ? "text-[#FFEC69]" : "text-[#F15E1C]")}>
                      {node.step}
                    </span>
                    <span className={cn("text-[11px] font-bold block leading-tight", isActive ? "text-[#FFFFFF]" : "text-[#1b2823] dark:text-[#ffffff]")}>
                      {node.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSystemNode.step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-xl border-2 border-[#2E936F] bg-[#F7D7B0]/20 space-y-1.5"
              >
                <span className="text-xs font-mono font-bold text-[#2E936F]">STAGE {currentSystemNode.step} &bull; {currentSystemNode.label}</span>
                <h3 className="text-xl font-bold text-[#1b2823] dark:text-[#ffffff]">{currentSystemNode.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">{currentSystemNode.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          4. SECONDARY SEO STRATEGY SECTION — IMAGE 2 (SEO_SECOND_IMAGE)
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: IMAGE 2 (Desktop Left, Mobile Top) */}
            <div className="lg:col-span-6 w-full flex items-center justify-center">
              <TiltCard className="w-full">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full overflow-hidden group flex items-center justify-center"
                >
                  <Image
                    loading="lazy"
                    src={SEO_SECOND_IMAGE}
                    alt="SEO search performance and optimization strategy visual"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain max-h-[440px] rounded-2xl group-hover:scale-[1.02] transition-transform duration-300 drop-shadow-md"
                  />
                </motion.div>
              </TiltCard>
            </div>

            {/* Right Column: Strategic Narrative */}
            <div className="lg:col-span-6 space-y-5">
              <Badge variant="outline" className="border-[#2E936F] text-[#2E936F] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
                SEARCH ENGINE ENGINE &bull; STRATEGY
              </Badge>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff] leading-tight">
                From Search Visibility to Business Visibility.
              </h2>

              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                Organic discovery is not about targeting disconnected keyphrases. Arav Innovations builds a connected search engine strategy that links technical access directly to user search intent, topical depth, entity signals, and downstream business outcomes.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { title: "Technical Access & Crawlability", detail: "Clean indexing directives and server response optimization." },
                  { title: "Intent Category Alignment", detail: "Matching content to informational, commercial, and transactional queries." },
                  { title: "Topical & Entity Authority", detail: "Structured data schemas and entity signals for search systems." },
                  { title: "Measurement & Refinement", detail: "Attributing organic traffic to real landing page conversion events." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-[#F7D7B0]/20 border border-[#F7D7B0]">
                    <CheckCircle2 className="w-4 h-4 text-[#F15E1C] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff] block">{item.title}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{item.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          5. WHAT WE ACTUALLY OPTIMIZE — 6 DIMENSIONS
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 bg-white dark:bg-[#000000] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#FAB60A] text-[#FAB60A] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              SEARCH READINESS
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              What Makes a Business Search-Ready?
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Six core dimensions that determine whether search engines can crawl, index, understand, and value your website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {seoDimensions.map((dim) => (
              <motion.div
                key={dim.num}
                whileHover={{ scale: 1.01, y: -3 }}
                className="p-6 rounded-2xl bg-white dark:bg-[#000000] border border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F7D7B0]/20 hover:shadow-lg transition-all duration-300 shadow-xs flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#F15E1C] px-2.5 py-0.5 rounded bg-[#F7D7B0]/40 group-hover:bg-[#F15E1C] group-hover:text-[#FFFFFF] transition-colors">
                      DIMENSION {dim.num}
                    </span>
                    <div className="p-1.5 rounded-lg bg-[#F7D7B0]/30 group-hover:bg-[#F15E1C]/10 transition-colors">
                      {dim.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#F15E1C] transition-colors">
                    {dim.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {dim.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          6. TECHNICAL SEO — LAYERED ARCHITECTURE
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              TECHNICAL ARCHITECTURE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Before Search Can Understand You, It Has to Reach You.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Technical SEO ensures search bots can crawl your URLs, render dynamic content, parse structured schemas, and index key pages without technical friction.
            </p>
          </div>

          {/* Layered Technical Stack */}
          <div className="space-y-3 max-w-4xl mx-auto">
            {techSeoLayers.map((layer) => (
              <motion.div
                key={layer.layer}
                whileHover={{ scale: 1.01, x: 3 }}
                className="p-5 rounded-2xl bg-white dark:bg-[#000000] border border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F7D7B0]/20 transition-all duration-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-[#F15E1C] text-[#FFFFFF] font-mono font-bold text-xs shrink-0">
                    LAYER {layer.layer}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#F15E1C] block">{layer.stage} PIPELINE</span>
                    <h3 className="text-base font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#F15E1C] transition-colors">{layer.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{layer.desc}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 shrink-0">
                  {layer.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#F7D7B0]/40 text-[#1b2823] dark:text-[#ffffff]">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          7. SEARCH INTENT + CONTENT
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 bg-white dark:bg-[#000000] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#2E936F] text-[#2E936F] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              SEARCH INTENT ALIGNMENT
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Don't Start With Keywords. Start With the Question.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Search engines reward pages that fulfill specific search intent categories with the correct content structure and user value.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {searchIntentCategories.map((cat) => (
              <motion.div
                key={cat.type}
                whileHover={{ y: -3 }}
                className="p-5 rounded-2xl bg-white dark:bg-[#000000] border border-[#F7D7B0] hover:border-[#2E936F] hover:bg-[#F7D7B0]/20 transition-all duration-300 shadow-xs space-y-3 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#2E936F] uppercase">{cat.type} INTENT</span>
                    <div className="p-1.5 rounded-lg bg-[#F7D7B0]/30">{cat.icon}</div>
                  </div>
                  <h3 className="text-base font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#2E936F] transition-colors">{cat.query}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{cat.desc}</p>
                </div>

                <div className="pt-2.5 border-t border-[#F7D7B0]">
                  <span className="text-[10px] font-mono font-bold text-[#F15E1C] uppercase block">Content Response:</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{cat.response}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          8. TOPICAL AUTHORITY / ENTITY GRAPH
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#FAB60A] text-[#FAB60A] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              ENTITY GRAPH ARCHITECTURE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Build a Web of Meaning Around Your Expertise.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Select or hover over any node in the entity graph to examine how topics, expertise, services, and citations establish brand credibility in modern search algorithms.
            </p>
          </div>

          <div className="bg-white dark:bg-[#000000] border border-[#F7D7B0] rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {entityGraphNodes.map((node) => {
                const isActive = activeEntityId === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveEntityId(node.id)}
                    className={cn(
                      "p-2.5 rounded-xl text-center transition-all duration-200 border cursor-pointer flex flex-col justify-center h-22 transform",
                      isActive
                        ? "bg-[#F15E1C] text-[#FFFFFF] border-[#F15E1C] shadow-md -translate-y-0.5"
                        : "bg-white dark:bg-[#000000] text-[#1b2823] dark:text-[#ffffff] border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F7D7B0]/20"
                    )}
                  >
                    <span className={cn("text-[10px] font-mono font-bold uppercase block leading-tight", isActive ? "text-[#FFFFFF]" : "text-[#1b2823] dark:text-[#ffffff]")}>
                      {node.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentEntity.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-5 rounded-2xl border-2 border-[#FAB60A] bg-[#F7D7B0]/20 text-center space-y-1.5"
              >
                <span className="text-xs font-mono font-bold text-[#FAB60A] uppercase">{currentEntity.label} ENTITY NODE</span>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed max-w-xl mx-auto">{currentEntity.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          9. AI SEARCH VISIBILITY
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 bg-white dark:bg-[#000000] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              GENERATIVE &amp; AI SEARCH
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Search Is Becoming More Conversational.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Modern search experiences increasingly feature AI-generated answers and conversational discovery. We optimize entity signals and structured information so search models synthesize your brand accurately.
            </p>
          </div>

          <div className="bg-white dark:bg-[#000000] border border-[#F7D7B0] rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-center">
              {[
                { title: "USER QUESTION", desc: "Natural Language Query" },
                { title: "AI SEARCH ENGINE", desc: "LLM Parsing & Retrieval" },
                { title: "ENTITY & SOURCE", desc: "JSON-LD Citation" },
                { title: "AI SUMMARY", desc: "Synthesized Answer" },
                { title: "SITE VISIT", desc: "Business Engagement" },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#F7D7B0]/20 border border-[#F7D7B0] space-y-1">
                  <span className="text-xs font-mono font-bold text-[#F15E1C] block">{item.title}</span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 block">{item.desc}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#F7D7B0]">
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#000000] border border-[#F7D7B0] text-left space-y-0.5">
                <span className="text-xs font-bold text-[#F15E1C] uppercase block">Structured Data</span>
                <p className="text-xs text-gray-600 dark:text-gray-300">Explicit schemas allowing models to parse entity facts.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#000000] border border-[#F7D7B0] text-left space-y-0.5">
                <span className="text-xs font-bold text-[#2E936F] uppercase block">Entity Authority</span>
                <p className="text-xs text-gray-600 dark:text-gray-300">Consistent brand signals across editorial sources.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#000000] border border-[#F7D7B0] text-left space-y-0.5">
                <span className="text-xs font-bold text-[#FAB60A] uppercase block">Topic Coverage</span>
                <p className="text-xs text-gray-600 dark:text-gray-300">Comprehensive answers matching natural queries.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          10. SEARCH CONTEXT SELECTOR
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#2E936F] text-[#2E936F] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              SEARCH CONTEXT SELECTOR
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Tailored Strategy for Your Environment.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Select your business model to examine how search priorities change across enterprise, local, e-commerce, B2B, and content-led architectures.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex overflow-x-auto gap-2.5 justify-center pb-1 scrollbar-none">
              {searchContexts.map((ctx) => {
                const isActive = activeContextId === ctx.id;
                return (
                  <button
                    key={ctx.id}
                    onClick={() => setActiveContextId(ctx.id)}
                    className={cn(
                      "px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shrink-0 border transform",
                      isActive
                        ? "bg-[#F15E1C] text-[#FFFFFF] border-[#F15E1C] shadow-md -translate-y-0.5"
                        : "bg-white dark:bg-[#000000] text-[#1b2823] dark:text-[#ffffff] border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F7D7B0]/20"
                    )}
                  >
                    <span>{ctx.name}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentContext.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#000000] border border-[#F7D7B0] shadow-lg space-y-5"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#F15E1C]">{currentContext.name} ARCHITECTURE</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1b2823] dark:text-[#ffffff]">{currentContext.title}</h3>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                  {currentContext.desc}
                </p>

                <div className="pt-3 border-t border-[#F7D7B0]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2E936F] block mb-2">Key Focus Areas</span>
                  <div className="flex flex-wrap gap-2">
                    {currentContext.focus.map((f, idx) => (
                      <span key={idx} className="text-xs px-3 py-1 rounded-lg bg-[#F7D7B0]/30 border border-[#F7D7B0] text-[#1b2823] dark:text-[#ffffff] font-semibold">
                        {f}
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

      {/* =====================================================================
          11. SUSTAINABLE AUTHORITY WITHOUT SPAM
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 bg-white dark:bg-[#000000] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#FAB60A] text-[#FAB60A] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              SUSTAINABLE GROWTH
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Authority Is Earned, Not Manufactured.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              We focus on building genuine domain authority through valuable content, digital PR, industry citations, and brand mentions rather than manipulative link schemes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { title: "Useful Content", desc: "Publishing original, expert insights that industry peers naturally reference.", icon: <BookOpen className="w-5 h-5 text-[#F15E1C]" /> },
              { title: "Digital PR & Mentions", desc: "Earning brand mentions in reputable industry publications and trade press.", icon: <Share2 className="w-5 h-5 text-[#2E936F]" /> },
              { title: "Editorial Relationships", desc: "Collaborating with authoritative industry channels for authentic reach.", icon: <Building2 className="w-5 h-5 text-[#FAB60A]" /> },
              { title: "Brand Reputation", desc: "Establishing entity signals that reinforce expertise, authoritativeness, and trust.", icon: <ShieldCheck className="w-5 h-5 text-[#F15E1C]" /> },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02, y: -3 }}
                className="p-5 rounded-2xl bg-white dark:bg-[#000000] border border-[#F7D7B0] hover:border-[#F15E1C] hover:bg-[#F7D7B0]/20 transition-all duration-300 shadow-xs space-y-2.5 group cursor-pointer"
              >
                <div className="p-2 rounded-xl bg-[#F7D7B0]/30 w-fit">{item.icon}</div>
                <h3 className="text-base font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#F15E1C] transition-colors">{item.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          12. WHAT WE MEASURE
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#2E936F] text-[#2E936F] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              WHAT WE MEASURE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Measure What Search Is Doing For the Business.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              We connect technical search console metrics directly to landing page performance, organic conversion events, and downstream business outcomes.
            </p>
          </div>

          <div className="bg-white dark:bg-[#000000] border border-[#F7D7B0] rounded-3xl p-6 sm:p-10 shadow-lg max-w-4xl mx-auto text-center space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-2.5 items-center">
              {[
                { title: "VISIBILITY", desc: "Search Console Impressions" },
                { title: "ENGAGEMENT", desc: "Query Clicks & CTR" },
                { title: "ORGANIC TRAFFIC", desc: "Landing Page Visits" },
                { title: "PAGE PERFORMANCE", desc: "Dwell Time & Scroll" },
                { title: "CONVERSION", desc: "Form & Goal Events" },
                { title: "BUSINESS OUTCOME", desc: "Qualified Inquiries" },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#F7D7B0]/20 border border-[#F7D7B0] space-y-1">
                  <span className="text-xs font-mono font-bold text-[#2E936F] block">{item.title}</span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 block font-medium">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          13. CONTINUOUS SEO LOOP — UNIQUE VERTICAL SCROLL-DRIVEN TIMELINE
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 bg-white dark:bg-[#000000] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <Badge variant="outline" className="mb-2.5 border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              CONTINUOUS SEO LOOP
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Continuous Search Engineering Loop.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Search optimization is an iterative cycle of observation, technical diagnosis, strategic prioritization, execution, and continuous refinement.
            </p>
          </div>

          {/* UNIQUE VERTICAL SCROLL-DRIVEN TIMELINE */}
          <div className="relative max-w-4xl mx-auto py-2">
            
            {/* Central Vertical Line for Desktop / Left-aligned for Mobile */}
            <div className="absolute left-4 md:left-1/2 top-4 bottom-14 w-0.5 -translate-x-1/2 bg-[#F7D7B0]" />

            <div className="space-y-10 md:space-y-12">
              {continuousSeoLoop.map((stage, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={stage.step}
                    initial={{ opacity: 0.4, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={cn(
                      "relative flex flex-col md:flex-row items-start md:items-center group cursor-pointer",
                      isEven ? "md:flex-row-reverse" : ""
                    )}
                  >
                    {/* Content Card (Alternating on Desktop: Left / Right, Single Column Left-Aligned on Mobile) */}
                    <div className={cn("w-full md:w-1/2 pl-12 md:pl-0", isEven ? "md:pr-10 md:text-right" : "md:pl-10 md:text-left")}>
                      <div className="p-5 rounded-2xl bg-white dark:bg-[#000000] border border-[#F7D7B0] group-hover:border-[#F15E1C] group-hover:bg-[#F7D7B0]/20 group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-300 shadow-xs space-y-1.5">
                        <div className={cn("flex items-center gap-2", isEven ? "md:justify-end" : "md:justify-start")}>
                          <span className="text-xs font-mono font-bold text-[#F15E1C] px-2.5 py-0.5 rounded bg-[#F7D7B0]/40 group-hover:bg-[#F15E1C] group-hover:text-[#FFFFFF] transition-colors">
                            STAGE {stage.step}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#F15E1C] transition-colors">
                          {stage.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                          {stage.desc}
                        </p>
                      </div>
                    </div>

                    {/* Numbered Node Indicator in Center (Desktop) or Left (Mobile) */}
                    <div className="absolute left-4 md:left-1/2 top-5 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-[#000000] border-2 border-[#F7D7B0] group-hover:border-[#F15E1C] group-hover:bg-[#F15E1C] flex items-center justify-center transition-all duration-300 shadow-xs z-10">
                      <span className="text-[11px] font-mono font-bold text-[#F15E1C] group-hover:text-[#FFFFFF]">
                        {stage.step}
                      </span>
                    </div>

                    {/* Spacer for opposite side on Desktop */}
                    <div className="hidden md:block w-1/2" />
                  </motion.div>
                );
              })}
            </div>

            {/* Return Loop Connector Path back to Stage 01 OBSERVE */}
            <div className="relative pt-8 flex flex-col items-center text-center">
              <div className="w-0.5 h-8 bg-gradient-to-b from-[#F7D7B0] to-[#F15E1C]" />
              <div className="px-4 py-1.5 rounded-full border border-[#F15E1C] bg-[#F7D7B0]/30 text-[#F15E1C] font-mono font-bold text-xs flex items-center gap-2 shadow-xs mt-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
                <span>CYCLE RETURNS TO 01 OBSERVE</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          14. SEO ENGAGEMENT MODELS
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#FAB60A] text-[#FAB60A] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              ENGAGEMENT STRUCTURES
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Different Search Problems Need Different SEO Engagements.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              We structure SEO partnerships around your current technical health, scale, and organic discovery goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {seoEngagementModels.map((model, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#000000] border border-[#F7D7B0] hover:border-[#F15E1C] hover:shadow-xl transition-all duration-300 space-y-5 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-[#F15E1C] uppercase block">{model.name}</span>
                  <h3 className="text-xl font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#F15E1C] transition-colors">{model.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{model.desc}</p>

                  <div className="pt-3 border-t border-[#F7D7B0] space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#2E936F] uppercase block">Core Deliverables</span>
                    {model.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F15E1C] shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/contact">
                    <Button3D variant="secondary" size="md" className="w-full bg-[#2E936F] text-[#FFFFFF] border-[#2E936F]">
                      Discuss {model.name}
                    </Button3D>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          15. SEO DIAGNOSTIC ASSESSMENT CTA
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 bg-white dark:bg-[#000000] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F7D7B0]/20 border border-[#F7D7B0] rounded-3xl p-8 sm:p-10 text-center max-w-3xl mx-auto space-y-5">
            <Badge variant="outline" className="border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              SEO ASSESSMENT
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1b2823] dark:text-[#ffffff]">
              Not Sure Where Search Is Breaking?
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed font-normal">
              Start with a structured view of your technical health, search intent, content architecture, visibility and conversion path.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
              <Link href="/contact">
                <Button3D variant="primary" size="lg" className="bg-[#F15E1C] text-[#FFFFFF] border-[#F15E1C]">
                  Request an SEO Assessment
                </Button3D>
              </Link>
              <Link href="/contact">
                <Button3D variant="secondary" size="lg" className="bg-[#2E936F] text-[#FFFFFF] border-[#2E936F]">
                  Talk to an SEO Specialist
                </Button3D>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          16. WHAT WE LOOK FOR — DIAGNOSTIC FRAMEWORK
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#2E936F] text-[#2E936F] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              DIAGNOSTIC CRITERIA
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              What We Look For in Every Audit.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Our evaluation isolates specific technical, structural, and content gaps across four critical diagnostic areas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { title: "Technical Friction", desc: "Indexing errors, canonical loops, rendering delays, and Core Web Vitals issues." },
              { title: "Intent Gaps", desc: "Pages ranking for commercial terms without proper conversion or value response." },
              { title: "Content Thinness", desc: "Orphaned topics, shallow articles, and missing internal linking loops." },
              { title: "Schema Deficits", desc: "Missing JSON-LD structured data and unverified brand entity signals." },
            ].map((diag, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-[#000000] border border-[#F7D7B0] space-y-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#F15E1C]" />
                <h4 className="text-base font-bold text-[#1b2823] dark:text-[#ffffff]">{diag.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{diag.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          17. INSIGHTS & BLOGS
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 bg-white dark:bg-[#000000] border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#F15E1C] text-[#F15E1C] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              KNOWLEDGE BASE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Search Intelligence &amp; Insights.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Read published analysis on technical SEO, search intent, entity visibility, and organic growth strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((post) => (
              <Link key={post.slug} href={`/insights/${post.slug}`} className="group block">
                <motion.div whileHover={{ y: -3 }} className="h-full p-6 rounded-2xl bg-white dark:bg-[#000000] border border-[#F7D7B0] hover:border-[#F15E1C] hover:shadow-md transition-all duration-300 shadow-xs flex flex-col justify-between">
                  <div>
                    <Badge variant="subtle" className="mb-2.5 text-[10px] bg-[#F7D7B0]/40 text-[#F15E1C] font-semibold">
                      {post.category}
                    </Badge>
                    <h3 className="text-base font-bold text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#F15E1C] transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[#F7D7B0] flex items-center justify-between text-xs font-semibold text-[#F15E1C]">
                    <span>Read Article</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/insights">
              <Button3D variant="secondary" size="md" className="bg-[#2E936F] text-[#FFFFFF] border-[#2E936F]">
                Explore All Insights
              </Button3D>
            </Link>
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          18. FAQ SECTION
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16 border-b border-[#F7D7B0]">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <Badge variant="outline" className="mb-2.5 border-[#2E936F] text-[#2E936F] bg-[#F7D7B0]/40 px-3 py-1 text-xs">
              QUESTIONS &amp; ANSWERS
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1b2823] dark:text-[#ffffff]">
              Frequently Asked Questions.
            </h2>
            <p className="mt-3 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Concise answers regarding technical SEO, search intent, AI search experiences, and measurement.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {seoFaqData.map((faq, index) => {
              const isOpen = openFaqIdx === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-[#F7D7B0] bg-white dark:bg-[#000000] overflow-hidden transition-all hover:border-[#F15E1C] hover:shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : index)}
                    className="w-full text-left p-4.5 flex items-center justify-between font-bold text-sm sm:text-base text-[#1b2823] dark:text-[#ffffff] hover:text-[#F15E1C] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-200 text-[#F15E1C]", isOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-4.5 pt-0 text-sm text-gray-600 dark:text-gray-300 border-t border-[#F7D7B0] leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <SystemScanTransition />

      {/* =====================================================================
          19. FINAL CTA
          ===================================================================== */}
      <section className="relative z-10 w-full py-10 sm:py-14 md:py-16">
        <div className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl p-8 sm:p-12 bg-[#2E936F] text-[#FFFFFF] border border-[#2E936F] shadow-2xl overflow-hidden text-center space-y-5">
            
            {/* Ambient Palette Glows */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#F15E1C]/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#FAB60A]/25 rounded-full blur-3xl pointer-events-none" />

            <Badge variant="outline" className="border-[#FFFFFF] text-[#FFFFFF] bg-[#FFFFFF]/10 px-3 py-1 font-semibold tracking-wider text-xs">
              TAKE THE NEXT STEP
            </Badge>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight text-[#FFFFFF]">
              Make Your Business Easier to Find.
            </h2>

            <p className="text-base sm:text-lg text-[#FFEC69] max-w-2xl mx-auto leading-relaxed font-medium">
              Build a search strategy that connects technical health, useful content, authority and measurement into one continuous system.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <Link href="/contact">
                <Button3D variant="primary" size="lg" className="flex items-center gap-2 font-semibold bg-[#F15E1C] text-[#FFFFFF] border-[#F15E1C] hover:opacity-95 transition-all">
                  Start Your SEO Assessment
                  <ArrowRight className="w-4 h-4" />
                </Button3D>
              </Link>
              <Link href="/contact">
                <Button3D variant="secondary" size="lg" className="flex items-center gap-2 font-medium bg-[#FFFFFF] text-[#2E936F] border-[#FFFFFF] hover:bg-[#F7D7B0] transition-all">
                  Talk to Our Search Team
                </Button3D>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default SEOInteractivePage;
