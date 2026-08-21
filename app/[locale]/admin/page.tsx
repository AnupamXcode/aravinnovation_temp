"use client";

import * as React from "react";
import { useSiteConfig } from "@/lib/site-config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sliders,
  Bot,
  Layers,
  Settings,
  RotateCcw,
  CheckCircle2,
  Lock,
  Globe2,
  Megaphone,
} from "lucide-react";

export default function AdminPage() {
  const { config, updateConfig, resetConfig } = useSiteConfig();
  const [savedNotice, setSavedNotice] = React.useState(false);

  const handleToggle = (key: any) => {
    updateConfig(key, !config[key as keyof typeof config]);
    triggerNotice();
  };

  const triggerNotice = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="min-h-screen py-24 md:py-32 bg-[#FFFDF9] dark:bg-[#12100E] text-[#3A2E27] dark:text-[#FAF5EE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" size="md" className="rounded-full px-3.5">
                <Lock className="w-3 h-3 text-[#E8672A] mr-1" />
                Administrative Control Center
              </Badge>
              {savedNotice && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Changes Applied Live!
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold font-display tracking-tight">
              Website One-Click Controls
            </h1>
            <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
              Toggle website behaviors, section visibilities, chatbot parameters, and contact info instantly.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              resetConfig();
              triggerNotice();
            }}
            className="rounded-full gap-2 border-[#EFE2D6] dark:border-[#2C241E]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#E8672A]" />
            <span>Reset Defaults</span>
          </Button>
        </div>

        {/* Control Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: Chatbot & Interaction Parameters */}
          <div className="p-7 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-lg space-y-6">
            <div className="flex items-center gap-2.5 font-bold font-display text-base border-b border-[#EFE2D6] dark:border-[#2C241E] pb-3">
              <Bot className="w-5 h-5 text-[#E8672A]" />
              <span>Chatbot &amp; Assistant Settings</span>
            </div>

            <div className="space-y-5">
              {/* Chatbot Enabled Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Enable Chatbot Assistant</div>
                  <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">Display interactive assistant launcher on site</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle("chatbotEnabled")}
                  className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center ${
                    config.chatbotEnabled ? "bg-[#E8672A] justify-end" : "bg-[#EFE2D6] dark:bg-[#2C241E] justify-start"
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </button>
              </div>

              {/* Idle Delay Slider */}
              <div className="space-y-2 pt-2 border-t border-[#EFE2D6]/60 dark:border-[#2C241E]/60">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Idle Trigger Delay</span>
                  <span className="font-mono text-[#E8672A]">{config.chatbotDelaySeconds} Seconds</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="30"
                  value={config.chatbotDelaySeconds}
                  onChange={(e) => {
                    updateConfig("chatbotDelaySeconds", Number(e.target.value));
                    triggerNotice();
                  }}
                  className="w-full accent-[#E8672A] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Section Visibility Controls */}
          <div className="p-7 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-lg space-y-6">
            <div className="flex items-center gap-2.5 font-bold font-display text-base border-b border-[#EFE2D6] dark:border-[#2C241E] pb-3">
              <Layers className="w-5 h-5 text-[#E8672A]" />
              <span>Homepage Section Visibilities</span>
            </div>

            <div className="space-y-4 text-xs">
              {[
                { key: "trustedClientsVisible", label: "Trusted Clients Moving Strip", desc: "Infinite horizontal marquee" },
                { key: "servicesVisible", label: "Our 7 Practices Section", desc: "Core services grid" },
                { key: "industriesVisible", label: "Industry Solutions Matrix", desc: "Vertical frameworks" },
                { key: "processVisible", label: "5-Step Execution Methodology", desc: "Interactive timeline" },
                { key: "testimonialsVisible", label: "Client Testimonials ('What They Say')", desc: "Slider carousel" },
                { key: "caseStudiesVisible", label: "Featured Case Studies", desc: "Proof tiles" },
                { key: "blogVisible", label: "Blog & Insights Section", desc: "Articles feed" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-1">
                  <div>
                    <div className="font-semibold text-sm">{item.label}</div>
                    <span className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">{item.desc}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle(item.key)}
                    className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold cursor-pointer transition-all ${
                      config[item.key as keyof typeof config]
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                        : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                    }`}
                  >
                    {config[item.key as keyof typeof config] ? "Visible" : "Hidden"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Contact Details & Social Link Overrides */}
          <div className="p-7 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-lg space-y-6 md:col-span-2">
            <div className="flex items-center gap-2.5 font-bold font-display text-base border-b border-[#EFE2D6] dark:border-[#2C241E] pb-3">
              <Globe2 className="w-5 h-5 text-[#E8672A]" />
              <span>Contact Information &amp; Social Links</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold block">India Phone Number</label>
                <input
                  type="text"
                  value={config.phoneIndia}
                  onChange={(e) => {
                    updateConfig("phoneIndia", e.target.value);
                    triggerNotice();
                  }}
                  className="w-full p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FFFDF9] dark:bg-[#161310] font-mono text-xs focus:ring-1 focus:ring-[#E8672A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold block">UAE Phone Number</label>
                <input
                  type="text"
                  value={config.phoneUAE}
                  onChange={(e) => {
                    updateConfig("phoneUAE", e.target.value);
                    triggerNotice();
                  }}
                  className="w-full p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FFFDF9] dark:bg-[#161310] font-mono text-xs focus:ring-1 focus:ring-[#E8672A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold block">Support Email</label>
                <input
                  type="email"
                  value={config.supportEmail}
                  onChange={(e) => {
                    updateConfig("supportEmail", e.target.value);
                    triggerNotice();
                  }}
                  className="w-full p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FFFDF9] dark:bg-[#161310] font-mono text-xs focus:ring-1 focus:ring-[#E8672A]"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-3 pt-2">
                <label className="font-semibold block">LinkedIn Company Page URL</label>
                <input
                  type="url"
                  value={config.linkedinUrl}
                  onChange={(e) => {
                    updateConfig("linkedinUrl", e.target.value);
                    triggerNotice();
                  }}
                  className="w-full p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FFFDF9] dark:bg-[#161310] font-mono text-xs focus:ring-1 focus:ring-[#E8672A]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
