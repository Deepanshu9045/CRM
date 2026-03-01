"use client";

import React from "react";
import { ZestCard } from "@/components/ui/ZestCard";
import {
    DollarSign,
    TrendingUp,
    Clock,
    CheckCircle2,
    XCircle,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { DealDoc } from "@/services/pipeline.service";

interface PipelineStatsProps {
    deals: DealDoc[];
}

export function PipelineStats({ deals }: PipelineStatsProps) {
    const totalValue = deals.reduce((acc, deal) => acc + deal.value, 0);
    const dealsWon = deals.filter(d => d.status === "Won");
    const dealsLost = deals.filter(d => d.status === "Lost");
    const dealsInProgress = deals.filter(d => d.status === "Active");

    const wonValue = dealsWon.reduce((acc, deal) => acc + deal.value, 0);
    const progressValue = dealsInProgress.reduce((acc, deal) => acc + deal.value, 0);

    // Weighted revenue (Value * Probability)
    const expectedRevenue = deals.reduce((acc, deal) => {
        if (deal.status === "Active") {
            return acc + (deal.value * (deal.probability / 100));
        }
        if (deal.status === "Won") return acc + deal.value;
        return acc;
    }, 0);

    const conversionRate = deals.length > 0
        ? ((dealsWon.length / (dealsWon.length + dealsLost.length)) * 100 || 0).toFixed(1)
        : "0.0";

    const stats = [
        {
            label: "Total Pipeline",
            value: `$${totalValue.toLocaleString()}`,
            icon: DollarSign,
            color: "text-blue-600",
            bg: "bg-blue-50",
            trend: "↑ 12%",
            isPositive: true
        },
        {
            label: "Expected Revenue",
            value: `$${Math.round(expectedRevenue).toLocaleString()}`,
            icon: TrendingUp,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            trend: "↑ 8%",
            isPositive: true
        },
        {
            label: "Deals in Progress",
            value: dealsInProgress.length.toString(),
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-50",
            trend: "↑ 4",
            isPositive: true
        },
        {
            label: "Deals Won",
            value: dealsWon.length.toString(),
            icon: CheckCircle2,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            trend: "↑ 2",
            isPositive: true
        },
        {
            label: "Deals Lost",
            value: dealsLost.length.toString(),
            icon: XCircle,
            color: "text-rose-600",
            bg: "bg-rose-50",
            trend: "↓ 1",
            isPositive: false
        },
        {
            label: "Conversion Rate",
            value: `${conversionRate}%`,
            icon: BarChart3,
            color: "text-purple-600",
            bg: "bg-purple-50",
            trend: "↑ 2.4%",
            isPositive: true
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {stats.map((stat, idx) => (
                <ZestCard key={idx} className="p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon className="h-5 w-5" />
                        </div>
                        <div className={`flex items-center text-xs font-medium ${stat.isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                            {stat.isPositive ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                            {stat.trend}
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                        <h3 className="text-xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                    </div>
                </ZestCard>
            ))}
        </div>
    );
}
