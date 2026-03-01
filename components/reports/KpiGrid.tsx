"use client";
import React from "react";
import { ZestCard, ZestCardContent } from "@/components/ui/ZestCard";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatCurrency } from "./utils";

function KpiCard({ title, value, vsText, trend }: { title: string; value: string; vsText: string; trend: "up" | "down" | "neutral" }) {
  const trendEl = trend === "up" ? (
    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
      <ArrowUpRight className="mr-1 h-3 w-3" />
      {vsText}
    </span>
  ) : trend === "down" ? (
    <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600 dark:bg-red-500/10 dark:text-red-400">
      <ArrowDownRight className="mr-1 h-3 w-3" />
      {vsText}
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{vsText}</span>
  );

  return (
    <ZestCard>
      <ZestCardContent className="p-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
            <h4 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</h4>
          </div>
        </div>
        <div className="mt-4 text-sm text-slate-500 dark:text-slate-400">{trendEl} <span className="ml-2">vs last period</span></div>
      </ZestCardContent>
    </ZestCard>
  );
}

export function KpiGrid({
  kpi,
}: {
  kpi: { totalRevenue: number; revenueGrowthPct: number; totalLeads: number; conversionRate: number; dealsWon: number; dealsLost: number; avgDealSize: number; targetAch: number };
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard title="Total Revenue" value={formatCurrency(kpi.totalRevenue)} vsText={`+${kpi.revenueGrowthPct}%`} trend="up" />
      <KpiCard title="Revenue Growth %" value={`${kpi.revenueGrowthPct}%`} vsText={"+2%"} trend="up" />
      <KpiCard title="Total Leads" value={`${kpi.totalLeads}`} vsText={"+5%"} trend="up" />
      <KpiCard title="Lead Conversion Rate" value={`${kpi.conversionRate}%`} vsText={"+1.2%"} trend="up" />
      <KpiCard title="Deals Won" value={`${kpi.dealsWon}`} vsText={"+3"} trend="up" />
      <KpiCard title="Deals Lost" value={`${kpi.dealsLost}`} vsText={"-2"} trend="down" />
      <KpiCard title="Average Deal Size" value={formatCurrency(kpi.avgDealSize)} vsText={"+4%"} trend="up" />
      <KpiCard title="Sales Target Achievement %" value={`${kpi.targetAch}%`} vsText={"+1%"} trend="up" />
    </div>
  );
}
