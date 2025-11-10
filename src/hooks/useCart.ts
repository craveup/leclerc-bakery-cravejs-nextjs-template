"use client";

import { useEffect, useState } from "react";
import { useApiResource } from "@/hooks/useApiResource";
import type { StorefrontCart } from "@/types/cart-types";
import {
  location_Id as DEFAULT_LOCATION_ID,
  DEFAULT_FULFILLMENT_METHOD,
} from "@/constants";
import { useCartStore } from "@/store/cart-store";
import { getCartId } from "@/lib/local-storage";

type UseCartOptions = {
  locationId?: string;
  cartId?: string | null;
  shouldFetch?: boolean;
};

export function useCart(options: UseCartOptions = {}) {
  const defaultLocationId = DEFAULT_LOCATION_ID;
  const locationId = options.locationId ?? defaultLocationId;
  const { cartId: storeCartId, setCartIdState } = useCartStore();
  const [resolvedCartId, setResolvedCartId] = useState<string | null>(
    options.cartId ?? storeCartId ?? null,
  );

  useEffect(() => {
    if (!locationId) return;

    if (options.cartId) {
      setResolvedCartId(options.cartId);
      if (options.cartId !== storeCartId) {
        setCartIdState(options.cartId);
      }
      return;
    }

    if (storeCartId) {
      setResolvedCartId(storeCartId);
      return;
    }

    const storedCartId = getCartId(locationId, DEFAULT_FULFILLMENT_METHOD) || null;
    if (storedCartId) {
      setResolvedCartId(storedCartId);
      setCartIdState(storedCartId);
    }
  }, [locationId, options.cartId, setCartIdState, storeCartId]);

  const shouldFetchBase = options.shouldFetch ?? true;
  const shouldFetch = Boolean(
    shouldFetchBase && locationId && resolvedCartId,
  );

  const endpoint =
    shouldFetch && locationId && resolvedCartId
      ? `/api/v1/locations/${locationId}/carts/${resolvedCartId}`
      : null;

  const { data, error, errorMessage, isLoading, isValidating, mutate } =
    useApiResource<StorefrontCart>(endpoint, { shouldFetch });

  return {
    cart: data,
    cartId: resolvedCartId,
    locationId,
    error,
    errorMessage,
    isLoading,
    isValidating,
    mutate,
    shouldFetch,
  };
}
