"use client";

import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { DashboardAmountChart } from "../../types/dashboard-types";
import { useId } from "react";

type AmountChartProps = {
  data: DashboardAmountChart[];
};

function formatYAxisTick(value: number) {
  const scaled = value / 1_000;
  const formatted = Number.isInteger(scaled)
    ? scaled.toLocaleString("ko-KR")
    : scaled.toLocaleString("ko-KR", { maximumFractionDigits: 1 });
  return formatted;
}

const chartConfig = {
  totalAmount: {
    label: "거래금액",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function AmountChart({ data }: AmountChartProps) {
  const descriptionId = useId();
  const periodLabel = data.length
    ? `${data[0].date} - ${data[data.length - 1].date}`
    : "데이터 없음";
  const latestAmount = data.length ? data[data.length - 1].totalAmount : 0;
  const latestText =
    data.length > 0
      ? `${latestAmount.toLocaleString("ko-KR")}원 (가장 최근 값)`
      : "데이터가 없습니다.";

  return (
    <Card
      className="bg-white"
      aria-labelledby="amount-chart-title"
      aria-describedby={descriptionId}
    >
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="space-y-1">
          <CardTitle id="amount-chart-title">일별 거래 금액</CardTitle>
          <CardDescription>{periodLabel}</CardDescription>
          <p id={descriptionId} className="sr-only">
            기간 {periodLabel}, 최신 거래 금액 {latestText}
          </p>
        </div>
        <span className="text-muted-foreground text-xs whitespace-nowrap">단위: 천 원</span>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-64 w-full"
          role="img"
          aria-label={`일별 거래 금액 차트, 기간 ${periodLabel}, 최신 거래 금액 ${latestText}`}
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 4 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
              padding={{ left: 0, right: 0 }}
              tickFormatter={(value: string) => value.slice(5).replace("-", "/")}
            />
            <YAxis
              width={48}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatYAxisTick}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <defs>
              <linearGradient id="fillTotalAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-totalAmount)" stopOpacity={0.7} />
                <stop offset="95%" stopColor="var(--color-totalAmount)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              dataKey="totalAmount"
              type="natural"
              fill="url(#fillTotalAmount)"
              fillOpacity={0.4}
              stroke="var(--color-totalAmount)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
