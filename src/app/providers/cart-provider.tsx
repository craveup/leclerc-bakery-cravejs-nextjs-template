"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { CartItem as LocalCartItem, MenuItem, ItemOptions } from "../types";
import { useCart as useStorefrontCart } from "@/hooks/useCart";
import { useOrderingSession } from "@/hooks/use-ordering-session";
import { postData, patchData } from "@/lib/handle-api";
import { formatApiError } from "@/lib/format-api-error";
import {
  DEFAULT_FULFILLMENT_METHOD,
  location_Id as DEFAULT_LOCATION_ID,
} from "@/constants";
import { ItemUnavailableActions } from "@/types/common";
import { removeCartCartId } from "@/lib/local-storage";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

interface CartContextType {
  items: LocalCartItem[];
  addToCart: (item: MenuItem & { options: ItemOptions }) => Promise<void>;
  removeItem: (lineItemId: string) => void;
  updateQuantity: (lineItemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  tax: number;
  total: number;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartId: string | null;
  locationId: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<string | null>(null);
  const [uiLoading, setUiLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const envLocationId = DEFAULT_LOCATION_ID;
  const { setCartIdState } = useCartStore();
  useOrderingSession(envLocationId);
  const {
    cart,
    cartId,
    locationId: resolvedLocationId,
    mutate,
    isLoading,
  } = useStorefrontCart();

  const locationId = resolvedLocationId ?? envLocationId;

  const items = useMemo<LocalCartItem[]>(() => {
    if (!cart?.items?.length) {
      return [];
    }

    return cart.items.map((line) => ({
      cartId: line.id,
      id: line.productId || line.id,
      name: line.name,
      description: line.description ?? "",
      price: Number.parseFloat(line.price ?? "0") || 0,
      quantity: line.quantity,
      image: line.imageUrl ?? null,
      category: "signature",
      calories: 0,
      options: {
        warming: "room-temp",
        packaging: "standard",
        giftBox: false,
      },
    }));
  }, [cart]);

  const subtotal = cart?.subTotal ? Number.parseFloat(cart.subTotal) || 0 : 0;
  const tax = cart?.taxTotal ? Number.parseFloat(cart.taxTotal) || 0 : 0;
  const totalString =
    cart?.orderTotalWithServiceFee ?? cart?.netSalesTotal ?? null;
  const total = totalString ? Number.parseFloat(totalString) || 0 : subtotal + tax;
  const itemCount = cart?.totalQuantity ?? items.reduce((sum, item) => sum + item.quantity, 0);

  const clearError = useCallback(() => setError(null), []);

  const ensureCartReady = () => {
    if (!locationId || !cartId) {
      setError("Cart is not ready. Please try again.");
      return false;
    }
    return true;
  };

  const addToCart = useCallback(
    async (item: MenuItem & { options: ItemOptions }) => {
      if (!ensureCartReady()) return;
      setUiLoading(true);
      try {
        await postData(
          `/api/v1/locations/${locationId}/carts/${cartId}/cart-item`,
          {
            productId: item.id,
            quantity: 1,
            specialInstructions: "",
            itemUnavailableAction: ItemUnavailableActions.REMOVE_ITEM,
            selections: [],
          },
        );
        await mutate();
        toast.success(`${item.name} added to cart`, {
          description: "Tap the cart to review your order.",
          duration: 2000,
        });
      } catch (err) {
        const { message } = formatApiError(err);
        setError(message);
        toast.error(message, { duration: 2000 });
      } finally {
        setUiLoading(false);
      }
    },
    [cartId, locationId, mutate, ensureCartReady],
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number) => {
      if (!ensureCartReady()) return;
      setUiLoading(true);
      try {
        await patchData(
          `/api/v1/locations/${locationId}/carts/${cartId}/cart-item/${lineId}/quantity`,
          { quantity },
        );
        await mutate();
      } catch (err) {
        const { message } = formatApiError(err);
        setError(message);
      } finally {
        setUiLoading(false);
      }
    },
    [cartId, locationId, mutate, ensureCartReady],
  );

  const removeItem = useCallback(
    (lineId: string) => {
      void updateQuantity(lineId, 0);
    },
    [updateQuantity],
  );

  const clearCart = useCallback(() => {
    if (locationId) {
      removeCartCartId(locationId, DEFAULT_FULFILLMENT_METHOD);
      setCartIdState(null);
    }
    setIsCartOpen(false);
    mutate(undefined, true);
  }, [locationId, mutate, setCartIdState]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const contextValue: CartContextType = {
    items,
    addToCart,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
    tax,
    total,
    isLoading: isLoading || uiLoading,
    error,
    clearError,
    isCartOpen,
    openCart,
    closeCart,
    cartId,
    locationId,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
