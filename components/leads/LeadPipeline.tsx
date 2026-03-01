import React from "react";
import { ZestCard } from "@/components/ui/ZestCard";

const stages = ["New", "Contacted", "Qualified", "Proposal Sent", "Converted", "Lost"];

export function LeadPipeline() {
  return (
    <ZestCard>
      <h3 className="mb-3 text-sm font-semibold text-slate-700">Lead Status Flow</h3>
      <div className="flex flex-wrap items-center gap-3">
        {stages.map((s, i) => (
          <React.Fragment key={s}>
            <div className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200">
              {s}
            </div>
            {i < stages.length - 1 && (
              <span className="text-slate-400">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </ZestCard>
  );
}
