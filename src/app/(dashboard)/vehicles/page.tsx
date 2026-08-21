import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { Vehicle } from "@/types/database.types";
import { VehicleTableClient } from "@/components/vehicles/VehicleTableClient";

export const metadata = {
  title: "Vehicle Management | MotoCare Admin",
};

export default async function VehiclesPage() {
  await requireAdminSession();
  const supabase = await createClient();

  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("*, owner:profiles(full_name, email)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vehicle Inventory & Registry</h1>
          <p className="text-xs text-muted-foreground mt-1">
            Monitor registered fleet vehicles, owners, specifications, and telemetry records.
          </p>
        </div>
      </div>

      <VehicleTableClient initialVehicles={(vehicles as Vehicle[]) || []} />
    </div>
  );
}
