import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-170px)] overflow-hidden bg-[var(--leaf-deep)] text-white">
      <Image
        alt="Palmyra sprout energy bars and natural snack ingredients"
        className="object-cover opacity-45"
        fill
        priority
        sizes="100vw"
        src="https://images.unsplash.com/photo-1632370161597-9c8429934d1b?auto=format&fit=crop&w=1800&q=86"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,35,27,0.94)_0%,rgba(21,35,27,0.78)_46%,rgba(21,35,27,0.2)_100%)]" />
      <div className="container-page relative flex min-h-[calc(100svh-170px)] items-center py-12 md:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase text-[#ffd9de]">Now live: Palmyra Sprout Energy Bar</p>
          <h1 className="mt-5 text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">
            Bringing palmyra sprout back to the snack shelf.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#e7f7ea]">
            Auraville starts with one forgotten ingredient and turns it into familiar foods:
            energy bars now, cookies, health mix, and laddu coming next.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="bg-white text-[var(--leaf-deep)] hover:bg-[var(--mint)]" href="/product/palmyra-sprout-energy-bar">
              Shop energy bar
            </Button>
            <Button className="border-white bg-transparent text-white hover:border-white hover:bg-white hover:text-[var(--leaf-deep)]" href="/products" variant="secondary">
              View coming soon
            </Button>
          </div>
          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-y border-[var(--line)] py-6">
            {[
              ["1", "Product live"],
              ["3", "Formats coming"],
              ["100%", "Palmyra-led range"]
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-2xl font-bold">{value}</dt>
                <dd className="mt-1 text-xs leading-5 text-[#d7eadc]">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
