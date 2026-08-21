import { useMemo, useState } from "react";
import { CustomerTab, CustomersFiltersState } from "@/types/customers";
import { mockCustomers, mockCustomersKpis } from "@/data/mockCustomersData";

const PAGE_SIZE = 7;

export function useCustomersData() {
  const [activeTab, setActiveTab] = useState<CustomerTab>("all");
  const [filters, setFilters] = useState<CustomersFiltersState>({
    search: "",
    group: "All Groups",
    loyaltyTier: "All Tiers",
    status: "All Status",
  });
  const [page, setPage] = useState(1);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(mockCustomers[0]?.id ?? null);

  function updateFilters(patch: Partial<CustomersFiltersState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
    setPage(1);
  }

  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter((c) => {
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "loyal" && (c.loyaltyTier === "Gold" || c.loyaltyTier === "Platinum")) ||
        (activeTab === "inactive" && c.status === "inactive");
      const matchesSearch =
        filters.search.trim().length === 0 ||
        c.name.toLowerCase().includes(filters.search.trim().toLowerCase()) ||
        c.phone.includes(filters.search.trim()) ||
        c.email.toLowerCase().includes(filters.search.trim().toLowerCase());
      const matchesGroup = filters.group === "All Groups" || c.group === filters.group;
      const matchesTier = filters.loyaltyTier === "All Tiers" || c.loyaltyTier === filters.loyaltyTier;
      return matchesTab && matchesSearch && matchesGroup && matchesTier;
    });
  }, [activeTab, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / PAGE_SIZE));
  const pageItems = filteredCustomers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const selectedCustomer = mockCustomers.find((c) => c.id === selectedCustomerId) ?? null;

  return {
    kpis: mockCustomersKpis,
    activeTab,
    setActiveTab,
    filters,
    updateFilters,
    items: pageItems,
    totalFilteredCount: filteredCustomers.length,
    page,
    setPage,
    totalPages,
    pageSize: PAGE_SIZE,
    selectedCustomer,
    selectCustomer: setSelectedCustomerId,
    clearSelectedCustomer: () => setSelectedCustomerId(null),
  };
}
