"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0 || pathname === "/dashboard") {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
        <Home className="h-3.5 w-3.5" />
        <span>Dashboard Overview</span>
      </div>
    );
  }

  return (
    <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 capitalize">
      <Link href="/dashboard" className="flex items-center gap-1 hover:text-foreground transition-colors">
        <Home className="h-3.5 w-3.5" />
        <span>Dashboard</span>
      </Link>
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        return (
          <React.Fragment key={href}>
            <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
            {isLast ? (
              <span className="font-semibold text-foreground">{segment.replace("-", " ")}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors">
                {segment.replace("-", " ")}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
