import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

export interface MoreMenuItem {
  label: string;
  href: string;
}

interface MoreMenuProps {
  items: MoreMenuItem[];
}

/**
 * Section 7: secondary modules (Prescriptions, Expiry & Returns,
 * Accounts, GST & Tax, Compliance, CRM & Loyalty, Settings) live here
 * instead of widening the primary nav into a horizontal wall.
 */
export function MoreMenu({ items }: MoreMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-sm px-3 py-2 text-body font-medium text-header-muted hover:bg-header-secondary/60 hover:text-header-text"
        aria-expanded={open}
      >
        More
        <ChevronDown size={16} className={clsx("transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-20 mt-2 w-56 rounded-md border border-border bg-surface py-1 shadow-popover"
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              role="menuitem"
              className="block px-4 py-2 text-body text-text-primary hover:bg-bg"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
