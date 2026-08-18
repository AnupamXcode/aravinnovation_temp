"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Globe2,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#FFFDF9]">
      {/* Soft warm background gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[850px] md:h-[850px] bg-radial from-[#FCE3D3]/70 via-[#FBF3EA]/40 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#F4A97F]/20 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Messaging & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <Badge variant="secondary" size="md" className="py-1.5 px-3.5 border-[#E8672A]/30">
                <span className="w-2 h-2 rounded-full bg-[#E8672A] animate-pulse" />
                <span className="text-[#3A2E27] font-semibold text-xs tracking-wider">
                  TECHNOLOGY • STRATEGY • DIGITAL GROWTH
                </span>
              </Badge>
            </div>

            {/* Headline - Per Section 4 & 9 rule: editable tokenized headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#3A2E27] tracking-tight leading-[1.12]">
              Architecting Resilient Technology & Accelerating Enterprise Growth in{" "}
              <span className="text-[#E8672A] underline decoration-[#F4A97F]/60 decoration-wavy decoration-2">
                India & UAE
              </span>
            </h1>

            {/* Supporting Line */}
            <p className="text-lg sm:text-xl text-[#7A6A5F] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              We bridge enterprise IT consulting, full-stack software engineering, performance marketing, governance, and on-demand tech squads to turn complex digital challenges into predictable revenue.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/services" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-md hover:shadow-lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => {
                    trackEvent({
                      type: "cta_click",
                      label: "Explore Services (Hero)",
                      location: "hero_primary",
                      targetUrl: "/services",
                    });
                  }}
                >
                  Explore Services
                </Button>
              </Link>

              <Link href="/contact" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    trackEvent({
                      type: "cta_click",
                      label: "Talk to an Expert (Hero)",
                      location: "hero_secondary",
                      targetUrl: "/contact",
                    });
                  }}
                >
                  Talk to an Expert
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-[#EFE2D6] grid grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E8672A] shrink-0" />
                <span className="text-xs font-semibold text-[#3A2E27]">
                  7 Dedicated Service Lines
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#E8672A] shrink-0" />
                <span className="text-xs font-semibold text-[#3A2E27]">
                  India & UAE Delivery
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#E8672A] shrink-0" />
                <span className="text-xs font-semibold text-[#3A2E27]">
                  Engineering-Led Execution
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Feature Card & Tech Motif */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card */}
              <div className="rounded-3xl bg-[#FFFDF9] p-6 sm:p-8 border border-[#EFE2D6] shadow-xl relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-[#EFE2D6] pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[#E8672A]" />
                    <div className="w-3 h-3 rounded-full bg-[#F4A97F]" />
                    <div className="w-3 h-3 rounded-full bg-[#EFE2D6]" />
                  </div>
                  <span className="text-xs font-mono font-medium text-[#7A6A5F]">
                    arav.core.architecture
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#FBF3EA] border border-[#EFE2D6] flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-[#E8672A] text-white shrink-0">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#3A2E27]">
                        Technology & Modern Engineering
                      </h4>
                      <p className="text-xs text-[#7A6A5F] mt-0.5">
                        Next.js App Router, Cloud Native Microservices, and SOC-2 Compliant Architecture.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#EFE2D6] flex items-start gap-3.5 shadow-xs">
                    <div className="p-2.5 rounded-xl bg-[#FCE3D3] text-[#E8672A] shrink-0 border border-[#F4A97F]/40">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#3A2E27]">
                        Revenue-Driven Digital Growth
                      </h4>
                      <p className="text-xs text-[#7A6A5F] mt-0.5">
                        Technical SEO, Commercial Demand Generation, and Closed-Loop Pipeline Attribution.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FBF3EA] border border-[#EFE2D6] flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-[#3A2E27] text-[#FFFDF9] shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#3A2E27]">
                        Governance & Advisory
                      </h4>
                      <p className="text-xs text-[#7A6A5F] mt-0.5">
                        IT Strategy, DPDP & GDPR Privacy Frameworks, Independent Audits, and Vetted Talent.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating pill badge */}
                <div className="pt-2 flex items-center justify-between text-xs text-[#7A6A5F] border-t border-[#EFE2D6]">
                  <span className="font-semibold text-[#3A2E27] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#E8672A]" /> Multi-Region Compliance
                  </span>
                  <span className="font-mono text-[11px] bg-[#FCE3D3]/60 px-2 py-0.5 rounded-md font-semibold text-[#3A2E27]">
                    IND &bull; UAE
                  </span>
                </div>
              </div>

              {/* Decorative warm backplate */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#FCE3D3] via-[#F4A97F]/30 to-[#E8672A]/20 rounded-3xl -z-0 blur-xs" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
