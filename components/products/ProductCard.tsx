"use client";

import * as React from "react";
import Link from "next/link";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, CheckCircle2, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product }: ProductCardProps) {
  const isLive = product.status === "live";
  const [showAllCapabilities, setShowAllCapabilities] = React.useState(false);

  // Icon selector
  const icon =
    product.iconName === "ShieldCheck" ? (
      <ShieldCheck className="w-6 h-6 text-[#f15e1c]" />
    ) : (
      <Sparkles className="w-6 h-6 text-[#f15e1c]" />
    );

  const visibleFeatures = showAllCapabilities ? product.features : product.features.slice(0, 4);

  return (
    <div className="group relative h-full rounded-3xl bg-white dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] p-7 sm:p-9 shadow-md hover:shadow-2xl hover:shadow-[#f15e1c]/15 hover:border-[#f15e1c] dark:hover:border-[#f15e1c] hover:bg-[#fefaf5] dark:hover:bg-[#121212] transition-all duration-300 sm:hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden">
      {/* Top Accent Line */}
      <div
        className="absolute top-0 inset-x-0 h-1.5 transition-opacity opacity-80 group-hover:opacity-100"
        style={{ backgroundColor: product.badgeColor }}
      />

      <div className="space-y-6">
        {/* Top Row: Icon & Status Badge */}
        <div className="flex items-center justify-between">
          <div className="p-3.5 rounded-2xl bg-[#f7d7b0]/30 dark:bg-[#1a1a1a] border border-[#f7d7b0] dark:border-[#1a1a1a] transition-transform duration-300 group-hover:scale-105">
            {icon}
          </div>

          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xs"
              style={{ backgroundColor: product.badgeColor }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {product.badge}
            </span>
          </div>
        </div>

        {/* Product Heading & Category */}
        <div className="space-y-2 text-left">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm font-bold font-mono text-[#f15e1c] uppercase tracking-wider">
            {product.category}
          </p>
          <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Capabilities List with Compact View Details toggle */}
        <div className="space-y-3 pt-4 border-t border-[#f7d7b0] dark:border-[#1a1a1a] text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold font-mono uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]">
              Key Capabilities
            </span>
            {product.features.length > 4 && (
              <button
                type="button"
                onClick={() => setShowAllCapabilities(!showAllCapabilities)}
                className="text-xs sm:text-sm font-bold text-[#f15e1c] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
              >
                <span>{showAllCapabilities ? "Show Less" : "View All"}</span>
                {showAllCapabilities ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {visibleFeatures.map((feature, fIdx) => (
              <div key={fIdx} className="flex items-start gap-2.5 text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4]">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#2e936f] shrink-0 mt-0.5" />
                <span className="leading-snug font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer & Actions */}
      <div className="mt-8 pt-5 border-t border-[#f7d7b0] dark:border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href={`/products/${product.slug}`}
          className="text-xs font-bold text-[#4a5c55] dark:text-[#d3eee4] hover:text-[#f15e1c] transition-colors"
        >
          View Details &rarr;
        </Link>

        {isLive && product.externalUrl ? (
          <a
            href={product.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
            aria-label={`Explore ${product.name} external platform in a new browser tab`}
          >
            <Button
              variant="primary"
              size="md"
              className="w-full sm:w-auto shadow-md group-hover:shadow-lg bg-[#f15e1c] hover:bg-[#d8480d] text-white"
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
            className="w-full sm:w-auto opacity-70 cursor-not-allowed border-[#f7d7b0] text-[#4a5c55] dark:text-[#d3eee4]"
          >
            {product.ctaText}
          </Button>
        )}
      </div>
    </div>
  );
}
