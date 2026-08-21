import { useState } from "react";
import { Upload, Plus, Search, Download, Calendar } from "lucide-react";
import { usePurchasesData } from "@/hooks/usePurchasesData";
import { PurchasesKpiRow } from "@/components/purchases/PurchasesKpiRow";
import { Tabs } from "@/components/ui/Tabs";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { PurchasesTable } from "@/components/purchases/PurchasesTable";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { mockSupplierOptionsForPurchases } from "@/data/mockPurchasesData";
import { PurchaseTab } from "@/types/purchases";

const TABS: { id: PurchaseTab; label: string }[] = [
  { id: "all", label: "All Purchases" },
  { id: "purchase-orders", label: "Purchase Orders" },
  { id: "bills", label: "Bills" },
  { id: "returns", label: "Returns" },
];

/** Formats date dynamically into "Today, D MMM YYYY" or "D MMM YYYY" */
function formatDynamicDate(dateObj: Date): string {
  const formatted = dateObj.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const isToday = new Date().toDateString() === dateObj.toDateString();
  return isToday ? `Today, ${formatted}` : formatted;
}

/** Formats Date object into standard HTML date input string "YYYY-MM-DD" */
function toInputDateFormat(dateObj: Date): string {
  return dateObj.toISOString().split("T")[0];
}

export default function Purchases() {
  const p = usePurchasesData();

  // Dynamic Date State
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    toInputDateFormat(new Date())
  );
  const [isEditingDate, setIsEditingDate] = useState<boolean>(false);

  const currentDateObj = new Date(selectedDate);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-page-title text-text-primary">Purchases</h1>
          <p className="text-body text-text-secondary">Manage and track all your purchase orders and bills.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <Upload size={15} />
            Import Bill
          </Button>
          <Button variant="primary">
            <Plus size={15} />
            New Purchase
          </Button>

          {/* Dynamic Date Button aligned seamlessly alongside action buttons */}
          {isEditingDate ? (
            <div className="flex h-10 items-center gap-2 rounded-md border border-border bg-surface px-3 text-caption font-medium text-text-primary shadow-sm">
              <Calendar size={15} />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-caption text-text-primary focus:outline-none"
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
              className="flex h-10 items-center gap-2 rounded-md border border-border bg-surface px-3 text-caption font-medium text-text-primary shadow-sm hover:bg-surface-hover transition-colors"
              title="Click to edit date"
            >
              <Calendar size={15} />
              <span>{formatDynamicDate(currentDateObj)}</span>
            </button>
          )}
        </div>
      </div>

      <PurchasesKpiRow kpis={p.kpis} />

      <div className="mt-6 rounded-lg border border-border bg-surface p-4 shadow-card">
        <Tabs tabs={TABS} activeTab={p.activeTab} onSelect={p.setActiveTab} />

        <div className="my-4 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              value={p.filters.search}
              onChange={(e) => p.updateFilters({ search: e.target.value })}
              type="text"
              placeholder="Search by bill no., supplier, item..."
              className="h-10 w-full rounded-sm border border-border bg-surface pl-9 pr-3 text-body text-text-primary placeholder:text-text-disabled focus:border-primary"
            />
          </div>
          <FilterSelect
            label="Supplier"
            value={p.filters.supplier}
            options={mockSupplierOptionsForPurchases}
            onChange={(v) => p.updateFilters({ supplier: v })}
          />
          <FilterSelect
            label="Status"
            value={p.filters.status}
            options={["All Status", "Received", "Pending", "Cancelled"]}
            onChange={(v) => p.updateFilters({ status: v })}
          />
          <FilterSelect
            label="Payment Status"
            value={p.filters.paymentStatus}
            options={["All", "Paid", "Partial", "Unpaid"]}
            onChange={(v) => p.updateFilters({ paymentStatus: v })}
          />
          <Button variant="secondary" className="ml-auto">
            <Download size={15} />
            Export CSV
          </Button>
        </div>

        <div className="overflow-x-auto">
          <PurchasesTable items={p.items} />
        </div>

        <Pagination
          page={p.page}
          totalPages={p.totalPages}
          onPageChange={p.setPage}
          totalCount={p.totalFilteredCount}
          pageSize={p.pageSize}
        />
      </div>
    </div>
  );
}