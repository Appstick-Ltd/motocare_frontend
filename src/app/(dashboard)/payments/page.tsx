import React from "react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminSession } from "@/lib/auth/session";
import { SubscriptionHistory, Profile, SubscriptionPricing } from "@/types/database.types";
import { PaymentsTableClient } from "@/components/payments/PaymentsTableClient";

export const metadata = {
  title: "Subscription Purchases & Revenue | MotoCare Admin",
};

export default async function PaymentsPage() {
  await requireAdminSession();
  const supabase = await createClient();
  const adminSupabase = createAdminClient();

  let historyItems: SubscriptionHistory[] = [];

  try {
    // 1. Fetch subscription_history, profiles, and subscription_pricing in parallel with adminSupabase (bypasses RLS)
    const [historyRes, profilesRes, pricingRes] = await Promise.all([
      adminSupabase.from("subscription_history").select("*").order("id", { ascending: false }),
      adminSupabase.from("profiles").select("*"),
      adminSupabase.from("subscription_pricing").select("*"),
    ]);

    let rawHistory = historyRes.data || [];

    // Fallback: If adminSupabase returned empty, try standard client
    if (rawHistory.length === 0) {
      const { data } = await supabase.from("subscription_history").select("*").order("id", { ascending: false });
      if (data && data.length > 0) {
        rawHistory = data;
      }
    }

    const profiles = (profilesRes.data || []) as Profile[];
    const pricings = (pricingRes.data || []) as SubscriptionPricing[];

    // Default currency pricing lookup (BDT / USD)
    const bdtPricing = pricings.find((p) => p.currency_code === "BDT");
    const defaultPricing = bdtPricing || pricings.find((p) => p.currency_code === "USD") || pricings[0];

    if (rawHistory.length > 0) {
      historyItems = rawHistory.map((item: any) => {
        const userProfile = profiles.find((p) => p.id === item.user_id);
        const planKey = (item.plan_key || "").toLowerCase();
        const isPremium = planKey === "premium" || (item.plan_name && item.plan_name.toLowerCase().includes("premium"));
        const planName = item.plan_name || (isPremium ? "Premium Plan (Annual)" : "Standard Plan (Monthly)");

        // Derive amount & currency if stored as null in Google Play webhook
        let amount = item.amount;
        let currency = item.currency;
        let symbol = item.currency_symbol;
        let formattedPrice = item.formatted_price;

        if (amount == null) {
          if (defaultPricing) {
            amount = isPremium ? defaultPricing.premium_price : defaultPricing.standard_price;
            currency = currency || defaultPricing.currency_code || "BDT";
            symbol = symbol || defaultPricing.currency_symbol || "৳";
          } else {
            amount = isPremium ? 150 : 15;
            currency = currency || "BDT";
            symbol = symbol || "৳";
          }
        } else {
          currency = currency || (defaultPricing?.currency_code ?? "BDT");
          symbol = symbol || (defaultPricing?.currency_symbol ?? "৳");
        }

        if (!formattedPrice) {
          formattedPrice = `${symbol} ${Number(amount).toFixed(2)}`;
        }

        return {
          id: item.id,
          user_id: item.user_id,
          plan_key: item.plan_key || (isPremium ? "premium" : "standard"),
          plan_name: planName,
          purchase_token: item.purchase_token || null,
          product_id: item.product_id || (isPremium ? "motocare_premium_annual" : "motocare_standard_monthly"),
          payment_gateway: item.payment_gateway || "Google Play Billing",
          status: item.status || "active",
          amount: Number(amount),
          currency: currency || "BDT",
          currency_symbol: symbol || "৳",
          formatted_price: formattedPrice,
          country: item.country || "Global / Android",
          purchased_at: item.purchased_at || new Date().toISOString(),
          expires_at: item.expires_at || null,
          user: userProfile,
        } as SubscriptionHistory;
      });
    }
  } catch (err) {
    console.error("Error fetching subscription_history in PaymentsPage:", err);
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
