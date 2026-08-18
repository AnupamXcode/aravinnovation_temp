"use client";

import * as React from "react";
import { testimonialsData, Testimonial } from "@/data/testimonials";
import { Quote, ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="rounded-3xl bg-white p-8 sm:p-12 border border-[#EFE2D6] shadow-xl relative overflow-hidden">
        {/* Large Decorative Quote Icon */}
        <Quote className="absolute top-6 right-8 w-20 h-20 text-[#FCE3D3]/60 -z-0 pointer-events-none" />

        {/* Rating Stars */}
        <div className="flex items-center space-x-1 mb-6 text-[#E8672A]">
          {[...Array(current.rating || 5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
        </div>

        {/* Quote Content */}
        <blockquote className="text-lg sm:text-2xl font-display font-medium text-[#3A2E27] leading-relaxed relative z-10">
          “{current.quote}”
        </blockquote>

        {/* Author Attribution & Service */}
        <div className="mt-8 pt-6 border-t border-[#EFE2D6] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="font-bold text-base text-[#3A2E27] font-display">
              {current.author}
            </div>
            <div className="text-xs text-[#7A6A5F] mt-0.5">
              {current.designation} &bull; <span className="font-medium text-[#3A2E27]">{current.company}</span>
            </div>
            <div className="flex items-center gap-2 mt-1.5 text-[11px] text-[#E8672A] font-semibold">
              <span>{current.service}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-0.5 text-[#7A6A5F]">
                <MapPin className="w-3 h-3 text-[#E8672A]" /> {current.location}
              </span>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center space-x-2 self-end sm:self-center">
            <button
              type="button"
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[#EFE2D6] bg-[#FFFDF9] hover:bg-[#FBF3EA] hover:border-[#E8672A] flex items-center justify-center text-[#3A2E27] transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="w-10 h-10 rounded-full border border-[#EFE2D6] bg-[#FFFDF9] hover:bg-[#FBF3EA] hover:border-[#E8672A] flex items-center justify-center text-[#3A2E27] transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center items-center space-x-2 mt-6">
        {testimonialsData.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer",
              currentIndex === idx
                ? "w-8 bg-[#E8672A]"
                : "bg-[#EFE2D6] hover:bg-[#F4A97F]"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
