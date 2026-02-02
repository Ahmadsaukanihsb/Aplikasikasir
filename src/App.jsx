import { useMemo, useState } from 'react';
import CartSummary from './components/CartSummary.jsx';
import Header from './components/Header.jsx';
import PaymentPanel from './components/PaymentPanel.jsx';
import ProductList from './components/ProductList.jsx';
import { catalog } from './data/catalog.js';
import useCart from './hooks/useCart.js';
import {
  calculateTotals,
  getCashChange,
  isCashSufficient,
  normalizeCashInput,
} from './utils/checkout.js';

export default function App() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const [cashReceived, setCashReceived] = useState('');

  const {
    cartItems,
    addItem,
    adjustItem,
    resetCart: resetCartState,
  } = useCart();

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

  const totals = useMemo(() => calculateTotals(cartItems), [cartItems]);
  const cashChange = useMemo(
    () => getCashChange(cashReceived, totals.total),
    [cashReceived, totals.total]
  );
  const isCashValid = useMemo(
    () => isCashSufficient(cashReceived, totals.total),
    [cashReceived, totals.total]
  );

  const handleAdd = (item) => addItem(item);

  const handleAdjust = (id, delta) => adjustItem(id, delta);

  const resetCart = () => {
    resetCartState();
    setCashReceived('');
  };

  const handleCashReceivedChange = (value) => {
    setCashReceived(normalizeCashInput(value));
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
            onCashReceivedChange={handleCashReceivedChange}
            cashChange={cashChange}
            total={totals.total}
            isCashValid={isCashValid}
            onReset={resetCart}
          />
        </aside>
      </main>
    </div>
  );
}
