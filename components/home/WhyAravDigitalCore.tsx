"use client";

import * as React from "react";
import Link from "next/link";
import { whyAravPillarsData, WhyAravPillar } from "@/data/why-arav";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Compass,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Lock,
  Users2,
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Lock: <Lock className="w-5 h-5" />,
  Users2: <Users2 className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
};

interface WhyAravDigitalCoreProps {
  pillars?: WhyAravPillar[];
  headline?: string;
  subheadline?: string;
}

export function WhyAravDigitalCore({
  pillars = whyAravPillarsData,
  headline = "Engineered for Measurable Business Outcomes",
  subheadline = "Arav Innovations goes beyond generic digital service delivery. We align enterprise strategy, robust cloud architecture, and regulatory awareness to achieve verifiable business results.",
}: WhyAravDigitalCoreProps) {
  const [activePillarId, setActivePillarId] = React.useState<string>(
    pillars[0]?.id || "tech-strategy"
  );
  const activePillar =
    pillars.find((p) => p.id === activePillarId) || pillars[0];

  return (
    <section
      className="py-16 md:py-24 px-4 sm:px-8 lg:px-12 rounded-[2.5rem] bg-[#f7d7b0]/30 border border-[#f7d7b0] shadow-2xl transition-all duration-300 relative overflow-hidden"
      id="why-arav"
    >
      {/* Background Decorative Accent Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#f15e1c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#2e936f]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto mb-14 space-y-4 relative z-10">
        <Badge variant="secondary" size="md">
          WHY ARAV INNOVATIONS
        </Badge>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-[#2e936f] tracking-tight">
          {headline}
        </h2>
        <p className="text-sm sm:text-base text-[#2e936f] leading-relaxed max-w-2xl mx-auto">
          {subheadline}
        </p>
      </div>

      {/* INTERACTIVE ARAV DIGITAL CORE COMPOSITION */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Side / Mobile Pillar Selector Tabs (7 Pillars) */}
        <div className="lg:col-span-5 space-y-3 order-2 lg:order-1">
          {pillars.map((pillar, idx) => {
            const isActive = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActivePillarId(pillar.id)}
                className={cn(
                  "w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 group cursor-pointer relative overflow-hidden",
                  isActive
                    ? "bg-white border-[#f15e1c] shadow-xl ring-2 ring-[#f15e1c]/20 scale-[1.02]"
                    : "bg-white border-[#f7d7b0] hover:border-[#f15e1c]/50 hover:bg-white"
                )}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#f15e1c]" />
                )}

                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-sm",
                    isActive
                      ? "bg-[#f15e1c] text-white"
                      : "bg-[#f7d7b0] text-[#f15e1c] group-hover:bg-[#f15e1c] group-hover:text-white"
                  )}
                >
                  {iconMap[pillar.icon] || <Zap className="w-5 h-5" />}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold font-mono text-[#f15e1c] uppercase tracking-widest">
                      PILLAR {pillar.number}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#2e936f]">
                      {pillar.subtitle}
                    </span>
                  </div>
                  <h3
                    className={cn(
                      "text-sm sm:text-base font-bold font-display transition-colors",
                      isActive
                        ? "text-[#f15e1c]"
                        : "text-[#2e936f] group-hover:text-[#f15e1c]"
                    )}
                  >
                    {pillar.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side / Central Arav Digital Core Display Canvas */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-[#f15e1c]/30 shadow-2xl space-y-6 relative overflow-hidden">
            {/* Top Badge & Number */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#f15e1c]/10 text-[#f15e1c] flex items-center justify-center font-bold text-xl border border-[#f15e1c]/20 shadow-inner">
                  {iconMap[activePillar.icon] || <Zap className="w-6 h-6" />}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#2e936f] font-extrabold tracking-widest">
                    ACTIVE ARCHITECTURAL PILLAR
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-display text-[#f15e1c]">
                    {activePillar.title}
                  </h3>
                </div>
              </div>
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#f15e1c]/30">
                {activePillar.number}
              </span>
            </div>

            {/* Core Description & Rationale */}
            <div className="space-y-4 py-2">
              <p className="text-sm sm:text-base text-[#2e936f] leading-relaxed">
                {activePillar.description}
              </p>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#f7d7b0]/40 border border-[#f15e1c]/20 space-y-2">
                <span className="text-xs font-mono font-bold text-[#2e936f] uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2e936f]" />
                  <span>Target Business Outcome</span>
                </span>
                <p className="text-sm font-bold font-display text-[#2e936f]">
                  {activePillar.businessOutcome}
                </p>
              </div>
            </div>

            {/* Central Arav Digital Core Visual Network Diagram */}
            <div className="p-6 rounded-2xl bg-[#2e936f] text-white border border-[#2e936f] space-y-4 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-[#ffec69] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ffec69] animate-ping" />
                  <span>ARAV DIGITAL CORE SYNERGY</span>
                </span>
                <span className="text-[10px] font-mono text-white font-bold">
                  CONNECTED &amp; ACTIVE
                </span>
              </div>

              {/* 7 Core Connecting Nodes Visual Pill List */}
              <div className="flex flex-wrap gap-2 pt-2">
                {pillars.map((p) => {
                  const isSel = p.id === activePillarId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActivePillarId(p.id)}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 border",
                        isSel
                          ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-lg shadow-[#f15e1c]/40"
                          : "bg-white/20 text-white border-white/40 hover:bg-white hover:text-[#2e936f]"
                      )}
                    >
                      <span>{p.number}.</span>
                      <span>{p.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Supporting Rationale Callout */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#f7d7b0]">
              <p className="text-xs text-[#2e936f] font-semibold">
                Want to see how these pillars solve your specific technical challenges?
              </p>
              <Link href="/contact" className="shrink-0 w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full rounded-xl bg-[#f15e1c] hover:bg-[#d94e10]"
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Schedule Technical Audit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
