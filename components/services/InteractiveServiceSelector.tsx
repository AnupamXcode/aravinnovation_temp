"use client";

import * as React from "react";
import Link from "next/link";
import { Service } from "@/data/services";
import { getLocalizedServices } from "@/data/locale-data";
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
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "next-intl";

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
  const t = useTranslations("Services");
  const locale = useLocale();
  const servicesData = getLocalizedServices(locale);
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
                    : "bg-[#ffffff] dark:bg-[#0a0a0a] text-[#1b2823] dark:text-[#ffffff] border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]/50 hover:bg-[#fefaf5] dark:hover:bg-[#121212]"
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

        {/* Right Column: Large 3D Detail Panel */}
        <div className="col-span-8 perspective-1000">
          <div
            key={selectedService.slug}
            className="rounded-3xl bg-[#ffffff] dark:bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] p-8 shadow-2xl space-y-6 relative overflow-hidden transition-all duration-300 transform-style-3d hover-lift-3d animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Accent Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-5">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-[#f15e1c] text-white shadow-lg shadow-[#f15e1c]/25 shrink-0 transform-style-3d hover:rotate-6 transition-transform">
                  {iconMap[selectedService.icon] || <Compass className="w-6 h-6" />}
                </div>
                <div>
                  <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-[#f15e1c] block">
                    {selectedService.eyebrow}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] mt-0.5">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/services/${selectedService.slug}`}>
                  <Button
                    variant="primary"
                    size="md"
                    className="rounded-xl px-4 py-2.5 text-xs shadow-md bg-[#f15e1c] hover:bg-[#d8480d] text-white"
                    rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                  >
                    {t("explorePractice")}
                  </Button>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(
                        new CustomEvent("arav:open-setup-call", {
                          detail: { service: selectedService.slug },
                        })
                      );
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#f15e1c]/10 dark:bg-[#f15e1c]/20 hover:bg-[#f15e1c] text-[#f15e1c] hover:text-white border border-[#f15e1c]/40 text-xs font-mono font-bold transition-all duration-200 cursor-pointer shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Setup Call</span>
                </button>
              </div>
            </div>

            {/* 1-2 Line Concise Description */}
            <p className="text-base text-[#1b2823] dark:text-[#ffffff] font-medium leading-snug">
              {selectedService.tagline || selectedService.description}
            </p>

            {/* Visual Capability Badges Grid */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#f15e1c]">
                {t("coreCapabilities")}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pillars.slice(0, 4).map((pillar: { title: string; description: string }, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-[#fefaf5] dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] flex items-center gap-2.5 shadow-2xs hover:border-[#f15e1c]/50 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                    <span className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff] truncate">
                      {pillar.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Metric Highlights Bar */}
            <div className="pt-4 border-t border-[#f7d7b0] dark:border-[#1a1a1a] flex items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                {(selectedService.results || []).slice(0, 2).map((res, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-2xl font-black font-mono text-[#f15e1c]">
                      {res.metric}
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#4a5c55] dark:text-[#d3eee4]">
                      {res.label}
                    </span>
                  </div>
                ))}
              </div>

              <Link href={`/services/${selectedService.slug}`} className="text-xs font-bold text-[#f15e1c] hover:underline flex items-center gap-1">
                <span>{t("fullScope")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE ACCORDION LAYOUT */}
      <div className="lg:hidden space-y-3.5">
        {servicesData.map((svc, idx) => {
          const isSelected = selectedIndex === idx;
          const mobilePillars = svc.ourSolution?.keyPillars || [];
          return (
            <div
              key={svc.slug}
              className="rounded-2xl bg-[#ffffff] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] overflow-hidden shadow-sm"
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(isSelected ? -1 : idx)}
                className={`w-full p-4 sm:p-5 text-left flex items-center justify-between transition-colors ${
                  isSelected ? "bg-[#f15e1c] text-white" : "text-[#1b2823] dark:text-[#ffffff]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-black tracking-wider shrink-0">
                    {shortLabels[idx]}
                  </span>
                  <span className="font-display font-extrabold text-sm sm:text-base leading-snug">
                    {svc.title}
                  </span>
                </div>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 shrink-0 ml-2 ${isSelected ? "rotate-180" : ""}`} />
              </button>

              {isSelected && (
                <div className="p-5 sm:p-6 space-y-5 border-t border-[#f7d7b0] dark:border-[#1a1a1a]">
                  <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
                    {svc.description}
                  </p>

                  <div className="space-y-2.5">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f15e1c] block">
                      {t("coreCapabilities")}
                    </span>
                    {mobilePillars.slice(0, 4).map((pillar: { title: string; description: string }, i: number) => (
                      <div key={i} className="text-xs sm:text-sm font-semibold flex items-center gap-2.5 text-[#1b2823] dark:text-[#ffffff]">
                        <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                        <span>{pillar.title}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <Link href={`/services/${svc.slug}`} className="block">
                      <Button
                        variant="primary"
                        size="md"
                        className="w-full rounded-xl py-3 text-xs sm:text-sm bg-[#f15e1c] text-white font-bold"
                        rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
                      >
                        {t("explorePractice")}
                      </Button>
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          window.dispatchEvent(
                            new CustomEvent("arav:open-setup-call", {
                              detail: { service: svc.slug },
                            })
                          );
                        }
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#f15e1c]/10 dark:bg-[#f15e1c]/20 hover:bg-[#f15e1c] text-[#f15e1c] hover:text-white border border-[#f15e1c]/40 text-xs sm:text-sm font-mono font-bold transition-all duration-200 cursor-pointer shadow-xs min-h-[44px]"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Setup Call</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
