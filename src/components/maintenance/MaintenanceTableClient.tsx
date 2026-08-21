"use client";

import React, { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { MaintenanceRecord } from "@/types/database.types";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Wrench } from "lucide-react";

interface MaintenanceTableClientProps {
  initialRecords: MaintenanceRecord[];
}

export function MaintenanceTableClient({ initialRecords }: MaintenanceTableClientProps) {
  const [records] = useState<MaintenanceRecord[]>(initialRecords);

  const columns: ColumnDef<MaintenanceRecord, unknown>[] = [
    {
      accessorKey: "service_category",
      header: "Service Category",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-emerald-600/15 text-emerald-500 font-bold flex items-center justify-center">
            <Wrench className="h-4 w-4" />
          </div>
          <div>
            <p className="font-semibold text-xs text-foreground">{row.original.service_category}</p>
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
        if (!v) return <span className="text-xs text-muted-foreground">Unknown Vehicle</span>;
        return (
          <div className="text-xs">
            <p className="font-medium text-foreground">{v.brand} {v.model}</p>
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
        if (!u) return <span className="text-xs text-muted-foreground">Unknown</span>;
        return (
          <div className="text-xs">
            <p className="font-medium text-foreground">{u.full_name || "Unnamed"}</p>
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
          {formatCurrency(row.original.cost)}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "service_date",
      header: "Service Date",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.service_date)}</span>,
    },
  ];

  return <DataTable columns={columns} data={records} searchPlaceholder="Search service jobs, categories, vehicles..." />;
}
