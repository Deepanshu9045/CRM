"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ZestCard } from "@/components/ui/ZestCard";
import { ZestBadge } from "@/components/ui/ZestBadge";
import { ZestAvatar } from "../ui/ZestAvatar";
import { Calendar, DollarSign, GripVertical } from "lucide-react";
import { DealDoc } from "@/services/pipeline.service";
import { format } from "date-fns";

interface DealCardProps {
    deal: DealDoc;
    onClick: (deal: DealDoc) => void;
}

export function DealCard({ deal, onClick }: DealCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: deal.id,
        data: {
            type: "Deal",
            deal,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const getPriorityColor = (priority: string): any => {
        switch (priority) {
            case "Urgent": return "error";
            case "High": return "warning";
            case "Medium": return "info";
            case "Low": return "default";
            default: return "default";
        }
    };

    return (
        <div ref={setNodeRef} style={style} className="touch-none">
            <ZestCard
                className="p-3 mb-3 cursor-pointer hover:shadow-md transition-all group border-l-4 border-l-transparent hover:border-l-indigo-500"
                onClick={() => onClick(deal)}
            >
                <div className="flex items-start justify-between mb-2">
                    <ZestBadge variant={getPriorityColor(deal.priority) as any} size="sm">
                        {deal.priority}
                    </ZestBadge>
                    <div {...attributes} {...listeners} className="p-1 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing text-slate-400 hover:text-slate-600 transition-opacity">
                        <GripVertical className="h-4 w-4" />
                    </div>
                </div>

                <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">{deal.dealName}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{deal.companyName}</p>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 flex items-center">
                            <DollarSign className="h-3 w-3 mr-0.5 text-emerald-500" />
                            {deal.value.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5 flex items-center">
                            <Calendar className="h-2.5 w-2.5 mr-1" />
                            {deal.expectedCloseDate ? format(new Date(deal.expectedCloseDate), "MMM dd") : "No date"}
                        </span>
                    </div>

                    <ZestAvatar
                        src={deal.assignedToAvatar}
                        fallback={deal.assignedTo?.substring(0, 2).toUpperCase() || "UN"}
                        size="sm"
                    />
                </div>
            </ZestCard>
        </div>
    );
}
