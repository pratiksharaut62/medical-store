import { Search, ScanLine } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Section 11: the search box is the most important POS component.
 * Supports brand name / salt / barcode — this mock filters by name
 * only; a real backend should do the salt+barcode matching server-side.
 */
export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Search
          size={17}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary"
        />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type="text"
          placeholder="Scan barcode or search medicine..."
          className="h-12 w-full rounded-md border border-border bg-surface pl-10 pr-16 text-body text-text-primary placeholder:text-text-disabled focus:border-primary"
        />
        <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-bg px-1.5 py-0.5 text-[11px] text-text-secondary">
          Ctrl + K
        </kbd>
      </div>
      <button
        aria-label="Scan barcode"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-text-secondary hover:border-primary hover:text-primary"
      >
        <ScanLine size={18} />
      </button>
    </div>
  );
}
