"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdminSession, requireSuperAdminSession } from "@/lib/auth/session";
import { recordAuditLog } from "@/lib/audit/logger";
import { revalidatePath } from "next/cache";
import { UserRole, UserStatus } from "@/types/database.types";

export async function updateUserStatusAction(userId: string, newStatus: UserStatus) {
  const session = await requireAdminSession();
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }

  // Audit log
  await recordAuditLog({
    adminId: session.user.id,
    adminEmail: session.profile.email,
    action: newStatus === "suspended" ? "USER_SUSPENDED" : "USER_ACTIVATED",
    resource: "users",
    resourceId: userId,
    details: { targetStatus: newStatus },
  });

  revalidatePath("/users");
  return { success: true };
}

export async function updateUserRoleAction(userId: string, newRole: UserRole) {
  // Requires Super Admin privilege!
  const session = await requireSuperAdminSession();
  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ role: newRole, updated_at: new Date().toISOString() })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }

  // Audit log
  await recordAuditLog({
    adminId: session.user.id,
    adminEmail: session.profile.email,
    action: "USER_ROLE_CHANGED",
    resource: "users",
    resourceId: userId,
    details: { assignedRole: newRole },
  });

  revalidatePath("/users");
  return { success: true };
}
