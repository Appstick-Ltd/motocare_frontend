import { createClient } from "@/lib/supabase/server";
import { Profile, UserRole } from "@/types/database.types";
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

  // Fetch admin profile using maybeSingle() to avoid PGRST116 exceptions on empty profiles
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  // Case-insensitive role normalization with fallback to SUPER_ADMIN
  const rawRole = profile?.role ? String(profile.role).toUpperCase() : "SUPER_ADMIN";
  const userRole: UserRole = (
    ["SUPER_ADMIN", "ADMIN", "MODERATOR"].includes(rawRole) ? rawRole : "SUPER_ADMIN"
  ) as UserRole;

  return {
    user,
    profile: {
      id: user.id,
      email: user.email || "",
      full_name: profile?.full_name || user.user_metadata?.full_name || "Super Admin",
      avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url || null,
      phone: profile?.phone || null,
      role: userRole,
      status: (profile?.status || "active") as any,
      created_at: profile?.created_at || new Date().toISOString(),
    } as Profile,
  };
}

export async function requireAdminSession() {
  const session = await getCurrentUserSession();

  if (!session) {
    redirect("/login");
  }

  const role = session.profile?.role ? String(session.profile.role).toUpperCase() : "";
  if (!role || (role !== "SUPER_ADMIN" && role !== "ADMIN" && role !== "MODERATOR")) {
    redirect("/unauthorized");
  }

  return session;
}

export async function requireSuperAdminSession() {
  const session = await requireAdminSession();

  const role = session.profile?.role ? String(session.profile.role).toUpperCase() : "";
  if (role !== "SUPER_ADMIN") {
    redirect("/unauthorized");
  }

  return session;
}
