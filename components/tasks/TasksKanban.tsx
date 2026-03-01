import React, { useState } from "react";
import { TaskDoc, TaskStatus, TaskPriority } from "@/services/tasks.service";
import { ZestBadge } from "@/components/ui/ZestBadge";
import { Calendar, Clock } from "lucide-react";

const KANBAN_COLUMNS: TaskStatus[] = ["Pending", "In Progress", "Overdue", "Completed"];

export interface TasksKanbanProps {
    tasks: TaskDoc[];
    onStatusChange: (taskId: string, newStatus: TaskStatus) => Promise<void>;
    onEdit: (task: TaskDoc) => void;
}

const priorityVariant: Record<TaskPriority, Parameters<typeof ZestBadge>[0]["variant"]> = {
    Low: "neutral",
    Medium: "info",
    High: "warning",
    Urgent: "error",
};

export function TasksKanban({ tasks, onStatusChange, onEdit }: TasksKanbanProps) {
    const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

    const handleDragStart = (e: React.DragEvent, taskId: string) => {
        setDraggedTaskId(taskId);
        e.dataTransfer.effectAllowed = "move";
        // Slightly fade the dragged element
        setTimeout(() => {
            (e.target as HTMLElement).style.opacity = "0.5";
        }, 0);
    };

    const handleDragEnd = (e: React.DragEvent) => {
        (e.target as HTMLElement).style.opacity = "1";
        setDraggedTaskId(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = async (e: React.DragEvent, status: TaskStatus) => {
        e.preventDefault();
        if (!draggedTaskId) return;

        // Only fire if the status is actually changing to avoid unnecessary writes
        const item = tasks.find(t => t.id === draggedTaskId);
        if (item && item.status !== status) {
            await onStatusChange(draggedTaskId, status);
        }
    };

    return (
        <div className="flex h-full min-h-[600px] gap-6 overflow-x-auto pb-4">
            {KANBAN_COLUMNS.map((column) => {
                const columnTasks = tasks.filter((t) => t.status === column);

                return (
                    <div
                        key={column}
                        className="flex w-80 shrink-0 flex-col rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, column)}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-semibold text-slate-800 dark:text-slate-200">{column}</h3>
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                {columnTasks.length}
                            </span>
                        </div>

                        <div className="flex flex-col gap-3">
                            {columnTasks.map((task) => (
                                <div
                                    key={task.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, task.id)}
                                    onDragEnd={handleDragEnd}
                                    onClick={() => onEdit(task)}
                                    className="cursor-pointer rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                                >
                                    <div className="mb-2 flex items-start justify-between gap-2">
                                        <h4 className="font-medium text-slate-900 dark:text-white line-clamp-2">{task.title}</h4>
                                        <ZestBadge variant={priorityVariant[task.priority]}>{task.priority}</ZestBadge>
                                    </div>

                                    {task.relatedToName && (
                                        <p className="text-xs text-slate-500 mb-3">{task.relatedToType}: {task.relatedToName}</p>
                                    )}

                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-slate-700/50">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>{new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        {task.assignedTo && (
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-700">
                                                {task.assignedTo.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {columnTasks.length === 0 && (
                                <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800">
                                    <p className="text-sm text-slate-400">Drop tasks here</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
