"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from "lucide-react";
import type { CartItem } from "@/types/restaurant";
import {
  formatPrice,
  calculateItemPrice,
  calculateSubtotal,
} from "@/lib/utils/price";
import { Button } from "./button";

export interface CartProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export function Cart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  className,
  ...props
}: CartProps) {
  const subtotal = React.useMemo(() => calculateSubtotal(items), [items]);

  const totalItems = React.useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-lg border bg-background",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-b pb-4 p-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ShoppingCartIcon className="h-4 w-4" />
          Your Order
          <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
            {totalItems}
          </span>
        </h2>
        {items.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearCart}
            className="h-8 px-2 text-muted-foreground"
          >
            Clear
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center space-y-4 py-44">
          <div className="rounded-full bg-muted p-6">
            <ShoppingCartIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Add items to your cart to see them here
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto py-4 custom-scrollbar p-4">
          <ul className="space-y-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="p-4 border border-border rounded-lg bg-card space-y-3"
              >
                {/* Header: Title and Price */}
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    {item.image && (
                      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-muted relative">
                        <Image
                          src={item.image}
                          alt={item.name || "Cart item"}
                          fill
                          className="object-cover"
                          sizes="40px"
                          unoptimized
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-sm leading-tight">
                        {item.name || item.menuItem?.name}
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-base">
                      {formatPrice(calculateItemPrice(item))}
                    </div>
                  </div>
                </div>

                {/* Modifiers */}
                {item.modifiers && item.modifiers.length > 0 && (
                  <div className="space-y-1">
                    {item.modifiers.map((mod) => (
                      <div
                        key={mod.id || mod.optionId}
                        className="flex items-center justify-between text-xs py-1"
                      >
                        <span className="text-muted-foreground">
                          {mod.name}
                        </span>
                        {Number(mod.price || 0) > 0 && (
                          <span className="font-medium">
                            +{formatPrice(Number(mod.price || 0))}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Notes */}
                {(item.notes || item.specialInstructions) && (
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-600 rounded-md">
                    <p className="text-sm text-blue-800 dark:text-blue-400">
                      <span className="font-medium italic">Note:</span>{" "}
                      {item.notes || item.specialInstructions}
                    </p>
                  </div>
                )}

                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <MinusIcon className="h-3 w-3" />
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <span className="min-w-[2.5rem] text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <PlusIcon className="h-3 w-3" />
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {items.length > 0 && (
        <div className="space-y-4 border-t pt-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Subtotal</span>
              <span className="text-sm">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Tax</span>
              <span className="text-sm">{formatPrice(subtotal * 0.07)}</span>
            </div>
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(subtotal * 1.07)}</span>
            </div>
          </div>
          <Button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full"
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
}
