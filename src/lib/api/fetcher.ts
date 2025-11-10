import type { RequestConfig } from "@craveup/storefront-sdk";
import { storefrontClient } from "@/lib/storefront-client";

export { ApiError } from "@craveup/storefront-sdk";

export function apiFetch<T>(endpoint: string, options?: RequestConfig) {
  return storefrontClient.http.get<T>(endpoint, options);
}

export function apiPost<T>(endpoint: string, body?: unknown, options?: RequestConfig) {
  return storefrontClient.http.post<T>(endpoint, body, options);
}

export function apiPut<T>(endpoint: string, body?: unknown, options?: RequestConfig) {
  return storefrontClient.http.put<T>(endpoint, body, options);
}

export function apiPatch<T>(endpoint: string, body?: unknown, options?: RequestConfig) {
  return storefrontClient.http.patch<T>(endpoint, body, options);
}

export function apiDelete<T>(endpoint: string, body?: unknown, options?: RequestConfig) {
  return storefrontClient.http.delete<T>(endpoint, body, options);
}

export const swrFetcher = <T = unknown>(endpoint: string) => apiFetch<T>(endpoint);
