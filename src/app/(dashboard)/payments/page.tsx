import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { SubscriptionHistory, Profile } from "@/types/database.types";
import { PaymentsTableClient } from "@/components/payments/PaymentsTableClient";

export const metadata = {
  title: "Subscription Purchases & Payment History | MotoCare Admin",
};

export default async function PaymentsPage() {
  await requireAdminSession();
  const supabase = await createClient();

  let historyItems: SubscriptionHistory[] = [];

  try {
    // 1. Fetch subscription_history and profiles in parallel safely
    const [historyRes, profilesRes] = await Promise.all([
      supabase.from("subscription_history").select("*").order("purchased_at", { ascending: false }),
      supabase.from("profiles").select("*"),
    ]);

    const rawHistory = historyRes.data || [];
    const profiles = (profilesRes.data || []) as Profile[];

    if (rawHistory.length > 0) {
      historyItems = rawHistory.map((item: any) => {
        const userProfile = profiles.find((p) => p.id === item.user_id);
        return {
          ...item,
          user: userProfile,
        } as SubscriptionHistory;
      });
    } else {
      // Fallback: Check subscriptions table if history is still pending migration
      const { data: subsData } = await supabase
        .from("subscriptions")
        .select("*, plans(*)")
        .order("created_at", { ascending: false });

      if (subsData && subsData.length > 0) {
        historyItems = subsData.map((s: any) => {
          const userProfile = profiles.find((p) => p.id === s.user_id);
          return {
            id: s.id,
            user_id: s.user_id,
            plan_key: s.plans?.name ? s.plans.name.toLowerCase().replace(/\s+/g, "_") : "pro_plan",
            plan_name: s.plans?.name || s.plan_name || "Pro Membership",
            purchase_token: s.purchase_token || null,
            product_id: s.product_id || s.plan_id || "motocare_pro_monthly",
            payment_gateway: s.payment_gateway || "Google Play Billing",
            status: s.status || "active",
            purchased_at: s.start_date || s.created_at,
            expires_at: s.expiry_date || null,
            user: userProfile,
          } as SubscriptionHistory;
        });
      }
    }
  } catch (err) {
    console.error("Error fetching subscription history:", err);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          Subscription Payment History
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete database log of all customer subscription purchases from <span className="font-mono text-orange-400">public.subscription_history</span>.
        </p>
      </div>

      <PaymentsTableClient initialHistory={historyItems} />
    </div>
  );
}
