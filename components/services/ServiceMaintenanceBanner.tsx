"use client";

import * as React from "react";
import Link from "next/link";
import { useSiteConfig } from "@/lib/site-config";
import { AlertTriangle, Wrench, ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ServiceMaintenanceBanner({ slug }: { slug: string }) {
  const { config } = useSiteConfig();
  const isEnabled = config.serviceStates?.[slug] !== false;

  if (isEnabled) return null;

  return (
    <div className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 border-2 border-amber-500/50 p-6 sm:p-10 text-amber-950 dark:text-amber-100 shadow-2xl shadow-amber-500/10 backdrop-blur-md animate-in fade-in slide-in-from-top-4">
      {/* Background Ambient Glow Effect */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4 sm:gap-6">
          {/* Animated Pulsing Icon Badge */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30 shrink-0 relative">
            <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full animate-ping" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-xs font-bold font-mono text-amber-800 dark:text-amber-300 uppercase tracking-widest">
              <Wrench className="w-3.5 h-3.5 animate-spin" />
              <span>Service Maintenance Active</span>
            </div>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display leading-tight text-amber-950 dark:text-amber-50">
              This Practice is Temporarily Under Scheduled Maintenance
            </h3>

            <p className="text-sm sm:text-base text-amber-900/90 dark:text-amber-200/90 max-w-3xl leading-relaxed font-medium">
              Our engineering team is currently performing scheduled upgrades and capability enhancements on this practice. You can still reach out to our team directly for custom project inquiries, consultations, or urgent technical support.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0 w-full md:w-auto pt-2 md:pt-0">
          <Link href="/contact">
            <Button
              variant="primary"
              size="lg"
              className="w-full md:w-auto rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-none shadow-xl shadow-amber-600/30 text-sm font-bold px-6 py-4"
              leftIcon={<PhoneCall className="w-4 h-4" />}
              rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
            >
              Contact Team for Inquiries
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
