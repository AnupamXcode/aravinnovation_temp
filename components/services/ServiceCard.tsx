"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Service } from "@/data/services";
import { TiltCard } from "@/components/motion/TiltCard";
import {
  Compass,
  Code2,
  TrendingUp,
  Search,
  ShieldCheck,
  BarChart3,
  Users2,
  Cpu,
  ArrowRight,
  Phone,
  Globe,
  AppWindow,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-7 h-7 stroke-[2]" />,
  Code2: <Code2 className="w-7 h-7 stroke-[2]" />,
  TrendingUp: <TrendingUp className="w-7 h-7 stroke-[2]" />,
  Search: <Search className="w-7 h-7 stroke-[2]" />,
  ShieldCheck: <ShieldCheck className="w-7 h-7 stroke-[2]" />,
  BarChart3: <BarChart3 className="w-7 h-7 stroke-[2]" />,
  Users2: <Users2 className="w-7 h-7 stroke-[2]" />,
  Cpu: <Cpu className="w-7 h-7 stroke-[2]" />,
  Globe: <Globe className="w-7 h-7 stroke-[2]" />,
  AppWindow: <AppWindow className="w-7 h-7 stroke-[2]" />,
  ShoppingBag: <ShoppingBag className="w-7 h-7 stroke-[2]" />,
  Sparkles: <Sparkles className="w-7 h-7 stroke-[2]" />,
};

export function ServiceCard({
  service,
  featured = false,
}: {
  service: Service;
  featured?: boolean;
}) {
  const router = useRouter();

  return (
    <TiltCard
      maxTilt={6}
      scale={1.02}
      className="h-full cursor-pointer group"
      onClick={() => router.push(`/services/${service.slug}`)}
    >
      <div
        className={cn(
          "relative h-full flex flex-col justify-between rounded-3xl bg-white dark:bg-[#0a0a0a] p-6 sm:p-8 border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-md hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#f15e1c]/15 hover:border-[#f15e1c] dark:hover:border-[#f15e1c] transition-all duration-300"
        )}
      >
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl icon-box-hover shadow-xs shrink-0 flex items-center justify-center bg-[#fefaf5] dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626]">
              {iconMap[service.icon] || <Compass className="w-7 h-7 stroke-[2]" />}
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f15e1c] px-3 py-1 rounded-full bg-[#fce3d3] dark:bg-[#161616] border border-[#f15e1c]/30">
              Practice
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] dark:group-hover:text-[#f15e1c] transition-colors leading-snug break-words overflow-wrap-break-word">
            {service.title}
          </h3>

          <p className="mt-3 text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
            {service.description}
          </p>

          {/* Core Capabilities Snippet */}
          <div className="mt-6 pt-4 border-t border-[#f7d7b0] dark:border-[#1a1a1a] space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2e936f] block font-mono">
              Key Capabilities
            </span>
            <div className="flex flex-wrap gap-1.5">
              {service.capabilities[0]?.items.slice(0, 3).map((item, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold px-3 py-1 rounded-lg bg-[#fefaf5] dark:bg-[#121212] text-[#1b2823] dark:text-[#ffffff] border border-[#f7d7b0] dark:border-[#262626]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#f7d7b0]/60 dark:border-[#1a1a1a] relative z-20 flex items-center justify-between gap-3">
          <Link
            href={`/services/${service.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center text-sm font-bold text-[#f15e1c] hover:text-[#d8480d] transition-colors gap-2 cursor-pointer py-1.5 shrink-0"
          >
            <span>Explore Practice</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (typeof window !== "undefined") {
                window.dispatchEvent(
                  new CustomEvent("arav:open-setup-call", {
                    detail: { service: service.slug },
                  })
                );
              }
            }}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-[#f15e1c]/10 dark:bg-[#f15e1c]/20 hover:bg-[#f15e1c] text-[#f15e1c] hover:text-white border border-[#f15e1c]/40 text-xs font-mono font-bold transition-all duration-200 cursor-pointer shadow-xs shrink-0 min-h-[38px]"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Setup Call</span>
          </button>
        </div>
      </div>
    </TiltCard>
  );
}
