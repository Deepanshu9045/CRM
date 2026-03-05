"use client";
import React, { useState } from "react";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { CompanySettings } from "@/components/settings/CompanySettings";
import { UsersSettings } from "@/components/settings/UsersSettings";
import { InvoiceSettings } from "@/components/settings/InvoiceSettings";
import { NotificationsSettings } from "@/components/settings/NotificationsSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";

type SettingsSection = "profile" | "company" | "users" | "invoice" | "notifications" | "security" | "appearance";

const sectionComponents: Record<SettingsSection, React.ComponentType> = {
  profile: ProfileSettings,
  company: CompanySettings,
  users: UsersSettings,
  invoice: InvoiceSettings,
  notifications: NotificationsSettings,
  security: SecuritySettings,
  appearance: AppearanceSettings,
};

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile");
  const ActiveComponent = sectionComponents[activeSection];

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
      <div className="md:col-span-1">
        <SettingsSidebar activeSection={activeSection} onSelectSection={setActiveSection} />
      </div>
      <div className="md:col-span-3">
        <ActiveComponent />
      </div>
    </div>
  );
}
