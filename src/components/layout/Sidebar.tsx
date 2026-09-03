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
  Headphones,
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
    group: "User & Fleet Management",
    items: [
      {
        title: "Users / Customers",
        href: "/users",
        icon: Users,
      },
      {
        title: "Vehicles / Fleet",
        href: "/vehicles",
        icon: Car,
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
          { title: "Subscription Pricing", href: "/subscriptions/plans" },
          { title: "Payment History", href: "/payments" },
        ],
      },
    ],
  },
  {
    group: "Communications & Content",
    items: [
      {
        title: "Notifications",
        href: "/notifications",
        icon: Bell,
      },
      {
        title: "Help & Support",
        href: "/support",
        icon: Headphones,
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
    ],
  },
  {
    group: "System & Settings",
    items: [
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
        "flex flex-col h-screen border-r border-white/10 bg-[#05070d]/95 backdrop-blur-2xl text-slate-200 select-none shrink-0 transition-all duration-300 relative z-20 shadow-2xl",
        isCollapsed ? "w-20" : "w-64",
        className
      )}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 p-0.5 shadow-lg shadow-orange-500/20 shrink-0">
          <div className="h-full w-full bg-[#0d1222] rounded-[14px] flex items-center justify-center p-1.5">
            <Image
              src="/logo.png"
              alt="MotoCare Logo"
              width={32}
              height={32}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <div>
          <h1 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
            Moto<span className="text-orange-500">Care</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold uppercase shadow-sm">Admin</span>
          </h1>
          <p className="text-[10px] font-medium text-slate-400">Fleet &amp; Maintenance OS</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3.5 py-5 space-y-6">
        {navItems.map((group) => (
          <div key={group.group} className="space-y-1.5">
            <h2 className="px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
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
                          "w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/25 font-bold"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-orange-400")} />
                          <span>{item.title}</span>
                        </div>
                        {isOpen ? (
                          <ChevronDown className={cn("h-3.5 w-3.5", isActive ? "text-white/80" : "text-slate-500")} />
                        ) : (
                          <ChevronRight className={cn("h-3.5 w-3.5", isActive ? "text-white/80" : "text-slate-500")} />
                        )}
                      </button>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className={cn(
                          "flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/25 font-bold"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-orange-400")} />
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <span className={cn("px-2 py-0.5 text-[10px] rounded-full font-extrabold shadow-sm", isActive ? "bg-white/20 text-white" : "bg-orange-500/15 text-orange-400 border border-orange-500/30")}>
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
                                  ? "text-orange-400 font-extrabold bg-orange-500/10 border-l-2 border-orange-500"
                                  : "text-slate-400 hover:text-white hover:bg-white/5"
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
      <div className="p-3.5 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/80 border border-white/10">
          <ShieldAlert className="h-4 w-4 text-emerald-400 shrink-0" />
          <div className="text-[11px]">
            <p className="font-bold text-white">RLS Protected</p>
            <p className="text-slate-400 text-[10px]">Supabase TLS Server Session</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
