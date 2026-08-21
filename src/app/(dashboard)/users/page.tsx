import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { Profile } from "@/types/database.types";
import { UserTableClient } from "@/components/users/UserTableClient";

export const metadata = {
  title: "User Management | MotoCare Admin",
};

export default async function UsersPage() {
  const session = await requireAdminSession();
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

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
        currentAdminRole={session.profile.role}
      />
    </div>
  );
}
