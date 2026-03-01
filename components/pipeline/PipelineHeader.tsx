"use client";

import React from "react";
import { ZestButton } from "@/components/ui/ZestButton";
import { Settings, Plus } from "lucide-react";

interface PipelineHeaderProps {
    onAddDeal: () => void;
}

export function PipelineHeader({ onAddDeal }: PipelineHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sales Pipeline</h1>
                <p className="text-slate-500 mt-1">
                    Track deals, monitor revenue, and close opportunities faster.
                </p>
            </div>
            <div className="flex items-center gap-3">
                <ZestButton variant="outline" size="md">
                    <Settings className="h-4 w-4 mr-2" />
                    Pipeline Settings
                </ZestButton>
                <ZestButton variant="primary" size="md" onClick={onAddDeal}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Deal
                </ZestButton>
            </div>
        </div>
    );
}
