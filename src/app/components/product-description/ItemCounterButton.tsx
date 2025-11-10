import React from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ItemCounterButton = ({
  value,
  onIncrease,
  onDecrease,
  small = false,
  disabled = false,
  minValue = 0,
  maxValue,
}: {
  value: number;
  small?: boolean;
  disabled?: boolean;
  minValue?: number;
  maxValue?: number;
  onIncrease: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDecrease: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const atMin = value <= minValue;
  const atMax = typeof maxValue === "number" ? value >= maxValue : false;

  return (
    <div
      className={cn("flex items-center", small ? "space-x-1" : "space-x-2.5")}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={onDecrease}
        disabled={disabled || atMin}
        aria-label="Decrement"
        className={cn(small && "h-7 w-7")}
      >
        <Minus />
      </Button>
      <div
        className="text-md w-8 text-center font-bold tabular-nums"
        aria-live="polite"
        aria-label="Counter value"
      >
        {value}
      </div>
      <Button
        variant="outline"
        size="icon"
        onClick={onIncrease}
        disabled={disabled || atMax}
        aria-label="Increment"
        className={cn(small && "h-7 w-7")}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default ItemCounterButton;
