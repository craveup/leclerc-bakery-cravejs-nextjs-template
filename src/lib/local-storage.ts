import { DEFAULT_FULFILLMENT_METHOD } from "@/constants";

const CART_KEY_PREFIX = "leclerc-cart:";

const normalizeLocation = (locationId: string) => locationId?.trim() ?? "";
const normalizeMethod = (method?: string) =>
  (method ?? DEFAULT_FULFILLMENT_METHOD).trim().toLowerCase() || DEFAULT_FULFILLMENT_METHOD;

const buildCartKey = (locationId: string, fulfillmentMethod?: string) =>
  `${CART_KEY_PREFIX}${normalizeLocation(locationId)}:${normalizeMethod(fulfillmentMethod)}`;

export function getCartId(locationId: string, fulfillmentMethod = DEFAULT_FULFILLMENT_METHOD) {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(buildCartKey(locationId, fulfillmentMethod)) ?? "";
}

export function setCartId(
  locationId: string,
  cartId: string,
  fulfillmentMethod = DEFAULT_FULFILLMENT_METHOD,
) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(buildCartKey(locationId, fulfillmentMethod), cartId);
}

export function removeCartCartId(
  locationId: string,
  fulfillmentMethod = DEFAULT_FULFILLMENT_METHOD,
) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(buildCartKey(locationId, fulfillmentMethod));
}

export function clearCartIdsForLocation(locationId: string) {
  if (typeof window === "undefined") {
    return;
  }

  const prefix = `${CART_KEY_PREFIX}${normalizeLocation(locationId)}:`;
  for (let idx = window.localStorage.length - 1; idx >= 0; idx -= 1) {
    const key = window.localStorage.key(idx);
    if (key && key.startsWith(prefix)) {
      window.localStorage.removeItem(key);
    }
  }
}

const keyName = "authToken";

export function getAuthToken() {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(keyName);
  }

  return "";
}

export function setAuthToken(token: string) {
  if (typeof window !== "undefined") {
    return window.localStorage.setItem(keyName, token);
  }
}

export function deleteAuthToken() {
  if (typeof window !== "undefined") {
    return window.localStorage.removeItem(keyName);
  }
}
