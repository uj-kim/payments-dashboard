import type { ReactNode } from "react";
import type { Metadata } from "next";
import DashboardShell from "@/components/DashboardShell";

export const metadata: Metadata = {
  title: {
    template: "%s | PG Dashboard",
    default: "PG Dashboard",
  },
  description: "결제 대시보드에서 거래 현황과 지표를 확인하세요.",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
