"use client";

import * as React from "react";
import { useEffect } from "react";
import Link from "next/link";

export default function CaseStudyError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Case study error caught by boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FFFDF9] dark:bg-[#12100E] px-4 text-center">
      <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] mb-4">
        Case Study Not Found
      </h2>
      <p className="text-lg text-[#7A6A5F] dark:text-[#B8ACA0] mb-8 max-w-md">
        We couldn't load this case study. It might be missing data or there could be a temporary issue.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-full bg-[#E8672A] text-white font-semibold hover:bg-[#D45A20] transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/case-studies"
          className="px-6 py-3 rounded-full bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] font-semibold border border-[#EFE2D6] dark:border-[#2C241E] hover:bg-[#F2E5D5] dark:hover:bg-[#2A231F] transition-colors"
        >
          View All Case Studies
        </Link>
      </div>
    </div>
  );
}
