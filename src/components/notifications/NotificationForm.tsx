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
      await sendPushNotificationAction(data);
      toast.success("Notification broadcast dispatched successfully!");
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to dispatch notification.";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Send className="h-4 w-4 text-blue-500" /> Compose Push Broadcast
        </CardTitle>
        <CardDescription>Target active app users or specific admin roles</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-medium text-foreground">Notification Title</label>
            <Input {...register("title")} placeholder="e.g. Scheduled Service Reminder" />
            {errors.title && <p className="text-destructive text-[11px]">{errors.title.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="font-medium text-foreground">Target Audience</label>
            <select
              {...register("target_audience")}
              className="w-full h-9 rounded-md border bg-transparent px-3 text-xs focus:ring-1 focus:ring-ring"
            >
              <option value="all">All Registered Mobile App Users</option>
              <option value="active_users">Active Users Only</option>
              <option value="super_admins">Super Admins & Administrative Staff</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-medium text-foreground">Push Message Body</label>
            <textarea
              {...register("message")}
              rows={4}
              placeholder="Enter message content..."
              className="w-full rounded-md border bg-transparent p-3 text-xs focus:ring-1 focus:ring-ring"
            />
            {errors.message && <p className="text-destructive text-[11px]">{errors.message.message}</p>}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full gap-2">
            {isLoading ? "Broadcasting..." : <><Send className="h-4 w-4" /> Send Broadcast Now</>}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
