"use client";
import React from "react";
import { ZestCard, ZestCardContent, ZestCardHeader, ZestCardTitle } from "@/components/ui/ZestCard";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, LabelList, LineChart, Line, Legend } from "recharts";

export function PipelineReports({
  dealsByStage,
  winLoss,
}: {
  dealsByStage: { name: string; value: number }[];
  winLoss: { name: string; value: number }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <ZestCard>
        <ZestCardHeader><ZestCardTitle>Deals by Stage</ZestCardTitle></ZestCardHeader>
        <ZestCardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={dealsByStage}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ZestCardContent>
      </ZestCard>

      <ZestCard>
        <ZestCardHeader><ZestCardTitle>Win/Loss Ratio</ZestCardTitle></ZestCardHeader>
        <ZestCardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={winLoss} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>
                  {winLoss.map((_, idx) => <Cell key={idx} fill={idx === 0 ? "#10b981" : "#ef4444"} />)}
                  <LabelList dataKey="name" position="outside" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ZestCardContent>
      </ZestCard>

      <ZestCard>
        <ZestCardHeader><ZestCardTitle>Average Sales Cycle Duration</ZestCardTitle></ZestCardHeader>
        <ZestCardContent>
          <div className="flex h-[300px] items-center justify-center text-center text-slate-600 dark:text-slate-300">
            <div>
              <div className="text-4xl font-bold">24 days</div>
              <div className="mt-2 text-sm">Avg time from Lead In to Won across selected period</div>
            </div>
          </div>
        </ZestCardContent>
      </ZestCard>

      <ZestCard>
        <ZestCardHeader><ZestCardTitle>Stage-wise Drop-off Rate</ZestCardTitle></ZestCardHeader>
        <ZestCardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={[{ name: "New → Contacted", value: 18 }, { name: "Contacted → Qualified", value: 22 }, { name: "Qualified → Proposal", value: 16 }, { name: "Proposal → Won", value: 10 }]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={60} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={(v: any) => [`${v}%`, "Drop-off"]} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ZestCardContent>
      </ZestCard>
    </div>
  );
}
