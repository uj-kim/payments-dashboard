import { TransactionsDataList } from "@/features/transactions/ui/components/TransactionsDataList";

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-stone-900">전체 거래 내역</h1>
      </div>

      <TransactionsDataList />
    </div>
  );
}
