import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { ServiceRecord } from "@/types/database.types";
import { MaintenanceTableClient } from "@/components/maintenance/MaintenanceTableClient";

export const metadata = {
  title: "Maintenance Records | MotoCare Admin",
};

export default async function MaintenancePage() {
  await requireAdminSession();
  const supabase = await createClient();

  let records: ServiceRecord[] = [];
  try {
    const { data, error } = await supabase
      .from("service_records")
      .select("*, vehicle:vehicles(vehicle_type, odometer), user:profiles(full_name, email)")
      .order("service_date", { ascending: false });
    if (!error && data) {
      records = data as ServiceRecord[];
    }
  } catch (err) {
    console.error("Error fetching service records:", err);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Maintenance Records & Service History</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Track service jobs, repair invoices, odometer readings, and execution statuses.
        </p>
      </div>

      <MaintenanceTableClient initialRecords={(records as ServiceRecord[]) || []} />
    </div>
  );
}
