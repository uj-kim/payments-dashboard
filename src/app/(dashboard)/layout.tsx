import type { ReactNode } from "react";
import Sidebar from "@/components/sidebar";
import { TopHeader } from "@/components/top-header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      {/* 왼쪽: 사이드바(고정) */}
      <Sidebar />

      {/* 오른쪽 메인 콘텐츠 */}
      <main className="ml-64 min-h-screen bg-stone-50">
        <TopHeader />
        <div className="px-8 py-8 pt-24">{children}</div>
      </main>
    </div>
  );
}
