import { createAdminClient } from "@/lib/supabase/admin";

export interface LogAuditOptions {
  adminId?: string | null;
  adminEmail: string;
  action: string;
  resource: string;
  resourceId?: string | null;
  details?: Record<string, unknown>;
  ipAddress?: string | null;
}

export async function recordAuditLog(options: LogAuditOptions) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("audit_logs").insert({
      admin_id: options.adminId || null,
      admin_email: options.adminEmail,
      action: options.action,
      resource: options.resource,
      resource_id: options.resourceId || null,
      details: options.details || {},
      ip_address: options.ipAddress || null,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Failed to insert audit log record:", error.message);
    }
  } catch (err) {
    console.error("Audit log execution exception:", err);
  }
}
