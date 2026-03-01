"use client";
import React from "react";
import { Calendar, Download, RefreshCw } from "lucide-react";
import { ZestButton } from "@/components/ui/ZestButton";

export type DatePreset = "today" | "this_week" | "this_month" | "this_quarter" | "custom";

export function HeaderBar({
  datePreset,
  setDatePreset,
  customRange,
  setCustomRange,
  onExportCSV,
  onExportExcel,
  onDownloadPDF,
}: {
  datePreset: DatePreset;
  setDatePreset: (v: DatePreset) => void;
  customRange: { from?: string; to?: string };
  setCustomRange: (v: { from?: string; to?: string }) => void;
  onExportCSV: () => void;
  onExportExcel: () => void;
  onDownloadPDF: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Reports & Analytics</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Monitor performance, track growth, and make smarter decisions.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {[{ k: "today", l: "Today" }, { k: "this_week", l: "This Week" }, { k: "this_month", l: "This Month" }, { k: "this_quarter", l: "This Quarter" }, { k: "custom", l: "Custom" }].map((o) => (
            <button key={o.k} onClick={() => setDatePreset(o.k as DatePreset)} className={`rounded-md px-3 py-1.5 text-sm ${datePreset === o.k ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}>
              {o.l}
            </button>
          ))}
          {datePreset === "custom" && (
            <div className="ml-2 flex items-center gap-2 px-2">
              <Calendar className="h-4 w-4 text-slate-500" />
              <input type="date" className="rounded border border-slate-200 px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900" value={customRange.from || ""} onChange={(e) => setCustomRange({ ...customRange, from: e.target.value })} />
              <span className="text-slate-500">to</span>
              <input type="date" className="rounded border border-slate-200 px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900" value={customRange.to || ""} onChange={(e) => setCustomRange({ ...customRange, to: e.target.value })} />
            </div>
          )}
        </div>
        <ZestButton variant="outline" onClick={onExportCSV}><Download className="mr-2 h-4 w-4" /> Export CSV</ZestButton>
        <ZestButton variant="outline" onClick={onExportExcel}><Download className="mr-2 h-4 w-4" /> Export Excel</ZestButton>
        <ZestButton variant="outline" onClick={onDownloadPDF}><Download className="mr-2 h-4 w-4" /> Download PDF</ZestButton>
        <ZestButton variant="secondary" onClick={() => window.location.reload()}><RefreshCw className="mr-2 h-4 w-4" /> Refresh</ZestButton>
      </div>
    </div>
  );
}
