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
          "relative h-full flex flex-col justify-between rounded-3xl bg-white dark:bg-[#171411] p-7 sm:p-8 border border-[#EFE2D6] dark:border-[#2C241E] transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-[#E8672A]/10 hover:border-[#E8672A]/50 dark:hover:border-[#E8672A]/50"
        )}
      >
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="p-3.5 rounded-2xl icon-box-hover shadow-xs">
              {iconMap[service.icon] || <Compass className="w-6 h-6" />}
            </div>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0] group-hover:text-[#E8672A] transition-colors">
              Practice
            </span>
          </div>

          <h3 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#E8672A] dark:group-hover:text-[#E8672A] transition-colors">
            {service.title}
          </h3>

          <p className="mt-2.5 text-sm text-[#7A6A5F] dark:text-[#B8ACA0] line-clamp-3 leading-relaxed">
            {service.description}
          </p>

          {/* Core Capabilities Snippet */}
          <div className="mt-5 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E] space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0] block">
              Key Capabilities
            </span>
            <div className="flex flex-wrap gap-1.5">
              {service.capabilities[0]?.items.slice(0, 3).map((item, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-[#FBF3EA] dark:bg-[#201B17] text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#2C241E]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#EFE2D6]/60 dark:border-[#2C241E] relative z-20">
          <Link
            href={`/services/${service.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center text-sm font-semibold text-[#E8672A] group-hover:text-[#FF7D42] transition-colors gap-1.5 cursor-pointer py-1"
          >
            <span>Explore Practice</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </TiltCard>
  );
}
