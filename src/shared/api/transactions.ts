import { Transaction } from "@/types/domain-types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default async function fetchTransactions(): Promise<Transaction[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${BASE_URL}/payments/list`, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Failed to fetch transactions: ${res.status} ${res.statusText}`);
    const json = await res.json();
    return json.data ?? [];
  } finally {
    clearTimeout(timeoutId);
  }
}
