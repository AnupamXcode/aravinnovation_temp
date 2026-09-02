"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { aiPortfolioFAQs, FAQItem } from "@/data/faqs";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export function FAQAccordion({
  items = aiPortfolioFAQs,
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about our AI portfolio, enterprise integration, and privacy controls.",
  badge = "FAQ",
  className,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={cn("py-12 sm:py-16 lg:py-20 bg-[#FFFDF9] dark:bg-[#000000]", className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          {badge && (
            <span className="inline-block px-4 py-1.5 bg-[#fab60a]/20 text-[#d49700] dark:text-[#fab60a] rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-4">
              {badge}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#191512] border border-[#EFE2D6] dark:border-[#1f1f1f] rounded-2xl overflow-hidden transition-shadow hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  aria-expanded={isOpen}
                  className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between text-left hover:bg-[#FBF3EA]/50 dark:hover:bg-[#221D18] transition-colors focus:outline-none focus:ring-2 focus:ring-[#f15e1c]/50 rounded-2xl"
                >
                  <span className="text-base sm:text-lg font-semibold text-[#3A2E27] dark:text-[#FAF5EE] pr-4 leading-snug">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="shrink-0 text-[#f15e1c] p-1"
                  >
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-2 bg-[#FBF3EA]/30 dark:bg-[#1A1613]/50 border-t border-[#EFE2D6]/60 dark:border-[#1f1f1f]/60 space-y-3">
                        <p className="text-base sm:text-lg text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed pt-2">
                          {item.answer}
                        </p>
                        {item.category && (
                          <div className="pt-1">
                            <span className="inline-block px-3 py-1 bg-[#f15e1c]/10 text-[#f15e1c] text-xs sm:text-sm font-semibold rounded-full">
                              {item.category}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
