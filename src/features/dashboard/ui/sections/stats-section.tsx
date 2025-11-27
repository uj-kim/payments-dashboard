"use client";

import { StatsCard } from "@/components/stats-card";
import { useDashboardOverview } from "../../hooks/useDashboardOverview";

function formatCurrency(amount: number) {
  return amount.toLocaleString("ko-KR") + "원";
}

function formatPercent(rate: number) {
  // rate가 0~1 기준이면 *100, 0~100 기준이면 그대로 조정
  return (rate * 100).toFixed(1) + "%";
}

export default function DashboardKPISection() {
  const { data, isLoading, error } = useDashboardOverview();

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
        대시보드 통계를 불러오는 중 오류가 발생했습니다.
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
