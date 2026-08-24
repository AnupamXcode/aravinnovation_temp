"use client";

import * as React from "react";
import Link from "next/link";
import { servicesData, Service } from "@/data/services";
import {
  Compass,
  Code2,
  TrendingUp,
  Search,
  ShieldCheck,
  BarChart3,
  Users2,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Search: <Search className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
  Users2: <Users2 className="w-6 h-6" />,
};

const shortLabels = [
  "01  STRATEGY",
  "02  ENGINEERING",
  "03  MARKETING",
  "04  SEO & SEARCH",
  "05  GOVERNANCE",
  "06  AUDIT & FINOPS",
  "07  STAFF SQUADS",
];

export function InteractiveServiceSelector() {
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const selectedService: Service = servicesData[selectedIndex] || servicesData[0];

  const pillars = selectedService.ourSolution?.keyPillars || [];

  return (
    <div className="w-full space-y-6">
      {/* DESKTOP LAYOUT (Side-by-Side List + Detail Panel) */}
      <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
        {/* Left Column: Numbered List */}
        <div className="col-span-4 space-y-2">
          {servicesData.map((svc, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={svc.slug}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-between border ${
                  isSelected
                    ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-xl shadow-[#f15e1c]/20 scale-[1.02]"
                    : "bg-[#ffffff] dark:bg-[#172420] text-[#1b2823] dark:text-[#ffffff] border-[#f7d7b0] dark:border-[#253630] hover:border-[#f15e1c]/50 hover:bg-[#fefaf5] dark:hover:bg-[#1e2c27]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-black tracking-widest opacity-90">
                    {shortLabels[idx]}
                  </span>
                </div>
                <span className="font-display font-extrabold text-sm truncate max-w-[140px]">
                  {svc.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Column: Large Detail Panel */}
        <div className="col-span-8 rounded-3xl bg-[#ffffff] dark:bg-[#172420] border-2 border-[#f7d7b0] dark:border-[#253630] p-8 shadow-2xl space-y-8 relative overflow-hidden transition-all duration-300">
          {/* Accent Header */}
          <div className="flex items-start justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#253630] pb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-[#f15e1c] text-white shadow-lg shadow-[#f15e1c]/25 shrink-0">
                {iconMap[selectedService.icon] || <Compass className="w-6 h-6" />}
              </div>
              <div>
                <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#f15e1c] block">
                  {selectedService.eyebrow}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mt-0.5">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <Link href={`/services/${selectedService.slug}`}>
              <Button
                variant="primary"
                size="md"
                className="rounded-xl px-5 py-2.5 text-xs shadow-md bg-[#f15e1c] hover:bg-[#d8480d] text-white"
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                Explore Practice
              </Button>
            </Link>
          </div>

          {/* Description & Business Problem */}
          <div className="space-y-4">
            <p className="text-base text-[#1b2823] dark:text-[#ffffff] font-medium leading-relaxed">
              {selectedService.description}
            </p>
            <div className="p-4 rounded-2xl bg-[#fefaf5] dark:bg-[#1e2c27] border border-[#f7d7b0] dark:border-[#253630]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f15e1c] block mb-1">
                Challenge We Solve:
              </span>
              <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                {selectedService.businessProblem?.description}
              </p>
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]">
              Core Practice Capabilities:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pillars.slice(0, 4).map((pillar: { title: string; description: string }, idx: number) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white dark:bg-[#22312b] border border-[#f7d7b0] dark:border-[#31473f] flex items-start gap-2.5 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff] block">
                      {pillar.title}
                    </span>
                    <span className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] leading-tight block mt-0.5">
                      {pillar.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Metric Bar */}
          <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#253630] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              {(selectedService.results || []).map((res, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-lg font-black font-display text-[#f15e1c]">
                    {res.metric}
                  </span>
                  <span className="text-[11px] font-mono font-medium text-[#4a5c55] dark:text-[#d3eee4]">
                    {res.label}
                  </span>
                </div>
              ))}
            </div>

            <Link href={`/services/${selectedService.slug}`} className="text-xs font-bold text-[#f15e1c] hover:underline flex items-center gap-1">
              <span>View Full Service Scope</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE ACCORDION LAYOUT */}
      <div className="lg:hidden space-y-3">
        {servicesData.map((svc, idx) => {
          const isSelected = selectedIndex === idx;
          const mobilePillars = svc.ourSolution?.keyPillars || [];
          return (
            <div
              key={svc.slug}
              className="rounded-2xl bg-[#ffffff] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] overflow-hidden shadow-sm"
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(isSelected ? -1 : idx)}
                className={`w-full p-4 text-left flex items-center justify-between transition-colors ${
                  isSelected ? "bg-[#f15e1c] text-white" : "text-[#1b2823] dark:text-[#ffffff]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-extrabold tracking-wider">
                    {shortLabels[idx]}
                  </span>
                  <span className="font-display font-bold text-sm">
                    {svc.title}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSelected ? "rotate-180" : ""}`} />
              </button>

              {isSelected && (
                <div className="p-5 space-y-5 border-t border-[#f7d7b0] dark:border-[#253630]">
                  <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
                    {svc.description}
                  </p>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#f15e1c] block">
                      Capabilities:
                    </span>
                    {mobilePillars.slice(0, 3).map((pillar: { title: string; description: string }, i: number) => (
                      <div key={i} className="text-xs font-medium flex items-center gap-2 text-[#1b2823] dark:text-[#ffffff]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2e936f] shrink-0" />
                        <span>{pillar.title}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={`/services/${svc.slug}`}>
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full rounded-xl py-2 text-xs bg-[#f15e1c] text-white"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5 ml-1" />}
                    >
                      Explore {svc.title}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
