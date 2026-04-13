const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.auraville.com";

type ApiOptions = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

export async function apiFetch<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const endpoint = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  if (!response.ok) {
    throw new Error(`Auraville API error ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const commerceApi = {
  products: {
    list: <T>() => apiFetch<T>("/products", { next: { revalidate: 300 } }),
    bySlug: <T>(slug: string) => apiFetch<T>(`/products/${slug}`, { next: { revalidate: 300 } })
  },
  checkout: {
    createOrder: <T>(payload: unknown) =>
      apiFetch<T>("/checkout/orders", {
        method: "POST",
        body: JSON.stringify(payload)
      })
  }
};
