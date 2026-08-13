import { History } from "lucide-react";
import { useBillingSession } from "@/hooks/useBillingSession";
import { SearchBar } from "@/components/billing/SearchBar";
import { CategoryTabs } from "@/components/billing/CategoryTabs";
import { FrequentlySoldGrid } from "@/components/billing/FrequentlySoldGrid";
import { CurrentBillPanel } from "@/components/billing/CurrentBillPanel";
import { CustomerPaymentBar } from "@/components/billing/CustomerPaymentBar";
import { QuickShortcutsBar } from "@/components/billing/QuickShortcutsBar";

/**
 * Section 10: keyboard-first POS. Left = Find (search, categories,
 * frequently sold). Right = Review + Pay (current bill, customer,
 * payment). Clicking a product tile is the mouse-equivalent of
 * scan-and-add; every quantity/discount control stays reachable
 * without leaving the current screen.
 */
export default function Billing() {
  const session = useBillingSession();

  function handlePay() {
    // Swap for a real `POST /api/bills` call once a backend exists —
    // the whole cart/customer/payment state above already matches
    // what that request would need.
    window.alert(`Charged ${session.customerId} via ${session.paymentMethod}.`);
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-page-title text-text-primary">Billing (POS)</h1>
          <span className="text-body text-text-secondary">{session.meta.counterLabel}</span>
          <span className="flex items-center gap-1.5 text-caption font-medium text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Online
          </span>
        </div>
        <button className="flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2 text-caption font-medium text-text-primary">
          <History size={15} />
          Recent Bills
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_420px]">
        {/* Left: Find */}
        <div className="space-y-6">
          <SearchBar value={session.searchQuery} onChange={session.setSearchQuery} />
          <CategoryTabs
            categories={session.categories}
            activeCategoryId={session.activeCategoryId}
            onSelect={session.setActiveCategoryId}
          />
          <FrequentlySoldGrid items={session.catalog} onSelect={session.addMedicine} />
        </div>

        {/* Right: Review + Pay */}
        <div className="space-y-4">
          <CurrentBillPanel
            billNo={session.meta.billNo}
            lines={session.lines}
            onQtyChange={session.updateQty}
            onRemove={session.removeLine}
            billDiscountPct={session.billDiscountPct}
            onBillDiscountChange={session.setBillDiscountPct}
            gstPct={session.meta.gstPct}
            totals={session.totals}
            note={session.note}
            onNoteChange={session.setNote}
          />
          <CustomerPaymentBar
            customers={session.customers}
            customerId={session.customerId}
            onCustomerChange={session.setCustomerId}
            paymentMethod={session.paymentMethod}
            onPaymentMethodChange={session.setPaymentMethod}
            payableAmount={session.totals.total}
            onPay={handlePay}
            disabled={session.lines.length === 0}
          />
        </div>
      </div>

      <QuickShortcutsBar isOnline={session.meta.isOnline} lastSyncLabel={session.meta.lastSyncLabel} />
    </div>
  );
}
