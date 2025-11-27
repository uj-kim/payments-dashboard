import { useQuery } from "@tanstack/react-query";
import { TransactionRow } from "../types/type";
import { getTransactionsListData } from "../api/getTransactionsListData";

export function useTransactionsListData() {
  return useQuery<TransactionRow[]>({
    queryKey: ["transactions", "table"],
    queryFn: getTransactionsListData,
  });
}
