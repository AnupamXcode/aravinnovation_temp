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
  const effectiveContentY = isMobile ? -14 : ((positioning.contentY || 0) - 34);

  return (
    <section className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#FFFDF9] dark:bg-[#16221d] transition-colors duration-300">
      {/* Background Video Layer with Preserved Minimalist Video */}
      <HeroVideoBackground />

      {/* Top spacing to account for fixed navbar */}
      <div className="w-full pt-16 sm:pt-20" aria-hidden="true" />

      {/* Main Editorial / Enterprise Content Container (Centered) */}
      <div className="relative z-10 w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 my-auto box-sizing-border flex flex-col items-center justify-center">
        
        {/* Center-Aligned Content Column Block */}
        <div
          style={{
            transform: `translate3d(0, ${effectiveContentY}px, 0)`,
          }}
          className="text-center flex flex-col items-center justify-center w-full max-w-4xl lg:max-w-5xl mx-auto transition-transform duration-200"
        >
          {/* 01. Main Editorial Headline: Restrained Two-Line Clipped Reveal */}
          <h1
            className="font-display font-extrabold text-[34px] xs:text-[38px] sm:text-5xl lg:text-[60px] xl:text-[64px] text-[#221811] dark:text-[#ffffff] tracking-tight leading-[1.12] sm:leading-[1.08] text-center transition-all duration-200 max-w-full break-words space-y-1 mb-3.5 sm:mb-4"
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
                Build. Grow. Scale. With
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
                Technology &amp; AI.
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
            We turn business challenges into scalable digital growth.
          </motion.p>

          {/* 04. Primary & Secondary Action CTAs */}
          <motion.div
            custom={0.52}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto gap-3.5 sm:gap-4 transition-all duration-200 mx-auto"
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

            <Link href="#challenges" className="w-full sm:w-auto group">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold bg-white/95 dark:bg-[#1b2823]/90 backdrop-blur-md border border-[#f15e1c]/40 dark:border-[#f15e1c]/40 text-[#221811] dark:text-[#ffffff] hover:bg-white dark:hover:bg-[#1b2823] hover:border-[#f15e1c] hover:text-[#f15e1c] transition-all duration-300 transform hover:-translate-y-0.5 min-h-[48px] sm:min-h-[52px] justify-center shadow-xs"
                rightIcon={
                  <ArrowRight className="w-4 h-4 ml-1 text-[#f15e1c] transition-transform duration-300 group-hover:translate-x-1.5" />
                }
              >
                Explore Solutions
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* 05. Lower Dedicated Trust-Point Row with Generous Breathing Room & Elevated Position */}
      <div className="relative z-10 w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-2 pb-12 sm:pb-16 lg:pb-20 xl:pb-24">
        <motion.div
          custom={0.65}
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="w-full max-w-4xl lg:max-w-5xl mx-auto -translate-y-4 sm:-translate-y-6 lg:-translate-y-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center sm:divide-x sm:divide-[#f7d7b0] dark:sm:divide-[#2a3c35] gap-6 sm:gap-0">
            {/* Trust Point 1 */}
            <div className="flex flex-col items-center text-center gap-2.5 sm:px-6 md:px-8 lg:px-12 w-full sm:w-1/3">
              <div className="w-12 h-12 rounded-full bg-[#fef3eb] dark:bg-[#f15e1c]/15 border border-[#f7d7b0] dark:border-[#f15e1c]/30 flex items-center justify-center shadow-xs transition-transform duration-300 hover:scale-108">
                <ShieldCheck className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#f15e1c]" />
              </div>
              <span className="text-xs sm:text-sm lg:text-[15px] font-semibold text-[#221811] dark:text-[#ffffff] tracking-tight whitespace-normal sm:whitespace-nowrap">
                Enterprise Technology Partner
              </span>
            </div>

            {/* Trust Point 2 */}
            <div className="flex flex-col items-center text-center gap-2.5 sm:px-6 md:px-8 lg:px-12 w-full sm:w-1/3">
              <div className="w-12 h-12 rounded-full bg-[#eaf6f1] dark:bg-[#2e936f]/15 border border-[#2e936f]/30 flex items-center justify-center shadow-xs transition-transform duration-300 hover:scale-108">
                <Globe2 className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#2e936f]" />
              </div>
              <span className="text-xs sm:text-sm lg:text-[15px] font-semibold text-[#221811] dark:text-[#ffffff] tracking-tight whitespace-normal sm:whitespace-nowrap">
                India &amp; UAE Strategic Hubs
              </span>
            </div>

            {/* Trust Point 3 */}
            <div className="flex flex-col items-center text-center gap-2.5 sm:px-6 md:px-8 lg:px-12 w-full sm:w-1/3">
              <div className="w-12 h-12 rounded-full bg-[#fef9e7] dark:bg-[#fab60a]/15 border border-[#fab60a]/30 flex items-center justify-center shadow-xs transition-transform duration-300 hover:scale-108">
                <Zap className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#fab60a]" />
              </div>
              <span className="text-xs sm:text-sm lg:text-[15px] font-semibold text-[#221811] dark:text-[#ffffff] tracking-tight whitespace-normal sm:whitespace-nowrap">
                Outcome-Driven Architecture
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
