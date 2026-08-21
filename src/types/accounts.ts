export type TransactionType = "payment-in" | "payment-out" | "journal-entry";

export interface AccountTransaction {
  id: string;
  date: string; // "10 Aug 2026"
  type: TransactionType;
  particulars: string;
  accountParty: string;
  debit: number | null;
  credit: number | null;
  paymentMode: string;
}

export interface AccountsKpis {
  cashInHand: number;
  cashInHandTrendPct: number;
  bankBalance: number;
  bankBalanceTrendPct: number;
  totalReceivables: number;
  totalReceivablesTrendPct: number; // negative = down
  totalPayables: number;
  totalPayablesTrendPct: number; // negative = down
}

export interface AccountsQuickAction {
  id: string;
  label: string;
  icon: "cashBook" | "bankAccounts" | "paymentIn" | "paymentOut" | "ledgerReport";
  href: string;
}

export type AccountsSidebarSection = "overview" | "cash-book" | "bank-accounts" | "payment-in" | "payment-out" | "ledger-report" | "profit-loss";
