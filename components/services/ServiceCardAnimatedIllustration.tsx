"use client";

import * as React from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";

export interface ServiceCardAnimatedIllustrationProps {
  serviceId: number; // 0 to 7 (Services 01 to 08)
  className?: string;
}

/**
 * Arav Innovations — Premium Animated Service Card Illustrations
 * 
 * 8 Distinctive, continuously animated SVG geometric compositions:
 * 01: IT Strategy — Translucent isometric cube, layered core, dual orbital rings, orbiting nodes.
 * 02: Web & App Dev — Layered software window panels, code nodes, connecting data lines.
 * 03: AI Solutions — Central radiant sphere, dual angled planetary rings, orbiting satellite tokens.
 * 04: Digital Marketing — Concentric radar target rings, upward breakthrough arrow, drifting nodes.
 * 05: SEO Services — Isometric search lens, concentric ripple rings, focus-drifting particles.
 * 06: Risk & Governance — Translucent layered shield with checkmark, green/orange orbital rings.
 * 07: Audit & Improvement — Ascending 3D audit bars, analytical trendline, measurement nodes.
 * 08: Training & Staff — Tiered podium platform, minimal human-node symbols, orbiting talent pods.
 */
export function ServiceCardAnimatedIllustration({
  serviceId,
  className = "",
}: ServiceCardAnimatedIllustrationProps) {
  const shouldReduceMotion = useReducedMotion();

  // Common transitions for organic, non-mechanical floating motion
  const floatTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : {
        duration: 7,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      };

  const slowFloatTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : {
        duration: 9.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      };

  const reverseOrbitTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : {
        duration: 28,
        repeat: Infinity,
        ease: "linear",
      };

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none overflow-visible ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 280 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[280px] max-h-[200px] overflow-visible drop-shadow-[0_8px_16px_rgba(241,94,28,0.06)]"
      >
        <defs>
          {/* Universal Palette Linear Gradients */}
          <linearGradient id="aravOrangeGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f15e1c" />
            <stop offset="60%" stopColor="#fab60a" />
            <stop offset="100%" stopColor="#ffec69" />
          </linearGradient>

          <linearGradient id="aravPeachOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#f7d7b0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f15e1c" stopOpacity="0.25" />
          </linearGradient>

          <linearGradient id="aravGreenAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2e936f" />
            <stop offset="100%" stopColor="#fab60a" />
          </linearGradient>

          <radialGradient id="sphereCoreGlow" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#ffec69" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#fab60a" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#f15e1c" stopOpacity="0.95" />
          </radialGradient>

          <radialGradient id="softAmbientBloom" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f7d7b0" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#f15e1c" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* Dotted Grid Pattern */}
          <pattern id="dotGridPattern" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#f7d7b0" fillOpacity="0.4" />
          </pattern>
        </defs>

        {/* Ambient Soft Glow Behind Illustration */}
        <circle cx="160" cy="100" r="75" fill="url(#softAmbientBloom)" />

        {/* Dotted Minimal Background Grid Accent */}
        <rect x="70" y="40" width="80" height="60" fill="url(#dotGridPattern)" opacity="0.6" />

        {/* ============================================================== */}
        {/* CARD 01: IT STRATEGY & IMPLEMENTATION                         */}
        {/* ============================================================== */}
        {serviceId === 0 && (
          <g>
            {/* Outer Slow Tilted Orbital Ring */}
            <motion.ellipse
              cx="160"
              cy="100"
              rx="68"
              ry="24"
              stroke="#f7d7b0"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              transform="rotate(-18 160 100)"
              animate={shouldReduceMotion ? {} : { rotate: [-18, -10, -26, -18] }}
              transition={slowFloatTransition}
            />

            {/* Inner Tilted Solid Orbital Ring */}
            <motion.ellipse
              cx="160"
              cy="100"
              rx="52"
              ry="18"
              stroke="#f15e1c"
              strokeWidth="1.2"
              strokeOpacity="0.45"
              transform="rotate(22 160 100)"
              animate={shouldReduceMotion ? {} : { rotate: [22, 30, 14, 22] }}
              transition={floatTransition}
            />

            {/* Orbiting Particles */}
            <motion.circle
              cx="108"
              cy="90"
              r="4.5"
              fill="url(#aravOrangeGold)"
              animate={shouldReduceMotion ? {} : { y: [-6, 6, -6], x: [-3, 3, -3] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="212"
              cy="114"
              r="3.5"
              fill="#fab60a"
              animate={shouldReduceMotion ? {} : { y: [5, -5, 5], x: [2, -2, 2] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            />

            {/* Main Floating Isometric Cube Cluster */}
            <motion.g
              animate={shouldReduceMotion ? {} : { y: [-8, 8, -8] }}
              transition={floatTransition}
            >
              {/* Outer Translucent Isometric Glass Cube */}
              {/* Top Face */}
              <polygon
                points="160,56 198,76 160,96 122,76"
                fill="url(#aravPeachOrange)"
                stroke="#f15e1c"
                strokeWidth="1.2"
                strokeOpacity="0.8"
              />
              {/* Left Face */}
              <polygon
                points="122,76 160,96 160,140 122,120"
                fill="#ffffff"
                fillOpacity="0.8"
                stroke="#f7d7b0"
                strokeWidth="1.2"
              />
              {/* Right Face */}
              <polygon
                points="160,96 198,76 198,120 160,140"
                fill="#fef4ec"
                fillOpacity="0.85"
                stroke="#f15e1c"
                strokeWidth="1.2"
                strokeOpacity="0.7"
              />

              {/* Inner Suspended Golden Core Cube */}
              <motion.g
                animate={shouldReduceMotion ? {} : { scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "160px 98px" }}
              >
                <polygon
                  points="160,78 178,88 160,98 142,88"
                  fill="url(#aravOrangeGold)"
                  opacity="0.85"
                />
                <polygon
                  points="142,88 160,98 160,118 142,108"
                  fill="#f15e1c"
                  opacity="0.8"
                />
                <polygon
                  points="160,98 178,88 178,108 160,118"
                  fill="#fab60a"
                  opacity="0.9"
                />
              </motion.g>

              {/* Core Light Reflection Highlight */}
              <line x1="160" y1="56" x2="160" y2="96" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.8" />
            </motion.g>

            {/* Small Foreground Satellite Sphere */}
            <motion.circle
              cx="130"
              cy="132"
              r="6"
              fill="url(#sphereCoreGlow)"
              animate={shouldReduceMotion ? {} : { y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
          </g>
        )}

        {/* ============================================================== */}
        {/* CARD 02: WEB & APPLICATION DEVELOPMENT                        */}
        {/* ============================================================== */}
        {serviceId === 1 && (
          <g>
            {/* Background Layer 1: Outlined Browser Panel */}
            <motion.g
              animate={shouldReduceMotion ? {} : { y: [5, -5, 5] }}
              transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <rect
                x="148"
                y="52"
                width="64"
                height="82"
                rx="8"
                fill="#ffffff"
                fillOpacity="0.65"
                stroke="#f7d7b0"
                strokeWidth="1.2"
              />
              <line x1="148" y1="64" x2="212" y2="64" stroke="#f7d7b0" strokeWidth="1" />
              <circle cx="156" cy="58" r="1.8" fill="#f15e1c" fillOpacity="0.6" />
              <circle cx="162" cy="58" r="1.8" fill="#fab60a" fillOpacity="0.6" />
              <circle cx="168" cy="58" r="1.8" fill="#2e936f" fillOpacity="0.6" />
            </motion.g>

            {/* Middle Layer 2: Primary Tilted Software Window */}
            <motion.g
              animate={shouldReduceMotion ? {} : { y: [-6, 6, -6] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            >
              <rect
                x="128"
                y="68"
                width="70"
                height="86"
                rx="8"
                fill="#ffffff"
                fillOpacity="0.9"
                stroke="#f15e1c"
                strokeWidth="1.4"
                strokeOpacity="0.85"
              />
              <line x1="128" y1="82" x2="198" y2="82" stroke="#f7d7b0" strokeWidth="1" />
              <circle cx="138" cy="75" r="2" fill="#f15e1c" />
              <circle cx="145" cy="75" r="2" fill="#fab60a" />
              <circle cx="152" cy="75" r="2" fill="#2e936f" />

              {/* Code Editor Wireframe Lines */}
              <line x1="138" y1="94" x2="170" y2="94" stroke="#f15e1c" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="138" y1="104" x2="186" y2="104" stroke="#f7d7b0" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="146" y1="114" x2="178" y2="114" stroke="#fab60a" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="146" y1="124" x2="188" y2="124" stroke="#2e936f" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="138" y1="134" x2="160" y2="134" stroke="#f7d7b0" strokeWidth="1.5" strokeLinecap="round" />
            </motion.g>

            {/* Foreground Layer 3: Floating Component Card with Code Tag */}
            <motion.g
              animate={shouldReduceMotion ? {} : { y: [-10, 8, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <rect
                x="108"
                y="96"
                width="50"
                height="44"
                rx="6"
                fill="url(#aravOrangeGold)"
                fillOpacity="0.15"
                stroke="#fab60a"
                strokeWidth="1.2"
              />
              <rect x="112" y="100" width="42" height="36" rx="4" fill="#ffffff" fillOpacity="0.9" />
              {/* Minimalist Code Symbol */}
              <path
                d="M125 118L120 114L125 110M141 118L146 114L141 110"
                stroke="#f15e1c"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.g>

            {/* Floating Connector Spheres */}
            <motion.circle
              cx="195"
              cy="146"
              r="5"
              fill="url(#sphereCoreGlow)"
              animate={shouldReduceMotion ? {} : { y: [-4, 4, -4], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="116"
              cy="74"
              r="3.5"
              fill="#fab60a"
              animate={shouldReduceMotion ? {} : { y: [4, -4, 4] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        )}

        {/* ============================================================== */}
        {/* CARD 03: AI PORTFOLIO / AI SOLUTIONS                          */}
        {/* ============================================================== */}
        {serviceId === 2 && (
          <g>
            {/* Outer Slow Tilted Orbital Ring 1 */}
            <motion.ellipse
              cx="160"
              cy="100"
              rx="70"
              ry="26"
              stroke="#f7d7b0"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              transform="rotate(32 160 100)"
              animate={shouldReduceMotion ? {} : { rotate: [32, 40, 24, 32] }}
              transition={slowFloatTransition}
            />

            {/* Counter-Tilted Inner Orbital Ring 2 */}
            <motion.ellipse
              cx="160"
              cy="100"
              rx="60"
              ry="22"
              stroke="#f15e1c"
              strokeWidth="1.3"
              strokeOpacity="0.55"
              transform="rotate(-28 160 100)"
              animate={shouldReduceMotion ? {} : { rotate: [-28, -20, -36, -28] }}
              transition={floatTransition}
            />

            {/* Third Transverse Ring for 3D Gyroscope Effect */}
            <ellipse
              cx="160"
              cy="100"
              rx="46"
              ry="16"
              stroke="#fab60a"
              strokeWidth="1.1"
              strokeOpacity="0.4"
              transform="rotate(75 160 100)"
            />

            {/* Orbiting Satellite AI Tokens */}
            <motion.circle
              cx="110"
              cy="80"
              r="4.5"
              fill="url(#aravOrangeGold)"
              animate={shouldReduceMotion ? {} : { y: [-6, 6, -6], x: [-3, 3, -3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="215"
              cy="118"
              r="4"
              fill="#fab60a"
              animate={shouldReduceMotion ? {} : { y: [6, -6, 6], x: [3, -3, 3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
            <motion.circle
              cx="145"
              cy="138"
              r="3"
              fill="#2e936f"
              animate={shouldReduceMotion ? {} : { y: [-3, 3, -3] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            />

            {/* Central Radiant Neural Sphere */}
            <motion.g
              animate={shouldReduceMotion ? {} : { y: [-7, 7, -7], scale: [0.98, 1.02, 0.98] }}
              transition={floatTransition}
              style={{ transformOrigin: "160px 100px" }}
            >
              {/* Outer Halo */}
              <circle cx="160" cy="100" r="30" fill="#f7d7b0" fillOpacity="0.25" />
              
              {/* Core Glowing Sphere */}
              <circle
                cx="160"
                cy="100"
                r="24"
                fill="url(#sphereCoreGlow)"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeOpacity="0.9"
              />

              {/* Specular Light Reflection Arc */}
              <path
                d="M148 90C152 84 162 82 168 86"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeOpacity="0.9"
              />
            </motion.g>
          </g>
        )}

        {/* ============================================================== */}
        {/* CARD 04: DIGITAL MARKETING & BRAND DEVELOPMENT                */}
        {/* ============================================================== */}
        {serviceId === 3 && (
          <g>
            {/* Concentric Radar / Target Discs in Isometric Perspective */}
            <motion.g
              animate={shouldReduceMotion ? {} : { y: [-4, 4, -4] }}
              transition={slowFloatTransition}
            >
              {/* Outer Disc Base */}
              <ellipse
                cx="160"
                cy="110"
                rx="68"
                ry="28"
                fill="url(#aravPeachOrange)"
                stroke="#f7d7b0"
                strokeWidth="1.2"
              />

              {/* Middle Target Ring */}
              <ellipse
                cx="160"
                cy="110"
                rx="48"
                ry="20"
                fill="#ffffff"
                fillOpacity="0.75"
                stroke="#fab60a"
                strokeWidth="1.2"
                strokeOpacity="0.8"
              />

              {/* Inner Bullseye Disc */}
              <ellipse
                cx="160"
                cy="110"
                rx="28"
                ry="12"
                fill="#ffffff"
                stroke="#f15e1c"
                strokeWidth="1.4"
              />
            </motion.g>

            {/* Ascending 3D Growth Arrow Breakthrough */}
            <motion.g
              animate={shouldReduceMotion ? {} : { y: [-10, 6, -10], x: [3, -3, 3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Arrow Shaft & Head with Gradient Fill */}
              <path
                d="M152 120L172 70L158 72L176 54L192 78L178 76L164 122Z"
                fill="url(#aravOrangeGold)"
                stroke="#ffffff"
                strokeWidth="1.2"
              />
              {/* Dimensional Shadow Side on Arrow */}
              <path
                d="M164 122L178 76L192 78L176 54L174 58L160 120Z"
                fill="#d8480d"
                fillOpacity="0.35"
              />
            </motion.g>

            {/* Floating Orbiting Conversion Spheres */}
            <motion.circle
              cx="118"
              cy="98"
              r="5"
              fill="url(#sphereCoreGlow)"
              animate={shouldReduceMotion ? {} : { y: [-5, 5, -5] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="208"
              cy="92"
              r="4"
              fill="#fab60a"
              animate={shouldReduceMotion ? {} : { y: [5, -5, 5] }}
              transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />
            <motion.circle
              cx="135"
              cy="62"
              r="3"
              fill="#f15e1c"
              animate={shouldReduceMotion ? {} : { y: [-3, 3, -3] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
          </g>
        )}

        {/* ============================================================== */}
        {/* CARD 05: SEO SERVICES                                         */}
        {/* ============================================================== */}
        {serviceId === 4 && (
          <g>
            {/* Concentric Search Ripple Waves */}
            <motion.ellipse
              cx="156"
              cy="96"
              rx="64"
              ry="26"
              stroke="#f7d7b0"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              transform="rotate(-15 156 96)"
              animate={shouldReduceMotion ? {} : { scale: [0.95, 1.05, 0.95], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "156px 96px" }}
            />

            <motion.ellipse
              cx="156"
              cy="96"
              rx="48"
              ry="20"
              stroke="#fab60a"
              strokeWidth="1.2"
              strokeOpacity="0.5"
              transform="rotate(20 156 96)"
              animate={shouldReduceMotion ? {} : { rotate: [20, 28, 12, 20] }}
              transition={slowFloatTransition}
            />

            {/* Central 3D Magnifying Glass Assembly */}
            <motion.g
              animate={shouldReduceMotion ? {} : { y: [-8, 8, -8], rotate: [-2, 4, -2] }}
              transition={floatTransition}
              style={{ transformOrigin: "156px 96px" }}
            >
              {/* Lens Outer Glass Rim */}
              <circle
                cx="156"
                cy="92"
                r="30"
                fill="url(#aravPeachOrange)"
                stroke="#f15e1c"
                strokeWidth="2"
              />
              
              {/* Inner Lens Glass Highlight */}
              <circle cx="156" cy="92" r="22" fill="#ffffff" fillOpacity="0.8" stroke="#f7d7b0" strokeWidth="1" />
              
              {/* Concentric Focus Reticle */}
              <circle cx="156" cy="92" r="10" stroke="#fab60a" strokeWidth="1.2" strokeDasharray="2 2" />
              <circle cx="156" cy="92" r="3" fill="#f15e1c" />

              {/* Specular Arc on Lens */}
              <path
                d="M142 80C148 74 158 74 166 78"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Angled 3D Isometric Handle */}
              <path
                d="M178 114L208 144C211 147 211 151 208 154C205 157 201 157 198 154L168 124Z"
                fill="url(#aravOrangeGold)"
                stroke="#d8480d"
                strokeWidth="1.2"
              />
            </motion.g>

            {/* Floating High-Intent Keyword Nodes */}
            <motion.circle
              cx="114"
              cy="118"
              r="4.5"
              fill="url(#sphereCoreGlow)"
              animate={shouldReduceMotion ? {} : { y: [-5, 5, -5] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="198"
              cy="70"
              r="3.5"
              fill="#fab60a"
              animate={shouldReduceMotion ? {} : { y: [5, -5, 5] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </g>
        )}

        {/* ============================================================== */}
        {/* CARD 06: RISK, COMPLIANCE & GOVERNANCE                        */}
        {/* ============================================================== */}
        {serviceId === 5 && (
          <g>
            {/* Tilted Concentric Green/Gold Security Rings */}
            <motion.ellipse
              cx="160"
              cy="100"
              rx="66"
              ry="24"
              stroke="#2e936f"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              strokeOpacity="0.5"
              transform="rotate(-20 160 100)"
              animate={shouldReduceMotion ? {} : { rotate: [-20, -12, -28, -20] }}
              transition={slowFloatTransition}
            />

            <motion.ellipse
              cx="160"
              cy="100"
              rx="50"
              ry="18"
              stroke="#f15e1c"
              strokeWidth="1.2"
              strokeOpacity="0.4"
              transform="rotate(25 160 100)"
              animate={shouldReduceMotion ? {} : { rotate: [25, 33, 17, 25] }}
              transition={floatTransition}
            />

            {/* Main Layered 3D Protective Shield */}
            <motion.g
              animate={shouldReduceMotion ? {} : { y: [-7, 7, -7] }}
              transition={floatTransition}
            >
              {/* Back Shield Glass Outline */}
              <path
                d="M160 48L194 62C194 92 180 122 160 136C140 122 126 92 126 62L160 48Z"
                fill="#ffffff"
                fillOpacity="0.75"
                stroke="#f7d7b0"
                strokeWidth="1.2"
              />

              {/* Front Shield Plate with Green & Orange Gradients */}
              <path
                d="M160 56L186 68C186 92 174 116 160 128C146 116 134 92 134 68L160 56Z"
                fill="url(#aravPeachOrange)"
                stroke="#2e936f"
                strokeWidth="1.5"
              />

              {/* Central Verification Checkmark Emblem */}
              <circle cx="160" cy="88" r="14" fill="#ffffff" stroke="#2e936f" strokeWidth="1.2" />
              <path
                d="M153 88L158 93L167 83"
                stroke="#2e936f"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.g>

            {/* Floating Compliance Node Spheres */}
            <motion.circle
              cx="116"
              cy="80"
              r="4.5"
              fill="url(#aravGreenAccent)"
              animate={shouldReduceMotion ? {} : { y: [-5, 5, -5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="205"
              cy="114"
              r="4"
              fill="url(#sphereCoreGlow)"
              animate={shouldReduceMotion ? {} : { y: [5, -5, 5] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </g>
        )}

        {/* ============================================================== */}
        {/* CARD 07: AUDIT & IMPROVEMENT                                  */}
        {/* ============================================================== */}
        {serviceId === 6 && (
          <g>
            {/* Base Grid Plane in Isometric Projection */}
            <motion.g
              animate={shouldReduceMotion ? {} : { y: [-3, 3, -3] }}
              transition={slowFloatTransition}
            >
              <ellipse cx="160" cy="136" rx="64" ry="18" fill="#fef8f3" stroke="#f7d7b0" strokeWidth="1" />
            </motion.g>

            {/* Ascending 3D Isometric Financial & System Audit Bars */}
            {/* Bar 1 (Short) */}
            <motion.g
              animate={shouldReduceMotion ? {} : { y: [-4, 4, -4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            >
              <polygon points="122,110 134,104 146,110 134,116" fill="#f7d7b0" stroke="#f15e1c" strokeWidth="1" />
              <polygon points="122,110 134,116 134,136 122,130" fill="#ffffff" stroke="#f7d7b0" strokeWidth="1" />
              <polygon points="134,116 146,110 146,130 134,136" fill="#fef0e4" stroke="#f15e1c" strokeWidth="1" strokeOpacity="0.5" />
            </motion.g>

            {/* Bar 2 (Medium) */}
            <motion.g
              animate={shouldReduceMotion ? {} : { y: [-6, 6, -6] }}
              transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            >
              <polygon points="144,92 156,86 168,92 156,98" fill="#fab60a" stroke="#f15e1c" strokeWidth="1" />
              <polygon points="144,92 156,98 156,136 144,130" fill="#ffffff" stroke="#f7d7b0" strokeWidth="1" />
              <polygon points="156,98 168,92 168,130 156,136" fill="#fce5d4" stroke="#f15e1c" strokeWidth="1" strokeOpacity="0.6" />
            </motion.g>

            {/* Bar 3 (Tall Peak Benchmark) */}
            <motion.g
              animate={shouldReduceMotion ? {} : { y: [-8, 8, -8] }}
              transition={{ duration: 7.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <polygon points="166,70 178,64 190,70 178,76" fill="url(#aravOrangeGold)" stroke="#f15e1c" strokeWidth="1.2" />
              <polygon points="166,70 178,76 178,136 166,130" fill="#ffffff" stroke="#f7d7b0" strokeWidth="1" />
              <polygon points="178,76 190,70 190,130 178,136" fill="url(#aravOrangeGold)" fillOpacity="0.8" stroke="#f15e1c" strokeWidth="1" />
            </motion.g>

            {/* Analytical Upward Trend Curve Connecting Bars */}
            <motion.path
              d="M116 118Q134 104 156 88T188 56"
              stroke="#f15e1c"
              strokeWidth="1.8"
              strokeDasharray="4 3"
              fill="none"
              animate={shouldReduceMotion ? {} : { strokeDashoffset: [0, -28] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />

            {/* Trend Node Spheres */}
            <motion.circle
              cx="188"
              cy="56"
              r="4.5"
              fill="url(#sphereCoreGlow)"
              animate={shouldReduceMotion ? {} : { y: [-6, 6, -6], scale: [0.95, 1.1, 0.95] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="110"
              cy="126"
              r="3.5"
              fill="#2e936f"
              animate={shouldReduceMotion ? {} : { y: [3, -3, 3] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        )}

        {/* ============================================================== */}
        {/* CARD 08: TRAINING & STAFF AUGMENTATION                        */}
        {/* ============================================================== */}
        {serviceId === 7 && (
          <g>
            {/* Outer Circular Talent Orbit Ring */}
            <motion.ellipse
              cx="160"
              cy="104"
              rx="76"
              ry="28"
              stroke="#f7d7b0"
              strokeWidth="1.2"
              strokeDasharray="4 4"
              animate={shouldReduceMotion ? {} : { rotate: [0, 360] }}
              transition={reverseOrbitTransition}
              style={{ transformOrigin: "160px 104px" }}
            />

            {/* Stepped Central Circular Talent Podium / Platform */}
            <motion.g
              animate={shouldReduceMotion ? {} : { y: [-6, 6, -6] }}
              transition={floatTransition}
            >
              {/* Lower Tier Podium */}
              <ellipse cx="160" cy="116" rx="52" ry="18" fill="#fef8f3" stroke="#f7d7b0" strokeWidth="1.2" />
              <path d="M108 116C108 126 131 134 160 134C189 134 212 126 212 116V124C212 134 189 142 160 142C131 142 108 134 108 124Z" fill="#ffffff" stroke="#f7d7b0" strokeWidth="1" />

              {/* Upper Tier Platform */}
              <ellipse cx="160" cy="100" rx="36" ry="13" fill="url(#aravPeachOrange)" stroke="#f15e1c" strokeWidth="1.2" />

              {/* Central Key Talent Node Silhouette */}
              <circle cx="160" cy="74" r="7" fill="url(#sphereCoreGlow)" stroke="#ffffff" strokeWidth="1" />
              <path
                d="M148 94C148 86 153 83 160 83C167 83 172 86 172 94"
                fill="none"
                stroke="#f15e1c"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </motion.g>

            {/* Orbiting Satellite Talent Pod Nodes */}
            <motion.g
              animate={shouldReduceMotion ? {} : { y: [5, -5, 5] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Left Pod */}
              <circle cx="104" cy="94" r="5" fill="#fab60a" stroke="#ffffff" strokeWidth="1" />
              <path d="M96 108C96 103 100 101 104 101C108 101 112 103 112 108" fill="none" stroke="#fab60a" strokeWidth="1.4" strokeLinecap="round" />
            </motion.g>

            <motion.g
              animate={shouldReduceMotion ? {} : { y: [-5, 5, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            >
              {/* Right Pod */}
              <circle cx="216" cy="112" r="5" fill="url(#aravOrangeGold)" stroke="#ffffff" strokeWidth="1" />
              <path d="M208 126C208 121 212 119 216 119C220 119 224 121 224 126" fill="none" stroke="#f15e1c" strokeWidth="1.4" strokeLinecap="round" />
            </motion.g>

            {/* Ambient Floating Micro-Tokens */}
            <circle cx="132" cy="62" r="3" fill="#2e936f" opacity="0.8" />
            <circle cx="188" cy="128" r="3.5" fill="#fab60a" opacity="0.8" />
          </g>
        )}
      </svg>
    </div>
  );
}
