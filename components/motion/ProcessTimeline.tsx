"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import {
  Lightbulb,
  Workflow,
  Zap,
  ShieldCheck,
  CheckCircle,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  step: string;
  title: string;
  description: string;
  deliverable: string;
  icon: React.ReactNode;
}

const stepsData: Step[] = [
  {
    step: "01",
    title: "Understand & Discover",
    description:
      "Deep-dive technical, business, and operational audits to uncover root bottlenecks, technical debt, and market opportunities.",
    deliverable: "Audit Report & Opportunity Matrix",
    icon: <Lightbulb className="w-5 h-5 text-[#E8672A]" />,
  },
  {
    step: "02",
    title: "Strategize & Architect",
    description:
      "Formulate precise architectural blueprints, technology roadmaps, and commercial go-to-market strategies aligned with measurable KPIs.",
    deliverable: "Target Architecture & Roadmap",
    icon: <Workflow className="w-5 h-5 text-[#E8672A]" />,
  },
  {
    step: "03",
    title: "Implement & Engineer",
    description:
      "High-velocity agile execution using modern stacks (Next.js, Cloud-Native, React Native) and vetted full-stack engineering pods.",
    deliverable: "Production Code & Automated CI/CD",
    icon: <Zap className="w-5 h-5 text-[#E8672A]" />,
  },
  {
    step: "04",
    title: "Optimize & Secure",
    description:
      "Continuous performance tuning, Core Web Vitals remediation, data privacy compliance (DPDP/SOC-2), and conversion rate optimization.",
    deliverable: "Compliance Signoff & SLA Tuning",
    icon: <ShieldCheck className="w-5 h-5 text-[#E8672A]" />,
  },
  {
    step: "05",
    title: "Deliver Measurable Results",
    description:
      "Rigorous verification, post-launch observability, SLA-backed maintenance, and long-term capability transfer to internal teams.",
    deliverable: "Verified ROI & Knowledge Handover",
    icon: <CheckCircle className="w-5 h-5 text-[#E8672A]" />,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function ProcessTimeline() {
  const [activeStep, setActiveStep] = React.useState<number>(0);

  return (
    <div className="relative space-y-8">
      {/* Connecting Progress Line (Desktop) */}
      <div className="hidden lg:block absolute top-14 left-12 right-12 h-1 bg-[#EFE2D6] dark:bg-[#2C241E] z-0 pointer-events-none rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-[#00D287] via-[#FF5722] to-[#E6007A]"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10"
      >
        {stepsData.map((step, idx) => {
          const isActive = activeStep === idx;

          return (
            <motion.div
              key={step.step}
              variants={itemVariants}
              onClick={() => setActiveStep(idx)}
              onMouseEnter={() => setActiveStep(idx)}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={cn(
                "group relative h-full flex flex-col justify-between rounded-3xl p-6 border transition-all duration-300 cursor-pointer",
                isActive
                  ? "bg-white dark:bg-[#1C1814] border-[#E8672A] shadow-2xl shadow-[#E8672A]/15 ring-2 ring-[#E8672A]/30 scale-[1.02]"
                  : "bg-white/80 dark:bg-[#171411] border-[#EFE2D6] dark:border-[#2C241E] shadow-sm hover:border-[#E8672A]/50 opacity-90 hover:opacity-100"
              )}
            >
              <div>
                {/* Step badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={cn(
                      "font-mono text-2xl font-extrabold tracking-tight transition-colors",
                      isActive ? "text-[#E8672A]" : "text-[#7A6A5F] dark:text-[#B8ACA0]"
                    )}
                  >
                    {step.step}
                  </span>
                  <div
                    className={cn(
                      "p-3 rounded-2xl transition-all shadow-xs",
                      isActive
                        ? "bg-[#FCE3D3] dark:bg-[#2A211B] border border-[#E8672A]/40 scale-110"
                        : "bg-[#FBF3EA] dark:bg-[#1E1915] border border-[#EFE2D6] dark:border-[#2C241E]"
                    )}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#E8672A] transition-colors mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Deliverable Badge */}
              <div className="mt-5 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#E8672A]" />
                  <span>Deliverable</span>
                </span>
                <span className="text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] mt-1 block line-clamp-1">
                  {step.deliverable}
                </span>
              </div>

              {/* Connector Arrow (Desktop) */}
              {idx < 4 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <div className="w-6 h-6 rounded-full bg-white dark:bg-[#1E1915] border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm flex items-center justify-center text-[#E8672A]">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
