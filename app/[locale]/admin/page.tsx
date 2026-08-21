"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useSiteConfig } from "@/lib/site-config";
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
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { servicesKnowledge } from "@/data/chatbot-knowledge";

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

  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/${locale}/admin/login`);
    }
  }, [isAuthenticated, locale, router]);

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
    <div className="min-h-screen bg-[#FAF5EE] dark:bg-[#0E0C0A] text-[#3A2E27] dark:text-[#FAF5EE] p-4 sm:p-8 lg:p-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#E8672A] text-white text-xs font-semibold shadow-2xl animate-in fade-in slide-in-from-top-4">
            ✓ {toastMessage}
          </div>
        )}

        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#FCE3D3]/60 dark:bg-[#2C221B] text-[#E8672A]">
                <Shield className="w-5 h-5" />
              </span>
              <h1 className="text-2xl font-extrabold font-display">
                Arav Innovations Admin Control Center
              </h1>
            </div>
            <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] pl-9">
              One-click controls for website sections, service maintenance status, and chatbot settings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={resetConfig}
              className="rounded-xl border-[#EFE2D6] dark:border-[#2C241E]"
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Reset Defaults
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleLogout}
              className="rounded-xl"
              leftIcon={<LogOut className="w-4 h-4" />}
            >
              Logout Admin
            </Button>
          </div>
        </div>

        {/* Main Grid: Control Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Task D & E — Per-Service Maintenance Toggles */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-6 lg:col-span-2">
            <div className="flex items-center justify-between border-b border-[#EFE2D6] dark:border-[#2C241E] pb-4">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-[#E8672A]" />
                <h2 className="text-lg font-bold font-display">
                  Service Maintenance Status Controls
                </h2>
              </div>
              <span className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                Toggle individual services ON/OFF
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {servicesKnowledge.map((service) => {
                const isEnabled = config.serviceStates?.[service.slug] !== false;
                return (
                  <div
                    key={service.slug}
                    className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                          {service.name}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            isEnabled
                              ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                              : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {isEnabled ? "Enabled" : "Maintenance"}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0] line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        toggleServiceState(service.slug);
                        showToast(`${service.name} status updated`);
                      }}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isEnabled
                          ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-xs"
                          : "bg-amber-500 text-white hover:bg-amber-600 shadow-xs"
                      }`}
                    >
                      {isEnabled ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Service Active (Click to Disable)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Maintenance Mode (Click to Enable)</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2: Chatbot Controls */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#EFE2D6] dark:border-[#2C241E] pb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#E8672A]" />
                <h2 className="text-lg font-bold font-display">
                  Arav Assistant Chatbot Settings
                </h2>
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  config.chatbotEnabled
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                    : "bg-rose-500/20 text-rose-600 dark:text-rose-400"
                }`}
              >
                {config.chatbotEnabled ? "Active" : "Disabled"}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613]">
                <div>
                  <div className="text-sm font-bold">Global Chatbot Launcher</div>
                  <div className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                    Enable or disable the floating assistant widget
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    updateConfig("chatbotEnabled", !config.chatbotEnabled);
                    showToast(
                      `Chatbot ${!config.chatbotEnabled ? "Enabled" : "Disabled"}`
                    );
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    config.chatbotEnabled
                      ? "bg-[#E8672A] text-white"
                      : "bg-[#EFE2D6] dark:bg-[#2C241E] text-[#7A6A5F]"
                  }`}
                >
                  {config.chatbotEnabled ? "Enabled" : "Disabled"}
                </button>
              </div>

              <div className="space-y-2 p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613]">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span>Idle Trigger Delay (Seconds)</span>
                  <span className="text-[#E8672A]">
                    {config.chatbotDelaySeconds}s
                  </span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={30}
                  step={1}
                  value={config.chatbotDelaySeconds}
                  onChange={(e) =>
                    updateConfig("chatbotDelaySeconds", Number(e.target.value))
                  }
                  className="w-full accent-[#E8672A] cursor-pointer"
                />
                <div className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">
                  Time to wait before floating prompt appears on idle sessions
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Section Visibility Toggles */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#EFE2D6] dark:border-[#2C241E] pb-4">
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-[#E8672A]" />
                <h2 className="text-lg font-bold font-display">
                  Homepage Section Visibilities
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { key: "trustedClientsVisible", label: "Moving Client Logo Strip" },
                { key: "servicesVisible", label: "7 Core Practices Grid" },
                { key: "industriesVisible", label: "Industry Verticals Matrix" },
                { key: "processVisible", label: "5-Step Execution Timeline" },
                { key: "testimonialsVisible", label: "Client Testimonials Slider" },
                { key: "caseStudiesVisible", label: "Featured Case Studies" },
                { key: "blogVisible", label: "Blog & Insights Feed" },
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
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isVis
                          ? "bg-emerald-500 text-white"
                          : "bg-[#EFE2D6] dark:bg-[#2C241E] text-[#7A6A5F]"
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
      </div>
    </div>
  );
}
