import * as React from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { Hero } from "@/components/hero/Hero";
import { BusinessChallengesSection } from "@/components/home/BusinessChallengesSection";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ScrollTextFlip } from "@/components/motion/ScrollTextFlip";
import { ShieldCheck, Zap, Users, Award, CheckCircle } from "lucide-react";

// Code-split heavy below-the-fold components
const InteractiveServiceStack3D = dynamic(
  () => import("@/components/services/InteractiveServiceStack3D").then((m) => m.InteractiveServiceStack3D)
);
const Process3DPathway = dynamic(
  () => import("@/components/motion/Process3DPathway").then((m) => m.Process3DPathway)
);
const CaseStudy3DTransformation = dynamic(
  () => import("@/components/case-studies/CaseStudy3DTransformation").then((m) => m.CaseStudy3DTransformation)
);
const AnimatedTestimonialsCarousel = dynamic(
  () => import("@/components/testimonials/AnimatedTestimonialsCarousel").then((m) => m.AnimatedTestimonialsCarousel)
);
const LeadForm = dynamic(
  () => import("@/components/forms/LeadForm").then((m) => m.LeadForm)
);
const WhoWeHelpSection = dynamic(
  () => import("@/components/home/WhoWeHelpSection").then((m) => m.WhoWeHelpSection)
);
const HomeFAQSection = dynamic(
  () => import("@/components/home/HomeFAQSection").then((m) => m.HomeFAQSection)
);
const HomeInsightsSection = dynamic(
  () => import("@/components/home/HomeInsightsSection").then((m) => m.HomeInsightsSection)
);
const ProductEcosystemSection = dynamic(
  () => import("@/components/home/ProductEcosystemSection").then((m) => m.ProductEcosystemSection)
);
const CEOLeadershipSection = dynamic(
  () => import("@/components/services/CEOLeadershipSection").then((m) => m.CEOLeadershipSection)
);

import { getSEOForPath, SITE_BASE_URL } from "@/lib/seo";
import { getHomeBlogPosts } from "@/lib/cms";

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
    <div className="flex flex-col w-full bg-[#ffffff] dark:bg-[#16221d] text-[#1b2823] dark:text-[#ffffff] space-y-1 sm:space-y-2 md:space-y-2 pb-6 transition-colors duration-300 overflow-x-hidden">
      {/* 01 — HERO */}
      <Hero />

      {/* 02 — WHAT ARE YOU TRYING TO SOLVE? */}
      <BusinessChallengesSection />

      {/* 04 — SERVICES: 8 CONCISE SERVICE CARDS ACROSS 4 PILLARS */}
      <div id="services">
        <InteractiveServiceStack3D />
      </div>

      {/* 05 — PROPRIETARY PRODUCT ECOSYSTEM */}
      <ProductEcosystemSection />

      {/* 06 — HOW WE WORK: 4 STEPS */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16" id="process">
        <section className="max-w-[1760px] mx-auto py-3 sm:py-4 md:py-5 px-4 sm:px-8 lg:px-10 rounded-2xl md:rounded-[2.5rem] bg-transparent md:bg-[#fefaf5] md:dark:bg-[#0a0a0a] border-0 md:border md:border-[#f7d7b0] md:dark:border-[#1a1a1a] shadow-none md:shadow-2xl transition-all duration-300">
          <div className="text-center w-full max-w-3xl lg:max-w-5xl mx-auto mb-3 sm:mb-4 space-y-2 px-2">
            <ScrollTextFlip>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] lg:whitespace-nowrap">
                From Challenge to Business Outcome
              </h2>
            </ScrollTextFlip>
          </div>

          <Process3DPathway />
        </section>
      </div>

      {/* 07 — PROOF: CASE STUDIES AND REVIEWS */}
      <div id="proof" className="space-y-1 md:space-y-2">
        <CaseStudy3DTransformation />

        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16" id="executive-endorsements">
          <Scroll3DContainer variant="testimonial">
            <section className="max-w-[1760px] mx-auto py-3 sm:py-4 md:py-5 px-4 sm:px-12 lg:px-14 rounded-2xl sm:rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#f15e1c]/40 to-transparent" />

              <div className="text-center max-w-3xl mx-auto mb-3 sm:mb-4 space-y-2">
                <ScrollTextFlip>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
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
      </div>

      {/* 08 — EXECUTIVE LEADERSHIP PROFILE */}
      <div className="w-full" id="leadership">
        <CEOLeadershipSection />
      </div>

      {/* 09 — WHO WE HELP */}
      <WhoWeHelpSection />

      {/* 08 — FAQ */}
      <HomeFAQSection />

      {/* 09 — LATEST ARTICLES */}
      <HomeInsightsSection posts={await getHomeBlogPosts(locale)} />

      {/* 10 — CONTACT FORM, WHATSAPP, AND OFFICES */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16" id="contact">
        <Scroll3DContainer variant="cta">
          <section className="max-w-[1760px] mx-auto py-4 md:py-6 px-6 sm:px-12 lg:px-14 rounded-[2.5rem] bg-gradient-to-br from-[#ffffff] via-[#fefaf5] to-[#f7d7b0]/50 dark:from-[#0a0a0a] dark:via-[#121212] dark:to-[#1a1a1a] border-2 border-[#f15e1c]/40 shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* LEFT COLUMN: Heading, Supporting Copy, Value Statement & Contact Details */}
              <div className="lg:col-span-5 space-y-6">
                <ScrollTextFlip>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight mt-2 leading-[1.1]">
                    Let&apos;s Talk About Your Project
                  </h2>
                </ScrollTextFlip>
                <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed">
                  Book a <strong>free 30-minute Tech &amp; Growth Review</strong> to discuss your current technology infrastructure, digital growth bottlenecks, or process challenges with our senior practice leads.
                </p>

                {/* Value Statement & Engagement Approach */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] space-y-3 shadow-md">
                  <h3 className="text-sm sm:text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
                    Our Engagement Approach
                  </h3>
                  <ul className="text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] space-y-2">
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

                {/* Direct Contact Information Strip */}
                <div className="p-5 sm:p-6 rounded-3xl bg-[#fefaf5] dark:bg-[#111111] border border-[#f7d7b0] dark:border-[#262626] space-y-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#f15e1c] block">
                    Direct Contact Channels
                  </span>

                  <div className="grid grid-cols-1 gap-2.5 text-xs text-[#1b2823] dark:text-[#ffffff] font-medium">
                    <div className="flex items-center justify-between">
                      <span className="text-[#4a5c55] dark:text-[#d3eee4]">India HQ:</span>
                      <a href="tel:+919650625777" className="font-bold font-mono text-[#f15e1c] hover:underline">
                        +91 96506 25777
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#4a5c55] dark:text-[#d3eee4]">UAE Regional Office:</span>
                      <a href="tel:+971521555792" className="font-bold font-mono text-[#f15e1c] hover:underline">
                        +971 52 155 5792
                      </a>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-[#f7d7b0]/60 dark:border-[#222222]">
                      <span className="text-[#4a5c55] dark:text-[#d3eee4]">General Inquiry:</span>
                      <a href="mailto:Info@aravinnovations.com" className="font-bold text-[#f15e1c] hover:underline">
                        Info@aravinnovations.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Enquiry Form */}
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
