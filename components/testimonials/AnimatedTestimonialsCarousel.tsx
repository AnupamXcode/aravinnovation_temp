"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonialsData, Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function AnimatedTestimonialsCarousel() {
  const testimonials = testimonialsData.slice(0, 12);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [direction, setDirection] = React.useState<number>(1);
  const current = testimonials[currentIndex] || testimonials[0];

  const nextTestimonial = React.useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = React.useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Autoplay interval every 6.5 seconds, pauses when hovered, resets on manual navigation
  React.useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isHovered, currentIndex, testimonials.length]);

  const touchStartXRef = React.useRef<number>(0);
  const touchEndXRef = React.useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 45) {
      nextTestimonial();
    } else if (distance < -45) {
      prevTestimonial();
    }
    touchStartXRef.current = 0;
    touchEndXRef.current = 0;
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto px-2 sm:px-6 py-4 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Testimonial Card Display Stage */}
      <div className="relative min-h-[300px] sm:min-h-[260px] flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 40 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full rounded-3xl bg-white dark:bg-[#161616] p-5 sm:p-10 border border-[#f7d7b0] dark:border-[#262626] shadow-xl text-left space-y-5 sm:space-y-6 relative overflow-hidden"
          >
            {/* Background Decorative Accent Quote */}
            <Quote className="absolute -top-3 -right-3 w-28 h-28 text-[#f7d7b0]/20 dark:text-[#262626]/30 pointer-events-none" />

            {/* Rating Stars & Service Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f7d7b0]/50 dark:border-[#262626] pb-3 sm:pb-4">
              <div className="flex items-center gap-1 text-[#fab60a]">
                {Array.from({ length: current.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#fab60a]" />
                ))}
              </div>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-[#f15e1c] px-3 py-1 rounded-full bg-[#fce3d3] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#262626]">
                {current.service}
              </span>
            </div>

            {/* Testimonial Quote (No Em-Dashes) */}
            <p className="text-sm sm:text-xl text-[#1b2823] dark:text-[#FAF5EE] font-medium leading-relaxed italic">
              &ldquo;{current.quote}&rdquo;
            </p>

            {/* Author Attribution */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                <div className="text-sm sm:text-lg font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                  {current.author}
                </div>
                <p className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] font-medium">
                  {current.designation}, {current.company}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next Controls & Single Non-Wrapping Row Indicator Dots */}
      <div className="flex items-center justify-between pt-5 px-1 gap-2">
        <button
          type="button"
          onClick={prevTestimonial}
          className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] text-[#1b2823] dark:text-[#ffffff] hover:border-[#f15e1c] hover:text-[#f15e1c] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 shrink-0"
          aria-label="Previous Endorsement"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Guaranteed Single Non-Wrapping Row of Compact Indicators */}
        <div className="flex items-center gap-1 sm:gap-1.5 flex-nowrap justify-center overflow-hidden max-w-[calc(100%-100px)]">
          {testimonials.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className="min-h-[44px] min-w-[16px] sm:min-w-[24px] flex items-center justify-center cursor-pointer p-0.5 border-0 bg-transparent shrink-0"
              aria-label={`Go to endorsement ${idx + 1}`}
            >
              <span
                className={cn(
                  "h-2 rounded-full transition-all block",
                  idx === currentIndex
                    ? "w-5 sm:w-7 bg-[#f15e1c]"
                    : "w-1.5 sm:w-2.5 bg-[#f7d7b0] dark:bg-[#262626] hover:bg-[#f15e1c]/60"
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={nextTestimonial}
          className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-white dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] text-[#1b2823] dark:text-[#ffffff] hover:border-[#f15e1c] hover:text-[#f15e1c] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 shrink-0"
          aria-label="Next Endorsement"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

