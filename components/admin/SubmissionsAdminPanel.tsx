"use client";

import * as React from "react";
import { FormSubmission } from "@/lib/submissions";
import {
  PhoneCall,
  Inbox,
  CheckCircle2,
  Clock,
  Trash2,
  Filter,
  RefreshCw,
  Search,
  Building2,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubmissionsAdminPanelProps {
  showToast: (msg: string) => void;
  footerForm: any;
  setFooterForm: (form: any) => void;
  updateFooter: (form: any) => void;
}

export function SubmissionsAdminPanel({
  showToast,
  footerForm,
  setFooterForm,
  updateFooter,
}: SubmissionsAdminPanelProps) {
  const [submissions, setSubmissions] = React.useState<FormSubmission[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState<"all" | "new" | "contacted" | "qualified" | "archived">("all");
  const [searchTerm, setSearchTerm] = React.useState("");

  const fetchSubmissions = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/submissions");
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      } else {
        showToast("Failed to load lead submissions");
      }
    } catch {
      showToast("Error connecting to submissions API");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  React.useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleStatusChange = async (id: string, newStatus: FormSubmission["status"]) => {
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
        );
        showToast(`Submission status updated to ${newStatus}`);
      } else {
        showToast("Failed to update status");
      }
    } catch {
      showToast("Network error updating status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this lead submission?")) return;

    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSubmissions((prev) => prev.filter((s) => s.id !== id));
        showToast("Submission deleted");
      } else {
        showToast("Failed to delete submission");
      }
    } catch {
      showToast("Network error deleting submission");
    }
  };

  const filteredSubmissions = submissions.filter((s) => {
    const matchesFilter = filter === "all" || s.status === filter;
    const matchesSearch =
      !searchTerm ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalCount = submissions.length;
  const newCount = submissions.filter((s) => s.status === "new").length;
  const contactedCount = submissions.filter((s) => s.status === "contacted").length;
  const qualifiedCount = submissions.filter((s) => s.status === "qualified").length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold font-display flex items-center gap-2 text-[#3A2E27] dark:text-[#FAF5EE]">
            <PhoneCall className="w-5 h-5 text-[#f15e1c]" />
            <span>Form Submissions &amp; Lead Inquiries Dashboard</span>
          </h2>
          <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
            Review, qualify, and track incoming B2B enterprise leads and contact form queries
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchSubmissions}
          isLoading={loading}
          leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          className="rounded-xl shrink-0 cursor-pointer"
        >
          Refresh Leads
        </Button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">Total Submissions</span>
            <Inbox className="w-4 h-4 text-[#f15e1c]" />
          </div>
          <p className="text-3xl font-extrabold font-display text-[#f15e1c]">{totalCount}</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">New Requests</span>
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
            <span className="text-xs font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">Qualified</span>
            <CheckCircle2 className="w-4 h-4 text-[#ffec69]" />
          </div>
          <p className="text-3xl font-extrabold font-display text-[#fab60a]">{qualifiedCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#7A6A5F] dark:text-[#B8ACA0] flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          {(["all", "new", "contacted", "qualified", "archived"] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize ${
                filter === st
                  ? "bg-[#f15e1c] text-white shadow-md shadow-[#f15e1c]/20"
                  : "bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#1f1f1f] hover:border-[#f15e1c]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-[#7A6A5F] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, email, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 py-2 rounded-xl text-xs bg-[#FBF3EA] dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#1f1f1f] focus:border-[#f15e1c] w-full md:w-64"
          />
        </div>
      </div>

      {/* Submissions Table / Cards */}
      <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-xl space-y-4">
        {loading ? (
          <div className="py-12 text-center text-xs text-[#7A6A5F] space-y-2">
            <div className="w-6 h-6 border-2 border-[#f15e1c] border-t-transparent rounded-full animate-spin mx-auto" />
            <p>Loading form submissions...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#7A6A5F] space-y-2">
            <AlertCircle className="w-8 h-8 text-[#f15e1c]/50 mx-auto" />
            <p className="font-semibold text-sm text-[#3A2E27] dark:text-[#FAF5EE]">No submissions match criteria</p>
            <p>Form inquiries will automatically appear here live.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#EFE2D6] dark:border-[#1f1f1f] text-[#7A6A5F] dark:text-[#B8ACA0] uppercase text-[10px] font-mono">
                  <th className="py-3 px-4 font-bold">Ref ID / Submitted</th>
                  <th className="py-3 px-4 font-bold">Lead Contact</th>
                  <th className="py-3 px-4 font-bold">Company</th>
                  <th className="py-3 px-4 font-bold">Service &amp; Timeline</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE2D6]/60 dark:divide-[#1f1f1f]">
                {filteredSubmissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#FBF3EA]/60 dark:hover:bg-[#1A1613]/60 transition-colors">
                    <td className="py-4 px-4 align-top space-y-1">
                      <span className="font-mono font-extrabold text-[#f15e1c] text-[11px] block">{sub.id}</span>
                      <span className="text-[10px] text-[#7A6A5F] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(sub.submittedAt).toLocaleDateString()} {new Date(sub.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>

                    <td className="py-4 px-4 align-top space-y-1">
                      <p className="font-bold text-[#3A2E27] dark:text-[#FAF5EE] text-sm">{sub.name}</p>
                      <p className="text-[11px] text-[#7A6A5F] flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[#2e936f]" />
                        <a href={`mailto:${sub.email}`} className="hover:underline text-[#2e936f]">{sub.email}</a>
                      </p>
                      <p className="text-[11px] text-[#7A6A5F] flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <a href={`tel:${sub.phone.replace(/\s+/g, '')}`} className="hover:underline">{sub.phone}</a>
                      </p>
                    </td>

                    <td className="py-4 px-4 align-top space-y-1">
                      <p className="font-semibold text-[#3A2E27] dark:text-[#FAF5EE] flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#f15e1c]" />
                        <span>{sub.company}</span>
                      </p>
                      {sub.budget && (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[#FCE3D3] text-[#f15e1c] font-bold">
                          Budget: {sub.budget}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 align-top space-y-1.5 max-w-xs">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#2e936f]/10 text-[#2e936f] border border-[#2e936f]/20">
                        <Tag className="w-3 h-3" />
                        {sub.service}
                      </span>
                      <p className="text-[10px] text-[#7A6A5F] font-mono">Timeline: {sub.timeline}</p>
                      <p className="text-[11px] text-[#3A2E27] dark:text-[#FAF5EE] bg-[#FBF3EA] dark:bg-[#1A1613] p-2 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] line-clamp-3">
                        {sub.requirement}
                      </p>
                    </td>

                    <td className="py-4 px-4 align-top">
                      <select
                        value={sub.status}
                        onChange={(e) => handleStatusChange(sub.id, e.target.value as FormSubmission["status"])}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer bg-white dark:bg-[#1A1613] ${
                          sub.status === "new"
                            ? "border-[#2e936f] text-[#2e936f]"
                            : sub.status === "contacted"
                            ? "border-[#fab60a] text-[#fab60a]"
                            : sub.status === "qualified"
                            ? "border-[#f15e1c] text-[#f15e1c]"
                            : "border-gray-400 text-gray-500"
                        }`}
                      >
                        <option value="new">🆕 New</option>
                        <option value="contacted">📞 Contacted</option>
                        <option value="qualified">⭐ Qualified</option>
                        <option value="archived">📁 Archived</option>
                      </select>
                    </td>

                    <td className="py-4 px-4 align-top text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(sub.id)}
                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Delete Submission"
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

      {/* Public Contact Fields Panel */}
      <div className="p-6 rounded-3xl bg-[#FFFDF9] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#1f1f1f] shadow-md space-y-4">
        <h3 className="text-sm font-bold font-display text-[#f15e1c]">Public Contact Fields Configuration</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">India HQ Phone</label>
            <input
              type="text"
              value={footerForm.indiaPhone}
              onChange={(e) => setFooterForm({ ...footerForm, indiaPhone: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE]"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#3A2E27] dark:text-[#FAF5EE]">UAE Office Phone</label>
            <input
              type="text"
              value={footerForm.uaePhone}
              onChange={(e) => setFooterForm({ ...footerForm, uaePhone: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-[#EFE2D6] dark:border-[#1f1f1f] bg-[#FBF3EA] dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE]"
            />
          </div>
        </div>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => {
            updateFooter(footerForm);
            showToast("Contact details saved");
          }}
          className="rounded-xl cursor-pointer"
        >
          Save Contact Details
        </Button>
      </div>
    </div>
  );
}
