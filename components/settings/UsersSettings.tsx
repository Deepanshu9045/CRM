"use client";
import React from "react";
import { ZestCard, ZestCardHeader, ZestCardTitle, ZestCardContent } from "@/components/ui/ZestCard";
import { ZestButton } from "@/components/ui/ZestButton";
import { ZestAvatar } from "@/components/ui/ZestAvatar";
import { ZestBadge } from "@/components/ui/ZestBadge";
import { Plus, Edit, Trash2 } from "lucide-react";

type UserRole = "Admin" | "Manager" | "Staff";
type UserStatus = "Active" | "Invited";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatarFallback: string;
}

const users: User[] = [
  { id: "1", name: "John Doe", email: "john.doe@example.com", role: "Admin", status: "Active", avatarFallback: "JD" },
  { id: "2", name: "Jane Smith", email: "jane.smith@example.com", role: "Manager", status: "Active", avatarFallback: "JS" },
  { id: "3", name: "Sam Wilson", email: "sam.wilson@example.com", role: "Staff", status: "Active", avatarFallback: "SW" },
  { id: "4", name: "Alex Ray", email: "alex.ray@example.com", role: "Staff", status: "Invited", avatarFallback: "AR" },
];

const roleVariant: Record<UserRole, Parameters<typeof ZestBadge>[0]["variant"]> = {
  Admin: "error",
  Manager: "warning",
  Staff: "info",
};

const statusVariant: Record<UserStatus, Parameters<typeof ZestBadge>[0]["variant"]> = {
  Active: "success",
  Invited: "neutral",
};

export function UsersSettings() {
  return (
    <ZestCard>
      <ZestCardHeader>
        <ZestCardTitle>User Management</ZestCardTitle>
        <ZestButton className="gap-2">
          <Plus className="h-4 w-4" /> Invite User
        </ZestButton>
      </ZestCardHeader>
      <ZestCardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Status</th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <ZestAvatar src="" fallback={user.avatarFallback} size="md" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">{user.name}</div>
                        <div className="text-sm text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ZestBadge variant={roleVariant[user.role]}>{user.role}</ZestBadge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ZestBadge variant={statusVariant[user.status]}>{user.status}</ZestBadge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <ZestButton variant="ghost" className="h-8 px-2" aria-label="Edit"><Edit className="h-4 w-4" /></ZestButton>
                      <ZestButton variant="ghost" className="h-8 px-2" aria-label="Delete"><Trash2 className="h-4 w-4 text-red-500" /></ZestButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ZestCardContent>
    </ZestCard>
  );
}
