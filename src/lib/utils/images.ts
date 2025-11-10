import { STORE_FRONT_API_BASE_URL } from "@/constants";

export const absolutizeImage = (url?: string | null) => {
  if (!url) return null;
  if (/^(https?:)?\/\//i.test(url) || url.startsWith("data:")) return url;
  const base = STORE_FRONT_API_BASE_URL;
  try {
    return new URL(url, base).toString();
  } catch {
    return url;
  }
};
