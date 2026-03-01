"use client";

import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    Legend
} from "recharts";
import { ZestCard } from "@/components/ui/ZestCard";
import { DealDoc, PIPELINE_STAGES } from "@/services/pipeline.service";

interface PipelineAnalyticsProps {
    deals: DealDoc[];
}

export function PipelineAnalytics({ deals }: PipelineAnalyticsProps) {
    // 1. Deals by Stage Data
    const stageData = PIPELINE_STAGES.map(stage => ({
        name: stage,
        count: deals.filter(d => d.stage === stage).length,
        value: deals.filter(d => d.stage === stage).reduce((acc, d) => acc + d.value, 0)
    }));

    // 2. Win/Loss Ratio
    const wonCount = deals.filter(d => d.status === "Won").length;
    const lostCount = deals.filter(d => d.status === "Lost").length;
    const activeCount = deals.filter(d => d.status === "Active").length;

    const statusData = [
        { name: "Won", value: wonCount, color: "#10b981" },
        { name: "Lost", value: lostCount, color: "#f43f5e" },
        { name: "Active", value: activeCount, color: "#6366f1" }
    ].filter(d => d.value > 0);

    // 3. Priority Distribution
    const priorityGroups = ["Low", "Medium", "High", "Urgent"];
    const priorityData = priorityGroups.map(p => ({
        name: p,
        count: deals.filter(d => d.priority === p).length
    }));

    const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f59e0b", "#10b981", "#3b82f6"];

    return (
        <div className="mt-12 space-y-6">
            <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-slate-900">Pipeline Insights</h2>
                <p className="text-sm text-slate-500 mt-1">Visual analysis of your sales performance and deal distribution.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Deals by Stage */}
                <ZestCard className="p-6">
                    <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider">Deals by Stage</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stageData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: '#64748b' }}
                                />
                                <YAxis
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: '#64748b' }}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: '#f8fafc' }}
                                />
                                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                    {stageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ZestCard>

                {/* Win/Loss Split */}
                <ZestCard className="p-6">
                    <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider">Deal Status Distribution</h3>
                    <div className="h-80 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </ZestCard>

                {/* Revenue by Stage */}
                <ZestCard className="p-6 lg:col-span-2">
                    <h3 className="text-sm font-bold text-slate-700 mb-6 uppercase tracking-wider">Revenue Distribution ($) per Stage</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stageData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                <XAxis type="number" fontSize={10} tickLine={false} axisLine={false} hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    fontSize={10}
                                    tickLine={false}
                                    axisLine={false}
                                    width={100}
                                />
                                <Tooltip
                                    formatter={(value: any) => `$${Number(value || 0).toLocaleString()}`}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ZestCard>
            </div>
        </div>
    );
}
