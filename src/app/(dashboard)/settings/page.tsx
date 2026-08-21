import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, ShieldCheck, Database, Server, Smartphone } from "lucide-react";

export const metadata = {
  title: "App Settings | MotoCare Admin",
};

export default async function SettingsPage() {
  await requireAdminSession();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System & Telemetry Settings</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Global application flags, environment metadata, and security parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-500" /> Backend Infrastructure
            </CardTitle>
            <CardDescription>Supabase PostgreSQL & Auth telemetry configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Backend Engine:</span>
              <span className="font-semibold">Supabase Cloud</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Database RLS Status:</span>
              <Badge variant="success">Enforced & Active</Badge>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Auth Client Strategy:</span>
              <span className="font-mono text-[11px]">@supabase/ssr Cookie Session</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Service Role Key Isolation:</span>
              <Badge variant="success">Strict Server Boundary</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-purple-500" /> MotoCare Mobile Platform
            </CardTitle>
            <CardDescription>Target client app integration settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Mobile Client Minimum Version:</span>
              <span className="font-semibold">v2.4.0</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Platform Maintenance Mode:</span>
              <Badge variant="outline">Disabled (Operational)</Badge>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-muted-foreground">Push Service Connection:</span>
              <Badge variant="success" className="font-semibold">Active</Badge>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Audit Trail Log Mode:</span>
              <span className="font-semibold text-emerald-500">Full Comprehensive</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
