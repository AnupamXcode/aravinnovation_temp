"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceLayer {
  id: number;
  slug: string;
  name: string;
  description: string;
  tone: string;
}

const serviceLayers: ServiceLayer[] = [
  {
    id: 0,
    slug: "it-strategy-implementation",
    name: "01. IT Strategy & Governance",
    description: "Enterprise roadmaps & cloud governance",
    tone: "#f15e1c", // Arav primary orange
  },
  {
    id: 1,
    slug: "web-application-development",
    name: "02. Web & App Engineering",
    description: "Next.js microservices & high concurrency",
    tone: "#2e936f", // Green
  },
  {
    id: 2,
    slug: "risk-compliance-governance",
    name: "03. Data & DPDP Compliance",
    description: "SOC-2, DPDP Act & automated audit trails",
    tone: "#fab60a", // Gold
  },
  {
    id: 3,
    slug: "digital-marketing-brand-development",
    name: "04. B2B Growth & Tech SEO",
    description: "Closed-loop demand gen & search indexing",
    tone: "#3d5178", // Navy
  },
  {
    id: 4,
    slug: "training-staff-augmentation",
    name: "05. Engineering Augmentation",
    description: "Dedicated pod scaling & senior tech talent",
    tone: "#6d82a6", // Steel Blue
  },
  {
    id: 5,
    slug: "audit-improvement",
    name: "06. Architecture Optimization",
    description: "Performance audits & 100/100 Core Web Vitals",
    tone: "#f7d7b0", // Peach
  },
];

