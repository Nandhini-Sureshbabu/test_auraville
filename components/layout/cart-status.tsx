"use client";

import Link from "next/link";
import { getCartCount, useCartStore } from "@/stores/cart-store";
import { useHasMounted } from "@/hooks/use-has-mounted";

export function CartStatus() {
  const hasMounted = useHasMounted();
  const items = useCartStore((state) => state.items);
  const count = hasMounted ? getCartCount(items) : 0;

  return (
    <Link
      aria-label={`Cart with ${count} items`}
      className="focus-ring relative inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--line)] bg-white transition hover:border-[var(--leaf)]"
      href="/cart"
    >
      <span aria-hidden="true" className="text-lg leading-none">
        Bag
      </span>
      <span className="absolute -right-2 -top-2 min-w-6 rounded-full bg-[var(--coral)] px-1.5 py-0.5 text-center text-xs font-bold text-white">
        {count}
      </span>
    </Link>
  );
}
