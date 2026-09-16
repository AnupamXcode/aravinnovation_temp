"use client";

import * as React from "react";
import { useSiteConfig, defaultHeroVideoConfig } from "@/lib/site-config";

export function HeroVideoBackground() {
  const { config } = useSiteConfig();
  const videoConfig = config.heroVideoConfig || defaultHeroVideoConfig;
  const isVideoEnabled = videoConfig.enabled !== false;
  const videoSpeed = videoConfig.playbackSpeed || 0.75;
  const overlayOpacityVal = (videoConfig.overlayOpacity ?? 45) / 100;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  const videoSrc = videoConfig.videoUrl || "/videos/Create_a_premium_minimalist_ci.mp4";

  // Check prefers-reduced-motion
  React.useEffect(() => {
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

  // Ensure autoplay triggers reliably on initial load, navigation, and page reload
  React.useEffect(() => {
    if (!videoRef.current || prefersReducedMotion || !isVideoEnabled) return;

    const videoNode = videoRef.current;
    videoNode.muted = true;
    videoNode.defaultMuted = true;
    videoNode.setAttribute("muted", "");
    videoNode.setAttribute("playsinline", "");
    videoNode.playbackRate = videoSpeed;

    const playPromise = videoNode.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Auto-play policy handled safely
      });
    }
  }, [prefersReducedMotion, videoSpeed, isVideoEnabled, videoSrc]);

  // Pause video when out of viewport to conserve battery/GPU, resume when in viewport
  React.useEffect(() => {
    if (!containerRef.current || !videoRef.current || prefersReducedMotion || !isVideoEnabled) {
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
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion, videoSpeed, isVideoEnabled]);

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Single Authoritative Hero Background Video Instance */}
      {isVideoEnabled && isMounted && !videoError && !prefersReducedMotion && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          aria-hidden="true"
          onLoadedMetadata={setVideoPlaybackSpeed}
          onCanPlay={setVideoPlaybackSpeed}
          onPlay={setVideoPlaybackSpeed}
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center sm:object-center transform-gpu transition-opacity duration-500 opacity-100"
        >
          <source src="/videos/hero-bg-mobile.mp4" media="(max-width: 639px)" type="video/mp4" />
          <source src="/videos/hero-bg.webm" type="video/webm" />
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Vignette Overlay for Text Legibility (No blur, crisp video display with mobile adjustment) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9]/85 via-[#FFFDF9]/40 to-[#FFFDF9]/80 sm:bg-gradient-to-r sm:from-[#FFFDF9] sm:via-[#FFFDF9]/40 sm:to-transparent dark:hidden pointer-events-none transition-opacity duration-300 z-[1]"
        style={{ opacity: overlayOpacityVal }}
      />
      <div
        className="hidden dark:block absolute inset-0 bg-gradient-to-b from-[#050505]/85 via-[#050505]/40 to-[#050505]/80 sm:bg-gradient-to-r sm:from-[#050505] sm:via-[#050505]/40 sm:to-transparent pointer-events-none transition-opacity duration-300 z-[1]"
        style={{ opacity: overlayOpacityVal }}
      />
    </div>
  );
}


