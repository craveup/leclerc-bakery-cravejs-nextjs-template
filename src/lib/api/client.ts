// Restaurant API Client
import { apiHeaders, endpoints, handleAPIResponse, CRAVEUP_API_BASE, CraveUpAPIError } from "./config";
import type {
  Location,
  Product,
  MenuResponse,
  Cart,
  CartItem,
  TimeInterval,
  GratuitySettings,
  PaymentIntent,
  DiscountCode
} from './types'

// Location & Menu API
export const fetchLocation = async (locationId: string): Promise<Location> => {
  const response = await fetch(endpoints.location(locationId), {
    headers: apiHeaders()
  })
  return handleAPIResponse(response)
}

export const fetchMenuItems = async (
  locationId: string,
  orderDate?: string,
  orderTime?: string
): Promise<MenuResponse> => {
  const response = await fetch(endpoints.menus(locationId, orderDate, orderTime), {
    headers: apiHeaders()
  })
  return handleAPIResponse(response)
}

export const fetchProducts = async (locationId: string): Promise<Product[]> => {
  const response = await fetch(`/api/products?locationId=${locationId}`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new CraveUpAPIError(response.status, error.message || "Failed to load products");
  }
  const data = await response.json();
  const products: any[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.products)
    ? data.products
    : [];
  return products.map((product) => ({
    ...product,
    price:
      typeof product?.price === "string"
        ? parseFloat(product.price)
        : product?.price ?? 0,
  }));
};

export const fetchPopularProducts = async (locationId: string): Promise<Product[]> => {
  const response = await fetch(endpoints.popularProducts(locationId), {
    headers: apiHeaders()
  })
  const products = await handleAPIResponse(response)
  
  // Ensure prices are numbers, not strings
  return products.map((product: any) => ({
    ...product,
    price: typeof product.price === 'string' ? parseFloat(product.price) : product.price
  }))
}

export const fetchProduct = async (
  locationId: string,
  productId: string
): Promise<Product> => {
  const response = await fetch(endpoints.product(locationId, productId), {
    headers: apiHeaders()
  })
  return handleAPIResponse(response)
}

export const fetchTimeIntervals = async (locationId: string): Promise<TimeInterval[]> => {
  const response = await fetch(endpoints.timeIntervals(locationId), {
    headers: apiHeaders()
  })
  return handleAPIResponse(response)
}

export const fetchGratuitySettings = async (locationId: string): Promise<GratuitySettings> => {
  const response = await fetch(endpoints.gratuity(locationId), {
    headers: apiHeaders()
  })
  return handleAPIResponse(response)
}

// Cart Management API
export const createCart = async (locationId: string): Promise<Cart> => {
  const response = await fetch(endpoints.carts(locationId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      currentCartId: ""
    })
  })
  const result = await handleAPIResponse(response)
  
  // If the response only contains cartId, fetch the full cart
  if (result.cartId && !result.items) {
    return fetchCart(locationId, result.cartId)
  }
  
  return result
}

export const fetchCart = async (locationId: string, cartId: string): Promise<Cart> => {
  const response = await fetch(endpoints.cart(locationId, cartId))
  return handleAPIResponse(response)
}

export const updateCart = async (
  locationId: string,
  cartId: string,
  items: CartItem[]
): Promise<Cart> => {
  const response = await fetch(endpoints.cart(locationId, cartId), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ items })
  })
  return handleAPIResponse(response)
}

export const deleteCart = async (locationId: string, cartId: string): Promise<void> => {
  const response = await fetch(endpoints.cart(locationId, cartId), {
    method: 'DELETE'
  })
  return handleAPIResponse(response)
}

export const updateCartGratuity = async (
  locationId: string,
  cartId: string,
  gratuity: number
): Promise<Cart> => {
  const response = await fetch(endpoints.cartGratuity(locationId, cartId), {
    method: 'PUT',
    headers: apiHeaders(),
    body: JSON.stringify({ gratuity })
  })
  return handleAPIResponse(response)
}

