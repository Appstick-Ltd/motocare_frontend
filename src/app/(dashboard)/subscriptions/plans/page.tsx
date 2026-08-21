import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { Plan } from "@/types/database.types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle2, Sparkles, Plus } from "lucide-react";

export const metadata = {
  title: "Subscription Plans | MotoCare Admin",
};

export default async function SubscriptionPlansPage() {
  await requireAdminSession();
  const supabase = await createClient();

  const { data: dbPlans } = await supabase.from("plans").select("*").order("price");

  const plans: Plan[] = (dbPlans && dbPlans.length > 0) ? dbPlans : [
    {
      id: "1",
      name: "MotoCare Basic Tier",
      price: 19.99,
      billing_cycle: "monthly",
      status: "active",
      description: "Essential vehicle tracking and routine oil change reminders.",
      features: ["Up to 2 Registered Vehicles", "Basic Maintenance Log", "Email Reminders", "Standard Support"],
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "MotoCare Pro Tier",
      price: 49.99,
      billing_cycle: "monthly",
      status: "active",
      description: "Complete fleet tracking, priority maintenance booking & analytics.",
      features: ["Unlimited Vehicles", "Full Telemetry History", "Priority Booking", "SMS & Push Notifications", "24/7 Roadside Assistance"],
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Enterprise Fleet Pass",
      price: 499.00,
      billing_cycle: "yearly",
      status: "active",
      description: "Dedicated account manager & custom enterprise API integrations.",
      features: ["Multi-driver Fleet Accounts", "Dedicated Telemetry API", "Custom Audit Reports", "Guaranteed SLA Support"],
      created_at: new Date().toISOString(),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Subscription Plans & Pricing Tiers</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage membership plans, pricing structures, and feature entitlements.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <Card key={p.id} className="relative flex flex-col justify-between border-2 hover:border-blue-500/50 transition-colors">
            <div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{p.name}</CardTitle>
                  <Badge variant="success">{p.status}</Badge>
                </div>
                <CardDescription className="text-xs mt-1">{p.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-extrabold text-blue-500">
                  {formatCurrency(p.price)}
                  <span className="text-xs text-muted-foreground font-normal"> / {p.billing_cycle}</span>
                </div>

                <div className="space-y-2 pt-2 border-t text-xs">
                  <p className="font-semibold text-muted-foreground uppercase text-[10px] tracking-wider">Plan Entitlements:</p>
                  {p.features?.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
