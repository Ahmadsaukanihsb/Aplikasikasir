import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateTotals,
  getCashChange,
  isCashSufficient,
  normalizeCashInput,
} from '../src/utils/checkout.js';

test('calculateTotals computes subtotal, tax, discount, and total', () => {
  const items = [
    { price: 20000, quantity: 2 },
    { price: 60000, quantity: 1 },
  ];

  const totals = calculateTotals(items);

  assert.equal(totals.subtotal, 100000);
  assert.equal(totals.tax, 11000);
  assert.equal(totals.discount, 5000);
  assert.equal(totals.total, 106000);
});

test('getCashChange returns zero when payment is insufficient', () => {
  assert.equal(getCashChange('5000', 10000), 0);
});

test('isCashSufficient validates received cash against total', () => {
  assert.equal(isCashSufficient('15000', 10000), true);
  assert.equal(isCashSufficient('9000', 10000), false);
});

test('normalizeCashInput strips non-digit characters', () => {
  assert.equal(normalizeCashInput('Rp 12.500'), '12500');
});
