import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

type StatsCardProps = {
  label: string;
  value: string | number;
  subLabel?: string;
};

export function StatsCard({ label, value, subLabel }: StatsCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription className="text-xs">{label}</CardDescription>
        <CardTitle className="text-xl font-semibold">{value}</CardTitle>
      </CardHeader>
      {/* 
      {subLabel && (
        <CardContent className="">
          <span className="text-muted-foreground text-[11px]">{subLabel}</span>
        </CardContent>
      )} */}
    </Card>
  );
}
