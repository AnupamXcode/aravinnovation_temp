"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, CheckCircle2, ExternalLink, ChevronDown, ChevronUp, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

function AstroBeamsLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="url(#astrobeams-grad)" opacity="0.15" />
      <circle cx="16" cy="16" r="14" stroke="url(#astrobeams-grad)" strokeWidth="1.5" />
      {/* Crescent Moon & Star Beam Mark */}
      <path
        d="M17.5 7.5C14 7.5 11 10.5 11 14.5C11 18.5 14 21.5 17.5 21.5C16 21.5 13.5 20.5 12.5 19C11.5 17.5 11.5 15.5 12.5 14C13.5 12.5 15.5 11.5 17.5 11.5C18.5 11.5 19.5 11.8 20.2 12.3C19.5 9.5 18.5 7.5 17.5 7.5Z"
        fill="url(#astrobeams-grad)"
      />
      <path d="M16 4V6M16 26V28M4 16H6M26 16H28M7.5 7.5L9 9M23 23L24.5 24.5M24.5 7.5L23 9M9 23L7.5 24.5" stroke="#f15e1c" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2.5" fill="#fab60a" />
      <defs>
        <linearGradient id="astrobeams-grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f15e1c" />
          <stop offset="1" stopColor="#fab60a" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const isLive = product.status === "live";
  const [showAllCapabilities, setShowAllCapabilities] = React.useState(false);

  // Icon selector: AstroBeams logo for celestial/astrology products, ShieldCheck for GRC
  const icon =
    product.iconName === "ShieldCheck" ? (
      <ShieldCheck className="w-6 h-6 text-[#f15e1c]" />
    ) : product.slug.includes("astrobeams") || product.iconName === "Orbit" ? (
      <AstroBeamsLogoIcon className="w-6 h-6" />
    ) : (
      <Sparkles className="w-6 h-6 text-[#f15e1c]" />
    );

  const visibleFeatures = showAllCapabilities ? product.features : product.features.slice(0, 6);

  // Clean heading without appended .store string
  const displayTitle = product.name.replace(/\.store$/i, "");

  return (
    <div className="group relative h-full rounded-3xl bg-white dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] p-6 sm:p-8 shadow-md hover:shadow-2xl hover:shadow-[#f15e1c]/15 hover:border-[#f15e1c] dark:hover:border-[#f15e1c] hover:bg-[#fefaf5] dark:hover:bg-[#121212] transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Accent Line */}
      <div
        className="absolute top-0 inset-x-0 h-1.5 transition-opacity opacity-80 group-hover:opacity-100"
        style={{ backgroundColor: product.badgeColor }}
      />

      <div className="space-y-5">
        {/* Top Row: Icon & Status Badge */}
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-2xl bg-[#f7d7b0]/30 dark:bg-[#1a1a1a] border border-[#f7d7b0] dark:border-[#1a1a1a] transition-transform duration-300 group-hover:scale-105">
            {icon}
          </div>

          <div className="flex items-center gap-2">
            {product.domain && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold text-[#2e936f] bg-[#2e936f]/10 border border-[#2e936f]/30">
                <Globe className="w-3 h-3 text-[#2e936f]" />
                <span>{product.domain}</span>
              </span>
            )}
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xs"
              style={{ backgroundColor: product.badgeColor }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {product.badge}
            </span>
          </div>
        </div>

        {/* Product Image Banner */}
        {product.imageUrl && (
          <div className="relative w-full aspect-[16/8.5] rounded-2xl overflow-hidden border border-[#f7d7b0] dark:border-[#262626] bg-[#000000] shadow-sm">
            <Image
              src={product.imageUrl}
              alt={displayTitle}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        )}

        {/* Product Heading & Category */}
        <div className="space-y-1.5 text-left">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
            {displayTitle}
          </h3>
          <p className="text-xs font-bold font-mono text-[#f15e1c] uppercase tracking-wider">
            {product.category}
          </p>
          <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Capabilities List with Compact View Details toggle */}
        <div className="space-y-3 pt-3 border-t border-[#f7d7b0] dark:border-[#1a1a1a] text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono uppercase tracking-wider text-[#1b2823] dark:text-[#ffffff]">
              Key Capabilities
            </span>
            {product.features.length > 6 && (
              <button
                type="button"
                onClick={() => setShowAllCapabilities(!showAllCapabilities)}
                className="text-xs font-bold text-[#f15e1c] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
              >
                <span>{showAllCapabilities ? "Show Less" : "View All"}</span>
                {showAllCapabilities ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {visibleFeatures.map((feature, fIdx) => (
              <div key={fIdx} className="flex items-center gap-2 p-1.5 rounded-xl bg-[#fefaf5] dark:bg-[#141414] border border-[#f7d7b0]/50 dark:border-[#222222] text-xs text-[#1b2823] dark:text-[#ffffff] font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2e936f] shrink-0" />
                <span className="leading-tight line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer & Actions */}
      <div className="mt-6 pt-4 border-t border-[#f7d7b0] dark:border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-3">
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
            aria-label={`Explore ${displayTitle} external platform in a new browser tab`}
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

