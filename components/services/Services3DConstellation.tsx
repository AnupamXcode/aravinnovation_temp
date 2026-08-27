"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Compass,
  Code2,
  TrendingUp,
  Search,
  ShieldCheck,
  BarChart3,
  Users2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
} from "lucide-react";
import { servicesData, Service } from "@/data/services";
import { Button3D } from "@/components/ui/button-3d";
import { cn } from "@/lib/utils";

const serviceIconMap: Record<string, React.ReactNode> = {
  "it-strategy-consulting": <Compass className="w-5 h-5 text-[#f15e1c]" />,
  "web-app-development": <Code2 className="w-5 h-5 text-[#f15e1c]" />,
  "digital-marketing": <TrendingUp className="w-5 h-5 text-[#f15e1c]" />,
  seo: <Search className="w-5 h-5 text-[#f15e1c]" />,
  "risk-governance-compliance": <ShieldCheck className="w-5 h-5 text-[#f15e1c]" />,
  "audit-improvement": <BarChart3 className="w-5 h-5 text-[#f15e1c]" />,
  "training-staff-augmentation": <Users2 className="w-5 h-5 text-[#f15e1c]" />,
};

interface ConstellationNode {
  service: Service;
  xPct: number;
  yPct: number;
}

// Systematic Enterprise Architecture Node Positions
const systematicPositions = [
  { xPct: 50, yPct: 15 }, // 01: Top Center
  { xPct: 78, yPct: 28 }, // 02: Top Right
  { xPct: 84, yPct: 54 }, // 03: Mid Right
  { xPct: 70, yPct: 78 }, // 04: Bottom Right
  { xPct: 30, yPct: 78 }, // 05: Bottom Left
  { xPct: 16, yPct: 54 }, // 06: Mid Left
  { xPct: 22, yPct: 28 }, // 07: Top Left
];

