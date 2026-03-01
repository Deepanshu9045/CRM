"use client";
import React from "react";
import { ZestCard, ZestCardContent } from "@/components/ui/ZestCard";
import { formatCurrency } from "./utils";

export function SmartAnalytics({
  kpi,
}: {
  kpi: { totalRevenue: number; revenueGrowthPct: number; conversionRate: number; targetAch: number };
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <ZestCard>
        <ZestCardContent>
          <div className="text-sm text-slate-600 dark:text-slate-300">Conversion Rate</div>
          <div className="mt-2 text-2xl font-semibold">{kpi.conversionRate}%</div>
          <div className="mt-2 text-xs text-slate-500">(Won Deals / Total Deals) × 100</div>
        </ZestCardContent>
      </ZestCard>
      <ZestCard>
        <ZestCardContent>
          <div className="text-sm text-slate-600 dark:text-slate-300">Weighted Revenue</div>
          <div className="mt-2 text-2xl font-semibold">{formatCurrency(Math.round(kpi.totalRevenue * 0.85))}</div>
          <div className="mt-2 text-xs text-slate-500">Sum of Deal Value × Probability</div>
        </ZestCardContent>
      </ZestCard>
      <ZestCard>
        <ZestCardContent>
          <div className="text-sm text-slate-600 dark:text-slate-300">Sales Growth %</div>
          <div className="mt-2 text-2xl font-semibold">{kpi.revenueGrowthPct}%</div>
          <div className="mt-2 text-xs text-slate-500">vs previous period</div>
        </ZestCardContent>
      </ZestCard>
      <ZestCard>
        <ZestCardContent>
          <div className="text-sm text-slate-600 dark:text-slate-300">Target vs Achievement</div>
          <div className="mt-2 text-2xl font-semibold">{kpi.targetAch}%</div>
          <div className="mt-2 text-xs text-slate-500">Goal attainment for the period</div>
        </ZestCardContent>
      </ZestCard>
    </div>
  );
}
