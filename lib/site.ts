export const siteConfig = {
  name: "Auraville",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://auraville.com",
  description:
    "Palmyra sprout snacks and heritage foods made for modern everyday energy.",
  nav: [
    { label: "Shop", href: "/products" },
    { label: "Energy Bar", href: "/product/palmyra-sprout-energy-bar" },
    { label: "Coming Soon", href: "/products?category=Cookies" },
    { label: "Cart", href: "/cart" }
  ]
};

export function absoluteUrl(path = "") {
  const base = siteConfig.url.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
