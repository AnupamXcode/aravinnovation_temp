"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Sparkles, ArrowUpRight, CheckCircle2, Quote } from "lucide-react";
import { useSiteConfig } from "@/lib/site-config";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export interface CEOLeadershipSectionProps {
  /**
   * Optional service-specific strategic context line.
   * e.g., "His approach starts with aligning technology decisions to business direction."
   */
  serviceContext?: string;
  className?: string;
}

export function CEOLeadershipSection({
  serviceContext,
  className = "",
}: CEOLeadershipSectionProps) {
  const { config } = useSiteConfig();
  const ceoConfig = config.ceoSectionConfig;

  // Ref & InView detector for scroll triggering
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  // Typing interaction state
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const fullStatement = ceoConfig.statement || "Technology should create progress, not complexity.";

  useEffect(() => {
    if (!isInView) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayedText(fullStatement);
      setIsTypingComplete(true);
      setShowDetails(true);
      return;
    }

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullStatement.length) {
        setDisplayedText(fullStatement.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
        // Pause 600ms before fading in supporting bio details
        setTimeout(() => {
          setShowDetails(true);
        }, 600);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [isInView, fullStatement]);

  if (ceoConfig && !ceoConfig.visible) {
    return null;
  }

  return (
    <section
      ref={containerRef}
      className={`relative py-16 sm:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-y border-[#f7d7b0]/60 dark:border-[#1a1a1a] bg-gradient-to-b from-[#fefaf5] via-white to-[#fefaf5] dark:from-[#050505] dark:via-[#090909] dark:to-[#050505] overflow-hidden select-none ${className}`}
    >
      {/* Subtle Ambient Decorative Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#f15e1c]/5 dark:bg-[#f15e1c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#2e936f]/5 dark:bg-[#2e936f]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1320px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: CEO Editorial Portrait Box (4 cols on Desktop)
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col items-center lg:items-start"
          >
            <div className="relative group max-w-[280px] sm:max-w-[320px] w-full">
              {/* Outer Gradient Border Aura */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#f15e1c]/30 via-[#2e936f]/20 to-[#fab60a]/30 opacity-70 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

              {/* Editorial Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0a] border-2 border-[#f7d7b0] dark:border-[#2a2a2a] shadow-xl aspect-[3/4] flex items-center justify-center">
                <Image
                  src={ceoConfig.portrait}
                  alt={`${ceoConfig.name} - ${ceoConfig.designation}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover object-top filter brightness-[0.98] contrast-[1.02] group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                />

                {/* Live Interactive LinkedIn Badge on Portrait Corner */}
                {ceoConfig.linkedinUrl && (
                  <a
                    href={ceoConfig.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Connect with ${ceoConfig.name} on LinkedIn`}
                    className="absolute bottom-3 right-3 z-10 w-10 h-10 rounded-full bg-white dark:bg-[#121212] text-[#1b2823] dark:text-white shadow-lg border border-[#f7d7b0] dark:border-[#333333] flex items-center justify-center hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all duration-300 transform group-hover:scale-105"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Caption Below Portrait */}
              <div className="mt-4 text-center lg:text-left space-y-0.5">
                <h3 className="text-base font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                  {ceoConfig.name}
                </h3>
                <p className="text-xs font-mono font-medium text-[#f15e1c] dark:text-[#f15e1c]">
                  {ceoConfig.designation}
                </p>
              </div>
            </div>
          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN: Leadership Story & Reveal (8 cols on Desktop)
              ========================================================================= */}
          <div className="lg:col-span-8 space-y-6 text-left">
            
            {/* Header / Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f15e1c]/10 dark:bg-[#f15e1c]/20 border border-[#f15e1c]/30 text-[#f15e1c] text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ABOUT OUR CEO</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#1b2823] dark:text-[#ffffff]">
                {ceoConfig.name}
              </h2>

              <p className="text-sm sm:text-base font-mono font-semibold text-[#2e936f] dark:text-[#2e936f]">
                {ceoConfig.designation}
              </p>
            </motion.div>

            {/* Typing Leadership Statement Block */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#000000] border-2 border-[#f7d7b0] dark:border-[#1a1a1a] shadow-md relative overflow-hidden space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs font-mono text-[#f15e1c] font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#f15e1c] animate-pulse" />
                  LEADERSHIP PRINCIPLE
                </div>
                <div className="p-2 rounded-xl bg-[#f15e1c]/10 text-[#f15e1c]">
                  <Quote className="w-4 h-4" />
                </div>
              </div>

              {/* Character Reveal / Typing Text */}
              <div className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-[#1b2823] dark:text-[#ffffff] leading-snug tracking-tight min-h-[3.5rem] sm:min-h-[4rem]">
                &ldquo;{displayedText}
                {!isTypingComplete && (
                  <span className="inline-block w-0.5 h-6 sm:h-7 ml-1 bg-[#f15e1c] animate-pulse align-middle" />
                )}
                &rdquo;
              </div>

              {/* Supporting Line below principle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={showDetails ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#a0b8b0] font-sans font-medium italic pt-3 border-t border-[#f7d7b0]/50 dark:border-[#1a1a1a]"
              >
                {ceoConfig.statementSupportingLine}
              </motion.p>
            </motion.div>

            {/* Biography & Service Context (Fades in smoothly) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={showDetails ? { opacity: 1, y: 0 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4 text-sm sm:text-base text-[#2c3e35] dark:text-[#d0e0d8] leading-relaxed font-sans"
            >
              {/* Service-Specific Context Line */}
              {serviceContext && (
                <div className="p-4 rounded-xl bg-[#2e936f]/10 dark:bg-[#2e936f]/15 border border-[#2e936f]/30 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#2e936f] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm font-medium text-[#1b2823] dark:text-[#e0f2ec]">
                    <strong className="font-bold text-[#2e936f]">Strategic Perspective:</strong> {serviceContext}
                  </p>
                </div>
              )}

              <p className="leading-relaxed">
                {ceoConfig.biographyParagraph1}
              </p>
              <p className="leading-relaxed text-[#4a5c55] dark:text-[#a0b8b0]">
                {ceoConfig.biographyParagraph2}
              </p>

              {/* CTA Action Button */}
              {ceoConfig.linkedinUrl && (
                <div className="pt-2">
                  <a
                    href={ceoConfig.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#1b2823] hover:bg-[#f15e1c] text-white dark:bg-white dark:text-[#1b2823] dark:hover:bg-[#f15e1c] dark:hover:text-white font-mono font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 group"
                  >
                    <LinkedInIcon className="w-4 h-4 text-[#0077b5] group-hover:text-white transition-colors" />
                    <span>{ceoConfig.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              )}
            </motion.div>

          </div>

        </div>
      </div>

      {/* Accessible DOM copy for Search Engines & Screen Readers */}
      <div className="sr-only">
        <h3>{ceoConfig.name} - {ceoConfig.designation}</h3>
        <p>{ceoConfig.statement}</p>
        <p>{ceoConfig.statementSupportingLine}</p>
        {serviceContext && <p>{serviceContext}</p>}
        <p>{ceoConfig.biographyParagraph1}</p>
        <p>{ceoConfig.biographyParagraph2}</p>
      </div>
    </section>
  );
}
