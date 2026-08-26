"use client";

import React from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Moon,
  Bell,
  Search,
  LogOut,
  Shield,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

interface HeaderProps {
  userEmail?: string;
  userName?: string;
  userRole?: string;
}

export function Header({
  userEmail = "admin@motocare.com",
  userName = "Super Admin",
  userRole = "SUPER_ADMIN",
}: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <header className="h-16 sm:h-18 border-b border-white/10 bg-[#070913]/85 backdrop-blur-xl px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
      {/* Search Input Bar */}
      <div className="flex items-center gap-2 max-w-md w-full">
        <div className="relative w-full flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search users, vehicles, fleet telemetry, billing..."
            className="w-full h-10 rounded-xl border border-white/10 bg-slate-900/80 pl-10 pr-12 text-xs text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all font-medium placeholder:text-slate-500"
          />
          <kbd className="absolute right-3 hidden sm:inline-flex h-5 items-center gap-0.5 rounded-md border border-white/10 bg-black/40 px-1.5 font-mono text-[10px] font-semibold text-slate-400 shadow-xs">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* System Status Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20 shadow-xs">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>PostgreSQL Live</span>
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-9 w-9 rounded-xl hover:bg-white/10 transition-colors text-slate-300 hover:text-white"
          aria-label="Toggle Theme"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-400" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-orange-400" />
        </Button>

        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl relative hover:bg-white/10 transition-colors text-slate-300 hover:text-white">
          <Bell className="h-4 w-4 text-slate-400" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-orange-500 animate-pulse ring-2 ring-black" />
        </Button>

        {/* Divider */}
        <div className="h-5 w-px bg-white/10 my-auto" />

        {/* Admin Profile & Logout */}
        <div className="flex items-center gap-3 pl-1">
          <div className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
            <div className="h-8.5 w-8.5 rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 flex items-center justify-center text-white font-extrabold text-xs shadow-md ring-2 ring-orange-500/30" suppressHydrationWarning>
              {userName ? userName.slice(0, 2).toUpperCase() : "SA"}
            </div>
            <div className="hidden lg:block text-left text-xs">
              <p className="font-bold text-white leading-none">{userName}</p>
              <p className="text-[10px] text-slate-400 mt-0.5 font-semibold flex items-center gap-1">
                <Shield className="h-2.5 w-2.5 text-orange-400" /> {userRole}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-9 w-9 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
