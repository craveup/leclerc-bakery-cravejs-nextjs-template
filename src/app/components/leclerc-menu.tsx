"use client";

import { useEffect, useMemo, useState } from "react";
import { MenuItemCard } from "@/components/ui/menu-item-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCart } from "../providers/cart-provider";
import type { MenuItem } from "../types";
import { Button } from "@/components/ui/button";
import useMenus from "@/hooks/useMenus";
import type { BundleCategory } from "@/types/menus";
import type { Product } from "@/types/menu-types";
import {
  deriveCalories,
  stripCaloriesFromDescription,
} from "@/lib/menu-normalizers";

interface LeclercMenuProps {
  isHomePage?: boolean;
}

const toMenuCategory = (categoryName: string): MenuItem["category"] => {
  const normalized = categoryName.toLowerCase();
  if (normalized.includes("pastr")) return "pastries";
  if (
    normalized.includes("bread") ||
    normalized.includes("loaf") ||
    normalized.includes("baguette")
  ) {
    return "breads";
  }
  return "cookies";
};

type ProductWithTags = Product & { tags?: string[] };

const getProductTags = (product: Product): string[] => {
  const rawTags = (product as ProductWithTags).tags;
  return Array.isArray(rawTags) ? rawTags : [];
};

const mapProduct = (product: Product, categoryName: string): MenuItem => {
  const numericPrice =
    typeof product.price === "string"
      ? parseFloat(product.price)
      : product.price ?? 0;
  const tags = getProductTags(product);
  return {
    id: product.id,
    name: product.name,
    description: stripCaloriesFromDescription(product.description),
    price: numericPrice,
    image: product.images?.[0] ?? null,
    calories: deriveCalories(product.name, product.description),
    category: toMenuCategory(categoryName),
    isPopular: tags.some((tag) => tag.toLowerCase().includes("popular")),
    isNew: tags.some((tag) => tag.toLowerCase().includes("new")),
  };
};

export function LeclercMenu({ isHomePage = false }: LeclercMenuProps) {
  const { addToCart } = useCart();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const { data, isLoading, error } = useMenus();

  const categories: BundleCategory[] = useMemo(() => {
    const menu = data?.menus?.[0];
    return (menu?.categories ?? []) as BundleCategory[];
  }, [data]);

  useEffect(() => {
    if (!categories.length) return;
    if (!selectedCategoryId || !categories.some((c) => c.id === selectedCategoryId)) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  const getProductsForCategory = (categoryId: string): MenuItem[] => {
    const category = categories.find((entry) => entry.id === categoryId);
    if (!category) return [];
    return (category.products ?? []).map((product) =>
      mapProduct(product, category.name),
    );
  };

  const hasError = Boolean(error);

  return (
    <section id="menu" className="py-16 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Our Menu</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From our signature chocolate chip walnut to seasonal favorites, each
            cookie is made with the finest ingredients and lots of love.
          </p>
          {!isLoading && !hasError && categories.length > 0 && (
            <div className="mt-4 text-sm text-green-600 dark:text-green-400">
              Connected to CraveUp API
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading menu...</p>
          </div>
        ) : hasError ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              We couldn&rsquo;t load the live menu right now. Please try again in
              a moment.
            </p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No menu items available.</p>
          </div>
        ) : (
          <>
            <Tabs
              value={selectedCategoryId}
              onValueChange={setSelectedCategoryId}
            >
              <TabsList className="flex flex-wrap items-center justify-center gap-2 mb-12">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent
                  key={category.id}
                  value={category.id}
                  className="mt-0 relative z-0"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(isHomePage
                      ? getProductsForCategory(category.id).slice(0, 6)
                      : getProductsForCategory(category.id)
                    ).map((item) => (
                      <MenuItemCard
                        key={item.id}
                        variant="detailed"
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image ?? undefined}
                        calories={item.calories}
                        isPopular={item.isPopular}
                        isNew={item.isNew}
                        isAvailable={true}
                        showNutrition={true}
                        onAddToCart={() =>
                          addToCart({
                            ...item,
                            options: {
                              warming: "room-temp" as const,
                              packaging: "standard" as const,
                              giftBox: false,
                            },
                          })
                        }
                      />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

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
