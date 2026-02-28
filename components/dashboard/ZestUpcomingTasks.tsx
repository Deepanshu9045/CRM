"use client";

import React, { useEffect, useState } from "react";
import { ZestCard, ZestCardHeader, ZestCardTitle, ZestCardContent } from "../ui/ZestCard";
import { ZestBadge } from "../ui/ZestBadge";
import { ZestButton } from "../ui/ZestButton";
import { ZestLoader } from "../ui/ZestLoader";
import { ZestEmptyState } from "../ui/ZestEmptyState";
import { dashboardService } from "@/services/dashboard.service";
import { TaskItem, TaskPriority } from "@/types/dashboard.types";
import { Check, CalendarDays, Clock, UserIcon } from "lucide-react";

export function ZestUpcomingTasks() {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [completingTask, setCompletingTask] = useState<string | null>(null);

    useEffect(() => {
        loadTasks();
    }, []);

    async function loadTasks() {
        try {
            setLoading(true);
            const result = await dashboardService.fetchUpcomingTasks();
            setTasks(result);
        } catch (error) {
            console.error("Failed to load tasks:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleCompleteTask = async (taskId: string) => {
        try {
            setCompletingTask(taskId);
            await dashboardService.markTaskComplete(taskId);
            // Remove task locally to feel instantly responsive
            setTasks(current => current.filter(t => t.id !== taskId));
        } catch (error) {
            console.error("Failed to complete task:", error);
        } finally {
            setCompletingTask(null);
        }
    };

    const getPriorityBadge = (priority: TaskPriority) => {
        switch (priority) {
            case "high": return <ZestBadge variant="error" className="capitalize">{priority}</ZestBadge>;
            case "medium": return <ZestBadge variant="warning" className="capitalize">{priority}</ZestBadge>;
            case "low": return <ZestBadge variant="success" className="capitalize">{priority}</ZestBadge>;
            default: return <ZestBadge variant="default" className="capitalize">{priority}</ZestBadge>;
        }
    };

    const formatDate = (date: Date) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const isToday = date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

        const isTomorrow = date.getDate() === tomorrow.getDate() &&
            date.getMonth() === tomorrow.getMonth() &&
            date.getFullYear() === tomorrow.getFullYear();

        if (isToday) return <span className="text-amber-500 font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> Today</span>;
        if (isTomorrow) return "Tomorrow";

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <ZestCard className="flex flex-col h-full">
            <ZestCardHeader>
                <ZestCardTitle>Upcoming Tasks</ZestCardTitle>
            </ZestCardHeader>
            <ZestCardContent className="flex-1 overflow-auto">
                {loading ? (
                    <div className="flex h-40 items-center justify-center">
                        <ZestLoader />
                    </div>
                ) : tasks.length === 0 ? (
                    <ZestEmptyState
                        icon={<CalendarDays className="h-6 w-6" />}
                        title="All caught up!"
                        description="You don't have any tasks due in the next 7 days."
                    />
                ) : (
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-slate-100 p-3 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                            >
                                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                                    <div className="flex items-start justify-between sm:justify-start gap-2">
                                        <h5 className="font-medium text-slate-900 truncate dark:text-slate-100">
                                            {task.title}
                                        </h5>
                                        <div className="sm:hidden block">
                                            {getPriorityBadge(task.priority)}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                                        <span className="flex items-center gap-1">
                                            <UserIcon className="h-3 w-3" />
                                            {task.assignedUserName}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <CalendarDays className="h-3 w-3" />
                                            {formatDate(task.dueDate)}
                                        </span>
                                        <div className="hidden sm:block">
                                            {getPriorityBadge(task.priority)}
                                        </div>
                                    </div>
                                </div>

                                <div className="shrink-0 flex justify-end">
                                    <ZestButton
                                        variant="outline"
                                        size="sm"
                                        className="h-8 w-8 p-0 rounded-full"
                                        onClick={() => handleCompleteTask(task.id)}
                                        isLoading={completingTask === task.id}
                                        title="Mark as complete"
                                    >
                                        {!completingTask && <Check className="h-4 w-4 text-emerald-500" />}
                                    </ZestButton>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ZestCardContent>
        </ZestCard>
    );
}
