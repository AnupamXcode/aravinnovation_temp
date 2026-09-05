"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useSiteConfig } from "@/lib/site-config";
import {
  useSiteContent,
  SocialLinkItem,
  LanguageItem,
  ChatbotCommandItem,
  ChatbotCTAButton,
  Service,
  IndustrySolution,
  CaseStudy,
  ProcessStepItem,
  TestimonialItem,
} from "@/lib/site-content";
import { productsData, Product } from "@/data/products";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SEOAdminPanel } from "@/components/admin/SEOAdminPanel";
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
  ToggleLeft,
  ToggleRight,
  PhoneCall,
  SlidersHorizontal,
  Mail,
  ChevronDown,
  Edit3,
  Palette,
  Power,
  ShieldAlert,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const {
    config,
    updateConfig,
    updateSectionTheme,
    updateCardStyle,
    toggleServiceState,
    toggleWebsitePower,
    resetConfig,
    isAuthenticated,
    logoutAdmin,
  } = useSiteConfig();

  const {
    content,
    updateHero,
    updateService,
    addService,
    deleteService,
    updateIndustry,
    addIndustry,
    deleteIndustry,
    updateCaseStudy,
    addCaseStudy,
    deleteCaseStudy,
    updateProcessStep,
    updateTestimonial,
    addTestimonial,
    deleteTestimonial,
    updateFooter,
    updateSocialLink,
    addSocialLink,
    deleteSocialLink,
    updateLanguage,
    toggleLanguage,
    updateChatbotKB,
    addChatbotCommand,
    updateChatbotCommand,
    deleteChatbotCommand,
    toggleChatbotCommand,
    updateSEO,
    updateLegal,
    resetAllContent,
  } = useSiteContent();

  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [showPowerConfirm, setShowPowerConfirm] = React.useState(false);

  // Local form states
  const [heroForm, setHeroForm] = React.useState(content.hero);
  const [footerForm, setFooterForm] = React.useState(content.footer);
  const [seoForm, setSeoForm] = React.useState(content.seo);
  const [legalForm, setLegalForm] = React.useState(content.legal);

  // Social form state
  const [newSocialForm, setNewSocialForm] = React.useState({
    name: "",
    icon: "Globe",
    url: "",
  });

  // Chatbot command form state
  const [showAddCommandForm, setShowAddCommandForm] = React.useState(false);
  const [newCmdKeyword, setNewCmdKeyword] = React.useState("");
  const [newCmdAltKeywords, setNewCmdAltKeywords] = React.useState("");
  const [newCmdIntent, setNewCmdIntent] = React.useState("");
  const [newCmdResponse, setNewCmdResponse] = React.useState("");
  const [newCmdFollowUp, setNewCmdFollowUp] = React.useState("");
  const [newCmdRelatedService, setNewCmdRelatedService] = React.useState("");
  const [newCmdRelatedPage, setNewCmdRelatedPage] = React.useState("");
  const [newCmdPriority, setNewCmdPriority] = React.useState(10);
  const [newCmdCtaLabel, setNewCmdCtaLabel] = React.useState("Explore More");
  const [newCmdCtaType, setNewCmdCtaType] = React.useState<ChatbotCTAButton["type"]>("page");
  const [newCmdCtaValue, setNewCmdCtaValue] = React.useState("/services");

  // Inline editing states
  const [editingServiceSlug, setEditingServiceSlug] = React.useState<string | null>(null);
  const [productsList, setProductsList] = React.useState<Product[]>(productsData);
  const [editingProductSlug, setEditingProductSlug] = React.useState<string | null>(null);

  // Media Library & Focal Point State
  const [mediaItems, setMediaItems] = React.useState([
    { id: "media-1", title: "SEO Desktop Hero", category: "SEO Services", desktopUrl: "/images/seo-hero-bg.png", mobileUrl: "/images/seo-mobile-cropped.png", altText: "SEO Search Intelligence", focalX: 80, focalY: 50, scale: 100, overlayOpacity: 20 },
    { id: "media-2", title: "AI Portfolio Desktop Hero", category: "AI Portfolio", desktopUrl: "/images/ai-portfolio-hero-bg.png", mobileUrl: "/images/ai-portfolio-mobile-cropped.png", altText: "Enterprise AI & Intelligent Systems", focalX: 75, focalY: 50, scale: 100, overlayOpacity: 20 },
    { id: "media-3", title: "IT Strategy Hero BG", category: "IT Strategy", desktopUrl: "/images/it-strategy-hero-bg.png", mobileUrl: "/images/it-strategy-main.png", altText: "Enterprise IT Strategy & Implementation", focalX: 85, focalY: 50, scale: 100, overlayOpacity: 20 },
    { id: "media-4", title: "Risk & Governance Hero BG", category: "Risk & Governance", desktopUrl: "/images/risk-compliance-hero-bg.png", mobileUrl: "/images/risk-compliance-mobile-cropped.png", altText: "Risk, Compliance & Governance", focalX: 80, focalY: 50, scale: 100, overlayOpacity: 20 },
    { id: "media-5", title: "Audit & Improvement Hero BG", category: "Audit & Improvement", desktopUrl: "/images/audit-improvement-hero-bg.png", mobileUrl: "/images/audit-improvement-mobile-cropped.png", altText: "Audit & Improvement Strategy", focalX: 80, focalY: 50, scale: 100, overlayOpacity: 20 },
    { id: "media-6", title: "Training & Staff Hero BG", category: "Training & Staff", desktopUrl: "/images/training-staff-hero-bg.png", mobileUrl: "/images/training-staff-mobile-cropped.png", altText: "Training & Staff Augmentation", focalX: 80, focalY: 50, scale: 100, overlayOpacity: 20 },
    { id: "media-7", title: "Web Dev Hero BG", category: "Web Development", desktopUrl: "/images/web-app-main-1.png", mobileUrl: "/images/web-app-main-2.png", altText: "Web & Application Development", focalX: 50, focalY: 50, scale: 100, overlayOpacity: 20 },
    { id: "media-8", title: "Digital Marketing Hero BG", category: "Digital Marketing", desktopUrl: "/images/digital-marketing-main-1.png", mobileUrl: "/images/digital-marketing-main-2.png", altText: "Digital Marketing & Brand Development", focalX: 50, focalY: 50, scale: 100, overlayOpacity: 20 },
    { id: "media-9", title: "Arav Brand Logo", category: "General", desktopUrl: "/logos/arav-logo.png", mobileUrl: "/logos/arav-logo.png", altText: "Arav Innovations Logo", focalX: 50, focalY: 50, scale: 100, overlayOpacity: 0 },
  ]);
  const [selectedMediaId, setSelectedMediaId] = React.useState("media-1");
  const [previewDevice, setPreviewDevice] = React.useState<"desktop" | "tablet" | "mobile">("desktop");

  // Brand Colors Form State
  const [brandColorsForm, setBrandColorsForm] = React.useState({
    primary: "#F15E1C",
    secondary: "#2E936F",
    white: "#FFFFFF",
    lightYellow: "#FFEC69",
    gold: "#FAB60A",
    peach: "#F7D7B0",
    cardAccent: "#F15E1C",
    badgeBg: "#F7D7B0",
    iconAccent: "#2E936F",
    buttonHover: "#D8480D",
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
    setLegalForm(content.legal);
  }, [content]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-[#FAF5EE] dark:bg-[#161310] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#f15e1c] border-t-transparent rounded-full animate-spin mx-auto" />
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

  // Admin Search filter logic
  const filteredTabItems = () => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const matches: { label: string; tab: string }[] = [];
    if ("homepage hero title eyebrow cta".includes(q)) matches.push({ label: "Homepage & Hero", tab: "hero" });
    if ("services 7 practices marketing web dev seo compliance audit".includes(q)) matches.push({ label: "7 Core Practices", tab: "services" });
    if ("industry solutions verticals ecommerce fintech saas".includes(q)) matches.push({ label: "Industry Solutions", tab: "industries" });
    if ("case studies proven track record metrics outcomes".includes(q)) matches.push({ label: "Case Studies", tab: "casestudies" });
    if ("methodology 5-step process execution delivery".includes(q)) matches.push({ label: "5-Step Methodology", tab: "methodology" });
    if ("testimonials client reviews quote author".includes(q)) matches.push({ label: "Client Testimonials", tab: "testimonials" });
    if ("footer india uae phone email address location copyright regional".includes(q)) matches.push({ label: "Footer & Regional", tab: "footer" });
    if ("social media linkedin instagram facebook whatsapp twitter youtube".includes(q)) matches.push({ label: "Social Media & URLs", tab: "socials" });
    if ("chatbot commands response intent keywords bot knowledge base".includes(q)) matches.push({ label: "Chatbot & Knowledge Base", tab: "chatbot" });
    if ("contact info leads phone email address form".includes(q)) matches.push({ label: "Contact Info & Leads", tab: "contact" });
    if ("languages translation rtl english hindi arabic".includes(q)) matches.push({ label: "Languages & RTL", tab: "languages" });
    if ("seo title meta canonical indexing search".includes(q)) matches.push({ label: "Global SEO", tab: "seo" });
    if ("legal privacy terms refund security dpdp".includes(q)) matches.push({ label: "Legal & DPDP Content", tab: "legal" });
    if ("system animations hover maintenance toggle".includes(q)) matches.push({ label: "Maintenance Controls", tab: "system" });
    return matches;
  };

  const searchMatches = filteredTabItems();

  return (
    <div data-admin-root="true" className="min-h-screen bg-[#FAF5EE] dark:bg-[#161310] text-[#3A2E27] dark:text-[#FAF5EE] flex flex-col lg:flex-row transition-colors duration-300">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl bg-[#f15e1c] text-white text-xs font-semibold shadow-2xl animate-in fade-in slide-in-from-top-4 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left Navigation Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main CMS Control Center Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto mt-14 lg:mt-0 space-y-8 max-w-[1600px]">
        {/* Top Header Bar & Global Admin Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#FCE3D3]/60 dark:bg-[#2C221B] text-[#f15e1c]">
                <Shield className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold font-display">
                Arav Innovations CMS Control Center
              </h1>
            </div>
            <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] pl-9">
              Managing Section: <strong className="text-[#f15e1c] uppercase">{activeTab}</strong> &bull; Updates propagate live across the website
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Global Admin Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#7A6A5F] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search CMS settings (e.g. phone, chatbot)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl text-xs bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] focus:border-[#f15e1c] w-48 sm:w-64"
              />
            </div>

            <a
              href={`/${locale}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] text-[#3A2E27] dark:text-[#FAF5EE] hover:border-[#f15e1c]"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#f15e1c]" />
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                resetConfig();
                resetAllContent();
                showToast("All content & settings reset to factory defaults");
              }}
              className="rounded-xl border-[#EFE2D6] dark:border-[#1f1f1f]"
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Reset Defaults
            </Button>
          </div>
        </div>

        {/* Global Admin Search Results Bar */}
        {searchMatches && searchMatches.length > 0 && (
          <div className="p-4 rounded-2xl bg-[#FCE3D3]/50 dark:bg-[#161616] border border-[#f15e1c]/30 space-y-2">
            <span className="text-xs font-bold text-[#f15e1c]">Search Matches:</span>
            <div className="flex flex-wrap gap-2">
              {searchMatches.map((m, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveTab(m.tab);
                    setSearchQuery("");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A1613] text-xs font-bold border border-[#f15e1c]/40 text-[#f15e1c] hover:bg-[#f15e1c] hover:text-white transition-all cursor-pointer"
                >
                  {m.label} &rarr;
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* MASTER WEBSITE ON/OFF CONTROL BANNER */}
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl transition-all ${
              config.websiteEnabled !== false
                ? "bg-gradient-to-r from-[#FFFDF9] via-[#FFF5EC] to-[#FDF0E6] dark:from-[#181411] dark:to-[#241B16] border-[#f15e1c]/30"
                : "bg-gradient-to-r from-red-950 via-rose-950 to-amber-950 border-red-500 text-white shadow-red-950/50"
            }`}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl ${
                      config.websiteEnabled !== false
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/50"
                    }`}>
                      <Power className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`text-[11px] font-extrabold uppercase font-mono tracking-wider px-2.5 py-0.5 rounded-full border ${
                        config.websiteEnabled !== false
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                          : "bg-red-500 text-white border-red-400"
                      }`}>
                        {config.websiteEnabled !== false ? "🟢 SYSTEM ONLINE & ACCESSIBLE" : "🔴 EMERGENCY SHUTDOWN ACTIVE"}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black font-display mt-1">
                        Master Website Power Switch
                      </h2>
                    </div>
                  </div>
                  <p className={`text-xs leading-relaxed max-w-2xl ${
                    config.websiteEnabled !== false ? "text-[#7A6A5F] dark:text-[#B8ACA0]" : "text-red-100"
                  }`}>
                    {config.websiteEnabled !== false
                      ? "The website is currently active and fully responding to all public visitors globally. Click below to instantly stop the entire website at once."
                      : "⚠️ ENTIRE WEBSITE IS STOPPED! Public access is halted and visitors see the Emergency Maintenance screen. Click below to turn the website back ON."}
                  </p>
                </div>

                {showPowerConfirm ? (
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#0a0a0a] border-2 border-amber-500 shadow-2xl space-y-3 shrink-0 max-w-sm animate-in fade-in">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-amber-600 dark:text-amber-400">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>CONFIRMATION REQUIRED</span>
                    </div>
                    <p className="text-xs text-[#3A2E27] dark:text-[#FAF5EE] font-semibold leading-snug">
                      {config.websiteEnabled !== false
                        ? "Are you sure you want to DISABLE the entire website for public visitors?"
                        : "Are you sure you want to ENABLE and publish the website live?"}
                    </p>
                    <div className="flex items-center gap-2 pt-1 justify-end">
                      <button
                        type="button"
                        onClick={() => setShowPowerConfirm(false)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] text-[#3A2E27] dark:text-[#FAF5EE] hover:bg-[#EFE2D6] cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const nextState = config.websiteEnabled === false;
                          toggleWebsitePower();
                          setShowPowerConfirm(false);
                          showToast(nextState ? "⚡ WEBSITE RESTORED BACK ONLINE!" : "🛑 MASTER SHUTDOWN ACTIVE - WEBSITE STOPPED!");
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold text-white shadow-lg cursor-pointer ${
                          config.websiteEnabled !== false
                            ? "bg-red-600 hover:bg-red-700 shadow-red-600/30"
                            : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30"
                        }`}
                      >
                        {config.websiteEnabled !== false ? "Yes, Disable Website" : "Yes, Enable Website"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowPowerConfirm(true)}
                    className={`px-6 py-4 rounded-2xl font-black text-sm shadow-2xl transition-all transform hover:scale-[1.02] active:scale-95 flex items-center gap-3 cursor-pointer shrink-0 border ${
                      config.websiteEnabled !== false
                        ? "bg-red-600 hover:bg-red-700 text-white border-red-500 shadow-red-600/30"
                        : "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-400 shadow-emerald-500/40 animate-bounce"
                    }`}
                  >
                    <Power className="w-5 h-5" />
                    <span>
                      {config.websiteEnabled !== false
                        ? "STOP ENTIRE WEBSITE AT ONCE"
                        : "START WEBSITE & GO LIVE"}
                    </span>
                  </button>
                )}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-4">
              <h2 className="text-base font-bold font-display flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#f15e1c]" />
                <span>Quick Actions Shortcuts</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[
                  { label: "Homepage & Hero", tab: "hero" },
                  { label: "7 Core Practices", tab: "services" },
                  { label: "Industry Solutions", tab: "industries" },
                  { label: "Case Studies", tab: "casestudies" },
                  { label: "5-Step Methodology", tab: "methodology" },
                  { label: "Client Testimonials", tab: "testimonials" },
                  { label: "Footer & Regional CMS", tab: "footer" },
                  { label: "Chatbot Commands", tab: "chatbot" },
                  { label: "Social Media URLs", tab: "socials" },
                  { label: "Global SEO", tab: "seo" },
                ].map((act, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveTab(act.tab)}
                    className="p-3.5 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] text-xs font-semibold text-left hover:border-[#f15e1c] transition-all cursor-pointer hover:shadow-xs"
                  >
                    {act.label} &rarr;
                  </button>
                ))}
              </div>
            </div>

            {/* Live System Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Website Status", value: config.websiteEnabled !== false ? "LIVE (ONLINE)" : "STOPPED (OFFLINE)", active: config.websiteEnabled !== false },
                { label: "Chatbot Master Switch", value: config.chatbotEnabled && content.chatbotKB?.masterEnabled !== false ? "ON" : "OFF", active: config.chatbotEnabled },
                { label: "Active Social Links", value: `${(content.socialLinks || []).filter((s) => s.enabled).length} ACTIVE`, active: true },
                { label: "Languages Enabled", value: `${(content.languages || []).filter((l) => l.enabled).length} ACTIVE`, active: true },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-sm flex flex-col justify-between space-y-2"
                >
                  <span className="text-xs font-mono text-[#7A6A5F] dark:text-[#B8ACA0] uppercase">
                    {stat.label}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-extrabold font-display">
                      {stat.value}
                    </span>
                    <span className={`w-3 h-3 rounded-full ${stat.active ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: MEDIA LIBRARY & FOCAL POINT EDITOR */}
        {/* ========================================================================= */}
        {activeTab === "media" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold font-display flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#f15e1c]" />
                    <span>Media Manager &amp; Visual Focal Point Editor</span>
                  </h2>
                  <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                    Manage hero artwork, separate desktop &amp; mobile images, focal points (X/Y), and live responsive previews.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-[#FBF3EA] dark:bg-[#1A1613] p-1.5 rounded-2xl border border-[#EFE2D6] dark:border-[#1f1f1f]">
                  {(["desktop", "tablet", "mobile"] as const).map((dev) => (
                    <button
                      key={dev}
                      type="button"
                      onClick={() => setPreviewDevice(dev)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                        previewDevice === dev
                          ? "bg-[#f15e1c] text-white shadow-xs"
                          : "text-[#7A6A5F] hover:text-[#3A2E27] dark:hover:text-[#FAF5EE]"
                      }`}
                    >
                      {dev}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Media Items Selector List (4 Cols) */}
              <div className="lg:col-span-4 p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase text-[#f15e1c] tracking-wider">
                  Asset Library ({mediaItems.length})
                </h3>
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {mediaItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedMediaId(item.id)}
                      className={`w-full p-3 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                        selectedMediaId === item.id
                          ? "bg-[#FCE3D3] dark:bg-[#2C221B] border-[#f15e1c] shadow-xs"
                          : "bg-[#FBF3EA] dark:bg-[#1A1613] border-[#EFE2D6] dark:border-[#1f1f1f] hover:border-[#f15e1c]/40"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono font-bold text-[#f15e1c] block uppercase">
                          {item.category}
                        </span>
                        <h4 className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                          {item.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500">
                        {item.scale}%
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Media Controls & Visual Focal Point Drag Canvas (8 Cols) */}
              {(() => {
                const activeMedia = mediaItems.find((m) => m.id === selectedMediaId) || mediaItems[0];
                return (
                  <div className="lg:col-span-8 space-y-6">
                    {/* Focal Point Alignment & Device Frame Live Preview */}
                    <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                          Interactive Focal Point Editor ({activeMedia.title})
                        </h3>
                        <span className="text-xs font-mono font-bold text-[#2e936f]">
                          Focal X: {activeMedia.focalX}% • Focal Y: {activeMedia.focalY}%
                        </span>
                      </div>

                      {/* Interactive Drag/Click Canvas for Focal Point */}
                      <div
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                          const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
                          setMediaItems((prev) =>
                            prev.map((m) =>
                              m.id === activeMedia.id ? { ...m, focalX: x, focalY: y } : m
                            )
                          );
                        }}
                        className={`relative mx-auto overflow-hidden rounded-2xl border-2 border-dashed border-[#f15e1c] cursor-crosshair shadow-inner bg-black ${
                          previewDevice === "mobile"
                            ? "max-w-[280px] h-[400px]"
                            : previewDevice === "tablet"
                            ? "max-w-[500px] h-[350px]"
                            : "w-full h-[320px]"
                        }`}
                      >
                        <img
                          src={previewDevice === "mobile" ? activeMedia.mobileUrl : activeMedia.desktopUrl}
                          alt={activeMedia.altText}
                          style={{
                            objectPosition: `${activeMedia.focalX}% ${activeMedia.focalY}%`,
                            transform: `scale(${activeMedia.scale / 100})`,
                          }}
                          className="w-full h-full object-cover transition-all duration-200"
                        />
                        {/* Target Marker */}
                        <div
                          style={{
                            left: `${activeMedia.focalX}%`,
                            top: `${activeMedia.focalY}%`,
                          }}
                          className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-white bg-[#f15e1c] shadow-lg pointer-events-none flex items-center justify-center"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                      </div>

                      {/* Controls Sliders */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                        <div className="space-y-1">
                          <label className="text-xs font-bold">Focal X Position ({activeMedia.focalX}%)</label>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={activeMedia.focalX}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setMediaItems((prev) =>
                                prev.map((m) => (m.id === activeMedia.id ? { ...m, focalX: val } : m))
                              );
                            }}
                            className="w-full accent-[#f15e1c]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold">Focal Y Position ({activeMedia.focalY}%)</label>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={activeMedia.focalY}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setMediaItems((prev) =>
                                prev.map((m) => (m.id === activeMedia.id ? { ...m, focalY: val } : m))
                              );
                            }}
                            className="w-full accent-[#f15e1c]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold">Zoom Scale ({activeMedia.scale}%)</label>
                          <input
                            type="range"
                            min={50}
                            max={200}
                            value={activeMedia.scale}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setMediaItems((prev) =>
                                prev.map((m) => (m.id === activeMedia.id ? { ...m, scale: val } : m))
                              );
                            }}
                            className="w-full accent-[#f15e1c]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                          <label className="text-xs font-bold">Desktop Image URL</label>
                          <input
                            type="text"
                            value={activeMedia.desktopUrl}
                            onChange={(e) => {
                              const val = e.target.value;
                              setMediaItems((prev) =>
                                prev.map((m) => (m.id === activeMedia.id ? { ...m, desktopUrl: val } : m))
                              );
                            }}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold">Mobile Image URL</label>
                          <input
                            type="text"
                            value={activeMedia.mobileUrl}
                            onChange={(e) => {
                              const val = e.target.value;
                              setMediaItems((prev) =>
                                prev.map((m) => (m.id === activeMedia.id ? { ...m, mobileUrl: val } : m))
                              );
                            }}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => showToast(`Media alignment for "${activeMedia.title}" saved`)}
                          className="rounded-xl cursor-pointer"
                          leftIcon={<Save className="w-3.5 h-3.5" />}
                        >
                          Save Media Settings
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: BRAND COLOURS & DESIGN SYSTEM */}
        {/* ========================================================================= */}
        {activeTab === "design" && (
          <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold font-display flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#f15e1c]" />
                  <span>Brand Colours &amp; Design System Palette</span>
                </h2>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                  Manage the official 6-color brand palette (#f15e1c, #2e936f, #ffffff, #ffec69, #fab60a, #f7d7b0) and theme presets.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setBrandColorsForm({
                    primary: "#F15E1C",
                    secondary: "#2E936F",
                    white: "#FFFFFF",
                    lightYellow: "#FFEC69",
                    gold: "#FAB60A",
                    peach: "#F7D7B0",
                    cardAccent: "#F15E1C",
                    badgeBg: "#F7D7B0",
                    iconAccent: "#2E936F",
                    buttonHover: "#D8480D",
                  });
                  showToast("Applied Official 6-Color Brand Standard");
                }}
                className="rounded-xl border-[#f15e1c] text-[#f15e1c] cursor-pointer"
                leftIcon={<Sparkles className="w-4 h-4" />}
              >
                Apply 6-Color Brand Standard
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
              {[
                { key: "primary", label: "Primary Orange", desc: "Main CTAs, key highlights, badges", defaultVal: "#F15E1C" },
                { key: "secondary", label: "Secondary Green", desc: "Secondary buttons, tech accents", defaultVal: "#2E936F" },
                { key: "white", label: "Clean White", desc: "Cards, backgrounds, contrast text", defaultVal: "#FFFFFF" },
                { key: "lightYellow", label: "Light Yellow", desc: "Banner text, bright highlights", defaultVal: "#FFEC69" },
                { key: "gold", label: "Gold Accent", desc: "Badges, ratings, secondary highlights", defaultVal: "#FAB60A" },
                { key: "peach", label: "Peach Accent", desc: "Borders, soft pill backgrounds", defaultVal: "#F7D7B0" },
              ].map((c) => (
                <div
                  key={c.key}
                  className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{c.label}</span>
                    <div
                      style={{ backgroundColor: (brandColorsForm as any)[c.key] }}
                      className="w-6 h-6 rounded-full border border-gray-400 shadow-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={(brandColorsForm as any)[c.key]}
                      onChange={(e) =>
                        setBrandColorsForm({ ...brandColorsForm, [c.key]: e.target.value })
                      }
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={(brandColorsForm as any)[c.key]}
                      onChange={(e) =>
                        setBrandColorsForm({ ...brandColorsForm, [c.key]: e.target.value })
                      }
                      className="w-full text-xs p-2 rounded-lg border border-[#EFE2D6] font-mono font-bold uppercase"
                    />
                  </div>
                  <p className="text-[10px] text-gray-500">{c.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                variant="primary"
                size="md"
                onClick={() => showToast("Brand palette updated successfully")}
                className="rounded-xl cursor-pointer"
                leftIcon={<Save className="w-4 h-4" />}
              >
                Save Brand Colors
              </Button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: HOMEPAGE & HERO */}
        {/* ========================================================================= */}
        {activeTab === "hero" && (
          <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-6">
            <h2 className="text-lg font-bold font-display flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#f15e1c]" />
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
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold">Main Headline</label>
                <textarea
                  rows={2}
                  value={heroForm.title}
                  onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold">Sub-headline Description</label>
                <textarea
                  rows={3}
                  value={heroForm.description}
                  onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold">Primary CTA Button Text</label>
                  <input
                    type="text"
                    value={heroForm.primaryCtaText}
                    onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold">Primary CTA URL Route</label>
                  <input
                    type="text"
                    value={heroForm.primaryCtaUrl}
                    onChange={(e) => setHeroForm({ ...heroForm, primaryCtaUrl: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="md" className="rounded-xl" leftIcon={<Save className="w-4 h-4" />}>
                Save Hero Content
              </Button>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: ALL 8 CORE PRACTICES & SERVICES CMS CONTROL */}
        {/* ========================================================================= */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-2">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#f15e1c]" />
                <span>All 8 Core Practices &amp; AI Portfolio CMS Control System</span>
              </h2>
              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                Edit titles, descriptions, hero imagery, focal positioning (X/Y), CTAs, and visibility status for all 8 core practices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(content.services || []).map((srv) => {
                const isUnderMaintenance = config.serviceStates[srv.slug] === false;
                const isExpanded = editingServiceSlug === srv.slug;

                return (
                  <div
                    key={srv.slug}
                    className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
                      <div>
                        <span className="text-xs font-bold font-mono text-[#f15e1c] uppercase">
                          {srv.slug}
                        </span>
                        <h3 className="text-base font-bold font-display">{srv.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            toggleServiceState(srv.slug);
                            showToast(`${srv.title} maintenance status toggled`);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            !isUnderMaintenance ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                          }`}
                        >
                          {!isUnderMaintenance ? "✓ Active" : "⚠️ Maintenance"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingServiceSlug(isExpanded ? null : srv.slug)}
                          className="p-1.5 rounded-xl bg-[#FBF3EA] dark:bg-[#1A1613] text-[#f15e1c] hover:bg-[#FCE3D3] cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {!isExpanded && (
                      <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] line-clamp-2">
                        {srv.description}
                      </p>
                    )}

                    {isExpanded && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          showToast(`${srv.title} updated successfully`);
                          setEditingServiceSlug(null);
                        }}
                        className="space-y-3 pt-2"
                      >
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold">Service Title</label>
                          <input
                            type="text"
                            value={srv.title}
                            onChange={(e) => updateService(srv.slug, { title: e.target.value })}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold">Description</label>
                          <textarea
                            rows={3}
                            value={srv.description}
                            onChange={(e) => updateService(srv.slug, { description: e.target.value })}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold">Tagline / Eyebrow</label>
                          <input
                            type="text"
                            value={srv.tagline || srv.eyebrow || ""}
                            onChange={(e) => updateService(srv.slug, { tagline: e.target.value, eyebrow: e.target.value })}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold">Desktop Hero Image URL</label>
                            <input
                              type="text"
                              value={srv.desktopImage || `/images/${srv.slug}-hero-bg.png`}
                              onChange={(e) => updateService(srv.slug, { desktopImage: e.target.value })}
                              className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold">Mobile Hero Image URL</label>
                            <input
                              type="text"
                              value={srv.mobileImage || `/images/${srv.slug}-mobile-cropped.png`}
                              onChange={(e) => updateService(srv.slug, { mobileImage: e.target.value })}
                              className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold">Focal Position X ({srv.imagePositionX ?? 80}%)</label>
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={srv.imagePositionX ?? 80}
                              onChange={(e) => updateService(srv.slug, { imagePositionX: Number(e.target.value) })}
                              className="w-full accent-[#f15e1c]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold">Focal Position Y ({srv.imagePositionY ?? 50}%)</label>
                            <input
                              type="range"
                              min={0}
                              max={100}
                              value={srv.imagePositionY ?? 50}
                              onChange={(e) => updateService(srv.slug, { imagePositionY: Number(e.target.value) })}
                              className="w-full accent-[#f15e1c]"
                            />
                          </div>
                        </div>

                        <Button type="submit" variant="primary" size="sm" className="rounded-xl mt-2 cursor-pointer" leftIcon={<Save className="w-3.5 h-3.5" />}>
                          Save Practice CMS Settings
                        </Button>
                      </form>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB: PRODUCTS & PLATFORMS CMS EDITOR (ASTROBEAMS & OMNIGRC) */}
        {/* ========================================================================= */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-2">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#f15e1c]" />
                <span>Products &amp; Platforms CMS (AstroBeams.ai, AstroBeams.store &amp; OMNiGRC)</span>
              </h2>
              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                Manage product details, categories, descriptions, URLs, tags/capabilities, CTAs, visibility, and display ordering.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productsList.map((product, pIdx) => {
                const isExpanded = editingProductSlug === product.slug;
                const isLive = product.status === "live";

                return (
                  <div
                    key={product.slug}
                    className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
                      <div>
                        <span className="text-xs font-bold font-mono text-[#f15e1c] uppercase">
                          {product.category}
                        </span>
                        <h3 className="text-lg font-bold font-display">{product.name}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = productsList.map((p, i) =>
                              i === pIdx
                                ? { ...p, status: isLive ? ("in-development" as const) : ("live" as const), badge: isLive ? "In Dev" : "Live", badgeColor: isLive ? "#fab60a" : "#2e936f" }
                                : p
                            );
                            setProductsList(updated);
                            showToast(`${product.name} visibility status updated`);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isLive ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                          }`}
                        >
                          {isLive ? "✓ Live" : "⚠️ In Dev"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingProductSlug(isExpanded ? null : product.slug)}
                          className="p-1.5 rounded-xl bg-[#FBF3EA] dark:bg-[#1A1613] text-[#f15e1c] hover:bg-[#FCE3D3] cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {!isExpanded && (
                      <div className="space-y-2">
                        <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] line-clamp-3">
                          {product.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {product.features.slice(0, 5).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-md bg-[#FCE3D3]/60 text-[#f15e1c] text-[10px] font-mono font-bold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {product.externalUrl && (
                          <a
                            href={product.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#f15e1c] hover:underline pt-1"
                          >
                            <span>{product.ctaText}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}

                    {isExpanded && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          showToast(`${product.name} updated successfully`);
                          setEditingProductSlug(null);
                        }}
                        className="space-y-3 pt-2"
                      >
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold">Product Name</label>
                          <input
                            type="text"
                            value={product.name}
                            onChange={(e) => {
                              const updated = productsList.map((p, i) =>
                                i === pIdx ? { ...p, name: e.target.value } : p
                              );
                              setProductsList(updated);
                            }}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold">Product Category</label>
                          <input
                            type="text"
                            value={product.category}
                            onChange={(e) => {
                              const updated = productsList.map((p, i) =>
                                i === pIdx ? { ...p, category: e.target.value } : p
                              );
                              setProductsList(updated);
                            }}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold">Short Description</label>
                          <textarea
                            rows={4}
                            value={product.description}
                            onChange={(e) => {
                              const updated = productsList.map((p, i) =>
                                i === pIdx ? { ...p, description: e.target.value } : p
                              );
                              setProductsList(updated);
                            }}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold">External Product URL</label>
                          <input
                            type="text"
                            value={product.externalUrl || ""}
                            onChange={(e) => {
                              const updated = productsList.map((p, i) =>
                                i === pIdx ? { ...p, externalUrl: e.target.value, ctaUrl: e.target.value } : p
                              );
                              setProductsList(updated);
                            }}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold">CTA Button Text</label>
                          <input
                            type="text"
                            value={product.ctaText}
                            onChange={(e) => {
                              const updated = productsList.map((p, i) =>
                                i === pIdx ? { ...p, ctaText: e.target.value } : p
                              );
                              setProductsList(updated);
                            }}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold">Relevant Tags / Features (comma separated)</label>
                          <input
                            type="text"
                            value={product.features.join(", ")}
                            onChange={(e) => {
                              const tags = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
                              const updated = productsList.map((p, i) =>
                                i === pIdx ? { ...p, features: tags } : p
                              );
                              setProductsList(updated);
                            }}
                            className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                          />
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          {pIdx > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                const copy = [...productsList];
                                const temp = copy[pIdx];
                                copy[pIdx] = copy[pIdx - 1];
                                copy[pIdx - 1] = temp;
                                setProductsList(copy);
                                showToast(`Moved ${product.name} up in display order`);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-[#FBF3EA] dark:bg-[#1A1613] text-xs font-bold text-[#f15e1c] cursor-pointer"
                            >
                              ↑ Move Up
                            </button>
                          )}
                          {pIdx < productsList.length - 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const copy = [...productsList];
                                const temp = copy[pIdx];
                                copy[pIdx] = copy[pIdx + 1];
                                copy[pIdx + 1] = temp;
                                setProductsList(copy);
                                showToast(`Moved ${product.name} down in display order`);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-[#FBF3EA] dark:bg-[#1A1613] text-xs font-bold text-[#f15e1c] cursor-pointer"
                            >
                              ↓ Move Down
                            </button>
                          )}
                          <Button type="submit" variant="primary" size="sm" className="rounded-xl ml-auto cursor-pointer" leftIcon={<Save className="w-3.5 h-3.5" />}>
                            Save Product
                          </Button>
                        </div>
                      </form>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: INDUSTRY SOLUTIONS EDITOR */}
        {/* ========================================================================= */}
        {activeTab === "industries" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-2">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#f15e1c]" />
                <span>Industry Verticals &amp; Solutions Manager</span>
              </h2>
              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                Edit titles, descriptions, status notes, and key capability offerings per industry
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(content.industries || []).map((ind) => (
                <div
                  key={ind.slug}
                  className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
                    <h3 className="text-sm font-bold font-display text-[#f15e1c]">{ind.name}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FCE3D3] text-[#3A2E27] font-semibold">
                      Enterprise Practice
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Industry Name</label>
                    <input
                      type="text"
                      value={ind.name}
                      onChange={(e) => updateIndustry(ind.slug, { name: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Description</label>
                    <textarea
                      rows={3}
                      value={ind.description}
                      onChange={(e) => updateIndustry(ind.slug, { description: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => showToast(`${ind.name} saved`)}
                    className="w-full justify-center rounded-xl cursor-pointer"
                  >
                    Save Changes
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: CASE STUDIES EDITOR */}
        {/* ========================================================================= */}
        {activeTab === "casestudies" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-2">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#f15e1c]" />
                <span>Enterprise Case Studies CMS</span>
              </h2>
              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                Edit titles, clients, industry tags, outcome metrics, and case study descriptions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(content.caseStudies || []).map((cs) => (
                <div
                  key={cs.slug}
                  className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
                    <span className="text-xs font-bold font-mono text-[#f15e1c]">
                      {cs.client} &bull; {cs.clientIndustry}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                      {cs.results?.[0]?.metric || "Success"}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Case Study Title</label>
                    <input
                      type="text"
                      value={cs.title}
                      onChange={(e) => updateCaseStudy(cs.slug, { title: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Outcome Summary</label>
                    <textarea
                      rows={2}
                      value={cs.summary}
                      onChange={(e) => updateCaseStudy(cs.slug, { summary: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={() => showToast(`${cs.title} saved`)}
                    className="rounded-xl cursor-pointer"
                  >
                    Save Case Study
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: 5-STEP METHODOLOGY EDITOR */}
        {/* ========================================================================= */}
        {activeTab === "methodology" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-2">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <Workflow className="w-5 h-5 text-[#f15e1c]" />
                <span>5-Step Execution Methodology Editor</span>
              </h2>
              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                Edit titles, step numbers, descriptions, and key deliverables for the 5-step lifecycle
              </p>
            </div>

            <div className="space-y-4">
              {(content.processSteps || []).map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#f15e1c] text-white flex items-center justify-center font-extrabold font-mono text-lg shrink-0">
                    {step.step}
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => updateProcessStep(idx, { title: e.target.value })}
                      className="text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613] font-bold"
                    />
                    <input
                      type="text"
                      value={step.description}
                      onChange={(e) => updateProcessStep(idx, { description: e.target.value })}
                      className="text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                    <input
                      type="text"
                      value={step.deliverable}
                      onChange={(e) => updateProcessStep(idx, { deliverable: e.target.value })}
                      className="text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => showToast(`Step ${step.step} saved`)}
                    className="rounded-xl shrink-0 cursor-pointer"
                  >
                    Save Step
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: CLIENT TESTIMONIALS EDITOR */}
        {/* ========================================================================= */}
        {activeTab === "testimonials" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-2">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <Quote className="w-5 h-5 text-[#f15e1c]" />
                <span>Client Testimonials CMS</span>
              </h2>
              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                Edit quotes, author names, roles, company names, locations, and ratings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(content.testimonials || []).map((test, idx) => (
                <div
                  key={test.id || idx}
                  className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
                    <span className="text-xs font-bold text-[#f15e1c]">{test.company}</span>
                    <span className="text-xs text-amber-500 font-bold">★ {test.rating || 5}.0</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Author Name</label>
                    <input
                      type="text"
                      value={test.author}
                      onChange={(e) => updateTestimonial(idx, { author: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Quote</label>
                    <textarea
                      rows={3}
                      value={test.quote}
                      onChange={(e) => updateTestimonial(idx, { quote: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => showToast(`Testimonial by ${test.author} saved`)}
                    className="w-full justify-center rounded-xl cursor-pointer"
                  >
                    Save Testimonial
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: FOOTER & REGIONAL CONTACT CMS (Image 2 Fix) */}
        {/* ========================================================================= */}
        {activeTab === "footer" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-2">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#f15e1c]" />
                <span>Footer &amp; Regional Contact CMS</span>
              </h2>
              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                Edit India HQ, UAE Office, email, phone numbers, WhatsApp, footer text, and copyright details without modifying source code
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateFooter(footerForm);
                showToast("Footer & Regional details updated successfully");
              }}
              className="space-y-6"
            >
              {/* Main Footer Closing Headline */}
              <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-4">
                <h3 className="text-sm font-bold font-display text-[#f15e1c]">Footer Heading &amp; Copy</h3>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold">Main Footer Headline</label>
                  <input
                    type="text"
                    value={footerForm.mainHeading || "WE 🤍 WORKING WITH AMBITIOUS BRANDS, ACROSS EVERY SECTOR"}
                    onChange={(e) => setFooterForm({ ...footerForm, mainHeading: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                  />
                </div>
              </div>

              {/* India HQ Regional Contact */}
              <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
                  <h3 className="text-sm font-bold font-display text-[#f15e1c]">India HQ Regional Details</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...footerForm, indiaVisible: footerForm.indiaVisible === false ? true : false };
                      setFooterForm(updated);
                      updateFooter(updated);
                      showToast(`India HQ ${updated.indiaVisible !== false ? "Visible" : "Hidden"}`);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer ${
                      footerForm.indiaVisible !== false ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                    }`}
                  >
                    {footerForm.indiaVisible !== false ? "Visible" : "Hidden"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold">India Phone Number (tel: link)</label>
                    <input
                      type="text"
                      value={footerForm.indiaPhone}
                      onChange={(e) => setFooterForm({ ...footerForm, indiaPhone: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold">Display Label</label>
                    <input
                      type="text"
                      value={footerForm.indiaDisplayLabel || `${footerForm.indiaPhone} - India HQ`}
                      onChange={(e) => setFooterForm({ ...footerForm, indiaDisplayLabel: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">India Address</label>
                  <textarea
                    rows={2}
                    value={footerForm.indiaAddress || "Platinum Floor D 14/23\nArdee City Sec 52\nGurgaon 122002"}
                    onChange={(e) => setFooterForm({ ...footerForm, indiaAddress: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                  />
                </div>
              </div>

              {/* UAE Office Regional Contact */}
              <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
                  <h3 className="text-sm font-bold font-display text-[#f15e1c]">UAE Regional Office Details</h3>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = { ...footerForm, uaeVisible: footerForm.uaeVisible === false ? true : false };
                      setFooterForm(updated);
                      updateFooter(updated);
                      showToast(`UAE Office ${updated.uaeVisible !== false ? "Visible" : "Hidden"}`);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer ${
                      footerForm.uaeVisible !== false ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                    }`}
                  >
                    {footerForm.uaeVisible !== false ? "Visible" : "Hidden"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold">UAE Phone Number (tel: link)</label>
                    <input
                      type="text"
                      value={footerForm.uaePhone}
                      onChange={(e) => setFooterForm({ ...footerForm, uaePhone: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold">Display Label</label>
                    <input
                      type="text"
                      value={footerForm.uaeDisplayLabel || `${footerForm.uaePhone} - UAE Regional Office`}
                      onChange={(e) => setFooterForm({ ...footerForm, uaeDisplayLabel: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">UAE Address</label>
                  <textarea
                    rows={2}
                    value={footerForm.uaeAddress || "55764-001 IFZA Business Park FZCO\nBuilding A1 Dubai Silicon Oasis Dubai, U.A.E"}
                    onChange={(e) => setFooterForm({ ...footerForm, uaeAddress: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                  />
                </div>
              </div>

              {/* Email & Support Contact */}
              <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-4">
                <h3 className="text-sm font-bold font-display text-[#f15e1c]">Emails &amp; Copyright</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold">Primary Support Email</label>
                    <input
                      type="email"
                      value={footerForm.supportEmail}
                      onChange={(e) => setFooterForm({ ...footerForm, supportEmail: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold">Copyright Statement</label>
                    <input
                      type="text"
                      value={footerForm.copyrightText}
                      onChange={(e) => setFooterForm({ ...footerForm, copyrightText: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" variant="primary" size="md" className="rounded-xl cursor-pointer" leftIcon={<Save className="w-4 h-4" />}>
                Save All Footer Settings
              </Button>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 9: SOCIAL MEDIA & URLS */}
        {/* ========================================================================= */}
        {activeTab === "socials" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-2">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[#f15e1c]" />
                <span>Social Media &amp; Digital Presence Manager</span>
              </h2>
              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                Add, edit, enable/disable, or remove social channels and digital presence links dynamically
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(content.socialLinks || []).map((social) => (
                <div
                  key={social.id}
                  className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
                    <span className="text-xs font-bold font-display text-[#f15e1c]">
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
                        className="p-1 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer"
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
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Platform */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-4">
              <h3 className="text-sm font-bold font-display flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#f15e1c]" />
                <span>Add New Social / Digital Platform</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Platform Name (e.g. GitHub)"
                  value={newSocialForm.name}
                  onChange={(e) => setNewSocialForm({ ...newSocialForm, name: e.target.value })}
                  className="text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
                <input
                  type="url"
                  placeholder="Platform URL (https://...)"
                  value={newSocialForm.url}
                  onChange={(e) => setNewSocialForm({ ...newSocialForm, url: e.target.value })}
                  className="text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
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
                  className="rounded-xl cursor-pointer"
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  Add Platform
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 10: CHATBOT COMMAND CONTROL & RESPONSE MANAGER */}
        {/* ========================================================================= */}
        {activeTab === "chatbot" && (
          <div className="space-y-6">
            {/* Header & Master ON/OFF Switch */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-lg font-bold font-display flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#f15e1c]" />
                  <span>Chatbot Command &amp; Response Manager</span>
                </h2>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                  Master ON/OFF control, custom keyword phrase mapping, multi-CTA buttons, and conversation fallback
                </p>
              </div>

              {/* Master Chatbot ON/OFF Toggle */}
              <div className="flex items-center gap-3 bg-[#FBF3EA] dark:bg-[#1A1613] p-2.5 px-4 rounded-2xl border border-[#EFE2D6] dark:border-[#1f1f1f] shrink-0">
                <span className="text-xs font-bold">Chatbot Master:</span>
                <button
                  type="button"
                  onClick={() => {
                    const nextVal = !config.chatbotEnabled;
                    updateConfig("chatbotEnabled", nextVal);
                    updateChatbotKB({ masterEnabled: nextVal });
                    showToast(`Chatbot Widget ${nextVal ? "ENABLED (ON)" : "DISABLED (OFF)"}`);
                  }}
                  className={`px-4 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-sm ${
                    config.chatbotEnabled && content.chatbotKB?.masterEnabled !== false
                      ? "bg-emerald-500 text-white"
                      : "bg-rose-500 text-white"
                  }`}
                >
                  {config.chatbotEnabled && content.chatbotKB?.masterEnabled !== false ? "ON" : "OFF"}
                </button>
              </div>
            </div>

            {/* Default Greeting & Fallback Response Editors */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-4">
              <h3 className="text-sm font-bold font-display text-[#f15e1c]">Default Messaging &amp; Fallback</h3>

              <div className="space-y-1">
                <label className="text-xs font-bold">Default Welcome Greeting</label>
                <input
                  type="text"
                  value={content.chatbotKB?.defaultGreeting || ""}
                  onChange={(e) => updateChatbotKB({ defaultGreeting: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Unknown Query Fallback Response</label>
                <textarea
                  rows={2}
                  value={content.chatbotKB?.fallbackResponse || ""}
                  onChange={(e) => updateChatbotKB({ fallbackResponse: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
              </div>
            </div>

            {/* Add Command Action Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-display">Configured Commands ({ (content.chatbotKB?.commands || []).length })</h3>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => setShowAddCommandForm(!showAddCommandForm)}
                className="rounded-xl cursor-pointer"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                + Add Command
              </Button>
            </div>

            {/* + Add Command Creator Form */}
            {showAddCommandForm && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newCmdKeyword || !newCmdResponse) return;
                  addChatbotCommand({
                    id: `cmd-${Date.now()}`,
                    keyword: newCmdKeyword.trim(),
                    alternativeKeywords: newCmdAltKeywords.split(",").map((s) => s.trim()).filter(Boolean),
                    userIntent: newCmdIntent || `Inquire about ${newCmdKeyword}`,
                    response: newCmdResponse.trim(),
                    followUpResponse: newCmdFollowUp.trim() || undefined,
                    relatedService: newCmdRelatedService || undefined,
                    relatedPage: newCmdRelatedPage || undefined,
                    ctaButtons: [
                      {
                        label: newCmdCtaLabel,
                        type: newCmdCtaType,
                        value: newCmdCtaValue,
                      },
                    ],
                    priority: newCmdPriority,
                    enabled: true,
                  });
                  setNewCmdKeyword("");
                  setNewCmdAltKeywords("");
                  setNewCmdIntent("");
                  setNewCmdResponse("");
                  setNewCmdFollowUp("");
                  setShowAddCommandForm(false);
                  showToast("New Chatbot Command added successfully");
                }}
                className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border-2 border-[#f15e1c]/50 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-3 duration-200"
              >
                <h4 className="text-sm font-bold font-display text-[#f15e1c]">Create New Chatbot Command</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold">Primary Command / Keyword *</label>
                    <input
                      type="text"
                      placeholder="e.g. digital marketing"
                      required
                      value={newCmdKeyword}
                      onChange={(e) => setNewCmdKeyword(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold">Alternative Keywords (comma-separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. online marketing, social media marketing, leads"
                      value={newCmdAltKeywords}
                      onChange={(e) => setNewCmdAltKeywords(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Chatbot Response Message *</label>
                  <textarea
                    rows={3}
                    placeholder="Exact response to present to user..."
                    required
                    value={newCmdResponse}
                    onChange={(e) => setNewCmdResponse(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold">Follow-Up Response (for contextual queries)</label>
                  <input
                    type="text"
                    placeholder="e.g. Would you like to schedule a campaign strategy session?"
                    value={newCmdFollowUp}
                    onChange={(e) => setNewCmdFollowUp(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                  />
                </div>

                {/* Primary CTA Button Config */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="space-y-1">
                    <label className="text-xs font-bold">CTA Button Label</label>
                    <input
                      type="text"
                      value={newCmdCtaLabel}
                      onChange={(e) => setNewCmdCtaLabel(e.target.value)}
                      className="w-full text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold">CTA Action Type</label>
                    <select
                      value={newCmdCtaType}
                      onChange={(e) => setNewCmdCtaType(e.target.value as any)}
                      className="w-full text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    >
                      <option value="page">Page Button</option>
                      <option value="contact">Contact Button</option>
                      <option value="whatsapp">WhatsApp Button</option>
                      <option value="email">Email Button</option>
                      <option value="project_form">Start Project Form</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold">CTA Route / Value</label>
                    <input
                      type="text"
                      value={newCmdCtaValue}
                      onChange={(e) => setNewCmdCtaValue(e.target.value)}
                      className="w-full text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button type="submit" variant="primary" size="md" className="rounded-xl cursor-pointer" leftIcon={<Save className="w-4 h-4" />}>
                    Save New Command
                  </Button>
                  <Button type="button" variant="outline" size="md" onClick={() => setShowAddCommandForm(false)} className="rounded-xl cursor-pointer">
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {/* List of Existing Commands */}
            <div className="space-y-4">
              {(content.chatbotKB?.commands || []).map((cmd) => (
                <div
                  key={cmd.id}
                  className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-extrabold font-display text-[#f15e1c]">
                        {cmd.keyword}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FCE3D3]">
                        Priority: {cmd.priority || 10}
                      </span>
                    </div>

                    {/* Per-Command ON/OFF Switch */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          toggleChatbotCommand(cmd.id);
                          showToast(`Command "${cmd.keyword}" ${cmd.enabled ? "Disabled" : "Enabled"}`);
                        }}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          cmd.enabled !== false ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                        }`}
                      >
                        {cmd.enabled !== false ? "ON" : "OFF"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteChatbotCommand(cmd.id);
                          showToast(`Command "${cmd.keyword}" deleted`);
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-xl cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-[#7A6A5F]">Alternative Match Keywords:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {(cmd.alternativeKeywords || []).map((alt, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f]">
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Response Message</label>
                    <textarea
                      rows={2}
                      value={cmd.response}
                      onChange={(e) => updateChatbotCommand(cmd.id, { response: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 11: CONTACT INFO & LEADS MANAGER */}
        {/* ========================================================================= */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-2">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-[#f15e1c]" />
                <span>Contact Info &amp; Lead Inquiries Manager</span>
              </h2>
              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                Configure public contact information and manage submitted project inquiries
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-4">
              <h3 className="text-sm font-bold font-display text-[#f15e1c]">Public Contact Fields</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold">India HQ Phone</label>
                  <input
                    type="text"
                    value={footerForm.indiaPhone}
                    onChange={(e) => setFooterForm({ ...footerForm, indiaPhone: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold">UAE Office Phone</label>
                  <input
                    type="text"
                    value={footerForm.uaePhone}
                    onChange={(e) => setFooterForm({ ...footerForm, uaePhone: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                  />
                </div>
              </div>
              <Button type="button" variant="primary" size="sm" onClick={() => { updateFooter(footerForm); showToast("Contact details saved"); }} className="rounded-xl cursor-pointer">
                Save Contact Details
              </Button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 12: LANGUAGES & RTL */}
        {/* ========================================================================= */}
        {activeTab === "languages" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-2">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <Languages className="w-5 h-5 text-[#f15e1c]" />
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
                  className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono uppercase text-[#f15e1c]">
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

        {/* ========================================================================= */}
        {/* TAB 13: GLOBAL SEO */}
        {/* ========================================================================= */}
        {activeTab === "seo" && <SEOAdminPanel />}

        {/* ========================================================================= */}
        {/* TAB 14: LEGAL & DPDP CONTENT */}
        {/* ========================================================================= */}
        {activeTab === "legal" && (
          <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-6">
            <h2 className="text-lg font-bold font-display flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#f15e1c]" />
              <span>Legal &amp; DPDP Act Content CMS</span>
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateLegal(legalForm);
                showToast("Legal & DPDP content updated");
              }}
              className="space-y-4"
            >
              <div className="space-y-1">
                <label className="text-xs font-bold">Privacy Policy Text</label>
                <textarea
                  rows={3}
                  value={legalForm.privacyPolicyText}
                  onChange={(e) => setLegalForm({ ...legalForm, privacyPolicyText: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold">Security &amp; DPDP Compliance Policy Text</label>
                <textarea
                  rows={3}
                  value={legalForm.securityDpdpText}
                  onChange={(e) => setLegalForm({ ...legalForm, securityDpdpText: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613]"
                />
              </div>

              <Button type="submit" variant="primary" size="md" className="rounded-xl cursor-pointer" leftIcon={<Save className="w-4 h-4" />}>
                Save Legal Content
              </Button>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 15: MAINTENANCE & APPEARANCE CONTROLS */}
        {/* ========================================================================= */}
        {activeTab === "system" && (
          <div className="space-y-6">
            {/* MASTER WEBSITE ON/OFF CONTROL CARD */}
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl transition-all ${
              config.websiteEnabled !== false
                ? "bg-gradient-to-r from-[#FFFDF9] via-[#FFF5EC] to-[#FDF0E6] dark:from-[#181411] dark:to-[#241B16] border-[#f15e1c]/30"
                : "bg-gradient-to-r from-red-950 via-rose-950 to-amber-950 border-red-500 text-white shadow-red-950/50"
            }`}>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl ${
                      config.websiteEnabled !== false
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/50"
                    }`}>
                      <Power className="w-6 h-6" />
                    </div>
                    <div>
                      <span className={`text-[11px] font-extrabold uppercase font-mono tracking-wider px-2.5 py-0.5 rounded-full border ${
                        config.websiteEnabled !== false
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                          : "bg-red-500 text-white border-red-400"
                      }`}>
                        {config.websiteEnabled !== false ? "🟢 SYSTEM ONLINE & ACCESSIBLE" : "🔴 EMERGENCY SHUTDOWN ACTIVE"}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black font-display mt-1">
                        Master Website Power Switch
                      </h2>
                    </div>
                  </div>
                  <p className={`text-xs leading-relaxed max-w-2xl ${
                    config.websiteEnabled !== false ? "text-[#7A6A5F] dark:text-[#B8ACA0]" : "text-red-100"
                  }`}>
                    {config.websiteEnabled !== false
                      ? "The website is currently active and responding to public visitors globally. Click below to halt the entire website immediately."
                      : "⚠️ ENTIRE WEBSITE IS STOPPED! Public access is halted and visitors see the Emergency Maintenance screen. Click below to bring the website back online."}
                  </p>
                </div>

                {showPowerConfirm ? (
                  <div className="p-4 rounded-2xl bg-white dark:bg-[#0a0a0a] border-2 border-amber-500 shadow-2xl space-y-3 shrink-0 max-w-sm animate-in fade-in">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-amber-600 dark:text-amber-400">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>CONFIRMATION REQUIRED</span>
                    </div>
                    <p className="text-xs text-[#3A2E27] dark:text-[#FAF5EE] font-semibold leading-snug">
                      {config.websiteEnabled !== false
                        ? "Are you sure you want to DISABLE the entire website for public visitors?"
                        : "Are you sure you want to ENABLE and publish the website live?"}
                    </p>
                    <div className="flex items-center gap-2 pt-1 justify-end">
                      <button
                        type="button"
                        onClick={() => setShowPowerConfirm(false)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] text-[#3A2E27] dark:text-[#FAF5EE] hover:bg-[#EFE2D6] cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const nextState = config.websiteEnabled === false;
                          toggleWebsitePower();
                          setShowPowerConfirm(false);
                          showToast(nextState ? "⚡ WEBSITE RESTORED BACK ONLINE!" : "🛑 MASTER SHUTDOWN ACTIVE - WEBSITE STOPPED!");
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold text-white shadow-lg cursor-pointer ${
                          config.websiteEnabled !== false
                            ? "bg-red-600 hover:bg-red-700 shadow-red-600/30"
                            : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30"
                        }`}
                      >
                        {config.websiteEnabled !== false ? "Yes, Disable Website" : "Yes, Enable Website"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowPowerConfirm(true)}
                    className={`px-6 py-4 rounded-2xl font-black text-sm shadow-2xl transition-all transform hover:scale-[1.02] active:scale-95 flex items-center gap-3 cursor-pointer shrink-0 border ${
                      config.websiteEnabled !== false
                        ? "bg-red-600 hover:bg-red-700 text-white border-red-500 shadow-red-600/30"
                        : "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-400 shadow-emerald-500/40 animate-bounce"
                    }`}
                  >
                    <Power className="w-5 h-5" />
                    <span>
                      {config.websiteEnabled !== false
                        ? "STOP ENTIRE WEBSITE AT ONCE"
                        : "START WEBSITE & GO LIVE"}
                    </span>
                  </button>
                )}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-2">
              <h2 className="text-lg font-bold font-display flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#f15e1c]" />
                <span>Global System, Section Styling &amp; Maintenance Controls</span>
              </h2>
              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                Manage section background themes, card design styles, global motion feedback, and service status switches
              </p>
            </div>

            {/* APPEARANCE & SECTION STYLING CMS */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-lg space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE2D6] dark:border-[#1f1f1f]">
                <h3 className="text-sm font-bold font-display text-[#f15e1c] flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <span>Appearance &amp; Section Visual Hierarchy CMS</span>
                </h3>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-[#FCE3D3] text-[#3A2E27]">
                  Controlled Color System
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold">7 Core Practices Base Theme</label>
                  <select
                    value={config.sectionThemes?.services || "soft_orange"}
                    onChange={(e) => {
                      updateSectionTheme("services", e.target.value);
                      showToast(`Services section base set to ${e.target.value}`);
                    }}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613] font-medium cursor-pointer"
                  >
                    <option value="soft_orange">Soft Warm Orange (Recommended)</option>
                    <option value="warm_beige">Warm Beige Base</option>
                    <option value="light_neutral">Light Neutral Base</option>
                    <option value="default">Default Cream Base</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold">Industry Solutions Base Theme</label>
                  <select
                    value={config.sectionThemes?.industries || "warm_beige"}
                    onChange={(e) => {
                      updateSectionTheme("industries", e.target.value);
                      showToast(`Industries section base set to ${e.target.value}`);
                    }}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613] font-medium cursor-pointer"
                  >
                    <option value="warm_beige">Warm Beige (Recommended)</option>
                    <option value="soft_orange">Soft Warm Orange Base</option>
                    <option value="light_neutral">Light Neutral Base</option>
                    <option value="default">Default Cream Base</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold">Case Studies Base Theme</label>
                  <select
                    value={config.sectionThemes?.caseStudies || "soft_orange"}
                    onChange={(e) => {
                      updateSectionTheme("caseStudies", e.target.value);
                      showToast(`Case Studies section base set to ${e.target.value}`);
                    }}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613] font-medium cursor-pointer"
                  >
                    <option value="soft_orange">Soft Warm Orange (Recommended)</option>
                    <option value="warm_beige">Warm Beige Base</option>
                    <option value="light_neutral">Light Neutral Base</option>
                    <option value="default">Default Cream Base</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold">Testimonials Base Theme</label>
                  <select
                    value={config.sectionThemes?.testimonials || "warm_beige"}
                    onChange={(e) => {
                      updateSectionTheme("testimonials", e.target.value);
                      showToast(`Testimonials section base set to ${e.target.value}`);
                    }}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613] font-medium cursor-pointer"
                  >
                    <option value="warm_beige">Warm Beige (Recommended)</option>
                    <option value="soft_orange">Soft Warm Orange Base</option>
                    <option value="light_neutral">Light Neutral Base</option>
                    <option value="default">Default Cream Base</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold">Card Contrast &amp; Elevation Style</label>
                  <select
                    value={config.cardStyle || "elevated"}
                    onChange={(e) => {
                      updateCardStyle(e.target.value as any);
                      showToast(`Card style updated to ${e.target.value}`);
                    }}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613] font-semibold text-[#f15e1c] cursor-pointer"
                  >
                    <option value="elevated">Elevated (White Card + Shadow + Lift) [Recommended]</option>
                    <option value="bordered">Bordered (Clean High-Contrast Outline)</option>
                    <option value="minimal">Minimal (Flat Soft Tint)</option>
                    <option value="standard">Standard Default</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold font-display block">Global Animations</span>
                  <span className="text-[11px] text-[#7A6A5F]">Master switch for all motion</span>
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

              <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md flex items-center justify-between">
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
            </div>

            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-4">
              <h3 className="text-sm font-bold font-display">Per-Service Maintenance Toggles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(config.serviceStates || {}).map(([slug, state]) => (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => {
                      toggleServiceState(slug);
                      showToast(`${slug} maintenance status updated`);
                    }}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left cursor-pointer ${
                      state
                        ? "bg-[#FCE3D3]/50 border-[#f15e1c]/40 text-[#f15e1c]"
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

        {/* ========================================================================= */}
        {/* TAB: MOTION & EXPERIENCE CONTROLS (TASK M) */}
        {/* ========================================================================= */}
        {activeTab === "motion" && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-2">
              <h2 className="text-xl font-bold font-display flex items-center gap-2 text-[#f15e1c]">
                <Sparkles className="w-6 h-6" />
                <span>Motion &amp; Experience Controls</span>
              </h2>
              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                Configure global animation behavior, background motion, 3D experiences, parallax effects, and animation intensity across desktop and mobile.
              </p>
            </div>

            {/* Main Toggle Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* 1. Global Animations */}
              <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold font-display block text-[#3A2E27] dark:text-[#FAF5EE]">Global Animations</span>
                  <span className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">Master switch for all website motion</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateConfig("animationsEnabled", !config.animationsEnabled);
                    showToast(`Global Animations ${!config.animationsEnabled ? "ON" : "OFF"}`);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    config.animationsEnabled !== false ? "bg-emerald-500 text-white shadow-md" : "bg-rose-500 text-white"
                  }`}
                >
                  {config.animationsEnabled !== false ? "ON" : "OFF"}
                </button>
              </div>

              {/* 2. Background Motion */}
              <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold font-display block text-[#3A2E27] dark:text-[#FAF5EE]">Background Motion</span>
                  <span className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">Subtle continuous floating background</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateConfig("backgroundMotionEnabled", !(config as any).backgroundMotionEnabled);
                    showToast(`Background Motion ${!(config as any).backgroundMotionEnabled ? "ON" : "OFF"}`);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    (config as any).backgroundMotionEnabled !== false ? "bg-emerald-500 text-white shadow-md" : "bg-rose-500 text-white"
                  }`}
                >
                  {(config as any).backgroundMotionEnabled !== false ? "ON" : "OFF"}
                </button>
              </div>

              {/* 3. 3D Experience */}
              <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold font-display block text-[#3A2E27] dark:text-[#FAF5EE]">3D Experience</span>
                  <span className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">Hero &amp; Services 3D constellation</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const updated = {
                      ...(config.threeDConfig || {}),
                      enable3D: !(config.threeDConfig?.enable3D !== false),
                    };
                    updateConfig("threeDConfig", updated);
                    showToast(`3D Experience ${updated.enable3D ? "ON" : "OFF"}`);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    config.threeDConfig?.enable3D !== false ? "bg-emerald-500 text-white shadow-md" : "bg-rose-500 text-white"
                  }`}
                >
                  {config.threeDConfig?.enable3D !== false ? "ON" : "OFF"}
                </button>
              </div>

              {/* 4. Parallax */}
              <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold font-display block text-[#3A2E27] dark:text-[#FAF5EE]">Parallax</span>
                  <span className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">Mouse movement &amp; scroll depth</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateConfig("parallaxEnabled", !(config as any).parallaxEnabled);
                    showToast(`Parallax ${!(config as any).parallaxEnabled ? "ON" : "OFF"}`);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    (config as any).parallaxEnabled !== false ? "bg-emerald-500 text-white shadow-md" : "bg-rose-500 text-white"
                  }`}
                >
                  {(config as any).parallaxEnabled !== false ? "ON" : "OFF"}
                </button>
              </div>

              {/* 5. Hover Effects */}
              <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold font-display block text-[#3A2E27] dark:text-[#FAF5EE]">Hover Effects</span>
                  <span className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">Interactive card &amp; button hover scaling</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateConfig("hoverEffectsEnabled", !config.hoverEffectsEnabled);
                    showToast(`Hover Effects ${!config.hoverEffectsEnabled ? "ON" : "OFF"}`);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    config.hoverEffectsEnabled !== false ? "bg-emerald-500 text-white shadow-md" : "bg-rose-500 text-white"
                  }`}
                >
                  {config.hoverEffectsEnabled !== false ? "ON" : "OFF"}
                </button>
              </div>

              {/* 6. Scroll Animations */}
              <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold font-display block text-[#3A2E27] dark:text-[#FAF5EE]">Scroll Animations</span>
                  <span className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">On-scroll section reveal animations</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateConfig("scrollAnimationsEnabled", !config.scrollAnimationsEnabled);
                    showToast(`Scroll Animations ${!config.scrollAnimationsEnabled ? "ON" : "OFF"}`);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    config.scrollAnimationsEnabled !== false ? "bg-emerald-500 text-white shadow-md" : "bg-rose-500 text-white"
                  }`}
                >
                  {config.scrollAnimationsEnabled !== false ? "ON" : "OFF"}
                </button>
              </div>

              {/* 7. Mobile Animations */}
              <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold font-display block text-[#3A2E27] dark:text-[#FAF5EE]">Mobile Animations</span>
                  <span className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">Swipeable carousels &amp; mobile motion</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateConfig("mobileAnimationsEnabled", !(config as any).mobileAnimationsEnabled);
                    showToast(`Mobile Animations ${!(config as any).mobileAnimationsEnabled ? "ON" : "OFF"}`);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    (config as any).mobileAnimationsEnabled !== false ? "bg-emerald-500 text-white shadow-md" : "bg-rose-500 text-white"
                  }`}
                >
                  {(config as any).mobileAnimationsEnabled !== false ? "ON" : "OFF"}
                </button>
              </div>
            </div>

            {/* Animation Intensity Control */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  Animation Intensity Level
                </span>
                <span className="text-xs font-mono font-extrabold text-[#f15e1c] uppercase px-3 py-1 rounded-full bg-[#fce3d3] border border-[#f7d7b0]">
                  {(config as any).animationIntensityLevel || "medium"} Intensity
                </span>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <span className="text-xs font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">Low</span>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="1"
                  value={
                    ((config as any).animationIntensityLevel || "medium") === "low"
                      ? 1
                      : ((config as any).animationIntensityLevel || "medium") === "high"
                      ? 3
                      : 2
                  }
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    const level = val === 1 ? "low" : val === 3 ? "high" : "medium";
                    updateConfig("animationIntensityLevel", level);
                    showToast(`Animation Intensity set to ${level}`);
                  }}
                  className="flex-1 accent-[#f15e1c] cursor-pointer"
                />
                <span className="text-xs font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">High</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
