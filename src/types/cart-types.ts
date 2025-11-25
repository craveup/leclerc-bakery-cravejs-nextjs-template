import type {
  CartModifierItem,
  CartModifierGroup,
  CartItem,
  CartCustomer,
  CartFees,
  DeliveryInfo,
  RoomServiceInfo,
  TableServiceInfo,
  StorefrontCart as BaseStorefrontCart,
} from "@craveup/storefront-sdk";

export type StorefrontCart = BaseStorefrontCart & {
  checkoutUrl?: string | null;
  cartUrl?: string | null;
  orderTotal?: string;
};

export type {
  CartModifierItem,
  CartModifierGroup,
  CartItem,
  CartCustomer,
  CartFees,
  DeliveryInfo,
  RoomServiceInfo,
  TableServiceInfo,
};
