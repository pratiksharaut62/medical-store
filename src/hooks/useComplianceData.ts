import { useMemo, useState } from "react";
import { ComplianceTab, ComplianceFiltersState } from "@/types/compliance";
import {
  mockComplianceRecords,
  mockComplianceKpis,
  mockRecentActivities,
  mockComplianceQuickActions,
} from "@/data/mockComplianceData";

const PAGE_SIZE = 8;

const TAB_TO_STATUS: Record<ComplianceTab, string | null> = {
  all: null,
  upcoming: "upcoming",
  overdue: "overdue",
  completed: "completed",
};

export function useComplianceData() {
  const [activeTab, setActiveTab] = useState<ComplianceTab>("all");
  const [filters, setFilters] = useState<ComplianceFiltersState>({
    search: "",
    category: "All",
    type: "All",
    status: "All",
  });
  const [page, setPage] = useState(1);

  function updateFilters(patch: Partial<ComplianceFiltersState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  }

  function selectTab(tab: ComplianceTab) {
    setActiveTab(tab);
    setPage(1);
  }

  const filteredRecords = useMemo(() => {
    const tabStatus = TAB_TO_STATUS[activeTab];
    return mockComplianceRecords.filter((r) => {
      const matchesTab = !tabStatus || r.status === tabStatus;
      const matchesSearch =
        filters.search.trim().length === 0 ||
        r.name.toLowerCase().includes(filters.search.trim().toLowerCase());
      const matchesCategory = filters.category === "All" || r.category === filters.category;
      const matchesType = filters.type === "All" || r.frequency === filters.type;
      return matchesTab && matchesSearch && matchesCategory && matchesType;
    });
  }, [activeTab, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE));
  const pageItems = filteredRecords.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return {
    kpis: mockComplianceKpis,
    recentActivities: mockRecentActivities,
    quickActions: mockComplianceQuickActions,
    activeTab,
    selectTab,
    filters,
    updateFilters,
    items: pageItems,
    totalFilteredCount: filteredRecords.length,
    page,
    setPage,
    totalPages,
    pageSize: PAGE_SIZE,
  };
}
