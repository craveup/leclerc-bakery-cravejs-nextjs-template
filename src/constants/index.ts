const resolveStorefrontBaseUrl = () => {
  const envOverride = process.env.NEXT_PUBLIC_CRAVEUP_API_BASE_URL?.trim();
  if (envOverride) return envOverride;
  return process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://api.craveup.com";
};

export const STORE_FRONT_API_BASE_URL = resolveStorefrontBaseUrl();
export const GOOGLE_MAP_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
export const CRAVEUP_PUBLIC_API_KEY =
  process.env.NEXT_PUBLIC_CRAVEUP_API_KEY ?? "";
export const location_Id = process.env.NEXT_PUBLIC_LOCATION_ID ?? "";
export const DEFAULT_FULFILLMENT_METHOD = "takeout";

export const imagePlaceholder =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAE7AQMAAAA7IG32AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAANQTFRFysrKceY6JgAAAC5JREFUeJztwQENAAAAwqD3T20PBxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwI8BXYQAAeEOeqIAAAAASUVORK5CYII=";

export const SWR_CONFIG = {
  revalidateIfStale: true,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  keepPreviousData: true,
};
