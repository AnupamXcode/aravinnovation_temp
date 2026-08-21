"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BrandLogo } from "./BrandLogo";
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
  "/services/it-strategy-consulting": <Compass className="w-4 h-4 text-[#E8672A]" />,
  "/services/web-app-development": <Code2 className="w-4 h-4 text-[#E8672A]" />,
  "/services/digital-marketing": <TrendingUp className="w-4 h-4 text-[#E8672A]" />,
  "/services/seo": <Search className="w-4 h-4 text-[#E8672A]" />,
  "/services/risk-governance-compliance": <ShieldCheck className="w-4 h-4 text-[#E8672A]" />,
  "/services/audit-improvement": <BarChart3 className="w-4 h-4 text-[#E8672A]" />,
  "/services/training-staff-augmentation": <Users2 className="w-4 h-4 text-[#E8672A]" />,
};

const workingWithUsIcons: Record<string, React.ReactNode> = {
  "/contact": <Mail className="w-4 h-4 text-[#E8672A]" />,
  "/#process": <Workflow className="w-4 h-4 text-[#E8672A]" />,
  "/testimonials": <Quote className="w-4 h-4 text-[#E8672A]" />,
  "/case-studies": <Layers className="w-4 h-4 text-[#E8672A]" />,
  "/solutions": <Briefcase className="w-4 h-4 text-[#E8672A]" />,
  "/careers": <GraduationCap className="w-4 h-4 text-[#E8672A]" />,
  "/about": <Building2 className="w-4 h-4 text-[#E8672A]" />,
};

