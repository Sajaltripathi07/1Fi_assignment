import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/client';

function formatPrice(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

function discountPercent(mrp, price) {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse mb-6 sm:mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse shadow-sm">
              <div className="aspect-[4/3] bg-slate-200" />
              <div className="p-5 lg:p-6 space-y-2">
                <div className="h-6 bg-slate-200 rounded w-3/4" />
                <div className="h-5 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-6 text-amber-800 max-w-2xl">
        {error}. Ensure backend is running and database is seeded.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 tracking-tight">
          Smartphones on EMI
        </h1>
        <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base">
          Choose your device and pay in easy monthly instalments.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 w-full">
        {products.map((p) => {
          const off = discountPercent(p.minMrp, p.minPrice);
          return (
            <Link
              key={p._id}
              to={`/products/${p.slug}`}
              className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex flex-col"
            >
              {off > 0 && (
                <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-sm font-semibold shadow-lg">
                  {off}% off
                </span>
              )}
              <div className="aspect-[4/3] bg-gradient-to-b from-slate-100 to-slate-50 overflow-hidden flex-shrink-0">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-contain p-6 lg:p-8 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500';
                  }}
                />
              </div>
              <div className="p-5 lg:p-6 flex flex-col flex-1">
                <h2 className="font-semibold text-slate-800 group-hover:text-emerald-700 transition text-base lg:text-lg line-clamp-2">
                  {p.name}
                </h2>
                <div className="mt-3 flex flex-wrap items-baseline gap-2">
                  <span className="text-slate-800 font-bold text-lg lg:text-xl">
                    From {formatPrice(p.minPrice)}
                  </span>
                  {p.minMrp > p.minPrice && (
                    <span className="text-slate-400 line-through text-sm lg:text-base">
                      {formatPrice(p.minMrp)}
                    </span>
                  )}
                </div>
                <span className="inline-block mt-4 text-emerald-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition">
                  View EMI plans →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
