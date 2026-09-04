"use client";

import * as React from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ScrollTextFlip } from "@/components/motion/ScrollTextFlip";
import { Badge } from "@/components/ui/badge";
import { Compass, Code2, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ProblemToSolutionSection() {
  const pillars = [
    {
      step: "01",
      tag: "THINK",
      title: "Strategy & Consulting",
      description: "Navigating complexity with practical IT roadmaps, digital architecture, and governance designed around real business outcomes.",
      icon: <Compass className="w-6 h-6 text-[#f15e1c]" />,
      tone: "#f15e1c",
      bgGradient: "from-[#f15e1c]/10 to-transparent",
    },
    {
      step: "02",
      tag: "BUILD",
      title: "Technology & AI",
      description: "Engineering resilient web products, custom mobile platforms, intelligent LLM automation, and high-performance digital systems.",
      icon: <Code2 className="w-6 h-6 text-[#2e936f]" />,
      tone: "#2e936f",
      bgGradient: "from-[#2e936f]/10 to-transparent",
    },
    {
      step: "03",
      tag: "GROW",
      title: "Digital & Marketing",
      description: "Accelerating brand visibility, organic search authority, and customer acquisition through strategy and continuous optimization.",
      icon: <TrendingUp className="w-6 h-6 text-[#fab60a]" />,
      tone: "#fab60a",
      bgGradient: "from-[#fab60a]/10 to-transparent",
    },
  ];

  return (
    <section className="py-6 md:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 w-full">
      <div className="max-w-7xl mx-auto rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] p-6 sm:p-10 lg:p-12 shadow-2xl transition-colors duration-300 relative overflow-hidden">
        {/* Subtle Brand Accent Gradient */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#f15e1c] via-[#2e936f] to-[#fab60a]" />

        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
          <Badge variant="secondary" size="md">
            PURPOSE-DRIVEN TECHNOLOGY
          </Badge>
          <ScrollTextFlip>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight leading-tight">
              Technology is only valuable when it solves a real problem.
            </h2>
          </ScrollTextFlip>
          <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed pt-2">
            Businesses don&apos;t need more technology for the sake of technology. They need better systems, better digital experiences, better visibility and better ways to grow. That&apos;s where we come in. Arav Innovations brings together technology consulting, software engineering, AI, digital marketing, SEO, cybersecurity, compliance and talent solutions under one connected ecosystem.
          </p>
        </div>

        {/* 3 Visually Distinct Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pillars.map((pillar, idx) => (
            <ScrollReveal key={pillar.tag} direction="up" delay={idx * 0.15} className="h-full">
              <div className="h-full rounded-3xl bg-white dark:bg-[#16221d] p-6 sm:p-8 border border-[#f7d7b0] dark:border-[#2a3c35] hover:border-[#f15e1c] transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between group relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${pillar.bgGradient} rounded-bl-full pointer-events-none`} />

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black tracking-widest px-3.5 py-1.5 rounded-full bg-[#fce3d3] dark:bg-[#161616] text-[#f15e1c] border border-[#f15e1c]/30">
                      {pillar.step} &bull; {pillar.tag}
                    </span>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#262626] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      {React.cloneElement(pillar.icon, { className: "w-7 h-7 sm:w-8 sm:h-8 stroke-[2]" })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f7d7b0]/60 dark:border-[#2a3c35] relative z-10">
                  <Link
                    href="#services"
                    className="inline-flex items-center gap-2 text-sm font-extrabold font-display uppercase tracking-wider text-[#f15e1c] hover:text-[#d8480d] transition-colors py-1 cursor-pointer"
                  >
                    <span>Explore {pillar.tag} Capabilities</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
