import React from "react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminSession } from "@/lib/auth/session";
import { Plan, SubscriptionPricing } from "@/types/database.types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { CurrencyPricingManagerClient } from "@/components/subscriptions/CurrencyPricingManagerClient";

export const metadata = {
  title: "Subscription Plans & Currency Pricing | MotoCare Admin",
};

export default async function SubscriptionPlansPage() {
  await requireAdminSession();
  const supabase = await createClient();
  const adminSupabase = createAdminClient();

  // Safely fetch subscription_pricing table entries from Supabase
  let dbPricings: SubscriptionPricing[] = [];
  try {
    const { data, error } = await supabase
      .from("subscription_pricing")
      .select("*")
      .order("currency_code", { ascending: true });

    if (!error && data && data.length > 0) {
      dbPricings = data as SubscriptionPricing[];
    } else {
      // Fallback with admin client if RLS is restricted
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

  // Default initial entries matching user's Supabase table if dbPricings is empty
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

  const { data: dbPlans } = await supabase.from("plans").select("*").order("price");

  const plans: Plan[] = (dbPlans && dbPlans.length > 0) ? dbPlans : [
    {
      id: "1",
      name: "MotoCare Free Tier",
      price: 0.00,
      billing_cycle: "monthly",
      status: "active",
      description: "Basic vehicle logging, standard fuel history & essential features.",
      features: ["1 Registered Vehicle", "Basic Maintenance Log", "Email Notifications", "Standard Dashboard"],
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "MotoCare Standard Tier",
      price: 1.99,
      billing_cycle: "monthly",
      status: "active",
      description: "Multi-vehicle tracking, routine service alerts & document vaults.",
      features: ["Up to 3 Vehicles", "Detailed Telemetry & Expense Logs", "Service Reminders", "Vehicle Document Storage"],
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "MotoCare Premium Tier",
      price: 14.99,
      billing_cycle: "monthly",
      status: "active",
      description: "Unlimited fleet management, priority notifications & advanced analytics.",
      features: ["Unlimited Vehicles", "Priority Push & SMS Alerts", "Advanced Analytics Reports", "Dedicated Roadside Support"],
      created_at: new Date().toISOString(),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground">
          Subscription Plans & Multi-Currency Pricing
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-medium">
          Manage currency-wise pricing tiers (Free, Standard, Premium) connected live to Supabase.
        </p>
      </div>

      {/* Main Multi-Currency Pricing Manager connected to Supabase */}
      <CurrencyPricingManagerClient initialPricings={dbPricings} />
    </div>
  );
}
