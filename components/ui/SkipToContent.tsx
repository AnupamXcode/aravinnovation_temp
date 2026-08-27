"use client";

import * as React from "react";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] px-4 py-2 rounded-xl bg-[#f15e1c] text-white font-bold text-sm shadow-2xl outline-none ring-2 ring-white"
    >
      Skip to main content
    </a>
  );
}
