"use client";

import * as React from "react";
import { TestimonialsColumn, TestimonialItem } from "@/components/ui/testimonials-columns-1";
import { useTranslations } from "next-intl";

const defaultTestimonials: TestimonialItem[] = [
  {
    quote: "Partnering with Arav Innovations was a game-changer for our business. Their strategic approach and seamless execution helped us grow our digital presence exponentially. We couldn't be happier with the results.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    name: "Alex Turner",
    role: "Digital Marketing Head, InnovateCo",
    rating: 5,
  },
  {
    quote: "The team at Arav Innovations transformed our outdated systems into a state-of-the-art solution that not only boosted our efficiency but also provided us with a competitive edge. Truly remarkable work!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    name: "Maria Gomez",
    role: "CTO, TechBridge Solutions",
    rating: 5,
  },
  {
    quote: "Working with Arav Innovations was a fantastic experience. Their attention to detail and commitment to excellence set them apart. They understood our needs perfectly and delivered beyond expectations.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    name: "Liam Shaw",
    role: "Founder, GreenSpace Enterprises",
    rating: 5,
  },
  {
    quote: "Arav Innovations provided unparalleled support and guidance throughout our project. Their expertise and proactive approach ensured the project's success, and their team was a pleasure to work with.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    name: "Sophie Lee",
    role: "COO, Urban Insights",
    rating: 5,
  },
];

export function AnimatedTestimonialsCarousel() {
  const col1 = [defaultTestimonials[0], defaultTestimonials[1]];
  const col2 = [defaultTestimonials[2], defaultTestimonials[3]];
  const col3 = [defaultTestimonials[1], defaultTestimonials[0], defaultTestimonials[2]];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Top and Bottom Ambient Fades */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#fefaf5] dark:from-[#172420] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#fefaf5] dark:from-[#172420] to-transparent z-10 pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center max-w-7xl mx-auto px-2 sm:px-4">
        {/* Column 1: Visible on all screens */}
        <TestimonialsColumn testimonials={col1} duration={16} />

        {/* Column 2: Visible on tablet & desktop */}
        <TestimonialsColumn
          testimonials={col2}
          duration={20}
          className="hidden md:block"
        />

        {/* Column 3: Visible on desktop */}
        <TestimonialsColumn
          testimonials={col3}
          duration={18}
          className="hidden lg:block"
        />
      </div>
    </div>
  );
}
