export default function Header() {
  return (
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
  );
}
