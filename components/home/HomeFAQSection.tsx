"use client";

import * as React from "react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ScrollTextFlip } from "@/components/motion/ScrollTextFlip";
import { ChevronDown, HelpCircle } from "lucide-react";

export const homeFaqs = [
  {
    q: "What does Arav Innovations help businesses with?",
    a: "We help businesses build, improve, and scale their digital ecosystem across four main areas: Technology & Engineering (IT strategy, web & application development), AI Solutions (workflow automation, RAG assistants), Digital Growth (B2B marketing, technical SEO & AEO), and Governance (DPDP compliance, risk & audits).",
  },
  {
    q: "What engagement models and project scopes do you offer?",
    a: "We offer flexible engagement models tailored to your business stage: dedicated engineering squads (team augmentation), milestone-based fixed-scope projects, fractional CTO advisory retainers, and 14-day technical or compliance audit sprints.",
  },
  {
    q: "How are project timelines and pricing factors determined?",
    a: "Timelines and costs depend directly on architectural scope, compliance requirements, and feature complexity. Fixed-scope discovery sprints typically run 2 to 4 weeks, while full enterprise web platforms and SaaS builds range from 8 to 16 weeks. We provide itemized proposals with clear milestone deliverables.",
  },
  {
    q: "Can you build a new website, SaaS portal, or application?",
    a: "Yes. We design and build custom, scalable business websites, customer portals, SaaS platforms, and enterprise web applications tailored to your workflow, optimized for fast performance and conversion.",
  },
  {
    q: "Can you perform system audits and optimize cloud performance?",
    a: "Yes. We perform deep technical audits to address architectural bottlenecks, optimize cloud infrastructure costs (Cloud FinOps), modernize legacy codebases, redesign user interfaces (UX/UI), and improve Core Web Vitals.",
  },
  {
    q: "How does Arav Innovations help with practical AI automation?",
    a: "Our AI practice focuses on practical, business-ready AI solutions: automating repetitive internal workflows, deploying custom RAG knowledge search assistants, and integrating AI workflows that process and use information securely without exposing proprietary data.",
  },
  {
    q: "How do you assist with Data Privacy & DPDP compliance readiness?",
    a: "We conduct comprehensive data mapping audits, establish verifiable consent lifecycle frontends, implement automated Data Subject Access Request (DSAR) workflows, and configure field-level encryption to satisfy India DPDP Act and GCC privacy regulations.",
  },
  {
    q: "Can you improve B2B digital marketing and technical SEO?",
    a: "Yes. We build revenue-driven growth engines: combining LinkedIn ABM, high-intent Google Search campaigns, technical SEO audits, and closed-loop CRM attribution to turn digital marketing into verified pipeline.",
  },
  {
    q: "How do I start a project or request a strategy review?",
    a: "You can start by booking a Free 30-Minute Tech & Growth Review or filling out our primary contact form. Our senior practice directors will review your requirement and reach out promptly to schedule an exploratory call.",
  },
];

export function HomeFAQSection() {
  const [openIdx, setOpenIdx] = React.useState<number | null>(0);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="max-w-[1760px] mx-auto py-3 sm:py-4 md:py-5 px-4 sm:px-12 lg:px-14 rounded-2xl sm:rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl transition-all duration-300 relative overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-5 space-y-2">
          <ScrollTextFlip>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
              Frequently Asked Questions
            </h2>
          </ScrollTextFlip>
          <p className="text-xs sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium">
            Clear, practical answers about our technology, AI, digital growth, and governance consulting.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-3 sm:space-y-4">
          {homeFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.08}>
                <div className="rounded-xl sm:rounded-2xl border border-[#f7d7b0] dark:border-[#222222] bg-white dark:bg-[#121212] overflow-hidden shadow-sm transition-all duration-200">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left p-3.5 sm:p-5 flex items-center justify-between gap-3 font-bold text-sm sm:text-base text-[#1b2823] dark:text-[#ffffff] hover:text-[#f15e1c] dark:hover:text-[#f15e1c] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f15e1c]"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#f15e1c]/10 text-[#f15e1c] flex items-center justify-center shrink-0">
                        <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <span>{faq.q}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-[#4a5c55] dark:text-[#d3eee4] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#f15e1c]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-3.5 pb-4 sm:px-6 sm:pb-5 pt-1 text-xs sm:text-sm text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed border-t border-[#f7d7b0]/40 dark:border-[#1a1a1a]">
                      <div className="pt-2">{faq.a}</div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
