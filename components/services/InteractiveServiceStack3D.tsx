"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
      "Enterprise roadmaps, cloud strategy, modernization and technology implementation aligned around real business outcomes.",
    image: "/images/homepage-services/it-strategy-homepage.webp",
    tone: "#f15e1c",
    href: "/services/it-strategy-implementation",
    iconName: "Compass",
    outcomes: [
      "Enterprise Cloud & Infrastructure Roadmaps",
      "Legacy System Modernization",
      "Technology Governance & Cost Optimization",
    ],
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
  {
    id: 1,
    number: "02",
    category: "DIGITAL GROWTH",
    name: "Digital Marketing & Brand Development",
    shortName: "Digital Marketing",
    description:
      "Brand strategy, digital campaigns and performance growth programs engineered to generate high-intent customer pipeline.",
    image: "/images/homepage-services/digital-marketing-homepage.webp",
    tone: "#2e936f",
    href: "/services/digital-marketing-brand-development",
    iconName: "TrendingUp",
    outcomes: [
      "B2B Brand Positioning & Messaging",
      "Multi-Channel Demand Generation",
      "Conversion Rate & ROI Optimization",
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
      "Scalable web applications, customer portals and mobile platforms engineered for high reliability and modern performance.",
    image: "/images/homepage-services/web-dev-homepage.webp",
    tone: "#fab60a",
    href: "/services/web-app-development",
    iconName: "Code2",
    outcomes: [
      "Custom Enterprise Web Applications",
      "Microservices & API Architecture",
      "Performance & Security Optimization",
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
      "Practical frameworks for privacy, security, regulatory compliance (DPDP, ISO 27001) and responsible technology operations.",
    image: "/images/homepage-services/risk-compliance-homepage.webp",
    tone: "#f15e1c",
    href: "/services/risk-compliance-governance",
    iconName: "ShieldCheck",
    outcomes: [
      "DPDP & GDPR Data Privacy Readiness",
      "ISO 27001 & SOC 2 Security Governance",
      "Automated Control & Evidence Frameworks",
    ],
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
  {
    id: 4,
    number: "05",
    category: "DIAGNOSTICS",
    name: "Audit & Improvement",
    shortName: "Audit & Improvement",
    description:
      "Technical, operational and process assessments that identify friction and outline clear, practical improvement steps.",
    image: "/images/homepage-services/audit-improvement-homepage.webp",
    tone: "#2e936f",
    href: "/services/audit-improvement",
    iconName: "BarChart3",
    outcomes: [
      "Architecture & Code Quality Audits",
      "Performance & Bottleneck Analysis",
      "Actionable Remediation Blueprints",
    ],
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
  {
    id: 5,
    number: "06",
    category: "TALENT",
    name: "Training & Staff Augmentation",
    shortName: "Staff Augmentation",
    description:
      "Pre-vetted senior technology talent and structured training support that strengthens internal engineering capability.",
    image: "/images/homepage-services/training-staff-homepage.webp",
    tone: "#f15e1c",
    href: "/services/training-staff-augmentation",
    iconName: "Users2",
    outcomes: [
      "Dedicated Senior Engineering Talent",
      "Specialized Technical Skill Augmentation",
      "Internal Capability Building & Mentorship",
    ],
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
  {
    id: 6,
    number: "07",
    category: "SEARCH",
    name: "SEO Services",
    shortName: "SEO Services",
    description:
      "Technical SEO, search architecture and content strategy focused on sustainable organic visibility and growth.",
    image: "/images/homepage-services/seo-homepage.webp",
    tone: "#fab60a",
    href: "/services/seo-services",
    iconName: "Search",
    outcomes: [
      "Technical Crawlability & Site Architecture",
      "High-Intent Organic Search Strategy",
      "Authority Building & Sustainable Rankings",
    ],
    objectPosition: "center center",
    mobileObjectPosition: "center center",
  },
  {
    id: 7,
    number: "08",
    category: "INTELLIGENCE",
    name: "AI Portfolio",
    shortName: "AI Portfolio",
    description:
      "Practical AI solutions, workflow automation and intelligent systems aligned with real enterprise business use cases.",
    image: "/images/homepage-services/ai-portfolio-homepage.webp",
    tone: "#f15e1c",
    href: "/products",
    iconName: "Cpu",
    outcomes: [
      "Enterprise AI Integration & Automation",
      "Custom Agentic AI & Workflow Engines",
      "Real-Time Telemetry & Data Intelligence",
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
  const touchStartRef = React.useRef<number | null>(null);

  const [activeServiceIdx, setActiveServiceIdx] = React.useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  // Synchronize ScrollTrigger Pinning on Desktop (>= 768px) with 84px Navbar Offset
  React.useEffect(() => {
    if (!trackRef.current || !pinnedStageRef.current) return;
    if (window.innerWidth < 768) return; // Use native touch/tabs on mobile

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top 80px", // Pin strictly at 80px from viewport top (below navbar)
        end: "bottom bottom",
        pin: pinnedStageRef.current,
        pinSpacing: true,
        scrub: 0.1, // Smooth 0.1s scrub for deterministic 1 scroll = 1 service step progress
        onUpdate: (self) => {
          // Map self.progress (0..1) strictly into 8 equal service steps (0..7)
          const step = Math.min(7, Math.max(0, Math.floor(self.progress * 8.0)));
          setActiveServiceIdx(step);
        },
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  // Touch Swipe Gesture Handler for Mobile Viewports
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diffX = touchStartRef.current - touchEnd;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        // Swipe left -> Next service step
        setActiveServiceIdx((prev) => Math.min(7, prev + 1));
      } else {
        // Swipe right -> Previous service step
        setActiveServiceIdx((prev) => Math.max(0, prev - 1));
      }
    }
    touchStartRef.current = null;
  };

  const displayedIdx = hoveredIdx !== null ? hoveredIdx : activeServiceIdx;
  const currentService = servicesData[displayedIdx] || servicesData[0];

  return (
    <section className="relative w-full bg-[#FFFDF9] dark:bg-[#050505] transition-colors duration-300 scroll-mt-24 sm:scroll-mt-28" id="services">
      {/* DESKTOP SCROLL-DRIVEN EXPLORATION (Hidden on mobile < 768px) */}
      <div ref={trackRef} className="hidden md:block relative w-full h-[280vh]">
        <div
          ref={pinnedStageRef}
          className="w-full h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] flex flex-col justify-between pt-3 sm:pt-4 pb-3 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden"
        >
          {/* Section Header (Always 100% Visible & Centered Below Navbar) */}
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
                  <Link
                    key={service.id}
                    href={service.href}
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
                  </Link>
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

                    {/* Enterprise Visual Showcase Image (100% Complete & Aspect-Ratio 16:9 Fit) */}
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

      {/* MOBILE INTERACTIVE EXPLORATION (< 768px Viewports) */}
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
            Tap or swipe to explore our enterprise practices.
          </p>
        </div>

        {/* Mobile Service Selector Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
          {servicesData.map((service) => {
            const isSel = service.id === activeServiceIdx;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveServiceIdx(service.id)}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap shrink-0 transition-all border flex items-center gap-1.5",
                  isSel
                    ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-md"
                    : "bg-white dark:bg-[#0a0a0a] text-[#4A3D35] dark:text-[#D8CBC0] border-[#f7d7b0] dark:border-[#1a1a1a]"
                )}
              >
                <span>{service.number}</span>
                <span>{service.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Active Mobile Service Card with Touch Swipe & Clickable Link */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="rounded-2xl bg-white dark:bg-[#0a0a0a] border-2 border-[#f15e1c]/40 shadow-xl overflow-hidden touch-pan-y"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentService.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="p-5 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#f7d7b0]/50 dark:border-[#1a1a1a] pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-lg bg-[#f15e1c] text-white">
                    {currentService.number}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-[#2e936f] uppercase tracking-wider">
                    {currentService.category}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#f15e1c]">
                  Enterprise Practice
                </span>
              </div>

              <Link href={currentService.href} className="block group">
                <h3 className="text-lg font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                  {currentService.name}
                </h3>

                <p className="text-xs text-[#5A4A3F] dark:text-[#D8CBC0] leading-relaxed font-medium mt-2">
                  {currentService.description}
                </p>

                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#f7d7b0] dark:border-[#262626] bg-white dark:bg-[#080808] shadow-md mt-3">
                  <Image
                    src={currentService.image}
                    alt={currentService.name}
                    fill
                    sizes="100vw"
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </Link>

              <div className="space-y-1.5 pt-1">
                {currentService.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#1b2823] dark:text-[#ffffff] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2e936f] shrink-0" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>

              {/* Navigation Controls & CTA */}
              <div className="pt-3 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveServiceIdx((prev) => Math.max(0, prev - 1))}
                    disabled={activeServiceIdx === 0}
                    aria-label="Previous service"
                    className="w-9 h-9 rounded-xl bg-[#fefaf5] dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] flex items-center justify-center disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#f15e1c]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveServiceIdx((prev) => Math.min(servicesData.length - 1, prev + 1))}
                    disabled={activeServiceIdx === servicesData.length - 1}
                    aria-label="Next service"
                    className="w-9 h-9 rounded-xl bg-[#fefaf5] dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] flex items-center justify-center disabled:opacity-40"
                  >
                    <ChevronRight className="w-4 h-4 text-[#f15e1c]" />
                  </button>
                </div>

                <Link href={currentService.href} className="flex-1 text-right">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f15e1c] text-white font-semibold text-xs shadow-md">
                    Explore Practice <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
