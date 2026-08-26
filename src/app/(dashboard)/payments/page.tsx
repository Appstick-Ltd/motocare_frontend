import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { SubscriptionHistory, Profile } from "@/types/database.types";
import { PaymentsTableClient } from "@/components/payments/PaymentsTableClient";

export const metadata = {
  title: "Subscription Purchases & Revenue | MotoCare Admin",
};

export default async function PaymentsPage() {
  await requireAdminSession();
  const supabase = await createClient();

  let historyItems: SubscriptionHistory[] = [];

  try {
    // 1. Fetch subscription_history, profiles, and plans in parallel
    const [historyRes, profilesRes, plansRes] = await Promise.all([
      supabase.from("subscription_history").select("*").order("purchased_at", { ascending: false }),
      supabase.from("profiles").select("*"),
      supabase.from("plans").select("*"),
    ]);

    const rawHistory = historyRes.data || [];
    const profiles = (profilesRes.data || []) as Profile[];
    const plans = plansRes.data || [];

    if (rawHistory.length > 0) {
      historyItems = rawHistory.map((item: any) => {
        const userProfile = profiles.find((p) => p.id === item.user_id);
        const matchedPlan = plans.find(
          (pl) =>
            pl.name?.toLowerCase() === item.plan_name?.toLowerCase() ||
            pl.name?.toLowerCase().includes(item.plan_key?.toLowerCase())
        );

        // Fallback default amount and price if not directly stored in older records
        let amount = item.amount;
        let currency = item.currency || "USD";
        let symbol = item.currency_symbol || "$";
        let formattedPrice = item.formatted_price;

        if (amount == null) {
          if (matchedPlan && matchedPlan.price) {
            amount = matchedPlan.price;
          } else if (item.plan_key === "premium" || (item.product_id && item.product_id.includes("annual"))) {
            amount = 9.99;
          } else {
            amount = 0.99;
          }
        }

        if (!formattedPrice) {
          formattedPrice = `${symbol}${amount.toFixed(2)}`;
        }

        return {
          ...item,
          amount: Number(amount),
          currency,
          currency_symbol: symbol,
          formatted_price: formattedPrice,
          country: item.country || "Global / Android",
          user: userProfile,
        } as SubscriptionHistory;
      });
    } else {
      // Fallback: Check subscriptions table if history is empty
      const { data: subsData } = await supabase
        .from("subscriptions")
        .select("*, plans(*)")
        .order("created_at", { ascending: false });

      if (subsData && subsData.length > 0) {
        historyItems = subsData.map((s: any) => {
          const userProfile = profiles.find((p) => p.id === s.user_id);
          const planPrice = s.plans?.price || (s.plan_name?.toLowerCase().includes("premium") ? 9.99 : 0.99);
          return {
            id: s.id,
            user_id: s.user_id,
            plan_key: s.plans?.name ? s.plans.name.toLowerCase().replace(/\s+/g, "_") : "standard",
            plan_name: s.plans?.name || s.plan_name || "Standard Plan (Monthly)",
            purchase_token: s.purchase_token || null,
            product_id: s.product_id || (s.plan_name?.toLowerCase().includes("premium") ? "motocare_premium_annual" : "motocare_standard_monthly"),
            payment_gateway: s.payment_gateway || "Google Play Billing",
            status: s.status || "active",
            amount: Number(planPrice),
            currency: "USD",
            currency_symbol: "$",
            formatted_price: `$${Number(planPrice).toFixed(2)}`,
            country: "Global / Android",
            purchased_at: s.start_date || s.created_at,
            expires_at: s.expiry_date || null,
            user: userProfile,
          } as SubscriptionHistory;
        });
      }
    }
  } catch (err) {
    console.error("Error fetching subscription history and revenue:", err);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          Subscription Revenue &amp; Purchases
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Real-time customer billing invoices, Google Play in-app purchases, and revenue metrics from <span className="font-mono text-orange-400">public.subscription_history</span>.
        </p>
      </div>

      <PaymentsTableClient initialHistory={historyItems} />
    </div>
  );
}
