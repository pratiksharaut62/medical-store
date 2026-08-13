import { Search, SlidersHorizontal } from "lucide-react";
import { InventoryFiltersState } from "@/types/inventory";

interface InventoryFiltersProps {
  filters: InventoryFiltersState;
  onChange: (patch: Partial<InventoryFiltersState>) => void;
  categoryOptions: string[];
  supplierOptions: string[];
}

/** Section 15: primary filters visible; anything beyond opens through "Filters". */
export function InventoryFilters({
  filters,
  onChange,
  categoryOptions,
  supplierOptions,
}: InventoryFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-[240px] flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
        />
        <input
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          type="text"
          placeholder="Search by name, brand or generics..."
          className="h-10 w-full rounded-sm border border-border bg-surface pl-9 pr-3 text-body text-text-primary placeholder:text-text-disabled focus:border-primary"
        />
      </div>

      <FilterSelect
        label="Category"
        value={filters.category}
        options={categoryOptions}
        onChange={(v) => onChange({ category: v })}
      />
      <FilterSelect
        label="Supplier"
        value={filters.supplier}
        options={supplierOptions}
        onChange={(v) => onChange({ supplier: v })}
      />
      <FilterSelect
        label="Status"
        value={filters.status}
        options={["Active", "Inactive"]}
        onChange={(v) => onChange({ status: v })}
      />

      <button className="flex h-10 items-center gap-2 rounded-sm border border-border bg-surface px-3 text-body font-medium text-text-primary">
        <SlidersHorizontal size={15} />
        Filters
      </button>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex h-10 items-center gap-2 rounded-sm border border-border bg-surface px-3">
      <span className="text-caption text-text-secondary">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-body text-text-primary"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
