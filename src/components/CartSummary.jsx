import { formatCurrency } from '../utils/formatCurrency.js';

export default function CartSummary({ cartItems, totals, onAdjust }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Keranjang</h2>
          <p className="text-sm text-slate-500">Meja 12 · Dine in</p>
        </div>
        <span className="badge">{cartItems.length} item aktif</span>
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
                  onClick={() => onAdjust(item.id, -1)}
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  className="h-8 w-8 rounded-full border border-slate-200 text-sm font-semibold text-slate-600"
                  onClick={() => onAdjust(item.id, 1)}
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
          <span>{formatCurrency(totals.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-slate-500">
          <span>Pajak 11%</span>
          <span>{formatCurrency(totals.tax)}</span>
        </div>
        <div className="flex items-center justify-between text-slate-500">
          <span>Diskon (Promo)</span>
          <span>- {formatCurrency(totals.discount)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold">
          <span>Total Bayar</span>
          <span>{formatCurrency(totals.total)}</span>
        </div>
      </div>
    </div>
  );
}
