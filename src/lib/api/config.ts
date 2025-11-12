import {
  STORE_FRONT_API_BASE_URL,
  CRAVEUP_PUBLIC_API_KEY,
} from "@/constants";

// CraveUp API Configuration
export const CRAVEUP_API_BASE = STORE_FRONT_API_BASE_URL;

// Lazy API key getter - only throws when actually used
export const getApiKey = () => {
  const apiKey = CRAVEUP_PUBLIC_API_KEY;
  if (!apiKey) {
    // Only warn on server side when actually making API calls
    if (typeof window === "undefined") {
      console.warn(
        "NEXT_PUBLIC_CRAVEUP_API_KEY not found. API features will not work.",
      );
    }
    return "";
  }
  return apiKey;
};

// For backward compatibility - use getApiKey() function instead
export const API_KEY = ''

export const apiHeaders = () => ({
  'X-API-Key': getApiKey(),
  'Content-Type': 'application/json'
})

export class CraveUpAPIError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'CraveUpAPIError'
  }
}

export const handleAPIResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }))
    throw new CraveUpAPIError(response.status, error.message || 'API request failed')
  }
  return response.json()
}

// API endpoint builders - using local API routes to avoid CORS issues
export const endpoints = {
  location: (locationId: string) => `${CRAVEUP_API_BASE}/api/v1/locations/${locationId}`,
  menus: (locationId: string, orderDate?: string, orderTime?: string) => {
    const params = new URLSearchParams()
    if (orderDate) params.append('orderDate', orderDate)
    if (orderTime) params.append('orderTime', orderTime)
    return `${CRAVEUP_API_BASE}/api/v1/locations/${locationId}/menus?${params.toString()}`
  },
  products: (locationId: string) => `/api/products?locationId=${locationId}`,
  popularProducts: (locationId: string) => `${CRAVEUP_API_BASE}/api/v1/locations/${locationId}/products/popular`,
  product: (locationId: string, productId: string) => `${CRAVEUP_API_BASE}/api/v1/locations/${locationId}/products/${productId}`,
  timeIntervals: (locationId: string) => `${CRAVEUP_API_BASE}/api/v1/locations/${locationId}/time-intervals`,
  gratuity: (locationId: string) => `${CRAVEUP_API_BASE}/api/v1/locations/${locationId}/gratuity`,
  
  // Cart endpoints
  carts: (locationId: string) => `/api/carts?locationId=${locationId}`,
  cart: (locationId: string, cartId: string) => `/api/carts/${cartId}?locationId=${locationId}`,
  cartGratuity: (locationId: string, cartId: string) => `${CRAVEUP_API_BASE}/api/v1/locations/${locationId}/carts/${cartId}/gratuity`,
  cartDelivery: (locationId: string, cartId: string) => `${CRAVEUP_API_BASE}/api/v1/locations/${locationId}/carts/${cartId}/set-delivery`,
  cartTable: (locationId: string, cartId: string) => `${CRAVEUP_API_BASE}/api/v1/locations/${locationId}/carts/${cartId}/set-table`,
  cartRoom: (locationId: string, cartId: string) => `${CRAVEUP_API_BASE}/api/v1/locations/${locationId}/carts/${cartId}/set-room`,
  cartOrderTime: (locationId: string, cartId: string) => `${CRAVEUP_API_BASE}/api/v1/locations/${locationId}/carts/${cartId}/update-order-time`,
  cartValidate: (locationId: string, cartId: string) => `${CRAVEUP_API_BASE}/api/v1/locations/${locationId}/cart/${cartId}/validate-and-update`,
  
  // Payment endpoints
  paymentIntent: (locationId: string, cartId: string) => `${CRAVEUP_API_BASE}/api/v1/stripe/payment-intent?locationId=${locationId}&cartId=${cartId}`,
  
  // Discount endpoints
  applyDiscount: (locationId: string) => `${CRAVEUP_API_BASE}/api/v1/locations/${locationId}/discounts/apply-discount`,
  removeDiscount: (locationId: string) => `${CRAVEUP_API_BASE}/api/v1/locations/${locationId}/discounts/apply-discount`
}
