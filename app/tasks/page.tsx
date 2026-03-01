"use client";

import React, { useEffect, useState } from "react";
import { TasksHeader } from "@/components/tasks/TasksHeader";
import { TasksStats } from "@/components/tasks/TasksStats";
import { TasksTable } from "@/components/tasks/TasksTable";
import { TasksKanban } from "@/components/tasks/TasksKanban";
import { AddTaskModal } from "@/components/tasks/AddTaskModal";
import {
    TaskDoc,
    CreateTaskPayload,
    listTasks,
    addTask,
    updateTask,
    deleteTask,
    bulkDeleteTasks,
    TaskStatus,
} from "@/services/tasks.service";
import { Loader2, LayoutGrid, List } from "lucide-react";
import { ZestButton } from "@/components/ui/ZestButton";

export default function TasksPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<TaskDoc | undefined>(undefined);
    const [tasks, setTasks] = useState<TaskDoc[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<"table" | "kanban">("table");

    const loadTasks = async () => {
        setLoading(true);
        try {
            const data = await listTasks();
            setTasks(data);
        } catch (err) {
            console.error("Failed to load tasks:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleOpenCreate = () => {
        setEditingTask(undefined);
        setIsModalOpen(true);
    };

    const handleOpenEdit = (task: TaskDoc) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleSubmitTask = async (payload: CreateTaskPayload) => {
        if (editingTask) {
            await updateTask(editingTask.id, payload);
        } else {
            await addTask(payload);
        }
        await loadTasks();
    };

    const handleDeleteTask = async (id: string) => {
        await deleteTask(id);
        await loadTasks();
    };

    const handleBulkDelete = async (ids: string[]) => {
        await bulkDeleteTasks(ids);
        await loadTasks();
    };

    const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
        await updateTask(taskId, { status: newStatus });
        await loadTasks();
    };

    const handleMarkComplete = async (task: TaskDoc) => {
        await updateTask(task.id, { status: "Completed" });
        await loadTasks();
    };

    return (
        <div className="space-y-6 relative min-h-[500px]">
            <TasksHeader onAdd={handleOpenCreate} />

            {!loading && tasks.length > 0 && <TasksStats tasks={tasks} />}

            <div className="flex items-center justify-end gap-2 mb-4">
                <div className="flex rounded-lg border border-slate-200 bg-white p-1">
                    <button
                        onClick={() => setViewMode("table")}
                        className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${viewMode === "table" ? "bg-indigo-50 text-indigo-700" : "text-slate-500 hover:text-slate-900"}`}
                    >
                        <List className="h-4 w-4" /> Table
                    </button>
                    <button
                        onClick={() => setViewMode("kanban")}
                        className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${viewMode === "kanban" ? "bg-indigo-50 text-indigo-700" : "text-slate-500 hover:text-slate-900"}`}
                    >
                        <LayoutGrid className="h-4 w-4" /> Kanban
                    </button>
                </div>
            </div>

            {loading && tasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-slate-500">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mb-4" />
                    <p>Loading your tasks...</p>
                </div>
            ) : (
                viewMode === "table" ? (
                    <TasksTable
                        tasks={tasks}
                        onEdit={handleOpenEdit}
                        onDelete={handleDeleteTask}
                        onMarkComplete={handleMarkComplete}
                        onBulkDelete={handleBulkDelete}
                    />
                ) : (
                    <TasksKanban
                        tasks={tasks}
                        onEdit={handleOpenEdit}
                        onStatusChange={handleStatusChange}
                    />
                )
            )
            }

            <AddTaskModal
                open={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingTask(undefined);
                }}
                onSubmit={handleSubmitTask}
                initialData={editingTask}
            />
        </div >
    );
}
