"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { Product } from "@/types/product";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";
import { Price, PriceWithCompare } from "@/components/ui/price";
import { QuantityStepper } from "@/components/ui/quantity-stepper";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const isAvailable = product.availability === "available";
  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("");
  const addItem = useCartStore((state) => state.addItem);
  const openDrawer = useCartStore((state) => state.openDrawer);

  const selectedVariant = useMemo(
    () => product.variants.find((variant) => variant.id === variantId) ?? product.variants[0],
    [product.variants, variantId]
  );
  const compareAtForVariant = useMemo(() => {
    if (!product.compareAtPrice || product.compareAtPrice <= product.price) return undefined;
    const ratio = product.compareAtPrice / product.price;
    return Math.round(selectedVariant.price * ratio);
  }, [product.compareAtPrice, product.price, selectedVariant.price]);

  function addToCart() {
    if (!isAvailable) {
      setStatus(`${product.name} is coming soon.`);
      return;
    }

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      variantId: selectedVariant.id,
      variantLabel: selectedVariant.label,
      unitPrice: selectedVariant.price,
      quantity
    });
    setStatus(`${product.name} added to cart.`);
    openDrawer();
  }

  return (
    <div className="rounded-lg border border-[var(--line)] bg-white p-5 md:p-6">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[var(--mint)]">
        <Image
          alt={`${product.name} package detail`}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 38vw, 100vw"
          src={product.gallery[1] ?? product.image}
        />
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold">{isAvailable ? "Choose size" : "Planned sizes"}</legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {product.variants.map((variant) => (
            <label
              className="cursor-pointer rounded-lg border border-[var(--line)] bg-[var(--background)] p-4 transition has-[:checked]:border-[var(--leaf)] has-[:checked]:bg-[var(--mint)]"
              key={variant.id}
            >
              <input
                checked={variantId === variant.id}
                className="sr-only"
                disabled={!isAvailable}
                name="variant"
                type="radio"
                value={variant.id}
                onChange={() => setVariantId(variant.id)}
              />
              <span className="block text-sm font-semibold">{variant.label}</span>
              <span className="mt-1 block text-sm text-[var(--muted)]">
                <Price currency={product.currency} value={variant.price} /> / {variant.unit}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--muted)]">Quantity</p>
          <div className="mt-2">
            {isAvailable ? (
              <QuantityStepper value={quantity} onChange={setQuantity} />
            ) : (
              <span className="inline-flex h-11 items-center rounded-lg border border-[var(--line)] bg-[var(--mint)] px-4 text-sm font-semibold text-[var(--leaf-deep)]">
                Launching soon
              </span>
            )}
          </div>
        </div>
        <div className="text-2xl">
          {isAvailable ? (
            <PriceWithCompare
              compareAtPrice={compareAtForVariant ? compareAtForVariant * quantity : undefined}
              currency={product.currency}
              showSavingsPill={false}
              value={selectedVariant.price * quantity}
            />
          ) : (
            <p className="font-semibold">Coming soon</p>
          )}
        </div>
      </div>

      <Button className="mt-6 w-full" disabled={!isAvailable} type="button" onClick={addToCart}>
        {isAvailable ? "Add to cart" : "Coming soon"}
      </Button>
      <p className="mt-3 min-h-6 text-sm text-[var(--leaf-deep)]" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
