"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt, LogOut, X } from "lucide-react";

import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/", label: "대시보드", icon: LayoutDashboard },
  { href: "/transactions", label: "전체 거래내역", icon: Receipt },
];

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const handleExit = () => {
    if (typeof window !== "undefined") {
      window.close();
      setTimeout(() => {
        if (!window.closed) {
          alert(
            "브라우저 설정으로 자동 종료가 막혀 있을 수 있습니다. 이 경우 탭을 직접 닫아주세요.",
          );
        }
      }, 200);
    }
  };

  const nav = (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-stone-800 bg-stone-900 text-stone-300 transition-transform duration-200",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0",
      )}
      aria-label="주요 내비게이션"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-600 text-sm font-bold text-white"></div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">올페이즈</h1>
              <p className="mt-1 text-xs font-medium tracking-wider text-stone-500 uppercase">
                Gateway Admin
              </p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-stone-400 hover:bg-stone-800 hover:text-stone-100 lg:hidden"
            onClick={onClose}
            aria-label="사이드바 닫기"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <nav className="mt-4 flex-1 space-y-2 px-4" aria-label="사이드바 메뉴">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "border border-lime-800/50 bg-lime-900/40 text-lime-400 shadow-sm"
                  : "hover:bg-stone-800 hover:text-stone-100",
              )}
              aria-current={isActive ? "page" : undefined}
              aria-label={`${item.label}${isActive ? " (현재 페이지)" : ""}`}
              onClick={onClose}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-stone-800 p-4">
        <button
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-stone-400 transition-colors hover:bg-red-950/20 hover:text-red-400"
          aria-label="페이지 종료"
          onClick={handleExit}
        >
          <LogOut size={20} />
          <span className="font-medium">페이지 종료</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:flex">{nav}</div>
      <div className="lg:hidden">
        {nav}
        {isOpen && (
          <div className="fixed inset-0 z-20 bg-black/50" aria-hidden="true" onClick={onClose} />
        )}
      </div>
    </>
  );
}
