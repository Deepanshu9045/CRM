import React from "react";
import { Loader2 } from "lucide-react";

interface ZestLoaderProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    fullPage?: boolean;
}

export function ZestLoader({ className = "", size = "md", fullPage = false }: ZestLoaderProps) {
    const sizes = {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12",
    };

    const loader = (
        <Loader2 className={`animate-spin text-indigo-500 ${sizes[size]} ${className}`} />
    );

    if (fullPage) {
        return (
            <div className="flex min-h-[400px] w-full items-center justify-center">
                {loader}
            </div>
        );
    }

    return loader;
}

export function ZestSkeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse rounded-md bg-slate-200 dark:bg-slate-800 ${className}`} />
    );
}
