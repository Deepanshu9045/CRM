"use client";
import React from "react";
import { User, Building, Users, FileText, Bell, Lock, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "company", label: "Company", icon: Building },
  { id: "users", label: "Users", icon: Users },
  { id: "invoice", label: "Invoice", icon: FileText },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "appearance", label: "Appearance", icon: Sun },
];

type SettingsSection = "profile" | "company" | "users" | "invoice" | "notifications" | "security" | "appearance";

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSelectSection: (section: SettingsSection) => void;
}

export function SettingsSidebar({ activeSection, onSelectSection }: SettingsSidebarProps) {
  return (
    <nav className="space-y-1">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => onSelectSection(section.id as SettingsSection)}
          className={cn(
            "group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium",
            activeSection === section.id
              ? "bg-indigo-50 text-indigo-700"
              : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          )}
        >
          <section.icon
            className={cn(
              "mr-3 h-5 w-5 flex-shrink-0",
              activeSection === section.id ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-500"
            )}
            aria-hidden="true"
          />
          {section.label}
        </button>
      ))}
    </nav>
  );
}
