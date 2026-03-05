"use client";
import React, { useState } from "react";
import { ZestCard, ZestCardHeader, ZestCardTitle, ZestCardContent } from "@/components/ui/ZestCard";
import { ZestButton } from "@/components/ui/ZestButton";

export function InvoiceSettings() {
  const [settings, setSettings] = useState({
    prefix: "INV-",
    startNumber: 1,
    dueDays: 15,
    currency: "USD",
    taxPercent: 8,
    terms: "Thank you for your business. Please pay within 15 days.",
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Invoice settings updated!");
  };

  const invoicePreview = `${settings.prefix}${(String(settings.startNumber).padStart(4, '0'))}`;

  return (
    <ZestCard>
      <ZestCardHeader>
        <ZestCardTitle>Invoice Settings</ZestCardTitle>
      </ZestCardHeader>
      <ZestCardContent>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Invoice Prefix</label>
              <input value={settings.prefix} onChange={e => setSettings(s => ({...s, prefix: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Starting Invoice Number</label>
              <input type="number" min="1" value={settings.startNumber} onChange={e => setSettings(s => ({...s, startNumber: parseInt(e.target.value, 10)}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
            </div>
          </div>
          <div className="rounded-md bg-slate-50 p-3">
            <p className="text-sm text-slate-600">Invoice numbers will look like: <span className="font-semibold text-slate-800">{invoicePreview}</span></p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Default Payment Due (Days)</label>
              <input type="number" min="0" value={settings.dueDays} onChange={e => setSettings(s => ({...s, dueDays: parseInt(e.target.value, 10)}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Currency</label>
              <input value={settings.currency} onChange={e => setSettings(s => ({...s, currency: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Tax Percentage (%)</label>
              <input type="number" min="0" max="100" step="0.1" value={settings.taxPercent} onChange={e => setSettings(s => ({...s, taxPercent: parseFloat(e.target.value)}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Payment Terms / Notes</label>
            <textarea value={settings.terms} onChange={e => setSettings(s => ({...s, terms: e.target.value}))} rows={4} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
          </div>
          <div className="flex justify-end">
            <ZestButton type="submit">Save Changes</ZestButton>
          </div>
        </form>
      </ZestCardContent>
    </ZestCard>
  );
}
