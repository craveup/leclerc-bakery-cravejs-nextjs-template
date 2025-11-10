import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ItemUnavailableActions } from "@/types/common";

interface ItemUnavailableActionProps {
  itemUnavailableAction: ItemUnavailableActions;
  setItemUnavailableAction: (
    itemUnavailableAction: ItemUnavailableActions,
  ) => void;
  disabled?: boolean;
}

function ItemUnavailableAction(props: ItemUnavailableActionProps) {
  return (
    <div className="mx-4">
      <p className="my-4 text-xl font-semibold">If Item is Unavailable...</p>

      <RadioGroup
        disabled={props.disabled}
        value={props.itemUnavailableAction}
        onValueChange={props.setItemUnavailableAction}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value={ItemUnavailableActions.REMOVE_ITEM}
            id={ItemUnavailableActions.REMOVE_ITEM}
          />
          <Label htmlFor={ItemUnavailableActions.REMOVE_ITEM}>
            Delete Item
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value={ItemUnavailableActions.CANCEL_ENTIRE_ORDER}
            id={ItemUnavailableActions.CANCEL_ENTIRE_ORDER}
          />
          <Label htmlFor={ItemUnavailableActions.CANCEL_ENTIRE_ORDER}>
            Cancel entire order
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

export default ItemUnavailableAction;
