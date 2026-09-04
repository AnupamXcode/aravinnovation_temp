import * as React from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Hero } from "@/components/hero/Hero";
import { BeforeAfterSlider } from "@/components/motion/BeforeAfterSlider";
import { ProblemToSolutionSection } from "@/components/home/ProblemToSolutionSection";
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
    <div className="flex flex-col min-h-screen w-full bg-[#ffffff] dark:bg-[#000000] text-[#1b2823] dark:text-[#ffffff] space-y-4 md:space-y-8 pb-8 transition-colors duration-300 overflow-x-hidden">
      {/* STAGE 1: HERO SECTION */}
      <Scroll3DContainer variant="hero">
        <Hero />
      </Scroll3DContainer>

      {/* TRUSTED CLIENTS MOVING LOGO STRIP */}
      <section className="w-full py-5 md:py-7 bg-[#fefaf5] dark:bg-[#0a0a0a] border-y border-[#f7d7b0] dark:border-[#1a1a1a] shadow-sm transition-all duration-300 overflow-hidden">
        <ScrollReveal direction="up">
          <div className="text-center mb-3 px-4">
            <span className="text-[11px] font-bold font-mono uppercase tracking-widest text-[#4a5c55] dark:text-[#d3eee4]">
              {tMovingLogo("heading")}
            </span>
          </div>
          <MovingLogoStrip />
        </ScrollReveal>
      </section>

      {/* BEFORE/AFTER TRANSFORMATION SLIDER */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <section className="py-5 md:py-7 px-4 sm:px-6 rounded-[2.5rem] bg-[#ffffff] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xl text-center transition-colors duration-300">
          <ScrollReveal direction="up">
            <BeforeAfterSlider />
          </ScrollReveal>
        </section>
      </div>

      {/* TECHNOLOGY IS ONLY VALUABLE WHEN IT SOLVES A REAL PROBLEM SECTION */}
      <ProblemToSolutionSection />

      {/* 3D INTERACTIVE SERVICE STACK WITH SCROLL-LINKED SERVICE MAPPING */}
      <div id="services">
        <InteractiveServiceStack3D />
      </div>

      {/* FULL-WIDTH DIGITAL TRANSFORMATION PATHWAY */}
      <CaseStudy3DTransformation />

      {/* 2. HOW ARAV WORKS / 5-STEP METHODOLOGY */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16" id="process">
        <section className="py-8 md:py-14 px-6 sm:px-12 lg:px-14 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl transition-all duration-300">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <Badge variant="secondary" size="md">
              {tMethodology("badge")}
            </Badge>
            <ScrollTextFlip>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                {tMethodology("title")}
              </h2>
            </ScrollTextFlip>
          </div>

          <Process3DPathway />
        </section>
      </div>

      {/* 3. SECTION ONE: EXISTING EXECUTIVE ENDORSEMENT (UNTOUCHED) */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16" id="executive-endorsements">
        <Scroll3DContainer variant="testimonial">
          <section className="py-8 md:py-14 px-6 sm:px-12 lg:px-14 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#f15e1c]/40 to-transparent" />

            <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
              <Badge variant="secondary" size="md">
                {tTestimonials("badge")}
              </Badge>
              <ScrollTextFlip>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                  {tTestimonials("title")}
                </h2>
              </ScrollTextFlip>
            </div>

            <ScrollReveal direction="up" delay={0.2}>
              <AnimatedTestimonialsCarousel />
            </ScrollReveal>
          </section>
        </Scroll3DContainer>
      </div>

      {/* 4. SECTION TWO: NEW CLIENT FEEDBACK & EXECUTIVE REVIEWS (EDITORIAL SECTION) */}
      <ScrollReveal direction="up" delay={0.1}>
        <ClientFeedbackEditorialSection />
      </ScrollReveal>

      {/* 6. WHY ARAV (EQUAL SIZED 4 CARDS GRID) */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <section className="py-8 md:py-14 px-6 sm:px-12 lg:px-14 rounded-[2.5rem] bg-[#ffffff] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl transition-all duration-300">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <Badge variant="secondary" size="md">
              {tWhyArav("badge")}
            </Badge>
            <ScrollTextFlip>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
                {tWhyArav("title")}
              </h2>
            </ScrollTextFlip>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {differentiators.map((diff, index) => (
              <Scroll3DContainer key={index} variant="card" delay={index * 0.08} className="h-full">
                <TiltCard maxTilt={5} scale={1.01} className="h-full group">
                  <div className="h-full rounded-[2.2rem] bg-white dark:bg-[#161616] p-8 sm:p-10 border border-[#f7d7b0] dark:border-[#262626] hover-lift-3d card-3d-glow hover:shadow-2xl hover:border-[#f15e1c]/40 transition-all duration-300 shadow-sm flex flex-col justify-start space-y-5">
                    <div className="w-14 h-14 rounded-2xl icon-box-hover flex items-center justify-center shrink-0 shadow-xs text-[#f15e1c] bg-[#fefaf5] dark:bg-[#1a2622]">
                      {diff.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors leading-snug shrink-0 min-h-[56px] flex items-center">
                      {diff.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed flex-1">
                      {diff.description}
                    </p>
                  </div>
                </TiltCard>
              </Scroll3DContainer>
            ))}
          </div>
        </section>
      </div>

      {/* 6.5. KNOWLEDGE HUB / HOMEPAGE INSIGHTS SECTION */}
      <HomeInsightsSection posts={await getBlogPosts(locale)} />

      {/* 7. FINAL LEAD FORM & CTA SECTION */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16" id="contact">
        <Scroll3DContainer variant="cta">
          <section className="py-8 md:py-14 px-6 sm:px-12 lg:px-14 rounded-[2.5rem] bg-gradient-to-br from-[#ffffff] via-[#fefaf5] to-[#f7d7b0]/50 dark:from-[#0a0a0a] dark:via-[#121212] dark:to-[#1a1a1a] border-2 border-[#f15e1c]/40 shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <Badge variant="secondary" size="md">
                  {tFinalCta("badge")}
                </Badge>
                  <ScrollTextFlip>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight mt-3 leading-[1.1]">
                      LET&apos;S BUILD WHAT&apos;S NEXT
                    </h2>
                  </ScrollTextFlip>

                  <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] space-y-3.5 mt-6 shadow-md">
                    <h4 className="text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                      {tFinalCta("nextTitle")}
                    </h4>
                    <ul className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] space-y-2.5">
                      <li className="flex items-center gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#2e936f] shrink-0" />
                        <span>{tFinalCta("nextStep1")}</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#2e936f] shrink-0" />
                        <span>{tFinalCta("nextStep2")}</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle className="w-4 h-4 text-[#2e936f] shrink-0" />
                        <span>{tFinalCta("nextStep3")}</span>
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
