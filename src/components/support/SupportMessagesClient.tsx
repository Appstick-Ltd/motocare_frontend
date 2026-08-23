"use client";

import React, { useState, useTransition } from "react";
import { ContactMessage } from "@/types/database.types";
import {
  Search,
  MessageSquare,
  Send,
  Mail,
  User,
  Calendar,
  CheckCircle2,
  Clock,
  Trash2,
  RefreshCw,
  Eye,
  X,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Inbox,
  Filter,
  CheckCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import {
  sendContactReplyAction,
  updateMessageStatusAction,
  deleteContactMessageAction,
} from "@/app/(dashboard)/support/actions";

interface SupportMessagesClientProps {
  initialMessages: ContactMessage[];
}

export function SupportMessagesClient({
  initialMessages,
}: SupportMessagesClientProps) {
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Selected message for details view or reply modal
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  const [isPending, startTransition] = useTransition();

  // Sync state if initialMessages update
  React.useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Statistics calculation
  const totalCount = messages.length;
  const pendingCount = messages.filter(
    (m) => m.status === "pending" || !m.status
  ).length;
  const repliedCount = messages.filter((m) => m.status === "replied").length;
  const resolvedCount = messages.filter((m) => m.status === "resolved").length;

  // Filter messages
  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message?.toLowerCase().includes(searchQuery.toLowerCase());

    const currentStatus = msg.status || "pending";
    const matchesStatus =
      statusFilter === "all" || currentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenReply = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setReplyText("");
    setIsReplyOpen(true);
  };

  const handleOpenDetails = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setIsDetailsOpen(true);
  };

  const handleSendReply = async () => {
    if (!selectedMessage) return;
    if (!replyText.trim()) {
      toast.error("Please enter a reply message.");
      return;
    }

    startTransition(async () => {
      const res = await sendContactReplyAction({
        id: selectedMessage.id,
        userName: selectedMessage.name,
        userEmail: selectedMessage.email,
        subject: selectedMessage.subject,
        originalMessage: selectedMessage.message,
        replyText: replyText.trim(),
      });

      if (res.success) {
        toast.success(
          res.notice
            ? "Status updated to 'replied' (Notice: SMTP not configured)."
            : "Reply sent to user email successfully!"
        );
        // Optimistic UI update
        setMessages((prev) =>
          prev.map((m) =>
            m.id === selectedMessage.id ? { ...m, status: "replied" } : m
          )
        );
        setIsReplyOpen(false);
        setSelectedMessage(null);
        setReplyText("");
      } else {
        toast.error(res.error || "Failed to send reply.");
      }
    });
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    startTransition(async () => {
      const res = await updateMessageStatusAction(id, newStatus);
      if (res.success) {
        toast.success(`Message status updated to ${newStatus}`);
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
        if (selectedMessage?.id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      } else {
        toast.error(res.error || "Failed to update status.");
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact message?")) return;

    startTransition(async () => {
      const res = await deleteContactMessageAction(id);
      if (res.success) {
        toast.success("Message deleted");
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) {
          setIsDetailsOpen(false);
          setIsReplyOpen(false);
          setSelectedMessage(null);
        }
      } else {
        toast.error(res.error || "Failed to delete message.");
      }
    });
  };

  const getStatusBadge = (status?: string) => {
    const s = status || "pending";
    switch (s) {
      case "replied":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 border-blue-500/20 gap-1.5 py-0.5 font-bold">
            <CheckCircle2 className="h-3 w-3 text-blue-500" /> Replied
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20 gap-1.5 py-0.5 font-bold">
            <CheckCheck className="h-3 w-3 text-emerald-500" /> Resolved
          </Badge>
        );
      case "pending":
      default:
        return (
          <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border-amber-500/20 gap-1.5 py-0.5 font-bold">
            <Clock className="h-3 w-3 text-amber-500 animate-pulse" /> Pending Response
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* ─── Metric Cards Header ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          className={`cursor-pointer transition-all duration-200 border-l-4 ${
            statusFilter === "all"
              ? "border-l-orange-500 bg-orange-500/5 shadow-sm"
              : "border-l-muted hover:border-l-orange-500/50"
          }`}
          onClick={() => setStatusFilter("all")}
        >
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Total Inquiries
              </p>
              <h3 className="text-2xl font-black tracking-tight text-foreground mt-1">
                {totalCount}
              </h3>
            </div>
            <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
              <Inbox className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all duration-200 border-l-4 ${
            statusFilter === "pending"
              ? "border-l-amber-500 bg-amber-500/5 shadow-sm"
              : "border-l-muted hover:border-l-amber-500/50"
          }`}
          onClick={() => setStatusFilter("pending")}
        >
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Pending Response
              </p>
              <h3 className="text-2xl font-black tracking-tight text-amber-600 dark:text-amber-400 mt-1">
                {pendingCount}
              </h3>
            </div>
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
              <Clock className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all duration-200 border-l-4 ${
            statusFilter === "replied"
              ? "border-l-blue-500 bg-blue-500/5 shadow-sm"
              : "border-l-muted hover:border-l-blue-500/50"
          }`}
          onClick={() => setStatusFilter("replied")}
        >
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Replied via Email
              </p>
              <h3 className="text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400 mt-1">
                {repliedCount}
              </h3>
            </div>
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
              <Send className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all duration-200 border-l-4 ${
            statusFilter === "resolved"
              ? "border-l-emerald-500 bg-emerald-500/5 shadow-sm"
              : "border-l-muted hover:border-l-emerald-500/50"
          }`}
          onClick={() => setStatusFilter("resolved")}
        >
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Resolved Issues
              </p>
              <h3 className="text-2xl font-black tracking-tight text-emerald-600 dark:text-emerald-400 mt-1">
                {resolvedCount}
              </h3>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
              <CheckCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ─── Search and Filters Bar ─── */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium mr-1">
              <Filter className="h-3.5 w-3.5" /> Filter:
            </span>
            {["all", "pending", "replied", "resolved"].map((st) => (
              <Button
                key={st}
                variant={statusFilter === st ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(st)}
                className={`text-xs capitalize h-8 ${
                  statusFilter === st
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold"
                    : "text-muted-foreground"
                }`}
              >
                {st}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ─── Messages List Table ─── */}
      <Card>
        <CardHeader className="pb-3 border-b border-border/60">
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="h-4.5 w-4.5 text-orange-500" />
            Contact Messages & User Inquiries
          </CardTitle>
          <CardDescription>
            Messages submitted from the MotoCare app contact us form. Click on any message to view details or send a direct email reply.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {filteredMessages.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-muted/40 text-muted-foreground font-bold border-b uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-3.5">User Info</th>
                    <th className="px-6 py-3.5">Subject & Preview</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Submitted Date</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredMessages.map((msg) => {
                    const initials = msg.name
                      ? msg.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .substring(0, 2)
                          .toUpperCase()
                      : "MC";

                    return (
                      <tr
                        key={msg.id}
                        className="hover:bg-muted/30 transition-colors group cursor-pointer"
                        onClick={() => handleOpenDetails(msg)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                              {initials}
                            </div>
                            <div>
                              <div className="font-bold text-foreground text-sm group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                {msg.name || "Anonymous User"}
                              </div>
                              <div className="text-muted-foreground text-[11px] flex items-center gap-1">
                                <Mail className="h-3 w-3" /> {msg.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 max-w-xs">
                          <div className="font-bold text-foreground truncate">
                            {msg.subject || "No Subject"}
                          </div>
                          <div className="text-muted-foreground text-[11px] line-clamp-1 mt-0.5">
                            {msg.message}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(msg.status)}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-muted-foreground text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground/70" />
                            {formatDate(msg.created_at)}
                          </div>
                        </td>

                        <td
                          className="px-6 py-4 whitespace-nowrap text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenReply(msg)}
                              className="h-8 px-2.5 text-xs gap-1.5 border-orange-500/30 text-orange-600 dark:text-orange-400 hover:bg-orange-500/10 font-bold"
                            >
                              <Send className="h-3.5 w-3.5" /> Reply
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleOpenDetails(msg)}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                              title="View Details"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(msg.id)}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                              title="Delete Message"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-16 text-center text-xs text-muted-foreground space-y-3">
              <div className="h-12 w-12 rounded-full bg-muted/60 mx-auto flex items-center justify-center text-muted-foreground">
                <HelpCircle className="h-6 w-6" />
              </div>
              <p className="font-semibold text-sm text-foreground">
                No contact messages found
              </p>
              <p className="text-muted-foreground max-w-xs mx-auto">
                {searchQuery || statusFilter !== "all"
                  ? "Try clearing your search query or changing the status filter."
                  : "When users send support inquiries from the app, they will show up here."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ─── MESSAGE DETAILS MODAL ─── */}
      {isDetailsOpen && selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card text-card-foreground border border-border/80 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground">
                    Support Message Details
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Received on {formatDate(selectedMessage.created_at)}
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDetailsOpen(false)}
                className="h-8 w-8 p-0 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-muted/40 border border-border/50 text-xs">
                <div>
                  <span className="text-muted-foreground font-semibold uppercase text-[10px] block">
                    Sender Name
                  </span>
                  <span className="font-bold text-foreground text-sm">
                    {selectedMessage.name}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground font-semibold uppercase text-[10px] block">
                    Email Address
                  </span>
                  <span className="font-bold text-foreground text-sm flex items-center gap-1">
                    {selectedMessage.email}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground font-semibold uppercase text-[10px] block">
                    User ID
                  </span>
                  <span className="font-mono text-muted-foreground">
                    {selectedMessage.user_id || "N/A (Guest)"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground font-semibold uppercase text-[10px] block">
                    Current Status
                  </span>
                  <div className="mt-1">
                    {getStatusBadge(selectedMessage.status)}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Subject
                </span>
                <h4 className="text-base font-extrabold text-foreground p-3 rounded-xl bg-background border border-border/60">
                  {selectedMessage.subject || "No Subject"}
                </h4>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  User Message
                </span>
                <div className="p-4 rounded-xl bg-muted/30 border border-border text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 border-t border-border bg-muted/20 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Set Status:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleStatusChange(selectedMessage.id, "pending")
                  }
                  disabled={isPending}
                  className="h-8 text-xs"
                >
                  Pending
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleStatusChange(selectedMessage.id, "resolved")
                  }
                  disabled={isPending}
                  className="h-8 text-xs text-emerald-600 border-emerald-500/30"
                >
                  Resolved
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDetailsOpen(false)}
                  className="h-9 px-4 text-xs"
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setIsDetailsOpen(false);
                    handleOpenReply(selectedMessage);
                  }}
                  className="h-9 px-4 text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold gap-2 shadow-md shadow-orange-500/20"
                >
                  <Send className="h-3.5 w-3.5" /> Send Email Reply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── EMAIL REPLY MODAL ─── */}
      {isReplyOpen && selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card text-card-foreground border border-border/80 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Reply Header */}
            <div className="p-5 border-b border-border flex items-center justify-between bg-gradient-to-r from-orange-500/10 to-amber-500/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/20">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground">
                    Send Email Reply to User
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    To: <span className="font-bold text-foreground">{selectedMessage.name}</span> &lt;{selectedMessage.email}&gt;
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReplyOpen(false)}
                className="h-8 w-8 p-0 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Reply Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {/* Original Query Snapshot */}
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 text-xs space-y-1">
                <span className="font-bold text-muted-foreground uppercase text-[10px] tracking-wider block">
                  Original Query: {selectedMessage.subject}
                </span>
                <p className="text-muted-foreground line-clamp-3 italic">
                  &quot;{selectedMessage.message}&quot;
                </p>
              </div>

              {/* Quick Reply Templates */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-orange-500" /> Quick Reply Templates (Click to fill):
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setReplyText(
                        `We have investigated and resolved the issue regarding "${selectedMessage.subject || "your inquiry"}". Please check the MotoCare app and confirm if everything works as expected.\n\nThank you for reaching out to MotoCare Support!`
                      )
                    }
                    className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all cursor-pointer"
                  >
                    ✅ Issue Resolved
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setReplyText(
                        `We have received your inquiry regarding "${selectedMessage.subject || "your issue"}" and our technical team is actively investigating it. We will notify you as soon as an update is available.\n\nThank you for your patience!`
                      )
                    }
                    className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 transition-all cursor-pointer"
                  >
                    🔍 In Progress
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setReplyText(
                        `Regarding your inquiry "${selectedMessage.subject || "your issue"}", could you please share a bit more detail or a screenshot of the issue you are experiencing?\n\nThis will help our team assist you faster!`
                      )
                    }
                    className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-all cursor-pointer"
                  >
                    ❓ Need More Info
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setReplyText(
                        `We appreciate your feedback and cooperation regarding "${selectedMessage.subject || "your inquiry"}". If you have any further questions, feel free to reach out anytime.\n\nBest regards,\nMotoCare Support Team`
                      )
                    }
                    className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 border border-purple-500/20 transition-all cursor-pointer"
                  >
                    🙏 General Thanks
                  </button>
                </div>
              </div>

              {/* Reply Input Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center justify-between">
                  <span>Your Email Response (HTML Formatted Template)</span>
                  <span className="text-[10px] text-muted-foreground font-normal">
                    This reply will be emailed directly to user
                  </span>
                </label>
                <textarea
                  rows={7}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Hello ${selectedMessage.name},\n\nThank you for reaching out. Regarding your query...`}
                  className="w-full rounded-xl border border-input bg-background p-3.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500/50 resize-y"
                />
              </div>
            </div>

            {/* Reply Footer */}
            <div className="p-4 border-t border-border bg-muted/20 flex items-center justify-between gap-3">
              <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-orange-500" /> Uses MotoCare Branded Email Template
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsReplyOpen(false)}
                  disabled={isPending}
                  className="h-9 px-4 text-xs"
                >
                  Cancel
                </Button>

                <Button
                  size="sm"
                  onClick={handleSendReply}
                  disabled={isPending || !replyText.trim()}
                  className="h-9 px-5 text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold gap-2 shadow-md shadow-orange-500/20"
                >
                  {isPending ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Sending Email...
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" /> Send Response Now
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
