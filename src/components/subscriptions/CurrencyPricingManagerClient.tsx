"use client";

import React, { useState } from "react";
import { SubscriptionPricing } from "@/types/database.types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  updateSubscriptionPricingAction,
  addSubscriptionPricingAction,
  deleteSubscriptionPricingAction,
} from "@/app/(dashboard)/subscriptions/plans/actions";
import {
  Globe,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Coins,
  Search,
  Save,
  Grid,
  List,
} from "lucide-react";

interface CurrencyPricingManagerClientProps {
  initialPricings: SubscriptionPricing[];
}

const countryMap: Record<string, { flag: string; country: string }> = {
  BDT: { flag: "🇧🇩", country: "Bangladesh" },
  INR: { flag: "🇮🇳", country: "India" },
  USD: { flag: "🇺🇸", country: "United States" },
  EUR: { flag: "🇪🇺", country: "Eurozone" },
  GBP: { flag: "🇬🇧", country: "United Kingdom" },
  SAR: { flag: "🇸🇦", country: "Saudi Arabia" },
  AED: { flag: "🇦🇪", country: "United Arab Emirates" },
  MYR: { flag: "🇲🇾", country: "Malaysia" },
  SGD: { flag: "🇸🇬", country: "Singapore" },
  AUD: { flag: "🇦🇺", country: "Australia" },
  CAD: { flag: "🇨🇦", country: "Canada" },
  JPY: { flag: "🇯🇵", country: "Japan" },
};

const defaultFallbackPricings: SubscriptionPricing[] = [
  { id: "00000000-0000-0000-0000-000000000001", currency_code: "BDT", currency_symbol: "৳", free_price: 0.00, standard_price: 15.00, premium_price: 150.00, is_active: true },
  { id: "00000000-0000-0000-0000-000000000002", currency_code: "INR", currency_symbol: "₹", free_price: 0.00, standard_price: 149.00, premium_price: 1299.00, is_active: true },
  { id: "00000000-0000-0000-0000-000000000003", currency_code: "USD", currency_symbol: "$", free_price: 0.00, standard_price: 1.99, premium_price: 14.99, is_active: true },
  { id: "00000000-0000-0000-0000-000000000004", currency_code: "EUR", currency_symbol: "€", free_price: 0.00, standard_price: 1.99, premium_price: 14.99, is_active: true },
  { id: "00000000-0000-0000-0000-000000000005", currency_code: "GBP", currency_symbol: "£", free_price: 0.00, standard_price: 1.49, premium_price: 12.99, is_active: true },
  { id: "00000000-0000-0000-0000-000000000006", currency_code: "SAR", currency_symbol: "SAR", free_price: 0.00, standard_price: 7.99, premium_price: 59.99, is_active: true },
  { id: "00000000-0000-0000-0000-000000000007", currency_code: "AED", currency_symbol: "AED", free_price: 0.00, standard_price: 7.99, premium_price: 59.99, is_active: true },
  { id: "00000000-0000-0000-0000-000000000008", currency_code: "MYR", currency_symbol: "RM", free_price: 0.00, standard_price: 8.99, premium_price: 69.99, is_active: true },
  { id: "00000000-0000-0000-0000-000000000009", currency_code: "SGD", currency_symbol: "S$", free_price: 0.00, standard_price: 2.99, premium_price: 22.99, is_active: true },
  { id: "00000000-0000-0000-0000-000000000010", currency_code: "AUD", currency_symbol: "A$", free_price: 0.00, standard_price: 2.99, premium_price: 22.99, is_active: true },
  { id: "00000000-0000-0000-0000-000000000011", currency_code: "CAD", currency_symbol: "C$", free_price: 0.00, standard_price: 2.49, premium_price: 19.99, is_active: true },
  { id: "00000000-0000-0000-0000-000000000012", currency_code: "JPY", currency_symbol: "¥", free_price: 0.00, standard_price: 299.00, premium_price: 2200.00, is_active: true },
];

