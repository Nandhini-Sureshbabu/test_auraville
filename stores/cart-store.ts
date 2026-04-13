"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/product";

type CartState = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
};

function itemKey(item: Pick<CartItem, "productId" | "variantId">) {
  return `${item.productId}:${item.variantId}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((cartItem) => itemKey(cartItem) === itemKey(item));

          if (!existing) {
            return { items: [...state.items, item] };
          }

          return {
            items: state.items.map((cartItem) =>
              itemKey(cartItem) === itemKey(item)
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem
            )
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
      clearCart: () => set({ items: [] })
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
