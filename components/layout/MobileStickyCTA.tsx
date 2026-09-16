"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { companyContactInfo } from "@/data/navigation";

export function MobileStickyCTA() {
  const pathname = usePathname();

  // Hide on admin routes or if on contact page to avoid duplicating contact CTA
  if (pathname?.includes("/admin")) {
    return null;
  }

  const phoneTel = `tel:${companyContactInfo.phoneUAERaw || "+971521555792"}`;
  const whatsappUrl = companyContactInfo.socials?.whatsapp || "https://api.whatsapp.com/send?phone=971521555792&text=Hello%20Arav%20Innovations%2C%20I%27d%20like%20to%20discuss%20a%20project.";

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border-t border-[#f7d7b0] dark:border-[#1a1a1a] p-2.5 shadow-[0_-8px_20px_rgba(0,0,0,0.1)] transition-all duration-300">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2 text-center">
        {/* Call Button */}
        <a
          href={phoneTel}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#f7d7b0]/30 dark:bg-[#161616] border border-[#f15e1c]/30 text-[#f15e1c] hover:bg-[#f15e1c] hover:text-white transition-all active:scale-[0.97] min-h-[44px]"
          aria-label="Call Arav Innovations"
        >
          <Phone className="w-4 h-4 shrink-0 mb-0.5" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider">CALL</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#2e936f]/10 dark:bg-[#2e936f]/20 border border-[#2e936f]/40 text-[#2e936f] hover:bg-[#2e936f] hover:text-white transition-all active:scale-[0.97] min-h-[44px]"
          aria-label="Instant WhatsApp Chat"
        >
          <MessageCircle className="w-4 h-4 shrink-0 mb-0.5" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider">WHATSAPP</span>
        </a>

        {/* Consultation Button */}
        <Link
          href="/contact"
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#f15e1c] text-white hover:bg-[#d44e14] shadow-xs transition-all active:scale-[0.97] min-h-[44px]"
          aria-label="Get Free Consultation"
        >
          <div className="flex items-center gap-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">CONSULT</span>
            <ArrowRight className="w-3 h-3 shrink-0" />
          </div>
        </Link>
      </div>
    </div>
  );
}
