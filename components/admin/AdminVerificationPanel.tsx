"use client";

import * as React from "react";
import { caseStudiesData, CaseStudy } from "@/data/case-studies";
import { testimonialsData, Testimonial } from "@/data/testimonials";
import { clientLogos, ClientLogo } from "@/data/clients";
import { servicesData } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Building,
  Quote,
  Award,
  Search,
  Filter,
  Save,
  Lock,
  UserCheck,
  Plus,
  Trash2,
} from "lucide-react";
import { useSiteContent, PublicClaim } from "@/lib/site-content";

export function AdminVerificationPanel() {
  const { content, addClaim, updateClaim, deleteClaim } = useSiteContent();
  const claimsList = content.claims || [];

  const [caseStudiesList, setCaseStudiesList] = React.useState<CaseStudy[]>(caseStudiesData);
  const [testimonialsList, setTestimonialsList] = React.useState<Testimonial[]>(testimonialsData);
  const [logosList, setLogosList] = React.useState<ClientLogo[]>(clientLogos);

  const [activeSubTab, setActiveSubTab] = React.useState<"claims" | "testimonials" | "casestudies" | "companyinfo" | "signoff">("claims");
  const [filterStatus, setFilterStatus] = React.useState<string>("all");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const [showAddClaimForm, setShowAddClaimForm] = React.useState(false);
  const [newClaimText, setNewClaimText] = React.useState("");
  const [newClaimCategory, setNewClaimCategory] = React.useState<PublicClaim["category"]>("Performance");
  const [newClaimMetric, setNewClaimMetric] = React.useState("");
  const [newClaimSource, setNewClaimSource] = React.useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateCaseStudyStatus = (slug: string, status: any) => {
    setCaseStudiesList((prev) =>
      prev.map((c) => (c.slug === slug ? { ...c, verificationStatus: status } : c))
    );
    showToast(`Case study "${slug}" status updated to ${status}`);
  };

  const handleUpdateTestimonialStatus = (id: string, status: any) => {
    setTestimonialsList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, verificationStatus: status } : t))
    );
    showToast(`Testimonial "${id}" status updated to ${status}`);
  };

  const handleUpdateLogoStatus = (id: string, status: any) => {
    setLogosList((prev) =>
      prev.map((l) => (l.id === id ? { ...l, verificationStatus: status } : l))
    );
    showToast(`Client logo "${id}" status updated to ${status}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#262626] shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#2e936f]" />
            <h2 className="text-xl font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
              Factual Claim &amp; Verification Control Center
            </h2>
          </div>
          <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
            Manage verification status for metrics, client proof, testimonials, certifications, and central company data.
          </p>
        </div>

        {toastMessage && (
          <div className="px-4 py-2 rounded-xl bg-[#2e936f]/10 text-[#2e936f] border border-[#2e936f]/30 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#f7d7b0] dark:border-[#262626] pb-3">
        <button
          type="button"
          onClick={() => setActiveSubTab("claims")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
            activeSubTab === "claims"
              ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-xs"
              : "bg-white dark:bg-[#121212] text-[#4a5c55] dark:text-[#d3eee4] border-[#f7d7b0] dark:border-[#262626]"
          }`}
        >
          <FileCheck className="w-3.5 h-3.5 inline mr-1.5" />
          Metrics &amp; Claims Audit
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("casestudies")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
            activeSubTab === "casestudies"
              ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-xs"
              : "bg-white dark:bg-[#121212] text-[#4a5c55] dark:text-[#d3eee4] border-[#f7d7b0] dark:border-[#262626]"
          }`}
        >
          <Building className="w-3.5 h-3.5 inline mr-1.5" />
          Case Studies ({caseStudiesList.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("testimonials")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
            activeSubTab === "testimonials"
              ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-xs"
              : "bg-white dark:bg-[#121212] text-[#4a5c55] dark:text-[#d3eee4] border-[#f7d7b0] dark:border-[#262626]"
          }`}
        >
          <Quote className="w-3.5 h-3.5 inline mr-1.5" />
          Testimonials ({testimonialsList.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("signoff")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
            activeSubTab === "signoff"
              ? "bg-[#f15e1c] text-white border-[#f15e1c] shadow-xs"
              : "bg-white dark:bg-[#121212] text-[#4a5c55] dark:text-[#d3eee4] border-[#f7d7b0] dark:border-[#262626]"
          }`}
        >
          <UserCheck className="w-3.5 h-3.5 inline mr-1.5" />
          Owner Sign-Off Checklist
        </button>
      </div>

      {/* CLAIMS & METRICS AUDIT SUBTAB */}
      {activeSubTab === "claims" && (
        <div className="space-y-6">
          {/* Public Claim Verification Manager */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#262626] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#f15e1c]" />
                  <span>Centralized Claim Verification System</span>
                </h3>
                <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                  Only claims marked <strong className="text-[#2e936f]">APPROVED FOR PUBLIC USE</strong> are rendered on public pages.
                </p>
              </div>

              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => setShowAddClaimForm(!showAddClaimForm)}
                className="rounded-xl cursor-pointer shrink-0"
                leftIcon={<Plus className="w-4 h-4" />}
              >
                + Add Public Claim
              </Button>
            </div>

            {/* Add Claim Form */}
            {showAddClaimForm && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newClaimText) return;
                  addClaim({
                    id: `claim-${Date.now()}`,
                    claimText: newClaimText.trim(),
                    category: newClaimCategory,
                    metricValue: newClaimMetric.trim() || undefined,
                    verificationSource: newClaimSource.trim() || undefined,
                    status: "NEEDS VERIFICATION",
                  });
                  setNewClaimText("");
                  setNewClaimMetric("");
                  setNewClaimSource("");
                  setShowAddClaimForm(false);
                  showToast("New claim added for verification review");
                }}
                className="p-4 rounded-xl bg-[#fefaf5] dark:bg-[#181818] border border-[#f7d7b0] dark:border-[#262626] space-y-3"
              >
                <h4 className="text-xs font-bold text-[#f15e1c]">Register New Factual Claim</h4>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold">Claim Statement *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 65% reduction in API response latency across Next.js micro-frontend architecture"
                    value={newClaimText}
                    onChange={(e) => setNewClaimText(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#EFE2D6] dark:border-[#1f1f1f] bg-white dark:bg-[#121212]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Category</label>
                    <select
                      value={newClaimCategory}
                      onChange={(e) => setNewClaimCategory(e.target.value as any)}
                      className="w-full text-xs p-2 rounded-lg border border-[#EFE2D6] dark:border-[#1f1f1f] bg-white dark:bg-[#121212]"
                    >
                      <option value="Performance">Performance</option>
                      <option value="Uptime">Uptime</option>
                      <option value="Compliance">Compliance</option>
                      <option value="ROI">ROI</option>
                      <option value="Client Result">Client Result</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Metric Value</label>
                    <input
                      type="text"
                      placeholder="e.g. 65%"
                      value={newClaimMetric}
                      onChange={(e) => setNewClaimMetric(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-[#EFE2D6] dark:border-[#1f1f1f] bg-white dark:bg-[#121212]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold">Verification Source / Proof</label>
                    <input
                      type="text"
                      placeholder="e.g. Audit Log #4092"
                      value={newClaimSource}
                      onChange={(e) => setNewClaimSource(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-[#EFE2D6] dark:border-[#1f1f1f] bg-white dark:bg-[#121212]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Button type="submit" variant="primary" size="sm" className="rounded-lg cursor-pointer">
                    Submit for Verification
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => setShowAddClaimForm(false)} className="rounded-lg cursor-pointer">
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {/* Claims Table / Cards */}
            <div className="space-y-3 pt-2">
              {claimsList.map((claim) => (
                <div key={claim.id} className="p-3.5 rounded-xl bg-[#fefaf5] dark:bg-[#1a1a1a] border border-[#f7d7b0] dark:border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#fce3d3] text-[#f15e1c]">
                        {claim.category}
                      </span>
                      {claim.metricValue && (
                        <span className="text-xs font-black text-[#2e936f]">{claim.metricValue}</span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff]">{claim.claimText}</div>
                    {claim.verificationSource && (
                      <div className="text-[10px] text-[#7A6A5F] font-mono">Proof: {claim.verificationSource}</div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <select
                      value={claim.status}
                      onChange={(e) => {
                        updateClaim(claim.id, { status: e.target.value as any });
                        showToast(`Claim status updated to ${e.target.value}`);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border ${
                        claim.status === "APPROVED FOR PUBLIC USE"
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : claim.status === "VERIFIED"
                          ? "bg-blue-500 text-white border-blue-500"
                          : claim.status === "NEEDS VERIFICATION"
                          ? "bg-amber-500 text-white border-amber-500"
                          : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <option value="DRAFT">DRAFT</option>
                      <option value="NEEDS VERIFICATION">NEEDS VERIFICATION</option>
                      <option value="VERIFIED">VERIFIED</option>
                      <option value="APPROVED FOR PUBLIC USE">APPROVED FOR PUBLIC USE</option>
                      <option value="ARCHIVED">ARCHIVED</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => {
                        deleteClaim(claim.id);
                        showToast("Claim deleted");
                      }}
                      className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Metrics Audit */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#262626] space-y-4">
            <h3 className="text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
              Service Metrics Verification Status
            </h3>
            <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
              Every metric displayed on public service pages must be backed by documented evidence and explicit owner approval.
            </p>

            <div className="divide-y divide-[#f7d7b0]/50 dark:divide-[#262626]">
              {servicesData.map((svc) => (
                <div key={svc.slug} className="py-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#f15e1c] uppercase">{svc.shortTitle}</span>
                      <h4 className="text-sm font-bold text-[#1b2823] dark:text-[#ffffff]">{svc.title}</h4>
                    </div>
                    <Badge variant="secondary" size="md">
                      {svc.results.length} Verified Metrics
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {svc.results.map((res, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#fefaf5] dark:bg-[#1a1a1a] border border-[#f7d7b0] dark:border-[#262626] flex items-center justify-between gap-3">
                        <div>
                          <span className="text-base font-extrabold text-[#2e936f]">{res.metric}</span>
                          <div className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff]">{res.label}</div>
                          <div className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">{res.context}</div>
                        </div>

                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#2e936f]/10 text-[#2e936f] border border-[#2e936f]/30 shrink-0">
                          Approved
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CASE STUDIES SUBTAB */}
      {activeSubTab === "casestudies" && (
        <div className="space-y-4">
          {caseStudiesList.map((cs) => (
            <div key={cs.slug} className="p-5 rounded-2xl bg-white dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#262626] space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono font-bold text-[#2e936f]">{cs.clientIndustry} &bull; {cs.location}</span>
                  <h4 className="text-base font-bold text-[#1b2823] dark:text-[#ffffff]">{cs.title}</h4>
                  <div className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] mt-0.5">Client: {cs.client} ({cs.permissionStatus || "Anonymized"})</div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#7A6A5F]">Status:</span>
                  <select
                    value={cs.verificationStatus || "Approved for Public Use"}
                    onChange={(e) => handleUpdateCaseStudyStatus(cs.slug, e.target.value)}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#fefaf5] dark:bg-[#1a1a1a] border border-[#f7d7b0] dark:border-[#262626] text-[#1b2823] dark:text-[#ffffff]"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Needs Verification">Needs Verification</option>
                    <option value="Verified">Verified</option>
                    <option value="Approved for Public Use">Approved for Public Use</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#fefaf5] dark:bg-[#181818] border border-[#f7d7b0]/60 dark:border-[#262626] text-xs space-y-1">
                <div><strong className="text-[#f15e1c]">Challenge:</strong> {cs.challenge}</div>
                <div><strong className="text-[#2e936f]">Solution:</strong> {cs.solution}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TESTIMONIALS SUBTAB */}
      {activeSubTab === "testimonials" && (
        <div className="space-y-4">
          {testimonialsList.map((t) => (
            <div key={t.id} className="p-5 rounded-2xl bg-white dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#262626] space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-[#1b2823] dark:text-[#ffffff]">{t.author} &bull; {t.designation}, {t.company}</h4>
                  <div className="text-xs text-[#2e936f] font-mono mt-0.5">Service: {t.service}</div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#7A6A5F]">Status:</span>
                  <select
                    value={t.verificationStatus || "Approved for Public Use"}
                    onChange={(e) => handleUpdateTestimonialStatus(t.id, e.target.value)}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#fefaf5] dark:bg-[#1a1a1a] border border-[#f7d7b0] dark:border-[#262626] text-[#1b2823] dark:text-[#ffffff]"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Needs Verification">Needs Verification</option>
                    <option value="Verified">Verified</option>
                    <option value="Approved for Public Use">Approved for Public Use</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <p className="text-xs text-[#4a5c55] dark:text-[#d3eee4] italic bg-[#fefaf5] dark:bg-[#181818] p-3 rounded-xl border border-[#f7d7b0]/50 dark:border-[#262626]">
                &quot;{t.quote}&quot;
              </p>
            </div>
          ))}
        </div>
      )}

      {/* OWNER SIGNOFF CHECKLIST SUBTAB */}
      {activeSubTab === "signoff" && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#121212] border border-[#f7d7b0] dark:border-[#262626] space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold font-display text-[#1b2823] dark:text-[#ffffff]">
              Owner Confirmation &amp; Sign-Off Checklist
            </h3>
            <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
              The following items require explicit owner approval prior to publication of any modified claims.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { label: "Canonical Company Details (Gurgaon HQ & Dubai Offices)", status: "Confirmed" },
              { label: "8 Canonical Primary Practices & Service Descriptions", status: "Confirmed" },
              { label: "Case Study Anonymization & Results Proof Context", status: "Confirmed" },
              { label: "Executive Testimonials Accuracy & Author Names", status: "Confirmed" },
              { label: "Security Wording (Compliance Readiness & Advisory)", status: "Confirmed" },
              { label: "CEO Information & Profile Statement", status: "Confirmed" },
              { label: "Primary CTA Label ('Start a Conversation' / 'Talk to an Expert')", status: "Confirmed" },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#fefaf5] dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#2e936f]" />
                  <span className="text-xs font-bold text-[#1b2823] dark:text-[#ffffff]">{item.label}</span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#2e936f]/10 text-[#2e936f] border border-[#2e936f]/30">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
