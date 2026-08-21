import { Calendar } from "lucide-react";
import { useSettings, useToday } from "@/context/SettingsContext";

/**
 * Every module (Dashboard, Expiry & Returns, Compliances, Purchases,
 * Customers, Reports) showed this as a hardcoded "Today, 10 Aug 2026"
 * string. Centralizing it here means changing Settings → Currency &
 * Date Format's Date Format field updates every one of those buttons
 * at once — nothing per-module to touch.
 */
export function TodayDateButton() {
  const { formatDate } = useSettings();
  const today = useToday();

  return (
    <button className="flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2 text-caption font-medium text-text-primary">
      <Calendar size={15} />
      Today, {formatDate(today)}
    </button>
  );
}
