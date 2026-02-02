import { useMemo, useState } from 'react';
import CartSummary from './components/CartSummary.jsx';
import Header from './components/Header.jsx';
import PaymentPanel from './components/PaymentPanel.jsx';
import ProductList from './components/ProductList.jsx';
import { catalog } from './data/catalog.js';
import { calculateTotals, getCashChange } from './utils/checkout.js';

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

  const totals = useMemo(() => calculateTotals(cartItems), [cartItems]);
  const cashChange = useMemo(
    () => getCashChange(cashReceived, totals.total),
    [cashReceived, totals.total]
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
      <Header />

      <main className="mx-auto grid max-w-6xl gap-6 px-6 py-6 lg:grid-cols-[1.6fr_1fr]">
        <ProductList
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          search={search}
          onSearchChange={setSearch}
          items={filteredItems}
          onAdd={handleAdd}
        />

        <aside className="space-y-6">
          <CartSummary
            cartItems={cartItems}
            totals={totals}
            onAdjust={handleAdjust}
          />
          <PaymentPanel
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
            cashReceived={cashReceived}
            onCashReceivedChange={setCashReceived}
            cashChange={cashChange}
            onReset={resetCart}
          />
        </aside>
      </main>
    </div>
  );
}
