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

  const { error } = await supabase.from("app_content").upsert(
    {
      slug: parsed.slug,
      title: parsed.title,
      content: parsed.content,
      updated_by: session.user.id,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "slug" }
  );

  if (error) {
    throw new Error(error.message);
  }

  // Audit log
  await recordAuditLog({
    adminId: session.user.id,
    adminEmail: session.profile.email,
    action: "APP_CONTENT_UPDATED",
    resource: "app_content",
    details: { slug: parsed.slug, title: parsed.title },
  });

  revalidatePath(`/content/${parsed.slug}`);
  return { success: true };
}
