import React from "react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminSession } from "@/lib/auth/session";
import { Subscription, SubscriptionPricing } from "@/types/database.types";
import { SubscriptionTableClient } from "@/components/subscriptions/SubscriptionTableClient";
import { CurrencyPricingManagerClient } from "@/components/subscriptions/CurrencyPricingManagerClient";

export const metadata = {
  title: "Subscriptions & Country Pricing | MotoCare Admin",
};

export default async function SubscriptionsPage() {
  await requireAdminSession();
  const supabase = await createClient();
  const adminSupabase = createAdminClient();

  // 1. Fetch subscription_pricing table from Supabase
  let dbPricings: SubscriptionPricing[] = [];
  try {
    const { data } = await supabase
      .from("subscription_pricing")
      .select("*")
      .order("currency_code", { ascending: true });

    if (data && data.length > 0) {
      dbPricings = data as SubscriptionPricing[];
    } else {
      const { data: adminData } = await adminSupabase
        .from("subscription_pricing")
        .select("*")
        .order("currency_code", { ascending: true });

      if (adminData && adminData.length > 0) {
        dbPricings = adminData as SubscriptionPricing[];
      }
    }
  } catch (err) {
    console.error("Error fetching subscription_pricing table:", err);
  }

  // Initial dataset matching user's Supabase table if dbPricings is empty
  if (dbPricings.length === 0) {
    dbPricings = [
      { id: "00000000-0000-0000-0000-000000000001", currency_code: "BDT", currency_symbol: "৳", free_price: 0.00, standard_price: 15.00, premium_price: 150.00, is_active: true },
      { id: "00000000-0000-0000-0000-000000000002", currency_code: "INR", currency_symbol: "₹", free_price: 0.00, standard_price: 149.00, premium_price: 1299.00, is_active: true },
      { id: "00000000-0000-0000-0000-000000000003", currency_code: "USD", currency_symbol: "$", free_price: 0.00, standard_price: 1.99, premium_price: 14.99, is_active: true },
      { id: "00000000-0000-0000-0000-000000000004", currency_code: "EUR", currency_symbol: "€", free_price: 0.00, standard_price: 1.99, premium_price: 14.99, is_active: true },
      { id: "00000000-0000-0000-0000-000000000005", currency_code: "GBP", currency_symbol: "£", free_price: 0.00, standard_price: 1.49, premium_price: 12.99, is_active: true },
      { id: "00000000-0000-0000-0000-000000000006", currency_code: "SAR", currency_symbol: "SAR", free_price: 0.00, standard_price: 7.99, premium_price: 59.99, is_active: true },
      { id: "00000000-0000-0000-0000-000000000007", currency_code: "AED", currency_symbol: "AED", free_price: 0.00, standard_price: 7.99, premium_price: 59.99, is_active: true },
      { id: "00000000-0000-0000-0000-000000000008", currency_code: "MYR", currency_symbol: "RM", free_price: 0.00, standard_price: 8.99, premium_price: 69.99, is_active: true },
      { id: "00000000-0000-0000-0000-000000000009", currency_code: "SGD", currency_symbol: "S$", free_price: 0.00, standard_price: 2.99, premium_price: 22.99, is_active: true },
      { id: "00000000-0000-0000-0000-000000000010", currency_code: "AUD", currency_symbol: "A$", free_price: 0.00, standard_price: 2.99, premium_price: 22.99, is_active: true },
      { id: "00000000-0000-0000-0000-000000000011", currency_code: "CAD", currency_symbol: "C$", free_price: 0.00, standard_price: 2.49, premium_price: 19.99, is_active: true },
      { id: "00000000-0000-0000-0000-000000000012", currency_code: "JPY", currency_symbol: "¥", free_price: 0.00, standard_price: 299.00, premium_price: 2200.00, is_active: true },
    ];
  }

  // 2. Fetch active user subscriptions from subscription_history and profiles
  let subscriptionList: Subscription[] = [];
  try {
    const [historyRes, profilesRes] = await Promise.all([
      adminSupabase.from("subscription_history").select("*").order("id", { ascending: false }),
      adminSupabase.from("profiles").select("*"),
    ]);

    const historyData = historyRes.data || [];
    const profiles = profilesRes.data || [];

    if (historyData.length > 0) {
      subscriptionList = historyData.map((s: any) => {
        const u = profiles.find((p: any) => p.id === s.user_id);
        const planKey = (s.plan_key || "").toLowerCase();
        const isPremium = planKey === "premium" || (s.plan_name && s.plan_name.toLowerCase().includes("premium"));
        return {
          id: String(s.id),
          user_id: s.user_id,
          plan_id: s.product_id || (isPremium ? "premium" : "standard"),
          status: s.status || "active",
          created_at: s.purchased_at || new Date().toISOString(),
          current_period_start: s.purchased_at || new Date().toISOString(),
          current_period_end: s.expires_at || null,
          user: u ? { full_name: u.full_name, email: u.email } : undefined,
          plan: {
            name: s.plan_name || (isPremium ? "Premium Plan (Annual)" : "Standard Plan (Monthly)"),
            price: s.amount != null ? Number(s.amount) : (isPremium ? 150 : 15),
            billing_cycle: isPremium ? "yearly" : "monthly",
          },
        } as unknown as Subscription;
      });
    }
  } catch (err) {
    console.error("Error fetching subscriptions in SubscriptionsPage:", err);
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-200 pb-10">
      {/* 1. Primary Multi-Currency Subscription Pricing Manager */}
      <CurrencyPricingManagerClient initialPricings={dbPricings} />

      {/* 2. Registered Member Subscriptions */}
      <div className="space-y-4 pt-4 border-t border-border/70">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Active Subscriptions &amp; Member Accounts
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitor active user subscriptions, assigned plan tiers, and renewal statuses.
          </p>
        </div>

        <SubscriptionTableClient initialSubscriptions={subscriptionList} />
      </div>
    </div>
  );
}
