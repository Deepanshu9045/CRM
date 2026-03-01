"use client";
import React, { useMemo, useState } from "react";
import { ZestBadge } from "@/components/ui/ZestBadge";
import { ZestButton } from "@/components/ui/ZestButton";
import { ZestCard, ZestCardContent, ZestCardHeader, ZestCardTitle } from "@/components/ui/ZestCard";
import { ChevronDown, ChevronUp, ChevronsUpDown, Eye, Edit, Trash2, Download, Search, X } from "lucide-react";
// Replaced date-fns with native formatting

export type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal Sent"
  | "Converted"
  | "Lost";

export type LeadSource =
  | "Website"
  | "Facebook"
  | "Referral"
  | "Email Campaign"
  | "Cold Call";

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  assignedTo: string;
  createdAt: string; // ISO
}

const statusVariant: Record<LeadStatus, Parameters<typeof ZestBadge>[0]["variant"]> = {
  New: "info",
  Contacted: "neutral",
  Qualified: "success",
  "Proposal Sent": "warning",
  Converted: "success",
  Lost: "error",
};

const statusOrder: Record<LeadStatus, number> = {
  New: 0,
  Contacted: 1,
  Qualified: 2,
  "Proposal Sent": 3,
  Converted: 4,
  Lost: 5,
};

function toCSV(rows: Lead[]): string {
  const header = [
    "Lead Name",
    "Company",
    "Email",
    "Phone",
    "Source",
    "Status",
    "Assigned To",
    "Created Date",
  ];
  const out = [header.join(",")];
  for (const r of rows) {
    const line = [
      r.name,
      r.company,
      r.email,
      r.phone,
      r.source,
      r.status,
      r.assignedTo,
      new Date(r.createdAt).toISOString().slice(0, 10),
    ]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",");
    out.push(line);
  }
  return out.join("\n");
}

function download(filename: string, content: string, mime = "text/csv;charset=utf-8;") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export interface LeadsTableProps {
  data: Lead[];
}

