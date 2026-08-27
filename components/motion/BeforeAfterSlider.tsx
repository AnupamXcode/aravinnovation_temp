"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { GripVertical, CheckCircle2, ArrowRightLeft, AlertTriangle } from "lucide-react";
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
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
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
    <div className="w-full space-y-6">
      {/* Interactive Helper Pill */}
      <div className="flex items-center justify-center gap-2 text-center">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff] bg-[#f7d7b0]/70 dark:bg-[#253630] px-4 py-1.5 rounded-full border border-[#f7d7b0] dark:border-[#31473f] flex items-center gap-2 shadow-xs">
          <ArrowRightLeft className="w-4 h-4 text-[#f15e1c]" />
          {t("dragHelper")}
        </span>
      </div>

      {/* Main Slider Canvas Frame (Scaled Up as Major Feature) */}
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
        className="relative w-full h-[480px] sm:h-[540px] md:h-[580px] rounded-[3rem] overflow-hidden select-none border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl bg-[#ffffff] dark:bg-[#101b17] cursor-ew-resize transition-colors duration-300"
      >
        {/* AFTER PANEL (Right Layer / Brand Acceleration State) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#fefaf5] to-[#f7d7b0]/60 dark:from-[#172420] dark:via-[#1e2c27] dark:to-[#253630] p-8 sm:p-14 md:p-16 flex flex-col justify-between transition-colors duration-300">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f15e1c] text-white text-xs sm:text-sm font-mono font-extrabold shadow-md">
              <CheckCircle2 className="w-4.5 h-4.5" />
              <span>{t("afterBadge")}</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
              {t("afterTitle")}
            </h3>
            <p className="text-sm sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
              {t("afterDescription")}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#f15e1c]/25">
            {[
              { title: t("afterPillar1Title"), desc: t("afterPillar1Desc") },
              { title: t("afterPillar2Title"), desc: t("afterPillar2Desc") },
              { title: t("afterPillar3Title"), desc: t("afterPillar3Desc") },
              { title: t("afterPillar4Title"), desc: t("afterPillar4Desc") },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/90 dark:bg-[#22312b] border border-[#f15e1c]/30 dark:border-[#31473f] text-left shadow-xs">
                <span className="text-sm font-extrabold text-[#f15e1c] block">{item.title}</span>
                <span className="text-xs font-mono text-[#1b2823] dark:text-[#ffffff] mt-0.5 block">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BEFORE PANEL (Left Layer / Legacy Friction State) */}
        <div
          style={{ width: `${sliderPos}%` }}
          className="absolute top-0 bottom-0 left-0 overflow-hidden bg-gradient-to-br from-[#fcf1e4] via-[#f7d7b0] to-[#f2bc7d] dark:from-[#253630] dark:via-[#1e2c27] dark:to-[#172420] p-8 sm:p-14 md:p-16 flex flex-col justify-between border-r-2 border-[#f15e1c] transition-colors duration-300"
        >
          <div className="w-[540px] sm:w-[900px] space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fab60a]/20 dark:bg-[#fab60a]/15 text-[#1b2823] dark:text-[#f7d7b0] text-xs sm:text-sm font-mono font-bold border border-[#fab60a]/50">
              <AlertTriangle className="w-4.5 h-4.5 text-[#fab60a]" />
              <span>{t("beforeBadge")}</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
              {t("beforeTitle")}
            </h3>
            <p className="text-sm sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] max-w-xl leading-relaxed">
              {t("beforeDescription")}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#f2bc7d]/60 dark:border-[#31473f]">
              {[
                { title: t("beforePillar1Title"), desc: t("beforePillar1Desc") },
                { title: t("beforePillar2Title"), desc: t("beforePillar2Desc") },
                { title: t("beforePillar3Title"), desc: t("beforePillar3Desc") },
                { title: t("beforePillar4Title"), desc: t("beforePillar4Desc") },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/80 dark:bg-[#101b17]/80 border border-[#f7d7b0] dark:border-[#253630] text-left">
                  <span className="text-sm font-bold text-[#1b2823] dark:text-[#ffffff] block">{item.title}</span>
                  <span className="text-xs font-mono text-[#4a5c55] dark:text-[#d3eee4] mt-0.5 block">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3D DRAG HANDLE KNOB */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="absolute top-0 bottom-0 -translate-x-1/2 flex items-center justify-center pointer-events-none z-30 perspective-1000"
        >
          <div className="w-14 h-14 rounded-full bg-[#f15e1c] text-white shadow-2xl shadow-[#f15e1c]/50 flex items-center justify-center border-2 border-white dark:border-[#101b17] pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-115 transition-all duration-300 transform-style-3d animate-knob-rotate">
            <GripVertical className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
