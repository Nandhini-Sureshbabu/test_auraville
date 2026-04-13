import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { CartStatus } from "@/components/layout/cart-status";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(251,255,252,0.9)] backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link className="brand-mark focus-ring rounded-lg text-2xl font-bold" href="/" aria-label="Auraville home">
          Auraville
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {siteConfig.nav.slice(0, 3).map((item) => (
            <Link
              className="focus-ring rounded-lg text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button className="hidden sm:inline-flex" href="/products" variant="secondary">
            Shop now
          </Button>
          <CartStatus />
        </div>
      </div>
    </header>
  );
}
