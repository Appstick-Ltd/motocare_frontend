import React from "react";
import { getAppContent, cleanAndUnescapeHtml } from "@/lib/supabase/content";
import { FileText, Calendar, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | MotoCare",
  description: "MotoCare Terms and Conditions of service.",
};

export const dynamic = "force-dynamic";

export default async function TermsConditionPage() {
  // Query Supabase for terms_conditions or terms_condition
  let contentData = await getAppContent("terms_conditions");
  if (!contentData) {
    contentData = await getAppContent("terms_condition");
  }

  const title = contentData?.title || "Terms & Conditions";
  const rawHtml = contentData?.content || `
    <div class="privacy-policy">
      <h1>Terms & Conditions</h1>
      <p><strong>Effective Date:</strong> 22/08/2026</p>
      <p>Welcome to MotoCare. By accessing or using our application, you agree to comply with these Terms & Conditions.</p>
      <h2>1. User Responsibilities</h2>
      <p>Users must provide accurate vehicle information and ensure timely record keeping.</p>
      <h2>2. Service Scope</h2>
      <p>MotoCare provides vehicle management, fuel logging, and service reminder services.</p>
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20 shadow-2xs">
          <FileText className="h-3.5 w-3.5" /> Terms of Service
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
          {title}
        </h1>
        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground pt-1">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-amber-500" /> Last Updated: {updatedAt}
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
