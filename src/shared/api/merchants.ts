import { Merchant } from "@/types/domain-types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default async function fetchMerchants(): Promise<Merchant[]> {
  const res = await fetch(`${BASE_URL}/merchants/list`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch merchants");
  const json = await res.json();
  return json.data ?? [];
}
