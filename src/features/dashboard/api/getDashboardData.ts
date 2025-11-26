export type Transaction = {
  paymentCode: string;
  mchtCode: string;
  amount: string;
  currency: string;
  parType: "DEVICE" | "ONLINE" | "MOBILE" | "BILLING" | "VACT";
  status: "SUCCESS" | "FAILED" | "PENDING" | "CANCELED";
  paymentAt: string;
};

export type Merchant = {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
};

export type DashboardStats = {
  totalAmount: number;
  avgAmount: number;
  successRate: number;
  activeMerchantCount: number;
};

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

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const [transactions, merchants] = await Promise.all([fetchTransactions(), fetchMerchants()]);

  const totalAmount = transactions.reduce((sum, tx) => {
    const amount = Number(tx.amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const totalCount = transactions.length;
  const avgAmount = totalCount ? Math.round(totalAmount / totalCount) : 0;

  const successCount = transactions.filter((tx) => tx.status === "SUCCESS").length;

  const successRate = totalCount ? successCount / totalCount : 0;

  const activeMerchantCount = merchants.filter((m) => m.status === "ACTIVE").length;

  return {
    totalAmount,
    avgAmount,
    successRate,
    activeMerchantCount,
  };
}
