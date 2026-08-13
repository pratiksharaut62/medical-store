import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalCount: number;
  pageSize: number;
  onPageSizeChange?: (size: number) => void;
}

/** Generic — reused by Inventory today, and any future DataTable (Billing history, Reports). */
export function Pagination({
  page,
  totalPages,
  onPageChange,
  totalCount,
  pageSize,
  onPageSizeChange,
}: PaginationProps) {
  const rangeStart = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(page * pageSize, totalCount);

  const pageNumbers = buildPageWindow(page, totalPages);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
      <p className="text-caption text-text-secondary">
        Showing {rangeStart} to {rangeEnd} of {totalCount.toLocaleString("en-IN")} items
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-sm border border-border text-text-secondary disabled:opacity-40"
        >
          <ChevronLeft size={15} />
        </button>

        {pageNumbers.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="px-1 text-caption text-text-disabled">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={clsx(
                "flex h-8 w-8 items-center justify-center rounded-sm text-caption font-medium",
                p === page
                  ? "bg-primary text-white"
                  : "border border-border text-text-secondary hover:border-primary/50"
              )}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          aria-label="Next page"
          className="flex h-8 w-8 items-center justify-center rounded-sm border border-border text-text-secondary disabled:opacity-40"
        >
          <ChevronRight size={15} />
        </button>
      </div>

      {onPageSizeChange && (
        <div className="flex items-center gap-2 text-caption text-text-secondary">
          Items per page:
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded-sm border border-border bg-surface px-2 py-1 text-text-primary"
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

function buildPageWindow(current: number, total: number): (number | "…")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "…", total];
  if (current >= total - 2) return [1, "…", total - 2, total - 1, total];
  return [1, "…", current, "…", total];
}
