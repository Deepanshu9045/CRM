"use client";
import React, { useState } from "react";
import { ZestButton } from "@/components/ui/ZestButton";
import { ZestCard } from "@/components/ui/ZestCard";
import { X } from "lucide-react";
import type { LeadSource, LeadStatus } from "./LeadsTable";

export interface AddLeadModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Record<string, any>) => void;
}

const sources: LeadSource[] = ["Website", "Facebook", "Referral", "Email Campaign", "Cold Call"];
const statuses: LeadStatus[] = ["New", "Contacted", "Qualified", "Proposal Sent", "Converted", "Lost"];

export function AddLeadModal({ open, onClose, onSubmit }: AddLeadModalProps) {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    source: "Website" as LeadSource,
    status: "New" as LeadStatus,
    assignedTo: "",
    notes: "",
    expectedValue: "",
    followUpDate: "",
  });

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      onSubmit(values);
      onClose();
      setValues({
        fullName: "",
        company: "",
        email: "",
        phone: "",
        source: "Website",
        status: "New",
        assignedTo: "",
        notes: "",
        expectedValue: "",
        followUpDate: "",
      });
    } finally {
      setLoading(false);
    }
  };

  const set = (k: string, v: any) => setValues((s) => ({ ...s, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-slate-900">Add Lead</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
            <input required value={values.fullName} onChange={(e) => set("fullName", e.target.value)} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Company Name</label>
            <input value={values.company} onChange={(e) => set("company", e.target.value)} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input type="email" value={values.email} onChange={(e) => set("email", e.target.value)} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Phone Number</label>
            <input value={values.phone} onChange={(e) => set("phone", e.target.value)} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Lead Source</label>
            <select value={values.source} onChange={(e) => set("source", e.target.value)} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2">
              {sources.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
            <select value={values.status} onChange={(e) => set("status", e.target.value)} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2">
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Assigned To</label>
            <input value={values.assignedTo} onChange={(e) => set("assignedTo", e.target.value)} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Expected Deal Value</label>
            <input type="number" value={values.expectedValue} onChange={(e) => set("expectedValue", e.target.value)} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
          </div>
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">Notes</label>
            <textarea value={values.notes} onChange={(e) => set("notes", e.target.value)} rows={3} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Follow-up Date</label>
            <input type="date" value={values.followUpDate} onChange={(e) => set("followUpDate", e.target.value)} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
          </div>
          <div className="md:col-span-2 mt-2 flex items-center justify-end gap-2">
            <ZestButton type="button" variant="outline" onClick={onClose}>Cancel</ZestButton>
            <ZestButton type="submit" isLoading={loading}>Save Lead</ZestButton>
          </div>
        </form>
      </div>
    </div>
  );
}
