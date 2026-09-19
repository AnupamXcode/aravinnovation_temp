"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Code2, Compass, TrendingUp, Cpu, ShieldCheck, ArrowRight } from "lucide-react";

export interface ChallengeItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  gridSpanClass: string;
}

const challengesData: ChallengeItem[] = [
  {
    id: "build-new",
    tag: "01",
    title: "BUILD SOMETHING NEW",
    description: "Websites, applications, platforms and digital products.",
    icon: <Code2 className="w-5 h-5 text-[#f15e1c]" />,
    href: "/services/web-app-development",
    gridSpanClass: "lg:col-span-2",
  },
  {
    id: "improve-tech",
    tag: "02",
    title: "IMPROVE EXISTING TECHNOLOGY",
    description: "Strategy, architecture, performance and modernization.",
    icon: <Compass className="w-5 h-5 text-[#2e936f]" />,
    href: "/services/it-strategy-implementation",
    gridSpanClass: "lg:col-span-2",
  },
  {
    id: "grow-demand",
    tag: "03",
    title: "GROW DIGITAL DEMAND",
    description: "Digital marketing, SEO, lead generation and growth.",
    icon: <TrendingUp className="w-5 h-5 text-[#fab60a]" />,
    href: "/services/digital-marketing-brand-development",
    gridSpanClass: "lg:col-span-2",
  },
  {
    id: "use-ai",
    tag: "04",
    title: "USE AI PRACTICALLY",
    description: "AI solutions, automation and intelligent workflows.",
    icon: <Cpu className="w-5 h-5 text-[#f15e1c]" />,
    href: "/services/ai-portfolio",
    gridSpanClass: "lg:col-span-3",
  },
  {
    id: "strengthen-gov",
    tag: "05",
    title: "STRENGTHEN GOVERNANCE",
    description: "Risk, compliance, controls and operational improvement.",
    icon: <ShieldCheck className="w-5 h-5 text-[#2e936f]" />,
    href: "/services/risk-compliance-governance",
    gridSpanClass: "lg:col-span-3",
  },
];

export function BusinessChallengesSection() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-[#FFFDF9] dark:bg-[#000000] text-[#221811] dark:text-[#FAF5EE]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="secondary" size="md">
            CLIENT GOALS &amp; CHALLENGES
          </Badge>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#221811] dark:text-[#FAF5EE] tracking-tight">
            What Are You Trying to Solve?
          </h2>
          <p className="text-sm sm:text-base text-[#3A2E27] dark:text-[#FAF5EE] font-medium">
            Select the area closest to your business priority to see how we can assist.
          </p>
        </div>

        {/* Balanced 5-Card Responsive Grid (3 in Row 1, 2 Centered in Row 2 on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 w-full">
          {challengesData.map((item, idx) => (
            <ScrollReveal
              key={item.id}
              direction="up"
              delay={idx * 0.08}
              className={`${item.gridSpanClass} w-full`}
            >
              <Link
                href={item.href}
                className="group h-full p-6 sm:p-7 rounded-3xl bg-[#FBF3EA] dark:bg-[#0a0a0a] border border-[#EFE2D6] dark:border-[#1f1f1f] hover:border-[#f15e1c] dark:hover:border-[#f15e1c] hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[220px] sm:min-h-[240px] relative overflow-hidden"
              >
                <div className="flex-1 flex flex-col">
                  {/* Top Bar: Tag + Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#f15e1c] tracking-widest">
                      {item.tag}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-white dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#222222] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-extrabold font-display text-[#221811] dark:text-[#FAF5EE] group-hover:text-[#f15e1c] transition-colors mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#3A2E27]/90 dark:text-[#FAF5EE]/90 font-medium leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Bottom CTA Row */}
                <div className="pt-4 mt-auto border-t border-[#EFE2D6]/70 dark:border-[#1f1f1f] flex items-center justify-between text-xs font-bold text-[#f15e1c]">
                  <span>Explore Approach</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
