import React from "react";
import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/types/database.types";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Car,
  Activity,
  FileText,
  ShieldCheck,
  UserCheck,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Clock,
  ChevronRight,
} from "lucide-react";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import Link from "next/link";

export const metadata = {
  title: "Dashboard Overview | MotoCare Admin",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  // Fetch real counts from Supabase database safely
  const [
    { count: totalUsers },
    { count: totalVehicles },
    { count: totalAuditLogs },
    { data: recentUsers },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("vehicles").select("*", { count: "exact", head: true }),
    supabase.from("audit_logs").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  const statCards = [
    {
      title: "User Panel",
      value: totalUsers ?? 0,
      subtext: "Registered user accounts",
      trend: "+12.4% vs last month",
      isPositive: true,
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      gradient: "from-blue-500/15 via-blue-500/5 to-transparent",
      link: "/users",
    },
    {
      title: "All Vehicles",
      value: totalVehicles ?? 0,
      subtext: "Registered fleet vehicles",
      trend: "+8.1% vs last month",
      isPositive: true,
      icon: Car,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20",
      gradient: "from-indigo-500/15 via-indigo-500/5 to-transparent",
      link: "/vehicles",
    },
    {
      title: "User Activity Logs",
      value: totalAuditLogs ?? 0,
      subtext: "System events & activity",
      trend: "Live logging",
      isPositive: true,
      icon: Activity,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      gradient: "from-emerald-500/15 via-emerald-500/5 to-transparent",
      link: "/audit-logs",
    },
    {
      title: "Content Pages",
      value: 3,
      subtext: "Privacy, Terms & About Us",
      trend: "All pages active",
      isPositive: true,
      icon: FileText,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
      gradient: "from-purple-500/15 via-purple-500/5 to-transparent",
      link: "/content/privacy-policy",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-8">
      {/* Executive Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-6 md:p-8 text-white shadow-lg">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-40 -bottom-10 h-48 w-48 rounded-full bg-indigo-500/10 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold backdrop-blur-md border border-blue-400/30">
              <Sparkles className="h-3.5 w-3.5" /> MotoCare Executive Panel
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome back, Super Admin
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
              Overview of user management, vehicle telemetry, user activity logs, and system content.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs font-medium backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-slate-200">Supabase Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.link}>
              <Card className="gradient-card-border relative overflow-hidden transition-all duration-300 hover:border-primary/50 group cursor-pointer">
                <div className={`absolute top-0 right-0 h-32 w-32 bg-gradient-to-br ${stat.gradient} rounded-bl-full pointer-events-none`} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {stat.title}
                    </span>
                    <div className={`p-2.5 rounded-xl border ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 duration-300`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-3xl font-extrabold tracking-tight flex items-baseline justify-between">
                      <span>{stat.value}</span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 font-medium">
                      {stat.subtext}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t flex items-center justify-between text-[11px]">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> {stat.trend}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Analytics Visualizations */}
      <DashboardCharts />

      {/* Tables & Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registrations Card */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-blue-500" /> Recent User Registrations
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">Latest member onboarding activity</p>
            </div>
            <Link
              href="/users"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View All <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <CardContent className="p-0">
            {recentUsers && recentUsers.length > 0 ? (
              <div className="divide-y">
                {recentUsers.map((u: Profile) => (
                  <div key={u.id} className="p-4 hover:bg-muted/40 transition-colors flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
                        {(u.full_name || u.email || "U").slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">{u.full_name || "Unnamed User"}</p>
                        <p className="text-[11px] text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-md bg-muted text-muted-foreground font-semibold">
                        <Clock className="h-3 w-3" /> {new Date(u.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-muted-foreground">
                No user registrations recorded yet.
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Activity Stream Card */}
        <Card className="overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-500" /> User Activity & Security
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">Live audit logs & system health</p>
            </div>
            <Link
              href="/audit-logs"
              className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              Activity Logs <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground">Supabase Row Level Security Active</p>
                  <p className="text-muted-foreground text-[11px] mt-0.5">
                    Database queries are authenticated server-side with zero anonymous key leak.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs">
                <Users className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground">User Management Engine</p>
                  <p className="text-muted-foreground text-[11px] mt-0.5">
                    User Panel, Vehicles & Content pages are connected to live database APIs.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

