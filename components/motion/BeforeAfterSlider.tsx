"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { GripVertical, CheckCircle2, ArrowRightLeft, AlertTriangle } from "lucide-react";

export function BeforeAfterSlider() {
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
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* Interactive Helper Pill */}
      <div className="flex items-center justify-center gap-2 text-center">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE] bg-[#FCE3D3]/70 dark:bg-[#2A221C] px-3 py-1 rounded-full border border-[#EFE2D6] dark:border-[#2C241E] flex items-center gap-1.5 shadow-xs">
          <ArrowRightLeft className="w-3.5 h-3.5 text-[#E8672A]" />
          Drag slider to compare transformation
        </span>
      </div>

      {/* Main Slider Canvas Frame */}
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
        className="relative w-full h-[420px] sm:h-[480px] rounded-3xl overflow-hidden select-none border-2 border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl bg-[#FAF5EE] dark:bg-[#161310] cursor-ew-resize transition-colors duration-300"
      >
        {/* AFTER PANEL (Right Layer / Brand Acceleration State) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EE] to-[#FCE3D3]/60 dark:from-[#221D18] dark:via-[#1C1814] dark:to-[#2C221C] p-8 sm:p-12 flex flex-col justify-between transition-colors duration-300">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8672A] text-white text-xs font-mono font-extrabold shadow-md">
              <CheckCircle2 className="w-4 h-4" />
              <span>AFTER &bull; ARAV ENGINEERED SYSTEM</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              Cloud-Native, Automated &amp; Scalable
            </h3>
            <p className="text-xs sm:text-base text-[#7A6A5F] dark:text-[#B8ACA0] max-w-lg leading-relaxed font-medium">
              Sub-second page speeds, zero-trust security governance, automated CI/CD deployment pipelines, and predictable infrastructure costs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E8672A]/20">
            {[
              { title: "Cloud-Native", desc: "Serverless & Microservices" },
              { title: "Automated", desc: "Zero-Downtime CI/CD" },
              { title: "Observable", desc: "Real-Time Telemetry" },
              { title: "Scalable", desc: "Elastic High-Availability" },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-white/90 dark:bg-[#28211B] border border-[#E8672A]/30 dark:border-[#3D332B] text-left shadow-xs">
                <span className="text-xs font-extrabold text-[#E8672A] block">{item.title}</span>
                <span className="text-[10px] font-mono text-[#3A2E27] dark:text-[#FAF5EE]">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BEFORE PANEL (Left Layer / Legacy Friction State) */}
        <div
          style={{ width: `${sliderPos}%` }}
          className="absolute top-0 bottom-0 left-0 overflow-hidden bg-gradient-to-br from-[#F5EBE1] via-[#EBE0D3] to-[#E2D6C6] dark:from-[#2A231D] dark:via-[#221C17] dark:to-[#1A1511] p-8 sm:p-12 flex flex-col justify-between border-r-2 border-[#E8672A] transition-colors duration-300"
        >
          <div className="w-[500px] sm:w-[850px] space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5D7C8] dark:bg-[#382E26] text-[#5C4E43] dark:text-[#D4C4B5] text-xs font-mono font-bold border border-[#C8B8A6] dark:border-[#4D3F34]">
              <AlertTriangle className="w-4 h-4 text-[#D97706] dark:text-[#F59E0B]" />
              <span>BEFORE &bull; LEGACY ARCHITECTURE</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-[#4A3D33] dark:text-[#E8DDD2]">
              Slow, Fragmented &amp; Manual
            </h3>
            <p className="text-xs sm:text-base text-[#6E5E52] dark:text-[#B8ACA0] max-w-lg leading-relaxed">
              Frequent system timeouts during peak traffic, spiraling on-premise maintenance costs, manual deployment bottlenecks, and compliance vulnerabilities.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#C8B8A6]/60 dark:border-[#4D3F34]">
              {[
                { title: "Monolithic", desc: "Legacy Single-Point Bottlenecks" },
                { title: "Fragmented", desc: "Disconnected Data Silos" },
                { title: "Manual", desc: "Error-Prone Deployments" },
                { title: "Expensive", desc: "Unpredictable On-Prem Costs" },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white/70 dark:bg-[#1C1814]/80 border border-[#D8C9B8] dark:border-[#3D332B] text-left">
                  <span className="text-xs font-bold text-[#4A3D33] dark:text-[#FAF5EE] block">{item.title}</span>
                  <span className="text-[10px] font-mono text-[#6E5E52] dark:text-[#B8ACA0]">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DRAG HANDLE BAR */}
        <div
          style={{ left: `${sliderPos}%` }}
          className="absolute top-0 bottom-0 -translate-x-1/2 flex items-center justify-center pointer-events-none z-30"
        >
          <div className="w-10 h-10 rounded-full bg-[#E8672A] text-white shadow-2xl flex items-center justify-center border-2 border-white pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
            <GripVertical className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
