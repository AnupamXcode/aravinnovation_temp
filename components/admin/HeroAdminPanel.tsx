"use client";

import * as React from "react";
import { useSiteConfig, defaultHeroVideoConfig } from "@/lib/site-config";
import { useSiteContent } from "@/lib/site-content";
import {
  Globe,
  Video,
  Play,
  Gauge,
  Eye,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2,
  Sparkles,
  Save,
  RotateCcw,
  Sliders,
  Layout,
  CheckCircle2,
  AlertCircle,
  FileVideo,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroAdminPanelProps {
  showToast: (msg: string) => void;
}

export function HeroAdminPanel({ showToast }: HeroAdminPanelProps) {
  const { config, updateHeroVideoConfig } = useSiteConfig();
  const { content, updateHero } = useSiteContent();

  const heroVideo = config.heroVideoConfig || defaultHeroVideoConfig;
  const [heroForm, setHeroForm] = React.useState(content.hero);

  React.useEffect(() => {
    setHeroForm(content.hero);
  }, [content.hero]);

  const handleSaveTextContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero(heroForm);
    showToast("Homepage Hero text content updated successfully!");
  };

  const speedPresets = [0.25, 0.5, 0.65, 0.75, 1.0, 1.25, 1.5, 2.0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#FCE3D3] dark:bg-[#2C221B] text-[#f15e1c]">
              <Video className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold font-display">
              Homepage Hero &amp; Media Studio
            </h2>
          </div>
          <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] pl-9">
            Full CMS control over hero background video, playback speed, overlay opacity, text layout positioning, and text alignment.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            updateHeroVideoConfig(defaultHeroVideoConfig);
            showToast("Hero video & layout settings restored to default!");
          }}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] text-[#3A2E27] dark:text-[#FAF5EE] hover:border-[#f15e1c] flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#f15e1c]" />
          <span>Reset Video &amp; Layout Defaults</span>
        </button>
      </div>

      {/* Grid: 2 Columns for Video & Layout Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: HERO VIDEO CONTROL CENTER */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
              <div className="flex items-center gap-2.5">
                <FileVideo className="w-5 h-5 text-[#f15e1c]" />
                <h3 className="text-base font-extrabold font-display">
                  Background Video Controls
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#f15e1c]/10 text-[#f15e1c]">
                LIVE CMS CONTROL
              </span>
            </div>

            {/* 1. Video Enable Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f]">
              <div>
                <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE] block">
                  Enable Background Video
                </label>
                <span className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                  When disabled, website displays fallback static image
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const nextState = !(heroVideo.enabled !== false);
                  updateHeroVideoConfig({ enabled: nextState });
                  showToast(nextState ? "Background video enabled!" : "Background video disabled (showing fallback image)");
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  heroVideo.enabled !== false ? "bg-[#f15e1c]" : "bg-gray-300 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    heroVideo.enabled !== false ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* 2. Video Source URL */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE] flex items-center justify-between">
                <span>Video Source URL / Path</span>
                <span className="font-mono text-[10px] text-[#f15e1c] font-semibold">Active File</span>
              </label>
              <input
                type="text"
                value={heroVideo.videoUrl || "/videos/hero-bg.mp4"}
                onChange={(e) => {
                  updateHeroVideoConfig({ videoUrl: e.target.value });
                }}
                placeholder="/videos/hero-bg.mp4"
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] focus:border-[#f15e1c] font-mono"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[10px] text-[#7A6A5F] dark:text-[#B8ACA0]">Presets:</span>
                <button
                  type="button"
                  onClick={() => {
                    updateHeroVideoConfig({ videoUrl: "/videos/hero-bg.mp4" });
                    showToast("Video source set to /videos/hero-bg.mp4");
                  }}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-[#FFFDF9] dark:bg-[#201C18] border border-[#f15e1c]/40 text-[#f15e1c] hover:bg-[#f15e1c] hover:text-white transition-all cursor-pointer"
                >
                  /videos/hero-bg.mp4 (Default)
                </button>
              </div>
            </div>

            {/* 3. Playback Speed Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-[#f15e1c]" />
                  <span>Playback Speed (Playback Rate)</span>
                </label>
                <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-full bg-[#f15e1c] text-white">
                  {heroVideo.playbackSpeed || 1.0}× {heroVideo.playbackSpeed === 1.0 ? "(Normal)" : heroVideo.playbackSpeed < 1.0 ? "(Slow Motion)" : "(Fast)"}
                </span>
              </div>

              {/* Range Slider */}
              <input
                type="range"
                min="0.25"
                max="2.0"
                step="0.05"
                value={heroVideo.playbackSpeed || 1.0}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  updateHeroVideoConfig({ playbackSpeed: val });
                }}
                className="w-full accent-[#f15e1c] cursor-pointer"
              />

              {/* Preset Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {speedPresets.map((speed) => {
                  const isActive = (heroVideo.playbackSpeed || 1.0) === speed;
                  return (
                    <button
                      key={speed}
                      type="button"
                      onClick={() => {
                        updateHeroVideoConfig({ playbackSpeed: speed });
                        showToast(`Playback speed set to ${speed}×`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                        isActive
                          ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-md"
                          : "bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] border-[#EFE2D6] dark:border-[#1f1f1f] hover:border-[#f15e1c]"
                      }`}
                    >
                      {speed}× {speed === 1.0 ? "Normal" : ""}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Overlay Opacity Slider */}
            <div className="space-y-3 pt-2 border-t border-[#EFE2D6] dark:border-[#1f1f1f]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#2e936f]" />
                  <span>Video Overlay Darkness / Opacity</span>
                </label>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#2e936f] text-white">
                  {heroVideo.overlayOpacity ?? 75}% Darkness
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={heroVideo.overlayOpacity ?? 75}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  updateHeroVideoConfig({ overlayOpacity: val });
                }}
                className="w-full accent-[#2e936f] cursor-pointer"
              />

              <div className="flex justify-between text-[10px] font-mono text-[#7A6A5F] dark:text-[#B8ACA0]">
                <span>0% (Clear / Original Video)</span>
                <span>50% (Balanced Contrast)</span>
                <span>100% (Maximum Dark)</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: HERO TEXT LAYOUT & ALIGNMENT CONTROLS */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
              <div className="flex items-center gap-2.5">
                <Layout className="w-5 h-5 text-[#2e936f]" />
                <h3 className="text-base font-extrabold font-display">
                  Hero Text Layout &amp; Alignment
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#2e936f]/10 text-[#2e936f]">
                RESPONSIVE LAYOUT
              </span>
            </div>

            {/* 1. Text Alignment */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                Hero Text Alignment
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "left", label: "Left Aligned", icon: AlignLeft },
                  { id: "center", label: "Center Aligned", icon: AlignCenter },
                  { id: "right", label: "Right Aligned", icon: AlignRight },
                ].map((opt) => {
                  const Icon = opt.icon;
                  const isActive = (heroVideo.textAlignment || "left") === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        updateHeroVideoConfig({ textAlignment: opt.id as any });
                        showToast(`Text alignment changed to ${opt.label}`);
                      }}
                      className={`p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer border flex flex-col items-center gap-1.5 ${
                        isActive
                          ? "bg-[#2e936f] text-white border-[#2e936f] shadow-md"
                          : "bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] border-[#EFE2D6] dark:border-[#1f1f1f] hover:border-[#2e936f]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Text Layout Position Column */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                Hero Text Screen Column Position
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "left", label: "Left Column (Default)" },
                  { id: "center", label: "Center Stage" },
                  { id: "right", label: "Right Shift Column" },
                ].map((opt) => {
                  const isActive = (heroVideo.textLayoutPosition || "left") === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        updateHeroVideoConfig({ textLayoutPosition: opt.id as any });
                        showToast(`Text position changed to ${opt.label}`);
                      }}
                      className={`p-3 rounded-2xl text-xs font-bold text-center transition-all cursor-pointer border ${
                        isActive
                          ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-md"
                          : "bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] border-[#EFE2D6] dark:border-[#1f1f1f] hover:border-[#f15e1c]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Text Container Max Width */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                Text Box Maximum Width
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "compact", label: "Compact (2XL)" },
                  { id: "standard", label: "Standard (3XL)" },
                  { id: "wide", label: "Wide (4XL)" },
                ].map((opt) => {
                  const isActive = (heroVideo.textMaxWidth || "standard") === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        updateHeroVideoConfig({ textMaxWidth: opt.id as any });
                        showToast(`Text width set to ${opt.label}`);
                      }}
                      className={`p-3 rounded-2xl text-xs font-bold text-center transition-all cursor-pointer border ${
                        isActive
                          ? "bg-[#fab60a] text-white border-[#fab60a] shadow-md"
                          : "bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] border-[#EFE2D6] dark:border-[#1f1f1f] hover:border-[#fab60a]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Settings Overview Card */}
            <div className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] space-y-2 text-xs">
              <span className="font-bold text-[#f15e1c] font-mono uppercase tracking-wider block">
                Live Configuration Summary
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#5A4A3F] dark:text-[#D8CBC0]">
                <div>• Video URL: <span className="font-bold text-[#3A2E27] dark:text-[#FAF5EE] truncate block">{heroVideo.videoUrl}</span></div>
                <div>• Speed: <span className="font-bold text-[#f15e1c]">{heroVideo.playbackSpeed || 1.0}×</span></div>
                <div>• Overlay Opacity: <span className="font-bold text-[#2e936f]">{heroVideo.overlayOpacity ?? 75}%</span></div>
                <div>• Text Align: <span className="font-bold text-[#fab60a] capitalize">{heroVideo.textAlignment || "left"}</span></div>
                <div>• Text Position: <span className="font-bold text-[#3A2E27] dark:text-[#FAF5EE] capitalize">{heroVideo.textLayoutPosition || "left"}</span></div>
                <div>• Max Width: <span className="font-bold text-[#3A2E27] dark:text-[#FAF5EE] capitalize">{heroVideo.textMaxWidth || "standard"}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: HERO COPY & TEXT CONTENT EDITING FORM */}
      <form onSubmit={handleSaveTextContent} className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-[#f15e1c]" />
            <h3 className="text-base font-extrabold font-display">
              Hero Copy &amp; Headlines Content
            </h3>
          </div>
          <Button type="submit" variant="primary" size="sm" leftIcon={<Save className="w-4 h-4" />}>
            Save Hero Text
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
              Eyebrow Badge Label
            </label>
            <input
              type="text"
              value={heroForm.eyebrow}
              onChange={(e) => setHeroForm({ ...heroForm, eyebrow: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] focus:border-[#f15e1c]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
              Main Heading Title
            </label>
            <input
              type="text"
              value={heroForm.title}
              onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] focus:border-[#f15e1c]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
            Hero Supporting Description Paragraph
          </label>
          <textarea
            rows={3}
            value={heroForm.description}
            onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] focus:border-[#f15e1c]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
              Primary CTA Button Label &amp; Link
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={heroForm.primaryCtaText}
                onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                placeholder="Button Label"
                className="px-3.5 py-2.5 rounded-xl text-xs bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] focus:border-[#f15e1c]"
              />
              <input
                type="text"
                value={heroForm.primaryCtaUrl}
                onChange={(e) => setHeroForm({ ...heroForm, primaryCtaUrl: e.target.value })}
                placeholder="/contact"
                className="px-3.5 py-2.5 rounded-xl text-xs bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] focus:border-[#f15e1c]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
              Secondary CTA Button Label &amp; Link
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={heroForm.secondaryCtaText}
                onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                placeholder="Button Label"
                className="px-3.5 py-2.5 rounded-xl text-xs bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] focus:border-[#f15e1c]"
              />
              <input
                type="text"
                value={heroForm.secondaryCtaUrl}
                onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaUrl: e.target.value })}
                placeholder="#services"
                className="px-3.5 py-2.5 rounded-xl text-xs bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] focus:border-[#f15e1c]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-[#EFE2D6] dark:border-[#1f1f1f]">
          <Button type="submit" variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />}>
            Save All Hero Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
