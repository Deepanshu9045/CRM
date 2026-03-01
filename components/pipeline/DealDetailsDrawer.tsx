"use client";

import React from "react";
import { X, Calendar, DollarSign, User, Building2, Tag, ArrowRight, History, MoreVertical, Trash2, CheckCircle, XCircle, Info } from "lucide-react";
import { ZestButton } from "@/components/ui/ZestButton";
import { ZestBadge } from "@/components/ui/ZestBadge";
import { ZestAvatar } from "../ui/ZestAvatar";
import { DealDoc, PIPELINE_STAGES, DealStage, DealStatus } from "@/services/pipeline.service";
import { format } from "date-fns";

interface DealDetailsDrawerProps {
    deal: DealDoc | null;
    open: boolean;
    onClose: () => void;
    onUpdateStage: (stage: DealStage) => void;
    onUpdateStatus: (status: DealStatus) => void;
    onDelete: (id: string) => void;
}

export function DealDetailsDrawer({ deal, open, onClose, onUpdateStage, onUpdateStatus, onDelete }: DealDetailsDrawerProps) {
    if (!deal) return null;

    const currentStageIndex = PIPELINE_STAGES.indexOf(deal.stage);

    return (
        <>
            <div
                className={`fixed inset-0 z-[150] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            <div className={`fixed top-0 right-0 z-[200] h-full w-full max-w-xl bg-white shadow-2xl transition-transform duration-300 transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="h-full flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                                <Tag className="h-6 w-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">{deal.dealName}</h2>
                                <p className="text-sm text-slate-500">{deal.companyName}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => {
                                    if (confirm("Confirm delete this deal?")) {
                                        onDelete(deal.id);
                                        onClose();
                                    }
                                }}
                                className="p-2 hover:bg-rose-50 rounded-full text-slate-400 hover:text-rose-600 transition-colors"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-10">
                        {/* Quick Actions */}
                        <div className="flex items-center gap-3">
                            <ZestButton
                                variant="primary"
                                className="flex-1 bg-emerald-600 hover:bg-emerald-700 border-emerald-600"
                                onClick={() => onUpdateStatus("Won")}
                                disabled={deal.status === "Won"}
                            >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark as Won
                            </ZestButton>
                            <ZestButton
                                variant="outline"
                                className="flex-1 text-rose-600 hover:bg-rose-50 border-rose-200"
                                onClick={() => onUpdateStatus("Lost")}
                                disabled={deal.status === "Lost"}
                            >
                                <XCircle className="h-4 w-4 mr-2" />
                                Mark as Lost
                            </ZestButton>
                        </div>

                        {/* Pipeline Progress */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                                <History className="h-4 w-4 text-slate-400" />
                                Progress Tracker
                            </h3>
                            <div className="flex gap-1.5">
                                {PIPELINE_STAGES.map((s, idx) => {
                                    const isCompleted = idx < currentStageIndex;
                                    const isCurrent = idx === currentStageIndex;
                                    return (
                                        <div
                                            key={s}
                                            className={`h-2 flex-1 rounded-full transition-all ${isCompleted ? 'bg-indigo-500' : isCurrent ? 'bg-indigo-200 ring-2 ring-indigo-500/20' : 'bg-slate-100'}`}
                                            title={s}
                                        />
                                    );
                                })}
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-medium text-slate-700">Currently in: <span className="text-indigo-600 font-bold">{deal.stage}</span></span>
                                <span className="text-slate-400">{((currentStageIndex + 1) / PIPELINE_STAGES.length * 100).toFixed(0)}% Complete</span>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Deal Value</p>
                                <div className="flex items-center gap-2 text-xl font-bold text-slate-900">
                                    <DollarSign className="h-5 w-5 text-emerald-500" />
                                    {deal.value.toLocaleString()}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Probability</p>
                                <div className="flex items-center gap-2 text-xl font-bold text-slate-900">
                                    {deal.probability}%
                                    <ZestBadge variant="info" size="sm">Weighted: ${(deal.value * (deal.probability / 100)).toLocaleString()}</ZestBadge>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estimated Close</p>
                                <div className="flex items-center gap-2 text-base font-semibold text-slate-700">
                                    <Calendar className="h-4 w-4 text-slate-400" />
                                    {deal.expectedCloseDate ? format(new Date(deal.expectedCloseDate), "MMMM dd, yyyy") : "No date set"}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Assigned Rep</p>
                                <div className="flex items-center gap-2 text-base font-semibold text-slate-700">
                                    <ZestAvatar src={deal.assignedToAvatar} fallback={deal.assignedTo?.substring(0, 2).toUpperCase()} size="sm" />
                                    {deal.assignedTo}
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                                <Info className="h-4 w-4 text-slate-400" />
                                Project Notes
                            </h3>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-600 italic leading-relaxed">
                                {deal.notes || "No notes added for this deal yet."}
                            </div>
                        </div>

                        {/* Activity Timeline (Static Mock) */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                                <History className="h-4 w-4 text-slate-400" />
                                Activity Timeline
                            </h3>
                            <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
                                <div className="relative pl-8">
                                    <div className="absolute left-1.5 top-1 h-3 w-3 bg-indigo-500 rounded-full ring-4 ring-indigo-50" />
                                    <p className="text-sm font-bold text-slate-900">Deal status updated to {deal.status}</p>
                                    <p className="text-xs text-slate-400 mt-1">Just now</p>
                                </div>
                                <div className="relative pl-8">
                                    <div className="absolute left-1.5 top-1 h-3 w-3 bg-slate-300 rounded-full ring-4 ring-slate-50" />
                                    <p className="text-sm font-semibold text-slate-700">Deal moved to {deal.stage}</p>
                                    <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                        <ZestButton variant="outline" className="w-full" onClick={onClose}>Close Panel</ZestButton>
                    </div>
                </div>
            </div>
        </>
    );
}
