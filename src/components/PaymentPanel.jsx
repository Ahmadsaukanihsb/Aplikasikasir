import { formatCurrency } from '../utils/formatCurrency.js';

const paymentMethods = ['QRIS', 'Kartu Debit', 'Tunai'];

export default function PaymentPanel({
  paymentMethod,
  onPaymentMethodChange,
  cashReceived,
  onCashReceivedChange,
  cashChange,
  onReset,
}) {
  return (
    <div className="card p-5">
      <h2 className="text-lg font-semibold">Pembayaran</h2>
      <p className="text-sm text-slate-500">
        Pilih metode pembayaran dan konfirmasi.
      </p>

      <div className="mt-4 space-y-3">
        {paymentMethods.map((method) => (
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
              onChange={() => onPaymentMethodChange(method)}
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
              onChange={(event) => onCashReceivedChange(event.target.value)}
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
          onClick={onReset}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
        >
          Batalkan Transaksi
        </button>
      </div>
    </div>
  );
}
