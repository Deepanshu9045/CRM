"use client";
import React from "react";
import { ZestButton } from "@/components/ui/ZestButton";
import { Plus } from "lucide-react";

export function LeadsHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Leads Management</h1>
        <p className="mt-1 text-sm text-slate-600">Track, manage and convert potential customers efficiently.</p>
      </div>
      <ZestButton onClick={onAdd} className="gap-2">
        <Plus className="h-4 w-4" /> Add New Lead
      </ZestButton>
    </div>
  );
}
