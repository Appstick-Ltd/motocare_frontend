import React from "react";
import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/types/database.types";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import {
  Users,
  Car,
  Wrench,
  CreditCard,
  DollarSign,
  ShieldCheck,
  UserCheck,
  Activity,
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
    { count: totalMaintenance },
    { count: totalFuelLogs },
    { data: recentUsers },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("vehicles").select("*", { count: "exact", head: true }),
    supabase.from("service_records").select("*", { count: "exact", head: true }),
    supabase.from("fuel_logs").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  const statCards = [
    {
      title: "Total Users",
      value: totalUsers ?? 0,
      subtext: `${activeUsers ?? 0} Registered profiles`,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Registered Vehicles",
      value: totalVehicles ?? 0,
      subtext: "Tracked fleet vehicles",
      icon: Car,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
    {
      title: "Service Jobs Logged",
      value: totalMaintenance ?? 0,
      subtext: "Service records in DB",
      icon: Wrench,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Fuel Logs Logged",
      value: totalFuelLogs ?? 0,
      subtext: "Fuel Refill Telemetry Entries",
      icon: CreditCard,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Content Pages",
      value: 3,
      subtext: "Privacy, Terms, About Us",
      icon: DollarSign,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
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
          <div className="p-6 pb-3">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-blue-500" /> Recent User Registrations
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Latest member onboarding activity</p>
          </div>
          <CardContent>
            {recentUsers && recentUsers.length > 0 ? (
              <div className="divide-y">
                {recentUsers.map((u: Profile) => (
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

        {/* Recent Transactions / Fuel Logs */}
        <Card>
          <div className="p-6 pb-3">
            <h3 className="text-base font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" /> System Telemetry Stream
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">Active database connection & RLS engine</p>
          </div>
          <CardContent>
            <div className="py-8 text-center text-xs text-muted-foreground space-y-2">
              <ShieldCheck className="h-8 w-8 mx-auto text-emerald-500" />
              <p className="font-semibold text-foreground">Live Connection Connected to ekywnjlxqbyxjagviqmx</p>
              <p className="text-[11px]">All queries safely scoped to Supabase Row Level Security.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
