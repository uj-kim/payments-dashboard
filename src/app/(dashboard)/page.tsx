import DashboardChartsSection from "@/features/dashboard/ui/sections/charts-section";
import DashboardKPISection from "@/features/dashboard/ui/sections/stats-section";
import RecentTransactions from "@/features/dashboard/ui/sections/recent-transactions";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* 상단 헤더 */}
      <header className="flex items-start justify-between" aria-labelledby="dashboard-title">
        <div>
          <h1 id="dashboard-title" className="text-2xl font-semibold">
            대시보드
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            결제 대시보드에서 거래 현황과 지표를 확인하세요.
          </p>
        </div>
      </header>

      {/* KPI 카드 섹션 */}
      <section aria-labelledby="kpi-section-title">
        <h2 id="kpi-section-title" className="sr-only">
          주요 지표
        </h2>
        <DashboardKPISection />
      </section>

      {/* 차트 섹션 */}
      <section aria-labelledby="chart-section-title">
        <h2 id="chart-section-title" className="sr-only">
          차트
        </h2>
        <DashboardChartsSection />
      </section>

      {/* 최근 거래내역 5건 */}
      <section aria-labelledby="recent-transactions-title">
        <h2 id="recent-transactions-title" className="sr-only">
          최근 거래 내역
        </h2>
        <RecentTransactions />
      </section>
    </div>
  );
}
