import { MedicineListing } from "@/types/billing";
import { formatCurrency } from "@/lib/format";

interface FrequentlySoldGridProps {
  items: MedicineListing[];
  onSelect: (medicine: MedicineListing) => void;
}

export function FrequentlySoldGrid({ items, onSelect }: FrequentlySoldGridProps) {
  if (items.length === 0) {
    return (
      <div>
        <h2 className="mb-3 text-section-title text-text-primary">Frequently Sold</h2>
        <p className="text-body text-text-secondary">No medicines match this search.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-3 text-section-title text-text-primary">Frequently Sold</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="rounded-md border border-border bg-surface p-3 text-left transition-colors hover:border-primary hover:bg-primary-soft"
          >
            <p className="truncate text-body font-medium text-text-primary">{item.name}</p>
            <p className="truncate text-caption text-text-secondary">{item.packInfo}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-body font-semibold text-primary">
                {formatCurrency(item.mrp)}
              </span>
              <span className="text-caption text-text-secondary">Stock: {item.stock}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
