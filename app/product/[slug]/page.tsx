import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductJsonLd } from "@/components/product/product-json-ld";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { ProductCard } from "@/components/product/product-card";
import { PriceWithCompare } from "@/components/ui/price";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import { absoluteUrl } from "@/lib/site";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found"
    };
  }

  const url = absoluteUrl(`/product/${product.slug}`);

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: `${product.name} | Auraville`,
      description: product.description,
      url,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 900,
          alt: product.name
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Auraville`,
      description: product.description,
      images: [product.image]
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);
  const isAvailable = product.availability === "available";

  return (
    <div className="container-page py-10 md:py-14">
      <ProductJsonLd product={product} />
      <div className="grid gap-10 lg:grid-cols-[1fr_0.78fr]">
        <section aria-labelledby="product-title">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[var(--mint)]">
            <Image
              alt={product.name}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              src={product.image}
            />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {product.gallery.slice(0, 2).map((image, index) => (
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white" key={image}>
                <Image
                  alt={`${product.name} view ${index + 1}`}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 26vw, 50vw"
                  src={image}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="lg:sticky lg:top-28 lg:h-fit" aria-labelledby="product-title">
          <p className="text-sm font-semibold uppercase text-[var(--coral)]">{product.category}</p>
          <h1 id="product-title" className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            {product.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="text-xl">
              {isAvailable ? (
                <PriceWithCompare
                  compareAtPrice={product.compareAtPrice}
                  currency={product.currency}
                  value={product.price}
                />
              ) : (
                <p className="font-semibold">Coming soon</p>
              )}
            </div>
            <span className="rounded-full bg-[var(--mint)] px-3 py-1 text-sm font-bold text-[var(--leaf-deep)]">
              {isAvailable ? "Available now" : product.releaseNote ?? "Coming soon"}
            </span>
          </div>
          <p className="mt-5 text-base leading-8 text-[var(--muted)]">{product.longDescription}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.benefits.map((benefit) => (
              <span className="rounded-full bg-[var(--mint)] px-3 py-1 text-sm text-[var(--leaf-deep)]" key={benefit}>
                {benefit}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <ProductPurchasePanel product={product} />
          </div>

          <div className="mt-8 rounded-lg border border-[var(--line)] bg-white p-5">
            <h2 className="font-semibold">Ingredients</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              {product.ingredients.join(", ")}.
            </p>
            {isAvailable ? (
              <p className="mt-4 text-sm text-[var(--muted)]">
                Rated {product.rating.toFixed(1)} from {product.reviewCount} verified reviews.
              </p>
            ) : (
              <p className="mt-4 text-sm text-[var(--muted)]">
                Recipe in development. Final price and pack sizes may change before launch.
              </p>
            )}
          </div>
        </section>
      </div>

      <section className="mt-20" aria-labelledby="related-products">
        <h2 id="related-products" className="text-3xl font-semibold">
          More from the palmyra shelf
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>
    </div>
  );
}
