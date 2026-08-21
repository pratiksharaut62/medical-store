/** Converts an array of row objects into CSV text using the given column order. */
export function toCsv<T extends Record<string, unknown>>(rows: T[], columns: (keyof T)[]): string {
  const escape = (value: unknown) => {
    const str = String(value ?? "");
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };

  const header = columns.map((c) => escape(String(c))).join(",");
  const body = rows.map((row) => columns.map((c) => escape(row[c])).join(",")).join("\n");
  return `${header}\n${body}`;
}

/**
 * Triggers a real browser file download — a Blob + temporary <a
 * download> click, the standard way a web app can save a file. It
 * lands wherever the browser's download location is configured
 * (usually the Downloads folder; the browser — not this code —
 * decides that, same as any other website's download link).
 */
export function downloadCsv(filename: string, csvContent: string) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
