"use client"

import { LeclercHeader } from "./components/leclerc-header"
import { LeclercHero } from "./components/leclerc-hero"
import { LeclercMenu } from "./components/leclerc-menu"
import { LeclercAbout } from "./components/leclerc-about"
import { LeclercCatering } from "./components/leclerc-catering"
import { LeclercCart } from "./components/leclerc-cart"
import { LeclercFooter } from "./components/leclerc-footer"
import { useCart } from "./providers/cart-provider"

export default function LeclercBakeryPage() {
  const { isCartOpen, closeCart } = useCart()

  return (
    <div className="min-h-screen bg-background">
      <LeclercHeader />
      
      <main>
        <LeclercHero />
        <LeclercMenu isHomePage />
        <LeclercAbout />
        <LeclercCatering />
      </main>

      <LeclercFooter />
      
      <LeclercCart 
        isOpen={isCartOpen}
        onClose={closeCart}
      />
    </div>
  )
}
