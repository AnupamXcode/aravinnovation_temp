"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  TrendingUp,
  Code2,
  ShieldCheck,
  BarChart3,
  Users2,
  Search,
  Cpu,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface ServiceItem {
  id: number;
  number: string;
  category: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  tone: string;
  href: string;
  iconName: string;
  outcomes: string[];
  objectPosition?: string;
  mobileObjectPosition?: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 0,
    number: "01",
    category: "IT STRATEGY",
    name: "IT Strategy & Implementation",
    shortName: "IT Strategy",
    description:
      "Aligns technology roadmaps with revenue goals; eliminates technical debt.",
    image: "/images/homepage-services/it-strategy-homepage.webp",
    tone: "#f15e1c",
    href: "/services/it-strategy-implementation",
    iconName: "Compass",
    outcomes: [
      "Cloud Strategy",
      "Legacy Modernization",
      "Infrastructure Roadmaps",
    ],
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
  {
    id: 1,
    number: "02",
    category: "DIGITAL GROWTH",
    name: "Digital Marketing & Brand Development",
    shortName: "Marketing & Brand",
    description:
      "Generates high-intent customer pipelines and accelerates brand authority across digital channels.",
    image: "/images/homepage-services/digital-marketing-homepage.webp",
    tone: "#2e936f",
    href: "/services/digital-marketing-brand-development",
    iconName: "TrendingUp",
    outcomes: [
      "Brand Growth Strategy",
      "Omnichannel Campaigns",
      "Performance Marketing",
    ],
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
  {
    id: 2,
    number: "03",
    category: "ENGINEERING",
    name: "Web & Application Development",
    shortName: "Web & App Dev",
    description:
      "Delivers secure, lightning-fast digital products optimized for user retention.",
    image: "/images/homepage-services/web-dev-homepage.webp",
    tone: "#fab60a",
    href: "/services/web-app-development",
    iconName: "Code2",
    outcomes: [
      "Enterprise Web",
      "Custom SaaS",
      "Mobile Apps & API Systems",
    ],
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
  {
    id: 3,
    number: "04",
    category: "GOVERNANCE",
    name: "Risk, Compliance & Governance",
    shortName: "Risk & Governance",
    description:
      "Protects business operations, data assets, and ensures regulatory readiness.",
    image: "/images/homepage-services/risk-compliance-homepage.webp",
    tone: "#f15e1c",
    href: "/services/risk-compliance-governance",
    iconName: "ShieldCheck",
    outcomes: [
      "Security Audits",
      "Risk Assessments",
      "Data Protection & Policy Governance",
    ],
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
  {
    id: 4,
    number: "05",
    category: "OPTIMIZATION",
    name: "Audit & Improvement",
    shortName: "Audit & Improvement",
    description:
      "Evaluates architecture, performance, and security benchmarks to drive measurable upgrades.",
    image: "/images/homepage-services/audit-improvement-homepage.webp",
    tone: "#2e936f",
    href: "/services/audit-improvement",
    iconName: "BarChart3",
    outcomes: [
      "Architecture Health Checks",
      "Performance Audits",
      "System Modernization Plans",
    ],
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
  {
    id: 5,
    number: "06",
    category: "TALENT",
    name: "Training & Staff Augmentation",
    shortName: "Training & Staff",
    description:
      "Scales engineering capability on demand without recruitment friction.",
    image: "/images/homepage-services/training-staff-homepage.webp",
    tone: "#fab60a",
    href: "/services/training-staff-augmentation",
    iconName: "Users2",
    outcomes: [
      "Dedicated Tech Teams",
      "Project Staffing",
      "Team Upskilling",
    ],
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
  {
    id: 6,
    number: "07",
    category: "SEARCH VISIBILITY",
    name: "SEO Services",
    shortName: "SEO & AEO",
    description:
      "Dominates search rankings, entity citations, and generative AI discovery engines with data-backed SEO.",
    image: "/images/homepage-services/seo-homepage.webp",
    tone: "#2e936f",
    href: "/services/seo-services",
    iconName: "Search",
    outcomes: [
      "Technical SEO Audits",
      "AEO & AI Search Optimization",
      "Topical Authority Hubs",
    ],
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
  {
    id: 7,
    number: "08",
    category: "AI & AUTOMATION",
    name: "AI Portfolio",
    shortName: "AI Portfolio",
    description:
      "Cuts manual operational overhead by up to 60%; speeds up decision-making with intelligent workflows.",
    image: "/images/homepage-services/ai-portfolio-homepage.webp",
    tone: "#f15e1c",
    href: "/services/ai-portfolio",
    iconName: "Cpu",
    outcomes: [
      "LLM Integration",
      "Custom Bots",
      "Intelligent Data Workflows",
    ],
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
];


const renderServiceIcon = (iconName: string, tone: string) => {
  const props = { className: "w-4 h-4 sm:w-5 sm:h-5 shrink-0" };
  switch (iconName) {
    case "Compass":
      return <Compass {...props} />;
    case "TrendingUp":
      return <TrendingUp {...props} />;
    case "Code2":
      return <Code2 {...props} />;
    case "ShieldCheck":
      return <ShieldCheck {...props} />;
    case "BarChart3":
      return <BarChart3 {...props} />;
    case "Users2":
      return <Users2 {...props} />;
    case "Search":
      return <Search {...props} />;
    case "Cpu":
      return <Cpu {...props} />;
    default:
      return <Sparkles {...props} />;
  }
};

export function InteractiveServiceStack3D() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const pinnedStageRef = React.useRef<HTMLDivElement>(null);
  const mobileCardRefs = React.useRef<(HTMLElement | null)[]>([]);

  const [activeServiceIdx, setActiveServiceIdx] = React.useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  // Synchronize ScrollTrigger Pinning on Desktop (>= 768px) with 80px Navbar Offset
  React.useEffect(() => {
    if (!trackRef.current || !pinnedStageRef.current) return;
    if (window.innerWidth < 768) return;

    let ctx: any;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: trackRef.current,
          start: "top 80px",
          end: "bottom bottom",
          pin: pinnedStageRef.current,
          pinSpacing: true,
          scrub: 0.1,
          onUpdate: (self) => {
            const step = Math.min(servicesData.length - 1, Math.max(0, Math.floor(self.progress * servicesData.length)));
            setActiveServiceIdx(step);
          },
        });
      }, trackRef);
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  // Mobile Focus-Zone Intersection Observer: naturally activates the card centered in the viewport during finger/touch scroll
  React.useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;

    const intersectingMap = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxStr = entry.target.getAttribute("data-service-idx");
          if (idxStr !== null) {
            const idx = parseInt(idxStr, 10);
            if (entry.isIntersecting) {
              intersectingMap.set(idx, entry.intersectionRatio);
            } else {
              intersectingMap.delete(idx);
            }
          }
        });

        if (intersectingMap.size > 0) {
          let maxIdx = -1;
          let maxRatio = -1;
          intersectingMap.forEach((ratio, idx) => {
            if (ratio > maxRatio) {
              maxRatio = ratio;
              maxIdx = idx;
            }
          });
          if (maxIdx !== -1) {
            setActiveServiceIdx((prev) => (prev !== maxIdx ? maxIdx : prev));
          }
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -25% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
      }
    );

    mobileCardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToMobileCard = (idx: number) => {
    setActiveServiceIdx(idx);
    const targetCard = mobileCardRefs.current[idx];
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const displayedIdx = hoveredIdx !== null ? hoveredIdx : activeServiceIdx;
  const currentService = servicesData[displayedIdx] || servicesData[0];

  return (
    <section className="relative w-full bg-[#FFFDF9] dark:bg-[#050505] transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28" id="services">
      {/* ========================================================================
          DESKTOP SCROLL-DRIVEN EXPLORATION (>= 768px Viewports)
          ======================================================================== */}
      <div ref={trackRef} className="hidden md:block relative w-full h-[280vh]">
        <div
          ref={pinnedStageRef}
          className="w-full h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] flex flex-col justify-between pt-3 sm:pt-4 pb-3 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden"
        >
          {/* Section Header (Always 100% Visible & Centered Below Navbar) */}
          <div className="text-center max-w-3xl mx-auto mb-2.5 sm:mb-3 space-y-1 shrink-0">
            <Badge variant="secondary" size="md">
              WHAT WE DO
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
              Enterprise Technology Practices
            </h2>
            <p className="text-xs sm:text-sm text-[#5A4A3F] dark:text-[#D8CBC0]">
              From technology strategy to implementation and digital growth, we solve complex business problems with practical, connected solutions.
            </p>
          </div>

          {/* Main 2-Column Exploration Stage */}
          <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-5 lg:gap-6 items-center flex-1 my-auto min-h-0">
            {/* Left Column: All 8 Services - Every Card is 100% Visible, Clickable & Hoverable */}
            <div className="col-span-5 space-y-1.5">
              {servicesData.map((service) => {
                const isHighlighted = service.id === displayedIdx;

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setActiveServiceIdx(service.id)}
                    onMouseEnter={() => setHoveredIdx(service.id)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    aria-label={`View ${service.name} practice details`}
                    className={cn(
                      "w-full h-[45px] sm:h-[48px] text-left px-3 py-1.5 rounded-xl border transition-all duration-200 flex items-center justify-between gap-2.5 group cursor-pointer relative overflow-hidden shrink-0 block",
                      isHighlighted
                        ? "bg-white dark:bg-[#16221d] border-[#f15e1c] shadow-md ring-2 ring-[#f15e1c]/20"
                        : "bg-white/80 dark:bg-[#0a0a0a]/80 border-[#f7d7b0]/60 dark:border-[#1a1a1a] hover:opacity-100 hover:border-[#f15e1c]/70 hover:bg-white dark:hover:bg-[#121212] hover:shadow-xs"
                    )}
                  >
                    {/* Active Accent Indicator */}
                    {isHighlighted && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#f15e1c]" />
                    )}

                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Step Badge */}
                      <span
                        className={cn(
                          "font-mono text-[11px] font-bold px-2 py-0.5 rounded-md shrink-0 transition-colors",
                          isHighlighted
                            ? "bg-[#f15e1c] text-white"
                            : "bg-[#fce3d3] dark:bg-[#1a1a1a] text-[#c2410c] dark:text-[#f15e1c] group-hover:bg-[#f15e1c] group-hover:text-white"
                        )}
                      >
                        {service.number}
                      </span>

                      {/* Icon */}
                      <div
                        className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                          isHighlighted
                            ? "bg-[#f15e1c]/10 text-[#f15e1c]"
                            : "text-[#5A4A3F] dark:text-[#A09085] group-hover:text-[#f15e1c]"
                        )}
                      >
                        {renderServiceIcon(service.iconName, service.tone)}
                      </div>

                      {/* Service Name */}
                      <span
                        className={cn(
                          "text-xs sm:text-[13.5px] font-extrabold font-display truncate transition-colors",
                          isHighlighted
                            ? "text-[#1b2823] dark:text-[#ffffff]"
                            : "text-[#4A3D35] dark:text-[#D8CBC0] group-hover:text-[#f15e1c]"
                        )}
                      >
                        {service.name}
                      </span>
                    </div>

                    <ArrowRight
                      className={cn(
                        "w-3.5 h-3.5 shrink-0 transition-transform duration-200",
                        isHighlighted
                          ? "text-[#f15e1c] translate-x-1"
                          : "text-[#7A6A5F] opacity-40 group-hover:opacity-100 group-hover:text-[#f15e1c] group-hover:translate-x-0.5"
                      )}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Column: Active Service Visual Showcase Canvas */}
            <div className="col-span-7">
              <div className="p-4 sm:p-5 lg:p-6 rounded-3xl bg-white dark:bg-[#0a0a0a] border-2 border-[#f15e1c]/30 shadow-xl space-y-3.5 relative overflow-hidden flex flex-col justify-between">
                {/* Background Subtle Gradient Glow */}
                <div
                  className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 transition-all duration-500"
                  style={{ backgroundColor: currentService.tone }}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentService.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="space-y-3.5 relative z-10"
                  >
                    {/* Header: Service Category */}
                    <div className="flex items-center justify-between border-b border-[#f7d7b0]/50 dark:border-[#1a1a1a] pb-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold shadow-xs"
                          style={{ backgroundColor: currentService.tone }}
                        >
                          {renderServiceIcon(currentService.iconName, "#ffffff")}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#227055] dark:text-[#74c4ab]">
                            {currentService.category}
                          </span>
                          <h3 className="text-lg lg:text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                            {currentService.name}
                          </h3>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-[#f15e1c]/10 text-[#f15e1c]">
                        {currentService.shortName}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#4A3D35] dark:text-[#D8CBC0] font-medium leading-relaxed">
                      {currentService.description}
                    </p>

                    {/* Enterprise Visual Showcase Image */}
                    <Link href={currentService.href} className="block group">
                      <div className="relative w-full aspect-[16/8.5] max-h-[220px] lg:max-h-[240px] rounded-2xl overflow-hidden border border-[#f7d7b0] dark:border-[#262626] shadow-sm bg-white dark:bg-[#080808]">
                        <Image
                          src={currentService.image}
                          alt={currentService.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    </Link>

                    {/* Core Outcomes List */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono font-bold text-[#f15e1c] uppercase tracking-wider">
                        Key Capabilities &amp; Deliverables
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {currentService.outcomes.map((outcome, i) => (
                          <div
                            key={i}
                            className="p-2 rounded-xl bg-[#fefaf5] dark:bg-[#141414] border border-[#f7d7b0]/60 dark:border-[#222222] flex items-center gap-1.5 text-[11px] font-semibold text-[#1b2823] dark:text-[#ffffff]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2e936f] shrink-0" />
                            <span className="line-clamp-2">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Footer CTA */}
                <div className="pt-3 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a] flex items-center justify-between relative z-10">
                  <span className="text-[11px] font-mono text-[#7A6A5F] dark:text-[#A09085]">
                    Scroll to explore services &bull; Click to view details
                  </span>
                  <Link href={currentService.href}>
                    <span className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#f15e1c] text-white font-semibold text-xs shadow-md hover:bg-[#d84e12] transition-all hover:shadow-lg hover:shadow-[#f15e1c]/25">
                      Explore Service <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="max-w-7xl mx-auto w-full pt-4 flex items-center justify-between text-xs font-mono text-[#7A6A5F] dark:text-[#A09085]">
            <span>ENTERPRISE TECHNOLOGY PRACTICES</span>
            <div className="flex items-center gap-2">
              <div className="w-48 h-2 rounded-full bg-[#f7d7b0]/50 dark:bg-[#1a1a1a] overflow-hidden">
                <div
                  className="h-full bg-[#f15e1c] transition-all duration-300"
                  style={{ width: `${((displayedIdx + 1) / servicesData.length) * 100}%` }}
                />
              </div>
              <span className="font-bold text-[#f15e1c]">SCROLL TO EXPLORE</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================
          MOBILE NATURAL SCROLL EXPLORATION (< 768px Viewports)
          ======================================================================== */}
      <div className="block md:hidden py-8 px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6 space-y-2">
          <Badge variant="secondary" size="md">
            WHAT WE DO
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
            Enterprise Services
          </h2>
          <p className="text-xs sm:text-sm text-[#5A4A3F] dark:text-[#D8CBC0]">
            Scroll to explore our enterprise practices with connected capabilities and proven delivery outcomes.
          </p>
        </div>

        {/* Sticky Mobile Quick-Jump Pill Bar */}
        <div className="sticky top-[60px] z-30 bg-[#FFFDF9]/95 dark:bg-[#050505]/95 backdrop-blur-md py-2 -mx-4 px-4 sm:-mx-6 sm:px-6 mb-5 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {servicesData.map((service) => {
              const isSel = service.id === activeServiceIdx;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => scrollToMobileCard(service.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap shrink-0 transition-all border flex items-center gap-1.5 cursor-pointer",
                    isSel
                      ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-md scale-[1.02]"
                      : "bg-white dark:bg-[#0a0a0a] text-[#4A3D35] dark:text-[#D8CBC0] border-[#f7d7b0] dark:border-[#1a1a1a]"
                  )}
                >
                  <span>{service.number}</span>
                  <span>{service.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* All Mobile Service Cards in Vertical Natural Scroll Flow */}
        <div className="space-y-6">
          {servicesData.map((service) => {
            const isActive = service.id === activeServiceIdx;

            return (
              <Link
                key={service.id}
                href={service.href}
                ref={(el) => {
                  mobileCardRefs.current[service.id] = el;
                }}
                data-service-idx={service.id}
                onClick={() => setActiveServiceIdx(service.id)}
                aria-label={`Explore ${service.name} - ${service.category}`}
                className={cn(
                  "rounded-2xl p-5 sm:p-6 transition-all duration-300 border-2 space-y-4 relative overflow-hidden cursor-pointer block group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f15e1c] active:scale-[0.99]",
                  isActive
                    ? "bg-white dark:bg-[#0a0a0a] border-[#f15e1c] shadow-xl ring-2 ring-[#f15e1c]/30"
                    : "bg-white/90 dark:bg-[#0a0a0a]/90 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-md hover:border-[#f15e1c]/50"
                )}
              >
                {/* Active Accent Bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#f15e1c]" />
                )}

                {/* Card Top: Number, Category & Icon */}
                <div className="flex items-center justify-between border-b border-[#f7d7b0]/50 dark:border-[#1a1a1a] pb-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "font-mono text-xs font-extrabold px-2.5 py-1 rounded-lg transition-colors",
                        isActive
                          ? "bg-[#f15e1c] text-white"
                          : "bg-[#fce3d3] dark:bg-[#161616] text-[#c2410c] dark:text-[#f15e1c]"
                      )}
                    >
                      {service.number}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#2e936f] uppercase tracking-wider">
                      {service.category}
                    </span>
                  </div>

                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-xs"
                    style={{ backgroundColor: service.tone }}
                  >
                    {renderServiceIcon(service.iconName, "#ffffff")}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors leading-snug">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#5A4A3F] dark:text-[#D8CBC0] leading-relaxed font-medium">
                  {service.description}
                </p>

                {/* 16:9 Image Showcase */}
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#f7d7b0] dark:border-[#262626] bg-white dark:bg-[#080808] shadow-md">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Deliverables / Outcomes Badges */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono font-bold text-[#f15e1c] uppercase tracking-wider block">
                    Key Capabilities &amp; Deliverables
                  </span>
                  {service.outcomes.map((outcome, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-[#1b2823] dark:text-[#ffffff] font-medium p-1.5 rounded-lg bg-[#fefaf5] dark:bg-[#141414] border border-[#f7d7b0]/50 dark:border-[#222222]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2e936f] shrink-0" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#7A6A5F] dark:text-[#A09085]">
                    Enterprise Practice
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f15e1c] text-white font-semibold text-xs shadow-md group-hover:bg-[#d84e12] transition-colors">
                    <span>Explore Practice</span> <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
