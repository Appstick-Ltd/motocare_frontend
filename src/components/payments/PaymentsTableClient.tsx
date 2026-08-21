"use client";

import React, { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Transaction } from "@/types/database.types";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate, formatCurrency } from "@/lib/utils";
import { CreditCard, Hash } from "lucide-react";

interface PaymentsTableClientProps {
  initialTransactions: Transaction[];
}

export function PaymentsTableClient({ initialTransactions }: PaymentsTableClientProps) {
  const [transactions] = useState<Transaction[]>(initialTransactions);

  const columns: ColumnDef<Transaction, unknown>[] = [
    {
      accessorKey: "id",
      header: "Transaction Ref ID",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 font-mono text-xs">
          <Hash className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="font-semibold text-foreground">{row.original.id.slice(0, 13)}...</span>
        </div>
      ),
    },
    {
      accessorKey: "user",
      header: "Customer",
      cell: ({ row }) => {
        const u = row.original.user;
        if (!u) return <span className="text-xs text-muted-foreground">System Account</span>;
        return (
          <div className="text-xs">
            <p className="font-medium text-foreground">{u.full_name || "Unnamed User"}</p>
            <p className="text-[11px] text-muted-foreground">{u.email}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Amount Paid",
      cell: ({ row }) => (
        <span className="font-bold text-xs text-emerald-500">
          {formatCurrency(row.original.amount)} {row.original.currency}
        </span>
      ),
    },
    {
      accessorKey: "payment_method",
      header: "Payment Method",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CreditCard className="h-3.5 w-3.5 text-blue-500" />
          <span>{row.original.payment_method}</span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "created_at",
      header: "Processed Date",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{formatDate(row.original.created_at)}</span>,
    },
  ];

  return <DataTable columns={columns} data={transactions} searchPlaceholder="Search payment ID, customer email..." />;
}
