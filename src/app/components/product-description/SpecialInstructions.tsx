import React, { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import useDisclosure from "@/hooks/use-disclosure";
import SimpleDialog from "@/components/ui/SimpleDialog";

interface SpecialInstructionsProps {
  specialInstructions: string;
  setSpecialInstructions: (e: any) => void;
  disabled?: boolean;
  maxLength?: number;
}

const SpecialInstructions = ({
  specialInstructions,
  setSpecialInstructions,
  disabled = false,
  maxLength = 240,
}: SpecialInstructionsProps) => {
  const [specialIns, setSpecialIns] = useState(specialInstructions);
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => setSpecialIns(specialInstructions), [specialInstructions]);

  const remaining = useMemo(
    () => maxLength - specialIns.length,
    [maxLength, specialIns],
  );
  const overLimit = remaining < 0;

  const unchanged = specialIns.trim() === (specialInstructions ?? "").trim();

  const canSave = !disabled && !overLimit && !unchanged;

  const handleSave = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault?.();
    if (!canSave) return;
    setSpecialInstructions(specialIns.trim());
    onClose();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e,
  ) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (canSave) setSpecialInstructions(specialIns.trim());
      if (canSave) onClose();
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={onOpen}
        className="my-4 flex w-full items-center justify-between px-4"
      >
        <p className="text-xl font-semibold">Special Instructions</p>
        <Plus size={20} />
      </button>

      <SimpleDialog
        title="Enter special instructions"
        actionButtonText="Save"
        actionButtonFormId="special-instructions-form"
        isOpen={isOpen}
        onClick={handleSave}
        className="h-auto"
        onClose={() => {
          setSpecialIns(specialInstructions);
          onClose();
        }}
      >
        <form
          id="special-instructions-form"
          onSubmit={handleSave}
          className="flex h-full w-full flex-col justify-between"
        >
          <div
            className="
              flex-1 overflow-y-auto
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
            "
          >
            <Textarea
              placeholder="Enter special instructions"
              value={specialIns}
              rows={6}
              maxLength={maxLength}
              onChange={(e) => setSpecialIns(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{Math.max(0, remaining)} characters left</span>
              {overLimit && <span className="text-red-500">Too long</span>}
            </div>
          </div>
        </form>
      </SimpleDialog>
    </div>
  );
};

export default SpecialInstructions;
