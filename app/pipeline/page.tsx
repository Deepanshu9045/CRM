"use client";

import React, { useEffect, useState } from "react";
import { PipelineHeader } from "@/components/pipeline/PipelineHeader";
import { PipelineStats } from "@/components/pipeline/PipelineStats";
import { PipelineFilters } from "@/components/pipeline/PipelineFilters";
import { PipelineBoard } from "@/components/pipeline/PipelineBoard";
import { AddDealModal } from "@/components/pipeline/AddDealModal";
import { DealDetailsDrawer } from "@/components/pipeline/DealDetailsDrawer";
import { PipelineAnalytics } from "@/components/pipeline/PipelineAnalytics";
import { ZestLoader } from "@/components/ui/ZestLoader";
import {
    DealDoc,
    DealStage,
    CreateDealPayload,
    listDeals,
    addDeal,
    updateDeal,
    deleteDeal,
    DealStatus,
} from "@/services/pipeline.service";

export default function PipelinePage() {
    const [deals, setDeals] = useState<DealDoc[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // Modals & Panels
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedDeal, setSelectedDeal] = useState<DealDoc | null>(null);
    const [defaultStage, setDefaultStage] = useState<DealStage>("Lead In");

    const fetchDeals = async () => {
        setLoading(true);
        try {
            const data = await listDeals();
            setDeals(data);
        } catch (err) {
            console.error("Failed to fetch deals:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeals();
    }, []);

    const handleAddDeal = (stage?: DealStage) => {
        setDefaultStage(stage || "Lead In");
        setIsAddModalOpen(true);
    };

    const handleCreateDeal = async (payload: CreateDealPayload) => {
        await addDeal(payload);
        await fetchDeals();
    };

    const handleDealClick = (deal: DealDoc) => {
        setSelectedDeal(deal);
        setIsDrawerOpen(true);
    };

    const handleStageChange = async (dealId: string, newStage: DealStage) => {
        // Optimistic update
        setDeals(prev => prev.map(d => d.id === dealId ? { ...d, stage: newStage } : d));

        try {
            await updateDeal(dealId, { stage: newStage });
        } catch (err) {
            console.error("Failed to update stage:", err);
            await fetchDeals(); // Rollback
        }
    };

    const handleStatusUpdate = async (status: DealStatus) => {
        if (!selectedDeal) return;
        await updateDeal(selectedDeal.id, { status });
        setIsDrawerOpen(false);
        await fetchDeals();
    };

    const handleDelete = async (id: string) => {
        await deleteDeal(id);
        await fetchDeals();
    };

    const filteredDeals = deals.filter(deal =>
        deal.dealName.toLowerCase().includes(search.toLowerCase()) ||
        deal.companyName.toLowerCase().includes(search.toLowerCase())
    );

    if (loading && deals.length === 0) {
        return (
            <div className="h-[70vh] flex items-center justify-center">
                <ZestLoader />
            </div>
        );
    }

    return (
        <>
            <PipelineHeader onAddDeal={() => handleAddDeal()} />

            <PipelineStats deals={deals} />

            <PipelineFilters
                search={search}
                onSearchChange={setSearch}
                onReset={() => setSearch("")}
            />

            <PipelineBoard
                deals={filteredDeals}
                onStageChange={handleStageChange}
                onDealClick={handleDealClick}
                onAddDeal={handleAddDeal}
            />

            <AddDealModal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleCreateDeal}
                initialData={undefined} // Could be extended for edit
            />

            <DealDetailsDrawer
                open={isDrawerOpen}
                deal={selectedDeal}
                onClose={() => setIsDrawerOpen(false)}
                onUpdateStage={(s) => handleStageChange(selectedDeal!.id, s)}
                onUpdateStatus={handleStatusUpdate}
                onDelete={handleDelete}
            />

            <PipelineAnalytics deals={deals} />
        </>
    );
}
