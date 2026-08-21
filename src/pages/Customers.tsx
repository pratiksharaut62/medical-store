import { useState } from "react";
import { Upload, Plus, Search, Calendar } from "lucide-react";
import { useCustomersData } from "@/hooks/useCustomersData";
import { CustomersKpiRow } from "@/components/customers/CustomersKpiRow";
import { Tabs } from "@/components/ui/Tabs";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { CustomersTable } from "@/components/customers/CustomersTable";
import { CustomerDetailPanel } from "@/components/customers/CustomerDetailPanel";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { mockCustomerGroupOptions, mockLoyaltyTierOptions } from "@/data/mockCustomersData";
import { CustomerTab } from "@/types/customers";

const TABS: { id: CustomerTab; label: string }[] = [
  { id: "all", label: "All Customers" },
  { id: "loyal", label: "Loyal Customers" },
  { id: "inactive", label: "Inactive Customers" },
];

/** Utility to format date into "Today, D MMM YYYY" or "D MMM YYYY" */
function formatDynamicDate(dateObj: Date): string {
  const formatted = dateObj.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const isToday = new Date().toDateString() === dateObj.toDateString();
  return isToday ? `Today, ${formatted}` : formatted;
}

/** Formats Date object to HTML "YYYY-MM-DD" string */
function toInputDateFormat(dateObj: Date): string {
  return dateObj.toISOString().split("T")[0];
}

export default function Customers() {
  const c = useCustomersData();

  // Dynamic state initialized to system date
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    toInputDateFormat(new Date())
  );
  const [isEditingDate, setIsEditingDate] = useState<boolean>(false);

  const currentDateObj = new Date(selectedDate);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-page-title text-text-primary">Customers</h1>
          <p className="text-body text-text-secondary">Manage your customer relationships and loyalty.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <Upload size={15} />
            Import Customers
          </Button>
          <Button variant="primary">
            <Plus size={15} />
            Add Customer
          </Button>

          {/* Dynamic & Editable Today Date Button */}
          {isEditingDate ? (
            <div className="flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-1 text-caption font-medium text-text-primary">
              <Calendar size={15} />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded border border-border bg-transparent px-1 py-0.5 text-caption text-text-primary focus:outline-none"
              />
              <button
                onClick={() => setIsEditingDate(false)}
                className="ml-1 text-xs font-semibold text-primary hover:underline"
              >
                Done
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingDate(true)}
              className="flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2 text-caption font-medium text-text-primary hover:bg-surface-hover"
              title="Click to change date"
            >
              <Calendar size={15} />
              {formatDynamicDate(currentDateObj)}
            </button>
          )}
        </div>
      </div>

      <CustomersKpiRow kpis={c.kpis} />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
          <Tabs tabs={TABS} activeTab={c.activeTab} onSelect={c.setActiveTab} />

          <div className="my-4 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] flex-1">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                value={c.filters.search}
                onChange={(e) => c.updateFilters({ search: e.target.value })}
                type="text"
                placeholder="Search by name, phone, email..."
                className="h-10 w-full rounded-sm border border-border bg-surface pl-9 pr-3 text-body text-text-primary placeholder:text-text-disabled focus:border-primary"
              />
            </div>
            <FilterSelect
              label="Customer Group"
              value={c.filters.group}
              options={mockCustomerGroupOptions}
              onChange={(v) => c.updateFilters({ group: v })}
            />
            <FilterSelect
              label="Loyalty Tier"
              value={c.filters.loyaltyTier}
              options={mockLoyaltyTierOptions}
              onChange={(v) => c.updateFilters({ loyaltyTier: v })}
            />
            <FilterSelect
              label="Status"
              value={c.filters.status}
              options={["All Status", "Active", "Inactive"]}
              onChange={(v) => c.updateFilters({ status: v })}
            />
          </div>

          <div className="overflow-x-auto">
            <CustomersTable
              items={c.items}
              selectedCustomerId={c.selectedCustomer?.id ?? null}
              onSelect={c.selectCustomer}
            />
          </div>

          <Pagination
            page={c.page}
            totalPages={c.totalPages}
            onPageChange={c.setPage}
            totalCount={c.totalFilteredCount}
            pageSize={c.pageSize}
          />
        </div>

        <div>
          {c.selectedCustomer ? (
            <CustomerDetailPanel customer={c.selectedCustomer} onClose={c.clearSelectedCustomer} />
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-border bg-surface p-8 text-center text-body text-text-secondary">
              Select a customer to see their details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}