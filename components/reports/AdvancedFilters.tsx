"use client";
import React from "react";
import { ZestButton } from "@/components/ui/ZestButton";
import { ZestCard, ZestCardContent } from "@/components/ui/ZestCard";
import { Filter, Mail } from "lucide-react";

export function AdvancedFilters({
  filters,
  setFilters,
  onApply,
  onReset,
  onEmail,
}: {
  filters: { salesperson?: string; team?: string; stage?: string; source?: string; minValue?: number; maxValue?: number };
  setFilters: (v: any) => void;
  onApply: () => void;
  onReset: () => void;
  onEmail: () => void;
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Advanced Filters</h2>
        <ZestButton variant="ghost"><Filter className="mr-2 h-4 w-4" />Filters</ZestButton>
      </div>
      <ZestCard>
        <ZestCardContent>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-5">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Salesperson</label>
              <select value={filters.salesperson || ""} onChange={(e) => setFilters((f: any) => ({ ...f, salesperson: e.target.value || undefined }))} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
                <option value="">All</option>
                <option>Alex</option>
                <option>Priya</option>
                <option>Sam</option>
                <option>Li</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Team</label>
              <select value={filters.team || ""} onChange={(e) => setFilters((f: any) => ({ ...f, team: e.target.value || undefined }))} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
                <option value="">All</option>
                <option>North</option>
                <option>South</option>
                <option>East</option>
                <option>West</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Stage</label>
              <select value={filters.stage || ""} onChange={(e) => setFilters((f: any) => ({ ...f, stage: e.target.value || undefined }))} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
                <option value="">All</option>
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Proposal</option>
                <option>Won</option>
                <option>Lost</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Lead Source</label>
              <select value={filters.source || ""} onChange={(e) => setFilters((f: any) => ({ ...f, source: e.target.value || undefined }))} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
                <option value="">All</option>
                <option>Website</option>
                <option>Facebook</option>
                <option>Referral</option>
                <option>Email Campaign</option>
                <option>Cold Call</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Min Deal Value</label>
                <input type="number" value={filters.minValue ?? ""} onChange={(e) => setFilters((f: any) => ({ ...f, minValue: e.target.value ? Number(e.target.value) : undefined }))} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" placeholder="0" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">Max Deal Value</label>
                <input type="number" value={filters.maxValue ?? ""} onChange={(e) => setFilters((f: any) => ({ ...f, maxValue: e.target.value ? Number(e.target.value) : undefined }))} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" placeholder="100000" />
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <ZestButton onClick={onApply} variant="primary">Apply Filters</ZestButton>
            <ZestButton onClick={onReset} variant="outline">Reset Filters</ZestButton>
            <ZestButton onClick={onEmail} variant="secondary"><Mail className="mr-2 h-4 w-4" /> Email report</ZestButton>
          </div>
        </ZestCardContent>
      </ZestCard>
    </>
  );
}
