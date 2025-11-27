import { PayMethodCode } from "@/types/type";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function fetchPayMethodCodes(): Promise<PayMethodCode[]> {
  const res = await fetch(`${BASE_URL}/common/paymemt-type/all`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch pay method codes");
  const json = await res.json();
  return json.data ?? [];
}
