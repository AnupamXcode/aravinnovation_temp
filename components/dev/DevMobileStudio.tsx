"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Tablet,
  RotateCw,
  Monitor,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
  Globe,
  Layers,
  ArrowRight,
  Maximize2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type DevicePreset = {
  id: string;
  name: string;
  width: number;
  height: number;
  type: "mobile" | "tablet";
  aspectRatio: string;
};

const DEVICE_PRESETS: DevicePreset[] = [
  { id: "iphone-se", name: "iPhone SE", width: 375, height: 667, type: "mobile", aspectRatio: "9:16" },
  { id: "iphone-15", name: "iPhone 14 / 15", width: 390, height: 844, type: "mobile", aspectRatio: "19.5:9" },
  { id: "iphone-16-pro", name: "iPhone 16 Pro", width: 402, height: 874, type: "mobile", aspectRatio: "19.5:9" },
  { id: "pixel-8", name: "Google Pixel 8", width: 412, height: 915, type: "mobile", aspectRatio: "20:9" },
  { id: "ipad-mini", name: "iPad Mini / Tablet", width: 768, height: 1024, type: "tablet", aspectRatio: "4:3" },
];

const DEV_TEST_ROUTES = [
  { label: "Homepage", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Core Services", path: "/services" },
  { label: "Products", path: "/products" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "Insights", path: "/insights" },
  { label: "Contact Hub", path: "/contact" },
  { label: "Careers", path: "/careers" },
  { label: "Admin Panel", path: "/admin" },
];

export function DevMobileStudio() {
  const [selectedDevice, setSelectedDevice] = React.useState<DevicePreset>(DEVICE_PRESETS[1]);
  const [activePath, setActivePath] = React.useState<string>("/");
  const [isLandscape, setIsLandscape] = React.useState<boolean>(false);
  const [iframeKey, setIframeKey] = React.useState<number>(0);
  const [viewMode, setViewMode] = React.useState<"split" | "mobile-only">("split");
  const [showTouchCursor, setShowTouchCursor] = React.useState<boolean>(false);

  // Calculate actual display dimensions based on orientation
  const currentWidth = isLandscape ? selectedDevice.height : selectedDevice.width;
  const currentHeight = isLandscape ? selectedDevice.width : selectedDevice.height;

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-[#f15e1c]/30 selection:text-[#f15e1c]">
      {/* Top Dev Warning Header */}
      <div className="bg-gradient-to-r from-amber-600/90 via-orange-600/90 to-emerald-600/90 text-white text-xs font-mono py-2 px-4 flex items-center justify-between shadow-md z-50">
        <div className="flex items-center gap-2 font-bold tracking-wide">
          <AlertTriangle className="w-4 h-4 text-amber-200 animate-pulse" />
          <span>LOCAL DEVELOPMENT ONLY</span>
          <span className="opacity-75 font-normal">| Temporary Mobile Studio (NODE_ENV = development)</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-black/30 px-2 py-0.5 rounded text-[11px] font-semibold text-emerald-200">
            Disabled in Production Runtime
          </span>
          <a
            href={activePath}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1 text-[11px] text-white/90"
          >
            <span>Open in Tab</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Studio Header / Toolbar */}
      <header className="bg-slate-900/95 border-b border-slate-800 backdrop-blur-md px-4 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
        {/* Left Title & Status */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#f15e1c] to-[#2e936f] text-white shadow-md">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white tracking-tight">
                Mobile Dev & Testing Studio
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono hidden sm:block">
              Isolated Development Module — Side-by-Side Mobile UX Audit
            </p>
          </div>
        </div>

        {/* Center Control Panel: Device Presets & Orientation */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Preset Buttons */}
          <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
            {DEVICE_PRESETS.map((preset) => {
              const isActive = selectedDevice.id === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setSelectedDevice(preset)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer",
                    isActive
                      ? "bg-gradient-to-r from-[#f15e1c] to-[#2e936f] text-white font-bold shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  )}
                >
                  {preset.type === "mobile" ? (
                    <Smartphone className="w-3.5 h-3.5" />
                  ) : (
                    <Tablet className="w-3.5 h-3.5" />
                  )}
                  <span>{preset.name}</span>
                </button>
              );
            })}
          </div>

          {/* Orientation Toggle */}
          <button
            type="button"
            onClick={() => setIsLandscape((prev) => !prev)}
            className={cn(
              "px-3 py-1.5 rounded-xl border text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer",
              isLandscape
                ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
            )}
            title="Toggle Portrait / Landscape"
          >
            <RotateCw className={cn("w-3.5 h-3.5 transition-transform duration-300", isLandscape && "rotate-90")} />
            <span>{isLandscape ? "Landscape" : "Portrait"}</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setViewMode("split")}
              className={cn(
                "px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1",
                viewMode === "split" ? "bg-slate-800 text-white font-bold" : "text-slate-400 hover:text-white"
              )}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Split View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("mobile-only")}
              className={cn(
                "px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1",
                viewMode === "mobile-only" ? "bg-slate-800 text-white font-bold" : "text-slate-400 hover:text-white"
              )}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mobile Only</span>
            </button>
          </div>
        </div>

        {/* Right Actions: Refresh & Reload */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer"
            title="Reload Frames"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Sub-bar: Navigation Quick Switcher */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 py-2 flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Globe className="w-3.5 h-3.5 text-[#f15e1c]" /> Route Tester:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          {DEV_TEST_ROUTES.map((route) => {
            const isActive = activePath === route.path;
            return (
              <button
                key={route.path}
                type="button"
                onClick={() => setActivePath(route.path)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-mono transition-all shrink-0 cursor-pointer",
                  isActive
                    ? "bg-[#f15e1c] text-white font-bold shadow"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/50"
                )}
              >
                {route.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Desktop Full Viewport (in Split Mode) */}
        {viewMode === "split" && (
          <div className="hidden lg:flex flex-1 flex-col border-r border-slate-800 bg-slate-950 overflow-hidden">
            <div className="h-8 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Monitor className="w-3.5 h-3.5 text-[#2e936f]" />
                <span>Desktop Viewport (Full Resolution)</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">{activePath}</span>
            </div>
            <div className="flex-1 w-full h-full relative">
              <iframe
                key={`desktop-frame-${iframeKey}-${activePath}`}
                src={activePath}
                className="w-full h-full border-0 bg-white"
                title="Desktop Viewport Preview"
              />
            </div>
          </div>
        )}

        {/* Right Pane: Mobile Hardware Frame Viewport */}
        <div className="flex-1 flex flex-col items-center justify-start p-4 sm:p-8 bg-slate-950 overflow-auto relative">
          {/* Top Frame Spec Badge */}
          <div className="mb-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#f15e1c]" />
              <span>
                {selectedDevice.name} ({currentWidth}px × {currentHeight}px) — {isLandscape ? "Landscape" : "Portrait"}
              </span>
            </div>
          </div>

          {/* Simulated Mobile Device Hardware Frame */}
          <div
            style={{
              width: `${currentWidth + 24}px`,
              maxWidth: "100%",
            }}
            className="transition-all duration-300 ease-out"
          >
            <div
              className={cn(
                "relative mx-auto bg-slate-900 border-[10px] border-slate-800 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300",
                selectedDevice.type === "mobile" ? "rounded-[44px]" : "rounded-[28px]"
              )}
            >
              {/* Hardware Notch / Island (Portrait Mobile only) */}
              {selectedDevice.type === "mobile" && !isLandscape && (
                <div className="absolute top-0 inset-x-0 h-6 z-30 flex items-center justify-center bg-transparent pointer-events-none select-none">
                  <div className="w-28 h-4 bg-black rounded-b-xl flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-800 border border-slate-700" />
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  </div>
                </div>
              )}

              {/* Display Screen */}
              <div
                style={{
                  width: `${currentWidth}px`,
                  height: `${currentHeight}px`,
                  maxHeight: "78vh",
                }}
                className="relative bg-white dark:bg-[#000000] overflow-hidden pt-4"
              >
                <iframe
                  key={`mobile-frame-${selectedDevice.id}-${iframeKey}-${activePath}-${isLandscape}`}
                  src={activePath}
                  style={{
                    width: `${currentWidth}px`,
                    height: "100%",
                  }}
                  className="border-0 w-full h-full bg-white dark:bg-[#000000]"
                  title={`Mobile Frame ${selectedDevice.name}`}
                />
              </div>

              {/* Bottom Home Bar */}
              <div className="h-4 bg-black flex items-center justify-center pointer-events-none select-none">
                <div className="w-28 h-1 bg-slate-500/80 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info & Verification Bar */}
      <footer className="bg-slate-900 border-t border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Production Isolation Safeguard:</span>
          <span className="text-slate-200">Returns 404 (notFound()) when NODE_ENV === &quot;production&quot;</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-500">
          <span>Route: /dev-mobile</span>
          <span>Module: Isolated Dev Component</span>
        </div>
      </footer>
    </div>
  );
}
