import { Minus, Plus, X } from "lucide-react";
import { BillLineItem } from "@/types/billing";
import { formatCurrency } from "@/lib/format";

interface BillItemRowProps {
  index: number;
  line: BillLineItem;
  onQtyChange: (delta: number) => void;
  onRemove: () => void;
}

/**
 * Section 13: only what's needed to complete the transaction — item,
 * batch, qty, MRP, discount, amount. No GST-per-row, no supplier, no
 * purchase rate here; those live in detailed batch views.
 */
export function BillItemRow({ index, line, onQtyChange, onRemove }: BillItemRowProps) {
  const amount = line.mrp * line.qty * (1 - line.discountPct / 100);

  return (
    <tr className="border-b border-border last:border-0">
      <td className="py-3 pr-2 align-top text-caption text-text-secondary">{index + 1}</td>
      <td className="py-3 pr-2 align-top">
        <p className="text-body font-medium text-text-primary">{line.name}</p>
        <p className="text-caption text-text-secondary">{line.packInfo}</p>
      </td>
      <td className="py-3 pr-2 align-top">
        <p className="text-caption text-text-primary">{line.batch}</p>
        <p className="text-caption text-text-secondary">EXP: {line.expiry}</p>
      </td>
      <td className="py-3 pr-2 align-top">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onQtyChange(-1)}
            aria-label="Decrease quantity"
            className="flex h-6 w-6 items-center justify-center rounded-sm border border-border text-text-secondary hover:border-primary hover:text-primary"
          >
            <Minus size={13} />
          </button>
          <span className="w-5 text-center text-body tabular text-text-primary">{line.qty}</span>
          <button
            onClick={() => onQtyChange(1)}
            aria-label="Increase quantity"
            className="flex h-6 w-6 items-center justify-center rounded-sm border border-border text-text-secondary hover:border-primary hover:text-primary"
          >
            <Plus size={13} />
          </button>
        </div>
      </td>
      <td className="py-3 pr-2 text-right align-top tabular text-body text-text-primary">
        {formatCurrency(line.mrp)}
      </td>
      <td className="py-3 pr-2 text-right align-top tabular text-body text-text-secondary">
        {line.discountPct}%
      </td>
      <td className="py-3 pr-2 text-right align-top tabular text-body font-semibold text-text-primary">
        {formatCurrency(amount)}
      </td>
      <td className="py-3 pl-1 align-top">
        <button
          onClick={onRemove}
          aria-label={`Remove ${line.name}`}
          className="text-text-disabled hover:text-danger"
        >
          <X size={16} />
        </button>
      </td>
    </tr>
  );
}
