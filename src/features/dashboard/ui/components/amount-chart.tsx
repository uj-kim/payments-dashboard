"use client";

import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { DashboardAmountChart } from "../../types/dashboard";

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
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-1">
          <CardTitle>일별 거래 금액</CardTitle>
          <CardDescription>11월 1일 - 11월 10일</CardDescription>
        </div>
        <span className="text-muted-foreground text-xs whitespace-nowrap">단위: 천 원</span>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-80 md:h-[360px]">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ top: 8, right: 30, left: 10, bottom: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              interval="preserveStartEnd"
              padding={{ left: 0, right: 0 }}
              // "2025-11-01" -> "11/01"
              tickFormatter={(value: string) => value.slice(5).replace("-", "/")}
            />
            <YAxis
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
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
