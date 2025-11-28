"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { DashboardVolumeChart } from "../../types/dashboard-types";
import { useId } from "react";

type VolumeChartProps = {
  data: DashboardVolumeChart[];
};

const chartConfig = {
  count: {
    label: "거래량",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function VolumeChart({ data }: VolumeChartProps) {
  const descriptionId = useId();
  const periodLabel = data.length
    ? `${data[0].date} - ${data[data.length - 1].date}`
    : "데이터 없음";
  const latestCount = data.length ? data[data.length - 1].count : 0;
  const latestText =
    data.length > 0
      ? `${latestCount.toLocaleString("ko-KR")}건 (가장 최근 값)`
      : "데이터가 없습니다.";

  return (
    <Card
      className="bg-white"
      aria-labelledby="volume-chart-title"
      aria-describedby={descriptionId}
    >
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="space-y-1">
          <CardTitle id="volume-chart-title">일별 거래량</CardTitle>
          <CardDescription>{periodLabel}</CardDescription>
          <p id={descriptionId} className="sr-only">
            기간 {periodLabel}, 최신 거래량 {latestText}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-64 w-full"
          role="img"
          aria-label={`일별 거래량 차트, 기간 ${periodLabel}, 최신 거래량 ${latestText}`}
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 4 }}
            barCategoryGap={6}
            barGap={2}
            barSize={34}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              interval="preserveStartEnd"
              padding={{ left: 0, right: 0 }}
              tickFormatter={(value: string) => value.slice(5).replace("-", "/")}
            />
            <YAxis
              width={28}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals={false}
              domain={[0, (dataMax: number) => Math.max(dataMax + 1, 5)]}
              tickCount={6}
              tickFormatter={(value: number) => value.toLocaleString("ko-KR")}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-count)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
