export interface ApiError {
  response?: {
    data?: {
      message?: string;
      code?: string;
    };
    status?: number;
  };
  message?: string;
}

export enum ItemUnavailableActions {
  REMOVE_ITEM = "remove_item",
  CANCEL_ENTIRE_ORDER = "cancel_entire_order",
}

export interface ProductDescriptionProps {
  productId: string;
  locationId: string;
  cartId: string;
  onClose: () => void;
  isAddToCartBlocked?: boolean;
}
