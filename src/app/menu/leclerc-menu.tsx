"use client";

import { useState, useEffect, useMemo } from "react";
import { LeclercHeader } from "../components/leclerc-header";
import { LeclercCart } from "../components/leclerc-cart";
import { LeclercFooter } from "../components/leclerc-footer";
import { useCart } from "../providers/cart-provider";
import type { MenuCategory } from "@/components/ui/category-navigation";
import { fetchProducts } from "@/lib/api/client";
import type { Product } from "@/lib/api/types";
import { MenuItemCard } from "@/components/ui/menu-item-card";
import { CategoryNavigation } from "@/components/ui/category-navigation";
import FeaturedItemsCarousel from "@/components/crave-ui/menu-components/featured-items-carousel";

export default function LeclercMenuPage() {
  const { isCartOpen, closeCart, addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("cookies");
  const [apiProducts, setApiProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const locationId = process.env.NEXT_PUBLIC_LOCATION_ID;
  if (!locationId) {
    throw new Error("NEXT_PUBLIC_LOCATION_ID environment variable is required");
  }

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts(locationId);
        setApiProducts(products);
        setErrorMessage(null);
      } catch (error) {
        console.warn("Failed to load products from API", error);
        setErrorMessage(
          "We couldn't load the live menu right now. Please try again shortly.",
        );
        setApiProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [locationId]);

  const menuData = useMemo(() => {
    if (!apiProducts.length) {
      return {
        signature: [],
        seasonal: [],
        limited: [],
        cookies: [],
        pastries: [],
        breads: [],
        all: [],
      };
    }

    const menuItems = apiProducts.map((product: Product) => ({
      id: product._id || product.id,
      name: product.name,
      description: product.description,
      price:
        typeof product.price === "string"
          ? parseFloat(product.price)
          : product.price,
      image:
        product.images?.[0] ||
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop",
      category: getCategoryFromName(product.name),
      calories: getCaloriesFromName(product.name),
      isNew: product.name.includes("Danish"),
      isPopular:
        product.name.includes("Croissant") ||
        product.name.includes("Sourdough"),
      isGlutenFree: false,
      featured:
        product.name.includes("Croissant") ||
        product.name.includes("Sourdough"),
    }));

    const cookies = menuItems.filter((item: any) => item.category === "cookies");
    const pastries = menuItems.filter((item: any) => item.category === "pastries");
    const breads = menuItems.filter((item: any) => item.category === "breads");

    return {
      signature: cookies.filter((item: any) => item.featured),
      seasonal: cookies.filter((item: any) => item.isNew),
      limited: cookies.filter((item: any) => !item.isPopular && !item.isNew),
      cookies,
      pastries,
      breads,
      all: menuItems,
    };
  }, [apiProducts]);

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

  const featuredItems = menuData.all.filter((item: any) => item.featured);

  // Transform featured items to carousel format
  const carouselItems = featuredItems.map((item: any) => ({
    id: item.id,
    name: item.name,
    price: `$${item.price.toFixed(2)}`,
    imageUrl: item.image,
    badge: item.isPopular ? "Popular" : item.isNew ? "New" : undefined,
  }));

  const categories: MenuCategory[] = useMemo(
    () => [
      { id: "cookies", name: "Cookies", count: menuData.cookies.length },
      { id: "pastries", name: "Pastries", count: menuData.pastries.length },
      { id: "breads", name: "Artisan Breads", count: menuData.breads.length },
    ].filter((entry) => entry.count > 0),
    [menuData],
  );

  useEffect(() => {
    if (!categories.length) {
      return;
    }
    const hasSelected = categories.some((category) => category.id === selectedCategory);
    if (!hasSelected) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  const getItemsForCategory = (category: string) => {
    switch (category) {
      case "cookies":
        return menuData.cookies;
      case "pastries":
        return menuData.pastries;
      case "breads":
        return menuData.breads;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <LeclercHeader />

      <main>
        {/* Hero Section */}
        <div className="relative w-full h-[300px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1600&h=800&fit=crop"
            alt="Leclerc Bakery Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Restaurant Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="max-w-7xl mx-auto flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 relative rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1540914124281-342587941389?w=200&h=200&fit=crop"
                  alt="Leclerc Bakery Logo"
                  className="w-full h-full object-cover"
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

        {/* Featured Items Section */}
        {featuredItems.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-8">
            <FeaturedItemsCarousel
              title="Featured Items"
              items={carouselItems}
              onAddToCart={(item) => {
                const menuItem = featuredItems.find(
                  (i: any) => i.id === item.id
                );
                if (menuItem) {
                  addToCart({
                    ...menuItem,
                    options: {
                      warming: "room-temp" as const,
                      packaging: "standard" as const,
                      giftBox: false,
                    },
                  });
                }
              }}
            />
          </section>
        )}

        {/* Main Menu Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          <h2 className="text-2xl font-semibold mb-4 mt-8">Main Menu</h2>

          {/* Category Navigation */}
          <CategoryNavigation
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sticky={true}
            stickyTop="top-20"
            className="mb-5"
          />

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading menu...</p>
            </div>
          ) : errorMessage ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{errorMessage}</p>
            </div>
          ) : (
            <>
              {/* Menu Items for Selected Category */}
              {(() => {
                const items = getItemsForCategory(selectedCategory);
                if (items.length === 0)
                  return (
                    <p className="text-muted-foreground">
                      No items in this category.
                    </p>
                  );

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
                    {items.map((item: any) => (
                      <MenuItemCard
                        key={item.id}
                        variant="detailed"
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={
                          item.image ||
                          "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop"
                        }
                        calories={item.calories}
                        isPopular={item.isPopular}
                        isNew={item.isNew}
                        dietary={item.isGlutenFree ? ["Gluten Free"] : []}
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
                );
              })()}
            </>
          )}
        </section>
      </main>

      <LeclercFooter />

      <LeclercCart
        isOpen={isCartOpen}
        onClose={closeCart}
      />
    </div>
  );
}
