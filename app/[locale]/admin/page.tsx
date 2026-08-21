"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useSiteConfig } from "@/lib/site-config";
import { useSiteContent, SocialLinkItem, LanguageItem } from "@/lib/site-content";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  Shield,
  MessageSquare,
  Layout,
  RotateCcw,
  Sparkles,
  Save,
  ExternalLink,
  Globe,
  Briefcase,
  Building2,
  FileText,
  Workflow,
  Quote,
  Share2,
  Search,
  ShieldCheck,
  Languages,
  Plus,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const {
    config,
    updateConfig,
    toggleServiceState,
    resetConfig,
    isAuthenticated,
    logoutAdmin,
  } = useSiteConfig();

  const {
    content,
    updateHero,
    updateService,
    updateIndustry,
    updateCaseStudy,
    updateProcessStep,
    updateTestimonial,
    updateFooter,
    updateSocialLink,
    addSocialLink,
    deleteSocialLink,
    updateLanguage,
    toggleLanguage,
    updateChatbotKB,
    updateSEO,
    resetAllContent,
  } = useSiteContent();

  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Local form states
  const [heroForm, setHeroForm] = React.useState(content.hero);
  const [footerForm, setFooterForm] = React.useState(content.footer);
  const [seoForm, setSeoForm] = React.useState(content.seo);
  const [newSocialForm, setNewSocialForm] = React.useState({
    name: "",
    icon: "Globe",
    url: "",
  });

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/${locale}/admin/login`);
    }
  }, [isAuthenticated, locale, router]);

  React.useEffect(() => {
    setHeroForm(content.hero);
    setFooterForm(content.footer);
    setSeoForm(content.seo);
  }, [content]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-[#FAF5EE] dark:bg-[#0E0C0A] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#E8672A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
            Verifying admin authentication...
          </p>
        </div>
      </div>
    );
  }

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleLogout = () => {
    logoutAdmin();
    router.replace(`/${locale}/admin/login`);
  };

  return (
    <div className="min-h-screen bg-[#FAF5EE] dark:bg-[#0E0C0A] text-[#3A2E27] dark:text-[#FAF5EE] flex flex-col lg:flex-row transition-colors duration-300">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#E8672A] text-white text-xs font-semibold shadow-2xl animate-in fade-in slide-in-from-top-4">
          ✓ {toastMessage}
        </div>
      )}

      {/* Left Persistent Navigation Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main CMS Editor Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto mt-14 lg:mt-0 space-y-8">
        {/* Top Header Bar & Global Admin Search (Task T) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#FCE3D3]/60 dark:bg-[#2C221B] text-[#E8672A]">
                <Shield className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold font-display">
                Arav Innovations CMS Control Center
              </h1>
            </div>
            <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] pl-9">
              Managing Tab: <strong className="text-[#E8672A] uppercase">{activeTab}</strong> &bull; Changes update public website dynamically
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Global Admin Search Bar (Task T) */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#7A6A5F] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search CMS settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl text-xs bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] focus:border-[#E8672A] w-48 sm:w-60"
              />
            </div>

            <a
              href={`/${locale}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] text-[#3A2E27] dark:text-[#FAF5EE] hover:border-[#E8672A]"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#E8672A]" />
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                resetConfig();
                resetAllContent();
                showToast("All content & settings reset to defaults");
              }}
              className="rounded-xl border-[#EFE2D6] dark:border-[#2C241E]"
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Reset Defaults
            </Button>
          </div>
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Quick Actions Shortcuts (Task S) */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-4">
              <h2 className="text-base font-bold font-display flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E8672A]" />
                <span>Quick Actions Shortcuts</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { label: "Edit Hero Text", tab: "hero" },
                  { label: "Manage 7 Practices", tab: "services" },
                  { label: "Manage Social URLs", tab: "socials" },
                  { label: "Languages & RTL", tab: "languages" },
                  { label: "Chatbot Settings", tab: "chatbot" },
                ].map((act, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveTab(act.tab)}
                    className="p-3.5 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] text-xs font-semibold text-left hover:border-[#E8672A] transition-all cursor-pointer hover:shadow-xs"
                  >
                    {act.label} &rarr;
                  </button>
                ))}
              </div>
            </div>

            {/* Live Status Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Website Status", value: "LIVE", active: true },
                { label: "Active Social Links", value: `${(content.socialLinks || []).filter((s) => s.enabled).length} ACTIVE`, active: true },
                { label: "Languages Enabled", value: `${(content.languages || []).filter((l) => l.enabled).length} ACTIVE`, active: true },
                { label: "Practices Active", value: `${Object.values(config.serviceStates || {}).filter(Boolean).length} / 8 ACTIVE`, active: true },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm flex flex-col justify-between space-y-2"
                >
                  <span className="text-xs font-mono text-[#7A6A5F] dark:text-[#B8ACA0] uppercase">
                    {stat.label}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-extrabold font-display">
                      {stat.value}
                    </span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: HERO & HOMEPAGE EDITOR */}
        {activeTab === "hero" && (
          <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-6">
            <h2 className="text-lg font-bold font-display flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#E8672A]" />
              <span>Homepage Hero Content Editor</span>
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateHero(heroForm);
                showToast("Homepage Hero content saved successfully");
              }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-bold">Eyebrow Tagline</label>
                <input
                  type="text"
                  value={heroForm.eyebrow}
                  onChange={(e) => setHeroForm({ ...heroForm, eyebrow: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold">Main Headline</label>
                <textarea
                  rows={2}
                  value={heroForm.title}
                  onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold">Sub-headline Description</label>
                <textarea
                  rows={3}
                  value={heroForm.description}
                  onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
              </div>

              <Button type="submit" variant="primary" size="md" className="rounded-xl" leftIcon={<Save className="w-4 h-4" />}>
                Save Hero Content
              </Button>
            </form>
          </div>
        )}

        {/* TAB 3: SOCIAL MEDIA & DIGITAL PRESENCE MANAGER (Tasks C & D) */}
        {activeTab === "socials" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-2">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#E8672A]" />
                <span>Social Media &amp; Digital Presence Manager</span>
              </h2>
              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                Add, edit, enable/disable, or remove social channels and digital presence links dynamically
              </p>
            </div>

            {/* Social Links List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(content.socialLinks || []).map((social) => (
                <div
                  key={social.id}
                  className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-md space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#EFE2D6] dark:border-[#2C241E]">
                    <span className="text-xs font-bold font-display text-[#E8672A]">
                      {social.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          updateSocialLink(social.id, { enabled: !social.enabled });
                          showToast(`${social.name} ${!social.enabled ? "Enabled" : "Disabled"}`);
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          social.enabled ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                        }`}
                      >
                        {social.enabled ? "Enabled" : "Disabled"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteSocialLink(social.id);
                          showToast(`${social.name} deleted`);
                        }}
                        className="p-1 text-rose-500 hover:bg-rose-500/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Target URL</label>
                    <input
                      type="url"
                      value={social.url}
                      onChange={(e) => updateSocialLink(social.id, { url: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Social Platform Form */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-4">
              <h3 className="text-sm font-bold font-display flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#E8672A]" />
                <span>Add New Social / Digital Platform</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Platform Name (e.g. GitHub)"
                  value={newSocialForm.name}
                  onChange={(e) => setNewSocialForm({ ...newSocialForm, name: e.target.value })}
                  className="text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
                <input
                  type="url"
                  placeholder="Platform URL (https://...)"
                  value={newSocialForm.url}
                  onChange={(e) => setNewSocialForm({ ...newSocialForm, url: e.target.value })}
                  className="text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={() => {
                    if (!newSocialForm.name || !newSocialForm.url) return;
                    addSocialLink({
                      id: newSocialForm.name.toLowerCase().replace(/\s+/g, "-"),
                      name: newSocialForm.name,
                      icon: newSocialForm.icon,
                      url: newSocialForm.url,
                      enabled: true,
                      openNewTab: true,
                      order: (content.socialLinks || []).length + 1,
                    });
                    setNewSocialForm({ name: "", icon: "Globe", url: "" });
                    showToast(`${newSocialForm.name} platform added`);
                  }}
                  className="rounded-xl"
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  Add Platform
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LANGUAGES & MULTILINGUAL MANAGER (Tasks L, O, P) */}
        {activeTab === "languages" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-2">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <Languages className="w-5 h-5 text-[#E8672A]" />
                <span>Languages &amp; Multilingual System Manager</span>
              </h2>
              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                Control active languages, LTR/RTL layout direction, and language availability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(content.languages || []).map((lang) => (
                <div
                  key={lang.code}
                  className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-md space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#EFE2D6] dark:border-[#2C241E]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono uppercase text-[#E8672A]">
                        {lang.code}
                      </span>
                      <span className="text-sm font-bold font-display">
                        {lang.name} ({lang.nativeName})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        toggleLanguage(lang.code);
                        showToast(`${lang.name} ${!lang.enabled ? "Enabled" : "Disabled"}`);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        lang.enabled ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                      }`}
                    >
                      {lang.enabled ? "Enabled" : "Disabled"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#7A6A5F]">Direction:</span>
                    <span className="font-bold uppercase font-mono">{lang.dir}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CHATBOT KNOWLEDGE BASE (Tasks E, F, G, H, I) */}
        {activeTab === "chatbot" && (
          <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-6">
            <h2 className="text-lg font-bold font-display flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#E8672A]" />
              <span>Arav Assistant Chatbot Knowledge Base</span>
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold">Default Greeting Message</label>
                <input
                  type="text"
                  value={content.chatbotKB?.defaultGreeting || ""}
                  onChange={(e) => updateChatbotKB({ defaultGreeting: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold">Fallback Response</label>
                <textarea
                  rows={2}
                  value={content.chatbotKB?.fallbackResponse || ""}
                  onChange={(e) => updateChatbotKB({ fallbackResponse: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
              </div>

              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => showToast("Chatbot Knowledge Base saved")}
                className="rounded-xl"
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Knowledge Base
              </Button>
            </div>
          </div>
        )}

        {/* TAB 6: SYSTEM & ANIMATION CONTROLS (Task R) */}
        {activeTab === "system" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-2">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E8672A]" />
                <span>Global Animation &amp; System Controls</span>
              </h2>
              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                Control global page animations, scroll reveals, hover interactions, and service maintenance states
              </p>
            </div>

            {/* Animation Controls Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-md flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold font-display block">Global Animations</span>
                  <span className="text-[11px] text-[#7A6A5F]">Master switch for all website motion</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateConfig("animationsEnabled", !config.animationsEnabled);
                    showToast(`Global Animations ${!config.animationsEnabled ? "ON" : "OFF"}`);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    config.animationsEnabled !== false ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                  }`}
                >
                  {config.animationsEnabled !== false ? "ON" : "OFF"}
                </button>
              </div>

              <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-md flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold font-display block">Hover Effects</span>
                  <span className="text-[11px] text-[#7A6A5F]">Button &amp; card hover feedback</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateConfig("hoverEffectsEnabled", !config.hoverEffectsEnabled);
                    showToast(`Hover Effects ${!config.hoverEffectsEnabled ? "ON" : "OFF"}`);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    config.hoverEffectsEnabled !== false ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                  }`}
                >
                  {config.hoverEffectsEnabled !== false ? "ON" : "OFF"}
                </button>
              </div>

              <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-md flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold font-display block">Scroll Reveal Animations</span>
                  <span className="text-[11px] text-[#7A6A5F]">Intersection Observer section entrances</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateConfig("scrollAnimationsEnabled", !config.scrollAnimationsEnabled);
                    showToast(`Scroll Animations ${!config.scrollAnimationsEnabled ? "ON" : "OFF"}`);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    config.scrollAnimationsEnabled !== false ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                  }`}
                >
                  {config.scrollAnimationsEnabled !== false ? "ON" : "OFF"}
                </button>
              </div>

              <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-md flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold font-display block">Page Entrance Sequence</span>
                  <span className="text-[11px] text-[#7A6A5F]">Smooth top-level page loading</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateConfig("entranceAnimationsEnabled", !config.entranceAnimationsEnabled);
                    showToast(`Entrance Animations ${!config.entranceAnimationsEnabled ? "ON" : "OFF"}`);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    config.entranceAnimationsEnabled !== false ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                  }`}
                >
                  {config.entranceAnimationsEnabled !== false ? "ON" : "OFF"}
                </button>
              </div>
            </div>

            {/* Service Maintenance Controls */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-4">
              <h3 className="text-sm font-bold font-display">Per-Service Maintenance Toggles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(config.serviceStates || {}).map(([slug, state]) => (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => {
                      toggleServiceState(slug);
                      showToast(`${slug} state updated`);
                    }}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left cursor-pointer ${
                      state
                        ? "bg-[#FCE3D3]/50 border-[#E8672A]/40 text-[#E8672A]"
                        : "bg-rose-500/10 border-rose-500/30 text-rose-500"
                    }`}
                  >
                    <div className="font-mono text-[10px] uppercase truncate">{slug}</div>
                    <div>{state ? "✓ ACTIVE" : "⚠️ MAINTENANCE"}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