export function ExplodedServicesStack3D() {
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!rootRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;
    let observer: ResizeObserver | null = null;

    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>(".exploded-layer", rootRef.current!);
      const labels = gsap.utils.toArray<HTMLElement>(".exploded-note-item", rootRef.current!);
      const stack = rootRef.current!.querySelector<HTMLElement>(".exploded-stack");
      const track = rootRef.current!.querySelector<HTMLElement>(".exploded-track");
      const bar = rootRef.current!.querySelector<HTMLElement>(".exploded-progress-bar");
      const leadersContainer = rootRef.current!.querySelector<SVGSVGElement>(".exploded-leaders-svg");

      if (!stack || !track || layers.length === 0) return;

      const n = layers.length;

      // Dynamic calculation of leader lines and label collision avoidance
      const place = () => {
        if (!stack || !rootRef.current) return;
        const rootBox = rootRef.current.getBoundingClientRect();
        const stackBox = stack.getBoundingClientRect();

        const byColumn: { left: HTMLElement[]; right: HTMLElement[] } = { left: [], right: [] };

        labels.forEach((label) => {
          const targetId = label.getAttribute("data-for");
          const layerEl = layers.find((l) => l.getAttribute("data-i") === targetId);
          if (!layerEl) return;

          const layerBox = layerEl.getBoundingClientRect();
          const isLeft = label.parentElement?.classList.contains("left");

          const layerCenterY = layerBox.top + layerBox.height / 2 - rootBox.top;
          label.style.top = `${layerCenterY}px`;

          if (isLeft) byColumn.left.push(label);
          else byColumn.right.push(label);
        });

        // De-collision pass: enforce MIN_GAP vertical distance
        const MIN_GAP = 54;
        [byColumn.left, byColumn.right].forEach((col) => {
          col.sort((a, b) => parseFloat(a.style.top || "0") - parseFloat(b.style.top || "0"));
          for (let i = 1; i < col.length; i++) {
            const prevTop = parseFloat(col[i - 1].style.top || "0");
            const currTop = parseFloat(col[i].style.top || "0");
            if (currTop - prevTop < MIN_GAP) {
              col[i].style.top = `${prevTop + MIN_GAP}px`;
            }
          }
        });

        // Draw SVG hairline connectors
        if (leadersContainer) {
          leadersContainer.innerHTML = "";
          labels.forEach((label) => {
            const targetId = label.getAttribute("data-for");
            const layerEl = layers.find((l) => l.getAttribute("data-i") === targetId);
            if (!layerEl) return;

            const layerBox = layerEl.getBoundingClientRect();
            const labelBox = label.getBoundingClientRect();
            const isLeft = label.parentElement?.classList.contains("left");

            const labelPinX = isLeft
              ? labelBox.right - rootBox.left
              : labelBox.left - rootBox.left;
            const labelPinY = labelBox.top + labelBox.height / 2 - rootBox.top;

            const stackAnchorX = isLeft
              ? stackBox.left - rootBox.left
              : stackBox.right - rootBox.left;
            const layerAnchorY = layerBox.top + layerBox.height / 2 - rootBox.top;

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            const d = `M ${labelPinX} ${labelPinY} L ${stackAnchorX} ${labelPinY} L ${stackAnchorX} ${layerAnchorY}`;
            path.setAttribute("d", d);
            path.setAttribute("stroke", label.getAttribute("data-tone") || "#f15e1c");
            path.setAttribute("stroke-width", "1.5");
            path.setAttribute("stroke-dasharray", "3 3");
            path.setAttribute("fill", "none");
            path.setAttribute("opacity", "0.65");
            leadersContainer.appendChild(path);

            const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            dot.setAttribute("cx", `${stackAnchorX}`);
            dot.setAttribute("cy", `${layerAnchorY}`);
            dot.setAttribute("r", "3.5");
            dot.setAttribute("fill", label.getAttribute("data-tone") || "#f15e1c");
            leadersContainer.appendChild(dot);
          });
        }
      };

      // Direct, zero-delay 60 FPS explode transform calculation
      const explode = (p: number) => {
        if (!stack) return;
        const clampedP = Math.max(0, Math.min(1, p));
        const sep = Math.max(70, stack.offsetWidth / 3.4);

        layers.forEach((layer, i) => {
          const desde = (i / n) * 0.34;
          const t = Math.max(0, Math.min(1, (clampedP - desde) / 0.52));
          const eased = 1 - Math.pow(1 - t, 3);
          const z = ((n - 1) / 2 - i) * sep * (0.22 + 0.78 * eased);
          layer.style.transform = `translate3d(0px, 0px, ${z}px)`;
        });

        const lift = (clampedP - 0.5) * -45;
        stack.style.transform = `translateY(${lift}px) rotateX(46deg)`;

        if (bar) {
          bar.style.width = `${clampedP * 100}%`;
        }

        place();
      };

      if (reduce) {
        explode(1);
        return;
      }

      // Lenis smooth scroll
      lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      raf = (t: number) => lenis?.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      explode(0);

      // GSAP ScrollTrigger with pin stage locking
      const stage = rootRef.current!.querySelector<HTMLElement>(".exploded-pinned-stage");
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

      // Direct Window Scroll Listener Fallback for 100% Guaranteed Scroll Scrubbing
      const handleWindowScroll = () => {
        const trackRect = track.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalScrollableDistance = trackRect.height - windowHeight;
        if (totalScrollableDistance <= 0) return;

        const currentScroll = -trackRect.top;
        const progress = Math.max(0, Math.min(1, currentScroll / totalScrollableDistance));
        explode(progress);
      };

      window.addEventListener("scroll", handleWindowScroll, { passive: true });

      if (window.ResizeObserver) {
        observer = new ResizeObserver(place);
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
  }, []);

  return (
    <div ref={rootRef} className="relative w-full select-none overflow-hidden my-12">
      {/* Scroll Pin Track Container (220vh height) */}
      <div className="exploded-track relative w-full h-[220vh]">
        {/* Pinned Stage Container */}
        <div className="exploded-pinned-stage w-full h-screen flex flex-col justify-between py-8 px-4 sm:px-8 lg:px-12 bg-[#FFFDF9] dark:bg-[#12100E] transition-colors duration-300">
          {/* Header Title Bar */}
          <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#253630] pb-4 max-w-7xl mx-auto w-full">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce3d3] dark:bg-[#261f1a] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D EXPLODED ARCHITECTURE STACK</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
                Integrated Enterprise Capabilities
              </h2>
            </div>
            <Link href="/services">
              <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#f15e1c] text-white font-semibold text-xs shadow-md hover:bg-[#d94e10] transition-colors">
                Explore All Practices <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          {/* SVG Leaders Overlay Canvas */}
          <svg className="exploded-leaders-svg absolute inset-0 w-full h-full pointer-events-none z-20" />

          {/* Main 3D Stage */}
          <div
            className="exploded-stage relative flex-1 w-full max-w-7xl mx-auto flex items-center justify-center my-4"
            style={{ perspective: "1400px", perspectiveOrigin: "50% 42%" }}
          >
            {/* Left Column Labels (Layers 0, 2, 4) */}
            <ul className="exploded-notes left absolute left-2 sm:left-8 lg:left-16 z-30 space-y-4 max-w-[200px] sm:max-w-[260px] pointer-events-auto">
              {serviceLayers
                .filter((l) => l.id % 2 === 0)
                .map((layer) => (
                  <li
                    key={layer.id}
                    data-for={layer.id}
                    data-tone={layer.tone}
                    className="exploded-note-item absolute transition-colors duration-200 group"
                  >
                    <Link href={`/services/${layer.slug}`}>
                      <div className="p-3 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#172420]/90 backdrop-blur-md border border-[#f7d7b0] dark:border-[#253630] shadow-lg hover:border-[#f15e1c] transition-all hover:scale-105">
                        <b
                          className="block text-xs sm:text-sm font-bold font-display uppercase tracking-wider"
                          style={{ color: layer.tone }}
                        >
                          {layer.name}
                        </b>
                        <span className="block text-[10px] sm:text-xs text-[#4a5c55] dark:text-[#d3eee4] mt-0.5 font-sans leading-tight">
                          {layer.description}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>

            {/* Central 3D Exploded Ellipse Stack (No CSS transition-transform to allow instant 60 FPS GSAP updates) */}
            <div
              className="exploded-stack relative w-56 h-36 sm:w-80 sm:h-52 md:w-96 md:h-60"
              style={{
                transformStyle: "preserve-3d",
                transform: "translateY(var(--lift, 0px)) rotateX(46deg)",
              }}
            >
              {serviceLayers.map((layer) => (
                <i
                  key={layer.id}
                  data-i={layer.id}
                  className="exploded-layer absolute inset-0 rounded-[50%] shadow-2xl border border-white/40"
                  style={{
                    transformStyle: "preserve-3d",
                    background: `linear-gradient(145deg, color-mix(in srgb, ${layer.tone} 82%, white) 0%, ${layer.tone} 46%, color-mix(in srgb, ${layer.tone} 72%, black) 100%)`,
                    boxShadow: `0 20px 40px -10px ${layer.tone}40, inset 0 2px 6px rgba(255,255,255,0.6)`,
                  }}
                />
              ))}
            </div>

            {/* Right Column Labels (Layers 1, 3, 5) */}
            <ul className="exploded-notes right absolute right-2 sm:right-8 lg:right-16 z-30 space-y-4 max-w-[200px] sm:max-w-[260px] pointer-events-auto">
              {serviceLayers
                .filter((l) => l.id % 2 !== 0)
                .map((layer) => (
                  <li
                    key={layer.id}
                    data-for={layer.id}
                    data-tone={layer.tone}
                    className="exploded-note-item absolute transition-colors duration-200 group"
                  >
                    <Link href={`/services/${layer.slug}`}>
                      <div className="p-3 sm:p-4 rounded-2xl bg-white/90 dark:bg-[#172420]/90 backdrop-blur-md border border-[#f7d7b0] dark:border-[#253630] shadow-lg hover:border-[#f15e1c] transition-all hover:scale-105">
                        <b
                          className="block text-xs sm:text-sm font-bold font-display uppercase tracking-wider"
                          style={{ color: layer.tone }}
                        >
                          {layer.name}
                        </b>
                        <span className="block text-[10px] sm:text-xs text-[#4a5c55] dark:text-[#d3eee4] mt-0.5 font-sans leading-tight">
                          {layer.description}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Bottom Progress Bar & Instruction Indicator */}
          <div className="relative z-20 flex items-center justify-between max-w-7xl mx-auto w-full border-t border-[#f7d7b0] dark:border-[#253630] pt-3 text-xs font-mono text-[#7A6A5F] dark:text-[#B8ACA0]">
            <span>SCROLL TO EXPLODE STACK</span>
            <div className="w-48 h-1.5 rounded-full bg-[#f7d7b0]/50 dark:bg-[#253630] overflow-hidden">
              <div className="exploded-progress-bar h-full bg-[#f15e1c] transition-all duration-75 w-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
