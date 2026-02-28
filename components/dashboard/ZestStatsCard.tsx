import React from "react";
import { ZestCard, ZestCardContent } from "../ui/ZestCard";

interface ZestStatsCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: React.ReactNode;
    growth?: string; // e.g., "+12%" or "-5%"
    trend?: "up" | "down" | "neutral";
    isLoading?: boolean;
}

export function ZestStatsCard({
    title,
    value,
    description,
    icon,
    growth,
    trend = "neutral",
    isLoading = false,
}: ZestStatsCardProps) {
    const trendColors = {
        up: "text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10",
        down: "text-red-500 bg-red-50 dark:bg-red-500/10",
        neutral: "text-slate-500 bg-slate-50 dark:bg-slate-800",
    };

    return (
        <ZestCard>
            <ZestCardContent className="p-0">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
                        {isLoading ? (
                            <div className="mt-2 h-8 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                        ) : (
                            <h4 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                {value}
                            </h4>
                        )}
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        {icon}
                    </div>
                </div>

                <div className="mt-4 flex items-center text-sm">
                    {!isLoading && growth && (
                        <span className={`mr-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${trendColors[trend]}`}>
                            {growth}
                        </span>
                    )}
                    {!isLoading && (
                        <span className="text-slate-500 dark:text-slate-400">{description}</span>
                    )}
                    {isLoading && (
                        <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                    )}
                </div>
            </ZestCardContent>
        </ZestCard>
    );
}
