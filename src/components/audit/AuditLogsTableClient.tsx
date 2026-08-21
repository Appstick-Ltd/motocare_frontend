"use client";

import React, { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { AuditLog } from "@/types/database.types";
import { DataTable } from "@/components/common/DataTable";
import { formatDateTime } from "@/lib/utils";
import { Shield, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AuditLogsTableClientProps {
  initialLogs: AuditLog[];
}

export function AuditLogsTableClient({ initialLogs }: AuditLogsTableClientProps) {
  const [logs] = useState<AuditLog[]>(initialLogs);
  const [selectedDetails, setSelectedDetails] = useState<Record<string, unknown> | null>(null);

  const columns: ColumnDef<AuditLog, unknown>[] = [
    {
      accessorKey: "created_at",
      header: "Timestamp",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-muted-foreground">
          {formatDateTime(row.original.created_at)}
        </span>
      ),
    },
    {
      accessorKey: "admin_email",
      header: "Admin User",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-xs">
          <Shield className="h-3.5 w-3.5 text-blue-500" />
          <span className="font-semibold text-foreground">{row.original.admin_email}</span>
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: "Action Performed",
      cell: ({ row }) => (
        <Badge variant="outline" className="font-mono text-[10px] uppercase bg-muted/40">
          {row.original.action}
        </Badge>
      ),
    },
    {
      accessorKey: "resource",
      header: "Target Resource",
      cell: ({ row }) => (
        <div className="text-xs font-mono">
          <span className="text-foreground">{row.original.resource}</span>
          {row.original.resource_id && (
            <span className="text-muted-foreground text-[10px] ml-1">
              (ID: {row.original.resource_id.slice(0, 8)})
            </span>
          )}
        </div>
      ),
    },
    {
      id: "details",
      header: "Metadata",
      cell: ({ row }) => {
        const details = row.original.details;
        return (
          <button
            onClick={() => setSelectedDetails(details)}
            className="text-[11px] font-mono text-blue-500 hover:underline flex items-center gap-1"
          >
            <Terminal className="h-3 w-3" /> View JSON Payload
          </button>
        );
      },
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={logs} searchPlaceholder="Search audit logs by admin email, action..." />

      {/* JSON Payload Modal */}
      {selectedDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-xl border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <Terminal className="h-4 w-4 text-blue-500" /> Audit Metadata Payload
              </h3>
              <button
                onClick={() => setSelectedDetails(null)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>
            <pre className="p-4 rounded-lg bg-muted/60 font-mono text-xs overflow-x-auto border text-foreground">
              {JSON.stringify(selectedDetails, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </>
  );
}
