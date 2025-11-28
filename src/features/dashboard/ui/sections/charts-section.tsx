"use client";

import { useDashboardOverview } from "../../hooks/useDashboardOverview";
import { AmountChart } from "../components/amount-chart";
import { VolumeChart } from "../components/volume-chart";
import { Button } from "@/components/ui/button";

export default function DashboardChartsSection() {
  const { data, isLoading, error, refetch } = useDashboardOverview();

  if (isLoading) {
    return (
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-7">
        <div className="lg:col-span-4 rounded-lg border bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-5 w-32 animate-pulse rounded-md bg-gray-200" />
              <div className="h-4 w-40 animate-pulse rounded-md bg-gray-100" />
            </div>
            <div className="h-4 w-16 animate-pulse rounded-md bg-gray-100" />
          </div>
          <div className="h-80 animate-pulse rounded-md bg-gray-100" />
        </div>
        <div className="lg:col-span-3 rounded-lg border bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-5 w-28 animate-pulse rounded-md bg-gray-200" />
              <div className="h-4 w-32 animate-pulse rounded-md bg-gray-100" />
            </div>
            <div className="h-4 w-14 animate-pulse rounded-md bg-gray-100" />
          </div>
          <div className="h-72 animate-pulse rounded-md bg-gray-100" />
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-lg border p-4 text-sm text-red-500">
        <div className="mb-2">차트 데이터를 불러오는 도중 오류가 발생했습니다.</div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            다시 시도
          </Button>
          <span>{(error as Error)?.message || "네트워크 상태를 확인해 주세요."}</span>
        </div>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-7">
    <div className="lg:col-span-4">
        <AmountChart data={data.amountsByDay} />
      </div>
      <div className="lg:col-span-3">
        <VolumeChart data={data.volumeByDay} />
      </div>
    </section>
  );
}
