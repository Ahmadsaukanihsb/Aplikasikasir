import { useMemo, useState } from 'react';

const catalog = [
  {
    id: 'kopi-susu',
    name: 'Kopi Susu Gula Aren',
    category: 'Minuman',
    price: 22000,
    stock: 18,
  },
  {
    id: 'espresso',
    name: 'Espresso Single',
    category: 'Minuman',
    price: 16000,
    stock: 22,
  },
  {
    id: 'brownies',
    name: 'Brownies Cokelat',
    category: 'Snack',
    price: 18000,
    stock: 12,
  },
  {
    id: 'croissant',
    name: 'Butter Croissant',
    category: 'Snack',
    price: 20000,
    stock: 9,
  },
  {
    id: 'teh-lemon',
    name: 'Iced Lemon Tea',
    category: 'Minuman',
    price: 15000,
    stock: 20,
  },
  {
    id: 'salad',
    name: 'Salad Ayam',
    category: 'Makanan',
    price: 32000,
    stock: 6,
  },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

export default function App() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [cart, setCart] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const [cashReceived, setCashReceived] = useState('');

  const categories = useMemo(() => {
    const unique = new Set(catalog.map((item) => item.category));
    return ['Semua', ...unique];
  }, []);

  const filteredItems = useMemo(() => {
    return catalog.filter((item) => {
      const matchesCategory =
        activeCategory === 'Semua' || item.category === activeCategory;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const cartItems = useMemo(() => Object.values(cart), [cart]);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.11);
  const discount = subtotal >= 100000 ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + tax - discount;

  const cashChange = Math.max(
    0,
    Number(cashReceived.replace(/\D/g, '')) - total
  );

  const handleAdd = (item) => {
    setCart((prev) => {
      const existing = prev[item.id];
      const nextQuantity = (existing?.quantity ?? 0) + 1;
      return {
        ...prev,
        [item.id]: {
          ...item,
          quantity: nextQuantity,
        },
      };
    });
  };

  const handleAdjust = (id, delta) => {
    setCart((prev) => {
      const existing = prev[id];
      if (!existing) return prev;
      const nextQuantity = existing.quantity + delta;
      if (nextQuantity <= 0) {
        const { [id]: _removed, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [id]: {
          ...existing,
          quantity: nextQuantity,
        },
      };
    });
  };

  const resetCart = () => {
    setCart({});
    setCashReceived('');
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-medium text-slate-400">Kasir</p>
            <h1 className="text-2xl font-bold text-slate-900">
              Aplikasi Kasir Nova Coffee
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge">Shift 2 · 14:00 - 22:00</span>
            <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
              Ringkas Laporan
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-6 py-6 lg:grid-cols-[1.6fr_1fr]">
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
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
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
            {filteredItems.map((item) => (
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
                  onClick={() => handleAdd(item)}
                  className="mt-4 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Tambah ke keranjang
                </button>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Keranjang</h2>
                <p className="text-sm text-slate-500">Meja 12 · Dine in</p>
              </div>
              <span className="badge">
                {cartItems.length} item aktif
              </span>
            </div>

            <div className="mt-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                  Belum ada produk di keranjang.
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {formatCurrency(item.price)} / item
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="h-8 w-8 rounded-full border border-slate-200 text-sm font-semibold text-slate-600"
                        onClick={() => handleAdjust(item.id, -1)}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        className="h-8 w-8 rounded-full border border-slate-200 text-sm font-semibold text-slate-600"
                        onClick={() => handleAdjust(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between text-slate-500">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Pajak 11%</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span>Diskon (Promo)</span>
                <span>- {formatCurrency(discount)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold">
                <span>Total Bayar</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-lg font-semibold">Pembayaran</h2>
            <p className="text-sm text-slate-500">
              Pilih metode pembayaran dan konfirmasi.
            </p>

            <div className="mt-4 space-y-3">
              {['QRIS', 'Kartu Debit', 'Tunai'].map((method) => (
                <label
                  key={method}
                  className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    paymentMethod === method
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span>{method}</span>
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    className="sr-only"
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />
                </label>
              ))}

              {paymentMethod === 'Tunai' && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                  <label className="text-xs font-semibold uppercase text-slate-500">
                    Uang diterima
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Masukkan nominal"
                    value={cashReceived}
                    onChange={(event) => setCashReceived(event.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    Kembalian: {formatCurrency(cashChange)}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <button className="rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white">
                Simpan & Cetak Struk
              </button>
              <button
                onClick={resetCart}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
              >
                Batalkan Transaksi
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
