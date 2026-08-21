"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: keyof React.JSX.IntrinsicElements;
  once?: boolean;
}

export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.04,
  as: Component = "h2",
  once = true,
}: TextRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // Natural custom cubic-bezier
      },
    },
  };

  return (
    <Component className={cn("inline-block overflow-hidden", className)}>
      <motion.span
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-flex flex-wrap gap-x-[0.25em] gap-y-[0.1em]"
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden pb-1">
            <motion.span
              variants={wordVariants}
              className={cn("inline-block", wordClassName)}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Component>
  );
}
