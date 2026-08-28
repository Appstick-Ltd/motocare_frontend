import React from "react";

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Top Header / Action Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-white/10 rounded-xl" />
          <div className="h-4 w-72 bg-white/5 rounded-lg" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-28 bg-white/10 rounded-xl" />
          <div className="h-10 w-36 bg-orange-500/20 rounded-xl" />
        </div>
      </div>

      {/* Metric Cards Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 bg-slate-900/70 border border-white/10 backdrop-blur-md shadow-xl flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="h-3.5 w-24 bg-white/10 rounded-md" />
              <div className="h-7 w-16 bg-white/20 rounded-lg" />
            </div>
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 border border-orange-500/20" />
          </div>
        ))}
      </div>

      {/* Search & Filter Bar Skeleton */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="h-10 w-full sm:w-80 bg-white/10 rounded-xl" />
        <div className="h-5 w-40 bg-white/5 rounded-md" />
      </div>

      {/* Table Skeleton */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md overflow-hidden shadow-xl p-6 space-y-4">
        <div className="h-5 w-full bg-white/10 rounded-md mb-6" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-3 w-1/3">
              <div className="h-10 w-10 rounded-xl bg-white/10 shrink-0" />
              <div className="space-y-1.5 w-full">
                <div className="h-4 w-3/4 bg-white/15 rounded-md" />
                <div className="h-3 w-1/2 bg-white/5 rounded-md" />
              </div>
            </div>
            <div className="h-6 w-24 bg-white/10 rounded-full" />
            <div className="h-4 w-32 bg-white/10 rounded-md hidden md:block" />
            <div className="h-8 w-24 bg-orange-500/15 border border-orange-500/30 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
