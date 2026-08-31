"use client";

import * as React from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  Compass,
  TrendingUp,
  Code2,
  ShieldCheck,
  BarChart3,
  Users2,
  Search,
  Cpu,
  Sparkles,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { useSiteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />,
  TrendingUp: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />,
  Code2: <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />,
  BarChart3: <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />,
  Users2: <Users2 className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />,
  Search: <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />,
  Cpu: <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0" />,
};

export function InteractiveServiceStack3D() {
  const { config } = useSiteConfig();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [activeServiceIdx, setActiveServiceIdx] = React.useState<number>(0);
  const [revealedCount, setRevealedCount] = React.useState<number>(1);
  const [hoveredIdx, setHoveredIdx] = React.useState<number | null>(null);

  const practicesConfig = config.enterprisePracticesConfig;
  const isEnabled =
    config.websiteEnabled !== false &&
    config.servicesVisible !== false &&
    practicesConfig?.enabled !== false;

  const serviceLayers = (practicesConfig?.serviceLayers || []).filter(
    (l) => l.visible !== false
  );

  React.useEffect(() => {
    if (!rootRef.current || !isEnabled) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;
    let observer: ResizeObserver | null = null;

    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>(".service-disc-layer", rootRef.current!);
      const cards = gsap.utils.toArray<HTMLElement>(".service-side-card", rootRef.current!);
      const stack = rootRef.current!.querySelector<HTMLElement>(".service-stack-container");
      const track = rootRef.current!.querySelector<HTMLElement>(".service-stack-track");
      const bar = rootRef.current!.querySelector<HTMLElement>(".service-progress-bar");
      const leadersContainer = rootRef.current!.querySelector<SVGSVGElement>(".service-leaders-svg");
      const stage = rootRef.current!.querySelector<HTMLElement>(".service-pinned-stage");

      if (!stack || !track || layers.length === 0) return;

      const n = serviceLayers.length;

      // Draw SVG connector paths, disc rim node dots & arrowheads locked frame-by-frame to live stage bounding rect
      const place = (
        currentRevealedCount: number,
        currentActiveIdx: number,
        currentHoveredIdx: number | null = null
      ) => {
        if (!stack || !stage || !leadersContainer) return;
        const stageBox = stage.getBoundingClientRect();

        leadersContainer.innerHTML = "";

        cards.forEach((card) => {
          const targetId = card.getAttribute("data-for");
          const idx = parseInt(targetId || "0", 10);
          const isRevealed = idx < currentRevealedCount;
          const isActive = idx === currentActiveIdx;
          const isHovered = idx === currentHoveredIdx;
          const isHighlighted = isActive || isHovered;

          if (!isRevealed) return;

          const layerEl = layers.find((l) => l.getAttribute("data-i") === targetId);
          if (!layerEl) return;

          const layerBox = layerEl.getBoundingClientRect();
          const cardBox = card.getBoundingClientRect();
          const isLeft = card.parentElement?.classList.contains("left");
          const color = card.getAttribute("data-tone") || "#f15e1c";

          // Card target pin coordinate relative to pinned stage
          const cardPinX = isLeft
            ? cardBox.right - stageBox.left - 2
            : cardBox.left - stageBox.left + 2;
          const cardPinY = cardBox.top + cardBox.height / 2 - stageBox.top;

          // Disc outer rim node coordinate relative to pinned stage
          const stackAnchorX = isLeft
            ? layerBox.left - stageBox.left + 16
            : layerBox.right - stageBox.left - 16;
          const layerAnchorY = layerBox.top + layerBox.height / 2 - stageBox.top;

          // Disc rim node dot with hover pulse scale
          const discNode = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          discNode.setAttribute("cx", `${stackAnchorX}`);
          discNode.setAttribute("cy", `${layerAnchorY}`);
          discNode.setAttribute("r", isHighlighted ? "6.5" : "4");
          discNode.setAttribute("fill", color);
          discNode.setAttribute("stroke", "#ffffff");
          discNode.setAttribute("stroke-width", "2");
          leadersContainer.appendChild(discNode);

          // Curved S-connector path with hover glow transition
          const deltaX = Math.abs(cardPinX - stackAnchorX);
          const midX1 = isLeft ? stackAnchorX - deltaX * 0.4 : stackAnchorX + deltaX * 0.4;
          const midX2 = isLeft ? cardPinX + deltaX * 0.4 : cardPinX - deltaX * 0.4;
          const d = `M ${stackAnchorX} ${layerAnchorY} C ${midX1} ${layerAnchorY}, ${midX2} ${cardPinY}, ${cardPinX} ${cardPinY}`;
          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("d", d);
          path.setAttribute("stroke", color);
          path.setAttribute("stroke-width", isHighlighted ? "3" : "1.75");
          path.setAttribute("stroke-dasharray", isHighlighted ? "none" : "4 4");
          path.setAttribute("fill", "none");
          path.setAttribute("opacity", isHighlighted ? "1" : "0.7");
          leadersContainer.appendChild(path);

          // Terminating Arrowhead pointing directly at card border
          const arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
          const arrowSize = isHighlighted ? "8" : "6";
          const arrowSizeNum = isHighlighted ? 8 : 6;
          const arrowD = isLeft
            ? `M ${cardPinX + arrowSizeNum * 1.4} ${cardPinY - arrowSizeNum} L ${cardPinX} ${cardPinY} L ${cardPinX + arrowSizeNum * 1.4} ${cardPinY + arrowSizeNum} Z`
            : `M ${cardPinX - arrowSizeNum * 1.4} ${cardPinY - arrowSizeNum} L ${cardPinX} ${cardPinY} L ${cardPinX - arrowSizeNum * 1.4} ${cardPinY + arrowSizeNum} Z`;
          arrow.setAttribute("d", arrowD);
          arrow.setAttribute("fill", color);
          arrow.setAttribute("opacity", isHighlighted ? "1" : "0.85");
          leadersContainer.appendChild(arrow);

          // Flowing data-pulse dot on highlighted connector line
          if (isHighlighted) {
            const pulseDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            pulseDot.setAttribute("cx", `${(stackAnchorX + cardPinX) / 2}`);
            pulseDot.setAttribute("cy", `${(layerAnchorY + cardPinY) / 2}`);
            pulseDot.setAttribute("r", "4.5");
            pulseDot.setAttribute("fill", color);
            pulseDot.setAttribute("class", "animate-ping");
            leadersContainer.appendChild(pulseDot);
          }
        });
      };

      // 60 FPS explode transform calculation with hover state reaction
      const explode = (p: number, currentHovered: number | null = hoveredIdx) => {
        if (!stack) return;
        const clampedP = Math.max(0, Math.min(1, p));

        // Determine revealed count (1 to n) and active index
        const currentCount = Math.min(n, Math.max(1, Math.floor(clampedP * n) + 1));
        const activeIdx = Math.min(n - 1, Math.floor(clampedP * n));

        setRevealedCount(currentCount);
        setActiveServiceIdx(activeIdx);

        const stepY = 38; // Vertical separation of 3D stack discs (grand stack size)
        const stepZ = 22; // Perspective depth Z offset

        // Transform 3D Stack Architectural Discs vertically along Y & Z
        layers.forEach((layer) => {
          const targetId = layer.getAttribute("data-i");
          const isCore = targetId === "core";
          const i = isCore ? 3.5 : parseInt(targetId || "0", 10);
          const isRevealed = isCore || i < currentCount;
          const isActive = !isCore && i === activeIdx;
          const isHovered = !isCore && i === currentHovered;
          const isHighlighted = isActive || isHovered;

          const layerP = Math.max(0, Math.min(1, (clampedP - (isCore ? 0.4 : i / n)) * n));
          const eased = 1 - Math.pow(1 - layerP, 3);
          const factor = isRevealed ? 0.22 + 0.78 * eased : 0.08;

          // Vertical Y separation (Layer 0 at top, Layer 7 at bottom)
          const y = (i - (n - 1) / 2) * stepY * factor;
          // Perspective Z depth
          const baseZ = ((n - 1) / 2 - i) * stepZ * factor;
          const z = isHighlighted ? baseZ + 42 : baseZ;
          const scale = isHighlighted ? 1.08 : isRevealed ? 1 : 0.94;
          const opacity = isRevealed ? (isHighlighted ? 1 : 0.88) : 0.35;

          layer.style.transform = `translate3d(0px, ${y}px, ${z}px) scale(${scale})`;
          layer.style.opacity = `${opacity}`;
          layer.style.zIndex = `${25 - (isCore ? 4 : Math.floor(i))}`;
        });

        // Synchronize Side Cards vertically with their corresponding disc layer (Y_i)
        cards.forEach((card) => {
          const targetId = card.getAttribute("data-for");
          const i = parseInt(targetId || "0", 10);
          const isRevealed = i < currentCount;
          const isActive = i === activeIdx;
          const isHovered = i === currentHovered;
          const isHighlighted = isActive || isHovered;
          const isLeft = card.parentElement?.classList.contains("left");

          // Calculate vertical position Y_i matching disc layer i
          const layerP = Math.max(0, Math.min(1, (clampedP - i / n) * n));
          const eased = 1 - Math.pow(1 - layerP, 3);
          const factor = isRevealed ? 0.22 + 0.78 * eased : 0.08;
          const y_i = (i - (n - 1) / 2) * stepY * factor;

          if (isRevealed) {
            const emergeProgress = Math.max(0, Math.min(1, (clampedP - i / n) * n * 2));
            const cardX = isLeft ? 0 : 0;
            card.style.opacity = `${emergeProgress}`;
            card.style.transform = isHighlighted
              ? `translate3d(${cardX}px, ${y_i}px, 20px) scale(1.05)`
              : `translate3d(${cardX}px, ${y_i}px, 0px) scale(1)`;
            card.style.pointerEvents = "auto";
          } else {
            card.style.opacity = "0";
            card.style.transform = `translate3d(${isLeft ? "-25px" : "25px"}, ${y_i}px, 0px) scale(0.92)`;
            card.style.pointerEvents = "none";
          }
        });

        const lift = (clampedP - 0.5) * -20;
        stack.style.transform = `translateY(${lift}px) rotateX(42deg)`;

        if (bar) {
          bar.style.width = `${clampedP * 100}%`;
        }

        // Throttle SVG connector placement to next animation frame to prevent scroll-blocking reflows
        if (scheduledPlace === null) {
          scheduledPlace = requestAnimationFrame(() => {
            scheduledPlace = null;
            place(currentCount, activeIdx, currentHovered);
          });
        }
      };

      let scheduledPlace: number | null = null;

      if (reduce) {
        explode(1);
        return;
      }

      // Lenis smooth scroll ticker initialization
      if (practicesConfig?.scrollAnimationEnabled !== false) {
        lenis = new Lenis();
        lenis.on("scroll", ScrollTrigger.update);
        raf = (t: number) => lenis?.raf(t * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
      }

      explode(0);

      // Pinned GSAP ScrollTrigger Stage scrub
      const triggerInstance = ScrollTrigger.create({
        trigger: track,
        pin: stage,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
        pinSpacing: true,
        onUpdate: (self) => explode(self.progress),
        onRefresh: (self) => explode(self.progress),
        invalidateOnRefresh: true,
      });

      // Passive window scroll listener fallback
      const handleWindowScroll = () => {
        const trackRect = track.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalDistance = trackRect.height - windowHeight;
        if (totalDistance <= 0) return;

        const current = -trackRect.top;
        const progress = Math.max(0, Math.min(1, current / totalDistance));
        explode(progress);
      };

      window.addEventListener("scroll", handleWindowScroll, { passive: true });

      if (window.ResizeObserver) {
        observer = new ResizeObserver(() => place(revealedCount, activeServiceIdx));
        observer.observe(stack);
      }

      document.fonts?.ready.then(() => {
        if (!cancelled) ScrollTrigger.refresh();
      });

      return () => {
        window.removeEventListener("scroll", handleWindowScroll);
        triggerInstance.kill();
      };
    }, rootRef);

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (raf) gsap.ticker.remove(raf);
      lenis?.off("scroll", ScrollTrigger.update);
      lenis?.destroy();
      ctx.revert();
    };
  }, [isEnabled, practicesConfig, activeServiceIdx, revealedCount, serviceLayers]);

  if (!isEnabled || serviceLayers.length === 0) {
    return null;
  }

  // Left column (Even i: 0 IT Strategy, 2 Web & App, 4 Audit, 6 SEO)
  // Right column (Odd i: 1 Digital Marketing, 3 Risk & Compliance, 5 Training, 7 AI Portfolio)
  const leftServices = serviceLayers.filter((_, idx) => idx % 2 === 0);
  const rightServices = serviceLayers.filter((_, idx) => idx % 2 !== 0);

  const topStackLayers = serviceLayers.slice(0, 4);
  const bottomStackLayers = serviceLayers.slice(4);

  return (
    <div ref={rootRef} className="relative w-full select-none overflow-hidden my-6 md:my-12" id="services">
      {/* Pinned Scroll Track Container (260vh for smooth 8-step synchronized reveal) */}
      <div className="service-stack-track relative w-full h-auto md:h-[260vh]">
        {/* Pinned Viewport Stage */}
        <div className="service-pinned-stage w-full h-auto md:h-screen flex flex-col justify-between py-4 md:py-6 px-4 sm:px-8 lg:px-12 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300">
          {/* Top Header Section */}
          <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#253630] pb-4 max-w-7xl mx-auto w-full">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OUR CORE SERVICES ECOSYSTEM</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
                Enterprise Technology Practices
              </h2>
              <p className="text-xs sm:text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
                Scroll to explore how our integrated practices work together to drive enterprise growth.
              </p>
            </div>
            <Link href="/services">
              <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#f15e1c] text-white font-semibold text-xs shadow-md hover:bg-[#d94e10] transition-all hover:shadow-lg hover:shadow-[#f15e1c]/25">
                Explore All Services <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          {/* SVG Leaders & Arrowhead Connectors Overlay */}
          <svg className="service-leaders-svg absolute inset-0 w-full h-full pointer-events-none z-20" />

          {/* Main Desktop Vertical 3D Stage (Hidden on mobile portrait) */}
          <div
            className="hidden md:flex service-stage relative flex-1 w-full max-w-6xl mx-auto items-center justify-between my-2 px-3"
            style={{ perspective: "1400px", perspectiveOrigin: "50% 42%" }}
          >
            {/* LEFT COLUMN SERVICE CARDS (0: IT Strategy, 2: Web & App, 4: Audit, 6: SEO) */}
            <ul className="exploded-notes left relative z-40 space-y-3 w-[220px] lg:w-[255px] pointer-events-auto">
              {leftServices.map((layer) => {
                const isActive = layer.id === activeServiceIdx;
                const isHovered = layer.id === hoveredIdx;
                const isHighlit = isActive || isHovered;

                return (
                  <li
                    key={layer.id}
                    data-for={layer.id}
                    data-tone={layer.tone}
                    className="service-side-card"
                  >
                    <Link
                      href={layer.href}
                      onMouseEnter={() => setHoveredIdx(layer.id)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className="block group"
                    >
                      <div
                        className={cn(
                          "p-3.5 rounded-2xl backdrop-blur-md border shadow-lg cursor-pointer transition-all duration-300 transform group-hover:scale-[1.05] group-hover:-translate-y-1",
                          isHighlit
                            ? "bg-white dark:bg-[#1a2924] shadow-2xl"
                            : "bg-white/95 dark:bg-[#172420]/95 border-[#f7d7b0] dark:border-[#253630]"
                        )}
                        style={{
                          borderColor: isHighlit ? layer.tone : undefined,
                          boxShadow: isHighlit
                            ? `0 20px 40px -10px ${layer.tone}45, 0 0 0 3px ${layer.tone}35`
                            : undefined,
                          background: isHighlit
                            ? `linear-gradient(135deg, color-mix(in srgb, ${layer.tone} 14%, white) 0%, white 100%)`
                            : undefined,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shadow-xs shrink-0 text-white font-bold transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                            style={{ backgroundColor: layer.tone }}
                          >
                            {iconMap[layer.icon] || <Sparkles className="w-4 h-4 text-white" />}
                          </div>
                          <b
                            className="text-xs font-bold font-display uppercase tracking-wider line-clamp-1 transition-colors duration-300"
                            style={{ color: isHighlit ? layer.tone : undefined }}
                          >
                            {layer.name}
                          </b>
                        </div>
                        <p className="text-[10px] text-[#4a5c55] dark:text-[#d3eee4] leading-snug line-clamp-2">
                          {layer.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CENTRAL VERTICAL 3D DISC STACK WITH ARAV DIGITAL CORE AT CENTER */}
            <div className="relative flex flex-col items-center justify-center z-30 mx-auto">
              <div
                className="service-stack-container relative w-64 h-44 sm:w-80 sm:h-56 md:w-[440px] md:h-72 cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "translateY(var(--lift, 0px)) rotateX(42deg)",
                }}
              >
                {/* Top 4 Discs */}
                {topStackLayers.map((layer) => {
                  const isActive = layer.id === activeServiceIdx;
                  const isHovered = layer.id === hoveredIdx;
                  const isHighlit = isActive || isHovered;

                  return (
                    <Link key={layer.id} href={layer.href}>
                      <i
                        data-i={layer.id}
                        onMouseEnter={() => setHoveredIdx(layer.id)}
                        onMouseLeave={() => setHoveredIdx(null)}
                        className={cn(
                          "service-disc-layer absolute inset-0 rounded-[50%] border-b-4 border-t border-white/70 flex items-center justify-center px-6 text-center select-none shadow-2xl group transition-all duration-300",
                          isHighlit
                            ? "ring-4 border-b-white scale-105"
                            : "border-b-black/30 hover:border-b-white"
                        )}
                        style={{
                          transformStyle: "preserve-3d",
                          background: `linear-gradient(145deg, color-mix(in srgb, ${layer.tone} 88%, white) 0%, ${layer.tone} 52%, color-mix(in srgb, ${layer.tone} 75%, black) 100%)`,
                          boxShadow: isHighlit
                            ? `0 30px 60px -5px ${layer.tone}90, 0 0 35px ${layer.tone}70, inset 0 2px 12px rgba(255,255,255,0.9)`
                            : `0 15px 30px -8px ${layer.tone}40, inset 0 2px 6px rgba(255,255,255,0.5)`,
                        }}
                      >
                        <div className="relative z-10 flex items-center justify-center gap-2.5 text-white pointer-events-none drop-shadow-md">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/40 group-hover:scale-110">
                            {iconMap[layer.icon] || <Sparkles className="w-4 h-4 text-white" />}
                          </div>
                          <span className="text-xs sm:text-sm font-extrabold font-display tracking-tight text-white drop-shadow-lg">
                            {layer.name}
                          </span>
                        </div>
                      </i>
                    </Link>
                  );
                })}

                {/* Center Core Layer: ARAV DIGITAL CORE */}
                <i
                  data-i="core"
                  className="service-disc-layer absolute inset-0 rounded-[50%] border-b-4 border-t border-white flex items-center justify-center px-6 text-center select-none shadow-2xl bg-white dark:bg-[#1c2a25] border-b-[#f15e1c] ring-4 ring-[#f15e1c]/40"
                  style={{
                    transformStyle: "preserve-3d",
                    boxShadow: "0 25px 50px -5px rgba(241,94,28,0.5), inset 0 2px 10px rgba(255,255,255,0.9)",
                  }}
                >
                  <div className="relative z-10 flex items-center justify-center gap-3 text-[#1b2823] dark:text-white drop-shadow-md">
                    <div className="w-8 h-8 rounded-full bg-[#f15e1c] flex items-center justify-center shrink-0 shadow-md">
                      <Sparkles className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs sm:text-sm font-extrabold font-display tracking-tight text-[#f15e1c] dark:text-[#f15e1c]">
                        ARAV DIGITAL CORE
                      </span>
                      <span className="block text-[9px] font-mono font-medium text-[#4a5c55] dark:text-[#d3eee4]">
                        Integrated Enterprise Capabilities
                      </span>
                    </div>
                  </div>
                </i>

                {/* Bottom 4 Discs */}
                {bottomStackLayers.map((layer) => {
                  const isActive = layer.id === activeServiceIdx;
                  const isHovered = layer.id === hoveredIdx;
                  const isHighlit = isActive || isHovered;

                  return (
                    <Link key={layer.id} href={layer.href}>
                      <i
                        data-i={layer.id}
                        onMouseEnter={() => setHoveredIdx(layer.id)}
                        onMouseLeave={() => setHoveredIdx(null)}
                        className={cn(
                          "service-disc-layer absolute inset-0 rounded-[50%] border-b-4 border-t border-white/70 flex items-center justify-center px-6 text-center select-none shadow-2xl group transition-all duration-300",
                          isHighlit
                            ? "ring-4 border-b-white scale-105"
                            : "border-b-black/30 hover:border-b-white"
                        )}
                        style={{
                          transformStyle: "preserve-3d",
                          background: `linear-gradient(145deg, color-mix(in srgb, ${layer.tone} 88%, white) 0%, ${layer.tone} 52%, color-mix(in srgb, ${layer.tone} 75%, black) 100%)`,
                          boxShadow: isHighlit
                            ? `0 30px 60px -5px ${layer.tone}90, 0 0 35px ${layer.tone}70, inset 0 2px 12px rgba(255,255,255,0.9)`
                            : `0 15px 30px -8px ${layer.tone}40, inset 0 2px 6px rgba(255,255,255,0.5)`,
                        }}
                      >
                        <div className="relative z-10 flex items-center justify-center gap-2.5 text-white pointer-events-none drop-shadow-md">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/40 group-hover:scale-110">
                            {iconMap[layer.icon] || <Sparkles className="w-4 h-4 text-white" />}
                          </div>
                          <span className="text-xs sm:text-sm font-extrabold font-display tracking-tight text-white drop-shadow-lg">
                            {layer.name}
                          </span>
                        </div>
                      </i>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN SERVICE CARDS (1: Digital Marketing, 3: Risk & Compliance, 5: Training, 7: AI Portfolio) */}
            <ul className="exploded-notes right relative z-40 space-y-2 w-[220px] lg:w-[250px] pointer-events-auto">
              {rightServices.map((layer) => {
                const isActive = layer.id === activeServiceIdx;
                const isHovered = layer.id === hoveredIdx;
                const isHighlit = isActive || isHovered;

                return (
                  <li
                    key={layer.id}
                    data-for={layer.id}
                    data-tone={layer.tone}
                    className="service-side-card"
                  >
                    <Link
                      href={layer.href}
                      onMouseEnter={() => setHoveredIdx(layer.id)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      className="block group"
                    >
                      <div
                        className={cn(
                          "p-3 rounded-2xl backdrop-blur-md border shadow-lg cursor-pointer transition-all duration-300 transform group-hover:scale-[1.05] group-hover:-translate-y-1",
                          isHighlit
                            ? "bg-white dark:bg-[#1a2924] shadow-2xl"
                            : "bg-white/95 dark:bg-[#172420]/95 border-[#f7d7b0] dark:border-[#253630]"
                        )}
                        style={{
                          borderColor: isHighlit ? layer.tone : undefined,
                          boxShadow: isHighlit
                            ? `0 20px 40px -10px ${layer.tone}45, 0 0 0 3px ${layer.tone}35`
                            : undefined,
                          background: isHighlit
                            ? `linear-gradient(135deg, color-mix(in srgb, ${layer.tone} 14%, white) 0%, white 100%)`
                            : undefined,
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shadow-xs shrink-0 text-white font-bold transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                            style={{ backgroundColor: layer.tone }}
                          >
                            {iconMap[layer.icon] || <Sparkles className="w-4 h-4 text-white" />}
                          </div>
                          <b
                            className="text-xs font-bold font-display uppercase tracking-wider line-clamp-1 transition-colors duration-300"
                            style={{ color: isHighlit ? layer.tone : undefined }}
                          >
                            {layer.name}
                          </b>
                        </div>
                        <p className="text-[10px] text-[#4a5c55] dark:text-[#d3eee4] leading-snug line-clamp-2">
                          {layer.description}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* DEDICATED RESPONSIVE MOBILE STACK (Visible on mobile viewports) */}
          <div className="flex md:hidden flex-col gap-3 my-4 px-1">
            {serviceLayers.map((layer, idx) => {
              const isActive = layer.id === activeServiceIdx;

              return (
                <Link key={layer.id} href={layer.href} className="w-full">
                  <div
                    className={cn(
                      "p-4 rounded-2xl border flex items-center justify-between gap-3 shadow-md",
                      isActive
                        ? "bg-white dark:bg-[#1a2924] border-[#f15e1c] ring-2 ring-[#f15e1c]/40 shadow-xl"
                        : "bg-white/90 dark:bg-[#172420]/90 border-[#f7d7b0] dark:border-[#253630]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                        style={{ backgroundColor: layer.tone }}
                      >
                        {iconMap[layer.icon] || <Sparkles className="w-5 h-5 text-white" />}
                      </div>
                      <div>
                        <h4
                          className="text-xs font-bold font-display uppercase tracking-wider"
                          style={{ color: isActive ? "#f15e1c" : layer.tone }}
                        >
                          {layer.name}
                        </h4>
                        <p className="text-[11px] text-[#4a5c55] dark:text-[#d3eee4] line-clamp-1">
                          {layer.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#f15e1c] shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom Navigation Indicator Bar */}
          <div className="relative z-20 flex items-center justify-between max-w-7xl mx-auto w-full border-t border-[#f7d7b0] dark:border-[#253630] pt-3 text-xs font-mono text-[#7A6A5F] dark:text-[#B8ACA0]">
            <span className="inline-flex items-center gap-1.5">
              <span>Scroll Down to Explore Each Practice</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#f15e1c] animate-bounce" />
            </span>
            <div className="w-44 h-1.5 rounded-full bg-[#f7d7b0]/50 dark:bg-[#253630] overflow-hidden">
              <div className="service-progress-bar h-full bg-[#f15e1c] transition-all duration-100 w-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
