"use client";
import React from "react";
import { ZestCard, ZestCardContent, ZestCardHeader, ZestCardTitle } from "@/components/ui/ZestCard";
import { ZestLoader } from "@/components/ui/ZestLoader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { formatCurrency } from "./utils";

export function RevenueReports({
  loading,
  monthlyRevenue,
  revenueBySalesperson,
  revenueByStage,
  forecastVsActual,
}: {
  loading: boolean;
  monthlyRevenue: { name: string; value: number }[];
  revenueBySalesperson: { name: string; value: number }[];
  revenueByStage: { name: string; value: number }[];
  forecastVsActual: { month: string; actual: number; forecast: number }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <ZestCard>
        <ZestCardHeader>
          <ZestCardTitle>Monthly Revenue Trend</ZestCardTitle>
        </ZestCardHeader>
        <ZestCardContent>
          {loading ? (
            <div className="flex h-[300px] items-center justify-center"><ZestLoader /></div>
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dy={10} />
                  <YAxis tickFormatter={(v) => `$${v}`} axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dx={-10} />
                  <Tooltip formatter={(v: any) => [formatCurrency(v as number), "Revenue"]} />
                  <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: "#4f46e5", strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </ZestCardContent>
      </ZestCard>

      <ZestCard>
        <ZestCardHeader>
          <ZestCardTitle>Revenue by Salesperson</ZestCardTitle>
        </ZestCardHeader>
        <ZestCardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueBySalesperson}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `$${v}`} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: any) => [formatCurrency(v as number), "Revenue"]} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ZestCardContent>
      </ZestCard>

      <ZestCard>
        <ZestCardHeader>
          <ZestCardTitle>Revenue by Stage</ZestCardTitle>
        </ZestCardHeader>
        <ZestCardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByStage}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `$${v}`} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: any) => [formatCurrency(v as number), "Revenue"]} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ZestCardContent>
      </ZestCard>

      <ZestCard>
        <ZestCardHeader>
          <ZestCardTitle>Forecasted vs Actual Revenue</ZestCardTitle>
        </ZestCardHeader>
        <ZestCardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastVsActual}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `$${v}`} axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="actual" name="Actual" stroke="#4f46e5" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#10b981" strokeDasharray="4 4" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ZestCardContent>
      </ZestCard>
    </div>
  );
}
