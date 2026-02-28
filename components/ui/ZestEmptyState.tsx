import React from "react";
import { FolderSearch } from "lucide-react";

interface ZestEmptyStateProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}

export function ZestEmptyState({
    title,
    description,
    icon,
    action,
    className = "",
}: ZestEmptyStateProps) {
    return (
        <div className={`flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-12 text-center dark:border-slate-800 dark:bg-slate-900/50 ${className}`}>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {icon || <FolderSearch className="h-8 w-8" />}
            </div>
            <h3 className="mb-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
            <p className="mb-6 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                {description}
            </p>
            {action && <div>{action}</div>}
        </div>
    );
}
