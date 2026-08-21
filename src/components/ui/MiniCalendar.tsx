import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

export type CalendarMarkerKind = "upcoming" | "overdue" | "completed";

interface MiniCalendarProps {
  year: number;
  month: number; // 0-indexed, like Date
  todayDate: number;
  markers: Record<number, CalendarMarkerKind>;
  legend: { kind: CalendarMarkerKind; label: string }[];
}

const MARKER_COLOR: Record<CalendarMarkerKind, string> = {
  upcoming: "bg-warning",
  overdue: "bg-danger",
  completed: "bg-success",
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Generic month-grid calendar — used by Compliances today, reusable for any future scheduling view. */
export function MiniCalendar({ year, month, todayDate, markers, legend }: MiniCalendarProps) {
  const [viewYear, setViewYear] = useState(year);
  const [viewMonth, setViewMonth] = useState(month);

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const cells: { date: number; inMonth: boolean }[] = [];
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    cells.push({ date: daysInPrevMonth - i, inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: d, inMonth: true });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ date: cells.length - (firstDayOfMonth + daysInMonth) + 1, inMonth: false });
  }

  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
  const isCurrentViewedMonth = viewYear === year && viewMonth === month;

  function goPrevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function goNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button onClick={goPrevMonth} aria-label="Previous month" className="text-text-secondary hover:text-primary">
          <ChevronLeft size={16} />
        </button>
        <span className="text-body font-medium text-text-primary">{monthLabel}</span>
        <button onClick={goNextMonth} aria-label="Next month" className="text-text-secondary hover:text-primary">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAYS.map((wd) => (
          <span key={wd} className="text-[11px] font-medium text-text-secondary">
            {wd}
          </span>
        ))}
        {cells.map((cell, i) => {
          const marker = cell.inMonth && isCurrentViewedMonth ? markers[cell.date] : undefined;
          const isToday = cell.inMonth && isCurrentViewedMonth && cell.date === todayDate;
          return (
            <div key={i} className="flex flex-col items-center gap-0.5 py-1">
              <span
                className={clsx(
                  "flex h-6 w-6 items-center justify-center rounded-full text-caption",
                  !cell.inMonth && "text-text-disabled",
                  cell.inMonth && !isToday && "text-text-primary",
                  isToday && "bg-primary-soft font-semibold text-primary",
                  marker === "overdue" && !isToday && "border border-danger text-danger"
                )}
              >
                {cell.date}
              </span>
              {marker && <span className={clsx("h-1 w-1 rounded-full", MARKER_COLOR[marker])} />}
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-3">
        {legend.map((item) => (
          <span key={item.kind} className="flex items-center gap-1.5 text-caption text-text-secondary">
            <span className={clsx("h-1.5 w-1.5 rounded-full", MARKER_COLOR[item.kind])} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
