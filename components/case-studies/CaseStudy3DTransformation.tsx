"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import {
  Layers,
  ArrowRight,
  Zap,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Cpu,
  BarChart3,
} from "lucide-react";
import { Button3D } from "@/components/ui/button-3d";
import { cn } from "@/lib/utils";

interface TransformationStep {
  step: string;
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  icon: React.ReactNode;
  color: string;
}

const transformationSteps: TransformationStep[] = [
  {
    step: "01",
    title: "LEGACY RESTRUCTURE",
    subtitle: "Deconstruct Monoliths & Tech Debt",
    metric: "45%",
    metricLabel: "Latency Reduced",
    icon: <Cpu className="w-5 h-5 text-[#f15e1c]" />,
    color: "#f15e1c",
  },
  {
    step: "02",
    title: "CLOUD MODERNIZE",
    subtitle: "Next.js App Router & Microservices",
    metric: "100/100",
    metricLabel: "Core Web Vitals",
    icon: <Zap className="w-5 h-5 text-[#2e936f]" />,
    color: "#2e936f",
  },
  {
    step: "03",
    title: "AUTOMATE & COMPLY",
    subtitle: "DPDP Governance & Continuous CI/CD",
    metric: "100%",
    metricLabel: "DPDP Compliant",
    icon: <ShieldCheck className="w-5 h-5 text-[#fab60a]" />,
    color: "#fab60a",
  },
  {
    step: "04",
    title: "SCALABLE GROWTH",
    subtitle: "Closed-Loop Demand & High Intent",
    metric: "3.4x",
    metricLabel: "Conversion Uplift",
    icon: <TrendingUp className="w-5 h-5 text-[#f15e1c]" />,
    color: "#f15e1c",
  },
];

export function CaseStudy3DTransformation() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawProgressLine = useTransform(scrollYProgress, [0.2, 0.8], [0, 100]);
  const smoothProgressVal = useSpring(rawProgressLine, { damping: 30, stiffness: 100, mass: 0.6 });
  const progressLineWidth = useTransform(smoothProgressVal, (v) => `${v}%`);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 py-4 md:py-6 select-none"
    >
      <div className="w-full rounded-[3rem] bg-[#ffffff] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl p-6 sm:p-10 md:p-12 space-y-8 relative overflow-hidden transition-all duration-300">
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-full h-96 bg-radial from-[#f15e1c]/10 via-[#2e936f]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Full-Width Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-6">
          <div className="space-y-3 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce3d3] dark:bg-[#161616] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]">
              <span className="w-2 h-2 rounded-full bg-[#f15e1c] animate-pulse" />
              <span>DIGITAL TRANSFORMATION PATHWAY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight leading-[1.1]">
              From Legacy Friction to Modern Acceleration
            </h2>
            <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed max-w-3xl">
              We systematically transition legacy infrastructure into high-performance, compliant, and revenue-accelerating digital platforms across India, UAE, and global enterprise hubs.
            </p>
          </div>
          <Link href="/case-studies">
            <Button3D variant="outline" size="lg" rightIcon={<ArrowRight className="w-5 h-5 ml-1" />}>
              Explore Case Studies
            </Button3D>
          </Link>
        </div>

        {/* Full Width 4-Step Transformation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {/* Progress Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1.5 bg-[#f7d7b0] dark:bg-[#1a1a1a] -translate-y-1/2 z-0">
            <motion.div
              style={{ width: shouldReduceMotion ? "100%" : progressLineWidth }}
              className="h-full bg-gradient-to-r from-[#f15e1c] via-[#2e936f] to-[#fab60a]"
            />
          </div>

          {transformationSteps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <motion.div
                key={step.step}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "relative z-10 p-7 sm:p-8 rounded-3xl border shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6 min-h-[260px]",
                  isActive
                    ? "bg-[#fefaf5] dark:bg-[#000000] border-[#f15e1c] ring-2 ring-[#f15e1c]/30 shadow-[#f15e1c]/20"
                    : "bg-white dark:bg-[#1a2622] border-[#f7d7b0] dark:border-[#1a1a1a]"
                )}
              >
                {/* Step Header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold text-[#f15e1c] px-3.5 py-1 rounded-full bg-[#fce3d3] dark:bg-[#161616]">
                    STEP {step.step}
                  </span>
                  <div className="p-2.5 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0]/60">
                    {step.icon}
                  </div>
                </div>

                {/* Step Body */}
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                    {step.subtitle}
                  </p>
                </div>

                {/* Step Metric Highlight */}
                <div className="pt-4 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a] flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-extrabold font-display text-[#f15e1c]">
                      {step.metric}
                    </div>
                    <div className="text-[11px] font-medium text-[#4a5c55] dark:text-[#d3eee4]">
                      {step.metricLabel}
                    </div>
                  </div>
                  <CheckCircle2 className={cn("w-6 h-6", isActive ? "text-[#f15e1c]" : "text-[#2e936f]")} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Full-Width Impact Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#fefaf5] dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-sm sm:text-base text-[#1b2823] dark:text-[#ffffff]">
            <BarChart3 className="w-6 h-6 text-[#f15e1c] shrink-0" />
            <span className="font-semibold">
              Enterprise Transformation Benchmark: <strong className="text-[#f15e1c]">3.4x Revenue Uplift</strong> &amp; <strong className="text-[#2e936f]">100% DPDP Compliance Guaranteed</strong>
            </span>
          </div>
          <Link href="/contact" className="shrink-0 w-full sm:w-auto">
            <Button3D variant="primary" size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-5 h-5 ml-1" />}>
              Request Technical Audit
            </Button3D>
          </Link>
        </div>
      </div>
    </div>
  );
}
