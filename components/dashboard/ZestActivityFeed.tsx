"use client";

import React, { useEffect, useState } from "react";
import { ZestCard, ZestCardHeader, ZestCardTitle, ZestCardContent } from "../ui/ZestCard";
import { ZestBadge } from "../ui/ZestBadge";
import { ZestLoader } from "../ui/ZestLoader";
import { ZestEmptyState } from "../ui/ZestEmptyState";
import { dashboardService } from "@/services/dashboard.service";
import { ActivityItem, ActivityType, EntityType } from "@/types/dashboard.types";
import { FileText, UserPlus, CheckCircle2, DollarSign, XCircle, MessageSquare, Activity } from "lucide-react";

export function ZestActivityFeed() {
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const result = await dashboardService.fetchRecentActivities();
                setActivities(result);
            } catch (error) {
                console.error("Failed to load activities:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const getActivityIcon = (type: ActivityType) => {
        switch (type) {
            case "lead_created": return <UserPlus className="h-4 w-4 text-blue-500" />;
            case "customer_converted": return <DollarSign className="h-4 w-4 text-emerald-500" />;
            case "task_completed": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
            case "task_created": return <CheckCircle2 className="h-4 w-4 text-amber-500" />;
            case "deal_won": return <DollarSign className="h-4 w-4 text-emerald-500" />;
            case "deal_lost": return <XCircle className="h-4 w-4 text-red-500" />;
            case "note_added": return <MessageSquare className="h-4 w-4 text-indigo-500" />;
            default: return <FileText className="h-4 w-4 text-slate-500" />;
        }
    };

    const getActivityText = (type: ActivityType) => {
        switch (type) {
            case "lead_created": return "added a new lead";
            case "customer_converted": return "converted lead to customer";
            case "task_completed": return "completed task";
            case "task_created": return "created task";
            case "deal_won": return "won the deal";
            case "deal_lost": return "lost the deal";
            case "note_added": return "added a note to";
            default: return "performed an action on";
        }
    };

    const getEntityBadge = (entity: EntityType) => {
        switch (entity) {
            case "Lead": return <ZestBadge variant="info">Lead</ZestBadge>;
            case "Customer": return <ZestBadge variant="success">Customer</ZestBadge>;
            case "Task": return <ZestBadge variant="warning">Task</ZestBadge>;
            case "Deal": return <ZestBadge variant="default">Deal</ZestBadge>;
            default: return null;
        }
    };

    const formatRelativeTime = (date: Date) => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    };

    return (
        <ZestCard className="flex flex-col h-full">
            <ZestCardHeader>
                <ZestCardTitle>Recent Activity</ZestCardTitle>
            </ZestCardHeader>
            <ZestCardContent className="flex-1 overflow-auto">
                {loading ? (
                    <div className="flex h-40 items-center justify-center">
                        <ZestLoader />
                    </div>
                ) : activities.length === 0 ? (
                    <ZestEmptyState
                        icon={<Activity className="h-6 w-6" />}
                        title="No recent activity"
                        description="Activity from your team will show up here."
                    />
                ) : (
                    <div className="space-y-6">
                        {activities.map((activity, index) => (
                            <div key={activity.id} className="relative flex gap-4">
                                {/* Vertical line connecting items */}
                                {index !== activities.length - 1 && (
                                    <div className="absolute left-4 top-10 -bottom-6 w-px bg-slate-200 dark:bg-slate-700" />
                                )}

                                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-slate-100 dark:border-slate-900 dark:bg-slate-800">
                                    {getActivityIcon(activity.action)}
                                </div>

                                <div className="flex flex-col flex-1 pt-1.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-sm text-slate-900 dark:text-slate-100">
                                            <span className="font-semibold">{activity.userName}</span>{" "}
                                            <span className="text-slate-500 dark:text-slate-400">{getActivityText(activity.action)}</span>{" "}
                                            <span className="font-medium">{activity.entityName}</span>
                                        </p>
                                        <span className="text-xs text-slate-500 whitespace-nowrap dark:text-slate-400">
                                            {formatRelativeTime(activity.timestamp)}
                                        </span>
                                    </div>
                                    <div className="mt-1">
                                        {getEntityBadge(activity.entityType)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ZestCardContent>
        </ZestCard>
    );
}
