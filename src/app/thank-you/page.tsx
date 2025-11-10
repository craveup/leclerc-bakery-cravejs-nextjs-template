"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LeclercHeader } from "../components/leclerc-header";
import { LeclercFooter } from "../components/leclerc-footer";
import { CheckCircle, Star } from "lucide-react";
import { clearCartIdsForLocation } from "@/lib/local-storage";
import { location_Id as DEFAULT_LOCATION_ID } from "@/constants";

const ThankYouContent = () => {
  const searchParams = useSearchParams();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const displayName = searchParams.get("displayName") || "Restaurant";
  const locationId = searchParams.get("locationId") ?? DEFAULT_LOCATION_ID;
  const cartId = searchParams.get("cartId");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("crave_cart_data"); // Also clear the API cart data
    }
    clearCartIdsForLocation(locationId);
  }, [locationId]);

  const handleRatingClick = (value: number) => {
    setRating(value);
    // Here you would send the rating to your API
    // Rating submitted: ${value} stars
  };

  return (
    <div className="min-h-screen bg-background">
      <LeclercHeader />

      <main className="pt-20 pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-8">
            {/* Success Icon */}
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            {/* Thank You Message */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Thank you for your order!
              </h1>

              <p className="text-lg text-muted-foreground mb-2">
                Your order from {displayName} has been confirmed.
              </p>

              <p className="text-muted-foreground">
                We&apos;ll send you updates about your order via email and SMS.
              </p>
            </div>

            {/* Order Details */}
            <div className="bg-muted/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-mono">
                    {cartId?.slice(-8).toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Restaurant:</span>
                  <span>{displayName}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Time:</span>
                  <span>15-20 minutes</span>
                </div>

                <div className="flex justify-between">
                  <span>Order Type:</span>
                  <span>Pickup</span>
                </div>
              </div>
            </div>

            {/* Rating Section */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Rate Your Experience
              </h2>

              <p className="text-muted-foreground mb-4">
                How was your ordering experience?
              </p>

              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 transition-colors"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {rating > 0 && (
                <p className="text-sm text-green-600">
                  Thank you for your {rating}-star rating!
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <Link href="/examples/leclerc-bakery" className="w-full">
                <Button
                  size="lg"
                  className="w-full bg-[hsl(var(--brand-accent))] hover:bg-[hsl(var(--brand-accent))]/90 text-white"
                >
                  Place Another Order
                </Button>
              </Link>

              <Link href="/examples/leclerc-bakery/menu" className="w-full">
                <Button variant="outline" size="lg" className="w-full">
                  Browse Menu
                </Button>
              </Link>
            </div>

            {/* Footer Message */}
            <div className="text-center pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                Questions about your order? Contact us at{" "}
                <a
                  href="mailto:support@leclercbakery.com"
                  className="text-[hsl(var(--brand-accent))] hover:underline"
                >
                  support@leclercbakery.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <LeclercFooter />
    </div>
  );
};

const ThankYouPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
};

export default ThankYouPage;
