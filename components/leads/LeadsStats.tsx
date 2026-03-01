import React from "react";
import { ZestCard } from "@/components/ui/ZestCard";
import { TrendingUp, Users, CheckCircle2, Handshake, XCircle } from "lucide-react";

export interface StatItem {
  label: string;
  value: number;
  change: number; // growth percentage
  icon: React.ReactNode;
}

function Stat({ label, value, change, icon }: StatItem) {
  const changeColor = change >= 0 ? "text-emerald-600" : "text-red-600";
  const sign = change >= 0 ? "+" : "";
  return (
    <ZestCard className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <div className="mt-1 flex items-end gap-2">
            <p className="text-2xl font-semibold text-slate-900">{value.toLocaleString()}</p>
            <span className={`text-xs ${changeColor}`}>{sign}{change}%</span>
          </div>
        </div>
        <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">{icon}</div>
      </div>
    </ZestCard>
  );
}

export function LeadsStats() {
  const stats: StatItem[] = [
    { label: "Total Leads", value: 1234, change: 8, icon: <Users className="h-5 w-5" /> },
    { label: "New Leads", value: 214, change: 12, icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Qualified Leads", value: 356, change: 5, icon: <CheckCircle2 className="h-5 w-5" /> },
    { label: "Converted Leads", value: 188, change: 3, icon: <Handshake className="h-5 w-5" /> },
    { label: "Lost Leads", value: 75, change: -2, icon: <XCircle className="h-5 w-5" /> },
  ];
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((s) => (
        <Stat key={s.label} {...s} />
      ))}
    </div>
  );
}
