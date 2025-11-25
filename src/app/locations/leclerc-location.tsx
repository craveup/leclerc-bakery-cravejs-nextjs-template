"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LeclercHeader } from "../components/leclerc-header";
import { LeclercCart } from "../components/leclerc-cart";
import { useCart } from "../providers/cart-provider";
import { ClientIcon } from "../components/client-icon";

interface Location {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  phone: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  rating: number;
  reviewCount: number;
  features: string[];
  image: string;
  isMainLocation?: boolean;
  orderingAvailable: boolean;
  deliveryRadius: string;
  pickupAvailable: boolean;
}

const locations: Location[] = [
  {
    id: "soho",
    name: "Leclerc Bakery SoHo",
    address: "123 Spring Street, New York, NY 10012",
    neighborhood: "SoHo",
    phone: "(212) 555-0123",
    hours: {
      weekdays: "7:00 AM - 9:00 PM",
      saturday: "8:00 AM - 10:00 PM",
      sunday: "8:00 AM - 8:00 PM",
    },
    rating: 4.8,
    reviewCount: 342,
    features: [
      "Dine In",
      "Takeout",
      "Delivery",
      "Catering",
      "WiFi",
      "Outdoor Seating",
    ],
    image: "/images/leclerc-bakery/locations/soho-storefront.webp",
    isMainLocation: true,
    orderingAvailable: true,
    deliveryRadius: "3 miles",
    pickupAvailable: true,
  },
  {
    id: "uws",
    name: "Leclerc Bakery Upper West Side",
    address: "167 W 74th St, New York, NY 10023",
    neighborhood: "Upper West Side",
    phone: "(212) 555-0167",
    hours: {
      weekdays: "7:00 AM - 8:00 PM",
      saturday: "8:00 AM - 9:00 PM",
      sunday: "8:00 AM - 7:00 PM",
    },
    rating: 4.7,
    reviewCount: 189,
    features: ["Dine In", "Takeout", "Delivery", "WiFi", "Kid Friendly"],
    image: "/images/leclerc-bakery/locations/uws-storefront.webp",
    orderingAvailable: true,
    deliveryRadius: "2.5 miles",
    pickupAvailable: true,
  },
  {
    id: "brooklyn",
    name: "Leclerc Bakery Williamsburg",
    address: "45 Berry St, Brooklyn, NY 11249",
    neighborhood: "Williamsburg",
    phone: "(718) 555-0045",
    hours: {
      weekdays: "8:00 AM - 7:00 PM",
      saturday: "9:00 AM - 8:00 PM",
      sunday: "9:00 AM - 6:00 PM",
    },
    rating: 4.6,
    reviewCount: 127,
    features: ["Takeout", "Delivery", "WiFi", "Bike Parking"],
    image: "/images/leclerc-bakery/locations/williamsburg-storefront.webp",
    orderingAvailable: true,
    deliveryRadius: "2 miles",
    pickupAvailable: true,
  },
];

export default function LeclercLocationsPage() {
  const { isCartOpen, closeCart } = useCart();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleOrderFromLocation = (locationId: string) => {
    // In a real app, this would set the selected location and redirect to menu
    console.log(`Starting order from location: ${locationId}`);
    window.location.href = "/";
  };

  const handleGetDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://maps.google.com/maps?q=${encodedAddress}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <LeclercHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: "hsl(var(--brand-accent))" }}
          >
            Our Locations
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visit us at any of our bakery locations for fresh cookies, pastries,
            and coffee. Each location offers online ordering for pickup and
            delivery.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <div className="text-sm text-muted-foreground">Locations</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">12+</div>
              <div className="text-sm text-muted-foreground">
                Years Serving NYC
              </div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">1M+</div>
              <div className="text-sm text-muted-foreground">Cookies Baked</div>
            </CardContent>
          </Card>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {locations.map((location) => (
            <Card
              key={location.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Location Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={location.image}
                  alt={location.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 50vw, 100vw"
                  unoptimized
                />
                {location.isMainLocation && (
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    Flagship Store
                  </Badge>
                )}
                <div className="absolute top-3 right-3 bg-black/70 dark:bg-white/20 text-white dark:text-foreground px-2 py-1 rounded text-sm flex items-center gap-1 backdrop-blur-sm">
                  <ClientIcon
                    name="Star"
                    className="h-3 w-3 fill-yellow-400 text-yellow-400"
                  />
                  {location.rating} ({location.reviewCount})
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{location.name}</h3>
                    <p className="text-sm text-muted-foreground font-normal">
                      {location.neighborhood}
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <ClientIcon
                    name="MapPin"
                    className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      {location.address}
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-xs text-primary"
                      onClick={() => handleGetDirections(location.address)}
                    >
                      Get Directions{" "}
                      <ClientIcon name="Navigation" className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <ClientIcon
                    name="Phone"
                    className="h-4 w-4 text-muted-foreground flex-shrink-0"
                  />
                  <a
                    href={`tel:${location.phone}`}
                    className="text-sm hover:underline text-foreground hover:text-primary transition-colors"
                  >
                    {location.phone}
                  </a>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <ClientIcon
                    name="Clock"
                    className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0"
                  />
                  <div className="text-sm space-y-1 text-foreground">
                    <div>Mon-Fri: {location.hours.weekdays}</div>
                    <div>Saturday: {location.hours.saturday}</div>
                    <div>Sunday: {location.hours.sunday}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                  {location.features.map((feature) => (
                    <Badge
                      key={feature}
                      variant="secondary"
                      className="text-xs whitespace-nowrap flex-shrink-0"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                <Separator />

                {/* Ordering Info */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Delivery Radius:
                    </span>
                    <span className="font-medium text-foreground">
                      {location.deliveryRadius}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Pickup Available:
                    </span>
                    <span className="font-medium text-foreground">
                      {location.pickupAvailable ? "Yes" : "No"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                {/* <div className="flex gap-2 pt-2">
                  <Button
                    className="flex-1 text-white dark:text-white"
                    onClick={() => handleOrderFromLocation(location.id)}
                    disabled={!location.orderingAvailable}
                    style={{
                      backgroundColor: "hsl(var(--brand-accent))",
                    }}
                  >
                    Order Now
                    <ClientIcon name="ChevronRight" className="h-4 w-4 ml-1" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleGetDirections(location.address)}
                  >
                    <ClientIcon name="Navigation" className="h-4 w-4" />
                  </Button>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">
                Can&apos;t Find What You&apos;re Looking For?
              </h3>
              <p className="text-muted-foreground mb-6">
                We&apos;re always looking to expand! Contact us if you&apos;d
                like to suggest a new location or inquire about catering
                services in your area.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline">Contact Us</Button>
                <Button
                  className="text-white dark:text-white"
                  style={{
                    backgroundColor: "hsl(var(--brand-accent))",
                  }}
                >
                  Catering Inquiry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <LeclercCart isOpen={isCartOpen} onClose={closeCart} />
    </div>
  );
}
