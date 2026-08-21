import { X, Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import { Customer } from "@/types/customers";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency } from "@/lib/format";

interface CustomerDetailPanelProps {
  customer: Customer;
  onClose: () => void;
}

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export function CustomerDetailPanel({ customer, onClose }: CustomerDetailPanelProps) {
  const tierProgressPct = customer.nextTier
    ? Math.min(100, (customer.points / (customer.points + customer.pointsToNextTier)) * 100)
    : 100;

  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-body font-semibold text-primary">
            {initials(customer.name)}
          </span>
          <div>
            <p className="text-body font-semibold text-text-primary">{customer.name}</p>
            <div className="mt-0.5 flex items-center gap-2">
              <span className="text-caption text-text-secondary">{customer.code}</span>
              <StatusBadge
                label={customer.status === "active" ? "Active" : "Inactive"}
                tone={customer.status === "active" ? "success" : "danger"}
              />
            </div>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close customer detail" className="text-text-disabled hover:text-text-primary">
          <X size={18} />
        </button>
      </div>

      <div className="mb-2 flex gap-4 border-b border-border text-caption font-medium text-text-secondary">
        <span className="border-b-2 border-primary pb-2 text-primary">Overview</span>
        <span className="pb-2">Purchase History</span>
        <span className="pb-2">Loyalty</span>
        <span className="pb-2">Notes & Activity</span>
      </div>

      <div className="space-y-5 pt-3">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-caption font-semibold text-text-primary">Contact Information</p>
            <button className="text-caption font-medium text-primary hover:underline">Edit</button>
          </div>
          <ul className="space-y-1.5 text-caption text-text-secondary">
            <li className="flex items-center gap-2">
              <Phone size={14} />
              {customer.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} />
              {customer.email}
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} />
              {customer.address}
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-2 text-caption font-semibold text-text-primary">Customer Summary</p>
          <div className="grid grid-cols-2 gap-y-1.5 text-caption">
            <span className="text-text-secondary">Total Purchases</span>
            <span className="text-right font-medium text-text-primary">{formatCurrency(customer.totalPurchases)}</span>
            <span className="text-text-secondary">Total Orders</span>
            <span className="text-right font-medium text-text-primary">{customer.totalOrders}</span>
            <span className="text-text-secondary">Average Order Value</span>
            <span className="text-right font-medium text-text-primary">{formatCurrency(customer.averageOrderValue)}</span>
            <span className="text-text-secondary">Last Purchase</span>
            <span className="text-right font-medium text-text-primary">{customer.lastPurchase}</span>
          </div>
        </div>

        <div>
          <p className="mb-2 text-caption font-semibold text-text-primary">Loyalty Summary</p>
          <div className="rounded-md border border-border p-3">
            <div className="flex items-center justify-between">
              <span className="text-body font-medium text-text-primary">{customer.loyaltyTier} Tier</span>
              <span className="text-caption text-text-secondary">
                {customer.points.toLocaleString("en-IN")} / {(customer.points + customer.pointsToNextTier).toLocaleString("en-IN")} pts
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-pill bg-border">
              <div className="h-full rounded-pill bg-warning" style={{ width: `${tierProgressPct}%` }} />
            </div>
            {customer.nextTier && (
              <p className="mt-1.5 text-caption text-text-secondary">
                {customer.pointsToNextTier.toLocaleString("en-IN")} points to reach {customer.nextTier} tier
              </p>
            )}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-md border border-border p-3">
              <p className="text-caption text-text-secondary">Available Points</p>
              <p className="mt-1 tabular text-body font-semibold text-text-primary">
                {customer.availablePoints.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="rounded-md border border-border p-3">
              <p className="text-caption text-text-secondary">Points Earned (This Month)</p>
              <p className="mt-1 tabular text-body font-semibold text-text-primary">
                {customer.pointsEarnedThisMonth.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <button className="mt-3 w-full rounded-sm border border-primary py-2 text-caption font-semibold text-primary hover:bg-primary-soft">
            View Loyalty Details
          </button>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-caption font-semibold text-text-primary">Recent Activity</p>
            <a href="/customers" className="flex items-center gap-1 text-caption font-medium text-primary hover:underline">
              View All
              <ChevronRight size={13} />
            </a>
          </div>
          <div className="flex items-center justify-between text-caption">
            <span className="text-text-primary">Order #ORD-1024</span>
            <span className="text-text-secondary">09 Aug 2026 · 12 Items</span>
            <span className="font-semibold text-text-primary">{formatCurrency(1250)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
