"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useSiteConfig } from "@/lib/site-config";
import { useSiteContent } from "@/lib/site-content";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  Shield,
  MessageSquare,
  Layout,
  Phone,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Sliders,
  LogOut,
  Server,
  Save,
  Eye,
  Plus,
  Trash2,
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
    updateSEO,
    updateLegal,
    resetAllContent,
  } = useSiteContent();

  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Local form states for active tab
  const [heroForm, setHeroForm] = React.useState(content.hero);
  const [footerForm, setFooterForm] = React.useState(content.footer);
  const [seoForm, setSeoForm] = React.useState(content.seo);
  const [legalForm, setLegalForm] = React.useState(content.legal);

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/${locale}/admin/login`);
    }
  }, [isAuthenticated, locale, router]);

  React.useEffect(() => {
    setHeroForm(content.hero);
    setFooterForm(content.footer);
    setSeoForm(content.seo);
    setLegalForm(content.legal);
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
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl">
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

          <div className="flex items-center gap-3">
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
            {/* Live Status Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Website Status", value: "LIVE", active: true },
                { label: "Chatbot Widget", value: config.chatbotEnabled ? "ENABLED" : "DISABLED", active: config.chatbotEnabled },
                { label: "Animations", value: config.animationsEnabled ? "ENABLED" : "DISABLED", active: config.animationsEnabled },
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
                    <span
                      className={`w-3 h-3 rounded-full ${
                        stat.active ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Shortcuts */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-4">
              <h2 className="text-base font-bold font-display flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E8672A]" />
                <span>Quick Content Management Shortcuts</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {[
                  { label: "Edit Hero & Positioning", tab: "hero" },
                  { label: "Manage 7 Practices", tab: "services" },
                  { label: "Edit Industry Verticals", tab: "industries" },
                  { label: "Manage Case Studies", tab: "casestudies" },
                  { label: "Edit 5-Step Process", tab: "methodology" },
                  { label: "Manage Testimonials", tab: "testimonials" },
                  { label: "Footer & Social Links", tab: "footer" },
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

            {/* Section Visibility Toggles */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-4">
              <h2 className="text-base font-bold font-display flex items-center gap-2">
                <Layout className="w-4 h-4 text-[#E8672A]" />
                <span>Homepage Section Visibilities</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { key: "trustedClientsVisible", label: "Moving Client Logo Strip" },
                  { key: "servicesVisible", label: "7 Core Practices Grid" },
                  { key: "industriesVisible", label: "Industry Verticals Matrix" },
                  { key: "processVisible", label: "5-Step Execution Timeline" },
                  { key: "testimonialsVisible", label: "Client Testimonials Slider" },
                  { key: "caseStudiesVisible", label: "Featured Case Studies" },
                ].map((sec) => {
                  const isVis = config[sec.key as keyof typeof config] !== false;
                  return (
                    <div
                      key={sec.key}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613]"
                    >
                      <span className="text-xs font-bold">{sec.label}</span>
                      <button
                        type="button"
                        onClick={() => {
                          updateConfig(sec.key as any, !isVis);
                          showToast(`${sec.label} ${!isVis ? "Visible" : "Hidden"}`);
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isVis ? "bg-emerald-500 text-white" : "bg-[#EFE2D6] dark:bg-[#2C241E] text-[#7A6A5F]"
                        }`}
                      >
                        {isVis ? "Visible" : "Hidden"}
                      </button>
                    </div>
                  );
                })}
              </div>
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
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold">Main Headline</label>
                <textarea
                  rows={2}
                  value={heroForm.title}
                  onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold">Sub-headline Description</label>
                <textarea
                  rows={3}
                  value={heroForm.description}
                  onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold">Primary CTA Button Text</label>
                  <input
                    type="text"
                    value={heroForm.primaryCtaText}
                    onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold">Primary CTA Link URL</label>
                  <input
                    type="text"
                    value={heroForm.primaryCtaUrl}
                    onChange={(e) => setHeroForm({ ...heroForm, primaryCtaUrl: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="md" className="rounded-xl" leftIcon={<Save className="w-4 h-4" />}>
                Save Hero Content
              </Button>
            </form>
          </div>
        )}

        {/* TAB 3: 7 CORE PRACTICES MANAGER */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl">
              <div>
                <h2 className="text-lg font-bold font-display flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#E8672A]" />
                  <span>7 Core Practices / Services Manager</span>
                </h2>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] mt-0.5">
                  Edit titles, descriptions, capabilities, and Maintenance Mode status
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.services.map((svc) => {
                const isEnabled = config.serviceStates?.[svc.slug] !== false;
                return (
                  <div
                    key={svc.slug}
                    className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-[#EFE2D6] dark:border-[#2C241E]">
                      <span className="text-sm font-bold font-display text-[#E8672A]">
                        {svc.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          toggleServiceState(svc.slug);
                          showToast(`${svc.title} status updated`);
                        }}
                        className={`text-xs px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                          isEnabled ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                        }`}
                      >
                        {isEnabled ? "Active" : "Maintenance"}
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold">Short Description</label>
                      <textarea
                        rows={2}
                        value={svc.description}
                        onChange={(e) => updateService(svc.slug, { description: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold">Key Capabilities (Category: items; Category2: items)</label>
                      <input
                        type="text"
                        value={svc.capabilities.map((c) => `${c.category}: ${c.items.join(", ")}`).join("; ")}
                        onChange={(e) => {
                          const categories = e.target.value.split(";").map((catStr) => {
                            const parts = catStr.split(":");
                            const catName = (parts[0] || "Capability").trim();
                            const items = (parts[1] || "").split(",").map((i) => i.trim()).filter(Boolean);
                            return { category: catName, items };
                          });
                          updateService(svc.slug, { capabilities: categories });
                        }}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                      />
                    </div>

                    <div className="pt-2 flex justify-between items-center text-xs">
                      <a
                        href={`/services/${svc.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E8672A] font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        Preview Service Page &rarr;
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: INDUSTRY SOLUTIONS MANAGER */}
        {activeTab === "industries" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#E8672A]" />
                <span>Industry Verticals Matrix Manager</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.industries.map((ind) => (
                <div
                  key={ind.slug}
                  className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-4"
                >
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Vertical Name</label>
                    <input
                      type="text"
                      value={ind.name}
                      onChange={(e) => updateIndustry(ind.slug, { name: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Description</label>
                    <textarea
                      rows={3}
                      value={ind.description}
                      onChange={(e) => updateIndustry(ind.slug, { description: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CASE STUDIES MANAGER */}
        {activeTab === "casestudies" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#E8672A]" />
                <span>Enterprise Case Studies Manager</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.caseStudies.map((cs) => (
                <div
                  key={cs.slug}
                  className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-4"
                >
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Case Study Title</label>
                    <input
                      type="text"
                      value={cs.title}
                      onChange={(e) => updateCaseStudy(cs.slug, { title: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Client Name</label>
                    <input
                      type="text"
                      value={cs.client}
                      onChange={(e) => updateCaseStudy(cs.slug, { client: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: METHODOLOGY MANAGER */}
        {activeTab === "methodology" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <Workflow className="w-5 h-5 text-[#E8672A]" />
                <span>5-Step Execution Methodology Manager</span>
              </h2>
            </div>

            <div className="space-y-4">
              {content.processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Step {step.step} Title</label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => updateProcessStep(idx, { title: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Description</label>
                    <input
                      type="text"
                      value={step.description}
                      onChange={(e) => updateProcessStep(idx, { description: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Deliverable Badge</label>
                    <input
                      type="text"
                      value={step.deliverable}
                      onChange={(e) => updateProcessStep(idx, { deliverable: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: TESTIMONIALS MANAGER */}
        {activeTab === "testimonials" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <Quote className="w-5 h-5 text-[#E8672A]" />
                <span>Client Testimonials Manager</span>
              </h2>
            </div>

            <div className="space-y-4">
              {content.testimonials.map((t, idx) => (
                <div
                  key={t.id}
                  className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold">Author Name</label>
                      <input
                        type="text"
                        value={t.author}
                        onChange={(e) => updateTestimonial(idx, { author: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold">Role &amp; Company</label>
                      <input
                        type="text"
                        value={`${t.role}, ${t.company}`}
                        onChange={(e) => updateTestimonial(idx, { role: e.target.value.split(",")[0], company: e.target.value.split(",")[1] || "" })}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold">Location</label>
                      <input
                        type="text"
                        value={t.location}
                        onChange={(e) => updateTestimonial(idx, { location: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Quote Text</label>
                    <textarea
                      rows={2}
                      value={t.quote}
                      onChange={(e) => updateTestimonial(idx, { quote: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: FOOTER & SOCIAL LINKS */}
        {activeTab === "footer" && (
          <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-6">
            <h2 className="text-lg font-bold font-display flex items-center gap-2">
              <Share2 className="w-5 h-5 text-[#E8672A]" />
              <span>Footer, Regional Offices &amp; Social Links</span>
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateFooter(footerForm);
                showToast("Footer and contact links saved successfully");
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold">India Regional Phone</label>
                  <input
                    type="text"
                    value={footerForm.indiaPhone}
                    onChange={(e) => setFooterForm({ ...footerForm, indiaPhone: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold">UAE Regional Phone</label>
                  <input
                    type="text"
                    value={footerForm.uaePhone}
                    onChange={(e) => setFooterForm({ ...footerForm, uaePhone: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold">Support Email</label>
                  <input
                    type="email"
                    value={footerForm.supportEmail}
                    onChange={(e) => setFooterForm({ ...footerForm, supportEmail: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold">LinkedIn Company URL</label>
                <input
                  type="url"
                  value={footerForm.linkedinUrl}
                  onChange={(e) => setFooterForm({ ...footerForm, linkedinUrl: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
              </div>

              <Button type="submit" variant="primary" size="md" className="rounded-xl" leftIcon={<Save className="w-4 h-4" />}>
                Save Footer &amp; Contact Info
              </Button>
            </form>
          </div>
        )}

        {/* TAB 9: CHATBOT CONTROL CENTER */}
        {activeTab === "chatbot" && (
          <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-6">
            <h2 className="text-lg font-bold font-display flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#E8672A]" />
              <span>Arav Assistant Chatbot Control Center</span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613]">
                <div>
                  <div className="text-sm font-bold">Global Chatbot Launcher</div>
                  <div className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                    Toggle assistant visibility on the public website
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateConfig("chatbotEnabled", !config.chatbotEnabled);
                    showToast(`Chatbot ${!config.chatbotEnabled ? "Enabled" : "Disabled"}`);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    config.chatbotEnabled ? "bg-[#E8672A] text-white" : "bg-[#EFE2D6] dark:bg-[#2C241E] text-[#7A6A5F]"
                  }`}
                >
                  {config.chatbotEnabled ? "Enabled" : "Disabled"}
                </button>
              </div>

              <div className="space-y-2 p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613]">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span>Idle Trigger Delay (Seconds)</span>
                  <span className="text-[#E8672A]">{config.chatbotDelaySeconds}s</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={30}
                  step={1}
                  value={config.chatbotDelaySeconds}
                  onChange={(e) => updateConfig("chatbotDelaySeconds", Number(e.target.value))}
                  className="w-full accent-[#E8672A] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: GLOBAL SEO & LEGAL */}
        {activeTab === "seo" && (
          <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-6">
            <h2 className="text-lg font-bold font-display flex items-center gap-2">
              <Search className="w-5 h-5 text-[#E8672A]" />
              <span>Global SEO &amp; Meta Settings</span>
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateSEO(seoForm);
                showToast("Global SEO metadata saved successfully");
              }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-bold">Global Title Tag</label>
                <input
                  type="text"
                  value={seoForm.globalTitle}
                  onChange={(e) => setSeoForm({ ...seoForm, globalTitle: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold">Global Meta Description</label>
                <textarea
                  rows={3}
                  value={seoForm.metaDescription}
                  onChange={(e) => setSeoForm({ ...seoForm, metaDescription: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#2C241E] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
              </div>

              <Button type="submit" variant="primary" size="md" className="rounded-xl" leftIcon={<Save className="w-4 h-4" />}>
                Save SEO Metadata
              </Button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
