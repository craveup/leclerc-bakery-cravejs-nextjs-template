"use client";

import Image from "next/image";
import { useState } from "react";

import { ClientIcon } from "./client-icon";
import { InputSanitizer, InputValidators } from "@/lib/input-sanitizer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface CateringPackage {
  id: string;
  name: string;
  description: string;
  items: string[];
  serves: string;
  price: string;
  image: string;
  popular?: boolean;
}

const cateringPackages: CateringPackage[] = [
  {
    id: "breakfast",
    name: "Continental Breakfast",
    description: "Perfect for morning meetings and office gatherings",
    items: [
      "Assorted croissants (plain, chocolate, almond)",
      "Fresh fruit Danish pastries",
      "Artisanal muffins",
      "Seasonal fresh fruit",
      "Premium coffee service",
    ],
    serves: "8-10 people",
    price: "$89",
    image: "/images/leclerc-bakery/catering/breakfast.webp",
    popular: true,
  },
  {
    id: "afternoon",
    name: "Afternoon Tea",
    description: "Elegant selection for corporate events and celebrations",
    items: [
      "Mini quiches and savory tarts",
      "Assorted French macarons",
      "Petit fours and éclairs",
      "Artisanal tea selection",
      "Fresh finger sandwiches",
    ],
    serves: "10-12 people",
    price: "$125",
    image: "/images/leclerc-bakery/catering/afternoon.webp",
  },
  {
    id: "celebration",
    name: "Celebration Package",
    description:
      "Make your special occasion memorable with our premium selection",
    items: [
      "Custom celebration cake",
      "Gourmet cookie platter",
      "Chocolate-dipped strawberries",
      "Assorted French pastries",
      "Champagne service (optional)",
    ],
    serves: "15-20 people",
    price: "$189",
    image: "/images/leclerc-bakery/catering/celebration.webp",
  },
];

