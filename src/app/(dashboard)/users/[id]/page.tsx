import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { Profile, Vehicle, ServiceRecord, FuelLog } from "@/types/database.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, User, Car, Wrench, Flame, Gauge } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return {
    title: `User Detail #${resolvedParams.id.slice(0, 8)} | MotoCare Admin`,
  };
}

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await params;
  const supabase = await createClient();

  const [
    { data: rawUser },
    { data: vehicles },
    { data: serviceRecords },
    { data: fuelLogs },
  ] = await Promise.all([
    supabase.from("profiles").select("*, subscriptions(*, plans(*))").eq("id", id).maybeSingle(),
    supabase.from("vehicles").select("*").eq("user_id", id),
    supabase.from("service_records").select("*").eq("user_id", id),
    supabase.from("fuel_logs").select("*").eq("user_id", id),
  ]);

  const activeSub = Array.isArray((rawUser as any)?.subscriptions)
    ? (rawUser as any).subscriptions.find((s: any) => s.status === "active" || s.status === "active_renewing") || (rawUser as any).subscriptions[0]
    : (rawUser as any)?.subscriptions;

  const planName = activeSub?.plans?.name || activeSub?.plan_name || (rawUser as any)?.subscription_plan || (rawUser as any)?.plan;

  const user = rawUser ? {
    ...(rawUser as any),
    subscription_plan: planName ? String(planName) : "Free User",
    is_pro: Boolean(planName && String(planName).toLowerCase() !== "free"),
  } : null;

  if (!user) {
    // If profile table doesn't have row yet, build basic user representation
    const { data: authUser } = await supabase.auth.admin?.getUserById(id).catch(() => ({ data: null })) || { data: null };
    if (!authUser) {
      notFound();
    }
  }

  const profile: Profile = (user as Profile) || {
    id,
    email: "user@motocare.com",
    full_name: "MotoCare Member",
    phone: null,
    role: "USER",
    status: "active",
    created_at: new Date().toISOString(),
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center gap-4">
        <Link href="/users">
          <div className="h-9 w-9 rounded-lg border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </div>
        </Link>
        <div>
          <h1 className="text-xl font-bold tracking-tight">{profile.full_name || profile.email}</h1>
          <p className="text-xs text-muted-foreground font-mono">User ID: {profile.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Account Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-blue-500" /> Account Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="flex items-center gap-3 pb-3 border-b">
              <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-base shadow-xs">
                {(profile.full_name || profile.email).slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm">{profile.full_name || "Unnamed User"}</p>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-muted-foreground">Privilege Role:</span>
                <StatusBadge status={profile.role} />
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-muted-foreground">Account Status:</span>
                <StatusBadge status={profile.status || "active"} />
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-muted-foreground">Subscription Tier:</span>
                {profile.is_pro || (profile.subscription_plan && profile.subscription_plan.toLowerCase() !== "free user" && profile.subscription_plan.toLowerCase() !== "free") ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30">
                    Pro ({profile.subscription_plan || "Pro Plan"})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
                    Free User
                  </span>
                )}
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-muted-foreground">Phone Number:</span>
                <span className="font-mono">{profile.phone || "Not provided"}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Member Since:</span>
                <span>{formatDate(profile.created_at)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Owned Vehicles */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Car className="h-4 w-4 text-indigo-500" /> Registered Vehicles ({vehicles?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {vehicles && vehicles.length > 0 ? (
              <div className="divide-y text-xs">
                {vehicles.map((v: Vehicle) => {
                  const title = v.brand
                    ? `${v.brand} ${v.model || ""} (${v.year || "N/A"})`
                    : `Vehicle (${v.vehicle_type || "Standard"})`;

                  return (
                    <div key={v.id} className="py-3.5 flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-semibold text-sm text-foreground">{title}</p>
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                          <span className="px-2 py-0.5 rounded bg-muted font-medium text-foreground">
                            {v.vehicle_type || "Car"}
                          </span>
                          {v.odometer != null && (
                            <span className="flex items-center gap-1 font-mono">
                              <Gauge className="h-3 w-3 text-blue-500" /> {v.odometer.toLocaleString()} km
                            </span>
                          )}
                          {v.license_plate && (
                            <span className="font-mono">Plate: {v.license_plate}</span>
                          )}
                        </div>
                      </div>
                      <StatusBadge status={v.status || "active"} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-muted-foreground">
                <Car className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
                <p>No vehicles registered for this user in database.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Service & Maintenance Records */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Wrench className="h-4 w-4 text-emerald-500" /> Service & Maintenance History ({serviceRecords?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {serviceRecords && serviceRecords.length > 0 ? (
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="border-b text-muted-foreground uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Service Type</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Odometer</th>
                      <th className="py-2.5 px-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {serviceRecords.map((s: ServiceRecord) => (
                      <tr key={s.id}>
                        <td className="py-3 px-3 font-semibold text-foreground">{s.service_type || "General Service"}</td>
                        <td className="py-3 px-3 text-muted-foreground">{formatDate(s.service_date)}</td>
                        <td className="py-3 px-3 font-mono">{s.odometer != null ? `${s.odometer.toLocaleString()} km` : "N/A"}</td>
                        <td className="py-3 px-3 text-muted-foreground">{s.notes || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-muted-foreground">
                <Wrench className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
                <p>No maintenance logs recorded for this user.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Fuel Logs Section */}
        {fuelLogs && fuelLogs.length > 0 && (
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Flame className="h-4 w-4 text-amber-500" /> Fuel History Logs ({fuelLogs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="border-b text-muted-foreground uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Fuel Type</th>
                      <th className="py-2.5 px-3">Liters</th>
                      <th className="py-2.5 px-3">Price / Unit</th>
                      <th className="py-2.5 px-3">Odometer</th>
                      <th className="py-2.5 px-3">Logged Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {fuelLogs.map((f: FuelLog) => (
                      <tr key={f.id}>
                        <td className="py-3 px-3 font-semibold text-foreground">{f.fuel_type || "Octane / Petrol"}</td>
                        <td className="py-3 px-3 font-mono">{f.liters ? `${f.liters} L` : "N/A"}</td>
                        <td className="py-3 px-3 font-mono">{f.price_per_unit ? `$${f.price_per_unit}` : "N/A"}</td>
                        <td className="py-3 px-3 font-mono">{f.odometer ? `${f.odometer.toLocaleString()} km` : "N/A"}</td>
                        <td className="py-3 px-3 text-muted-foreground">{formatDate(f.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
