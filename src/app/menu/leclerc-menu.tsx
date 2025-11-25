"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { LeclercHeader } from "../components/leclerc-header";
import { LeclercCart } from "../components/leclerc-cart";
import { LeclercFooter } from "../components/leclerc-footer";
import { useCart } from "../providers/cart-provider";
import type { MenuItem } from "../types";
import type { MenuCategory } from "@/components/ui/category-navigation";
import { MenuItemCard } from "@/components/ui/menu-item-card";
import { CategoryNavigation } from "@/components/ui/category-navigation";
import FeaturedItemsCarousel from "@/components/crave-ui/menu-components/featured-items-carousel";
import useMenus from "@/hooks/useMenus";
import type { BundleMenu, BundleCategory } from "@/types/menus";
import type { Product } from "@/types/menu-types";
import {
  deriveCalories,
  stripCaloriesFromDescription,
} from "@/lib/menu-normalizers";

const getImagePath = (name: string, category?: string) => {
  const imageMap: Record<string, string> = {
    "Classic Chocolate Chip":
      "/images/leclerc-bakery/signature/choc-chip-walnut.webp",
    "Double Dark Chocolate":
      "/images/leclerc-bakery/signature/dark-choc-chip.webp",
    "Oatmeal Raisin": "/images/leclerc-bakery/signature/oatmeal-raisin.webp",
    "Peanut Butter Dream": "/images/leclerc-bakery/signature/pb-choc-chip.webp",
    "Butter Croissant": "/images/leclerc-bakery/menu/butter-croissant.webp",
    "Pain au Chocolat": "/images/leclerc-bakery/menu/pain-au-chocolat.webp",
    "Almond Croissant": "/images/leclerc-bakery/menu/almond-croissant.webp",
    "Fruit Danish": "/images/leclerc-bakery/menu/fruit-danish.webp",
    Palmier: "/images/leclerc-bakery/menu/palmier.webp",
    Eclair: "/images/leclerc-bakery/menu/eclair.webp",
    "Sourdough Loaf": "/images/leclerc-bakery/menu/sourdough-loaf.webp",
    "French Baguette": "/images/leclerc-bakery/menu/french-baguette.webp",
    "Whole Wheat Country":
      "/images/leclerc-bakery/menu/whole-wheat-country.webp",
    "Olive Rosemary": "/images/leclerc-bakery/menu/olive-rosemary.webp",
    Brioche: "/images/leclerc-bakery/menu/brioche.webp",
    Multigrain: "/images/leclerc-bakery/menu/multigrain.webp",
  };

  if (imageMap[name]) return imageMap[name];
  if (category && imageMap[`${category}-${name}`]) {
    return imageMap[`${category}-${name}`];
  }

  return "/images/leclerc-bakery/signature/choc-chip-walnut.webp";
};

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

const normalizeProduct = (product: Product, categoryName: string): MenuItem => {
  const numericPrice =
    typeof product.price === "string"
      ? parseFloat(product.price)
      : product.price ?? 0;

  const tags = getProductTags(product);
  const derivedPopular =
    tags.some((tag) => tag.toLowerCase().includes("popular")) ||
    product.name.toLowerCase().includes("croissant");
  const derivedNew =
    tags.some((tag) => tag.toLowerCase().includes("new")) ||
    product.name.toLowerCase().includes("seasonal");

  return {
    id: product.id,
    name: product.name,
    description: stripCaloriesFromDescription(product.description),
    price: numericPrice,
    image: product.images?.[0] || getImagePath(product.name, categoryName),
    calories: deriveCalories(product.name, product.description),
    isPopular: derivedPopular,
    isNew: derivedNew,
    category: toMenuCategory(categoryName),
  };
};

