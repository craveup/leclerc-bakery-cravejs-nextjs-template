# Restaurant Storefront Starter

> [!WARNING]
> **Legacy visual reference only.** This repository pins the retired Storefront
> SDK 1.x browser-key contract. Do not use it as a production starter, expose a
> Crave API key in browser code, or use its one-click deployment flow. Build new
> integrations from the current [Storefront SDK guide](https://docs.craveup.com/getting-started/storefront-sdk)
> and treat this repository only as design and interaction reference material.

- Demonstrates a bakery storefront design
- Includes legacy menu, cart, checkout, and auth UI
- Can be studied locally with mock data

---

## Key Features

- **Legacy Ordering UI** – Shows the older Storefront SDK 1.x integration shape; it is not the current public contract.
- **Rich Menu Experience** – Sticky category navigation, featured carousel, and responsive cards with hover states.
- **Product Dialog & Drawer** – Desktop dialogs and mobile drawers share the same content for parity and accessibility.
- **Cart & Recommendations** – Persistent sidebar/cart drawer with quantity controls, item notes, and CTA for checkout.
- **Theme Ready** – Light/dark palettes, brand tokens, and easily adjustable typography in Tailwind.
- **Accessible UI** – Built on shadcn/ui + Radix primitives, ensuring keyboard navigation and screen-reader friendliness.

---

## Demo

**Live Demo:** [leclerc-bakery.order.page](https://leclerc-bakery.order.page/)

| Hero (Light)                                     | Hero (Dark)                                    |
| ------------------------------------------------ | ---------------------------------------------- |
| ![Hero Light](public/screenshots/hero-light.png) | ![Hero Dark](public/screenshots/hero-dark.png) |

| Menu Grid                                      | Product Dialog                                           |
| ---------------------------------------------- | -------------------------------------------------------- |
| ![Menu Grid](public/screenshots/menu-grid.png) | ![Product Dialog](public/screenshots/product-dialog.png) |

| Cart Sidebar                                         |
| ---------------------------------------------------- |
| ![Cart Sidebar](public/screenshots/cart-sidebar.png) |

---

## Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui + Radix UI](https://ui.shadcn.com/)
- [CraveUp Storefront SDK](https://docs.craveup.com/)

---

## Getting Started

1. **Clone the repo**
   ```bash
   git clone --depth=1 https://github.com/your-org/leclerc-bakery
   cd leclerc-bakery
   ```
2. **Install dependencies**
   ```bash
   pnpm install
   ```
3. **Configure environment variables** (see below).
4. **Run the dev server**
   ```bash
   pnpm dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to explore the storefront.

---

## Environment Variables

Start from the provided template:

```bash
cp .env.example .env.local
```

Use only non-sensitive public values while studying the local UI. Do not add a
Crave API key: this legacy application is not a supported live integration.

| Key                               | Required | Description                                                     |
| --------------------------------- | -------- | --------------------------------------------------------------- |
| `NEXT_PUBLIC_LOCATION_ID`         | No       | Optional fixture/location label for local UI study.             |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | No       | Domain-restricted browser key for optional Maps UI only.        |

---

## Scripts

| Command      | Description                           |
| ------------ | ------------------------------------- |
| `pnpm dev`   | Start the local development server    |
| `pnpm build` | Create the optimized production build |
| `pnpm start` | Serve the production build locally    |
| `pnpm lint`  | Run ESLint checks                     |

---

## Customization Guide

1. **Branding** – Replace imagery in `public/images` and update color tokens in `src/app/globals.css`.
2. **Copywriting** – Adjust hero, footer, story, and CTA text inside `src/app/components/`.
3. **Menu Data** – Use the bundled mock fallback for local design study. Follow the current SDK guide for a new live integration.
4. **UX Enhancements** – Extend cart behavior or product options by editing hooks/providers under `src/hooks` and `src/app/providers`.
5. **Testing** – Run `pnpm lint` and `pnpm build` before shipping to catch regressions early.

---

## Project Structure

```
src/
|-- app/                # App Router routes, layouts, providers
|-- components/         # Hero, menu, cart, shared UI
|-- hooks/              # Cart + ordering session hooks
|-- lib/                # API clients, constants, utilities
`-- store/              # Zustand stores
public/                 # Images, screenshots, icons
README.md
```

---

## Deployment status

Do not deploy this legacy integration as a live ordering storefront. Reuse its
visual ideas in a new application built against the current Storefront API and
SDK contract instead.

---

## Support & Reference

- [CraveUp Docs](https://docs.craveup.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

Need implementation help? Reach out to [hello@craveup.com](mailto:hello@craveup.com).

---

## License

Distributed under the MIT License — see [LICENSE](LICENSE) for details.
