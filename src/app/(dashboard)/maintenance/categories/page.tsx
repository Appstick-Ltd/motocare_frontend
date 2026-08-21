import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Service Categories | MotoCare Admin",
};

export default async function ServiceCategoriesPage() {
  await requireAdminSession();
  const supabase = await createClient();

  const { data: categories } = await supabase.from("service_categories").select("*").order("name");

  const defaultCategories = [
    { name: "Engine Oil & Filter Change", desc: "Routine synthetic oil & oil filter replacement service", status: "Active" },
    { name: "Brake System Inspection", desc: "Brake pad replacement, fluid check, and rotor resurfacing", status: "Active" },
    { name: "Tire Rotation & Balancing", desc: "Wheel alignment, pressure check, and tire rotation", status: "Active" },
    { name: "Transmission Service", desc: "Transmission fluid flush & gear shift diagnostics", status: "Active" },
    { name: "Battery & Electrical Diagnostic", desc: "Alternator test, battery terminal cleaning, voltage check", status: "Active" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Service Categories</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Catalog of standardized maintenance tasks and service items available in MotoCare.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {defaultCategories.map((c) => (
          <Card key={c.name}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{c.name}</CardTitle>
                <Badge variant="success">{c.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{c.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
