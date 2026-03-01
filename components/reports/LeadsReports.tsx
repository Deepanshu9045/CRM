"use client";
import React from "react";
import { ZestCard, ZestCardContent, ZestCardHeader, ZestCardTitle } from "@/components/ui/ZestCard";
import { ResponsiveContainer, PieChart, Pie, Cell, LabelList, Tooltip, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar, FunnelChart, Funnel } from "recharts";

const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6", "#f97316"];

export function LeadsReports({
  leadsBySource,
  leadsByStatus,
  funnelData,
  responseTime,
}: {
  leadsBySource: { name: string; value: number }[];
  leadsByStatus: { name: string; value: number }[];
  funnelData: { name: string; value: number }[];
  responseTime: { name: string; value: number }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <ZestCard>
        <ZestCardHeader><ZestCardTitle>Leads by Source</ZestCardTitle></ZestCardHeader>
        <ZestCardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={leadsBySource} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={4}>
                  {leadsBySource.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
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
        <ZestCardHeader><ZestCardTitle>Leads by Status</ZestCardTitle></ZestCardHeader>
        <ZestCardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={leadsByStatus}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ZestCardContent>
      </ZestCard>

      <ZestCard className="lg:col-span-2">
        <ZestCardHeader><ZestCardTitle>Lead Conversion Funnel</ZestCardTitle></ZestCardHeader>
        <ZestCardContent>
          <div className="h-[320px] w-full">
            <ResponsiveContainer>
              <FunnelChart>
                <Tooltip />
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                  {funnelData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </ZestCardContent>
      </ZestCard>

      <ZestCard>
        <ZestCardHeader><ZestCardTitle>Lead Response Time Analysis</ZestCardTitle></ZestCardHeader>
        <ZestCardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={responseTime}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#14b8a6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ZestCardContent>
      </ZestCard>
    </div>
  );
}
