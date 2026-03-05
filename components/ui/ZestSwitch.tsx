"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface ZestSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}

export function ZestSwitch({ checked, onChange, id }: ZestSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      id={id}
      className={cn(
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        checked ? "bg-indigo-600" : "bg-slate-200"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}
