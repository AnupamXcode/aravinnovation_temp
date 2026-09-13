"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ScrollTextFlip } from "@/components/motion/ScrollTextFlip";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export const homeFaqs = [
  {
    q: "How does Arav Innovations help businesses combine technology and digital growth?",
    a: "We unify executive IT consulting, custom software engineering, AI workflow automation, performance marketing, and technical SEO into a single connected ecosystem. Rather than managing disconnected vendors, your business gains a single accountable partner focused on revenue outcomes and system efficiency.",
  },
  {
    q: "Which industries does Arav Innovations work with?",
    a: "We work across 10 high-concurrency and highly regulated sectors including FinTech & Financial Services, B2B SaaS, Healthcare & HealthTech, Professional Services, E-Commerce & Retail, Education & EdTech, Industrial Manufacturing, Real Estate, Logistics & Supply Chain, and High-Growth Scale-Ups across India and the UAE.",
  },
  {
    q: "How does Arav Innovations approach a new technology or digital transformation project?",
    a: "Every engagement follows a structured 5-step lifecycle: Discovery & Audit → Architectural Scope → Agile Sprint Engineering → Compliance & Governance Hardening → Production Launch & Continuous Optimization. All intellectual property remains 100% owned by the client.",
  },
  {
    q: "Can Arav Innovations work with an existing internal technology or marketing team?",
    a: "Yes. We frequently embed as specialized staff augmentation pods or fractional practice directors alongside internal CIOs, CTOs, and marketing leads to accelerate release sprints, solve legacy bottlenecks, or scale engineering bandwidth without hiring delays.",
  },
  {
    q: "How can I discuss my requirements with Arav Innovations?",
    a: "You can initiate a discussion by scheduling a consultation or submitting an inquiry via our contact form. A senior practice director will review your project brief under strict confidentiality (NDA) and respond within 1 business day.",
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
      <section className="py-5 sm:py-8 md:py-14 px-4 sm:px-12 lg:px-14 rounded-2xl sm:rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl transition-all duration-300 relative overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-8 space-y-2 sm:space-y-3">
          <Badge variant="secondary" size="md">
            DIRECT ANSWERS &bull; AEO &bull; FAQ
          </Badge>
          <ScrollTextFlip>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
              Frequently Asked Questions
            </h2>
          </ScrollTextFlip>
          <p className="text-xs sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium">
            Clear, verifiable insights into how we engineer technology and accelerate enterprise digital growth.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          {homeFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.1}>
                <div className="rounded-xl sm:rounded-2xl border border-[#f7d7b0] dark:border-[#222222] bg-white dark:bg-[#121212] overflow-hidden shadow-sm transition-all duration-200">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left p-3.5 sm:p-6 flex items-center justify-between gap-3 font-bold text-sm sm:text-lg text-[#1b2823] dark:text-[#ffffff] hover:text-[#f15e1c] dark:hover:text-[#f15e1c] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f15e1c]"
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
                    <div className="px-3.5 pb-4 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed border-t border-[#f7d7b0]/40 dark:border-[#1a1a1a]">
                      <div className="pt-2 sm:pt-3">{faq.a}</div>
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
