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
  ArrowRight,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
  Search: <Search className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  BarChart3: <BarChart3 className="w-6 h-6" />,
  Users2: <Users2 className="w-6 h-6" />,
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
          "relative h-full flex flex-col justify-between rounded-3xl bg-white dark:bg-[#172420] p-7 sm:p-8 border border-[#f7d7b0] dark:border-[#253630] shadow-md hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#f15e1c]/15 hover:border-[#f15e1c] dark:hover:border-[#f15e1c] transition-all duration-300"
        )}
      >
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="p-3.5 rounded-2xl icon-box-hover shadow-xs">
              {iconMap[service.icon] || <Compass className="w-6 h-6" />}
            </div>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#4a5c55] dark:text-[#d3eee4] group-hover:text-[#f15e1c] transition-colors">
              Practice
            </span>
          </div>

          <h3 className="text-xl font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] dark:group-hover:text-[#f15e1c] transition-colors">
            {service.title}
          </h3>

          <p className="mt-2.5 text-sm text-[#4a5c55] dark:text-[#d3eee4] line-clamp-3 leading-relaxed">
            {service.description}
          </p>

          {/* Core Capabilities Snippet */}
          <div className="mt-5 pt-4 border-t border-[#f7d7b0] dark:border-[#253630] space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4a5c55] dark:text-[#d3eee4] block">
              Key Capabilities
            </span>
            <div className="flex flex-wrap gap-1.5">
              {service.capabilities[0]?.items.slice(0, 3).map((item, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-[#fefaf5] dark:bg-[#1e2c27] text-[#1b2823] dark:text-[#ffffff] border border-[#f7d7b0] dark:border-[#253630]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#f7d7b0]/60 dark:border-[#253630] relative z-20 flex items-center justify-between gap-3">
          <Link
            href={`/services/${service.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center text-xs sm:text-sm font-bold text-[#f15e1c] hover:text-[#d8480d] transition-colors gap-1 cursor-pointer py-1"
          >
            <span>Explore Practice</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href={`/contact?intent=setup-call&service=${service.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f15e1c]/10 dark:bg-[#f15e1c]/20 hover:bg-[#f15e1c] text-[#f15e1c] hover:text-white border border-[#f15e1c]/40 text-xs font-mono font-bold transition-all duration-200 cursor-pointer shadow-xs"
          >
            <Phone className="w-3 h-3" />
            <span>Setup Call</span>
          </Link>
        </div>
      </div>
    </TiltCard>
  );
}
