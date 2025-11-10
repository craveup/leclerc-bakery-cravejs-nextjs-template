import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./styles/leclerc-fonts.css";

// Providers
import { CartProvider } from "./providers/cart-provider";
import { AddressProvider } from "./providers/address-provider";
import { RestaurantThemeProvider } from "./hooks/use-restaurant-theme";
import { ErrorBoundary } from "./components/error-boundary";
import { Toaster } from "@/components/ui/sonner";

// Load Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// App Metadata
export const metadata: Metadata = {
  title: "Leclerc Bakery - Fresh Artisanal Pastries & Baked Goods",
  description:
    "Artisanal French bakery specializing in fresh pastries, signature cookies, and traditional baked goods. Order online for pickup and delivery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          <RestaurantThemeProvider defaultThemePath="/themes/leclerc-theme.json">
            <AddressProvider>
              <CartProvider>
                {children}
                <Toaster />
              </CartProvider>
            </AddressProvider>
          </RestaurantThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
