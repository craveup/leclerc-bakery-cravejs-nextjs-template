"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onClick?: () => void;
}

export default function ErrorMessage({ message, onClick }: ErrorMessageProps) {
  return (
    <div className="text-center max-w-md mx-auto">
      <div className="mx-auto h-16 w-16 text-red-500 mb-4">
        <AlertCircle className="h-full w-full" />
      </div>

      <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>

      <p className="text-muted-foreground mb-6">{message}</p>

      {onClick && (
        <Button
          onClick={onClick}
          variant="outline"
          className="inline-flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}
