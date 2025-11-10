import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDescriptionSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[300px] w-full rounded-xl" />
      <div className="space-y-2 px-2.5">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default ProductDescriptionSkeleton;
