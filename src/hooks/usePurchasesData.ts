import { useMemo, useState } from "react";
import { PurchaseTab, PurchasesFiltersState } from "@/types/purchases";
import { mockPurchaseBills, mockPurchasesKpis } from "@/data/mockPurchasesData";

const PAGE_SIZE = 5;

export function usePurchasesData() {
  const [activeTab, setActiveTab] = useState<PurchaseTab>("all");
  const [filters, setFilters] = useState<PurchasesFiltersState>({
    search: "",
    supplier: "All Suppliers",
    status: "All Status",
    paymentStatus: "All",
  });
  const [page, setPage] = useState(1);

  function updateFilters(patch: Partial<PurchasesFiltersState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  }

  const filteredBills = useMemo(() => {
    return mockPurchaseBills.filter((b) => {
      const matchesSearch =
        filters.search.trim().length === 0 ||
        b.billNo.toLowerCase().includes(filters.search.trim().toLowerCase()) ||
        b.supplierName.toLowerCase().includes(filters.search.trim().toLowerCase());
      const matchesSupplier = filters.supplier === "All Suppliers" || b.supplierName === filters.supplier;
      return matchesSearch && matchesSupplier;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredBills.length / PAGE_SIZE));
  const pageItems = filteredBills.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return {
    kpis: mockPurchasesKpis,
    activeTab,
    setActiveTab,
    filters,
    updateFilters,
    items: pageItems,
    totalFilteredCount: filteredBills.length,
    page,
    setPage,
    totalPages,
    pageSize: PAGE_SIZE,
  };
}
