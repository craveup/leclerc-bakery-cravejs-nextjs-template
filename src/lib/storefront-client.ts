import { createStorefrontClient } from "@craveup/storefront-sdk";
import { getAuthToken } from "@/lib/local-storage";
import { CRAVEUP_PUBLIC_API_KEY } from "@/constants";

const apiKey = CRAVEUP_PUBLIC_API_KEY;

// The reserved .invalid host keeps keyless visual-reference builds offline.
export const storefrontClient = apiKey
  ? createStorefrontClient({ apiKey, getAuthToken })
  : createStorefrontClient({
      apiKey: "legacy-reference-disabled",
      baseUrl: "https://legacy-reference.invalid",
    });
