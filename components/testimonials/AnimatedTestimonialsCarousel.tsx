"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExecutiveTestimonial {
  id: string;
  numStr: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  category: string;
  location: string;
}

export const executiveTestimonials: ExecutiveTestimonial[] = [
  {
    id: "alex-turner",
    numStr: "01",
    quote:
      "Partnering with Arav Innovations was a game-changer for our business. Their strategic approach and seamless execution helped us grow our digital presence exponentially. We couldn't be happier with the results.",
    author: "Alex Turner",
    role: "Digital Marketing Head",
    company: "InnovateCo",
    category: "DIGITAL MARKETING & STRATEGY",
    location: "Global",
  },
  {
    id: "maria-gomez",
    numStr: "02",
    quote:
      "The team at Arav Innovations transformed our outdated systems into a state-of-the-art solution that not only boosted our efficiency but also provided us with a competitive edge. Truly remarkable work!",
    author: "Maria Gomez",
    role: "CTO",
    company: "TechBridge Solutions",
    category: "WEB & APP DEVELOPMENT",
    location: "Global",
  },
  {
    id: "liam-shaw",
    numStr: "03",
    quote:
      "Working with Arav Innovations was a fantastic experience. Their attention to detail and commitment to excellence set them apart. They understood our needs perfectly and delivered beyond expectations.",
    author: "Liam Shaw",
    role: "Founder",
    company: "GreenSpace Enterprises",
    category: "IT STRATEGY & CONSULTING",
    location: "Global",
  },
  {
    id: "sophie-lee",
    numStr: "04",
    quote:
      "Arav Innovations provided unparalleled support and guidance throughout our project. Their expertise and proactive approach ensured the project's success, and their team was a pleasure to work with.",
    author: "Sophie Lee",
    role: "COO",
    company: "Urban Insights",
    category: "RISK GOVERNANCE & OPERATIONS",
    location: "Global",
  },
];

export function AnimatedTestimonialsCarousel() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [direction, setDirection] = React.useState<number>(1);
  const [dragStartX, setDragStartX] = React.useState<number | null>(null);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  const total = executiveTestimonials.length;
  const current = executiveTestimonials[activeIndex];

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

  // Keyboard navigation support
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch & Mouse Drag Handlers for Mobile & Tablet Swipe
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

  // Slide vs Fade variant depending on reduced motion
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
    <div className="relative w-full py-4 select-none">
      {/* Background Subtle Architectural Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.10] dark:opacity-[0.06] z-0 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1000 500" fill="none">
          <line x1="150" y1="100" x2="450" y2="250" stroke="#f15e1c" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="450" y1="250" x2="850" y2="120" stroke="#2e936f" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="450" cy="250" r="4" fill="#f15e1c" />
          <circle cx="850" cy="120" r="4" fill="#2e936f" />
        </svg>
      </div>

      {/* Main Editorial Container */}
      <div
        onMouseDown={(e) => handlePointerDown(e.clientX)}
        onMouseUp={(e) => handlePointerUp(e.clientX)}
        onTouchStart={(e) => e.touches.length === 1 && handlePointerDown(e.touches[0].clientX)}
        onTouchEnd={(e) => e.changedTouches.length > 0 && handlePointerUp(e.changedTouches[0].clientX)}
        className="relative z-10 rounded-[2.5rem] bg-[#ffffff] dark:bg-[#101b17] border-2 border-[#f7d7b0] dark:border-[#253630] shadow-2xl p-8 sm:p-14 lg:p-16 space-y-8 overflow-hidden min-h-[460px] flex flex-col justify-between"
      >
        {/* Top Control Bar: Category Label & Monospace Counter */}
        <div className="flex items-center justify-between pb-6 border-b border-[#f7d7b0] dark:border-[#253630]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] border border-[#f7d7b0] text-xs font-mono font-extrabold text-[#f15e1c]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{current.category}</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-sm font-black">
            <span className="text-[#f15e1c] text-base">{current.numStr}</span>
            <span className="text-[#7A6A5F] dark:text-[#B8ACA0] font-normal">/</span>
            <span className="text-[#2e936f]">0{total}</span>
          </div>
        </div>

        {/* Central Testimonial Quotation & Attribution Display */}
        <div className="relative my-auto min-h-[220px] flex flex-col justify-center">
          {/* Subtle Decorative Quotation Mark Micro-Interaction */}
          <motion.div
            key={`quote-mark-${activeIndex}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute -top-10 -left-6 text-[#f15e1c] pointer-events-none"
          >
            <Quote className="w-24 h-24 stroke-1" />
          </motion.div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              className="space-y-8 relative z-10"
            >
              {/* Quote Body */}
              <p className="text-xl sm:text-3xl lg:text-4xl font-display font-medium text-[#1b2823] dark:text-[#ffffff] leading-[1.35] tracking-tight max-w-4xl">
                &ldquo;{current.quote}&rdquo;
              </p>

              {/* Executive Attribution Block */}
              <div className="space-y-1.5 pt-2">
                <div className="text-lg sm:text-xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                  {current.author}
                </div>
                <div className="text-sm font-semibold text-[#f15e1c]">
                  {current.role} &bull; {current.company}
                </div>
                <div className="text-xs font-mono font-bold text-[#2e936f]">
                  {current.category} &bull; {current.location}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Interactive Navigation & Progress Bar */}
        <div className="pt-6 border-t border-[#f7d7b0] dark:border-[#253630] flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Progress Indicator */}
          <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-md">
            <span className="text-xs font-mono font-extrabold text-[#f15e1c]">01</span>
            <div className="relative flex-1 h-2 rounded-full bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#f15e1c] to-[#2e936f] rounded-full"
                animate={{ width: `${((activeIndex + 1) / total) * 100}%` }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-mono font-extrabold text-[#2e936f]">0{total}</span>
          </div>

          {/* Pagination Buttons & Direction Arrows */}
          <div className="flex items-center gap-4">
            {/* Numbered Dots */}
            <div className="flex items-center gap-2">
              {executiveTestimonials.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className={cn(
                    "w-8 h-8 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center border",
                    activeIndex === idx
                      ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-md scale-110"
                      : "bg-[#fefaf5] dark:bg-[#172420] text-[#7A6A5F] dark:text-[#B8ACA0] border-[#f7d7b0] dark:border-[#253630] hover:border-[#f15e1c]"
                  )}
                  aria-label={`Go to testimonial ${idx + 1}`}
                >
                  {item.numStr}
                </button>
              ))}
            </div>

            {/* Previous / Next Arrow Controls */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#f7d7b0] dark:border-[#253630]">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] text-[#1b2823] dark:text-[#ffffff] hover:bg-[#f15e1c] hover:text-white hover:border-[#f15e1c] transition-all cursor-pointer active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-[#fefaf5] dark:bg-[#172420] border border-[#f7d7b0] dark:border-[#253630] text-[#1b2823] dark:text-[#ffffff] hover:bg-[#f15e1c] hover:text-white hover:border-[#f15e1c] transition-all cursor-pointer active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
