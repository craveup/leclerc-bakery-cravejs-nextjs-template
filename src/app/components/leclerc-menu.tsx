"use client";

import { useState, useEffect } from "react";
import { MenuItemCard } from "@/components/ui/menu-item-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCart } from "../providers/cart-provider";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/lib/api";

interface LeclercMenuProps {
  isHomePage?: boolean;
}

// Helper function to get image path based on product name and category
const getImagePath = (name: string, category: string): string => {
  // Map of product names to actual image filenames based on public/images structure
  const imageMap: Record<string, string> = {
    // Cookies (signature folder)
    "Classic Chocolate Chip":
      "/images/leclerc-bakery/signature/choc-chip-walnut.webp",
    "Double Dark Chocolate":
      "/images/leclerc-bakery/signature/dark-choc-chip.webp",
    "Oatmeal Raisin": "/images/leclerc-bakery/signature/oatmeal-raisin.webp",
    "Peanut Butter Dream": "/images/leclerc-bakery/signature/pb-choc-chip.webp",

    // Pastries (menu folder)
    "Butter Croissant": "/images/leclerc-bakery/menu/butter-croissant.webp",
    "Pain au Chocolat": "/images/leclerc-bakery/menu/pain-au-chocolat.webp",
    "Almond Croissant": "/images/leclerc-bakery/menu/almond-croissant.webp",
    "Fruit Danish": "/images/leclerc-bakery/menu/fruit-danish.webp",
    Palmier: "/images/leclerc-bakery/menu/palmier.webp",
    Éclair: "/images/leclerc-bakery/menu/eclair.webp",

    // Breads (menu folder)
    "Sourdough Loaf": "/images/leclerc-bakery/menu/sourdough-loaf.webp",
    "French Baguette": "/images/leclerc-bakery/menu/french-baguette.webp",
    "Whole Wheat Country":
      "/images/leclerc-bakery/menu/whole-wheat-country.webp",
    "Olive Rosemary": "/images/leclerc-bakery/menu/olive-rosemary.webp",
    Brioche: "/images/leclerc-bakery/menu/brioche.webp",
    Multigrain: "/images/leclerc-bakery/menu/multigrain.webp",
  };

  // Return mapped image or fallback based on category
  return (
    imageMap[name] || `/images/leclerc-bakery/signature/choc-chip-walnut.webp`
  );
};

