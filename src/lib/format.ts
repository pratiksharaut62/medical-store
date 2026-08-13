// Section 21 & 37 of the design spec: Indian numbering everywhere,
// never mixed formats. Centralize it here so no component hand-rolls
// its own ₹ string.

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** ₹1,84,620 */
export function formatCurrency(value: number): string {
  return inr.format(value);
}

/** ₹18.42L / ₹2.46Cr — for compact dashboard-scale values */
export function formatCompactCurrency(value: number): string {
  if (value >= 1_00_00_000) {
    return `₹${(value / 1_00_00_000).toFixed(2)}Cr`;
  }
  if (value >= 1_00_000) {
    return `₹${(value / 1_00_000).toFixed(2)}L`;
  }
  return formatCurrency(value);
}

/** 10 Aug 2026 (Section 36 — one date convention, everywhere) */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** 10 Aug 2026, 10:46 AM */
export function formatDateTime(date: Date): string {
  return `${formatDate(date)}, ${date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}
