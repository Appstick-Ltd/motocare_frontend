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
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
        <Home className="h-3.5 w-3.5 text-orange-400" />
        <span className="font-semibold text-slate-300">Dashboard Overview</span>
      </div>
    );
  }

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-2 capitalize">
      <Link href="/dashboard" className="flex items-center gap-1 hover:text-orange-400 transition-colors">
        <Home className="h-3.5 w-3.5 text-orange-400" />
        <span>Dashboard</span>
      </Link>
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        return (
          <React.Fragment key={href}>
            <ChevronRight className="h-3 w-3 text-slate-600" />
            {isLast ? (
              <span className="font-bold text-white bg-white/5 px-2 py-0.5 rounded-md border border-white/10">{segment.replace("-", " ")}</span>
            ) : (
              <Link href={href} className="hover:text-orange-400 transition-colors">
                {segment.replace("-", " ")}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
