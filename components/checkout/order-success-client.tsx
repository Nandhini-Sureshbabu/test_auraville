"use client";

import { useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import type { CartItem } from "@/types/product";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/components/ui/price";

type LastOrder = {
  id: string;
  items: CartItem[];
  total: number;
};

function subscribeToStorage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function readLastOrder() {
  const rawOrder = sessionStorage.getItem("auraville-last-order");
  if (!rawOrder) return null;

  try {
    return JSON.parse(rawOrder) as LastOrder;
  } catch {
    return null;
  }
}

export function OrderSuccessClient() {
  const searchParams = useSearchParams();
  const order = useSyncExternalStore(subscribeToStorage, readLastOrder, () => null);
  const orderId = searchParams.get("order");

  return (
    <section className="mx-auto max-w-3xl rounded-lg border border-[var(--line)] bg-white p-6 text-center md:p-10">
      <p className="text-sm font-semibold uppercase text-[var(--coral)]">Order confirmed</p>
      <h1 className="mt-4 text-4xl font-semibold leading-tight">Your Auraville order is in.</h1>
      <p className="mt-4 text-base leading-7 text-[var(--muted)]">
        We will send dispatch updates to your email after payment and fulfillment are connected.
      </p>
      <div className="mt-8 rounded-lg bg-[var(--mint)] p-5 text-left">
        <h2 className="font-semibold">Order summary</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">Reference: {order?.id ?? orderId ?? "AUR-PENDING"}</p>
        {order?.items?.length ? (
          <ul className="mt-5 space-y-3 text-sm">
            {order.items.map((item) => (
              <li className="flex justify-between gap-4" key={`${item.productId}-${item.variantId}`}>
                <span>
                  {item.quantity} x {item.name} ({item.variantLabel})
                </span>
                <span className="font-semibold">{formatPrice(item.unitPrice * item.quantity)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 text-sm text-[var(--muted)]">Order details will appear after backend confirmation.</p>
        )}
        <p className="mt-5 border-t border-[var(--line)] pt-4 text-right font-semibold">
          Total {formatPrice(order?.total ?? 0)}
        </p>
      </div>
      <Button className="mt-8" href="/products">
        Continue shopping
      </Button>
    </section>
  );
}
