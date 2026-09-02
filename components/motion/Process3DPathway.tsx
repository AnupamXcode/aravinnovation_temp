"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  Compass,
  Search,
  Code2,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: React.ReactNode;
  color: string;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand & Audit",
    subtitle: "Discovery & Systems Inspection",
    description:
      "Comprehensive technical audit of architecture, performance bottlenecks, tech debt, and DPDP compliance requirements.",
    deliverables: ["Tech Debt Assessment", "Security Risk Matrix", "Architecture Map"],
    icon: <Search className="w-5 h-5 text-[#f15e1c]" />,
    color: "#f15e1c",
  },
  {
    number: "02",
    title: "Strategize & Architect",
    subtitle: "Enterprise Blueprint & SOW",
    description:
      "Formulating custom multi-phase roadmaps, cloud component selection, and SLA milestones prior to codebase mutation.",
    deliverables: ["Cloud Blueprint", "SLA SLA Framework", "Fixed Milestone SOW"],
    icon: <Compass className="w-5 h-5 text-[#2e936f]" />,
    color: "#2e936f",
  },
  {
    number: "03",
    title: "Implement & Engineer",
    subtitle: "High-Speed Squad Delivery",
    description:
      "Full-stack Next.js engineering, microservices API implementation, and continuous automated CI/CD deployment.",
    deliverables: ["Production Codebase", "TypeScript Strict Build", "CI/CD Pipeline"],
    icon: <Code2 className="w-5 h-5 text-[#fab60a]" />,
    color: "#fab60a",
  },
  {
    number: "04",
    title: "Optimize & Accelerate",
    subtitle: "SEO, Performance & Conversion",
    description:
      "Sub-second Core Web Vitals optimization, programmatic SEO indexing, and closed-loop B2B demand generation.",
    deliverables: ["100/100 Core Web Vitals", "Programmatic SEO", "ABM Lead Tracking"],
    icon: <TrendingUp className="w-5 h-5 text-[#f15e1c]" />,
    color: "#f15e1c",
  },
  {
    number: "05",
    title: "Deliver & Scale",
    subtitle: "24/7 SLA Support & Growth",
    description:
      "Handover with full IP ownership, team training, SOC-2 readiness, and ongoing 24/7 dedicated engineering support.",
    deliverables: ["Full IP Ownership", "24/7 Dedicated Squad", "SOC-2 Readiness"],
    icon: <Award className="w-5 h-5 text-[#2e936f]" />,
    color: "#2e936f",
  },
];

export function Process3DPathway() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const stepIndex = Math.min(
        Math.floor(latest * steps.length),
        steps.length - 1
      );
      setActiveStep(Math.max(0, stepIndex));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto py-12 px-4 select-none"
    >
      <div className="relative border-l-2 border-[#f7d7b0] dark:border-[#1a1a1a] ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-12">
        {/* Animated 3D Trajectory Orange Line */}
        <motion.div
          style={{ height: shouldReduceMotion ? "100%" : pathHeight }}
          className="absolute top-0 left-[-2px] w-[3px] bg-gradient-to-b from-[#f15e1c] via-[#2e936f] to-[#fab60a] z-10"
        />

        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          const isPassed = activeStep > idx;

          return (
            <motion.div
              key={step.number}
              whileHover={{ x: 6 }}
              onClick={() => setActiveStep(idx)}
              className={cn(
                "relative z-20 p-6 sm:p-8 rounded-3xl border shadow-lg transition-all duration-300 cursor-pointer space-y-4",
                isActive
                  ? "bg-[#fefaf5] dark:bg-[#000000] border-[#f15e1c] ring-2 ring-[#f15e1c]/30 shadow-[#f15e1c]/20 scale-[1.01]"
                  : isPassed
                  ? "bg-white dark:bg-[#0a0a0a] border-[#2e936f]/60 opacity-90"
                  : "bg-white/80 dark:bg-[#1a2622]/80 border-[#f7d7b0] dark:border-[#1a1a1a] opacity-60"
              )}
            >
              {/* Timeline Trajectory Node Dot */}
              <div
                className={cn(
                  "absolute -left-[31px] sm:-left-[55px] top-8 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-20",
                  isActive
                    ? "bg-[#f15e1c] border-white text-white ring-4 ring-[#f15e1c]/30 scale-125"
                    : isPassed
                    ? "bg-[#2e936f] border-white text-white"
                    : "bg-white dark:bg-[#0a0a0a] border-[#f7d7b0] dark:border-[#1a1a1a]"
                )}
              >
                <div className="w-2 h-2 rounded-full bg-current" />
              </div>

              {/* Step Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f7d7b0]/50 dark:border-[#1a1a1a] pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0]">
                    {step.icon}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#f15e1c]">
                      STAGE {step.number}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {step.title}
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#2e936f] font-semibold">
                  {step.subtitle}
                </span>
              </div>

              {/* Step Body */}
              <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                {step.description}
              </p>

              {/* Deliverables Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                {step.deliverables.map((del, dIdx) => (
                  <div
                    key={dIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#000000] border border-[#f7d7b0] text-[11px] font-semibold text-[#1b2823] dark:text-[#ffffff]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#f15e1c]" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
