import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { BarChart3, Download, Users, Car, DollarSign, Activity } from "lucide-react";

export const metadata = {
  title: "Reports & Analytics | MotoCare Admin",
};

export default async function ReportsPage() {
  await requireAdminSession();
  const supabase = await createClient();

  const [
    { count: totalUsers },
    { count: totalVehicles },
    { count: totalMaintenance },
    { data: transactions },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("vehicles").select("*", { count: "exact", head: true }),
    supabase.from("maintenance_records").select("*", { count: "exact", head: true }),
    supabase.from("transactions").select("amount").eq("status", "completed"),
  ]);

  const totalRevenue = transactions?.reduce((sum, t) => sum + Number(t.amount || 0), 0) || 0;

  const reportModules = [
    {
      title: "User Acquisition & Retention Report",
      description: "Member onboarding rates, churn analysis, and status breakdowns.",
      stat: `${totalUsers ?? 0} Users Total`,
      icon: Users,
    },
    {
      title: "Vehicle Fleet Telemetry Report",
      description: "Vehicle registrations by brand, model year, and classification type.",
      stat: `${totalVehicles ?? 0} Vehicles Registered`,
      icon: Car,
    },
    {
      title: "Financial Revenue & Billing Audit",
      description: "Aggregated platform earnings, gateway fees, and transaction breakdowns.",
      stat: formatCurrency(totalRevenue),
      icon: DollarSign,
    },
    {
      title: "Maintenance & Service Activity Audit",
      description: "Service record metrics, cost analysis, and completed job volumes.",
      stat: `${totalMaintenance ?? 0} Jobs Recorded`,
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Executive Reports & System Intelligence</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Exportable analytics reports for business development, fleet telemetry, and revenue monitoring.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportModules.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.title} className="flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{m.title}</CardTitle>
                    <p className="text-xs font-bold text-emerald-500 mt-0.5">{m.stat}</p>
                  </div>
                </div>
                <CardDescription className="text-xs mt-2">{m.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                  <Download className="h-4 w-4 text-blue-500" /> Export Summary CSV Data
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
