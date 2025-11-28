"use client";

import { useState, type ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import { TopHeader } from "@/components/TopHeader";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-background min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main
        className="min-h-screen bg-stone-50 lg:ml-64"
        role="main"
        aria-label="대시보드 메인 콘텐츠"
      >
        <TopHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="px-4 py-8 pt-24 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
