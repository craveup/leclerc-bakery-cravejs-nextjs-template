"use client";

import { useCart } from "../providers/cart-provider";
import { useRouter } from "next/navigation";
import CartSidebar from "@/components/crave-ui/cart-component/cart-sidebar";

interface LeclercCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeclercCart({
  isOpen,
  onClose,
}: LeclercCartProps) {
  const router = useRouter();
  const { cartId, locationId } = useCart();

  const handleCheckout = () => {
    onClose();
    if (cartId && locationId) {
      router.push(
        `/examples/leclerc-bakery/locations/${locationId}/carts/${cartId}/checkout`
      );
    } else {
      console.error("Cart ID or Location ID not available");
    }
  };

  return (
    <CartSidebar
      isOpen={isOpen}
      onClose={onClose}
      onCheckout={handleCheckout}
    />
  );
}
