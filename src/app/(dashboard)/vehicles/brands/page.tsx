import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Vehicle Brands | MotoCare Admin",
};

export default async function VehicleBrandsPage() {
  await requireAdminSession();
  const supabase = await createClient();

  const { data: brands } = await supabase.from("vehicle_brands").select("*").order("name");

  const sampleBrands = [
    { name: "Toyota", models: "Corolla, Camry, RAV4, Hilux", status: "Active" },
    { name: "Honda", models: "Civic, CR-V, Accord, CBR150", status: "Active" },
    { name: "BMW", models: "3 Series, 5 Series, X5, M3", status: "Active" },
    { name: "Yamaha", models: "R15, FZ-S, MT-15, NMAX", status: "Active" },
    { name: "Ford", models: "Mustang, F-150, Ranger, Explorer", status: "Active" },
    { name: "Mercedes-Benz", models: "C-Class, E-Class, GLE, AMG GT", status: "Active" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Supported Brands & Models</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Catalog of vehicle manufacturers and registered model lines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sampleBrands.map((b) => (
          <Card key={b.name}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{b.name}</CardTitle>
                <Badge variant="success">{b.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                <strong>Popular Models:</strong> {b.models}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
