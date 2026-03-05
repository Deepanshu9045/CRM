"use client";
import React, { useState } from "react";
import { ZestCard, ZestCardHeader, ZestCardTitle, ZestCardContent } from "@/components/ui/ZestCard";
import { ZestSwitch } from "@/components/ui/ZestSwitch";

const notificationOptions = [
  { id: "email-notifications", label: "Email Notifications", description: "Receive email updates for important activities." },
  { id: "invoice-alerts", label: "Invoice Payment Alerts", description: "Get notified when an invoice is paid." },
  { id: "task-reminders", label: "Task Reminders", description: "Receive reminders for upcoming and overdue tasks." },
  { id: "system-updates", label: "System Updates", description: "Stay informed about new features and system maintenance." },
];

export function NotificationsSettings() {
  const [notifications, setNotifications] = useState({
    "email-notifications": true,
    "invoice-alerts": true,
    "task-reminders": false,
    "system-updates": true,
  });

  const handleToggle = (id: string, checked: boolean) => {
    setNotifications(n => ({ ...n, [id]: checked }));
    // In a real app, you'd probably save this preference immediately.
  };

  return (
    <ZestCard>
      <ZestCardHeader>
        <ZestCardTitle>Notification Settings</ZestCardTitle>
      </ZestCardHeader>
      <ZestCardContent>
        <div className="divide-y divide-slate-200">
          {notificationOptions.map((option) => (
            <div key={option.id} className="flex items-center justify-between py-4">
              <div>
                <label htmlFor={option.id} className="block text-sm font-medium text-slate-900">{option.label}</label>
                <p className="text-sm text-slate-500">{option.description}</p>
              </div>
              <ZestSwitch
                id={option.id}
                checked={notifications[option.id as keyof typeof notifications]}
                onChange={(checked) => handleToggle(option.id, checked)}
              />
            </div>
          ))}
        </div>
      </ZestCardContent>
    </ZestCard>
  );
}
