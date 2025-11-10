import { useCart } from "@/hooks/useCart";
import { useApiResource } from "@/hooks/useApiResource";
import type { MenusResponse } from "@/types/menus";
import { location_Id as DEFAULT_LOCATION_ID } from "@/constants";

type UseMenusOptions = {
  locationId?: string;
  isEnabled?: boolean;
};

const useMenus = ({ locationId: overrideLocationId, isEnabled = true }: UseMenusOptions = {}) => {
  const { cart, cartId, locationId: cartLocationId } = useCart({
    locationId: overrideLocationId ?? undefined,
  });

  const locationId = overrideLocationId ?? cartLocationId ?? cart?.locationId ?? DEFAULT_LOCATION_ID;
  const orderDate = cart?.orderDate;
  const orderTime = cart?.orderTime;

  const shouldFetch = Boolean(
    isEnabled && locationId && cartId && orderDate && orderTime,
  );

  const endpoint = shouldFetch
    ? `/api/v1/locations/${locationId}/menus?orderDate=${orderDate}&orderTime=${orderTime}`
    : null;

  return useApiResource<MenusResponse>(endpoint, { shouldFetch });
};

export default useMenus;
