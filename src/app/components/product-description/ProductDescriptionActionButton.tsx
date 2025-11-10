"use client";

import React, { useState } from "react";
import { scroller } from "react-scroll";
import { toast } from "sonner";
import { formatApiError } from "@/lib/format-api-error";
import { postData } from "@/lib/handle-api";
import { useCart } from "@/hooks/useCart";
import { Modifier, SelectedModifierTypes } from "@/types/menu-types";
import ItemCounterButton from "./ItemCounterButton";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { location_Id as LOCATION_ID } from "@/constants";
import { ItemUnavailableActions } from "@/types/common";

const mergeRuleOverrides = (
  group: Modifier,
  overrides?: Partial<Modifier["rule"]>,
): Modifier => {
  if (!overrides) return group;
  return {
    ...group,
    rule: {
      min: typeof overrides.min === "number" ? overrides.min : group.rule.min,
      max: typeof overrides.max === "number" ? overrides.max : group.rule.max,
    },
  };
};

const getSelectionTotal = (selection?: SelectedModifierTypes) =>
  selection?.selectedOptions.reduce((total, option) => total + option.quantity, 0) ?? 0;

const validateModifierSelection = (
  group: Modifier,
  selection?: SelectedModifierTypes,
):
  | {
      groupId: string;
      message: string;
    }
  | null => {
  const totalSelected = getSelectionTotal(selection);

  if (group.rule.min > 0 && totalSelected < group.rule.min) {
    const requiredCount = group.rule.min;
    return {
      groupId: group.id,
      message:
        requiredCount === 1
          ? `Please select an option for ${group.name}.`
          : `Please select at least ${requiredCount} options for ${group.name}.`,
    };
  }

  if (!selection) {
    return null;
  }

  for (const selectedOption of selection.selectedOptions) {
    const option = group.items.find((item) => item.id === selectedOption.optionId);
    if (!option || !option.childGroups || option.childGroups.length === 0) {
      continue;
    }

    for (const childLink of option.childGroups) {
      if (!childLink.group) continue;
      const resolvedGroup = mergeRuleOverrides(childLink.group, childLink.overrides);
      const childSelection = selectedOption.children?.find(
        (child) => child.groupId === childLink.groupId,
      );
      const childValidationResult = validateModifierSelection(resolvedGroup, childSelection);

      if (childValidationResult) {
        return childValidationResult;
      }
    }
  }

  return null;
};

const findModifierSelectionError = (
  modifiers: Modifier[],
  selections: SelectedModifierTypes[],
) => {
  for (const group of modifiers) {
    const selection = selections.find((selected) => selected.groupId === group.id);
    const validationResult = validateModifierSelection(group, selection);
    if (validationResult) {
      return validationResult;
    }
  }

  return null;
};

const ProductDescriptionActionButton = ({
  cartItem,
  selections,
  closeBottomSheet,
  setErrorModifierGroupId,
  specialInstructions,
  itemUnavailableAction,
  cartId,
}: {
  cartItem: any;
  selections: SelectedModifierTypes[];
  closeBottomSheet: any;
  setErrorModifierGroupId: (errorModifierGroupId: string) => void;
  specialInstructions: string;
  itemUnavailableAction: ItemUnavailableActions;
  cartId: string;
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const locationId = cartItem?.locationId ?? LOCATION_ID;
  const { mutate } = useCart({ locationId, cartId });

  const handleAddItemToCart = async () => {
    setErrorModifierGroupId("");
    const addItemData = {
      productId: cartItem.id,
      quantity,
      specialInstructions,
      itemUnavailableAction,
      selections,
    };
    const cart = await postData(
      `/api/v1/locations/${locationId}/carts/${cartId}/cart-item`,
      addItemData,
    );
    closeBottomSheet();
    await mutate();
    return cart;
  };

  const handleCartItem = async () => {
    const modifiers: Modifier[] = Array.isArray(cartItem?.modifiers)
      ? (cartItem.modifiers as Modifier[])
      : [];
    const modifierError = findModifierSelectionError(modifiers, selections);

    if (modifierError) {
      setErrorModifierGroupId(modifierError.groupId);
      toast.error(modifierError.message, {
        duration: 1000,
        position: "top-center",
      });
      scroller.scrollTo(modifierError.groupId, {
        containerId: "product-description-section",
        duration: 500,
        delay: 100,
        smooth: true,
        offset: -90,
      });
      return;
    }

    setIsLoading(true);

    try {
      await handleAddItemToCart();
      toast.success(`${cartItem.name} added to cart`, {
        position: "top-center",
        duration: 600,
      });
    } catch (error) {
      const formattedError = formatApiError(error);

      toast.error(formattedError.message, { duration: 600 });

      if (!(formattedError as any).data) return;

      const formattedErrorData = (formattedError as any).data as any;

      if (formattedErrorData.modifierGroupId) {
        setErrorModifierGroupId(formattedErrorData.modifierGroupId);
        scroller.scrollTo(formattedErrorData.modifierGroupId, {
          containerId: "product-description-section",
          duration: 500,
          delay: 100,
          smooth: true,
          offset: -90,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex-1">
        <ItemCounterButton
          value={quantity}
          onIncrease={(event) => {
            event.preventDefault();
            setQuantity((prev) => prev + 1);
          }}
          onDecrease={(event) => {
            event.preventDefault();
            setQuantity((prev) => Math.max(1, prev - 1));
          }}
          minValue={1}
          disabled={isLoading}
        />
      </div>
      <LoadingButton
        type="button"
        className="w-40"
        loading={isLoading}
        onClick={handleCartItem}
      >
        {`Add ${quantity} to cart`}
      </LoadingButton>
    </div>
  );
};

export default ProductDescriptionActionButton;
