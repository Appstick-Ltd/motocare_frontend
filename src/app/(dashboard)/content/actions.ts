"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { recordAuditLog } from "@/lib/audit/logger";
import { revalidatePath } from "next/cache";
import { contentSchema, ContentInput } from "@/lib/validations";

export async function updateAppContentAction(data: ContentInput) {
  const session = await requireAdminSession();
  const parsed = contentSchema.parse(data);
  const supabase = await createClient();

  // 1. Fetch active record using content_type + is_active
  const { data: existing } = await supabase
    .from("app_content")
    .select("*")
    .eq("content_type", parsed.contentType)
    .eq("is_active", true)
    .maybeSingle();

  let error;
  if (existing) {
    // 2. Update existing record using its id, updating title, content, is_active, version
    const nextVersion = (existing.version || 1) + 1;
    const res = await supabase
      .from("app_content")
      .update({
        title: parsed.title,
        content: parsed.content,
        is_active: true,
        version: nextVersion,
      })
      .eq("id", existing.id);
    error = res.error;
  } else {
    // 3. Insert new record if none exists
    const res = await supabase
      .from("app_content")
      .insert({
        content_type: parsed.contentType,
        title: parsed.title,
        content: parsed.content,
        is_active: true,
        version: 1,
      });
    error = res.error;
  }

  if (error) {
    throw new Error(error.message);
  }

  // Record audit log
  await recordAuditLog({
    adminId: session.user.id,
    adminEmail: session.profile.email,
    action: "APP_CONTENT_UPDATED",
    resource: "app_content",
    details: { content_type: parsed.contentType, title: parsed.title },
  });

  const pathMap: Record<string, string[]> = {
    privacy_policy: ["/content/privacy-policy", "/privacy-policy"],
    terms_conditions: ["/content/terms", "/terms-condition"],
    about_us: ["/content/about", "/about-us"],
  };

  const paths = pathMap[parsed.contentType] || ["/content"];
  paths.forEach((p) => revalidatePath(p));

  return { success: true };
}
