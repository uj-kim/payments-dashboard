import { PayStatusCode } from "@/types/domain-types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function fetchPayStatusCodes(): Promise<PayStatusCode[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${BASE_URL}/common/payment-status/all`, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!res.ok)
      throw new Error(`Failed to fetch pay status codes: ${res.status} ${res.statusText}`);
    const json = await res.json();
    return json.data ?? [];
  } finally {
    clearTimeout(timeoutId);
  }
}
