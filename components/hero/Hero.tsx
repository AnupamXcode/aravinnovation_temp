"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroVideoBackground } from "./HeroVideoBackground";
import { ArrowRight, ShieldCheck, Globe2, Zap } from "lucide-react";
import { useSiteConfig, defaultHeroPositioningDeviceConfig } from "@/lib/site-config";

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

  // On mobile devices, ensure horizontal transform is zero to eliminate viewport clipping
  const isMobile = deviceKey === "mobile";
  const effectiveContentX = isMobile ? 0 : (positioning.contentX || 0);
  const effectiveContentY = isMobile ? 0 : (positioning.contentY || 0);

  return (
    <section className="relative w-full min-h-none sm:min-h-[calc(100vh-80px)] xl:min-h-[90vh] flex flex-col justify-center py-8 sm:py-16 lg:py-20 overflow-hidden bg-[#FFFDF9] dark:bg-[#050505] transition-colors duration-300">
      {/* Background Video Layer with 3D Rotating Glass Cube on Right */}
      <HeroVideoBackground />

      {/* Main Editorial / Enterprise Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 xl:px-20 my-auto box-sizing-border">
        
        {/* Left-Aligned Content Column Block with Responsive Live Positioning */}
        <div
          style={{
            transform: `translate3d(${effectiveContentX}px, ${effectiveContentY}px, 0)`,
            maxWidth: !isMobile && positioning.contentWidth ? `${positioning.contentWidth}px` : "100%",
            textAlign: isMobile ? "left" : (positioning.contentAlign || "left"),
          }}
          className="text-left flex flex-col items-start justify-start w-full transition-transform duration-200"
        >
          
          {/* Main Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            style={{
              transform: isMobile ? "none" : `translate3d(${positioning.headingX || 0}px, ${positioning.headingY || 0}px, 0)`,
              marginBottom: positioning.headingMb !== undefined ? `${positioning.headingMb}px` : undefined,
            }}
            className="font-display font-extrabold text-[28px] xs:text-3xl sm:text-5xl lg:text-[56px] xl:text-[64px] text-[#221811] dark:text-[#FAF5EE] tracking-tight leading-[1.12] sm:leading-[1.08] text-left transition-all duration-200 max-w-full break-words"
          >
            Build, Grow &amp; Scale With<br className="hidden sm:inline" />{" "}
            Technology, AI &amp; Digital<br className="hidden sm:inline" />{" "}
            Growth
          </motion.h1>

          {/* Supporting Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            style={{
              transform: isMobile ? "none" : `translate3d(${positioning.descX || 0}px, ${positioning.descY || 0}px, 0)`,
              marginBottom: positioning.descMb !== undefined ? `${positioning.descMb}px` : undefined,
            }}
            className="text-sm sm:text-lg text-[#3A2E27]/90 dark:text-[#FAF5EE]/90 max-w-xl text-left leading-relaxed font-medium transition-all duration-200 mt-2 sm:mt-0"
          >
            We help businesses turn technology challenges and growth goals into scalable digital solutions and measurable outcomes.
          </motion.p>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            style={{
              transform: isMobile ? "none" : `translate3d(${positioning.ctaX || 0}px, ${positioning.ctaY || 0}px, 0)`,
              marginBottom: positioning.ctaMb !== undefined ? `${positioning.ctaMb}px` : undefined,
              gap: positioning.ctaGap !== undefined ? `${positioning.ctaGap}px` : undefined,
            }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start w-full sm:w-auto gap-3 sm:gap-4 transition-all duration-200 mt-4 sm:mt-0"
          >
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold shadow-md hover:shadow-xl shadow-[#f15e1c]/25 bg-[#f15e1c] text-white hover:bg-[#d84e12] transition-all transform hover:-translate-y-0.5 min-h-[48px] sm:min-h-[52px] justify-center"
                rightIcon={<ArrowRight className="w-4 h-4 ml-1" />}
              >
                Book a Consultation
              </Button>
            </Link>

            <Link href="#services" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold bg-white/80 dark:bg-black/60 backdrop-blur-md border border-[#3A2E27]/20 dark:border-white/20 text-[#221811] dark:text-[#FAF5EE] hover:bg-white dark:hover:bg-black hover:border-[#f15e1c] hover:text-[#f15e1c] transition-all min-h-[48px] sm:min-h-[52px] justify-center"
              >
                Explore Solutions
              </Button>
            </Link>
          </motion.div>

          {/* Restored Enterprise Capability / Credibility Row with Pipe Dividers */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            style={{
              transform: isMobile ? "none" : `translate3d(${positioning.capX || 0}px, ${positioning.capY || 0}px, 0)`,
              marginTop: positioning.capMt !== undefined ? `${positioning.capMt}px` : undefined,
            }}
            className="pt-4 sm:pt-6 border-t border-[#3A2E27]/15 dark:border-white/15 w-full max-w-2xl transition-all duration-200 mt-4 sm:mt-0"
          >
            <div
              style={{
                gap: positioning.capGap !== undefined ? `${positioning.capGap}px` : undefined,
              }}
              className="flex flex-col sm:flex-row items-start sm:items-center sm:divide-x sm:divide-[#3A2E27]/20 dark:sm:divide-white/20 justify-start gap-2.5 sm:gap-0"
            >
              
              <div className="flex items-center gap-2.5 sm:pr-6 text-left justify-start py-0.5 sm:py-0">
                <div className="w-7 h-7 rounded-lg bg-[#f15e1c]/10 dark:bg-[#f15e1c]/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#f15e1c]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#221811] dark:text-[#FAF5EE] tracking-tight whitespace-normal sm:whitespace-nowrap">
                  Enterprise Technology Partner
                </span>
              </div>

              <div className="flex items-center gap-2.5 sm:px-6 text-left justify-start py-0.5 sm:py-0">
                <div className="w-7 h-7 rounded-lg bg-[#f15e1c]/10 dark:bg-[#f15e1c]/20 flex items-center justify-center shrink-0">
                  <Globe2 className="w-4 h-4 text-[#f15e1c]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#221811] dark:text-[#FAF5EE] tracking-tight whitespace-normal sm:whitespace-nowrap">
                  India &amp; UAE Strategic Hubs
                </span>
              </div>

              <div className="flex items-center gap-2.5 sm:pl-6 text-left justify-start py-0.5 sm:py-0">
                <div className="w-7 h-7 rounded-lg bg-[#f15e1c]/10 dark:bg-[#f15e1c]/20 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-[#f15e1c]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#221811] dark:text-[#FAF5EE] tracking-tight whitespace-normal sm:whitespace-nowrap">
                  Outcome-Driven Architecture
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
