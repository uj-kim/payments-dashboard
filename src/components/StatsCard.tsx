type StatsCardProps = {
  label: string;
  value: string | number;
  subLabel?: string;
};

export function StatsCard({ label, value, subLabel }: StatsCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xl font-semibold">{value}</span>
      {subLabel && <span className="text-[11px] text-gray-400">{subLabel}</span>}
    </div>
  );
}
