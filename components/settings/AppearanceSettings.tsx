"use client";
import React, { useState } from "react";
import { ZestCard, ZestCardHeader, ZestCardTitle, ZestCardContent } from "@/components/ui/ZestCard";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

const themes = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];

export function AppearanceSettings() {
  const [activeTheme, setActiveTheme] = useState<Theme>("system");

  return (
    <ZestCard>
      <ZestCardHeader>
        <ZestCardTitle>Appearance</ZestCardTitle>
      </ZestCardHeader>
      <ZestCardContent>
        <p className="text-sm text-slate-600 mb-4">Choose how ZestCRM looks and feels. Select a theme preference.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setActiveTheme(theme.id as Theme)}
              className={cn(
                "rounded-lg border p-4 text-center transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                activeTheme === theme.id
                  ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500"
                  : "border-slate-300 bg-white hover:bg-slate-50"
              )}
            >
              <theme.icon className="mx-auto h-8 w-8 mb-2 text-slate-600" />
              <p className="font-medium text-sm text-slate-800">{theme.label}</p>
            </button>
          ))}
        </div>
      </ZestCardContent>
    </ZestCard>
  );
}
