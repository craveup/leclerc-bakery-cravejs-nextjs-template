"use client";

import { useEffect, useState } from "react";
import {
  startOrderingSession,
  type StartOrderingSessionRequest,
} from "@/lib/api/ordering-session";
import { getCartId, setCartId } from "@/lib/local-storage";
import { formatApiError } from "@/lib/format-api-error";
import { useCartStore } from "@/store/cart-store";
import { DEFAULT_FULFILLMENT_METHOD } from "@/constants";

type UseOrderingSessionResult = {
  cartId: string | null;
  isLoading: boolean;
  error: string;
  orderingError: string;
};

export function useOrderingSession(
  locationId: string,
): UseOrderingSessionResult {
  const { cartId, setCartIdState, isLoading, setIsLoading } = useCartStore();
  const [error, setError] = useState("");
  const [orderingError, setOrderingError] = useState("");

  useEffect(() => {
    if (!locationId) {
      return;
    }

    async function init() {
      if (cartId) {
        setIsLoading(false);
        return;
      }

      const existingCartId =
        getCartId(locationId, DEFAULT_FULFILLMENT_METHOD) || undefined;

      setIsLoading(true);
      setError("");
      setOrderingError("");

      const returnUrl =
        typeof window !== "undefined" ? window.location.origin : undefined;

      const payload: StartOrderingSessionRequest = {
        fulfillmentMethod: DEFAULT_FULFILLMENT_METHOD,
        existingCartId: existingCartId,
      };

      if (returnUrl) {
        payload.returnUrl = returnUrl;
      }

      try {
        const { cartId: newCartId, errorMessage } = await startOrderingSession(
          locationId,
          payload,
        );

        if (newCartId) {
          setCartId(locationId, newCartId, DEFAULT_FULFILLMENT_METHOD);
          setCartIdState(newCartId);
        }

        setOrderingError(errorMessage ?? "");
      } catch (e) {
        const { message } = formatApiError(e);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    init();
  }, [cartId, locationId, setCartIdState, setIsLoading]);

  return { cartId, isLoading, error, orderingError };
}
