"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ScrollTextFlip } from "@/components/motion/ScrollTextFlip";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export const homeFaqs = [
  {
    q: "How does Arav Innovations combine technology with digital growth?",
    a: "Arav Innovations operates as an integrated partner. Rather than separating software development from digital marketing, our engineers, AI specialists, and performance marketers collaborate. This ensures every platform we build is engineered for speed, technical SEO, user conversion, and long-term scalability.",
  },
  {
    q: "Which regions does Arav Innovations serve?",
    a: "We maintain active operations in India and the UAE, serving growing mid-market businesses, enterprise organizations, SaaS companies, and digital brands across the Middle East, Asia, and global markets.",
  },
  {
    q: "What is Answer Engine Optimization (AEO) and why is it essential?",
    a: "Answer Engine Optimization (AEO) optimizes your web presence so that conversational AI engines—such as ChatGPT, Claude, Gemini, and Google SGE—can easily extract and cite your company as the direct answer to user queries. While traditional SEO targets blue link rankings, AEO focuses on positioning your brand as the direct AI answer.",
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
      <section className="py-8 md:py-14 px-6 sm:px-12 lg:px-14 rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-2xl transition-all duration-300 relative overflow-hidden">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <Badge variant="secondary" size="md">
            DIRECT ANSWERS &bull; AEO &bull; FAQ
          </Badge>
          <ScrollTextFlip>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff]">
              Frequently Asked Questions
            </h2>
          </ScrollTextFlip>
          <p className="text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium">
            Clear, verifiable insights into how we engineer technology and accelerate enterprise digital growth.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {homeFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.1}>
                <div className="rounded-2xl border border-[#f7d7b0] dark:border-[#222222] bg-white dark:bg-[#121212] overflow-hidden shadow-sm transition-all duration-200">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#1b2823] dark:text-[#ffffff] hover:text-[#f15e1c] dark:hover:text-[#f15e1c] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f15e1c]"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#f15e1c]/10 text-[#f15e1c] flex items-center justify-center shrink-0">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <span>{faq.q}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#4a5c55] dark:text-[#d3eee4] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#f15e1c]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-1 text-sm sm:text-base text-[#4a5c55] dark:text-[#d3eee4] font-medium leading-relaxed border-t border-[#f7d7b0]/40 dark:border-[#1a1a1a]">
                      <div className="pt-3">{faq.a}</div>
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
