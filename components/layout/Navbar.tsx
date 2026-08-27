"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BrandLogo } from "./BrandLogo";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  servicesNavigation,
  workingWithUsNavigation,
} from "@/data/navigation";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Compass,
  Code2,
  TrendingUp,
  Search,
  ShieldCheck,
  BarChart3,
  Users2,
  Cpu,
  Mail,
  Workflow,
  Quote,
  Briefcase,
  Layers,
  GraduationCap,
  Building2,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const serviceIcons: Record<string, React.ReactNode> = {
  "/services/it-strategy-implementation": <Compass className="w-4 h-4 text-[#f15e1c]" />,
  "/services/digital-marketing-brand-development": <TrendingUp className="w-4 h-4 text-[#f15e1c]" />,
  "/services/web-app-development": <Code2 className="w-4 h-4 text-[#f15e1c]" />,
  "/services/risk-compliance-governance": <ShieldCheck className="w-4 h-4 text-[#f15e1c]" />,
  "/services/audit-improvement": <BarChart3 className="w-4 h-4 text-[#f15e1c]" />,
  "/services/training-staff-augmentation": <Users2 className="w-4 h-4 text-[#f15e1c]" />,
  "/services/seo-services": <Search className="w-4 h-4 text-[#f15e1c]" />,
  "/services/ai-portfolio": <Cpu className="w-4 h-4 text-[#f15e1c]" />,
  // Legacy slug mappings
  "/services/it-strategy-consulting": <Compass className="w-4 h-4 text-[#f15e1c]" />,
  "/services/web-application-development": <Code2 className="w-4 h-4 text-[#f15e1c]" />,
  "/services/digital-marketing": <TrendingUp className="w-4 h-4 text-[#f15e1c]" />,
  "/services/seo": <Search className="w-4 h-4 text-[#f15e1c]" />,
  "/services/risk-governance-compliance": <ShieldCheck className="w-4 h-4 text-[#f15e1c]" />,
};

const workingWithUsIcons: Record<string, React.ReactNode> = {
  "/contact": <Mail className="w-4 h-4 text-[#f15e1c]" />,
  "/#process": <Workflow className="w-4 h-4 text-[#f15e1c]" />,
  "/testimonials": <Quote className="w-4 h-4 text-[#f15e1c]" />,
  "/case-studies": <Layers className="w-4 h-4 text-[#f15e1c]" />,
  "/solutions": <Briefcase className="w-4 h-4 text-[#f15e1c]" />,
  "/careers": <GraduationCap className="w-4 h-4 text-[#f15e1c]" />,
  "/about": <Building2 className="w-4 h-4 text-[#f15e1c]" />,
};

