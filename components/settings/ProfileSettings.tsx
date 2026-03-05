"use client";
import React, { useState } from "react";
import { ZestCard, ZestCardHeader, ZestCardTitle, ZestCardContent } from "@/components/ui/ZestCard";
import { ZestButton } from "@/components/ui/ZestButton";
import { ZestAvatar } from "@/components/ui/ZestAvatar";

export function ProfileSettings() {
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  });
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd call an API here.
    alert("Profile updated!");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd call an API here.
    if (password.new !== password.confirm) {
      alert("New passwords do not match.");
      return;
    }
    alert("Password changed!");
  };

  return (
    <div className="space-y-8">
      <ZestCard>
        <ZestCardHeader>
          <ZestCardTitle>Profile Information</ZestCardTitle>
        </ZestCardHeader>
        <ZestCardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="flex items-center gap-4">
              <ZestAvatar fallback="JD" size="lg" />
              <div>
                <ZestButton type="button" variant="outline">Change Picture</ZestButton>
                <p className="text-xs text-slate-500 mt-1">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
                <input value={profile.fullName} onChange={(e) => setProfile(p => ({...p, fullName: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Email Address</label>
                <input type="email" value={profile.email} onChange={(e) => setProfile(p => ({...p, email: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Phone Number</label>
                <input value={profile.phone} onChange={(e) => setProfile(p => ({...p, phone: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
              </div>
            </div>
            <div className="flex justify-end">
              <ZestButton type="submit">Update Profile</ZestButton>
            </div>
          </form>
        </ZestCardContent>
      </ZestCard>

      <ZestCard>
        <ZestCardHeader>
          <ZestCardTitle>Change Password</ZestCardTitle>
        </ZestCardHeader>
        <ZestCardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Current Password</label>
              <input type="password" value={password.current} onChange={(e) => setPassword(p => ({...p, current: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">New Password</label>
              <input type="password" value={password.new} onChange={(e) => setPassword(p => ({...p, new: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Confirm New Password</label>
              <input type="password" value={password.confirm} onChange={(e) => setPassword(p => ({...p, confirm: e.target.value}))} className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none ring-indigo-500 focus:ring-2" />
            </div>
            <div className="flex justify-end">
              <ZestButton type="submit">Change Password</ZestButton>
            </div>
          </form>
        </ZestCardContent>
      </ZestCard>
    </div>
  );
}
