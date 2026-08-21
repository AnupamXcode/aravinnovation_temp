"use client";

import * as React from "react";
import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { servicesNavigation, companyContactInfo } from "@/data/navigation";
import {
  MapPin,
  Mail,
  Phone,
  Globe2,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.285-.143-1.689-.834-1.951-.929-.262-.095-.453-.143-.643.143-.19.286-.737.929-.904 1.119-.167.19-.333.214-.618.071-.285-.143-1.207-.445-2.299-1.419-.85-.758-1.424-1.694-1.591-1.98-.167-.286-.018-.44.125-.582.129-.128.285-.333.428-.5.143-.167.19-.286.285-.476.095-.19.048-.357-.024-.5-.071-.143-.643-1.547-.88-2.118-.231-.557-.465-.482-.643-.491l-.547-.01c-.19 0-.5.071-.761.357-.262.286-1.001.977-1.001 2.38 0 1.404 1.023 2.76 1.166 2.951.143.19 2.013 3.074 4.877 4.311.681.294 1.213.47 1.627.601.684.217 1.307.186 1.8.113.55-.082 1.689-.69 1.927-1.357.238-.667.238-1.238.167-1.357-.07-.119-.262-.19-.547-.333z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#FBF3EA] dark:bg-[#12100E] border-t-2 border-[#E8672A]/30 pt-16 pb-12 text-[#3A2E27] dark:text-[#FAF5EE] transition-colors duration-300 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FCE3D3]/40 dark:bg-[#E8672A]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#EFE2D6] dark:border-[#2C241E]">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-5">
            <BrandLogo variant="footer" />
            <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] max-w-sm leading-relaxed">
              Arav Innovations is a multidisciplinary technology, strategy, digital growth, governance, and staff augmentation firm partnering with ambitious enterprises globally.
            </p>

            {/* 6 Social Icons Row (C2) */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0] block">
                Connect With Us
              </span>
              <div className="flex items-center space-x-2.5 flex-wrap gap-y-2">
                {/* Instagram */}
                <a
                  href={companyContactInfo.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#3D332B] flex items-center justify-center text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#E8672A] dark:hover:text-[#E8672A] hover:border-[#E8672A] dark:hover:border-[#E8672A] hover:scale-105 transition-all shadow-2xs"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>

                {/* Facebook */}
                <a
                  href={companyContactInfo.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#3D332B] flex items-center justify-center text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#E8672A] dark:hover:text-[#E8672A] hover:border-[#E8672A] dark:hover:border-[#E8672A] hover:scale-105 transition-all shadow-2xs"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>

                {/* LinkedIn - Icon displayed, non-clickable per Task C2 spec */}
                <span
                  className="w-9 h-9 rounded-full bg-white/60 dark:bg-[#1A1613]/60 border border-[#EFE2D6] dark:border-[#3D332B] flex items-center justify-center text-[#7A6A5F]/60 dark:text-[#B8ACA0]/60 cursor-not-allowed shadow-2xs"
                  title="LinkedIn page coming soon"
                  aria-label="LinkedIn (Coming Soon)"
                  aria-disabled="true"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </span>

                {/* WhatsApp */}
                <a
                  href={companyContactInfo.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#3D332B] flex items-center justify-center text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#E8672A] dark:hover:text-[#E8672A] hover:border-[#E8672A] dark:hover:border-[#E8672A] hover:scale-105 transition-all shadow-2xs"
                  aria-label="WhatsApp Direct Chat"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>

                {/* X / Twitter */}
                <a
                  href={companyContactInfo.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#3D332B] flex items-center justify-center text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#E8672A] dark:hover:text-[#E8672A] hover:border-[#E8672A] dark:hover:border-[#E8672A] hover:scale-105 transition-all shadow-2xs"
                  aria-label="Twitter / X"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>

                {/* YouTube */}
                <a
                  href={companyContactInfo.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#3D332B] flex items-center justify-center text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#E8672A] dark:hover:text-[#E8672A] hover:border-[#E8672A] dark:hover:border-[#E8672A] hover:scale-105 transition-all shadow-2xs"
                  aria-label="YouTube Channel"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Book a Call + Contact Us side by side buttons (C3) */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${companyContactInfo.phoneIndiaRaw}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E8672A] hover:bg-[#d4581f] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Book a Call</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-[#1A1613] hover:bg-[#FCE3D3]/50 dark:hover:bg-[#261F1A] border border-[#EFE2D6] dark:border-[#3D332B] text-[#3A2E27] dark:text-[#FAF5EE] text-xs font-bold transition-all duration-200"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E8672A]" />
              </Link>
            </div>

            <div className="pt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FCE3D3]/60 dark:bg-[#261F1A] border border-[#F4A97F]/30 dark:border-[#3D332B] text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE]">
              <Globe2 className="w-3.5 h-3.5 text-[#E8672A]" />
              <span>Operating Globally</span>
            </div>
          </div>

          {/* Col 2: 7 Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE] mb-4">
              Our 7 Practices
            </h4>
            <ul className="space-y-2.5 text-sm">
              {servicesNavigation.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#E8672A] dark:hover:text-[#E8672A] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{service.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company & Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE] mb-4">
              Company & Insights
            </h4>
            <ul className="space-y-2.5 text-sm text-[#7A6A5F] dark:text-[#B8ACA0]">
              <li>
                <Link href="/about" className="hover:text-[#E8672A] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#E8672A] transition-colors">
                  Products & Platforms
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-[#E8672A] transition-colors">
                  Case Studies & Proof
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-[#E8672A] transition-colors">
                  Industry Solutions
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-[#E8672A] transition-colors">
                  Clients & Testimonials
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-[#E8672A] transition-colors">
                  Insights & Strategy
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#E8672A] transition-colors">
                  Careers at Arav
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E8672A] transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Dual Regional Locations (C1 Real Contact Info & Hover Cards) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE] mb-4">
              Regional Operations
            </h4>
            <div className="space-y-4 text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
              {/* India Office Card */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] hover:border-[#E8672A]/40 dark:hover:border-[#E8672A]/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 group">
                <div className="font-bold text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-1.5 mb-1.5 group-hover:text-[#E8672A] transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-[#E8672A] shrink-0" />
                  <span>India Headquarters</span>
                </div>
                <p className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                  {companyContactInfo.offices[0].address}
                </p>
                <div className="mt-2 pt-2 border-t border-[#EFE2D6]/60 dark:border-[#2C241E]/60">
                  <a
                    href={`tel:${companyContactInfo.phoneIndiaRaw}`}
                    className="inline-flex items-center gap-1.5 font-bold text-[#3A2E27] dark:text-[#FAF5EE] hover:text-[#E8672A] transition-colors"
                  >
                    <Phone className="w-3 h-3 text-[#E8672A]" />
                    <span>{companyContactInfo.phoneIndia}</span>
                  </a>
                </div>
              </div>

              {/* UAE Office Card */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] hover:border-[#E8672A]/40 dark:hover:border-[#E8672A]/40 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 group">
                <div className="font-bold text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-1.5 mb-1.5 group-hover:text-[#E8672A] transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-[#E8672A] shrink-0" />
                  <span>UAE & Middle East</span>
                </div>
                <p className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                  {companyContactInfo.offices[1].address}
                </p>
                <div className="mt-2 pt-2 border-t border-[#EFE2D6]/60 dark:border-[#2C241E]/60">
                  <a
                    href={`tel:${companyContactInfo.phoneUAERaw}`}
                    className="inline-flex items-center gap-1.5 font-bold text-[#3A2E27] dark:text-[#FAF5EE] hover:text-[#E8672A] transition-colors"
                  >
                    <Phone className="w-3 h-3 text-[#E8672A]" />
                    <span>{companyContactInfo.phoneUAE}</span>
                  </a>
                </div>
              </div>

              {/* Email Addresses */}
              <div className="space-y-1.5 pt-2">
                <a
                  href={`mailto:${companyContactInfo.email}`}
                  className="flex items-center gap-2 text-xs text-[#3A2E27] dark:text-[#FAF5EE] hover:text-[#E8672A] font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E8672A] shrink-0" />
                  <span>{companyContactInfo.email}</span>
                </a>
                <a
                  href={`mailto:${companyContactInfo.connectEmail}`}
                  className="flex items-center gap-2 text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0] hover:text-[#E8672A] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#7A6A5F] shrink-0" />
                  <span>{companyContactInfo.connectEmail}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Legal Links (C4) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
          <p>© {new Date().getFullYear()} Arav Innovations. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-[#E8672A] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/refund-policy" className="hover:text-[#E8672A] transition-colors">
              Refund Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-[#E8672A] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/security-dpdp" className="hover:text-[#E8672A] transition-colors">
              Security & DPDP
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
