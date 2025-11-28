"use client";

import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useTransactionsListData } from "@/features/transactions/hooks/use-transactions-list-data";
import type { TransactionRow } from "@/features/transactions/types/transaction-types";
import { StatusBadge } from "@/features/transactions/ui/components/StatusBadge";

export default function RecentTransactions() {
  const { data, isLoading, error, refetch } = useTransactionsListData();
  const rows: TransactionRow[] = data ?? [];
  const recent = rows.slice(0, 5);

  return (
    <Card className="rounded-2xl border-stone-200 shadow-sm">
      <CardHeader className="flex items-center justify-between px-6 pt-4 pb-2">
        <CardTitle className="text-lg font-semibold text-stone-900">최근 거래내역</CardTitle>
        <Link href="/transactions" className="text-primary text-sm hover:underline">
          전체 보기
        </Link>
      </CardHeader>
      <CardContent className="px-6 pt-0 pb-4">
        {isLoading && (
          <div className="rounded-lg border">
            <Table aria-label="최근 거래내역 로딩 중">
              <TableHeader className="bg-muted">
                <TableRow>
                  {["거래 ID", "가맹점", "결제수단", "거래일시", "금액", "상태"].map((label) => (
                    <TableHead key={label} className="px-3 py-3 text-left">
                      <div className="h-3 w-20 animate-pulse rounded bg-stone-200" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={idx}>
                    {["w-28", "w-32", "w-20", "w-24", "w-20", "w-16"].map((width, cellIdx) => (
                      <TableCell key={cellIdx} className="px-3 py-3">
                        <div className={`h-3 animate-pulse rounded bg-stone-200 ${width}`} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        {error && (
          <div className="flex flex-col gap-3 py-6 text-sm text-rose-600">
            <p>최근 거래내역을 불러오는 중 오류가 발생했습니다.</p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                다시 시도
              </Button>
              <span>{(error as Error)?.message || "네트워크 상태를 확인해 주세요."}</span>
            </div>
          </div>
        )}
        {!isLoading && !error && (
          <div className="rounded-lg border">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="px-3 py-3 text-left">거래 ID</TableHead>
                  <TableHead className="px-3 py-3 text-left">가맹점</TableHead>
                  <TableHead className="px-3 py-3 text-left">결제수단</TableHead>
                  <TableHead className="px-3 py-3 text-left">거래일시</TableHead>
                  <TableHead className="px-3 py-3 text-left">금액</TableHead>
                  <TableHead className="px-3 py-3 text-left">상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recent.length ? (
                  recent.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="px-3 py-3 font-mono text-xs whitespace-nowrap">
                        {row.id}
                      </TableCell>
                      <TableCell className="px-3 py-3 whitespace-nowrap">
                        {row.merchantName}
                      </TableCell>
                      <TableCell className="px-3 py-3 whitespace-nowrap">
                        {row.methodLabel}
                      </TableCell>
                      <TableCell className="px-3 py-3 whitespace-nowrap">{row.dateTime}</TableCell>
                      <TableCell className="px-3 py-3 whitespace-nowrap">
                        {row.amountText}
                      </TableCell>
                      <TableCell className="px-3 py-3">
                        <StatusBadge statusCode={row.statusCode} label={row.statusLabel} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      최근 데이터가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
