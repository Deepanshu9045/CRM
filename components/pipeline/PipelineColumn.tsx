"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DealDoc, DealStage } from "@/services/pipeline.service";
import { DealCard } from "./DealCard";
import { Plus, MoreHorizontal } from "lucide-react";

interface PipelineColumnProps {
    stage: DealStage;
    deals: DealDoc[];
    onDealClick: (deal: DealDoc) => void;
    onAddDeal: (stage: DealStage) => void;
}

export function PipelineColumn({ stage, deals, onDealClick, onAddDeal }: PipelineColumnProps) {
    const { setNodeRef } = useDroppable({
        id: stage,
        data: {
            type: "Column",
            stage,
        },
    });

    const totalValue = deals.reduce((acc, d) => acc + d.value, 0);

    return (
        <div className="flex flex-col w-72 min-w-[18rem] bg-slate-50/50 rounded-xl border border-slate-200/60 p-3 h-full max-h-screen overflow-hidden">
            <div className="flex items-center justify-between mb-4 px-1">
                <div>
                    <h3 className="text-sm font-bold text-slate-900">{stage}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-600">
                            {deals.length}
                        </span>
                        <span className="text-[10px] font-bold text-indigo-600">
                            ${totalValue.toLocaleString()}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => onAddDeal(stage)}
                        className="p-1 hover:bg-white rounded-md text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-white rounded-md text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div
                ref={setNodeRef}
                className="flex-1 overflow-y-auto min-h-[200px] scrollbar-hide py-1"
            >
                <SortableContext items={deals.map(d => d.id)} strategy={verticalListSortingStrategy}>
                    {deals.map(deal => (
                        <DealCard key={deal.id} deal={deal} onClick={onDealClick} />
                    ))}
                </SortableContext>

                {deals.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 rounded-lg text-slate-400">
                        <p className="text-[10px] font-medium">No deals in this stage</p>
                    </div>
                )}
            </div>
        </div>
    );
}
