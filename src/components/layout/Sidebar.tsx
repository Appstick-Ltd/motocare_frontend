"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Car,
  Wrench,
  CreditCard,
  Receipt,
  Bell,
  BarChart3,
  FileText,
  ShieldCheck,
  History,
  Settings,
  ChevronDown,
  ChevronRight,
  ShieldAlert,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

interface NavItem {
  title: string;
  href?: string;
  icon: React.ElementType;
  badge?: string;
  children?: { title: string; href: string }[];
}

const navItems: { group: string; items: NavItem[] }[] = [
  {
    group: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    group: "User Management",
    items: [
      {
        title: "User Panel",
        href: "/users",
        icon: Users,
        children: [
          { title: "All Users", href: "/users" },
          { title: "Active Users", href: "/users?status=active" },
          { title: "Suspended Users", href: "/users?status=suspended" },
        ],
      },
      {
        title: "User Activity",
        href: "/audit-logs",
        icon: History,
      },
    ],
  },
  {
    group: "Vehicle Management",
    items: [
      {
        title: "All Vehicles",
        href: "/vehicles",
        icon: Car,
        children: [
          { title: "Vehicles List", href: "/vehicles" },
          { title: "Vehicle Types", href: "/vehicles/types" },
          { title: "Brands & Models", href: "/vehicles/brands" },
        ],
      },
    ],
  },
  {
    group: "Content Management",
    items: [
      {
        title: "Content",
        href: "/content/privacy-policy",
        icon: FileText,
        children: [
          { title: "Privacy Policy", href: "/content/privacy-policy" },
          { title: "Terms & Conditions", href: "/content/terms" },
          { title: "About Us", href: "/content/about" },
        ],
      },
      {
        title: "Notifications",
        href: "/notifications",
        icon: Bell,
      },
    ],
  },
  {
    group: "Settings & Access",
    items: [
      {
        title: "Admin Access",
        href: "/admins",
        icon: ShieldCheck,
      },
      {
        title: "App Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];


export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    "User Panel": true,
    "All Vehicles": true,
    Content: false,
  });


  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-screen w-64 border-r bg-sidebar text-sidebar-foreground select-none shrink-0 transition-all duration-300",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-bold text-base tracking-tight text-sidebar-foreground flex items-center gap-1.5">
            MotoCare <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold uppercase">Admin</span>
          </h1>
          <p className="text-xs text-sidebar-foreground/60">Super Admin Portal</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {navItems.map((group) => (
          <div key={group.group} className="space-y-1">
            <h2 className="px-3 text-[11px] font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
              {group.group}
            </h2>

            <div className="space-y-1 pt-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const hasChildren = Boolean(item.children?.length);
                const isOpen = openSubmenus[item.title];
                const isActive = item.href ? pathname === item.href || pathname.startsWith(item.href + "/") : false;

                return (
                  <div key={item.title}>
                    {hasChildren ? (
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isActive ? "text-sidebar-foreground font-semibold" : "text-sidebar-foreground/80"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span>{item.title}</span>
                        </div>
                        {isOpen ? (
                          <ChevronDown className="h-3.5 w-3.5 text-sidebar-foreground/50" />
                        ) : (
                          <ChevronRight className="h-3.5 w-3.5 text-sidebar-foreground/50" />
                        )}
                      </button>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isActive
                            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold border-l-2 border-blue-500"
                            : "text-sidebar-foreground/80"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 text-[10px] rounded bg-sidebar-accent font-semibold text-sidebar-foreground">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )}

                    {/* Submenu links */}
                    {hasChildren && isOpen && (
                      <div className="ml-7 pl-3 border-l border-sidebar-border/60 mt-1 space-y-1">
                        {item.children?.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.title}
                              href={child.href}
                              className={cn(
                                "block px-2.5 py-1.5 text-[11px] font-medium rounded-md transition-colors hover:text-sidebar-foreground",
                                isChildActive
                                  ? "text-blue-600 dark:text-blue-400 font-semibold bg-blue-500/10"
                                  : "text-sidebar-foreground/60"
                              )}
                            >
                              {child.title}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / System Security Indicator */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-sidebar-accent/50 border border-sidebar-border/80">
          <ShieldAlert className="h-4 w-4 text-emerald-500 shrink-0" />
          <div className="text-[11px]">
            <p className="font-medium text-sidebar-foreground">RLS Active</p>
            <p className="text-sidebar-foreground/60 text-[10px]">Session verified server-side</p>
          </div>
        </div>
      </div>

    </aside>
  );
}
