import { Banknote, Smartphone, CreditCard, Wallet } from "lucide-react";
import clsx from "clsx";
import { CustomerOption, PaymentMethod } from "@/types/billing";
import { formatCurrency } from "@/lib/format";

interface CustomerPaymentBarProps {
  customers: CustomerOption[];
  customerId: string;
  onCustomerChange: (id: string) => void;
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  payableAmount: number;
  onPay: () => void;
  disabled?: boolean;
}

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; icon: JSX.Element }[] = [
  { id: "cash", label: "Cash", icon: <Banknote size={16} /> },
  { id: "upi", label: "UPI", icon: <Smartphone size={16} /> },
  { id: "card", label: "Card", icon: <CreditCard size={16} /> },
  { id: "credit", label: "Credit", icon: <Wallet size={16} /> },
];

/** Section 14: the payable amount is more prominent than the word "Pay". */
export function CustomerPaymentBar({
  customers,
  customerId,
  onCustomerChange,
  paymentMethod,
  onPaymentMethodChange,
  payableAmount,
  onPay,
  disabled,
}: CustomerPaymentBarProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-1 shadow-card">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-caption font-medium text-text-secondary">Customer</p>
          <select
            value={customerId}
            onChange={(e) => onCustomerChange(e.target.value)}
            className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-body text-text-primary"
          >
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-1.5 text-caption font-medium text-text-secondary">Payment Method</p>
          <div className="grid grid-cols-4 gap-2">
            {PAYMENT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onPaymentMethodChange(opt.id)}
                className={clsx(
                  "flex h-10 items-center justify-center gap-1.5 rounded-sm border text-caption font-medium",
                  paymentMethod === opt.id
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-border text-text-secondary hover:border-primary/50"
                )}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onPay}
        disabled={disabled}
        className="mt-4 flex h-14 w-full items-center justify-center gap-3 rounded-md bg-primary text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-text-disabled"
      >
        <span className="text-lg font-semibold">Pay {formatCurrency(payableAmount)}</span>
        <kbd className="rounded-sm bg-white/15 px-1.5 py-0.5 text-[11px] font-medium">F9</kbd>
      </button>
    </div>
  );
}
