"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Sparkles, ArrowRight, Compass, Code2, ShieldCheck, TrendingUp, Users2, BarChart3, Search, Cpu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceLayer {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  tone: string;
  side: "left" | "right";
  icon: React.ReactNode;
}

const serviceLayers: ServiceLayer[] = [
  {
    id: 0,
    slug: "it-strategy-implementation",
    name: "01. IT Strategy & Governance",
    shortName: "IT Strategy",
    description: "Enterprise roadmaps & cloud architecture",
    tone: "#f15e1c",
    side: "left",
    icon: <Compass className="w-4 h-4 text-[#f15e1c]" />,
  },
  {
    id: 1,
    slug: "digital-marketing-brand-development",
    name: "02. Digital Marketing & Brand",
    shortName: "Digital Marketing",
    description: "Growth strategy, acquisition & brand positioning",
    tone: "#3d5178",
    side: "right",
    icon: <TrendingUp className="w-4 h-4 text-[#3d5178]" />,
  },
  {
    id: 2,
    slug: "web-app-development",
    name: "03. Web & Application Engineering",
    shortName: "Web Development",
    description: "Full-stack React & Next.js cloud platforms",
    tone: "#2e936f",
    side: "left",
    icon: <Code2 className="w-4 h-4 text-[#2e936f]" />,
  },
  {
    id: 3,
    slug: "risk-compliance-governance",
    name: "04. Risk, Compliance & Governance",
    shortName: "Risk & Compliance",
    description: "ISO 27001, SOC 2 & DPDP Act compliance",
    tone: "#fab60a",
    side: "right",
    icon: <ShieldCheck className="w-4 h-4 text-[#fab60a]" />,
  },
  {
    id: 4,
    slug: "audit-improvement",
    name: "05. Audit & Performance Optimization",
    shortName: "Audit & Optimization",
    description: "System diagnostics, bottleneck remediation & web vitals",
    tone: "#e55215",
    side: "left",
    icon: <BarChart3 className="w-4 h-4 text-[#e55215]" />,
  },
  {
    id: 5,
    slug: "training-staff-augmentation",
    name: "06. Training & Staff Augmentation",
    shortName: "Staff Augmentation",
    description: "Dedicated developer pods & tech upskilling",
    tone: "#2e936f",
    side: "right",
    icon: <Users2 className="w-4 h-4 text-[#2e936f]" />,
  },
  {
    id: 6,
    slug: "seo-services",
    name: "07. SEO & Technical Organic Search",
    shortName: "SEO Services",
    description: "Technical search foundation, intent & authority",
    tone: "#f15e1c",
    side: "left",
    icon: <Search className="w-4 h-4 text-[#f15e1c]" />,
  },
  {
    id: 7,
    slug: "ai-portfolio",
    name: "08. Applied AI Engineering Systems",
    shortName: "AI Portfolio",
    description: "Enterprise RAG pipelines & intelligent workflow automation",
    tone: "#fab60a",
    side: "right",
    icon: <Cpu className="w-4 h-4 text-[#fab60a]" />,
  },
];

