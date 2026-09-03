"use client";

import * as React from "react";
import { TestimonialsColumn, TestimonialItem } from "@/components/ui/testimonials-columns-1";
import { testimonialsData } from "@/data/testimonials";

const allTestimonials: TestimonialItem[] = testimonialsData.map((t) => ({
  quote: t.quote,
  name: t.author,
  role: `${t.designation}, ${t.company}`,
  rating: t.rating,
}));

export function AnimatedTestimonialsCarousel() {
  const col1 = allTestimonials.slice(0, 4);
  const col2 = allTestimonials.slice(4, 8);
  const col3 = allTestimonials.slice(8, 12);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Top and Bottom Ambient Fades */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#fefaf5] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#fefaf5] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-7xl mx-auto px-2 sm:px-4">
        {/* Column 1: Visible on all screens */}
        <TestimonialsColumn testimonials={col1} duration={22} />

        {/* Column 2: Visible on tablet & desktop */}
        <TestimonialsColumn
          testimonials={col2}
          duration={26}
          className="hidden md:block"
        />

        {/* Column 3: Visible on desktop */}
        <TestimonialsColumn
          testimonials={col3}
          duration={24}
          className="hidden lg:block"
        />
      </div>
    </div>
  );
}

