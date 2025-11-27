"use client";

import { TransactionsDataList } from "@/features/transactions/ui/components/TransactionsDataList";
import { useSearchParams } from "next/navigation";

export default function TransactionsSearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-stone-900">거래 조회 결과</h1>
        <p className="text-sm text-stone-500">
          {q ? `"${q}" 검색 결과입니다.` : "전체 거래 내역을 확인할 수 있어요."}
        </p>
      </div>

      <TransactionsDataList searchQuery={q} />
    </div>
  );
}
