"use client";
import React from "react";
import { ZestCard, ZestCardHeader, ZestCardTitle, ZestCardContent } from "@/components/ui/ZestCard";
import { ZestButton } from "@/components/ui/ZestButton";
import { ShieldCheck, LogOut, KeyRound } from "lucide-react";
import { ZestBadge } from "../ui/ZestBadge";

const loginActivity = [
    { id: 1, device: "Chrome on macOS", location: "San Francisco, CA", time: "2 hours ago", current: true },
    { id: 2, device: "ZestCRM iOS App", location: "San Francisco, CA", time: "1 day ago", current: false },
    { id: 3, device: "Safari on macOS", location: "New York, NY", time: "3 days ago", current: false },
];

export function SecuritySettings() {
  return (
    <div className="space-y-8">
      <ZestCard>
        <ZestCardHeader>
          <ZestCardTitle>Account Security</ZestCardTitle>
        </ZestCardHeader>
        <ZestCardContent className="divide-y divide-slate-200">
          <div className="py-4 flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-800">Change Password</h4>
              <p className="text-sm text-slate-500">It's a good idea to use a strong password that you're not using elsewhere.</p>
            </div>
            <ZestButton variant="outline" className="gap-2"><KeyRound className="h-4 w-4" /> Change</ZestButton>
          </div>
          <div className="py-4 flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-800">Two-Factor Authentication</h4>
              <p className="text-sm text-slate-500">Add an extra layer of security to your account.</p>
            </div>
            <ZestButton variant="outline" className="gap-2"><ShieldCheck className="h-4 w-4" /> Enable</ZestButton>
          </div>
          <div className="py-4 flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-800">Log out from all devices</h4>
              <p className="text-sm text-slate-500">This will sign you out of all other active sessions.</p>
            </div>
            <ZestButton variant="outline" className="gap-2 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700"><LogOut className="h-4 w-4" /> Log out all</ZestButton>
          </div>
        </ZestCardContent>
      </ZestCard>

      <ZestCard>
        <ZestCardHeader>
          <ZestCardTitle>Login Activity</ZestCardTitle>
        </ZestCardHeader>
        <ZestCardContent>
          <ul className="divide-y divide-slate-200">
            {loginActivity.map(activity => (
              <li key={activity.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-800">{activity.device}</p>
                  <p className="text-sm text-slate-500">{activity.location} &middot; {activity.time}</p>
                </div>
                {activity.current && <ZestBadge variant="success">Current session</ZestBadge>}
              </li>
            ))}
          </ul>
        </ZestCardContent>
      </ZestCard>
    </div>
  );
}
