"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  categoryId: string;
  available: boolean;
  popular?: boolean;
  dietaryInfo?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
}

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuItem[];
  categories: MenuCategory[];
  onAddToCart: (item: MenuItem) => void;
  layout?: "grid" | "list";
  showImages?: boolean;
}

export function Menu({
  items,
  categories,
  onAddToCart,
  layout = "grid",
  showImages = true,
  className,
  ...props
}: MenuProps) {
  const [activeCategory, setActiveCategory] = React.useState<string | null>(
    categories.length > 0 ? categories[0].id : null
  );

  const filteredItems = React.useMemo(() => {
    if (!activeCategory) return items;
    return items.filter((item) => item.categoryId === activeCategory);
  }, [items, activeCategory]);

  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="mb-6 border-b">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors",
                activeCategory === category.id
                  ? "border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div
        className={cn(
          layout === "grid"
            ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            : "space-y-6"
        )}
      >
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={cn(
              "group relative overflow-hidden rounded-lg border bg-background p-2 transition-all hover:shadow-md",
              layout === "list" && "flex gap-4"
            )}
          >
            {showImages && item.image && (
              <div
                className={cn(
                  "relative aspect-square overflow-hidden rounded-md bg-muted",
                  layout === "list" && "h-24 w-24 flex-shrink-0"
                )}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-all group-hover:scale-105"
                  sizes={layout === "list" ? "96px" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                  unoptimized
                />
                {item.popular && (
                  <div className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                    Popular
                  </div>
                )}
              </div>
            )}
            <div className="p-2 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium leading-none">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-medium">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(item.price)}
                  </span>
                </div>
              </div>

              {item.dietaryInfo && item.dietaryInfo.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.dietaryInfo.map((info) => (
                    <span
                      key={info}
                      className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                    >
                      {info}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={() => onAddToCart(item)}
                disabled={!item.available}
                className={cn(
                  "inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                {item.available ? "Add to Cart" : "Unavailable"}
              </button>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground">
            No items available in this category.
          </div>
        )}
      </div>
    </div>
  );
}
