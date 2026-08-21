import { MoreVertical } from "lucide-react";
import { PurchaseBill, PurchaseStatus, PurchasePaymentStatus } from "@/types/purchases";
import { StatusBadge, BadgeTone } from "@/components/ui/StatusBadge";
import { formatCurrency } from "@/lib/format";

interface PurchasesTableProps {
  items: PurchaseBill[];
}

const STATUS_LABEL: Record<PurchaseStatus, string> = {
  received: "Received",
  pending: "Pending",
  cancelled: "Cancelled",
};
const STATUS_TONE: Record<PurchaseStatus, BadgeTone> = {
  received: "success",
  pending: "accent",
  cancelled: "danger",
};

const PAYMENT_LABEL: Record<PurchasePaymentStatus, string> = {
  paid: "Paid",
  partial: "Partial",
  unpaid: "Unpaid",
};
const PAYMENT_TONE: Record<PurchasePaymentStatus, BadgeTone> = {
  paid: "success",
  partial: "warning",
  unpaid: "danger",
};

export function PurchasesTable({ items }: PurchasesTableProps) {
  if (items.length === 0) {
    return <p className="py-10 text-center text-body text-text-secondary">No purchase bills match the current filters.</p>;
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-border text-left text-caption text-text-secondary">
          <th className="py-2.5 font-medium">Bill No.</th>
          <th className="py-2.5 font-medium">Supplier</th>
          <th className="py-2.5 font-medium">Bill Date</th>
          <th className="py-2.5 text-right font-medium">Items</th>
          <th className="py-2.5 text-right font-medium">Total Amount</th>
          <th className="py-2.5 text-right font-medium">Paid Amount</th>
          <th className="py-2.5 text-right font-medium">Due Amount</th>
          <th className="py-2.5 font-medium">Status</th>
          <th className="py-2.5 font-medium">Payment Status</th>
          <th className="w-8 py-2.5" />
        </tr>
      </thead>
      <tbody>
        {items.map((b) => (
          <tr key={b.id} className="border-b border-border last:border-0">
            <td className="py-3 pr-2 text-body font-medium text-primary">{b.billNo}</td>
            <td className="py-3 pr-2">
              <p className="text-body text-text-primary">{b.supplierName}</p>
              <p className="text-caption text-text-secondary">{b.supplierLocation}</p>
            </td>
            <td className="py-3 pr-2 text-caption text-text-primary">{b.billDate}</td>
            <td className="py-3 pr-2 text-right tabular text-body text-text-primary">{b.items}</td>
            <td className="py-3 pr-2 text-right tabular text-body font-medium text-text-primary">
              {formatCurrency(b.totalAmount)}
            </td>
            <td className="py-3 pr-2 text-right tabular text-body text-text-primary">
              {formatCurrency(b.paidAmount)}
            </td>
            <td className="py-3 pr-2 text-right tabular text-body text-text-primary">
              {formatCurrency(b.dueAmount)}
            </td>
            <td className="py-3 pr-2">
              <StatusBadge label={STATUS_LABEL[b.status]} tone={STATUS_TONE[b.status]} />
            </td>
            <td className="py-3 pr-2">
              <StatusBadge label={PAYMENT_LABEL[b.paymentStatus]} tone={PAYMENT_TONE[b.paymentStatus]} />
            </td>
            <td className="py-3">
              <button aria-label={`More actions for ${b.billNo}`} className="text-text-disabled hover:text-text-primary">
                <MoreVertical size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
