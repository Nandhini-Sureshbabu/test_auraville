import Link from "next/link";
import { categories, products } from "@/lib/products";
import { SectionHeader } from "@/components/ui/section-header";

export function Categories() {
  return (
    <section className="bg-white py-20" aria-labelledby="shop-by-category">
      <div className="container-page">
        <SectionHeader
          eyebrow="Product roadmap"
          title="Palmyra sprout in formats people already love."
          body="Energy bars are live now. Cookies, health mix, laddu, and combo packs are being built around the same core ingredient."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => {
            const count = products.filter((product) => product.category === category).length;

            return (
              <Link
                className="focus-ring rounded-lg border border-[var(--line)] bg-[var(--mint)] p-6 transition hover:-translate-y-1 hover:border-[var(--leaf)] hover:bg-white"
                href={`/products?category=${category}`}
                key={category}
              >
                <h3 className="text-xl font-semibold">{category}</h3>
                <p className="mt-3 text-sm text-[var(--muted)]">{count} products</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
