import { createClient } from "@/lib/supabase/server";
import { AppContent } from "@/types/database.types";

/**
 * Utility to unescape HTML entity strings like `&lt;h1&gt;` or corrupted `<h1>&lt;` wrappers
 */
export function cleanAndUnescapeHtml(html: string): string {
  if (!html) return "";

  let cleaned = html;

  // Unescape common HTML entities
  cleaned = cleaned
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

  // Remove trailing or corrupted outer h1 escaping wrappers if any
  cleaned = cleaned.replace(/^<h1>\s*&lt;!DOCTYPE html&gt;/i, "<!DOCTYPE html>");
  cleaned = cleaned.replace(/^<h1>\s*&lt;html/i, "<html");
  cleaned = cleaned.replace(/^<h1>\s*&lt;/i, "<");

  // Strip extension-injected attributes like bis_skin_checked="1"
  cleaned = cleaned.replace(/\s*bis_skin_checked="[^"]*"/gi, "");

  // If content looks like Markdown / plain text (no HTML tags like <p>, <h1>, <div>)
  if (!/<[a-z1-6][\s\S]*>/i.test(cleaned)) {
    cleaned = cleaned
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br/>");
    cleaned = `<p>${cleaned}</p>`;
  }

  return cleaned;
}

/**
 * Fetch dynamic active content from Supabase app_content table by content_type
 */
export async function getAppContent(contentType: string): Promise<AppContent | null> {
  try {
    const supabase = await createClient();
    
    // Search with exact content_type or fallback aliases
    const { data, error } = await supabase
      .from("app_content")
      .select("*")
      .or(`content_type.eq.${contentType},slug.eq.${contentType}`)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      // Try fallback query without RLS restriction if public
      const { data: fallbackData } = await supabase
        .from("app_content")
        .select("*")
        .eq("content_type", contentType)
        .maybeSingle();
        
      return fallbackData ? (fallbackData as AppContent) : null;
    }

    return data as AppContent;
  } catch (err) {
    console.error("Error fetching app content from Supabase:", err);
    return null;
  }
}
