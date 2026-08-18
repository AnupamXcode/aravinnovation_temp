import * as React from "react";

interface AravLogoSvgProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export function AravLogoIcon({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Arav Innovations Icon"
    >
      <defs>
        {/* Yellow to Orange gradient for top-left bar */}
        <linearGradient id="arav-orange-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFB800" />
          <stop offset="60%" stopColor="#FF6B00" />
          <stop offset="100%" stopColor="#E84A5F" />
        </linearGradient>

        {/* Green gradient for top-right arrow */}
        <linearGradient id="arav-green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D287" />
          <stop offset="50%" stopColor="#00A86B" />
          <stop offset="100%" stopColor="#008055" />
        </linearGradient>

        {/* Magenta to Violet gradient */}
        <linearGradient id="arav-purple-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E6007A" />
          <stop offset="50%" stopColor="#BD00FF" />
          <stop offset="100%" stopColor="#FF2E93" />
        </linearGradient>

        {/* Yellow dot gradient */}
        <radialGradient id="arav-dot-yellow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE600" />
          <stop offset="100%" stopColor="#FF9900" />
        </radialGradient>

        {/* Orange dot gradient */}
        <radialGradient id="arav-dot-orange" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF7A00" />
          <stop offset="100%" stopColor="#E84000" />
        </radialGradient>

        {/* Magenta dot gradient */}
        <radialGradient id="arav-dot-magenta" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF2E93" />
          <stop offset="100%" stopColor="#B5007A" />
        </radialGradient>
      </defs>

      {/* Top Left Horizontal Orange Pill */}
      <rect x="5" y="22" width="62" height="15" rx="7.5" fill="url(#arav-orange-grad)" />

      {/* Top Green Right-Angle Arrow */}
      <path
        d="M48 12C48 6.477 52.477 2 58 2H76C87.046 2 96 10.954 96 22V56C96 61.523 91.523 66 86 66C80.477 66 76 61.523 76 56V24C76 20.686 73.314 18 70 18H58C52.477 18 48 15.314 48 12Z"
        fill="url(#arav-green-grad)"
      />

      {/* Middle Magenta/Purple Right-Angle Interlocking Element */}
      <path
        d="M48 22H64C72.837 22 80 29.163 80 38V80C80 85.523 75.523 90 70 90C64.477 90 60 85.523 60 80V44C60 40.686 57.314 38 54 38H48V22Z"
        fill="url(#arav-purple-grad)"
      />

      {/* Cross intersection square with opacity overlay for depth */}
      <rect x="48" y="22" width="16" height="16" rx="4" fill="#C20078" fillOpacity="0.85" />
      <rect x="48" y="38" width="16" height="16" rx="4" fill="#E6007A" fillOpacity="0.95" />

      {/* Network Dots / Nodes */}
      <circle cx="34" cy="50" r="7" fill="url(#arav-dot-magenta)" />
      <circle cx="24" cy="68" r="8" fill="url(#arav-dot-yellow)" />
      <circle cx="45" cy="68" r="9" fill="url(#arav-dot-orange)" />
    </svg>
  );
}

export function AravLogo({
  className = "",
  showTagline = true,
}: AravLogoSvgProps) {
  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      {/* Colorful Logo Emblem */}
      <AravLogoIcon className="w-11 h-11 shrink-0 transition-transform duration-300 group-hover:scale-105" />

      {/* Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline font-display font-extrabold tracking-tight text-xl sm:text-2xl leading-none">
          <span className="text-[#FF5722] dark:text-[#FF6A2C]">Arav</span>
          <span className="text-[#E84E1B] dark:text-[#FF5722] ml-1.5">Innovations</span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="h-[1.5px] w-3.5 bg-[#008055] dark:bg-[#00A86B] shrink-0" />
            <span className="text-[9px] sm:text-[10px] font-medium tracking-wide text-[#008055] dark:text-[#00C48C] whitespace-nowrap">
              Elevating Growth, One Click at a Time.
            </span>
            <span className="h-[1.5px] w-3.5 bg-[#008055] dark:bg-[#00A86B] shrink-0" />
          </div>
        )}
      </div>
    </div>
  );
}
