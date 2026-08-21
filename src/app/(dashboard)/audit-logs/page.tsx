import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { AuditLog } from "@/types/database.types";
import { AuditLogsTableClient } from "@/components/audit/AuditLogsTableClient";

export const metadata = {
  title: "Audit Logs | MotoCare Admin",
};

export default async function AuditLogsPage() {
  await requireAdminSession();
  const supabase = await createClient();

  const { data: logs } = await supabase
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Security & Administrative Audit Logs</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Immutable audit trail recording administrative state changes, privilege changes, and security events.
        </p>
      </div>

      <AuditLogsTableClient initialLogs={(logs as AuditLog[]) || []} />
    </div>
  );
}
