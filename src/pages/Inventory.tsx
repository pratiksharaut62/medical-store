import { Upload, Plus, ChevronDown } from "lucide-react";
import { useInventoryData } from "@/hooks/useInventoryData";
import { InventoryKpiRow } from "@/components/inventory/InventoryKpiRow";
import { InventoryTabs } from "@/components/inventory/InventoryTabs";
import { InventoryFilters } from "@/components/inventory/InventoryFilters";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { Pagination } from "@/components/ui/Pagination";
import { StockValueByCategoryPanel } from "@/components/inventory/StockValueByCategoryPanel";
import { InventoryQuickActionsPanel } from "@/components/inventory/InventoryQuickActionsPanel";
import { StockAgeingPanel } from "@/components/inventory/StockAgeingPanel";
import { mockCategoryOptions, mockSupplierOptions } from "@/data/mockInventoryData";
import { Button } from "@/components/ui/Button";
import { ImportStockModal } from "@/components/inventory/ImportStockModal";

/**
 *  "Find stock, understand stock state, take stock action."
 * Table + filters + tabs on the left; category/ageing/quick-action
 * widgets on the right. Every piece of state (tab, filters, page)
 * lives in useInventoryData — swap its data source for a real API and
 * every component below keeps working unchanged.
 */
export default function Inventory() {
  const inv = useInventoryData();

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-page-title text-text-primary">Inventory</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <Upload size={15} />
            Import Stock
          </Button>
          <Button variant="primary">
            <Plus size={15} />
            Add Item
          </Button>
          <Button variant="secondary">
            More
            <ChevronDown size={15} />
          </Button>
        </div>
      </div>

      <InventoryKpiRow kpis={inv.kpis} />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Left: table workspace */}
        <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
          <InventoryTabs activeTab={inv.activeTab} onSelect={inv.selectTab} />

          <div className="my-4">
            <InventoryFilters
              filters={inv.filters}
              onChange={inv.updateFilters}
              categoryOptions={mockCategoryOptions}
              supplierOptions={mockSupplierOptions}
            />
          </div>

          <div className="overflow-x-auto">
            <InventoryTable items={inv.items} />
          </div>

          <Pagination
            page={inv.page}
            totalPages={inv.totalPages}
            onPageChange={inv.setPage}
            totalCount={inv.totalFilteredCount}
            pageSize={inv.pageSize}
          />
        </div>

        {/* Right: business-health widgets */}
        <div className="space-y-6">
          <StockValueByCategoryPanel
            slices={inv.stockValueByCategory}
            totalLabel={inv.totalStockValueCompact}
          />
          <InventoryQuickActionsPanel actions={inv.quickActions} />
          <StockAgeingPanel buckets={inv.stockAgeing} />
        </div>
      </div>
    </div>
  );
}
