import { Button } from "@/components/ui/button";

export function ShopCta() {
  return (
    <section className="container-page py-12">
      <div className="rounded-lg bg-[var(--leaf-deep)] p-8 text-white md:p-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Start with the energy bar.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#dfeee5]">
            Cookies, health mix, laddu, and combo packs are coming soon as the palmyra sprout range grows.
          </p>
          <Button className="mt-8 bg-white text-[var(--leaf-deep)] hover:bg-[var(--mint)]" href="/product/palmyra-sprout-energy-bar">
            Buy energy bar
          </Button>
        </div>
      </div>
    </section>
  );
}
