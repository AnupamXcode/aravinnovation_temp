"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import {
  Compass,
  Code2,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Layers,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useSiteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface ArchitectureNode {
  id: string;
  label: string;
  subtitle: string;
  color: string;
  borderColor: string;
  icon: React.ReactNode;
  href: string;
  description: string;
  metrics: string;
  xPct: number;
  yPct: number;
}

const architectureNodes: ArchitectureNode[] = [
  {
    id: "strategy",
    label: "STRATEGY",
    subtitle: "Enterprise IT & Roadmap",
    color: "#f15e1c",
    borderColor: "#f7d7b0",
    icon: <Compass className="w-5 h-5 text-[#f15e1c]" />,
    href: "/services/it-strategy-implementation",
    description: "Cloud architecture, IT governance, and digital transformation roadmaps.",
    metrics: "45% Tech Debt Reduction",
    xPct: 22,
    yPct: 16,
  },
  {
    id: "engineering",
    label: "ENGINEERING",
    subtitle: "Web & App Systems",
    color: "#2e936f",
    borderColor: "#aaddca",
    icon: <Code2 className="w-5 h-5 text-[#2e936f]" />,
    href: "/services/web-application-development",
    description: "Full-stack Next.js, microservices, and high-concurrency cloud systems.",
    metrics: "100/100 Core Web Vitals",
    xPct: 78,
    yPct: 16,
  },
  {
    id: "growth",
    label: "GROWTH",
    subtitle: "B2B Demand & Tech SEO",
    color: "#fab60a",
    borderColor: "#ffe580",
    icon: <TrendingUp className="w-5 h-5 text-[#fab60a]" />,
    href: "/services/digital-marketing-brand-development",
    description: "Data-driven demand generation, programmatic indexing, and closed-loop ROI.",
    metrics: "3.4x Conversion Uplift",
    xPct: 50,
    yPct: 82,
  },
];

