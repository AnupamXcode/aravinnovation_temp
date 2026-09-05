"use client";

import * as React from "react";
import { useSiteConfig, defaultNavbarConfig, NavbarConfig } from "@/lib/site-config";
import {
  SlidersHorizontal,
  Eye,
  RotateCcw,
  Monitor,
  Tablet,
  Smartphone,
  Sun,
  Moon,
  Sparkles,
  Layers,
  Sliders,
  ShieldCheck,
  Menu,
  Save,
  Clock,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarAdminPanelProps {
  showToast: (msg: string) => void;
}

export function NavbarAdminPanel({ showToast }: NavbarAdminPanelProps) {
  const { config, updateNavbarConfig } = useSiteConfig();
  const navConfig: NavbarConfig = config.navbarConfig || defaultNavbarConfig;

  // Local form state for live editing
  const [form, setForm] = React.useState<NavbarConfig>(navConfig);
  const [previewDevice, setPreviewDevice] = React.useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewTheme, setPreviewTheme] = React.useState<"light" | "dark">("light");
  const [previewScrollState, setPreviewScrollState] = React.useState<"top" | "scrolled">("scrolled");

  // Keep local form in sync with global config when changed from outside
  React.useEffect(() => {
    setForm(config.navbarConfig || defaultNavbarConfig);
  }, [config.navbarConfig]);

  const handleChange = <K extends keyof NavbarConfig>(key: K, value: NavbarConfig[K]) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    // Propagate live updates to SiteConfig context so the real global header updates immediately
    updateNavbarConfig({ [key]: value });
  };

  const handleSave = () => {
    updateNavbarConfig(form);
    showToast("Navbar scroll transparency settings published globally across all pages");
  };

  const handleResetDefaults = () => {
    setForm(defaultNavbarConfig);
    updateNavbarConfig(defaultNavbarConfig);
    showToast("Navbar settings reset to factory defaults (Solid Top -> Translucent Scrolled)");
  };

  // Preview calculations for selected state
  const isScrolledPreview = previewScrollState === "scrolled";
  const scrollTransparencyActive = form.enabled !== false && form.translucent !== false && form.scrollTransparencyEnabled !== false;

  const activeOpacityPct = isScrolledPreview
    ? scrollTransparencyActive
      ? form.scrolledOpacity ?? 75
      : 100
    : 100;

  const alpha = (activeOpacityPct / 100).toFixed(2);
  const blurAmount = isScrolledPreview && scrollTransparencyActive ? form.backdropBlur ?? 14 : 0;
  const borderVisible = !isScrolledPreview || form.borderVisible !== false;
  const borderOpacityPct = isScrolledPreview ? form.borderOpacity ?? 80 : 100;
  const borderAlpha = borderVisible ? (borderOpacityPct / 100).toFixed(2) : "0";

  let shadowStyleClass = "shadow-xs";
  if (isScrolledPreview) {
    if (form.shadowVisible === false) {
      shadowStyleClass = "shadow-none";
    } else {
      const intensity = form.shadowIntensity || "sm";
      if (intensity === "sm") shadowStyleClass = "shadow-sm";
      else if (intensity === "md") shadowStyleClass = "shadow-md";
      else if (intensity === "lg") shadowStyleClass = "shadow-xl";
    }
  }

  const containerWidthClass =
    previewDevice === "desktop"
      ? "w-full max-w-4xl"
      : previewDevice === "tablet"
      ? "w-[640px]"
      : "w-[360px]";

  return (
    <div className="space-y-8">
      {/* Top Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-[#f15e1c]/10 text-[#f15e1c]">
              <SlidersHorizontal className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                Global Navbar Scroll Transparency Settings
              </h2>
              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                Configure solid header at page top and smooth translucent glass transition on scroll
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetDefaults}
            className="rounded-xl border-[#EFE2D6] dark:border-[#1f1f1f] text-xs"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset Defaults
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            className="rounded-xl bg-[#f15e1c] hover:bg-[#d44e14] text-xs font-bold shadow-md shadow-[#f15e1c]/20"
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            Save &amp; Publish Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Admin Controls Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Scroll Transparency Switch */}
          <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-sm font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                  Scroll Transparency Mode
                </span>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                  Solid at top of page &rarr; Translucent when scrolling
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.scrollTransparencyEnabled !== false}
                  onChange={(e) => handleChange("scrollTransparencyEnabled", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#EFE2D6] dark:bg-[#262626] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#f15e1c]"></div>
              </label>
            </div>
          </div>

          {/* Opacity & Blur Sliders */}
          <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
              <Sliders className="w-4 h-4 text-[#f15e1c]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE]">
                Scrolled Opacity &amp; Blur Controls
              </h3>
            </div>

            {/* Scrolled Opacity Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                  Scrolled State Opacity
                </span>
                <span className="font-mono font-bold text-[#f15e1c] bg-[#f15e1c]/10 px-2 py-0.5 rounded-lg">
                  {form.scrolledOpacity}% Opacity ({100 - form.scrolledOpacity}% Translucent)
                </span>
              </div>
              <input
                type="range"
                min="55"
                max="95"
                step="1"
                value={form.scrolledOpacity}
                onChange={(e) => handleChange("scrolledOpacity", Number(e.target.value))}
                className="w-full h-2 bg-[#EFE2D6] dark:bg-[#262626] rounded-lg appearance-none cursor-pointer accent-[#f15e1c]"
              />
              <div className="flex justify-between text-[10px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                <span>More Translucent (55%)</span>
                <span>More Opaque (95%)</span>
              </div>
            </div>

            {/* Backdrop Blur Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                  Backdrop Blur Amount
                </span>
                <span className="font-mono font-bold text-[#2e936f] bg-[#2e936f]/10 px-2 py-0.5 rounded-lg">
                  {form.backdropBlur}px Blur
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="1"
                value={form.backdropBlur}
                onChange={(e) => handleChange("backdropBlur", Number(e.target.value))}
                className="w-full h-2 bg-[#EFE2D6] dark:bg-[#262626] rounded-lg appearance-none cursor-pointer accent-[#2e936f]"
              />
              <div className="flex justify-between text-[10px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                <span>Clear / Off (0px)</span>
                <span>Strong Blur (30px)</span>
              </div>
            </div>

            {/* Transition Speed Preset */}
            <div className="space-y-2 pt-2 border-t border-[#EFE2D6] dark:border-[#1f1f1f]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                  Scroll Transition Speed
                </span>
                <span className="font-mono font-bold text-[#f15e1c]">
                  {form.transitionSpeed === "fast" ? "150ms" : form.transitionSpeed === "smooth" ? "500ms" : "300ms"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["fast", "standard", "smooth"] as const).map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => handleChange("transitionSpeed", spd)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold capitalize transition-all ${
                      form.transitionSpeed === spd
                        ? "bg-[#f15e1c] text-white shadow-sm"
                        : "bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#1f1f1f]"
                    }`}
                  >
                    {spd === "fast" ? "Fast (150ms)" : spd === "smooth" ? "Smooth (500ms)" : "Standard (300ms)"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Border & Shadow Controls */}
          <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
              <Layers className="w-4 h-4 text-[#f15e1c]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE]">
                Scrolled Border &amp; Elevation Shadow
              </h3>
            </div>

            {/* Border Visibility & Opacity */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                  Scrolled Bottom Border
                </span>
                <button
                  type="button"
                  onClick={() => handleChange("borderVisible", !form.borderVisible)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    form.borderVisible
                      ? "bg-[#2e936f] text-white"
                      : "bg-[#EFE2D6] dark:bg-[#262626] text-[#7A6A5F]"
                  }`}
                >
                  {form.borderVisible ? "VISIBLE" : "HIDDEN"}
                </button>
              </div>

              {form.borderVisible && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#7A6A5F] dark:text-[#B8ACA0]">Border Opacity</span>
                    <span className="font-mono font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                      {form.borderOpacity}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={form.borderOpacity}
                    onChange={(e) => handleChange("borderOpacity", Number(e.target.value))}
                    className="w-full h-2 bg-[#EFE2D6] dark:bg-[#262626] rounded-lg appearance-none cursor-pointer accent-[#f15e1c]"
                  />
                </div>
              )}
            </div>

            {/* Shadow Controls */}
            <div className="space-y-4 pt-2 border-t border-[#EFE2D6] dark:border-[#1f1f1f]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                  Scrolled Elevation Shadow
                </span>
                <button
                  type="button"
                  onClick={() => handleChange("shadowVisible", !form.shadowVisible)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    form.shadowVisible
                      ? "bg-[#2e936f] text-white"
                      : "bg-[#EFE2D6] dark:bg-[#262626] text-[#7A6A5F]"
                  }`}
                >
                  {form.shadowVisible ? "ENABLED" : "DISABLED"}
                </button>
              </div>

              {form.shadowVisible && (
                <div className="space-y-2">
                  <span className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">Shadow Intensity</span>
                  <div className="grid grid-cols-3 gap-2">
                    {(["sm", "md", "lg"] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => handleChange("shadowIntensity", lvl)}
                        className={`py-1.5 px-3 rounded-xl text-xs font-bold uppercase transition-all ${
                          form.shadowIntensity === lvl
                            ? "bg-[#f15e1c] text-white shadow-sm"
                            : "bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#1f1f1f]"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Dual State & Interactive Live Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#f15e1c]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE]">
                  Live Dual-State Navbar Preview
                </h3>
              </div>

              {/* Preview Controls Bar */}
              <div className="flex flex-wrap items-center gap-2">
                {/* State Simulator Switcher */}
                <div className="flex items-center bg-[#FBF3EA] dark:bg-[#1A1613] p-1 rounded-2xl border border-[#EFE2D6] dark:border-[#1f1f1f]">
                  <button
                    type="button"
                    onClick={() => setPreviewScrollState("top")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      previewScrollState === "top"
                        ? "bg-[#3A2E27] dark:bg-white text-white dark:text-[#3A2E27] shadow-xs"
                        : "text-[#7A6A5F]"
                    }`}
                  >
                    TOP STATE (Solid)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewScrollState("scrolled")}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      previewScrollState === "scrolled"
                        ? "bg-[#f15e1c] text-white shadow-xs"
                        : "text-[#7A6A5F]"
                    }`}
                  >
                    SCROLLED (Translucent)
                  </button>
                </div>

                {/* Device Selector */}
                <div className="flex items-center bg-[#FBF3EA] dark:bg-[#1A1613] p-1 rounded-2xl border border-[#EFE2D6] dark:border-[#1f1f1f]">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("desktop")}
                    className={`p-1.5 rounded-xl transition-all ${
                      previewDevice === "desktop"
                        ? "bg-[#f15e1c] text-white shadow-xs"
                        : "text-[#7A6A5F] hover:text-[#3A2E27] dark:hover:text-[#FAF5EE]"
                    }`}
                    title="Desktop Viewport (1440px)"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("tablet")}
                    className={`p-1.5 rounded-xl transition-all ${
                      previewDevice === "tablet"
                        ? "bg-[#f15e1c] text-white shadow-xs"
                        : "text-[#7A6A5F] hover:text-[#3A2E27] dark:hover:text-[#FAF5EE]"
                    }`}
                    title="Tablet Viewport (768px)"
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice("mobile")}
                    className={`p-1.5 rounded-xl transition-all ${
                      previewDevice === "mobile"
                        ? "bg-[#f15e1c] text-white shadow-xs"
                        : "text-[#7A6A5F] hover:text-[#3A2E27] dark:hover:text-[#FAF5EE]"
                    }`}
                    title="Mobile Viewport (375px)"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>

                {/* Theme Selector */}
                <div className="flex items-center bg-[#FBF3EA] dark:bg-[#1A1613] p-1 rounded-2xl border border-[#EFE2D6] dark:border-[#1f1f1f]">
                  <button
                    type="button"
                    onClick={() => setPreviewTheme("light")}
                    className={`p-1.5 rounded-xl transition-all ${
                      previewTheme === "light"
                        ? "bg-[#f15e1c] text-white shadow-xs"
                        : "text-[#7A6A5F] hover:text-[#3A2E27]"
                    }`}
                    title="Light Mode Preview"
                  >
                    <Sun className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTheme("dark")}
                    className={`p-1.5 rounded-xl transition-all ${
                      previewTheme === "dark"
                        ? "bg-[#f15e1c] text-white shadow-xs"
                        : "text-[#7A6A5F] hover:text-[#FAF5EE]"
                    }`}
                    title="Dark Mode Preview"
                  >
                    <Moon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Device Frame Display Canvas */}
            <div className="flex justify-center bg-[#1A1613]/5 dark:bg-[#000000]/60 p-4 sm:p-6 rounded-3xl border border-[#EFE2D6] dark:border-[#1f1f1f] overflow-x-auto min-h-[460px]">
              <div
                className={`transition-all duration-300 rounded-3xl overflow-hidden border shadow-2xl relative flex flex-col ${
                  previewTheme === "dark"
                    ? "bg-[#0A0A0A] text-[#FAF5EE] border-[#262626]"
                    : "bg-[#FFFDF9] text-[#3A2E27] border-[#EFE2D6]"
                } ${containerWidthClass}`}
              >
                {/* Simulated Header Overlay */}
                <div
                  style={
                    {
                      backgroundColor:
                        previewTheme === "dark"
                          ? `rgb(0 0 0 / ${alpha})`
                          : `rgb(255 253 249 / ${alpha})`,
                      borderColor: borderVisible
                        ? previewTheme === "dark"
                          ? `rgb(31 31 31 / ${borderAlpha})`
                          : `rgb(239 226 214 / ${borderAlpha})`
                        : "transparent",
                      backdropFilter: blurAmount > 0 ? `blur(${blurAmount}px)` : "none",
                      WebkitBackdropFilter: blurAmount > 0 ? `blur(${blurAmount}px)` : "none",
                    } as React.CSSProperties
                  }
                  className={`sticky top-0 z-30 px-5 py-3 border-b flex items-center justify-between transition-all duration-300 ${shadowStyleClass}`}
                >
                  {/* Brand Logo Mock */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-[#f15e1c] flex items-center justify-center text-white font-black text-sm shadow-md">
                      A
                    </div>
                    <div className="flex flex-col leading-tight">
                      <span className="font-extrabold text-sm tracking-tight text-[#3A2E27] dark:text-[#FAF5EE]">
                        ARAV <span className="text-[#f15e1c]">INNOVATIONS</span>
                      </span>
                      <span className="text-[9px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                        Enterprise Digital Core
                      </span>
                    </div>
                  </div>

                  {/* Desktop Nav Items */}
                  {previewDevice === "desktop" ? (
                    <div className="flex items-center gap-6 text-xs font-semibold">
                      <span className="text-[#f15e1c] font-bold">What We Do ▾</span>
                      <span>Products</span>
                      <span>Working With Us ▾</span>
                      <span>Blogs</span>
                    </div>
                  ) : (
                    <div className="p-2 rounded-xl bg-[#f15e1c] text-white">
                      <Menu className="w-4 h-4" />
                    </div>
                  )}

                  {/* Right CTA */}
                  {previewDevice === "desktop" && (
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] px-3 py-1.5 rounded-xl bg-[#f15e1c] text-white font-bold">
                        Schedule Call &rarr;
                      </span>
                    </div>
                  )}
                </div>

                {/* Simulated Content Body Underneath (Visible through Translucent Navbar when scrolled) */}
                <div className="p-6 sm:p-8 space-y-8 relative overflow-hidden">
                  {/* Decorative Background Accents */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#f15e1c]/25 to-[#fab60a]/20 rounded-full blur-2xl pointer-events-none -mr-12 -mt-12" />
                  <div className="absolute top-48 left-0 w-72 h-72 bg-gradient-to-tr from-[#2e936f]/20 to-[#f7d7b0]/25 rounded-full blur-3xl pointer-events-none -ml-16" />

                  {/* Hero Title & Text */}
                  <div className="space-y-4 max-w-lg relative z-10 pt-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f15e1c]/10 text-[#f15e1c] text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" /> {previewScrollState.toUpperCase()} PREVIEW
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight">
                      Architecting Scalable <span className="text-[#f15e1c]">Digital Core</span> Solutions
                    </h1>
                    <p className="text-xs sm:text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                      {isScrolledPreview
                        ? "SCROLLED STATE: Notice how background content shows through the translucent glass header."
                        : "TOP STATE: Solid opaque header preserves original brand header appearance at the top of the page."}
                    </p>
                  </div>

                  {/* Sample Grid Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 pt-2">
                    <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#141414]/80 border border-[#EFE2D6] dark:border-[#262626] space-y-2 shadow-sm">
                      <div className="w-7 h-7 rounded-lg bg-[#2e936f]/10 text-[#2e936f] flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-bold">IT Strategy &amp; Architecture</div>
                      <div className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                        Enterprise cloud &amp; infrastructure roadmaps
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#141414]/80 border border-[#EFE2D6] dark:border-[#262626] space-y-2 shadow-sm">
                      <div className="w-7 h-7 rounded-lg bg-[#f15e1c]/10 text-[#f15e1c] flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-bold">AI Portfolio Integration</div>
                      <div className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                        Intelligent workflow automation
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer preview note */}
                <div className="p-3 bg-black/5 dark:bg-white/5 border-t border-black/10 dark:border-white/10 text-center text-[10px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                  State: <strong>{previewScrollState === "top" ? "SOLID AT TOP (100% Opacity, Blur 0px)" : `TRANSLUCENT ON SCROLL (${activeOpacityPct}% Opacity, Blur ${blurAmount}px)`}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
