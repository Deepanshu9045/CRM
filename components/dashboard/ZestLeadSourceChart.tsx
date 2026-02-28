"use client";

import React, { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { ZestCard, ZestCardHeader, ZestCardTitle, ZestCardContent } from "../ui/ZestCard";
import { ZestLoader } from "../ui/ZestLoader";
import { ZestEmptyState } from "../ui/ZestEmptyState";
import { dashboardService } from "@/services/dashboard.service";
import { ChartDataPoint } from "@/types/dashboard.types";
import { PieChart as PieChartIcon } from "lucide-react";

const COLORS = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#8b5cf6"];

export function ZestLeadSourceChart() {
    const [data, setData] = useState<ChartDataPoint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const result = await dashboardService.fetchLeadSourceDistribution();
                setData(result);
            } catch (error) {
                console.error("Failed to load lead source data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return (
        <ZestCard className="col-span-1">
            <ZestCardHeader>
                <ZestCardTitle>Lead Sources</ZestCardTitle>
            </ZestCardHeader>
            <ZestCardContent>
                {loading ? (
                    <div className="flex h-[300px] items-center justify-center">
                        <ZestLoader />
                    </div>
                ) : data.length === 0 ? (
                    <div className="h-[300px]">
                        <ZestEmptyState
                            icon={<PieChartIcon className="h-8 w-8" />}
                            title="No leads yet"
                            description="Add leads to see distribution by source."
                        />
                    </div>
                ) : (
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={2}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: any) => [`${value} Leads`, "Count"]}
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "none",
                                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
                                    }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    formatter={(value) => <span className="text-sm text-slate-600 dark:text-slate-300">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </ZestCardContent>
        </ZestCard>
    );
}