export function Hero3DDigitalArchitecture() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { config } = useSiteConfig();
  const shouldReduceMotion = useReducedMotion();
  const [activeNode, setActiveNode] = React.useState<ArchitectureNode | null>(null);

  const threeDEnabled =
    config.websiteEnabled !== false &&
    config.threeDConfig?.enable3D !== false &&
    config.threeDConfig?.hero3D !== false;

  // Mouse tracking motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Scroll tracking
  const { scrollY } = useScroll();
  const scrollZ = useTransform(scrollY, [0, 500], [0, 15]);

  // Smooth springs for mouse tilt
  const springConfig = { damping: 28, stiffness: 140 };
  const mouseRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const mouseRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current || !threeDEnabled) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="relative w-full py-4 select-none">
      {/* DESKTOP EXPERIENCE (lg:block hidden) (TASK B & E) */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="hidden lg:block relative w-full"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          style={{
            rotateX: shouldReduceMotion || !threeDEnabled ? 0 : mouseRotateX,
            rotateY: shouldReduceMotion || !threeDEnabled ? 0 : mouseRotateY,
            translateZ: shouldReduceMotion || !threeDEnabled ? 0 : scrollZ,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full rounded-[2.5rem] bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 min-h-[480px]"
        >
          {/* Ambient Radial Gradient Depth Plate */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-radial from-[#f15e1c]/12 via-[#2e936f]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Hover Background Blur Layer */}
          <div
            className={cn(
              "absolute inset-0 z-15 pointer-events-none transition-all duration-300",
              activeNode ? "backdrop-blur-[3px] bg-white/30 dark:bg-[#000000]/30" : "backdrop-blur-none bg-transparent"
            )}
          />

          {/* Top Header Bar */}
          <div className="relative z-20 flex items-center justify-between border-b border-[#f7d7b0]/60 dark:border-[#1a1a1a] pb-3 mb-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-ping" />
              <span className="text-sm font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]">
                ARAV DIGITAL ARCHITECTURE
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fce3d3]/60 dark:bg-[#121212] text-xs font-mono font-bold text-[#f15e1c] border border-[#f7d7b0]">
              <Sparkles className="w-3.5 h-3.5 text-[#f15e1c]" />
              <span>ENTERPRISE SYSTEM</span>
            </div>
          </div>

          {/* Node Canvas Area with SVG Interconnections */}
          <div className="relative flex-1 min-h-[340px] w-full my-1">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="hero-line-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f15e1c" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#2e936f" stopOpacity="0.5" />
                </linearGradient>
              </defs>

              {architectureNodes.map((node) => {
                const isActive = activeNode?.id === node.id;
                return (
                  <g key={`path-${node.id}`}>
                    <line
                      x1="50"
                      y1="50"
                      x2={node.xPct}
                      y2={node.yPct}
                      stroke={isActive ? "#f15e1c" : "url(#hero-line-glow)"}
                      strokeWidth={isActive ? "3.5" : "1.8"}
                      strokeDasharray={isActive ? "none" : "3 3"}
                      className="transition-all duration-300"
                    />
                    <circle
                      cx={(50 + node.xPct) / 2}
                      cy={(50 + node.yPct) / 2}
                      r={isActive ? "3.5" : "2"}
                      fill={isActive ? "#f15e1c" : "#fab60a"}
                      className="animate-pulse"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Central Engine Node */}
            <div
              style={{ transform: "translate3d(-50%, -50%, 30px)" }}
              className="absolute top-1/2 left-1/2 z-20 flex flex-col items-center justify-center p-5 rounded-3xl bg-white dark:bg-[#000000] border-2 border-[#f15e1c] shadow-2xl shadow-[#f15e1c]/25 text-center min-w-[170px] cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#f15e1c] text-white flex items-center justify-center shadow-lg mb-1.5">
                <Layers className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-sm font-mono font-extrabold text-[#1b2823] dark:text-[#ffffff] tracking-wider uppercase">
                DIGITAL CORE
              </span>
              <span className="text-[10px] text-[#2e936f] font-semibold">
                Unified Engine
              </span>
            </div>

            {/* 3 Ecosystem Service Nodes */}
            {architectureNodes.map((node) => {
              const isActive = activeNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  style={{
                    top: `${node.yPct}%`,
                    left: `${node.xPct}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setActiveNode(node)}
                  onMouseLeave={() => setActiveNode(null)}
                  className="absolute z-30 cursor-pointer"
                >
                  <Link href={node.href} className="block">
                    <div
                      className={cn(
                        "p-4 rounded-2xl bg-white dark:bg-[#000000] border shadow-lg flex items-center gap-3 transition-all duration-300 group hover:shadow-2xl",
                        isActive
                          ? "border-[#f15e1c] ring-4 ring-[#f15e1c]/40 scale-105 shadow-[#f15e1c]/30 z-40"
                          : "border-[#f7d7b0] dark:border-[#1a1a1a]"
                      )}
                    >
                      <div
                        className="p-2.5 rounded-xl shrink-0 transition-colors"
                        style={{
                          backgroundColor: `${node.color}18`,
                          color: node.color,
                        }}
                      >
                        {node.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors flex items-center gap-1">
                          <span>{node.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#f15e1c]" />
                        </div>
                        <div className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] font-medium max-w-[150px] truncate">
                          {node.subtitle}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Bottom Banner */}
          <div className="relative z-30 pt-4 mt-4 border-t border-[#f7d7b0] dark:border-[#1a1a1a] flex items-center justify-between text-sm min-h-[48px]">
            {activeNode ? (
              <div className="flex items-center justify-between w-full animate-in fade-in duration-200 bg-[#fce3d3]/50 dark:bg-[#000000] p-3 rounded-2xl border border-[#f7d7b0]">
                <div className="truncate pr-3">
                  <span className="font-bold text-[#1b2823] dark:text-[#ffffff]">
                    {activeNode.label}:{" "}
                  </span>
                  <span className="text-[#4a5c55] dark:text-[#d3eee4]">
                    {activeNode.description}
                  </span>
                </div>
                <Link
                  href={activeNode.href}
                  className="font-bold text-[#f15e1c] hover:underline flex items-center gap-1 shrink-0"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full text-[#4a5c55] dark:text-[#d3eee4] px-1">
                <span className="flex items-center gap-2 font-medium">
                  <ShieldCheck className="w-4.5 h-4.5 text-[#2e936f] shrink-0" />
                  <span>Hover over ecosystem nodes to inspect architecture</span>
                </span>
                <span className="font-mono text-xs font-bold text-[#f15e1c] shrink-0">
                  3 Core Pillars
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* DEDICATED MOBILE ARCHITECTURE CARD (lg:hidden block) (TASK B & E) */}
      <div className="block lg:hidden w-full">
        <div className="rounded-3xl bg-white dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#f7d7b0] dark:border-[#1a1a1a]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f15e1c] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]">
                ARAV DIGITAL ARCHITECTURE
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#fce3d3] dark:bg-[#161616] text-[10px] font-mono font-bold text-[#f15e1c]">
              Enterprise System
            </span>
          </div>

          {/* Clean Stacked Core Pillar Cards */}
          <div className="space-y-2.5">
            {architectureNodes.map((node) => (
              <Link
                key={node.id}
                href={node.href}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#fefaf5] dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] active:scale-98 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2.5 rounded-xl shrink-0"
                    style={{ backgroundColor: `${node.color}18`, color: node.color }}
                  >
                    {node.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c]">
                      {node.label}
                    </div>
                    <div className="text-xs text-[#4a5c55] dark:text-[#d3eee4]">
                      {node.subtitle}
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-[#f15e1c]" />
              </Link>
            ))}
          </div>

          <div className="pt-2 text-center">
            <Link
              href="/services"
              className="text-xs font-bold text-[#f15e1c] hover:underline inline-flex items-center gap-1"
            >
              Explore All 8 Services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
