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
} from "lucide-react";

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
    icon: <Lightbulb className="w-5 h-5" />,
  },
  {
    step: "02",
    title: "Strategize & Architect",
    description:
      "Formulate precise architectural blueprints, technology roadmaps, and commercial go-to-market strategies aligned with measurable KPIs.",
    deliverable: "Target Architecture & Roadmap",
    icon: <Workflow className="w-5 h-5" />,
  },
  {
    step: "03",
    title: "Implement & Engineer",
    description:
      "High-velocity agile execution using modern stacks (Next.js, Cloud-Native, React Native) and vetted full-stack engineering pods.",
    deliverable: "Production Code & Automated CI/CD",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    step: "04",
    title: "Optimize & Secure",
    description:
      "Continuous performance tuning, Core Web Vitals remediation, data privacy compliance (DPDP/SOC-2), and conversion rate optimization.",
    deliverable: "Compliance Signoff & SLA Tuning",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    step: "05",
    title: "Deliver Measurable Results",
    description:
      "Rigorous verification, post-launch observability, SLA-backed maintenance, and long-term capability transfer to internal teams.",
    deliverable: "Verified ROI & Knowledge Handover",
    icon: <CheckCircle className="w-5 h-5" />,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

export function ProcessTimeline() {
  return (
    <div className="relative">
      {/* Connecting Flow Line (Desktop) */}
      <div className="hidden lg:block absolute top-14 left-10 right-10 h-0.5 bg-gradient-to-r from-[#EFE2D6] via-[#F4A97F]/60 to-[#EFE2D6] dark:from-[#2C241E] dark:via-[#E8672A]/40 dark:to-[#2C241E] z-0 pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10"
      >
        {stepsData.map((step, idx) => (
          <motion.div
            key={step.step}
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group relative h-full flex flex-col justify-between rounded-3xl bg-white dark:bg-[#171411] p-6 sm:p-7 border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm hover:shadow-2xl hover:border-[#E8672A]/50 dark:hover:border-[#E8672A]/50 transition-all duration-300"
          >
            <div>
              {/* Header with Step badge & Icon */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-2xl font-extrabold text-[#E8672A] tracking-tight">
                  {step.step}
                </span>
                <div className="p-3 rounded-2xl icon-box-hover shadow-xs">
                  {step.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#E8672A] dark:group-hover:text-[#E8672A] transition-colors mb-2.5">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Deliverable Badge */}
            <div className="mt-5 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0] block">
                Deliverable
              </span>
              <span className="text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] mt-0.5 block line-clamp-1">
                {step.deliverable}
              </span>
            </div>

            {/* Connector Arrow (Desktop) */}
            {idx < 4 && (
              <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div className="w-7 h-7 rounded-full bg-white dark:bg-[#1E1915] border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm flex items-center justify-center text-[#E8672A]">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
