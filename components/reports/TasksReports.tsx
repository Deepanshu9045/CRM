"use client";
import React from "react";
import { ZestCard, ZestCardContent, ZestCardHeader, ZestCardTitle } from "@/components/ui/ZestCard";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Cell, LabelList, LineChart, Line, Legend } from "recharts";

const COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6", "#f97316"];

export function TasksReports({
  tasksCompletedPending,
  tasksByPriority,
  tasksByMember,
  overdueTrend,
}: {
  tasksCompletedPending: { name: string; value: number }[];
  tasksByPriority: { name: string; value: number }[];
  tasksByMember: { name: string; value: number }[];
  overdueTrend: { month: string; value: number }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <ZestCard>
        <ZestCardHeader><ZestCardTitle>Tasks Completed vs Pending</ZestCardTitle></ZestCardHeader>
        <ZestCardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={tasksCompletedPending}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ZestCardContent>
      </ZestCard>

      <ZestCard>
        <ZestCardHeader><ZestCardTitle>Tasks by Priority</ZestCardTitle></ZestCardHeader>
        <ZestCardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={tasksByPriority} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>
                  {tasksByPriority.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
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
        <ZestCardHeader><ZestCardTitle>Tasks by Team Member</ZestCardTitle></ZestCardHeader>
        <ZestCardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <BarChart data={tasksByMember}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ZestCardContent>
      </ZestCard>

      <ZestCard>
        <ZestCardHeader><ZestCardTitle>Overdue Tasks Trend</ZestCardTitle></ZestCardHeader>
        <ZestCardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer>
              <LineChart data={overdueTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ZestCardContent>
      </ZestCard>
    </div>
  );
}
