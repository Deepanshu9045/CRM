"use client";

import React from "react";
import { Search, Filter, RotateCcw, ChevronDown } from "lucide-react";
import { ZestButton } from "@/components/ui/ZestButton";

interface PipelineFiltersProps {
    search: string;
    onSearchChange: (val: string) => void;
    onReset: () => void;
}

export function PipelineFilters({ search, onSearchChange, onReset }: PipelineFiltersProps) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search deals or companies..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
                <ZestButton variant="outline" size="sm" className="hidden md:flex">
                    <Filter className="h-4 w-4 mr-2" />
                    Salesperson
                    <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                </ZestButton>
                <ZestButton variant="outline" size="sm" className="hidden md:flex">
                    Value Range
                    <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                </ZestButton>
                <ZestButton variant="ghost" size="sm" onClick={onReset} className="text-slate-500 hover:text-rose-600">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                </ZestButton>
                <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block" />
                <ZestButton variant="outline" size="sm">
                    Sort: Value
                    <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                </ZestButton>
            </div>
        </div>
    );
}
