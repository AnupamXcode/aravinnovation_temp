"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Code2,
  Target,
  TrendingUp,
  Cpu,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export interface ChallengeItem {
  id: string;
  tag: string;
  title: React.ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  imageObjectPosition: string;
  icon: React.ReactNode;
  badgeBg: string;
  badgeBorder: string;
  badgeColor: string;
  href: string;
}

const row1Challenges: ChallengeItem[] = [
  {
    id: "build-new",
    tag: "01",
    title: "Build Something New",
    description: "Websites, applications, platforms and digital products.",
    image: "/images/Homepage/5 cards/build-something-new.webp",
    imageAlt: "Digital product and web application displayed on laptop in contemporary workspace",
    imageObjectPosition: "object-[78%_center]",
    icon: <span className="font-mono font-bold text-xs leading-none">&lt;/&gt;</span>,
    badgeBg: "bg-[#fef3eb] dark:bg-[#201a16]",
    badgeBorder: "border-[#f7d7b0] dark:border-[#422d20]",
    badgeColor: "text-[#f15e1c]",
    href: "/services/web-app-development",
  },
  {
    id: "improve-tech",
    tag: "02",
    title: (
      <>
        Improve Existing<br className="hidden sm:inline" /> Technology
      </>
    ),
    description: "Strategy, architecture, performance and modernization.",
    image: "/images/Homepage/5 cards/improve-existing-tech.webp",
    imageAlt: "Senior technology consultants reviewing enterprise cloud architecture diagram in conference room",
    imageObjectPosition: "object-[80%_center]",
    icon: <Target className="w-4 h-4" />,
    badgeBg: "bg-[#eaf6f1] dark:bg-[#14261f]",
    badgeBorder: "border-[#2e936f]/30 dark:border-[#2e936f]/40",
    badgeColor: "text-[#2e936f]",
    href: "/services/it-strategy-implementation",
  },
  {
    id: "grow-demand",
    tag: "03",
    title: "Grow Digital Demand",
    description: "Digital marketing, SEO, lead generation and growth.",
    image: "/images/Homepage/5 cards/grow-digital-demand.webp",
    imageAlt: "Marketing analyst workstation showing real-time growth analytics and SEO metrics on monitor",
    imageObjectPosition: "object-[85%_center]",
    icon: <TrendingUp className="w-4 h-4" />,
    badgeBg: "bg-[#fef9e7] dark:bg-[#252212]",
    badgeBorder: "border-[#fab60a]/40 dark:border-[#fab60a]/50",
    badgeColor: "text-[#fab60a]",
    href: "/services/digital-marketing-brand-development",
  },
];

const row2Challenges: ChallengeItem[] = [
  {
    id: "use-ai",
    tag: "04",
    title: "Use AI Practically",
    description: "AI solutions, automation and intelligent workflows.",
    image: "/images/Homepage/5 cards/use-ai-practically.webp",
    imageAlt: "Enterprise specialist operating AI copilot workflow interface on widescreen monitor",
    imageObjectPosition: "object-[72%_center]",
    icon: <Cpu className="w-4 h-4" />,
    badgeBg: "bg-[#fef3eb] dark:bg-[#201a16]",
    badgeBorder: "border-[#f7d7b0] dark:border-[#422d20]",
    badgeColor: "text-[#f15e1c]",
    href: "/services/ai-portfolio",
  },
  {
    id: "strengthen-gov",
    tag: "05",
    title: "Strengthen Governance",
    description: "Risk, compliance, controls and operational improvement.",
    image: "/images/Homepage/5 cards/strengthen-governance.webp",
    imageAlt: "Executive compliance workspace with GRC risk audit dashboard on tablet and reports",
    imageObjectPosition: "object-[75%_center]",
    icon: <ShieldCheck className="w-4 h-4" />,
    badgeBg: "bg-[#eaf6f1] dark:bg-[#14261f]",
    badgeBorder: "border-[#2e936f]/30 dark:border-[#2e936f]/40",
    badgeColor: "text-[#2e936f]",
    href: "/services/risk-compliance-governance",
  },
];

