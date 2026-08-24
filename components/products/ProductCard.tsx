"use client";

import * as React from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, CheckCircle2, ExternalLink } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product }: ProductCardProps) {
  const isLive = product.status === "live";

  // Icon selector
  const icon =
    product.iconName === "ShieldCheck" ? (
      <ShieldCheck className="w-6 h-6 text-[#E8672A]" />
    ) : (
      <Sparkles className="w-6 h-6 text-[#E8672A]" />
    );

  return (
    <div className="group relative h-full rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] p-8 sm:p-10 shadow-sm hover:shadow-2xl hover:border-[#E8672A]/40 transition-all duration-200 hover:-translate-y-1.5 hover:scale-[1.01] flex flex-col justify-between overflow-hidden">
      {/* Top Accent Line */}
      <div
        className="absolute top-0 inset-x-0 h-1 transition-opacity opacity-70 group-hover:opacity-100"
        style={{ backgroundColor: product.badgeColor }}
      />

      <div className="space-y-6">
        {/* Top Row: Icon & Status Badge */}
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-2xl bg-[#FCE3D3]/60 dark:bg-[#261F1A] border border-[#F4A97F]/30 dark:border-[#3D332B] transition-transform duration-200 group-hover:scale-105">
            {icon}
          </div>

          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-xs"
              style={{ backgroundColor: product.badgeColor }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {product.badge}
            </span>
          </div>
        </div>

        {/* Product Heading & Tagline */}
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#E8672A] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm font-semibold text-[#E8672A]">
            {product.tagline}
          </p>
          <p className="text-xs sm:text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Bullet Features (3-4 items) */}
        <div className="space-y-2.5 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE] block mb-1">
            Key Capabilities
          </span>
          {product.features.slice(0, 4).map((feature, fIdx) => (
            <div key={fIdx} className="flex items-start gap-2 text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
              <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0 mt-0.5" />
              <span className="leading-snug">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer & Actions */}
      <div className="mt-8 pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href={`/products/${product.slug}`}
          className="text-xs font-semibold text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#E8672A] transition-colors"
        >
          View Details &rarr;
        </Link>

        {isLive && product.externalUrl ? (
          <a
            href={product.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button
              variant="primary"
              size="md"
              className="w-full sm:w-auto shadow-md group-hover:shadow-lg"
              rightIcon={<ExternalLink className="w-4 h-4 ml-1" />}
            >
              {product.ctaText}
            </Button>
          </a>
        ) : (
          <Button
            variant="outline"
            size="md"
            disabled
            className="w-full sm:w-auto opacity-70 cursor-not-allowed border-[#EFE2D6] dark:border-[#2C241E]"
          >
            {product.ctaText}
          </Button>
        )}
      </div>
    </div>
  );
}
