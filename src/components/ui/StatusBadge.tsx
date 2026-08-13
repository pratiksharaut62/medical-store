import clsx from "clsx";

export type BadgeTone = "success" | "warning" | "danger" | "neutral" | "accent";

interface StatusBadgeProps {
  label: string;
  tone: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  neutral: "bg-text-disabled/10 text-text-secondary",
  accent: "bg-accent/10 text-accent",
};

/**
 * Section 16 & 39: status is never communicated by color alone —
 * this component always renders the label text alongside the tint.
 */
export function StatusBadge({ label, tone }: StatusBadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-pill px-2.5 py-1 text-badge font-medium",
        toneClasses[tone]
      )}
    >
      {label}
    </span>
  );
}
