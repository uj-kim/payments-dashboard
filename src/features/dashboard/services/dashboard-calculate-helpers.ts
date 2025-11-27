import type { Transaction, Merchant } from "@/types/type";
import type {
  DashboardStats,
  DashboardAmountChart,
  DashboardVolumeChart,
  DashboardOverview,
} from "../types/dashboard";

export function calculateDashboardStats(
  transactions: Transaction[],
  merchants: Merchant[],
): DashboardStats {
  const totalAmount = transactions.reduce((sum, tx) => {
    const amount = Number(tx.amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const totalCount = transactions.length;
  const avgAmount = totalCount ? Math.round(totalAmount / totalCount) : 0;

  const successCount = transactions.filter((tx) => tx.status === "SUCCESS").length;
  const successRate = totalCount ? successCount / totalCount : 0;

  const activeMerchantCount = merchants.filter((m) => m.status === "ACTIVE").length;

  return { totalAmount, avgAmount, successRate, activeMerchantCount };
}

export function calculateAmountsByDay(transactions: Transaction[]): DashboardAmountChart[] {
  const baseDates: string[] = [];
  for (let day = 1; day <= 10; day++) {
    const d = `2025-11-${day.toString().padStart(2, "0")}`;
    baseDates.push(d);
  }

  const map = new Map<string, number>();
  baseDates.forEach((d) => map.set(d, 0));

  for (const tx of transactions) {
    const dateOnly = tx.paymentAt.slice(0, 10); // "2025-11-10"
    if (!map.has(dateOnly)) continue;

    const prev = map.get(dateOnly) ?? 0;
    const amount = Number(tx.amount);
    map.set(dateOnly, prev + (isNaN(amount) ? 0 : amount));
  }

  return baseDates.map((d) => ({
    date: d,
    totalAmount: map.get(d) ?? 0,
  }));
}

export function calculateVolumesByDay(transactions: Transaction[]): DashboardVolumeChart[] {
  const baseDates: string[] = [];
  for (let day = 1; day <= 10; day++) {
    const d = `2025-11-${day.toString().padStart(2, "0")}`;
    baseDates.push(d);
  }

  const map = new Map<string, number>();
  baseDates.forEach((d) => map.set(d, 0));

  for (const tx of transactions) {
    const dateOnly = tx.paymentAt.slice(0, 10);
    if (!map.has(dateOnly)) continue;

    const prev = map.get(dateOnly) ?? 0;
    map.set(dateOnly, prev + 1);
  }

  return baseDates.map((d) => ({
    date: d,
    count: map.get(d) ?? 0,
  }));
}

export function buildDashboardOverview(
  transactions: Transaction[],
  merchants: Merchant[],
): DashboardOverview {
  const stats = calculateDashboardStats(transactions, merchants);
  const amountsByDay = calculateAmountsByDay(transactions);
  const volumeByDay = calculateVolumesByDay(transactions);

  return { stats, amountsByDay, volumeByDay };
}
