"use client";

import React, { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Profile, Vehicle, UserRole } from "@/types/database.types";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate } from "@/lib/utils";
import {
  Users,
  Crown,
  User as UserIcon,
  Phone,
  Calendar,
  Car,
  Gauge,
  Info,
  X,
  Fuel,
  Bike,
  Clock,
  Navigation,
  Hash,
  Activity,
  Layers,
} from "lucide-react";
import { UserDetailsModal } from "./UserDetailsModal";

interface UserTableClientProps {
  initialUsers: Profile[];
  currentAdminRole?: UserRole;
}

export function UserTableClient({ initialUsers }: UserTableClientProps) {
  const users = initialUsers;
  const [selectedUserForDetails, setSelectedUserForDetails] = useState<Profile | null>(null);

  const totalUsers = users.length;
  const totalVehiclesCount = users.reduce((acc, u) => acc + (u.vehicles?.length || 0), 0);
  const proUsers = users.filter((u) => {
    const isProFlag = Boolean(u.is_pro);
    const planName = (u.plan_name || u.subscription_plan || u.plan_type || "").toLowerCase();
    const isFree =
      planName === "free" ||
      planName === "free plan" ||
      planName === "free user" ||
      planName === "free tier";
    return isProFlag || (!isFree && (planName.includes("pro") || planName.includes("standard") || planName.includes("premium")));
  }).length;
  const freeUsers = Math.max(0, totalUsers - proUsers);

  const columns: ColumnDef<Profile, unknown>[] = [
    {
      accessorKey: "full_name",
      header: "User Details",
      cell: ({ row }) => {
        const u = row.original;
        const name = u.full_name || "Unnamed User";
        const initials = (u.full_name || u.email || "U").slice(0, 2).toUpperCase();
        const isVerified = Boolean(u.is_verified);

        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 text-white font-extrabold flex items-center justify-center text-xs shadow-md ring-1 ring-orange-500/30 shrink-0">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="font-bold text-xs text-white">{name}</p>
                {isVerified ? (
                  <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    ✓ Verified
                  </span>
                ) : (
                  <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-slate-500/10 text-slate-400 font-normal">
                    Unverified
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">{u.email}</p>
              <div className="flex items-center gap-2 mt-0.5 text-[10.5px] text-slate-400">
                {u.phone && (
                  <span className="flex items-center gap-1 font-mono">
                    <Phone className="w-2.5 h-2.5 text-orange-400 shrink-0" />
                    <span>{u.phone}</span>
                  </span>
                )}
                {u.gender && (
                  <span className="text-slate-500 capitalize">({u.gender})</span>
                )}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "subscription_plan",
      header: "Plan, Purchase & Expiry Dates",
      cell: ({ row }) => {
        const u = row.original;
        const plan = u.plan_name || u.subscription_plan || "Free";
        const isPro =
          u.is_pro ||
          (u.plan_type && u.plan_type.toLowerCase() !== "free") ||
          (plan.toLowerCase() !== "free user" &&
            plan.toLowerCase() !== "free plan" &&
            plan.toLowerCase() !== "free");

        const subStatus = u.subscription_status || (isPro ? "active" : "inactive");
        const startDate = u.plan_start_date || u.created_at;
        const expireDate = u.plan_expiration_date || u.subscription_expires_at;

        return (
          <div className="space-y-1.5 max-w-xs">
            {/* Plan Badge */}
            <div className="flex items-center gap-1.5">
              {isPro ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/10 text-orange-400 border border-orange-500/35 shadow-xs">
                  <Crown className="h-3 w-3 text-orange-400 fill-orange-400 shrink-0" />
                  <span>{plan.startsWith("Pro") ? plan : `Pro • ${plan}`}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/5 text-slate-300 border border-white/10">
                  <UserIcon className="h-3 w-3 text-slate-400 shrink-0" />
                  <span>Free Plan</span>
                </span>
              )}

              <span
                className={`text-[9.5px] px-1.5 py-0.2 rounded font-bold uppercase ${
                  subStatus === "active"
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                    : "bg-slate-500/15 text-slate-400 border border-white/5"
                }`}
              >
                {subStatus}
              </span>
            </div>

            {/* Purchase & Expiration Timeline */}
            <div className="text-[10.5px] space-y-0.5 font-mono">
              <div className="flex items-center gap-1 text-slate-300">
                <span className="text-slate-500 font-sans text-[10px]">Purchase:</span>
                <span className="text-white font-medium">{formatDate(startDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-slate-500 font-sans text-[10px]">Expires:</span>
                <span className={`font-semibold ${expireDate ? "text-orange-400" : "text-slate-400"}`}>
                  {expireDate ? formatDate(expireDate) : (isPro ? "Lifetime / Ongoing" : "No Expiry (Free)")}
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      id: "vehicles_summary",
      header: "Vehicles (Model & Number)",
      cell: ({ row }) => {
        const u = row.original;
        const vehicles = u.vehicles || [];
        const count = vehicles.length;

        if (count === 0) {
          return (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Car className="h-3.5 w-3.5 opacity-50" />
              <span className="italic">0 Vehicles</span>
            </div>
          );
        }

        return (
          <div className="space-y-1.5 max-w-sm">
            <button
              onClick={() => setSelectedUserForDetails(u)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-400 text-xs font-bold transition-all group"
            >
              <Car className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
              <span>{count} {count === 1 ? "Vehicle" : "Vehicles"}</span>
              <span className="text-[10px] bg-orange-500 text-black font-extrabold px-1 rounded-sm ml-0.5">View All Specs</span>
            </button>

            {/* Quick Preview of Vehicle Models & Numbers */}
            <div className="space-y-1">
              {vehicles.slice(0, 2).map((v: Vehicle, idx: number) => {
                const modelName = v.vehicle_model || (v as any).name || (v as any).brand || `Vehicle #${idx + 1}`;
                const number = v.vehicle_number || (v as any).license_plate || null;
                const isBike = (v.vehicle_type || "").toLowerCase().includes("bike") || (v.vehicle_type || "").toLowerCase().includes("motorcycle");

                return (
                  <div
                    key={v.id || idx}
                    className="flex items-center gap-1.5 text-[11px] text-slate-200 truncate"
                  >
                    {isBike ? (
                      <Bike className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                    ) : (
                      <Car className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                    )}
                    <span className="font-bold text-white truncate">{modelName}</span>
                    {v.vehicle_type && (
                      <span className="text-[10px] text-slate-400 capitalize">({v.vehicle_type})</span>
                    )}
                    {number && (
                      <span className="px-1.5 py-0.2 rounded bg-white/5 border border-white/10 font-mono text-[9.5px] text-slate-300">
                        {number}
                      </span>
                    )}
                  </div>
                );
              })}
              {count > 2 && (
                <p className="text-[10px] text-orange-400/90 pl-5 font-semibold">
                  +{count - 2} more vehicle(s)...
                </p>
              )}
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
      accessorKey: "created_at",
      header: "Joined Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Calendar className="h-3 w-3 text-slate-500 shrink-0" />
          <span>{formatDate(row.original.created_at)}</span>
        </div>
      ),
    },
    {
      id: "full_details_btn",
      header: "Details",
      cell: ({ row }) => {
        const u = row.original;
        return (
          <button
            onClick={() => setSelectedUserForDetails(u)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/25 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors shadow-xs"
          >
            <Info className="h-3.5 w-3.5 text-orange-400" />
            <span>Full Profile</span>
          </button>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Clean Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl p-5 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Users
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
              Total Tracked Vehicles
            </span>
            <p className="text-2xl font-extrabold text-blue-400 mt-1">{totalVehiclesCount}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Car className="h-5 w-5" />
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
            <Crown className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-2xl p-5 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Free Plan Users
            </span>
            <p className="text-2xl font-extrabold text-slate-300 mt-1">{freeUsers}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
            <UserIcon className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Profiles & Vehicles Database Table */}
      <DataTable
        columns={columns}
        data={users}
        searchPlaceholder="Search by user name, email, vehicle model, vehicle number..."
        emptyMessage="No profiles found in database."
      />

      {/* ── Comprehensive User & ALL Vehicles Detailed Modal ── */}
      <UserDetailsModal
        user={selectedUserForDetails}
        onClose={() => setSelectedUserForDetails(null)}
      />
    </div>
  );
}
