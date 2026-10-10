"use client";

import * as React from "react";
import { trackEvent } from "@/lib/analytics";

interface TelephoneLinkProps {
  phone: string;
  phoneRaw: string;
  location?: string;
  className?: string;
}

export function TelephoneLink({
  phone,
  phoneRaw,
  location = "general_page",
  className = "text-[#f15e1c] hover:underline",
}: TelephoneLinkProps) {
  const handleClick = () => {
    trackEvent({
      type: "call_click",
      location,
    });
  };

  return (
    <a
      href={`tel:${phoneRaw}`}
      onClick={handleClick}
      aria-label={`Call Arav Innovations at ${phone}`}
      className={className}
    >
      {phone}
    </a>
  );
}
