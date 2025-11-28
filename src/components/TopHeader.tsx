"use client";

import { ArrowRight, Bell, Menu, Search, User } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type TopHeaderProps = {
  onMenuClick?: () => void;
};

export function TopHeader({ onMenuClick }: TopHeaderProps) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const hasQuery = value.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    router.push(`/transactions/search?q=${encodeURIComponent(q)}`);
  };
  return (
    <header
      className="bg-background fixed top-0 right-0 left-0 z-20 flex h-16 items-center justify-between border-b px-4 shadow-xs lg:left-64 lg:px-8"
      aria-label="상단 헤더"
    >
      <div className="flex items-center gap-2 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
          aria-label="사이드바 열기"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      {/* 검색창 */}
      <form
        onSubmit={handleSubmit}
        className="bg-muted text-foreground focus-within:ring-ring/20 flex w-full max-w-lg flex-1 items-center rounded-xl px-3 py-2 text-sm transition-all focus-within:ring-2"
        role="search"
        aria-label="거래 검색"
      >
        <Search size={18} className="text-muted-foreground mr-2" />
        <Input
          type="text"
          placeholder="거래 ID, 가맹점명, 가맹점 ID 검색..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          ref={inputRef}
          aria-label="거래 검색어 입력"
          className="h-7 flex-1 border-none bg-transparent p-0 shadow-none ring-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {hasQuery && (
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground ml-1 h-7 w-7"
            aria-label="검색 실행"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </form>
      <div className="flex items-center gap-4">
        {/* 알림 버튼 + 팝오버 */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground rounded-full"
              aria-label="알림 보기"
            >
              <Bell className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="end" className="w-64 p-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">알림</span>
              <p className="text-muted-foreground text-xs">아직 알림이 없습니다.</p>
            </div>
          </PopoverContent>
        </Popover>

        {/* 계정 및 아바타 */}
        <div className="flex items-center gap-3">
          <Separator orientation="vertical" className="hidden h-8 sm:block" />
          <div className="hidden text-right sm:block">
            <p className="text-foreground text-sm font-semibold">올페이즈</p>
            <p className="text-muted-foreground text-xs">관리자</p>
          </div>
          <Avatar className="h-9 w-9 border border-lime-200 bg-lime-50">
            <AvatarFallback className="bg-lime-50 text-sm text-lime-800">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
