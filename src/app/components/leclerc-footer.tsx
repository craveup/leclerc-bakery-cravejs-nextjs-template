"use client";

import { Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function LeclercFooter() {
  return (
    <footer className="bg-muted text-foreground dark:bg-muted/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">LECLERC</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto md:mx-0">
              World famous 6oz cookies made fresh daily in small batches.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Instagram className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Facebook className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Twitter className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm flex flex-col items-center md:items-start">
              <li>
                <Link
                  href="/#about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Locations
                </Link>
              </li>
              <li>
                <Link
                  href="/#catering"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Catering
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4">NYC Locations</h4>
            <ul className="space-y-2 text-sm flex flex-col items-center md:items-start">
              <li>
                <Link
                  href="/locations"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Upper West Side
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  SoHo
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Williamsburg
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  View All Locations -&gt;
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm mx-auto md:mx-0">
              Get the latest news and exclusive offers.
            </p>
            <form className="space-y-2 max-w-sm mx-auto md:mx-0">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
              <Button
                className="w-full text-white dark:text-white hover:opacity-90"
                style={{ backgroundColor: "hsl(var(--brand-accent))" }}
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center md:text-left text-sm text-muted-foreground flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2024 Leclerc Bakery. All rights reserved.</p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
