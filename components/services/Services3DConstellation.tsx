"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import {
  Compass,
  Code2,
  TrendingUp,
  Search,
  ShieldCheck,
  BarChart3,
  Users2,
  Cpu,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { servicesData, Service } from "@/data/services";
import { Button3D } from "@/components/ui/button-3d";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const serviceIconMap: Record<string, React.ReactNode> = {
  "it-strategy-implementation": <Compass className="w-5 h-5 text-[#f15e1c]" />,
  "digital-marketing-brand-development": <TrendingUp className="w-5 h-5 text-[#f15e1c]" />,
  "web-application-development": <Code2 className="w-5 h-5 text-[#f15e1c]" />,
  "risk-compliance-governance": <ShieldCheck className="w-5 h-5 text-[#f15e1c]" />,
  "audit-improvement": <BarChart3 className="w-5 h-5 text-[#f15e1c]" />,
  "training-staff-augmentation": <Users2 className="w-5 h-5 text-[#f15e1c]" />,
  "seo-services": <Search className="w-5 h-5 text-[#f15e1c]" />,
  "ai-portfolio": <Cpu className="w-5 h-5 text-[#f15e1c]" />,
  // Legacy aliases
  "it-strategy-consulting": <Compass className="w-5 h-5 text-[#f15e1c]" />,
  "web-app-development": <Code2 className="w-5 h-5 text-[#f15e1c]" />,
  "digital-marketing": <TrendingUp className="w-5 h-5 text-[#f15e1c]" />,
  seo: <Search className="w-5 h-5 text-[#f15e1c]" />,
  "risk-governance-compliance": <ShieldCheck className="w-5 h-5 text-[#f15e1c]" />,
};

interface ConstellationNode {
  service: Service;
  xPct: number;
  yPct: number;
}

// 8 Node Radial Coordinates for Desktop Orbit Ecosystem
const systematicPositions8 = [
  { xPct: 50, yPct: 10 }, // 01: Top Center (IT Strategy)
  { xPct: 76, yPct: 22 }, // 02: Top Right (Digital Marketing)
  { xPct: 86, yPct: 50 }, // 03: Mid Right (Web & App Dev)
  { xPct: 76, yPct: 78 }, // 04: Bottom Right (Risk & Compliance)
  { xPct: 50, yPct: 90 }, // 05: Bottom Center (Audit & Improvement)
  { xPct: 24, yPct: 78 }, // 06: Bottom Left (Staff Augmentation)
  { xPct: 14, yPct: 50 }, // 07: Mid Left (SEO Services)
  { xPct: 24, yPct: 22 }, // 08: Top Left (AI Portfolio)
];

