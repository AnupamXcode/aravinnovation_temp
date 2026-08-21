"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Globe,
  Briefcase,
  Building2,
  FileText,
  Workflow,
  Quote,
  MessageSquare,
  PhoneCall,
  Share2,
  Search,
  ShieldCheck,
  LogOut,
  SlidersHorizontal,
  ChevronRight,
  Menu,
  X,
  Languages,
  Zap,
} from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export function AdminSidebar({
  activeTab,
  setActiveTab,
  onLogout,
}: AdminSidebarProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);

  const navGroups = [
    {
      groupLabel: "DASHBOARD",
      items: [
        { id: "dashboard", label: "Overview & Status", icon: LayoutDashboard },
      ],
    },
    {
      groupLabel: "WEBSITE PAGES",
      items: [
        { id: "hero", label: "Homepage & Hero", icon: Globe },
        { id: "services", label: "7 Core Practices", icon: Briefcase },
        { id: "industries", label: "Industry Solutions", icon: Building2 },
        { id: "casestudies", label: "Case Studies", icon: FileText },
        { id: "methodology", label: "5-Step Methodology", icon: Workflow },
        { id: "testimonials", label: "Client Testimonials", icon: Quote },
        { id: "footer", label: "Footer & Regional", icon: Share2 },
      ],
    },
    {
      groupLabel: "DIGITAL PRESENCE & SOCIAL",
      items: [
        { id: "socials", label: "Social Media & URLs", icon: Share2 },
      ],
    },
    {
      groupLabel: "COMMUNICATION",
      items: [
        { id: "chatbot", label: "Chatbot & Knowledge Base", icon: MessageSquare },
        { id: "contact", label: "Contact Info & Leads", icon: PhoneCall },
      ],
    },
    {
      groupLabel: "LOCALIZATION & SEO",
      items: [
        { id: "languages", label: "Languages & RTL", icon: Languages },
        { id: "seo", label: "Global SEO & Metadata", icon: Search },
        { id: "legal", label: "Legal & DPDP Content", icon: ShieldCheck },
      ],
    },
    {
      groupLabel: "SYSTEM",
      items: [
        { id: "system", label: "Maintenance Controls", icon: SlidersHorizontal },
      ],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#FFFDF9] dark:bg-[#161310] border-r border-[#EFE2D6] dark:border-[#2C241E] p-4 sm:p-6 w-64 lg:w-72 shrink-0">
      {/* Brand Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#EFE2D6] dark:border-[#2C241E] mb-6">
        <BrandLogo />
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(false)}
          className="lg:hidden p-1.5 text-[#7A6A5F] hover:text-[#3A2E27] dark:hover:text-[#FAF5EE]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Group Items */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-1">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1.5">
            <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0] px-3">
              {group.groupLabel}
            </span>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileDrawerOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer",
                      isActive
                        ? "bg-[#E8672A] text-white shadow-md shadow-[#E8672A]/25"
                        : "text-[#3A2E27] dark:text-[#FAF5EE] hover:bg-[#FBF3EA] dark:hover:bg-[#1A1613]"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Logout Action */}
      <div className="pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E] mt-4">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-2xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Admin</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Bar & Drawer Overlay */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#FFFDF9] dark:bg-[#161310] border-b border-[#EFE2D6] dark:border-[#2C241E] px-4 py-3 flex items-center justify-between">
        <BrandLogo />
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          className="p-2 rounded-xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] text-[#3A2E27] dark:text-[#FAF5EE]"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#3A2E27]/55 backdrop-blur-xs flex">
          {sidebarContent}
          <div
            className="flex-1"
            onClick={() => setMobileDrawerOpen(false)}
          />
        </div>
      )}
    </>
  );
}
