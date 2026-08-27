"use client";

import * as React from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { CheckCircle2, ArrowRightLeft, AlertTriangle, ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function BeforeAfterSlider() {
  const t = useTranslations("BeforeAfter");
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Has the initial scroll-controlled intro completed?
  const [hasCompletedIntro, setHasCompletedIntro] = React.useState<boolean>(false);
  // Manual drag position (0 to 100)
  const [sliderPos, setSliderPos] = React.useState<number>(0);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  // Framer Motion scroll hook bound to sectionRef
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 25%"],
  });

  // Handle scroll-driven animation during initial intro
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (hasCompletedIntro || shouldReduceMotion) return;

    // Map scroll progress (0 to 1) directly to slider position (0 to 100)
    // 0% -> 0 (Left), 100% -> 100 (Right)
    const newPos = Math.max(0, Math.min(100, latest * 100));
    setSliderPos(newPos);

    // Complete intro when reaching ~95%
    if (latest >= 0.95) {
      setHasCompletedIntro(true);
      setSliderPos(100);
    }
  });

  // Initialize reduced motion users directly to manual mode with 50% split
  React.useEffect(() => {
    if (shouldReduceMotion) {
      setHasCompletedIntro(true);
      setSliderPos(50);
    }
  }, [shouldReduceMotion]);

  // Pointer drag calculation for manual slider mode
  const updatePositionFromPointer = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    setSliderPos(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePositionFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      updatePositionFromPointer(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // Keyboard Navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPos((prev) => Math.max(0, prev - 5));
      setHasCompletedIntro(true);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPos((prev) => Math.min(100, prev + 5));
      setHasCompletedIntro(true);
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPos(0);
      setHasCompletedIntro(true);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPos(100);
      setHasCompletedIntro(true);
    }
  };

  return (
    <div
      ref={sectionRef}
      className={cn(
        "w-full transition-all duration-300",
        !hasCompletedIntro && !shouldReduceMotion ? "min-h-[140vh] relative" : "h-auto"
      )}
    >
      <div
        className={cn(
          "w-full space-y-4",
          !hasCompletedIntro && !shouldReduceMotion
            ? "sticky top-20 sm:top-24 z-20 transition-all"
            : "relative"
        )}
      >
        {/* Dynamic Header Badge: "Scroll to transform" vs "Drag to compare" */}
        <div className="flex items-center justify-between px-2 sm:px-4">
          <div
            className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-extrabold transition-all duration-500 shadow-xs",
              !hasCompletedIntro
                ? "bg-[#fce3d3] dark:bg-[#261f1a] border-[#f15e1c] text-[#f15e1c] animate-pulse"
                : "bg-[#fce3d3] dark:bg-[#261f1a] border-[#f7d7b0] dark:border-[#31473f] text-[#f15e1c]"
            )}
          >
            {!hasCompletedIntro ? (
              <>
                <ArrowDown className="w-4 h-4 text-[#f15e1c] animate-bounce" />
                <span>Scroll to transform</span>
              </>
            ) : (
              <>
                <ArrowRightLeft className="w-4 h-4 text-[#f15e1c]" />
                <span>Drag to compare</span>
              </>
            )}
          </div>

          <span className="text-[11px] font-mono font-bold text-[#4a5c55] dark:text-[#d3eee4] hidden sm:block">
            LEGACY ARCHITECTURE &rarr; ARAV ENGINEERED SYSTEM
          </span>
        </div>

        {/* Main Comparison Container */}
        <div
          ref={containerRef}
          role="slider"
          aria-label="Before and after architecture comparison"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPos)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full h-[480px] sm:h-[520px] md:h-[560px] rounded-[2.5rem] overflow-hidden select-none border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl bg-[#ffffff] dark:bg-[#101b17] cursor-ew-resize transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#f15e1c] touch-pan-y"
        >
          {/* =========================================================================
              AFTER PANEL (Right Layer / Modern Arav Engineered System)
              ========================================================================= */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#fefaf5] to-[#f7d7b0]/60 dark:from-[#172420] dark:via-[#1e2c27] dark:to-[#253630] p-6 sm:p-12 md:p-14 flex flex-col justify-between transition-colors duration-300">
            <div className="space-y-4 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2e936f] text-white text-xs sm:text-sm font-mono font-extrabold shadow-md">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t("afterBadge")}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
                {t("afterTitle")}
              </h3>
              <p className="text-xs sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                {t("afterDescription")}
              </p>
            </div>

            {/* 4 Feature Pillars with Progressive Scroll Activation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#f15e1c]/25">
              {[
                { title: t("afterPillar1Title"), desc: t("afterPillar1Desc"), threshold: 20 },
                { title: t("afterPillar2Title"), desc: t("afterPillar2Desc"), threshold: 45 },
                { title: t("afterPillar3Title"), desc: t("afterPillar3Desc"), threshold: 70 },
                { title: t("afterPillar4Title"), desc: t("afterPillar4Desc"), threshold: 90 },
              ].map((item, idx) => {
                const isActive = sliderPos >= item.threshold;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "p-3 sm:p-4 rounded-2xl border text-left transition-all duration-300 shadow-xs",
                      isActive
                        ? "bg-white dark:bg-[#22312b] border-[#2e936f] shadow-md scale-102 ring-1 ring-[#2e936f]/40"
                        : "bg-white/60 dark:bg-[#101b17]/60 border-[#2e936f]/20 opacity-70"
                    )}
                  >
                    <span
                      className={cn(
                        "text-xs sm:text-sm font-extrabold block transition-colors",
                        isActive ? "text-[#f15e1c]" : "text-[#2e936f]"
                      )}
                    >
                      {item.title}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono text-[#1b2823] dark:text-[#ffffff] mt-0.5 block">
                      {item.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              BEFORE PANEL (Left Layer / Legacy Architecture - Width dynamically clipped)
              ========================================================================= */}
          <div
            style={{ width: `${sliderPos}%` }}
            className="absolute top-0 bottom-0 left-0 overflow-hidden bg-gradient-to-br from-[#fcf1e4] via-[#f7d7b0] to-[#f2bc7d] dark:from-[#253630] dark:via-[#1e2c27] dark:to-[#172420] border-r-2 border-[#f15e1c] transition-colors duration-300 z-10"
          >
            {/* Inner Fixed Width Wrapper so text & layout NEVER clip awkwardly */}
            <div className="w-[600px] sm:w-[850px] md:w-[1100px] lg:w-[1280px] h-full p-6 sm:p-12 md:p-14 flex flex-col justify-between text-left">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f15e1c] text-white text-xs sm:text-sm font-mono font-extrabold shadow-md">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{t("beforeBadge")}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
                  {t("beforeTitle")}
                </h3>
                <p className="text-xs sm:text-base text-[#4a5c55] dark:text-[#d3eee4] max-w-xl leading-relaxed">
                  {t("beforeDescription")}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#f15e1c]/30">
                {[
                  { title: t("beforePillar1Title"), desc: t("beforePillar1Desc") },
                  { title: t("beforePillar2Title"), desc: t("beforePillar2Desc") },
                  { title: t("beforePillar3Title"), desc: t("beforePillar3Desc") },
                  { title: t("beforePillar4Title"), desc: t("beforePillar4Desc") },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 rounded-2xl bg-white/80 dark:bg-[#101b17]/80 border border-[#f7d7b0] dark:border-[#253630]"
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#1b2823] dark:text-[#ffffff] block">
                      {item.title}
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono text-[#4a5c55] dark:text-[#d3eee4] mt-0.5 block">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =========================================================================
              DIVIDER & DRAG HANDLE (#f15e1c ORANGE WITH ↔ ICON)
              ========================================================================= */}
          <div
            style={{ left: `${sliderPos}%` }}
            className="absolute top-0 bottom-0 -translate-x-1/2 flex items-center justify-center z-30 pointer-events-none"
          >
            {/* Primary Orange Vertical Divider Line */}
            <div className="w-[3px] h-full bg-[#f15e1c] shadow-lg shadow-[#f15e1c]/50" />

            {/* Circular Handle Button */}
            <div className="absolute w-12 h-12 rounded-full bg-[#f15e1c] text-white shadow-xl shadow-[#f15e1c]/50 flex items-center justify-center border-2 border-white dark:border-[#101b17] pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-all">
              <span className="font-mono text-sm font-bold tracking-tighter text-white select-none">
                &larr;&rarr;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
