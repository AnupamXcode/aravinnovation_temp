"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export function PageLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = React.useState(false);
  const prevPathRef = React.useRef(pathname);

  // Trigger brief 3D branded transition only when pathname actually changes
  React.useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 550);
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
          exit={{ opacity: 0, transition: { duration: 0.25, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFFDF9]/90 dark:bg-[#0D0B0A]/90 backdrop-blur-md perspective-1000"
        >
          {/* Ambient Glowing Background */}
          <div className="absolute w-96 h-96 rounded-full bg-[#E8672A]/15 dark:bg-[#E8672A]/20 blur-3xl -z-10 pointer-events-none" />

          {/* 3D Branded Centerpiece */}
          <motion.div
            initial={{ scale: 0.9, rotateX: 10, y: 15 }}
            animate={{ scale: 1, rotateX: 0, y: 0 }}
            exit={{ scale: 0.95, y: -15, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center text-center p-8 rounded-3xl preserve-3d"
          >
            {/* 3D Rotating Geometric Motif */}
            <div className="relative w-20 h-20 mb-5 flex items-center justify-center preserve-3d">
              {/* Outer Rotating Glowing Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl border-2 border-dashed border-[#E8672A]/60 shadow-lg"
              />

              {/* Inner Counter-Rotating Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-xl border border-[#F4A97F]/70"
              />

              {/* 3D Core Cube / Prism */}
              <motion.div
                animate={{
                  rotateY: [0, 180, 360],
                  rotateX: [0, 180, 0],
                  scale: [0.95, 1.1, 0.95],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E8672A] to-[#F4A97F] shadow-lg shadow-[#E8672A]/40 flex items-center justify-center text-white"
              >
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </motion.div>
            </div>

            {/* Typography */}
            <div className="space-y-1 mb-5">
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-[#3A2E27] dark:text-[#FAF5EE]"
              >
                ARAV<span className="text-[#E8672A]">.</span>INNOVATIONS
              </motion.div>
              <p className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#7A6A5F] dark:text-[#B8ACA0]">
                Technology &bull; Strategy &bull; Digital Growth
              </p>
            </div>

            {/* Glowing 3D Progress Indicator */}
            <div className="w-48 h-1.5 rounded-full bg-[#EFE2D6] dark:bg-[#2C241E] overflow-hidden relative shadow-inner">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-[#E8672A] to-[#F4A97F] rounded-full shadow-sm"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
