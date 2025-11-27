"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/", label: "대시보드", icon: LayoutDashboard },
  { href: "/transactions", label: "전체 거래내역", icon: Receipt },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 flex w-64 flex-col border-r border-stone-800 bg-stone-900 text-stone-300">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-600 text-sm font-bold text-white"></div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">올페이즈</h1>
            <p className="mt-1 text-xs font-medium tracking-wider text-stone-500 uppercase">
              Gateway Admin
            </p>
          </div>
        </div>
      </div>

      <nav className="mt-4 flex-1 space-y-2 px-4">
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
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-stone-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-stone-400 transition-colors hover:bg-red-950/20 hover:text-red-400">
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
