"use client";

import { StatsCard } from "@/features/dashboard/ui/components/StatsCard";
import { Button } from "@/components/ui/button";
import { useDashboardOverview } from "../../hooks/use-dashboard-overview";

function formatCurrency(amount: number) {
  return amount.toLocaleString("ko-KR") + "원";
}

function formatPercent(rate: number) {
  // rate가 0~1 기준이면 *100, 0~100 기준이면 그대로 조정
  return (rate * 100).toFixed(1) + "%";
}

export default function DashboardKPISection() {
  const { data, isLoading, error, refetch } = useDashboardOverview();

  if (isLoading) {
    return (
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg border bg-gray-50 p-4" />
        ))}
      </section>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-lg border p-4 text-sm text-red-500">
        <div className="mb-2">대시보드 통계를 불러오는 중 오류가 발생했습니다.</div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            다시 시도
          </Button>
          <span>{(error as Error)?.message || "네트워크 상태를 확인해 주세요."}</span>
        </div>
      </div>
    );
  }

  const { totalAmount, avgAmount, successRate, activeMerchantCount } = data.stats;

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard label="총 거래 금액" value={formatCurrency(totalAmount)} />
      <StatsCard label="평균 거래 금액" value={formatCurrency(avgAmount)} />
      <StatsCard
        label="결제 성공률"
        value={formatPercent(successRate)}
        subLabel="status == 'SUCCESS' 기준"
      />
      <StatsCard label="활성 가맹점 수" value={activeMerchantCount} />
    </section>
  );
}
