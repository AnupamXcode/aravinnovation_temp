"use client";

import * as React from "react";
import { useSiteConfig } from "@/lib/site-config";
import { useReducedMotion } from "framer-motion";

export function GlobalBackgroundMotion() {
  const { config } = useSiteConfig();
  const shouldReduceMotion = useReducedMotion();

  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = React.useState(0);

  const isEnabled =
    config.websiteEnabled !== false &&
    config.animationsEnabled !== false &&
    config.backgroundMotionEnabled !== false;

  const parallaxEnabled = config.parallaxEnabled !== false && !shouldReduceMotion;

  React.useEffect(() => {
    if (!isEnabled || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxEnabled) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY * 0.05);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isEnabled, parallaxEnabled, shouldReduceMotion]);

  if (!isEnabled) {
    return null;
  }

  // Simplified static background on reduced motion
  if (shouldReduceMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#f15e1c]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-[#2e936f]/10 rounded-full blur-3xl" />
      </div>
    );
  }

  const transformStyle = {
    transform: `translate3d(${mousePos.x}px, ${mousePos.y - scrollY}px, 0)`,
    transition: "transform 0.4s ease-out",
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Soft Ambient Floating Glow Orbs (Brand colors: #f15e1c and #2e936f) */}
      <div
        style={transformStyle}
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-radial from-[#f15e1c]/12 via-[#f7d7b0]/8 to-transparent rounded-full blur-3xl animate-float-slow"
      />
      <div
        style={{
          transform: `translate3d(${-mousePos.x * 0.8}px, ${-mousePos.y * 0.8 + scrollY * 0.5}px, 0)`,
          transition: "transform 0.5s ease-out",
        }}
        className="absolute top-2/3 -right-20 w-[550px] h-[550px] bg-radial from-[#2e936f]/10 via-[#fab60a]/6 to-transparent rounded-full blur-3xl animate-float-delayed"
      />

      {/* Continuously Moving Subtle SVG Digital Constellation Grid (Task F) */}
      <div
        style={transformStyle}
        className="absolute inset-0 opacity-[0.18] dark:opacity-[0.12] flex items-center justify-center"
      >
        <svg
          className="w-full h-full max-w-6xl max-h-[900px] animate-pulse-slow"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Node Graph Lines */}
          <line x1="150" y1="120" x2="320" y2="240" stroke="#f15e1c" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="320" y1="240" x2="550" y2="180" stroke="#2e936f" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="550" y1="180" x2="680" y2="340" stroke="#f15e1c" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="320" y1="240" x2="420" y2="450" stroke="#fab60a" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="150" y1="380" x2="420" y2="450" stroke="#2e936f" strokeWidth="1" strokeDasharray="4 4" />

          {/* Soft Floating Connected Nodes */}
          <circle cx="150" cy="120" r="4" fill="#f15e1c" className="animate-ping-slow" />
          <circle cx="320" cy="240" r="6" fill="#f15e1c" />
          <circle cx="550" cy="180" r="5" fill="#2e936f" />
          <circle cx="680" cy="340" r="4" fill="#f15e1c" />
          <circle cx="420" cy="450" r="5.5" fill="#fab60a" />
          <circle cx="150" cy="380" r="4" fill="#2e936f" />
        </svg>
      </div>
    </div>
  );
}
