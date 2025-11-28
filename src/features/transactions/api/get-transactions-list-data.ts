import fetchTransactions from "@/shared/api/transactions";
import { TransactionRow } from "../types/transaction-types";
import fetchMerchants from "@/shared/api/merchants";
import { fetchPayMethodCodes } from "@/shared/api/payment-method";
import { fetchPayStatusCodes } from "@/shared/api/payment-status";
import { Merchant, PayMethodCode, PayStatusCode } from "@/types/domain-types";

export async function getTransactionsListData(): Promise<TransactionRow[]> {
  const [transactions, merchants, payMethodCodes, payStatusCodes] = await Promise.all([
    fetchTransactions(),
    fetchMerchants(),
    fetchPayMethodCodes(),
    fetchPayStatusCodes(),
  ]);

  // 1. 가맹점 매핑
  const merchantMap = new Map<string, Merchant>(merchants.map((m) => [m.mchtCode, m]));

  // 2. 결제 수단 코드 → 라벨 매핑
  const methodMap = new Map<string, PayMethodCode>(payMethodCodes.map((c) => [c.type, c]));

  // 3. 결제 상태 코드 → 라벨 매핑
  const statusMap = new Map<string, PayStatusCode>(payStatusCodes.map((c) => [c.code, c]));

  // 4. 데이터 형태 변환
  const rows: TransactionRow[] = transactions.map((tx) => {
    const merchant = merchantMap.get(tx.mchtCode);
    const method = methodMap.get(tx.payType);
    const status = statusMap.get(tx.status);

    const amountNumber = Number(tx.amount);
    const amountText = isNaN(amountNumber)
      ? `${tx.amount} ${tx.currency}`
      : amountNumber.toLocaleString("ko-KR", {
          style: "currency",
          currency: tx.currency || "KRW",
        });

    const dateTime = new Date(tx.paymentAt).toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Seoul",
    });

    return {
      id: tx.paymentCode,

      merchantName: merchant?.mchtName ?? "알 수 없는 가맹점",
      merchantCode: tx.mchtCode,

      amountText,

      methodCode: tx.payType,
      methodLabel: method?.description ?? tx.payType,

      statusCode: tx.status,
      statusLabel: status?.description ?? tx.status,

      dateTime,
      dateTimeRaw: tx.paymentAt,
    };
  });

  // 5. 최신순 내림차순 정렬
  return rows
    .slice()
    .sort(
      (a, b) =>
        new Date(b.dateTimeRaw || b.dateTime).getTime() -
        new Date(a.dateTimeRaw || a.dateTime).getTime(),
    );
}
