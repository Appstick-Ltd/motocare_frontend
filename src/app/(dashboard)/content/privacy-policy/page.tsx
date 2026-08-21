import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { ContentEditor } from "@/components/content/ContentEditor";

export const metadata = {
  title: "Privacy Policy | MotoCare Admin",
};

export default async function PrivacyPolicyPage() {
  await requireAdminSession();
  const supabase = await createClient();

  const { data } = await supabase
    .from("app_content")
    .select("*")
    .eq("content_type", "privacy_policy")
    .eq("is_active", true)
    .maybeSingle();

  const defaultDoc = `# MotoCare Privacy Policy\n\nEffective Date: January 1, 2026\n\nAt MotoCare, we prioritize user data confidentiality and vehicle telemetry security. This Privacy Policy details how we collect, store, and process your telemetry data...`;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-muted-foreground mt-1">Manage public privacy terms for MotoCare mobile app.</p>
      </div>

      <ContentEditor
        contentType="privacy_policy"
        defaultTitle={data?.title || "Privacy Policy"}
        defaultContent={data?.content || defaultDoc}
      />
    </div>
  );
}
