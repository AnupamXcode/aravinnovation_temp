"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValue,
} from "framer-motion";
import { CheckCircle2, ArrowRightLeft, AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function BeforeAfterSlider() {
  const t = useTranslations("BeforeAfter");
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [manualPos, setManualPos] = React.useState<number | null>(null);
  const [activePosDisplay, setActivePosDisplay] = React.useState<number>(0);

  // Scroll Progress Hook
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end 10%"],
  });

  // Hardware accelerated GPU motion values
  const scrollPosMotion = useTransform(scrollYProgress, [0.05, 0.95], [0, 100]);
  const smoothScrollPos = useSpring(scrollPosMotion, { stiffness: 140, damping: 26, mass: 0.2 });

  const rawTiltY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [6, 0, -6]);
  const rawScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.98, 1.01, 0.98]);

  const smoothTiltY = useSpring(rawTiltY, { stiffness: 120, damping: 24 });
  const smoothScale = useSpring(rawScale, { stiffness: 120, damping: 24 });

  // Effective Position (manual override if dragging/interacted, else scroll-linked)
  const currentPos = manualPos !== null ? manualPos : 0;

  // Sync motion value changes off React state loop to update activePosDisplay for pillar threshold highlighting
  React.useEffect(() => {
    const unsub = smoothScrollPos.on("change", (latest) => {
      if (manualPos === null) {
        setActivePosDisplay(Math.max(0, Math.min(100, latest)));
      }
    });
    return () => unsub();
  }, [smoothScrollPos, manualPos]);

  // Pointer drag calculation for manual slider mode
  const updatePositionFromPointer = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    setManualPos(percentage);
    setActivePosDisplay(percentage);
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
      setManualPos((prev) => Math.max(0, (prev ?? activePosDisplay) - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setManualPos((prev) => Math.min(100, (prev ?? activePosDisplay) + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setManualPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setManualPos(100);
    }
  };

  // Clip width motion transform
  const clipWidthStyle = useTransform(smoothScrollPos, (v) => `${manualPos !== null ? manualPos : Math.max(0, Math.min(100, v))}%`);
  const handleLeftStyle = useTransform(smoothScrollPos, (v) => `${manualPos !== null ? manualPos : Math.max(0, Math.min(100, v))}%`);

  return (
    <div ref={sectionRef} className="w-full relative py-4 transition-all duration-300">
      <div className="w-full space-y-4 relative">
        {/* Header Badge */}
        <div className="flex items-center justify-between px-2 sm:px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f7d7b0] dark:border-[#262626] bg-[#fce3d3] dark:bg-[#161616] text-[#f15e1c] text-xs font-mono font-extrabold shadow-xs">
            <ArrowRightLeft className="w-4 h-4 text-[#f15e1c] animate-pulse" />
            <span>Scroll or drag to transform</span>
          </div>

          <span className="text-[11px] font-mono font-bold text-[#4a5c55] dark:text-[#d3eee4] hidden sm:block">
            LEGACY ARCHITECTURE &rarr; ARAV ENGINEERED SYSTEM
          </span>
        </div>

        {/* 3D Perspective Container */}
        <div style={{ perspective: "1200px" }} className="w-full overflow-hidden">
          <motion.div
            ref={containerRef}
            role="slider"
            aria-label="Before and after architecture comparison"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(activePosDisplay)}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              rotateY: shouldReduceMotion ? 0 : smoothTiltY,
              scale: shouldReduceMotion ? 1 : smoothScale,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            className="relative w-full h-[480px] sm:h-[520px] md:h-[560px] rounded-[2.5rem] overflow-hidden select-none border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xl bg-[#ffffff] dark:bg-[#000000] cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-[#f15e1c] touch-pan-y transform-gpu"
          >
            {/* AFTER PANEL (Right Layer) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#fefaf5] to-[#f7d7b0]/60 dark:from-[#0a0a0a] dark:via-[#121212] dark:to-[#1a1a1a] p-6 sm:p-12 md:p-14 flex flex-col justify-between">
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

              {/* 4 Feature Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#f15e1c]/25">
                {[
                  { title: t("afterPillar1Title"), desc: t("afterPillar1Desc"), threshold: 20 },
                  { title: t("afterPillar2Title"), desc: t("afterPillar2Desc"), threshold: 45 },
                  { title: t("afterPillar3Title"), desc: t("afterPillar3Desc"), threshold: 70 },
                  { title: t("afterPillar4Title"), desc: t("afterPillar4Desc"), threshold: 90 },
                ].map((item, idx) => {
                  const isActive = activePosDisplay >= item.threshold;
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "p-3 sm:p-4 rounded-2xl border text-left transition-all duration-200 shadow-xs",
                        isActive
                          ? "bg-white dark:bg-[#161616] border-[#2e936f] shadow-md ring-1 ring-[#2e936f]/40"
                          : "bg-white/60 dark:bg-[#000000]/60 border-[#2e936f]/20 opacity-70"
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

            {/* BEFORE PANEL (Left Layer / Width Clipped) */}
            <motion.div
              style={{ width: clipWidthStyle, willChange: "width" }}
              className="absolute top-0 bottom-0 left-0 overflow-hidden bg-gradient-to-br from-[#fcf1e4] via-[#f7d7b0] to-[#f2bc7d] dark:from-[#1a1a1a] dark:via-[#121212] dark:to-[#0a0a0a] border-r-2 border-[#f15e1c] z-10"
            >
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
                      className="p-3 sm:p-4 rounded-2xl bg-white/80 dark:bg-[#000000]/80 border border-[#f7d7b0] dark:border-[#1a1a1a]"
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
            </motion.div>

            {/* DIVIDER & DRAG HANDLE */}
            <motion.div
              style={{ left: handleLeftStyle, willChange: "left" }}
              className="absolute top-0 bottom-0 -translate-x-1/2 flex items-center justify-center z-30 pointer-events-none"
            >
              <div className="w-[3px] h-full bg-[#f15e1c] shadow-lg shadow-[#f15e1c]/50" />
              <div className="absolute w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#f15e1c] text-white shadow-xl shadow-[#f15e1c]/50 flex items-center justify-center border-2 border-white dark:border-[#000000] pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
                <span className="font-mono text-xs sm:text-sm font-bold tracking-tighter text-white select-none">
                  &larr;&rarr;
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
