"use client";

import React, { useState } from "react";
import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Vehicle } from "@/types/database.types";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Car, User, Sparkles, AlertCircle, Database, Gauge } from "lucide-react";

interface VehicleTableClientProps {
  initialVehicles: Vehicle[];
}

export function VehicleTableClient({ initialVehicles }: VehicleTableClientProps) {
  const displayVehicles = initialVehicles;


  const columns: ColumnDef<Vehicle, unknown>[] = [
    {
      accessorKey: "brand",
      header: "Vehicle Info",
      cell: ({ row }) => {
        const v = row.original;
        const displayName = v.brand ? `${v.brand} ${v.model || ""} (${v.year || "N/A"})` : v.vehicle_type;

        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500/15 to-amber-500/15 text-orange-500 font-bold flex items-center justify-center border border-orange-500/20 shadow-xs">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-xs text-foreground tracking-tight">
                {displayName}
              </p>
              <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                <span className="px-1.5 py-0.2 text-[10px] rounded bg-muted font-medium">
                  {v.vehicle_type || "Car"}
                </span>
                {v.odometer && (
                  <span className="flex items-center gap-0.5 font-mono text-[10px]">
                    <Gauge className="h-3 w-3 text-orange-500" /> {v.odometer.toLocaleString()} km
                  </span>
                )}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "license_plate",
      header: "License Plate / VIN",
      cell: ({ row }) => {
        const v = row.original;
        return (
          <div className="text-xs">
            <p className="font-mono font-semibold text-foreground">{v.license_plate || "Unregistered Plate"}</p>
            <p className="text-[10px] text-muted-foreground font-mono">VIN: {v.vin || "N/A"}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "owner",
      header: "Registered Owner",
      cell: ({ row }) => {
        const owner = row.original.owner;
        if (!owner) return <span className="text-xs text-muted-foreground font-mono">User ID: {row.original.user_id?.slice(0, 8)}...</span>;
        return (
          <div className="text-xs">
            <p className="font-semibold text-foreground">{owner.full_name || "Unnamed Owner"}</p>
            <p className="text-[11px] text-muted-foreground">{owner.email}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status || "active"} />,
    },
    {
      accessorKey: "created_at",
      header: "Registered On",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.created_at)}</span>,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const v = row.original;
        return (
          <div className="flex items-center gap-1.5">
            <Link href={`/users/${v.user_id}`}>
              <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
                <User className="h-3.5 w-3.5 text-blue-500" /> Owner Profile
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* DB Telemetry State Banner */}
      {initialVehicles.length === 0 && (
        <Card className="border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/10">
          <CardContent className="p-4 flex items-center gap-3 text-xs">
            <div className="p-2 rounded-lg bg-blue-500/15 text-blue-500">
              <Database className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                Live Supabase DB Status: <span className="text-blue-500 font-bold">0 Rows in `vehicles` table</span>
              </p>
              <p className="text-muted-foreground mt-0.5">
                Your live Supabase database currently has no vehicle records registered. New registered vehicles will appear here in real-time.
              </p>
            </div>
          </CardContent>
        </Card>
      )}


      <DataTable
        columns={columns}
        data={displayVehicles}
        searchPlaceholder="Search vehicles by brand, model, plate, VIN..."
        emptyMessage="No vehicle records found in database."
      />
    </div>
  );
}
