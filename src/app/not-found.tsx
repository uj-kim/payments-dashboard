"use client";

import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="animate-in zoom-in-95 flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center duration-300">
      <div className="relative mb-8">
        <div className="absolute inset-0 scale-150 transform rounded-full bg-lime-200/50 opacity-50 blur-3xl" />

        <Card className="relative rounded-3xl border-stone-200 shadow-sm">
          <CardContent className="p-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-50">
              <AlertCircle size={32} className="text-lime-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="mb-2 text-sm font-bold tracking-wider text-lime-700 uppercase">Error 404</p>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
        Page not found
      </h1>
      <p className="mb-10 max-w-md leading-relaxed text-stone-500">
        페이지의 주소가 잘못 된 것 같아요.
        <br />
        입력하신 주소를 다시 한 번 확인해 주세요.
      </p>

      <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center justify-center gap-2 rounded-xl border-stone-300 px-6 py-3 text-stone-700 hover:bg-stone-50 hover:text-stone-900"
        >
          <ArrowLeft size={18} />
          <span>이전 페이지</span>
        </Button>

        <Button
          onClick={() => router.push("/")}
          className="flex items-center justify-center gap-2 rounded-xl bg-lime-700 px-6 py-3 text-white shadow-md hover:bg-lime-800 hover:shadow-lg"
        >
          <Home size={18} />
          <span>대시보드로 이동</span>
        </Button>
      </div>

      <div className="mt-16 w-full max-w-sm border-t border-stone-200 pt-8">
        <p className="text-xs text-stone-400">
          문제가 있다고 생각되시면, <span className="text-lime-700">올페이즈 지원팀</span>
          으로 문의해 주세요.
        </p>
      </div>
    </div>
  );
}
