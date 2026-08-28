"use client";

import React, { useState } from "react";
import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Vehicle } from "@/types/database.types";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate } from "@/lib/utils";
import {
  Car,
  Bike,
  User,
  Gauge,
  Fuel,
  Navigation,
  Calendar,
  Phone,
  Info,
  X,
  Layers,
  ArrowRight,
} from "lucide-react";

interface VehicleTableClientProps {
  initialVehicles: Vehicle[];
}

export function VehicleTableClient({ initialVehicles }: VehicleTableClientProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const displayVehicles = initialVehicles;

  const totalVehicles = displayVehicles.length;
  const bikesCount = displayVehicles.filter((v) =>
    (v.vehicle_type || "").toLowerCase().includes("bike") ||
    (v.vehicle_type || "").toLowerCase().includes("motorcycle")
  ).length;
  const carsCount = totalVehicles - bikesCount;
  const totalKmTracked = displayVehicles.reduce((acc, v) => acc + (v.odometer || 0), 0);

  const columns: ColumnDef<Vehicle, unknown>[] = [
    {
      accessorKey: "vehicle_model",
      header: "Vehicle & Specs",
      cell: ({ row }) => {
        const v = row.original;
        const modelName = v.vehicle_model || (v as any).model || (v as any).name || "MotoCare Vehicle";
        const isBike =
          (v.vehicle_type || "").toLowerCase().includes("bike") ||
          (v.vehicle_type || "").toLowerCase().includes("motorcycle");

        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-orange-500/20 to-amber-500/20 text-orange-400 font-extrabold flex items-center justify-center border border-orange-500/30 shadow-xs shrink-0">
              {isBike ? <Bike className="h-5 w-5" /> : <Car className="h-5 w-5" />}
            </div>
            <div>
              <p className="font-bold text-xs text-white tracking-tight flex items-center gap-1.5">
                <span>{modelName}</span>
                <span className="px-2 py-0.2 text-[10px] rounded-full bg-white/5 border border-white/10 text-slate-300 capitalize font-medium">
                  {v.vehicle_type || (isBike ? "Bike" : "Car")}
                </span>
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                {v.odometer != null && (
                  <span className="flex items-center gap-1 font-mono text-orange-400 font-semibold">
                    <Gauge className="h-3 w-3 text-orange-500 shrink-0" />
                    {v.odometer.toLocaleString()} {v.odometer_unit || "km"}
                  </span>
                )}
                {v.fuel_tank_capacity != null && (
                  <span className="flex items-center gap-1 text-emerald-400 font-mono">
                    <Fuel className="h-3 w-3 shrink-0" />
                    {v.fuel_tank_capacity} L
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "vehicle_number",
      header: "License Plate / Reg",
      cell: ({ row }) => {
        const v = row.original;
        const plate = v.vehicle_number || (v as any).license_plate;
        return (
          <div className="text-xs">
            {plate ? (
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-mono font-bold text-slate-200 text-xs inline-block">
                {plate}
              </span>
            ) : (
              <span className="text-slate-500 italic text-[11px]">Unregistered Plate</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "owner",
      header: "Registered Owner",
      cell: ({ row }) => {
        const owner = row.original.owner;
        const v = row.original;

        if (!owner) {
          return (
            <span className="text-xs text-slate-400 font-mono">
              User ID: {v.user_id ? `${v.user_id.slice(0, 8)}...` : "N/A"}
            </span>
          );
        }

        return (
          <div className="text-xs">
            <p className="font-bold text-white">{owner.full_name || "Unnamed Owner"}</p>
            <p className="text-[11px] text-slate-400">{owner.email}</p>
            {owner.phone && (
              <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                <Phone className="h-2.5 w-2.5 text-orange-400" /> {owner.phone}
              </p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "avg_daily_distance",
      header: "Daily Usage",
      cell: ({ row }) => {
        const v = row.original;
        return (
          <div className="text-xs space-y-0.5">
            {v.avg_daily_distance != null ? (
              <span className="font-mono text-blue-400 font-semibold flex items-center gap-1">
                <Navigation className="h-3 w-3 text-blue-400" /> {v.avg_daily_distance} km/day
              </span>
            ) : (
              <span className="text-slate-500 text-[11px]">Not tracked</span>
            )}
          </div>
        );
      },
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
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const v = row.original;
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedVehicle(v)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/25 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors"
            >
              <Info className="h-3.5 w-3.5" /> Details
            </button>
            {v.user_id && (
              <Link href={`/users/${v.user_id}`}>
                <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors">
                  <User className="h-3.5 w-3.5 text-blue-400" /> Owner
                </button>
              </Link>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Vehicle Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl p-5 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Fleet
            </span>
            <p className="text-2xl font-extrabold text-white mt-1">{totalVehicles}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <Layers className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-2xl p-5 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Registered Motorbikes
            </span>
            <p className="text-2xl font-extrabold text-orange-400 mt-1">{bikesCount}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <Bike className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-2xl p-5 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Registered Cars
            </span>
            <p className="text-2xl font-extrabold text-blue-400 mt-1">{carsCount}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Car className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-2xl p-5 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Odometer Logged
            </span>
            <p className="text-2xl font-extrabold text-emerald-400 mt-1">
              {totalKmTracked.toLocaleString()} km
            </p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Gauge className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Main Vehicles Table */}
      <DataTable
        columns={columns}
        data={displayVehicles}
        searchPlaceholder="Search vehicles by model, plate, owner name, email..."
        emptyMessage="No vehicle records found in public.vehicles."
      />

      {/* Comprehensive Vehicle Details Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0c101c] p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200 relative">
            <button
              onClick={() => setSelectedVehicle(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-extrabold shadow-lg">
                {(selectedVehicle.vehicle_type || "").toLowerCase().includes("bike") ? (
                  <Bike className="h-6 w-6" />
                ) : (
                  <Car className="h-6 w-6" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {selectedVehicle.vehicle_model || selectedVehicle.brand || "Vehicle Details"}
                </h3>
                <p className="text-xs text-slate-400">
                  Type: {selectedVehicle.vehicle_type || "Motorbike"} • Reg: {selectedVehicle.vehicle_number || "N/A"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                <span className="text-slate-500 text-[10px] block">Odometer Reading</span>
                <span className="font-mono font-bold text-orange-400 text-sm">
                  {selectedVehicle.odometer?.toLocaleString() || 0} {selectedVehicle.odometer_unit || "km"}
                </span>
              </div>
              <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                <span className="text-slate-500 text-[10px] block">Fuel Tank Capacity</span>
                <span className="font-bold text-emerald-400 text-sm">
                  {selectedVehicle.fuel_tank_capacity ? `${selectedVehicle.fuel_tank_capacity} L` : "N/A"}
                </span>
              </div>
              <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                <span className="text-slate-500 text-[10px] block">Avg Daily Distance</span>
                <span className="font-mono font-bold text-blue-400">
                  {selectedVehicle.avg_daily_distance ? `${selectedVehicle.avg_daily_distance} km/day` : "N/A"}
                </span>
              </div>
              <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                <span className="text-slate-500 text-[10px] block">Registration Date</span>
                <span className="font-medium text-white">{formatDate(selectedVehicle.created_at)}</span>
              </div>
            </div>

            {/* Owner Details Card */}
            {selectedVehicle.owner && (
              <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-1.5 text-xs">
                <span className="text-slate-500 text-[10.5px]">Owner Information</span>
                <p className="font-bold text-white text-sm">{selectedVehicle.owner.full_name || "Unnamed Owner"}</p>
                <p className="text-slate-400">{selectedVehicle.owner.email}</p>
                {selectedVehicle.owner.phone && (
                  <p className="text-orange-400 font-mono text-[11px]">{selectedVehicle.owner.phone}</p>
                )}
              </div>
            )}

            <div className="flex justify-end pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedVehicle(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-md hover:from-orange-600 hover:to-amber-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
