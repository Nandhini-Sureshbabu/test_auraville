"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { getCartCount, getCartSubtotal, useCartStore } from "@/stores/cart-store";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { formatPrice } from "@/components/ui/price";

const freeShippingThreshold = 499;

export function CartDrawer() {
  const hasMounted = useHasMounted();
  const user = useAuthStore((state) => state.user);

  const items = useCartStore((state) => state.items);
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const cartNotice = useCartStore((state) => state.cartNotice);
  const cartNoticeKey = useCartStore((state) => state.cartNoticeKey);
  const closeDrawer = useCartStore((state) => state.closeDrawer);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const count = getCartCount(items);
  const subtotal = getCartSubtotal(items);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  useEffect(() => {
    if (!hasMounted || !isDrawerOpen) return;

    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeDrawer();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [closeDrawer, hasMounted, isDrawerOpen]);

  if (!hasMounted) return null;

  return (
    <>
      <div
        className={`pointer-events-none fixed inset-0 z-[130] transition ${
          isDrawerOpen ? "visible" : "invisible"
        }`}
        aria-hidden={!isDrawerOpen}
      >
        <button
          aria-label="Close cart drawer"
          className={`absolute inset-0 bg-black/35 transition ${
            isDrawerOpen ? "pointer-events-auto opacity-100" : "opacity-0"
          }`}
          type="button"
          onClick={closeDrawer}
        />

        <aside
          aria-label="Cart drawer"
          className={`absolute right-0 top-0 flex h-dvh w-full max-w-[420px] flex-col border-l border-[var(--line)] bg-white shadow-2xl transition-transform duration-300 ease-out ${
            isDrawerOpen ? "pointer-events-auto translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-4 sm:px-5">
            <p className="text-sm font-bold uppercase tracking-wide">Your Cart ({count})</p>
            <button
              aria-label="Close cart"
              className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--line)] text-lg transition active:scale-95"
              type="button"
              onClick={closeDrawer}
            >
              ×
            </button>
          </div>

          <div className="bg-[#f3fbf7] px-4 py-2 text-center text-xs font-semibold text-[var(--leaf-deep)] sm:px-5">
            {remainingForFreeShipping === 0
              ? "Free shipping unlocked"
              : `${formatPrice(remainingForFreeShipping)} away from free shipping`}
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
            {items.length === 0 ? (
              <div className="rounded-lg border border-[var(--line)] bg-[var(--mint)] px-4 py-6 text-center">
                <p className="text-sm font-semibold">Your cart is empty.</p>
                <p className="mt-2 text-xs text-[var(--muted)]">Add a product to continue checkout.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <article
                    className="rounded-lg border border-[var(--line)] bg-white p-3"
                    key={`${item.productId}-${item.variantId}`}
                  >
                    <div className="grid grid-cols-[68px_1fr_auto] gap-3">
                      <div className="relative aspect-square overflow-hidden rounded-md bg-[var(--mint)]">
                        <Image alt={item.name} className="object-cover" fill sizes="68px" src={item.image} />
                      </div>
                      <div>
                        <p className="line-clamp-2 text-sm font-semibold leading-5">{item.name}</p>
                        <p className="mt-1 text-xs text-[var(--muted)]">{item.variantLabel}</p>
                        <button
                          className="focus-ring mt-3 rounded text-xs font-semibold text-[var(--coral)]"
                          type="button"
                          onClick={() => removeItem(item.productId, item.variantId)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">{formatPrice(item.unitPrice * item.quantity)}</p>
                        <p className="text-xs text-[var(--muted)]">{formatPrice(item.unitPrice)}</p>
                      </div>
                    </div>
                    <div className="mt-3 inline-flex h-9 items-center rounded-lg border border-[var(--line)]">
                      <button
                        aria-label={`Decrease ${item.name}`}
                        className="focus-ring h-full w-9 rounded-l-lg text-lg font-semibold text-[var(--leaf-deep)] transition active:scale-95"
                        type="button"
                        onClick={() => {
                          if (item.quantity === 1) {
                            removeItem(item.productId, item.variantId);
                            return;
                          }
                          updateQuantity(item.productId, item.variantId, item.quantity - 1);
                        }}
                      >
                        -
                      </button>
                      <span className="min-w-8 text-center text-xs font-semibold" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        aria-label={`Increase ${item.name}`}
                        className="focus-ring h-full w-9 rounded-r-lg text-lg font-semibold text-[var(--leaf-deep)] transition active:scale-95"
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-[var(--line)] px-4 py-4 sm:px-5">
            <div className="mb-4 flex items-end justify-between">
              <p className="text-sm font-semibold">Estimated total</p>
              <p className="text-2xl font-bold">{formatPrice(subtotal)}</p>
            </div>
            <Link
              className={`focus-ring inline-flex h-12 w-full items-center justify-center rounded-lg text-sm font-semibold transition active:scale-[0.98] ${
                items.length === 0
                  ? "pointer-events-none border border-[var(--line)] bg-[var(--mint)] text-[var(--muted)]"
                  : "bg-[var(--leaf-deep)] text-white hover:bg-[var(--leaf)]"
              }`}
              href={user ? "/checkout" : "/auth"}
              onClick={closeDrawer}
            >
              {items.length === 0 ? "Add products to continue" : user ? "Checkout" : "Login to Checkout"}
            </Link>
            <div className="mt-3 flex items-center justify-between text-xs text-[var(--muted)]">
              <Link className="focus-ring rounded" href="/cart" onClick={closeDrawer}>
                View full cart
              </Link>
              <span>Secure checkout</span>
            </div>
          </div>
        </aside>
      </div>

      <div aria-live="polite" className="pointer-events-none fixed right-4 top-24 z-[135]">
        <div
          className={`rounded-lg border border-[var(--line)] bg-white px-3 py-2 text-xs font-semibold shadow-lg ${
            cartNotice && cartNoticeKey > 0 ? "animate-[toastPulse_2s_ease-out_forwards]" : "hidden"
          }`}
          key={cartNoticeKey}
        >
          {cartNotice ?? "Added to cart"}
        </div>
      </div>
    </>
  );
}
