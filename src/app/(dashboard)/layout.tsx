import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { requireAdminSession } from "@/lib/auth/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();

  return (
    <div className="flex h-screen overflow-hidden bg-[#070913] text-slate-100 antialiased relative selection:bg-orange-500 selection:text-white" suppressHydrationWarning>
      {/* Background Ambient Glow & Subtle Grid (Matching Landing Page) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/3 w-[600px] h-[400px] bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundSize: "32px 32px",
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          }}
        />
      </div>

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
        <Header
          userEmail={session.profile?.email}
          userName={session.profile?.full_name || "Super Admin"}
          userRole={session.profile?.role || "SUPER_ADMIN"}
        />

        <main className="flex-1 overflow-y-auto p-5 sm:p-7 md:p-8 space-y-6">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}
