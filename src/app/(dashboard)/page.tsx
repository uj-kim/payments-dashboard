import DashboardChartsSection from "@/features/dashboard/ui/sections/charts-section";
import DashboardKPISection from "@/features/dashboard/ui/sections/stats-section";
import RecentTransactions from "@/features/dashboard/ui/sections/recent-transactions";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* 상단 헤더 */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">대시보드</h1>
      </header>

      {/* KPI 카드 섹션 */}
      <DashboardKPISection />

      {/* 차트 섹션 */}
      <DashboardChartsSection />

      {/* 최근 거래내역 5건 */}
      <RecentTransactions />
    </div>
  );
}
