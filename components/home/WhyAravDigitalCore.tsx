"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { whyAravPillarsData, WhyAravPillar } from "@/data/why-arav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Compass,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Lock,
  Users2,
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-5 h-5 shrink-0" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 shrink-0" />,
  TrendingUp: <TrendingUp className="w-5 h-5 shrink-0" />,
  Cpu: <Cpu className="w-5 h-5 shrink-0" />,
  Lock: <Lock className="w-5 h-5 shrink-0" />,
  Users2: <Users2 className="w-5 h-5 shrink-0" />,
  Sparkles: <Sparkles className="w-5 h-5 shrink-0" />,
};

interface WhyAravDigitalCoreProps {
  pillars?: WhyAravPillar[];
  headline?: string;
  subheadline?: string;
}

export function WhyAravDigitalCore({
  pillars = whyAravPillarsData,
  headline = "Engineered for Measurable Business Outcomes",
  subheadline = "Arav Innovations goes beyond generic digital service delivery. We align enterprise strategy, robust cloud architecture, and regulatory awareness to achieve verifiable business results.",
}: WhyAravDigitalCoreProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const pinnedStageRef = React.useRef<HTMLDivElement>(null);
  const touchStartRef = React.useRef<number | null>(null);

  const [activePillarIdx, setActivePillarIdx] = React.useState<number>(0);

  // Synchronize ScrollTrigger Pinning on Desktop (>= 768px)
  React.useEffect(() => {
    if (!trackRef.current || !pinnedStageRef.current) return;
    if (window.innerWidth < 768) return; // Use touch/tabs on mobile

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
          scrub: 0.1, // Smooth scrub for deterministic 1 scroll = 1 pillar step progress
          onUpdate: (self) => {
            // Map self.progress (0..1) strictly into 7 equal pillar steps (0..6)
            const step = Math.min(6, Math.max(0, Math.floor(self.progress * 7.0)));
            setActivePillarIdx(step);
          },
        });
      }, trackRef);
    });

    return () => {
      if (ctx) ctx.revert();
    };
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
        // Swipe left -> Next pillar (01 -> 02 -> ... -> 07)
        setActivePillarIdx((prev) => Math.min(6, prev + 1));
      } else {
        // Swipe right -> Previous pillar (07 -> 06 -> ... -> 01)
        setActivePillarIdx((prev) => Math.max(0, prev - 1));
      }
    }
    touchStartRef.current = null;
  };

  const mobileCardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // Mobile Focus-Zone Intersection Observer: naturally activates the centered pillar during touch/wheel scroll
  React.useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth >= 768) return;

    const intersectingMap = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idxStr = entry.target.getAttribute("data-pillar-idx");
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
            setActivePillarIdx((prev) => (prev !== maxIdx ? maxIdx : prev));
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

  const scrollToMobilePillar = (idx: number) => {
    setActivePillarIdx(idx);
    const target = mobileCardRefs.current[idx];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const activePillar = pillars[activePillarIdx] || pillars[0];

  return (
    <section className="relative w-full bg-[#FFFDF9] dark:bg-[#050505] transition-colors duration-300" id="why-arav">
      {/* DESKTOP SCROLL-DRIVEN PILLAR EXPLORATION (>= 768px) */}
      <div ref={trackRef} className="hidden md:block relative w-full h-[250vh]">
        <div
          ref={pinnedStageRef}
          className="w-full h-[calc(100vh-80px)] max-h-[calc(100vh-80px)] flex flex-col justify-between pt-3 pb-4 sm:pt-4 sm:pb-6 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden"
        >
          {/* Header Section (Always Visible at Top of Pinned Viewport) */}
          <div className="text-center max-w-4xl mx-auto mb-4 space-y-1.5 shrink-0">
            <Badge variant="secondary" size="md">
              WHY ARAV INNOVATIONS
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#2e936f] dark:text-[#ffffff] tracking-tight leading-tight">
              {headline}
            </h2>
            <p className="text-xs sm:text-sm text-[#5A4D44] dark:text-[#d3eee4] leading-relaxed max-w-2xl mx-auto font-medium">
              {subheadline}
            </p>
          </div>

          {/* Main 2-Column Composition */}
          <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-6 items-center flex-1 my-auto">
            {/* Left Column: All 7 Pillar Cards Visible Together (EXACTLY EQUAL SUBSTANTIAL SIZE) */}
            <div className="col-span-5 space-y-2">
              {pillars.map((pillar, idx) => {
                const isActive = idx === activePillarIdx;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActivePillarIdx(idx)}
                    className={cn(
                      "w-full h-[60px] text-left px-3.5 py-2 rounded-xl border transition-all duration-300 flex items-center gap-3 group cursor-pointer relative overflow-hidden shrink-0",
                      isActive
                        ? "bg-white dark:bg-[#16221d] border-[#f15e1c] shadow-md ring-2 ring-[#f15e1c]/20 scale-[1.015] -translate-y-0.5"
                        : "bg-white/80 dark:bg-[#0a0a0a]/80 border-[#f7d7b0]/60 dark:border-[#1a1a1a] hover:opacity-100 hover:border-[#f15e1c]/50 hover:bg-white dark:hover:bg-[#121212]"
                    )}
                  >
                    {/* Active Accent Indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#f15e1c]" />
                    )}

                    {/* Icon Box */}
                    <div
                      className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors shadow-xs",
                        isActive
                          ? "bg-[#f15e1c] text-white"
                          : "bg-[#f7d7b0]/50 dark:bg-[#161616] text-[#f15e1c] group-hover:bg-[#f15e1c] group-hover:text-white"
                      )}
                    >
                      {iconMap[pillar.icon] || <Zap className="w-4 h-4 shrink-0" />}
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold font-mono text-[#f15e1c] uppercase tracking-widest">
                          PILLAR {pillar.number}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#2e936f] dark:text-[#74c4ab] truncate">
                          {pillar.subtitle}
                        </span>
                      </div>
                      <h3
                        className={cn(
                          "text-xs sm:text-[14px] font-extrabold font-display truncate transition-colors",
                          isActive
                            ? "text-[#f15e1c]"
                            : "text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c]"
                        )}
                      >
                        {pillar.title}
                      </h3>
                    </div>

                    <ArrowRight
                      className={cn(
                        "w-4 h-4 shrink-0 transition-transform duration-300",
                        isActive
                          ? "text-[#f15e1c] translate-x-1"
                          : "text-transparent group-hover:text-[#f15e1c]"
                      )}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Column: Central Display Canvas for Active Pillar */}
            <div className="col-span-7">
              <div className="p-6 lg:p-8 rounded-3xl bg-white dark:bg-[#0a0a0a] border-2 border-[#f15e1c]/30 shadow-2xl space-y-5 relative overflow-hidden min-h-fit flex flex-col justify-between">
                {/* Background Subtle Gradient Glow */}
                <div
                  className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 transition-all duration-500 bg-[#f15e1c]"
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePillar.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-5 relative z-10"
                  >
                    {/* Header Badge & Number */}
                    <div className="flex items-center justify-between border-b border-[#f7d7b0]/50 dark:border-[#1a1a1a] pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#f15e1c]/10 text-[#f15e1c] flex items-center justify-center font-bold text-lg border border-[#f15e1c]/20 shadow-inner">
                          {iconMap[activePillar.icon] || <Zap className="w-5 h-5" />}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-[#2e936f] dark:text-[#74c4ab] font-extrabold tracking-widest">
                            ACTIVE ARCHITECTURAL PILLAR
                          </span>
                          <h3 className="text-xl lg:text-2xl font-black font-display text-[#f15e1c]">
                            {activePillar.title}
                          </h3>
                        </div>
                      </div>
                      <span className="text-3xl font-extrabold font-mono text-[#f15e1c]/40">
                        {activePillar.number}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm lg:text-base text-[#2e936f] dark:text-[#d3eee4] leading-relaxed font-medium">
                      {activePillar.description}
                    </p>

                    {/* Target Business Outcome Callout */}
                    <div className="p-4 rounded-2xl bg-[#f7d7b0]/40 dark:bg-[#141414] border border-[#f15e1c]/20 space-y-1">
                      <span className="text-xs font-mono font-bold text-[#2e936f] uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2e936f]" />
                        <span>Target Business Outcome</span>
                      </span>
                      <p className="text-sm font-bold font-display text-[#2e936f] dark:text-[#ffffff]">
                        {activePillar.businessOutcome}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Footer Progress & Audit CTA */}
                <div className="pt-4 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a] flex items-center justify-between relative z-10">
                  <span className="text-xs font-mono text-[#7A6A5F] dark:text-[#A09085]">
                    Architectural Focus &bull; Scroll to navigate
                  </span>
                  <Link href="/contact">
                    <Button
                      variant="primary"
                      size="sm"
                      className="rounded-full bg-[#f15e1c] hover:bg-[#d94e10]"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Schedule Technical Audit
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="max-w-7xl mx-auto w-full pt-6 flex items-center justify-between text-xs font-mono text-[#7A6A5F] dark:text-[#A09085]">
            <span>ENGINEERED FOR MEASURABLE BUSINESS OUTCOMES</span>
            <div className="flex items-center gap-2">
              <div className="w-48 h-2 rounded-full bg-[#f7d7b0]/50 dark:bg-[#1a1a1a] overflow-hidden">
                <div
                  className="h-full bg-[#f15e1c] transition-all duration-300"
                  style={{ width: `${((activePillarIdx + 1) / 7) * 100}%` }}
                />
              </div>
              <span className="font-bold text-[#f15e1c]">SCROLL TO EXPLORE</span>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE NATURAL SCROLL EXPLORATION (< 768px Viewports) */}
      <div className="block md:hidden py-8 px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6 space-y-2">
          <Badge variant="secondary" size="md">
            WHY ARAV INNOVATIONS
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#2e936f] dark:text-[#ffffff]">
            {headline}
          </h2>
          <p className="text-xs sm:text-sm text-[#5A4D44] dark:text-[#d3eee4]">
            Scroll to explore our core enterprise engineering pillars.
          </p>
        </div>

        {/* Sticky Mobile Quick-Jump Pill Bar */}
        <div className="sticky top-[60px] z-30 bg-[#FFFDF9]/95 dark:bg-[#050505]/95 backdrop-blur-md py-2 -mx-4 px-4 sm:-mx-6 sm:px-6 mb-5 border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {pillars.map((pillar, idx) => {
              const isSel = idx === activePillarIdx;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => scrollToMobilePillar(idx)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap shrink-0 transition-all border flex items-center gap-1.5 cursor-pointer",
                    isSel
                      ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-md scale-[1.02]"
                      : "bg-white dark:bg-[#0a0a0a] text-[#4A3D35] dark:text-[#D8CBC0] border-[#f7d7b0] dark:border-[#1a1a1a]"
                  )}
                >
                  <span>{pillar.number}</span>
                  <span>{pillar.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* All 7 Mobile Pillar Cards in Vertical Natural Scroll Flow */}
        <div className="space-y-6">
          {pillars.map((pillar, idx) => {
            const isActive = idx === activePillarIdx;

            return (
              <div
                key={pillar.id}
                ref={(el) => {
                  mobileCardRefs.current[idx] = el;
                }}
                data-pillar-idx={idx}
                onClick={() => setActivePillarIdx(idx)}
                className={cn(
                  "rounded-2xl p-5 sm:p-6 transition-all duration-300 border-2 space-y-4 relative overflow-hidden cursor-pointer",
                  isActive
                    ? "bg-white dark:bg-[#0a0a0a] border-[#f15e1c] shadow-xl ring-2 ring-[#f15e1c]/30"
                    : "bg-white/90 dark:bg-[#0a0a0a]/90 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-md hover:border-[#f15e1c]/50"
                )}
              >
                {/* Active Accent Bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#f15e1c]" />
                )}

                {/* Card Top: Number, Subtitle & Icon */}
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
                      {pillar.number}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#2e936f] uppercase tracking-wider">
                      {pillar.subtitle}
                    </span>
                  </div>

                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-xs bg-[#f15e1c]"
                  >
                    {iconMap[pillar.icon] || <Zap className="w-4 h-4 shrink-0" />}
                  </div>
                </div>

                {/* Pillar Title */}
                <h3 className="text-lg font-bold font-display text-[#1b2823] dark:text-[#ffffff] leading-snug">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#5A4D44] dark:text-[#d3eee4] leading-relaxed font-medium">
                  {pillar.description}
                </p>

                {/* Target Outcome Box */}
                <div className="p-3.5 rounded-xl bg-[#f7d7b0]/40 dark:bg-[#141414] border border-[#f15e1c]/20 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#1e6b50] dark:text-[#74c4ab] uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1e6b50] dark:text-[#74c4ab]" />
                    <span>Target Business Outcome</span>
                  </span>
                  <p className="text-xs font-bold font-display text-[#1e6b50] dark:text-[#ffffff]">
                    {pillar.businessOutcome}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#7A6A5F] dark:text-[#A09085]">
                    Architectural Focus
                  </span>
                  <Link href="/contact">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f15e1c] text-white font-semibold text-xs shadow-md hover:bg-[#d84e12] transition-colors">
                      Schedule Audit <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
