"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/product";

type CartState = {
  items: CartItem[];
  isDrawerOpen: boolean;
  cartNotice: string | null;
  cartNoticeKey: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

function itemKey(item: Pick<CartItem, "productId" | "variantId">) {
  return `${item.productId}:${item.variantId}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isDrawerOpen: false,
      cartNotice: null,
      cartNoticeKey: 0,
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((cartItem) => itemKey(cartItem) === itemKey(item));
          const message = `${item.name} added to cart`;

          if (!existing) {
            return {
              items: [...state.items, item],
              cartNotice: message,
              cartNoticeKey: state.cartNoticeKey + 1
            };
          }

          return {
            items: state.items.map((cartItem) =>
              itemKey(cartItem) === itemKey(item)
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
            ),
            cartNotice: message,
            cartNoticeKey: state.cartNoticeKey + 1
          };
        }),
      removeItem: (productId, variantId) =>
        set((state) => ({
          items: state.items.filter((cartItem) => itemKey(cartItem) !== `${productId}:${variantId}`)
        })),
      updateQuantity: (productId, variantId, quantity) =>
        set((state) => ({
          items: state.items.map((cartItem) =>
            itemKey(cartItem) === `${productId}:${variantId}`
              ? { ...cartItem, quantity: Math.max(1, quantity) }
              : cartItem
          )
        })),
      clearCart: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false })
    }),
    {
      name: "auraville-cart",
      partialize: (state) => ({ items: state.items })
    }
  )
);

export function getCartSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
}

export function getCartCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}
