import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import * as React from "react";

export const LoadingSpinner = () => {
  return <Loader2 className={cn("h-4 w-4 animate-spin")} />;
};
