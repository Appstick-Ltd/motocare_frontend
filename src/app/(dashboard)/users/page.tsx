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

      // Find user subscription fallback
      const userSub = allSubscriptions.find(
        (s) => s.user_id === p.id && (s.status === "active" || s.status === "active_renewing")
      ) || allSubscriptions.find((s) => s.user_id === p.id);

      const matchedPlan = userSub ? allPlans.find((pl) => pl.id === userSub.plan_id) : null;
      const rawPlanName =
        p.plan_name ||
        matchedPlan?.name ||
        userSub?.plan_name ||
        p.subscription_plan ||
        p.plan_type ||
        "Free Plan";
      const billingCycle = matchedPlan?.billing_cycle || userSub?.billing_cycle;

      const planKey = (p.plan_type || p.subscription_plan || p.plan_name || "").toLowerCase();
      const planNameLower = String(rawPlanName).toLowerCase();
      const subPlanLower = String(p.subscription_plan || "").toLowerCase();

      const isExplicitlyFree =
        planKey === "free" ||
        planNameLower === "free plan" ||
        planNameLower === "free" ||
        planNameLower === "free user" ||
        subPlanLower === "free" ||
        subPlanLower === "free user" ||
        p.plan_type === "free";

      const hasPaidPlanName =
        planNameLower.includes("standard") ||
        planNameLower.includes("premium") ||
        subPlanLower.includes("standard") ||
        subPlanLower.includes("premium") ||
        (matchedPlan && matchedPlan.name && !matchedPlan.name.toLowerCase().includes("free"));

      const isPro = Boolean(
        p.is_pro || (!isExplicitlyFree && hasPaidPlanName && (p.subscription_status === "active" || userSub?.status === "active")) || (hasPaidPlanName && !isExplicitlyFree)
      );

      let formattedPlan = "Free Plan";
      if (isPro) {
        if (billingCycle) {
          formattedPlan = `Pro • ${rawPlanName} (${billingCycle})`;
        } else {
          formattedPlan = rawPlanName.startsWith("Pro") ? rawPlanName : `Pro • ${rawPlanName}`;
        }
      }

      const planStartDate = p.plan_start_date || userSub?.start_date || (isPro ? p.created_at : null);
      const planExpirationDate =
        p.plan_expiration_date ||
        p.subscription_expires_at ||
        userSub?.end_date ||
        userSub?.expires_at ||
        null;
      const subStatus = p.subscription_status || userSub?.status || (isPro ? "active" : "inactive");

      return {
        ...p,
        plan_name: isPro ? rawPlanName : "Free Plan",
        plan_type: isPro ? "pro" : "free",
        plan_start_date: planStartDate,
        plan_expiration_date: planExpirationDate,
        subscription_plan: isPro ? formattedPlan : "Free Plan",
        subscription_status: subStatus,
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