export function LeclercCatering() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    guests: "",
    package: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    let sanitizedValue = value;

    // Sanitize based on input type
    switch (name) {
      case "name":
        sanitizedValue = InputSanitizer.sanitizeName(value);
        break;
      case "email":
        sanitizedValue = InputSanitizer.sanitizeEmail(value);
        break;
      case "phone":
        sanitizedValue = InputSanitizer.sanitizePhoneNumber(value);
        break;
      case "message":
        sanitizedValue = InputSanitizer.sanitizeComments(value);
        break;
      case "guests":
        // For numeric inputs, ensure it's a valid number
        sanitizedValue = value.replace(/[^\d]/g, "");
        break;
      default:
        sanitizedValue = InputSanitizer.sanitizeText(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push("Name is required");
    }

    if (!InputValidators.isValidEmail(formData.email)) {
      errors.push("Valid email is required");
    }

    if (formData.phone && !InputValidators.isValidPhoneNumber(formData.phone)) {
      errors.push("Valid phone number is required");
    }

    const guestCount = parseInt(formData.guests);
    if (!guestCount || guestCount < 8) {
      errors.push("Minimum 8 guests required for catering");
    }

    if (!formData.eventDate) {
      errors.push("Event date is required");
    }

    if (errors.length > 0) {
      alert("Please fix the following errors:\n" + errors.join("\n"));
      return;
    }

    // Sanitize all data one final time before submission
    const sanitizedData = {
      name: InputSanitizer.sanitizeName(formData.name),
      email: InputSanitizer.sanitizeEmail(formData.email),
      phone: InputSanitizer.sanitizePhoneNumber(formData.phone),
      eventDate: formData.eventDate,
      guests: formData.guests,
      package: formData.package,
      message: InputSanitizer.sanitizeComments(formData.message),
    };

    console.log("Sanitized catering inquiry:", sanitizedData);
    // In a real app, this would send the sanitized inquiry to the server
    alert("Thank you for your inquiry! We'll contact you within 24 hours.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      eventDate: "",
      guests: "",
      package: "",
      message: "",
    });
  };

  return (
    <section id="catering" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="font-leclerc-accent text-3xl md:text-4xl font-normal mb-4 tracking-tight"
            style={{ color: "hsl(var(--brand-accent))" }}
          >
            Catering Services
          </h2>
          <p className="font-leclerc-primary text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Elevate your next event with our artisanal French pastries and baked
            goods. From intimate gatherings to corporate meetings, we&apos;ll
            make it deliciously memorable.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <ClientIcon
              name="Clock"
              className="h-12 w-12 mx-auto mb-4 text-primary"
            />
            <h3 className="font-leclerc-primary font-medium mb-2 tracking-tight">
              24h Notice
            </h3>
            <p className="font-leclerc-support text-sm text-muted-foreground">
              Minimum 24 hours advance booking
            </p>
          </div>
          <div className="text-center">
            <ClientIcon
              name="Truck"
              className="h-12 w-12 mx-auto mb-4 text-primary"
            />
            <h3 className="font-semibold mb-2">Free Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Complimentary delivery within 5 miles
            </p>
          </div>
          <div className="text-center">
            <ClientIcon
              name="Users"
              className="h-12 w-12 mx-auto mb-4 text-primary"
            />
            <h3 className="font-semibold mb-2">Any Size Event</h3>
            <p className="text-sm text-muted-foreground">
              From 8 to 200+ guests
            </p>
          </div>
          <div className="text-center">
            <ClientIcon
              name="Utensils"
              className="h-12 w-12 mx-auto mb-4 text-primary"
            />
            <h3 className="font-semibold mb-2">Full Service</h3>
            <p className="text-sm text-muted-foreground">
              Setup, serving, and cleanup included
            </p>
          </div>
        </div>

        {/* Packages */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-8">
            Catering Packages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cateringPackages.map((pkg) => (
              <Card
                key={pkg.id}
                className="relative overflow-hidden hover:shadow-lg transition-shadow"
              >
                {pkg.popular && (
                  <Badge className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}

                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                    priority={pkg.id === "breakfast"}
                  />
                </div>

                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{pkg.name}</span>
                    <span
                      className="text-xl font-bold"
                      style={{ color: "hsl(var(--brand-accent))" }}
                    >
                      {pkg.price}
                    </span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {pkg.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Includes:</h4>
                    <ul className="space-y-1">
                      {pkg.items.map((item, index) => (
                        <li
                          key={`${pkg.id}-item-${index}`}
                          className="flex items-start gap-2 text-sm"
                        >
                          <ClientIcon
                            name="Check"
                            className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Serves:</span>
                      <span className="font-medium">{pkg.serves}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full text-white dark:text-white"
                    disabled
                    style={{
                      backgroundColor: "hsl(var(--brand-accent))",
                    }}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, package: pkg.name }))
                    }
                  >
                    Select Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Request a Custom Quote
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Tell us about your event and we&apos;ll create a perfect
                catering solution for you.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="eventDate"
                      className="block text-sm font-medium mb-2"
                    >
                      Event Date *
                    </label>
                    <Input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-sm font-medium mb-2"
                    >
                      Number of Guests *
                    </label>
                    <Input
                      id="guests"
                      name="guests"
                      type="number"
                      value={formData.guests}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. 25"
                      min="8"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="package"
                      className="block text-sm font-medium mb-2"
                    >
                      Preferred Package
                    </label>
                    <Select
                      value={formData.package}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, package: value }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a package" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Continental Breakfast">
                          Continental Breakfast
                        </SelectItem>
                        <SelectItem value="Afternoon Tea">
                          Afternoon Tea
                        </SelectItem>
                        <SelectItem value="Celebration Package">
                          Celebration Package
                        </SelectItem>
                        <SelectItem value="Custom">Custom Package</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Special Requests or Questions
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your event, dietary restrictions, or any special requests..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full text-white dark:text-white"
                  style={{
                    backgroundColor: "hsl(var(--brand-accent))",
                  }}
                >
                  Send Catering Inquiry
                  <ClientIcon name="Send" className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
