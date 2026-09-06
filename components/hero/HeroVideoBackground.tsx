"use client";

import * as React from "react";
import { useSiteConfig, defaultHeroVideoConfig } from "@/lib/site-config";

export function HeroVideoBackground() {
  const { config } = useSiteConfig();
  const videoConfig = config.heroVideoConfig || defaultHeroVideoConfig;
  const isVideoEnabled = videoConfig.enabled !== false;
  const videoSpeed = videoConfig.playbackSpeed || 0.75;
  const overlayOpacityVal = (videoConfig.overlayOpacity ?? 75) / 100;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const [videoMounted, setVideoMounted] = React.useState(false);

  // Mount video on client after initial paint to guarantee zero impact on FCP/LCP
  React.useEffect(() => {
    setVideoMounted(true);

    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const setVideoPlaybackSpeed = React.useCallback(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSpeed;
    }
  }, [videoSpeed]);

  // Pause video when out of viewport to reduce GPU/CPU draw on mobile
  React.useEffect(() => {
    if (!containerRef.current || !videoRef.current || prefersReducedMotion || !isVideoEnabled || !videoMounted) {
      return;
    }

    const videoNode = videoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoNode.playbackRate = videoSpeed;
            videoNode.play().catch(() => {});
          } else {
            videoNode.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion, videoSpeed, isVideoEnabled, videoMounted]);

  const videoSrc = videoConfig.videoUrl || "/videos/Create_a_premium_minimalist_ci.mp4";

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Single Authoritative Hero Background Video Instance */}
      {isVideoEnabled && !videoError && videoMounted && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          aria-hidden="true"
          onLoadedMetadata={setVideoPlaybackSpeed}
          onCanPlay={setVideoPlaybackSpeed}
          onPlay={setVideoPlaybackSpeed}
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center transform-gpu transition-opacity duration-500 opacity-100"
        />
      )}

      {/* Dynamic Overlay Vignette for Text Readability */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#FFFDF9] via-[#FFFDF9]/40 to-transparent dark:hidden pointer-events-none transition-opacity duration-300 z-[1]"
        style={{ opacity: overlayOpacityVal }}
      />
      <div
        className="hidden dark:block absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent pointer-events-none transition-opacity duration-300 z-[1]"
        style={{ opacity: overlayOpacityVal }}
      />
    </div>
  );
}
