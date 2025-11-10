"use client";

import clsx from "clsx";
import { useApiResource } from "@/hooks/useApiResource";
import { ProductDescriptionProps } from "@/types/common";
import ProductDescriptionSkeleton from "./ProductDescriptionSkeleton";
import { Button } from "@/components/ui/button";
import ProductDescription from "./ProductDescription";
import ErrorMessage from "@/components/ui/ErrorMessage";

export function ProductDescriptionScreen({
  onClose,
  productId,
  locationId,
  cartId,
  isAddToCartBlocked,
}: ProductDescriptionProps) {
  const { data, error, mutate, isLoading } = useApiResource<any>(
    `/api/v1/locations/${locationId}/products/${productId}`,
  );

  const handleRetry = () => {
    mutate();
  };

  if (isLoading) {
    return (
      <div className="w-full pb-4">
        <ProductDescriptionSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={clsx(
          "w-full",
          "flex h-full flex-col items-center justify-center",
        )}
      >
        <ErrorMessage message="Failed to load data. Please try again later." />
        <Button onClick={handleRetry} className="mt-8 !w-1/2">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <ProductDescription
      isAddToCartBlocked={isAddToCartBlocked}
      product={data}
      cartId={cartId}
      closeBottomSheet={onClose}
    />
  );
}