export const setDeliveryAddress = async (
  locationId: string,
  cartId: string,
  address: any
): Promise<Cart> => {
  const response = await fetch(endpoints.cartDelivery(locationId, cartId), {
    method: 'PUT',
    headers: apiHeaders(),
    body: JSON.stringify({ address })
  })
  return handleAPIResponse(response)
}

export const setTableNumber = async (
  locationId: string,
  cartId: string,
  tableNumber: string
): Promise<Cart> => {
  const response = await fetch(endpoints.cartTable(locationId, cartId), {
    method: 'PUT',
    headers: apiHeaders(),
    body: JSON.stringify({ tableNumber })
  })
  return handleAPIResponse(response)
}

export const setRoomService = async (
  locationId: string,
  cartId: string,
  roomNumber: string
): Promise<Cart> => {
  const response = await fetch(endpoints.cartRoom(locationId, cartId), {
    method: 'PUT',
    headers: apiHeaders(),
    body: JSON.stringify({ roomNumber })
  })
  return handleAPIResponse(response)
}

export const validateAndUpdateCart = async (
  locationId: string,
  cartId: string,
  customerData: {
    customerName?: string
    emailAddress?: string
    phoneNumber?: string
  }
): Promise<Cart> => {
  const response = await fetch(endpoints.cartValidate(locationId, cartId), {
    method: 'PUT',
    headers: apiHeaders(),
    body: JSON.stringify(customerData)
  })
  return handleAPIResponse(response)
}

// Payment API
export const createPaymentIntent = async (
  locationId: string,
  cartId: string
): Promise<PaymentIntent> => {
  const response = await fetch(endpoints.paymentIntent(locationId, cartId), {
    headers: apiHeaders()
  })
  return handleAPIResponse(response)
}

// Discount API
export const applyDiscountCode = async (
  locationId: string,
  code: string,
  cartId: string
): Promise<DiscountCode> => {
  const response = await fetch(endpoints.applyDiscount(locationId), {
    method: 'POST',
    headers: apiHeaders(),
    body: JSON.stringify({ code, cartId })
  })
  return handleAPIResponse(response)
}

export const removeDiscountCode = async (
  locationId: string,
  cartId: string
): Promise<void> => {
  const response = await fetch(endpoints.removeDiscount(locationId), {
    method: 'DELETE',
    headers: apiHeaders(),
    body: JSON.stringify({ cartId })
  })
  return handleAPIResponse(response)
}

// Helper functions
export const addItemToCart = async (
  locationId: string,
  cartId: string,
  product: Product,
  quantity: number = 1,
  modifiers?: any[],
  specialInstructions?: string
): Promise<Cart> => {
  const requestBody = {
    id: product._id || product.id,
    quantity,
    specialInstructions: specialInstructions || '',
    itemUnavailableAction: 'remove_item',
    selectedModifiers: modifiers || []
  }
  
  const url = `${CRAVEUP_API_BASE}/api/v1/locations/${locationId}/carts/${cartId}/cart-item`
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...apiHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  
  if (!response.ok) {
    const errorText = await response.text()
    throw new CraveUpAPIError(response.status, errorText)
  }
  
  return handleAPIResponse(response)
}

export const updateCartItemQuantity = async (
  locationId: string,
  cartId: string,
  itemId: string,
  quantity: number
): Promise<Cart> => {
  const cart = await fetchCart(locationId, cartId)
  
  const updatedItems = cart.items.map(item =>
    item.id === itemId ? { ...item, quantity, total: (parseFloat(item.price) * quantity).toString() } : item
  ).filter(item => item.quantity > 0) // Remove items with 0 quantity
  
  return updateCart(locationId, cartId, updatedItems)
}

export const removeCartItem = async (
  locationId: string,
  cartId: string,
  itemId: string
): Promise<Cart> => {
  return updateCartItemQuantity(locationId, cartId, itemId, 0)
}
