import { useMemo, useState } from "react";
import { BillLineItem, MedicineListing, PaymentMethod } from "@/types/billing";
import {
  mockCategories,
  mockFrequentlySold,
  mockCustomers,
  mockBillingSessionMeta,
  mockInitialBillLines,
} from "@/data/mockBillingData";

/**
 * Owns every piece of POS interaction state: search/category filters,
 * the current bill's line items, bill-level discount, customer, and
 * payment method — plus the derived totals every summary row reads.
 *
 * The catalog/session-meta reads (`mockCategories`, `mockFrequentlySold`,
 * `mockBillingSessionMeta`) are the seam to swap for real API calls;
 * everything below that is pure client-side cart logic and stays as-is
 * once a backend exists.
 */
export function useBillingSession() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const [lines, setLines] = useState<BillLineItem[]>(mockInitialBillLines);
  const [billDiscountPct, setBillDiscountPct] = useState(0);
  const [customerId, setCustomerId] = useState(mockCustomers[0].id);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [note, setNote] = useState("");

  const filteredCatalog = useMemo(() => {
    return mockFrequentlySold.filter((m) => {
      const matchesCategory = activeCategoryId === "all" || m.categoryId === activeCategoryId;
      const matchesQuery =
        searchQuery.trim().length === 0 ||
        m.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategoryId, searchQuery]);

  function addMedicine(medicine: MedicineListing) {
    setLines((prev) => {
      const existing = prev.find((l) => l.medicineId === medicine.id);
      if (existing) {
        return prev.map((l) =>
          l.medicineId === medicine.id ? { ...l, qty: l.qty + 1 } : l
        );
      }
      const newLine: BillLineItem = {
        lineId: `line-${Date.now()}`,
        medicineId: medicine.id,
        name: medicine.name,
        packInfo: medicine.packInfo,
        batch: medicine.defaultBatch,
        expiry: medicine.defaultExpiry,
        qty: 1,
        mrp: medicine.mrp,
        discountPct: 0,
      };
      return [...prev, newLine];
    });
  }

  function updateQty(lineId: string, delta: number) {
    setLines((prev) =>
      prev
        .map((l) => (l.lineId === lineId ? { ...l, qty: Math.max(1, l.qty + delta) } : l))
        .filter((l) => l.qty > 0)
    );
  }

  function removeLine(lineId: string) {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId));
  }

  const totals = useMemo(() => {
    const subtotal = lines.reduce((sum, l) => sum + l.mrp * l.qty, 0);
    const postLineDiscount = lines.reduce(
      (sum, l) => sum + l.mrp * l.qty * (1 - l.discountPct / 100),
      0
    );
    const lineDiscountAmount = subtotal - postLineDiscount;
    const billDiscountAmount = postLineDiscount * (billDiscountPct / 100);
    const taxable = postLineDiscount - billDiscountAmount;
    const gstAmount = taxable * (mockBillingSessionMeta.gstPct / 100);
    const total = taxable + gstAmount;

    return {
      itemCount: lines.length,
      subtotal,
      lineDiscountAmount,
      billDiscountAmount,
      gstAmount,
      total,
    };
  }, [lines, billDiscountPct]);

  return {
    meta: mockBillingSessionMeta,
    categories: mockCategories,
    customers: mockCustomers,
    catalog: filteredCatalog,
    searchQuery,
    setSearchQuery,
    activeCategoryId,
    setActiveCategoryId,
    lines,
    addMedicine,
    updateQty,
    removeLine,
    billDiscountPct,
    setBillDiscountPct,
    customerId,
    setCustomerId,
    paymentMethod,
    setPaymentMethod,
    note,
    setNote,
    totals,
  };
}

export type BillingSession = ReturnType<typeof useBillingSession>;
