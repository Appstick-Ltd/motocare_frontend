import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Car, Bike, Truck, Sparkles } from "lucide-react";

export const metadata = {
  title: "Vehicle Types | MotoCare Admin",
};

export default async function VehicleTypesPage() {
  await requireAdminSession();
  const supabase = await createClient();

  const { data: vehicleTypes } = await supabase
    .from("vehicle_types")
    .select("*")
    .order("created_at", { ascending: false });

  const defaultTypes = [
    { name: "Sedan / Coupe", description: "Standard 4-door or 2-door passenger cars", icon: Car },
    { name: "SUV / Crossover", description: "Sport Utility Vehicles & crossover models", icon: Car },
    { name: "Motorcycle / Scooter", description: "Two-wheeler motorized motorbikes & scooters", icon: Bike },
    { name: "Heavy Duty / Pickup Truck", description: "Commercial trucks & heavy payload transports", icon: Truck },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Vehicle Types & Classifications</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Supported vehicle categories within MotoCare platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {defaultTypes.map((t) => {
          const Icon = t.icon;
          return (
            <Card key={t.name}>
              <CardContent className="p-5 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{t.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
