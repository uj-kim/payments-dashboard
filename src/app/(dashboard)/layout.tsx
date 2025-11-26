import type { ReactNode } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* 사이드바 */}
      <aside className="flex w-60 flex-col gap-6 border-r px-4 py-6">
        <div className="text-lg font-semibold">PG Admin</div>

        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/" className="rounded border px-2 py-1">
            대시보드
          </Link>
          <Link href="/#" className="rounded border px-2 py-1">
            거래내역
          </Link>
          <Link href="/#" className="rounded border px-2 py-1">
            가맹점
          </Link>
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 px-6 py-6">{children}</main>
    </div>
  );
}
