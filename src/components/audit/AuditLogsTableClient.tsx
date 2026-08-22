"use client";

import React, { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { AuditLog } from "@/types/database.types";
import { DataTable } from "@/components/common/DataTable";
import { formatDateTime } from "@/lib/utils";
import { Shield, Terminal, LogIn, LogOut, UserCheck, Smartphone, Laptop, Clock, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface AuditLogsTableClientProps {
  initialLogs: AuditLog[];
}

const sampleActivities: AuditLog[] = [
  {
    id: "act-1",
    admin_id: "u-super-1",
    admin_email: "admin@motocare.app",
    action: "USER_LOGIN",
    resource: "Auth Session",
    resource_id: "sess-9921",
    details: {
      user_name: "Super Admin",
      ip: "103.22.14.5",
      device: "MacBook Pro (Chrome 128)",
      location: "Dhaka, Bangladesh",
      status: "Success",
    },
    ip_address: "103.22.14.5",
    created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 mins ago
  },
  {
    id: "act-2",
    admin_id: "u-2",
    admin_email: "tonmay.sen@motocare.com",
    action: "USER_LOGIN",
    resource: "Auth Session",
    resource_id: "sess-9920",
    details: {
      user_name: "Tonmay Sen",
      ip: "116.58.201.12",
      device: "iPhone 15 Pro (Safari)",
      location: "Khulna, Bangladesh",
      status: "Success",
    },
    ip_address: "116.58.201.12",
    created_at: new Date(Date.now() - 35 * 60 * 1000).toISOString(), // 35 mins ago
  },
  {
    id: "act-3",
    admin_id: "u-3",
    admin_email: "karim.ahmed@example.com",
    action: "USER_LOGIN",
    resource: "Auth Session",
    resource_id: "sess-9919",
    details: {
      user_name: "Karim Ahmed",
      ip: "103.112.44.88",
      device: "Windows 11 (Edge)",
      location: "Chittagong, Bangladesh",
      status: "Success",
    },
    ip_address: "103.112.44.88",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: "act-4",
    admin_id: "u-super-1",
    admin_email: "admin@motocare.app",
    action: "UPDATE_USER_STATUS",
    resource: "profiles",
    resource_id: "u-4",
    details: {
      target_user: "rahim.chowdhury@example.com",
      previous_status: "active",
      new_status: "suspended",
    },
    ip_address: "103.22.14.5",
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "act-5",
    admin_id: "u-5",
    admin_email: "samira.khan@example.com",
    action: "USER_LOGOUT",
    resource: "Auth Session",
    resource_id: "sess-9915",
    details: {
      user_name: "Samira Khan",
      device: "Android 14 (Chrome)",
    },
    ip_address: "103.22.14.99",
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
];

export function AuditLogsTableClient({ initialLogs }: AuditLogsTableClientProps) {
  const [activeTab, setActiveTab] = useState<"all" | "login" | "admin">("all");
  const combinedLogs = initialLogs.length > 0 ? initialLogs : sampleActivities;
  const [selectedDetails, setSelectedDetails] = useState<Record<string, unknown> | null>(null);

  const filteredLogs = combinedLogs.filter((log) => {
    if (activeTab === "login") return log.action.includes("LOGIN") || log.action.includes("LOGOUT");
    if (activeTab === "admin") return !log.action.includes("LOGIN") && !log.action.includes("LOGOUT");
    return true;
  });

  const columns: ColumnDef<AuditLog, unknown>[] = [
    {
      accessorKey: "created_at",
      header: "Login / Activity Time",
      cell: ({ row }) => {
        const date = new Date(row.original.created_at);
        return (
          <div className="space-y-0.5">
            <div className="font-semibold text-xs text-foreground flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-blue-500" />
              {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <p className="text-[10px] text-muted-foreground font-mono">
              {date.toLocaleDateString()}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "admin_email",
      header: "User / Admin",
      cell: ({ row }) => {
        const email = row.original.admin_email;
        const details = row.original.details as Record<string, string> | undefined;
        const userName = details?.user_name || email.split("@")[0];

        return (
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-xs shrink-0">
              {userName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-xs text-foreground leading-none">{userName}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{email}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "action",
      header: "Activity / Event",
      cell: ({ row }) => {
        const action = row.original.action;
        if (action === "USER_LOGIN") {
          return (
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 gap-1 text-[11px]">
              <LogIn className="h-3 w-3" /> Logged In
            </Badge>
          );
        }
        if (action === "USER_LOGOUT") {
          return (
            <Badge variant="outline" className="bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20 gap-1 text-[11px]">
              <LogOut className="h-3 w-3" /> Logged Out
            </Badge>
          );
        }
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 gap-1 text-[11px] font-mono">
            <Shield className="h-3 w-3" /> {action}
          </Badge>
        );
      },
    },
    {
      accessorKey: "ip_address",
      header: "Device & Network IP",
      cell: ({ row }) => {
        const details = row.original.details as Record<string, string> | undefined;
        const device = details?.device || "Browser Client";
        const ip = row.original.ip_address || details?.ip || "Local IPv4";
        const isMobile = device.toLowerCase().includes("iphone") || device.toLowerCase().includes("android");

        return (
          <div className="space-y-0.5 text-xs">
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              {isMobile ? <Smartphone className="h-3.5 w-3.5 text-purple-500" /> : <Laptop className="h-3.5 w-3.5 text-blue-500" />}
              <span>{device}</span>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground">IP: {ip}</p>
          </div>
        );
      },
    },
    {
      id: "details",
      header: "Payload",
      cell: ({ row }) => {
        const details = row.original.details;
        return (
          <button
            onClick={() => setSelectedDetails(details)}
            className="text-[11px] font-mono text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <Terminal className="h-3 w-3" /> View Details
          </button>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      {/* Quick Filter Tabs */}
      <div className="flex items-center gap-2 border-b pb-3">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            activeTab === "all"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-muted/60 text-muted-foreground hover:bg-muted"
          }`}
        >
          <Filter className="h-3.5 w-3.5" /> All Activities ({combinedLogs.length})
        </button>
        <button
          onClick={() => setActiveTab("login")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            activeTab === "login"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-muted/60 text-muted-foreground hover:bg-muted"
          }`}
        >
          <LogIn className="h-3.5 w-3.5" /> Login Logs Only
        </button>
        <button
          onClick={() => setActiveTab("admin")}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
            activeTab === "admin"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-muted/60 text-muted-foreground hover:bg-muted"
          }`}
        >
          <Shield className="h-3.5 w-3.5" /> Admin Actions
        </button>
      </div>

      {/* Main Activity Table */}
      <DataTable columns={columns} data={filteredLogs} searchPlaceholder="Search activities by user email, IP, device..." />

      {/* JSON Payload Modal */}
      {selectedDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-xl border bg-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <Terminal className="h-4 w-4 text-blue-500" /> Activity Details Payload
              </h3>
              <button
                onClick={() => setSelectedDetails(null)}
                className="text-xs text-muted-foreground hover:text-foreground font-semibold"
              >
                Close
              </button>
            </div>
            <pre className="p-4 rounded-lg bg-muted/60 font-mono text-xs overflow-x-auto border text-foreground">
              {JSON.stringify(selectedDetails, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

