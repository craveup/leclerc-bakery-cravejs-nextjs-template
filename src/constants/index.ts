const fallbackApiBase =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.NEXT_PUBLIC_CRAVEUP_STOREFRONT_BASE_URL ??
  "";

export const STORE_FRONT_API_BASE_URL = fallbackApiBase;
export const ADMIN_API_BASE_URL = fallbackApiBase;
export const GOOGLE_MAP_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
export const NEXT_PUBLIC_STOREFRONT_URL =
  process.env.NEXT_PUBLIC_STOREFRONT_URL ?? "";

export const location_Id = process.env.NEXT_PUBLIC_LOCATION_ID as string;
export const DEFAULT_FULFILLMENT_METHOD = "takeout";

export const imagePlaceholder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAE7AQMAAAA7IG32AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRFysrKceY6JgAAAC5JREFUeJztwQENAAAAwqD3T20PBxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwI8BXYQAAeEOeqIAAAAASUVORK5CYII=";

export const SWR_CONFIG = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  keepPreviousData: true,
};
