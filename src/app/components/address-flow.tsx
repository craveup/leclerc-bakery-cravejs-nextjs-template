"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Truck,
  Building2,
  ChevronRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddressPickerModal from "@/components/ui/location/address-picker";

export interface DeliveryOption {
  id: string;
  type: "delivery" | "pickup" | "dine-in";
  title: string;
  description: string;
  icon: React.ReactNode;
  estimatedTime: string;
  fee?: number;
  isAvailable: boolean;
}

export interface AddressFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: {
    deliveryOption: DeliveryOption;
    address?: { street: string; apartment?: string };
  }) => void;
  initialOption?: string;
}

const deliveryOptions: DeliveryOption[] = [
  // Delivery temporarily disabled
  // {
  //   id: "delivery",
  //   type: "delivery",
  //   title: "Delivery",
  //   description: "Get it delivered to your door",
  //   icon: <Truck className="h-5 w-5" />,
  //   estimatedTime: "25-35 min",
  //   fee: 2.99,
  //   isAvailable: true,
  // },
  {
    id: "pickup",
    type: "pickup",
    title: "Pickup",
    description: "Pick up from our SoHo location",
    icon: <Building2 className="h-5 w-5" />,
    estimatedTime: "15-20 min",
    fee: 0,
    isAvailable: true,
  },
  // {
  //   id: "dine-in",
  //   type: "dine-in",
  //   title: "Dine In",
  //   description: "Enjoy fresh cookies in our cafAc",
  //   icon: <MapPin className="h-5 w-5" />,
  //   estimatedTime: "Ready now",
  //   fee: 0,
  //   isAvailable: false, // Currently closed
  // },
];

