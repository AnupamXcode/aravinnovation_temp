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

  // Position 7 practice nodes evenly around central engine
  const constellationNodes: ConstellationNode[] = React.useMemo(() => {
    const total = servicesData.length;
    return servicesData.map((s, idx) => {
      const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
      const radiusX = 38; // X radius in %
      const radiusY = 36; // Y radius in %
      const xPct = 50 + radiusX * Math.cos(angle);
      const yPct = 46 + radiusY * Math.sin(angle); // Center vertically
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
      className="relative w-full py-6 select-none"
    >
      <div className="relative w-full rounded-[3.5rem] bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-8 sm:p-14 overflow-hidden flex flex-col justify-between space-y-10 min-h-[720px] sm:min-h-[780px]">
        {/* Subtle Radial Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial from-[#f15e1c]/12 via-[#2e936f]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Hover Background Blur Layer */}
        <div
          className={cn(
            "absolute inset-0 z-15 pointer-events-none transition-all duration-300",
            hoveredSlug ? "backdrop-blur-[3px] bg-white/30 dark:bg-[#101b17]/30" : "backdrop-blur-none bg-transparent"
          )}
        />

        {/* Top Header Bar */}
        <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#253630] pb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] text-xs font-mono font-bold text-[#f15e1c]">
              <Sparkles className="w-4 h-4" />
              <span>ARAV 7 CORE PRACTICES ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
              Enterprise Technology Practices
            </h2>
          </div>
          <Link href="/services">
            <Button3D variant="outline" size="lg" rightIcon={<ArrowRight className="w-5 h-5 ml-1" />}>
              Explore All 7 Practices
            </Button3D>
          </Link>
        </div>

        {/* Constellation Orbit Canvas */}
        <div className="relative w-full min-h-[440px] sm:min-h-[500px] flex-1 my-4">
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
                    y1="46"
                    x2={node.xPct}
                    y2={node.yPct}
                    stroke={isHovered ? "#f15e1c" : "#f7d7b0"}
                    strokeWidth={isHovered ? "3" : "1.2"}
                    strokeDasharray={isHovered ? "none" : "2 2"}
                    className="transition-all duration-300"
                  />
                  <circle
                    cx={node.xPct}
                    cy={node.yPct}
                    r={isHovered ? "4" : "2"}
                    fill={isHovered ? "#f15e1c" : "#2e936f"}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* Central Engine Node: ARAV DIGITAL ENGINE */}
          <div className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#101b17] border-2 border-[#f15e1c] shadow-2xl shadow-[#f15e1c]/25 text-center min-w-[180px] sm:min-w-[220px] cursor-pointer hover:scale-105 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-[#f15e1c] text-white flex items-center justify-center shadow-lg mb-2.5">
              <Sparkles className="w-7 h-7 animate-pulse" />
            </div>
            <h3 className="text-sm sm:text-base font-extrabold font-display uppercase text-[#1b2823] dark:text-[#ffffff] tracking-wider">
              ARAV DIGITAL ENGINE
            </h3>
            <p className="text-xs text-[#2e936f] font-semibold mt-1">
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
                className="absolute z-20 cursor-pointer"
              >
                <Link href={`/services/${node.service.slug}`}>
                  <div
                    className={cn(
                      "p-3.5 sm:p-4.5 rounded-2xl bg-white dark:bg-[#101b17] border shadow-md flex items-center gap-3 transition-all duration-300 group hover:shadow-2xl",
                      isHovered
                        ? "border-[#f15e1c] ring-4 ring-[#f15e1c]/30 scale-105 shadow-[#f15e1c]/30"
                        : "border-[#f7d7b0] dark:border-[#253630]"
                    )}
                  >
                    <div className="p-2.5 rounded-xl bg-[#fefaf5] dark:bg-[#172420] shrink-0 border border-[#f7d7b0]/50 dark:border-[#253630]">
                      {serviceIconMap[node.service.slug] || (
                        <Layers className="w-5 h-5 text-[#f15e1c]" />
                      )}
                    </div>
                    <div className="hidden sm:block text-left max-w-[160px]">
                      <h4 className="text-xs sm:text-sm font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors line-clamp-1">
                        {node.service.title}
                      </h4>
                      <span className="text-[11px] text-[#2e936f] font-mono font-semibold block mt-0.5">
                        Explore &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Dedicated Bottom Detail Bar: Positioned at Bottom Below all Practice Nodes */}
        <div className="relative z-30 pt-4 mt-6 border-t border-[#f7d7b0] dark:border-[#253630] bg-white dark:bg-[#101b17] p-6 sm:p-8 rounded-3xl border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#f15e1c] animate-pulse" />
              <h3 className="text-lg sm:text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                {activeService.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] max-w-4xl leading-relaxed">
              {activeService.description}
            </p>
          </div>

          <Link href={`/services/${activeService.slug}`} className="shrink-0 w-full sm:w-auto">
            <Button3D variant="primary" size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-5 h-5 ml-1" />}>
              Explore {activeService.title}
            </Button3D>
          </Link>
        </div>
      </div>
    </div>
  );
}
