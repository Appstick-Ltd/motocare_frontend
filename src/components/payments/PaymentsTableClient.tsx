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
  DollarSign,
  Globe,
  Key,
  TrendingUp,
  X,
  Copy,
  Check,
  Zap,
  Smartphone,
  Wallet,
  Layers,
  Percent,
  Filter,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

interface PaymentsTableClientProps {
  initialHistory: SubscriptionHistory[];
}

const EXCHANGE_RATES_TO_BDT: Record<string, number> = {
  BDT: 1,
  USD: 120,
  EUR: 130,
  GBP: 155,
  INR: 1.45,
  CAD: 88,
  AUD: 80,
  SAR: 32,
  AED: 32.5,
  SGD: 90,
  MYR: 27,
  JPY: 0.8,
};

export function PaymentsTableClient({ initialHistory }: PaymentsTableClientProps) {
  const [history] = useState<SubscriptionHistory[]>(initialHistory);
  const [selectedItem, setSelectedItem] = useState<SubscriptionHistory | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);

  // Collapse / Expand state for Breakdown Sections (initially collapsed as requested)
  const [isBreakdownCollapsed, setIsBreakdownCollapsed] = useState<boolean>(true);

  // Filter States
  const [selectedPlan, setSelectedPlan] = useState<string>("all");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("all");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const totalPurchases = history.length;
  const activeSubs = history.filter((h) => (h.status || "").toLowerCase() === "active").length;

  // Available unique currencies in the dataset
  const availableCurrencies = Array.from(
    new Set(history.map((h) => (h.currency || "USD").toUpperCase()))
  );

  // Calculate gross revenue grouped by currency and converted to BDT
  const revenueByCurrency = history.reduce<
    Record<string, { total: number; count: number; symbol: string; bdtEquivalent: number }>
  >((acc, item) => {
    const curr = (item.currency || "USD").toUpperCase();
    const symbol =
      item.currency_symbol ||
      (curr === "BDT" ? "৳" : curr === "EUR" ? "€" : curr === "GBP" ? "£" : "$");
    const amt = Number(item.amount || 0);
    const rate = EXCHANGE_RATES_TO_BDT[curr] ?? (curr === "BDT" ? 1 : 120);

    if (!acc[curr]) {
      acc[curr] = { total: 0, count: 0, symbol, bdtEquivalent: 0 };
    }
    acc[curr].total += amt;
    acc[curr].count += 1;
    acc[curr].bdtEquivalent += amt * rate;
    return acc;
  }, {});

  // Unified Total Revenue converted to BDT
  const totalCombinedBdt = history.reduce((sum, item) => {
    const curr = (item.currency || "USD").toUpperCase();
    const amt = Number(item.amount || 0);
    const rate = EXCHANGE_RATES_TO_BDT[curr] ?? (curr === "BDT" ? 1 : 120);
    return sum + amt * rate;
  }, 0);

  // Group transactions by Apple and Google Play
  const appleItems = history.filter((h) => {
    const gw = (h.payment_gateway || "").toLowerCase();
    const prod = (h.product_id || "").toLowerCase();
    return (
      gw.includes("apple") ||
      gw.includes("ios") ||
      gw.includes("app_store") ||
      gw.includes("appstore") ||
      gw.includes("storekit") ||
      prod.includes("ios") ||
      prod.includes("apple")
    );
  });

  const googlePlayItems = history.filter((h) => {
    const gw = (h.payment_gateway || "").toLowerCase();
    const prod = (h.product_id || "").toLowerCase();
    return (
      gw.includes("google") ||
      gw.includes("play") ||
      gw.includes("android") ||
      prod.includes("android") ||
      (!gw.includes("apple") && !gw.includes("ios"))
    );
  });

  const appleCount = appleItems.length;
  const appleBdt = appleItems.reduce((sum, item) => {
    const curr = (item.currency || "USD").toUpperCase();
    const amt = Number(item.amount || 0);
    const rate = EXCHANGE_RATES_TO_BDT[curr] ?? (curr === "BDT" ? 1 : 120);
    return sum + amt * rate;
  }, 0);

  const googlePlayCount = googlePlayItems.length;
  const googlePlayBdt = googlePlayItems.reduce((sum, item) => {
    const curr = (item.currency || "USD").toUpperCase();
    const amt = Number(item.amount || 0);
    const rate = EXCHANGE_RATES_TO_BDT[curr] ?? (curr === "BDT" ? 1 : 120);
    return sum + amt * rate;
  }, 0);

  const applePct = totalPurchases > 0 ? Math.round((appleCount / totalPurchases) * 100) : 0;
  const googlePlayPct = totalPurchases > 0 ? Math.round((googlePlayCount / totalPurchases) * 100) : 0;

  // Filtered dataset for DataTable based on active filters
  const filteredHistory = history.filter((item) => {
    // 1. Plan filter (standard / premium)
    if (selectedPlan !== "all") {
      const planKey = (item.plan_key || "").toLowerCase();
      const planName = (item.plan_name || "").toLowerCase();
      if (selectedPlan === "premium" && !planKey.includes("premium") && !planName.includes("premium")) {
        return false;
      }
      if (selectedPlan === "standard" && !planKey.includes("standard") && !planName.includes("standard")) {
        return false;
      }
    }

    // 2. Currency filter (USD / BDT / EUR, etc.)
    if (selectedCurrency !== "all") {
      const curr = (item.currency || "USD").toUpperCase();
      if (curr !== selectedCurrency.toUpperCase()) {
        return false;
      }
    }

    // 3. Platform filter (apple / google)
    if (selectedPlatform !== "all") {
      const gw = (item.payment_gateway || "").toLowerCase();
      const prod = (item.product_id || "").toLowerCase();
      const isApple = gw.includes("apple") || gw.includes("ios") || gw.includes("app_store") || prod.includes("ios");
      const isGoogle = gw.includes("google") || gw.includes("play") || gw.includes("android") || prod.includes("android") || !isApple;
      if (selectedPlatform === "apple" && !isApple) return false;
      if (selectedPlatform === "google" && !isGoogle) return false;
    }

    // 4. Status filter
    if (selectedStatus !== "all") {
      const status = (item.status || "active").toLowerCase();
      if (status !== selectedStatus.toLowerCase()) return false;
    }

    return true;
  });

  const isFilterActive =
    selectedPlan !== "all" ||
    selectedCurrency !== "all" ||
    selectedPlatform !== "all" ||
    selectedStatus !== "all";

  const handleResetFilters = () => {
    setSelectedPlan("all");
    setSelectedCurrency("all");
    setSelectedPlatform("all");
    setSelectedStatus("all");
  };

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
      accessorKey: "country",
      header: "Country / Region",
      cell: ({ row }) => {
        const country = row.original.country || "Global / Android";
        return (
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Globe className="h-3.5 w-3.5 text-blue-400 shrink-0" />
            <span className="font-medium text-white">{country}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "plan_name",
      header: "Purchased Plan",
      cell: ({ row }) => {
        const h = row.original;
        const isPremium = h.plan_key === "premium" || (h.plan_name && h.plan_name.toLowerCase().includes("premium"));

        return (
          <div className="space-y-1">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold shadow-xs ${
              isPremium
                ? "bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/10 text-orange-400 border border-orange-500/35"
                : "bg-blue-500/15 text-blue-400 border border-blue-500/25"
            }`}>
              <Crown className="h-3.5 w-3.5 shrink-0" />
              <span>{h.plan_name || (isPremium ? "Premium Plan (Annual)" : "Standard Plan (Monthly)")}</span>
            </span>
            <p className="text-[10px] font-mono text-slate-400 pl-1">
              Key: <span className="text-slate-300 font-bold">{h.plan_key}</span>
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "paid_amount",
      header: "Amount Paid (Actual)",
      cell: ({ row }) => {
        const h = row.original;
        const paidCurr = h.paid_currency || h.currency || "BDT";
        const paidSymbol = h.paid_currency_symbol || h.currency_symbol || (paidCurr === "BDT" ? "৳" : "$");
        const paidAmount = h.paid_amount != null ? Number(h.paid_amount) : Number(h.amount || 0);
        const formatted = h.formatted_price || `${paidSymbol}${paidAmount.toFixed(2)}`;

        return (
          <div className="space-y-0.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-400 font-extrabold text-xs border border-emerald-500/30">
              <span>{formatted}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono block pl-1">
              Paid in: <strong className="text-emerald-400">{paidCurr}</strong>
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "base_amount",
      header: "Base Price (Catalog)",
      cell: ({ row }) => {
        const h = row.original;
        if (h.base_amount == null) {
          return <span className="text-slate-500 text-sm font-mono pl-3">—</span>;
        }

        const baseAmt = Number(h.base_amount);
        const baseCurr = (h.base_currency || "USD").toUpperCase();
        const baseSymbol =
          baseCurr === "BDT" ? "৳" : baseCurr === "EUR" ? "€" : baseCurr === "GBP" ? "£" : "$";

        return (
          <div className="space-y-0.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-400 font-extrabold text-xs border border-amber-500/30">
              <span>{baseSymbol} {baseAmt.toFixed(2)}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono block pl-1">
              Base: <strong className="text-amber-300">{baseCurr}</strong>
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
            <div className="h-6 w-6 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
              <CreditCard className="h-3.5 w-3.5" />
            </div>
            <span className="font-semibold text-white">{gateway}</span>
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
            {exp ? formatDate(exp) : "Lifetime"}
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/25 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors"
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
      {/* 4 Financial & Revenue Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Unified Total Gross Revenue (Converted to BDT) */}
        <div className="rounded-2xl p-5 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Total Revenue (in BDT)
            </span>
            <p className="text-2xl font-extrabold text-emerald-400 mt-1">
              ৳ {totalCombinedBdt.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-[10.5px] text-emerald-400/80 mt-0.5 font-medium">
              All currencies calculated in BDT
            </p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <DollarSign className="h-5 w-5" />
          </div>
        </div>

        {/* Active Pro Subscriptions */}
        <div className="rounded-2xl p-5 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Subscriptions
            </span>
            <p className="text-2xl font-extrabold text-amber-400 mt-1">{activeSubs}</p>
            <p className="text-[10.5px] text-amber-400/80 mt-0.5">Recurring active pro members</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Crown className="h-5 w-5" />
          </div>
        </div>

        {/* Apple In-App Orders */}
        <div className="rounded-2xl p-5 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Apple In-App Orders
            </span>
            <p className="text-2xl font-extrabold text-white mt-1">{appleItems.length}</p>
            <p className="text-[10.5px] text-slate-400 mt-0.5">iOS App Store purchases</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <svg className="h-5 w-5 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.83-11.96-14.38-6.19-9.57-10.9-20.2-14.13-31.9-3.23-11.7-4.85-22.56-4.85-32.58 0-14.54 3.7-26.68 11.1-36.43 7.4-9.74 16.79-14.73 28.17-14.95 4.58 0 9.87 1.25 15.86 3.75 6 2.5 10.02 3.86 12.06 4.08 1.94-.33 6.07-1.78 12.4-4.36 6.33-2.58 11.66-3.77 15.98-3.56 12.63.66 22.58 5.48 29.86 14.49-10.99 6.64-16.38 15.87-16.15 27.67.23 9.35 3.82 17.18 10.77 23.49 6.96 6.31 15.19 9.9 24.71 10.78-2.06 6.09-4.52 12.07-7.38 17.93zM119.22 33.64c0-7.3 2.66-14.14 7.99-20.52 5.33-6.38 11.91-10.36 19.74-11.93.98 7.4-1.57 14.44-7.65 21.12-6.08 6.68-13.06 10.51-20.93 11.51-.15-.06-.15-.12-.15-.18z" />
            </svg>
          </div>
        </div>

        {/* Google Play Billing */}
        <div className="rounded-2xl p-5 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Google Play In-App Orders
            </span>
            <p className="text-2xl font-extrabold text-blue-400 mt-1">{googlePlayItems.length}</p>
            <p className="text-[10.5px] text-slate-400 mt-0.5">Android Play Store purchases</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <CreditCard className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* ── Breakdown Toggle Bar & Sections ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
              Detailed Analytics &amp; Breakdown
            </span>
            <span className="px-2 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-[10.5px] font-bold font-mono">
              {availableCurrencies.length} Currencies • Apple &amp; Google Play
            </span>
          </div>

          <button
            onClick={() => setIsBreakdownCollapsed(!isBreakdownCollapsed)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/30 text-xs font-bold text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer"
          >
            {isBreakdownCollapsed ? (
              <>
                <span>Expand Cards</span>
                <ChevronDown className="h-3.5 w-3.5 text-orange-400" />
              </>
            ) : (
              <>
                <span>Collapse Cards</span>
                <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
              </>
            )}
          </button>
        </div>

        {!isBreakdownCollapsed && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* ── Section 1: Currency-Wise Revenue Breakdown ── */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md p-5 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Globe className="h-4 w-4 text-orange-400" /> Currency-Wise Revenue Breakdown
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Exact gross revenue collected per individual currency
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {Object.keys(revenueByCurrency).length} Active Currencies
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.entries(revenueByCurrency).map(([curr, data]) => {
                  const isBdt = curr === "BDT";
                  return (
                    <div
                      key={curr}
                      className="rounded-xl p-4 bg-black/40 border border-white/5 hover:border-orange-500/30 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md bg-white/10 text-orange-400 font-bold text-xs font-mono">
                          {curr}
                        </span>
                        <span className="text-[10.5px] text-slate-400">
                          {data.count} {data.count === 1 ? "order" : "orders"}
                        </span>
                      </div>

                      <div>
                        <div className="text-xl font-extrabold text-white font-mono flex items-baseline gap-1">
                          <span className="text-orange-400 text-sm">{data.symbol}</span>
                          <span>
                            {data.total.toLocaleString(undefined, {
                              minimumFractionDigits: data.total % 1 === 0 ? 0 : 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                          <span className="text-xs text-slate-400 font-sans">{curr}</span>
                        </div>

                        {!isBdt && (
                          <p className="text-[11px] text-emerald-400/90 font-mono mt-1 font-semibold">
                            ≈ ৳{data.bdtEquivalent.toFixed(2)} BDT
                          </p>
                        )}
                        {isBdt && (
                          <p className="text-[11px] text-slate-400 font-mono mt-1">
                            Local Currency (BDT)
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Section 2: In-App Billing Channels (Apple & Google Play) ── */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md p-5 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-blue-400" /> In-App Billing Channels &amp; Stores
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Comparison between Apple App Store (iOS) vs Google Play Billing (Android)
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {totalPurchases} Total In-App Orders
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Apple In-App Purchases Card */}
                <div className="rounded-2xl p-4 bg-gradient-to-br from-white/10 via-slate-900/80 to-black/60 border border-white/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-9 w-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white">
                        <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 170 170">
                          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.83-11.96-14.38-6.19-9.57-10.9-20.2-14.13-31.9-3.23-11.7-4.85-22.56-4.85-32.58 0-14.54 3.7-26.68 11.1-36.43 7.4-9.74 16.79-14.73 28.17-14.95 4.58 0 9.87 1.25 15.86 3.75 6 2.5 10.02 3.86 12.06 4.08 1.94-.33 6.07-1.78 12.4-4.36 6.33-2.58 11.66-3.77 15.98-3.56 12.63.66 22.58 5.48 29.86 14.49-10.99 6.64-16.38 15.87-16.15 27.67.23 9.35 3.82 17.18 10.77 23.49 6.96 6.31 15.19 9.9 24.71 10.78-2.06 6.09-4.52 12.07-7.38 17.93zM119.22 33.64c0-7.3 2.66-14.14 7.99-20.52 5.33-6.38 11.91-10.36 19.74-11.93.98 7.4-1.57 14.44-7.65 21.12-6.08 6.68-13.06 10.51-20.93 11.51-.15-.06-.15-.12-.15-.18z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Apple App Store</h4>
                        <p className="text-[10.5px] text-slate-400">iOS In-App Purchases</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/10 text-white font-mono font-bold text-xs border border-white/20">
                      {applePct}% share
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5 text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Transactions</span>
                      <p className="font-bold text-white font-mono text-base">
                        {appleCount} <span className="text-[10px] text-slate-400 font-sans">orders</span>
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Collected Volume</span>
                      <p className="font-bold text-white font-mono text-base">
                        ৳{appleBdt.toFixed(2)} <span className="text-[10px] text-slate-400 font-sans">BDT</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google Play In-App Billing Card */}
                <div className="rounded-2xl p-4 bg-gradient-to-br from-blue-500/10 via-slate-900/80 to-black/60 border border-blue-500/25 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-9 w-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                        <Smartphone className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Google Play Billing</h4>
                        <p className="text-[10.5px] text-slate-400">Android In-App Purchases</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-mono font-bold text-xs border border-blue-500/30">
                      {googlePlayPct}% share
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5 text-xs">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Transactions</span>
                      <p className="font-bold text-white font-mono text-base">
                        {googlePlayCount} <span className="text-[10px] text-slate-400 font-sans">orders</span>
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] block">Collected Volume</span>
                      <p className="font-bold text-emerald-400 font-mono text-base">
                        ৳{googlePlayBdt.toFixed(2)} <span className="text-[10px] text-slate-400 font-sans">BDT</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Interactive Filters Toolbar (Plan, Currency, Store, Status) ── */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md p-4 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-orange-400" />
            <span className="text-xs font-bold text-white">Filter Purchases &amp; Invoices</span>
            <span className="text-[11px] text-slate-400">
              (Showing <strong className="text-orange-400">{filteredHistory.length}</strong> of {history.length})
            </span>
          </div>

          {isFilterActive && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-[11px] font-bold text-red-400 hover:text-red-300 transition-colors cursor-pointer w-fit"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* 1. Plan Filter (Standard / Premium) */}
          <div>
            <label className="text-[10.5px] font-bold text-slate-400 block mb-1">
              Subscription Plan
            </label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
            >
              <option value="all" className="bg-slate-900 text-white">All Plans (Standard &amp; Premium)</option>
              <option value="standard" className="bg-slate-900 text-white">Standard Plan (Monthly)</option>
              <option value="premium" className="bg-slate-900 text-white">Premium Plan (Annual)</option>
            </select>
          </div>

          {/* 2. Currency Filter */}
          <div>
            <label className="text-[10.5px] font-bold text-slate-400 block mb-1">
              Currency
            </label>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
            >
              <option value="all" className="bg-slate-900 text-white">All Currencies</option>
              {availableCurrencies.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Platform / Store Filter */}
          <div>
            <label className="text-[10.5px] font-bold text-slate-400 block mb-1">
              Billing Platform / Store
            </label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
            >
              <option value="all" className="bg-slate-900 text-white">All Platforms</option>
              <option value="google" className="bg-slate-900 text-white">Google Play Store (Android)</option>
              <option value="apple" className="bg-slate-900 text-white">Apple App Store (iOS)</option>
            </select>
          </div>

          {/* 4. Status Filter */}
          <div>
            <label className="text-[10.5px] font-bold text-slate-400 block mb-1">
              Subscription Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500 transition-colors"
            >
              <option value="all" className="bg-slate-900 text-white">All Statuses</option>
              <option value="active" className="bg-slate-900 text-white">Active</option>
              <option value="expired" className="bg-slate-900 text-white">Expired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subscription Purchases Table */}
      <DataTable
        columns={columns}
        data={filteredHistory}
        searchPlaceholder="Search by customer name, email, plan name, country or currency..."
        emptyMessage="No subscription purchase records match your search or filter criteria."
      />

      {/* Purchase Receipt & Transaction Metadata Modal */}
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
                <h3 className="text-lg font-bold text-white">Purchase Invoice #{selectedItem.id}</h3>
                <p className="text-xs text-slate-400">Google Play In-App Billing Transaction</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5 space-y-1">
                <span className="text-slate-500 text-[10.5px]">Subscriber Details</span>
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
                  <span className="text-slate-500 text-[10px] block">Amount Paid (Actual)</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    {selectedItem.formatted_price || `${selectedItem.currency_symbol || "$"}${selectedItem.amount}`}
                  </span>
                </div>
                {selectedItem.base_amount != null && (
                  <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                    <span className="text-slate-500 text-[10px] block">Base Plan Price (Catalog)</span>
                    <span className="font-mono font-bold text-amber-400 text-xs">
                      {((selectedItem.base_currency || selectedItem.currency || "BDT").toUpperCase() === "BDT" ? "৳" : "$")}{" "}
                      {Number(selectedItem.base_amount).toFixed(2)}{" "}
                      {(selectedItem.base_currency || selectedItem.currency || "BDT").toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                  <span className="text-slate-500 text-[10px] block">Country / Region</span>
                  <span className="font-medium text-white">{selectedItem.country || "Global"}</span>
                </div>
                <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                  <span className="text-slate-500 text-[10px] block">Currency</span>
                  <span className="font-mono font-bold text-slate-200">{selectedItem.currency || "USD"}</span>
                </div>
                <div className="bg-black/30 p-3 rounded-2xl border border-white/5">
                  <span className="text-slate-500 text-[10px] block">Product ID / SKU</span>
                  <span className="font-mono text-slate-300 text-[11px] truncate block" title={selectedItem.product_id || ""}>
                    {selectedItem.product_id || "motocare_pro"}
                  </span>
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
                      <Key className="h-3 w-3 text-orange-400" /> Google Play Purchase Token
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
