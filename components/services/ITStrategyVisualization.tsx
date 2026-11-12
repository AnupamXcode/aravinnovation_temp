"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Cloud,
  Cpu,
  Compass,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CapabilityCardData {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  positionClass: string;
  cardAnchor: { x: number; y: number };
  hubAnchor: { x: number; y: number };
  pathD: string;
  floatDelay: number;
}

// Coordinate space: 800 x 600
// Hub Center: (400, 260)
// Hub Base Platform Top: (400, 315), Platform Bottom: (400, 360)
const capabilityCards: CapabilityCardData[] = [
  {
    id: "cloud",
    title: "Cloud Architecture",
    subtitle: "Multi-Cloud & FinOps",
    icon: Cloud,
    positionClass: "top-[6%] left-[2%] sm:left-[4%]",
    cardAnchor: { x: 230, y: 75 },
    hubAnchor: { x: 345, y: 220 },
    pathD: "M 230 75 L 345 220",
    floatDelay: 0,
  },
  {
    id: "legacy",
    title: "Legacy Modernization",
    subtitle: "Refactor & De-risk",
    icon: Cpu,
    positionClass: "top-[6%] right-[2%] sm:right-[4%]",
    cardAnchor: { x: 570, y: 75 },
    hubAnchor: { x: 455, y: 220 },
    pathD: "M 570 75 L 455 220",
    floatDelay: 0.8,
  },
  {
    id: "strategy",
    title: "IT Strategy & Roadmap",
    subtitle: "Executive Alignment",
    icon: Compass,
    positionClass: "top-[42%] left-[0%] sm:left-[2%] -translate-y-1/2",
    cardAnchor: { x: 240, y: 255 },
    hubAnchor: { x: 330, y: 255 },
    pathD: "M 240 255 L 330 255",
    floatDelay: 1.6,
  },
  {
    id: "governance",
    title: "Governance & Compliance",
    subtitle: "Zero-Trust & DPDP",
    icon: ShieldCheck,
    positionClass: "top-[42%] right-[0%] sm:right-[2%] -translate-y-1/2",
    cardAnchor: { x: 560, y: 255 },
    hubAnchor: { x: 470, y: 255 },
    pathD: "M 560 255 L 470 255",
    floatDelay: 2.4,
  },
  {
    id: "execution",
    title: "Implementation & Execution",
    subtitle: "Agile Engineering",
    icon: Zap,
    positionClass: "bottom-[5%] left-1/2 -translate-x-1/2",
    cardAnchor: { x: 400, y: 480 },
    hubAnchor: { x: 400, y: 360 },
    pathD: "M 400 480 L 400 360",
    floatDelay: 1.2,
  },
];

