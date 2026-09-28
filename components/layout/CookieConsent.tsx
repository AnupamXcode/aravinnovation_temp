"use client";

import * as React from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      const consent = localStorage.getItem("arav_cookie_consent");
      if (!consent) {
        // Delay showing banner slightly for better UX
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage access disabled/unavailable
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("arav_cookie_consent", "accepted");
    } catch {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("arav_cookie_consent", "declined");
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie Consent Banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-2xl bg-white dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#222222] shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#f15e1c]/10 text-[#f15e1c] shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-sm text-[#1b2823] dark:text-[#ffffff]">
            Cookie &amp; Privacy Choices
          </h3>
        </div>
        <button
          onClick={handleDecline}
          aria-label="Close cookie banner"
          className="text-[#4a5c55] hover:text-[#f15e1c] dark:text-[#a0a0a0] dark:hover:text-[#ffffff] transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="mt-2.5 text-xs text-[#4a5c55] dark:text-[#b0b0b0] leading-relaxed">
        We use essential cookies to operate our site and analytics cookies to enhance user experience. Learn more in our{" "}
        <Link href="/privacy-policy" className="text-[#f15e1c] font-semibold underline hover:text-[#d84a0d]">
          Privacy Policy
        </Link>.
      </p>

      <div className="mt-4 flex items-center gap-2.5">
        <Button
          variant="primary"
          size="sm"
          onClick={handleAccept}
          className="flex-1 py-2 text-xs font-bold shadow-xs"
        >
          Accept All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDecline}
          className="flex-1 py-2 text-xs font-bold text-[#4a5c55] border-[#f7d7b0] hover:bg-[#f7d7b0]/20 dark:text-[#d0d0d0] dark:border-[#2a2a2a]"
        >
          Essential Only
        </Button>
      </div>
    </div>
  );
}
