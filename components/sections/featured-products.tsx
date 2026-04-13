import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="container-page py-20" aria-labelledby="featured-products">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeader
          eyebrow="Auraville shelf"
          title="One product live. The rest is taking shape."
          body="Start with the palmyra sprout energy bar, then follow cookies, health mix, laddu, and launch bundles as they arrive."
        />
        <Button href="/products" variant="secondary">
          Shop range
        </Button>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product, index) => (
          <ProductCard key={product.id} priority={index < 2} product={product} />
        ))}
      </div>
    </section>
  );
}
