"use client";

import React from "react";
import { Profile, Vehicle } from "@/types/database.types";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate } from "@/lib/utils";
import {
  X,
  Crown,
  User as UserIcon,
  Car,
  Bike,
  Gauge,
  Fuel,
  Navigation,
  Clock,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Tag,
  DollarSign,
  Globe,
  Key,
  ShieldCheck,
  Layers,
} from "lucide-react";

interface UserDetailsModalProps {
  user: Profile | null;
  onClose: () => void;
}

export function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
  if (!user) return null;

  const isPro =
    user.is_pro ||
    (user.plan_type && user.plan_type.toLowerCase() !== "free") ||
    (user.subscription_plan &&
      user.subscription_plan.toLowerCase() !== "free user" &&
      user.subscription_plan.toLowerCase() !== "free plan" &&
      user.subscription_plan.toLowerCase() !== "free");

  const planName = user.plan_name || user.subscription_plan || (isPro ? "Pro Plan" : "Free Plan");
  const planType = user.plan_type || (isPro ? "pro" : "free");

  const currencyCode = user.subscription_currency || user.currency_code || "USD";
  let currencySymbol = user.currency_symbol;
  if (!currencySymbol || currencySymbol === "Bs." || currencyCode === "USD") {
    if (currencyCode === "USD") currencySymbol = "$";
    else if (currencyCode === "BDT") currencySymbol = "৳";
    else if (currencyCode === "EUR") currencySymbol = "€";
    else if (currencyCode === "GBP") currencySymbol = "£";
    else if (currencyCode === "INR") currencySymbol = "₹";
    else if (!currencySymbol) currencySymbol = "$";
  }

  const priceDisplay =
    user.subscription_amount != null
      ? `${currencySymbol}${user.subscription_amount} ${currencyCode}`
      : null;

  const isVerified = Boolean(user.is_verified);
  const vehicles = user.vehicles || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in">
      <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0b0f19] p-6 sm:p-8 shadow-2xl space-y-6 text-slate-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/5"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 1. Header: User Profile Overview */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 pr-10">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 flex items-center justify-center text-white font-extrabold text-xl shadow-lg ring-2 ring-orange-500/30 shrink-0">
              {(user.full_name || user.email || "U").slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white">
                  {user.full_name || "Unnamed User"}
                </h3>
                {isVerified ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-500/15 text-slate-400 border border-slate-500/20">
                    <XCircle className="w-3 h-3" /> Unverified
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <StatusBadge status={user.role || "user"} />
                <StatusBadge status={user.status || "active"} />
                {isPro ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Crown className="w-3 h-3 text-orange-400 fill-orange-400" /> {planName}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-slate-300 border border-white/10">
                    <UserIcon className="w-3 h-3 text-slate-400" /> Free User
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/20">
                  🚗 {vehicles.length} Registered Vehicle{vehicles.length === 1 ? "" : "s"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Personal & Account Information Grid */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <UserIcon className="w-3.5 h-3.5 text-orange-400" /> Personal &amp; Account Details
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white/[0.02] p-4 rounded-2xl border border-white/5">
            <div>
              <span className="text-slate-500 text-[10px] block font-medium">Phone Number</span>
              <p className="font-bold text-white mt-0.5 font-mono">
                {user.phone || "Not provided"}
              </p>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block font-medium">Gender</span>
              <p className="font-bold text-white mt-0.5 capitalize">
                {user.gender || "Not specified"}
              </p>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block font-medium">Address / City</span>
              <p className="font-bold text-white mt-0.5 truncate" title={user.address || ""}>
                {user.address || "Not provided"}
              </p>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block font-medium">Verification Status</span>
              <p className={`font-bold mt-0.5 ${isVerified ? "text-emerald-400" : "text-slate-400"}`}>
                {isVerified ? "✓ Verified Account" : "Unverified Account"}
              </p>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block font-medium">Registered Date</span>
              <p className="font-bold text-white mt-0.5">
                {formatDate(user.created_at)}
              </p>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block font-medium">Last Profile Update</span>
              <p className="font-bold text-white mt-0.5">
                {user.updated_at ? formatDate(user.updated_at) : "N/A"}
              </p>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500 text-[10px] block font-medium">User Database UUID</span>
              <p className="font-mono text-slate-400 text-[11px] truncate mt-0.5" title={user.id}>
                {user.id}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Subscription & Plan Full Details Card */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5 text-orange-400" /> Plan &amp; Subscription Information
          </h4>
          <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 via-slate-900/60 to-amber-500/5 p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-base font-extrabold text-white flex items-center gap-2">
                    <span>{planName}</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-white/10 text-slate-300 font-bold">
                      {planType}
                    </span>
                  </h5>
                  <p className="text-xs text-slate-400">
                    Status: <strong className="text-white capitalize">{user.subscription_status || "inactive"}</strong>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold capitalize border ${
                    user.subscription_status === "active"
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : "bg-slate-500/15 text-slate-300 border-white/10"
                  }`}
                >
                  ● {user.subscription_status || "inactive"}
                </span>
                {priceDisplay && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 font-mono">
                    {priceDisplay}
                  </span>
                )}
              </div>
            </div>

            {/* Plan Dates & Pricing Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                <span className="text-slate-500 text-[10px] block font-medium">Purchase / Start Date</span>
                <span className="font-bold text-white mt-0.5 block">
                  {user.plan_start_date ? formatDate(user.plan_start_date) : (isPro ? formatDate(user.created_at) : "N/A")}
                </span>
              </div>
              <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                <span className="text-slate-500 text-[10px] block font-medium">Expiration Date</span>
                <span className="font-bold text-orange-400 mt-0.5 block">
                  {user.plan_expiration_date
                    ? formatDate(user.plan_expiration_date)
                    : user.subscription_expires_at
                    ? formatDate(user.subscription_expires_at)
                    : (isPro ? "Lifetime / Ongoing" : "No Expiration (Free)")}
                </span>
              </div>
              <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                <span className="text-slate-500 text-[10px] block font-medium">Subscription Amount</span>
                <span className="font-mono font-bold text-emerald-400 mt-0.5 block">
                  {priceDisplay || (isPro ? "Custom / Included" : "Free ($0.00)")}
                </span>
              </div>
              <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                <span className="text-slate-500 text-[10px] block font-medium">Country / Currency</span>
                <span className="font-bold text-slate-200 mt-0.5 block">
                  {user.subscription_country || "Global"} ({currencyCode})
                </span>
              </div>
              {user.product_id && (
                <div className="bg-black/30 p-3 rounded-xl border border-white/5 col-span-2">
                  <span className="text-slate-500 text-[10px] block font-medium">Product ID</span>
                  <span className="font-mono font-bold text-slate-300 mt-0.5 block truncate" title={user.product_id}>
                    {user.product_id}
                  </span>
                </div>
              )}
              {user.purchase_token && (
                <div className="bg-black/30 p-3 rounded-xl border border-white/5 col-span-2">
                  <span className="text-slate-500 text-[10px] block font-medium">Purchase Token</span>
                  <span className="font-mono text-slate-400 text-[11px] mt-0.5 block truncate" title={user.purchase_token}>
                    {user.purchase_token.slice(0, 16)}...
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. ── All Registered Vehicles from `public.vehicles` Table ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Car className="h-4.5 w-4.5 text-orange-400" />
              <span>Registered Vehicles &amp; Full Specifications ({vehicles.length})</span>
            </h4>
          </div>

          {vehicles && vehicles.length > 0 ? (
            <div className="space-y-4">
              {vehicles.map((v: Vehicle, idx: number) => {
                const isBike =
                  (v.vehicle_type || "").toLowerCase().includes("bike") ||
                  (v.vehicle_type || "").toLowerCase().includes("motorcycle");
                const model =
                  v.vehicle_model || (v as any).model || (v as any).name || (v as any).brand || `Vehicle #${idx + 1}`;
                const type = v.vehicle_type || (isBike ? "Bike" : "Car");
                const vehicleNumber = v.vehicle_number || (v as any).license_plate || "Not added";
                const odometerVal = v.odometer != null ? v.odometer : 0;
                const odometerUnit = v.odometer_unit || "km";
                const tankCapacity =
                  v.fuel_tank_capacity != null ? `${v.fuel_tank_capacity} L` : "Not specified";
                const avgDistance =
                  v.avg_daily_distance != null ? `${v.avg_daily_distance} km/day` : "Not specified";
                const avgRunningTime =
                  v.avg_daily_running_time != null
                    ? `${v.avg_daily_running_time} hrs/day`
                    : "Not specified";

                return (
                  <div
                    key={v.id || idx}
                    className="rounded-3xl p-5 bg-slate-900/90 border border-white/10 hover:border-orange-500/40 transition-all space-y-4 shadow-xl"
                  >
                    {/* Vehicle Card Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-orange-500/20 to-amber-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                          {isBike ? <Bike className="h-5 w-5" /> : <Car className="h-5 w-5" />}
                        </div>
                        <div>
                          <h5 className="text-base font-extrabold text-white flex items-center gap-2">
                            <span>{model}</span>
                            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-400 font-bold border border-orange-500/30">
                              #{idx + 1}
                            </span>
                          </h5>
                          <p className="text-xs text-slate-400 capitalize">
                            Vehicle Type: <strong className="text-white">{type}</strong> • Model / Name:{" "}
                            <strong className="text-orange-400">{model}</strong>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/5 text-amber-400 border border-white/10">
                          {vehicleNumber}
                        </span>
                      </div>
                    </div>

                    {/* Complete vehicles Table Attributes Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      {/* 1. vehicle_type */}
                      <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                        <span className="text-slate-500 text-[10.5px] block font-medium">vehicle_type</span>
                        <span className="font-bold text-white capitalize flex items-center gap-1.5 mt-0.5">
                          {isBike ? (
                            <Bike className="h-3.5 w-3.5 text-orange-400" />
                          ) : (
                            <Car className="h-3.5 w-3.5 text-blue-400" />
                          )}
                          {type}
                        </span>
                      </div>

                      {/* 2. vehicle_model / name */}
                      <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                        <span className="text-slate-500 text-[10.5px] block font-medium">vehicle_model (Name)</span>
                        <span className="font-bold text-white mt-0.5 block truncate" title={model}>
                          {model}
                        </span>
                      </div>

                      {/* 3. vehicle_number */}
                      <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                        <span className="text-slate-500 text-[10.5px] block font-medium">
                          vehicle_number (Plate)
                        </span>
                        <span className="font-mono font-bold text-amber-400 mt-0.5 block">
                          {vehicleNumber}
                        </span>
                      </div>

                      {/* 4. odometer & odometer_unit */}
                      <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                        <span className="text-slate-500 text-[10.5px] block font-medium">
                          odometer (Reading)
                        </span>
                        <span className="font-mono font-bold text-orange-400 flex items-center gap-1.5 mt-0.5">
                          <Gauge className="h-3.5 w-3.5" />
                          {odometerVal.toLocaleString()} {odometerUnit}
                        </span>
                      </div>

                      {/* 5. fuel_tank_capacity */}
                      <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                        <span className="text-slate-500 text-[10.5px] block font-medium">
                          fuel_tank_capacity
                        </span>
                        <span className="font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                          <Fuel className="h-3.5 w-3.5" />
                          {tankCapacity}
                        </span>
                      </div>

                      {/* 6. avg_daily_distance */}
                      <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                        <span className="text-slate-500 text-[10.5px] block font-medium">
                          avg_daily_distance
                        </span>
                        <span className="font-mono font-bold text-blue-400 flex items-center gap-1.5 mt-0.5">
                          <Navigation className="h-3.5 w-3.5" />
                          {avgDistance}
                        </span>
                      </div>

                      {/* 7. avg_daily_running_time */}
                      <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                        <span className="text-slate-500 text-[10.5px] block font-medium">
                          avg_daily_running_time
                        </span>
                        <span className="font-mono font-bold text-purple-400 flex items-center gap-1.5 mt-0.5">
                          <Clock className="h-3.5 w-3.5" />
                          {avgRunningTime}
                        </span>
                      </div>

                      {/* 8. created_at */}
                      <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                        <span className="text-slate-500 text-[10.5px] block font-medium">
                          created_at (Registered)
                        </span>
                        <span className="font-medium text-slate-300 mt-0.5 block">
                          {formatDate(v.created_at)}
                        </span>
                      </div>

                      {/* 9. id */}
                      <div className="bg-black/40 p-3 rounded-2xl border border-white/5">
                        <span className="text-slate-500 text-[10.5px] block font-medium">
                          Vehicle ID (UUID)
                        </span>
                        <span
                          className="font-mono text-slate-400 text-[11px] truncate block mt-0.5"
                          title={v.id}
                        >
                          {v.id ? `${v.id.slice(0, 8)}...${v.id.slice(-4)}` : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-10 text-center rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-slate-400">
              <Car className="h-10 w-10 mx-auto text-slate-600 mb-2" />
              <p className="font-semibold text-slate-300">No Vehicles Registered</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                This user has not added any vehicles to their MotoCare garage yet.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end pt-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-md hover:from-orange-600 hover:to-amber-600 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
