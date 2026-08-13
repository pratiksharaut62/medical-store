import { ArrowUp, ArrowDown } from "lucide-react";
import clsx from "clsx";
import { TrendDirection } from "@/types/dashboard";

interface TrendIndicatorProps {
  direction?: TrendDirection;
  text: string;
}

export function TrendIndicator({ direction, text }: TrendIndicatorProps) {
  if (!direction || direction === "flat") {
    return <span className="text-caption text-text-secondary">{text}</span>;
  }

  const isUp = direction === "up";
  const Icon = isUp ? ArrowUp : ArrowDown;

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 text-caption font-medium",
        isUp ? "text-success" : "text-danger"
      )}
    >
      <Icon size={13} strokeWidth={2.5} />
      {text}
    </span>
  );
}
