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

export function Services3DConstellation() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [hoveredSlug, setHoveredSlug] = React.useState<string | null>(null);

  // Compact 7 practice nodes orbit around central engine
  const constellationNodes: ConstellationNode[] = React.useMemo(() => {
    const total = servicesData.length;
    return servicesData.map((s, idx) => {
      const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
      const radiusX = 36; // X radius in %
      const radiusY = 32; // Y radius in % (Compact vertical fit)
      const xPct = 50 + radiusX * Math.cos(angle);
      const yPct = 45 + radiusY * Math.sin(angle);
      return {
        service: s,
        xPct,
        yPct,
      };
    });
  }, []);

  const activeService =
    servicesData.find((s) => s.slug === hoveredSlug) || servicesData[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full py-2 select-none"
    >
      <div className="relative w-full rounded-[3rem] bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-6 sm:p-10 overflow-hidden flex flex-col justify-between space-y-6 min-h-[520px] sm:min-h-[560px]">
        {/* Subtle Radial Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial from-[#f15e1c]/12 via-[#2e936f]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Hover Background Blur Layer */}
        <div
          className={cn(
            "absolute inset-0 z-15 pointer-events-none transition-all duration-300",
            hoveredSlug ? "backdrop-blur-[3px] bg-white/30 dark:bg-[#101b17]/30" : "backdrop-blur-none bg-transparent"
          )}
        />

        {/* Top Header Bar */}
        <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f7d7b0] dark:border-[#253630] pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] text-xs font-mono font-bold text-[#f15e1c]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ARAV 7 CORE PRACTICES ECOSYSTEM</span>
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

        {/* Compact Constellation Orbit Canvas */}
        <div className="relative w-full min-h-[340px] sm:min-h-[380px] flex-1 my-2">
          {/* Connecting SVG Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {constellationNodes.map((node) => {
              const isHovered = hoveredSlug === node.service.slug;
              return (
                <g key={`line-${node.service.slug}`}>
                  <line
                    x1="50"
                    y1="45"
                    x2={node.xPct}
                    y2={node.yPct}
                    stroke={isHovered ? "#f15e1c" : "#f7d7b0"}
                    strokeWidth={isHovered ? "2.5" : "1"}
                    strokeDasharray={isHovered ? "none" : "2 2"}
                    className="transition-all duration-300"
                  />
                  <circle
                    cx={node.xPct}
                    cy={node.yPct}
                    r={isHovered ? "3.5" : "1.8"}
                    fill={isHovered ? "#f15e1c" : "#2e936f"}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* Central Engine Node: ARAV DIGITAL ENGINE */}
          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#101b17] border-2 border-[#f15e1c] shadow-2xl shadow-[#f15e1c]/25 text-center min-w-[160px] sm:min-w-[190px] cursor-pointer hover:scale-105 transition-transform">
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

          {/* 7 Orbiting Practice Nodes: KEEP STRICTLY IN INITIAL POSITIONS (NO SHIFTING OF OTHER NODES) */}
          {constellationNodes.map((node) => {
            const isHovered = hoveredSlug === node.service.slug;

            return (
              <div
                key={node.service.slug}
                style={{
                  top: `${node.yPct}%`,
                  left: `${node.xPct}%`,
                  transform: "translate(-50%, -50%)",
                }}
                onMouseEnter={() => setHoveredSlug(node.service.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                className="absolute z-30 cursor-pointer"
              >
                <Link href={`/services/${node.service.slug}`}>
                  <div
                    className={cn(
                      "p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#101b17] border shadow-md flex items-center gap-2.5 transition-all duration-300 group hover:shadow-2xl",
                      isHovered
                        ? "border-[#f15e1c] ring-4 ring-[#f15e1c]/30 scale-105 shadow-[#f15e1c]/30"
                        : "border-[#f7d7b0] dark:border-[#253630]"
                    )}
                  >
                    <div className="p-2 rounded-xl bg-[#fefaf5] dark:bg-[#172420] shrink-0 border border-[#f7d7b0]/50 dark:border-[#253630]">
                      {serviceIconMap[node.service.slug] || (
                        <Layers className="w-5 h-5 text-[#f15e1c]" />
                      )}
                    </div>
                    <div className="hidden sm:block text-left max-w-[140px]">
                      <h4 className="text-xs font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors line-clamp-1">
                        {node.service.title}
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

        {/* Dedicated Bottom Detail Bar: Positioned Closely Below Constellation Canvas */}
        <div className="relative z-30 pt-3 mt-2 border-t border-[#f7d7b0] dark:border-[#253630] bg-white dark:bg-[#101b17] p-4 sm:p-5 rounded-2xl border shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
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
      </div>
    </div>
  );
}
