import { Merchant, Transaction } from "@/types/type";
import { DashboardOverview } from "../types/dashboard";
import { buildDashboardOverview } from "../services/dashboard-calculate-helpers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

async function fetchTransactions(): Promise<Transaction[]> {
  const res = await fetch(`${BASE_URL}/payments/list`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch transactions");
  const json = await res.json();
  return json.data ?? [];
}

async function fetchMerchants(): Promise<Merchant[]> {
  const res = await fetch(`${BASE_URL}/merchants/list`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch merchants");
  const json = await res.json();
  return json.data ?? [];
}

export async function fetchDashboardOverview(): Promise<DashboardOverview> {
  const [transactions, merchants] = await Promise.all([fetchTransactions(), fetchMerchants()]);

  return buildDashboardOverview(transactions, merchants);
}
