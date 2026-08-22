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
    router.push("/login");
  };

  return (
    <header className="h-16 border-b border-border/70 bg-card/85 backdrop-blur-md px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
      {/* Search Input Bar */}
      <div className="flex items-center gap-2 max-w-md w-full">
        <div className="relative w-full flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search users, vehicles, user activity, content..."
            className="w-full h-9.5 rounded-xl border border-input/80 bg-muted/40 pl-10 pr-12 text-xs focus:outline-hidden focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all font-medium placeholder:text-muted-foreground/70"
          />
          <kbd className="absolute right-3 hidden sm:inline-flex h-5 items-center gap-0.5 rounded-md border bg-card px-1.5 font-mono text-[10px] font-semibold text-muted-foreground shadow-2xs">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* System Status Pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold border border-emerald-500/20 shadow-2xs">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Live</span>
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-9 w-9 rounded-xl hover:bg-accent transition-colors"
          aria-label="Toggle Theme"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-orange-400" />
        </Button>

        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl relative hover:bg-accent transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-orange-500 animate-pulse ring-2 ring-card" />
        </Button>

        {/* Divider */}
        <div className="h-5 w-px bg-border/80 my-auto" />

        {/* Admin Profile & Logout */}
        <div className="flex items-center gap-3 pl-1">
          <div className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-muted/40 transition-colors cursor-pointer">
            <div className="h-8.5 w-8.5 rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 flex items-center justify-center text-white font-extrabold text-xs shadow-sm ring-2 ring-orange-500/20">
              {userName.slice(0, 2).toUpperCase()}
            </div>
            <div className="hidden lg:block text-left text-xs">
              <p className="font-bold text-foreground leading-none">{userName}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-semibold flex items-center gap-1">
                <Shield className="h-2.5 w-2.5 text-orange-500" /> {userRole}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-9 w-9 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
