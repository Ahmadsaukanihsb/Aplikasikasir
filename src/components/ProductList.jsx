import { formatCurrency } from '../utils/formatCurrency.js';

export default function ProductList({
  categories,
  activeCategory,
  onCategoryChange,
  search,
  onSearchChange,
  items,
  onAdd,
}) {
  return (
    <section className="space-y-6">
      <div className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Daftar Produk</h2>
            <p className="text-sm text-slate-500">
              Tambahkan produk ke keranjang pelanggan.
            </p>
          </div>
          <input
            className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm focus:border-slate-400 focus:outline-none sm:w-64"
            placeholder="Cari produk..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="card flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="badge">{item.category}</span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Stok: {item.stock} porsi
                </p>
              </div>
              <span className="text-base font-semibold text-slate-700">
                {formatCurrency(item.price)}
              </span>
            </div>
            <button
              onClick={() => onAdd(item)}
              className="mt-4 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Tambah ke keranjang
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
