import { ReactNode } from "react";
import clsx from "clsx";
import { LoadingSkeleton } from "./LoadingSkeleton";

type Tint = "primary" | "success" | "accent" | "warning" | "danger";

interface MetricCardProps {
  label: string;
  value: string;
  supporting?: ReactNode;
  icon: ReactNode;
  tint?: Tint;
  isLoading?: boolean;
}

const tintClasses: Record<Tint, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  accent: "bg-accent/10 text-accent",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
};

/**
 * one label, one dominant number, one supporting
 * metric, optional icon. Never stack more than that inside a card —
 * if you need a second number, it belongs in a different card.
 */
export function MetricCard({
  label,
  value,
  supporting,
  icon,
  tint = "primary",
  isLoading,
}: MetricCardProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-1.5 shadow-card">
      <div className="flex items-center gap-3">
        <div
          className={clsx(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-md",
            tintClasses[tint]
          )}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="truncate text-caption text-text-secondary">{label}</p>
        </div>
      </div>

      <div className="mt-3">
        {isLoading ? (
          <LoadingSkeleton className="h-7 w-24" />
        ) : (
          <p className="text-metric-value tabular text-text-primary">{value}</p>
        )}
      </div>

      <div className="mt-1 min-h-[18px]">
        {isLoading ? <LoadingSkeleton className="h-4 w-28" /> : supporting}
      </div>
    </div>
  );
}
