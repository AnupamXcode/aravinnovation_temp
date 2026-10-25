"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BarChart3,
  Database,
  Code2,
  ShoppingCart,
  Settings,
  ShieldCheck,
  Box,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Card 01 Illustration — Minimal 3D Growth Chart with Upward Trend Arrow
 */
function GrowthChartIllustration({ className = "w-22 h-22" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7d7b0]/35 via-[#fab60a]/20 to-transparent rounded-full blur-xl pointer-events-none" />
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="growthBar1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#f7d7b0" />
          </linearGradient>
          <linearGradient id="growthBar2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7d7b0" />
            <stop offset="100%" stopColor="#fab60a" />
          </linearGradient>
          <linearGradient id="growthBar3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fab60a" />
            <stop offset="100%" stopColor="#f15e1c" />
          </linearGradient>
          <linearGradient id="growthBar4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f15e1c" />
            <stop offset="100%" stopColor="#d8480d" />
          </linearGradient>
          <linearGradient id="arrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f7d7b0" />
            <stop offset="50%" stopColor="#fab60a" />
            <stop offset="100%" stopColor="#f15e1c" />
          </linearGradient>
        </defs>

        {/* Isometric 3D Bar 1 */}
        <g transform="translate(18, 52)">
          <path d="M0 5 L10 0 L20 5 L10 10 Z" fill="#ffffff" stroke="#f7d7b0" strokeWidth="0.8" />
          <path d="M0 5 L10 10 L10 28 L0 23 Z" fill="url(#growthBar1)" opacity="0.85" />
          <path d="M10 10 L20 5 L20 23 L10 28 Z" fill="#f7d7b0" opacity="0.95" />
        </g>

        {/* Isometric 3D Bar 2 */}
        <g transform="translate(36, 40)">
          <path d="M0 5 L10 0 L20 5 L10 10 Z" fill="#ffffff" stroke="#fab60a" strokeWidth="0.8" />
          <path d="M0 5 L10 10 L10 40 L0 35 Z" fill="url(#growthBar2)" opacity="0.9" />
          <path d="M10 10 L20 5 L20 35 L10 40 Z" fill="#fab60a" opacity="0.95" />
        </g>

        {/* Isometric 3D Bar 3 */}
        <g transform="translate(54, 26)">
          <path d="M0 5 L10 0 L20 5 L10 10 Z" fill="#ffec69" stroke="#f15e1c" strokeWidth="0.8" />
          <path d="M0 5 L10 10 L10 54 L0 49 Z" fill="url(#growthBar3)" />
          <path d="M10 10 L20 5 L20 49 L10 54 Z" fill="#f15e1c" opacity="0.9" />
        </g>

        {/* Isometric 3D Bar 4 (Tallest) */}
        <g transform="translate(72, 12)">
          <path d="M0 5 L10 0 L20 5 L10 10 Z" fill="#ffec69" stroke="#f15e1c" strokeWidth="0.8" />
          <path d="M0 5 L10 10 L10 68 L0 63 Z" fill="url(#growthBar4)" />
          <path d="M10 10 L20 5 L20 63 L10 68 Z" fill="#d8480d" />
        </g>

        {/* Upward Trend Arrow */}
        <path
          d="M 14 66 Q 52 46 90 8"
          stroke="url(#arrowGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 80 8 L 92 6 L 90 18"
          stroke="#f15e1c"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

/**
 * Card 02 Illustration — Layered Enterprise Technology & Infrastructure Stack
 */
function InfrastructureStackIllustration({ className = "w-22 h-22" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7d7b0]/30 via-[#2e936f]/15 to-transparent rounded-full blur-xl pointer-events-none" />
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="layerTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fefaf5" />
          </linearGradient>
          <linearGradient id="accentOrange" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fab60a" />
            <stop offset="100%" stopColor="#f15e1c" />
          </linearGradient>
          <linearGradient id="accentGreen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2e936f" />
            <stop offset="100%" stopColor="#74c4ab" />
          </linearGradient>
        </defs>

        {/* Bottom Layer 1 */}
        <g transform="translate(32, 48)">
          <path d="M0 11 L28 0 L56 11 L28 22 Z" fill="url(#layerTopGrad)" stroke="#f7d7b0" strokeWidth="0.9" />
          <path d="M0 11 L28 22 L28 31 L0 20 Z" fill="#f7d7b0" />
          <path d="M28 22 L56 11 L56 20 L28 31 Z" fill="#f2bc7d" />
          <path d="M5 13 L28 22 L51 13" stroke="url(#accentGreen)" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Middle Layer 2 */}
        <g transform="translate(32, 30)">
          <path d="M0 11 L28 0 L56 11 L28 22 Z" fill="url(#layerTopGrad)" stroke="#f7d7b0" strokeWidth="0.9" />
          <path d="M0 11 L28 22 L28 31 L0 20 Z" fill="#f7d7b0" />
          <path d="M28 22 L56 11 L56 20 L28 31 Z" fill="#f2bc7d" />
          <path d="M5 13 L28 22 L51 13" stroke="url(#accentOrange)" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Top Layer 3 */}
        <g transform="translate(32, 12)">
          <path d="M0 11 L28 0 L56 11 L28 22 Z" fill="#ffffff" stroke="#f15e1c" strokeWidth="1.1" />
          <path d="M0 11 L28 22 L28 31 L0 20 Z" fill="url(#accentOrange)" opacity="0.9" />
          <path d="M28 22 L56 11 L56 20 L28 31 Z" fill="#d8480d" />
          <circle cx="28" cy="11" r="2.5" fill="#fab60a" />
        </g>

        {/* Substrate Grid Nodes */}
        <path d="M 24 74 L 46 86 L 82 70" stroke="#f7d7b0" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="46" cy="86" r="2" fill="#2e936f" />
        <circle cx="24" cy="74" r="1.5" fill="#f15e1c" />
        <circle cx="82" cy="70" r="1.5" fill="#fab60a" />
      </svg>
    </div>
  );
}

