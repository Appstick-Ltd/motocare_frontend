import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { ContentEditor } from "@/components/content/ContentEditor";

export const metadata = {
  title: "About Us | MotoCare Admin",
};

export default async function AboutPage() {
  await requireAdminSession();
  const supabase = await createClient();

  const { data } = await supabase
    .from("app_content")
    .select("*")
    .eq("slug", "about-us")
    .single();

  const defaultDoc = `# About MotoCare\n\nMotoCare is a next-generation smart vehicle management and maintenance ecosystem empowering automobile owners with automated service tracking, telemetry metrics, and certified repair networks...`;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">About Us</h1>
        <p className="text-xs text-muted-foreground mt-1">Manage corporate about page and brand information.</p>
      </div>

      <ContentEditor
        slug="about-us"
        defaultTitle={data?.title || "About MotoCare"}
        defaultContent={data?.content || defaultDoc}
      />
    </div>
  );
}
