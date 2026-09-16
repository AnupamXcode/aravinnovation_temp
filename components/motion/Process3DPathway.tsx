"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  Compass,
  Search,
  Code2,
  TrendingUp,
  Rocket,
  ShieldCheck,
  CheckCircle2,
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
    title: "Discover",
    subtitle: "Discovery & Systems Inspection",
    description: "Deep-dive audit of current technology architecture, performance bottlenecks, tech debt, and business growth objectives.",
    deliverables: ["Architecture Audit", "Security & Risk Matrix", "Growth Bottleneck Analysis"],
    icon: <Search className="w-5 h-5" />,
    color: "#f15e1c",
  },
  {
    number: "02",
    title: "Strategize",
    subtitle: "Enterprise Blueprint & Roadmap",
    description: "Formulating custom multi-phase roadmaps, cloud component selection, and SLA milestones aligned with commercial goals.",
    deliverables: ["Cloud Architecture Blueprint", "SLA Framework", "Phased Execution Roadmap"],
    icon: <Compass className="w-5 h-5" />,
    color: "#2e936f",
  },
  {
    number: "03",
    title: "Build",
    subtitle: "High-Performance Engineering",
    description: "Full-stack Next.js engineering, microservices API implementation, AI integrations, and strict TypeScript pipelines.",
    deliverables: ["Production Codebase", "TypeScript Strict Build", "Automated CI/CD Pipeline"],
    icon: <Code2 className="w-5 h-5" />,
    color: "#fab60a",
  },
  {
    number: "04",
    title: "Launch",
    subtitle: "Production Deployment & Verification",
    description: "Seamless zero-downtime production deployment, infrastructure monitoring, and end-to-end security verification.",
    deliverables: ["Production Launch", "Infrastructure Telemetry", "Security Hardening"],
    icon: <Rocket className="w-5 h-5" />,
    color: "#f15e1c",
  },
  {
    number: "05",
    title: "Optimize",
    subtitle: "Performance & Growth Tuning",
    description: "Core Web Vitals optimization, programmatic SEO indexing, conversion funnels, and FinOps cloud spend reduction.",
    deliverables: ["Subsecond Load Performance", "SEO & AEO Optimization", "FinOps Bill Reduction"],
    icon: <TrendingUp className="w-5 h-5" />,
    color: "#2e936f",
  },
  {
    number: "06",
    title: "Scale",
    subtitle: "Operational Expansion & SLA",
    description: "Handover with full IP ownership, team training, SOC-2 readiness, and ongoing 24/7 SLA engineering support.",
    deliverables: ["Full IP Ownership", "24/7 SLA Pod Support", "Continuous Capacity Scaling"],
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "#fab60a",
  },
];

export function Process3DPathway() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const stepRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = React.useState<number>(0);

  // Framer Motion scroll progress across section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // IntersectionObserver to set active step naturally on scroll
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idxStr = entry.target.getAttribute("data-step-idx");
            if (idxStr !== null) {
              setActiveStep(parseInt(idxStr, 10));
            }
          }
        });
      },
      { root: null, rootMargin: "-30% 0px -40% 0px", threshold: [0.3] }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToStep = (idx: number) => {
    setActiveStep(idx);
    const targetEl = stepRefs.current[idx];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full py-4 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* LEFT COLUMN: Sticky Vertical Progress Bar & Step Index */}
        <div className="lg:col-span-4 sticky top-24 z-20 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#f7d7b0]/60 dark:border-[#1f1f1f]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f15e1c]">
              Methodology Pathway
            </span>
            <span className="text-xs font-mono font-bold text-[#4a5c55] dark:text-[#d3eee4]">
              Step {activeStep + 1} of {steps.length}
            </span>
          </div>

          <div className="relative pl-6 space-y-3 sm:space-y-4">
            {/* Background Track Line */}
            <div className="absolute left-[9px] top-2 bottom-2 w-1 bg-[#f7d7b0]/50 dark:bg-[#1f1f1f] rounded-full" />

            {/* Active Progress Fill Line */}
            {!shouldReduceMotion && (
              <motion.div
                className="absolute left-[9px] top-2 w-1 bg-gradient-to-b from-[#f15e1c] via-[#2e936f] to-[#fab60a] rounded-full"
                style={{ height: progressHeight, maxHeight: "calc(100% - 16px)" }}
              />
            )}

            {/* Vertical Nodes List */}
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => scrollToStep(idx)}
                  className={cn(
                    "w-full flex items-center gap-3 text-left transition-all group py-1.5 focus:outline-hidden",
                    isActive ? "scale-[1.02]" : "opacity-70 hover:opacity-100"
                  )}
                >
                  {/* Circle Dot Node */}
                  <div
                    className={cn(
                      "relative z-10 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 shrink-0",
                      isActive
                        ? "bg-[#f15e1c] text-white ring-4 ring-[#f15e1c]/20 shadow-xs"
                        : "bg-white dark:bg-[#161616] border-2 border-[#f7d7b0] dark:border-[#262626]"
                    )}
                  >
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full transition-all",
                        isActive ? "bg-white" : "bg-[#4a5c55]/40"
                      )}
                    />
                  </div>

                  {/* Step Title Label */}
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span
                      className={cn(
                        "font-mono text-xs font-bold transition-colors",
                        isActive ? "text-[#f15e1c]" : "text-[#4a5c55] dark:text-[#95baad]"
                      )}
                    >
                      {step.number}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-bold font-display truncate transition-colors",
                        isActive
                          ? "text-[#1b2823] dark:text-[#ffffff]"
                          : "text-[#4a5c55] dark:text-[#d3eee4]"
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Sequential Step Detail Cards */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={idx}
                ref={(el) => { stepRefs.current[idx] = el; }}
                data-step-idx={idx}
                className={cn(
                  "p-5 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 relative overflow-hidden",
                  isActive
                    ? "bg-white dark:bg-[#121212] border-[#f15e1c] shadow-lg ring-1 ring-[#f15e1c]/30"
                    : "bg-[#fefaf5]/60 dark:bg-[#0a0a0a]/60 border-[#f7d7b0]/60 dark:border-[#1a1a1a] hover:border-[#f15e1c]/50"
                )}
              >
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#f15e1c] bg-[#f15e1c]/10 px-2.5 py-1 rounded-lg">
                      {step.number}
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-medium text-[#4a5c55] dark:text-[#d3eee4]">
                      {step.subtitle}
                    </span>
                  </div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#f7d7b0]/40 dark:bg-[#161616] text-[#f15e1c] flex items-center justify-center shrink-0">
                    {step.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mb-2">
                  {step.title}
                </h3>

                {/* Body Description */}
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Key Deliverables Grid */}
                <div className="pt-3 border-t border-[#f7d7b0]/50 dark:border-[#1f1f1f]">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff] block mb-2">
                    Verified Deliverables:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {step.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-center gap-2 p-2 rounded-lg bg-[#fefaf5] dark:bg-[#161616] border border-[#f7d7b0]/40 dark:border-[#262626]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2e936f] shrink-0" />
                        <span className="text-xs font-medium text-[#1b2823] dark:text-[#d3eee4] truncate">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
