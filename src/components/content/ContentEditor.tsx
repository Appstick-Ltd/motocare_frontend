"use client";

import React, { useState, useRef, useEffect } from "react";
import { updateAppContentAction } from "@/app/(dashboard)/content/actions";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Save,
  CheckCircle2,
  FileText,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Image as ImageIcon,
  Link as LinkIcon,
  Table as TableIcon,
  Code,
  Eye,
  Edit3,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface ContentEditorProps {
  contentType: "privacy_policy" | "terms_conditions" | "about_us";
  defaultTitle: string;
  defaultContent: string;
}

export function ContentEditor({ contentType, defaultTitle, defaultContent }: ContentEditorProps) {
  const [title, setTitle] = useState(defaultTitle);
  const [htmlContent, setHtmlContent] = useState(defaultContent);
  const [isCodeView, setIsCodeView] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Target type resolution
  const targetType = contentType || (
    defaultTitle.toLowerCase().includes("privacy") ? "privacy_policy" :
    defaultTitle.toLowerCase().includes("term") ? "terms_conditions" :
    defaultTitle.toLowerCase().includes("about") ? "about_us" : "privacy_policy"
  );

  // Sync initial content to contentEditable DOM on mount or change
  useEffect(() => {
    if (editorRef.current && !isCodeView) {
      if (editorRef.current.innerHTML !== htmlContent) {
        editorRef.current.innerHTML = htmlContent || "<p>Type document content here...</p>";
      }
    }
  }, [htmlContent, isCodeView]);

  // Execute Rich Text Command
  const execCmd = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setHtmlContent(editorRef.current.innerHTML);
    }
  };

  // Insert Image URL
  const handleInsertImage = () => {
    const url = prompt("Enter Image URL (e.g. https://images.unsplash.com/... or Supabase Bucket URL):");
    if (url) {
      const imgHtml = `<img src="${url}" alt="Inserted Image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 12px 0; display: block;" />`;
      execCmd("insertHTML", imgHtml);
    }
  };

  // Insert Hyperlink
  const handleInsertLink = () => {
    const url = prompt("Enter Link URL (e.g. https://motocare.app):");
    if (url) {
      execCmd("createLink", url);
    }
  };

  // Insert Formatted HTML Table
  const handleInsertTable = () => {
    const tableHtml = `
      <table style="width: 100%; border-collapse: collapse; margin: 16px 0; text-align: left; border: 1px solid var(--color-border, #e2e8f0);">
        <thead>
          <tr style="background: rgba(148, 163, 184, 0.1);">
            <th style="padding: 10px; border: 1px solid var(--color-border, #e2e8f0);">Header 1</th>
            <th style="padding: 10px; border: 1px solid var(--color-border, #e2e8f0);">Header 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border: 1px solid var(--color-border, #e2e8f0);">Data 1</td>
            <td style="padding: 10px; border: 1px solid var(--color-border, #e2e8f0);">Data 2</td>
          </tr>
        </tbody>
      </table>
    `;
    execCmd("insertHTML", tableHtml);
  };

  // Save Content to Supabase
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const finalContent = isCodeView ? htmlContent : (editorRef.current?.innerHTML || htmlContent);

    try {
      await updateAppContentAction({
        contentType: targetType,
        content_type: targetType,
        slug: targetType,
        title,
        content: finalContent,
      });
      toast.success("HTML Document saved & published to Supabase!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save content.";
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      setHtmlContent(editorRef.current.innerHTML);
    }
  };

  return (
    <Card className="max-w-5xl shadow-xl border-border/80">
      <CardHeader className="pb-3 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" /> Managing HTML Content: {defaultTitle}
            </CardTitle>
            <CardDescription className="text-xs mt-0.5">
              Full WYSIWYG HTML Editor. Insert images, tables, links, text formatting & alignments.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={isCodeView ? "default" : "outline"}
              size="sm"
              onClick={() => {
                if (!isCodeView && editorRef.current) {
                  setHtmlContent(editorRef.current.innerHTML);
                }
                setIsCodeView(!isCodeView);
              }}
              className="h-8 text-xs gap-1.5"
            >
              <Code className="h-3.5 w-3.5" /> {isCodeView ? "WYSIWYG View" : "HTML Source View"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-5 space-y-4">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <input type="hidden" name="contentType" value={targetType} />
          <input type="hidden" name="content_type" value={targetType} />
          <input type="hidden" name="slug" value={targetType} />

          <div className="space-y-1.5">
            <label className="font-semibold text-foreground">Document Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 text-sm font-medium"
              required
            />
          </div>

          {/* WYSIWYG HTML Toolbar */}
          {!isCodeView && (
            <div className="rounded-t-lg bg-muted/90 border border-b-0 p-2 flex flex-wrap items-center gap-1.5 text-xs shadow-xs">
              {/* Paragraph / Format Dropdown */}
              <select
                onChange={(e) => execCmd("formatBlock", e.target.value)}
                className="h-8 rounded border bg-card px-2 text-xs font-medium focus:ring-1 focus:ring-ring"
              >
                <option value="p">Normal Text</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="blockquote">Quote Block</option>
              </select>

              <div className="h-5 w-px bg-border my-auto mx-1" />

              {/* Basic Formatting */}
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title="Bold (Ctrl+B)" onClick={() => execCmd("bold")}>
                <Bold className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title="Italic (Ctrl+I)" onClick={() => execCmd("italic")}>
                <Italic className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title="Underline (Ctrl+U)" onClick={() => execCmd("underline")}>
                <UnderlineIcon className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title="Strikethrough" onClick={() => execCmd("strikeThrough")}>
                <Strikethrough className="h-4 w-4" />
              </Button>

              <div className="h-5 w-px bg-border my-auto mx-1" />

              {/* Alignments */}
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title="Align Left" onClick={() => execCmd("justifyLeft")}>
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title="Align Center" onClick={() => execCmd("justifyCenter")}>
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title="Align Right" onClick={() => execCmd("justifyRight")}>
                <AlignRight className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title="Justify" onClick={() => execCmd("justifyFull")}>
                <AlignJustify className="h-4 w-4" />
              </Button>

              <div className="h-5 w-px bg-border my-auto mx-1" />

              {/* Lists */}
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title="Unordered List" onClick={() => execCmd("insertUnorderedList")}>
                <List className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0" title="Ordered List" onClick={() => execCmd("insertOrderedList")}>
                <ListOrdered className="h-4 w-4" />
              </Button>

              <div className="h-5 w-px bg-border my-auto mx-1" />

              {/* Media & Tables */}
              <Button type="button" variant="secondary" size="sm" className="h-8 px-2.5 gap-1.5 text-xs font-semibold text-blue-500" title="Insert Image" onClick={handleInsertImage}>
                <ImageIcon className="h-3.5 w-3.5" /> Insert Image
              </Button>
              <Button type="button" variant="outline" size="sm" className="h-8 px-2.5 gap-1.5 text-xs" title="Insert Link" onClick={handleInsertLink}>
                <LinkIcon className="h-3.5 w-3.5" /> Insert Link
              </Button>
              <Button type="button" variant="outline" size="sm" className="h-8 px-2.5 gap-1.5 text-xs" title="Insert Table" onClick={handleInsertTable}>
                <TableIcon className="h-3.5 w-3.5" /> Insert Table
              </Button>

              <div className="h-5 w-px bg-border my-auto mx-1" />

              <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground" title="Clear Formatting" onClick={() => execCmd("removeFormat")}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Editor Area */}
          {!isCodeView ? (
            <div
              ref={editorRef}
              contentEditable
              onInput={handleInput}
              suppressContentEditableWarning
              className="min-h-[400px] max-h-[600px] overflow-y-auto rounded-b-lg border bg-card p-6 text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-ring leading-relaxed shadow-inner"
            />
          ) : (
            /* HTML Source View */
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-muted-foreground">Raw HTML Source Code</label>
              <textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                rows={18}
                className="w-full rounded-lg border bg-card p-4 font-mono text-xs text-foreground focus:ring-1 focus:ring-ring focus:outline-hidden leading-relaxed"
                required
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t">
            <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> HTML Content Sync Active
            </span>
            <Button type="submit" disabled={isSaving} className="gap-2 px-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold">
              <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save & Publish Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