export function Services3DConstellation() {
  const router = useRouter();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [dragStartX, setDragStartX] = React.useState<number | null>(null);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  const totalPractices = servicesData.length;

  const constellationNodes: ConstellationNode[] = React.useMemo(() => {
    return servicesData.map((s, idx) => {
      const pos = systematicPositions8[idx % systematicPositions8.length];
      return {
        service: s,
        xPct: pos.xPct,
        yPct: pos.yPct,
      };
    });
  }, []);

  const currentHighlightIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const activeService = servicesData[currentHighlightIndex] || servicesData[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalPractices);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalPractices) % totalPractices);
  };

  // Touch Swipe Handlers for Mobile
  const handlePointerDown = (clientX: number) => {
    setDragStartX(clientX);
    setIsDragging(true);
  };

  const handlePointerUp = (clientX: number) => {
    if (dragStartX === null || !isDragging) return;
    const deltaX = clientX - dragStartX;
    if (Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setDragStartX(null);
    setIsDragging(false);
  };

  return (
    <div className="relative w-full py-2 select-none">
      {/* ========================================================================
          DESKTOP PRACTICE ECOSYSTEM EXPERIENCE (lg:block hidden) (IMAGE 4)
          ======================================================================== */}
      <div
        ref={containerRef}
        className="hidden lg:flex relative w-full rounded-[3rem] bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-10 overflow-hidden flex-col justify-between space-y-6 min-h-[600px]"
      >
        {/* Ambient Radial Gradient Depth Plate */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-radial from-[#f15e1c]/12 via-[#2e936f]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Integrated Header Bar */}
        <div className="relative z-20 flex items-center justify-between border-b border-[#f7d7b0] dark:border-[#253630] pb-4">
          <div className="space-y-1 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] text-xs font-mono font-bold text-[#f15e1c]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OUR CORE SERVICES ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
              Enterprise Technology Practices
            </h2>
          </div>

          <Link href="/services">
            <Button3D variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}>
              Explore All Services
            </Button3D>
          </Link>
        </div>

        {/* Orbit Canvas with Central Digital Core & Clickable Nodes */}
        <div className="relative w-full min-h-[400px] flex-1 my-2">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {constellationNodes.map((node, idx) => {
              const isActive = currentHighlightIndex === idx;
              return (
                <g key={`line-${node.service.slug}`}>
                  <line
                    x1="50"
                    y1="50"
                    x2={node.xPct}
                    y2={node.yPct}
                    stroke={isActive ? "#f15e1c" : "#f7d7b0"}
                    strokeWidth={isActive ? "2.5" : "1.2"}
                    strokeDasharray={isActive ? "none" : "3 3"}
                    className="transition-colors duration-200"
                  />
                  <circle
                    cx={node.xPct}
                    cy={node.yPct}
                    r={isActive ? "3.5" : "2"}
                    fill={isActive ? "#f15e1c" : "#2e936f"}
                    className="transition-all duration-200"
                  />
                </g>
              );
            })}
          </svg>

          {/* Central Digital Core Response Node */}
          <div
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center p-5 rounded-3xl bg-white dark:bg-[#101b17] border-2 shadow-2xl text-center min-w-[180px] transition-all duration-200",
              hoveredIndex !== null
                ? "border-[#f15e1c] ring-4 ring-[#f15e1c]/30 scale-105 shadow-[#f15e1c]/30"
                : "border-[#f15e1c] shadow-[#f15e1c]/20"
            )}
          >
            <div className="w-12 h-12 rounded-2xl bg-[#f15e1c] text-white flex items-center justify-center shadow-lg mb-1.5">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xs font-extrabold font-display uppercase text-[#1b2823] dark:text-[#ffffff] tracking-wider">
              ARAV DIGITAL CORE
            </h3>
            <p className="text-[10px] text-[#2e936f] font-mono font-bold mt-0.5">
              Integrated Services
            </p>
          </div>

          {/* Orbiting Service Nodes */}
          {constellationNodes.map((node, idx) => {
            const isActive = currentHighlightIndex === idx;

            return (
              <div
                key={node.service.slug}
                style={{
                  top: `${node.yPct}%`,
                  left: `${node.xPct}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  setActiveIndex(idx);
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                className="absolute z-30 cursor-pointer"
              >
                <Link href={`/services/${node.service.slug}`} className="block">
                  <div
                    className={cn(
                      "p-3 rounded-2xl bg-white dark:bg-[#101b17] border shadow-md flex items-center gap-2.5 transition-all duration-200 group hover:shadow-xl",
                      isActive
                        ? "border-[#f15e1c] ring-4 ring-[#f15e1c]/30 scale-105 shadow-[#f15e1c]/25 z-40"
                        : "border-[#f7d7b0] dark:border-[#253630]"
                    )}
                  >
                    <div
                      className={cn(
                        "p-2.5 rounded-xl shrink-0 border transition-colors",
                        isActive
                          ? "bg-[#fce3d3] border-[#f15e1c]"
                          : "bg-[#fefaf5] dark:bg-[#172420] border-[#f7d7b0]/50 dark:border-[#253630]"
                      )}
                    >
                      {serviceIconMap[node.service.slug] || (
                        <Layers className="w-5 h-5 text-[#f15e1c]" />
                      )}
                    </div>
                    <div className="text-left max-w-[130px]">
                      <h4
                        className={cn(
                          "text-xs font-bold font-display transition-colors line-clamp-1",
                          isActive
                            ? "text-[#f15e1c]"
                            : "text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c]"
                        )}
                      >
                        {node.service.shortTitle}
                      </h4>
                      <span className="text-[10px] text-[#2e936f] font-mono font-semibold block mt-0.5">
                        Explore &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom Detail Bar with Direct Navigation Action */}
        <div className="relative z-30 pt-3 border-t border-[#f7d7b0] dark:border-[#253630] bg-white dark:bg-[#101b17] p-5 rounded-2xl border shadow-lg space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c]" />
                <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                  {activeService.title}
                </h3>
              </div>
              <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] max-w-3xl leading-relaxed">
                {activeService.description}
              </p>
            </div>

            <Link href={`/services/${activeService.slug}`} className="shrink-0">
              <Button3D variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}>
                Explore {activeService.shortTitle}
              </Button3D>
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================================
          DEDICATED MOBILE PRACTICE EXPERIENCE (lg:hidden block)
          ======================================================================== */}
      <div className="block lg:hidden w-full">
        <div
          onTouchStart={(e) => e.touches.length === 1 && handlePointerDown(e.touches[0].clientX)}
          onTouchEnd={(e) => e.changedTouches.length > 0 && handlePointerUp(e.changedTouches[0].clientX)}
          className="relative w-full rounded-3xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] shadow-xl p-5 space-y-5"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#f7d7b0] dark:border-[#253630]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#f15e1c] text-white flex items-center justify-center shrink-0">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#f15e1c] block">
                  ARAV DIGITAL CORE
                </span>
                <h3 className="text-sm font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                  Our Core Services
                </h3>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] text-[#f15e1c] border border-[#f7d7b0] text-xs font-mono font-extrabold">
              Practices
            </div>
          </div>

          {/* Active Card */}
          <div className="relative rounded-2xl bg-white dark:bg-[#101b17] border-2 border-[#f15e1c] p-5 shadow-md space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#fce3d3] text-[#f15e1c] border border-[#f7d7b0]">
                  {serviceIconMap[activeService.slug] || <Layers className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#2e936f] uppercase">
                    ● Active Practice
                  </span>
                  <h4 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] leading-tight mt-0.5">
                    {activeService.title}
                  </h4>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
              {activeService.description}
            </p>

            <Link href={`/services/${activeService.slug}`} className="block pt-1">
              <Button
                variant="primary"
                size="sm"
                className="w-full justify-center bg-[#f15e1c] hover:bg-[#d44e14] text-xs py-2.5 shadow-sm"
                rightIcon={<ArrowRight className="w-3.5 h-3.5 ml-1" />}
              >
                Explore {activeService.shortTitle}
              </Button>
            </Link>
          </div>

          {/* Grid of Quick-Select Service Pills (Mobile) */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#f7d7b0] dark:border-[#253630]">
            {servicesData.map((svc, idx) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className={cn(
                  "p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2",
                  activeIndex === idx
                    ? "bg-[#f15e1c] text-white border-[#f15e1c]"
                    : "bg-white dark:bg-[#101b17] text-[#1b2823] dark:text-[#ffffff] border-[#f7d7b0] dark:border-[#253630]"
                )}
              >
                <ArrowRight className="w-3 h-3 text-[#f15e1c] shrink-0" />
                <span className="truncate">{svc.shortTitle}</span>
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] text-xs font-bold text-[#1b2823] dark:text-[#ffffff] active:scale-95 transition-transform cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-[#f15e1c]" />
              <span>Prev</span>
            </button>

            <span className="text-[11px] font-mono text-[#7A6A5F] dark:text-[#B8ACA0]">
              &larr; Swipe to explore &rarr;
            </span>

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white dark:bg-[#101b17] border border-[#f7d7b0] dark:border-[#253630] text-xs font-bold text-[#1b2823] dark:text-[#ffffff] active:scale-95 transition-transform cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4 text-[#f15e1c]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
