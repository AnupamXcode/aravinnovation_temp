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
  const [activeVideoSrc, setActiveVideoSrc] = React.useState<string | null>(null);

  const desktopVideoSrc = videoConfig.videoUrl || "/videos/Create_a_premium_minimalist_ci.mp4";

  // Determine single authoritative video source based on screen width and defer loading past initial LCP paint
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Defer setting video source until after initial paint so H1 paints immediately without network thrashing
    const isMobile = window.innerWidth < 640;
    const targetSrc = isMobile ? "/videos/hero-bg-mobile.mp4" : desktopVideoSrc;

    const mountVideo = () => {
      setActiveVideoSrc(targetSrc);
    };

    if ("requestIdleCallback" in window) {
      const handle = (window as any).requestIdleCallback(mountVideo, { timeout: 1500 });
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
        if ("cancelIdleCallback" in window) {
          (window as any).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(mountVideo, 100);
      return () => {
        mediaQuery.removeEventListener("change", handleChange);
        clearTimeout(timer);
      };
    }
  }, [desktopVideoSrc]);

  const setVideoPlaybackSpeed = React.useCallback(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSpeed;
    }
  }, [videoSpeed]);

  // Ensure autoplay triggers reliably once source is mounted
  React.useEffect(() => {
    if (!videoRef.current || prefersReducedMotion || !isVideoEnabled || !activeVideoSrc) return;

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
  }, [prefersReducedMotion, videoSpeed, isVideoEnabled, activeVideoSrc]);

  // Pause video when out of viewport to conserve battery/GPU, resume when in viewport
  React.useEffect(() => {
    if (!containerRef.current || !videoRef.current || prefersReducedMotion || !isVideoEnabled || !activeVideoSrc) {
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
  }, [prefersReducedMotion, videoSpeed, isVideoEnabled, activeVideoSrc]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Single Authoritative Hero Background Video Instance */}
      {isVideoEnabled && activeVideoSrc && !videoError && !prefersReducedMotion && (
        <video
          ref={videoRef}
          src={activeVideoSrc}
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



