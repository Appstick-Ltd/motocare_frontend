"use client";

import React, { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { MaintenanceRecord } from "@/types/database.types";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Wrench, Database, Sparkles } from "lucide-react";

interface MaintenanceTableClientProps {
  initialRecords: MaintenanceRecord[];
}

const sampleMaintenance: MaintenanceRecord[] = [
  {
    id: "m-1",
    user_id: "u-1",
    vehicle_id: "v-101",
    service_type: "Full Synthetic Engine Oil Change",
    service_category: "Engine Oil & Filter",
    service_date: new Date().toISOString(),
    cost: 85.00,
    status: "completed",
    notes: "Replaced 4L Mobil1 5W-30 synthetic oil and OEM filter.",
    odometer: 14250,
    created_at: new Date().toISOString(),
    user: {
      id: "u-1",
      email: "tonmay.sen@motocare.com",
      full_name: "Tonmay Sen",
      phone: "+880 1711-223344",
      role: "SUPER_ADMIN",
      created_at: new Date().toISOString(),
    },
    vehicle: {
      id: "v-101",
      user_id: "u-1",
      brand: "Toyota",
      model: "Corolla Altis",
      year: 2023,
      license_plate: "DHK-METRO-GA-11-2049",
      vehicle_type: "Sedan",
      created_at: new Date().toISOString(),
    },
  },
  {
    id: "m-2",
    user_id: "u-2",
    vehicle_id: "v-102",
    service_type: "Chain Lube & Brake Fluid Top-up",
    service_category: "Brake System & Drive",
    service_date: new Date().toISOString(),
    cost: 35.00,
    status: "completed",
    notes: "Cleaned O-ring chain and adjusted clutch cable tension.",
    odometer: 4800,
    created_at: new Date().toISOString(),
    user: {
      id: "u-2",
      email: "karim.ahmed@example.com",
      full_name: "Karim Ahmed",
      phone: "+880 1819-887766",
      role: "USER",
      created_at: new Date().toISOString(),
    },
    vehicle: {
      id: "v-102",
      user_id: "u-2",
      brand: "Yamaha",
      model: "R15 V4",
      year: 2024,
      license_plate: "DHK-METRO-HA-55-9102",
      vehicle_type: "Motorcycle",
      created_at: new Date().toISOString(),
    },
  },
];

export function MaintenanceTableClient({ initialRecords }: MaintenanceTableClientProps) {
  const [showSampleData, setShowSampleData] = useState<boolean>(initialRecords.length === 0);
  const displayRecords = initialRecords.length > 0
    ? initialRecords
    : (showSampleData ? sampleMaintenance : []);

  const columns: ColumnDef<MaintenanceRecord, unknown>[] = [
    {
      accessorKey: "service_type",
      header: "Service Category & Details",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/15 text-emerald-500 font-bold flex items-center justify-center border border-emerald-500/20 shadow-xs">
            <Wrench className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-xs text-foreground">{row.original.service_type || row.original.service_category}</p>
            <p className="text-[11px] text-muted-foreground">{row.original.notes || "No additional notes"}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "vehicle",
      header: "Vehicle",
      cell: ({ row }) => {
        const v = row.original.vehicle;
        if (!v) return <span className="text-xs text-muted-foreground">Vehicle ID: {row.original.vehicle_id?.slice(0, 8)}</span>;
        return (
          <div className="text-xs">
            <p className="font-semibold text-foreground">{v.brand} {v.model}</p>
            <p className="text-[10px] text-muted-foreground font-mono">{v.license_plate || "No plate"}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "user",
      header: "Customer",
      cell: ({ row }) => {
        const u = row.original.user;
        if (!u) return <span className="text-xs text-muted-foreground">User ID: {row.original.user_id?.slice(0, 8)}</span>;
        return (
          <div className="text-xs">
            <p className="font-semibold text-foreground">{u.full_name || "Unnamed"}</p>
            <p className="text-[10px] text-muted-foreground">{u.email}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "cost",
      header: "Service Cost",
      cell: ({ row }) => (
        <span className="font-bold text-xs text-emerald-500">
          {formatCurrency(row.original.cost || 0)}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status || "completed"} />,
    },
    {
      accessorKey: "service_date",
      header: "Service Date",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.service_date)}</span>,
    },
  ];

  return (
    <div className="space-y-4">
      {initialRecords.length === 0 && (
        <Card className="border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/10">
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/15 text-blue-500">
                <Database className="h-4 w-4" />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-foreground flex items-center gap-1.5">
                  Live Supabase DB Status: <span className="text-blue-500 font-bold">0 Rows in `service_records` table</span>
                </p>
                <p className="text-muted-foreground mt-0.5">
                  No maintenance records logged in database yet. Toggle sample maintenance jobs to preview UI.
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
              {showSampleData ? "Showing Sample Records" : "Load Sample Maintenance Preview"}
            </Button>
          </CardContent>
        </Card>
      )}

      <DataTable columns={columns} data={displayRecords} searchPlaceholder="Search service jobs, categories, vehicles..." />
    </div>
  );
}
