import React, { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMediaQuery } from "@/hooks/use-media-query";
import { imagePlaceholder } from "@/constants";
import {
  ProductDescription as ProductDescriptionType,
  SelectedModifierTypes,
} from "@/types/menu-types";
import ModifierGroup from "./ModifierGroup";
import ItemUnavailableAction from "./ItemUnavailableAction";
import SpecialInstructions from "./SpecialInstructions";
import ProductDescriptionActionButton from "./ProductDescriptionActionButton";
import ShowMoreText from "../ShowMoreText";
import { ItemUnavailableActions } from "@/types/common";

interface AddToCartScreenProps {
  product: ProductDescriptionType;
  closeBottomSheet?: () => void;
  cartId: string;
  isAddToCartBlocked?: boolean;
}

const ProductDescription = ({
  product,
  closeBottomSheet,
  cartId,
  isAddToCartBlocked = false,
}: AddToCartScreenProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selections, setSelections] = useState<SelectedModifierTypes[]>([]);
  const [itemUnavailableAction, setItemUnavailableAction] = useState(
    ItemUnavailableActions.REMOVE_ITEM,
  );

  const [errorModifierGroupId, setErrorModifierGroupId] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState<string>("");
  const { images, name, description } = product;
  const imageURL = images[0];
  const modifiers = useMemo(() => product?.modifiers ?? [], [product]);
  const handleModifierGroupInteract = (groupId?: string) => {
    if (!errorModifierGroupId) return;
    if (!groupId || groupId === errorModifierGroupId) {
      setErrorModifierGroupId("");
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div
        className="flex-1 overflow-auto scrollbar-hide"
        id="product-description-section"
      >
        <div className="relative min-h-10 w-full">
          {imageURL && (
            <div className="relative h-[400px]">
              <Image
                src={imageURL}
                className="object-cover"
                alt="product image"
                placeholder="blur"
                fill
                blurDataURL={imagePlaceholder}
              />
            </div>
          )}
          {!isDesktop && (
            <Button
              onClick={closeBottomSheet}
              className="absolute top-2.5 left-3 rounded-full"
              size="icon"
              variant="outline"
            >
              <ArrowLeft />
            </Button>
          )}
        </div>
        <div className={`px-4 ${imageURL ? "py-4" : "pt-8"} mb-3`}>
          <p className="text-3xl font-semibold mb-2">{name}</p>
          {description && (
            <ShowMoreText
              text={description as string}
              className="text-base sm:text-sm text-gray-700 dark:text-gray-300"
            />
          )}
        </div>
        <Separator />

        <ModifierGroup
          modifiers={modifiers}
          selections={selections}
          setSelections={setSelections}
          disabled={isAddToCartBlocked}
          errorModifierGroupId={errorModifierGroupId}
          onGroupInteract={handleModifierGroupInteract}
        />

        <ItemUnavailableAction
          itemUnavailableAction={itemUnavailableAction}
          setItemUnavailableAction={setItemUnavailableAction}
          disabled={isAddToCartBlocked}
        />

        <SpecialInstructions
          specialInstructions={specialInstructions}
          setSpecialInstructions={setSpecialInstructions}
          disabled={isAddToCartBlocked}
        />
      </div>
      <div className="px-4 py-6">
        {isAddToCartBlocked ? (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="shrink-0">
                <Info aria-hidden="true" className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  This product is currently not available
                </h3>
              </div>
            </div>
          </div>
        ) : (
          <ProductDescriptionActionButton
            cartItem={product}
            closeBottomSheet={closeBottomSheet}
            selections={selections}
            setErrorModifierGroupId={setErrorModifierGroupId}
            specialInstructions={specialInstructions}
            itemUnavailableAction={itemUnavailableAction}
            cartId={cartId}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
