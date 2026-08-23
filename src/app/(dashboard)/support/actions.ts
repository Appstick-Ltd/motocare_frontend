"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminSession } from "@/lib/auth/session";
import { recordAuditLog } from "@/lib/audit/logger";
import { revalidatePath } from "next/cache";
import { sendSupportReplyEmail } from "@/lib/email/mailer";
import { ContactMessage } from "@/types/database.types";

export async function fetchContactMessages(): Promise<ContactMessage[]> {
  await requireAdminSession();
  
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return (data as ContactMessage[]) || [];
    }

    // Fallback using Admin Client (bypasses RLS)
    const adminSupabase = createAdminClient();
    const { data: adminData, error: adminError } = await adminSupabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (adminError) {
      console.error("Admin client error fetching contact messages:", adminError);
      return [];
    }

    return (adminData as ContactMessage[]) || [];
  } catch (err) {
    console.error("Exception fetching contact messages:", err);
    try {
      const adminSupabase = createAdminClient();
      const { data: adminData } = await adminSupabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      return (adminData as ContactMessage[]) || [];
    } catch {
      return [];
    }
  }
}

export interface SendSupportReplyInput {
  id: string;
  userName: string;
  userEmail: string;
  subject: string;
  originalMessage: string;
  replyText: string;
}

export async function sendContactReplyAction(data: SendSupportReplyInput) {
  const session = await requireAdminSession();

  if (!data.replyText || data.replyText.trim().length === 0) {
    return { success: false, error: "Reply message text cannot be empty." };
  }

  // 1. Send email to user
  const emailResult = await sendSupportReplyEmail({
    userName: data.userName,
    userEmail: data.userEmail,
    subject: data.subject,
    originalMessage: data.originalMessage,
    replyText: data.replyText,
  });

  if (!emailResult.success) {
    return {
      success: false,
      error: emailResult.error || "Failed to send reply email via SMTP.",
    };
  }

  // 2. Update status in database using session client first, fallback to admin client
  await updateMessageStatusInDb(data.id, "replied");

  // 3. Record Audit Log
  await recordAuditLog({
    adminId: session.user.id,
    adminEmail: session.profile.email,
    action: "CONTACT_MESSAGE_REPLIED",
    resource: "contact_messages",
    resourceId: data.id,
    details: {
      userEmail: data.userEmail,
      subject: data.subject,
      delivered: emailResult.delivered,
      notice: emailResult.notice,
    },
  });

  revalidatePath("/support");

  return {
    success: true,
    delivered: emailResult.delivered,
    notice: emailResult.notice,
  };
}

export async function updateMessageStatusAction(id: string, status: string) {
  const session = await requireAdminSession();
  const result = await updateMessageStatusInDb(id, status);

  if (!result.success) {
    return { success: false, error: result.error || "Failed to update status." };
  }

  await recordAuditLog({
    adminId: session.user.id,
    adminEmail: session.profile.email,
    action: "CONTACT_MESSAGE_STATUS_UPDATED",
    resource: "contact_messages",
    resourceId: id,
    details: { status },
  });

  revalidatePath("/support");
  return { success: true };
}

export async function deleteContactMessageAction(id: string) {
  const session = await requireAdminSession();
  
  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);

  if (error) {
    const adminSupabase = createAdminClient();
    const { error: adminErr } = await adminSupabase.from("contact_messages").delete().eq("id", id);
    if (adminErr) {
      return { success: false, error: adminErr.message };
    }
  }

  await recordAuditLog({
    adminId: session.user.id,
    adminEmail: session.profile.email,
    action: "CONTACT_MESSAGE_DELETED",
    resource: "contact_messages",
    resourceId: id,
  });

  revalidatePath("/support");
  return { success: true };
}

// Helper to update status reliably using both session client and admin client
async function updateMessageStatusInDb(id: string, status: string) {
  try {
    // Attempt 1: Authenticated session client
    const supabase = await createClient();
    const { error, data } = await supabase
      .from("contact_messages")
      .update({ status })
      .eq("id", id)
      .select();

    if (!error && data && data.length > 0) {
      return { success: true };
    }

    // Attempt 2: Admin client (service_role fallback)
    const adminSupabase = createAdminClient();
    const { error: adminErr, data: adminData } = await adminSupabase
      .from("contact_messages")
      .update({ status })
      .eq("id", id)
      .select();

    if (!adminErr && adminData && adminData.length > 0) {
      return { success: true };
    }

    console.error("Failed to update status in contact_messages table:", error || adminErr);
    return { success: false, error: (error || adminErr)?.message || "Failed to update status." };
  } catch (err: any) {
    console.error("Exception updating status in contact_messages:", err);
    return { success: false, error: err.message };
  }
}
