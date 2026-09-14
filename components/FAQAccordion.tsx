"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { buyerFAQs, FAQItem } from "@/data/faqs";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export function FAQAccordion({
  items = buyerFAQs,
  title = "Frequently Asked Questions",
  subtitle = "Clear, direct answers regarding our technology capabilities, delivery models, and engagement options.",
  badge = "FAQ",
  className,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={cn("py-10 sm:py-14 lg:py-16 bg-[#FFFDF9] dark:bg-[#000000]", className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          {badge && (
            <span className="inline-block px-3.5 py-1 bg-[#fab60a]/20 text-[#d49700] dark:text-[#fab60a] rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
              {badge}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] tracking-tight mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm sm:text-base text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
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
                  className="w-full px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between text-left hover:bg-[#FBF3EA]/50 dark:hover:bg-[#221D18] transition-colors focus:outline-none focus:ring-2 focus:ring-[#f15e1c]/50 rounded-2xl"
                >
                  <span className="text-base sm:text-lg font-semibold text-[#3A2E27] dark:text-[#FAF5EE] pr-4 leading-snug">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="shrink-0 text-[#f15e1c] p-1"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-7 pb-5 pt-1 bg-[#FBF3EA]/30 dark:bg-[#1A1613]/50 border-t border-[#EFE2D6]/60 dark:border-[#1f1f1f]/60 space-y-3">
                        <p className="text-sm sm:text-base text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed pt-1">
                          {item.answer}
                        </p>
                        {item.category && (
                          <div className="pt-1">
                            <span className="inline-block px-3 py-1 bg-[#f15e1c]/10 text-[#f15e1c] text-xs font-semibold rounded-full">
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
