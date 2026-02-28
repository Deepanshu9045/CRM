"use client";

import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { ZestCard, ZestCardHeader, ZestCardTitle, ZestCardContent } from "../ui/ZestCard";
import { ZestLoader } from "../ui/ZestLoader";
import { ZestEmptyState } from "../ui/ZestEmptyState";
import { dashboardService } from "@/services/dashboard.service";
import { ChartDataPoint } from "@/types/dashboard.types";
import { TrendingUp } from "lucide-react";

export function ZestRevenueChart() {
    const [data, setData] = useState<ChartDataPoint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const result = await dashboardService.fetchMonthlyRevenue();
                setData(result);
            } catch (error) {
                console.error("Failed to load revenue data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
        }).format(value);
    };

    return (
        <ZestCard className="col-span-1 lg:col-span-2">
            <ZestCardHeader>
                <ZestCardTitle>Revenue Overview</ZestCardTitle>
            </ZestCardHeader>
            <ZestCardContent>
                {loading ? (
                    <div className="flex h-[300px] items-center justify-center">
                        <ZestLoader />
                    </div>
                ) : data.length === 0 ? (
                    <div className="h-[300px]">
                        <ZestEmptyState
                            icon={<TrendingUp className="h-8 w-8" />}
                            title="No revenue data"
                            description="Revenue data will appear here once deals are won."
                        />
                    </div>
                ) : (
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={data}
                                margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#64748b", fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    tickFormatter={(value) => `$${value}`}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#64748b", fontSize: 12 }}
                                    dx={-10}
                                />
                                <Tooltip
                                    formatter={(value: any) => [formatCurrency(value as number), "Revenue"]}
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "none",
                                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#4f46e5"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: "#4f46e5", strokeWidth: 0 }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </ZestCardContent>
        </ZestCard>
    );
}
