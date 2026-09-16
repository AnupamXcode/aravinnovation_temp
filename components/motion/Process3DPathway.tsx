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
    icon: <Search className="w-5 h-5 text-[#f15e1c]" />,
    color: "#f15e1c",
  },
  {
    number: "02",
    title: "Strategize",
    subtitle: "Enterprise Blueprint & Roadmap",
    description: "Formulating custom multi-phase roadmaps, cloud component selection, and SLA milestones aligned with commercial goals.",
    deliverables: ["Cloud Architecture Blueprint", "SLA Framework", "Phased Execution Roadmap"],
    icon: <Compass className="w-5 h-5 text-[#2e936f]" />,
    color: "#2e936f",
  },
  {
    number: "03",
    title: "Build",
    subtitle: "High-Performance Engineering",
    description: "Full-stack Next.js engineering, microservices API implementation, AI integrations, and strict TypeScript pipelines.",
    deliverables: ["Production Codebase", "TypeScript Strict Build", "Automated CI/CD Pipeline"],
    icon: <Code2 className="w-5 h-5 text-[#fab60a]" />,
    color: "#fab60a",
  },
  {
    number: "04",
    title: "Launch",
    subtitle: "Production Deployment & Verification",
    description: "Seamless zero-downtime production deployment, infrastructure monitoring, and end-to-end security verification.",
    deliverables: ["Production Launch", "Infrastructure Telemetry", "Security Hardening"],
    icon: <Rocket className="w-5 h-5 text-[#f15e1c]" />,
    color: "#f15e1c",
  },
  {
    number: "05",
    title: "Optimize",
    subtitle: "Performance & Growth Tuning",
    description: "Core Web Vitals optimization, programmatic SEO indexing, conversion funnels, and FinOps cloud spend reduction.",
    deliverables: ["Subsecond Load Performance", "SEO & AEO Optimization", "FinOps Bill Reduction"],
    icon: <TrendingUp className="w-5 h-5 text-[#2e936f]" />,
    color: "#2e936f",
  },
  {
    number: "06",
    title: "Scale",
    subtitle: "Operational Expansion & SLA",
    description: "Handover with full IP ownership, team training, SOC-2 readiness, and ongoing 24/7 SLA engineering support.",
    deliverables: ["Full IP Ownership", "24/7 SLA Pod Support", "Continuous Capacity Scaling"],
    icon: <ShieldCheck className="w-5 h-5 text-[#fab60a]" />,
    color: "#fab60a",
  },
];

export function Process3DPathway() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  React.useEffect(() => {
    if (isMobile) return;
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const stepIndex = Math.min(
        Math.floor(latest * steps.length),
        steps.length - 1
      );
      setActiveStep(Math.max(0, stepIndex));
    });
    return () => unsubscribe();
  }, [scrollYProgress, isMobile]);

  return (
    <div ref={containerRef} className="relative w-full py-8 sm:py-12">
      {/* Desktop Horizontal Pathway Grid */}
      <div className="hidden lg:grid grid-cols-6 gap-4 relative z-10">
        {steps.map((step, idx) => (
          <div
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={cn(
              "p-5 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden",
              activeStep === idx
                ? "bg-white dark:bg-[#121212] border-[#f15e1c] shadow-xl scale-[1.02]"
                : "bg-[#FBF3EA] dark:bg-[#0a0a0a] border-[#EFE2D6] dark:border-[#1f1f1f] hover:border-[#f15e1c]"
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-[#f15e1c]">
                  {step.number}
                </span>
                <div className="w-8 h-8 rounded-xl bg-[#FBF3EA] dark:bg-[#161310] flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h4 className="text-base font-bold font-display text-[#221811] dark:text-[#FAF5EE] mb-1">
                {step.title}
              </h4>
              <p className="text-[11px] font-mono text-[#7A6A5F] dark:text-[#B8ACA0] mb-2 font-medium">
                {step.subtitle}
              </p>
              <p className="text-xs text-[#3A2E27] dark:text-[#FAF5EE] leading-relaxed mb-4">
                {step.description}
              </p>
            </div>
            <ul className="space-y-1.5 pt-3 border-t border-[#EFE2D6] dark:border-[#1f1f1f]">
              {step.deliverables.map((item, dIdx) => (
                <li key={dIdx} className="text-[11px] flex items-center gap-1.5 text-[#3A2E27] dark:text-[#FAF5EE]">
                  <CheckCircle2 className="w-3 h-3 text-[#2e936f] shrink-0" />
                  <span className="truncate">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="lg:hidden space-y-4 relative">
        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-[#EFE2D6] dark:bg-[#1f1f1f]" />
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="pl-14 relative"
          >
            <div className="absolute left-3.5 top-4 w-5 h-5 rounded-full bg-[#f15e1c] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
              {idx + 1}
            </div>
            <div className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#0a0a0a] border border-[#EFE2D6] dark:border-[#1f1f1f] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#f15e1c]">{step.number} &bull; {step.subtitle}</span>
              </div>
              <h4 className="text-base font-bold text-[#221811] dark:text-[#FAF5EE]">{step.title}</h4>
              <p className="text-xs text-[#3A2E27] dark:text-[#FAF5EE] leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
