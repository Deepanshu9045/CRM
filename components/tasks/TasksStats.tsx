import React from "react";
import { ZestCard, ZestCardContent } from "@/components/ui/ZestCard";
import { ClipboardList, Clock, Loader, CheckCircle2, AlertCircle } from "lucide-react";
import { TaskDoc } from "@/services/tasks.service";

export interface TasksStatsProps {
    tasks: TaskDoc[];
}

export function TasksStats({ tasks }: TasksStatsProps) {
    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === "Pending").length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const overdue = tasks.filter((t) => t.status === "Overdue" || (t.status !== "Completed" && new Date(t.dueDate) < new Date())).length;

    const stats = [
        {
            label: "Total Tasks",
            value: total,
            icon: <ClipboardList className="h-5 w-5 text-indigo-600" />,
            bg: "bg-indigo-50",
        },
        {
            label: "Pending",
            value: pending,
            icon: <Clock className="h-5 w-5 text-amber-600" />,
            bg: "bg-amber-50",
        },
        {
            label: "In Progress",
            value: inProgress,
            icon: <Loader className="h-5 w-5 text-blue-600" />,
            bg: "bg-blue-50",
        },
        {
            label: "Completed",
            value: completed,
            icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
            bg: "bg-emerald-50",
        },
        {
            label: "Overdue",
            value: overdue,
            icon: <AlertCircle className="h-5 w-5 text-red-600" />,
            bg: "bg-red-50",
        },
    ];

    return (
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((s, i) => (
                <ZestCard key={i} className="hover:shadow-md transition-shadow duration-200">
                    <ZestCardContent className="flex items-center gap-4 p-5">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl \${s.bg}`}>
                            {s.icon}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-500">{s.label}</p>
                            <h3 className="text-2xl font-bold text-slate-900">{s.value}</h3>
                        </div>
                    </ZestCardContent>
                </ZestCard>
            ))}
        </div>
    );
}
