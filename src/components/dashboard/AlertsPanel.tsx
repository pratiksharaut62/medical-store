import { AlertTriangle, AlertCircle, RotateCcw, ShieldCheck, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { DashboardAlert, AlertSeverity } from "@/types/dashboard";
import { Section } from "@/components/layout/Section";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

interface AlertsPanelProps {
  alerts: DashboardAlert[];
  isLoading?: boolean;
}

const SEVERITY_STYLES: Record<AlertSeverity, { bg: string; fg: string }> = {
  danger: { bg: "bg-danger/10", fg: "text-danger" },
  warning: { bg: "bg-warning/10", fg: "text-warning" },
  info: { bg: "bg-primary/10", fg: "text-primary" },
};

// Icon choice communicates *what kind* of alert this is, not just severity.
const ALERT_ICON: Record<string, JSX.Element> = {
  "near-expiry": <AlertTriangle size={18} />,
  "low-stock": <AlertCircle size={18} />,
  "supplier-claims": <RotateCcw size={18} />,
  "license-expiry": <ShieldCheck size={18} />,
};

/**
 * Section 20: every alert states What + Why + What next. The count is
 * always a clickable drill-down (Section 47) — never a dead number.
 */
export function AlertsPanel({ alerts, isLoading }: AlertsPanelProps) {
  if (isLoading) {
    return (
      <Section title="Alerts & Action Required">
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingSkeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section title="Alerts & Action Required" action={{ label: "View All", href: "/alerts" }}>
      <ul className="divide-y divide-border">
        {alerts.map((alert) => {
          const style = SEVERITY_STYLES[alert.severity];
          return (
            <li key={alert.id}>
              <a
                href={alert.href}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 hover:opacity-80"
              >
                <span
                  className={clsx(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
                    style.bg,
                    style.fg
                  )}
                >
                  {ALERT_ICON[alert.id] ?? <AlertCircle size={18} />}
                </span>
                <span className="min-w-0 flex-1">
                  <p className="truncate text-body font-medium text-text-primary">{alert.title}</p>
                  <p className="truncate text-caption text-text-secondary">{alert.description}</p>
                </span>
                <span className="flex shrink-0 items-center gap-1 text-right">
                  <span className="flex flex-col items-end leading-tight">
                    <span className="text-body font-semibold tabular text-text-primary">
                      {alert.count}
                    </span>
                    <span className="text-[11px] text-text-secondary">{alert.countLabel}</span>
                  </span>
                  <ChevronRight size={16} className="text-text-disabled" />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
