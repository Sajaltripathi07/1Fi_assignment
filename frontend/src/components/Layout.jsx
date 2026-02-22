import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-slate-200/80 shadow-sm">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight hover:opacity-90 transition">
            1Fi <span className="text-emerald-600">EMI</span>
          </Link>
          <nav>
            <Link
              to="/"
              className="text-slate-600 hover:text-emerald-600 font-medium transition text-sm sm:text-base"
            >
              Products
            </Link>
          </nav>
        </div>
      </header>
      <main className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 min-h-[calc(100vh-72px)]">
        {children}
      </main>
    </div>
  );
}
