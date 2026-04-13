import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductGridClient } from "@/components/product/product-grid-client";
import { getPriceRange, products } from "@/lib/products";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop Palmyra Sprout Snacks",
  description:
    "Shop Auraville palmyra sprout energy bars and preview coming-soon cookies, health mix, laddu, and combos.",
  alternates: {
    canonical: absoluteUrl("/products")
  },
  openGraph: {
    title: "Shop Palmyra Sprout Snacks | Auraville",
    description:
      "Palmyra sprout energy bars available now, with cookies, health mix, laddu, and combos coming soon.",
    url: absoluteUrl("/products")
  }
};

export const dynamic = "force-static";

export default function ProductsPage() {
  const priceRange = getPriceRange();

  return (
    <div className="container-page py-12 md:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase text-[var(--coral)]">Shop Auraville</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
          Shop the palmyra sprout range.
        </h1>
        <p className="mt-5 text-base leading-7 text-[var(--muted)]">
          The energy bar is ready to buy now. The rest of the shelf is marked clearly as coming soon.
        </p>
      </div>
      <div className="mt-10">
        <Suspense fallback={<div className="rounded-lg border border-[var(--line)] bg-white p-8">Loading products...</div>}>
          <ProductGridClient maxPrice={priceRange.max} minPrice={priceRange.min} products={products} />
        </Suspense>
      </div>
    </div>
  );
}
