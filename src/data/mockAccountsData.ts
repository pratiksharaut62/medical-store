import { AccountTransaction, AccountsKpis, AccountsQuickAction } from "@/types/accounts";

export const mockAccountsKpis: AccountsKpis = {
  cashInHand: 48620,
  cashInHandTrendPct: 12.4,
  bankBalance: 875430,
  bankBalanceTrendPct: 8.7,
  totalReceivables: 628450,
  totalReceivablesTrendPct: -5.2,
  totalPayables: 342680,
  totalPayablesTrendPct: -3.6,
};

// Replace with `GET /api/accounts/transactions?page=`
export const mockRecentTransactions: AccountTransaction[] = [
  {
    id: "txn-1",
    date: "10 Aug 2026",
    type: "payment-in",
    particulars: "Cash received from Customer (Invoice #INV-1023)",
    accountParty: "Suresh Medicals",
    debit: 25600,
    credit: null,
    paymentMode: "Cash",
  },
  {
    id: "txn-2",
    date: "10 Aug 2026",
    type: "payment-out",
    particulars: "Paid to Supplier (Bill #BILL-556)",
    accountParty: "Medilife Distributors",
    debit: null,
    credit: 18450,
    paymentMode: "Bank Transfer",
  },
  {
    id: "txn-3",
    date: "09 Aug 2026",
    type: "journal-entry",
    particulars: "Rent Payment for Aug 2026",
    accountParty: "Rent Expense",
    debit: 12000,
    credit: null,
    paymentMode: "Bank Transfer",
  },
  {
    id: "txn-4",
    date: "09 Aug 2026",
    type: "payment-in",
    particulars: "Cash received from Customer (Invoice #INV-1022)",
    accountParty: "City Hospital",
    debit: 15200,
    credit: null,
    paymentMode: "UPI",
  },
  {
    id: "txn-5",
    date: "08 Aug 2026",
    type: "payment-out",
    particulars: "Electricity Bill Payment",
    accountParty: "Electricity Expense",
    debit: null,
    credit: 3860,
    paymentMode: "Net Banking",
  },
];

export const mockAccountsQuickActions: AccountsQuickAction[] = [
  { id: "cash-book", label: "Cash Book", icon: "cashBook", href: "/accounts/cash-book" },
  { id: "bank-accounts", label: "Bank Accounts", icon: "bankAccounts", href: "/accounts/bank-accounts" },
  { id: "payment-in", label: "Payment In", icon: "paymentIn", href: "/accounts/payment-in" },
  { id: "payment-out", label: "Payment Out", icon: "paymentOut", href: "/accounts/payment-out" },
  { id: "ledger-report", label: "Ledger Report", icon: "ledgerReport", href: "/accounts/ledger" },
];
