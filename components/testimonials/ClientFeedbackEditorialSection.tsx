"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EditorialTestimonial {
  id: string;
  numStr: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  category: string;
  location: string;
}

export const editorialTestimonials: EditorialTestimonial[] = [
  {
    id: "alex-turner-editorial",
    numStr: "01",
    quote:
      "Partnering with Arav Innovations was a game-changer for our business. Their strategic approach and seamless execution helped us grow our digital presence exponentially. We couldn't be happier with the results.",
    author: "Alex Turner",
    role: "Digital Marketing Head",
    company: "InnovateCo",
    category: "Digital Marketing & Strategy",
    location: "Global",
  },
  {
    id: "maria-gomez-editorial",
    numStr: "02",
    quote:
      "The team at Arav Innovations transformed our outdated systems into a state-of-the-art solution that not only boosted our efficiency but also provided us with a competitive edge. Truly remarkable work!",
    author: "Maria Gomez",
    role: "CTO",
    company: "TechBridge Solutions",
    category: "Web & App Development",
    location: "Global",
  },
  {
    id: "liam-shaw-editorial",
    numStr: "03",
    quote:
      "Working with Arav Innovations was a fantastic experience. Their attention to detail and commitment to excellence set them apart. They understood our needs perfectly and delivered beyond expectations.",
    author: "Liam Shaw",
    role: "Founder",
    company: "GreenSpace Enterprises",
    category: "IT Strategy & Consulting",
    location: "Global",
  },
  {
    id: "sophie-lee-editorial",
    numStr: "04",
    quote:
      "Arav Innovations provided unparalleled support and guidance throughout our project. Their expertise and proactive approach ensured the project's success, and their team was a pleasure to work with.",
    author: "Sophie Lee",
    role: "COO",
    company: "Urban Insights",
    category: "Risk Governance & Operations",
    location: "Global",
  },
];

export function ClientFeedbackEditorialSection() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [direction, setDirection] = React.useState<number>(1);
  const [dragStartX, setDragStartX] = React.useState<number | null>(null);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);

  const total = editorialTestimonials.length;
  const current = editorialTestimonials[activeIndex];

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
      x: shouldReduceMotion ? 0 : dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16" id="client-feedback">
      <section className="py-8 md:py-14 px-6 sm:px-12 lg:px-14 rounded-[2.5rem] bg-[#ffffff] dark:bg-[#000000] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl transition-all duration-300 relative overflow-hidden">
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

        {/* Interactive Editorial Layout */}
        <div
          onMouseDown={(e) => handlePointerDown(e.clientX)}
          onMouseUp={(e) => handlePointerUp(e.clientX)}
          onTouchStart={(e) => e.touches.length === 1 && handlePointerDown(e.touches[0].clientX)}
          onTouchEnd={(e) => e.changedTouches.length > 0 && handlePointerUp(e.changedTouches[0].clientX)}
          className="relative z-10 rounded-3xl bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] p-8 sm:p-14 lg:p-16 select-none shadow-md flex flex-col justify-between min-h-[420px] space-y-8"
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-[#f7d7b0] dark:border-[#1a1a1a]">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2e936f]">
              {current.category} &bull; {current.location}
            </span>

            <div className="flex items-center gap-1 font-mono text-sm font-black">
              <span className="text-[#f15e1c]">{current.numStr}</span>
              <span className="text-[#7A6A5F] dark:text-[#B8ACA0] font-normal">/</span>
              <span className="text-[#2e936f]">0{total}</span>
            </div>
          </div>

          {/* Active Quotation Body */}
          <div className="relative my-auto min-h-[180px] flex flex-col justify-center">
            {/* Subtle Decorative Quote Icon */}
            <motion.div
              key={`quote-icon-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.12, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="absolute -top-8 -left-4 text-[#f15e1c] pointer-events-none"
            >
              <Quote className="w-20 h-20 stroke-1" />
            </motion.div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="space-y-6 relative z-10"
              >
                <p className="text-xl sm:text-3xl lg:text-4xl font-display font-medium text-[#1b2823] dark:text-[#ffffff] leading-[1.35] tracking-tight">
                  &ldquo;{current.quote}&rdquo;
                </p>

                <div className="space-y-1 pt-2">
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

          {/* Bottom Progress & Navigation Control */}
          <div className="pt-6 border-t border-[#f7d7b0] dark:border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Progress Bar */}
            <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-md">
              <span className="text-xs font-mono font-bold text-[#f15e1c]">01</span>
              <div className="relative flex-1 h-2 rounded-full bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] overflow-hidden">
                <motion.div
                  className="h-full bg-[#f15e1c] rounded-full"
                  animate={{ width: `${((activeIndex + 1) / total) * 100}%` }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-[#2e936f]">0{total}</span>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {editorialTestimonials.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(idx)}
                    className={cn(
                      "w-8 h-8 rounded-full text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center border",
                      activeIndex === idx
                        ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-md scale-105"
                        : "bg-white dark:bg-[#000000] text-[#7A6A5F] dark:text-[#B8ACA0] border-[#f7d7b0] dark:border-[#1a1a1a] hover:border-[#f15e1c]"
                    )}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  >
                    {item.numStr}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 pl-2 border-l border-[#f7d7b0] dark:border-[#1a1a1a]">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] text-[#1b2823] dark:text-[#ffffff] hover:bg-[#f15e1c] hover:text-white hover:border-[#f15e1c] transition-all cursor-pointer active:scale-95"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2.5 rounded-xl bg-white dark:bg-[#000000] border border-[#f7d7b0] dark:border-[#1a1a1a] text-[#1b2823] dark:text-[#ffffff] hover:bg-[#f15e1c] hover:text-white hover:border-[#f15e1c] transition-all cursor-pointer active:scale-95"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
