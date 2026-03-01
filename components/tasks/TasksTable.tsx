import React, { useMemo, useState } from "react";
import { ZestBadge } from "@/components/ui/ZestBadge";
import { ZestButton } from "@/components/ui/ZestButton";
import { ZestCard, ZestCardContent, ZestCardHeader, ZestCardTitle } from "@/components/ui/ZestCard";
import { ChevronDown, ChevronUp, ChevronsUpDown, Edit, Trash2, CheckCircle, Search, X } from "lucide-react";
import { TaskDoc, TaskStatus, TaskPriority } from "@/services/tasks.service";

export interface TasksTableProps {
    tasks: TaskDoc[];
    onEdit: (task: TaskDoc) => void;
    onDelete: (id: string) => Promise<void>;
    onMarkComplete: (task: TaskDoc) => Promise<void>;
    onBulkDelete?: (ids: string[]) => Promise<void>;
}

const statusVariant: Record<TaskStatus, Parameters<typeof ZestBadge>[0]["variant"]> = {
    Pending: "warning",
    "In Progress": "info",
    Completed: "success",
    Overdue: "error",
    Cancelled: "neutral",
};

const priorityVariant: Record<TaskPriority, Parameters<typeof ZestBadge>[0]["variant"]> = {
    Low: "neutral",
    Medium: "info",
    High: "warning",
    Urgent: "error",
};

