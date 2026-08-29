"use client";

import * as React from "react";
import Link from "next/link";
import { CaseStudy } from "@/data/case-studies";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Workflow,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseStudyStorytellingProps {
  caseStudies: CaseStudy[];
  locale?: string;
}

export function CaseStudyStorytelling({
  caseStudies,
  locale = "en",
}: CaseStudyStorytellingProps) {
  const [selectedSlug, setSelectedSlug] = React.useState<string>(
    caseStudies[0]?.slug || "enterprise-cloud-transformation"
  );
  const [activeStageNumber, setActiveStageNumber] = React.useState<number>(1);

  const activeStudy =
    caseStudies.find((c) => c.slug === selectedSlug) || caseStudies[0];

  if (!activeStudy) return null;

  const stages = activeStudy.storytellingStages || [
    {
      stageNumber: 1,
      title: "CHALLENGE",
      headline: activeStudy.challenge,
      description: activeStudy.challenge,
      badge: "Initial State",
    },
    {
      stageNumber: 2,
      title: "STRATEGY",
      headline: activeStudy.objective,
      description: activeStudy.objective,
      badge: "Target Blueprint",
    },
    {
      stageNumber: 3,
      title: "IMPLEMENTATION",
      headline: activeStudy.implementationApproach || activeStudy.approach,
      description: activeStudy.approach,
      badge: "Agile Rollout",
    },
    {
      stageNumber: 4,
      title: "TRANSFORMATION",
      headline: activeStudy.whatAravChanged,
      description: activeStudy.solution,
      badge: "Core Shift",
    },
    {
      stageNumber: 5,
      title: "RESULT",
      headline: activeStudy.businessImpact,
      description: activeStudy.finalOutcome,
      badge: "Measurable Impact",
    },
  ];

  return (
    <section
      className="py-16 md:py-24 px-4 sm:px-8 lg:px-12 rounded-[2.5rem] bg-[#ffffff] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] shadow-2xl transition-all duration-300 relative overflow-hidden"
      id="case-studies-transformation"
    >
      {/* Section Header */}
      <div className="text-center max-w-4xl mx-auto mb-12 space-y-3 relative z-10">
        <Badge variant="secondary" size="md">
          RESULTS-DRIVEN TRANSFORMATION
        </Badge>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
          Visual Case Study Storytelling
        </h2>
        <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed max-w-2xl mx-auto">
          Explore how Arav Innovations transforms enterprise architecture through a structured 5-stage progression: <strong className="text-[#f15e1c]">CHALLENGE &rarr; STRATEGY &rarr; IMPLEMENTATION &rarr; TRANSFORMATION &rarr; RESULT</strong>.
        </p>
      </div>

      {/* Case Study Selector Buttons */}
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-3 mb-10 relative z-10">
        {caseStudies.map((study) => {
          const isSel = study.slug === selectedSlug;
          return (
            <button
              key={study.slug}
              type="button"
              onClick={() => {
                setSelectedSlug(study.slug);
                setActiveStageNumber(1);
              }}
              className={cn(
                "px-5 py-3 rounded-2xl text-xs font-extrabold font-display transition-all duration-200 cursor-pointer border flex items-center gap-2",
                isSel
                  ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-lg shadow-[#f15e1c]/30 scale-105"
                  : "bg-[#fefaf5] dark:bg-[#1a2622] text-[#1b2823] dark:text-[#ffffff] border-[#f7d7b0] dark:border-[#2c3d36] hover:border-[#f15e1c]"
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{study.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Stage Timeline */}
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* 5-Stage Step Stepper Header Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          {stages.map((stg, idx) => {
            const stageNum = stg.stageNumber ?? idx + 1;
            const isActive = stageNum === activeStageNumber;
            const isCompleted = stageNum < activeStageNumber;
            return (
              <button
                key={stageNum}
                type="button"
                onClick={() => setActiveStageNumber(stageNum)}
                className={cn(
                  "p-3 sm:p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer space-y-1 relative overflow-hidden",
                  isActive
                    ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-xl scale-[1.03]"
                    : isCompleted
                    ? "bg-[#fefaf5] dark:bg-[#1e2d27] border-[#2e936f] text-[#2e936f]"
                    : "bg-[#fefaf5]/80 dark:bg-[#1a2622]/80 border-[#f7d7b0] dark:border-[#2c3d36] text-[#7A6A5F] dark:text-[#B8ACA0] hover:border-[#f15e1c]"
                )}
              >
                <div className="flex items-center justify-between text-[10px] font-mono font-black uppercase tracking-wider">
                  <span>STAGE {stg.stageNumber}</span>
                  {stg.badge && (
                    <span className={cn(
                      "px-1.5 py-0.2 rounded text-[9px]",
                      isActive ? "bg-white/20 text-white" : "bg-[#f15e1c]/10 text-[#f15e1c]"
                    )}>
                      {stg.badge}
                    </span>
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-bold font-display line-clamp-1">
                  {stg.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Display Card */}
        {(() => {
          const currentStage =
            stages.find((s) => s.stageNumber === activeStageNumber) || stages[0];

          return (
            <div className="p-6 sm:p-10 rounded-3xl bg-[#fefaf5] dark:bg-[#1e2d27] border-2 border-[#f15e1c]/40 shadow-2xl space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#2c3d36] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f15e1c] text-white flex items-center justify-center font-black text-lg shadow-md">
                    0{currentStage.stageNumber}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase text-[#f15e1c] tracking-widest">
                      STAGE {currentStage.stageNumber} &bull; {currentStage.title}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black font-display text-[#1b2823] dark:text-[#ffffff]">
                      {currentStage.headline}
                    </h3>
                  </div>
                </div>
                {currentStage.badge && (
                  <Badge variant="primary" size="md" className="self-start sm:self-center">
                    {currentStage.badge}
                  </Badge>
                )}
              </div>

              <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                {currentStage.description}
              </p>

              {/* Stage Navigation Arrows */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  disabled={activeStageNumber === 1}
                  onClick={() => setActiveStageNumber((prev) => Math.max(1, prev - 1))}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#2c3d36] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  &larr; Previous Stage
                </button>
                <span className="text-xs font-mono font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">
                  Stage {activeStageNumber} of {stages.length}
                </span>
                <button
                  type="button"
                  disabled={activeStageNumber === stages.length}
                  onClick={() => setActiveStageNumber((prev) => Math.min(stages.length, prev + 1))}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold bg-[#f15e1c] text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next Stage &rarr;
                </button>
              </div>
            </div>
          );
        })()}

        {/* VERIFIED KEY METRICS & BUSINESS OUTCOMES CARDS */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#f15e1c]" />
              <span>Verified Results &amp; Business Metrics</span>
            </h3>
            <span className="text-xs font-mono text-[#2e936f] dark:text-[#52c99f] font-bold">
              Client: {activeStudy.client} ({activeStudy.location})
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {activeStudy.results.map((res, rIdx) => (
              <div
                key={rIdx}
                className="p-6 rounded-3xl bg-white dark:bg-[#22312b] border border-[#f7d7b0] dark:border-[#2c3d36] shadow-lg space-y-2 hover-lift-3d transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#f15e1c]/5 dark:bg-[#f15e1c]/10 rounded-bl-full pointer-events-none" />
                <span className="text-3xl sm:text-4xl font-black font-mono text-[#f15e1c] group-hover:scale-105 transition-transform inline-block">
                  {res.metric}
                </span>
                <h4 className="text-sm font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                  {res.label}
                </h4>
                <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-snug">
                  {res.description}
                </p>
                {res.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#2e936f] dark:text-[#52c99f] pt-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Result</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Executive Testimonial & Internal Service Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-2">
          {activeStudy.testimonial && (
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#fefaf5] dark:bg-[#1a2622] border border-[#f7d7b0] dark:border-[#2c3d36] shadow-md flex flex-col justify-between space-y-4">
              <p className="text-sm sm:text-base italic text-[#1b2823] dark:text-[#ffffff] leading-relaxed">
                &ldquo;{activeStudy.testimonial.quote}&rdquo;
              </p>
              <div>
                <h4 className="text-xs sm:text-sm font-bold font-display text-[#f15e1c]">
                  {activeStudy.testimonial.author} &bull; {activeStudy.testimonial.designation}
                </h4>
                <span className="text-[11px] font-mono text-[#7A6A5F] dark:text-[#B8ACA0]">
                  {activeStudy.testimonial.company}
                </span>
              </div>
            </div>
          )}

          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#22312b] border border-[#f7d7b0] dark:border-[#2c3d36] shadow-md flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#f15e1c] font-black tracking-wider">
                SERVICES UTILIZED
              </span>
              <h4 className="text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff] mt-1">
                {activeStudy.serviceCategory}
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-3">
                {activeStudy.technologiesUsed.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg bg-[#fefaf5] dark:bg-[#172420] text-[#f15e1c] text-[11px] font-mono font-bold border border-[#f7d7b0] dark:border-[#2a3c35]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <Link href={`/${locale}/services/${activeStudy.serviceSlug}`}>
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-xl border-[#f15e1c] text-[#f15e1c] hover:bg-[#f15e1c] hover:text-white"
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Explore Service Solution
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
