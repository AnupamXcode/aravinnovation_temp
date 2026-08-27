"use client";

import * as React from "react";
import Link from "next/link";
import { CaseStudy } from "@/data/case-studies";
import { ArrowDown, ArrowUp, ArrowRight, Cpu, Lock } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

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
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const [isHovered, setIsHovered] = React.useState(false);

  const stages = caseStudy.pipelineStages || [
    { stage: "LEGACY MONOLITH", subtext: "On-Premise Bottleneck" },
    { stage: "CLOUD ARCHITECTURE", subtext: "AWS Kubernetes Cluster" },
    { stage: "MICROSERVICES", subtext: "Containerized Workloads" },
    { stage: "AUTOMATED CI/CD", subtext: "Zero-Downtime Releases" },
  ];

  const outcomes = caseStudy.outcomes || [
    { direction: "down", label: "Infrastructure complexity" },
    { direction: "up", label: "Deployment velocity" },
    { direction: "up", label: "System reliability" },
  ];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative h-full rounded-[2.2rem] bg-white dark:bg-[#172420] border p-6 sm:p-7 shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden",
        isHovered
          ? "border-[#f15e1c] shadow-2xl -translate-y-1.5 ring-2 ring-[#f15e1c]/20"
          : "border-[#f7d7b0] dark:border-[#253630]"
      )}
    >
      {/* Top Accent Line */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f15e1c] via-[#fab60a] to-[#f15e1c] transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      />

      <div className="space-y-4">
        {/* Category Tag & Location */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#fce3d3] dark:bg-[#253630] text-[#f15e1c] border border-[#f7d7b0] dark:border-[#31473f]">
            {caseStudy.clientIndustry}
          </span>
          <span className="text-[10px] font-mono font-semibold text-[#4a5c55] dark:text-[#d3eee4]">
            {caseStudy.location}
          </span>
        </div>

        {/* Title */}
        <h3 className={cn(
          "text-lg font-extrabold font-display leading-snug transition-colors duration-200",
          isHovered ? "text-[#f15e1c]" : "text-[#1b2823] dark:text-[#ffffff]"
        )}>
          {caseStudy.title}
        </h3>

        {/* Confidentiality / Client Badge */}
        <div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono italic text-[#4a5c55] dark:text-[#d3eee4] bg-[#fefaf5] dark:bg-[#1e2c27] px-2.5 py-1 rounded-lg border border-[#f7d7b0] dark:border-[#253630]">
            <Lock className="w-3 h-3 text-[#f15e1c]" />
            <span>{caseStudy.client || t("confidentialClient")}</span>
          </span>
        </div>

        {/* SEQUENTIAL TRANSFORMATION PIPELINE (IMAGE 3 REFINEMENT) */}
        <div className="my-3 p-3.5 rounded-2xl bg-[#fefaf5] dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] space-y-2 relative">
          <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#4a5c55] dark:text-[#d3eee4] border-b border-[#f7d7b0] dark:border-[#253630] pb-1.5 flex items-center justify-between">
            <span>TRANSFORMATION PIPELINE</span>
            <Cpu className={cn("w-3.5 h-3.5 transition-colors", isHovered ? "text-[#f15e1c]" : "text-[#2e936f]")} />
          </div>

          <div className="space-y-1.5 relative">
            {stages.map((stg, idx) => {
              const isLast = idx === stages.length - 1;
              return (
                <React.Fragment key={idx}>
                  <div
                    className={cn(
                      "flex items-center justify-between p-2.5 rounded-xl border text-left transition-all duration-300",
                      isHovered
                        ? "bg-white dark:bg-[#22312b] border-[#f15e1c]/40 shadow-xs"
                        : "bg-white/80 dark:bg-[#1c2924] border-[#f7d7b0] dark:border-[#31473f]"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full transition-colors",
                          isHovered ? "bg-[#f15e1c] animate-ping-slow" : "bg-[#2e936f]"
                        )}
                      />
                      <span className="text-[11px] font-mono font-bold text-[#1b2823] dark:text-[#ffffff]">
                        {stg.stage}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-[#4a5c55] dark:text-[#d3eee4]">
                      {stg.subtext}
                    </span>
                  </div>

                  {!isLast && (
                    <div className="flex justify-center py-0.5">
                      <motion.div
                        animate={
                          isInView
                            ? { opacity: [0.3, 1, 0.3], y: [0, 3, 0] }
                            : {}
                        }
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          delay: idx * 0.25,
                        }}
                        className="text-[#f15e1c]"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </motion.div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Directional Outcome Indicators using Secondary Green (#2e936f) */}
        <div className="space-y-1 border-t border-[#f7d7b0] dark:border-[#253630] pt-3">
          {outcomes.map((out, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]">
              {out.direction === "down" ? (
                <span className="p-0.5 rounded bg-[#2e936f]/15 text-[#2e936f] font-bold">
                  <ArrowDown className="w-3 h-3" />
                </span>
              ) : (
                <span className="p-0.5 rounded bg-[#2e936f]/15 text-[#2e936f] font-bold">
                  <ArrowUp className="w-3 h-3" />
                </span>
              )}
              <span className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4]">{out.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fully Clickable Action Link */}
      <div className="pt-4 mt-2">
        <Link href={`/${locale}/case-studies/${caseStudy.slug}`}>
          <button
            type="button"
            className={cn(
              "w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs",
              isHovered
                ? "bg-[#f15e1c] text-white border border-[#f15e1c] shadow-md"
                : "bg-[#fefaf5] dark:bg-[#1e2c27] border border-[#f7d7b0] dark:border-[#253630] text-[#1b2823] dark:text-[#ffffff]"
            )}
          >
            <span>VIEW CASE STUDY</span>
            <ArrowRight className={cn("w-4 h-4 transition-transform", isHovered ? "translate-x-1.5 text-white" : "text-[#f15e1c]")} />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
