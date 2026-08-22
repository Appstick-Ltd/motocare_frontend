"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    group: "Main",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    group: "User & Fleet",
    items: [
      {
        title: "Users / Customers",
        href: "/users",
        icon: Users,
        children: [
          { title: "All Users", href: "/users" },
          { title: "Active Users", href: "/users?status=active" },
          { title: "Suspended Users", href: "/users?status=suspended" },
        ],
      },
      {
        title: "Vehicles / Products",
        href: "/vehicles",
        icon: Car,
        children: [
          { title: "Vehicles List", href: "/vehicles" },
          { title: "Vehicle Types", href: "/vehicles/types" },
          { title: "Brands & Models", href: "/vehicles/brands" },
        ],
      },
      {
        title: "Reminders & Maintenance",
        href: "/maintenance",
        icon: Wrench,
      },
    ],
  },
  {
    group: "Billing & Memberships",
    items: [
      {
        title: "Subscriptions & Pricing",
        href: "/subscriptions/plans",
        icon: CreditCard,
        children: [
          { title: "Multi-Currency Pricing", href: "/subscriptions/plans" },
          { title: "Active Subscriptions", href: "/subscriptions" },
          { title: "Payment History", href: "/payments" },
        ],
      },
    ],
  },
  {
    group: "Analytics & Communications",
    items: [
      {
        title: "Reports & Analytics",
        href: "/reports",
        icon: BarChart3,
      },
      {
        title: "Notifications",
        href: "/notifications",
        icon: Bell,
      },
      {
        title: "Content Pages",
        href: "/content/privacy-policy",
        icon: FileText,
        children: [
          { title: "Privacy Policy", href: "/content/privacy-policy" },
          { title: "Terms & Conditions", href: "/content/terms" },
          { title: "About Us", href: "/content/about" },
        ],
      },
      {
        title: "User Activity Logs",
        href: "/audit-logs",
        icon: History,
      },
    ],
  },
  {
    group: "System & Access",
    items: [
      {
        title: "Admin Profile & Access",
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
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    "Users / Customers": false,
    "Vehicles / Products": false,
    "Subscriptions & Pricing": true,
    "Content Pages": false,
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-screen border-r bg-sidebar text-sidebar-foreground select-none shrink-0 transition-all duration-300 relative",
        isCollapsed ? "w-20" : "w-64",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3.5 px-6 py-5 border-b border-sidebar-border/80">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500/20 to-amber-500/20 p-1.5 shadow-sm border border-orange-500/30 shrink-0">
          <Image src="/logo.png" alt="MotoCare Logo" width={40} height={40} className="h-full w-full object-contain" />
        </div>
        <div>
          <h1 className="font-extrabold text-base tracking-tight text-sidebar-foreground flex items-center gap-1.5">
            MotoCare <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold uppercase shadow-2xs">Admin</span>
          </h1>
          <p className="text-[11px] font-medium text-sidebar-foreground/60">Fleet & User Management</p>
        </div>
      </div>


      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        {navItems.map((group) => (
          <div key={group.group} className="space-y-1.5">
            <h2 className="px-3 text-[10px] font-extrabold text-sidebar-foreground/50 uppercase tracking-widest">
              {group.group}
            </h2>

            <div className="space-y-1 pt-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const hasChildren = Boolean(item.children?.length);
                const isOpen = Boolean(openSubmenus[item.title]);
                const isActive = item.href ? pathname === item.href || pathname.startsWith(item.href + "/") : false;

                return (
                  <div key={item.title}>
                    {hasChildren ? (
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className={cn(
                          "w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isActive
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 font-bold"
                            : "text-sidebar-foreground/80"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-orange-500 dark:text-orange-400")} />
                          <span>{item.title}</span>
                        </div>
                        {isOpen ? (
                          <ChevronDown className={cn("h-3.5 w-3.5", isActive ? "text-white/80" : "text-sidebar-foreground/50")} />
                        ) : (
                          <ChevronRight className={cn("h-3.5 w-3.5", isActive ? "text-white/80" : "text-sidebar-foreground/50")} />
                        )}
                      </button>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className={cn(
                          "flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                          isActive
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 font-bold"
                            : "text-sidebar-foreground/80"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-orange-500 dark:text-orange-400")} />
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <span className={cn("px-2 py-0.5 text-[10px] rounded-full font-extrabold shadow-2xs", isActive ? "bg-white/20 text-white" : "bg-orange-500/10 text-orange-600 dark:text-orange-400")}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )}

                    {/* Submenu links */}
                    {hasChildren && isOpen && (
                      <div className="ml-7 pl-3 border-l-2 border-orange-500/30 mt-1.5 space-y-1">
                        {item.children?.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.title}
                              href={child.href}
                              className={cn(
                                "block px-3 py-1.5 text-[11.5px] font-medium rounded-lg transition-all duration-150",
                                isChildActive
                                  ? "text-orange-600 dark:text-orange-400 font-extrabold bg-orange-500/10 border-l-2 border-orange-500"
                                  : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
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
