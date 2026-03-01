"use client";

import React from "react";

interface ZestAvatarProps {
    src?: string;
    fallback: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function ZestAvatar({ src, fallback, size = "md", className = "" }: ZestAvatarProps) {
    const sizeClasses = {
        sm: "h-6 w-6 text-[10px]",
        md: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-lg",
    };

    return (
        <div className={`relative inline-flex items-center justify-center rounded-full bg-indigo-50 border border-indigo-100 overflow-hidden ${sizeClasses[size]} ${className}`}>
            {src ? (
                <img src={src} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
                <span className="font-bold text-indigo-600 uppercase">{fallback}</span>
            )}
        </div>
    );
}
