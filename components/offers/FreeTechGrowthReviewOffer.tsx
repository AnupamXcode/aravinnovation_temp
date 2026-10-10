"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

interface FreeTechGrowthReviewOfferProps {
  className?: string;
}

export function FreeTechGrowthReviewOffer({ className = "" }: FreeTechGrowthReviewOfferProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="rounded-3xl bg-gradient-to-br from-[#ffffff] via-[#fefaf5] to-[#f7d7b0]/40 dark:from-[#0a0a0a] dark:via-[#121212] dark:to-[#1a1a1a] border-2 border-[#f15e1c]/40 p-6 sm:p-10 shadow-xl space-y-6 relative overflow-hidden transition-all duration-300">
        {/* Accent Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#f15e1c]/10 dark:bg-[#f15e1c]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" size="md">
                <Sparkles className="w-3.5 h-3.5 text-[#f15e1c] mr-1" />
                <span>COMPLIMENTARY CONSULTATION OFFER</span>
              </Badge>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight leading-snug">
              Free 30-Minute Tech &amp; Growth Review
            </h3>
            <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
              Connect directly with our senior strategy and engineering leads to discuss your current technology infrastructure, digital growth bottlenecks, or process challenges. We will help you identify clear, practical next steps.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs font-semibold text-[#1b2823] dark:text-[#ffffff]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#f15e1c] shrink-0" />
                <span>30-minute focused video or phone review</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2e936f] shrink-0" />
                <span>Objective architecture &amp; growth feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2e936f] shrink-0" />
                <span>Confidential &amp; non-binding discussion</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#fab60a] shrink-0" />
                <span>Actionable roadmap recommendations</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto flex flex-col items-stretch md:items-end space-y-3">
            <Link href="/contact?service=Free+30-Minute+Tech+%26+Growth+Review" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto shadow-md hover:shadow-xl bg-[#f15e1c] text-white"
                rightIcon={<ArrowRight className="w-5 h-5 ml-1" />}
              >
                Book Your Free 30-Min Review
              </Button>
            </Link>
            <span className="text-[11px] font-mono text-center md:text-right text-[#4a5c55] dark:text-[#d3eee4]">
              Connected to our direct advisory calendar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
