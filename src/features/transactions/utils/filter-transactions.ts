import type { TransactionRow } from "../types/transaction-types";

export function filterTransactions(rows: TransactionRow[], query: string): TransactionRow[] {
  const q = query.trim().toLowerCase();
  if (!q) return rows;

  return rows.filter((row) => {
    const id = row.id?.toLowerCase() ?? "";
    const merchantName = row.merchantName?.toLowerCase() ?? "";

    const merchantCode =
      (row as any).mchtCode?.toLowerCase?.() ?? (row as any).merchantCode?.toLowerCase?.() ?? "";

    return (
      id.includes(q) || // 트랜잭션 ID
      merchantName.includes(q) || // 가맹점명
      merchantCode.includes(q) // 가맹점 ID
    );
  });
}
