"use client";

import * as React from "react";
import { useSiteConfig } from "@/lib/site-config";
import { AlertTriangle } from "lucide-react";

export function ServiceMaintenanceBanner({ slug }: { slug: string }) {
  const { config } = useSiteConfig();
  const isEnabled = config.serviceStates?.[slug] !== false;

  if (isEnabled) return null;

  return (
    <div className="mb-8 p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start gap-4 shadow-sm animate-in fade-in">
      <div className="p-2.5 rounded-2xl bg-amber-500 text-white shrink-0">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-bold font-display">
          Service Temporarily Under Maintenance
        </h4>
        <p className="text-xs leading-relaxed opacity-90">
          This service is currently under scheduled maintenance. Our technical team is working on it and it will be available again soon. You can still reach out to our team for custom project inquiries.
        </p>
      </div>
    </div>
  );
}