export default function LeclercMenuPage() {
  const { isCartOpen, closeCart, addToCart } = useCart();
  const { data, isLoading, error } = useMenus();

  const menus: BundleMenu[] = useMemo(
    () => (data?.menus ?? []) as BundleMenu[],
    [data]
  );
  const [selectedMenuId, setSelectedMenuId] = useState<string>(
    () => menus[0]?.id ?? ""
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  useEffect(() => {
    if (!menus.length) return;
    if (!menus.some((menu) => menu.id === selectedMenuId)) {
      setSelectedMenuId(menus[0].id);
    }
  }, [menus, selectedMenuId]);

  const activeMenu =
    menus.find((menu) => menu.id === selectedMenuId) ?? menus[0];

  const categories: BundleCategory[] = useMemo(() => {
    return (activeMenu?.categories ?? []) as BundleCategory[];
  }, [activeMenu]);

  useEffect(() => {
    if (!categories.length) return;
    if (!categories.some((category) => category.id === selectedCategoryId)) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  const menuCategories: MenuCategory[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    count: category.products?.length ?? 0,
  }));

  const productCategoryMap = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach((category) => {
      category.products?.forEach((product) => {
        map.set(product.id, category.name);
      });
    });
    return map;
  }, [categories]);

  const currentItems = useMemo<MenuItem[]>(() => {
    const category = categories.find((cat) => cat.id === selectedCategoryId);
    if (!category) return [];
    return (category.products ?? []).map((product) =>
      normalizeProduct(product, category.name)
    );
  }, [categories, selectedCategoryId]);

  const featuredData = useMemo(() => {
    const menuFeatured = (data?.popularProducts ?? []) as Product[];
    const rawSource =
      menuFeatured.length > 0
        ? menuFeatured
        : categories.flatMap((category) => category.products ?? []);

    const cards: Array<{
      id: string;
      name: string;
      price: string;
      imageUrl: string;
      badge?: string;
    }> = [];
    const lookup: Record<string, MenuItem> = {};

    rawSource.slice(0, 8).forEach((product) => {
      const priceValue =
        typeof product.price === "string"
          ? parseFloat(product.price)
          : product.price ?? 0;
      const tags = getProductTags(product);
      const categoryName =
        productCategoryMap.get(product.id) ??
        categories.find((category) =>
          category.products?.some((p) => p.id === product.id)
        )?.name ??
        "Featured";
      const normalized = normalizeProduct(product, categoryName);
      lookup[product.id] = normalized;

      cards.push({
        id: product.id,
        name: product.name,
        price: `$${priceValue.toFixed(2)}`,
        imageUrl: product.images?.[0] || getImagePath(product.name),
        badge:
          tags.find((tag) => tag.toLowerCase().includes("popular")) ||
          undefined,
      });
    });

    return { cards, lookup };
  }, [categories, data, productCategoryMap]);

  const hasError = Boolean(error);

  return (
    <div className="min-h-screen bg-background">
      <LeclercHeader />

      <main>
        <div className="relative w-full h-[300px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1453831210728-695502f9f795?w=1600&h=600&fit=crop"
            alt="Leclerc Bakery Menu"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="max-w-7xl mx-auto flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 relative rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1540914124281-342587941389?w=200&h=200&fit=crop"
                  alt="Leclerc Bakery Logo"
                  fill
                  className="object-cover"
                  sizes="80px"
                  priority
                />
              </div>
              <div className="text-white">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                  Leclerc Bakery
                </h1>
                <p className="text-sm sm:text-base opacity-90">
                  Since 1952 • French Artisan Bakery
                </p>
              </div>
            </div>
          </div>
        </div>

        {featuredData.cards.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
            <FeaturedItemsCarousel
              title="Featured Items"
              items={featuredData.cards}
              onAddToCart={(item) => {
                const menuItem = featuredData.lookup[item.id];
                if (!menuItem) return;
                return addToCart({
                  ...menuItem,
                  options: {
                    warming: "room-temp" as const,
                    packaging: "standard" as const,
                    giftBox: false,
                  },
                });
              }}
            />
          </section>
        )}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          <h2 className="text-2xl font-semibold mb-4 mt-8">Main Menu</h2>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading menu...</p>
            </div>
          ) : hasError ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                We couldn&rsquo;t load the live menu right now. Please try again
                in a moment.
              </p>
            </div>
          ) : menuCategories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No menu items available.</p>
            </div>
          ) : (
            <>
              <CategoryNavigation
                categories={menuCategories}
                selectedCategory={selectedCategoryId}
                onCategoryChange={setSelectedCategoryId}
                sticky
                stickyTop="top-24"
                className="mb-5"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
                {currentItems.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image ?? undefined}
                    calories={item.calories}
                    isPopular={item.isPopular}
                    isNew={item.isNew}
                    isAvailable
                    showNutrition
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
            </>
          )}
        </section>
      </main>

      <LeclercFooter />

      <LeclercCart isOpen={isCartOpen} onClose={closeCart} />
    </div>
  );
}
