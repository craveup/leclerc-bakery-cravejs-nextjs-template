"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, Loader2 } from "lucide-react";
import Image from "next/image";

interface FoodItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  badge?: string;
}

interface FeaturedItemsCarouselProps {
  title?: string;
  items?: FoodItem[];
  onAddToCart?: (item: FoodItem) => void | Promise<void>;
  onItemClick?: (item: FoodItem) => void;
}

const defaultItems: FoodItem[] = [
  {
    id: "1",
    name: "Two Chip Chocolate Chip Cookie",
    price: "$6.33",
    imageUrl:
      "https://img.cdn4dd.com/p/fit=cover,width=300,height=300,format=auto,quality=90/media/photosV2/d1edfa6f-0b34-4919-9833-237faa20feae-retina-large.jpg",
    badge: "#1 Most liked",
  },
  {
    id: "2",
    name: "Dark Chocolate Peanut Butter Chip Cookie",
    price: "$6.33",
    imageUrl:
      "https://img.cdn4dd.com/p/fit=cover,width=300,height=300,format=auto,quality=90/media/photosV2/f59c45f6-3de4-4802-af94-1541cb3fab1e-retina-large.jpg",
  },
  {
    id: "3",
    name: "Caramel Coconut Chocolate Chip",
    price: "$6.33",
    imageUrl:
      "https://img.cdn4dd.com/p/fit=cover,width=300,height=300,format=auto,quality=90/media/photosV2/dba02860-6d9f-45d0-9c9e-6b0dc36a37c0-retina-large.jpg",
  },
  {
    id: "4",
    name: "Dark Chocolate Chip Cookie",
    price: "$6.33",
    imageUrl:
      "https://img.cdn4dd.com/p/fit=cover,width=300,height=300,format=auto,quality=90/media/photosV2/86fcc107-3447-4ed2-a77c-bff23eb202ea-retina-large.jpg",
  },
  {
    id: "5",
    name: "Vegan & GF Chocolate Chip Walnut Cookie",
    price: "$6.87",
    imageUrl:
      "https://img.cdn4dd.com/p/fit=cover,width=300,height=300,format=auto,quality=90/media/photosV2/3a0fe12d-858b-49a8-a2d5-68cc699f6dad-retina-large.jpg",
  },
  {
    id: "6",
    name: "Levain Cookie Tin Bundle",
    price: "$18.70",
    imageUrl:
      "https://img.cdn4dd.com/p/fit=cover,width=300,height=300,format=auto,quality=90/media/photosV2/a1d70246-b390-4ae7-b79c-da4f1e92ac76-retina-large.jpg",
  },
  {
    id: "7",
    name: "Chocolate Lovers",
    price: "$25.58",
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
];

export default function FeaturedItemsCarousel({
  title = "Featured Items",
  items = defaultItems,
  onAddToCart,
  onItemClick,
}: FeaturedItemsCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [addingItemId, setAddingItemId] = useState<string | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("carousel-container");
    if (!container) return;

    const scrollAmount = 240 + 16; // card width (w-60 = 15rem = 240px) + gap (gap-4 = 1rem = 16px)
    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });

    setScrollPosition(newPosition);
    setCanScrollLeft(newPosition > 0);
    setCanScrollRight(
      newPosition < container.scrollWidth - container.clientWidth
    );
  };

  const handleAddToCart = async (
    item: FoodItem,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    if (!onAddToCart || addingItemId) return;
    setAddingItemId(item.id);
    try {
      await Promise.resolve(onAddToCart(item));
    } finally {
      setAddingItemId(null);
    }
  };

  return (
    <div className="w-full py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous button of carousel"
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Next button of carousel"
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        <div
          id="carousel-container"
          className="flex gap-4 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-60"
              style={{ minWidth: "240px", maxWidth: "240px" }}
            >
              <div
                className="bg-background rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer shadow-sm border h-full flex flex-col w-full"
                onClick={() => onItemClick?.(item)}
                role="button"
                tabIndex={0}
                aria-label={item.name}
              >
                {/* Image Container */}
                <div className="relative w-full h-48 flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                  {item.badge && (
                    <div className="absolute top-3 left-3 z-10">
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-800 hover:bg-orange-100"
                      >
                        {item.badge}
                      </Badge>
                    </div>
                  )}
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover w-full h-full"
                    sizes="240px"
                  />
                  {/* Add to Cart Button */}
                  <div className="absolute bottom-3 right-3">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 bg-background hover:bg-muted/50 shadow-md text-foreground"
                      onClick={(e) => handleAddToCart(item, e)}
                      aria-label="Add item to cart"
                      disabled={addingItemId === item.id}
                    >
                      {addingItemId === item.id ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-medium text-foreground mb-2 line-clamp-2 min-h-[3rem]">
                    {item.name}
                  </h3>
                  <p className="text-lg font-semibold text-foreground mt-auto">
                    {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
