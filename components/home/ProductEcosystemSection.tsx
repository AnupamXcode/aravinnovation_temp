"use client";

import * as React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { productsData } from "@/data/products";
import {
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Globe2,
  CheckCircle2,
} from "lucide-react";

// Entrance animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export function ProductEcosystemSection() {
  // Ensure strict order: 1. OMNiGRC, 2. Astrav, 3. AstroBeams AI, 4. AstroBeams, 5. Fash
  const order = ["omnigrc", "getastrav", "astrobeams-store", "astrobeams-in", "fashai"];
  const orderedProducts = [...productsData].sort((a, b) => {
    const idxA = order.indexOf(a.slug);
    const idxB = order.indexOf(b.slug);
    return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
  });

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16" id="products">
      <section className="py-5 sm:py-7 md:py-8 px-4 sm:px-8 lg:px-12 rounded-2xl md:rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#16221d] border border-[#f7d7b0] dark:border-[#2a3c35] shadow-xl transition-all duration-300 max-w-[1760px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center w-full max-w-3xl lg:max-w-6xl mx-auto mb-5 sm:mb-6 space-y-2 sm:space-y-3">
          <div className="overflow-hidden py-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#221811] dark:text-[#ffffff] tracking-tight">
              Platforms Engineered by Arav
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#3A2E27]/85 dark:text-[#ffffff]/85 font-normal leading-relaxed max-w-2xl lg:max-w-none mx-auto lg:whitespace-nowrap">
            Beyond client advisory, we architect and operate mission-critical SaaS platforms, AI workflow frameworks, and governance engines.
          </p>
        </div>

        {/* 5-Product Responsive Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 w-full max-w-[1760px] mx-auto"
        >
          {orderedProducts.map((product, idx) => {
            const isFeatured = idx === 0; // OMNiGRC is flagship lead
            return (
              <motion.div
                key={product.slug}
                variants={cardVariants}
                className={`h-full ${isFeatured ? "md:col-span-2 lg:col-span-2" : "col-span-1"}`}
              >
                <div className="group h-full flex flex-col justify-between p-6 sm:p-7 rounded-[24px] bg-white dark:bg-[#1b2823] border border-[#f7d7b0] dark:border-[#2a3c35] hover:border-[#f15e1c]/80 dark:hover:border-[#f15e1c]/80 hover:bg-gradient-to-br hover:from-[#ffffff] hover:via-[#FFF7F0] hover:to-[#FDEEE2] dark:hover:from-[#1b2823] dark:hover:via-[#20312a] dark:hover:to-[#283d34] shadow-xs hover:shadow-[0_20px_35px_-10px_rgba(241,94,28,0.12)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform hover:-translate-y-1 relative overflow-hidden">
                  
                  {/* Top Header: Badge + External Domain */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono uppercase tracking-wider bg-[#2e936f]/10 text-[#2e936f] dark:bg-[#2e936f]/20 dark:text-[#2e936f] border border-[#2e936f]/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2e936f] animate-pulse" />
                      {product.badge || "Live Platform"}
                    </span>
                    <span className="text-xs font-mono font-medium text-[#4a5c55] dark:text-[#d3eee4]">
                      {product.domain}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#221811] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors">
                        {product.name}
                      </h3>
                      {isFeatured && (
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-[#fab60a]/20 text-[#221811] dark:text-[#fab60a] border border-[#fab60a]/40">
                          Flagship GRC
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-[#f15e1c] mb-2">
                      {product.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-[#3A2E27]/85 dark:text-[#ffffff]/80 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Feature Highlights (for featured card) */}
                    {isFeatured && product.features && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-[#f7d7b0]/50 dark:border-[#2a3c35]/50 mb-2">
                        {product.features.slice(0, 4).map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-[#4a5c55] dark:text-[#d3eee4]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2e936f] shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="pt-4 border-t border-[#f7d7b0]/60 dark:border-[#2a3c35] flex items-center justify-between">
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-xs font-bold text-[#4a5c55] dark:text-[#d3eee4] hover:text-[#f15e1c] dark:hover:text-[#f15e1c] transition-colors"
                    >
                      View Details
                    </Link>

                    {product.ctaUrl && (
                      <a
                        href={product.ctaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f15e1c] hover:underline"
                      >
                        <span>{product.ctaText || "Launch Platform"}</span>
                        <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </section>
    </div>
  );
}
