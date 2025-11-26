"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats, DashboardStats } from "../api/getDashboardData";

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
  });
}
