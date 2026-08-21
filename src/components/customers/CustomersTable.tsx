import { MoreVertical } from "lucide-react";
import clsx from "clsx";
import { Customer, LoyaltyTier } from "@/types/customers";
import { StatusBadge, BadgeTone } from "@/components/ui/StatusBadge";
import { formatCurrency } from "@/lib/format";

interface CustomersTableProps {
  items: Customer[];
  selectedCustomerId: string | null;
  onSelect: (id: string) => void;
}

const TIER_TONE: Record<LoyaltyTier, BadgeTone> = {
  Bronze: "warning",
  Silver: "neutral",
  Gold: "accent",
  Platinum: "success",
};

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export function CustomersTable({ items, selectedCustomerId, onSelect }: CustomersTableProps) {
  if (items.length === 0) {
    return <p className="py-10 text-center text-body text-text-secondary">No customers match the current filters.</p>;
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-border text-left text-caption text-text-secondary">
          <th className="py-2.5 font-medium">Customer</th>
          <th className="py-2.5 font-medium">Contact</th>
          <th className="py-2.5 font-medium">Group</th>
          <th className="py-2.5 font-medium">Loyalty Tier</th>
          <th className="py-2.5 text-right font-medium">Total Purchases</th>
          <th className="py-2.5 text-right font-medium">Points</th>
          <th className="py-2.5 font-medium">Last Purchase</th>
          <th className="py-2.5 font-medium">Status</th>
          <th className="w-8 py-2.5" />
        </tr>
      </thead>
      <tbody>
        {items.map((c) => (
          <tr
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={clsx(
              "cursor-pointer border-b border-border last:border-0 hover:bg-bg",
              selectedCustomerId === c.id && "bg-primary-soft/50"
            )}
          >
            <td className="py-3 pr-2">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-caption font-semibold text-primary">
                  {initials(c.name)}
                </span>
                <span>
                  <p className="text-body font-medium text-text-primary">{c.name}</p>
                  <p className="text-caption text-text-secondary">{c.code}</p>
                </span>
              </div>
            </td>
            <td className="py-3 pr-2">
              <p className="text-caption text-text-primary">{c.phone}</p>
              <p className="text-caption text-text-secondary">{c.email}</p>
            </td>
            <td className="py-3 pr-2 text-caption text-text-secondary">{c.group}</td>
            <td className="py-3 pr-2">
              <StatusBadge label={c.loyaltyTier} tone={TIER_TONE[c.loyaltyTier]} />
            </td>
            <td className="py-3 pr-2 text-right tabular text-body font-medium text-text-primary">
              {formatCurrency(c.totalPurchases)}
            </td>
            <td className="py-3 pr-2 text-right tabular text-body text-text-primary">
              {c.points.toLocaleString("en-IN")}
            </td>
            <td className="py-3 pr-2 text-caption text-text-primary">{c.lastPurchase}</td>
            <td className="py-3 pr-2">
              <StatusBadge
                label={c.status === "active" ? "Active" : "Inactive"}
                tone={c.status === "active" ? "success" : "danger"}
              />
            </td>
            <td className="py-3">
              <button
                onClick={(e) => e.stopPropagation()}
                aria-label={`More actions for ${c.name}`}
                className="text-text-disabled hover:text-text-primary"
              >
                <MoreVertical size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