export function ITStrategyVisualization({ className }: { className?: string }) {
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative w-full max-w-[720px] xl:max-w-[800px] 2xl:max-w-[860px] mx-auto h-[530px] sm:h-[570px] md:h-[600px] select-none flex items-center justify-center overflow-visible",
        className
      )}
    >
      {/* Dynamic Ambient Radiant Glow */}
      <div
        className={cn(
          "absolute inset-x-8 inset-y-10 bg-radial from-[#f15e1c]/18 via-[#fab60a]/8 to-transparent blur-3xl rounded-full pointer-events-none transition-all duration-700",
          hoveredCard ? "opacity-100 scale-105" : "opacity-75"
        )}
      />

      {/* =========================================================================
          SVG DYNAMIC CONNECTION NETWORK (1:1 CORRESPONDENCE & COMPLETE PATHS)
          ========================================================================= */}
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
      >
        <defs>
          <linearGradient id="line-orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fab60a" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f15e1c" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#f15e1c" stopOpacity="0.8" />
          </linearGradient>

          <filter id="glow-line-refined" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Concentric Grid Rings */}
        <ellipse
          cx="400"
          cy="260"
          rx="170"
          ry="105"
          fill="none"
          stroke="#f15e1c"
          strokeWidth="1"
          strokeOpacity="0.2"
          strokeDasharray="6 8"
        />

        {/* 5 Distinct Capability Connections */}
        {capabilityCards.map((card) => {
          const isHovered = hoveredCard === card.id;

          return (
            <g key={`connection-${card.id}`}>
              {/* Outer Glow Halo on Hover */}
              {isHovered && (
                <path
                  d={card.pathD}
                  fill="none"
                  stroke="#f15e1c"
                  strokeWidth="5"
                  strokeOpacity="0.75"
                  filter="url(#glow-line-refined)"
                  className="transition-all duration-300"
                />
              )}

              {/* Main Structural Connector Line */}
              <path
                d={card.pathD}
                fill="none"
                stroke={isHovered ? "#f15e1c" : "url(#line-orange-grad)"}
                strokeWidth={isHovered ? "2.5" : "1.8"}
                strokeOpacity={isHovered ? 1 : 0.65}
                strokeDasharray={isHovered ? "none" : "5 5"}
                className="transition-all duration-300"
              />

              {/* Hub Junction Node */}
              <circle
                cx={card.hubAnchor.x}
                cy={card.hubAnchor.y}
                r={isHovered ? "5.5" : "4"}
                fill={isHovered ? "#fab60a" : "#f15e1c"}
                className="transition-all duration-300"
              />
              <circle
                cx={card.hubAnchor.x}
                cy={card.hubAnchor.y}
                r={isHovered ? "9" : "7"}
                fill="none"
                stroke="#f15e1c"
                strokeWidth="1.2"
                strokeOpacity={isHovered ? 0.9 : 0.4}
              />

              {/* Card Anchor Node */}
              <circle
                cx={card.cardAnchor.x}
                cy={card.cardAnchor.y}
                r={isHovered ? "5.5" : "4"}
                fill={isHovered ? "#fab60a" : "#f15e1c"}
                className="transition-all duration-300"
              />
              <circle
                cx={card.cardAnchor.x}
                cy={card.cardAnchor.y}
                r={isHovered ? "9" : "7"}
                fill="none"
                stroke="#f15e1c"
                strokeWidth="1.2"
                strokeOpacity={isHovered ? 0.9 : 0.4}
              />

              {/* Continuous Traveling Light Pulse (traveling from card towards hub) */}
              {!shouldReduceMotion && (
                <circle r={isHovered ? "4" : "3"} fill="#ffffff" filter="url(#glow-line-refined)">
                  <animateMotion
                    path={card.pathD}
                    dur={isHovered ? "1.8s" : "3.6s"}
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* =========================================================================
          CENTRAL 3D STRATEGY HUB (TRUE GEOMETRIC GLASS CUBE & MULTI-TIER DAIS)
          ========================================================================= */}
      <div className="relative z-20 flex flex-col items-center justify-center pointer-events-none mt-[-24px]">
        
        {/* Real 3D Geometric Cube Container (120px x 120px, translateZ = 60px) */}
        <div
          className="relative w-28 h-28 sm:w-32 sm:h-32"
          style={{ perspective: "1200px" }}
        >
          {/* Continuous Smooth 3D Rotating Wrapper */}
          <div
            className={cn(
              "w-full h-full relative transform-gpu transition-transform",
              shouldReduceMotion ? "rotate-x-[-18deg] rotate-y-[32deg]" : "animate-cube-rotate-smooth",
              hoveredCard && "scale-105"
            )}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Suspended Internal Glowing Technological Core */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ transform: "translateZ(0px)" }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f15e1c] via-[#fab60a] to-[#ffec69] shadow-[0_0_30px_#f15e1c,0_0_50px_#fab60a] flex items-center justify-center animate-pulse border-2 border-white/80">
                <div className="w-4 h-4 rounded-sm bg-white shadow-[0_0_12px_#ffffff]" />
              </div>
            </div>

            {/* FRONT FACE (Glass Surface + Microchip Node) */}
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f15e1c]/25 via-white/45 to-[#fab60a]/20 dark:from-[#f15e1c]/30 dark:via-[#16221d]/75 dark:to-[#fab60a]/25 backdrop-blur-md border border-[#f15e1c]/70 shadow-[inset_0_0_20px_rgba(241,94,28,0.35)] flex items-center justify-center"
              style={{ transform: "translateZ(60px)" }}
            >
              <div className="w-9 h-9 rounded-xl bg-white/75 dark:bg-[#1b2823]/80 border border-[#f15e1c]/50 flex items-center justify-center shadow-xs">
                <div className="w-3.5 h-3.5 rounded-full bg-[#f15e1c] shadow-[0_0_12px_#f15e1c]" />
              </div>
            </div>

            {/* BACK FACE (Frosted Structural Glass) */}
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f15e1c]/20 via-white/30 to-[#fab60a]/15 dark:from-[#f15e1c]/25 dark:via-[#16221d]/60 dark:to-[#fab60a]/15 backdrop-blur-md border border-[#f15e1c]/45 shadow-[inset_0_0_16px_rgba(241,94,28,0.2)]"
              style={{ transform: "rotateY(180deg) translateZ(60px)" }}
            />

            {/* RIGHT FACE (Specular Golden Glass with Horizontal Bus) */}
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#fab60a]/30 via-white/35 to-[#f15e1c]/25 dark:from-[#fab60a]/30 dark:via-[#16221d]/70 dark:to-[#f15e1c]/30 backdrop-blur-md border border-[#fab60a]/60 shadow-[inset_0_0_18px_rgba(250,182,10,0.3)] flex items-center justify-center"
              style={{ transform: "rotateY(90deg) translateZ(60px)" }}
            >
              <div className="w-12 h-1 bg-gradient-to-r from-transparent via-[#fab60a] to-transparent rounded-full opacity-80" />
            </div>

            {/* LEFT FACE (Green-Tinted Enterprise Modernization Glass) */}
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f15e1c]/25 via-white/35 to-[#2e936f]/25 dark:from-[#f15e1c]/25 dark:via-[#16221d]/70 dark:to-[#2e936f]/30 backdrop-blur-md border border-[#2e936f]/60 shadow-[inset_0_0_18px_rgba(46,147,111,0.3)] flex items-center justify-center"
              style={{ transform: "rotateY(-90deg) translateZ(60px)" }}
            >
              <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#2e936f]/70 animate-spin-slow" />
            </div>

            {/* TOP FACE (High-Gloss Specular Highlight) */}
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/90 via-[#fff8db]/70 to-[#fab60a]/40 dark:from-white/40 dark:via-[#ffec69]/30 dark:to-[#f15e1c]/40 backdrop-blur-md border border-white/90 shadow-[0_0_24px_rgba(255,236,105,0.5)] flex items-center justify-center"
              style={{ transform: "rotateX(90deg) translateZ(60px)" }}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_15px_#ffffff]" />
            </div>

            {/* BOTTOM FACE (Shadow & Ambient Projection Ground) */}
            <div
              className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#f15e1c]/45 to-[#16221d] border border-[#f15e1c]/60 shadow-2xl"
              style={{ transform: "rotateX(-90deg) translateZ(60px)" }}
            />
          </div>
        </div>

        {/* Refined Circular Strategy Platform Directly Anchoring Cube */}
        <div className="relative mt-3 flex flex-col items-center">
          {/* Multi-Tier Orbital Dais */}
          <div className="relative w-48 sm:w-56 h-14 flex items-center justify-center">
            {/* Ambient Floor Glow Pool */}
            <div className="absolute inset-x-3 bottom-0 h-9 bg-radial from-[#f15e1c]/45 via-[#fab60a]/25 to-transparent rounded-full blur-md" />
            
            {/* Outer Slow Rotating Dashed Ring */}
            <div
              className={cn(
                "absolute inset-0 rounded-full border border-dashed border-[#f15e1c]/60 dark:border-[#f15e1c]/70",
                !shouldReduceMotion && "animate-spin-slow"
              )}
            />

            {/* Middle Platform Dais */}
            <div className="w-40 sm:w-48 h-10 rounded-full bg-gradient-to-r from-white/95 via-[#fefaf5]/90 to-white/95 dark:from-[#1b2823] dark:via-[#20312a] dark:to-[#1b2823] border border-[#f7d7b0] dark:border-[#2a3c35] shadow-lg flex items-center justify-center">
              <div className="w-28 h-4 rounded-full bg-gradient-to-r from-[#fab60a]/25 via-[#f15e1c]/35 to-[#fab60a]/25 blur-xs" />
            </div>
          </div>

          {/* Integrated Platform Hub Title */}
          <div className="mt-1 text-center">
            <span className="block text-[11px] sm:text-xs font-mono font-black uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff] leading-tight">
              IT Strategy &amp;
            </span>
            <span className="block text-[11px] sm:text-xs font-mono font-black uppercase tracking-wider text-[#f15e1c] leading-tight">
              Implementation
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FIVE FLOATING CAPABILITY CARDS (REPOSITIONED & PROPORTIONED)
          ========================================================================= */}
      {capabilityCards.map((card) => {
        const IconComponent = card.icon;
        const isHovered = hoveredCard === card.id;

        return (
          <div
            key={card.id}
            className={cn("absolute z-30 pointer-events-auto", card.positionClass)}
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <motion.div
              animate={
                shouldReduceMotion
                  ? { y: 0 }
                  : {
                      y: isHovered ? -6 : [0, -6, 0],
                    }
              }
              transition={
                isHovered
                  ? { duration: 0.2, ease: "easeOut" }
                  : {
                      duration: 4.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: card.floatDelay,
                    }
              }
              className={cn(
                "group relative p-2.5 sm:p-3 rounded-2xl bg-white/95 dark:bg-[#16221d]/95 backdrop-blur-md border transition-all duration-300 cursor-pointer shadow-md",
                isHovered
                  ? "border-[#f15e1c] bg-white dark:bg-[#1b2823] shadow-xl shadow-[#f15e1c]/25 scale-[1.04]"
                  : "border-[#f7d7b0] dark:border-[#2a3c35] hover:border-[#f15e1c]/70 hover:shadow-lg"
              )}
            >
              <div className="flex items-center gap-3">
                {/* Refined Orange/Brand Outline Icon Badge */}
                <div
                  className={cn(
                    "w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200",
                    isHovered
                      ? "bg-[#f15e1c] text-white shadow-md shadow-[#f15e1c]/30 scale-105"
                      : "bg-[#f15e1c]/10 text-[#f15e1c] dark:bg-[#f15e1c]/20"
                  )}
                >
                  <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>

                {/* Card Headings & Descriptions */}
                <div className="text-left pr-1.5">
                  <div className="text-xs sm:text-[13px] font-bold font-display text-[#1b2823] dark:text-[#ffffff] leading-tight whitespace-nowrap group-hover:text-[#f15e1c] transition-colors">
                    {card.title}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-mono text-[#4a5c55] dark:text-[#d3eee4] leading-tight mt-0.5">
                    {card.subtitle}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        );
      })}

      {/* Global CSS for 3D Cube Rotation and Platform Dynamics */}
      <style jsx>{`
        @keyframes cubeRotateSmooth {
          0% {
            transform: rotateX(-18deg) rotateY(0deg);
          }
          100% {
            transform: rotateX(-18deg) rotateY(360deg);
          }
        }
        @keyframes spinSlow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-cube-rotate-smooth {
          animation: cubeRotateSmooth 14s linear infinite;
        }
        .animate-spin-slow {
          animation: spinSlow 22s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default ITStrategyVisualization;
