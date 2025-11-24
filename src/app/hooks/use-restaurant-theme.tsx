/**
 * React Hook for Restaurant Theme Management
 * Provides theme loading, switching, and customization capabilities
 */

"use client";

import {
  useState,
  useEffect,
  useCallback,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { ThemeEngine, RestaurantTheme } from "@/lib/theme-engine";

interface ThemeContextType {
  theme: RestaurantTheme | null;
  themeEngine: ThemeEngine | null;
  isLoading: boolean;
  error: string | null;
  isDarkMode: boolean;
  loadTheme: (themePath: string) => Promise<void>;
  setDarkMode: (isDark: boolean) => void;
  applySeasonalTheme: (season: "winter" | "spring" | "summer" | "fall") => void;
  exportThemeCSS: () => string | null;
  getThemeInfo: () => Partial<RestaurantTheme> | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function RestaurantThemeProvider({
  children,
  defaultThemePath,
}: {
  children: ReactNode;
  defaultThemePath?: string;
}) {
  const [theme, setTheme] = useState<RestaurantTheme | null>(null);
  const [themeEngine, setThemeEngine] = useState<ThemeEngine | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const loadTheme = useCallback(async (themePath: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const loadedTheme = await ThemeEngine.loadTheme(themePath);
      const engine = new ThemeEngine(loadedTheme);

      setTheme(loadedTheme);
      setThemeEngine(engine);

      // Apply theme to document
      engine.applyTheme();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load theme";
      setError(errorMessage);
      console.error("❌ Theme loading failed:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSetDarkMode = useCallback(
    (isDark: boolean) => {
      setIsDarkMode(isDark);
      if (themeEngine) {
        themeEngine.setDarkMode(isDark);
      } else if (typeof window !== "undefined") {
        document.documentElement.classList.toggle("dark", isDark);
      }

      // Persist preference
      if (typeof window !== "undefined") {
        localStorage.setItem("restaurant-theme-dark-mode", isDark.toString());
      }
    },
    [themeEngine]
  );

  const applySeasonalTheme = useCallback(
    (season: "winter" | "spring" | "summer" | "fall") => {
      if (themeEngine) {
        themeEngine.applySeasonalTheme(season);
      }
    },
    [themeEngine]
  );

  const exportThemeCSS = useCallback(() => {
    return themeEngine ? themeEngine.exportCSS() : null;
  }, [themeEngine]);

  const getThemeInfo = useCallback(() => {
    return themeEngine ? themeEngine.getThemeInfo() : null;
  }, [themeEngine]);

  // Auto-detect dark mode preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDarkMode = localStorage.getItem("restaurant-theme-dark-mode");
      if (savedDarkMode !== null) {
        setIsDarkMode(savedDarkMode === "true");
      } else {
        // Check system preference
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setIsDarkMode(prefersDark);
      }
    }
  }, []);

  // Load default theme on mount
  useEffect(() => {
    if (defaultThemePath) {
      loadTheme(defaultThemePath);
    }
  }, [defaultThemePath, loadTheme]);

  // Apply dark mode when it changes
  useEffect(() => {
    if (themeEngine) {
      themeEngine.setDarkMode(isDarkMode);
    }
  }, [isDarkMode, themeEngine]);

  const value: ThemeContextType = {
    theme,
    themeEngine,
    isLoading,
    error,
    isDarkMode,
    loadTheme,
    setDarkMode: handleSetDarkMode,
    applySeasonalTheme,
    exportThemeCSS,
    getThemeInfo,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useRestaurantTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useRestaurantTheme must be used within a RestaurantThemeProvider"
    );
  }
  return context;
}

/**
 * Hook for component-level theme utilities
 */
export function useThemeClasses() {
  const { theme, isDarkMode } = useRestaurantTheme();

  const getThemeClass = useCallback(
    (component: string, variant?: string) => {
      if (!theme) return "";

      const base = `theme-${theme.clientId}`;
      const dark = isDarkMode ? "dark" : "";
      const comp = component ? `${component}` : "";
      const var_ = variant ? `${component}-${variant}` : "";

      return [base, dark, comp, var_].filter(Boolean).join(" ");
    },
    [theme, isDarkMode]
  );

  const getThemeCSS = useCallback(
    (path: string) => {
      if (!theme) return undefined;

      const pathParts = path.split(".");
      let value: unknown = theme;

      for (const part of pathParts) {
        if (value && typeof value === "object" && part in value) {
          value = (value as Record<string, unknown>)[part];
        } else {
          return undefined;
        }
      }

      return value as string | undefined;
    },
    [theme]
  );

  return {
    themeClass: theme ? `theme-${theme.clientId}` : "",
    isDark: isDarkMode,
    getThemeClass,
    getThemeCSS,
    themeInfo: theme,
  };
}

/**
 * Hook for theme-aware animations
 */
export function useThemeAnimations() {
  const { theme } = useRestaurantTheme();

  const getAnimation = useCallback(
    (name: string) => {
      return theme?.animations.effects[name] || null;
    },
    [theme]
  );

  const getDuration = useCallback(
    (speed: "fast" | "normal" | "slow") => {
      return theme?.animations.duration[speed] || "200ms";
    },
    [theme]
  );

  const getEasing = useCallback(
    (type: "default" | "in" | "out") => {
      return theme?.animations.easing[type] || "ease";
    },
    [theme]
  );

  return {
    getAnimation,
    getDuration,
    getEasing,
  };
}

/**
 * Hook for seasonal theme management
 */
export function useSeasonalTheme() {
  const { applySeasonalTheme, theme } = useRestaurantTheme();
  const [currentSeason, setCurrentSeason] = useState<
    "winter" | "spring" | "summer" | "fall"
  >("spring");

  const autoDetectSeason = useCallback(() => {
    const month = new Date().getMonth();
    let season: "winter" | "spring" | "summer" | "fall";

    if (month >= 2 && month <= 4) season = "spring";
    else if (month >= 5 && month <= 7) season = "summer";
    else if (month >= 8 && month <= 10) season = "fall";
    else season = "winter";

    setCurrentSeason(season);
    applySeasonalTheme(season);

    return season;
  }, [applySeasonalTheme]);

  const changeSeason = useCallback(
    (season: "winter" | "spring" | "summer" | "fall") => {
      setCurrentSeason(season);
      applySeasonalTheme(season);
    },
    [applySeasonalTheme]
  );

  const hasSeasonalSupport = Boolean(
    theme?.clientSpecific?.seasonalAdjustments
  );

  return {
    currentSeason,
    changeSeason,
    autoDetectSeason,
    hasSeasonalSupport,
    availableSeasons: hasSeasonalSupport
      ? Object.keys(theme!.clientSpecific!.seasonalAdjustments!)
      : [],
  };
}
