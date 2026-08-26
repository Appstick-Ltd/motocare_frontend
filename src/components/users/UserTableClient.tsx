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

interface UserTableClientProps {
  initialUsers: Profile[];
  currentAdminRole?: UserRole;
}

export function UserTableClient({ initialUsers }: UserTableClientProps) {
  const users = initialUsers;
  const [selectedUserForDetails, setSelectedUserForDetails] = useState<Profile | null>(null);

  const totalUsers = users.length;
  const totalVehiclesCount = users.reduce((acc, u) => acc + (u.vehicles?.length || 0), 0);
  const proUsers = users.filter(
    (u) =>
      u.is_pro ||
      (u.subscription_plan &&
        u.subscription_plan.toLowerCase() !== "free user" &&
        u.subscription_plan.toLowerCase() !== "free")
  ).length;
  const freeUsers = totalUsers - proUsers;

  const columns: ColumnDef<Profile, unknown>[] = [
    {
      accessorKey: "full_name",
      header: "User Details",
      cell: ({ row }) => {
        const u = row.original;
        const name = u.full_name || "Unnamed User";
        const initials = (u.full_name || u.email || "U").slice(0, 2).toUpperCase();

        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 text-white font-extrabold flex items-center justify-center text-xs shadow-md ring-1 ring-orange-500/30 shrink-0">
              {initials}
            </div>
            <div>
              <p className="font-bold text-xs text-white">{name}</p>
              <p className="text-[11px] text-slate-400">{u.email}</p>
              {u.phone && (
                <p className="text-[10.5px] text-slate-400 flex items-center gap-1 mt-0.5 font-mono">
                  <Phone className="w-2.5 h-2.5 text-orange-400 shrink-0" />
                  <span>{u.phone}</span>
                </p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "subscription_plan",
      header: "Plan / Tier (Free vs Pro)",
      cell: ({ row }) => {
        const u = row.original;
        const plan = u.subscription_plan || "Free";
        const isPro =
          u.is_pro ||
          (plan.toLowerCase() !== "free user" &&
            plan.toLowerCase() !== "free");

        if (isPro) {
          return (
            <div className="flex flex-col items-start gap-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/10 text-orange-400 border border-orange-500/35 shadow-xs">
                <Crown className="h-3.5 w-3.5 text-orange-400 fill-orange-400 shrink-0" />
                <span>{plan.startsWith("Pro") ? plan : `Pro • ${plan}`}</span>
              </span>
              <span className="text-[10px] text-amber-400/80 font-medium pl-1">
                ⭐ Premium Pro Member
              </span>
            </div>
          );
        }

        return (
          <div className="flex flex-col items-start gap-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-slate-300 border border-white/10">
              <UserIcon className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>Free Plan</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium pl-1">
              Standard User
            </span>
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

      {/* ── Comprehensive User & ALL Vehicles Detailed Modal (100% Matching Schema) ── */}
      {selectedUserForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0c101c] p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedUserForDetails(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header: User Profile Overview */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-6 pr-10">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg ring-2 ring-orange-500/30 shrink-0">
                {(selectedUserForDetails.full_name || selectedUserForDetails.email || "U").slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white">
                  {selectedUserForDetails.full_name || "Unnamed User"}
                </h3>
                <p className="text-xs text-slate-400">{selectedUserForDetails.email}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <StatusBadge status={selectedUserForDetails.role} />
                  {selectedUserForDetails.is_pro ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      <Crown className="w-3 h-3" /> {selectedUserForDetails.subscription_plan}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-slate-300 border border-white/10">
                      Free User
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/20">
                    🚗 {selectedUserForDetails.vehicles?.length || 0} Total Vehicles
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Info Attributes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white/[0.02] p-4 rounded-2xl border border-white/5">
              <div>
                <span className="text-slate-500 text-[10px] block">Phone Number</span>
                <p className="font-bold text-white mt-0.5 font-mono">
                  {selectedUserForDetails.phone || "Not provided"}
                </p>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Registered On</span>
                <p className="font-bold text-white mt-0.5">
                  {formatDate(selectedUserForDetails.created_at)}
                </p>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Subscription Tier</span>
                <p className="font-bold text-orange-400 mt-0.5">
                  {selectedUserForDetails.subscription_plan || "Free"}
                </p>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Fleet Total</span>
                <p className="font-bold text-blue-400 mt-0.5">
                  {selectedUserForDetails.vehicles?.length || 0} Registered
                </p>
              </div>
            </div>

            {/* ── All Registered Vehicles from `public.vehicles` Table ── */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Car className="h-5 w-5 text-orange-400" />
                  <span>All Registered Vehicles &amp; Schema Data ({selectedUserForDetails.vehicles?.length || 0})</span>
                </h4>
              </div>

              {selectedUserForDetails.vehicles && selectedUserForDetails.vehicles.length > 0 ? (
                <div className="space-y-4">
                  {selectedUserForDetails.vehicles.map((v: Vehicle, idx: number) => {
                    const isBike = (v.vehicle_type || "").toLowerCase().includes("bike") || (v.vehicle_type || "").toLowerCase().includes("motorcycle");
                    const model = v.vehicle_model || (v as any).model || (v as any).name || `Vehicle #${idx + 1}`;
                    const type = v.vehicle_type || (isBike ? "Bike" : "Car");
                    const vehicleNumber = v.vehicle_number || (v as any).license_plate || "Not added";
                    const odometerVal = v.odometer != null ? v.odometer : 0;
                    const odometerUnit = v.odometer_unit || "km";
                    const tankCapacity = v.fuel_tank_capacity != null ? `${v.fuel_tank_capacity} L` : "Not specified";
                    const avgDistance = v.avg_daily_distance != null ? `${v.avg_daily_distance} km/day` : "Not specified";
                    const avgRunningTime = v.avg_daily_running_time != null ? `${v.avg_daily_running_time} hrs/day` : "Not specified";

                    return (
                      <div
                        key={v.id || idx}
                        className="rounded-3xl p-5 bg-slate-900/90 border border-white/10 hover:border-orange-500/40 transition-all space-y-4 shadow-xl"
                      >
                        {/* Vehicle Card Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-orange-500/20 to-amber-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                              {isBike ? <Bike className="h-5 w-5" /> : <Car className="h-5 w-5" />}
                            </div>
                            <div>
                              <h5 className="text-base font-extrabold text-white flex items-center gap-2">
                                <span>{model}</span>
                                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-400 font-bold border border-orange-500/30">
                                  #{idx + 1}
                                </span>
                              </h5>
                              <p className="text-xs text-slate-400 capitalize">
                                Vehicle Type: <strong className="text-white">{type}</strong> • Model: <strong className="text-orange-400">{model}</strong>
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/5 text-slate-200 border border-white/10">
                              {vehicleNumber}
                            </span>
                          </div>
                        </div>

                        {/* Complete vehicles Table Attributes Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                          {/* 1. vehicle_type */}
                          <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                            <span className="text-slate-500 text-[10.5px] block font-medium">vehicle_type</span>
                            <span className="font-bold text-white capitalize flex items-center gap-1.5 mt-0.5">
                              {isBike ? <Bike className="h-3.5 w-3.5 text-orange-400" /> : <Car className="h-3.5 w-3.5 text-blue-400" />}
                              {type}
                            </span>
                          </div>

                          {/* 2. vehicle_model */}
                          <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                            <span className="text-slate-500 text-[10.5px] block font-medium">vehicle_model</span>
                            <span className="font-bold text-white mt-0.5 block truncate" title={model}>
                              {model}
                            </span>
                          </div>

                          {/* 3. vehicle_number */}
                          <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                            <span className="text-slate-500 text-[10.5px] block font-medium">vehicle_number (Plate)</span>
                            <span className="font-mono font-bold text-amber-400 mt-0.5 block">
                              {vehicleNumber}
                            </span>
                          </div>

                          {/* 4. odometer & odometer_unit */}
                          <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                            <span className="text-slate-500 text-[10.5px] block font-medium">odometer (Reading)</span>
                            <span className="font-mono font-bold text-orange-400 flex items-center gap-1.5 mt-0.5">
                              <Gauge className="h-3.5 w-3.5" />
                              {odometerVal.toLocaleString()} {odometerUnit}
                            </span>
                          </div>

                          {/* 5. fuel_tank_capacity */}
                          <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                            <span className="text-slate-500 text-[10.5px] block font-medium">fuel_tank_capacity</span>
                            <span className="font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                              <Fuel className="h-3.5 w-3.5" />
                              {tankCapacity}
                            </span>
                          </div>

                          {/* 6. avg_daily_distance */}
                          <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                            <span className="text-slate-500 text-[10.5px] block font-medium">avg_daily_distance</span>
                            <span className="font-mono font-bold text-blue-400 flex items-center gap-1.5 mt-0.5">
                              <Navigation className="h-3.5 w-3.5" />
                              {avgDistance}
                            </span>
                          </div>

                          {/* 7. avg_daily_running_time */}
                          <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                            <span className="text-slate-500 text-[10.5px] block font-medium">avg_daily_running_time</span>
                            <span className="font-mono font-bold text-purple-400 flex items-center gap-1.5 mt-0.5">
                              <Clock className="h-3.5 w-3.5" />
                              {avgRunningTime}
                            </span>
                          </div>

                          {/* 8. created_at */}
                          <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                            <span className="text-slate-500 text-[10.5px] block font-medium">created_at (Registered)</span>
                            <span className="font-medium text-slate-300 mt-0.5 block">
                              {formatDate(v.created_at)}
                            </span>
                          </div>

                          {/* 9. id */}
                          <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                            <span className="text-slate-500 text-[10.5px] block font-medium">Vehicle ID (UUID)</span>
                            <span className="font-mono text-slate-400 text-[11px] truncate block mt-0.5" title={v.id}>
                              {v.id ? `${v.id.slice(0, 8)}...${v.id.slice(-4)}` : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-10 text-center rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-slate-400">
                  <Car className="h-10 w-10 mx-auto text-slate-600 mb-2" />
                  <p className="font-semibold text-slate-300">No Vehicles Registered</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">This user has not added any vehicles to their MotoCare garage yet.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedUserForDetails(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-md hover:from-orange-600 hover:to-amber-600 transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
