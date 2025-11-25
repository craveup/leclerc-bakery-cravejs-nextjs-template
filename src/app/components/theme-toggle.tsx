"use client";

import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRestaurantTheme } from "../hooks/use-restaurant-theme";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { isDarkMode, setDarkMode } = useRestaurantTheme();
  const label = `Switch to ${isDarkMode ? "light" : "dark"} theme`;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        className
      )}
      onClick={() => setDarkMode(!isDarkMode)}
      aria-label={label}
      title={label}
    >
      <Sun
        className={cn(
          "h-5 w-5 transition-all duration-200",
          isDarkMode ? "scale-0 -rotate-90" : "scale-100 rotate-0"
        )}
        aria-hidden="true"
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-all duration-200",
          isDarkMode ? "scale-100 rotate-0" : "scale-0 rotate-90"
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </Button>
  );
}
