import clsx from "clsx";

interface LoadingSkeletonProps {
  className?: string;
}

/**
 * Section 28: prefer skeleton loading over full-screen spinners for
 * KPIs, tables, and charts so the ERP still feels fast mid-fetch.
 */
export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div
      className={clsx("animate-pulse rounded-sm bg-border/70", className)}
      aria-hidden="true"
    />
  );
}
