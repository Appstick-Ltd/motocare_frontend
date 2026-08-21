"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { recordAuditLog } from "@/lib/audit/logger";
import { revalidatePath } from "next/cache";
import { notificationSchema, NotificationInput } from "@/lib/validations";

export async function sendPushNotificationAction(data: NotificationInput) {
  const session = await requireAdminSession();
  const parsed = notificationSchema.parse(data);
  const supabase = await createClient();

  const { error } = await supabase.from("notifications").insert({
    title: parsed.title,
    message: parsed.message,
    target_audience: parsed.target_audience,
    status: "sent",
    sent_at: new Date().toISOString(),
    created_by: session.user.id,
  });

  if (error) {
    throw new Error(error.message);
  }

  // Record audit log
  await recordAuditLog({
    adminId: session.user.id,
    adminEmail: session.profile.email,
    action: "PUSH_NOTIFICATION_SENT",
    resource: "notifications",
    details: {
      title: parsed.title,
      targetAudience: parsed.target_audience,
    },
  });

  revalidatePath("/notifications");
  return { success: true };
}
