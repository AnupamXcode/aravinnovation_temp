"use client";

import * as React from "react";
import { FormSubmission } from "@/lib/submissions";
import {
  MessageSquare,
  RefreshCw,
  Search,
  Filter,
  Building2,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  Tag,
  Clock,
  CheckCircle2,
  Eye,
  Trash2,
  X,
  Sparkles,
  Bot,
  User,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatbotInquiriesAdminPanelProps {
  showToast: (msg: string) => void;
}

export function ChatbotInquiriesAdminPanel({ showToast }: ChatbotInquiriesAdminPanelProps) {
  const [inquiries, setInquiries] = React.useState<FormSubmission[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [serviceFilter, setServiceFilter] = React.useState<string>("all");
  const [industryFilter, setIndustryFilter] = React.useState<string>("all");
  const [dateFilter, setDateFilter] = React.useState<string>("all");
  const [searchTerm, setSearchTerm] = React.useState("");

  // Modal detail view state
  const [selectedInquiry, setSelectedInquiry] = React.useState<FormSubmission | null>(null);

  const fetchInquiries = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/submissions");
      if (res.ok) {
        const data: FormSubmission[] = await res.json();
        // Filter specifically for source === 'chatbot'
        const chatbotOnly = data.filter((s) => s.source === "chatbot");
        setInquiries(chatbotOnly);
      } else {
        showToast("Failed to load chatbot inquiries");
      }
    } catch {
      showToast("Error connecting to submissions API");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  React.useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleStatusChange = async (id: string, newStatus: FormSubmission["status"]) => {
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        showToast(`Chatbot inquiry status updated to ${newStatus}`);
      } else {
        showToast("Failed to update status");
      }
    } catch {
      showToast("Network error updating status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this chatbot inquiry?")) return;

    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setInquiries((prev) => prev.filter((s) => s.id !== id));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
        showToast("Inquiry deleted");
      } else {
        showToast("Failed to delete inquiry");
      }
    } catch {
      showToast("Network error deleting inquiry");
    }
  };

  // Derive unique lists of services & industries for dropdown filters
  const uniqueServices = Array.from(new Set(inquiries.map((i) => i.service).filter(Boolean)));
  const uniqueIndustries = Array.from(new Set(inquiries.map((i) => i.industry).filter(Boolean)));

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    const matchesService = serviceFilter === "all" || inq.service === serviceFilter;
    const matchesIndustry = industryFilter === "all" || inq.industry === industryFilter;

    let matchesDate = true;
    if (dateFilter !== "all") {
      const submittedTime = new Date(inq.submittedAt).getTime();
      const now = Date.now();
      if (dateFilter === "today") {
        matchesDate = now - submittedTime <= 86400000;
      } else if (dateFilter === "7days") {
        matchesDate = now - submittedTime <= 86400000 * 7;
      } else if (dateFilter === "30days") {
        matchesDate = now - submittedTime <= 86400000 * 30;
      }
    }

    const matchesSearch =
      !searchTerm ||
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.industry && inq.industry.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inq.originalQuery && inq.originalQuery.toLowerCase().includes(searchTerm.toLowerCase())) ||
      inq.requirement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.id.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesService && matchesIndustry && matchesDate && matchesSearch;
  });

  const totalCount = inquiries.length;
  const newCount = inquiries.filter((s) => s.status === "new").length;
  const contactedCount = inquiries.filter((s) => s.status === "contacted").length;
  const convertedCount = inquiries.filter((s) => s.status === "converted" || s.status === "qualified").length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#FCE3D3] dark:bg-[#2C221B] text-[#f15e1c]">
              <MessageSquare className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
              Chatbot Inquiries (AI Assistant Pipeline)
            </h2>
          </div>
          <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] pl-10">
            Dedicated repository of qualified leads and technical queries submitted explicitly through the AI Chatbot
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchInquiries}
          isLoading={loading}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          className="rounded-xl shrink-0 cursor-pointer border-[#EFE2D6] dark:border-[#1f1f1f]"
        >
          Refresh Inquiries
        </Button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">Total Chatbot Inquiries</span>
            <Bot className="w-4 h-4 text-[#f15e1c]" />
          </div>
          <p className="text-3xl font-extrabold font-display text-[#f15e1c]">{totalCount}</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">New Inquiries</span>
            <Clock className="w-4 h-4 text-[#2e936f]" />
          </div>
          <p className="text-3xl font-extrabold font-display text-[#2e936f]">{newCount}</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">Contacted</span>
            <Phone className="w-4 h-4 text-[#fab60a]" />
          </div>
          <p className="text-3xl font-extrabold font-display text-[#fab60a]">{contactedCount}</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">Converted / Qualified</span>
            <TrendingUp className="w-4 h-4 text-[#2e936f]" />
          </div>
          <p className="text-3xl font-extrabold font-display text-[#2e936f]">{convertedCount}</p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-[#7A6A5F] dark:text-[#B8ACA0]">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] font-bold cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="new">🆕 New</option>
              <option value="contacted">📞 Contacted</option>
              <option value="in_progress">⏳ In Progress</option>
              <option value="converted">⭐ Converted</option>
              <option value="closed">📁 Closed</option>
            </select>
          </div>

          {/* Service Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-[#7A6A5F] dark:text-[#B8ACA0]">Service</label>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] font-bold cursor-pointer"
            >
              <option value="all">All Services</option>
              {uniqueServices.map((svc) => (
                <option key={svc} value={svc}>{svc}</option>
              ))}
            </select>
          </div>

          {/* Industry Filter */}
          {uniqueIndustries.length > 0 && (
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold uppercase text-[#7A6A5F] dark:text-[#B8ACA0]">Industry</label>
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] font-bold cursor-pointer"
              >
                <option value="all">All Industries</option>
                {uniqueIndustries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
          )}

          {/* Date Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-[#7A6A5F] dark:text-[#B8ACA0]">Submitted Date</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="text-xs p-2 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] font-bold cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="today">Last 24 Hours</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>
          </div>

          {/* Search Box */}
          <div className="flex-1 min-w-[200px] space-y-1">
            <label className="text-[10px] font-mono font-bold uppercase text-[#7A6A5F] dark:text-[#B8ACA0]">Search Keyword</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#7A6A5F] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name, query, email, company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl text-xs bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] focus:border-[#f15e1c] w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Table View */}
      <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-4">
        {loading ? (
          <div className="py-12 text-center text-xs text-[#7A6A5F] space-y-2">
            <div className="w-6 h-6 border-2 border-[#f15e1c] border-t-transparent rounded-full animate-spin mx-auto" />
            <p>Loading chatbot inquiries...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#7A6A5F] space-y-2">
            <AlertCircle className="w-8 h-8 text-[#f15e1c]/50 mx-auto" />
            <p className="font-semibold text-sm text-[#3A2E27] dark:text-[#FAF5EE]">No chatbot inquiries match the selected criteria</p>
            <p>Submissions from the website AI chatbot will automatically populate here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#EFE2D6] dark:border-[#1f1f1f] text-[#7A6A5F] dark:text-[#B8ACA0] uppercase text-[10px] font-mono">
                  <th className="py-3 px-4 font-bold">Ref ID / Submitted</th>
                  <th className="py-3 px-4 font-bold">Visitor Contact</th>
                  <th className="py-3 px-4 font-bold">Company / Industry</th>
                  <th className="py-3 px-4 font-bold">Service &amp; User Requirement</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE2D6]/60 dark:divide-[#1f1f1f]">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-[#FBF3EA]/60 dark:hover:bg-[#1A1613]/60 transition-colors">
                    <td className="py-4 px-4 align-top space-y-1">
                      <span className="font-mono font-extrabold text-[#f15e1c] text-[11px] block">{inq.id}</span>
                      <span className="text-[10px] text-[#7A6A5F] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(inq.submittedAt).toLocaleDateString()} {new Date(inq.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#f15e1c]/10 text-[#f15e1c]">
                        Src: Chatbot
                      </span>
                    </td>

                    <td className="py-4 px-4 align-top space-y-1">
                      <p className="font-bold text-[#3A2E27] dark:text-[#FAF5EE] text-sm">{inq.name}</p>
                      <p className="text-[11px] text-[#7A6A5F] flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[#2e936f]" />
                        <a href={`mailto:${inq.email}`} className="hover:underline text-[#2e936f]">{inq.email || "N/A"}</a>
                      </p>
                      <p className="text-[11px] text-[#7A6A5F] flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <a href={`tel:${inq.phone.replace(/\s+/g, '')}`} className="hover:underline">{inq.phone}</a>
                      </p>
                    </td>

                    <td className="py-4 px-4 align-top space-y-1">
                      <p className="font-semibold text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#f15e1c]" />
                        <span>{inq.company}</span>
                      </p>
                      {inq.industry && (
                        <p className="text-[10px] text-[#7A6A5F] font-mono">
                          Industry: {inq.industry}
                        </p>
                      )}
                      {inq.budget && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[#FCE3D3] text-[#f15e1c] font-bold">
                          Budget: {inq.budget}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 align-top space-y-1.5 max-w-sm">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#2e936f]/10 text-[#2e936f] border border-[#2e936f]/20">
                        <Tag className="w-3 h-3" />
                        {inq.service}
                      </span>
                      {/* Preserved Original User Query */}
                      <div className="bg-[#FBF3EA] dark:bg-[#1A1613] p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] space-y-1">
                        <span className="text-[9px] font-mono font-bold uppercase text-[#f15e1c] block">
                          Original User Query:
                        </span>
                        <p className="text-[11px] text-[#3A2E27] dark:text-[#FAF5EE] line-clamp-3 leading-relaxed">
                          "{inq.originalQuery || inq.requirement}"
                        </p>
                      </div>
                    </td>

                    <td className="py-4 px-4 align-top">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value as FormSubmission["status"])}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer bg-white dark:bg-[#1A1613] ${
                          inq.status === "new"
                            ? "border-[#2e936f] text-[#2e936f]"
                            : inq.status === "contacted"
                            ? "border-[#fab60a] text-[#fab60a]"
                            : inq.status === "in_progress"
                            ? "border-[#f15e1c] text-[#f15e1c]"
                            : inq.status === "converted" || inq.status === "qualified"
                            ? "border-[#2e936f] text-[#2e936f] bg-[#2e936f]/10"
                            : "border-gray-400 text-gray-500"
                        }`}
                      >
                        <option value="new">🆕 New</option>
                        <option value="contacted">📞 Contacted</option>
                        <option value="in_progress">⏳ In Progress</option>
                        <option value="converted">⭐ Converted</option>
                        <option value="closed">📁 Closed</option>
                      </select>
                    </td>

                    <td className="py-4 px-4 align-top text-right space-x-1">
                      <button
                        type="button"
                        onClick={() => setSelectedInquiry(inq)}
                        className="p-2 rounded-xl bg-[#FCE3D3]/60 dark:bg-[#2C221B] text-[#f15e1c] hover:bg-[#f15e1c] hover:text-white transition-colors cursor-pointer"
                        title="View Full Detail Modal"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(inq.id)}
                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* DETAIL MODAL OVERLAY */}
      {/* ========================================================================= */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-[#3A2E27]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FFFDF9] dark:bg-[#161310] border-2 border-[#f15e1c] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#EFE2D6] dark:border-[#1f1f1f] pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#f15e1c]/10 text-[#f15e1c] border border-[#f15e1c]/20">
                  Ref: {selectedInquiry.id} &bull; Source: Chatbot
                </span>
                <h3 className="text-xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                  Chatbot Inquiry Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="p-2 rounded-xl text-[#7A6A5F] hover:bg-[#FBF3EA] dark:hover:bg-[#1A1613] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid 1: Contact & Business Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contact Information */}
              <div className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase text-[#f15e1c]">
                  CONTACT INFORMATION
                </h4>
                <div className="space-y-1 text-xs">
                  <p><strong className="text-[#7A6A5F]">Full Name:</strong> {selectedInquiry.name}</p>
                  <p><strong className="text-[#7A6A5F]">Company:</strong> {selectedInquiry.company}</p>
                  <p><strong className="text-[#7A6A5F]">Work Email:</strong> <a href={`mailto:${selectedInquiry.email}`} className="text-[#2e936f] underline">{selectedInquiry.email || "N/A"}</a></p>
                  <p><strong className="text-[#7A6A5F]">Phone:</strong> <a href={`tel:${selectedInquiry.phone}`} className="underline">{selectedInquiry.phone}</a></p>
                </div>
              </div>

              {/* Business Information */}
              <div className="p-4 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase text-[#2e936f]">
                  BUSINESS INFORMATION
                </h4>
                <div className="space-y-1 text-xs">
                  <p><strong className="text-[#7A6A5F]">Service / Area:</strong> {selectedInquiry.service}</p>
                  <p><strong className="text-[#7A6A5F]">Industry:</strong> {selectedInquiry.industry || "N/A"}</p>
                  <p><strong className="text-[#7A6A5F]">Timeline:</strong> {selectedInquiry.timeline}</p>
                  <p><strong className="text-[#7A6A5F]">Budget:</strong> {selectedInquiry.budget || "Not specified"}</p>
                  <p><strong className="text-[#7A6A5F]">Submitted Date:</strong> {new Date(selectedInquiry.submittedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Section 2: Original User Query */}
            <div className="p-5 rounded-2xl bg-[#FCE3D3]/40 dark:bg-[#2C221B]/40 border border-[#f15e1c]/30 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase text-[#f15e1c] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>VISITOR'S ORIGINAL QUERY / REQUIREMENT</span>
              </h4>
              <p className="text-sm font-medium text-[#3A2E27] dark:text-[#FAF5EE] whitespace-pre-line leading-relaxed bg-white dark:bg-[#100D0B] p-4 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f]">
                {selectedInquiry.originalQuery || selectedInquiry.requirement}
              </p>
            </div>

            {/* Section 3: Conversation Context Transcript */}
            {selectedInquiry.conversationContext && selectedInquiry.conversationContext.length > 0 && (
              <div className="p-5 rounded-2xl bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase text-[#7A6A5F] dark:text-[#B8ACA0] flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-[#2e936f]" />
                  <span>CONVERSATION TRANSCRIPT CONTEXT</span>
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedInquiry.conversationContext.map((msg, mIdx) => (
                    <div
                      key={mIdx}
                      className={`p-3 rounded-xl text-xs ${
                        msg.sender === "user"
                          ? "bg-[#f15e1c] text-white ml-6 font-medium"
                          : "bg-white dark:bg-[#000000] border border-[#EFE2D6] dark:border-[#1f1f1f] text-[#3A2E27] dark:text-[#FAF5EE] mr-6"
                      }`}
                    >
                      <span className="text-[10px] font-mono uppercase font-bold block opacity-70 mb-0.5">
                        {msg.sender === "user" ? "User Visitor" : "Arav AI Assistant"}
                      </span>
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status Update & Footer Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#EFE2D6] dark:border-[#1f1f1f]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold">Update Lead Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as FormSubmission["status"])}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold border border-[#f15e1c] bg-white dark:bg-[#1A1613] text-[#f15e1c] cursor-pointer"
                >
                  <option value="new">🆕 New</option>
                  <option value="contacted">📞 Contacted</option>
                  <option value="in_progress">⏳ In Progress</option>
                  <option value="converted">⭐ Converted</option>
                  <option value="closed">📁 Closed</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedInquiry.id)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 border border-rose-500/30 hover:bg-rose-500/10 cursor-pointer"
                >
                  Delete Inquiry
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-[#f15e1c] text-white hover:bg-[#d4581f] cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
