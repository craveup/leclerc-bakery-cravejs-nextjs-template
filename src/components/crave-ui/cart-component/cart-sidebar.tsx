"use client";

import React, { useEffect, useMemo, useState, Suspense, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useFormatters } from "@/lib/i18n/hooks";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { patchData } from "@/lib/handle-api";
import { formatApiError } from "@/lib/format-api-error";
import { toast } from "sonner";
import CounterButton from "./CounterButton";
import useEmblaCarousel from "embla-carousel-react";
import { useApiResource } from "@/hooks/useApiResource";
import ProductDescriptionDialog from "@/app/components/product-description/ProductDescriptionDialog";
import { absolutizeImage } from "@/lib/utils/images";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { location_Id as DEFAULT_LOCATION_ID } from "@/constants";
import { ResponsiveSheet } from "@/components/ResponsiveSheet";
import type { StorefrontCart, CartModifierGroup } from "@/types/cart-types";

interface SidebarCartItem {
  id: string;
  name: string;
  quantity: number;
  imageUrl: string | null;
  unitPrice: number;
  totalPrice: number;
  modifiersLabel?: string;
  specialInstructions?: string;
}

interface SuggestedItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems?: SidebarCartItem[];
  onCheckout?: (checkoutUrl?: string) => void | Promise<void>;
}

const getReturnUrl = () => {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return null;
};

function formatSelections(
  groups: CartModifierGroup[] | undefined
): string | undefined {
  if (!Array.isArray(groups) || groups.length === 0) return undefined;

  const parts: string[] = [];

  const visit = (collection: CartModifierGroup[]) => {
    collection.forEach((group) => {
      const itemsLabel = group.items
        .map((item) => {
          const quantityPrefix = item.quantity > 1 ? `${item.quantity}x ` : "";
          return `${quantityPrefix}${item.name}`;
        })
        .filter(Boolean)
        .join(", ");

      if (itemsLabel) {
        parts.push(`${group.name}: ${itemsLabel}`);
      }

      group.items.forEach((item) => {
        if (Array.isArray(item.children) && item.children.length > 0) {
          visit(item.children);
        }
      });
    });
  };

  visit(groups);
  return parts.join(" | ");
}

function mapCartResponseToItems(
  cart: StorefrontCart | null | undefined
): SidebarCartItem[] {
  if (!cart?.items?.length) return [];

  return cart.items.map((line) => {
    const unitPrice = Number.parseFloat(line.price ?? "0") || 0;
    const totalPrice =
      Number.parseFloat(line.total ?? "0") || unitPrice * line.quantity;
    const imageUrl = line.imageUrl || null;

    return {
      id: line.id,
      name: line.name,
      quantity: line.quantity,
      imageUrl,
      unitPrice,
      totalPrice,
      modifiersLabel: formatSelections(line.selections),
      specialInstructions: line.specialInstructions?.trim() || undefined,
    };
  });
}

type ApiProduct =
  | {
      id: string;
      name: string;
      price?: number | string;
      imageUrl?: string;
      image?: string;
      mainImageUrl?: string;
      images?: { url?: string }[];
    }
  | any;

function mapProductsToSuggested(
  data: ApiProduct[] | undefined
): SuggestedItem[] {
  if (!Array.isArray(data)) return [];
  const pickImage = (p: ApiProduct): string | null =>
    absolutizeImage(
      p.imageUrl ??
        p.mainImageUrl ??
        (Array.isArray(p.images) && p.images[0]) ??
        p.image
    );

  return data.map((p) => ({
    id: String(p.id),
    name: String(p.name ?? "Product"),
    price: Number(p.price ?? 0),
    imageUrl: pickImage(p) ?? null,
  }));
}

