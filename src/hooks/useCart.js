import { useMemo, useState } from 'react';

export default function useCart() {
  const [cart, setCart] = useState({});

  const cartItems = useMemo(() => Object.values(cart), [cart]);

  const addItem = (item) => {
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

  const adjustItem = (id, delta) => {
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
  };

  return {
    cartItems,
    addItem,
    adjustItem,
    resetCart,
  };
}
