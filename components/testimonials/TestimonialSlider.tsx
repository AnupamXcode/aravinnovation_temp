"use client";

import * as React from "react";
import { testimonialsData } from "@/data/testimonials";
import { Quote, ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";
import { TiltCard } from "@/components/motion/TiltCard";
import { cn } from "@/lib/utils";

import { useSiteContent } from "@/lib/site-content";

export function TestimonialSlider() {
  const { content } = useSiteContent();
  const list = content.testimonials && content.testimonials.length > 0
    ? content.testimonials
    : testimonialsData;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % list.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  const current = list[currentIndex] || list[0];

  return (
    <div className="relative max-w-4xl mx-auto">
      <TiltCard maxTilt={5} scale={1.01}>
        <div className="rounded-3xl bg-white dark:bg-[#1F1A16] p-8 sm:p-12 border border-[#EFE2D6] dark:border-[#2C241E] shadow-2xl relative overflow-hidden transition-colors duration-300">
          {/* Large Decorative Quote Icon */}
          <Quote className="absolute top-6 right-8 w-20 h-20 text-[#FCE3D3]/60 dark:text-[#f15e1c]/10 -z-0 pointer-events-none" />

          {/* Rating Stars */}
          <div className="flex items-center space-x-1 mb-6 text-[#f15e1c]">
            {[...Array(current.rating || 5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          {/* Quote Content */}
          <blockquote className="text-lg sm:text-2xl font-display font-medium text-[#3A2E27] dark:text-[#FAF5EE] leading-relaxed relative z-10">
            “{current.quote}”
          </blockquote>

          {/* Author Attribution */}
          <div className="mt-8 pt-6 border-t border-[#EFE2D6] dark:border-[#2C241E] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="group/author cursor-pointer">
              <div className="font-bold text-base text-[#3A2E27] dark:text-[#FAF5EE] font-display flex items-center gap-2">
                <span>{current.author}</span>
                <span className="text-xs font-normal text-[#f15e1c] opacity-80 group-hover/author:opacity-100 transition-opacity">
                  &mdash; {current.company}
                </span>
              </div>
              <div className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] mt-0.5 hidden group-hover/author:block transition-all">
                {current.designation} &bull; {current.location}
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center space-x-2 self-end sm:self-center">
              <button
                type="button"
                onClick={prev}
                className="w-10 h-10 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FFFDF9] dark:bg-[#1E1915] hover:bg-[#FBF3EA] dark:hover:bg-[#261F1A] hover:border-[#f15e1c] dark:hover:border-[#f15e1c] flex items-center justify-center text-[#3A2E27] dark:text-[#FAF5EE] transition-colors cursor-pointer shadow-xs"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="w-10 h-10 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FFFDF9] dark:bg-[#1E1915] hover:bg-[#FBF3EA] dark:hover:bg-[#261F1A] hover:border-[#f15e1c] dark:hover:border-[#f15e1c] flex items-center justify-center text-[#3A2E27] dark:text-[#FAF5EE] transition-colors cursor-pointer shadow-xs"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </TiltCard>

      {/* Dots Indicator */}
      <div className="flex justify-center items-center space-x-2 mt-6">
        {list.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer",
              currentIndex === idx
                ? "w-8 bg-[#f15e1c]"
                : "bg-[#EFE2D6] dark:bg-[#2C241E] hover:bg-[#F4A97F]"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
