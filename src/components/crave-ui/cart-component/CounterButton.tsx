"use client";

import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface CounterButtonProps {
  quantity: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
  isLoading: boolean;
}

const CounterButton = ({
  quantity,
  onDecrease,
  onIncrease,
  isLoading,
}: CounterButtonProps) => {
  return (
    <div className="flex max-w-[110px] flex-1 items-center">
      <Button
        onClick={onDecrease}
        type="button"
        disabled={isLoading}
        size="icon"
        variant="outline"
      >
        {quantity === 1 ? <Trash2 /> : <Minus />}
      </Button>
      <div className="flex w-[40px] flex-1 justify-center text-center">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <p className="text-sm font-normal">{quantity}</p>
        )}
      </div>
      <Button
        onClick={onIncrease}
        type="button"
        disabled={isLoading}
        variant="outline"
        size="icon"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default CounterButton;
