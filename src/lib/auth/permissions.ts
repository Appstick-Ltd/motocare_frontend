import { UserRole } from "@/types/database.types";

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  SUPER_ADMIN: 4,
  ADMIN: 3,
  MODERATOR: 2,
  USER: 1,
};

export function hasPermission(
  currentRole: UserRole | undefined | null,
  requiredRole: UserRole
): boolean {
  if (!currentRole) return false;
  return (ROLE_HIERARCHY[currentRole] || 0) >= (ROLE_HIERARCHY[requiredRole] || 0);
}

export function isSuperAdmin(role: UserRole | undefined | null): boolean {
  return role === "SUPER_ADMIN";
}

export function isAdminOrHigher(role: UserRole | undefined | null): boolean {
  return hasPermission(role, "ADMIN");
}

export function isStaffMember(role: UserRole | undefined | null): boolean {
  return hasPermission(role, "MODERATOR");
}
