"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Product, ProductCategory } from "@/types/product";
import { categories } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";
import { formatPrice } from "@/components/ui/price";

type SortKey = "popular" | "newest" | "price-asc" | "price-desc";

type ProductGridClientProps = {
  products: Product[];
  minPrice: number;
  maxPrice: number;
};

const pageSize = 6;

export function ProductGridClient({ products, minPrice, maxPrice }: ProductGridClientProps) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") as ProductCategory | null;
  const [category, setCategory] = useState<ProductCategory | "All">(
    categoryFromUrl && categories.includes(categoryFromUrl) ? categoryFromUrl : "All"
  );
  const [sort, setSort] = useState<SortKey>("popular");
  const [price, setPrice] = useState(maxPrice);
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => category === "All" || product.category === category)
      .filter((product) => product.price <= price)
      .sort((a, b) => {
        if (sort === "newest") return Number(b.isNew) - Number(a.isNew);
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        return b.popularity - a.popularity;
      });
  }, [category, price, products, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const visibleProducts = filteredProducts.slice(0, page * pageSize);

  function updateCategory(value: ProductCategory | "All") {
    setCategory(value);
    setPage(1);
  }

  function updateSort(value: SortKey) {
    setSort(value);
    setPage(1);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-lg border border-[var(--line)] bg-white p-5 lg:sticky lg:top-28">
        <div>
          <label className="text-sm font-semibold" htmlFor="category">
            Category
          </label>
          <Select
            className="mt-2"
            id="category"
            value={category}
            onChange={(event) => updateCategory(event.target.value as ProductCategory | "All")}
          >
            <option value="All">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </div>

        <div className="mt-6">
          <label className="text-sm font-semibold" htmlFor="sort">
            Sort
          </label>
          <Select
            className="mt-2"
            id="sort"
            value={sort}
            onChange={(event) => updateSort(event.target.value as SortKey)}
          >
            <option value="popular">Popular</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </Select>
        </div>

        <div className="mt-6">
          <label className="text-sm font-semibold" htmlFor="price">
            Price up to {formatPrice(price)}
          </label>
          <input
            aria-label="Filter by maximum price"
            className="mt-4 w-full accent-[var(--leaf)]"
            id="price"
            max={maxPrice}
            min={minPrice}
            step="50"
            type="range"
            value={price}
            onChange={(event) => {
              setPrice(Number(event.target.value));
              setPage(1);
            }}
          />
          <div className="mt-2 flex justify-between text-xs text-[var(--muted)]">
            <span>{formatPrice(minPrice)}</span>
            <span>{formatPrice(maxPrice)}</span>
          </div>
        </div>
      </aside>

      <section aria-live="polite">
        <div className="flex flex-col justify-between gap-3 border-b border-[var(--line)] pb-5 sm:flex-row sm:items-center">
          <p className="text-sm text-[var(--muted)]">
            {filteredProducts.length} curated {filteredProducts.length === 1 ? "product" : "products"}
          </p>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setCategory("All");
              setSort("popular");
              setPrice(maxPrice);
              setPage(1);
            }}
          >
            Reset filters
          </Button>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product, index) => (
              <ProductCard key={product.id} priority={index < 3} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg border border-[var(--line)] bg-white p-8 text-center">
            <h2 className="text-xl font-semibold">No products match this filter.</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">Reset filters to see the full palmyra range.</p>
          </div>
        )}

        {page < pageCount ? (
          <div className="mt-10 flex justify-center">
            <Button type="button" variant="secondary" onClick={() => setPage((current) => current + 1)}>
              Load more
            </Button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
