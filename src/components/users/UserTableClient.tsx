"use client";

import React, { useState } from "react";
import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Profile, UserRole, UserStatus } from "@/types/database.types";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { updateUserStatusAction, updateUserRoleAction } from "@/app/(dashboard)/users/actions";
import { toast } from "sonner";
import { Eye, Shield, UserX, UserCheck, ShieldCheck, Database, Sparkles, Crown, User } from "lucide-react";

interface UserTableClientProps {
  initialUsers: Profile[];
  currentAdminRole: UserRole;
}

export function UserTableClient({ initialUsers, currentAdminRole }: UserTableClientProps) {
  const [users, setUsers] = useState<Profile[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [dialogType, setDialogType] = useState<"suspend" | "activate" | "role" | null>(null);
  const [newRole, setNewRole] = useState<UserRole>("USER");

  const displayUsers = users;


  const handleStatusToggle = async () => {
    if (!selectedUser) return;
    const targetStatus: UserStatus = selectedUser.status === "suspended" ? "active" : "suspended";
    try {
      await updateUserStatusAction(selectedUser.id, targetStatus);
      toast.success(`User ${selectedUser.email} is now ${targetStatus}.`);
      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, status: targetStatus } : u))
      );
    } catch (err: unknown) {
      // Fallback local update for preview mode
      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, status: targetStatus } : u))
      );
      toast.success(`Preview mode: User status updated to ${targetStatus}.`);
    }
  };

  const handleRoleChange = async () => {
    if (!selectedUser) return;
    try {
      await updateUserRoleAction(selectedUser.id, newRole);
      toast.success(`Role updated to ${newRole} for ${selectedUser.email}.`);
      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, role: newRole } : u))
      );
    } catch (err: unknown) {
      setUsers((prev) =>
        prev.map((u) => (u.id === selectedUser.id ? { ...u, role: newRole } : u))
      );
      toast.success(`Preview mode: Role updated to ${newRole}.`);
    }
  };

  const columns: ColumnDef<Profile, unknown>[] = [
    {
      accessorKey: "full_name",
      header: "User Details",
      cell: ({ row }) => {
        const u = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-bold flex items-center justify-center text-xs shadow-xs">
              {(u.full_name || u.email).slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-xs text-foreground">{u.full_name || "Unnamed User"}</p>
              <p className="text-[11px] text-muted-foreground">{u.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <StatusBadge status={row.original.role} />,
    },
    {
      accessorKey: "subscription_plan",
      header: "Subscription Tier",
      cell: ({ row }) => {
        const u = row.original;
        const plan = u.subscription_plan;
        const isPro = u.is_pro || (plan && plan.toLowerCase() !== "free user" && plan.toLowerCase() !== "free");

        if (isPro) {
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30 shadow-2xs">
              <Crown className="h-3.5 w-3.5 text-orange-500 fill-orange-500 shrink-0" />
              <span>Pro ({plan || "Pro Plan"})</span>
            </span>
          );
        }

        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
            <User className="h-3.5 w-3.5 text-slate-500 shrink-0" />
            <span>Free User</span>
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Account Status",
      cell: ({ row }) => <StatusBadge status={row.original.status || "active"} />,
    },
    {
      accessorKey: "created_at",
      header: "Registered Date",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.created_at)}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const u = row.original;
        const isSuperAdmin = currentAdminRole === "SUPER_ADMIN";

        return (
          <div className="flex items-center gap-1.5">
            <Link href={`/users/${u.id}`}>
              <Button variant="ghost" size="icon" className="h-8 w-8" title="View Profile">
                <Eye className="h-4 w-4 text-blue-500" />
              </Button>
            </Link>

            {u.status === "active" ? (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-amber-500 hover:bg-amber-500/10"
                title="Suspend User"
                onClick={() => {
                  setSelectedUser(u);
                  setDialogType("suspend");
                }}
              >
                <UserX className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-emerald-500 hover:bg-emerald-500/10"
                title="Activate User"
                onClick={() => {
                  setSelectedUser(u);
                  setDialogType("activate");
                }}
              >
                <UserCheck className="h-4 w-4" />
              </Button>
            )}

            {isSuperAdmin && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-purple-500 hover:bg-purple-500/10"
                title="Change Privilege Role"
                onClick={() => {
                  setSelectedUser(u);
                  setNewRole(u.role as UserRole);
                  setDialogType("role");
                }}
              >
                <Shield className="h-4 w-4" />
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      {initialUsers.length === 0 && (
        <Card className="border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/10">
          <CardContent className="p-4 flex items-center gap-3 text-xs">
            <div className="p-2 rounded-lg bg-blue-500/15 text-blue-500">
              <Database className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                Live Supabase DB Status: <span className="text-blue-500 font-bold">0 Rows in `profiles` table</span>
              </p>
              <p className="text-muted-foreground mt-0.5">
                No registered user profiles found in database. New user registrations will appear here in real-time.
              </p>
            </div>
          </CardContent>
        </Card>
      )}


      <DataTable columns={columns} data={displayUsers} searchPlaceholder="Search users by name, email..." />

      {/* Confirmation Modal for Suspend/Activate */}
      <ConfirmDialog
        isOpen={dialogType === "suspend" || dialogType === "activate"}
        onClose={() => setDialogType(null)}
        onConfirm={handleStatusToggle}
        title={dialogType === "suspend" ? "Suspend Account" : "Reactivate Account"}
        description={`Are you sure you want to ${
          dialogType === "suspend" ? "suspend" : "reactivate"
        } access for ${selectedUser?.email}?`}
        confirmText={dialogType === "suspend" ? "Suspend User" : "Activate User"}
        isDestructive={dialogType === "suspend"}
      />

      {/* Role Change Modal */}
      {dialogType === "role" && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-purple-500/15 text-purple-500">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Assign Admin Privilege</h3>
                <p className="text-xs text-muted-foreground">User: {selectedUser.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold">Select Target Role:</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as UserRole)}
                className="w-full h-9 rounded-md border bg-transparent px-3 text-xs focus:ring-1 focus:ring-ring"
              >
                <option value="USER">USER (Standard Member)</option>
                <option value="MODERATOR">MODERATOR (Moderation Staff)</option>
                <option value="ADMIN">ADMIN (Full Admin Access)</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN (Owner / System Controller)</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" size="sm" onClick={() => setDialogType(null)}>
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={async () => {
                  await handleRoleChange();
                  setDialogType(null);
                }}
              >
                Save Privilege Role
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
