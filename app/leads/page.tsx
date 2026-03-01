"use client";
import React, { useMemo, useState } from "react";
import { LeadsHeader } from "@/components/leads/LeadsHeader";
import { LeadsStats } from "@/components/leads/LeadsStats";
import { LeadPipeline } from "@/components/leads/LeadPipeline";
import { LeadsTable, Lead } from "@/components/leads/LeadsTable";
import { AddLeadModal } from "@/components/leads/AddLeadModal";

function seed(): Lead[] {
  const sources = ["Website", "Facebook", "Referral", "Email Campaign", "Cold Call"] as const;
  const statuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Converted", "Lost"] as const;
  const names = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Davis",
    "Diana Prince",
    "Evan Lee",
    "Fiona Clark",
    "George Miller",
    "Hannah Scott",
    "Ian Wright",
    "Julia Brown",
    "Kevin Turner",
    "Laura Wilson",
    "Michael Chen",
    "Nina Patel",
    "Oscar Reed",
  ];
  return Array.from({ length: 42 }).map((_, i) => {
    const name = names[i % names.length];
    const company = `Company ${i + 1}`;
    const email = name.toLowerCase().replace(/\s/g, ".") + "@example.com";
    const phone = "+1 (555) " + (1000 + i).toString();
    const source = sources[i % sources.length] as any;
    const status = statuses[i % statuses.length] as any;
    const assignedTo = ["Alex", "Sam", "Jordan", "Taylor"][i % 4];
    const createdAt = new Date(Date.now() - i * 86400000).toISOString();
    return { id: String(i + 1), name, company, email, phone, source, status, assignedTo, createdAt };
  });
}

export default function LeadsPage() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<Lead[]>(() => seed());

  const handleAdd = (v: Record<string, any>) => {
    const n: Lead = {
      id: String(rows.length + 1),
      name: v.fullName,
      company: v.company,
      email: v.email,
      phone: v.phone,
      source: v.source,
      status: v.status,
      assignedTo: v.assignedTo || "Unassigned",
      createdAt: new Date().toISOString(),
    };
    setRows((r) => [n, ...r]);
  };

  return (
    <div className="space-y-6">
      <LeadsHeader onAdd={() => setOpen(true)} />
      <LeadsStats />
      <LeadPipeline />
      <LeadsTable data={rows} />
      <AddLeadModal open={open} onClose={() => setOpen(false)} onSubmit={handleAdd} />
    </div>
  );
}