export function Navbar() {
  const pathname = usePathname();
  if (pathname?.includes("/admin")) {
    return null;
  }
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
  const [mobileWorkingWithUsOpen, setMobileWorkingWithUsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open (TASK D)
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isWorkingWithUsActive = () => {
    return (
      pathname.startsWith("/contact") ||
      pathname.startsWith("/testimonials") ||
      pathname.startsWith("/solutions") ||
      pathname.startsWith("/case-studies") ||
      pathname.startsWith("/careers") ||
      pathname.startsWith("/about")
    );
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-[#FFFDF9]/95 dark:bg-[#12100E]/95 backdrop-blur-md border-[#EFE2D6] dark:border-[#2C241E] shadow-sm py-3"
            : "bg-[#FFFDF9]/80 dark:bg-[#12100E]/80 backdrop-blur-xs border-transparent py-4"
        )}
      >
        <div className="max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="shrink-0">
              <BrandLogo />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {/* 1. What We Do Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("services")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={cn(
                    "relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer group",
                    isActive("/services")
                      ? "text-[#f15e1c] font-semibold bg-[#FCE3D3]/30 dark:bg-[#261F1A]"
                      : "text-[#3A2E27] dark:text-[#FAF5EE] hover:text-[#f15e1c] dark:hover:text-[#f15e1c] hover:bg-[#FCE3D3]/40 dark:hover:bg-[#261F1A]"
                  )}
                  aria-expanded={activeDropdown === "services"}
                >
                  <span>What We Do</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200 text-[#7A6A5F] dark:text-[#B8ACA0]",
                      activeDropdown === "services" && "rotate-180 text-[#f15e1c] dark:text-[#f15e1c]"
                    )}
                  />
                </button>

                {/* Mega Dropdown Menu */}
                {activeDropdown === "services" && (
                  <div className="absolute top-full left-0 w-[580px] pt-2 z-50">
                    <div className="rounded-3xl bg-[#FFFDF9] dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] p-4 shadow-2xl grid grid-cols-1 gap-1">
                      <div className="px-3 py-1.5 border-b border-[#EFE2D6] dark:border-[#2C241E] mb-1 flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0]">
                          Our 8 Core Services
                        </span>
                        <Link
                          href="/services"
                          className="text-xs font-semibold text-[#f15e1c] hover:underline inline-flex items-center gap-1"
                          onClick={() => setActiveDropdown(null)}
                        >
                          View All 8 Services <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 gap-1 max-h-[420px] overflow-y-auto">
                        {servicesNavigation.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={() => {
                              setActiveDropdown(null);
                              trackEvent({
                                type: "cta_click",
                                label: service.label,
                                location: "navbar_dropdown",
                                targetUrl: service.href,
                              });
                            }}
                            className={cn(
                              "flex items-start gap-3 p-2.5 rounded-2xl transition-all hover:bg-[#FBF3EA] dark:hover:bg-[#221D18] group",
                              pathname === service.href && "bg-[#FCE3D3]/40 dark:bg-[#2C221B]"
                            )}
                          >
                            <div className="p-2 rounded-xl bg-[#FCE3D3]/50 dark:bg-[#261F1A] group-hover:bg-[#f15e1c]/10 transition-colors shrink-0 mt-0.5 border border-[#F4A97F]/30 dark:border-[#3D332B]">
                              {serviceIcons[service.href] || <Sparkles className="w-4 h-4 text-[#f15e1c]" />}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#f15e1c] dark:group-hover:text-[#f15e1c] transition-colors flex items-center gap-2">
                                {service.label}
                              </div>
                              <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] line-clamp-1 mt-0.5">
                                {service.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Products */}
              <Link
                href="/products"
                className={cn(
                  "px-3.5 py-2 rounded-xl text-sm font-medium transition-colors",
                  isActive("/products")
                    ? "text-[#f15e1c] font-semibold"
                    : "text-[#3A2E27] dark:text-[#FAF5EE] hover:text-[#f15e1c] dark:hover:text-[#f15e1c] hover:bg-[#FCE3D3]/40 dark:hover:bg-[#261F1A]"
                )}
              >
                Products
              </Link>

              {/* 3. Working With Us Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("working-with-us")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                    isWorkingWithUsActive()
                      ? "text-[#f15e1c] font-semibold"
                      : "text-[#3A2E27] dark:text-[#FAF5EE] hover:text-[#f15e1c] dark:hover:text-[#f15e1c] hover:bg-[#FCE3D3]/40 dark:hover:bg-[#261F1A]"
                  )}
                  aria-expanded={activeDropdown === "working-with-us"}
                >
                  <span>Working With Us</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200 text-[#7A6A5F] dark:text-[#B8ACA0]",
                      activeDropdown === "working-with-us" && "rotate-180 text-[#f15e1c] dark:text-[#f15e1c]"
                    )}
                  />
                </button>

                {activeDropdown === "working-with-us" && (
                  <div className="absolute top-full left-0 w-[420px] pt-2 z-50">
                    <div className="rounded-3xl bg-[#FFFDF9] dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] p-3 shadow-2xl space-y-1">
                      <Link
                        href="/contact"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between p-3 rounded-2xl bg-[#FCE3D3]/70 dark:bg-[#2C221B] border border-[#F4A97F]/40 dark:border-[#f15e1c]/30 transition-all hover:shadow-sm group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-[#f15e1c] text-white">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#f15e1c] transition-colors">
                              Contact & Project Inquiries
                            </div>
                            <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                              Schedule an exploratory consultation & NDA
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#f15e1c] group-hover:translate-x-0.5 transition-transform" />
                      </Link>

                      <div className="pt-1.5 pb-1 px-3 border-b border-[#EFE2D6] dark:border-[#2C241E]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0]">
                          Company & Engagements
                        </span>
                      </div>

                      <div className="max-h-[300px] overflow-y-auto space-y-0.5">
                        {workingWithUsNavigation.filter(item => item.href !== "/contact").map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className={cn(
                              "flex items-start gap-2.5 p-2.5 rounded-xl transition-all hover:bg-[#FBF3EA] dark:hover:bg-[#221D18] group",
                              pathname === item.href && "bg-[#FCE3D3]/40 dark:bg-[#2C221B]"
                            )}
                          >
                            <div className="p-1.5 rounded-lg bg-[#FCE3D3]/50 dark:bg-[#261F1A] text-[#f15e1c] shrink-0 mt-0.5">
                              {workingWithUsIcons[item.href] || <Sparkles className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#f15e1c] dark:group-hover:text-[#f15e1c] transition-colors">
                                {item.label}
                              </div>
                              <p className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0] mt-0.5 line-clamp-1">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Blogs */}
              <Link
                href="/insights"
                className={cn(
                  "relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer group",
                  isActive("/insights") || isActive("/blog") || isActive("/blogs")
                    ? "text-[#f15e1c] font-semibold bg-[#FCE3D3]/30 dark:bg-[#261F1A]"
                    : "text-[#3A2E27] dark:text-[#FAF5EE] hover:text-[#f15e1c] dark:hover:text-[#f15e1c] hover:bg-[#FCE3D3]/40 dark:hover:bg-[#261F1A]"
                )}
              >
                Blogs
              </Link>
            </nav>

            {/* Right Utility Cluster */}
            <div className="hidden lg:flex items-center gap-2.5">
              <LanguageSelector />
              <ThemeToggle />
            </div>

            {/* Mobile Header Right Bar */}
            <div className="flex lg:hidden items-center gap-2">
              <div className="hidden sm:block">
                <LanguageSelector />
              </div>
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-[#f15e1c] text-white hover:bg-[#d44e14] transition-all shadow-md flex items-center justify-center shrink-0 min-w-[44px] min-h-[44px] cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* TASK D — Mobile Navigation Backdrop Overlay & Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Blur Overlay: Subdues and blurs the underlying page, disables background interaction */}
          <div
            className="lg:hidden fixed inset-0 top-[65px] z-40 bg-black/40 dark:bg-black/60 backdrop-blur-md transition-all duration-300 pointer-events-auto"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Premium Mobile Navigation Drawer Panel */}
          <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 z-50 bg-[#FFFDF9]/95 dark:bg-[#12100E]/95 backdrop-blur-xl border-t border-[#EFE2D6] dark:border-[#2C241E] px-5 py-6 overflow-y-auto shadow-2xl animate-in fade-in slide-in-from-top-3 duration-250 pointer-events-auto">
            <div className="space-y-6 max-w-lg mx-auto">
              {/* Mobile Utility Controls */}
              <div className="sm:hidden flex items-center justify-between pb-4 border-b border-[#EFE2D6] dark:border-[#2C241E]">
                <span className="text-xs font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">Preferences</span>
                <LanguageSelector />
              </div>

              {/* Group 1: What We Do */}
              <div>
                <button
                  type="button"
                  className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0] mb-3 py-2 border-b border-transparent focus:outline-none cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMobileServicesOpen(!mobileServicesOpen);
                  }}
                >
                  <span className="pointer-events-none font-display text-sm font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                    What We Do (8 Core Services)
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 transition-transform duration-200 pointer-events-none text-[#f15e1c]",
                      mobileServicesOpen ? "rotate-180" : ""
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    mobileServicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden flex flex-col gap-2">
                    {servicesNavigation.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl bg-[#FBF3EA]/80 dark:bg-[#1A1613] hover:bg-[#FCE3D3] dark:hover:bg-[#261F1A] text-sm font-semibold text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#2C241E] min-h-[44px]"
                      >
                        <div className="shrink-0">{serviceIcons[s.href]}</div>
                        <span className="truncate">{s.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Group 2: Products */}
              <div className="pt-2 border-t border-[#EFE2D6] dark:border-[#2C241E]">
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-semibold font-display text-[#3A2E27] dark:text-[#FAF5EE]"
                >
                  Products & Platforms
                </Link>
              </div>

              {/* Group 3: Working With Us */}
              <div className="pt-2 border-t border-[#EFE2D6] dark:border-[#2C241E]">
                <button
                  type="button"
                  className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0] mb-3 py-2 border-b border-transparent focus:outline-none cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMobileWorkingWithUsOpen(!mobileWorkingWithUsOpen);
                  }}
                >
                  <span className="pointer-events-none font-display text-sm font-bold text-[#3A2E27] dark:text-[#FAF5EE]">
                    Working With Us
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 transition-transform duration-200 pointer-events-none text-[#f15e1c]",
                      mobileWorkingWithUsOpen ? "rotate-180" : ""
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    mobileWorkingWithUsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden flex flex-col gap-2">
                    {workingWithUsNavigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl text-sm font-medium border border-[#EFE2D6] dark:border-[#2C241E] min-h-[44px]",
                          item.href === "/contact"
                            ? "bg-[#FCE3D3]/90 dark:bg-[#2C221B] font-bold text-[#f15e1c]"
                            : "bg-[#FBF3EA]/80 dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE]"
                        )}
                      >
                        <div className="shrink-0">{workingWithUsIcons[item.href]}</div>
                        <div className="truncate">{item.label}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Group 4: Blogs & Insights */}
              <div className="pt-2 border-t border-[#EFE2D6] dark:border-[#2C241E]">
                <Link
                  href="/insights"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-semibold font-display text-[#3A2E27] dark:text-[#FAF5EE]"
                >
                  Blogs &amp; Insights
                </Link>
              </div>

              {/* Mobile Bottom Conversion CTA */}
              <div className="pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                  <Button variant="primary" size="lg" className="w-full justify-center shadow-md bg-[#f15e1c] hover:bg-[#d44e14]">
                    Talk to an Expert <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
