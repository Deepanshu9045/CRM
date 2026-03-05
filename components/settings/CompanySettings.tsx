"use client";
import React, { useState } from "react";
import { ZestCard, ZestCardHeader, ZestCardTitle, ZestCardContent } from "@/components/ui/ZestCard";
import { ZestButton } from "@/components/ui/ZestButton";
import { UploadCloud } from "lucide-react";

export function CompanySettings() {
  const [company, setCompany] = useState({
    name: "Zest Inc.",
    email: "contact@zestinc.com",
    phone: "+1 (555) 987-6543",
    website: "https://zestinc.com",
    address: "123 Zest St",
    city: "Busytown",
    state: "CA",
    postalCode: "90210",
    country: "USA",
    taxId: "GST123456789",
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Company information updated!");
  };

  return (
    <ZestCard>
      <ZestCardHeader>
        <ZestCardTitle>Company Settings</ZestCardTitle>
      </ZestCardHeader>
      <ZestCardContent>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Company Name</label>
            <input value={company.name} onChange={e => setCompany(c => ({...c, name: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Company Logo</label>
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-slate-300 px-6 pt-5 pb-6">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                <div className="flex text-sm text-slate-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Company Email</label>
              <input type="email" value={company.email} onChange={e => setCompany(c => ({...c, email: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Phone Number</label>
              <input value={company.phone} onChange={e => setCompany(c => ({...c, phone: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Website</label>
            <input type="url" value={company.website} onChange={e => setCompany(c => ({...c, website: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Address</label>
            <input value={company.address} onChange={e => setCompany(c => ({...c, address: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">City</label>
              <input value={company.city} onChange={e => setCompany(c => ({...c, city: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">State / Province</label>
              <input value={company.state} onChange={e => setCompany(c => ({...c, state: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Postal Code</label>
              <input value={company.postalCode} onChange={e => setCompany(c => ({...c, postalCode: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Country</label>
              <input value={company.country} onChange={e => setCompany(c => ({...c, country: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">GST / Tax Number</label>
            <input value={company.taxId} onChange={e => setCompany(c => ({...c, taxId: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
          </div>
          <div className="flex justify-end">
            <ZestButton type="submit">Save Changes</ZestButton>
          </div>
        </form>
      </ZestCardContent>
    </ZestCard>
  );
}
