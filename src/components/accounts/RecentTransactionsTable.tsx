import { AccountTransaction, TransactionType } from "@/types/accounts";
import { StatusBadge, BadgeTone } from "@/components/ui/StatusBadge";
import { formatCurrency } from "@/lib/format";

interface RecentTransactionsTableProps {
  transactions: AccountTransaction[];
}

const TYPE_LABEL: Record<TransactionType, string> = {
  "payment-in": "Payment In",
  "payment-out": "Payment Out",
  "journal-entry": "Journal Entry",
};

const TYPE_TONE: Record<TransactionType, BadgeTone> = {
  "payment-in": "success",
  "payment-out": "danger",
  "journal-entry": "accent",
};

export function RecentTransactionsTable({ transactions }: RecentTransactionsTableProps) {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-border text-left text-caption text-text-secondary">
          <th className="py-2.5 font-medium">Date</th>
          <th className="py-2.5 font-medium">Type</th>
          <th className="py-2.5 font-medium">Particulars</th>
          <th className="py-2.5 font-medium">Account / Party</th>
          <th className="py-2.5 text-right font-medium">Debit (₹)</th>
          <th className="py-2.5 text-right font-medium">Credit (₹)</th>
          <th className="py-2.5 font-medium">Payment Mode</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={t.id} className="border-b border-border last:border-0">
            <td className="py-3 pr-2 text-caption text-text-primary">{t.date}</td>
            <td className="py-3 pr-2">
              <StatusBadge label={TYPE_LABEL[t.type]} tone={TYPE_TONE[t.type]} />
            </td>
            <td className="py-3 pr-2 text-body text-text-primary">{t.particulars}</td>
            <td className="py-3 pr-2 text-body text-text-secondary">{t.accountParty}</td>
            <td className="py-3 pr-2 text-right tabular text-body text-text-primary">
              {t.debit != null ? formatCurrency(t.debit) : "–"}
            </td>
            <td className="py-3 pr-2 text-right tabular text-body text-text-primary">
              {t.credit != null ? formatCurrency(t.credit) : "–"}
            </td>
            <td className="py-3 text-caption text-text-secondary">{t.paymentMode}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