export function LeclercMenu({ isHomePage = false }: LeclercMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { addToCart } = useCart();

  const locationId = process.env.NEXT_PUBLIC_LOCATION_ID;
  if (!locationId) {
    throw new Error("NEXT_PUBLIC_LOCATION_ID environment variable is required");
  }

  // Helper function to determine category from product name
  const getCategoryFromName = (name: string) => {
    if (
      name.toLowerCase().includes("cookie") ||
      name.toLowerCase().includes("chip") ||
      name.toLowerCase().includes("oatmeal") ||
      name.toLowerCase().includes("snickerdoodle") ||
      name.toLowerCase().includes("peanut butter") ||
      name.toLowerCase().includes("macadamia")
    ) {
      return "cookies";
    }
    if (
      name.toLowerCase().includes("croissant") ||
      name.toLowerCase().includes("pain") ||
      name.toLowerCase().includes("danish") ||
      name.toLowerCase().includes("palmier") ||
      name.toLowerCase().includes("éclair")
    ) {
      return "pastries";
    }
    if (
      name.toLowerCase().includes("loaf") ||
      name.toLowerCase().includes("baguette") ||
      name.toLowerCase().includes("wheat") ||
      name.toLowerCase().includes("olive") ||
      name.toLowerCase().includes("brioche") ||
      name.toLowerCase().includes("multigrain")
    ) {
      return "breads";
    }
    return "cookies"; // default
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts(locationId);

        // Add category to products based on name
        const productsWithCategories = products.map((product) => ({
          ...product,
          category: getCategoryFromName(product.name),
        }));

        setApiProducts(productsWithCategories);

        // Extract unique categories from categorized products
        const uniqueCategories = [
          ...new Set(productsWithCategories.map((p) => p.category)),
        ].filter(Boolean);
        setCategories(uniqueCategories);

        // Set first category as default selected
        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0]);
        }
        setErrorMessage(null);
      } catch (error) {
        console.warn("Failed to load products from API", error);
        setErrorMessage(
          "We couldn't load the live menu right now. Please try again in a moment.",
        );
        setCategories([]);
        setSelectedCategory("");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [locationId]);

  // Get products for selected category
  const getProductsForCategory = (category: string) => {
    if (!apiProducts.length) {
      return [];
    }

    return apiProducts
      .filter((product) => product.category === category)
      .map((product) => ({
        id: product._id || product.id,
        name: product.name,
        description: product.description,
        price:
          typeof product.price === "string"
            ? parseFloat(product.price)
            : product.price,
        image:
          product.images?.[0] ||
          product.images ||
          getImagePath(product.name, product.category || "cookies"),
        category: product.category,
        calories: getCaloriesFromName(product.name),
        isPopular:
          product.name.includes("Croissant") ||
          product.name.includes("Sourdough"),
        isNew: product.name.includes("Danish"),
      }));
  };

  // Helper function to get calories from product name
  const getCaloriesFromName = (name: string) => {
    const calorieMap: Record<string, number> = {
      "Classic Chocolate Chip": 320,
      "Double Dark Chocolate": 340,
      "Oatmeal Raisin": 290,
      "Peanut Butter Dream": 330,
      "White Chocolate Macadamia": 350,
      Snickerdoodle: 280,
      "Butter Croissant": 270,
      "Pain au Chocolat": 320,
      "Almond Croissant": 340,
      "Fruit Danish": 310,
      Palmier: 240,
      Éclair: 290,
      "Sourdough Loaf": 120,
      "French Baguette": 110,
      "Whole Wheat Country": 130,
      "Olive Rosemary": 140,
      Brioche: 150,
      Multigrain: 125,
    };
    return calorieMap[name] || 300;
  };

  return (
    <section id="menu" className="py-16 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Our Menu</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From our signature chocolate chip walnut to seasonal favorites, each
            cookie is made with the finest ingredients and lots of love.
          </p>
          {!loading && !errorMessage && (
            <div className="mt-4 text-sm text-green-600 dark:text-green-400">
              ✓ Connected to CraveUp API
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading menu...</p>
          </div>
        ) : errorMessage ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{errorMessage}</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No menu items available.</p>
          </div>
        ) : (
          <>
            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList
                className={`grid w-full max-w-md mx-auto grid-cols-${categories.length} mb-12 relative z-10`}
              >
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              {/* Products for selected category */}
              {categories.map((category) => (
                <TabsContent
                  key={category}
                  value={category}
                  className="mt-0 relative z-0"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(isHomePage
                      ? getProductsForCategory(category).slice(0, 6)
                      : getProductsForCategory(category)
                    ).map((item: any) => (
                      <MenuItemCard
                        key={item.id}
                        variant="detailed"
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                        calories={item.calories}
                        isPopular={item.isPopular}
                        isNew={item.isNew}
                        isAvailable={true}
                        showNutrition={true}
                        onAddToCart={() => {
                          addToCart({
                            ...item,
                            options: {
                              warming: "room-temp" as const,
                              packaging: "standard" as const,
                              giftBox: false,
                            },
                          });
                        }}
                      />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* View Full Menu Button - appears below product photos on home page */}
            {isHomePage && (
              <div className="text-center mt-12">
                <Link href="/menu">
                  <Button variant="outline" size="lg">
                    View Full Menu
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}

            {/* Additional Options */}
            {!isHomePage && (
              <div className="mt-16 bg-muted/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">
                  Bulk Orders & Catering
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-2">Cookie Boxes</h4>
                    <p className="text-muted-foreground mb-4">
                      Perfect for parties and events. Order boxes of 4, 8, or 12
                      cookies with custom selections.
                    </p>
                    <Button
                      className="text-white dark:text-white hover:opacity-90"
                      style={{ backgroundColor: "hsl(var(--brand-accent))" }}
                    >
                      Order Cookie Boxes
                    </Button>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Corporate Catering</h4>
                    <p className="text-muted-foreground mb-4">
                      Impress your team or clients with fresh-baked cookies
                      delivered to your office.
                    </p>
                    <Button variant="outline">Get Catering Quote</Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
