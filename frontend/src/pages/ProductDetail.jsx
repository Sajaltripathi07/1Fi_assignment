import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductBySlug } from '../api/client';

function formatPrice(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);
}

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [step, setStep] = useState('select');

  useEffect(() => {
    fetchProductBySlug(slug)
      .then((p) => {
        setProduct(p);
        if (p.variants?.length) setSelectedVariant(p.variants[0]);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto animate-pulse">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="aspect-square bg-slate-200 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 bg-slate-200 rounded w-3/4" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
            <div className="h-24 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 mb-4">{error || 'Product not found'}</p>
        <Link to="/" className="text-emerald-600 font-medium hover:underline">Back to products</Link>
      </div>
    );
  }

  const price = selectedVariant?.price ?? product.variants?.[0]?.price;
  const mrp = selectedVariant?.mrp ?? product.variants?.[0]?.mrp;
  const displayImage = selectedVariant?.image || product.image;

  const handleProceed = () => {
    if (!selectedPlan) {
      alert('Please select an EMI plan.');
      return;
    }
    setStep('confirm');
  };

  const handleConfirmApplication = () => {
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Application received</h2>
        <p className="text-slate-600 mb-6">
          Your EMI application for <strong>{product.name}</strong> has been submitted. Our team will contact you shortly with the next steps.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex justify-center py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition"
          >
            Browse more products
          </Link>
          <button
            type="button"
            onClick={() => setStep('select')}
            className="inline-flex justify-center py-3 px-5 border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition"
          >
            View this product again
          </button>
        </div>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6 text-sm font-medium">
          ← Back to products
        </Link>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h2 className="text-lg font-semibold text-slate-800">Confirm your EMI application</h2>
            <p className="text-sm text-slate-600 mt-0.5">Review the details below before submitting.</p>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                <img src={displayImage} alt={product.name} className="w-full h-full object-contain p-2" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{product.name}</h3>
                <p className="text-slate-600 text-sm mt-0.5">
                  Variant: {selectedVariant?.name ?? 'Default'}
                </p>
                <p className="text-slate-800 font-medium mt-2">{formatPrice(price)}</p>
              </div>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <h4 className="text-sm font-semibold text-slate-700 mb-2">Selected EMI plan</h4>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="font-semibold text-slate-800">
                  {formatPrice(selectedPlan.monthlyAmount)}/month
                </p>
                <p className="text-slate-600 text-sm mt-1">
                  {selectedPlan.tenureMonths} months · {selectedPlan.interestRate}% interest
                </p>
                {selectedPlan.cashback && (
                  <p className="text-emerald-600 text-sm mt-1">{selectedPlan.cashback}</p>
                )}
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleConfirmApplication}
              className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition"
            >
              Confirm EMI application
            </button>
            <button
              type="button"
              onClick={() => setStep('select')}
              className="py-3 px-4 border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition"
            >
              Back to selection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6 text-sm font-medium">
        ← Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="aspect-square bg-slate-50 p-6 flex items-center justify-center">
            <img
              src={displayImage}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-800">{product.name}</h1>
          {product.description && (
            <p className="text-slate-600 mt-2">{product.description}</p>
          )}

          {product.variants?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Variant</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v._id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
                      selectedVariant?._id === v._id
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-800">{formatPrice(price)}</span>
            {mrp > price && (
              <span className="text-slate-400 line-through">{formatPrice(mrp)}</span>
            )}
          </div>

          {product.emiPlans?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">Choose EMI plan</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {product.emiPlans.map((plan) => (
                  <button
                    key={`${plan.tenureMonths}-${plan.monthlyAmount}`}
                    type="button"
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition ${
                      selectedPlan?.tenureMonths === plan.tenureMonths &&
                      selectedPlan?.monthlyAmount === plan.monthlyAmount
                        ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-800">
                        {formatPrice(plan.monthlyAmount)}/month
                      </span>
                      <span className="text-slate-600 text-sm">
                        {plan.tenureMonths} months · {plan.interestRate}% interest
                      </span>
                    </div>
                    {plan.cashback && (
                      <p className="text-emerald-600 text-sm mt-1">{plan.cashback}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleProceed}
            className="mt-8 w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-sm transition"
          >
            Proceed with selected plan
          </button>
        </div>
      </div>
    </div>
  );
}
