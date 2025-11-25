"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "../providers/cart-provider";
import { useAddress } from "../providers/address-provider";
import { useThemeClasses } from "../hooks/use-restaurant-theme";
import { AddressFlow, DeliveryOption } from "./address-flow";
import { ClientIcon } from "./client-icon";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

interface LeclercHeaderProps {
  onCartClick?: () => void;
}

export function LeclercHeader({ onCartClick }: LeclercHeaderProps) {
  const { itemCount, openCart } = useCart();
  const { getDisplayAddress, setDeliveryData, getEstimatedTime } = useAddress();
  const { getThemeClass } = useThemeClasses();
  const [isAddressFlowOpen, setIsAddressFlowOpen] = useState(false);

  const handleAddressFlowComplete = (data: {
    deliveryOption: DeliveryOption;
    address?: { street: string; apartment?: string };
  }) => {
    setDeliveryData(data);
    setIsAddressFlowOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
            aria-label="Go to Leclerc Bakery home page"
          >
            <h1
              className={`font-leclerc-display text-2xl font-semibold tracking-tight ${getThemeClass(
                "header-logo"
              )} text-[hsl(var(--brand-accent))]`}
            >
              LECLERC
            </h1>
            <span
              className={`font-leclerc-support ml-2 text-sm tracking-wider ${getThemeClass(
                "header-tagline"
              )} text-muted-foreground`}
            >
              BAKERY
            </span>
          </Link>

          {/* Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8"
            role="navigation"
            aria-label="Main navigation"
          >
            <Link
              href="/menu"
              className={`font-leclerc-support text-sm font-medium tracking-wide ${getThemeClass(
                "header-nav-link"
              )} text-foreground hover:text-primary transition-colors`}
              aria-label="View menu"
            >
              Menu
            </Link>
            <Link
              href="/locations"
              className={`font-leclerc-support text-sm font-medium tracking-wide ${getThemeClass(
                "header-nav-link"
              )} text-foreground hover:text-primary transition-colors`}
              aria-label="View store locations"
            >
              Locations
            </Link>
            <Link
              href="/#catering"
              className={`font-leclerc-support text-sm font-medium tracking-wide ${getThemeClass(
                "header-nav-link"
              )} text-foreground hover:text-primary transition-colors`}
              aria-label="View catering options"
            >
              Catering
            </Link>
            <Link
              href="/#about"
              className={`font-leclerc-support text-sm font-medium tracking-wide ${getThemeClass(
                "header-nav-link"
              )} text-foreground hover:text-primary transition-colors`}
              aria-label="Learn about our story"
            >
              Our Story
            </Link>
          </nav>

          {/* Actions */}
          <div
            className="flex items-center space-x-4"
            role="toolbar"
            aria-label="User actions"
          >
            {/* <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              aria-label="Find nearby locations"
            >
              <ClientIcon
                name="MapPin"
                className="h-5 w-5"
                aria-hidden="true"
              />
            </Button> */}
            <ThemeToggle />

            <Button variant="ghost" size="icon" aria-label="User account menu">
              <ClientIcon name="User" className="h-5 w-5" aria-hidden="true" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => {
                if (onCartClick) {
                  onCartClick();
                } else {
                  openCart();
                }
              }}
              aria-label="Shopping cart"
            >
              <ClientIcon
                name="ShoppingBag"
                className="h-5 w-5"
                aria-hidden="true"
              />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                  aria-label="Items in cart"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Location Bar */}
      <div
        className="bg-muted/50 dark:bg-muted/20 py-2"
        role="banner"
        aria-label="Delivery information"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <ClientIcon
                name="MapPin"
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="text-foreground">
                <strong>{getDisplayAddress()}</strong> • {getEstimatedTime()}
              </span>
              <button
                onClick={() => setIsAddressFlowOpen(true)}
                className="text-primary hover:text-primary/80 hover:underline transition-colors"
                aria-label="Change delivery address and method"
              >
                Change
              </button>
            </div>
            <div className="hidden md:block">
              <span
                className="text-muted-foreground"
                aria-label="Available ordering options"
              >
                Order for pickup or delivery
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Address Flow Modal */}
      <AddressFlow
        isOpen={isAddressFlowOpen}
        onClose={() => setIsAddressFlowOpen(false)}
        onComplete={handleAddressFlowComplete}
      />
    </header>
  );
}
