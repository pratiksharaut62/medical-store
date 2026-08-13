import { useState } from "react";
import { MoreVertical, Plus } from "lucide-react";
import { BillLineItem } from "@/types/billing";
import { BillItemRow } from "./BillItemRow";
import { formatCurrency } from "@/lib/format";

interface Totals {
  itemCount: number;
  subtotal: number;
  lineDiscountAmount: number;
  billDiscountAmount: number;
  gstAmount: number;
  total: number;
}

interface CurrentBillPanelProps {
  billNo: string;
  lines: BillLineItem[];
  onQtyChange: (lineId: string, delta: number) => void;
  onRemove: (lineId: string) => void;
  billDiscountPct: number;
  onBillDiscountChange: (pct: number) => void;
  gstPct: number;
  totals: Totals;
  note: string;
  onNoteChange: (note: string) => void;
}

export function CurrentBillPanel({
  billNo,
  lines,
  onQtyChange,
  onRemove,
  billDiscountPct,
  onBillDiscountChange,
  gstPct,
  totals,
  note,
  onNoteChange,
}: CurrentBillPanelProps) {
  const [isEditingNote, setIsEditingNote] = useState(false);

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-surface p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-section-title text-text-primary">Current Bill</h2>
        <div className="flex items-center gap-3">
          <span className="text-caption text-text-secondary">
            Bill No: <span className="font-medium text-text-primary">{billNo}</span>
          </span>
          <button aria-label="More options" className="text-text-disabled hover:text-text-primary">
            <MoreVertical size={17} />
          </button>
        </div>
      </div>

      <div className="max-h-[280px] overflow-y-auto">
        {lines.length === 0 ? (
          <p className="py-8 text-center text-body text-text-secondary">
            No items yet — search or tap a product to add it.
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-caption text-text-secondary">
                <th className="pb-2 font-medium">#</th>
                <th className="pb-2 font-medium">Item</th>
                <th className="pb-2 font-medium">Batch</th>
                <th className="pb-2 font-medium">Qty</th>
                <th className="pb-2 pr-2 text-right font-medium">MRP</th>
                <th className="pb-2 pr-2 text-right font-medium">Disc.</th>
                <th className="pb-2 pr-2 text-right font-medium">Amount</th>
                <th className="pb-2" />
              </tr>
            </thead>
            <tbody>
              {lines.map((line, i) => (
                <BillItemRow
                  key={line.lineId}
                  index={i}
                  line={line}
                  onQtyChange={(delta) => onQtyChange(line.lineId, delta)}
                  onRemove={() => onRemove(line.lineId)}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isEditingNote ? (
        <input
          autoFocus
          type="text"
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          onBlur={() => setIsEditingNote(false)}
          placeholder="Note for this bill (optional)"
          className="mt-2 w-full rounded-sm border border-border bg-surface px-2.5 py-1.5 text-caption text-text-primary"
        />
      ) : (
        <button
          onClick={() => setIsEditingNote(true)}
          className="mt-2 flex items-center gap-1.5 text-caption font-medium text-primary hover:underline"
        >
          <Plus size={14} />
          {note ? note : "Add Note"}
        </button>
      )}

      <div className="mt-4 space-y-2 border-t border-border pt-4">
        <div className="flex items-center justify-between text-body">
          <span className="text-text-secondary">Subtotal ({totals.itemCount} Items)</span>
          <span className="tabular text-text-primary">{formatCurrency(totals.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-body">
          <span className="text-text-secondary">Discount</span>
          <div className="flex items-center gap-2">
            <select
              value={billDiscountPct}
              onChange={(e) => onBillDiscountChange(Number(e.target.value))}
              className="rounded-sm border border-border bg-surface px-2 py-1 text-caption text-text-primary"
            >
              {[0, 5, 10, 15, 20].map((pct) => (
                <option key={pct} value={pct}>
                  {pct}%
                </option>
              ))}
            </select>
            <span className="tabular text-text-primary">
              {formatCurrency(totals.billDiscountAmount)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between text-body">
          <span className="text-text-secondary">GST ({gstPct}%)</span>
          <span className="tabular text-text-primary">{formatCurrency(totals.gstAmount)}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
        <span className="text-section-title text-text-primary">Total</span>
        <span className="text-metric-value tabular text-text-primary">
          {formatCurrency(totals.total)}
        </span>
      </div>
    </div>
  );
}
