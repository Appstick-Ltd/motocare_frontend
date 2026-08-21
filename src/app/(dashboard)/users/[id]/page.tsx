import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { Profile, Vehicle, MaintenanceRecord, Subscription } from "@/types/database.types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate, formatCurrency } from "@/lib/utils";
import { ArrowLeft, User, Car, Wrench, CreditCard, Shield } from "lucide-react";

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

  const [{ data: user }, { data: vehicles }, { data: maintenance }, { data: subscriptions }] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", id).single(),
      supabase.from("vehicles").select("*").eq("user_id", id),
      supabase.from("maintenance_records").select("*").eq("user_id", id),
      supabase.from("subscriptions").select("*, plan:plans(*)").eq("user_id", id),
    ]);

  if (!user) {
    notFound();
  }

  const profile = user as Profile;

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
          <p className="text-xs text-muted-foreground">User ID: {profile.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-blue-500" /> Account Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="flex items-center gap-3 pb-3 border-b">
              <div className="h-12 w-12 rounded-full bg-blue-600/15 text-blue-500 font-bold flex items-center justify-center text-base">
                {(profile.full_name || profile.email).slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-sm">{profile.full_name || "N/A"}</p>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Role:</span>
                <StatusBadge status={profile.role} />
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Account Status:</span>
                <StatusBadge status={profile.status} />
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-muted-foreground">Phone:</span>
                <span>{profile.phone || "Not set"}</span>
              </div>
              <div className="flex justify-between py-1">
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
                {vehicles.map((v: Vehicle) => (
                  <div key={v.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{v.brand} {v.model} ({v.year})</p>
                      <p className="text-[11px] text-muted-foreground">Plate: {v.license_plate || "N/A"} | VIN: {v.vin || "N/A"}</p>
                    </div>
                    <StatusBadge status={v.status} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-6 text-center">No vehicles registered for this user.</p>
            )}
          </CardContent>
        </Card>

        {/* Service Records */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Wrench className="h-4 w-4 text-emerald-500" /> Service & Maintenance History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {maintenance && maintenance.length > 0 ? (
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="border-b text-muted-foreground">
                    <tr>
                      <th className="py-2">Category</th>
                      <th className="py-2">Date</th>
                      <th className="py-2">Cost</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {maintenance.map((m: MaintenanceRecord) => (
                      <tr key={m.id}>
                        <td className="py-2 font-medium">{m.service_category}</td>
                        <td className="py-2 text-muted-foreground">{formatDate(m.service_date)}</td>
                        <td className="py-2 font-semibold text-emerald-500">{formatCurrency(m.cost)}</td>
                        <td className="py-2"><StatusBadge status={m.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-6 text-center">No maintenance logs recorded for this user.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
