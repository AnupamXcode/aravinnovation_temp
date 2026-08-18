import * as React from "react";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { companyContactInfo } from "@/data/navigation";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  Globe2,
  CheckCircle,
} from "lucide-react";

export const metadata = {
  title: "Contact Us & Regional Offices | Arav Innovations",
  description:
    "Get in touch with Arav Innovations' leadership and practice directors in India and UAE to discuss your technology, growth, or staffing requirements.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Breadcrumb items={[{ label: "Contact Us" }]} />
          <Badge variant="secondary" size="md">
            Direct Consultation
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display text-[#3A2E27] tracking-tight">
            Let’s Discuss Your Enterprise Technology & Growth Goals
          </h1>
          <p className="text-lg text-[#7A6A5F] leading-relaxed">
            Our practice leads and solutions architects in India and UAE are available for confidential discovery discussions, technical audits, and engagement scoping.
          </p>
        </div>

        {/* Main Grid: Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <LeadForm source="contact_page" />
          </div>

          {/* Right Column: Office Hubs & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-[#FBF3EA] border border-[#EFE2D6] space-y-6">
              <h3 className="text-xl font-bold font-display text-[#3A2E27]">
                Regional Hubs & Addresses
              </h3>

              {/* India HQ */}
              <div className="p-5 rounded-2xl bg-white border border-[#EFE2D6] space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-[#3A2E27]">
                  <MapPin className="w-4 h-4 text-[#E8672A]" />
                  <span>India Headquarters</span>
                </div>
                <p className="text-xs text-[#7A6A5F] leading-relaxed">
                  {companyContactInfo.offices[0].address}
                </p>
                <div className="text-xs font-semibold text-[#3A2E27] pt-1">
                  Phone: {companyContactInfo.phoneIndia}
                </div>
              </div>

              {/* UAE Hub */}
              <div className="p-5 rounded-2xl bg-white border border-[#EFE2D6] space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-[#3A2E27]">
                  <MapPin className="w-4 h-4 text-[#E8672A]" />
                  <span>UAE & Middle East Hub</span>
                </div>
                <p className="text-xs text-[#7A6A5F] leading-relaxed">
                  {companyContactInfo.offices[1].address}
                </p>
                <div className="text-xs font-semibold text-[#3A2E27] pt-1">
                  Phone: {companyContactInfo.phoneUAE}
                </div>
              </div>

              {/* Direct Emails */}
              <div className="pt-2 space-y-2.5 text-xs text-[#7A6A5F] border-t border-[#EFE2D6]">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#E8672A]" />
                  <span className="font-semibold text-[#3A2E27]">General Inquiries:</span>
                  <a href={`mailto:${companyContactInfo.email}`} className="text-[#E8672A] hover:underline">
                    {companyContactInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#E8672A]" />
                  <span className="font-semibold text-[#3A2E27]">Sales & New Business:</span>
                  <a href={`mailto:${companyContactInfo.salesEmail}`} className="text-[#E8672A] hover:underline">
                    {companyContactInfo.salesEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Response Guarantee Box */}
            <div className="p-6 rounded-3xl bg-white border border-[#EFE2D6] shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E8672A]">
                <Clock className="w-4 h-4" />
                <span>Response SLA</span>
              </div>
              <p className="text-xs text-[#7A6A5F] leading-relaxed">
                All inquiries submitted during standard business hours (IST / GST) receive an executive acknowledgment and preliminary review within 4 business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
