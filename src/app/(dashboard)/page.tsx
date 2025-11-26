import DashboardChartsSection from "@/features/dashboard/ui/sections/charts-section";
import DashboardKPISection from "@/features/dashboard/ui/sections/stats-section";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* 상단 헤더 */}
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">PG 대시보드</h1>
      </header>

      {/* KPI 카드 섹션 */}
      <DashboardKPISection />

      {/* 기타 섹션 추가 예정 */}
      <DashboardChartsSection />
    </div>
  );
}
