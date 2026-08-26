  "use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useMagneticHover } from "@/lib/motion-system";
import { Button, ButtonProps } from "@/components/ui/button";

interface MagneticButtonProps extends ButtonProps {
  children: React.ReactNode;
  threshold?: number;
  strength?: number;
}

export function MagneticButton({
  children,
  threshold = 90,
  strength = 0.3,
  className,
  ...props
}: MagneticButtonProps) {
  const { ref, x, y } = useMagneticHover(threshold, strength);

  return (
    <motion.div ref={ref} style={{ x, y }} className="inline-block">
      <Button className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}
