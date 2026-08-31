"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Tablet,
  RotateCw,
  X,
  Wifi,
  Battery,
  Monitor,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type DevicePreset = {
  id: string;
  name: string;
  width: number;
  height: number;
  type: "mobile" | "tablet";
  iconName: string;
};

const DEVICE_PRESETS: DevicePreset[] = [
  { id: "375", name: "iPhone SE (375px)", width: 375, height: 667, type: "mobile", iconName: "Smartphone" },
  { id: "390", name: "iPhone 14/15 (390px)", width: 390, height: 844, type: "mobile", iconName: "Smartphone" },
  { id: "430", name: "14 Pro Max (430px)", width: 430, height: 932, type: "mobile", iconName: "Smartphone" },
  { id: "768", name: "Tablet / iPad (768px)", width: 768, height: 1024, type: "tablet", iconName: "Tablet" },
];

export function MobilePreviewToggle() {
  const [isAllowedEnv, setIsAllowedEnv] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDevice, setSelectedDevice] = React.useState<DevicePreset>(DEVICE_PRESETS[1]); // Default 390px
  const [iframeKey, setIframeKey] = React.useState(0);
  const [currentUrl, setCurrentUrl] = React.useState<string>("");

  // Environment & Domain Security Check - Strictly Dev Only
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const hostname = window.location.hostname;
    const isDev = process.env.NODE_ENV === "development" || process.env.VERCEL_ENVIRONMENT === "development";
    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".local");

    if (isDev || isLocalhost) {
      setIsAllowedEnv(true);
      setCurrentUrl(window.location.href);
    }
  }, []);

  // Update current URL on navigation or window location change
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const updateUrl = () => setCurrentUrl(window.location.href);
    window.addEventListener("popstate", updateUrl);
    return () => window.removeEventListener("popstate", updateUrl);
  }, []);

  // Keyboard shortcut listener: Ctrl+Shift+M or Cmd+Shift+M
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when preview modal is active
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isAllowedEnv) {
    return null;
  }

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      <motion.button
        type="button"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#f15e1c] via-[#f47d43] to-[#2e936f] text-white shadow-xl hover:shadow-2xl border-2 border-white/40 backdrop-blur-md cursor-pointer font-sans transition-all group"
        title="Open Side-by-Side Mobile Device Preview (Ctrl+Shift+M)"
        aria-label="Open Mobile Device Preview"
      >
        <Smartphone className="w-5 h-5 text-white animate-pulse" />
        <span className="text-xs font-extrabold font-mono uppercase tracking-wider hidden sm:inline-block">
          Mobile Preview
        </span>
        <span className="px-2 py-0.5 rounded-md bg-black/25 text-[10px] font-mono font-bold text-white/90">
          Ctrl+Shift+M
        </span>
      </motion.button>

      {/* Side-by-Side Mobile Device Preview Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl flex flex-col overflow-hidden text-slate-100 font-sans"
          >
            {/* Top Toolbar Controls Header */}
            <header className="h-16 shrink-0 bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4">
              {/* Left Brand Badge */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-r from-[#f15e1c] to-[#2e936f] text-white">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold font-display text-white">
                      Mobile UX Studio
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#2e936f]/20 text-[#2e936f] text-[10px] font-mono font-bold">
                      DEV ONLY
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                    Side-by-Side Responsive Viewport Audit
                  </p>
                </div>
              </div>

              {/* Center Preset Selector */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-950/70 border border-slate-800 rounded-2xl overflow-x-auto">
                {DEVICE_PRESETS.map((preset) => {
                  const isActive = selectedDevice.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setSelectedDevice(preset)}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer",
                        isActive
                          ? "bg-gradient-to-r from-[#f15e1c] to-[#2e936f] text-white shadow-md"
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

              {/* Right Action Tools: Refresh & Close */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRefresh}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer"
                  title="Reload Mobile Frame (Refresh)"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-white transition-colors cursor-pointer"
                  title="Close Mobile Preview (ESC)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </header>

            {/* Split Screen Workspace Body */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Pane: Desktop Full View */}
              <div className="hidden lg:flex flex-1 flex-col border-r border-slate-800 bg-slate-900/40 overflow-hidden">
                <div className="h-9 bg-slate-950 px-4 flex items-center justify-between border-b border-slate-800 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-3.5 h-3.5 text-[#2e936f]" />
                    <span>Desktop Viewport (100% Width)</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{currentUrl}</span>
                </div>
                <div className="flex-1 w-full h-full relative">
                  <iframe
                    key={`desktop-${iframeKey}`}
                    src={currentUrl}
                    className="w-full h-full border-0 bg-white"
                    title="Desktop Preview Window"
                  />
                </div>
              </div>

              {/* Right Pane: Mobile iPhone Frame Viewport */}
              <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 bg-slate-950 overflow-auto relative">
                <div className="text-center mb-4 space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                    <Sparkles className="w-3.5 h-3.5 text-[#f15e1c]" />
                    <span>Simulated Mobile Frame — {selectedDevice.name}</span>
                  </div>
                </div>

                {/* iPhone Hardware Frame Shell */}
                <div
                  style={{
                    width: `${selectedDevice.width + 24}px`,
                    maxWidth: "95vw",
                  }}
                  className="transition-all duration-300 ease-out"
                >
                  <div
                    className={cn(
                      "relative mx-auto bg-slate-900 border-[10px] border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300",
                      selectedDevice.type === "mobile" ? "rounded-[48px]" : "rounded-[32px]"
                    )}
                  >
                    {/* Top Hardware Speaker & Camera Island */}
                    {selectedDevice.type === "mobile" && (
                      <div className="absolute top-0 inset-x-0 h-7 z-30 flex items-center justify-between px-6 bg-transparent pointer-events-none select-none">
                        {/* Status Bar Left: Time */}
                        <span className="text-[11px] font-mono font-bold text-slate-900 dark:text-white">
                          9:41
                        </span>

                        {/* Dynamic Island Notch */}
                        <div className="w-28 h-4 bg-black rounded-b-xl mx-auto flex items-center justify-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                        </div>

                        {/* Status Bar Right: Icons */}
                        <div className="flex items-center gap-1.5 text-slate-900 dark:text-white">
                          <Wifi className="w-3 h-3" />
                          <Battery className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    )}

                    {/* Frame Screen Display Container */}
                    <div
                      style={{
                        width: `${selectedDevice.width}px`,
                        height: `${selectedDevice.height}px`,
                        maxHeight: "75vh",
                      }}
                      className="relative bg-white dark:bg-[#12100E] overflow-hidden pt-6"
                    >
                      <iframe
                        key={`mobile-${selectedDevice.id}-${iframeKey}`}
                        src={currentUrl}
                        style={{
                          width: `${selectedDevice.width}px`,
                          height: "100%",
                        }}
                        className="border-0 w-full h-full bg-white dark:bg-[#12100E]"
                        title={`Mobile Frame ${selectedDevice.name}`}
                      />
                    </div>

                    {/* Hardware Bottom Home Indicator Bar */}
                    <div className="h-5 bg-black flex items-center justify-center pointer-events-none select-none">
                      <div className="w-32 h-1 bg-slate-500/80 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
