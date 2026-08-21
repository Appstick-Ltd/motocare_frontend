"use client";

import React, { useState } from "react";
import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { Vehicle } from "@/types/database.types";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Car, User } from "lucide-react";

interface VehicleTableClientProps {
  initialVehicles: Vehicle[];
}

export function VehicleTableClient({ initialVehicles }: VehicleTableClientProps) {
  const [vehicles] = useState<Vehicle[]>(initialVehicles);

  const columns: ColumnDef<Vehicle, unknown>[] = [
    {
      accessorKey: "brand",
      header: "Vehicle Info",
      cell: ({ row }) => {
        const v = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-indigo-600/15 text-indigo-500 font-bold flex items-center justify-center">
              <Car className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-xs text-foreground">
                {v.brand} {v.model} ({v.year})
              </p>
              <p className="text-[11px] text-muted-foreground">Type: {v.vehicle_type}</p>
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
            <p className="font-mono font-medium">{v.license_plate || "N/A"}</p>
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
        if (!owner) return <span className="text-xs text-muted-foreground">Unassigned</span>;
        return (
          <div className="text-xs">
            <p className="font-medium text-foreground">{owner.full_name || "Unnamed Owner"}</p>
            <p className="text-[11px] text-muted-foreground">{owner.email}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
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
              <Button variant="ghost" size="icon" className="h-8 w-8" title="View Owner Profile">
                <User className="h-4 w-4 text-blue-500" />
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={vehicles} searchPlaceholder="Search vehicles by brand, model, license plate..." />;
}
