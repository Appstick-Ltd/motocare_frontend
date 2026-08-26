import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { Profile, Vehicle } from "@/types/database.types";
import { UserTableClient } from "@/components/users/UserTableClient";

export const metadata = {
  title: "User Management | MotoCare Admin",
};

export default async function UsersPage() {
  await requireAdminSession();
  const supabase = await createClient();

  let profiles: Profile[] = [];
  try {
    // Fetch all records safely without joining in query to avoid PostgREST relationship cache issues
    const [profilesRes, vehiclesRes, subscriptionsRes, plansRes] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("vehicles").select("*").order("created_at", { ascending: false }),
      supabase.from("subscriptions").select("*"),
      supabase.from("plans").select("*"),
    ]);

    const rawProfiles = profilesRes.data || [];
    const allVehicles = (vehiclesRes.data || []) as Vehicle[];
    const allSubscriptions = subscriptionsRes.data || [];
    const allPlans = plansRes.data || [];

    // Map each profile with their corresponding vehicles and subscription tier
    profiles = rawProfiles.map((p: any) => {
      // Find all vehicles belonging to this user
      const userVehicles = allVehicles.filter(
        (v) => v.user_id === p.id || (v as any).userId === p.id
      );

      // Find user subscription
      const userSub = allSubscriptions.find(
        (s) => s.user_id === p.id && (s.status === "active" || s.status === "active_renewing")
      ) || allSubscriptions.find((s) => s.user_id === p.id);

      const matchedPlan = userSub ? allPlans.find((pl) => pl.id === userSub.plan_id) : null;
      const planName = matchedPlan?.name || userSub?.plan_name || p.subscription_plan || p.plan;
      const billingCycle = matchedPlan?.billing_cycle || userSub?.billing_cycle;
      
      const isPro = Boolean(
        p.is_pro ||
        (planName &&
          String(planName).toLowerCase() !== "free" &&
          String(planName).toLowerCase() !== "free user" &&
          String(planName).toLowerCase() !== "standard")
      );

      let formattedPlan = "Free";
      if (isPro) {
        if (billingCycle) {
          formattedPlan = `Pro • ${planName || "Pro Member"} (${billingCycle})`;
        } else {
          formattedPlan = `Pro • ${planName || "Pro Member"}`;
        }
      }

      return {
        ...p,
        subscription_plan: formattedPlan,
        is_pro: isPro,
        vehicles: userVehicles,
        vehicles_count: userVehicles.length,
      } as Profile;
    });
  } catch (err) {
    console.error("Error fetching profiles and vehicles:", err);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            User Profiles &amp; Fleet Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete overview of all registered user records and their vehicles from Supabase.
          </p>
        </div>
      </div>

      <UserTableClient initialUsers={profiles} />
    </div>
  );
}
