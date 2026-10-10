"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { whyAravPillarsData, WhyAravPillar } from "@/data/why-arav";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-5 h-5 shrink-0" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 shrink-0" />,
  TrendingUp: <TrendingUp className="w-5 h-5 shrink-0" />,
  Cpu: <Cpu className="w-5 h-5 shrink-0" />,
  Lock: <Lock className="w-5 h-5 shrink-0" />,
  Users2: <Users2 className="w-5 h-5 shrink-0" />,
  Sparkles: <Sparkles className="w-5 h-5 shrink-0" />,
};

interface WhyAravDigitalCoreProps {
  pillars?: WhyAravPillar[];
  headline?: string;
  subheadline?: string;
}

export function WhyAravDigitalCore({
  pillars = whyAravPillarsData,
  headline = "Why Businesses Work With Arav",
  subheadline = "We combine technology strategy, software engineering, performance analytics, and compliance advisory to deliver clear business outcomes.",
}: WhyAravDigitalCoreProps) {
  return (
    <section className="relative w-full py-8 sm:py-12 md:py-16 bg-[#FFFDF9] dark:bg-[#16221d] transition-colors duration-300" id="why-arav">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 px-4">
          <Badge variant="secondary" size="md">
            WHY ARAV INNOVATIONS
          </Badge>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
            {headline}
          </h2>
          <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
            {subheadline}
          </p>
        </div>

        {/* 4 Concise Points Grid (2x2 on Desktop, 1 Col on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-sm hover:border-[#f15e1c] dark:hover:border-[#f15e1c] transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-white dark:bg-[#161616] border border-[#f7d7b0]/80 dark:border-[#262626] flex items-center justify-center text-[#f15e1c] shadow-xs">
                    {iconMap[pillar.icon] || <Zap className="w-5 h-5" />}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#f15e1c] tracking-widest">
                    {pillar.number}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#2e936f] dark:text-[#74c4ab] uppercase tracking-wider">
                    {pillar.subtitle}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#f7d7b0]/50 dark:border-[#1f1f1f] flex items-center gap-2 text-xs font-bold text-[#2e936f] dark:text-[#74c4ab]">
                <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                <span>{pillar.businessOutcome}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Single Clear CTA at the Bottom */}
        <div className="text-center pt-4">
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="rounded-full bg-[#f15e1c] hover:bg-[#d94e10] text-white font-bold text-sm sm:text-base px-8 py-3"
              rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
            >
              Book a Free Consultation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
