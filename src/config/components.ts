import { lazy } from "react";

export const Index = {
  "menu-item-card": {
    name: "menu-item-card",
    type: "components:example",
    registryDependencies: ["menu-item-card"],
    component: lazy(
      () => import("@/components/ui/example/menu-item-card-demo")
    ),
    source: `"use client"

import { useState } from "react"
import { MenuItemCardHorizontal, MenuItemCardVertical } from "@/components/ui/menu-item-card"

export default function MenuItemCardDemo() {
  const [variant, setVariant] = useState("horizontal")

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setVariant("horizontal")}>Horizontal</button>
        <button onClick={() => setVariant("vertical")}>Vertical</button>
      </div>
      
      {variant === "horizontal" ? (
        <MenuItemCardHorizontal
          name="Karaage Chicken Katsu Sando"
          description="Crispy Japanese-style fried chicken thigh glazed with spicy miso-honey sauce, served on buttery brioche with pickled cabbage slaw, kewpie mayo, and shichimi togarashi. Inspired by Nashville heat with Japanese technique."
          price={18.00}
          rating="97%"
          reviewCount="89"
          imageUrl="/images/food/karaage-chicken-katsu-sando.jpg"
          imageAlt="Karaage Chicken Katsu Sando"
          badge="Chef's Fusion"
          onClick={() => console.log("Clicked Karaage Chicken Katsu Sando")}
        />
      ) : (
        <MenuItemCardVertical
          name="Karaage Chicken Katsu Sando"
          description="Crispy Japanese-style fried chicken thigh glazed with spicy miso-honey sauce, served on buttery brioche with pickled cabbage slaw, kewpie mayo, and shichimi togarashi. Inspired by Nashville heat with Japanese technique."
          price={18.00}
          rating="97%"
          reviewCount="89"
          imageUrl="/images/food/karaage-chicken-katsu-sando.jpg"
          imageAlt="Karaage Chicken Katsu Sando"
          badge="Chef's Fusion"
          onClick={() => console.log("Clicked Karaage Chicken Katsu Sando")}
          onAddToCart={() => console.log("Added Karaage Chicken Katsu Sando to cart")}
        />
      )}
    </div>
  );
}`,
    files: ["registry/default/example/menu-item-card-demo.tsx"],
  },
  "menu-search": {
    name: "menu-search",
    type: "components:example",
    registryDependencies: ["menu-search"],
    component: lazy(() => import("@/components/ui/example/menu-search-demo")),
    source: `import { MenuSearch } from "../ui/menu-search";
import { useState } from "react";

export default function MenuSearchDemo() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-full max-w-2xl mx-auto">
      <MenuSearch
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search for dishes, cuisines, or ingredients..."
      />
      
      {searchQuery && (
        <div className="mt-4 p-4 rounded-lg bg-muted/50">
          <p className="text-sm text-muted-foreground">
            Searching for: <span className="font-medium text-foreground">"{searchQuery}"</span>
          </p>
        </div>
      )}
    </div>
  );
}`,
    files: ["registry/default/example/menu-search-demo.tsx"],
  },
  "modifier-selector": {
    name: "modifier-selector",
    type: "components:example",
    registryDependencies: ["modifier-selector"],
    component: lazy(
      () => import("@/components/ui/example/modifier-selector-demo")
    ),
    source: `"use client"

import { useState } from "react"
import { ModifierSelector } from "../ui/modifier-selector"
import { Card } from "@/components/ui/card"

const glazeOptions = [
  {
    id: "miso-glazed",
    name: "Miso Glazed (Original)",
    isDefault: true,
  },
  {
    id: "teriyaki-style",
    name: "Teriyaki Glazed",
    price: 2.00,
  },
  {
    id: "spicy-miso", 
    name: "Spicy Miso",
    price: 1.50,
  },
  {
    id: "ponzu-citrus",
    name: "Ponzu Citrus Glaze",
    price: 2.50,
  },
]

export default function ModifierSelectorDemo() {
  const [selectedGlaze, setSelectedGlaze] = useState("")

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="p-6">
        <ModifierSelector
          groups={[{
            id: "glaze",
            name: "Choose Glaze Style",
            required: true,
            maxSelect: 1,
            options: glazeOptions.map(opt => ({
              ...opt,
              price: opt.price || 0,
              available: true,
              default: opt.isDefault
            }))
          }]}
          selectedModifiers={{ glaze: selectedGlaze ? [selectedGlaze] : [] }}
          onModifierChange={(groupId, selectedIds) => {
            setSelectedGlaze(selectedIds[0] || "")
          }}
        />
      </Card>
    </div>
  )
}`,
    files: ["registry/default/example/modifier-selector-demo.tsx"],
  },
  "quantity-selector": {
    name: "quantity-selector",
    type: "components:example",
    component: lazy(
      () => import("@/components/ui/example/quantity-selector-demo")
    ),
    source: "",
    files: ["registry/default/example/quantity-selector-demo.tsx"],
  },
  "payment-method-selector": {
    name: "payment-method-selector",
    type: "components:example",
    component: lazy(
      () => import("@/components/ui/example/payment-method-selector-demo")
    ),
    source: "",
    files: ["registry/default/example/payment-method-selector-demo.tsx"],
  },
  "order-summary": {
    name: "order-summary",
    type: "components:example",
    registryDependencies: ["order-summary"],
    component: lazy(() => import("@/components/ui/example/order-summary-demo")),
    source: `"use client"

import { OrderSummary } from "../ui/order-summary"
import { Card } from "@/components/ui/card"

export default function OrderSummaryDemo() {
  const orderData = {
    orderNumber: "ORD-2024-001",
    date: "January 22, 2024",
    status: "confirmed" as const,
    estimatedDeliveryTime: "25-35 min",
    deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
    paymentMethod: "•••• 4242",
    items: [
      {
        id: "1",
        name: "Karaage Chicken Katsu Sando",
        quantity: 1,
        price: 18.00,
        modifiers: [
          { id: "m1", name: "Medium Rare", price: 0 },
          { id: "m2", name: "Extra Cheese", price: 2.00 }
        ]
      },
      {
        id: "2", 
        name: "Sweet Potato Fries",
        quantity: 1,
        price: 6.50
      }
    ],
    subtotal: 24.50,
    tax: 2.21,
    delivery: 2.99,
    tip: 4.90,
    total: 34.60
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="p-6">
        <OrderSummary
          orderNumber={orderData.orderNumber}
          date={orderData.date}
          status={orderData.status}
          estimatedDeliveryTime={orderData.estimatedDeliveryTime}
          deliveryAddress={orderData.deliveryAddress}
          paymentMethod={orderData.paymentMethod}
          items={orderData.items}
          subtotal={orderData.subtotal}
          tax={orderData.tax}
          delivery={orderData.delivery}
          tip={orderData.tip}
          total={orderData.total}
        />
      </Card>
    </div>
  )
}`,
    files: ["registry/default/example/order-summary-demo.tsx"],
  },
  "nutritional-info-modal": {
    name: "nutritional-info-modal",
    type: "components:example",
    component: lazy(
      () => import("@/components/ui/example/nutritional-info-modal-demo")
    ),
    source: "",
    files: ["registry/default/example/nutritional-info-modal-demo.tsx"],
  },
  "address-picker": {
    name: "address-picker",
    type: "components:example",
    registryDependencies: ["address-picker"],
    component: lazy(
      () => import("@/components/ui/example/address-picker-demo")
    ),
    source: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import AddressPickerModal from "../ui/location/address-picker"

export default function AddressPickerDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(null)

  const handleAddressSubmit = (address) => {
    setSelectedAddress(address)
    setIsOpen(false)
    console.log("Address submitted:", address)
  }

  return (
    <div className="w-full max-w-sm mx-auto p-6 space-y-6 border rounded-lg bg-background">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Delivery Address</h3>
        <p className="text-sm text-muted-foreground">Click to open address picker modal</p>
        <Button 
          onClick={() => setIsOpen(true)}
          className="w-full"
          size="lg"
        >
          Enter Delivery Address
        </Button>
      </div>
      
      {selectedAddress && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-md">
          <p className="text-sm font-medium text-green-800 dark:text-green-200">Selected Address:</p>
          <p className="text-sm text-green-700 dark:text-green-300">{selectedAddress.street}</p>
          {selectedAddress.apartment && (
            <p className="text-sm text-green-700 dark:text-green-300">Apt: {selectedAddress.apartment}</p>
          )}
        </div>
      )}

      <AddressPickerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNext={handleAddressSubmit}
      />
    </div>
  )
}`,
    files: ["registry/default/example/address-picker-demo.tsx"],
  },
  "featured-items-demo": {
    name: "featured-items-demo",
    type: "components:example",
    component: lazy(
      () => import("@/components/ui/example/featured-items-demo")
    ),
    source: "",
    files: ["registry/default/example/featured-items-demo.tsx"],
  },
  "featured-items-carousel-demo": {
    name: "featured-items-carousel-demo",
    type: "components:example",
    component: lazy(
      () => import("@/components/ui/example/featured-items-demo")
    ),
    source: "",
    files: ["registry/default/example/featured-items-demo.tsx"],
  },
  cart: {
    name: "cart",
    type: "components:example",
    registryDependencies: ["cart"],
    component: lazy(() => import("@/components/ui/example/cart-demo")),
    source: `"use client"

