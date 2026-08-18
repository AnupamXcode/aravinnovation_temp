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
    <div className="border-b border-[#EFE2D6] py-4 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left text-base font-semibold text-[#3A2E27] transition-colors hover:text-[#E8672A] focus-visible:outline-none focus-visible:text-[#E8672A] gap-4"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-[#7A6A5F] transition-transform duration-200 shrink-0",
            isOpen && "rotate-180 text-[#E8672A]"
          )}
        />
      </button>
      {isOpen && (
        <div className="pt-3 text-sm text-[#7A6A5F] leading-relaxed transition-all duration-200">
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
    <div className={cn("divide-y divide-[#EFE2D6] rounded-2xl bg-white p-6 sm:p-8 border border-[#EFE2D6] shadow-sm", className)}>
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
