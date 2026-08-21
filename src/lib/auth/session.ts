import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/types/database.types";
import { redirect } from "next/navigation";

export async function getCurrentUserSession() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  // Fetch admin profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return {
    user,
    profile: (profile as Profile) || {
      id: user.id,
      email: user.email || "",
      full_name: user.user_metadata?.full_name || "Super Admin",
      avatar_url: user.user_metadata?.avatar_url || null,
      phone: null,
      role: "SUPER_ADMIN", // Default fallback if profile trigger hasn't fired yet
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  };
}

export async function requireAdminSession() {
  const session = await getCurrentUserSession();

  if (!session) {
    redirect("/login");
  }

  const role = session.profile?.role;
  if (!role || (role !== "SUPER_ADMIN" && role !== "ADMIN" && role !== "MODERATOR")) {
    redirect("/unauthorized");
  }

  return session;
}

export async function requireSuperAdminSession() {
  const session = await requireAdminSession();

  if (session.profile?.role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  return session;
}
