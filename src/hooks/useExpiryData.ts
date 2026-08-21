import { useMemo, useState } from "react";
import { ExpiryTab, ExpiryFiltersState } from "@/types/expiry";
import {
  mockExpiryBatches,
  mockExpiryKpis,
  mockExpirySummary,
  mockExpiryQuickActions,
} from "@/data/mockExpiryData";

const PAGE_SIZE = 6;

/**
 * Mirrors useInventoryData's shape deliberately — same tab/filter/page
 * pattern, so InventoryTable-style components translate directly.
 * Swap mockExpiryBatches for `GET /api/expiry-batches?...` and move
 * filtering server-side; the return shape stays the same.
 */
export function useExpiryData() {
  const [activeTab, setActiveTab] = useState<ExpiryTab>("near-expiry");
  const [filters, setFilters] = useState<ExpiryFiltersState>({
    search: "",
    expiryWithin: "90 Days",
    category: "All",
    supplier: "All",
  });
  const [page, setPage] = useState(1);

  function updateFilters(patch: Partial<ExpiryFiltersState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  }

  function selectTab(tab: ExpiryTab) {
    setActiveTab(tab);
    setPage(1);
  }

  const filteredItems = useMemo(() => {
    const withinDays = filters.expiryWithin === "All" ? Infinity : parseInt(filters.expiryWithin, 10);
    return mockExpiryBatches.filter((item) => {
      const matchesSearch =
        filters.search.trim().length === 0 ||
        item.medicine.toLowerCase().includes(filters.search.trim().toLowerCase()) ||
        item.batchNo.toLowerCase().includes(filters.search.trim().toLowerCase());
      const matchesWithin = item.daysLeft <= withinDays;
      const matchesSupplier = filters.supplier === "All" || item.manufacturer === filters.supplier;
      return matchesSearch && matchesWithin && matchesSupplier;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const pageItems = filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return {
    kpis: mockExpiryKpis,
    summary: mockExpirySummary,
    quickActions: mockExpiryQuickActions,
    activeTab,
    selectTab,
    filters,
    updateFilters,
    items: pageItems,
    totalFilteredCount: filteredItems.length,
    page,
    setPage,
    totalPages,
    pageSize: PAGE_SIZE,
  };
}