export function CurrencyPricingManagerClient({ initialPricings }: CurrencyPricingManagerClientProps) {
  const [pricings, setPricings] = useState<SubscriptionPricing[]>(() => {
    return initialPricings && initialPricings.length > 0 ? initialPricings : defaultFallbackPricings;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [editingPricing, setEditingPricing] = useState<SubscriptionPricing | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);

  // Form states for Modal
  const [formData, setFormData] = useState({
    currency_code: "",
    currency_symbol: "",
    free_price: 0,
    standard_price: 0,
    premium_price: 0,
    is_active: true,
  });

  const filteredPricings = pricings.filter((p) => {
    const meta = countryMap[p.currency_code] || { country: "" };
    const term = searchTerm.toLowerCase();
    return (
      p.currency_code.toLowerCase().includes(term) ||
      p.currency_symbol.includes(term) ||
      meta.country.toLowerCase().includes(term)
    );
  });

  const openAddModal = () => {
    setFormData({
      currency_code: "",
      currency_symbol: "",
      free_price: 0,
      standard_price: 2.99,
      premium_price: 19.99,
      is_active: true,
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (item: SubscriptionPricing) => {
    setEditingPricing(item);
    setFormData({
      currency_code: item.currency_code,
      currency_symbol: item.currency_symbol,
      free_price: Number(item.free_price || 0),
      standard_price: Number(item.standard_price || 0),
      premium_price: Number(item.premium_price || 0),
      is_active: item.is_active,
    });
  };

  const handlePriceChange = (id: string, field: "free_price" | "standard_price" | "premium_price" | "currency_symbol", val: any) => {
    setPricings((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    );
  };

  const handleInlineSave = async (item: SubscriptionPricing) => {
    setSavingId(item.id);
    try {
      const res = await updateSubscriptionPricingAction(item.id, {
        currency_code: item.currency_code,
        currency_symbol: item.currency_symbol,
        free_price: Number(item.free_price || 0),
        standard_price: Number(item.standard_price || 0),
        premium_price: Number(item.premium_price || 0),
        is_active: item.is_active,
      });

      if (res && res.success) {
        toast.success(`Updated pricing for ${item.currency_code} (${countryMap[item.currency_code]?.country || ""})`);
      } else {
        toast.error(res?.error || "Failed to update pricing");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update pricing");
    } finally {
      setSavingId(null);
    }
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.currency_code || !formData.currency_symbol) {
      toast.error("Please provide both Currency Code and Symbol.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await addSubscriptionPricingAction(formData);
      if (res && res.success) {
        toast.success(`Pricing tier added for ${formData.currency_code.toUpperCase()} (${formData.currency_symbol})`);
        setIsAddModalOpen(false);

        const newObj: SubscriptionPricing = {
          id: `temp-${Date.now()}`,
          currency_code: formData.currency_code.toUpperCase(),
          currency_symbol: formData.currency_symbol,
          free_price: formData.free_price,
          standard_price: formData.standard_price,
          premium_price: formData.premium_price,
          is_active: formData.is_active,
        };
        setPricings((prev) => [newObj, ...prev]);
      } else {
        toast.error(res?.error || "Failed to add pricing");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to add pricing");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveEditModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPricing) return;

    setIsSubmitting(true);
    try {
      const res = await updateSubscriptionPricingAction(editingPricing.id, formData);
      if (res && res.success) {
        toast.success(`Pricing updated for ${formData.currency_code.toUpperCase()}!`);

        setPricings((prev) =>
          prev.map((p) =>
            p.id === editingPricing.id
              ? {
                  ...p,
                  currency_code: formData.currency_code.toUpperCase(),
                  currency_symbol: formData.currency_symbol,
                  free_price: formData.free_price,
                  standard_price: formData.standard_price,
                  premium_price: formData.premium_price,
                  is_active: formData.is_active,
                }
              : p
          )
        );
        setEditingPricing(null);
      } else {
        toast.error(res?.error || "Failed to update pricing");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update pricing");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, code: string) => {
    if (!confirm(`Are you sure you want to delete ${code} pricing entry?`)) return;

    try {
      const res = await deleteSubscriptionPricingAction(id);
      if (res && res.success) {
        toast.success(`Pricing for ${code} deleted.`);
        setPricings((prev) => prev.filter((p) => p.id !== id));
      } else {
        toast.error(res?.error || "Failed to delete pricing");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete pricing");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <Card className="border-border/70 shadow-sm overflow-hidden">
        <CardHeader className="p-6 border-b border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold border border-orange-500/20 shadow-2xs mb-2">
              <Globe className="h-3.5 w-3.5" /> Country-Wise Subscription Manager
            </div>
            <CardTitle className="text-xl font-black tracking-tight text-foreground flex items-center gap-2">
              <Coins className="h-5 w-5 text-orange-500" /> Multi-Currency Pricing Setup
            </CardTitle>
            <CardDescription className="text-xs mt-0.5 font-medium">
              Set custom Free, Standard, and Premium prices for Bangladesh (BDT), India (INR), US (USD), UK (GBP), and global markets.
            </CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search country or currency (e.g. Bangladesh, BDT, INR)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 text-xs h-9 w-64 rounded-xl border-border/70 focus:ring-orange-500"
              />
            </div>

            <div className="flex items-center rounded-xl border border-border/70 bg-muted/50 p-1">
              <Button
                variant={viewMode === "cards" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("cards")}
                className="h-7 text-xs px-2.5 gap-1 rounded-lg"
              >
                <Grid className="h-3.5 w-3.5" /> Cards View
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="h-7 text-xs px-2.5 gap-1 rounded-lg"
              >
                <List className="h-3.5 w-3.5" /> Table View
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* View Mode 1: Individual Country & Currency Cards View */}
        {viewMode === "cards" && (
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPricings.map((item) => {
                const meta = countryMap[item.currency_code] || { flag: "🌐", country: item.currency_code };
                return (
                  <Card key={item.id} className="relative overflow-hidden border border-border/70 hover:border-orange-500/40 transition-all duration-300 shadow-xs hover:shadow-md">
                    <CardHeader className="p-4 border-b border-border/60 bg-muted/30 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{meta.flag}</span>
                        <div>
                          <h4 className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
                            {meta.country}
                            <span className="px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 font-mono text-[10px] font-black border border-orange-500/20">
                              {item.currency_code} ({item.currency_symbol})
                            </span>
                          </h4>
                          <p className="text-[11px] text-muted-foreground font-medium">Currency Symbol: {item.currency_symbol}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditModal(item)}
                          className="h-7 w-7 text-muted-foreground hover:text-orange-500"
                          title="Full Edit Modal"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(item.id, item.currency_code)}
                          className="h-7 w-7 text-rose-500 hover:bg-rose-500/10"
                          title="Delete Pricing"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="p-4 space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Free Tier Price</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-xs font-bold text-muted-foreground">{item.currency_symbol}</span>
                          <Input
                            type="number"
                            step="0.01"
                            value={item.free_price}
                            onChange={(e) => handlePriceChange(item.id, "free_price", parseFloat(e.target.value) || 0)}
                            className="pl-8 text-xs font-mono h-8 bg-card"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-extrabold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Standard Plan Price</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-xs font-bold text-orange-500">{item.currency_symbol}</span>
                          <Input
                            type="number"
                            step="0.01"
                            value={item.standard_price}
                            onChange={(e) => handlePriceChange(item.id, "standard_price", parseFloat(e.target.value) || 0)}
                            className="pl-8 text-xs font-mono font-bold h-8 border-orange-500/30 focus:ring-orange-500 bg-card"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Premium Plan Price</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-xs font-bold text-amber-500">{item.currency_symbol}</span>
                          <Input
                            type="number"
                            step="0.01"
                            value={item.premium_price}
                            onChange={(e) => handlePriceChange(item.id, "premium_price", parseFloat(e.target.value) || 0)}
                            className="pl-8 text-xs font-mono font-bold h-8 border-amber-500/30 focus:ring-amber-500 bg-card"
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                          {item.is_active ? (
                            <span className="text-emerald-500 font-bold flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Active</span>
                          ) : (
                            <span className="text-rose-500 font-bold flex items-center gap-1"><XCircle className="h-3 w-3" /> Inactive</span>
                          )}
                        </span>

                        <Button
                          size="sm"
                          disabled={savingId === item.id}
                          onClick={() => handleInlineSave(item)}
                          className="h-8 px-3 text-xs bg-orange-500 hover:bg-orange-600 text-white font-bold gap-1.5 shadow-xs"
                        >
                          <Save className="h-3.5 w-3.5" /> {savingId === item.id ? "Saving..." : "Save Pricing"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        )}

        {/* View Mode 2: Table View */}
        {viewMode === "table" && (
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/50 text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider border-b border-border/60">
                  <tr>
                    <th className="px-6 py-3.5">Country / Currency</th>
                    <th className="px-6 py-3.5">Symbol</th>
                    <th className="px-6 py-3.5">Free Plan</th>
                    <th className="px-6 py-3.5">Standard Plan</th>
                    <th className="px-6 py-3.5">Premium Plan</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredPricings.map((item) => {
                    const meta = countryMap[item.currency_code] || { flag: "🌐", country: item.currency_code };
                    return (
                      <tr key={item.id} className="hover:bg-muted/40 transition-colors">
                        <td className="px-6 py-4 font-bold text-foreground">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl">{meta.flag}</span>
                            <div>
                              <p className="font-extrabold text-xs text-foreground">{meta.country}</p>
                              <p className="text-[11px] font-mono text-muted-foreground">{item.currency_code}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono font-bold text-sm text-foreground">
                          {item.currency_symbol}
                        </td>
                        <td className="px-6 py-4">
                          <Input
                            type="number"
                            step="0.01"
                            value={item.free_price}
                            onChange={(e) => handlePriceChange(item.id, "free_price", parseFloat(e.target.value) || 0)}
                            className="w-24 text-xs font-mono h-8"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <Input
                            type="number"
                            step="0.01"
                            value={item.standard_price}
                            onChange={(e) => handlePriceChange(item.id, "standard_price", parseFloat(e.target.value) || 0)}
                            className="w-28 text-xs font-mono font-bold border-orange-500/30 text-orange-600 h-8"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <Input
                            type="number"
                            step="0.01"
                            value={item.premium_price}
                            onChange={(e) => handlePriceChange(item.id, "premium_price", parseFloat(e.target.value) || 0)}
                            className="w-28 text-xs font-mono font-bold border-amber-500/30 text-amber-600 h-8"
                          />
                        </td>
                        <td className="px-6 py-4">
                          {item.is_active ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              <CheckCircle2 className="h-3 w-3" /> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                              <XCircle className="h-3 w-3" /> Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              size="sm"
                              disabled={savingId === item.id}
                              onClick={() => handleInlineSave(item)}
                              className="h-8 px-3 text-xs bg-orange-500 hover:bg-orange-600 text-white font-bold gap-1 shadow-xs"
                            >
                              <Save className="h-3.5 w-3.5" /> Save
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(item.id, item.currency_code)}
                              className="h-8 w-8 text-rose-500 hover:bg-rose-500/10"
                              title="Delete Pricing"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Add / Edit Currency Pricing Modal */}
      {(isAddModalOpen || editingPricing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-border/70 bg-card p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-border/60 pb-4">
              <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500 border border-orange-500/20 shadow-2xs">
                <Coins className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-foreground">
                  {editingPricing ? `Edit Pricing for ${formData.currency_code}` : "Add Country / Currency Pricing"}
                </h3>
                <p className="text-xs text-muted-foreground font-medium">
                  Set prices for Free, Standard, and Premium subscription tiers.
                </p>
              </div>
            </div>

            <form onSubmit={editingPricing ? handleSaveEditModal : handleSaveAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">Currency Code (3 Letters)</label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. BDT, USD, INR, EUR"
                    value={formData.currency_code}
                    onChange={(e) => setFormData({ ...formData, currency_code: e.target.value.toUpperCase() })}
                    className="text-xs font-mono font-bold uppercase"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">Currency Symbol</label>
                  <Input
                    type="text"
                    required
                    placeholder="e.g. ৳, $, ₹, €, £"
                    value={formData.currency_symbol}
                    onChange={(e) => setFormData({ ...formData, currency_symbol: e.target.value })}
                    className="text-xs font-mono font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Free Tier Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-muted-foreground">{formData.currency_symbol}</span>
                  <Input
                    type="number"
                    step="0.01"
                    required
                    value={formData.free_price}
                    onChange={(e) => setFormData({ ...formData, free_price: parseFloat(e.target.value) || 0 })}
                    className="pl-8 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-orange-600 dark:text-orange-400">Standard Tier Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-orange-500">{formData.currency_symbol}</span>
                  <Input
                    type="number"
                    step="0.01"
                    required
                    value={formData.standard_price}
                    onChange={(e) => setFormData({ ...formData, standard_price: parseFloat(e.target.value) || 0 })}
                    className="pl-8 text-xs font-mono font-bold border-orange-500/30 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-amber-600 dark:text-amber-400">Premium Tier Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-amber-500">{formData.currency_symbol}</span>
                  <Input
                    type="number"
                    step="0.01"
                    required
                    value={formData.premium_price}
                    onChange={(e) => setFormData({ ...formData, premium_price: parseFloat(e.target.value) || 0 })}
                    className="pl-8 text-xs font-mono font-bold border-amber-500/30 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/60">
                <label className="text-xs font-bold text-foreground">Pricing Entry Active Status</label>
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4 rounded border-border text-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingPricing(null);
                  }}
                  className="h-9 px-4 text-xs font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="sm"
                  className="h-9 px-5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs gap-1.5 shadow-md"
                >
                  <Save className="h-3.5 w-3.5" /> {isSubmitting ? "Saving..." : "Save Pricing Entry"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
