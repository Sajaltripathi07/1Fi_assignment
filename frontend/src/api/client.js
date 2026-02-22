const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  throw new Error("VITE_API_URL is not defined");
}

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProductBySlug(slug) {
  const res = await fetch(`${API_BASE}/api/products/${slug}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
}
