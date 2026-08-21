import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { ContentEditor } from "@/components/content/ContentEditor";

export const metadata = {
  title: "Terms & Conditions | MotoCare Admin",
};

export default async function TermsPage() {
  await requireAdminSession();
  const supabase = await createClient();

  const { data } = await supabase
    .from("app_content")
    .select("*")
    .eq("content_type", "terms_conditions")
    .eq("is_active", true)
    .maybeSingle();

  const defaultDoc = `# MotoCare Terms & Conditions\n\nEffective Date: January 1, 2026\n\nBy accessing or registering with MotoCare, you agree to comply with all terms governing vehicle service bookings, payments, and account responsibilities...`;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Terms & Conditions</h1>
        <p className="text-xs text-muted-foreground mt-1">Manage public terms of service agreement for MotoCare users.</p>
      </div>

      <ContentEditor
        contentType="terms_conditions"
        defaultTitle={data?.title || "Terms & Conditions"}
        defaultContent={data?.content || defaultDoc}
      />
    </div>
  );
}
