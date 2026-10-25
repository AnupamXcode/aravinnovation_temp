"use client";

import * as React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroVideoBackground } from "./HeroVideoBackground";
import { ArrowRight, ShieldCheck, Globe2, Zap } from "lucide-react";
import { useSiteConfig, defaultHeroPositioningDeviceConfig } from "@/lib/site-config";

// Restrained, premium editorial animation sequence
const lineVariants: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: (customDelay: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.52,
      delay: customDelay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (customDelay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      delay: customDelay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function Hero() {
  const { config } = useSiteConfig();
  const [deviceKey, setDeviceKey] = React.useState<"mobile" | "tablet" | "desktop">("desktop");

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDeviceKey("mobile");
      } else if (width < 1024) {
        setDeviceKey("tablet");
      } else {
        setDeviceKey("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const positioningConfig = config.heroVideoConfig?.positioning;
  const positioning = positioningConfig?.[deviceKey] || defaultHeroPositioningDeviceConfig;

  // Ensure horizontal alignment is flush with the page grid, and shift content upwards
  const isMobile = deviceKey === "mobile";
  const effectiveContentX = 0;
  const effectiveContentY = isMobile ? -8 : ((positioning.contentY || 0) - 36);

  return (
    <section className="relative w-full h-screen min-h-screen h-[100dvh] min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-[#FFFDF9] dark:bg-[#16221d] transition-colors duration-300">
      {/* Background Video Layer with Preserved Minimalist Video */}
      <HeroVideoBackground />

      {/* Main Editorial / Enterprise Content Container */}
      <div className="relative z-10 w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 pb-8 my-auto box-sizing-border flex flex-col items-center justify-center">
        
        {/* Center-Aligned Content Column Block */}
        <div
          style={{
            transform: `translate3d(0, ${effectiveContentY}px, 0)`,
          }}
          className="text-center flex flex-col items-center justify-center w-full max-w-4xl lg:max-w-5xl mx-auto transition-transform duration-200"
        >
          {/* 01. Main Editorial Headline: Restrained Two-Line Clipped Reveal */}
          <h1
            className="font-display font-extrabold text-[32px] xs:text-[36px] sm:text-5xl lg:text-[54px] xl:text-[58px] text-[#221811] dark:text-[#ffffff] tracking-tight leading-[1.12] sm:leading-[1.08] text-center transition-all duration-200 max-w-full break-words space-y-1 mb-4"
          >
            {/* Line 1 */}
            <span className="block overflow-hidden py-0.5">
              <motion.span
                custom={0.12}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="block text-center whitespace-normal sm:whitespace-nowrap"
              >
                Build, Grow &amp; Scale With
              </motion.span>
            </span>

            {/* Line 2 */}
            <span className="block overflow-hidden py-0.5">
              <motion.span
                custom={0.24}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="block text-[#f15e1c] dark:text-[#f15e1c] text-center whitespace-normal sm:whitespace-nowrap"
              >
                Technology, AI &amp; Digital Growth
              </motion.span>
            </span>
          </h1>

          {/* 03. Deliberate Supporting Copy */}
          <motion.p
            custom={0.38}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="text-base sm:text-lg text-[#3A2E27]/90 dark:text-[#ffffff]/85 max-w-xl sm:max-w-2xl text-center mx-auto leading-relaxed font-sans font-normal transition-all duration-200 mb-6 sm:mb-8"
          >
            We help businesses turn technology challenges and growth goals into
            scalable digital solutions and measurable outcomes.
          </motion.p>

          {/* 04. Primary & Secondary Action CTAs */}
          <motion.div
            custom={0.52}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto gap-3.5 sm:gap-4 transition-all duration-200 mb-6 sm:mb-8 mx-auto"
          >
            <Link href="/contact" className="w-full sm:w-auto group">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto rounded-full px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold shadow-md hover:shadow-[0_16px_32px_-6px_rgba(241,94,28,0.35)] bg-[#f15e1c] text-white hover:bg-[#d84e12] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 min-h-[48px] sm:min-h-[52px] justify-center"
                rightIcon={
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1.5" />
                }
              >
                Book a Free Consultation
              </Button>
            </Link>

            <Link href="#challenges" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold bg-white/90 dark:bg-[#1b2823]/80 backdrop-blur-md border border-[#f7d7b0] dark:border-[#2a3c35] text-[#221811] dark:text-[#ffffff] hover:bg-white dark:hover:bg-[#1b2823] hover:border-[#f15e1c] hover:text-[#f15e1c] transition-all duration-300 transform hover:-translate-y-0.5 min-h-[48px] sm:min-h-[52px] justify-center"
              >
                Explore Solutions
              </Button>
            </Link>
          </motion.div>

          {/* 05. Enterprise Credibility Strip with Pipe Dividers */}
          <motion.div
            custom={0.65}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="pt-4 sm:pt-6 border-t border-[#f7d7b0]/70 dark:border-[#2a3c35] w-full max-w-2xl mx-auto transition-all duration-200"
          >
            <div
              className="flex flex-col sm:flex-row items-center sm:divide-x sm:divide-[#f7d7b0]/80 dark:sm:divide-[#2a3c35] justify-center gap-3 sm:gap-0"
            >
              <div className="flex items-center gap-2.5 sm:pr-6 text-center sm:text-left justify-center py-0.5 sm:py-0">
                <div className="w-7 h-7 rounded-lg bg-[#f15e1c]/10 dark:bg-[#f15e1c]/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#f15e1c]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#221811] dark:text-[#ffffff] tracking-tight whitespace-normal sm:whitespace-nowrap">
                  Enterprise Technology Partner
                </span>
              </div>

              <div className="flex items-center gap-2.5 sm:px-6 text-center sm:text-left justify-center py-0.5 sm:py-0">
                <div className="w-7 h-7 rounded-lg bg-[#2e936f]/10 dark:bg-[#2e936f]/20 flex items-center justify-center shrink-0">
                  <Globe2 className="w-4 h-4 text-[#2e936f]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#221811] dark:text-[#ffffff] tracking-tight whitespace-normal sm:whitespace-nowrap">
                  India &amp; UAE Strategic Hubs
                </span>
              </div>

              <div className="flex items-center gap-2.5 sm:pl-6 text-center sm:text-left justify-center py-0.5 sm:py-0">
                <div className="w-7 h-7 rounded-lg bg-[#fab60a]/15 dark:bg-[#fab60a]/20 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-[#fab60a]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#221811] dark:text-[#ffffff] tracking-tight whitespace-normal sm:whitespace-nowrap">
                  Outcome-Driven Architecture
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Floating Scroll Indicator to Next Page */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-auto select-none">
        <Link
          href="#challenges"
          className="flex flex-col items-center gap-1.5 text-xs font-mono font-medium text-[#4a5c55] dark:text-[#d3eee4] hover:text-[#f15e1c] transition-colors group cursor-pointer"
          aria-label="Scroll to explore solutions"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#7A6A5F] dark:text-[#B8ACA0] group-hover:text-[#f15e1c] transition-colors font-bold">
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-[#f7d7b0] dark:border-[#2a3c35] group-hover:border-[#f15e1c] flex items-start justify-center p-1 transition-colors">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-full bg-[#f15e1c]"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
