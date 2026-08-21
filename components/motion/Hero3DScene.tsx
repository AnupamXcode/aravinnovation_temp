"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Cpu, TrendingUp, ShieldCheck, CheckCircle2, Sparkles, Layers, Terminal } from "lucide-react";

export function Hero3DScene() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Mouse tracking motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 3D tilt
  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  // Parallax offsets for floating items
  const floatX1 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const floatY1 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);
  const floatX2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [25, -25]), springConfig);
  const floatY2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [25, -25]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg mx-auto perspective-1200 py-6 select-none"
    >
      {/* 3D Transform Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative transition-shadow duration-300"
      >
        {/* Floating 3D Orbit Badge 1 */}
        <motion.div
          style={{
            x: floatX1,
            y: floatY1,
            translateZ: 80,
          }}
          className="absolute -top-6 -left-6 z-30 p-3.5 rounded-2xl bg-white/90 dark:bg-[#1C1814]/90 backdrop-blur-md border border-[#EFE2D6] dark:border-[#3D332B] shadow-xl flex items-center gap-2.5"
        >
          <div className="p-2 rounded-xl bg-[#E8672A] text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
              Next.js & Cloud-Native
            </div>
            <div className="text-[9px] font-semibold text-[#E8672A]">
              100/100 Core Web Vitals
            </div>
          </div>
        </motion.div>

        {/* Floating 3D Orbit Badge 2 */}
        <motion.div
          style={{
            x: floatX2,
            y: floatY2,
            translateZ: 70,
          }}
          className="absolute -bottom-6 -right-6 z-30 p-3.5 rounded-2xl bg-white/90 dark:bg-[#1C1814]/90 backdrop-blur-md border border-[#EFE2D6] dark:border-[#3D332B] shadow-xl flex items-center gap-2.5"
        >
          <div className="p-2 rounded-xl bg-[#FCE3D3] dark:bg-[#261F1A] text-[#E8672A] border border-[#F4A97F]/40 dark:border-[#3D332B]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
              Cross-Border Hubs
            </div>
            <div className="text-[9px] font-mono text-[#7A6A5F] dark:text-[#B8ACA0]">
              IND &bull; UAE Compliant
            </div>
          </div>
        </motion.div>

        {/* Main 3D Card */}
        <div
          style={{
            transform: "translateZ(30px)",
            transformStyle: "preserve-3d",
          }}
          className="rounded-3xl bg-white/95 dark:bg-[#171411]/95 backdrop-blur-md p-6 sm:p-8 border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl space-y-6 relative overflow-hidden"
        >
          {/* Card Header Bar */}
          <div className="flex items-center justify-between border-b border-[#EFE2D6] dark:border-[#2C241E] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#E8672A]" />
              <div className="w-3 h-3 rounded-full bg-[#F4A97F]" />
              <div className="w-3 h-3 rounded-full bg-[#EFE2D6] dark:bg-[#3D332B]" />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#7A6A5F] dark:text-[#B8ACA0]">
              <Terminal className="w-3.5 h-3.5 text-[#E8672A]" />
              <span>arav.core.architecture</span>
            </div>
          </div>

          {/* 3 Interactive Stack Layers */}
          <div className="space-y-3.5">
            {/* Layer 1 */}
            <div className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1E1915] border border-[#EFE2D6] dark:border-[#2C241E] flex items-start gap-3.5 transition-transform hover:translate-x-1 duration-200">
              <div className="p-2.5 rounded-xl bg-[#E8672A] text-white shrink-0 shadow-xs">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                  Modern Software Engineering
                </h4>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] mt-0.5">
                  App Router architecture, TypeScript, and cloud-native microservices.
                </p>
              </div>
            </div>

            {/* Layer 2 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] flex items-start gap-3.5 shadow-xs transition-transform hover:translate-x-1 duration-200">
              <div className="p-2.5 rounded-xl bg-[#FCE3D3] dark:bg-[#261F1A] text-[#E8672A] shrink-0 border border-[#F4A97F]/40 dark:border-[#3D332B]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                  Revenue & Growth Acceleration
                </h4>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] mt-0.5">
                  Technical SEO, ABM demand generation, and closed-loop CRM attribution.
                </p>
              </div>
            </div>

            {/* Layer 3 */}
            <div className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1E1915] border border-[#EFE2D6] dark:border-[#2C241E] flex items-start gap-3.5 transition-transform hover:translate-x-1 duration-200">
              <div className="p-2.5 rounded-xl bg-[#E8672A] dark:bg-[#FF7D42] text-white shrink-0 border border-[#F4A97F]/50 dark:border-[#F4A97F]/40">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                  Governance & Staff Augmentation
                </h4>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] mt-0.5">
                  DPDP compliance, independent architecture audits, and vetted senior tech squads.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Pill */}
          <div className="pt-2 flex items-center justify-between text-xs text-[#7A6A5F] dark:text-[#B8ACA0] border-t border-[#EFE2D6] dark:border-[#2C241E]">
            <span className="font-semibold text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#E8672A]" /> Enterprise Verified SLA
            </span>
            <span className="font-mono text-[11px] bg-[#FCE3D3]/70 dark:bg-[#2C221B] px-2.5 py-0.5 rounded-md font-semibold text-[#3A2E27] dark:text-[#FAF5EE] border border-[#F4A97F]/30 dark:border-[#3D332B]">
              Active Deliveries
            </span>
          </div>
        </div>

        {/* Ambient Warm Glow Plate */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-[#FCE3D3]/60 via-[#F4A97F]/20 to-[#E8672A]/30 dark:from-[#E8672A]/20 dark:via-[#F4A97F]/10 dark:to-transparent rounded-3xl -z-10 blur-xl pointer-events-none" />
      </motion.div>
    </div>
  );
}
