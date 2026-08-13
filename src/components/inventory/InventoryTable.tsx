import { MoreVertical } from "lucide-react";
import { InventoryItem, InventoryStatus } from "@/types/inventory";
import { StatusBadge, BadgeTone } from "@/components/ui/StatusBadge";
import { formatCurrency } from "@/lib/format";

interface InventoryTableProps {
  items: InventoryItem[];
}

const STATUS_LABEL: Record<InventoryStatus, string> = {
  "in-stock": "In Stock",
  "low-stock": "Low Stock",
  expired: "Expired",
  "near-expiry": "Near Expiry",
};

const STATUS_TONE: Record<InventoryStatus, BadgeTone> = {
  "in-stock": "success",
  "low-stock": "warning",
  expired: "danger",
  "near-expiry": "warning",
};

/**
 * Section 21: right-aligned numbers, left-aligned text, badges for
 * status, actions at the far right via a three-dot menu.
 */
export function InventoryTable({ items }: InventoryTableProps) {
  if (items.length === 0) {
    return (
      <p className="py-10 text-center text-body text-text-secondary">
        No items match the current filters.
      </p>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-border text-left text-caption text-text-secondary">
          <th className="w-8 py-2.5">
            <input type="checkbox" aria-label="Select all rows" />
          </th>
          <th className="py-2.5 font-medium">Item Details</th>
          <th className="py-2.5 font-medium">Category</th>
          <th className="py-2.5 font-medium">Pack</th>
          <th className="py-2.5 text-right font-medium">Stock Qty</th>
          <th className="py-2.5 text-right font-medium">MRP</th>
          <th className="py-2.5 text-right font-medium">Stock Value</th>
          <th className="py-2.5 font-medium">Status</th>
          <th className="w-8 py-2.5" />
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="border-b border-border last:border-0">
            <td className="py-3">
              <input type="checkbox" aria-label={`Select ${item.name}`} />
            </td>
            <td className="py-3 pr-2">
              <p className="text-body font-medium text-text-primary">{item.name}</p>
              <p className="text-caption text-text-secondary">{item.manufacturer}</p>
            </td>
            <td className="py-3 pr-2">
              <span className="rounded-sm bg-primary-soft px-2 py-0.5 text-caption font-medium text-primary">
                {item.category}
              </span>
            </td>
            <td className="py-3 pr-2 text-caption text-text-secondary">{item.pack}</td>
            <td className="py-3 pr-2 text-right">
              <p className="tabular text-body text-text-primary">{item.stockQty}</p>
              <p className="text-caption text-text-secondary">{item.stockUnit}</p>
            </td>
            <td className="py-3 pr-2 text-right tabular text-body text-text-primary">
              {formatCurrency(item.mrp)}
            </td>
            <td className="py-3 pr-2 text-right tabular text-body font-medium text-text-primary">
              {formatCurrency(item.mrp * item.stockQty)}
            </td>
            <td className="py-3 pr-2">
              <StatusBadge label={STATUS_LABEL[item.status]} tone={STATUS_TONE[item.status]} />
            </td>
            <td className="py-3">
              <button aria-label={`More actions for ${item.name}`} className="text-text-disabled hover:text-text-primary">
                <MoreVertical size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
