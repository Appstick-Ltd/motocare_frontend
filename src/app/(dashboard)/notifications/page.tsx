import React from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { NotificationItem } from "@/types/database.types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate } from "@/lib/utils";
import { Bell, Plus, Send, CheckCircle2 } from "lucide-react";
import { NotificationForm } from "@/components/notifications/NotificationForm";

export const metadata = {
  title: "Notifications | MotoCare Admin",
};

export default async function NotificationsPage() {
  await requireAdminSession();
  const supabase = await createClient();

  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .order("sent_at", { ascending: false });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Push Notification Management</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Dispatch broadcast notifications and review push message delivery history.
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
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4 text-blue-500" /> Notification Broadcast History
              </CardTitle>
              <CardDescription>Sent notifications and targeted audience groups</CardDescription>
            </CardHeader>
            <CardContent>
              {notifications && notifications.length > 0 ? (
                <div className="divide-y text-xs">
                  {notifications.map((n: NotificationItem) => (
                    <div key={n.id} className="py-4 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-foreground">{n.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 uppercase font-semibold">
                          Target: {n.target_audience.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{n.message}</p>
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                        <span className="flex items-center gap-1 text-emerald-500">
                          <CheckCircle2 className="h-3 w-3" /> Sent via Supabase Engine
                        </span>
                        <span>{formatDate(n.sent_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-muted-foreground space-y-2">
                  <Bell className="h-8 w-8 mx-auto text-muted-foreground/40" />
                  <p>No push notification broadcasts sent yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
