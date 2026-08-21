"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const userGrowthData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 210 },
  { month: "Mar", users: 350 },
  { month: "Apr", users: 480 },
  { month: "May", users: 620 },
  { month: "Jun", users: 890 },
  { month: "Jul", users: 1150 },
];

const revenueData = [
  { month: "Jan", revenue: 1400 },
  { month: "Feb", revenue: 2300 },
  { month: "Mar", revenue: 3800 },
  { month: "Apr", revenue: 4200 },
  { month: "May", revenue: 5900 },
  { month: "Jun", revenue: 7800 },
  { month: "Jul", revenue: 9400 },
];

const vehiclePieData = [
  { name: "Sedan / Hatchback", value: 45, color: "#3b82f6" },
  { name: "Motorcycles / Scooters", value: 30, color: "#6366f1" },
  { name: "SUV / Trucks", value: 15, color: "#10b981" },
  { name: "EV Vehicles", value: 10, color: "#a855f7" },
];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* User Growth Area Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-base">User Acquisition & Ecosystem Growth</CardTitle>
          <CardDescription>Monthly new registered user trends</CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" stroke="#888888" fontSize={11} />
              <YAxis stroke="#888888" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#userGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Vehicle Category Distribution Pie */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Vehicle Fleet Composition</CardTitle>
          <CardDescription>Breakdown by vehicle category</CardDescription>
        </CardHeader>
        <CardContent className="h-72 flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height="75%">
            <PieChart>
              <Pie
                data={vehiclePieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {vehiclePieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-muted-foreground mt-2">
            {vehiclePieData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
