"use client";

import * as React from "react";
import { trackEvent } from "@/lib/analytics";
import { MessageSquare } from "lucide-react";

interface WhatsAppContactButtonProps {
  location?: string;
  region?: "india" | "uae" | "global";
  variant?: "primary" | "outline" | "compact";
  className?: string;
  label?: string;
}

export function WhatsAppContactButton({
  location = "general_page",
  region = "global",
  variant = "primary",
  className = "",
  label = "Chat on WhatsApp",
}: WhatsAppContactButtonProps) {
  // Verified WhatsApp numbers from company records
  const whatsappNumber = region === "india" ? "919650625777" : "971521555792";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello Arav Innovations, I would like to discuss a project requirement."
  )}`;

  const handleClick = () => {
    trackEvent({
      type: "whatsapp_click",
      location,
    });
  };

  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2e936f] focus:ring-offset-2";

  const variantClasses =
    variant === "primary"
      ? "bg-[#2e936f] hover:bg-[#237457] text-white py-3 px-5 shadow-md hover:shadow-lg border border-[#2e936f]"
      : variant === "outline"
      ? "bg-transparent hover:bg-[#2e936f]/10 text-[#2e936f] dark:text-[#2e936f] border border-[#2e936f] py-2.5 px-4"
      : "bg-[#2e936f]/10 text-[#2e936f] hover:bg-[#2e936f]/20 py-2 px-3 border border-[#2e936f]/30";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={`${label} with Arav Innovations on WhatsApp`}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      <MessageSquare className="w-4 h-4 shrink-0 text-current" />
      <span>{label}</span>
    </a>
  );
}
