"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import {
  Cpu,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Terminal,
  Globe2,
  Layers,
} from "lucide-react";

export function Hero3DScene() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Mouse tracking motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Scroll tracking for dynamic 3D scroll depth sequence
  const { scrollY } = useScroll();

  // Scroll transforms (0 to 600px scroll range)
  const scrollRotateX = useTransform(scrollY, [0, 600], [0, 18]);
  const scrollRotateY = useTransform(scrollY, [0, 600], [0, -12]);
  const scrollScale = useTransform(scrollY, [0, 600], [1, 0.94]);
  const scrollTranslateY = useTransform(scrollY, [0, 600], [0, 40]);
  const layer1TranslateZ = useTransform(scrollY, [0, 600], [30, 80]);
  const layer2TranslateZ = useTransform(scrollY, [0, 600], [20, 50]);
  const layer3TranslateZ = useTransform(scrollY, [0, 600], [10, 25]);
  const badge1Y = useTransform(scrollY, [0, 600], [0, -45]);
  const badge2Y = useTransform(scrollY, [0, 600], [0, 55]);

  // Smooth springs for mouse tilt
  const springConfig = { damping: 28, stiffness: 140 };
  const mouseRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const mouseRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const floatX1 = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);
  const floatY1 = useSpring(useTransform(mouseY, [-0.5, 0.5], [-18, 18]), springConfig);
  const floatX2 = useSpring(useTransform(mouseX, [-0.5, 0.5], [22, -22]), springConfig);
  const floatY2 = useSpring(useTransform(mouseY, [-0.5, 0.5], [22, -22]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
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

  // Combine scroll transforms + mouse springs
  const combinedRotateX = useTransform(
    [mouseRotateX, scrollRotateX],
    ([mX, sX]: number[]) => (shouldReduceMotion ? 0 : mX + sX)
  );

  const combinedRotateY = useTransform(
    [mouseRotateY, scrollRotateY],
    ([mY, sY]: number[]) => (shouldReduceMotion ? 0 : mY + sY)
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg mx-auto perspective-1200 py-6 select-none"
    >
      {/* Straight Unskewed Container */}
      <motion.div
        className="relative transition-shadow duration-300"
      >
        {/* Floating 3D Orbit Badge 1 (Parallax Scroll & Mouse) */}
        <motion.div
          style={{
            x: floatX1,
            y: shouldReduceMotion ? 0 : badge1Y,
            translateZ: 85,
          }}
          className="absolute -top-6 -left-6 z-30 p-3.5 rounded-2xl bg-white/95 dark:bg-[#1C1814]/95 backdrop-blur-md border border-[#EFE2D6] dark:border-[#3D332B] shadow-2xl flex items-center gap-2.5"
        >
          <div className="p-2 rounded-xl bg-[#f15e1c] text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
              Next.js 16 &amp; Microservices
            </div>
            <div className="text-[9px] font-mono font-bold text-[#f15e1c]">
              100/100 Core Web Vitals
            </div>
          </div>
        </motion.div>

        {/* Floating 3D Orbit Badge 2 */}
        <motion.div
          style={{
            x: floatX2,
            y: shouldReduceMotion ? 0 : badge2Y,
            translateZ: 75,
          }}
          className="absolute -bottom-6 -right-6 z-30 p-3.5 rounded-2xl bg-white/95 dark:bg-[#1C1814]/95 backdrop-blur-md border border-[#EFE2D6] dark:border-[#3D332B] shadow-2xl flex items-center gap-2.5"
        >
          <div className="p-2 rounded-xl bg-[#FCE3D3] dark:bg-[#261F1A] text-[#f15e1c] border border-[#F4A97F]/40 dark:border-[#3D332B]">
            <Globe2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
              Dual Delivery Hubs
            </div>
            <div className="text-[9px] font-mono text-[#7A6A5F] dark:text-[#B8ACA0]">
              IND &bull; UAE Compliant
            </div>
          </div>
        </motion.div>

        {/* Main 3D Architecture Canvas Card */}
        <div
          style={{
            transform: "translateZ(30px)",
            transformStyle: "preserve-3d",
          }}
          className="rounded-3xl bg-white/95 dark:bg-[#171411]/95 backdrop-blur-md p-6 sm:p-8 border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl space-y-6 relative overflow-hidden"
        >
          {/* Card Window Header Bar */}
          <div className="flex items-center justify-between border-b border-[#EFE2D6] dark:border-[#2C241E] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#f15e1c]" />
              <div className="w-3 h-3 rounded-full bg-[#F4A97F]" />
              <div className="w-3 h-3 rounded-full bg-[#EFE2D6] dark:bg-[#3D332B]" />
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">
              <Terminal className="w-3.5 h-3.5 text-[#f15e1c]" />
              <span>arav.core.architecture</span>
            </div>
          </div>

          {/* 3 Scroll-Displaced Interactive Layer Blocks */}
          <div className="space-y-3.5" style={{ transformStyle: "preserve-3d" }}>
            {/* Layer 1 - Software Engineering */}
            <motion.div
              style={{
                translateZ: shouldReduceMotion ? 0 : layer1TranslateZ,
              }}
              className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1E1915] border border-[#EFE2D6] dark:border-[#2C241E] flex items-start gap-3.5 transition-shadow hover:shadow-md"
            >
              <div className="p-2.5 rounded-xl bg-[#f15e1c] text-white shrink-0 shadow-xs">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                  Enterprise Web &amp; Software Engineering
                </h4>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] mt-0.5">
                  App Router architecture, TypeScript, and cloud-native microservices.
                </p>
              </div>
            </motion.div>

            {/* Layer 2 - Revenue Acceleration */}
            <motion.div
              style={{
                translateZ: shouldReduceMotion ? 0 : layer2TranslateZ,
              }}
              className="p-4 rounded-2xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] flex items-start gap-3.5 shadow-xs transition-shadow hover:shadow-md"
            >
              <div className="p-2.5 rounded-xl bg-[#FCE3D3] dark:bg-[#261F1A] text-[#f15e1c] shrink-0 border border-[#F4A97F]/40 dark:border-[#3D332B]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                  Revenue &amp; Digital Growth Acceleration
                </h4>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] mt-0.5">
                  Technical SEO, ABM demand generation, and closed-loop attribution.
                </p>
              </div>
            </motion.div>

            {/* Layer 3 - Governance & Squads */}
            <motion.div
              style={{
                translateZ: shouldReduceMotion ? 0 : layer3TranslateZ,
              }}
              className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1E1915] border border-[#EFE2D6] dark:border-[#2C241E] flex items-start gap-3.5 transition-shadow hover:shadow-md"
            >
              <div className="p-2.5 rounded-xl bg-[#f15e1c] dark:bg-[#FF7D42] text-white shrink-0 border border-[#F4A97F]/50 dark:border-[#F4A97F]/40">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                  Governance &amp; Staff Augmentation
                </h4>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] mt-0.5">
                  DPDP compliance, independent security audits, and dedicated squads.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Footer Status SLA Pill */}
          <div className="pt-2 flex items-center justify-between text-xs text-[#7A6A5F] dark:text-[#B8ACA0] border-t border-[#EFE2D6] dark:border-[#2C241E]">
            <span className="font-semibold text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#f15e1c]" /> Enterprise Verified SLA
            </span>
            <span className="font-mono text-[11px] bg-[#FCE3D3]/70 dark:bg-[#2C221B] px-2.5 py-0.5 rounded-md font-semibold text-[#3A2E27] dark:text-[#FAF5EE] border border-[#F4A97F]/30 dark:border-[#3D332B]">
              Active Deliveries
            </span>
          </div>
        </div>

        {/* Ambient Warm Glow Plate */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-[#FCE3D3]/60 via-[#F4A97F]/20 to-[#f15e1c]/30 dark:from-[#f15e1c]/20 dark:via-[#F4A97F]/10 dark:to-transparent rounded-3xl -z-10 blur-xl pointer-events-none" />
      </motion.div>
    </div>
  );
}