/**
 * Card 03 Illustration — Minimal Web Application Window with Code Symbol & Gear
 */
function SoftwareWindowIllustration({ className = "w-22 h-22" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-[#fab60a]/25 via-[#2e936f]/15 to-transparent rounded-full blur-xl pointer-events-none" />
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="windowSurface" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fefaf5" />
          </linearGradient>
          <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f15e1c" />
            <stop offset="100%" stopColor="#fab60a" />
          </linearGradient>
        </defs>

        {/* Angled SaaS Browser Window Panel */}
        <g transform="translate(24, 16) skewY(-6) rotate(3)">
          <rect x="0" y="0" width="64" height="48" rx="6" fill="url(#windowSurface)" stroke="#f7d7b0" strokeWidth="1.2" />
          <path d="M0 6 C0 2.7 2.7 0 6 0 L58 0 C61.3 0 64 2.7 64 6 L64 11 L0 11 Z" fill="#fef3eb" />
          <circle cx="6" cy="5.5" r="1.6" fill="#f15e1c" />
          <circle cx="11.5" cy="5.5" r="1.6" fill="#fab60a" />
          <circle cx="17" cy="5.5" r="1.6" fill="#2e936f" />

          {/* Central Code Symbol </ > */}
          <text
            x="32"
            y="33"
            textAnchor="middle"
            fill="url(#codeGrad)"
            fontSize="16"
            fontWeight="900"
            fontFamily="monospace"
          >
            &lt;/&gt;
          </text>
        </g>

        {/* Floating Green Gear / Node */}
        <g transform="translate(76, 50)">
          <circle cx="11" cy="11" r="8" fill="#edf8f4" stroke="#2e936f" strokeWidth="1.5" />
          <circle cx="11" cy="11" r="3.5" fill="#2e936f" />
          <path d="M11 0 L11 3.5M11 18.5 L11 22M0 11 L3.5 11M18.5 11 L22 11" stroke="#2e936f" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Card 04 Illustration — Commerce Growth Composition with Shopping Cart & Bars
 */
function CommerceGrowthIllustration({ className = "w-22 h-22" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7d7b0]/35 via-[#2e936f]/20 to-transparent rounded-full blur-xl pointer-events-none" />
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="commerceBar1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2e936f" />
            <stop offset="100%" stopColor="#227658" />
          </linearGradient>
          <linearGradient id="commerceBar2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#74c4ab" />
            <stop offset="100%" stopColor="#2e936f" />
          </linearGradient>
          <linearGradient id="commerceBar3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fab60a" />
            <stop offset="100%" stopColor="#f15e1c" />
          </linearGradient>
        </defs>

        {/* 3D Cube/Bar 1 */}
        <g transform="translate(18, 54)">
          <path d="M0 4 L8 0 L16 4 L8 8 Z" fill="#edf8f4" stroke="#2e936f" strokeWidth="0.8" />
          <path d="M0 4 L8 8 L8 22 L0 18 Z" fill="url(#commerceBar1)" />
          <path d="M8 8 L16 4 L16 18 L8 22 Z" fill="#227658" />
        </g>

        {/* 3D Cube/Bar 2 */}
        <g transform="translate(34, 42)">
          <path d="M0 4 L8 0 L16 4 L8 8 Z" fill="#ffffff" stroke="#74c4ab" strokeWidth="0.8" />
          <path d="M0 4 L8 8 L8 34 L0 30 Z" fill="url(#commerceBar2)" />
          <path d="M8 8 L16 4 L16 30 L8 34 Z" fill="#2e936f" />
        </g>

        {/* 3D Cube/Bar 3 (Tallest) */}
        <g transform="translate(50, 28)">
          <path d="M0 4 L8 0 L16 4 L8 8 Z" fill="#ffec69" stroke="#fab60a" strokeWidth="0.8" />
          <path d="M0 4 L8 8 L8 48 L0 44 Z" fill="url(#commerceBar3)" />
          <path d="M8 8 L16 4 L16 44 L8 48 Z" fill="#d8480d" />
        </g>

        {/* Floating Circular Shopping Cart Node */}
        <g transform="translate(74, 46)">
          <circle cx="16" cy="16" r="14" fill="#fde4d5" stroke="#f15e1c" strokeWidth="1.2" />
          <path
            d="M9 11 H11 L13 20 H21 L23 13 H12"
            stroke="#f15e1c"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="14" cy="22" r="1.2" fill="#f15e1c" />
          <circle cx="20" cy="22" r="1.2" fill="#f15e1c" />
        </g>

        {/* Upward Arrow Swoop */}
        <path
          d="M 16 66 Q 45 42 72 16"
          stroke="#f15e1c"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 64 16 L 74 15 L 72 25"
          stroke="#f15e1c"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

interface AudienceCardItem {
  id: string;
  number: string;
  title: string;
  businessNeed: string;
  aravSupport: string;
  illustration: React.ReactNode;
  businessNeedIcon: React.ReactNode;
  aravSupportIcon: React.ReactNode;
}

const audienceCards: AudienceCardItem[] = [
  {
    id: "scaling-enterprises",
    number: "01",
    title: "Growing &\nScaling Enterprises",
    businessNeed: "Standardizing technology operations and eliminating architectural roadblocks.",
    aravSupport: "Strategic IT roadmaps, cloud architecture tuning, and guided technical governance.",
    illustration: <GrowthChartIllustration />,
    businessNeedIcon: <BarChart3 className="w-3.5 h-3.5 text-[#f15e1c] shrink-0 stroke-[2]" />,
    aravSupportIcon: <Settings className="w-3.5 h-3.5 text-[#2e936f] shrink-0 stroke-[2]" />,
  },
  {
    id: "tech-leaders",
    number: "02",
    title: "Enterprise\nTechnology Leaders",
    businessNeed: "Modernizing legacy infrastructure and maintaining data privacy compliance.",
    aravSupport: "Next.js microservices refactoring, SOC-2 audit readiness, and DPDP governance.",
    illustration: <InfrastructureStackIllustration />,
    businessNeedIcon: <Database className="w-3.5 h-3.5 text-[#f15e1c] shrink-0 stroke-[2]" />,
    aravSupportIcon: <ShieldCheck className="w-3.5 h-3.5 text-[#2e936f] shrink-0 stroke-[2]" />,
  },
  {
    id: "saas-teams",
    number: "03",
    title: "Software & SaaS\nProduct Teams",
    businessNeed: "Accelerating release velocity, securing APIs, and integrating AI automation.",
    aravSupport: "Dedicated senior engineering squads, full-stack React/Next.js engineering, and AI workflows.",
    illustration: <SoftwareWindowIllustration />,
    businessNeedIcon: <Code2 className="w-3.5 h-3.5 text-[#f15e1c] shrink-0 stroke-[2]" />,
    aravSupportIcon: <Box className="w-3.5 h-3.5 text-[#2e936f] shrink-0 stroke-[2]" />,
  },
  {
    id: "digital-commerce",
    number: "04",
    title: "Digital & Commerce\nPlatforms",
    businessNeed: "Building organic search authority and maximizing conversion rates.",
    aravSupport: "Technical SEO audits, programmatic indexing, and conversion funnel optimization.",
    illustration: <CommerceGrowthIllustration />,
    businessNeedIcon: <ShoppingCart className="w-3.5 h-3.5 text-[#f15e1c] shrink-0 stroke-[2]" />,
    aravSupportIcon: <TrendingUp className="w-3.5 h-3.5 text-[#2e936f] shrink-0 stroke-[2]" />,
  },
];

const industriesList = [
  "B2B SaaS",
  "Financial Services",
  "Healthcare Tech",
  "Supply Chain",
  "Clean Energy",
  "Digital Commerce",
];

/**
 * Arav Innovations — Master Who We Help Section
 * 
 * Recreated with exact reference fidelity:
 * - Centered heading with "Help" in Arav orange (#f15e1c).
 * - 4 equal-width audience cards with upper-right 3D-style vector illustrations.
 * - Business Need (orange icon) & Arav Support (green icon) structured blocks.
 * - Full-width wide pill-shaped consultation CTA buttons with filled orange arrow controls.
 * - Clean "INDUSTRIES SERVED" horizontal strip with elegant dividers.
 */
export function WhoWeHelpSection() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 my-4 sm:my-6 md:my-8 select-none" id="who-we-help">
      <section className="py-8 sm:py-12 md:py-14 px-4 sm:px-8 lg:px-10 xl:px-12 rounded-2xl sm:rounded-[2.5rem] bg-[#FFFFFF] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xl transition-all duration-300 max-w-[1760px] mx-auto">
        
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2.5 sm:space-y-3">
          {/* Eyebrow Label with dashes on either side */}
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 sm:w-12 h-[1px] bg-[#f15e1c]/60" aria-hidden="true" />
            <span className="text-xs sm:text-[13px] font-mono font-bold tracking-[0.25em] uppercase text-[#f15e1c]">
              WHO WE HELP
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#f15e1c]/60" aria-hidden="true" />
          </div>

          {/* Main Heading: "Help" highlighted in Arav Orange */}
          <h2 className="text-3xl sm:text-5xl lg:text-[52px] xl:text-[56px] font-extrabold font-display text-[#111111] dark:text-[#ffffff] tracking-tight leading-tight">
            Who We <span className="text-[#f15e1c]">Help</span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-base text-[#555555] dark:text-[#a0aec0] font-normal max-w-2xl mx-auto leading-relaxed">
            We partner with decision-makers who require practical strategy, dependable engineering, and measurable growth across their technology ecosystem.
          </p>
        </div>

        {/* 4 Equal-Width Cards Grid (1 Row on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch">
          {audienceCards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="group h-full rounded-[22px] bg-white dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#222222] hover:border-[#f15e1c] dark:hover:border-[#f15e1c] p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(241,94,28,0.05),0_2px_6px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_32px_-6px_rgba(241,94,28,0.14)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                {/* Top Row: Sequential Number + Upper-Right 3D Illustration */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    {/* Number with dash */}
                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#f15e1c] tracking-widest mb-2.5">
                      <span>{card.number}</span>
                      <span className="w-3.5 h-[1.5px] bg-[#f15e1c]" />
                    </div>

                    {/* Left-Aligned Card Heading */}
                    <h3 className="text-base sm:text-[18px] lg:text-[19px] font-extrabold font-display text-[#111111] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors duration-300 leading-snug tracking-tight whitespace-pre-line">
                      {card.title}
                    </h3>
                  </div>

                  {/* Upper-Right Illustration Container */}
                  <div className="shrink-0 w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24 -mr-1 -mt-1 group-hover:scale-105 transition-transform duration-500 ease-out">
                    {card.illustration}
                  </div>
                </div>

                {/* Business Need Block */}
                <div className="space-y-1.5 mt-3 sm:mt-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#555555] dark:text-[#a0aec0]">
                    {card.businessNeedIcon}
                    <span>BUSINESS NEED</span>
                  </div>
                  <p className="text-xs sm:text-[12.5px] lg:text-[13px] text-[#555555] dark:text-[#a0aec0] leading-relaxed font-normal">
                    {card.businessNeed}
                  </p>
                </div>

                {/* Thin Light Peach Divider */}
                <div className="w-full h-[1px] bg-[#f7d7b0]/60 dark:bg-[#222222] my-3.5 sm:my-4" aria-hidden="true" />

                {/* Arav Support Block */}
                <div className="space-y-1.5 mb-5 sm:mb-6">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#2e936f]">
                    {card.aravSupportIcon}
                    <span>ARAV SUPPORT</span>
                  </div>
                  <p className="text-xs sm:text-[12.5px] lg:text-[13px] text-[#221811] dark:text-[#d3eee4] leading-relaxed font-medium">
                    {card.aravSupport}
                  </p>
                </div>
              </div>

              {/* Bottom Wide Pill-Shaped Consultation CTA */}
              <div className="pt-2 mt-auto">
                <Link
                  href="/contact"
                  className="group/btn w-full py-2.5 px-4 sm:px-5 rounded-full bg-white dark:bg-[#1a1a1a] border border-[#f7d7b0] hover:border-[#f15e1c] dark:border-[#333333] dark:hover:border-[#f15e1c] text-[#f15e1c] hover:bg-[#f15e1c] hover:text-white transition-all duration-300 shadow-xs flex items-center justify-between cursor-pointer"
                  aria-label={`Book a free consultation regarding ${card.title.replace(/\n/g, ' ')}`}
                >
                  <span className="text-xs sm:text-[13px] font-bold tracking-tight">
                    Book a Free Consultation
                  </span>
                  <span className="w-7 h-7 rounded-full bg-[#f15e1c] group-hover/btn:bg-white text-white group-hover/btn:text-[#f15e1c] flex items-center justify-center transition-colors duration-300 shrink-0 ml-2 shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Industries Served Strip Below Cards */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-7 border-t border-[#f7d7b0]/60 dark:border-[#1a1a1a] text-center space-y-2.5">
          {/* Eyebrow Label */}
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 sm:w-12 h-[1px] bg-[#f15e1c]/50" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#f15e1c]">
              INDUSTRIES SERVED
            </span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#f15e1c]/50" aria-hidden="true" />
          </div>

          {/* Horizontal List with Dividers */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 text-xs sm:text-sm font-medium text-[#4a5c55] dark:text-[#d3eee4]">
            {industriesList.map((industry, i) => (
              <React.Fragment key={industry}>
                <span>{industry}</span>
                {i < industriesList.length - 1 && (
                  <span className="text-[#f7d7b0] dark:text-[#333333] mx-2.5 sm:mx-3.5 select-none" aria-hidden="true">
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
