"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Profile } from "@/types/database.types";
import { StatusBadge } from "@/components/common/StatusBadge";
import { formatDate } from "@/lib/utils";
import { UserCheck, ChevronRight, ArrowRight } from "lucide-react";
import { UserDetailsModal } from "@/components/users/UserDetailsModal";

interface RecentActivityTableProps {
  recentUsers: Profile[];
}

export function RecentActivityTable({ recentUsers }: RecentActivityTableProps) {
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2 text-white">
              <UserCheck className="h-4.5 w-4.5 text-orange-400" /> Recent User Activity &amp; Onboarding
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-normal">
              Real-time user actions, registrations, and account status
            </p>
          </div>
          <Link
            href="/users"
            className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
          >
            View All Users <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div>
          {recentUsers && recentUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-black/30 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-white/10">
                  <tr>
                    <th className="px-6 py-3.5">User</th>
                    <th className="px-6 py-3.5">Activity</th>
                    <th className="px-6 py-3.5">Registered Date</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentUsers.map((u: Profile) => (
                    <tr key={u.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8.5 w-8.5 rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 flex items-center justify-center text-white font-extrabold text-xs shadow-sm ring-1 ring-orange-500/30">
                            {(u.full_name || u.email || "U").slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-xs text-white">
                              {u.full_name || "Unnamed User"}
                            </p>
                            <p className="text-[11px] text-slate-400">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-200">
                          Account Created &amp; Profile Setup
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-[11px] text-slate-400">
                        {formatDate(u.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={u.status || "active"} />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedUser(u)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-400 hover:text-orange-300 hover:underline cursor-pointer"
                        >
                          Details <ChevronRight className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              No user activity recorded yet.
            </div>
          )}
        </div>
      </div>

      {/* Reusable User Details Modal */}
      <UserDetailsModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </>
  );
}