function CartSidebarContent({
  isOpen,
  onClose,
  cartItems,
  onCheckout,
}: CartSidebarProps) {
  const router = useRouter();
  const { currency } = useFormatters();

  const {
    cart,
    cartId,
    locationId: resolvedLocationId,
    mutate,
    isLoading: cartLoading,
    isValidating: cartValidating,
  } = useCart();

  const locationId = resolvedLocationId ?? DEFAULT_LOCATION_ID;
  const storefrontLocationId = cart?.locationId ?? locationId ?? null;

  const normalizeCheckoutUrl = useCallback(
    (candidate?: string | null) => {
      if (!candidate) return null;
      const runtimeReturnUrl = getReturnUrl();
      const baseOrigin = runtimeReturnUrl ?? "http://localhost:3000";

      try {
        const isAbsolute = /^https?:\/\//i.test(candidate);
        const url = isAbsolute
          ? new URL(candidate)
          : new URL(candidate, baseOrigin);

        if (cartId) {
          url.searchParams.set("cartId", cartId);
        }
        if (runtimeReturnUrl) {
          url.searchParams.set("returnUrl", runtimeReturnUrl);
        }

        return isAbsolute
          ? url.toString()
          : `${url.pathname}${url.search}${url.hash}`;
      } catch {
        return candidate;
      }
    },
    [cartId],
  );

  const checkoutUrl = useMemo(() => {
    return normalizeCheckoutUrl(cart?.checkoutUrl?.trim());
  }, [normalizeCheckoutUrl, cart?.checkoutUrl]);

  const [busyLineId, setBusyLineId] = useState<string | null>(null);
  const [productIdToOpen, setProductIdToOpen] = useState<string>("");

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);
  const onPrev = () => emblaApi?.scrollPrev();
  const onNext = () => emblaApi?.scrollNext();

  const apiItems = useMemo<SidebarCartItem[]>(() => {
    if (cart) return mapCartResponseToItems(cart);
    if (cartItems?.length) return cartItems;
    return [];
  }, [cart, cartItems]);

  const recommendationsEndpoint =
    locationId && cartId
      ? `/api/v1/locations/${locationId}/carts/${cartId}/products`
      : null;

  const { data: recRaw, isLoading: recLoading } = useApiResource<ApiProduct[]>(
    recommendationsEndpoint,
    {
      shouldFetch: Boolean(locationId && cartId),
    }
  );

  const liveSuggested = useMemo(() => mapProductsToSuggested(recRaw), [recRaw]);
  const showRecSkeleton = recLoading && !liveSuggested.length;
  const showSuggestionsSection =
    (showRecSkeleton || liveSuggested.length > 0) && !!cartId;

  const subtotal = useMemo(() => {
    if (cart?.subTotal) {
      return Number.parseFloat(cart.subTotal) || 0;
    }
    return apiItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [apiItems, cart]);

  const placeholderImage =
    "https://kzmps94w6wprloamplrj.lite.vusercontent.net/placeholder.svg?height=200&width=300";

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("cart-scroll-lock");
    const style = document.createElement("style");
    style.id = "cart-scroll-lock-styles";
    style.textContent = `.cart-scroll-lock{overflow:hidden!important;}`;
    document.head.appendChild(style);
    return () => {
      document.body.classList.remove("cart-scroll-lock");
      document.getElementById("cart-scroll-lock-styles")?.remove();
    };
  }, [isOpen]);

  const setQuantity = async (lineId: string, nextQty: number) => {
    if (!locationId || !cartId) {
      toast.error("Cart is not ready yet. Please try again.", {
        duration: 600,
      });
      return false;
    }

    setBusyLineId(lineId);
    try {
      await patchData(
        `/api/v1/locations/${locationId}/carts/${cartId}/cart-item/${lineId}/quantity`,
        { quantity: nextQty }
      );
      await mutate();
      return true;
    } catch (err) {
      toast.error(formatApiError(err).message, { duration: 600 });
      return false;
    } finally {
      setBusyLineId(null);
    }
  };

  const getQuantityToastMessage = (
    name: string | undefined,
    previousQty: number,
    nextQty: number
  ) => {
    const itemLabel = name?.trim() || "Item";
    if (nextQty <= 0) return `${itemLabel} removed from your cart`;
    if (nextQty > previousQty)
      return `${itemLabel} quantity increased to ${nextQty}`;
    if (nextQty < previousQty)
      return `${itemLabel} quantity decreased to ${nextQty}`;
    return `${itemLabel} quantity updated`;
  };

  const handleIncrease = async (lineId: string, qty: number, name?: string) => {
    const nextQty = qty + 1;
    const success = await setQuantity(lineId, nextQty);
    if (success) {
      toast.success(getQuantityToastMessage(name, qty, nextQty), {
        duration: 600,
      });
    }
  };
  const handleDecrease = async (lineId: string, qty: number, name?: string) => {
    const nextQty = Math.max(0, qty - 1);
    const success = await setQuantity(lineId, nextQty);
    if (success) {
      toast.success(getQuantityToastMessage(name, qty, nextQty), {
        duration: 600,
      });
    }
  };
  const handleRemove = async (lineId: string, qty: number, name?: string) => {
    const success = await setQuantity(lineId, 0);
    if (success) {
      toast.success(getQuantityToastMessage(name, qty, 0), {
        duration: 600,
      });
    }
  };
  const handleCheckoutClick = async () => {
    if (!apiItems.length || !cartId) return;

    if (!checkoutUrl) {
      toast.error("Checkout is not available right now. Please try again.", {
        duration: 600,
      });
      return;
    }

    await mutate();

    if (onCheckout) {
      await Promise.resolve(onCheckout(checkoutUrl));
      return;
    }

    if (/^https?:\/\//i.test(checkoutUrl)) {
      window.location.href = checkoutUrl;
      return;
    }

    router.push(checkoutUrl);
  };

  const handleSheetOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) onClose();
    },
    [onClose]
  );

  const sheetTitle = "YOUR ORDER";
  const sheetDescription = "Review your items and proceed to checkout.";

  const sheetFooter = (
    <div className="w-full space-y-4 p-2 sm:p-4 md:p-4">
      <Button
        onClick={handleCheckoutClick}
        className="w-full h-14 text-base bg-[#EFE7D2] rounded-2xl disabled:opacity-60"
        size="lg"
        data-testid="CheckoutButton"
        disabled={!apiItems.length}
      >
        <div className="flex items-center justify-between w-full">
          <span>CHECKOUT</span>
          <span>{currency(subtotal)}</span>
        </div>
      </Button>
    </div>
  );
  if (!isOpen) return null;

  return (
    <ResponsiveSheet
      open={isOpen}
      setOpen={handleSheetOpenChange}
      title={sheetTitle}
      titleClassName="font-heading-h4 text-textdefault text-lg tracking-wider"
      headerClassName="px-6 py-4 border-b border-borderdefault"
      description={sheetDescription}
      className="flex h-full flex-col p-0 md:max-w-[500px]"
      innerContentClassName="flex flex-col p-0"
      hideMainBtn
      hideCloseBtn
      footer={sheetFooter}
    >
      <div
        className="flex h-full min-h-0 flex-col bg-backgrounddefault"
        data-testid="OrderCart"
      >
        <div className="flex-1 overflow-hidden min-h-0">
          <div className="p-2">
            {cartLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 border border-borderdefault rounded-2xl animate-pulse"
                  >
                    <div className="w-16 h-16 rounded-lg bg-muted" />
                    <div className="flex-1 min-w-0">
                      <div className="h-4 bg-muted rounded w-2/3 mb-2" />
                      <div className="h-4 bg-muted rounded w-1/3" />
                    </div>
                    <div className="w-24 h-8 bg-muted rounded-full" />
                  </div>
                ))}
              </div>
            ) : apiItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-backgroundmuted flex items-center justify-center">
                    <ShoppingCart className="w-8 h-8 text-icondefault" />
                  </div>
                  <p className="font-text-meta text-textmuted text-sm tracking-wider">
                    YOUR CART IS EMPTY
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {apiItems.map((item) => {
                  const modifiersLabel = item.modifiersLabel ?? "";
                  const hasModifiers = Boolean(modifiersLabel);
                  const specialInstructions = item.specialInstructions;
                  const hasSpecialInstructions = Boolean(specialInstructions);
                  const lineTotal = currency(item.totalPrice);

                  return (
                    <Card
                      key={item.id}
                      className="p-4"
                      data-testid="OrderCartItem"
                    >
                      <div className="flex w-full gap-4 sm:gap-5">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-backgroundmuted">
                          <Image
                            src={item.imageUrl || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="min-w-0 flex-1 space-y-2">
                          <div className="flex flex-wrap items-center gap-2 text-textdefault">
                            <p className="text-sm font-semibold sm:text-base truncate">
                              {item.name}
                            </p>
                            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                              Qty {item.quantity}
                            </span>
                          </div>

                          {hasModifiers && (
                            <p className="line-clamp-2 text-xs text-textmuted">
                              {modifiersLabel}
                            </p>
                          )}

                          {hasSpecialInstructions && (
                            <p className="text-xs leading-snug text-muted-foreground line-clamp-2 break-all">
                              Special instructions: {specialInstructions}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col items-end justify-start gap-2">
                          <p className="text-sm font-semibold text-textdefault">
                            {lineTotal}
                          </p>

                          <CounterButton
                            quantity={item.quantity}
                            isLoading={busyLineId === item.id}
                            onIncrease={() =>
                              void handleIncrease(
                                item.id,
                                item.quantity,
                                item.name
                              )
                            }
                            onDecrease={() => {
                              if (item.quantity === 1) {
                                void handleRemove(
                                  item.id,
                                  item.quantity,
                                  item.name
                                );
                              } else {
                                void handleDecrease(
                                  item.id,
                                  item.quantity,
                                  item.name
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {showSuggestionsSection && (
            <div className="border-t border-borderdefault p-6">
              <div className="flex items-center justify-between mb-6">
                <h3
                  className="font-heading-h5 text-textdefault text-lg tracking-wider"
                  data-testid="order-cart-recommendation-title"
                >
                  YOU MIGHT ALSO LIKE
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onPrev}
                    aria-label="Previous"
                    className="h-8 w-8 hover:bg-backgroundmuted text-textdefault cursor-pointer"
                    disabled={!canScrollPrev}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onNext}
                    aria-label="Next"
                    className="h-8 w-8 hover:bg-backgroundmuted text-textdefault cursor-pointer"
                    disabled={!canScrollNext}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex gap-3">
                    {(showRecSkeleton
                      ? Array.from({ length: 8 })
                      : liveSuggested
                    ).map((raw, idx) => {
                      const item = raw as SuggestedItem | undefined;

                      return (
                        <div
                          key={item?.id ?? `skeleton-${idx}`}
                          className="flex-[0_0_auto] w-36 sm:w-40 md:w-44"
                          data-testid="CarouselSuggestedItem"
                          tabIndex={0}
                        >
                          {showRecSkeleton ? (
                            <Card className="gap-0 overflow-hidden p-0 animate-pulse flex flex-col h-full">
                              <div className="relative aspect-4/3 w-full bg-muted" />
                              <CardHeader className="p-4 flex flex-col flex-1 justify-between">
                                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                                <div className="h-4 bg-muted rounded w-1/3" />
                              </CardHeader>
                            </Card>
                          ) : (
                            <Card
                              className="gap-0 overflow-hidden p-0 transition-all hover:shadow-md bg-background flex h-full flex-col"
                              onClick={() =>
                                item && setProductIdToOpen(item.id)
                              }
                              role="button"
                            >
                              <div className="relative aspect-4/3 w-full">
                                <Image
                                  src={item!.imageUrl || placeholderImage}
                                  alt={item!.name}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  data-testid="CarouselItemImage"
                                />
                              </div>

                              <CardHeader className="p-4 flex flex-col flex-1">
                                <CardTitle className="text-sm line-clamp-2 min-h-[2.75rem]">
                                  {item!.name}
                                </CardTitle>
                                <CardDescription className="font-semibold mt-auto">
                                  {currency(item!.price)}
                                </CardDescription>
                              </CardHeader>
                            </Card>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {productIdToOpen && (
                <ProductDescriptionDialog
                  onClose={() => setProductIdToOpen("")}
                  locationId={locationId}
                  productId={productIdToOpen}
                  cartId={cartId ?? ""}
                  isAddToCartBlocked={!cartId}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </ResponsiveSheet>
  );
}

export default function CartSidebar(props: CartSidebarProps) {
  return (
    <Suspense fallback={<div>Loading cart...</div>}>
      <CartSidebarContent {...props} />
    </Suspense>
  );
}
