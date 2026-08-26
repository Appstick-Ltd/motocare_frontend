import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { formatDate } from "@/lib/utils";
import { Bell, CheckCircle2, Send, Sparkles } from "lucide-react";
import { NotificationForm } from "@/components/notifications/NotificationForm";

export const metadata = {
  title: "Notifications | MotoCare Admin",
};

export default async function NotificationsPage() {
  await requireAdminSession();
  const supabase = await createClient();

  let notificationsList: any[] = [];
  try {
    const { data: notifications, error } = await supabase
      .from("notifications")
      .select("*")
      .order("sent_at", { ascending: false });

    if (!error && notifications && notifications.length > 0) {
      notificationsList = notifications;
    } else {
      // Fallback to audit logs if notifications table is empty or pending creation
      const { data: auditLogs } = await supabase
        .from("audit_logs")
        .select("*")
        .eq("action", "PUSH_NOTIFICATION_SENT")
        .order("created_at", { ascending: false })
        .limit(20);

      if (auditLogs && auditLogs.length > 0) {
        notificationsList = auditLogs.map((log: any) => ({
          id: log.id,
          title: log.details?.title || "Broadcast Notification",
          message: log.details?.message || log.details?.body || "Message dispatched to mobile users.",
          target_audience: log.details?.targetAudience || "all",
          sent_at: log.created_at,
          status: "sent",
        }));
      }
    }
  } catch (err) {
    console.warn("Notice: Fetching notifications fallback:", err);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Push Notification Broadcasts
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dispatch real-time broadcast alerts and review push message delivery logs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Notification Form */}
        <div className="lg:col-span-1">
          <NotificationForm />
        </div>

        {/* Delivery History Log */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl p-6 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl space-y-5">
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Bell className="h-4 w-4 text-orange-400" />
                <span>Notification Delivery History</span>
              </h3>
              <p className="text-xs text-slate-400">
                Log of recent push notification broadcasts dispatched to app users.
              </p>
            </div>

            {notificationsList.length > 0 ? (
              <div className="divide-y divide-white/5 text-xs">
                {notificationsList.map((n: any) => (
                  <div key={n.id} className="py-4 space-y-2 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-white">{n.title}</h4>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-400 font-bold border border-orange-500/25 uppercase">
                        Audience: {String(n.target_audience || "all").replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed bg-black/20 p-3 rounded-xl border border-white/5">
                      {n.message}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Dispatched Successfully
                      </span>
                      <span>{formatDate(n.sent_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-14 text-center text-xs text-slate-400 space-y-2 bg-black/20 rounded-2xl border border-white/5">
                <Bell className="h-9 w-9 mx-auto text-slate-600 mb-1" />
                <p className="font-semibold text-slate-300">No Notifications Sent Yet</p>
                <p className="text-[11px] text-slate-500">
                  Compose and dispatch your first push notification broadcast using the form on the left.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
