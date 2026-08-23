import React from "react";
import { requireAdminSession } from "@/lib/auth/session";
import { fetchContactMessages } from "./actions";
import { SupportMessagesClient } from "@/components/support/SupportMessagesClient";
import { Headphones, LifeBuoy } from "lucide-react";

export const metadata = {
  title: "Help & Support Inquiries | MotoCare Admin",
  description: "Manage user support messages, contact us inquiries, and send email replies.",
};

export default async function SupportPage() {
  await requireAdminSession();
  const initialMessages = await fetchContactMessages();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2.5">
            <Headphones className="h-6 w-6 text-orange-500" /> Help & Support Management
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Review mobile app contact inquiries and send email responses directly to users.
          </p>
        </div>
      </div>

      <SupportMessagesClient initialMessages={initialMessages} />
    </div>
  );
}