export function LeadsTable({ data }: LeadsTableProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<LeadStatus | "">("");
  const [source, setSource] = useState<LeadSource | "">("");
  const [date, setDate] = useState<string>("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState<keyof Lead>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const resetFilters = () => {
    setQuery("");
    setStatus("");
    setSource("");
    setDate("");
  };

  const filtered = useMemo(() => {
    return data.filter((r) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        [r.name, r.company, r.email, r.phone].some((v) => v.toLowerCase().includes(q));
      const matchesStatus = !status || r.status === status;
      const matchesSource = !source || r.source === source;
      const matchesDate = !date || new Date(r.createdAt).toISOString().slice(0, 10) === date;
      return matchesQuery && matchesStatus && matchesSource && matchesDate;
    });
  }, [data, query, status, source, date]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortBy === "status") {
        return (statusOrder[a.status] - statusOrder[b.status]) * dir;
      }
      const av = a[sortBy];
      const bv = b[sortBy];
      if (sortBy === "createdAt") {
        return (new Date(av as string).getTime() - new Date(bv as string).getTime()) * dir;
      }
      return String(av).localeCompare(String(bv)) * dir;
    });
    return copy;
  }, [filtered, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page]);

  const allSelectedOnPage = pageData.length > 0 && pageData.every((r) => selected[r.id]);
  const someSelected = Object.values(selected).some(Boolean);

  const toggleSort = (key: keyof Lead) => {
    if (sortBy === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortBy(key);
      setSortDir("asc");
    }
  };

  const handleBulkDelete = () => {
    const ids = Object.entries(selected)
      .filter(([, v]) => v)
      .map(([id]) => id);
    if (!ids.length) return;
    // In real app call API; here just alert
    alert(`Bulk delete: ${ids.length} leads`);
    setSelected({});
  };

  const exportCSV = () => {
    download("leads.csv", toCSV(sorted));
  };

  return (
    <ZestCard className="p-0">
      <ZestCardHeader className="p-6">
        <ZestCardTitle>Leads</ZestCardTitle>
        <div className="flex items-center gap-2">
          {someSelected && (
            <ZestButton variant="outline" onClick={handleBulkDelete} className="gap-2">
              <Trash2 className="h-4 w-4" /> Bulk Delete
            </ZestButton>
          )}
          <ZestButton variant="secondary" onClick={exportCSV} className="gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </ZestButton>
        </div>
      </ZestCardHeader>
      <ZestCardContent className="p-6 pt-0">
        {/* Filters */}
        <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-12">
          <div className="md:col-span-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, company, email, phone"
              className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm outline-none ring-indigo-500 focus:ring-2"
            />
            {query && (
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" onClick={() => setQuery("")}>
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="md:col-span-2">
            <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm outline-none ring-indigo-500 focus:ring-2">
              <option value="">Status</option>
              {Object.keys(statusOrder).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <select value={source} onChange={(e) => setSource(e.target.value as any)} className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm outline-none ring-indigo-500 focus:ring-2">
              <option value="">Source</option>
              {(["Website", "Facebook", "Referral", "Email Campaign", "Cold Call"] as LeadSource[]).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm outline-none ring-indigo-500 focus:ring-2" />
          </div>
          <div className="md:col-span-2 flex gap-2">
            <ZestButton variant="outline" onClick={resetFilters}>Reset</ZestButton>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                  <input
                    type="checkbox"
                    checked={allSelectedOnPage}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const upd: Record<string, boolean> = { ...selected };
                      pageData.forEach((r) => (upd[r.id] = checked));
                      setSelected(upd);
                    }}
                  />
                </th>
                {(
                  [
                    ["name", "Lead Name"],
                    ["company", "Company"],
                    ["email", "Email"],
                    ["phone", "Phone"],
                    ["source", "Source"],
                    ["status", "Status"],
                    ["assignedTo", "Assigned To"],
                    ["createdAt", "Created Date"],
                  ] as [keyof Lead, string][]
                ).map(([key, label]) => (
                  <th key={key as string} className="cursor-pointer select-none px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500" onClick={() => toggleSort(key)}>
                    <div className="flex items-center gap-1">
                      {label}
                      {sortBy === key ? (
                        sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronsUpDown className="h-3 w-3 text-slate-300" />
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {pageData.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={!!selected[r.id]}
                      onChange={(e) => setSelected({ ...selected, [r.id]: e.target.checked })}
                    />
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">{r.name}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{r.company}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{r.email}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{r.phone}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{r.source}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    <ZestBadge variant={statusVariant[r.status]}>{r.status}</ZestBadge>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">{r.assignedTo}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{new Date(r.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    <div className="flex items-center justify-end gap-2">
                      <ZestButton variant="ghost" className="h-8 px-2" aria-label="View"><Eye className="h-4 w-4" /></ZestButton>
                      <ZestButton variant="ghost" className="h-8 px-2" aria-label="Edit"><Edit className="h-4 w-4" /></ZestButton>
                      <ZestButton variant="ghost" className="h-8 px-2" aria-label="Delete"><Trash2 className="h-4 w-4" /></ZestButton>
                    </div>
                  </td>
                </tr>
              ))}
              {pageData.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-10 text-center text-sm text-slate-500">No leads found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
          <div>
            Page {page} of {totalPages} • {sorted.length} results
          </div>
          <div className="flex items-center gap-2">
            <ZestButton variant="outline" disabled={page === 1} onClick={() => setPage(1)}>First</ZestButton>
            <ZestButton variant="outline" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</ZestButton>
            <ZestButton variant="outline" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</ZestButton>
            <ZestButton variant="outline" disabled={page === totalPages} onClick={() => setPage(totalPages)}>Last</ZestButton>
          </div>
        </div>
      </ZestCardContent>
    </ZestCard>
  );
}
