"use client";

import React, { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { SubscriptionHistory } from "@/types/database.types";
import { DataTable } from "@/components/common/DataTable";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate } from "@/lib/utils";
import {
  CreditCard,
  Crown,
  ShoppingBag,
  Calendar,
  Phone,
  CheckCircle2,
  Receipt,
  Layers,
  Key,
  ShieldCheck,
  X,
  Copy,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface PaymentsTableClientProps {
  initialHistory: SubscriptionHistory[];
}

export function PaymentsTableClient({ initialHistory }: PaymentsTableClientProps) {
  const [history] = useState<SubscriptionHistory[]>(initialHistory);
  const [selectedItem, setSelectedItem] = useState<SubscriptionHistory | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);

  const totalPurchases = history.length;
  const activeSubs = history.filter((h) => (h.status || "").toLowerCase() === "active").length;
  const googlePlayPurchases = history.filter((h) =>
    (h.payment_gateway || "").toLowerCase().includes("google")
  ).length;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(true);
    toast.success("Purchase Token copied to clipboard!");
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const columns: ColumnDef<SubscriptionHistory, unknown>[] = [
    {
      accessorKey: "user",
      header: "Subscriber / Customer",
      cell: ({ row }) => {
        const u = row.original.user;
        const name = u?.full_name || "App Customer";
        const email = u?.email || "No email";
        const initials = (name || email).slice(0, 2).toUpperCase();

        return (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 text-white font-extrabold flex items-center justify-center text-xs shadow-md ring-1 ring-orange-500/30 shrink-0">
              {initials}
            </div>
            <div>
              <p className="font-bold text-xs text-white">{name}</p>
              <p className="text-[11px] text-slate-400">{email}</p>
              {u?.phone && (
                <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                  <Phone className="h-2.5 w-2.5 text-orange-400" /> {u.phone}
                </p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "plan_name",
      header: "Purchased Plan",
      cell: ({ row }) => {
        const h = row.original;
        return (
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/10 text-orange-400 border border-orange-500/35 shadow-xs">
              <Crown className="h-3.5 w-3.5 text-orange-400 fill-orange-400 shrink-0" />
              <span>{h.plan_name || "Pro Membership"}</span>
            </span>
            <p className="text-[10.5px] font-mono text-slate-400 pl-1">
              Key: <span className="text-slate-300">{h.plan_key}</span>
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "product_id",
      header: "Product SKU & ID",
      cell: ({ row }) => {
        const sku = row.original.product_id || "motocare_pro";
        return (
          <div className="font-mono text-xs">
            <span className="px-2 py-1 rounded-lg bg-black/40 border border-white/10 text-slate-200 block truncate max-w-[170px]" title={sku}>
              {sku}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "payment_gateway",
      header: "Payment Gateway",
      cell: ({ row }) => {
        const gateway = row.original.payment_gateway || "Google Play Billing";
        return (
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <div className="h-6 w-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-orange-400 shrink-0">
              <CreditCard className="h-3.5 w-3.5" />
            </div>
            <span className="font-medium text-white">{gateway}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status || "active"} />,
    },
    {
      accessorKey: "purchased_at",
      header: "Purchased Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5 text-xs text-slate-300">
          <Calendar className="h-3.5 w-3.5 text-slate-500 shrink-0" />
          <span>{formatDate(row.original.purchased_at)}</span>
        </div>
      ),
    },
    {
      accessorKey: "expires_at",
      header: "Expiry Date",
      cell: ({ row }) => {
        const exp = row.original.expires_at;
        return (
          <span className="text-xs font-medium text-amber-400 font-mono">
            {exp ? formatDate(exp) : "Lifetime Access"}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Receipt",
      cell: ({ row }) => {
        const h = row.original;
        return (
          <button
            onClick={() => setSelectedItem(h)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
          >
            <Receipt className="h-3.5 w-3.5 text-orange-400" />
            <span>Details</span>
          </button>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl p-5 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Subscription Orders
            </span>
            <p className="text-2xl font-extrabold text-white mt-1">{totalPurchases}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <ShoppingBag className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-2xl p-5 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Subscriptions
            </span>
            <p className="text-2xl font-extrabold text-emerald-400 mt-1">{activeSubs}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-2xl p-5 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Google Play In-App Orders
            </span>
            <p className="text-2xl font-extrabold text-blue-400 mt-1">{googlePlayPurchases}</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <CreditCard className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Subscription Purchases Table */}
      <DataTable
        columns={columns}
        data={history}
        searchPlaceholder="Search by customer name, email, plan name or product ID..."
        emptyMessage="No subscription purchase records found in subscription_history."
      />

      {/* Purchase Receipt Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0c101c] p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200 relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white font-extrabold shadow-lg">
                <Receipt className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Purchase Order #{selectedItem.id}</h3>
                <p className="text-xs text-slate-400">Google Play &amp; In-App Billing Record</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5 space-y-1">
                <span className="text-slate-500 text-[10.5px]">Subscriber</span>
                <p className="font-bold text-white text-sm">
                  {selectedItem.user?.full_name || "App Customer"} ({selectedItem.user?.email || "No email"})
                </p>
                {selectedItem.user?.phone && (
                  <p className="text-slate-400 font-mono text-[11px]">{selectedItem.user.phone}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                  <span className="text-slate-500 text-[10px] block">Plan Name</span>
                  <span className="font-bold text-orange-400">{selectedItem.plan_name}</span>
                </div>
                <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                  <span className="text-slate-500 text-[10px] block">Plan Key</span>
                  <span className="font-mono font-bold text-white">{selectedItem.plan_key}</span>
                </div>
                <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                  <span className="text-slate-500 text-[10px] block">Product ID / SKU</span>
                  <span className="font-mono text-slate-300 text-[11px]">{selectedItem.product_id || "N/A"}</span>
                </div>
                <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                  <span className="text-slate-500 text-[10px] block">Gateway</span>
                  <span className="font-bold text-white">{selectedItem.payment_gateway || "Google Play"}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                  <span className="text-slate-500 text-[10px] block">Purchased Date</span>
                  <span className="font-bold text-slate-200">{formatDate(selectedItem.purchased_at)}</span>
                </div>
                <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                  <span className="text-slate-500 text-[10px] block">Expiry Date</span>
                  <span className="font-mono font-bold text-amber-400">
                    {selectedItem.expires_at ? formatDate(selectedItem.expires_at) : "Lifetime"}
                  </span>
                </div>
              </div>

              {/* Purchase Token with Copy Button */}
              {selectedItem.purchase_token && (
                <div className="bg-black/40 p-3 rounded-2xl border border-white/5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-[10.5px] flex items-center gap-1">
                      <Key className="h-3 w-3 text-orange-400" /> Purchase Token
                    </span>
                    <button
                      onClick={() => handleCopy(selectedItem.purchase_token!)}
                      className="text-[11px] text-orange-400 hover:text-orange-300 flex items-center gap-1 font-semibold"
                    >
                      {copiedToken ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedToken ? "Copied" : "Copy Token"}</span>
                    </button>
                  </div>
                  <p className="font-mono text-[10.5px] text-slate-300 break-all bg-black/60 p-2 rounded-xl border border-white/5">
                    {selectedItem.purchase_token}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-md hover:from-orange-600 hover:to-amber-600 transition-colors"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
