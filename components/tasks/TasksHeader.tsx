import React from "react";
import { ZestButton } from "@/components/ui/ZestButton";
import { Plus, CalendarDays } from "lucide-react";

export function TasksHeader({ onAdd, onViewCalendar }: { onAdd: () => void, onViewCalendar?: () => void }) {
    return (
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Task Management</h1>
                <p className="mt-1 text-sm text-slate-600">
                    Organize follow-ups, meetings, and daily sales activities efficiently.
                </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                {onViewCalendar && (
                    <ZestButton variant="outline" onClick={onViewCalendar} className="gap-2">
                        <CalendarDays className="h-4 w-4" /> View Calendar
                    </ZestButton>
                )}
                <ZestButton onClick={onAdd} className="gap-2">
                    <Plus className="h-4 w-4" /> Create New Task
                </ZestButton>
            </div>
        </div>
    );
}
