"use client";

import * as React from "react";
import Link from "next/link";
import { CaseStudy } from "@/data/case-studies";
import { ArrowDown, ArrowUp, ArrowRight, Cpu } from "lucide-react";
import { motion, useInView } from "framer-motion";

interface ArchitectureCaseStudyCardProps {
  caseStudy: CaseStudy;
  locale?: string;
}

export function ArchitectureCaseStudyCard({
  caseStudy,
  locale = "en",
}: ArchitectureCaseStudyCardProps) {
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
      className="group relative h-full rounded-3xl bg-[#FFFDF9] dark:bg-[#221D18] border border-[#EFE2D6] dark:border-[#2C241E] p-6 sm:p-8 shadow-md hover:shadow-2xl hover:border-[#E8672A]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle Warm Accent Line on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8672A] via-[#F4A97F] to-[#E8672A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Top Header Row: Category Tag & Location */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#FCE3D3]/70 dark:bg-[#2A221C] text-[#E8672A] border border-[#F4A97F]/30 dark:border-[#3D332B]">
            {caseStudy.clientIndustry}
          </span>
          <span className="text-[10px] font-mono text-[#7A6A5F] dark:text-[#B8ACA0]">
            {caseStudy.location}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#E8672A] transition-colors leading-snug mb-3">
          {caseStudy.title}
        </h3>

        {/* Confidentiality / Client Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono italic text-[#7A6A5F] dark:text-[#B8ACA0] bg-[#FBF3EA] dark:bg-[#1C1814] px-2.5 py-1 rounded-md border border-[#EFE2D6] dark:border-[#2C241E]">
            <span>🔒</span>
            <span>{caseStudy.client}</span>
          </span>
        </div>

        {/* TECHNICAL VERTICAL PIPELINE DIAGRAM */}
        <div className="my-6 p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1612] border border-[#EFE2D6] dark:border-[#2C241E] space-y-3 relative">
          <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0] border-b border-[#EFE2D6] dark:border-[#2C241E] pb-2 flex items-center justify-between">
            <span>Transformation Pipeline</span>
            <Cpu className="w-3 h-3 text-[#E8672A]" />
          </div>

          <div className="space-y-2 relative">
            {stages.map((stg, idx) => {
              const isLast = idx === stages.length - 1;
              return (
                <React.Fragment key={idx}>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-[#26201A] border border-[#EFE2D6] dark:border-[#3D332B] shadow-xs relative z-10 transition-transform duration-200 group-hover:translate-x-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#E8672A]" />
                      <span className="text-xs font-mono font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                        {stg.stage}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#7A6A5F] dark:text-[#B8ACA0]">
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
                        className="text-[#E8672A]"
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

        {/* Directional Outcome Indicators */}
        <div className="space-y-2 border-t border-[#EFE2D6] dark:border-[#2C241E] pt-4 mb-6">
          {outcomes.map((out, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
              {out.direction === "down" ? (
                <span className="p-1 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold">
                  <ArrowDown className="w-3.5 h-3.5" />
                </span>
              ) : (
                <span className="p-1 rounded bg-[#E8672A]/15 text-[#E8672A]">
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
          className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#FBF3EA] dark:bg-[#1C1814] border border-[#EFE2D6] dark:border-[#2C241E] text-[#3A2E27] dark:text-[#FAF5EE] group-hover:bg-[#E8672A] group-hover:text-white group-hover:border-[#E8672A] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <span>VIEW CASE STUDY</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </Link>
    </div>
  );
}