export function Navbar() {
  const pathname = usePathname();
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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b",
        isScrolled
          ? "bg-[#FFFDF9]/95 dark:bg-[#12100E]/95 backdrop-blur-md border-[#EFE2D6] dark:border-[#2C241E] shadow-sm py-3"
          : "bg-[#FFFDF9]/80 dark:bg-[#12100E]/80 backdrop-blur-xs border-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <BrandLogo />
          </div>

          {/* Desktop Navigation Links (Decluttered 4 primary items) */}
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
                  "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                  isActive("/services")
                    ? "text-[#E8672A] font-semibold"
                    : "text-[#3A2E27] dark:text-[#FAF5EE] hover:text-[#E8672A] dark:hover:text-[#E8672A] hover:bg-[#FCE3D3]/40 dark:hover:bg-[#261F1A]"
                )}
                aria-expanded={activeDropdown === "services"}
              >
                <span>What We Do</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 text-[#7A6A5F] dark:text-[#B8ACA0]",
                    activeDropdown === "services" && "rotate-180 text-[#E8672A] dark:text-[#E8672A]"
                  )}
                />
              </button>

              {/* Mega Dropdown Menu */}
              {activeDropdown === "services" && (
                <div className="absolute top-full left-0 w-[580px] pt-2">
                  <div className="rounded-3xl bg-[#FFFDF9] dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] p-4 shadow-2xl grid grid-cols-1 gap-1">
                    <div className="px-3 py-1.5 border-b border-[#EFE2D6] dark:border-[#2C241E] mb-1 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0]">
                        Our 7 Core Service Lines
                      </span>
                      <Link
                        href="/services"
                        className="text-xs font-semibold text-[#E8672A] hover:underline inline-flex items-center gap-1"
                        onClick={() => setActiveDropdown(null)}
                      >
                        View All Services <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-1 max-h-[380px] overflow-y-auto">
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
                          <div className="p-2 rounded-xl bg-[#FCE3D3]/50 dark:bg-[#261F1A] group-hover:bg-[#E8672A]/10 transition-colors shrink-0 mt-0.5 border border-[#F4A97F]/30 dark:border-[#3D332B]">
                            {serviceIcons[service.href] || <Sparkles className="w-4 h-4 text-[#E8672A]" />}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#E8672A] dark:group-hover:text-[#E8672A] transition-colors flex items-center gap-2">
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
                  ? "text-[#E8672A] font-semibold"
                  : "text-[#3A2E27] dark:text-[#FAF5EE] hover:text-[#E8672A] dark:hover:text-[#E8672A] hover:bg-[#FCE3D3]/40 dark:hover:bg-[#261F1A]"
              )}
            >
              Products
            </Link>

            {/* 3. Working With Us Dropdown (Folded: Process, Clients, Case Studies, Solutions, Careers, About, Contact) */}
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
                    ? "text-[#E8672A] font-semibold"
                    : "text-[#3A2E27] dark:text-[#FAF5EE] hover:text-[#E8672A] dark:hover:text-[#E8672A] hover:bg-[#FCE3D3]/40 dark:hover:bg-[#261F1A]"
                )}
                aria-expanded={activeDropdown === "working-with-us"}
              >
                <span>Working With Us</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 text-[#7A6A5F] dark:text-[#B8ACA0]",
                    activeDropdown === "working-with-us" && "rotate-180 text-[#E8672A] dark:text-[#E8672A]"
                  )}
                />
              </button>

              {activeDropdown === "working-with-us" && (
                <div className="absolute top-full left-0 w-[420px] pt-2">
                  <div className="rounded-3xl bg-[#FFFDF9] dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] p-3 shadow-2xl space-y-1">
                    {/* Emphasized Direct Contact Entry */}
                    <Link
                      href="/contact"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center justify-between p-3 rounded-2xl bg-[#FCE3D3]/70 dark:bg-[#2C221B] border border-[#F4A97F]/40 dark:border-[#E8672A]/30 transition-all hover:shadow-sm group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-[#E8672A] text-white">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#E8672A] transition-colors">
                            Contact & Project Inquiries
                          </div>
                          <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                            Schedule an exploratory consultation & NDA
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#E8672A] group-hover:translate-x-0.5 transition-transform" />
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
                          <div className="p-1.5 rounded-lg bg-[#FCE3D3]/50 dark:bg-[#261F1A] text-[#E8672A] shrink-0 mt-0.5">
                            {workingWithUsIcons[item.href] || <Sparkles className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#E8672A] dark:group-hover:text-[#E8672A] transition-colors">
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

            {/* 4. Insights */}
            <Link
              href="/insights"
              className={cn(
                "px-3.5 py-2 rounded-xl text-sm font-medium transition-colors",
                isActive("/insights")
                  ? "text-[#E8672A] font-semibold"
                  : "text-[#3A2E27] dark:text-[#FAF5EE] hover:text-[#E8672A] dark:hover:text-[#E8672A] hover:bg-[#FCE3D3]/40 dark:hover:bg-[#261F1A]"
              )}
            >
              Insights
            </Link>
          </nav>

          {/* Right Utility Cluster: Language Switcher + Theme Toggle */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Language Switcher */}
            <div className="relative group">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all bg-[#FFFDF9] dark:bg-[#171411] hover:bg-[#FBF3EA] dark:hover:bg-[#221D18] border border-[#EFE2D6] dark:border-[#2C241E] text-[#3A2E27] dark:text-[#FAF5EE]"
                aria-label="Language selection"
              >
                <span>EN</span>
                <ChevronDown className="w-3 h-3 text-[#7A6A5F] dark:text-[#B8ACA0] group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full right-0 mt-1.5 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="rounded-2xl bg-[#FFFDF9] dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] p-2 shadow-xl space-y-1">
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-[#FCE3D3]/60 dark:bg-[#2C221B] text-[#E8672A] text-xs font-semibold">
                    <span>English</span>
                    <span className="text-[10px] font-mono">EN</span>
                  </div>
                  <div className="px-2.5 py-1 text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0] text-center font-medium">
                    More languages coming soon
                  </div>
                </div>
              </div>
            </div>

            <ThemeToggle />
          </div>

          {/* Mobile Actions (Language Badge + Theme Toggle + Menu) */}
          <div className="flex lg:hidden items-center gap-1.5">
            <div className="px-2 py-1 rounded-xl text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E]">
              EN
            </div>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#3A2E27] dark:text-[#FAF5EE] hover:bg-[#FBF3EA] dark:hover:bg-[#221D18] transition-colors border border-[#EFE2D6] dark:border-[#2C241E]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-[#FFFDF9] dark:bg-[#12100E] border-t border-[#EFE2D6] dark:border-[#2C241E] px-5 py-6 overflow-y-auto z-50">
          <div className="space-y-6">
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
                <span className="pointer-events-none">What We Do (7 Core Practices)</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 transition-transform duration-200 pointer-events-none",
                    mobileServicesOpen ? "rotate-180 text-[#E8672A]" : ""
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
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#FBF3EA]/60 dark:bg-[#1A1613] hover:bg-[#FCE3D3]/50 dark:hover:bg-[#261F1A] text-sm font-semibold text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#2C241E] min-h-[44px]"
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
                className="block py-2 text-base font-semibold text-[#3A2E27] dark:text-[#FAF5EE]"
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
                <span className="pointer-events-none">Working With Us</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 transition-transform duration-200 pointer-events-none",
                    mobileWorkingWithUsOpen ? "rotate-180 text-[#E8672A]" : ""
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
                          ? "bg-[#FCE3D3]/80 dark:bg-[#2C221B] font-bold text-[#E8672A]"
                          : "bg-[#FBF3EA]/60 dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE]"
                      )}
                    >
                      <div className="shrink-0">{workingWithUsIcons[item.href]}</div>
                      <div className="truncate">{item.label}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Group 4: Insights */}
            <div className="pt-2 border-t border-[#EFE2D6] dark:border-[#2C241E]">
              <Link
                href="/insights"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-semibold text-[#3A2E27] dark:text-[#FAF5EE]"
              >
                Insights & Research
              </Link>
            </div>

            {/* Mobile Bottom Conversion CTA */}
            <div className="pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E]">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block w-full">
                <Button variant="primary" size="lg" className="w-full justify-center shadow-md">
                  Talk to an Expert <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

