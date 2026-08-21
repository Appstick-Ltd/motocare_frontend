"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description: string;
  confirmText?: string;
  requireTypingConfirmation?: boolean;
  expectedText?: string;
  isDestructive?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm Action",
  requireTypingConfirmation = false,
  expectedText = "CONFIRM",
  isDestructive = true,
}: ConfirmDialogProps) {
  const [typedInput, setTypedInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (requireTypingConfirmation && typedInput.trim() !== expectedText) {
      return;
    }
    setIsLoading(true);
    try {
      await onConfirm();
    } finally {
      setIsLoading(false);
      setTypedInput("");
      onClose();
    }
  };

  const isButtonDisabled =
    isLoading || (requireTypingConfirmation && typedInput.trim() !== expectedText);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-full ${
              isDestructive ? "bg-destructive/15 text-destructive" : "bg-primary/15 text-primary"
            }`}
          >
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
          </div>
        </div>

        {requireTypingConfirmation && (
          <div className="space-y-2 pt-2">
            <p className="text-xs text-muted-foreground">
              To proceed, please type <strong className="text-foreground">{expectedText}</strong> below:
            </p>
            <input
              type="text"
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              placeholder={`Type "${expectedText}"`}
              className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button variant="outline" size="sm" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant={isDestructive ? "destructive" : "default"}
            size="sm"
            onClick={handleConfirm}
            disabled={isButtonDisabled}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
