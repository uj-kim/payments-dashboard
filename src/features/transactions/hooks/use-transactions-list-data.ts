import { useQuery } from "@tanstack/react-query";
import { TransactionRow } from "../types/transaction-types";
import { getTransactionsListData } from "../api/get-transactions-list-data";

export function useTransactionsListData() {
  return useQuery<TransactionRow[]>({
    queryKey: ["transactions", "table"],
    queryFn: getTransactionsListData,
  });
}
