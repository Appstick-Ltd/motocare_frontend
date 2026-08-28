import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { ADMIN_AUTH_PATH } from "@/lib/auth/constants";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-4 text-white">
      <div className="max-w-md w-full text-center space-y-6 bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/15 text-destructive border border-destructive/30">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Access Denied</h1>
          <p className="text-sm text-slate-400">
            You do not have administrative privileges to access the MotoCare Super Admin Panel.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400 text-left space-y-1">
          <p className="font-semibold text-slate-300">Why am I seeing this?</p>
          <p>
            Your account is authenticated but lacks a valid administrative role (<code className="text-blue-400">SUPER_ADMIN</code>, <code className="text-blue-400">ADMIN</code>, or <code className="text-blue-400">MODERATOR</code>).
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Link href={ADMIN_AUTH_PATH}>
            <Button variant="outline" className="border-slate-700 text-slate-200 hover:bg-slate-800 gap-2">
              <ArrowLeft className="h-4 w-4" /> Return to Admin Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
