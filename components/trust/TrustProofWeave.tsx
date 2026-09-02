"use client";

import * as React from "react";
import Link from "next/link";
import { MovingLogoStrip } from "@/components/motion/MovingLogoStrip";
import { clientLogos } from "@/data/clients";
import { productsData } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  ExternalLink,
  Globe2,
  TrendingUp,
  Quote,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface TrustProofWeaveProps {
  serviceSlug?: string;
  serviceTitle?: string;
  showProducts?: boolean;
}

export function TrustProofWeave({
  serviceSlug,
  serviceTitle = "Enterprise Technology Transformation",
  showProducts = true,
}: TrustProofWeaveProps) {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-8 lg:px-12 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xl space-y-12 transition-all duration-300 overflow-hidden">
      {/* Header Badge */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="secondary" size="md">
          ENTERPRISE PROOF &amp; TRUST SYSTEM
        </Badge>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
          Verified Track Record &amp; Platforms Built by Arav
        </h2>
        <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed">
          We demonstrate credibility through real engineering results, multi-region operational experience, and proprietary platforms built for modern enterprises.
        </p>
      </div>

      {/* Trust Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] shadow-md space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#f15e1c]/10 text-[#f15e1c] flex items-center justify-center mx-auto">
            <Globe2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
            Regional Presence
          </h3>
          <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4]">
            Active operations across <strong>India (Kolkata)</strong> and the <strong>UAE / GCC</strong> regions with localized compliance readiness.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] shadow-md space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#2e936f]/10 text-[#2e936f] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
            Compliance &amp; Governance
          </h3>
          <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4]">
            Architectures engineered with DPDP Act data localization, SOC-2 readiness, and zero-trust security controls.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] shadow-md space-y-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#fab60a]/10 text-[#fab60a] flex items-center justify-center mx-auto">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
            Measurable Outcomes
          </h3>
          <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4]">
            Proven SLA uptime (99.99%), sub-second web performance, and 45% infrastructure cost optimizations.
          </p>
        </div>
      </div>

      {/* Moving Client Logos Strip */}
      <div className="space-y-4 pt-4 border-t border-[#f7d7b0] dark:border-[#1a1a1a]">
        <div className="text-center">
          <span className="text-[10px] font-extrabold font-mono uppercase tracking-widest text-[#7A6A5F] dark:text-[#B8ACA0]">
            TRUSTED BY FORWARD-THINKING ENTERPRISES &amp; BRANDS
          </span>
        </div>
        <MovingLogoStrip />
      </div>

      {/* Platform Platforms Built by Arav Showcase */}
      {showProducts && (
        <div className="space-y-6 pt-6 border-t border-[#f7d7b0] dark:border-[#1a1a1a]">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-extrabold font-mono text-[#f15e1c] uppercase tracking-wider">
              PROPRIETARY INNOVATION
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
              Platforms Engineered &amp; Maintained by Arav
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {productsData.map((prod) => (
              <div
                key={prod.slug}
                className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] shadow-lg flex flex-col justify-between space-y-4 hover-lift-3d transition-all duration-300"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#f15e1c] uppercase">
                      {prod.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#2e936f]/10 text-[#2e936f]">
                      {prod.badge}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                    {prod.name}
                  </h4>
                  <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] line-clamp-3 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                {prod.externalUrl && (
                  <a
                    href={prod.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f15e1c] hover:underline pt-2 border-t border-[#f7d7b0] dark:border-[#262626]"
                  >
                    <span>{prod.ctaText || "Explore Platform"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