import { useState } from "react"
import { Cart, CartItem } from "../ui/cart"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const mockItems: CartItem[] = [
  {
    id: "1",
    name: "Classic Burger",
    price: 12.99,
    quantity: 2,
    image: "/images/food/placeholder-burger.svg",
    modifiers: [
      { id: "m1", name: "Extra Cheese", price: 1.50 },
      { id: "m2", name: "Bacon", price: 2.00 }
    ],
    notes: "No pickles, please"
  },
  {
    id: "2",
    name: "Caesar Salad",
    price: 8.99,
    quantity: 1,
    image: "/images/food/miso-eggplant.jpg"
  },
  {
    id: "3",
    name: "French Fries",
    price: 4.99,
    quantity: 3,
    image: "/images/food/wagyu-tataki.jpg",
    modifiers: [
      { id: "m3", name: "Truffle Oil", price: 1.00 }
    ]
  }
]

export default function CartDemo() {
  const [items, setItems] = useState<CartItem[]>(mockItems)
  const [showEmptyState, setShowEmptyState] = useState(false)

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleClearCart = () => {
    setItems([])
  }

  const handleCheckout = () => {
    console.log("Proceeding to checkout with items:", items)
  }

  const handleAddSampleItem = () => {
    const newItem: CartItem = {
      id: Date.now().toString(),
      name: "Chocolate Chip Cookie",
      price: 6.99,
      quantity: 1,
      image: "/images/food/matcha-creme-brulee.jpg"
    }
    setItems([...items, newItem])
  }

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowEmptyState(!showEmptyState)}
        >
          {showEmptyState ? "Show with items" : "Show empty state"}
        </Button>
        {!showEmptyState && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddSampleItem}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add sample item
          </Button>
        )}
      </div>

      {/* Cart Component */}
      <div className="max-w-md mx-auto">
        <Cart
          items={showEmptyState ? [] : items}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onCheckout={handleCheckout}
          className="h-[600px]"
        />
      </div>
    </div>
  )
}`,
    files: ["registry/default/example/cart-demo.tsx"],
  },
  "upsell-suggestions": {
    name: "upsell-suggestions",
    type: "components:example",
    component: lazy(
      () => import("@/components/ui/example/upsell-suggestions-demo")
    ),
    source: "",
    files: ["registry/default/example/upsell-suggestions-demo.tsx"],
  },
  "restaurant-header": {
    name: "restaurant-header",
    type: "components:example",
    registryDependencies: ["restaurant-header"],
    component: lazy(
      () => import("@/components/ui/example/restaurant-header-demo")
    ),
    source: `"use client"

