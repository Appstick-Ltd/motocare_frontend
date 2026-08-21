"use client";

import React, { useState } from "react";
import { updateAppContentAction } from "@/app/(dashboard)/content/actions";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, CheckCircle2, FileText } from "lucide-react";
import { toast } from "sonner";

interface ContentEditorProps {
  slug: "privacy-policy" | "terms-conditions" | "about-us";
  defaultTitle: string;
  defaultContent: string;
}

export function ContentEditor({ slug, defaultTitle, defaultContent }: ContentEditorProps) {
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateAppContentAction({ slug, title, content });
      toast.success("Document updated and published to Supabase!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save content.";
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-500" /> Managing: {defaultTitle}
        </CardTitle>
        <CardDescription>Changes saved here will sync directly to mobile client endpoints.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Document Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Markdown / Policy Body Text</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={16}
              className="w-full rounded-md border bg-transparent p-4 font-mono text-xs focus:ring-1 focus:ring-ring"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Real-time Supabase sync
            </span>
            <Button type="submit" disabled={isSaving} className="gap-2">
              <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save & Publish Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
