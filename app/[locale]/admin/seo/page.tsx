"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useSiteConfig } from "@/lib/site-config";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SEOAdminPanel } from "@/components/admin/SEOAdminPanel";
import { Search, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminSEOPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const { isAuthenticated, logoutAdmin } = useSiteConfig();
  const [activeTab, setActiveTab] = React.useState("seo");

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/${locale}/admin/login`);
    }
  }, [isAuthenticated, locale, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-[#FAF5EE] dark:bg-[#161310] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#E8672A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
            Verifying admin authentication...
          </p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logoutAdmin();
    router.replace(`/${locale}/admin/login`);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab !== "seo") {
      router.push(`/${locale}/admin`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5EE] dark:bg-[#161310] text-[#3A2E27] dark:text-[#FAF5EE] flex flex-col lg:flex-row transition-colors duration-300">
      {/* Left Navigation Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onLogout={handleLogout}
      />

      {/* Main CMS SEO Admin Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto mt-14 lg:mt-0 space-y-8 max-w-[1600px]">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#FCE3D3]/60 dark:bg-[#2C221B] text-[#E8672A]">
                <Search className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold font-display">
                Dedicated SEO Management &amp; Per-Page Audit Center
              </h1>
            </div>
            <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] pl-9">
              Per-page meta tags, canonical overrides, JSON-LD schemas, and alt-text mappings
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}/admin`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] text-[#3A2E27] dark:text-[#FAF5EE] hover:border-[#E8672A]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>CMS Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Dynamic SEO Admin Panel Component */}
        <SEOAdminPanel />
      </main>
    </div>
  );
}
