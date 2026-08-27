"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { CheckCircle2, ArrowRightLeft, AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

export function BeforeAfterSlider() {
  const t = useTranslations("BeforeAfter");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  // Slider percentage position (0 to 100)
  const [sliderPos, setSliderPos] = React.useState<number>(50);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  // Gentle initial sweep animation on scroll-into-view
  React.useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      const timer1 = setTimeout(() => setSliderPos(35), 400);
      const timer2 = setTimeout(() => setSliderPos(65), 1000);
      const timer3 = setTimeout(() => setSliderPos(50), 1600);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isInView, shouldReduceMotion]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 3) percentage = 3;
    if (percentage > 97) percentage = 97;
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Anchored Left-Corner Interactive Control Badge (IMAGE 2 REFINEMENT) */}
      <div className="flex items-center justify-between px-2 sm:px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] border border-[#f7d7b0] dark:border-[#31473f] text-xs font-mono font-extrabold text-[#f15e1c] shadow-xs">
          <ArrowRightLeft className="w-4 h-4 text-[#f15e1c]" />
          <span>Drag to compare</span>
        </div>
        <span className="text-[11px] font-mono font-bold text-[#4a5c55] dark:text-[#d3eee4] hidden sm:block">
          LEGACY FRICTION &rarr; ARAV ACCELERATION
        </span>
      </div>

      {/* Main Slider Frame */}
      <div
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[460px] sm:h-[500px] md:h-[540px] rounded-[2.5rem] overflow-hidden select-none border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl bg-[#ffffff] dark:bg-[#101b17] cursor-ew-resize transition-colors duration-300"
      >
        {/* AFTER PANEL (Right Layer / Brand Acceleration State) */}
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

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#f15e1c]/25">
            {[
              { title: t("afterPillar1Title"), desc: t("afterPillar1Desc") },
              { title: t("afterPillar2Title"), desc: t("afterPillar2Desc") },
              { title: t("afterPillar3Title"), desc: t("afterPillar3Desc") },
              { title: t("afterPillar4Title"), desc: t("afterPillar4Desc") },
            ].map((item, idx) => (
              <div key={idx} className="p-3 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#22312b] border border-[#2e936f]/30 text-left shadow-xs">
                <span className="text-xs sm:text-sm font-extrabold text-[#2e936f] block">{item.title}</span>
                <span className="text-[10px] sm:text-xs font-mono text-[#1b2823] dark:text-[#ffffff] mt-0.5 block">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BEFORE PANEL (Left Layer / Legacy Friction State - Width dynamically controlled) */}
        <div
          style={{ width: `${sliderPos}%` }}
          className="absolute top-0 bottom-0 left-0 overflow-hidden bg-gradient-to-br from-[#fcf1e4] via-[#f7d7b0] to-[#f2bc7d] dark:from-[#253630] dark:via-[#1e2c27] dark:to-[#172420] border-r-2 border-[#f15e1c] transition-colors duration-300 z-10"
        >
          {/* Inner Fixed Width Wrapper so content NEVER clips awkwardly */}
          <div className="w-[600px] sm:w-[850px] md:w-[1000px] h-full p-6 sm:p-12 md:p-14 flex flex-col justify-between text-left">
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
                <div key={idx} className="p-3 sm:p-4 rounded-2xl bg-white/80 dark:bg-[#101b17]/80 border border-[#f7d7b0] dark:border-[#253630]">
                  <span className="text-xs sm:text-sm font-bold text-[#1b2823] dark:text-[#ffffff] block">{item.title}</span>
                  <span className="text-[10px] sm:text-xs font-mono text-[#4a5c55] dark:text-[#d3eee4] mt-0.5 block">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SLIDER HANDLE (BRAND COLOR #f15e1c WITH ARROWS) */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="absolute top-0 bottom-0 -translate-x-1/2 flex items-center justify-center pointer-events-none z-30"
        >
          <div className="w-12 h-12 rounded-full bg-[#f15e1c] text-white shadow-xl shadow-[#f15e1c]/40 flex items-center justify-center border-2 border-white dark:border-[#101b17] pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-all">
            <span className="font-mono text-xs font-bold tracking-tighter">&larr;&rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
