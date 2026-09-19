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

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

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
      playPromise.catch(() => {});
    }
  }, [prefersReducedMotion, videoSpeed, isVideoEnabled, activeVideoSrc]);

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
          className="absolute inset-0 w-full h-full object-cover object-center sm:object-right md:object-center transform-gpu transition-opacity duration-500 opacity-100"
        />
      )}

      {/* Left-to-Right Contrast Overlay for guaranteed text legibility while cinematic video shows on right */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9]/90 via-[#FFFDF9]/60 to-[#FFFDF9]/90 sm:bg-gradient-to-r sm:from-[#FFFDF9] sm:via-[#FFFDF9]/75 sm:to-transparent dark:hidden pointer-events-none transition-opacity duration-300 z-[1]"
        style={{ opacity: overlayOpacityVal }}
      />
      <div
        className="hidden dark:block absolute inset-0 bg-gradient-to-b from-[#050505]/90 via-[#050505]/60 to-[#050505]/90 sm:bg-gradient-to-r sm:from-[#050505] sm:via-[#050505]/75 sm:to-transparent pointer-events-none transition-opacity duration-300 z-[1]"
        style={{ opacity: overlayOpacityVal }}
      />
    </div>
  );
}
