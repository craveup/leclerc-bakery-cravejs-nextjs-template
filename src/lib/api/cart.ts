import { fetchData, postData, putData } from './crave-client';
import { CartResponse, CartItem, LocationData, ProductData, PaymentIntentResponse } from './types';

// Get cart data
export const getCart = async (locationId: string, cartId: string): Promise<CartResponse> => {
  return fetchData(`/api/v1/locations/${locationId}/carts/${cartId}`);
};

// Get location data
export const getLocation = async (locationId: string): Promise<LocationData> => {
  return fetchData(`/api/v1/locations/${locationId}`);
};

// Get product recommendations for cart
export const getCartRecommendations = async (locationId: string, cartId: string): Promise<ProductData[]> => {
  return fetchData(`/api/v1/locations/${locationId}/carts/${cartId}/products`);
};

// Add item to cart
export const addItemToCart = async (locationId: string, cartId: string, addItemData: any) => {
  return postData(`/api/v1/locations/${locationId}/carts/${cartId}/cart-item`, addItemData);
};

// Update cart item quantity
export const updateCartItemQuantity = async (
  locationId: string, 
  cartId: string, 
  itemId: string, 
  quantity: number
) => {
  return putData(`/api/v1/locations/${locationId}/carts/${cartId}/items/${itemId}`, { quantity });
};

// Remove item from cart
export const removeCartItem = async (locationId: string, cartId: string, itemId: string) => {
  return putData(`/api/v1/locations/${locationId}/carts/${cartId}/items/${itemId}`, { quantity: 0 });
};

// Update customer information
export const updateCustomerInfo = async (
  locationId: string, 
  cartId: string, 
  customer: any
) => {
  return putData(`/api/v1/locations/${locationId}/cart/${cartId}/validate-and-update`, customer);
};

// Get payment intent
export const getPaymentIntent = async (locationId: string, cartId: string): Promise<PaymentIntentResponse> => {
  return fetchData(`/api/v1/stripe/payment-intent?locationId=${locationId}&cartId=${cartId}`);
};

// Create a new cart
export const createCart = async (locationId: string, currentCartId: string | null = null, fulfillmentMethod?: string): Promise<{cartId: string}> => {
  const searchParams = fulfillmentMethod ? `fulfillmentMethod=${fulfillmentMethod}` : "";
  const cartData = {
    marketplaceId: null,
    searchParams: searchParams,
    currentCartId: currentCartId,
  };
  return postData(`/api/v1/locations/${locationId}/carts`, cartData);
};

// Set table service fulfillment
export const setTableService = async (locationId: string, cartId: string, tableNumber: string) => {
  return putData(`/api/v1/locations/${locationId}/carts/${cartId}/set-table`, { tableNumber });
};

// Set room service fulfillment
export const setRoomService = async (locationId: string, cartId: string, lastName: string, roomNumber: string) => {
  return putData(`/api/v1/locations/${locationId}/carts/${cartId}/set-room`, { lastName, roomNumber });
};
