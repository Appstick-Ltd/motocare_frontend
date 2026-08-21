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

const sampleFleetVehicles: Vehicle[] = [
  {
    id: "v-101",
    user_id: "u-1",
    brand: "Toyota",
    model: "Corolla Altis",
    year: 2023,
    license_plate: "DHK-METRO-GA-11-2049",
    vin: "JTDKN3DU6A2109841",
    vehicle_type: "Sedan",
    odometer: 14250,
    status: "active",
    created_at: new Date().toISOString(),
    owner: {
      id: "u-1",
      email: "tonmay.sen@motocare.com",
      full_name: "Tonmay Sen",
      phone: "+880 1711-223344",
      role: "SUPER_ADMIN",
      created_at: new Date().toISOString(),
    },
  },
  {
    id: "v-102",
    user_id: "u-2",
    brand: "Yamaha",
    model: "R15 V4 Racing Blue",
    year: 2024,
    license_plate: "DHK-METRO-HA-55-9102",
    vin: "JYAR15V40009812",
    vehicle_type: "Motorcycle",
    odometer: 4800,
    status: "active",
    created_at: new Date().toISOString(),
    owner: {
      id: "u-2",
      email: "karim.ahmed@example.com",
      full_name: "Karim Ahmed",
      phone: "+880 1819-887766",
      role: "USER",
      created_at: new Date().toISOString(),
    },
  },
  {
    id: "v-103",
    user_id: "u-3",
    brand: "Honda",
    model: "CR-V AWD",
    year: 2022,
    license_plate: "CTG-METRO-FA-44-1290",
    vin: "5FNYF1H548B019283",
    vehicle_type: "SUV",
    odometer: 32100,
    status: "active",
    created_at: new Date().toISOString(),
    owner: {
      id: "u-3",
      email: "rahim.chowdhury@example.com",
      full_name: "Rahim Chowdhury",
      phone: "+880 1912-334455",
      role: "USER",
      created_at: new Date().toISOString(),
    },
  },
  {
    id: "v-104",
    user_id: "u-4",
    brand: "BMW",
    model: "330i M Sport",
    year: 2023,
    license_plate: "DHK-METRO-GA-99-0011",
    vin: "WBA330I00091823",
    vehicle_type: "Sedan",
    odometer: 18900,
    status: "maintenance",
    created_at: new Date().toISOString(),
    owner: {
      id: "u-4",
      email: "samira.khan@example.com",
      full_name: "Samira Khan",
      phone: "+880 1611-998877",
      role: "USER",
      created_at: new Date().toISOString(),
    },
  },
];

export function VehicleTableClient({ initialVehicles }: VehicleTableClientProps) {
  const [showSampleData, setShowSampleData] = useState<boolean>(initialVehicles.length === 0);

  const displayVehicles = initialVehicles.length > 0
    ? initialVehicles
    : (showSampleData ? sampleFleetVehicles : []);

  const columns: ColumnDef<Vehicle, unknown>[] = [
    {
      accessorKey: "brand",
      header: "Vehicle Info",
      cell: ({ row }) => {
        const v = row.original;
        const displayName = v.brand ? `${v.brand} ${v.model || ""} (${v.year || "N/A"})` : v.vehicle_type;

        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500/15 to-blue-500/15 text-indigo-500 font-bold flex items-center justify-center border border-indigo-500/20 shadow-xs">
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
                    <Gauge className="h-3 w-3 text-blue-500" /> {v.odometer.toLocaleString()} km
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
      {/* DB Telemetry State Switcher Banner */}
      {initialVehicles.length === 0 && (
        <Card className="border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/10">
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/15 text-blue-500">
                <Database className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-foreground flex items-center gap-1.5">
                  Live Supabase DB Status: <span className="text-blue-500 font-bold">0 Rows in `vehicles` table</span>
                </p>
                <p className="text-muted-foreground mt-0.5">
                  Your live Supabase database currently has no vehicle records registered. Toggle sample fleet data to preview UI.
                </p>
              </div>
            </div>

            <Button
              variant={showSampleData ? "default" : "outline"}
              size="sm"
              onClick={() => setShowSampleData(!showSampleData)}
              className="text-xs gap-1.5 shrink-0"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {showSampleData ? "Showing Sample Fleet" : "Load Sample Fleet Preview"}
            </Button>
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
