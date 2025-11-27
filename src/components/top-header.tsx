"use client";

import { Bell, Search, User } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function TopHeader() {
  return (
    <header className="bg-background fixed top-0 right-0 left-64 z-20 flex h-16 items-center justify-between border-b px-8 shadow-xs">
      {/* 검색창 */}
      <div className="bg-muted text-foreground focus-within:ring-ring/20 flex w-full max-w-lg items-center rounded-xl px-3 py-2 text-sm transition-all focus-within:ring-2">
        <Search size={18} className="text-muted-foreground mr-2" />
        <Input
          type="text"
          placeholder="Search transactions, customers..."
          className="h-7 border-none bg-transparent p-0 shadow-none ring-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

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
