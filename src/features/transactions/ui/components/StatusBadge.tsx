import { Badge } from "@/components/ui/badge";

export function StatusBadge({ statusCode, label }: { statusCode: string; label: string }) {
  const code = statusCode.toUpperCase();
  if (code === "SUCCESS") return <Badge className="bg-emerald-100 text-emerald-700">{label}</Badge>;
  if (code === "FAILED") return <Badge className="bg-rose-100 text-rose-700">{label}</Badge>;
  if (code === "PENDING") return <Badge className="bg-amber-100 text-amber-700">{label}</Badge>;
  if (code === "CANCELED") return <Badge className="bg-stone-100 text-stone-700">{label}</Badge>;
  return <Badge variant="outline">{label}</Badge>;
}
