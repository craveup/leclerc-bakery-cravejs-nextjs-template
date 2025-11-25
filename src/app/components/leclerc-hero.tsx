"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useAddress } from "../providers/address-provider";
import { useThemeClasses } from "../hooks/use-restaurant-theme";
import { AddressFlow, DeliveryOption } from "./address-flow";

export function LeclercHero() {
  const [isAddressFlowOpen, setIsAddressFlowOpen] = useState(false);
  const { setDeliveryData } = useAddress();
  const { getThemeClass } = useThemeClasses();

  const handleAddressFlowComplete = (data: {
    deliveryOption: DeliveryOption;
    address?: { street: string; apartment?: string };
  }) => {
    setDeliveryData(data);
    setIsAddressFlowOpen(false);
  };

  return (
    <section className="relative h-[680px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('/images/home-page-bg.jpeg')",
        }}
      />
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center justify-center sm:justify-start">
        <div className="max-w-xl text-white text-center sm:text-left">
          <h2 className="font-leclerc-display text-4xl sm:text-5xl font-semibold mb-4 tracking-tight leading-tight">
            World Famous
            <br />
            6oz Cookies
          </h2>
          <p className="font-leclerc-support text-base sm:text-xl mb-6 sm:mb-8 text-white/80 leading-relaxed tracking-wide">
            Crispy on the outside, gooey on the inside. Made fresh daily in
            small batches.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              onClick={() => setIsAddressFlowOpen(true)}
              className={`${getThemeClass(
                "hero-cta"
              )} bg-[hsl(var(--brand-accent))] text-white hover:bg-[hsl(var(--brand-accent))]/90 transition-all duration-200 w-full sm:w-auto`}
            >
              <MapPin className="h-4 w-4" />
              Start Order
            </Button>
            <Link href="/menu">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-black w-full sm:w-auto"
              >
                View Menu
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute bottom-4 right-4 sm:right-8 sm:bottom-8 flex flex-wrap items-center justify-end gap-2">
        <div className="bg-background/90 border rounded-full px-3 py-1.5 shadow-lg text-xs font-semibold text-foreground flex items-center gap-1">
          <span role="img" aria-label="fresh">
            🔥
          </span>
          Fresh Daily
        </div>
        <div className="bg-background/90 border rounded-full px-3 py-1.5 shadow-lg text-xs font-semibold text-foreground flex items-center gap-1">
          <span role="img" aria-label="shipping">
            🚚
          </span>
          Nationwide Shipping
        </div>
      </div>

      {/* Address Flow Modal */}
      <AddressFlow
        isOpen={isAddressFlowOpen}
        onClose={() => setIsAddressFlowOpen(false)}
        onComplete={handleAddressFlowComplete}
      />
    </section>
  );
}
