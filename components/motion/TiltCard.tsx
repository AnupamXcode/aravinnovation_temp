"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className,
  maxTilt = 8,
  scale = 1.01,
  perspective = 1000,
  glare = false,
  onClick,
  ...props
}: TiltCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = React.useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPercent = (mouseX / width - 0.5) * 2;
    const yPercent = (mouseY / height - 0.5) * 2;

    const rotateX = -yPercent * maxTilt;
    const rotateY = xPercent * maxTilt;

    setTilt({ x: rotateX, y: rotateY });
    if (glare) {
      setGlarePosition({
        x: (mouseX / width) * 100,
        y: (mouseY / height) * 100,
        opacity: 0.12,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    if (glare) {
      setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: `${perspective}px`,
      }}
      className={cn("relative transition-transform duration-200 ease-out", className)}
      {...props}
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${scale}, ${scale}, ${scale})`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered ? "transform 0.08s ease-out" : "transform 0.35s ease-out",
        }}
        className="h-full w-full relative"
      >
        {children}

        {/* Optional 3D Glare */}
        {glare && (
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 overflow-hidden z-10"
            style={{
              opacity: glarePosition.opacity,
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.3) 0%, rgba(232,103,42,0.08) 40%, transparent 80%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}
