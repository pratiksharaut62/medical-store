import { useMemo, useState } from "react";
import { GstTab, GstFiltersState } from "@/types/gst";
import { mockGstReturns, mockGstKpis, mockGstBreakdown } from "@/data/mockGstData";

const PAGE_SIZE = 5;

export function useGstData() {
  const [activeTab, setActiveTab] = useState<GstTab>("summary");
  const [filters, setFilters] = useState<GstFiltersState>({
    search: "",
    returnType: "All",
    gstType: "All",
    status: "All",
  });
  const [page, setPage] = useState(1);

  function updateFilters(patch: Partial<GstFiltersState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  }

  const filteredReturns = useMemo(() => {
    return mockGstReturns.filter((r) => {
      const matchesSearch =
        filters.search.trim().length === 0 ||
        r.returnPeriod.toLowerCase().includes(filters.search.trim().toLowerCase());
      const matchesType = filters.returnType === "All" || r.returnType === filters.returnType;
      return matchesSearch && matchesType;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredReturns.length / PAGE_SIZE));
  const pageItems = filteredReturns.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return {
    kpis: mockGstKpis,
    breakdown: mockGstBreakdown,
    activeTab,
    setActiveTab,
    filters,
    updateFilters,
    items: pageItems,
    totalFilteredCount: filteredReturns.length,
    page,
    setPage,
    totalPages,
    pageSize: PAGE_SIZE,
  };
}
