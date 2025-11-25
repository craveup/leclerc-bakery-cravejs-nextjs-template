import * as React from "react";
import Image from "next/image";
import { Plus, Clock, Star, AlertTriangle, Loader2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

export interface MenuItemCardProps {
  className?: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image?: string;
  prepTime?: number;
  rating?: number;
  reviewCount?: number;
  isPopular?: boolean;
  isNew?: boolean;
  calories?: number;
  isAvailable?: boolean;
  onAddToCart?: (item: any) => void;
  showNutrition?: boolean;
  badge?: string;
}

export function MenuItemCard({
  className,
  name,
  description,
  price,
  originalPrice,
  image,
  prepTime,
  rating,
  reviewCount,
  isPopular,
  isNew,
  calories,
  isAvailable = true,
  onAddToCart,
  showNutrition = false,
  badge,
  ...props
}: MenuItemCardProps) {
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = async () => {
    if (!isAvailable || isAdding || !onAddToCart) return;

    const item = {
      name,
      description,
      price,
      image,
      calories,
    };

    setIsAdding(true);
    try {
      await Promise.resolve(onAddToCart(item));
    } finally {
      setIsAdding(false);
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-200 hover:shadow-lg flex flex-col h-full",
        !isAvailable && "opacity-60",
        className
      )}
      {...props}
    >
      <div className="relative h-56 md:h-64 overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(min-width: 768px) 384px, 100vw"
            unoptimized
          />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {badge && (
            <Badge className="bg-primary hover:bg-primary/90">{badge}</Badge>
          )}
          {isNew && (
            <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
          )}
          {isPopular && (
            <Badge className="bg-orange-500 hover:bg-orange-600">Popular</Badge>
          )}
          {!isAvailable && <Badge variant="destructive">Sold Out</Badge>}
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-bold leading-tight">{name}</h3>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1">
              {originalPrice && originalPrice > price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
              <span className="font-bold text-lg">{formatPrice(price)}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex-1 flex flex-col">
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {description}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          {prepTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{prepTime} min</span>
            </div>
          )}

          {rating && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
              {reviewCount && <span>({reviewCount})</span>}
            </div>
          )}

          {calories && showNutrition && <span>{calories} cal</span>}
        </div>

        <div className="flex-1" />
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!isAvailable || isAdding}
          className="w-full"
          size="sm"
        >
          {isAdding ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              {isAvailable ? "Add to Cart" : "Unavailable"}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
