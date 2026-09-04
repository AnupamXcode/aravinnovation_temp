import * as React from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/hero/Hero";
import { BeforeAfterSlider } from "@/components/motion/BeforeAfterSlider";
import { ProblemToSolutionSection } from "@/components/home/ProblemToSolutionSection";
import { WhyAravDigitalCore } from "@/components/home/WhyAravDigitalCore";
import { AnimatedTestimonialsCarousel } from "@/components/testimonials/AnimatedTestimonialsCarousel";
import { ClientFeedbackEditorialSection } from "@/components/testimonials/ClientFeedbackEditorialSection";
import { LeadForm } from "@/components/forms/LeadForm";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ScrollTextFlip } from "@/components/motion/ScrollTextFlip";
import { Services3DConstellation } from "@/components/services/Services3DConstellation";
import { InteractiveServiceStack3D } from "@/components/services/InteractiveServiceStack3D";
import { CaseStudy3DTransformation } from "@/components/case-studies/CaseStudy3DTransformation";
import { Process3DPathway } from "@/components/motion/Process3DPathway";
import { MovingLogoStrip } from "@/components/motion/MovingLogoStrip";
import {
  ShieldCheck,
  Zap,
  Users,
  Award,
  CheckCircle,
} from "lucide-react";

import { getSEOForPath, SITE_BASE_URL } from "@/lib/seo";
import { getBlogPosts } from "@/lib/cms";
import { HomeInsightsSection } from "@/components/home/HomeInsightsSection";
import { WhoWeHelpSection } from "@/components/home/WhoWeHelpSection";

export async function generateMetadata() {
  const seo = getSEOForPath("/");
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: {
      canonical: seo.canonicalOverride || SITE_BASE_URL,
    },
    openGraph: {
      title: seo.ogTitle || seo.metaTitle,
      description: seo.ogDescription || seo.metaDescription,
      url: SITE_BASE_URL,
      siteName: "Arav Innovations",
      type: "website",
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
    robots: {
      index: !seo.robots.includes("NoIndex"),
      follow: !seo.robots.includes("NoFollow"),
    },
  };
}

