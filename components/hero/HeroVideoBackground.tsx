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
  const [isMobile, setIsMobile] = React.useState(false);

  // Mount video on client after initial paint to guarantee zero impact on FCP/LCP
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener("change", handleChange);

      if (mobile) {
        // On mobile, delay mounting video by 300ms so H1 paint completes first
        const timer = setTimeout(() => {
          setVideoMounted(true);
        }, 300);
        return () => {
          clearTimeout(timer);
          mediaQuery.removeEventListener("change", handleChange);
        };
      } else {
        setVideoMounted(true);
        return () => mediaQuery.removeEventListener("change", handleChange);
      }
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

  const desktopSrc = videoConfig.videoUrl || "/videos/hero-bg.mp4";

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Dynamic Authoritative Hero Background Video */}
      {isVideoEnabled && !videoError && videoMounted && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
          aria-hidden="true"
          onLoadedMetadata={setVideoPlaybackSpeed}
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center lg:object-right-top transform-gpu transition-opacity duration-500 opacity-100"
        >
          {isMobile ? (
            <source src="/videos/hero-bg-mobile.mp4" type="video/mp4" />
          ) : (
            <>
              <source media="(max-width: 767px)" src="/videos/hero-bg-mobile.mp4" type="video/mp4" />
              <source media="(min-width: 768px)" src={desktopSrc} type="video/mp4" />
            </>
          )}
        </video>
      )}

      {/* Dynamic CMS Overlay Vignette for Text Readability */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#FFFDF9] via-[#FFFDF9]/40 to-transparent dark:hidden pointer-events-none transition-opacity duration-300"
        style={{ opacity: overlayOpacityVal }}
      />
      <div
        className="hidden dark:block absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent pointer-events-none transition-opacity duration-300"
        style={{ opacity: overlayOpacityVal }}
      />
    </div>
  );
}
