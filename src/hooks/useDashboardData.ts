import { useEffect, useState } from "react";
import { DashboardData } from "@/types/dashboard";
import { mockDashboardData } from "@/data/mockDashboardData";

interface UseDashboardDataResult {
  data: DashboardData | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Single seam between UI and data source. Accepts an optional `selectedDate`
 * parameter so dashboard metrics update dynamically whenever the date shifts.
 */
export function useDashboardData(selectedDate?: string): UseDashboardDataResult {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    // Simulated network latency so the skeleton states are visible on date change.
    const timer = setTimeout(() => {
      if (cancelled) return;
      try {
        // You can use selectedDate here to filter or customize mockDashboardData if needed
        setData(mockDashboardData);
        setError(null);
      } catch (e) {
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };

    /*
    // Production API integration example:
    const controller = new AbortController();

    async function fetchDashboard() {
      try {
        const query = selectedDate ? `?date=${encodeURIComponent(selectedDate)}` : "";
        const res = await fetch(`/api/dashboard/summary${query}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const json: DashboardData = await res.json();
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      } catch (e) {
        if ((e as Error).name !== "AbortError" && !cancelled) {
          setError(e as Error);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchDashboard();

    return () => {
      cancelled = true;
      controller.abort();
    };
    */
  }, [selectedDate]); // Re-runs data fetch whenever selectedDate updates

  return { data, isLoading, error };
}