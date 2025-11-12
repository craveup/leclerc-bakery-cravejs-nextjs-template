import { SidebarNavItem } from "../types/nav.js";

export interface DocsConfig {
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Why We Built This",
          href: "/docs/why-we-built-cravejs-ui",
          items: [],
        },
        {
          title: "Getting Started",
          href: "/docs/getting-started-overview",
          items: [],
        },
        {
          title: "Follow Updates",
          href: "https://twitter.com/cravejs",
          external: true,
          items: [],
        },
      ],
    },
    {
      title: "Installation",
      items: [
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
        {
          title: "Next.js Setup",
          href: "/docs/install-nextjs",
          items: [],
        },
        {
          title: "Tailwind CSS Setup",
          href: "/docs/install-tailwindcss",
          items: [],
        },
        {
          title: "CLI",
          href: "/docs/cli",
          items: [],
        },
        {
          title: "Add Utilities",
          href: "/docs/add-utilities",
          items: [],
        },
        {
          title: "Quick Reference",
          href: "/docs/shared/installation",
          items: [],
        },
      ],
    },
    {
      title: "Integration",
      items: [
        {
          title: "Crave APIs",
          href: "/docs/crave-apis",
          items: [],
        },
      ],
    },
    {
      title: "Components Overview",
      items: [
        {
          title: "List of Components",
          href: "/docs/components",
          items: [],
        },
      ],
    },
    {
      title: "Layout Components",
      items: [
        {
          title: "Restaurant Header",
          href: "/docs/components/layout/restaurant-header",
          items: [],
        },
        {
          title: "Restaurant Hero",
          href: "/docs/components/layout/restaurant-hero",
          items: [],
        },
      ],
    },
    {
      title: "Menu Components",
      items: [
        {
          title: "Menu Overview",
          href: "/docs/components/menu",
          items: [],
        },
        {
          title: "Menu Item Card",
          href: "/docs/components/menu/menu-item-card",
          items: [],
        },
        {
          title: "Menu Search",
          href: "/docs/components/menu/menu-search",
          items: [],
        },
        {
          title: "Featured Items Carousel",
          href: "/docs/components/menu/featured-items-carousel",
          items: [],
        },
        {
          title: "Nutritional Info Modal",
          href: "/docs/components/menu/nutritional-info-modal",
          items: [],
        },
      ],
    },
    {
      title: "Cart Components",
      items: [
        {
          title: "Cart Overview",
          href: "/docs/components/cart",
          items: [],
        },
        {
          title: "Cart Component",
          href: "/docs/components/cart/cart",
          items: [],
        },
        {
          title: "Cart Sidebar",
          href: "/docs/components/cart/cart-sidebar",
          items: [],
        },
        {
          title: "Order Summary",
          href: "/docs/components/order/order-summary",
          items: [],
        },
        {
          title: "Upsell Suggestions",
          href: "/docs/components/cart/upsell-suggestions",
          items: [],
        },
      ],
    },
    {
      title: "Form Components",
      items: [
        {
          title: "Modifier Selector",
          href: "/docs/components/menu/modifier-selector",
          items: [],
        },
        {
          title: "Quantity Selector",
          href: "/docs/components/cart/quantity-selector",
          items: [],
        },
        {
          title: "Date Picker",
          href: "/docs/components/forms/date-picker",
          items: [],
        },
        {
          title: "Address Picker",
          href: "/docs/components/location/address-picker",
          items: [],
        },
      ],
    },
    {
      title: "Modal Components",
      items: [
        {
          title: "Fulfillment Schedule",
          href: "/docs/components/modals/fulfillment-schedule",
          items: [],
        },
        {
          title: "Item Detail",
          href: "/docs/components/modals/item-detail",
          items: [],
        },
        {
          title: "Payment Method Modal",
          href: "/docs/components/modals/payment-method-modal",
          items: [],
        },
        {
          title: "Phone Sign-in",
          href: "/docs/components/modals/phone-sign-in",
          items: [],
        },
      ],
    },
    {
      title: "Review Components",
      items: [
        {
          title: "Reviews Section",
          href: "/docs/components/reviews/reviews-section",
          items: [],
        },
        {
          title: "Review Card",
          href: "/docs/components/reviews/review-card",
          items: [],
        },
      ],
    },
    {
      title: "Examples",
      items: [
        {
          title: "Complete Restaurant",
          href: "/docs/examples/complete-restaurant",
          items: [],
        },
      ],
    },
    {
      title: "Marketing",
      items: [
        {
          title: "Template Gallery",
          href: "/docs/marketing/templates",
          items: [],
        },
        {
          title: "Brand Customization",
          href: "/docs/marketing/branding",
          items: [],
        },
      ],
    },
    {
      title: "Sales Channel",
      items: [
        {
          title: "Leclerc Bakery",
          href: "/examples/leclerc-bakery",
          items: [],
        },
        {
          title: "Xichuan Noodles",
          href: "/examples/xichuan-noodles",
          items: [],
        },
      ],
    },
    {
      title: "Configuration",
      items: [
        {
          title: "Environment Setup",
          href: "/docs/configuration/environment",
          items: [],
        },
        {
          title: "API Configuration",
          href: "/docs/configuration/api",
          items: [],
        },
      ],
    },
    {
      title: "Guides",
      items: [
        {
          title: "Best Practices",
          href: "/docs/guides/best-practices",
          items: [],
        },
        {
          title: "Theming",
          href: "/docs/guides/theming",
          items: [],
        },
        {
          title: "Accessibility",
          href: "/docs/shared/accessibility",
          items: [],
        },
        {
          title: "Styling",
          href: "/docs/shared/styling",
          items: [],
        },
        {
          title: "Common Props",
          href: "/docs/shared/common-props",
          items: [],
        },
      ],
    },
    {
      title: "Help",
      items: [
        {
          title: "Troubleshooting",
          href: "/docs/troubleshooting",
          items: [],
        },
      ],
    },
  ],
};
