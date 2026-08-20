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

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {/* What We Do Dropdown */}
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

            {/* Working With Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("working-with-us")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={cn(
                  "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer",
                  isActive("/testimonials") || isActive("/solutions") || isActive("/careers")
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
                <div className="absolute top-full left-0 w-[360px] pt-2">
                  <div className="rounded-3xl bg-[#FFFDF9] dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] p-3 shadow-2xl space-y-1">
                    {workingWithUsNavigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className={cn(
                          "block p-3 rounded-2xl transition-all hover:bg-[#FBF3EA] dark:hover:bg-[#221D18] group",
                          pathname === item.href && "bg-[#FCE3D3]/40 dark:bg-[#2C221B]"
                        )}
                      >
                        <div className="text-sm font-semibold text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#E8672A] dark:group-hover:text-[#E8672A] transition-colors">
                          {item.label}
                        </div>
                        <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] mt-0.5 line-clamp-1">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Links */}
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

            <Link
              href="/case-studies"
              className={cn(
                "px-3.5 py-2 rounded-xl text-sm font-medium transition-colors",
                isActive("/case-studies")
                  ? "text-[#E8672A] font-semibold"
                  : "text-[#3A2E27] dark:text-[#FAF5EE] hover:text-[#E8672A] dark:hover:text-[#E8672A] hover:bg-[#FCE3D3]/40 dark:hover:bg-[#261F1A]"
              )}
            >
              Case Studies
            </Link>

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

            <Link
              href="/careers"
              className={cn(
                "px-3.5 py-2 rounded-xl text-sm font-medium transition-colors",
                isActive("/careers")
                  ? "text-[#E8672A] font-semibold"
                  : "text-[#3A2E27] dark:text-[#FAF5EE] hover:text-[#E8672A] dark:hover:text-[#E8672A] hover:bg-[#FCE3D3]/40 dark:hover:bg-[#261F1A]"
              )}
            >
              Careers
            </Link>

            <Link
              href="/about"
              className={cn(
                "px-3.5 py-2 rounded-xl text-sm font-medium transition-colors",
                isActive("/about")
                  ? "text-[#E8672A] font-semibold"
                  : "text-[#3A2E27] dark:text-[#FAF5EE] hover:text-[#E8672A] dark:hover:text-[#E8672A] hover:bg-[#FCE3D3]/40 dark:hover:bg-[#261F1A]"
              )}
            >
              About
            </Link>
          </nav>

          {/* Right CTAs + Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />

            <Link href="/contact">
              <Button
                variant="primary"
                size="sm"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => {
                  trackEvent({
                    type: "cta_click",
                    label: "Contact Us (Navbar)",
                    location: "navbar",
                    targetUrl: "/contact",
                  });
                }}
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile Actions (Theme Toggle + Menu) */}
          <div className="flex lg:hidden items-center gap-2">
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
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0] mb-3">
                Services (7 Core Practices)
              </div>
              <div className="grid grid-cols-1 gap-2">
                {servicesNavigation.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#FBF3EA]/60 dark:bg-[#1A1613] hover:bg-[#FCE3D3]/50 dark:hover:bg-[#261F1A] text-sm font-semibold text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#2C241E]"
                  >
                    <div className="shrink-0">{serviceIcons[s.href]}</div>
                    <span className="truncate">{s.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0] mb-3">
                Working With Us
              </div>
              <div className="grid grid-cols-1 gap-2">
                {workingWithUsNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="p-2.5 rounded-xl bg-[#FBF3EA]/60 dark:bg-[#1A1613] text-sm font-medium text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#2C241E]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#EFE2D6] dark:border-[#2C241E] space-y-2">
              <Link
                href="/products"
                className="block py-2 text-base font-semibold text-[#3A2E27] dark:text-[#FAF5EE]"
              >
                Products & Platforms
              </Link>
              <Link
                href="/case-studies"
                className="block py-2 text-base font-semibold text-[#3A2E27] dark:text-[#FAF5EE]"
              >
                Case Studies
              </Link>
              <Link
                href="/insights"
                className="block py-2 text-base font-semibold text-[#3A2E27] dark:text-[#FAF5EE]"
              >
                Insights & Research
              </Link>
              <Link
                href="/about"
                className="block py-2 text-base font-semibold text-[#3A2E27] dark:text-[#FAF5EE]"
              >
                About Arav Innovations
              </Link>
              <Link
                href="/careers"
                className="block py-2 text-base font-semibold text-[#3A2E27] dark:text-[#FAF5EE]"
              >
                Careers
              </Link>
            </div>

            <div className="pt-4">
              <Link href="/contact" className="block w-full">
                <Button variant="primary" size="lg" className="w-full justify-center">
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
