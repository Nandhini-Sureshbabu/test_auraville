import Link from "next/link";

const links = [
  { label: "Shop all", href: "/products" },
  { label: "Login", href: "/auth" },
  { label: "Cart", href: "/cart" },
  { label: "Checkout", href: "/checkout" }
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--line)] bg-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link className="brand-mark focus-ring inline-block rounded-lg text-2xl font-bold" href="/">
            Auraville
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-[var(--muted)]">
            Palmyra sprout snacks bringing a forgotten ingredient back to everyday shelves.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            {links.map((link) => (
              <li key={link.href}>
                <Link className="focus-ring rounded-lg transition hover:text-[var(--foreground)]" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Trust</h2>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            Ingredient-led recipes, clean labels, honest launches, and Razorpay-ready checkout.
          </p>
        </div>
      </div>
    </footer>
  );
}
