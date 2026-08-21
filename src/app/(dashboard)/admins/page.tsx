import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireSuperAdminSession } from "@/lib/auth/session";
import { Profile } from "@/types/database.types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate } from "@/lib/utils";
import { ShieldCheck, ShieldAlert, UserPlus, KeyRound } from "lucide-react";
import { UserTableClient } from "@/components/users/UserTableClient";

export const metadata = {
  title: "Admin Management | MotoCare Admin",
};

export default async function AdminsPage() {
  const session = await requireSuperAdminSession();
  const supabase = await createClient();

  const { data: adminProfiles } = await supabase
    .from("profiles")
    .select("*")
    .in("role", ["SUPER_ADMIN", "ADMIN", "MODERATOR"])
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Administrative Privileges & Access Control</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Restricted area: Manage Super Admin, Admin, and Moderator credentials.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 font-semibold text-xs border border-purple-500/20">
          <ShieldAlert className="h-4 w-4" /> Super Admin Access Verified
        </div>
      </div>

      <UserTableClient
        initialUsers={(adminProfiles as Profile[]) || []}
        currentAdminRole={session.profile.role}
      />
    </div>
  );
}
