"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface AccordionItemProps {
  id?: string;
  question: string;
  answer: string | React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({
  question,
  answer,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-[#f7d7b0] dark:border-[#1a1a1a] py-4 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left text-base font-semibold text-[#1b2823] dark:text-[#ffffff] transition-colors hover:text-[#f15e1c] focus-visible:outline-none focus-visible:text-[#f15e1c] gap-4"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-[#4a5c55] dark:text-[#d3eee4] transition-transform duration-200 shrink-0",
            isOpen && "rotate-180 text-[#f15e1c]"
          )}
        />
      </button>
      {isOpen && (
        <div className="pt-3 text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed transition-all duration-200">
          {typeof answer === "string" ? <p>{answer}</p> : answer}
        </div>
      )}
    </div>
  );
}

export function Accordion({
  items,
  className,
}: {
  items: { question: string; answer: string | React.ReactNode }[];
  className?: string;
}) {
  return (
    <div className={cn("divide-y divide-[#f7d7b0] dark:divide-[#1a1a1a] rounded-2xl bg-white dark:bg-[#0a0a0a] p-6 sm:p-8 border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-sm", className)}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          defaultOpen={index === 0}
        />
      ))}
    </div>
  );
}
