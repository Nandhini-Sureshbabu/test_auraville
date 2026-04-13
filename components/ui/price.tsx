export function formatPrice(value: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

export function Price({ value, currency }: { value: number; currency?: string }) {
  return <span>{formatPrice(value, currency)}</span>;
}
