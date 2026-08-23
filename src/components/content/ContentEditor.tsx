"use client";

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { Image } from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TextAlign } from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { Highlight } from "@tiptap/extension-highlight";
import { FontFamily } from "@tiptap/extension-font-family";
import { Subscript as SubscriptExtension } from "@tiptap/extension-subscript";
import { Superscript as SuperscriptExtension } from "@tiptap/extension-superscript";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Extension } from "@tiptap/core";

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
  Unlink,
  Table as TableIcon,
  Code,
  Eye,
  RotateCcw,
  Quote,
  Minus,
  Undo,
  Redo,
  Palette,
  Highlighter,
  Trash2,
  PlusCircle,
  Subscript,
  Superscript,
  CheckSquare,
  Wand2,
  Type,
  Rows3 as LineHeightIcon,
} from "lucide-react";
import { toast } from "sonner";

// Custom FontSize Extension
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
    lineHeight: {
      setLineHeight: (height: string) => ReturnType;
      unsetLineHeight: () => ReturnType;
    };
  }
}

const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize?.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
          ({ chain }) => {
            return chain().setMark("textStyle", { fontSize }).run();
          },
      unsetFontSize:
        () =>
          ({ chain }) => {
            return chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run();
          },
    };
  },
});

// Custom LineHeight Extension for Line Spacing / Auto Adjust
const LineHeight = Extension.create({
  name: "lineHeight",
  addOptions() {
    return {
      types: ["paragraph", "heading"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => element.style.lineHeight || null,
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) {
                return {};
              }
              return {
                style: `line-height: ${attributes.lineHeight}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineHeight:
        (lineHeight: string) =>
          ({ commands }) => {
            return commands.updateAttributes("paragraph", { lineHeight }) || commands.updateAttributes("heading", { lineHeight });
          },
      unsetLineHeight:
        () =>
          ({ commands }) => {
            return commands.updateAttributes("paragraph", { lineHeight: null }) || commands.updateAttributes("heading", { lineHeight: null });
          },
    };
  },
});

interface ContentEditorProps {
  contentType: "privacy_policy" | "terms_conditions" | "about_us";
  defaultTitle: string;
  defaultContent: string;
}

export function ContentEditor({ contentType, defaultTitle, defaultContent }: ContentEditorProps) {
  // Helper to clean HTML entities, extension attributes, and redundant empty lines
  const cleanAndUnescapeHtml = (input: string): string => {
    if (!input) return "";
    let clean = input.replace(/\s*bis_skin_checked="[^"]*"/gi, "");
    if (clean.includes("&lt;") || clean.includes("&gt;")) {
      clean = clean
        .replace(/<h1>&lt;/gi, "&lt;")
        .replace(/&gt;<\/h1>/gi, "&gt;")
        .replace(/<p>&lt;/gi, "&lt;")
        .replace(/&gt;<\/p>/gi, "&gt;");

      if (typeof window !== "undefined") {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = clean;
        clean = textarea.value;
      }
    }
    return clean.replace(/\s*bis_skin_checked="[^"]*"/gi, "");
  };

  const [title, setTitle] = useState(defaultTitle);
  const initialCleanContent = cleanAndUnescapeHtml(defaultContent);
  const [htmlContent, setHtmlContent] = useState(initialCleanContent);
  const [isCodeView, setIsCodeView] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Custom Color State
  const [customColor, setCustomColor] = useState("#FF5E13");
  const [customHighlight, setCustomHighlight] = useState("#FEF08A");

  // Target type resolution
  const targetType =
    contentType ||
    (defaultTitle.toLowerCase().includes("privacy")
      ? "privacy_policy"
      : defaultTitle.toLowerCase().includes("term")
        ? "terms_conditions"
        : defaultTitle.toLowerCase().includes("about")
          ? "about_us"
          : "privacy_policy");

  // Initialize Tiptap Editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      Underline,
      TextStyle,
      FontSize,
      LineHeight,
      FontFamily,
      Color,
      Highlight.configure({ multicolor: true }),
      SubscriptExtension,
      SuperscriptExtension,
      TaskList,
      TaskItem.configure({ nested: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      CharacterCount,
      Placeholder.configure({
        placeholder: "Write document content here...",
      }),
    ],
    content: initialCleanContent,
    onUpdate({ editor }) {
      const currentHtml = cleanAndUnescapeHtml(editor.getHTML());
      setHtmlContent(currentHtml);
    },
    immediatelyRender: false,
  });

  // Sync content when switching back from Raw HTML view to WYSIWYG
  useEffect(() => {
    if (editor && !isCodeView) {
      const currentEditorHtml = cleanAndUnescapeHtml(editor.getHTML());
      if (currentEditorHtml !== htmlContent) {
        editor.commands.setContent(htmlContent);
      }
    }
  }, [isCodeView, editor, htmlContent]);

  // Insert Image Dialog
  const handleInsertImage = () => {
    if (!editor) return;
    const url = prompt("Enter Image URL (e.g. https://images.unsplash.com/... or Supabase Bucket URL):");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // Insert Link Dialog
  const handleInsertLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = prompt("Enter Link URL (e.g. https://motocare.app):", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  // Insert Table
  const handleInsertTable = () => {
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  // Auto Adjust & Fix Spacing / Format Function
  const handleAutoAdjustSpacing = () => {
    if (!editor) return;
    let content = editor.getHTML();

    // 1. Remove empty <p></p>, <p><br></p>, <p>&nbsp;</p> and excessive linebreaks
    content = cleanAndUnescapeHtml(content);
    content = content
      .replace(/<p>\s*<\/p>/gi, "")
      .replace(/<p>&nbsp;<\/p>/gi, "")
      .replace(/<p><br\s*\/?>\s*<\/p>/gi, "")
      .replace(/(<br\s*\/?>){2,}/gi, "<br/>")
      .replace(/margin-(top|bottom):\s*\d+px;?/gi, "");

    // 2. Set clean content back to editor
    editor.commands.setContent(content);

    // 3. Apply normalized line height (1.6) across all paragraphs
    editor.chain().focus().selectAll().setLineHeight("1.6").run();

    setHtmlContent(editor.getHTML());
    toast.success("Text spacing auto-adjusted & extra gaps fixed!");
  };

  // Save Content to Supabase
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const rawContent = isCodeView ? htmlContent : (editor ? editor.getHTML() : htmlContent);
    const finalContent = cleanAndUnescapeHtml(rawContent);

    try {
      await updateAppContentAction({
        contentType: targetType,
        content_type: targetType,
        slug: targetType,
        title,
        content: finalContent,
      });
      toast.success("Document saved & published live to Supabase!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save content.";
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  // Font Families
  const fontFamilies = [
    { label: "Default Sans", value: "" },
    { label: "Inter", value: "Inter, sans-serif" },
    { label: "Roboto", value: "Roboto, sans-serif" },
    { label: "Georgia (Serif)", value: "Georgia, serif" },
    { label: "Courier (Mono)", value: "'Courier New', monospace" },
    { label: "Comic Sans", value: "'Comic Sans MS', cursive" },
    { label: "Impact", value: "Impact, sans-serif" },
  ];

  // Font Sizes
  const fontSizes = [
    { label: "Default Size", value: "" },
    { label: "12px (Small)", value: "12px" },
    { label: "14px (Normal)", value: "14px" },
    { label: "16px (Medium)", value: "16px" },
    { label: "18px (Large)", value: "18px" },
    { label: "22px (XL)", value: "22px" },
    { label: "28px (Title)", value: "28px" },
    { label: "36px (Jumbo)", value: "36px" },
  ];

  // Line Spacing / Line Height options
  const lineHeights = [
    { label: "Auto Spacing", value: "" },
    { label: "Tight (1.2)", value: "1.2" },
    { label: "Compact (1.4)", value: "1.4" },
    { label: "Normal (1.6)", value: "1.6" },
    { label: "Relaxed (1.85)", value: "1.85" },
    { label: "Double (2.0)", value: "2.0" },
  ];

  // Preset Colors
  const presetColors = [
    { label: "Default", color: "" },
    { label: "Orange", color: "#FF5E13" },
    { label: "Navy", color: "#1B2850" },
    { label: "Emerald", color: "#10B981" },
    { label: "Blue", color: "#3B82F6" },
    { label: "Red", color: "#EF4444" },
    { label: "Purple", color: "#8B5CF6" },
  ];

  return (
    <Card className="max-w-5xl shadow-xl border-border/80">
      <CardHeader className="pb-3 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-orange-500" /> Managing HTML Content: {defaultTitle}
            </CardTitle>
            <CardDescription className="text-xs mt-0.5">
              Full Tiptap Editor Suite with Line Spacing, Auto Adjust & Gap Fixer.
            </CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={
                targetType === "privacy_policy"
                  ? "/privacy-policy"
                  : targetType === "terms_conditions"
                    ? "/terms-condition"
                    : "/about-us"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors shadow-2xs"
            >
              <Eye className="h-3.5 w-3.5" /> View Live Page
            </a>

            {/* Auto Adjust Button */}
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={handleAutoAdjustSpacing}
              className="h-8 text-xs gap-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold shadow-sm border-none"
              title="Auto Adjust Text Spacing, Fix Gaps & Format Beautifully"
            >
              <Wand2 className="h-3.5 w-3.5" /> Auto Adjust & Fix Gaps
            </Button>

            <Button
              type="button"
              variant={isCodeView ? "default" : "outline"}
              size="sm"
              onClick={() => {
                if (!isCodeView && editor) {
                  setHtmlContent(cleanAndUnescapeHtml(editor.getHTML()));
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

          {/* Complete Tiptap Toolbar */}
          {!isCodeView && editor && (
            <div className="rounded-t-lg bg-muted/90 border border-b-0 p-2.5 flex flex-wrap items-center gap-1.5 text-xs shadow-xs">
              {/* Font Family Selector */}
              <div className="flex items-center gap-1 bg-card px-2 py-1 rounded border border-border shadow-2xs">
                <Type className="h-3.5 w-3.5 text-muted-foreground" title="Font Family" />
                <select
                  onChange={(e) => {
                    const font = e.target.value;
                    if (!font) editor.chain().focus().unsetFontFamily().run();
                    else editor.chain().focus().setFontFamily(font).run();
                  }}
                  className="h-6 bg-transparent text-xs font-medium focus:outline-hidden text-foreground cursor-pointer"
                  title="Choose Font Family"
                >
                  {fontFamilies.map((f) => (
                    <option key={f.label} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Font Size Selector */}
              <div className="flex items-center gap-1 bg-card px-2 py-1 rounded border border-border shadow-2xs">
                <span className="text-[11px] font-bold text-muted-foreground">Size</span>
                <select
                  onChange={(e) => {
                    const size = e.target.value;
                    if (!size) editor.chain().focus().unsetFontSize().run();
                    else editor.chain().focus().setFontSize(size).run();
                  }}
                  className="h-6 bg-transparent text-xs font-medium focus:outline-hidden text-foreground cursor-pointer"
                  title="Choose Font Size"
                >
                  {fontSizes.map((s) => (
                    <option key={s.label} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Line Spacing / Line Height Dropdown */}
              <div className="flex items-center gap-1 bg-card px-2 py-1 rounded border border-border shadow-2xs">
                <LineHeightIcon className="h-3.5 w-3.5 text-muted-foreground" title="Line Spacing" />
                <select
                  onChange={(e) => {
                    const height = e.target.value;
                    if (!height) editor.chain().focus().unsetLineHeight().run();
                    else editor.chain().focus().setLineHeight(height).run();
                  }}
                  className="h-6 bg-transparent text-xs font-medium focus:outline-hidden text-foreground cursor-pointer"
                  title="Line Spacing / Line Height"
                >
                  {lineHeights.map((l) => (
                    <option key={l.label} value={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Heading Selector */}
              <select
                value={
                  editor.isActive("heading", { level: 1 })
                    ? "h1"
                    : editor.isActive("heading", { level: 2 })
                      ? "h2"
                      : editor.isActive("heading", { level: 3 })
                        ? "h3"
                        : editor.isActive("heading", { level: 4 })
                          ? "h4"
                          : "p"
                }
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "p") editor.chain().focus().setParagraph().run();
                  else if (val === "h1") editor.chain().focus().toggleHeading({ level: 1 }).run();
                  else if (val === "h2") editor.chain().focus().toggleHeading({ level: 2 }).run();
                  else if (val === "h3") editor.chain().focus().toggleHeading({ level: 3 }).run();
                  else if (val === "h4") editor.chain().focus().toggleHeading({ level: 4 }).run();
                }}
                className="h-8 rounded border bg-card px-2 text-xs font-semibold focus:ring-1 focus:ring-ring text-foreground shadow-2xs"
              >
                <option value="p">Normal Paragraph</option>
                <option value="h1">Heading 1 (Large)</option>
                <option value="h2">Heading 2 (Medium)</option>
                <option value="h3">Heading 3 (Small)</option>
                <option value="h4">Heading 4</option>
              </select>

              <div className="h-5 w-px bg-border my-auto mx-1" />

              {/* Text Formatting Controls */}
              <Button
                type="button"
                variant={editor.isActive("bold") ? "default" : "ghost"}
                size="sm"
                className={`h-8 w-8 p-0 ${editor.isActive("bold") ? "bg-orange-500 text-white font-bold" : ""}`}
                title="Bold (Ctrl+B)"
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <Bold className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant={editor.isActive("italic") ? "default" : "ghost"}
                size="sm"
                className={`h-8 w-8 p-0 ${editor.isActive("italic") ? "bg-orange-500 text-white font-bold" : ""}`}
                title="Italic (Ctrl+I)"
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <Italic className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant={editor.isActive("underline") ? "default" : "ghost"}
                size="sm"
                className={`h-8 w-8 p-0 ${editor.isActive("underline") ? "bg-orange-500 text-white font-bold" : ""}`}
                title="Underline (Ctrl+U)"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                <UnderlineIcon className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant={editor.isActive("strike") ? "default" : "ghost"}
                size="sm"
                className={`h-8 w-8 p-0 ${editor.isActive("strike") ? "bg-orange-500 text-white font-bold" : ""}`}
                title="Strikethrough"
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <Strikethrough className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant={editor.isActive("subscript") ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                title="Subscript (x₂)"
                onClick={() => editor.chain().focus().toggleSubscript().run()}
              >
                <Subscript className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant={editor.isActive("superscript") ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                title="Superscript (x²)"
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
              >
                <Superscript className="h-4 w-4" />
              </Button>

              <div className="h-5 w-px bg-border my-auto mx-1" />

              {/* Alignments */}
              <Button
                type="button"
                variant={editor.isActive({ textAlign: "left" }) ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                title="Align Left"
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant={editor.isActive({ textAlign: "center" }) ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                title="Align Center"
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant={editor.isActive({ textAlign: "right" }) ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                title="Align Right"
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
              >
                <AlignRight className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant={editor.isActive({ textAlign: "justify" }) ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                title="Justify"
                onClick={() => editor.chain().focus().setTextAlign("justify").run()}
              >
                <AlignJustify className="h-4 w-4" />
              </Button>

              <div className="h-5 w-px bg-border my-auto mx-1" />

              {/* Interactive Color Picker */}
              <div className="flex items-center gap-1 bg-card px-2 py-0.5 rounded border border-border shadow-2xs">
                <Palette className="h-3.5 w-3.5 text-muted-foreground" title="Text Color" />
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor(e.target.value);
                    editor.chain().focus().setColor(e.target.value).run();
                  }}
                  className="h-5 w-5 rounded border-none cursor-pointer bg-transparent"
                  title="Pick Custom Text Color"
                />
                <select
                  onChange={(e) => {
                    const color = e.target.value;
                    if (!color) editor.chain().focus().unsetColor().run();
                    else {
                      setCustomColor(color);
                      editor.chain().focus().setColor(color).run();
                    }
                  }}
                  className="h-6 bg-transparent text-[11px] font-semibold focus:outline-hidden text-foreground cursor-pointer"
                  title="Preset Text Colors"
                >
                  {presetColors.map((c) => (
                    <option key={c.label} value={c.color}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Highlight Picker */}
              <div className="flex items-center gap-1 bg-card px-2 py-0.5 rounded border border-border shadow-2xs">
                <Highlighter className="h-3.5 w-3.5 text-muted-foreground" title="Highlight Color" />
                <input
                  type="color"
                  value={customHighlight}
                  onChange={(e) => {
                    setCustomHighlight(e.target.value);
                    editor.chain().focus().toggleHighlight({ color: e.target.value }).run();
                  }}
                  className="h-5 w-5 rounded border-none cursor-pointer bg-transparent"
                  title="Pick Custom Highlight Color"
                />
              </div>

              <div className="h-5 w-px bg-border my-auto mx-1" />

              {/* Lists, Tasks & Blockquote */}
              <Button
                type="button"
                variant={editor.isActive("bulletList") ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                title="Bullet List"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant={editor.isActive("orderedList") ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                title="Numbered List"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant={editor.isActive("taskList") ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                title="Task Checkbox List"
                onClick={() => editor.chain().focus().toggleTaskList().run()}
              >
                <CheckSquare className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant={editor.isActive("blockquote") ? "default" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                title="Quote Block"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                <Quote className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                title="Horizontal Divider"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
              >
                <Minus className="h-4 w-4" />
              </Button>

              <div className="h-5 w-px bg-border my-auto mx-1" />

              {/* Media & Table */}
              <Button
                type="button"
                variant={editor.isActive("link") ? "default" : "outline"}
                size="sm"
                className="h-8 px-2 gap-1 text-xs"
                title="Insert or Edit Link"
                onClick={handleInsertLink}
              >
                <LinkIcon className="h-3.5 w-3.5" /> Link
              </Button>

              {editor.isActive("link") && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-destructive"
                  title="Remove Link"
                  onClick={() => editor.chain().focus().unsetLink().run()}
                >
                  <Unlink className="h-3.5 w-3.5" />
                </Button>
              )}

              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="h-8 px-2 gap-1 text-xs text-orange-600 bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/40 dark:text-orange-400 font-semibold"
                title="Insert Image URL"
                onClick={handleInsertImage}
              >
                <ImageIcon className="h-3.5 w-3.5" /> Image
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 px-2 gap-1 text-xs"
                title="Insert Table (3x3)"
                onClick={handleInsertTable}
              >
                <TableIcon className="h-3.5 w-3.5" /> Add Table
              </Button>

              {/* Table Quick Controls if Table Active */}
              {editor.isActive("table") && (
                <div className="flex items-center gap-1 bg-orange-500/10 p-1 rounded border border-orange-500/20">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 text-[10px] px-1.5 text-orange-600"
                    title="Add Row"
                    onClick={() => editor.chain().focus().addRowAfter().run()}
                  >
                    <PlusCircle className="h-3 w-3 mr-0.5" /> Row
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 text-[10px] px-1.5 text-orange-600"
                    title="Add Column"
                    onClick={() => editor.chain().focus().addColumnAfter().run()}
                  >
                    <PlusCircle className="h-3 w-3 mr-0.5" /> Col
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"
                    title="Delete Table"
                    onClick={() => editor.chain().focus().deleteTable().run()}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}

              <div className="h-5 w-px bg-border my-auto mx-1" />

              {/* History & Clear Formatting */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                title="Undo (Ctrl+Z)"
                disabled={!editor.can().undo()}
                onClick={() => editor.chain().focus().undo().run()}
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                title="Redo (Ctrl+Y)"
                disabled={!editor.can().redo()}
                onClick={() => editor.chain().focus().redo().run()}
              >
                <Redo className="h-4 w-4" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground ml-auto"
                title="Clear Formatting"
                onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Editor Container */}
          {!isCodeView ? (
            <div className="rounded-b-lg border bg-card p-6 min-h-[420px] max-h-[650px] overflow-y-auto focus-within:ring-1 focus-within:ring-ring leading-relaxed shadow-inner">
              <EditorContent editor={editor} className="prose-editor privacy-policy html-content-view" />
            </div>
          ) : (
            /* HTML Source Code View */
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono text-muted-foreground">Raw HTML Source Code</label>
                <span className="text-[11px] text-orange-600 font-medium">Paste HTML code here directly</span>
              </div>
              <textarea
                value={htmlContent}
                onChange={(e) => {
                  const cleaned = cleanAndUnescapeHtml(e.target.value);
                  setHtmlContent(cleaned);
                  if (editor) {
                    editor.commands.setContent(cleaned);
                  }
                }}
                rows={18}
                className="w-full rounded-lg border bg-card p-4 font-mono text-xs text-foreground focus:ring-1 focus:ring-ring focus:outline-hidden leading-relaxed shadow-inner"
                required
              />
            </div>
          )}

          {/* Realtime Stats & Save Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t">
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Tiptap Suite Active
              </span>
              {editor && (
                <>
                  <span>• {editor.storage.characterCount.words()} Words</span>
                  <span>• {editor.storage.characterCount.characters()} Characters</span>
                </>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSaving}
              className="gap-2 px-6 gradient-button hover:opacity-95 text-white font-semibold border-none shadow-md"
            >
              <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save & Publish Live"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
