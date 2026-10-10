"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ScrollTextFlip } from "@/components/motion/ScrollTextFlip";
import {
  FolderCheck,
  CalendarClock,
  Users,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

export function EngagementModelsSection() {
  const models = [
    {
      title: "Project-Based Engagement",
      badge: "DEFINED SCOPE",
      icon: <FolderCheck className="w-6 h-6 text-[#f15e1c]" />,
      accentColor: "#f15e1c",
      description:
        "Structured for initiatives with clear milestones, predefined technical requirements, concrete deliverables, and an agreed execution timeline.",
      features: [
        "Fixed-scope discovery & architecture plan",
        "Clear milestone schedule & deliverable gates",
        "Transparent milestone approval process",
        "100% code, IP, and repository ownership",
      ],
      idealFor: "System audits, Next.js migrations, standalone web portals, or compliance roadmaps.",
    },
    {
      title: "Monthly Engagement",
      badge: "ONGOING PARTNERSHIP",
      icon: <CalendarClock className="w-6 h-6 text-[#2e936f]" />,
      accentColor: "#2e936f",
      description:
        "Designed for businesses requiring ongoing engineering optimization, continuous technical SEO, digital growth, or risk compliance support.",
      features: [
        "Agreed monthly scope & priorities",
        "Flexible sprint allocation across practices",
        "Regular progress reviews & transparent reporting",
        "Predictable operational planning",
      ],
      idealFor: "Continuous web platform tuning, ongoing SEO & demand generation, or risk governance advisory.",
    },
    {
      title: "Dedicated Team Augmentation",
      badge: "SQUAD EXTENSION",
      icon: <Users className="w-6 h-6 text-[#fab60a]" />,
      accentColor: "#fab60a",
      description:
        "Assigned senior engineers, practice leads, and specialists operating as a seamless extension of your internal product or engineering leadership.",
      features: [
        "Dedicated senior talent matched to your stack",
        "Direct integration into your sprint workflows",
        "Knowledge transfer & documentation",
        "Scalable capacity based on project milestones",
      ],
      idealFor: "Scaling engineering velocity, rapid feature rollouts, or filling specialized skill gaps.",
    },
  ];

  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#ffffff] dark:bg-[#16221d] text-[#1b2823] dark:text-[#ffffff] transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="secondary" size="md">
            COMMERCIAL STRUCTURES
          </Badge>
          <ScrollTextFlip>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
              Flexible Engagement &amp; Pricing Models
            </h2>
          </ScrollTextFlip>
          <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
            We structure our commercial partnerships around your business objectives, operational maturity, and technical scope requirements without hidden fees or vendor lock-in.
          </p>
        </div>

        {/* 3 Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {models.map((model, idx) => (
            <ScrollReveal key={model.title} direction="up" delay={idx * 0.1} className="h-full">
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-lg flex flex-col justify-between space-y-6 hover:border-[#f15e1c] transition-all duration-300 group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      {model.icon}
                    </div>
                    <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#fce3d3] dark:bg-[#161616] text-[#f15e1c] border border-[#f7d7b0] uppercase">
                      {model.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                      {model.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium mt-2">
                      {model.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a] space-y-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#1b2823] dark:text-[#ffffff] block">
                      Key Structure Characteristics:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#4a5c55] dark:text-[#d3eee4]">
                      {model.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2e936f] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#f7d7b0]/60 dark:border-[#1a1a1a] space-y-3">
                  <div className="p-3 rounded-2xl bg-white dark:bg-[#161616] border border-[#f7d7b0]/70 dark:border-[#262626]">
                    <span className="text-[11px] font-bold text-[#1b2823] dark:text-[#ffffff] block">Best Suited For:</span>
                    <span className="text-xs text-[#4a5c55] dark:text-[#d3eee4]">{model.idealFor}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Pricing Determination Principles Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-md space-y-4">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-[#f15e1c] shrink-0" />
            <h3 className="text-lg font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
              How Commercial Estimates Are Determined
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
            Pricing for every engagement is calculated transparently based on <strong>technical scope requirements</strong>, <strong>system complexity</strong>, <strong>estimated execution duration</strong>, and <strong>team seniority requirements</strong>. We evaluate your goals during discovery and provide a detailed proposal before work begins.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a]">
            <div className="flex items-center gap-2 text-xs font-medium text-[#2e936f]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Full Code &amp; IP Ownership &bull; Zero Hidden Costs &bull; Transparent Scoping</span>
            </div>
            <Link href="/contact">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Request a Custom Scope &amp; Proposal
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