export function TasksTable({ tasks, onEdit, onDelete, onMarkComplete, onBulkDelete }: TasksTableProps) {
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<TaskStatus | "">("");
    const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "">("");

    const [sortBy, setSortBy] = useState<keyof TaskDoc>("dueDate");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const [selected, setSelected] = useState<Record<string, boolean>>({});

    const filtered = useMemo(() => {
        return tasks.filter((t) => {
            const q = query.toLowerCase();
            const matchesQuery = !q || [t.title, t.relatedToName, t.assignedTo].some(v => v?.toLowerCase().includes(q));
            const matchesStatus = !statusFilter || t.status === statusFilter;
            const matchesPriority = !priorityFilter || t.priority === priorityFilter;
            return matchesQuery && matchesStatus && matchesPriority;
        });
    }, [tasks, query, statusFilter, priorityFilter]);

    const sorted = useMemo(() => {
        const copy = [...filtered];
        copy.sort((a, b) => {
            const dir = sortDir === "asc" ? 1 : -1;
            const av = a[sortBy] || "";
            const bv = b[sortBy] || "";
            if (sortBy === "dueDate" || sortBy === "createdAt") {
                return (new Date(av as string).getTime() - new Date(bv as string).getTime()) * dir;
            }
            return String(av).localeCompare(String(bv)) * dir;
        });
        return copy;
    }, [filtered, sortBy, sortDir]);

    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const pageData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return sorted.slice(start, start + pageSize);
    }, [sorted, page]);

    const allSelectedOnPage = pageData.length > 0 && pageData.every((r) => selected[r.id]);
    const someSelected = Object.values(selected).some(Boolean);

    const toggleSort = (key: keyof TaskDoc) => {
        if (sortBy === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        else {
            setSortBy(key);
            setSortDir("asc");
        }
    };

    const handleBulkDelete = async () => {
        const ids = Object.entries(selected).filter(([, v]) => v).map(([id]) => id);
        if (!ids.length || !onBulkDelete) return;
        if (window.confirm(`Are you sure you want to delete ${ids.length} tasks?`)) {
            await onBulkDelete(ids);
            setSelected({});
        }
    };

    const resetFilters = () => {
        setQuery("");
        setStatusFilter("");
        setPriorityFilter("");
    };

    return (
        <ZestCard className="p-0">
            <ZestCardHeader className="p-6">
                <ZestCardTitle>Tasks List</ZestCardTitle>
                <div className="flex items-center gap-2">
                    {someSelected && onBulkDelete && (
                        <ZestButton variant="outline" onClick={handleBulkDelete} className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                            <Trash2 className="h-4 w-4" /> Bulk Delete
                        </ZestButton>
                    )}
                </div>
            </ZestCardHeader>
            <ZestCardContent className="p-6 pt-0">

                {/* Filters */}
                <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-12">
                    <div className="md:col-span-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search tasks, relations, assignees..."
                            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm outline-none ring-indigo-500 focus:ring-2"
                        />
                        {query && (
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" onClick={() => setQuery("")}>
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                    <div className="md:col-span-3">
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as TaskStatus)} className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm outline-none ring-indigo-500 focus:ring-2">
                            <option value="">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Overdue">Overdue</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div className="md:col-span-3">
                        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value as TaskPriority)} className="w-full rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm outline-none ring-indigo-500 focus:ring-2">
                            <option value="">All Priorities</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <ZestButton variant="outline" onClick={resetFilters} className="w-full">Reset</ZestButton>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-lg border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 w-12">
                                    <input
                                        type="checkbox"
                                        checked={allSelectedOnPage}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            const upd: Record<string, boolean> = { ...selected };
                                            pageData.forEach((r) => (upd[r.id] = checked));
                                            setSelected(upd);
                                        }}
                                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 cursor-pointer" onClick={() => toggleSort("title")}>
                                    <div className="flex items-center gap-1">Task {sortBy === "title" ? (sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />) : <ChevronsUpDown className="h-3 w-3 text-slate-300" />}</div>
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Related To</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 cursor-pointer" onClick={() => toggleSort("dueDate")}>
                                    <div className="flex items-center gap-1">Due Date {sortBy === "dueDate" ? (sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />) : <ChevronsUpDown className="h-3 w-3 text-slate-300" />}</div>
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Priority</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Status</th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            {pageData.map((task) => (
                                <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={!!selected[task.id]}
                                            onChange={(e) => setSelected({ ...selected, [task.id]: e.target.checked })}
                                            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-sm font-medium text-slate-900">{task.title}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{task.taskType}</p>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-700">
                                        {task.relatedToName ? (
                                            <span>
                                                <span className="font-medium">{task.relatedToName}</span>
                                                <span className="text-xs text-slate-400 block">{task.relatedToType}</span>
                                            </span>
                                        ) : <span className="text-slate-400">—</span>}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-700">
                                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "—"}
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <ZestBadge variant={priorityVariant[task.priority]}>{task.priority}</ZestBadge>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        <ZestBadge variant={statusVariant[task.status]}>{task.status}</ZestBadge>
                                    </td>
                                    <td className="px-4 py-3 text-right text-sm">
                                        <div className="flex items-center justify-end gap-1">
                                            {task.status !== "Completed" && (
                                                <button title="Mark Complete" onClick={() => onMarkComplete(task)} className="p-1.5 text-slate-400 hover:text-emerald-600 transition-colors rounded-md hover:bg-emerald-50">
                                                    <CheckCircle className="h-4 w-4" />
                                                </button>
                                            )}
                                            <button title="Edit" onClick={() => onEdit(task)} className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors rounded-md hover:bg-indigo-50">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button title="Delete" onClick={async () => {
                                                if (window.confirm("Delete this task?")) await onDelete(task.id);
                                            }} className="p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {pageData.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-500">
                                        No tasks found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                        <div>
                            Page {page} of {totalPages} • {sorted.length} results
                        </div>
                        <div className="flex items-center gap-2">
                            <ZestButton variant="outline" disabled={page === 1} onClick={() => setPage(1)}>First</ZestButton>
                            <ZestButton variant="outline" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</ZestButton>
                            <ZestButton variant="outline" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</ZestButton>
                            <ZestButton variant="outline" disabled={page === totalPages} onClick={() => setPage(totalPages)}>Last</ZestButton>
                        </div>
                    </div>
                )}
            </ZestCardContent>
        </ZestCard>
    );
}