import { useState } from "react"
import RestaurantHeader from "../ui/layout/restaurant-header"
import { Card } from "@/components/ui/card"

export default function RestaurantHeaderDemo() {
  const [signInClicked, setSignInClicked] = useState(false)
  const [logoClicked, setLogoClicked] = useState(false)

  const handleSignIn = () => {
    setSignInClicked(true)
    setTimeout(() => setSignInClicked(false), 2000)
  }

  const handleLogoClick = () => {
    setLogoClicked(true)
    setTimeout(() => setLogoClicked(false), 2000)
  }

  return (
    <div className="w-full space-y-6">
      <RestaurantHeader
        onSignIn={handleSignIn}
        onLogoClick={handleLogoClick}
      />
      
      <div className="p-8 space-y-4">
        <h2 className="text-2xl font-bold">Welcome to Sakura & Stone</h2>
        <p className="text-muted-foreground">
          Experience the perfect fusion of Japanese precision and European sophistication.
        </p>
      </div>
    </div>
  )
}`,
    files: ["registry/default/example/restaurant-header-demo.tsx"],
  },
  "payment-method-modal": {
    name: "payment-method-modal",
    type: "components:example",
    registryDependencies: ["payment-method-modal"],
    component: lazy(
      () => import("@/components/ui/example/payment-method-modal-demo")
    ),
    source: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import PaymentMethodModal from "../ui/modals/payment-method-modal"
import { CreditCard } from "lucide-react"

export default function PaymentMethodModalDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [savedPayment, setSavedPayment] = useState<any>(null)

  const handleSave = (paymentData: any) => {
    setSavedPayment(paymentData)
    setIsOpen(false)
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      <Button onClick={() => setIsOpen(true)} className="flex items-center gap-2">
        <CreditCard className="w-4 h-4" />
        Add Payment Method
      </Button>

      <PaymentMethodModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        initialPaymentType="card"
      />

      {savedPayment && (
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="text-sm text-green-800">
            Payment method added: {savedPayment.type}
          </div>
        </Card>
      )}
    </div>
  )
}`,
    files: ["registry/default/example/payment-method-modal-demo.tsx"],
  },
  "cart-sidebar": {
    name: "cart-sidebar",
    type: "components:example",
    registryDependencies: ["cart-sidebar"],
    component: lazy(() => import("@/components/ui/example/cart-sidebar-demo")),
    source: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import CartSidebar from "../ui/cart/cart-sidebar"
import { ShoppingCart } from "lucide-react"

export default function CartSidebarDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full flex justify-center">
      <Button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <ShoppingCart className="w-4 h-4" />
        Open Cart
      </Button>

      <CartSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onCheckout={() => {
          console.log("Proceeding to checkout")
          setIsOpen(false)
        }}
      />
    </div>
  )
}`,
    files: ["registry/default/example/cart-sidebar-demo.tsx"],
  },
  "restaurant-hero": {
    name: "restaurant-hero",
    type: "components:example",
    registryDependencies: ["restaurant-hero"],
    component: lazy(
      () => import("@/components/ui/example/restaurant-hero-demo")
    ),
    source: `import RestaurantHero from "@/registry/default/ui/layout/restaurant-hero"

