"use client";

import * as React from "react";
import {
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
  Star,
} from "lucide-react";
import {
  streamTestimonialsData,
  StreamTestimonial,
} from "@/data/testimonials";
import { cn } from "@/lib/utils";

/**
 * Clean SVG Brand Glyphs for Testimonial Companies
 * Strictly adheres to approved 6-color Arav brand palette.
 */
function CompanyBrandGlyph({
  slug,
  className = "w-5 h-5",
}: {
  slug: StreamTestimonial["companySlug"];
  className?: string;
}) {
  switch (slug) {
    case "nexora":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="8" cy="12" r="5" fill="#f15e1c" />
          <circle cx="16" cy="12" r="4.5" fill="#fab60a" />
          <path d="M11 9L13 15" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "kriyan":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="12" cy="7" r="3.5" fill="#2e936f" />
          <circle cx="7" cy="16" r="3" fill="#2e936f" fillOpacity="0.85" />
          <circle cx="17" cy="16" r="3" fill="#2e936f" fillOpacity="0.85" />
          <circle cx="12" cy="13" r="2" fill="#ffec69" />
        </svg>
      );
    case "mindforge":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 3L20 12L12 21L4 12Z" fill="#f15e1c" />
          <path d="M12 7L16.5 12L12 17L7.5 12Z" fill="#fab60a" />
          <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
        </svg>
      );
    case "solvix":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="12" cy="12" r="8" fill="#fab60a" />
          <path d="M12 5C14.5 7.5 15.5 10.5 15.5 13C15.5 16 13.5 18 11.5 18.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="8" r="1.5" fill="#f15e1c" />
        </svg>
      );
    case "logitech":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="4" y="5" width="7" height="7" rx="2" fill="#f15e1c" />
          <rect x="13" y="5" width="7" height="7" rx="2" fill="#2e936f" />
          <rect x="4" y="14" width="7" height="7" rx="2" fill="#fab60a" />
          <rect x="13" y="14" width="7" height="7" rx="2" fill="#f7d7b0" />
        </svg>
      );
    case "cloudsphere":
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="12" cy="12" r="7" stroke="#f15e1c" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.5" fill="#2e936f" />
          <circle cx="18" cy="8" r="2" fill="#fab60a" />
        </svg>
      );
  }
}

/**
 * Individual Testimonial Card Component
 */