export function Services3DConstellation() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [dragStartX, setDragStartX] = React.useState<number | null>(null);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  const totalPractices = servicesData.length;

  const constellationNodes: ConstellationNode[] = React.useMemo(() => {
    return servicesData.map((s, idx) => {
      const pos = systematicPositions[idx % systematicPositions.length];
      return {
        service: s,
        xPct: pos.xPct,
        yPct: pos.yPct,
      };
    });
  }, []);

  const activeService = servicesData[activeIndex] || servicesData[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalPractices);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalPractices) % totalPractices);
  };

  // Mouse & Touch Drag/Swipe Handlers (Task A & E)
  const handlePointerDown = (clientX: number) => {
    setDragStartX(clientX);
    setIsDragging(true);
  };

  const handlePointerUp = (clientX: number) => {
    if (dragStartX === null || !isDragging) return;
    const deltaX = clientX - dragStartX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleNext(); // Drag left -> Next practice
      } else {
        handlePrev(); // Drag right -> Previous practice
      }
    }
    setDragStartX(null);
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => handlePointerDown(e.clientX)}
      onMouseUp={(e) => handlePointerUp(e.clientX)}
      onTouchStart={(e) => e.touches.length === 1 && handlePointerDown(e.touches[0].clientX)}
      onTouchEnd={(e) => e.changedTouches.length > 0 && handlePointerUp(e.changedTouches[0].clientX)}
      className="relative w-full py-2 select-none cursor-grab active:cursor-grabbing"
    >
      <div className="relative w-full rounded-[3rem] bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-6 sm:p-10 overflow-hidden flex flex-col justify-between space-y-6 min-h-[520px] sm:min-h-[560px]">
        {/* Subtle Radial Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-[#f15e1c]/12 via-[#2e936f]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Integrated Top Header Bar */}
        <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f7d7b0] dark:border-[#253630] pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] text-xs font-mono font-bold text-[#f15e1c]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OUR 7 CORE PRACTICES ECOSYSTEM</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
              Enterprise Technology Practices
            </h2>
          </div>

          <Link href="/services">
            <Button3D variant="outline" size="md" rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}>
              Explore All 7 Practices
            </Button3D>
          </Link>
        </div>

        {/* Systematic Constellation Orbit Canvas */}
        <div className="relative w-full min-h-[340px] sm:min-h-[380px] flex-1 my-2">
          {/* Connecting SVG Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {constellationNodes.map((node, idx) => {
              const isActive = activeIndex === idx;
              return (
                <g key={`line-${node.service.slug}`}>
                  <line
                    x1="50"
                    y1="46"
                    x2={node.xPct}
                    y2={node.yPct}
                    stroke={isActive ? "#f15e1c" : "#f7d7b0"}
                    strokeWidth={isActive ? "3.5" : "1.2"}
                    strokeDasharray={isActive ? "none" : "2 2"}
                    className="transition-all duration-300"
                  />
                  <circle
                    cx={node.xPct}
                    cy={node.yPct}
                    r={isActive ? "4" : "2"}
                    fill={isActive ? "#f15e1c" : "#2e936f"}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* Central Engine Node: ARAV DIGITAL ENGINE */}
          <div className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#101b17] border-2 border-[#f15e1c] shadow-2xl shadow-[#f15e1c]/25 text-center min-w-[160px] sm:min-w-[190px] cursor-pointer hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-[#f15e1c] text-white flex items-center justify-center shadow-lg mb-1.5">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-xs sm:text-sm font-extrabold font-display uppercase text-[#1b2823] dark:text-[#ffffff] tracking-wider">
              ARAV DIGITAL ENGINE
            </h3>
            <p className="text-[10px] text-[#2e936f] font-semibold mt-0.5">
              7 Integrated Practices
            </p>
          </div>

          {/* 7 Orbiting Practice Nodes */}
          {constellationNodes.map((node, idx) => {
            const isActive = activeIndex === idx;

            return (
              <div
                key={node.service.slug}
                style={{
                  top: `${node.yPct}%`,
                  left: `${node.xPct}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                className="absolute z-30 cursor-pointer"
              >
                <div
                  className={cn(
                    "p-2.5 sm:p-3.5 rounded-2xl bg-white dark:bg-[#101b17] border shadow-md flex items-center gap-2.5 transition-all duration-300 group hover:shadow-2xl",
                    isActive
                      ? "border-[#f15e1c] ring-4 ring-[#f15e1c]/40 scale-108 shadow-[#f15e1c]/30 z-40"
                      : "border-[#f7d7b0] dark:border-[#253630]"
                  )}
                >
                  <div
                    className={cn(
                      "p-2 rounded-xl shrink-0 border transition-colors",
                      isActive
                        ? "bg-[#fce3d3] border-[#f15e1c]"
                        : "bg-[#fefaf5] dark:bg-[#172420] border-[#f7d7b0]/50 dark:border-[#253630]"
                    )}
                  >
                    {serviceIconMap[node.service.slug] || (
                      <Layers className="w-5 h-5 text-[#f15e1c]" />
                    )}
                  </div>
                  <div className="hidden sm:block text-left max-w-[140px]">
                    <h4
                      className={cn(
                        "text-xs font-bold font-display transition-colors line-clamp-1",
                        isActive
                          ? "text-[#f15e1c]"
                          : "text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c]"
                      )}
                    >
                      {node.service.title}
                    </h4>
                    <span className="text-[10px] text-[#2e936f] font-mono font-semibold block mt-0.5">
                      Practice 0{idx + 1} &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dedicated Bottom Detail Bar & Clean Swipe Navigation Indicator (Tasks A, B, E) */}
        <div className="relative z-30 pt-3 mt-2 border-t border-[#f7d7b0] dark:border-[#253630] bg-white dark:bg-[#101b17] p-4 sm:p-5 rounded-2xl border shadow-lg space-y-4">
          {/* Active Service Description */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-pulse" />
                <h3 className="text-sm sm:text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                  {activeService.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] max-w-3xl leading-relaxed">
                {activeService.description}
              </p>
            </div>

            <Link href={`/services/${activeService.slug}`} className="shrink-0 w-full sm:w-auto">
              <Button3D variant="primary" size="md" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}>
                Explore {activeService.title}
              </Button3D>
            </Link>
          </div>

          {/* Clean Swipe Navigation Bar WITHOUT Extra "Explore Next" Button */}
          <div className="flex items-center justify-between pt-3 border-t border-[#f7d7b0]/60 dark:border-[#253630] text-xs font-mono font-bold">
            <button
              onClick={handlePrev}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fefaf5] dark:bg-[#1e2c27] border border-[#f7d7b0] dark:border-[#31473f] text-[#1b2823] dark:text-[#ffffff] hover:border-[#f15e1c] hover:text-[#f15e1c] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Practice</span>
            </button>

            {/* Dynamic Counter & Swipe Indicator (Task B) */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fce3d3]/60 dark:bg-[#261f1a] text-[#f15e1c] border border-[#f7d7b0]">
              <span className="font-extrabold text-sm">
                0{activeIndex + 1} / 0{totalPractices}
              </span>
              <span className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] border-l border-[#f7d7b0] pl-2.5 font-normal">
                Swipe &rarr; to explore
              </span>
            </div>

            <button
              onClick={handleNext}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fefaf5] dark:bg-[#1e2c27] border border-[#f7d7b0] dark:border-[#31473f] text-[#1b2823] dark:text-[#ffffff] hover:border-[#f15e1c] hover:text-[#f15e1c] transition-all cursor-pointer"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