export default function RestaurantHeroDemo() {
  return (
    <div className="w-full max-w-md mx-auto">
      <RestaurantHero
        restaurantName="Sakura Stone"
        heroImageUrl="/images/food/kaiseki-tasting.jpg"
        logoImageUrl="/images/logos/sakura-stone-logo.png"
        isOpen={true}
        operatingStatus="Open"
        statusMessage="Closes at 10:00 PM"
        onScheduleClick={() => console.log("Schedule clicked")}
      />
    </div>
  )
}`,
    files: ["registry/default/example/restaurant-hero-demo.tsx"],
  },
  "date-picker": {
    name: "date-picker",
    type: "components:example",
    registryDependencies: ["date-picker"],
    component: lazy(() => import("@/components/ui/example/date-picker-demo")),
    source: `"use client"

import { useState } from "react"
import { DatePicker } from "../ui/date-picker"
import { Card } from "@/components/ui/card"

export default function DatePickerDemo() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  
  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="p-6">
        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          placeholder="Select date"
        />
      </Card>
    </div>
  )
}`,
    files: ["registry/default/example/date-picker-demo.tsx"],
  },
  "address-picker-modal-demo": {
    name: "address-picker-modal-demo",
    type: "components:example",
    registryDependencies: ["address-picker"],
    component: lazy(
      () => import("@/components/ui/example/address-picker-modal-demo")
    ),
    source: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import AddressPickerModal from "@/registry/default/ui/location/address-picker"

export default function AddressPickerModalDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [savedAddress, setSavedAddress] = useState<{ street: string; apartment?: string } | null>(null)

  const handleAddressSubmit = (address: { street: string; apartment?: string }) => {
    setSavedAddress(address)
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <Button 
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-fit"
      >
        <MapPin className="mr-2 h-4 w-4" />
        Enter Delivery Address
      </Button>
      
      {savedAddress && (
        <div className="p-4 border rounded-lg bg-muted/50">
          <p className="text-sm font-medium">Delivery Address:</p>
          <p className="text-sm text-muted-foreground">
            {savedAddress.street}
            {savedAddress.apartment && \`, \${savedAddress.apartment}\`}
          </p>
        </div>
      )}
      
      <AddressPickerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNext={handleAddressSubmit}
      />
    </div>
  )
}`,
    files: ["registry/default/example/address-picker-modal-demo.tsx"],
  },
  "time-slot-picker": {
    name: "time-slot-picker",
    type: "components:example",
    registryDependencies: ["time-slot-picker"],
    component: lazy(
      () => import("@/components/ui/example/time-slot-picker-demo")
    ),
    source: `"use client"

import { useState } from "react"
import { TimeSlotPicker } from "../ui/time-slot-picker"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function TimeSlotPickerDemo() {
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [orderType, setOrderType] = useState("delivery")

  const timeSlots = [
    { id: "1", time: "10:00", label: "10:00 AM", available: true },
    { id: "2", time: "10:30", label: "10:30 AM", available: true },
    { id: "3", time: "11:00", label: "11:00 AM", available: false },
    { id: "4", time: "11:30", label: "11:30 AM", available: true },
    { id: "5", time: "12:00", label: "12:00 PM", available: true },
    { id: "6", time: "12:30", label: "12:30 PM", available: false },
    { id: "7", time: "13:00", label: "1:00 PM", available: true },
    { id: "8", time: "13:30", label: "1:30 PM", available: true },
  ]

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      <div className="flex gap-2">
        <Button
          variant={orderType === "delivery" ? "default" : "outline"}
          onClick={() => setOrderType("delivery")}
          size="sm"
        >
          Delivery
        </Button>
        <Button
          variant={orderType === "pickup" ? "default" : "outline"}
          onClick={() => setOrderType("pickup")}
          size="sm"
        >
          Pickup
        </Button>
      </div>
      
      <Card className="p-6">
        <TimeSlotPicker
          slots={timeSlots}
          selectedSlot={selectedSlot}
          onSlotSelect={setSelectedSlot}
          orderType={orderType}
          showAsap={true}
        />
      </Card>
      
      {selectedSlot && (
        <div className="p-4 border rounded-lg bg-muted/50">
          <p className="text-sm font-medium">Selected Time:</p>
          <p className="text-sm text-muted-foreground">
            {selectedSlot.label} for {orderType}
          </p>
        </div>
      )}
    </div>
  )
}`,
    files: ["registry/default/example/time-slot-picker-demo.tsx"],
  },
  "fulfillment-schedule-modal": {
    name: "fulfillment-schedule-modal",
    type: "components:example",
    registryDependencies: ["fulfillment-schedule-modal"],
    component: lazy(
      () => import("@/components/ui/example/fulfillment-schedule-modal-demo")
    ),
    source: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Clock, Truck, ShoppingBag } from "lucide-react"
