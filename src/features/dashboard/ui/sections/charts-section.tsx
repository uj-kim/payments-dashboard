"use client";

import { useDashboardOverview } from "../../hooks/useDashboardOverview";
import { AmountChart } from "../components/amout-chart";

export default function DashboardChartsSection() {
  const { data, isLoading, error } = useDashboardOverview();

  if (isLoading) {
    return (
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <div className="h-full rounded-lg border bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-5 w-32 animate-pulse rounded-md bg-gray-200" />
                <div className="h-4 w-40 animate-pulse rounded-md bg-gray-100" />
              </div>
              <div className="h-4 w-16 animate-pulse rounded-md bg-gray-100" />
            </div>
            <div className="h-80 animate-pulse rounded-md bg-gray-100" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-lg border p-4 text-sm text-red-500">
        차트 데이터를 불러오는 도중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <AmountChart data={data.amountsByDay} />
      </div>
    </section>
  );
}
