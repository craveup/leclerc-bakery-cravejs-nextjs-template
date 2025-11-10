import { createStorefrontClient } from "@craveup/storefront-sdk";
import { getAuthToken } from "@/lib/local-storage";

const apiKey = process.env.NEXT_PUBLIC_CRAVEUP_API_KEY;

if (!apiKey) {
  throw new Error(
    "NEXT_PUBLIC_CRAVEUP_API_KEY must be defined to initialize the storefront SDK client.",
  );
}

export const storefrontClient = createStorefrontClient({
  apiKey,
  getAuthToken,
});
