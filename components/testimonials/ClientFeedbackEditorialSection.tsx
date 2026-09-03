"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { testimonialsData } from "@/data/testimonials";

export interface EditorialTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  category: string;
  location: string;
  rating: number;
}

export const editorialTestimonials: EditorialTestimonial[] = testimonialsData.slice(0, 12).map((t) => ({
  id: t.id,
  quote: t.quote,
  author: t.author,
  role: t.designation,
  company: t.company,
  category: t.service,
  location: t.location,
  rating: t.rating || 5,
}));

export function ClientFeedbackEditorialSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [direction, setDirection] = React.useState<number>(1);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const [dragStartX, setDragStartX] = React.useState<number | null>(null);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  const total = editorialTestimonials.length;
  const current = editorialTestimonials[activeIndex] || editorialTestimonials[0];

  const handleNext = React.useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = React.useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelect = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Auto-swipe timer: 6.5s (6500ms), pauses on hover, resets on navigation
  React.useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % total);
    }, 6500);

    return () => clearInterval(timer);
  }, [isPaused, activeIndex, total]);

  // Keyboard Navigation Support
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch Swipe Handlers for Mobile & Tablet
  const handlePointerDown = (clientX: number) => {
    setDragStartX(clientX);
    setIsDragging(true);
  };

  const handlePointerUp = (clientX: number) => {
    if (dragStartX === null || !isDragging) return;
    const deltaX = clientX - dragStartX;
    if (Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setDragStartX(null);
    setIsDragging(false);
  };

  // Motion variants with reduced motion fallback
  const variants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir < 0 ? 40 : -40,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16" id="client-feedback">
      <section className="py-8 md:py-12 px-6 sm:px-12 lg:px-14 rounded-[2.5rem] bg-[#ffffff] dark:bg-[#000000] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl transition-all duration-300 relative overflow-hidden">
        {/* Subtle Brand Accent Header Line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#f15e1c] to-transparent" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce3d3] dark:bg-[#161616] border border-[#f7d7b0] text-xs font-mono font-extrabold text-[#f15e1c]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Executive Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
            CLIENT FEEDBACK &amp; EXECUTIVE REVIEWS
          </h2>
          <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed max-w-2xl mx-auto">
            Read feedback from engineering leaders, CTOs, and growth executives who have partnered with Arav Innovations across India and the United Arab Emirates.
          </p>
        </div>

        {/* Interactive Editorial Card with Pause-on-Hover */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onMouseDown={(e) => handlePointerDown(e.clientX)}
          onMouseUp={(e) => handlePointerUp(e.clientX)}
          onTouchStart={(e) => e.touches.length === 1 && handlePointerDown(e.touches[0].clientX)}
          onTouchEnd={(e) => e.changedTouches.length > 0 && handlePointerUp(e.changedTouches[0].clientX)}
          className="relative z-10 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] p-6 sm:p-12 lg:p-14 select-none shadow-md flex flex-col justify-between min-h-[380px] space-y-8"
        >
          {/* Top Category Context & Rating Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#f7d7b0] dark:border-[#1a1a1a]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2e936f]">
              {current.category} &bull; {current.location}
            </span>

            {/* 5-Star Rating */}
            <div className="flex items-center space-x-1 text-[#f15e1c]">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>

          {/* Active Quotation Body */}
          <div className="relative my-auto min-h-[160px] flex flex-col justify-center">
            {/* Decorative Quote Icon */}
            <motion.div
              key={`quote-icon-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.12, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="absolute -top-6 -left-2 text-[#f15e1c] pointer-events-none"
            >
              <Quote className="w-16 h-16 sm:w-20 sm:h-20 stroke-1" />
            </motion.div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                className="space-y-6 relative z-10"
              >
                <p className="text-lg sm:text-2xl lg:text-3xl font-display font-medium text-[#1b2823] dark:text-[#ffffff] leading-[1.4] tracking-tight">
                  &ldquo;{current.quote}&rdquo;
                </p>

                <div className="space-y-0.5 pt-2">
                  <div className="text-lg sm:text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                    {current.author}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#f15e1c]">
                    {current.role} &bull; <span className="font-semibold text-[#1b2823] dark:text-[#ffffff]">{current.company}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Navigation Control Bar */}
          <div className="pt-6 border-t border-[#f7d7b0] dark:border-[#1a1a1a] flex items-center justify-between gap-4">
            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="p-2.5 sm:px-4 sm:py-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] text-[#1b2823] dark:text-[#ffffff] hover:bg-[#f15e1c] hover:text-white hover:border-[#f15e1c] transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 text-xs font-semibold shrink-0 shadow-xs"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Centered Dot Pagination (12 Dots) */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap max-w-full">
              {editorialTestimonials.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={cn(
                    "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 cursor-pointer p-0 border-0 shrink-0",
                    activeIndex === idx
                      ? "bg-[#f15e1c] scale-125 shadow-xs"
                      : "bg-[#f7d7b0] dark:bg-[#262626] hover:bg-[#f15e1c]/60"
                  )}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="p-2.5 sm:px-4 sm:py-2 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] text-[#1b2823] dark:text-[#ffffff] hover:bg-[#f15e1c] hover:text-white hover:border-[#f15e1c] transition-all cursor-pointer active:scale-95 flex items-center gap-1.5 text-xs font-semibold shrink-0 shadow-xs"
              aria-label="Next testimonial"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
