"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company?: string;
  image?: string;
  rating?: number;
}

interface TestimonialsColumnProps {
  testimonials: TestimonialItem[];
  className?: string;
  duration?: number;
}

export function TestimonialsColumn({
  testimonials,
  className,
  duration = 15,
}: TestimonialsColumnProps) {
  const shouldReduceMotion = useReducedMotion();

  // Duplicate list to create seamless infinite loop effect
  const duplicatedTestimonials = React.useMemo(
    () => [...testimonials, ...testimonials],
    [testimonials]
  );

  return (
    <div className={cn("overflow-hidden max-h-[640px] relative py-4", className)}>
      <motion.div
        animate={shouldReduceMotion ? {} : { translateY: "-50%" }}
        transition={
          shouldReduceMotion
            ? {}
            : {
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }
        }
        className="flex flex-col gap-6"
      >
        {duplicatedTestimonials.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="p-8 sm:p-10 rounded-3xl border border-[#f7d7b0] dark:border-[#2C241E] shadow-xl shadow-[#f15e1c]/10 dark:shadow-none bg-white dark:bg-[#1A1613] hover:border-[#f15e1c]/50 dark:hover:border-[#E8672A]/50 transition-all duration-300 relative group overflow-hidden max-w-sm w-full shrink-0"
          >
            <Quote className="absolute top-6 right-6 w-14 h-14 text-[#f7d7b0]/30 dark:text-[#E8672A]/10 pointer-events-none group-hover:scale-110 transition-transform" />

            {/* Rating */}
            <div className="flex items-center space-x-1 mb-4 text-[#f15e1c]">
              {[...Array(item.rating || 5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-sm sm:text-base font-medium text-[#1b2823] dark:text-[#FAF5EE] leading-relaxed relative z-10">
              “{item.quote}”
            </p>

            {/* Author */}
            <div className="mt-6 pt-4 border-t border-[#f7d7b0]/50 dark:border-[#2C241E] flex items-center gap-3.5">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#f7d7b0] shrink-0"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-[#fce3d3] dark:bg-[#261F1A] text-[#f15e1c] font-bold flex items-center justify-center text-sm border border-[#f7d7b0] shrink-0">
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <h4 className="text-sm font-bold font-display text-[#1b2823] dark:text-[#FAF5EE]">
                  {item.name}
                </h4>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
