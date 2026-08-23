import React from "react";
import { getAppContent, cleanAndUnescapeHtml } from "@/lib/supabase/content";
import { ShieldCheck, Calendar, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | MotoCare",
  description: "Official MotoCare Privacy Policy and data protection terms.",
};

export const dynamic = "force-dynamic";

export default async function PrivacyPolicyPage() {
  const contentData = await getAppContent("privacy_policy");

  const title = contentData?.title || "MotoCare Privacy Policy";
  const rawHtml = contentData?.content || `
    <div class="privacy-policy">
      <h1>MotoCare Privacy Policy</h1>
      <p><strong>Effective Date:</strong> 22/08/2026</p>
      <p>MotoCare ("we", "our", or "us") is committed to protecting your privacy while using our vehicle management services.</p>
      <h2>1. Information We Collect</h2>
      <p>We collect account details, vehicle information, fuel records, and maintenance logs provided directly by you.</p>
      <h2>2. Use of Information</h2>
      <p>Your information is used solely to calculate vehicle maintenance schedules, track fuel efficiency, and send service reminders.</p>
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
    <article className="space-y-6 animate-in fade-in duration-300" suppressHydrationWarning>
      {/* Page Header */}
      <div className="border-b border-border/70 pb-6 space-y-2" suppressHydrationWarning>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold border border-orange-500/20 shadow-2xs">
          <ShieldCheck className="h-3.5 w-3.5" /> Official Privacy Policy
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
          {title}
        </h1>
        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground pt-1">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-orange-500" /> Last Updated: {updatedAt}
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
        suppressHydrationWarning
      />
    </article>
  );
}
