import { createStorefrontClient } from "@craveup/storefront-sdk";
import { getAuthToken } from "@/lib/local-storage";
import { CRAVEUP_PUBLIC_API_KEY } from "@/constants";

const apiKey = CRAVEUP_PUBLIC_API_KEY;

if (!apiKey) {
  throw new Error(
    "NEXT_PUBLIC_CRAVEUP_API_KEY must be defined to initialize the storefront SDK client."
  );
}

export const storefrontClient = createStorefrontClient({
  apiKey,
  getAuthToken,
});
