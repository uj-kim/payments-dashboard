import type { ReactNode } from "react";
import type { Metadata } from "next";
import Sidebar from "@/components/sidebar";
import { TopHeader } from "@/components/top-header";

export const metadata: Metadata = {
  title: {
    template: "%s | PG Dashboard",
    default: "PG Dashboard",
  },
  description: "결제 대시보드에서 거래 현황과 지표를 확인하세요.",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      {/* 왼쪽: 사이드바(고정) */}
      <Sidebar />

      {/* 오른쪽 메인 콘텐츠 */}
      <main
        className="ml-64 min-h-screen bg-stone-50"
        role="main"
        aria-label="대시보드 메인 콘텐츠"
      >
        <TopHeader />
        <div className="px-8 py-8 pt-24">{children}</div>
      </main>
    </div>
  );
}
