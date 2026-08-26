"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notificationSchema, NotificationInput } from "@/lib/validations";
import { sendPushNotificationAction } from "@/app/(dashboard)/notifications/actions";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function NotificationForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NotificationInput>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      title: "",
      message: "",
      target_audience: "all",
    },
  });

  const onSubmit = async (data: NotificationInput) => {
    setIsLoading(true);
    try {
      const res = await sendPushNotificationAction(data);
      toast.success(res?.message || "Push notification broadcast dispatched successfully!");
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to dispatch notification.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-3xl p-6 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl space-y-5">
      <div className="space-y-1">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <Send className="h-4 w-4 text-orange-400" />
          <span>Compose Push Broadcast</span>
        </h3>
        <p className="text-xs text-slate-400">
          Target active mobile app users or specific user groups with instant notifications.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-200">Notification Title</label>
          <Input
            {...register("title")}
            placeholder="e.g. Scheduled Service Reminder"
            className="bg-black/30 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:border-orange-500"
          />
          {errors.title && <p className="text-red-400 text-[11px]">{errors.title.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="font-semibold text-slate-200">Target Audience</label>
          <select
            {...register("target_audience")}
            className="w-full h-10 rounded-xl border border-white/10 bg-black/40 px-3 text-xs text-white focus:outline-hidden focus:border-orange-500"
          >
            <option value="all" className="bg-slate-900 text-white">All Registered Mobile App Users</option>
            <option value="active_users" className="bg-slate-900 text-white">Active App Users Only</option>
            <option value="super_admins" className="bg-slate-900 text-white">Admins &amp; Fleet Staff</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="font-semibold text-slate-200">Push Message Body</label>
          <textarea
            {...register("message")}
            rows={4}
            placeholder="Enter the push notification message body to be broadcasted..."
            className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-orange-500"
          />
          {errors.message && <p className="text-red-400 text-[11px]">{errors.message.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-lg shadow-orange-500/20 transition-all gap-2"
        >
          {isLoading ? "Broadcasting..." : (
            <>
              <Send className="h-4 w-4" /> Send Broadcast Now
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
