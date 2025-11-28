import { DashboardOverview } from "../types/dashboard-types";
import { buildDashboardOverview } from "../services/dashboard-calculate-helpers";
import fetchTransactions from "@/shared/api/transactions";
import fetchMerchants from "@/shared/api/merchants";

export async function fetchDashboardOverview(): Promise<DashboardOverview> {
  const [transactions, merchants] = await Promise.all([fetchTransactions(), fetchMerchants()]);

  return buildDashboardOverview(transactions, merchants);
}
