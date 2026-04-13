import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { Price } from "@/components/ui/price";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const isAvailable = product.availability === "available";

  return (
    <article className="group overflow-hidden rounded-lg border border-[var(--line)] bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#17211c1a]">
      <Link className="focus-ring block rounded-lg" href={`/product/${product.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--mint)]">
          <Image
            alt={product.name}
            className="object-cover transition duration-500 group-hover:scale-105"
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            src={product.image}
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[var(--leaf-deep)]">
              {isAvailable ? "Available now" : product.releaseNote ?? "Coming soon"}
            </span>
            {product.isNew ? (
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--coral)]">
                New
              </span>
            ) : null}
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase text-[var(--leaf)]">{product.category}</p>
            <p className="text-xs text-[var(--muted)]">
              {isAvailable ? `${product.rating.toFixed(1)} stars` : "In development"}
            </p>
          </div>
          <h3 className="mt-3 text-lg font-semibold leading-snug">{product.name}</h3>
          <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-[var(--muted)]">
            {product.tagline}
          </p>
          <div className="mt-5 flex items-center justify-between">
            <p className="font-semibold">
              {isAvailable ? <Price currency={product.currency} value={product.price} /> : "Coming soon"}
            </p>
            <span className="text-sm font-semibold text-[var(--leaf-deep)]">
              {isAvailable ? "Shop now" : "Preview"}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
