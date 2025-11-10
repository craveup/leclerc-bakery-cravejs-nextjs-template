import type { RequestConfig } from "@craveup/storefront-sdk";
import {
  apiDelete,
  apiFetch,
  apiPatch,
  apiPost,
  apiPut,
  swrFetcher,
} from "@/lib/api/fetcher";

export const fetcherSWR = <T = unknown>(endpoint: string) =>
  swrFetcher<T>(endpoint);

export const fetchData = async <T = unknown>(
  endpoint: string,
  _baseUrl?: string,
  _revalidateTime?: number,
  config?: RequestConfig,
) => {
  return apiFetch<T>(endpoint, config);
};

export const postData = async <T = unknown>(
  endpoint: string,
  data: Record<string, any>,
  _baseUrl?: string,
  config?: RequestConfig,
) => {
  return apiPost<T>(endpoint, data, config);
};

export const putData = async <T = unknown>(
  endpoint: string,
  data: Record<string, any>,
  _baseUrl?: string,
  config?: RequestConfig,
) => {
  return apiPut<T>(endpoint, data, config);
};

export const patchData = async <T = unknown>(
  endpoint: string,
  data: Record<string, any>,
  _baseUrl?: string,
  config?: RequestConfig,
) => {
  return apiPatch<T>(endpoint, data, config);
};

export const deleteData = async <T = unknown>(
  endpoint: string,
  data?: Record<string, any>,
  _baseUrl?: string,
  config?: RequestConfig,
) => {
  return apiDelete<T>(endpoint, data, config);
};
