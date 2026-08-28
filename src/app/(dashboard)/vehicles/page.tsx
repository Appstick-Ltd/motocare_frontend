import React from "react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminSession } from "@/lib/auth/session";
import { Vehicle, Profile } from "@/types/database.types";
import { VehicleTableClient } from "@/components/vehicles/VehicleTableClient";

export const metadata = {
  title: "Vehicle Management | MotoCare Admin",
};

export default async function VehiclesPage() {
  await requireAdminSession();
  const supabase = await createClient();
  const adminSupabase = createAdminClient();

  let vehicles: Vehicle[] = [];

  try {
    // 1. Fetch vehicles and profiles safely in parallel using adminSupabase (prevents PostgREST schema cache join errors & RLS blocks)
    const [vehiclesRes, profilesRes] = await Promise.all([
      adminSupabase.from("vehicles").select("*").order("created_at", { ascending: false }),
      adminSupabase.from("profiles").select("*"),
    ]);

    let vehiclesData = vehiclesRes.data || [];

    // Fallback: If adminSupabase returned empty, try standard client
    if (vehiclesData.length === 0) {
      const { data } = await supabase.from("vehicles").select("*").order("created_at", { ascending: false });
      if (data && data.length > 0) {
        vehiclesData = data;
      }
    }

    const profiles = (profilesRes.data || []) as Profile[];

    // Map each vehicle with its owner profile
    vehicles = vehiclesData.map((v: any) => {
      const owner = profiles.find((p: any) => p.id === v.user_id);
      return {
        ...v,
        brand: v.brand || v.vehicle_model || v.vehicle_type,
        model: v.model || v.vehicle_model || "",
        license_plate: v.vehicle_number || v.license_plate || null,
        owner: owner ? { full_name: owner.full_name, email: owner.email, phone: owner.phone } : undefined,
      } as Vehicle;
    });
  } catch (err) {
    console.error("Error fetching vehicles in VehiclesPage:", err);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Vehicle Inventory &amp; Registry
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time telemetry, model specifications, odometer readings, and owner profiles from <span className="font-mono text-orange-400">public.vehicles</span>.
          </p>
        </div>
      </div>

      <VehicleTableClient initialVehicles={vehicles} />
    </div>
  );
}
