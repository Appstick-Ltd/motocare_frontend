import React from "react";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string | null | undefined;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (!status) return <Badge variant="outline">Unknown</Badge>;

  const normalized = status.toLowerCase();

  switch (normalized) {
    case "active":
    case "completed":
    case "super_admin":
    case "admin":
      return <Badge variant="success" className="capitalize">{status.replace("_", " ")}</Badge>;
    case "pending":
    case "scheduled":
    case "in_progress":
    case "moderator":
      return <Badge variant="warning" className="capitalize">{status.replace("_", " ")}</Badge>;
    case "suspended":
    case "cancelled":
    case "failed":
    case "expired":
      return <Badge variant="destructive" className="capitalize">{status.replace("_", " ")}</Badge>;
    default:
      return <Badge variant="outline" className="capitalize">{status.replace("_", " ")}</Badge>;
  }
}
