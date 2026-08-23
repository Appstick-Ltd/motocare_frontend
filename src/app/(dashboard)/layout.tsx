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
    <div className="flex h-screen overflow-hidden bg-background text-foreground antialiased">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header
          userEmail={session.profile?.email}
          userName={session.profile?.full_name || "Super Admin"}
          userRole={session.profile?.role || "SUPER_ADMIN"}
        />

        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}
