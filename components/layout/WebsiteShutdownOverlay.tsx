"use client";

import * as React from "react";
import { usePathname, useParams } from "next/navigation";
import { useSiteConfig } from "@/lib/site-config";
import { Power, ShieldAlert, AlertTriangle, RefreshCw, Mail, Phone, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WebsiteShutdownOverlay({ children }: { children: React.ReactNode }) {
  const { config, toggleWebsitePower } = useSiteConfig();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const isSiteDisabled = config.websiteEnabled === false;
  const isAdminPath = pathname?.includes("/admin");

  if (isSiteDisabled) {
    if (isAdminPath) {
      // In Admin UI: render emergency banner + normal children
      return (
        <div className="relative min-h-screen flex flex-col">
          {/* Emergency Admin Top Alert Banner */}
          <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white px-4 py-3 shadow-xl flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50 animate-pulse">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-white/20">
                <ShieldAlert className="w-5 h-5 text-white" />
              </span>
              <div>
                <span className="text-xs font-black uppercase tracking-wider block">
                  🚨 WEBSITE MASTER POWER OFF — PUBLIC ACCESS STOPPED
                </span>
                <span className="text-[11px] text-white/90">
                  The entire website is stopped and public visitors are seeing the emergency maintenance screen.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleWebsitePower(true)}
              className="px-4 py-2 rounded-xl bg-white text-red-600 hover:bg-emerald-50 hover:text-emerald-700 font-extrabold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-white/40"
            >
              <Power className="w-4 h-4 text-emerald-600" />
              <span>TURN WEBSITE BACK ON (LIVE)</span>
            </button>
          </div>

          <div className="flex-1">{children}</div>
        </div>
      );
    }

    // On Public pages: replace public view with the Master Shutdown Screen
    return (
      <div className="min-h-screen w-full bg-[#0D0B0A] text-[#FAF5EE] flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden font-sans select-none">
        {/* Glowing Background Radial Effects */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <header className="relative z-10 flex items-center justify-between max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase">
              HTTP 503 &bull; SERVICE UNAVAILABLE
            </span>
          </div>
          <a
            href={`/${locale}/admin/login`}
            className="text-[11px] font-mono text-[#A8988B] hover:text-[#E8672A] flex items-center gap-1 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </a>
        </header>

        {/* Center Emergency Announcement Card */}
        <main className="relative z-10 max-w-2xl mx-auto w-full my-auto text-center space-y-8 py-12">
          {/* Master Offline Icon Badge */}
          <div className="relative inline-flex items-center justify-center">
            <div className="w-24 h-24 rounded-3xl bg-red-950/80 border-2 border-red-500/40 flex items-center justify-center shadow-2xl shadow-red-900/50">
              <Power className="w-12 h-12 text-red-500 animate-pulse" />
            </div>
            <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider border border-white/20">
              OFFLINE
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
              Website Temporarily Stopped
            </h1>
            <p className="text-sm sm:text-base text-[#B8ACA0] leading-relaxed max-w-xl mx-auto font-normal">
              Public access to Arav Innovations has been paused by site administration. We are performing scheduled system optimization or maintenance.
            </p>
          </div>

          {/* Quick Info Box */}
          <div className="p-6 rounded-3xl bg-[#171412] border border-red-500/20 text-left space-y-4 max-w-lg mx-auto shadow-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h2 className="text-xs font-bold uppercase text-white font-mono">System Offline Notice</h2>
                <p className="text-xs text-[#A8988B] leading-relaxed">
                  All digital services, client request forms, and content portals are temporarily paused. Live operations will resume shortly.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#2C241E] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#B8ACA0]">
                <Mail className="w-4 h-4 text-[#E8672A]" />
                <span>support@aravinnovations.com</span>
              </div>
              <div className="flex items-center gap-2 text-[#B8ACA0]">
                <Phone className="w-4 h-4 text-[#E8672A]" />
                <span>+91 9650625777</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => window.location.reload()}
              className="rounded-2xl border-[#2C241E] text-white hover:bg-[#1F1A17] font-bold text-xs"
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Check System Status (Refresh)
            </Button>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 text-center text-xs text-[#6B5D53] font-mono max-w-5xl mx-auto w-full pt-6 border-t border-[#221C18]">
          &copy; {new Date().getFullYear()} Arav Innovations. All rights reserved. &bull; Managed via Control Center
        </footer>
      </div>
    );
  }

  return <>{children}</>;
}
