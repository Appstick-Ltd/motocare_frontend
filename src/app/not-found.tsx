import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 text-foreground">
      <div className="max-w-md w-full text-center space-y-6 bg-card border p-8 rounded-2xl shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
          <FileQuestion className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">404 - Page Not Found</h1>
          <p className="text-xs text-muted-foreground">
            The administrative route or resource you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Link href="/dashboard">
            <Button variant="default" className="gap-2 text-xs">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
