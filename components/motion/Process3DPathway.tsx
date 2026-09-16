"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
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
    icon: <Search className="w-4 h-4" />,
    color: "#f15e1c",
  },
  {
    number: "02",
    title: "Strategize",
    subtitle: "Enterprise Blueprint & Roadmap",
    description: "Formulating custom multi-phase roadmaps, cloud component selection, and SLA milestones aligned with commercial goals.",
    deliverables: ["Cloud Architecture Blueprint", "SLA Framework", "Phased Execution Roadmap"],
    icon: <Compass className="w-4 h-4" />,
    color: "#2e936f",
  },
  {
    number: "03",
    title: "Build",
    subtitle: "High-Performance Engineering",
    description: "Full-stack Next.js engineering, microservices API implementation, AI integrations, and strict TypeScript pipelines.",
    deliverables: ["Production Codebase", "TypeScript Strict Build", "Automated CI/CD Pipeline"],
    icon: <Code2 className="w-4 h-4" />,
    color: "#fab60a",
  },
  {
    number: "04",
    title: "Launch",
    subtitle: "Production Deployment & Verification",
    description: "Seamless zero-downtime production deployment, infrastructure monitoring, and end-to-end security verification.",
    deliverables: ["Production Launch", "Infrastructure Telemetry", "Security Hardening"],
    icon: <Rocket className="w-4 h-4" />,
    color: "#f15e1c",
  },
  {
    number: "05",
    title: "Optimize",
    subtitle: "Performance & Growth Tuning",
    description: "Core Web Vitals optimization, programmatic SEO indexing, conversion funnels, and FinOps cloud spend reduction.",
    deliverables: ["Subsecond Load Performance", "SEO & AEO Optimization", "FinOps Bill Reduction"],
    icon: <TrendingUp className="w-4 h-4" />,
    color: "#2e936f",
  },
  {
    number: "06",
    title: "Scale",
    subtitle: "Operational Expansion & SLA",
    description: "Handover with full IP ownership, team training, SOC-2 readiness, and ongoing 24/7 SLA engineering support.",
    deliverables: ["Full IP Ownership", "24/7 SLA Pod Support", "Continuous Capacity Scaling"],
    icon: <ShieldCheck className="w-4 h-4" />,
    color: "#fab60a",
  },
];

export function Process3DPathway() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const stepRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = React.useState<number>(0);

  // IntersectionObserver updates active step naturally during scroll without main thread thrashing
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
      { root: null, rootMargin: "-25% 0px -35% 0px", threshold: [0.25] }
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

  const activePct = (activeStep / (steps.length - 1)) * 100;

  return (
    <div ref={containerRef} className="relative w-full py-2 sm:py-4">
      {/* DESKTOP & TABLET CONNECTED TOP TIMELINE NAVIGATION (md:block hidden) */}
      <div className="hidden md:block sticky top-20 z-30 mb-8 bg-[#FFFDF9]/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs">
        <div className="relative w-full px-4 sm:px-8 py-1">
          {/* Background Track Line */}
          <div className="absolute left-8 right-8 top-5 h-1 bg-[#f7d7b0]/50 dark:bg-[#1a1a1a] rounded-full z-0" />
          
          {/* Active Progress Fill Line */}
          <div
            className="absolute left-8 top-5 h-1 bg-gradient-to-r from-[#f15e1c] via-[#2e936f] to-[#fab60a] rounded-full z-0 transition-all duration-300"
            style={{ width: `calc(${activePct}% * (100% - 64px) / 100)` }}
          />

          {/* 6 Step Nodes Header Strip */}
          <div className="relative z-10 flex items-center justify-between">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const isPassed = activeStep > idx;

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => scrollToStep(idx)}
                  className="flex flex-col items-center gap-1.5 focus:outline-hidden cursor-pointer group transition-all"
                  aria-label={`Jump to stage ${step.number}: ${step.title}`}
                >
                  {/* Step Circular Node */}
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 border-2",
                      isActive
                        ? "bg-[#f15e1c] text-white border-[#f15e1c] ring-4 ring-[#f15e1c]/25 scale-110 shadow-md"
                        : isPassed
                        ? "bg-[#2e936f] text-white border-[#2e936f]"
                        : "bg-white dark:bg-[#121212] text-[#4a5c55] dark:text-[#95baad] border-[#f7d7b0] dark:border-[#1a1a1a] group-hover:border-[#f15e1c]"
                    )}
                  >
                    {step.number}
                  </div>

                  {/* Title Label */}
                  <span
                    className={cn(
                      "text-xs font-bold font-display transition-colors",
                      isActive
                        ? "text-[#f15e1c] dark:text-[#f15e1c]"
                        : isPassed
                        ? "text-[#2e936f] dark:text-[#2e936f]"
                        : "text-[#4a5c55] dark:text-[#d3eee4] group-hover:text-[#1b2823] dark:group-hover:text-white"
                    )}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FULL-WIDTH METHODOLOGY STAGES GRID (100% Usable Content Width) */}
      <div className="w-full space-y-4 sm:space-y-6">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;

          return (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[idx] = el; }}
              data-step-idx={idx}
              className={cn(
                "w-full p-5 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 relative overflow-hidden",
                isActive
                  ? "bg-white dark:bg-[#121212] border-[#f15e1c] shadow-xl ring-1 ring-[#f15e1c]/30"
                  : "bg-[#fefaf5]/70 dark:bg-[#0a0a0a]/70 border-[#f7d7b0]/60 dark:border-[#1a1a1a] hover:border-[#f15e1c]/40"
              )}
            >
              {/* Header Badge & Icon */}
              <div className="flex items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "font-mono text-xs font-bold px-2.5 py-1 rounded-lg transition-colors",
                      isActive
                        ? "bg-[#f15e1c] text-white"
                        : "bg-[#f7d7b0]/40 dark:bg-[#1f1f1f] text-[#f15e1c]"
                    )}
                  >
                    {step.number} &bull; Stage {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-medium text-[#4a5c55] dark:text-[#d3eee4]">
                    {step.subtitle}
                  </span>
                </div>
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                  style={{ backgroundColor: `${step.color}15`, color: step.color }}
                >
                  {step.icon}
                </div>
              </div>

              {/* Title & Description Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-start mb-4">
                <div className="lg:col-span-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                    {step.title}
                  </h3>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Verified Deliverables */}
              <div className="pt-3 border-t border-[#f7d7b0]/50 dark:border-[#1f1f1f]">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff] block mb-2">
                  Key Stage Deliverables &amp; Outcomes:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {step.deliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center gap-2 p-2 rounded-xl bg-[#fefaf5] dark:bg-[#161616] border border-[#f7d7b0]/40 dark:border-[#262626]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2e936f] shrink-0" />
                      <span className="text-xs font-semibold text-[#1b2823] dark:text-[#d3eee4] truncate">
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
  );
}