function TestimonialStreamCard({ testimonial }: { testimonial: StreamTestimonial }) {
  const rating = testimonial.rating ?? 5;

  return (
    <article
      className="group relative rounded-2xl sm:rounded-[22px] bg-white dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#222222] p-5 sm:p-6 shadow-[0_4px_16px_rgba(241,94,28,0.04)] hover:shadow-[0_12px_28px_rgba(241,94,28,0.12)] hover:border-[#f15e1c] dark:hover:border-[#f15e1c] transition-all duration-300 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-6">
        {/* Left Sub-column: Quote, Text & Rating */}
        <div className="flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Orange Quote Mark */}
            <svg
              className="w-6 h-6 text-[#f15e1c] mb-2 fill-current shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            {/* Testimonial Statement */}
            <p className="text-xs sm:text-[13.5px] lg:text-[14px] text-[#221811] dark:text-[#E8DDD2] leading-relaxed font-normal">
              {testimonial.quote}
            </p>
          </div>

          {/* Star Rating & Compliance Tag */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1 text-[#fab60a]" aria-label={`Rating: ${rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-3.5 h-3.5",
                    i < rating ? "fill-[#fab60a] text-[#fab60a]" : "text-[#d1d5db] dark:text-[#444444]"
                  )}
                />
              ))}
            </div>

            {testimonial.isSampleReview && (
              <span className="text-[10px] font-mono font-medium text-[#7A6A5F] dark:text-[#999999] uppercase tracking-wider">
                Sample Review
              </span>
            )}
          </div>
        </div>

        {/* Vertical Divider Line */}
        <div className="hidden sm:block w-[1px] bg-[#f7d7b0]/60 dark:bg-[#222222] self-stretch" aria-hidden="true" />

        {/* Right Sub-column: Company Glyph, Client Name, Designation */}
        <div className="w-full sm:w-[170px] lg:w-[185px] shrink-0 flex flex-col justify-between pt-2 sm:pt-0 border-t sm:border-t-0 border-[#f7d7b0]/40 dark:border-[#222222]">
          {/* Company Brand Logo & Name */}
          <div className="flex items-center gap-2 mb-3">
            <CompanyBrandGlyph slug={testimonial.companySlug} className="w-5 h-5 shrink-0" />
            <span className="font-extrabold font-display text-xs sm:text-sm text-[#111111] dark:text-[#ffffff] tracking-tight">
              {testimonial.companyBrandName}
            </span>
          </div>

          {/* Author Attribution */}
          <div className="space-y-0.5">
            <h4 className="font-bold text-xs sm:text-[13.5px] text-[#f15e1c] tracking-tight leading-snug">
              {testimonial.clientName}
            </h4>
            <p className="text-[11px] sm:text-xs text-[#7A6A5F] dark:text-[#B8ACA0] font-medium leading-tight">
              {testimonial.designation}
            </p>
            <p className="text-[11px] text-[#555555] dark:text-[#888888] font-normal leading-tight">
              {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Arav Innovations — Premium Animated Client Testimonials Section
 * 
 * Features:
 * - 40/60 spacious two-column layout on desktop.
 * - Left side: "What Our Clients Are Saying" with "Clients" highlighted in #f15e1c.
 * - Right side: Continuous vertical upward stream looping smoothly without jumps or gaps.
 * - Seamless bottom-to-top motion with pause-on-hover and direction control.
 * - Respects prefers-reduced-motion.
 * - Preserves approved 6-color palette without arbitrary stock imagery or unverified metrics.
 */
export function ClientTestimonialsSection() {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [isManuallyPaused, setIsManuallyPaused] = React.useState<boolean>(false);
  const [scrollDirection, setScrollDirection] = React.useState<"up" | "down">("up");
  const [scrollDuration, setScrollDuration] = React.useState<number>(36);

  // Check user preference for reduced motion
  const [reducedMotion, setReducedMotion] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const isPaused = isHovered || isManuallyPaused || reducedMotion;

  const togglePlayPause = () => {
    setIsManuallyPaused((prev) => !prev);
  };

  const toggleDirection = () => {
    setScrollDirection((prev) => (prev === "up" ? "down" : "up"));
  };

  return (
    <section
      id="testimonials"
      aria-label="Client Testimonials"
      className="relative w-full py-10 sm:py-14 md:py-18 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FFFDF9] dark:bg-[#0c0c0c] text-[#221811] dark:text-[#FAF5EE] overflow-hidden transition-colors duration-300"
    >
      {/* Decorative SVG Ambient Arc & Glow behind left heading */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        {/* Soft radial warmth */}
        <div className="absolute top-1/4 left-0 w-[420px] h-[420px] bg-[#f7d7b0]/25 dark:bg-[#f15e1c]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Elegant organic connecting arc */}
        <svg
          className="w-full h-full opacity-40 dark:opacity-20"
          viewBox="0 0 1600 900"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M 60 120 C 380 180, 560 380, 520 720 C 500 860, 460 980, 420 1080"
            stroke="#f7d7b0"
            strokeWidth="1.5"
          />
          <path
            d="M 80 120 C 400 200, 580 400, 540 740"
            stroke="#f15e1c"
            strokeWidth="0.8"
            strokeDasharray="4 6"
          />
          <circle cx="380" cy="180" r="3" fill="#fab60a" />
          <circle cx="560" cy="380" r="3.5" fill="#f15e1c" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1760px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-16 items-center">
        {/* LEFT COLUMN: Testimonials Introduction (approx 42% width) */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-4 sm:space-y-6">
          {/* Eyebrow Label */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs sm:text-[13px] font-mono font-bold tracking-[0.2em] uppercase text-[#f15e1c]">
              CLIENT TESTIMONIALS
            </span>
            <span className="w-8 sm:w-12 h-[1.5px] bg-[#f15e1c]" />
          </div>

          {/* Main Heading: "Clients" in Arav Orange */}
          <h2 className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold font-display text-[#111111] dark:text-[#ffffff] leading-[1.12] tracking-tight">
            What Our <br />
            <span className="text-[#f15e1c]">Clients</span> Are Saying
          </h2>

          {/* Supporting Paragraph */}
          <p className="text-sm sm:text-base lg:text-[17px] text-[#4a5c55] dark:text-[#a0aec0] font-normal leading-relaxed max-w-lg">
            Trusted by businesses looking for practical technology, digital transformation, and measurable improvements.
          </p>

          {/* Real Interactive Navigation & Stream Controls */}
          <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3">
            {/* Reverse / Normal Scroll Direction Button */}
            <button
              type="button"
              onClick={toggleDirection}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#f7d7b0] dark:border-[#333333] bg-white dark:bg-[#161616] flex items-center justify-center text-[#555555] dark:text-[#d3eee4] hover:text-[#f15e1c] hover:border-[#f15e1c] transition-all duration-200 shadow-xs cursor-pointer active:scale-95 group"
              aria-label={scrollDirection === "up" ? "Reverse stream direction downward" : "Scroll stream upward"}
              title={scrollDirection === "up" ? "Reverse direction" : "Upward direction"}
            >
              <ArrowDown
                className={cn(
                  "w-4 h-4 transition-transform duration-300 text-[#f15e1c]",
                  scrollDirection === "up" ? "rotate-180" : "rotate-0"
                )}
              />
            </button>

            {/* Play / Pause Toggle Button (Primary Orange Accent) */}
            <button
              type="button"
              onClick={togglePlayPause}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#f15e1c] text-white flex items-center justify-center hover:bg-[#d94e10] transition-all duration-200 shadow-md shadow-[#f15e1c]/25 cursor-pointer active:scale-95"
              aria-label={isManuallyPaused ? "Resume upward scrolling" : "Pause upward scrolling"}
              title={isManuallyPaused ? "Resume stream" : "Pause stream"}
            >
              {isManuallyPaused ? (
                <Play className="w-4 h-4 ml-0.5 fill-current" />
              ) : (
                <Pause className="w-4 h-4 fill-current" />
              )}
            </button>

            <span className="text-xs font-mono text-[#7A6A5F] dark:text-[#B8ACA0] pl-1 select-none">
              {isManuallyPaused ? "Stream paused" : isHovered ? "Paused on hover" : "Continuous stream"}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Continuous Upward-Scrolling Testimonial Stream (approx 58% width) */}
        <div className="lg:col-span-7 relative flex items-center">
          {/* Main Viewport with Top & Bottom Fade Mask */}
          <div
            className="relative w-full h-[520px] sm:h-[580px] lg:h-[620px] overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            {/* Seamless Infinite Looping Track (Duplicated dataset ensures 0 jumps/resets) */}
            <div
              className={cn(
                "flex flex-col gap-4 sm:gap-5 w-full will-change-transform",
                !reducedMotion && "animate-vertical-stream"
              )}
              style={{
                animationPlayState: isPaused ? "paused" : "running",
                animationDirection: scrollDirection === "down" ? "reverse" : "normal",
                animationDuration: `${scrollDuration}s`,
              }}
            >
              {/* Set A */}
              {streamTestimonialsData.map((testimonial) => (
                <TestimonialStreamCard
                  key={`a-${testimonial.id}`}
                  testimonial={testimonial}
                />
              ))}

              {/* Set B (Identical duplicate for seamless continuous transition) */}
              {streamTestimonialsData.map((testimonial) => (
                <TestimonialStreamCard
                  key={`b-${testimonial.id}`}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>

          {/* Right-edge Motion Trajectory Track from Reference Image */}
          <div
            className="hidden sm:flex flex-col items-center justify-between h-[520px] sm:h-[580px] lg:h-[620px] pl-3 sm:pl-4 py-2 shrink-0 select-none pointer-events-none"
            aria-hidden="true"
          >
            {/* Upward arrow badge at top right */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#f15e1c] bg-[#FFF8F2] dark:bg-[#1a120c] flex items-center justify-center text-[#f15e1c] shadow-xs">
              <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f15e1c]" />
            </div>

            {/* Vertical trajectory line with subtle orange nodes */}
            <div className="relative flex-1 w-[1.5px] bg-[#f7d7b0] dark:bg-[#2a2a2a] my-2 flex flex-col justify-around items-center">
              <div className="w-2 h-2 rounded-full bg-[#f15e1c]" />
              <div className="w-2 h-2 rounded-full bg-[#f15e1c]" />
              <div className="w-2 h-2 rounded-full bg-[#f15e1c]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
