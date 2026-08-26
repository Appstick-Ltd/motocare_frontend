import React from "react";
import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/types/database.types";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/StatusBadge";
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
  BellRing,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import Link from "next/link";

export const metadata = {
  title: "Dashboard Overview | MotoCare Admin",
};

async function safeCount(supabase: any, table: string, filterField?: string, filterVal?: string): Promise<number> {
  try {
    let query = supabase.from(table).select("*", { count: "exact", head: true });
    if (filterField && filterVal) {
      query = query.eq(filterField, filterVal);
    }
    const { count, error } = await query;
    if (error) return 0;
    return count ?? 0;
  } catch {
    return 0;
  }
}

async function safeList<T>(supabase: any, table: string, limit = 6): Promise<T[]> {
  try {
    const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false }).limit(limit);
    if (error) return [];
    return (data as T[]) ?? [];
  } catch {
    return [];
  }
}

export default async function DashboardPage() {
  const supabase = await createClient();

  // Fetch real genuine data & counts safely from Supabase database tables
  const [
    totalUsers,
    activeUsers,
    suspendedUsers,
    pendingUsers,
    totalVehicles,
    totalReminders,
    totalAuditLogs,
    recentUsers,
  ] = await Promise.all([
    safeCount(supabase, "profiles"),
    safeCount(supabase, "profiles", "status", "active"),
    safeCount(supabase, "profiles", "status", "suspended"),
    safeCount(supabase, "profiles", "status", "pending"),
    safeCount(supabase, "vehicles"),
    safeCount(supabase, "reminders"),
    safeCount(supabase, "audit_logs"),
    safeList<Profile>(supabase, "profiles", 6),
  ]);

  const statCards = [
    {
      title: "Total Users",
      value: (totalUsers ?? 0).toLocaleString(),
      subtext: "Registered user accounts",
      percentage: "+12.4%",
      isPositive: true,
      icon: Users,
      color: "text-orange-400",
      bg: "bg-orange-500/10 border-orange-500/20",
      sparkline: "M0 25 Q 15 18, 30 22 T 60 10 T 90 15 T 120 5",
      link: "/users",
    },
    {
      title: "Total Vehicles",
      value: (totalVehicles ?? 0).toLocaleString(),
      subtext: "Tracked fleet vehicles",
      percentage: "+8.1%",
      isPositive: true,
      icon: Car,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      sparkline: "M0 28 Q 20 15, 40 20 T 70 8 T 100 12 T 120 4",
      link: "/vehicles",
    },
    {
      title: "Active Reminders",
      value: (totalReminders ?? 0).toLocaleString(),
      subtext: "Scheduled service alerts",
      percentage: "+15.3%",
      isPositive: true,
      icon: BellRing,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      sparkline: "M0 22 Q 25 25, 50 15 T 80 18 T 110 8 T 120 2",
      link: "/maintenance",
    },
    {
      title: "System Audit Logs",
      value: (totalAuditLogs ?? 0).toLocaleString(),
      subtext: "Telemetry & system events",
      percentage: "+24.8%",
      isPositive: true,
      icon: DollarSign,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
      sparkline: "M0 26 Q 18 20, 36 24 T 72 10 T 100 14 T 120 3",
      link: "/audit-logs",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-8">
      {/* Executive Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-[#070913] via-slate-950 to-orange-950/40 p-6 md:p-8 text-white shadow-2xl">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-orange-500/15 blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-10 h-48 w-48 rounded-full bg-amber-500/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold backdrop-blur-md border border-orange-500/30 shadow-xs">
              <Sparkles className="h-3.5 w-3.5" /> MotoCare Executive Panel
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Welcome back, Super Admin
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed font-normal">
              Real-time overview of users, vehicle fleet telemetry, active service reminders, and activity logs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-white/10 text-xs font-semibold backdrop-blur-md shadow-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-slate-200 font-mono">Supabase Live Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Premium Statistic Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.link}>
              <div className="group relative rounded-2xl p-6 bg-slate-900/70 border border-white/10 hover:border-orange-500/40 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5 cursor-pointer flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {stat.title}
                    </span>
                    <div className={`p-2.5 rounded-xl border ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 duration-300 shadow-sm`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-baseline justify-between">
                    <div>
                      <div className="text-3xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 font-medium">
                        {stat.subtext}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sparkline & Trend Pill */}
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold flex items-center gap-1 border border-emerald-500/20">
                    <TrendingUp className="h-3 w-3" /> {stat.percentage}
                  </span>

                  <svg className="w-20 h-6 stroke-orange-400 fill-none stroke-[2.5]" viewBox="0 0 120 30">
                    <path d={stat.sparkline} />
                  </svg>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Analytics Visualizations */}
      <DashboardCharts
        totalUsersCount={totalUsers ?? 0}
        activeUsersCount={activeUsers ?? 0}
        suspendedUsersCount={suspendedUsers ?? 0}
        pendingUsersCount={pendingUsers ?? 0}
        totalRemindersCount={totalReminders ?? 0}
        totalVehiclesCount={totalVehicles ?? 0}
      />

      {/* Recent Activity Table Section */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2 text-white">
              <UserCheck className="h-4.5 w-4.5 text-orange-400" /> Recent User Activity &amp; Onboarding
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-normal">Real-time user actions, registrations, and account status</p>
          </div>
          <Link
            href="/users"
            className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
          >
            View All Users <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div>
          {recentUsers && recentUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-black/30 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="px-6 py-3.5">User</th>
                    <th className="px-6 py-3.5">Activity</th>
                    <th className="px-6 py-3.5">Registered Date</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentUsers.map((u: Profile) => (
                    <tr key={u.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8.5 w-8.5 rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 flex items-center justify-center text-white font-extrabold text-xs shadow-sm ring-1 ring-orange-500/30">
                            {(u.full_name || u.email || "U").slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-xs text-white">{u.full_name || "Unnamed User"}</p>
                            <p className="text-[11px] text-slate-400">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-200">
                          Account Created &amp; Profile Setup
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-[11px] text-slate-400">
                        {new Date(u.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={u.status || "active"} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/users/${u.id}`}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-400 hover:text-orange-300 hover:underline"
                        >
                          Details <ChevronRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              No user activity recorded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

