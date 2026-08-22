import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { Profile, UserRole } from "@/types/database.types";
import { UserTableClient } from "@/components/users/UserTableClient";

export const metadata = {
  title: "User Management | MotoCare Admin",
};

export default async function UsersPage() {
  const session = await requireAdminSession();
  const supabase = await createClient();

  let profiles: Profile[] = [];
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*, subscriptions(*, plans(*))")
      .order("created_at", { ascending: false });

    if (!error && data) {
      profiles = data.map((p: any) => {
        const activeSub = Array.isArray(p.subscriptions)
          ? p.subscriptions.find((s: any) => s.status === "active" || s.status === "active_renewing") || p.subscriptions[0]
          : p.subscriptions;
        
        const planName = activeSub?.plans?.name || activeSub?.plan_name || p.subscription_plan || p.plan;
        const isPro = Boolean(planName && String(planName).toLowerCase() !== "free");

        return {
          ...p,
          subscription_plan: planName ? String(planName) : "Free User",
          is_pro: isPro,
        } as Profile;
      });
    } else {
      const { data: fallbackProfiles } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      profiles = (fallbackProfiles as Profile[]) || [];
    }
  } catch (err) {
    console.error("Error fetching profiles with subscriptions:", err);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Directory</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage MotoCare registered accounts, roles, access statuses, and permissions.
          </p>
        </div>
      </div>

      <UserTableClient
        initialUsers={(profiles as Profile[]) || []}
        currentAdminRole={session.profile.role as UserRole}
      />
    </div>
  );
}
