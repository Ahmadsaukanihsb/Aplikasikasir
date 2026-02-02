export const calculateTotals = (items) => {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.11);
  const discount = subtotal >= 100000 ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + tax - discount;

  return {
    subtotal,
    tax,
    discount,
    total,
  };
};

export const getCashChange = (cashReceived, total) => {
  const received = Number(cashReceived.replace(/\D/g, ''));
  return Math.max(0, received - total);
};
