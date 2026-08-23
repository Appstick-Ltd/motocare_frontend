import React from "react";
import { getAppContent, cleanAndUnescapeHtml } from "@/lib/supabase/content";
import { Info, Calendar, RefreshCw } from "lucide-react";

export const metadata = {
  title: "About Us | MotoCare",
  description: "About MotoCare vehicle management platform.",
};

export const dynamic = "force-dynamic";

export default async function AboutUsPage() {
  let contentData = await getAppContent("about_us");
  if (!contentData) {
    contentData = await getAppContent("about");
  }

  const title = contentData?.title || "About Us";
  const rawHtml = contentData?.content || `
    <div class="privacy-policy">
      <h1>About MotoCare</h1>
      <p>MotoCare is an intelligent vehicle management platform designed to help users track vehicle health, fuel expenses, maintenance schedules, and document compliance.</p>
      <h2>Our Mission</h2>
      <p>Empower vehicle owners with seamless telemetry tracking and automated service notifications.</p>
    </div>
  `;

  const cleanHtml = cleanAndUnescapeHtml(rawHtml);
  const updatedAt = contentData?.created_at
    ? new Date(contentData.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "August 2026";

  return (
    <article className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="border-b border-border/70 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20 shadow-2xs">
          <Info className="h-3.5 w-3.5" /> Company Information
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
          {title}
        </h1>
        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground pt-1">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-blue-500" /> Last Updated: {updatedAt}
          </span>
          <span className="flex items-center gap-1">
            <RefreshCw className="h-3.5 w-3.5 text-emerald-500" /> Version {contentData?.version || 1}.0
          </span>
        </div>
      </div>

      {/* Rendered Live HTML Content from Supabase */}
      <div
        className="privacy-policy prose-editor html-content-view rounded-2xl border border-border/70 bg-card p-6 md:p-10 shadow-xs leading-relaxed"
        dangerouslySetInnerHTML={{ __html: cleanHtml }}
      />
    </article>
  );
}
