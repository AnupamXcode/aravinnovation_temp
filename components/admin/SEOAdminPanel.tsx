"use client";

import * as React from "react";
import {
  getRouteCatalog,
  getSEOForPath,
  saveSEOOverride,
  evaluateSEOAudit,
  SEOPageSettings,
  SEOAuditResult,
  SITE_BASE_URL,
} from "@/lib/seo";
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Save,
  Globe,
  FileCode,
  Image as ImageIcon,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Sliders,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteConfig } from "@/lib/site-config";

export function SEOAdminPanel() {
  const { config, updateConfig } = useSiteConfig();
  const catalog = React.useMemo(() => getRouteCatalog(), []);
  const [selectedPath, setSelectedPath] = React.useState<string>("/");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Active loaded form state
  const [form, setForm] = React.useState<SEOPageSettings>(() => getSEOForPath("/"));
  const [audit, setAudit] = React.useState<SEOAuditResult>(() => evaluateSEOAudit(getSEOForPath("/")));
  const [jsonError, setJsonError] = React.useState<string | null>(null);
  const [altJsonError, setAltJsonError] = React.useState<string | null>(null);

  // Refresh form when selected path changes
  React.useEffect(() => {
    const loaded = getSEOForPath(selectedPath);
    setForm(loaded);
    setAudit(evaluateSEOAudit(loaded));
    setJsonError(null);
    setAltJsonError(null);
  }, [selectedPath]);

  // Re-evaluate live audit on local form change
  const updateFormField = <K extends keyof SEOPageSettings>(field: K, value: SEOPageSettings[K]) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    setAudit(evaluateSEOAudit(updated));
  };

  const handleJsonSchemaChange = (val: string) => {
    updateFormField("jsonLdSchema", val);
    try {
      if (val.trim()) {
        JSON.parse(val);
      }
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || "Invalid JSON syntax");
    }
  };

  const handleAltMappingsChange = (val: string) => {
    try {
      if (!val.trim()) {
        updateFormField("imageAltMappings", {});
        setAltJsonError(null);
        return;
      }
      const parsed = JSON.parse(val);
      if (typeof parsed === "object" && !Array.isArray(parsed)) {
        updateFormField("imageAltMappings", parsed);
        setAltJsonError(null);
      } else {
        setAltJsonError("Must be a key-value JSON object mapping file paths to alt strings");
      }
    } catch (err: any) {
      setAltJsonError(err.message || "Invalid JSON object");
    }
  };

  const handleSave = () => {
    if (jsonError) {
      showToast("Cannot save: Invalid JSON-LD Schema");
      return;
    }
    if (altJsonError) {
      showToast("Cannot save: Invalid Image Alt Text JSON Map");
      return;
    }

    saveSEOOverride(form.path, {
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      priority: form.priority,
      ogTitle: form.ogTitle,
      ogImage: form.ogImage,
      ogDescription: form.ogDescription,
      canonicalOverride: form.canonicalOverride,
      robots: form.robots,
      jsonLdSchema: form.jsonLdSchema,
      imageAltMappings: form.imageAltMappings,
    });

    showToast(`Saved SEO metadata for ${form.path}`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered route list
  const filteredCatalog = catalog.filter((r) => {
    const q = searchQuery.toLowerCase();
    return r.path.toLowerCase().includes(q) || r.label.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl bg-[#f15e1c] text-white text-xs font-bold shadow-2xl animate-in fade-in flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Dual-Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: Sitemap Page Browser */}
        <div className="lg:col-span-4 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#EFE2D6] dark:border-[#2C241E] pb-3">
            <div>
              <h2 className="text-base font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#f15e1c]" />
                Sitemap Pages ({catalog.length})
              </h2>
              <p className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0] mt-0.5">
                Real-time route discovery &amp; status
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#FCE3D3] dark:bg-[#2A201A] text-[#f15e1c]">
              Live Index
            </span>
          </div>

          {/* Route Filter Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#7A6A5F] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search route path (e.g. /services)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] focus:border-[#f15e1c] outline-none text-[#3A2E27] dark:text-[#FAF5EE]"
            />
          </div>

          {/* Scrollable Sitemap Route List */}
          <div className="space-y-1.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredCatalog.map((route) => {
              const currentSEO = getSEOForPath(route.path);
              const routeAudit = evaluateSEOAudit(currentSEO);
              const isSelected = selectedPath === route.path;

              let dotColor = "bg-emerald-500";
              if (routeAudit.status === "warning") dotColor = "bg-amber-500";
              if (routeAudit.status === "critical") dotColor = "bg-rose-500";

              return (
                <button
                  key={route.path}
                  type="button"
                  onClick={() => setSelectedPath(route.path)}
                  className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-[#FCE3D3]/60 dark:bg-[#2A201A] border-[#f15e1c] shadow-xs"
                      : "bg-white/60 dark:bg-[#1A1613]/60 border-[#EFE2D6]/70 dark:border-[#2C241E] hover:border-[#f15e1c]/50 hover:bg-[#FBF3EA] dark:hover:bg-[#1F1A16]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full ${dotColor} shrink-0`} />
                      <span className="font-mono text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE] truncate">
                        {route.path}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-[#7A6A5F] dark:text-[#B8ACA0] shrink-0">
                      p={currentSEO.priority.toFixed(1)}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0] mt-1 pl-4 truncate">
                    {route.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 3D EXPERIENCE ADMIN CONTROL CARD */}
          <div className="p-4 rounded-3xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#EFE2D6] dark:border-[#2C241E] pb-2">
              <span className="text-xs font-bold font-mono text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#f15e1c]" />
                3D Experience Controls
              </span>
              <span className="text-[10px] font-mono font-bold text-[#2e936f]">
                Active
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { label: "Enable Global 3D System", key: "enable3D" },
                { label: "Hero 3D Architecture", key: "hero3D" },
                { label: "Services 3D Constellation", key: "services3D" },
                { label: "Case Study 3D Transformation", key: "caseStudies3D" },
                { label: "Methodology 3D Path", key: "methodology3D" },
                { label: "Footer 3D Network", key: "footer3D" },
                { label: "Mobile 3D System", key: "mobile3D" },
              ].map((item) => {
                const currentVal = (config.threeDConfig as any)?.[item.key] !== false;
                return (
                  <label key={item.key} className="flex items-center justify-between cursor-pointer hover:bg-white dark:hover:bg-[#201B17] p-1.5 rounded-lg transition-colors">
                    <span className="text-[#3A2E27] dark:text-[#FAF5EE]">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={currentVal}
                      onChange={(e) => {
                        const updated = {
                          ...(config.threeDConfig || {}),
                          [item.key]: e.target.checked,
                        };
                        updateConfig("threeDConfig", updated);
                      }}
                      className="accent-[#f15e1c] w-4 h-4 rounded cursor-pointer"
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Per-Page SEO Editor */}
        <div className="lg:col-span-8 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] p-6 space-y-6 shadow-xl">
          {/* Header Bar for Selected Page */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EFE2D6] dark:border-[#2C241E] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md bg-[#FCE3D3] dark:bg-[#2A201A] text-[#f15e1c]">
                  Editing Route
                </span>
                <h3 className="text-lg font-extrabold font-mono text-[#3A2E27] dark:text-[#FAF5EE]">
                  {form.path}
                </h3>
              </div>
              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] mt-0.5">
                Label: <strong>{form.label}</strong> &bull; Target URL: {SITE_BASE_URL}{form.path}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`${SITE_BASE_URL}${form.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] text-[#3A2E27] dark:text-[#FAF5EE] hover:border-[#f15e1c]"
              >
                <span>Live Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <Button
                variant="primary"
                onClick={handleSave}
                className="rounded-xl px-4 py-2 text-xs shadow-md"
                leftIcon={<Save className="w-3.5 h-3.5" />}
              >
                Save Changes
              </Button>
            </div>
          </div>

          {/* DYNAMIC SEO AUDIT LOG CALLOUT BOX */}
          <div className="rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#f15e1c]" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE]">
                  SEO Audit Log &amp; Completeness Score
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">
                  Score:
                </span>
                <span
                  className={`px-3 py-0.5 rounded-full text-xs font-mono font-extrabold ${
                    audit.score >= 80
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                      : audit.score >= 50
                      ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                      : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                  }`}
                >
                  {audit.score}/100 ({audit.status.toUpperCase()})
                </span>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              {audit.issues.length === 0 ? (
                <div className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>No SEO issues detected for this route. Metadata and schema are in optimal ranges.</span>
                </div>
              ) : (
                audit.issues.map((issue, idx) => (
                  <div
                    key={idx}
                    className="text-xs flex items-start gap-2 text-[#3A2E27] dark:text-[#FAF5EE]"
                  >
                    {issue.type === "error" && <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />}
                    {issue.type === "warning" && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                    {issue.type === "info" && <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />}
                    <span className="leading-tight">{issue.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* EDIT FORM FIELDS */}
          <div className="space-y-5">
            {/* Meta Title Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                  Meta Title
                </label>
                <span
                  className={`text-[11px] font-mono font-bold ${
                    form.metaTitle.length >= 30 && form.metaTitle.length <= 60
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {form.metaTitle.length} chars (30–60 optimal)
                </span>
              </div>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) => updateFormField("metaTitle", e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-[#12100E] border border-[#EFE2D6] dark:border-[#2C241E] focus:border-[#f15e1c] outline-none text-[#3A2E27] dark:text-[#FAF5EE]"
              />
            </div>

            {/* Meta Description Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                  Meta Description
                </label>
                <span
                  className={`text-[11px] font-mono font-bold ${
                    form.metaDescription.length >= 120 && form.metaDescription.length <= 160
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {form.metaDescription.length} chars (120–160 optimal)
                </span>
              </div>
              <textarea
                rows={3}
                value={form.metaDescription}
                onChange={(e) => updateFormField("metaDescription", e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-[#12100E] border border-[#EFE2D6] dark:border-[#2C241E] focus:border-[#f15e1c] outline-none text-[#3A2E27] dark:text-[#FAF5EE]"
              />
            </div>

            {/* Priority & Robots Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Priority */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                  Sitemap Priority (0.0 - 1.0)
                </label>
                <select
                  value={form.priority}
                  onChange={(e) => updateFormField("priority", parseFloat(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#12100E] border border-[#EFE2D6] dark:border-[#2C241E] focus:border-[#f15e1c] outline-none text-[#3A2E27] dark:text-[#FAF5EE]"
                >
                  <option value={1.0}>1.0 (Highest - Homepage)</option>
                  <option value={0.9}>0.9 (High - Core Practices / Products)</option>
                  <option value={0.8}>0.8 (Standard - Services / Solutions)</option>
                  <option value={0.7}>0.7 (Medium - Case Studies / Insights)</option>
                  <option value={0.5}>0.5 (Low - General Info)</option>
                  <option value={0.3}>0.3 (Minimal - Legal Terms)</option>
                </select>
              </div>

              {/* Robots Settings */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                  Robots Indexing Directive
                </label>
                <select
                  value={form.robots}
                  onChange={(e) => updateFormField("robots", e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#12100E] border border-[#EFE2D6] dark:border-[#2C241E] focus:border-[#f15e1c] outline-none text-[#3A2E27] dark:text-[#FAF5EE]"
                >
                  <option value="Index, Follow">Index, Follow (Recommended)</option>
                  <option value="Index, NoFollow">Index, NoFollow</option>
                  <option value="NoIndex, Follow">NoIndex, Follow</option>
                  <option value="NoIndex, NoFollow">NoIndex, NoFollow</option>
                </select>
              </div>
            </div>

            {/* OG Metadata Section */}
            <div className="rounded-2xl border border-[#EFE2D6] dark:border-[#2C241E] p-4 space-y-4 bg-white/40 dark:bg-[#12100E]/40">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#f15e1c] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Social Share Card (Open Graph Overrides)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                    OG Title
                  </label>
                  <input
                    type="text"
                    placeholder="Same as meta title if empty..."
                    value={form.ogTitle || ""}
                    onChange={(e) => updateFormField("ogTitle", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#12100E] border border-[#EFE2D6] dark:border-[#2C241E] focus:border-[#f15e1c] outline-none text-[#3A2E27] dark:text-[#FAF5EE]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                    OG Image URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://aravinnovations.com/og-default.jpg"
                    value={form.ogImage || ""}
                    onChange={(e) => updateFormField("ogImage", e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#12100E] border border-[#EFE2D6] dark:border-[#2C241E] focus:border-[#f15e1c] outline-none text-[#3A2E27] dark:text-[#FAF5EE]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                  OG Description
                </label>
                <input
                  type="text"
                  placeholder="Same as meta description if empty..."
                  value={form.ogDescription || ""}
                  onChange={(e) => updateFormField("ogDescription", e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#12100E] border border-[#EFE2D6] dark:border-[#2C241E] focus:border-[#f15e1c] outline-none text-[#3A2E27] dark:text-[#FAF5EE]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
                  Canonical Link Override
                </label>
                <input
                  type="text"
                  placeholder={`Autogenerated defaults to ${SITE_BASE_URL}${form.path}`}
                  value={form.canonicalOverride || ""}
                  onChange={(e) => updateFormField("canonicalOverride", e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#12100E] border border-[#EFE2D6] dark:border-[#2C241E] focus:border-[#f15e1c] outline-none text-[#3A2E27] dark:text-[#FAF5EE]"
                />
              </div>
            </div>

            {/* JSON-LD Schema Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-[#f15e1c]" />
                  Structured Schema Data (JSON-LD)
                </label>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    jsonError
                      ? "bg-rose-500/15 text-rose-500 border border-rose-500/30"
                      : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                  }`}
                >
                  {jsonError ? `Syntax Error: ${jsonError}` : "Valid JSON"}
                </span>
              </div>
              <textarea
                rows={6}
                value={form.jsonLdSchema}
                onChange={(e) => handleJsonSchemaChange(e.target.value)}
                className="w-full p-3 font-mono text-[11px] rounded-xl bg-[#14110E] text-[#FAF5EE] border border-[#2C241E] focus:border-[#f15e1c] outline-none"
              />
            </div>

            {/* Image Alt Text Mappings (JSON Map) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#f15e1c]" />
                  Image Alt Text Mappings (JSON Map)
                </label>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    altJsonError
                      ? "bg-rose-500/15 text-rose-500 border border-rose-500/30"
                      : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                  }`}
                >
                  {altJsonError ? `Error: ${altJsonError}` : "Valid Object"}
                </span>
              </div>
              <textarea
                rows={3}
                value={JSON.stringify(form.imageAltMappings || {}, null, 2)}
                onChange={(e) => handleAltMappingsChange(e.target.value)}
                className="w-full p-3 font-mono text-[11px] rounded-xl bg-[#14110E] text-[#FAF5EE] border border-[#2C241E] focus:border-[#f15e1c] outline-none"
              />
              <p className="text-[10px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                Enter a JSON dictionary mapping image URL paths to descriptive accessibility alt labels.
              </p>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E] flex items-center justify-end gap-3">
            <Button
              variant="primary"
              onClick={handleSave}
              className="rounded-xl px-6 py-2.5 text-xs shadow-lg hover:shadow-xl hover:shadow-[#f15e1c]/25"
              leftIcon={<Save className="w-4 h-4" />}
            >
              Save Changes to {form.path}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