// Motion Variants for clean entrance
const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export function BusinessChallengesSection() {
  return (
    <section
      id="challenges"
      className="relative w-full py-5 sm:py-7 lg:py-8 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[#FFFDF9] dark:bg-[#16221d] text-[#111111] dark:text-[#ffffff] transition-colors duration-300 overflow-hidden"
    >
      {/* Decorative Top-Right Header Background Image from Target Design */}
      <div className="absolute top-0 right-0 w-full md:w-3/5 lg:w-1/2 h-56 sm:h-72 pointer-events-none select-none z-0 overflow-hidden">
        <Image
          src="/images/Homepage/challenges-header-bg.webp"
          alt="Modern executive office architectural window background"
          fill
          priority={false}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top-right opacity-35 dark:opacity-20"
        />
        {/* Soft multi-direction gradient mask to dissolve cleanly into warm canvas */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF9] via-[#FFFDF9]/80 to-transparent dark:from-[#16221d] dark:via-[#16221d]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFFDF9]/60 to-[#FFFDF9] dark:via-[#16221d]/60 dark:to-[#16221d]" />
      </div>

      <div className="relative z-10 max-w-[1760px] mx-auto space-y-4 sm:space-y-5">
        
        {/* Section Header: Exact match to Target Image 1 */}
        <div className="text-left space-y-2 max-w-3xl">
          {/* Eyebrow: Orange Dash + HOW WE HELP */}
          <div className="inline-flex items-center gap-2.5">
            <span className="w-7 sm:w-8 h-[2px] bg-[#f15e1c]" />
            <span className="font-mono text-xs sm:text-[13px] font-bold uppercase tracking-widest text-[#f15e1c]">
              How We Help
            </span>
          </div>

          {/* Heading with "Solve?" in Arav Orange */}
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-extrabold font-display text-[#111111] dark:text-[#ffffff] tracking-tight leading-[1.12]">
            What Are You Trying to <span className="text-[#f15e1c]">Solve?</span>
          </h2>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base text-[#4a5568] dark:text-[#a0aec0] font-normal leading-relaxed pt-0.5">
            Select the area closest to your business priority to see how we can assist.
          </p>
        </div>

        {/* Five-Card Responsive Grid */}
        <div className="space-y-4 sm:space-y-5">
          
          {/* Row 1: 3 Equal-Width Horizontal-Split Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full"
          >
            {row1Challenges.map((item) => (
              <motion.div key={item.id} variants={cardItemVariants} className="h-full">
                <Link
                  href={item.href}
                  className="group relative h-[230px] sm:h-[240px] lg:h-[245px] xl:h-[250px] flex flex-row items-stretch justify-between rounded-[22px] bg-white dark:bg-[#1b2823] border border-[#f7d7b0] dark:border-[#2a3c35] hover:border-[#f15e1c] dark:hover:border-[#f15e1c] hover:bg-gradient-to-r hover:from-[#FFF8F2] hover:to-white dark:hover:from-[#20312a] dark:hover:to-[#1b2823] shadow-[0_4px_16px_-4px_rgba(34,24,17,0.04)] hover:shadow-[0_16px_32px_-8px_rgba(241,94,28,0.14),0_4px_12px_-2px_rgba(0,0,0,0.04)] transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                >
                  {/* Left Column: Text Content & Bottom CTA */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between p-5 sm:p-6 z-20 relative">
                    <div>
                      {/* Monospace Tag Number */}
                      <span className="font-mono text-xs font-bold text-[#f15e1c] tracking-widest block mb-1.5">
                        {item.tag}
                      </span>

                      {/* Card Title */}
                      <h3 className="text-base sm:text-[18px] lg:text-[19px] xl:text-[20px] font-extrabold font-display text-[#111111] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors duration-300 leading-snug tracking-tight mb-2">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] xl:text-sm text-[#555555] dark:text-[#a0aec0] font-normal leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom CTA: Text + Orange Arrow in Circle */}
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-xs sm:text-[13px] font-bold text-[#f15e1c]">
                        Explore Approach
                      </span>
                      <span className="w-6 h-6 rounded-full border border-[#f15e1c] flex items-center justify-center text-[#f15e1c] group-hover:bg-[#f15e1c] group-hover:text-white transition-all duration-300 shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Full-Height Photographic Container with Overlay Fade */}
                  <div className="relative w-[44%] sm:w-[48%] lg:w-[46%] xl:w-[48%] h-full shrink-0 overflow-hidden z-10">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 768px) 45vw, (max-width: 1200px) 25vw, 20vw"
                      className={`object-cover ${item.imageObjectPosition} transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]`}
                    />
                    
                    {/* Left-edge soft gradient to dissolve photo seamlessly into card surface */}
                    <div className="absolute inset-y-0 left-0 w-16 sm:w-20 bg-gradient-to-r from-white dark:from-[#1b2823] via-white/80 dark:via-[#1b2823]/80 to-transparent z-10 pointer-events-none" />

                    {/* Top-Right Icon Badge */}
                    <div
                      className={`absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-lg flex items-center justify-center border shadow-xs transition-transform duration-300 group-hover:scale-108 ${item.badgeBg} ${item.badgeBorder} ${item.badgeColor}`}
                    >
                      {item.icon}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Row 2: 2 Balanced Wider Horizontal-Split Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full"
          >
            {row2Challenges.map((item) => (
              <motion.div key={item.id} variants={cardItemVariants} className="h-full">
                <Link
                  href={item.href}
                  className="group relative h-[230px] sm:h-[240px] lg:h-[245px] xl:h-[250px] flex flex-row items-stretch justify-between rounded-[22px] bg-white dark:bg-[#1b2823] border border-[#f7d7b0] dark:border-[#2a3c35] hover:border-[#f15e1c] dark:hover:border-[#f15e1c] hover:bg-gradient-to-r hover:from-[#FFF8F2] hover:to-white dark:hover:from-[#20312a] dark:hover:to-[#1b2823] shadow-[0_4px_16px_-4px_rgba(34,24,17,0.04)] hover:shadow-[0_16px_32px_-8px_rgba(241,94,28,0.14),0_4px_12px_-2px_rgba(0,0,0,0.04)] transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                >
                  {/* Left Column: Text Content & Bottom CTA */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between p-5 sm:p-6 z-20 relative">
                    <div>
                      {/* Monospace Tag Number */}
                      <span className="font-mono text-xs font-bold text-[#f15e1c] tracking-widest block mb-1.5">
                        {item.tag}
                      </span>

                      {/* Card Title */}
                      <h3 className="text-base sm:text-[18px] lg:text-[19px] font-extrabold font-display text-[#111111] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors duration-300 leading-snug tracking-tight mb-2">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] text-[#555555] dark:text-[#a0aec0] font-normal leading-relaxed line-clamp-2 sm:line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom CTA: Text + Orange Arrow in Circle */}
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-xs sm:text-[13px] font-bold text-[#f15e1c]">
                        Explore Approach
                      </span>
                      <span className="w-6 h-6 rounded-full border border-[#f15e1c] flex items-center justify-center text-[#f15e1c] group-hover:bg-[#f15e1c] group-hover:text-white transition-all duration-300 shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Full-Height Photographic Container with Overlay Fade */}
                  <div className="relative w-[46%] sm:w-[48%] h-full shrink-0 overflow-hidden z-10">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 768px) 45vw, 30vw"
                      className={`object-cover ${item.imageObjectPosition} transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]`}
                    />

                    {/* Left-edge soft gradient to dissolve photo seamlessly into card surface */}
                    <div className="absolute inset-y-0 left-0 w-16 sm:w-20 bg-gradient-to-r from-white dark:from-[#1b2823] via-white/80 dark:via-[#1b2823]/80 to-transparent z-10 pointer-events-none" />

                    {/* Top-Right Icon Badge */}
                    <div
                      className={`absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-lg flex items-center justify-center border shadow-xs transition-transform duration-300 group-hover:scale-108 ${item.badgeBg} ${item.badgeBorder} ${item.badgeColor}`}
                    >
                      {item.icon}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
