import type { Product } from "@/types/menu-types";

export type BundleCategory = {
  id: string;
  name: string;
  products: Product[];
};
export type BundleMenu = {
  id: string;
  name: string;
  isActive: boolean;
  time: string;
  timeRange?: string;
  image?: string;
  description?: string;
  itemCount?: number;
  imageUrl?: string;
  thumbnailUrl?: string;
  categories: BundleCategory[];
};
export type MenusResponse = {
  menus: BundleMenu[];
  popularProducts: Product[];
};
