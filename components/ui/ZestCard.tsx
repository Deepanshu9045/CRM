import React from "react";
import { cn } from "@/lib/utils"; // Assuming a utility exists or will be created, otherwise we can use clsx

interface ZestCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function ZestCard({ className, children, ...props }: ZestCardProps) {
    return (
        <div
            className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:shadow-none ${className || ""}`}
            {...props}
        >
            {children}
        </div>
    );
}

export function ZestCardHeader({ className, children, ...props }: ZestCardProps) {
    return (
        <div className={`mb-4 flex items-center justify-between ${className || ""}`} {...props}>
            {children}
        </div>
    );
}

export function ZestCardTitle({ className, children, ...props }: ZestCardProps) {
    return (
        <h3 className={`text-base font-semibold leading-none tracking-tight text-slate-900 dark:text-white ${className || ""}`} {...props}>
            {children}
        </h3>
    );
}

export function ZestCardContent({ className, children, ...props }: ZestCardProps) {
    return (
        <div className={`${className || ""}`} {...props}>
            {children}
        </div>
    );
}
