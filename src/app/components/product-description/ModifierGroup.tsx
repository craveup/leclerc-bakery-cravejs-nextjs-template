import React from "react";
import { Modifier, SelectedModifierTypes } from "@/types/menu-types";
import ModifierGroupSection from "./ModifierGroupItem";

interface ModifierGroupProps {
  modifiers: Modifier[];
  selections: SelectedModifierTypes[];
  setSelections: React.Dispatch<React.SetStateAction<SelectedModifierTypes[]>>;
  disabled?: boolean;
  errorModifierGroupId?: string;
  onGroupInteract?: (groupId?: string) => void;
}

const ModifierGroup = ({
  modifiers,
  selections,
  setSelections,
  disabled,
  errorModifierGroupId,
  onGroupInteract,
}: ModifierGroupProps) => {
  const updateGroupSelection = (groupId: string, next?: SelectedModifierTypes) => {
    setSelections((prev) => {
      const others = prev.filter((group) => group.groupId !== groupId);
      if (!next || next.selectedOptions.length === 0) {
        return others;
      }
      return [...others, next];
    });
  };

  return (
    <div className="space-y-3">
      {modifiers.map((modifier) => {
        const selection = selections.find((selected) => selected.groupId === modifier.id);
        return (
          <ModifierGroupSection
            key={modifier.id}
            modifier={modifier}
            selection={selection}
            onChange={(next) => updateGroupSelection(modifier.id, next)}
            disabled={disabled}
            errorGroupId={errorModifierGroupId}
            onGroupInteract={onGroupInteract}
          />
        );
      })}
    </div>
  );
};

export default ModifierGroup;
