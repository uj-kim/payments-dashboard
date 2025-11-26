"use client";

import { useQuery } from "@tanstack/react-query";
import type { DashboardOverview } from "../types/dashboard";
import { fetchDashboardOverview } from "../api/getDashboardData";

export function useDashboardOverview() {
  return useQuery<DashboardOverview>({
    queryKey: ["dashboard-overview"],
    queryFn: fetchDashboardOverview,
  });
}
