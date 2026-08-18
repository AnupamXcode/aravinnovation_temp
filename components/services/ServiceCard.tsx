import * as React from "react";
import Link from "next/link";
import { Service } from "@/data/services";
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
  Compass: <Compass className="w-6 h-6 text-[#E8672A]" />,
  Code2: <Code2 className="w-6 h-6 text-[#E8672A]" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-[#E8672A]" />,
  Search: <Search className="w-6 h-6 text-[#E8672A]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#E8672A]" />,
  BarChart3: <BarChart3 className="w-6 h-6 text-[#E8672A]" />,
  Users2: <Users2 className="w-6 h-6 text-[#E8672A]" />,
};

export function ServiceCard({
  service,
  featured = false,
}: {
  service: Service;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl bg-white p-7 border border-[#EFE2D6] transition-all duration-200 hover:shadow-xl hover:border-[#E8672A]/40 hover:-translate-y-1",
        featured && "bg-radial from-[#FFFDF9] to-[#FBF3EA] border-[#E8672A]/30 ring-1 ring-[#E8672A]/20"
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="p-3.5 rounded-xl bg-[#FCE3D3]/60 group-hover:bg-[#E8672A] group-hover:text-white transition-colors duration-200 border border-[#F4A97F]/30">
            {iconMap[service.icon] || <Compass className="w-6 h-6 text-[#E8672A]" />}
          </div>
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#7A6A5F] group-hover:text-[#E8672A] transition-colors">
            Practice
          </span>
        </div>

        <h3 className="text-xl font-bold font-display text-[#3A2E27] group-hover:text-[#E8672A] transition-colors">
          {service.title}
        </h3>

        <p className="mt-2.5 text-sm text-[#7A6A5F] line-clamp-3 leading-relaxed">
          {service.description}
        </p>

        {/* Core Capabilities Snippet */}
        <div className="mt-5 pt-4 border-t border-[#EFE2D6] space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A6A5F]/80 block">
            Key Capabilities
          </span>
          <div className="flex flex-wrap gap-1.5">
            {service.capabilities[0]?.items.slice(0, 3).map((item, i) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 rounded-md bg-[#FBF3EA] text-[#3A2E27] border border-[#EFE2D6]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4">
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center text-sm font-semibold text-[#E8672A] group-hover:text-[#d4581f] transition-colors gap-1.5 cursor-pointer"
        >
          <span>Explore Practice</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
