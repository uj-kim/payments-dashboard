"use client";

import { useQuery } from "@tanstack/react-query";
import type { DashboardOverview } from "../types/dashboard-types";
import { fetchDashboardOverview } from "../api/get-dashboard-data";

export function useDashboardOverview() {
  return useQuery<DashboardOverview>({
    queryKey: ["dashboard-overview"],
    queryFn: fetchDashboardOverview,
  });
}