import { Scroll3DContainer } from "@/components/motion/Scroll3DContainer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tWhyArav = await getTranslations("WhyArav");
  const tMethodology = await getTranslations("Methodology");
  const tTestimonials = await getTranslations("Testimonials");
  const tFinalCta = await getTranslations("FinalCta");
  const tMovingLogo = await getTranslations("MovingLogo");

  const differentiators = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: tWhyArav("diff1Title"),
      description: tWhyArav("diff1Desc"),
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: tWhyArav("diff2Title"),
      description: tWhyArav("diff2Desc"),
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: tWhyArav("diff3Title"),
      description: tWhyArav("diff3Desc"),
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: tWhyArav("diff4Title"),
      description: tWhyArav("diff4Desc"),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#ffffff] dark:bg-[#000000] text-[#1b2823] dark:text-[#ffffff] space-y-6 md:space-y-12 pb-8 transition-colors duration-300 overflow-x-hidden">
      {/* 01 — CINEMATIC HERO */}
      <Scroll3DContainer variant="hero">
        <Hero />
      </Scroll3DContainer>

      {/* 02 — TRUST / CAPABILITY STRIP */}
      <section className="w-full py-5 md:py-7 bg-[#fefaf5] dark:bg-[#0a0a0a] border-y border-[#f7d7b0] dark:border-[#1a1a1a] shadow-sm transition-all duration-300 overflow-hidden">
        <ScrollReveal direction="up">
          <div className="text-center mb-3 px-4">
            <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#4a5c55] dark:text-[#d3eee4]">
              STRATEGY &bull; ENGINEERING &bull; GROWTH &bull; GOVERNANCE &bull; AI
            </span>
          </div>
          <MovingLogoStrip />
        </ScrollReveal>
      </section>

      {/* 03 — WHAT WE DO (8 PREMIUM SERVICE CARDS) */}
      <div id="services">
        <InteractiveServiceStack3D />
      </div>

      {/* 04 — THINK &bull; BUILD &bull; GROW */}
      <ProblemToSolutionSection />

      {/* 05 — WHY ARAV INNOVATIONS? */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16" id="why-arav">
        <WhyAravDigitalCore />
      </div>

      {/* 06 — TRANSFORMATION JOURNEY (ASSESS -> STRATEGIZE -> BUILD -> OPTIMIZE -> SCALE) */}
      <div className="w-full px-2 sm:px-8 lg:px-12 xl:px-16" id="process">
        <section className="py-6 md:py-14 px-1 sm:px-12 lg:px-14 rounded-2xl md:rounded-[2.5rem] bg-transparent md:bg-[#fefaf5] md:dark:bg-[#0a0a0a] border-0 md:border md:border-[#f7d7b0] md:dark:border-[#1a1a1a] shadow-none md:shadow-2xl transition-all duration-300">
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3 px-2">
            <Badge variant="secondary" size="md">
              TRANSFORMATION BLUEPRINT
            </Badge>
            <ScrollTextFlip>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                From Strategy to Scalable Operations
              </h2>
            </ScrollTextFlip>
          </div>

          <Process3DPathway />
        </section>
      </div>

      {/* 07 — SELECTED WORK / CASE STUDIES */}
      <CaseStudy3DTransformation />

      {/* 08 — WHO WE HELP */}
      <WhoWeHelpSection />

      {/* 09 — EXECUTIVE ENDORSEMENTS (1 TESTIMONIAL AT A TIME, 12 DOTS, AUTOPLAY) */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16" id="executive-endorsements">
        <Scroll3DContainer variant="testimonial">
          <section className="py-8 md:py-14 px-6 sm:px-12 lg:px-14 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#f15e1c]/40 to-transparent" />

            <div className="text-center max-w-3xl mx-auto mb-6 space-y-3">
              <Badge variant="secondary" size="md">
                EXECUTIVE REVIEWS
              </Badge>
              <ScrollTextFlip>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                  What Our Partners Say
                </h2>
              </ScrollTextFlip>
            </div>

            <ScrollReveal direction="up" delay={0.2}>
              <AnimatedTestimonialsCarousel />
            </ScrollReveal>
          </section>
        </Scroll3DContainer>
      </div>

      {/* 10 — INSIGHTS THAT HELP YOU MOVE FORWARD */}
      <HomeInsightsSection posts={await getBlogPosts(locale)} />

      {/* 11 — FINAL CONVERSION SECTION */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16" id="contact">
        <Scroll3DContainer variant="cta">
          <section className="py-8 md:py-14 px-6 sm:px-12 lg:px-14 rounded-[2.5rem] bg-gradient-to-br from-[#ffffff] via-[#fefaf5] to-[#f7d7b0]/50 dark:from-[#0a0a0a] dark:via-[#121212] dark:to-[#1a1a1a] border-2 border-[#f15e1c]/40 shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <Badge variant="secondary" size="md">
                  START A CONVERSATION
                </Badge>
                <ScrollTextFlip>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight mt-3 leading-[1.1]">
                    Have a Technology or Growth Challenge?
                  </h2>
                </ScrollTextFlip>
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
                  Let&apos;s understand the problem, define the right approach and work toward a solution that fits your business.
                </p>

                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] space-y-3.5 mt-6 shadow-md">
                  <h4 className="text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                    Our Engagement Approach
                  </h4>
                  <ul className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] space-y-2.5">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#2e936f] shrink-0" />
                      <span>Initial discovery &amp; architecture review</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#2e936f] shrink-0" />
                      <span>Phased roadmap &amp; practical recommendations</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#2e936f] shrink-0" />
                      <span>Engineering execution &amp; continuous optimization</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-7">
                <ScrollReveal direction="left" delay={0.2}>
                  <LeadForm source="homepage_final_cta" />
                </ScrollReveal>
              </div>
            </div>
          </section>
        </Scroll3DContainer>
      </div>
    </div>
  );
}
