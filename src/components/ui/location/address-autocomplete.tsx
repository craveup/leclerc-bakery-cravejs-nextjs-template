"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Extend Window interface to include google
declare global {
  interface Window {
    google?: {
      maps?: {
        places?: {
          AutocompleteService: new () => {
            getPlacePredictions: (
              request: any,
              callback: (predictions: any, status: any) => void,
            ) => void;
          };
          PlacesService: new (map: any) => {
            getDetails: (
              request: any,
              callback: (result: any, status: any) => void,
            ) => void;
          };
          PlacesServiceStatus: {
            OK: string;
            ZERO_RESULTS: string;
          };
          PlaceResult: any;
        };
      };
    };
    __googleMapsLoadPromise?: Promise<void>;
  }
}

// Type alias for Google Places API types
type GooglePlacesService = {
  getDetails: (request: any, callback: (result: any, status: any) => void) => void;
};

type GoogleAutocompleteService = {
  getPlacePredictions: (request: any, callback: (predictions: any, status: any) => void) => void;
};

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  lat?: number;
  lng?: number;
  formattedAddress: string;
}

export interface AddressAutocompleteProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onError' | 'defaultValue' | 'required' | 'disabled'> {
  onAddressSelect: (address: Address) => void;
  onError?: (error: string) => void;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  googleMapsApiKey?: string;
  variant?: "default" | "compact";
  "data-testid"?: string;
}