import FulfillmentScheduleModal from "../ui/modals/fulfillment-schedule-modal"

export default function FulfillmentScheduleModalDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [fulfillmentType, setFulfillmentType] = useState<"pickup" | "delivery">("delivery")
  const [scheduledData, setScheduledData] = useState<{ date: string; timeSlot: string } | null>(null)

  const handleSchedule = (data: { date: string; timeSlot: string }) => {
    setScheduledData(data)
    setIsOpen(false)
  }

  const handleOpenSchedule = (type: "pickup" | "delivery") => {
    setFulfillmentType(type)
    setIsOpen(true)
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">Schedule Your Order</h3>
            <p className="text-sm text-muted-foreground">
              Choose pickup or delivery and select your preferred time
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={() => handleOpenSchedule("delivery")}
              className="flex-1 h-auto p-4"
              variant="outline"
            >
              <div className="flex flex-col items-center gap-2">
                <Truck className="w-5 h-5" />
                <span className="text-sm">Schedule Delivery</span>
              </div>
            </Button>
            
            <Button
              onClick={() => handleOpenSchedule("pickup")}
              className="flex-1 h-auto p-4"
              variant="outline"
            >
              <div className="flex flex-col items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <span className="text-sm">Schedule Pickup</span>
              </div>
            </Button>
          </div>
        </div>
      </Card>

      {scheduledData && (
        <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              {fulfillmentType === "delivery" ? (
                <Truck className="w-4 h-4 text-green-600 dark:text-green-400" />
              ) : (
                <ShoppingBag className="w-4 h-4 text-green-600 dark:text-green-400" />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-1">
                {fulfillmentType === "delivery" ? "Delivery" : "Pickup"} Scheduled
              </h4>
              <div className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>{scheduledData.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>{scheduledData.timeSlot}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      <FulfillmentScheduleModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSchedule={handleSchedule}
        fulfillmentType={fulfillmentType}
      />
    </div>
  )
}`,
    files: ["registry/default/example/fulfillment-schedule-modal-demo.tsx"],
  },
  "item-detail-modal": {
    name: "item-detail-modal",
    type: "components:example",
    registryDependencies: ["item-detail-modal"],
    component: lazy(
      () => import("@/components/ui/example/item-detail-modal-demo")
    ),
    source: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, ShoppingCart } from "lucide-react"
import Image from "next/image"
import ItemDetailModal from "../ui/modals/item-detail-modal"
import type { MenuItem } from "@/types/restaurant"

export default function ItemDetailModalDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])

  const sampleItem: MenuItem = {
    id: "burger-deluxe",
    name: "Gourmet Burger Deluxe",
    description: "Premium angus beef patty with aged cheddar, crispy bacon, caramelized onions, arugula, and our signature chipotle mayo on a brioche bun",
    price: 18.99,
    rating: 4.8,
    reviewCount: 247,
    imageUrl: "/images/food/placeholder-burger.svg",
    imageAlt: "Gourmet Burger Deluxe",
    badge: "Chef's Special",
    category: "Burgers",
    available: true,
    nutritionalInfo: {
      calories: 680,
      protein: 35,
      carbs: 42,
      fat: 38,
      fiber: 4,
      sugar: 8
    },
    modifiers: [
      {
        id: "temperature",
        name: "How would you like it cooked?",
        required: true,
        maxSelect: 1,
        options: [
          { id: "rare", name: "Rare", price: 0, default: false },
          { id: "medium-rare", name: "Medium Rare", price: 0, default: false },
          { id: "medium", name: "Medium", price: 0, default: true },
          { id: "medium-well", name: "Medium Well", price: 0, default: false },
          { id: "well-done", name: "Well Done", price: 0, default: false }
        ]
      },
      {
        id: "sides",
        name: "Choose your side",
        required: true,
        maxSelect: 1,
        options: [
          { id: "fries", name: "French Fries", price: 0, default: true },
          { id: "sweet-potato", name: "Sweet Potato Fries", price: 2.00 },
          { id: "onion-rings", name: "Onion Rings", price: 2.50 },
          { id: "side-salad", name: "Side Salad", price: 1.50 }
        ]
      },
      {
        id: "extras",
        name: "Add extras",
        required: false,
        maxSelect: 5,
        options: [
          { id: "extra-bacon", name: "Extra Bacon", price: 3.00 },
          { id: "extra-cheese", name: "Extra Cheese", price: 2.00 },
          { id: "avocado", name: "Avocado", price: 2.50 },
          { id: "mushrooms", name: "Sautéed Mushrooms", price: 2.00 },
          { id: "pickles", name: "Extra Pickles", price: 0.50 }
        ]
      }
    ]
  }

  const handleAddToCart = (item: MenuItem, quantity: number, modifiers?: any) => {
    const cartItem = {
      id: \`\${item.id}-\${Date.now()}\`,
      name: item.name,
      price: item.price,
      quantity,
      modifiers,
      image: item.imageUrl
    }
    
    setCartItems(prev => [...prev, cartItem])
    console.log("Added to cart:", cartItem)
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      {/* Sample Menu Item Card */}
      <Card className="overflow-hidden">
        <div className="relative">
          <div className="relative w-full h-48">
            <Image
              src="/images/food/placeholder-burger.svg"
              alt={sampleItem.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute top-3 left-3">
              <Badge className="bg-orange-500 text-white">
                {sampleItem.badge}
              </Badge>
            </div>
          </div>
          
          <div className="p-4 space-y-3">
            <div>
              <h3 className="text-lg font-semibold">{sampleItem.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {sampleItem.description}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold">\${sampleItem.price}</div>
              <div className="text-sm text-muted-foreground">
                ⭐ {sampleItem.rating} ({sampleItem.reviewCount})
              </div>
            </div>
            
            <Button 
              onClick={() => setIsOpen(true)}
              className="w-full"
              size="lg"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details & Customize
            </Button>
          </div>
        </div>
      </Card>

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <ShoppingCart className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-1">
                Items in Cart: {cartItems.length}
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Latest: {cartItems[cartItems.length - 1]?.name} (Qty: {cartItems[cartItems.length - 1]?.quantity})
              </p>
            </div>
          </div>
        </Card>
      )}

      <ItemDetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAddToCart={handleAddToCart}
        item={sampleItem}
      />
    </div>
  )
}`,
    files: ["registry/default/example/item-detail-modal-demo.tsx"],
  },
  "reviews-section": {
    name: "reviews-section",
    type: "components:example",
    registryDependencies: ["reviews-section"],
    component: lazy(
      () => import("@/components/ui/example/reviews-section-demo")
    ),
    source: `"use client"

import { useState } from "react"
import ReviewsSection from "../ui/reviews/reviews-section"

export default function ReviewsSectionDemo() {
  const [reviews] = useState([
    {
      id: "1",
      customerName: "Sarah Johnson",
      customerAvatar: "/avatars/sarah.jpg",
      rating: 5,
      date: "2024-01-22",
      title: "Outstanding Experience!",
      content: "The food was absolutely incredible! The Karaage Chicken Katsu Sando was cooked to perfection with the perfect balance of crispy and tender. The service was fast and friendly. Will definitely be ordering again!",
      verified: true,
      helpful: 18,
      orderItems: ["Karaage Chicken Katsu Sando", "Sweet Potato Fries", "Green Tea Latte"],
      photos: ["/images/food/karaage-chicken-katsu-sando.jpg", "/images/food/wagyu-tataki.jpg"]
    },
    {
      id: "2",
      customerName: "Mike Chen",
      customerAvatar: "/avatars/mike.jpg",
      rating: 4,
      date: "2024-01-20",
      title: "Great Food, Minor Issues",
      content: "Really enjoyed the fusion flavors. The ramen was authentic and the portion size was generous. Delivery took a bit longer than expected, but the food arrived hot and well-packaged.",
      verified: true,
      helpful: 12,
      orderItems: ["Tonkotsu Ramen", "Gyoza", "Miso Soup"]
    },
    {
      id: "3",
      customerName: "Emma Wilson",
      rating: 5,
      date: "2024-01-18",
      content: "Amazing quality and taste! The attention to detail in presentation was impressive. Every dish felt carefully crafted. The online ordering process was smooth and user-friendly.",
      verified: false,
      helpful: 9,
      orderItems: ["Chirashi Bowl", "Miso Salmon", "Edamame"]
    },
    {
      id: "4",
      customerName: "David Rodriguez",
      customerAvatar: "/avatars/david.jpg",
      rating: 3,
      date: "2024-01-15",
      title: "Decent but Room for Improvement",
      content: "The food was okay but not exceptional. The flavors were good but some items were a bit cold when they arrived. Customer service was responsive when I called about the issue.",
      verified: true,
      helpful: 5,
      orderItems: ["Beef Teriyaki", "Vegetable Tempura", "Jasmine Rice"]
    },
    {
      id: "5",
      customerName: "Lisa Park",
      rating: 5,
      date: "2024-01-12",
      title: "New Favorite Restaurant!",
      content: "Absolutely love this place! The fusion of Japanese and modern cuisine is brilliant. Fresh ingredients, creative presentations, and excellent execution. The spicy tuna roll was the best I've had in the city.",
      verified: true,
      helpful: 22,
      orderItems: ["Spicy Tuna Roll", "Dragon Roll", "Seaweed Salad"],
      photos: ["/images/food/uni-carbonara.jpg"]
    },
    {
      id: "6",
      customerName: "James Thompson",
      rating: 4,
      date: "2024-01-10",
      content: "Solid choice for Japanese food. The quality is consistent and the prices are reasonable. The bento box was well-balanced with a good variety of items. Will order again.",
      verified: false,
      helpful: 7,
      orderItems: ["Chicken Teriyaki Bento", "Miso Soup", "Green Tea"]
    },
    {
      id: "7",
      customerName: "Anna Kim",
      customerAvatar: "/avatars/anna.jpg",
      rating: 2,
      date: "2024-01-08",
      title: "Disappointed",
      content: "Unfortunately, this order didn't meet expectations. The sushi rice was too dry and the fish didn't taste fresh. The delivery was also delayed by 45 minutes without notification.",
      verified: true,
      helpful: 3,
      orderItems: ["Salmon Sashimi", "California Roll", "Wasabi"]
    },
    {
      id: "8",
      customerName: "Robert Lee",
      rating: 5,
      date: "2024-01-05",
      title: "Exceptional Quality",
      content: "This is what authentic Japanese cuisine should taste like. The chef clearly knows what they're doing. Every element of the meal was perfect, from the appetizers to the main course.",
      verified: true,
      helpful: 15,
      orderItems: ["Kaiseki Tasting Menu", "Sake Pairing", "Matcha Ice Cream"]
    }
  ])

  const ratingDistribution = {
    5: 4,
    4: 2,
    3: 1,
    2: 1,
    1: 0
  }

  const overallRating = 4.3
  const totalReviews = 8

  const handleLoadMore = () => {
    console.log("Loading more reviews...")
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ReviewsSection
        reviews={reviews}
        overallRating={overallRating}
        totalReviews={totalReviews}
        ratingDistribution={ratingDistribution}
        showPhotos={true}
        showHelpful={true}
        maxReviews={5}
        onLoadMore={handleLoadMore}
        isLoading={false}
      />
    </div>
  )
}`,
    files: ["registry/default/example/reviews-section-demo.tsx"],
  },
  "phone-sign-in-modal": {
    name: "phone-sign-in-modal",
    type: "components:example",
    registryDependencies: ["phone-sign-in-modal"],
    component: lazy(
      () => import("@/components/ui/example/phone-sign-in-modal-demo")
    ),
    source: `"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Phone, User, Shield } from "lucide-react"
import PhoneSigninModal from "../ui/modals/phone-sign-in-modal"

export default function PhoneSigninModalDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [phoneData, setPhoneData] = useState<{ countryCode: string; phoneNumber: string } | null>(null)

  const handleContinue = (data: { countryCode: string; phoneNumber: string }) => {
    setPhoneData(data)
    setIsOpen(false)
    console.log("Phone data submitted:", data)
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Phone Authentication</h3>
            <p className="text-sm text-muted-foreground">
              Sign in or create an account using your phone number
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <User className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Quick Account Creation</p>
                <p className="text-xs text-muted-foreground">New users get accounts automatically</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium">Secure Verification</p>
                <p className="text-xs text-muted-foreground">SMS code verification for security</p>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => setIsOpen(true)}
            className="w-full"
            size="lg"
          >
            <Phone className="w-4 h-4 mr-2" />
            Sign In with Phone
          </Button>
        </div>
      </Card>

      {phoneData && (
        <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-1">
                Phone Number Submitted
              </h4>
              <div className="text-sm text-green-700 dark:text-green-300">
                <p>Country Code: {phoneData.countryCode}</p>
                <p>Phone Number: {phoneData.phoneNumber}</p>
                <p className="mt-1 text-xs">
                  Next step: Send verification code to {phoneData.countryCode} {phoneData.phoneNumber}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      <PhoneSigninModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onContinue={handleContinue}
      />
    </div>
  )
}`,
    files: ["registry/default/example/phone-sign-in-modal-demo.tsx"],
  },
  "review-card": {
    name: "review-card",
    type: "components:example",
    registryDependencies: ["review-card"],
    component: lazy(() => import("@/components/ui/example/review-card-demo")),
    source: `"use client"

import ReviewCard from "../ui/reviews/review-card"

export default function ReviewCardDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Review Card</h2>
        <p className="text-muted-foreground">
          Simple review card component with user info, ratings, and comments.
        </p>
      </div>

      <div className="space-y-6">
        {/* Default Example */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Default Review</h3>
          <div className="p-6 border border-border rounded-lg bg-background">
            <ReviewCard />
          </div>
        </div>

        {/* Custom Example */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Custom Review</h3>
          <div className="p-6 border border-border rounded-lg bg-background">
            <ReviewCard
              userName="Sarah M"
              userInitial="S"
              userColor="#10B981"
              rating={4}
              date="3/22/24"
              orderType="Pickup order"
              comment="Great food and fast service! The karaage chicken was crispy and delicious."
            />
          </div>
        </div>

        {/* Review with Highlighted Items */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Review with Highlighted Items</h3>
          <div className="p-6 border border-border rounded-lg bg-background">
            <ReviewCard
              userName="Mike Chen"
              userInitial="M"
              userColor="#3B82F6"
              rating={5}
              date="3/20/24"
              orderType="Delivery order"
              comment="The ramen was absolutely amazing! Also loved the gyoza and miso soup."
              highlightedItems={["ramen", "gyoza", "miso soup"]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}`,
    files: ["registry/default/example/review-card-demo.tsx"],
  },
};
