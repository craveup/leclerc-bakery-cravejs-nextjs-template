"use client";

import CartSidebar from "@/components/crave-ui/cart-component/cart-sidebar";

interface LeclercCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeclercCart({ isOpen, onClose }: LeclercCartProps) {
  return <CartSidebar isOpen={isOpen} onClose={onClose} />;
}
