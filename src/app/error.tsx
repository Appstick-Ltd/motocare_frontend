"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard Global Exception:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 text-foreground">
      <div className="max-w-md w-full text-center space-y-6 bg-card border p-8 rounded-2xl shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/15 text-destructive">
          <AlertCircle className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">An Error Occurred</h1>
          <p className="text-xs text-muted-foreground">
            A system runtime exception occurred while rendering this view.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-muted text-xs text-muted-foreground font-mono text-left overflow-x-auto border">
          {error.message || "Unknown Application Exception"}
        </div>

        <div className="pt-2 flex justify-center">
          <Button onClick={reset} variant="default" className="gap-2 text-xs">
            <RefreshCw className="h-4 w-4" /> Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
