"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AravLogoIcon } from "./AravLogoSvg";

export function PageLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = React.useState(false);
  const prevPathRef = React.useRef(pathname);

  // Trigger brief branded transition only when pathname actually changes
  React.useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="arav-page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFFDF9]/95 dark:bg-[#0D0B0A]/95 backdrop-blur-md perspective-1000"
        >
          {/* Ambient Glowing Background */}
          <div className="absolute w-96 h-96 rounded-full bg-[#E8672A]/15 dark:bg-[#E8672A]/20 blur-3xl -z-10 pointer-events-none" />

          {/* 3D Branded Centerpiece */}
          <motion.div
            initial={{ scale: 0.92, rotateX: 8, y: 12 }}
            animate={{ scale: 1, rotateX: 0, y: 0 }}
            exit={{ scale: 0.95, y: -12, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col items-center text-center p-8 rounded-3xl preserve-3d"
          >
            {/* Colorful Logo Emblem with Subtle 3D Pulse */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                rotateZ: [0, 2, -2, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-20 h-20 mb-4 flex items-center justify-center filter drop-shadow-lg"
            >
              <AravLogoIcon className="w-20 h-20" />
            </motion.div>

            {/* Typography */}
            <div className="space-y-1 mb-5">
              <div className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-[#FF5722]">
                Arav <span className="text-[#E84E1B]">Innovations</span>
              </div>
              <p className="text-[10px] sm:text-xs font-semibold tracking-wide text-[#008055] dark:text-[#00C48C]">
                — Elevating Growth, One Click at a Time. —
              </p>
            </div>

            {/* Glowing 3D Progress Indicator */}
            <div className="w-48 h-1.5 rounded-full bg-[#EFE2D6] dark:bg-[#2C241E] overflow-hidden relative shadow-inner">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-full w-1/2 bg-gradient-to-r from-[#00D287] via-[#FF5722] to-[#E6007A] rounded-full shadow-sm"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
