"use client";
import React from "react";
import { ZestCard, ZestCardContent } from "@/components/ui/ZestCard";
import { formatCurrency } from "./utils";

export function TeamPerformanceTable({
  rows,
}: {
  rows: { name: string; closed: number; revenue: number; conv: number; target: number; art: string }[];
}) {
  return (
    <ZestCard>
      <ZestCardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                {['Salesperson Name','Deals Closed','Revenue Generated','Conversion Rate','Target Achievement %','Average Response Time'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-300">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {rows.map((r) => (
                <tr key={r.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-2 font-medium text-slate-900 dark:text-white">{r.name}</td>
                  <td className="px-4 py-2">{r.closed}</td>
                  <td className="px-4 py-2">{formatCurrency(r.revenue)}</td>
                  <td className="px-4 py-2">{r.conv}%</td>
                  <td className="px-4 py-2">{r.target}%</td>
                  <td className="px-4 py-2">{r.art}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ZestCardContent>
    </ZestCard>
  );
}
