import React from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "neutral";
type BadgeSize = "sm" | "md";

interface ZestBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: BadgeSize;
    children: React.ReactNode;
}

export function ZestBadge({ variant = "default", size = "md", className = "", children, ...props }: ZestBadgeProps) {
    const baseStyles = "inline-flex items-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2";

    const sizes: Record<BadgeSize, string> = {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-xs",
    };

    const variants: Record<BadgeVariant, string> = {
        default: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
        success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400",
        warning: "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400",
        error: "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400",
        info: "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400",
        neutral: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    };

    return (
        <span className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
            {children}
        </span>
    );
}