export function ExplodedServicesStack3D() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (!rootRef.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let lenis: Lenis | null = null;
    let raf: ((time: number) => void) | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const ctx = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>(".exploded-layer", rootRef.current!);
      const cards = gsap.utils.toArray<HTMLElement>(".exploded-card-item", rootRef.current!);
      const stack = rootRef.current!.querySelector<HTMLElement>(".exploded-stack");
      const track = rootRef.current!.querySelector<HTMLElement>(".exploded-track");
      const bar = rootRef.current!.querySelector<HTMLElement>(".exploded-progress-bar");
      const svg = svgRef.current;

      if (!stack || !track || layers.length === 0) return;

      const n = layers.length;

      // Dynamic calculation of connector lines & compact card positioning
      const updateConnectors = () => {
        if (!stack || !stageRef.current || !svg) return;
        const isMobile = window.innerWidth < 768;
        const stageBox = stageRef.current.getBoundingClientRect();
        const stackBox = stack.getBoundingClientRect();

        // On mobile, bypass SVG connectors to prevent clutter
        if (isMobile) {
          svg.innerHTML = "";
          return;
        }

        const leftCards: HTMLElement[] = [];
        const rightCards: HTMLElement[] = [];

        // 1. Position cards vertically aligned with corresponding stack layer centers
        cards.forEach((card) => {
          const targetIdStr = card.getAttribute("data-for");
          if (!targetIdStr) return;
          const targetId = parseInt(targetIdStr, 10);
          const layerEl = layers.find((l) => l.getAttribute("data-i") === targetIdStr);
          if (!layerEl) return;

          const layerBox = layerEl.getBoundingClientRect();
          const layerCenterY = layerBox.top + layerBox.height / 2 - stageBox.top;
          card.style.top = `${layerCenterY}px`;

          const side = card.getAttribute("data-side");
          if (side === "left") leftCards.push(card);
          else rightCards.push(card);
        });

        // 2. Enforce compact vertical spacing (MIN_GAP) to keep cards close to each other
        const MIN_GAP = 56; // compact pixels between card centers
        [leftCards, rightCards].forEach((col) => {
          col.sort((a, b) => parseFloat(a.style.top || "0") - parseFloat(b.style.top || "0"));
          for (let i = 1; i < col.length; i++) {
            const prevTop = parseFloat(col[i - 1].style.top || "0");
            const currTop = parseFloat(col[i].style.top || "0");
            if (currTop - prevTop < MIN_GAP) {
              col[i].style.top = `${prevTop + MIN_GAP}px`;
            }
          }
        });

        // 3. Draw anchored SVG connectors between exact layer edge & card edge
        svg.innerHTML = "";
        cards.forEach((card) => {
          const targetIdStr = card.getAttribute("data-for");
          if (!targetIdStr) return;
          const layerEl = layers.find((l) => l.getAttribute("data-i") === targetIdStr);
          if (!layerEl) return;

          const layerBox = layerEl.getBoundingClientRect();
          const cardBox = card.getBoundingClientRect();
          const side = card.getAttribute("data-side");
          const tone = card.getAttribute("data-tone") || "#f15e1c";

          // Calculate precise relative anchor points
          const layerAnchorY = layerBox.top + layerBox.height / 2 - stageBox.top;
          const cardAnchorY = cardBox.top + cardBox.height / 2 - stageBox.top;

          let stackAnchorX = 0;
          let cardAnchorX = 0;

          if (side === "left") {
            stackAnchorX = layerBox.left - stageBox.left + 24; // Left edge of stack layer
            cardAnchorX = cardBox.right - stageBox.left; // Right edge of left card
          } else {
            stackAnchorX = layerBox.right - stageBox.left - 24; // Right edge of stack layer
            cardAnchorX = cardBox.left - stageBox.left; // Left edge of right card
          }

          // Build smooth orthogonal SVG path
          const midX = (stackAnchorX + cardAnchorX) / 2;
          const d = `M ${cardAnchorX} ${cardAnchorY} L ${midX} ${cardAnchorY} L ${midX} ${layerAnchorY} L ${stackAnchorX} ${layerAnchorY}`;

          const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
          path.setAttribute("d", d);
          path.setAttribute("stroke", tone);
          path.setAttribute("stroke-width", "1.75");
          path.setAttribute("stroke-dasharray", "4 4");
          path.setAttribute("fill", "none");
          path.setAttribute("opacity", "0.85");
          svg.appendChild(path);

          // Dot at stack layer anchor
          const dotStack = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          dotStack.setAttribute("cx", `${stackAnchorX}`);
          dotStack.setAttribute("cy", `${layerAnchorY}`);
          dotStack.setAttribute("r", "4");
          dotStack.setAttribute("fill", tone);
          svg.appendChild(dotStack);

          // Dot at card anchor
          const dotCard = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          dotCard.setAttribute("cx", `${cardAnchorX}`);
          dotCard.setAttribute("cy", `${cardAnchorY}`);
          dotCard.setAttribute("r", "4");
          dotCard.setAttribute("fill", tone);
          svg.appendChild(dotCard);
        });
      };

      // 60 FPS explode transform calculation with compact layer separation
      const explode = (p: number) => {
        if (!stack) return;
        const clampedP = Math.max(0, Math.min(1, p));
        const isMobile = window.innerWidth < 768;

        // Tight stack layer separation (keeps stack & cards very close during scroll)
        const sep = isMobile ? 18 : 24;

        layers.forEach((layer, i) => {
          const desde = (i / n) * 0.3;
          const t = Math.max(0, Math.min(1, (clampedP - desde) / 0.55));
          const eased = 1 - Math.pow(1 - t, 3);
          const z = ((n - 1) / 2 - i) * sep * (0.2 + 0.8 * eased);
          layer.style.transform = `translate3d(0px, 0px, ${z}px)`;
        });

        const lift = (clampedP - 0.5) * -18;
        stack.style.transform = `translateY(${lift}px) rotateX(46deg)`;

        if (bar) {
          bar.style.width = `${clampedP * 100}%`;
        }

        updateConnectors();
      };

      if (reduce) {
        explode(1);
        return;
      }

      // Lenis smooth scroll integration
      lenis = new Lenis();
      lenis.on("scroll", ScrollTrigger.update);
      raf = (t: number) => lenis?.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      explode(0);

      // GSAP ScrollTrigger
      const stage = stageRef.current;
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

      // Window Scroll Listener for guaranteed scrubbing updates
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

      if (window.ResizeObserver && stageRef.current) {
        resizeObserver = new ResizeObserver(updateConnectors);
        resizeObserver.observe(stageRef.current);
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
      resizeObserver?.disconnect();
      if (raf) gsap.ticker.remove(raf);
      lenis?.off("scroll", ScrollTrigger.update);
      lenis?.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="relative w-full select-none overflow-hidden my-12">
      {/* Track Container (180vh height for compact scroll response) */}
      <div className="exploded-track relative w-full h-[180vh]">
        {/* Pinned Stage Container */}
        <div
          ref={stageRef}
          className="exploded-pinned-stage relative w-full h-screen flex flex-col justify-between py-6 px-4 sm:px-8 lg:px-12 bg-[#FFFDF9] dark:bg-[#000000] transition-colors duration-300 overflow-hidden"
        >
          {/* Header Title Bar */}
          <div className="relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f7d7b0] dark:border-[#1a1a1a] pb-4 max-w-7xl mx-auto w-full">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fce3d3] dark:bg-[#161616] border border-[#f7d7b0] text-xs font-mono font-bold text-[#f15e1c]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D EXPLODED ARCHITECTURE SYSTEM</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight">
                Enterprise Technology Practices
              </h2>
            </div>
            <Link href="/services">
              <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#f15e1c] text-white font-semibold text-xs shadow-md hover:bg-[#d94e10] transition-colors">
                Explore All Practices <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          {/* SVG Leaders Overlay Canvas for Anchored Connectors */}
          <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none z-20" />

          {/* Main 3D Stage with Compact Desktop & Mobile Spacing */}
          <div
            className="exploded-stage relative flex-1 w-full max-w-6xl mx-auto flex items-center justify-center my-2"
            style={{ perspective: "1400px", perspectiveOrigin: "50% 42%" }}
          >
            {/* Desktop Left Column Cards (Layers 0, 2, 4, 6) — Kept VERY CLOSE to central stack */}
            <div className="hidden md:block absolute left-2 lg:left-6 z-30 w-[220px] lg:w-[245px] pointer-events-auto">
              {serviceLayers
                .filter((l) => l.side === "left")
                .map((layer) => (
                  <div
                    key={layer.id}
                    data-for={layer.id}
                    data-side="left"
                    data-tone={layer.tone}
                    className="exploded-card-item absolute -translate-y-1/2 left-0 w-full transition-all duration-200"
                  >
                    <Link href={`/services/${layer.slug}`}>
                      <div className="p-3 rounded-2xl bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-lg hover:border-[#f15e1c] transition-all hover:scale-[1.03] space-y-0.5">
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-md bg-[#f7d7b0]/30">{layer.icon}</div>
                          <b className="block text-xs font-bold font-display uppercase tracking-wider text-[#1b2823] dark:text-white">
                            {layer.shortName}
                          </b>
                        </div>
                        <p className="text-[10px] text-[#4a5c55] dark:text-[#d3eee4] leading-tight font-sans">
                          {layer.description}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>

            {/* Central 3D Exploded Ellipse Stack */}
            <div
              className="exploded-stack relative w-48 h-32 sm:w-72 sm:h-48 md:w-80 md:h-52"
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
                    background: `linear-gradient(145deg, color-mix(in srgb, ${layer.tone} 85%, white) 0%, ${layer.tone} 50%, color-mix(in srgb, ${layer.tone} 70%, black) 100%)`,
                    boxShadow: `0 16px 36px -8px ${layer.tone}40, inset 0 2px 6px rgba(255,255,255,0.7)`,
                  }}
                />
              ))}
            </div>

            {/* Desktop Right Column Cards (Layers 1, 3, 5, 7) — Kept VERY CLOSE to central stack */}
            <div className="hidden md:block absolute right-2 lg:right-6 z-30 w-[220px] lg:w-[245px] pointer-events-auto">
              {serviceLayers
                .filter((l) => l.side === "right")
                .map((layer) => (
                  <div
                    key={layer.id}
                    data-for={layer.id}
                    data-side="right"
                    data-tone={layer.tone}
                    className="exploded-card-item absolute -translate-y-1/2 right-0 w-full transition-all duration-200"
                  >
                    <Link href={`/services/${layer.slug}`}>
                      <div className="p-3 rounded-2xl bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-lg hover:border-[#f15e1c] transition-all hover:scale-[1.03] space-y-0.5">
                        <div className="flex items-center gap-2">
                          <div className="p-1 rounded-md bg-[#f7d7b0]/30">{layer.icon}</div>
                          <b className="block text-xs font-bold font-display uppercase tracking-wider text-[#1b2823] dark:text-white">
                            {layer.shortName}
                          </b>
                        </div>
                        <p className="text-[10px] text-[#4a5c55] dark:text-[#d3eee4] leading-tight font-sans">
                          {layer.description}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>

            {/* Mobile Vertical Grid Representation (< 768px) */}
            <div className="md:hidden w-full max-w-sm space-y-2 mt-4 px-2 overflow-y-auto max-h-[50vh] z-30">
              {serviceLayers.map((layer) => (
                <Link key={layer.id} href={`/services/${layer.slug}`} className="block">
                  <div className="p-2.5 rounded-xl bg-white/95 dark:bg-[#0a0a0a]/95 border border-[#f7d7b0] dark:border-[#1a1a1a] shadow-xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-md bg-[#f7d7b0]/30">{layer.icon}</div>
                      <div>
                        <span className="block text-xs font-bold font-display text-[#1b2823] dark:text-white">
                          {layer.name}
                        </span>
                        <span className="block text-[10px] text-[#4a5c55] dark:text-[#d3eee4]">
                          {layer.description}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#f15e1c] shrink-0" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Progress Bar & Instruction Indicator */}
          <div className="relative z-20 flex items-center justify-between max-w-7xl mx-auto w-full border-t border-[#f7d7b0] dark:border-[#1a1a1a] pt-3 text-xs font-mono text-[#7A6A5F] dark:text-[#B8ACA0]">
            <span>SCROLL TO EXPLODE STACK</span>
            <div className="w-48 h-1.5 rounded-full bg-[#f7d7b0]/50 dark:bg-[#1a1a1a] overflow-hidden">
              <div className="exploded-progress-bar h-full bg-[#f15e1c] transition-all duration-75 w-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
