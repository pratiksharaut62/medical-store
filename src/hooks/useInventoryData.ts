import { useMemo, useState } from "react";
import { InventoryTab, InventoryFiltersState } from "@/types/inventory";
import {
  mockInventoryItems,
  mockInventoryKpis,
  mockInventoryTotalStockValueCompact,
  mockStockValueByCategory,
  mockInventoryQuickActions,
  mockStockAgeing,
} from "@/data/mockInventoryData";

const PAGE_SIZE = 7;

const TAB_TO_STATUS: Record<InventoryTab, string | null> = {
  all: null,
  "low-stock": "low-stock",
  "near-expiry": "near-expiry",
  expired: "expired",
};

/**
 * Owns tab, filter, and pagination state for the Inventory table, and
 * derives the visible page of items from them. Swap `mockInventoryItems`
 * for a real `GET /api/inventory?search=&category=&status=&page=` call —
 * move the filtering/pagination server-side at that point and this hook's
 * return shape doesn't need to change for InventoryTable/Filters to keep working.
 */
export function useInventoryData() {
  const [activeTab, setActiveTab] = useState<InventoryTab>("all");
  const [filters, setFilters] = useState<InventoryFiltersState>({
    search: "",
    category: "All",
    supplier: "All",
    status: "Active",
  });
  const [page, setPage] = useState(1);

  function updateFilters(patch: Partial<InventoryFiltersState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  }

  function selectTab(tab: InventoryTab) {
    setActiveTab(tab);
    setPage(1);
  }

  const filteredItems = useMemo(() => {
    return mockInventoryItems.filter((item) => {
      const tabStatus = TAB_TO_STATUS[activeTab];
      const matchesTab = !tabStatus || item.status === tabStatus;
      const matchesSearch =
        filters.search.trim().length === 0 ||
        item.name.toLowerCase().includes(filters.search.trim().toLowerCase()) ||
        item.manufacturer.toLowerCase().includes(filters.search.trim().toLowerCase());
      const matchesCategory = filters.category === "All" || item.category === filters.category;
      const matchesSupplier = filters.supplier === "All" || item.manufacturer === filters.supplier;
      return matchesTab && matchesSearch && matchesCategory && matchesSupplier;
    });
  }, [activeTab, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const pageItems = filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return {
    kpis: mockInventoryKpis,
    totalStockValueCompact: mockInventoryTotalStockValueCompact,
    stockValueByCategory: mockStockValueByCategory,
    quickActions: mockInventoryQuickActions,
    stockAgeing: mockStockAgeing,
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
