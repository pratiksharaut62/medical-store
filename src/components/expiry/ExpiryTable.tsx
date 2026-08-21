import { MoreVertical } from "lucide-react";
import { ExpiryBatchItem } from "@/types/expiry";
import { StatusBadge, BadgeTone } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";

interface ExpiryTableProps {
  items: ExpiryBatchItem[];
}

/** Section 18: "Days Left" is the most important column — strong visual treatment as it gets critical. */
function daysLeftTone(days: number): BadgeTone {
  if (days <= 30) return "danger";
  if (days <= 60) return "warning";
  return "success";
}

export function ExpiryTable({ items }: ExpiryTableProps) {
  if (items.length === 0) {
    return (
      <p className="py-10 text-center text-body text-text-secondary">
        No near-expiry stock — all active batches are currently outside the selected window.
      </p>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-border text-left text-caption text-text-secondary">
          <th className="py-2.5 font-medium">Medicine</th>
          <th className="py-2.5 font-medium">Batch No</th>
          <th className="py-2.5 font-medium">Expiry Date</th>
          <th className="py-2.5 text-right font-medium">Stock Qty</th>
          <th className="py-2.5 text-right font-medium">Value (MRP)</th>
          <th className="py-2.5 font-medium">Days Left</th>
          <th className="py-2.5 font-medium">Action</th>
          <th className="w-8 py-2.5" />
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="border-b border-border last:border-0">
            <td className="py-3 pr-2">
              <p className="text-body font-medium text-text-primary">{item.medicine}</p>
              <p className="text-caption text-text-secondary">{item.manufacturer}</p>
            </td>
            <td className="py-3 pr-2 text-caption text-text-primary">{item.batchNo}</td>
            <td className="py-3 pr-2 text-caption text-text-primary">{item.expiryDate}</td>
            <td className="py-3 pr-2 text-right">
              <p className="tabular text-body text-text-primary">{item.stockQty}</p>
              <p className="text-caption text-text-secondary">{item.stockUnit}</p>
            </td>
            <td className="py-3 pr-2 text-right tabular text-body font-medium text-text-primary">
              {formatCurrency(item.valueMrp)}
            </td>
            <td className="py-3 pr-2">
              <StatusBadge label={`${item.daysLeft} Days`} tone={daysLeftTone(item.daysLeft)} />
            </td>
            <td className="py-3 pr-2">
              <Button variant="tertiary" className="text-caption font-semibold">
                Take Action
              </Button>
            </td>
            <td className="py-3">
              <button aria-label={`More actions for ${item.medicine}`} className="text-text-disabled hover:text-text-primary">
                <MoreVertical size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
