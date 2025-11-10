import { create } from "zustand";

type Store = {
  cartId: string | null;
  isLoading: boolean;
  setCartIdState: (newCartId: string | null) => void;
  setIsLoading: (newLoading: boolean) => void;
};

export const useCartStore = create<Store>()((set) => ({
  cartId: null,
  isLoading: false,
  setCartIdState: (newCartId) =>
    set(() => ({ cartId: newCartId ? String(newCartId) : null })),
  setIsLoading: (newLoading) => set(() => ({ isLoading: newLoading })),
}));
