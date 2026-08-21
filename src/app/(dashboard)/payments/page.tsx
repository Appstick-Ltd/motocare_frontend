import React from "react";
import { createClient } from "@/lib/supabase/server";
import { requireAdminSession } from "@/lib/auth/session";
import { Transaction } from "@/types/database.types";
import { PaymentsTableClient } from "@/components/payments/PaymentsTableClient";

export const metadata = {
  title: "Payment Transactions | MotoCare Admin",
};

export default async function PaymentsPage() {
  await requireAdminSession();
  const supabase = await createClient();

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*, user:profiles(full_name, email)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Financial Transactions & Payment Audit</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Review processed customer payments, gateway reference IDs, and revenue logs.
        </p>
      </div>

      <PaymentsTableClient initialTransactions={(transactions as Transaction[]) || []} />
    </div>
  );
}
