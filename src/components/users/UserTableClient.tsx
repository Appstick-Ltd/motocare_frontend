"use client";

import React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Profile, UserRole } from "@/types/database.types";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate } from "@/lib/utils";
import {
  Users,
  Crown,
  User as UserIcon,
  Phone,
  Calendar,
  Fingerprint,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

interface UserTableClientProps {
  initialUsers: Profile[];
  currentAdminRole?: UserRole;
}

export function UserTableClient({ initialUsers }: UserTableClientProps) {
  const users = initialUsers;

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active" || !u.status).length;
  const proUsers = users.filter(
    (u) =>
      u.is_pro ||
      (u.subscription_plan &&
        u.subscription_plan.toLowerCase() !== "free user" &&
        u.subscription_plan.toLowerCase() !== "free")
  ).length;

  const columns: ColumnDef<Profile, unknown>[] = [
    {
      accessorKey: "id",
      header: "User ID",
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
            <Fingerprint className="h-3.5 w-3.5 text-orange-400 shrink-0" />
            <span title={id} className="cursor-help">
              {id.length > 12 ? `${id.slice(0, 8)}...${id.slice(-4)}` : id}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "full_name",
      header: "Full Name & Email",
      cell: ({ row }) => {
        const u = row.original;
        const name = u.full_name || "Unnamed User";
        const initials = (u.full_name || u.email || "U").slice(0, 2).toUpperCase();

        return (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 text-white font-extrabold flex items-center justify-center text-xs shadow-md ring-1 ring-orange-500/30 shrink-0">
              {initials}
            </div>
            <div>
              <p className="font-bold text-xs text-white">{name}</p>
              <p className="text-[11px] text-slate-400">{u.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "phone",
      header: "Phone Number",
      cell: ({ row }) => {
        const phone = row.original.phone;
        if (!phone) {
          return <span className="text-slate-500 text-xs italic">Not provided</span>;
        }
        return (
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
            <Phone className="h-3 w-3 text-orange-400 shrink-0" />
            <span>{phone}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Privilege Role",
      cell: ({ row }) => <StatusBadge status={row.original.role} />,
    },
    {
      accessorKey: "subscription_plan",
      header: "Subscription Plan",
      cell: ({ row }) => {
        const u = row.original;
        const plan = u.subscription_plan;
        const isPro =
          u.is_pro ||
          (plan &&
            plan.toLowerCase() !== "free user" &&
            plan.toLowerCase() !== "free");

        if (isPro) {
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-orange-400 border border-orange-500/30 shadow-xs">
              <Crown className="h-3 w-3 text-orange-400 fill-orange-400 shrink-0" />
              <span>Pro ({plan || "Pro Plan"})</span>
            </span>
          );
        }

        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/5 text-slate-300 border border-white/10">
            <UserIcon className="h-3 w-3 text-slate-400 shrink-0" />
            <span>{plan || "Free User"}</span>
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
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Calendar className="h-3 w-3 text-slate-500 shrink-0" />
          <span>{formatDate(row.original.created_at)}</span>
        </div>
      ),
    },
    {
      accessorKey: "updated_at",
      header: "Last Updated",
      cell: ({ row }) => {
        const updated = row.original.updated_at;
        return (
          <span className="text-xs text-slate-400">
            {updated ? formatDate(updated) : "—"}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* 3 Metric Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl p-5 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Profiles
            </span>
            <p className="text-2xl font-extrabold text-white mt-1">{totalUsers}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <Users className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-2xl p-5 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Accounts
            </span>
            <p className="text-2xl font-extrabold text-emerald-400 mt-1">{activeUsers}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-2xl p-5 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pro Members
            </span>
            <p className="text-2xl font-extrabold text-amber-400 mt-1">{proUsers}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Profiles Database Table */}
      <DataTable
        columns={columns}
        data={users}
        searchPlaceholder="Search profiles by name, email, phone, user ID..."
        emptyMessage="No profiles found in database."
      />
    </div>
  );
}
