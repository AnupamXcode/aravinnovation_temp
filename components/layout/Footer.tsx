import * as React from "react";
import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { servicesNavigation, companyContactInfo } from "@/data/navigation";
import {
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  Globe2,
} from "lucide-react";

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

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#FBF3EA] border-t border-[#EFE2D6] pt-16 pb-12 text-[#3A2E27]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#EFE2D6]">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="footer" />
            <p className="text-sm text-[#7A6A5F] max-w-sm leading-relaxed">
              Arav Innovations is a multidisciplinary technology, strategy, digital growth, governance, and staff augmentation firm partnering with ambitious enterprises across India, the UAE, and global markets.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={companyContactInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FFFDF9] border border-[#EFE2D6] flex items-center justify-center text-[#7A6A5F] hover:text-[#E8672A] hover:border-[#E8672A] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href={companyContactInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FFFDF9] border border-[#EFE2D6] flex items-center justify-center text-[#7A6A5F] hover:text-[#E8672A] hover:border-[#E8672A] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={companyContactInfo.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FFFDF9] border border-[#EFE2D6] flex items-center justify-center text-[#7A6A5F] hover:text-[#E8672A] hover:border-[#E8672A] transition-colors"
                aria-label="Twitter / X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FCE3D3]/60 border border-[#F4A97F]/30 text-xs font-semibold text-[#3A2E27]">
              <Globe2 className="w-3.5 h-3.5 text-[#E8672A]" />
              <span>Operating Across India & United Arab Emirates</span>
            </div>
          </div>

          {/* Col 2: 7 Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3A2E27] mb-4">
              Our 7 Practices
            </h4>
            <ul className="space-y-2.5 text-sm">
              {servicesNavigation.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-[#7A6A5F] hover:text-[#E8672A] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{service.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company & Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3A2E27] mb-4">
              Company & Insights
            </h4>
            <ul className="space-y-2.5 text-sm text-[#7A6A5F]">
              <li>
                <Link href="/about" className="hover:text-[#E8672A] transition-colors">
                  About Us
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

          {/* Col 4: Dual Regional Locations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3A2E27] mb-4">
              Regional Operations
            </h4>
            <div className="space-y-4 text-xs text-[#7A6A5F]">
              <div className="p-3 rounded-xl bg-[#FFFDF9] border border-[#EFE2D6]">
                <div className="font-semibold text-[#3A2E27] flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E8672A]" />
                  <span>India Headquarters</span>
                </div>
                <p className="text-[11px] text-[#7A6A5F]">{companyContactInfo.offices[0].address}</p>
                <div className="mt-1 font-medium text-[#3A2E27]">
                  Tel: {companyContactInfo.phoneIndia}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FFFDF9] border border-[#EFE2D6]">
                <div className="font-semibold text-[#3A2E27] flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E8672A]" />
                  <span>UAE & Middle East</span>
                </div>
                <p className="text-[11px] text-[#7A6A5F]">{companyContactInfo.offices[1].address}</p>
                <div className="mt-1 font-medium text-[#3A2E27]">
                  Tel: {companyContactInfo.phoneUAE}
                </div>
              </div>

              <div className="space-y-1 pt-1">
                <a
                  href={`mailto:${companyContactInfo.email}`}
                  className="flex items-center gap-1.5 text-xs text-[#3A2E27] hover:text-[#E8672A] font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-[#E8672A]" />
                  <span>{companyContactInfo.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6A5F]">
          <p>© {new Date().getFullYear()} Arav Innovations. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/contact" className="hover:text-[#E8672A]">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-[#E8672A]">
              Terms of Engagement
            </Link>
            <Link href="/contact" className="hover:text-[#E8672A]">
              Security & DPDP
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
