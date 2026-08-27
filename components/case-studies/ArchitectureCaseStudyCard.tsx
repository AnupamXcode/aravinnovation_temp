"use client";

import * as React from "react";
import Link from "next/link";
import { CaseStudy } from "@/data/case-studies";
import { ArrowDown, ArrowUp, ArrowRight, Cpu, Lock } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ArchitectureCaseStudyCardProps {
  caseStudy: CaseStudy;
  locale?: string;
  index?: number;
}

export function ArchitectureCaseStudyCard({
  caseStudy,
  locale = "en",
  index = 0,
}: ArchitectureCaseStudyCardProps) {
  const t = useTranslations("CaseStudies");
  const cardRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState<number>(0);

  // Sequential pipeline step animation loop on hover
  React.useEffect(() => {
    if (!isHovered || shouldReduceMotion) {
      setActiveStep(0);
      return;
    }

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 700);

    return () => clearInterval(interval);
  }, [isHovered, shouldReduceMotion]);

  // High-performance 60 FPS 3D Tilt & Light via CSS Custom Properties (Zero React re-renders)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const mouseXPercent = (x / rect.width) * 100;
    const mouseYPercent = (y / rect.height) * 100;

    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;

    cardRef.current.style.setProperty("--mouse-x", `${mouseXPercent}%`);
    cardRef.current.style.setProperty("--mouse-y", `${mouseYPercent}%`);
    cardRef.current.style.setProperty("--rotate-x", `${rotateX}deg`);
    cardRef.current.style.setProperty("--rotate-y", `${rotateY}deg`);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--rotate-x", "0deg");
    cardRef.current.style.setProperty("--rotate-y", "0deg");
  };

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
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: !shouldReduceMotion && isHovered
          ? "perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg)) translateY(-6px) scale(1.015)"
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
      }}
      className={cn(
        "group relative h-full rounded-[2.2rem] p-6 sm:p-7 shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden select-none touch-pan-y cursor-pointer",
        isHovered
          ? "bg-[#fefaf5] dark:bg-[#172420] border-2 border-[#f15e1c] shadow-2xl shadow-[#f15e1c]/15 ring-2 ring-[#f15e1c]/20"
          : "bg-white dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630]"
      )}
    >
      {/* Dynamic Cursor-Following Radial Light Overlay */}
      {isHovered && !shouldReduceMotion && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background:
              "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(241,94,28,0.12), transparent 45%)",
          }}
        />
      )}

      {/* Top Accent Gradient Border on Hover */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#f15e1c] via-[#fab60a] to-[#2e936f] transition-opacity duration-300 z-10",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      />

      <div className="space-y-4 relative z-10">
        {/* Category Tag & Location */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "text-[10px] font-mono font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border transition-colors duration-300",
              isHovered
                ? "bg-[#f15e1c] text-white border-[#f15e1c]"
                : "bg-[#fce3d3] dark:bg-[#253630] text-[#f15e1c] border-[#f7d7b0] dark:border-[#31473f]"
            )}
          >
            {caseStudy.clientIndustry}
          </span>
          <span className="text-[10px] font-mono font-semibold text-[#4a5c55] dark:text-[#d3eee4]">
            {caseStudy.location}
          </span>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "text-lg font-extrabold font-display leading-snug transition-colors duration-200",
            isHovered ? "text-[#f15e1c]" : "text-[#1b2823] dark:text-[#ffffff]"
          )}
        >
          {caseStudy.title}
        </h3>

        {/* Confidentiality / Client Badge */}
        <div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono italic text-[#4a5c55] dark:text-[#d3eee4] bg-[#fefaf5] dark:bg-[#1e2c27] px-2.5 py-1 rounded-lg border border-[#f7d7b0] dark:border-[#253630]">
            <Lock className={cn("w-3 h-3 transition-transform", isHovered && "scale-110 text-[#f15e1c]")} />
            <span>{caseStudy.client || t("confidentialClient")}</span>
          </span>
        </div>

        {/* SEQUENTIAL TRANSFORMATION PIPELINE */}
        <div className="my-3 p-3.5 rounded-2xl bg-[#ffffff] dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] space-y-2 relative shadow-xs">
          <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#4a5c55] dark:text-[#d3eee4] border-b border-[#f7d7b0] dark:border-[#253630] pb-1.5 flex items-center justify-between">
            <span>TRANSFORMATION PIPELINE</span>
            <Cpu className={cn("w-3.5 h-3.5 transition-colors", isHovered ? "text-[#f15e1c]" : "text-[#2e936f]")} />
          </div>

          <div className="space-y-1.5 relative">
            {stages.map((stg, idx) => {
              const isLast = idx === stages.length - 1;
              const isStepActive = isHovered && activeStep === idx;

              return (
                <React.Fragment key={idx}>
                  <div
                    className={cn(
                      "flex items-center justify-between p-2.5 rounded-xl border text-left transition-all duration-300",
                      isStepActive
                        ? "bg-[#fce3d3]/80 dark:bg-[#261f1a] border-[#f15e1c] shadow-xs scale-101 ring-1 ring-[#f15e1c]/30"
                        : isHovered
                        ? "bg-white dark:bg-[#22312b] border-[#f15e1c]/30"
                        : "bg-white/90 dark:bg-[#1c2924] border-[#f7d7b0] dark:border-[#31473f]"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full transition-colors",
                          isStepActive ? "bg-[#f15e1c] animate-ping" : isHovered ? "bg-[#f15e1c]" : "bg-[#2e936f]"
                        )}
                      />
                      <span
                        className={cn(
                          "text-[11px] font-mono font-bold transition-colors",
                          isStepActive ? "text-[#f15e1c]" : "text-[#1b2823] dark:text-[#ffffff]"
                        )}
                      >
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
                          isHovered
                            ? { opacity: [0.4, 1, 0.4], y: [0, 2, 0] }
                            : { opacity: 0.6 }
                        }
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: idx * 0.2,
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
      <div className="pt-4 mt-2 relative z-10">
        <Link href={`/${locale}/case-studies/${caseStudy.slug}`}>
          <button
            type="button"
            className={cn(
              "w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs",
              isHovered
                ? "bg-[#f15e1c] text-white border border-[#f15e1c] shadow-md hover:bg-[#d44e14]"
                : "bg-white dark:bg-[#1e2c27] border border-[#f7d7b0] dark:border-[#253630] text-[#1b2823] dark:text-[#ffffff] hover:border-[#f15e1c]"
            )}
          >
            <span>VIEW CASE STUDY</span>
            <ArrowRight
              className={cn(
                "w-4 h-4 transition-transform duration-300",
                isHovered ? "translate-x-1.5 text-white" : "text-[#f15e1c]"
              )}
            />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
