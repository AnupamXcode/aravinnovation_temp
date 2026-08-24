"use client";

import * as React from "react";
import Link from "next/link";
import { CaseStudy } from "@/data/case-studies";
import { ArrowDown, ArrowUp, ArrowRight, Cpu } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

interface ArchitectureCaseStudyCardProps {
  caseStudy: CaseStudy;
  locale?: string;
}

export function ArchitectureCaseStudyCard({
  caseStudy,
  locale = "en",
}: ArchitectureCaseStudyCardProps) {
  const t = useTranslations("CaseStudies");
  const cardRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = React.useState(false);

  const stages = caseStudy.pipelineStages || [
    { stage: "LEGACY SYSTEM", subtext: "Monolithic Bottleneck" },
    { stage: "TARGET ARCHITECTURE", subtext: "Cloud Containerized" },
    { stage: "AUTOMATED CI/CD", subtext: "Continuous Delivery" },
  ];

  const outcomes = caseStudy.outcomes || [
    { direction: "down", label: "Infrastructure complexity" },
    { direction: "up", label: "Deployment velocity" },
    { direction: "up", label: "System reliability" },
  ];

  const activeAnimation = isHovered || isInView;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full rounded-3xl bg-[#ffffff] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] p-6 sm:p-8 shadow-md hover:shadow-2xl hover:border-[#f15e1c]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle Warm Accent Line on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f15e1c] via-[#fab60a] to-[#f15e1c] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Top Header Row: Category Tag & Location */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#f7d7b0]/60 dark:bg-[#253630] text-[#f15e1c] border border-[#f7d7b0] dark:border-[#31473f]">
            {caseStudy.clientIndustry}
          </span>
          <span className="text-[10px] font-mono text-[#4a5c55] dark:text-[#d3eee4]">
            {caseStudy.location}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors leading-snug mb-3">
          {caseStudy.title}
        </h3>

        {/* Confidentiality / Client Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono italic text-[#4a5c55] dark:text-[#d3eee4] bg-[#fefaf5] dark:bg-[#1e2c27] px-2.5 py-1 rounded-md border border-[#f7d7b0] dark:border-[#253630]">
            <span>🔒</span>
            <span>{caseStudy.client || t("confidentialClient")}</span>
          </span>
        </div>

        {/* TECHNICAL VERTICAL PIPELINE DIAGRAM */}
        <div className="my-6 p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] space-y-3 relative">
          <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#4a5c55] dark:text-[#d3eee4] border-b border-[#f7d7b0] dark:border-[#253630] pb-2 flex items-center justify-between">
            <span>{t("transformationPipeline")}</span>
            <Cpu className="w-3 h-3 text-[#f15e1c]" />
          </div>

          <div className="space-y-2 relative">
            {stages.map((stg, idx) => {
              const isLast = idx === stages.length - 1;
              return (
                <React.Fragment key={idx}>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#22312b] border border-[#f7d7b0] dark:border-[#31473f] shadow-xs relative z-10 transition-all duration-200 transform-style-3d hover-lift-3d group-hover:border-[#f15e1c]/40">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#f15e1c] animate-pulse" />
                      <span className="text-xs font-mono font-bold text-[#1b2823] dark:text-[#ffffff]">
                        {stg.stage}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#4a5c55] dark:text-[#d3eee4]">
                      {stg.subtext}
                    </span>
                  </div>

                  {!isLast && (
                    <div className="flex justify-center py-0.5">
                      <motion.div
                        animate={
                          activeAnimation
                            ? { opacity: [0.4, 1, 0.4], y: [0, 2, 0] }
                            : {}
                        }
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: idx * 0.3,
                        }}
                        className="text-[#f15e1c]"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </motion.div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Directional Outcome Indicators using Secondary Green (#2e936f) */}
        <div className="space-y-2 border-t border-[#f7d7b0] dark:border-[#253630] pt-4 mb-6">
          {outcomes.map((out, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]">
              {out.direction === "down" ? (
                <span className="p-1 rounded bg-[#2e936f]/15 text-[#2e936f] font-bold">
                  <ArrowDown className="w-3.5 h-3.5" />
                </span>
              ) : (
                <span className="p-1 rounded bg-[#2e936f]/15 text-[#2e936f] font-bold">
                  <ArrowUp className="w-3.5 h-3.5" />
                </span>
              )}
              <span>{out.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Action Link */}
      <Link href={`/${locale}/case-studies/${caseStudy.slug}`}>
        <button
          type="button"
          className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#fefaf5] dark:bg-[#1e2c27] border border-[#f7d7b0] dark:border-[#253630] text-[#1b2823] dark:text-[#ffffff] group-hover:bg-[#f15e1c] group-hover:text-white group-hover:border-[#f15e1c] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <span>{t("viewCaseStudy")}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </Link>
    </div>
  );
}