interface PlacePrediction {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

export function AddressAutocomplete({
  onAddressSelect,
  onError,
  placeholder = "Enter your address",
  defaultValue = "",
  required = false,
  disabled = false,
  googleMapsApiKey,
  variant = "default",
  className,
  id,
  "data-testid": dataTestId
}: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = React.useState(defaultValue);
  const [predictions, setPredictions] = React.useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState<Address | null>(
    null
  );
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = React.useState(false);

  const autocompleteService =
    React.useRef<GoogleAutocompleteService | null>(null);
  const placesService = React.useRef<GooglePlacesService | null>(
    null
  );
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Load Google Maps API once per page
  React.useEffect(() => {
    if (!googleMapsApiKey || isGoogleMapsLoaded) return;

    if (window.google?.maps?.places) {
      setIsGoogleMapsLoaded(true);
      return;
    }

    const loadPromise =
      window.__googleMapsLoadPromise ||
      (() => {
        const promise = new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`;
          script.async = true;
          script.defer = true;
          script.dataset.googleMaps = "true";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load Google Maps"));
          document.head.appendChild(script);
        });
        window.__googleMapsLoadPromise = promise;
        return promise;
      })();

    loadPromise
      .then(() => {
        if (window.google?.maps) {
          setIsGoogleMapsLoaded(true);
        }
      })
      .catch(() => onError?.("Failed to load Google Maps"));
  }, [googleMapsApiKey, isGoogleMapsLoaded, onError]);

  // Initialize Google Maps services
  React.useEffect(() => {
    if (!isGoogleMapsLoaded) return;

    if (window.google?.maps?.places) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();

      // Create a hidden div for PlacesService
      const div = document.createElement("div");
      placesService.current = new window.google.maps.places.PlacesService(div);
    }
  }, [isGoogleMapsLoaded]);

  // Handle input change and fetch predictions
  const handleInputChange = React.useCallback(
    (value: string) => {
      setInputValue(value);
      setSelectedAddress(null);

      if (!autocompleteService.current || value.length < 3) {
        setPredictions([]);
        setShowDropdown(false);
        return;
      }

      setIsLoading(true);

      const request = {
        input: value,
        types: ["address"],
        componentRestrictions: { country: "us" }, // Customize as needed
      };

      autocompleteService.current.getPlacePredictions(
        request,
        (predictions, status) => {
          setIsLoading(false);

          if (
            status === window.google?.maps?.places?.PlacesServiceStatus.OK &&
            predictions
          ) {
            setPredictions(predictions);
            setShowDropdown(true);
          } else {
            setPredictions([]);
            setShowDropdown(false);
            if (
              status !== window.google?.maps?.places?.PlacesServiceStatus.ZERO_RESULTS
            ) {
              onError?.("Error fetching address suggestions");
            }
          }
        }
      );
    },
    [onError]
  );

  // Handle address selection
  const handleAddressSelect = React.useCallback(
    (prediction: PlacePrediction) => {
      if (!placesService.current) return;

      setIsLoading(true);
      setShowDropdown(false);
      setInputValue(prediction.description);

      const request = {
        placeId: prediction.place_id,
        fields: ["address_components", "formatted_address", "geometry"],
      };

      placesService.current.getDetails(request, (place, status) => {
        setIsLoading(false);

        if (status === window.google?.maps?.places?.PlacesServiceStatus.OK && place) {
          const address = parseGooglePlaceToAddress(place);
          setSelectedAddress(address);
          onAddressSelect(address);
        } else {
          onError?.("Error getting address details");
        }
      });
    },
    [onAddressSelect, onError]
  );

  // Parse Google Place to our Address interface
  const parseGooglePlaceToAddress = (
    place: any
  ): Address => {
    const components = place.address_components || [];

    const getComponent = (type: string) => {
      const component = components.find((c: any) => c.types.includes(type));
      return component?.long_name || "";
    };

    const getShortComponent = (type: string) => {
      const component = components.find((c: any) => c.types.includes(type));
      return component?.short_name || "";
    };

    return {
      street:
        `${getComponent("street_number")} ${getComponent("route")}`.trim(),
      city: getComponent("locality") || getComponent("sublocality"),
      state: getShortComponent("administrative_area_level_1"),
      zipCode: getComponent("postal_code"),
      country: getShortComponent("country"),
      lat: place.geometry?.location?.lat(),
      lng: place.geometry?.location?.lng(),
      formattedAddress: place.formatted_address || "",
    };
  };

  // Handle click outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isCompact = variant === "compact";

  return (
    <div className={cn("relative w-full", className)} id={id} data-testid={dataTestId}>
      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 flex items-center">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : selectedAddress ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <MapPin className="h-4 w-4 text-muted-foreground" />
          )}
        </div>

        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled || !isGoogleMapsLoaded}
          className={cn(
            "pl-12 pr-4",
            selectedAddress && "text-green-900 bg-green-50 border-green-200",
            isCompact && "h-9 text-sm"
          )}
          autoComplete="off"
        />
      </div>

      {/* Predictions Dropdown */}
      {showDropdown && predictions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {predictions.map((prediction) => (
            <button
              key={prediction.place_id}
              type="button"
              onClick={() => handleAddressSelect(prediction)}
              className="w-full text-left px-4 py-3 hover:bg-accent focus:bg-accent focus:outline-none first:rounded-t-md last:rounded-b-md"
            >
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div
                    className={cn(
                      "font-medium text-foreground",
                      isCompact ? "text-sm" : "text-base"
                    )}
                  >
                    {prediction.structured_formatting.main_text}
                  </div>
                  <div
                    className={cn(
                      "text-muted-foreground",
                      isCompact ? "text-xs" : "text-sm"
                    )}
                  >
                    {prediction.structured_formatting.secondary_text}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Error state for when Google Maps fails to load */}
      {!isGoogleMapsLoaded && !googleMapsApiKey && (
        <div className="absolute top-full left-0 right-0 mt-1 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-sm text-destructive">
            Google Maps API key is required for address autocomplete
          </p>
        </div>
      )}
    </div>
  );
}

// Fallback component when Google Maps is not available
export function AddressInput({
  onAddressSelect,
  placeholder = "Enter your address",
  defaultValue = "",
  required = false,
  disabled = false,
  className,
  id,
  "data-testid": dataTestId
}: Omit<AddressAutocompleteProps, "googleMapsApiKey">) {
  const [value, setValue] = React.useState(defaultValue);

  const handleSubmit = () => {
    if (value.trim()) {
      // Parse manual address input
      const address: Address = {
        street: value,
        city: "",
        state: "",
        zipCode: "",
        country: "",
        formattedAddress: value,
      };
      onAddressSelect(address);
    }
  };

  return (
    <div className={cn("relative w-full", className)} id={id} data-testid={dataTestId}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute left-3 top-0 bottom-0 flex items-center">
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className="pl-12"
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!value.trim() || disabled}
          size="sm"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
