"use client";

import * as React from "react";
import Link from "next/link";
import {
  useSiteConfig,
  defaultHeroPositioningDeviceConfig,
  defaultHeroPositioning,
  HeroPositioningDeviceConfig,
} from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import {
  Save,
  RotateCcw,
  ExternalLink,
  Laptop,
  Tablet,
  Smartphone,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ShieldCheck,
  Globe2,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface HeroAdminPanelProps {
  showToast?: (message: string) => void;
}

export function HeroAdminPanel({ showToast }: HeroAdminPanelProps) {
  const { config, updateHeroVideoConfig } = useSiteConfig();
  const [deviceTab, setDeviceTab] = React.useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isSaved, setIsSaved] = React.useState(false);

  // Active positioning settings from SiteConfig or fallback defaults
  const positioningConfig = config.heroVideoConfig?.positioning || defaultHeroPositioning;
  const currentDevicePos = positioningConfig[deviceTab] || defaultHeroPositioningDeviceConfig;

  // Handler to update specific slider/input value for the active device
  const updateDevicePos = (updates: Partial<HeroPositioningDeviceConfig>) => {
    const updatedPosForDevice = { ...currentDevicePos, ...updates };
    const updatedFullPositioning = {
      ...positioningConfig,
      [deviceTab]: updatedPosForDevice,
    };
    updateHeroVideoConfig({ positioning: updatedFullPositioning });
    setIsSaved(false);
  };

  // Reset current device values to defaults
  const handleReset = () => {
    const defaultForDevice = defaultHeroPositioning[deviceTab];
    const updatedFullPositioning = {
      ...positioningConfig,
      [deviceTab]: defaultForDevice,
    };
    updateHeroVideoConfig({ positioning: updatedFullPositioning });
    if (showToast) showToast(`Hero positioning reset to ${deviceTab} defaults.`);
    setIsSaved(false);
  };

  // Save changes explicitly
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroVideoConfig({ positioning: positioningConfig });
    setIsSaved(true);
    if (showToast) showToast("Hero positioning changes saved successfully!");
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-display text-[#221811] dark:text-[#FAF5EE]">
            Hero Section Controls
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6A5F] dark:text-[#B8ACA0] mt-1 font-medium">
            Adjust the positioning, spacing, and alignment of hero section elements in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link href="/" target="_blank" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="md"
              leftIcon={<ExternalLink className="w-4 h-4" />}
              className="w-full sm:w-auto rounded-2xl border-[#EFE2D6] dark:border-[#1f1f1f] text-xs font-bold"
            >
              Preview on Website
            </Button>
          </Link>

          <Button
            type="button"
            onClick={handleSave}
            variant="primary"
            size="md"
            leftIcon={<Save className="w-4 h-4" />}
            className="w-full sm:w-auto rounded-2xl bg-[#f15e1c] hover:bg-[#d84e12] text-white font-bold text-xs shadow-md shadow-[#f15e1c]/25"
          >
            {isSaved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* DEVICE SELECTOR TABS */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] w-fit shadow-xs">
        {[
          { id: "desktop", label: "Desktop", icon: Laptop },
          { id: "tablet", label: "Tablet", icon: Tablet },
          { id: "mobile", label: "Mobile", icon: Smartphone },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = deviceTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setDeviceTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#f15e1c] text-white shadow-md shadow-[#f15e1c]/25"
                  : "text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#221811] dark:hover:text-[#FAF5EE]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* THREE-COLUMN CONTROLS & PREVIEW GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* COLUMN 1: POSITION CONTROLS */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-5">
          <h3 className="text-base font-extrabold font-display text-[#221811] dark:text-[#FAF5EE]">
            Position Controls
          </h3>

          {/* Horizontal Position */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                Horizontal Position (Left ↔ Right)
              </label>
              <span className="px-2.5 py-0.5 rounded-md bg-[#FBF3EA] dark:bg-[#1A1613] font-mono font-bold text-[#f15e1c] border border-[#EFE2D6] dark:border-[#1f1f1f]">
                {currentDevicePos.contentX} px
              </span>
            </div>
            <input
              type="range"
              min="-200"
              max="200"
              step="5"
              value={currentDevicePos.contentX}
              onChange={(e) => updateDevicePos({ contentX: parseInt(e.target.value) })}
              className="w-full accent-[#f15e1c] cursor-pointer"
            />
            <p className="text-[10px] text-[#7A6A5F] dark:text-[#B8ACA0]">
              Move entire content (text, buttons, icons) left or right
            </p>
          </div>

          {/* Vertical Position */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                Vertical Position (Up ↕ Down)
              </label>
              <span className="px-2.5 py-0.5 rounded-md bg-[#FBF3EA] dark:bg-[#1A1613] font-mono font-bold text-[#f15e1c] border border-[#EFE2D6] dark:border-[#1f1f1f]">
                {currentDevicePos.contentY} px
              </span>
            </div>
            <input
              type="range"
              min="-150"
              max="150"
              step="5"
              value={currentDevicePos.contentY}
              onChange={(e) => updateDevicePos({ contentY: parseInt(e.target.value) })}
              className="w-full accent-[#f15e1c] cursor-pointer"
            />
            <p className="text-[10px] text-[#7A6A5F] dark:text-[#B8ACA0]">
              Move entire content up or down
            </p>
          </div>

          {/* Heading Position */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                Heading Position ↑
              </label>
              <span className="px-2.5 py-0.5 rounded-md bg-[#FBF3EA] dark:bg-[#1A1613] font-mono font-bold text-[#f15e1c] border border-[#EFE2D6] dark:border-[#1f1f1f]">
                {currentDevicePos.headingY} px
              </span>
            </div>
            <input
              type="range"
              min="-100"
              max="100"
              step="2"
              value={currentDevicePos.headingY}
              onChange={(e) => updateDevicePos({ headingY: parseInt(e.target.value) })}
              className="w-full accent-[#f15e1c] cursor-pointer"
            />
            <p className="text-[10px] text-[#7A6A5F] dark:text-[#B8ACA0]">
              Adjust heading independently
            </p>
          </div>

          {/* Description Position */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                Description Position ↑
              </label>
              <span className="px-2.5 py-0.5 rounded-md bg-[#FBF3EA] dark:bg-[#1A1613] font-mono font-bold text-[#f15e1c] border border-[#EFE2D6] dark:border-[#1f1f1f]">
                {currentDevicePos.descY} px
              </span>
            </div>
            <input
              type="range"
              min="-100"
              max="100"
              step="2"
              value={currentDevicePos.descY}
              onChange={(e) => updateDevicePos({ descY: parseInt(e.target.value) })}
              className="w-full accent-[#f15e1c] cursor-pointer"
            />
            <p className="text-[10px] text-[#7A6A5F] dark:text-[#B8ACA0]">
              Adjust description text position
            </p>
          </div>

          {/* Buttons Position */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                Buttons Position ↑
              </label>
              <span className="px-2.5 py-0.5 rounded-md bg-[#FBF3EA] dark:bg-[#1A1613] font-mono font-bold text-[#f15e1c] border border-[#EFE2D6] dark:border-[#1f1f1f]">
                {currentDevicePos.ctaY} px
              </span>
            </div>
            <input
              type="range"
              min="-100"
              max="100"
              step="2"
              value={currentDevicePos.ctaY}
              onChange={(e) => updateDevicePos({ ctaY: parseInt(e.target.value) })}
              className="w-full accent-[#f15e1c] cursor-pointer"
            />
            <p className="text-[10px] text-[#7A6A5F] dark:text-[#B8ACA0]">
              Adjust CTA buttons position
            </p>
          </div>

          {/* Capability Row Position */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                Icons/Bottom Row Position ↑
              </label>
              <span className="px-2.5 py-0.5 rounded-md bg-[#FBF3EA] dark:bg-[#1A1613] font-mono font-bold text-[#f15e1c] border border-[#EFE2D6] dark:border-[#1f1f1f]">
                {currentDevicePos.capY} px
              </span>
            </div>
            <input
              type="range"
              min="-100"
              max="100"
              step="2"
              value={currentDevicePos.capY}
              onChange={(e) => updateDevicePos({ capY: parseInt(e.target.value) })}
              className="w-full accent-[#f15e1c] cursor-pointer"
            />
            <p className="text-[10px] text-[#7A6A5F] dark:text-[#B8ACA0]">
              Adjust bottom icons/labels position
            </p>
          </div>

          {/* Reset Action */}
          <div className="pt-2">
            <Button
              type="button"
              onClick={handleReset}
              variant="outline"
              size="sm"
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              className="w-full rounded-2xl text-xs font-bold border-[#EFE2D6] dark:border-[#1f1f1f]"
            >
              Reset to Default
            </Button>
          </div>
        </div>

        {/* COLUMN 2: SPACING & ALIGNMENT CONTROLS */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-5">
          <h3 className="text-base font-extrabold font-display text-[#221811] dark:text-[#FAF5EE]">
            Spacing Controls
          </h3>

          {/* Heading Bottom Spacing */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                Heading Bottom Spacing
              </label>
              <span className="px-2.5 py-0.5 rounded-md bg-[#FBF3EA] dark:bg-[#1A1613] font-mono font-bold text-[#f15e1c] border border-[#EFE2D6] dark:border-[#1f1f1f]">
                {currentDevicePos.headingMb} px
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              step="2"
              value={currentDevicePos.headingMb}
              onChange={(e) => updateDevicePos({ headingMb: parseInt(e.target.value) })}
              className="w-full accent-[#f15e1c] cursor-pointer"
            />
          </div>

          {/* Description Bottom Spacing */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                Description Bottom Spacing
              </label>
              <span className="px-2.5 py-0.5 rounded-md bg-[#FBF3EA] dark:bg-[#1A1613] font-mono font-bold text-[#f15e1c] border border-[#EFE2D6] dark:border-[#1f1f1f]">
                {currentDevicePos.descMb} px
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              step="2"
              value={currentDevicePos.descMb}
              onChange={(e) => updateDevicePos({ descMb: parseInt(e.target.value) })}
              className="w-full accent-[#f15e1c] cursor-pointer"
            />
          </div>

          {/* Buttons Bottom Spacing */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                Buttons Bottom Spacing
              </label>
              <span className="px-2.5 py-0.5 rounded-md bg-[#FBF3EA] dark:bg-[#1A1613] font-mono font-bold text-[#f15e1c] border border-[#EFE2D6] dark:border-[#1f1f1f]">
                {currentDevicePos.ctaMb} px
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              step="2"
              value={currentDevicePos.ctaMb}
              onChange={(e) => updateDevicePos({ ctaMb: parseInt(e.target.value) })}
              className="w-full accent-[#f15e1c] cursor-pointer"
            />
          </div>

          {/* Icons Row Top Spacing */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                Icons Row Top Spacing
              </label>
              <span className="px-2.5 py-0.5 rounded-md bg-[#FBF3EA] dark:bg-[#1A1613] font-mono font-bold text-[#f15e1c] border border-[#EFE2D6] dark:border-[#1f1f1f]">
                {currentDevicePos.capMt} px
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="96"
              step="4"
              value={currentDevicePos.capMt}
              onChange={(e) => updateDevicePos({ capMt: parseInt(e.target.value) })}
              className="w-full accent-[#f15e1c] cursor-pointer"
            />
          </div>

          {/* Line/Divider Position */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                Line/Divider Position
              </label>
              <span className="px-2.5 py-0.5 rounded-md bg-[#FBF3EA] dark:bg-[#1A1613] font-mono font-bold text-[#f15e1c] border border-[#EFE2D6] dark:border-[#1f1f1f]">
                {currentDevicePos.dividerY} px
              </span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              step="2"
              value={currentDevicePos.dividerY}
              onChange={(e) => updateDevicePos({ dividerY: parseInt(e.target.value) })}
              className="w-full accent-[#f15e1c] cursor-pointer"
            />
          </div>

          {/* Line/Divider Width */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                Line/Divider Width
              </label>
              <span className="px-2.5 py-0.5 rounded-md bg-[#FBF3EA] dark:bg-[#1A1613] font-mono font-bold text-[#f15e1c] border border-[#EFE2D6] dark:border-[#1f1f1f]">
                {currentDevicePos.dividerWidth} %
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={currentDevicePos.dividerWidth}
              onChange={(e) => updateDevicePos({ dividerWidth: parseInt(e.target.value) })}
              className="w-full accent-[#f15e1c] cursor-pointer"
            />
          </div>

          {/* Content Alignment */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
              Content Alignment
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "left", icon: AlignLeft, label: "Left" },
                { id: "center", icon: AlignCenter, label: "Center" },
                { id: "right", icon: AlignRight, label: "Right" },
              ].map((opt) => {
                const Icon = opt.icon;
                const isActive = currentDevicePos.contentAlign === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => updateDevicePos({ contentAlign: opt.id as any })}
                    className={`flex items-center justify-center gap-1.5 p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                      isActive
                        ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-md shadow-[#f15e1c]/25"
                        : "bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] border-[#EFE2D6] dark:border-[#1f1f1f] hover:border-[#f15e1c]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-[#7A6A5F] dark:text-[#B8ACA0]">
              Align all content within hero section
            </p>
          </div>
        </div>

        {/* COLUMN 3: REAL-TIME LIVE PREVIEW */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold font-display text-[#221811] dark:text-[#FAF5EE]">
              Live Preview
            </h3>
            <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
              See changes in real-time as you adjust the controls.
            </p>

            {/* INTERACTIVE REAL-TIME MINI HERO PREVIEW FRAME */}
            <div className="mt-4 rounded-2xl overflow-hidden border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FFFDF9] dark:bg-[#050505] shadow-inner relative aspect-[4/3] sm:aspect-[16/10] flex flex-col justify-center p-4 select-none">
              
              {/* Background Video / Architectural Image Simulation */}
              <div className="absolute inset-0 z-0 opacity-80 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#f15e1c]/15 via-transparent to-transparent">
                <div className="absolute top-1/2 right-4 -translate-y-1/2 w-28 h-28 rounded-3xl border border-[#f7d7b0] dark:border-white/10 bg-white/20 dark:bg-white/5 backdrop-blur-md rotate-12 flex items-center justify-center shadow-lg">
                  <div className="w-12 h-12 rounded-2xl border border-[#f15e1c] animate-spin flex items-center justify-center text-[#f15e1c]">
                    ✨
                  </div>
                </div>
              </div>

              {/* Dynamic Live Preview Content Container */}
              <div
                style={{
                  transform: `translate3d(${currentDevicePos.contentX / 3}px, ${currentDevicePos.contentY / 3}px, 0)`,
                  textAlign: currentDevicePos.contentAlign,
                }}
                className="relative z-10 w-full max-w-[85%] text-left space-y-2 transition-transform duration-200"
              >
                {/* Preview H1 */}
                <h4
                  style={{
                    transform: `translate3d(${currentDevicePos.headingX / 3}px, ${currentDevicePos.headingY / 3}px, 0)`,
                    marginBottom: `${currentDevicePos.headingMb / 3}px`,
                  }}
                  className="font-display font-extrabold text-[13px] sm:text-[15px] text-[#221811] dark:text-[#FAF5EE] leading-tight"
                >
                  Build, Grow &amp; Scale With<br />
                  Technology, AI &amp; Digital Growth
                </h4>

                {/* Preview Paragraph */}
                <p
                  style={{
                    transform: `translate3d(${currentDevicePos.descX / 3}px, ${currentDevicePos.descY / 3}px, 0)`,
                    marginBottom: `${currentDevicePos.descMb / 3}px`,
                  }}
                  className="text-[9px] text-[#3A2E27]/90 dark:text-[#FAF5EE]/90 leading-snug line-clamp-2"
                >
                  We help businesses turn technology challenges and growth goals into scalable digital solutions.
                </p>

                {/* Preview CTAs */}
                <div
                  style={{
                    transform: `translate3d(${currentDevicePos.ctaX / 3}px, ${currentDevicePos.ctaY / 3}px, 0)`,
                    marginBottom: `${currentDevicePos.ctaMb / 3}px`,
                    gap: `${currentDevicePos.ctaGap / 2}px`,
                  }}
                  className="flex items-center gap-1.5 pt-0.5"
                >
                  <span className="px-2 py-1 rounded-full bg-[#f15e1c] text-white text-[8px] font-bold shadow-xs">
                    Book Consultation →
                  </span>
                  <span className="px-2 py-1 rounded-full bg-white dark:bg-black/60 border border-[#3A2E27]/20 text-[8px] font-bold text-[#221811] dark:text-[#FAF5EE]">
                    Explore Solutions
                  </span>
                </div>

                {/* Preview Capability Row & Divider */}
                <div
                  style={{
                    transform: `translate3d(${currentDevicePos.capX / 3}px, ${currentDevicePos.capY / 3}px, 0)`,
                    marginTop: `${currentDevicePos.capMt / 3}px`,
                  }}
                  className="pt-1.5 border-t border-[#3A2E27]/15 dark:border-white/15"
                >
                  <div
                    style={{
                      transform: `translate3d(0, ${currentDevicePos.dividerY / 2}px, 0)`,
                      width: `${currentDevicePos.dividerWidth}%`,
                      opacity: currentDevicePos.dividerOpacity / 100,
                    }}
                    className="h-0.5 bg-[#f15e1c] mb-1 rounded-full"
                  />
                  <div className="flex items-center gap-2 text-[7px] font-semibold text-[#221811] dark:text-[#FAF5EE] whitespace-nowrap overflow-hidden">
                    <span className="flex items-center gap-0.5">
                      <ShieldCheck className="w-2.5 h-2.5 text-[#f15e1c]" /> Enterprise Partner
                    </span>
                    <span>|</span>
                    <span className="flex items-center gap-0.5">
                      <Globe2 className="w-2.5 h-2.5 text-[#f15e1c]" /> Strategic Hubs
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* GREEN INSTANT FEEDBACK BANNER */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 flex items-start gap-3 text-emerald-900 dark:text-emerald-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold block text-emerald-900 dark:text-emerald-100">
                Changes are previewed instantly
              </span>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-300 leading-snug">
                Adjust the sliders to find the perfect positioning for your hero content. Click 'Save Changes' to apply.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