export function AddressFlow({
  isOpen,
  onClose,
  onComplete,
  initialOption = "pickup",
}: AddressFlowProps) {
  const [step, setStep] = useState<"option" | "address">("option");
  const [selectedOption, setSelectedOption] = useState<string>(initialOption);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState<{
    street: string;
    apartment?: string;
  } | null>(null);

  const selectedDeliveryOption = deliveryOptions.find(
    (opt) => opt.id === selectedOption
  );

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setStep("option");
      setSelectedOption(initialOption);
      setDeliveryAddress(null);
    }
  }, [isOpen, initialOption]);

  const handleOptionNext = () => {
    if (selectedOption === "delivery") {
      setStep("address");
    } else {
      // For pickup, complete immediately
      handleComplete();
    }
  };

  const handleAddressSubmit = (address: {
    street: string;
    apartment?: string;
  }) => {
    setDeliveryAddress(address);
    setIsAddressModalOpen(false);
    // Auto-complete the flow once address is set
    setTimeout(() => handleComplete(), 200);
  };

  const handleComplete = () => {
    if (selectedDeliveryOption) {
      onComplete({
        deliveryOption: selectedDeliveryOption,
        address: deliveryAddress || undefined,
      });
    }
    onClose();
  };

  const canProceed = () => {
    if (selectedOption === "delivery") {
      return step === "option" || (step === "address" && deliveryAddress);
    }
    return selectedDeliveryOption?.isAvailable;
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="sm:max-w-lg p-0 gap-0"
          aria-describedby="address-flow-description"
        >
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-xl font-semibold">
              {step === "option"
                ? "How would you like your order?"
                : "Delivery address"}
            </DialogTitle>
            <p
              id="address-flow-description"
              className="text-sm text-muted-foreground mt-1"
            >
              {step === "option"
                ? "Choose your preferred fulfillment method"
                : "We'll deliver fresh cookies right to your door"}
            </p>
          </DialogHeader>

          <div className="px-6 pb-6">
            {step === "option" && (
              <div className="space-y-4">
                <RadioGroup
                  value={selectedOption}
                  onValueChange={setSelectedOption}
                  aria-label="Select delivery method"
                >
                  {deliveryOptions.map((option) => (
                    <div key={option.id}>
                      <Label
                        htmlFor={option.id}
                        className={`cursor-pointer ${
                          !option.isAvailable ? "cursor-not-allowed" : ""
                        }`}
                      >
                        <Card
                          className={`transition-all ${
                            selectedOption === option.id
                              ? "ring-2 ring-primary bg-primary/5"
                              : "hover:bg-muted/50"
                          } ${!option.isAvailable ? "opacity-50" : ""}`}
                          role="radio"
                          aria-checked={selectedOption === option.id}
                          aria-label={`${option.title}: ${
                            option.description
                          }. ${
                            option.fee === 0 ? "Free" : `$${option.fee} fee`
                          }. Estimated time: ${option.estimatedTime}${
                            !option.isAvailable
                              ? ". Currently unavailable."
                              : ""
                          }`}
                          tabIndex={option.isAvailable ? 0 : -1}
                          onKeyDown={(e) => {
                            if (
                              (e.key === "Enter" || e.key === " ") &&
                              option.isAvailable
                            ) {
                              e.preventDefault();
                              setSelectedOption(option.id);
                            }
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <RadioGroupItem
                                value={option.id}
                                id={option.id}
                                disabled={!option.isAvailable}
                                aria-describedby={`${option.id}-description`}
                              />
                              <div className="flex items-center gap-3 flex-1">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                                  {option.icon}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium">
                                      {option.title}
                                    </h3>
                                    {option.fee === 0 ? (
                                      <Badge
                                        variant="secondary"
                                        className="text-xs"
                                        aria-label="No additional fee"
                                      >
                                        Free
                                      </Badge>
                                    ) : (
                                      option.fee && (
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                          aria-label={`Additional fee: $${option.fee}`}
                                        >
                                          ${option.fee}
                                        </Badge>
                                      )
                                    )}
                                    {!option.isAvailable && (
                                      <Badge
                                        variant="destructive"
                                        className="text-xs"
                                        aria-label="This option is currently unavailable"
                                      >
                                        Unavailable
                                      </Badge>
                                    )}
                                  </div>
                                  <p
                                    id={`${option.id}-description`}
                                    className="text-sm text-muted-foreground"
                                  >
                                    {option.description}
                                  </p>
                                  <div
                                    className="flex items-center gap-1 mt-1"
                                    aria-label={`Estimated time: ${option.estimatedTime}`}
                                  >
                                    <Clock
                                      className="h-3 w-3 text-muted-foreground"
                                      aria-hidden="true"
                                    />
                                    <span className="text-xs text-muted-foreground">
                                      {option.estimatedTime}
                                    </span>
                                  </div>
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {/* Location info for pickup */}
                {selectedOption === "pickup" && (
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h4 className="font-medium text-sm">
                            Leclerc Bakery SoHo
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            123 Spring Street, New York, NY 10012
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Open today: 7:00 AM - 9:00 PM
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Button
                  onClick={handleOptionNext}
                  disabled={!canProceed()}
                  className="w-full"
                  size="lg"
                  aria-label={
                    selectedOption === "delivery"
                      ? "Continue to address selection"
                      : `Confirm ${
                          deliveryOptions.find(
                            (opt) => opt.id === selectedOption
                          )?.title
                        } selection`
                  }
                >
                  {selectedOption === "delivery" ? "Continue" : "Confirm"}
                </Button>
              </div>
            )}

            {step === "address" && selectedOption === "delivery" && (
              <div className="space-y-4">
                {deliveryAddress ? (
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(var(--order-success))]/10">
                            <Check className="h-4 w-4 text-[hsl(var(--order-success))]" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">
                              Delivery Address
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {deliveryAddress.street}
                              {deliveryAddress.apartment &&
                                `, ${deliveryAddress.apartment}`}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsAddressModalOpen(true)}
                        >
                          Change
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card
                    className="border-dashed border-2"
                    role="button"
                    tabIndex={0}
                  >
                    <CardContent className="p-6 text-center">
                      <MapPin
                        className="h-8 w-8 text-muted-foreground mx-auto mb-3"
                        aria-hidden="true"
                      />
                      <h3 className="font-medium mb-2">Add delivery address</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        We need your address to calculate delivery fees and time
                      </p>
                      <Button
                        onClick={() => setIsAddressModalOpen(true)}
                        variant="outline"
                        aria-label="Open address input form"
                        autoFocus
                      >
                        Enter Address
                      </Button>
                    </CardContent>
                  </Card>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep("option")}
                    className="flex-1"
                    aria-label="Go back to delivery method selection"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleComplete}
                    disabled={!deliveryAddress}
                    className="flex-1"
                    aria-label={
                      deliveryAddress
                        ? `Confirm delivery to ${deliveryAddress.street}`
                        : "Please enter delivery address first"
                    }
                  >
                    Confirm Delivery
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Address Picker Modal */}
      <AddressPickerModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onNext={handleAddressSubmit}
      />
    </>
  );
}
