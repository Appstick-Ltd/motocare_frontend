import React from "react";
import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  Users,
  Car,
  Wrench,
  CreditCard,
  DollarSign,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";

export const metadata = {
  title: "Dashboard Overview | MotoCare Admin",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  // Fetch real counts from Supabase database safely
  const [
    { count: totalUsers },
    { count: activeUsers },
    { count: totalVehicles },
    { count: activeVehicles },
    { count: totalMaintenance },
    { count: activeSubscriptions },
    { data: recentTransactions },
    { data: recentUsers },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("vehicles").select("*", { count: "exact", head: true }),
    supabase.from("vehicles").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("maintenance_records").select("*", { count: "exact", head: true }),
    supabase.from("subscriptions").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("transactions").select("*, user:profiles(full_name, email)").order("created_at", { ascending: false }).limit(5),
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  // Calculate total revenue from transactions
  const { data: allTransactions } = await supabase.from("transactions").select("amount").eq("status", "completed");
  const totalRevenue = allTransactions?.reduce((sum, t) => sum + Number(t.amount || 0), 0) || 0;

  const statCards = [
    {
      title: "Total Users",
      value: totalUsers ?? 0,
      subtext: `${activeUsers ?? 0} Active accounts`,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Registered Vehicles",
      value: totalVehicles ?? 0,
      subtext: `${activeVehicles ?? 0} In active service`,
      icon: Car,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
    {
      title: "Maintenance Jobs",
      value: totalMaintenance ?? 0,
      subtext: "Total recorded services",
      icon: Wrench,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Active Subscriptions",
      value: activeSubscriptions ?? 0,
      subtext: "Recurring plan members",
      icon: CreditCard,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(totalRevenue),
      subtext: "Processed transactions",
      icon: DollarSign,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-card p-6 rounded-2xl border shadow-xs">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            System Executive Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time telemetry, user management metrics, and ecosystem health.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20">
          <ShieldCheck className="h-4 w-4" /> Live Supabase RLS Engine
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {stat.title}
                  </span>
                  <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-bold tracking-tight">
                    {stat.value}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {stat.subtext}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Visualizations */}
      <DashboardCharts />

      {/* Tables & Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-blue-500" /> Recent User Registrations
              </CardTitle>
              <CardDescription>Latest member onboarding activity</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {recentUsers && recentUsers.length > 0 ? (
              <div className="divide-y">
                {recentUsers.map((u) => (
                  <div key={u.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold">{u.full_name || "Unnamed User"}</p>
                      <p className="text-[11px] text-muted-foreground">{u.email}</p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-muted font-mono">
                      {new Date(u.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No user registrations recorded yet.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-500" /> Recent Payment Transactions
              </CardTitle>
              <CardDescription>Real-time transaction log feed</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {recentTransactions && recentTransactions.length > 0 ? (
              <div className="divide-y">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold">
                        {tx.user?.full_name || tx.user?.email || "System Transaction"}
                      </p>
                      <p className="text-[11px] text-muted-foreground">{tx.payment_method}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-emerald-500">{formatCurrency(tx.amount)}</p>
                      <span className="text-[10px] text-muted-foreground uppercase">{tx.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No financial transactions recorded yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
