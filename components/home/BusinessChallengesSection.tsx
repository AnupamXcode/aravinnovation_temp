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
}

const challengesData: ChallengeItem[] = [
  {
    id: "build-new",
    tag: "01",
    title: "BUILD SOMETHING NEW",
    description: "Websites, applications, platforms and digital products.",
    icon: <Code2 className="w-5 h-5 text-[#f15e1c]" />,
    href: "/services/web-app-development",
  },
  {
    id: "improve-tech",
    tag: "02",
    title: "IMPROVE EXISTING TECHNOLOGY",
    description: "Strategy, architecture, performance and modernization.",
    icon: <Compass className="w-5 h-5 text-[#2e936f]" />,
    href: "/services/it-strategy-implementation",
  },
  {
    id: "grow-demand",
    tag: "03",
    title: "GROW DIGITAL DEMAND",
    description: "Digital marketing, SEO, lead generation and growth.",
    icon: <TrendingUp className="w-5 h-5 text-[#fab60a]" />,
    href: "/services/digital-marketing-brand-development",
  },
  {
    id: "use-ai",
    tag: "04",
    title: "USE AI PRACTICALLY",
    description: "AI solutions, automation and intelligent workflows.",
    icon: <Cpu className="w-5 h-5 text-[#f15e1c]" />,
    href: "/services/ai-portfolio",
  },
  {
    id: "strengthen-gov",
    tag: "05",
    title: "STRENGTHEN GOVERNANCE",
    description: "Risk, compliance, controls and operational improvement.",
    icon: <ShieldCheck className="w-5 h-5 text-[#2e936f]" />,
    href: "/services/risk-compliance-governance",
  },
];

export function BusinessChallengesSection() {
  return (
    <section className="w-full py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FFFDF9] dark:bg-[#000000]">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="secondary" size="md">
            CLIENT GOALS &amp; CHALLENGES
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#221811] dark:text-[#FAF5EE]">
            What Are You Trying to Solve?
          </h2>
          <p className="text-xs sm:text-sm text-[#3A2E27] dark:text-[#FAF5EE] font-medium">
            Select the area closest to your business priority to see how we can assist.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {challengesData.map((item, idx) => (
            <ScrollReveal key={item.id} direction="up" delay={idx * 0.1}>
              <Link
                href={item.href}
                className="group h-full p-5 rounded-2xl bg-[#FBF3EA] dark:bg-[#0a0a0a] border border-[#EFE2D6] dark:border-[#1f1f1f] hover:border-[#f15e1c] dark:hover:border-[#f15e1c] hover:shadow-lg transition-all flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#f15e1c]">
                      {item.tag}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#222222] flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold font-display text-[#221811] dark:text-[#FAF5EE] group-hover:text-[#f15e1c] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#3A2E27] dark:text-[#FAF5EE] font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#EFE2D6]/60 dark:border-[#1f1f1f] flex items-center gap-1.5 text-xs font-bold text-[#f15e1c]">
                  <span>Explore Approach</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
