import { FileText, PauseCircle, History, ScanSearch, Lock, RefreshCw } from "lucide-react";

interface QuickShortcutsBarProps {
  isOnline: boolean;
  lastSyncLabel: string;
}

const SHORTCUTS = [
  { key: "F2", label: "New Bill", icon: <FileText size={15} /> },
  { key: "F3", label: "Hold Bill", icon: <PauseCircle size={15} /> },
  { key: "F4", label: "Bill History", icon: <History size={15} /> },
  { key: "F6", label: "Price Check", icon: <ScanSearch size={15} /> },
  { key: "F12", label: "Drawer Open", icon: <Lock size={15} /> },
];

/** Section 12: shortcuts stay visually subtle — a strip, not a toolbar. */
export function QuickShortcutsBar({ isOnline, lastSyncLabel }: QuickShortcutsBarProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3">
      <div className="flex flex-wrap items-center gap-4">
        {SHORTCUTS.map((s) => (
          <button
            key={s.key}
            className="flex items-center gap-1.5 text-caption font-medium text-text-secondary hover:text-primary"
          >
            {s.icon}
            {s.label}
            <kbd className="rounded-sm border border-border bg-bg px-1.5 py-0.5 text-[10px] text-text-secondary">
              {s.key}
            </kbd>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 text-caption text-text-secondary">
        <span>All prices are inclusive of taxes</span>
        <span className="flex items-center gap-1.5">
          <RefreshCw size={13} />
          Last Sync: {lastSyncLabel}
        </span>
        <span className="flex items-center gap-1.5 font-medium">
          <span className={`h-1.5 w-1.5 rounded-full ${isOnline ? "bg-success" : "bg-danger"}`} />
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}
