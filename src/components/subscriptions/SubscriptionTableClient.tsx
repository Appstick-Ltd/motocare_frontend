"use client";

import React, { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Subscription } from "@/types/database.types";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate, formatCurrency } from "@/lib/utils";

interface SubscriptionTableClientProps {
  initialSubscriptions: Subscription[];
}

export function SubscriptionTableClient({ initialSubscriptions }: SubscriptionTableClientProps) {
  const [subscriptions] = useState<Subscription[]>(initialSubscriptions);

  const columns: ColumnDef<Subscription, unknown>[] = [
    {
      accessorKey: "user",
      header: "Subscriber Member",
      cell: ({ row }) => {
        const u = row.original.user;
        if (!u) return <span className="text-xs text-muted-foreground">Unknown Member</span>;
        return (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-purple-600/15 text-purple-500 font-bold flex items-center justify-center text-xs">
              {(u.full_name || u.email).slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-xs text-foreground">{u.full_name || "Unnamed"}</p>
              <p className="text-[11px] text-muted-foreground">{u.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "plan",
      header: "Assigned Plan",
      cell: ({ row }) => {
        const p = row.original.plan;
        if (!p) return <span className="text-xs text-muted-foreground">Custom / Legacy</span>;
        return (
          <div className="text-xs">
            <p className="font-semibold text-foreground">{p.name}</p>
            <p className="text-[11px] text-emerald-500 font-medium">
              {formatCurrency(p.price)} / {p.billing_cycle}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Subscription Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "start_date",
      header: "Start Date",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.start_date)}</span>,
    },
    {
      accessorKey: "expiry_date",
      header: "Expiration Date",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.expiry_date)}</span>,
    },
  ];

  return <DataTable columns={columns} data={subscriptions} searchPlaceholder="Search subscriber email, plan name..." />;
}
