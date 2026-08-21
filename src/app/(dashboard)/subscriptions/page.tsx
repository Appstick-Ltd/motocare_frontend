import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { Subscription } from "@/types/database.types";
import { SubscriptionTableClient } from "@/components/subscriptions/SubscriptionTableClient";

export const metadata = {
  title: "Subscriptions | MotoCare Admin",
};

export default async function SubscriptionsPage() {
  await requireAdminSession();
  const supabase = await createClient();

  const { data: subscriptions } = await supabase
    .from("subscriptions")
    .select("*, user:profiles(full_name, email), plan:plans(name, price, billing_cycle)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Active Subscriptions & Members</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Monitor active user subscriptions, plan memberships, and renewal dates.
        </p>
      </div>

      <SubscriptionTableClient initialSubscriptions={(subscriptions as Subscription[]) || []} />
    </div>
  );
}
