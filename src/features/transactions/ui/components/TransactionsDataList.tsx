"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactionsListData } from "../../hooks/use-transactions-list-data";
import type { TransactionRow } from "../../types/transaction-types";
import { StatusBadge } from "./StatusBadge";
import { filterTransactions } from "../../utils/filter-transactions";
import { useMemo, useState } from "react";

type TransactionsDataListProps = {
  searchQuery?: string;
};

const columns: ColumnDef<TransactionRow>[] = [
  {
    accessorKey: "id",
    header: "거래 ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs whitespace-nowrap">{row.original.id}</span>
    ),
  },
  {
    accessorKey: "merchantName",
    header: "가맹점",
    cell: ({ row }) => (
      <span className="font-medium whitespace-nowrap text-stone-800">
        {row.original.merchantName}
      </span>
    ),
  },
  {
    accessorKey: "methodLabel",
    header: "결제수단",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-stone-700">{row.original.methodLabel}</span>
    ),
  },
  {
    accessorKey: "dateTime",
    header: "거래일시",
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-stone-600">{row.original.dateTime}</span>
    ),
    sortingFn: (a, b) =>
      new Date(a.original.dateTimeRaw || a.original.dateTime).getTime() -
      new Date(b.original.dateTimeRaw || b.original.dateTime).getTime(),
  },
  {
    accessorKey: "amountText",
    header: "금액",
    cell: ({ row }) => (
      <div className="font-semibold whitespace-nowrap text-stone-900">
        {row.original.amountText}
      </div>
    ),
  },
  {
    id: "status",
    accessorKey: "statusLabel",
    header: "상태",
    cell: ({ row }) => (
      <div className="flex">
        <StatusBadge statusCode={row.original.statusCode} label={row.original.statusLabel} />
      </div>
    ),
  },
];

export function TransactionsDataList({ searchQuery = "" }: TransactionsDataListProps) {
  const { data, isLoading, error, refetch } = useTransactionsListData();
  const rows: TransactionRow[] = data ?? [];
  const [sorting, setSorting] = useState<SortingState>([{ id: "dateTime", desc: true }]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const filteredRows = useMemo(() => filterTransactions(rows, searchQuery), [rows, searchQuery]);

  const table = useReactTable({
    data: filteredRows,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id,
    manualPagination: false,
  });

  return (
    <Card className="rounded-2xl border-stone-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between px-6 py-4">
        <CardTitle className="text-lg font-semibold text-stone-900">거래 내역</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-4">
        {isLoading && (
          <div className="rounded-lg border">
            <Table aria-label="거래 내역 로딩 중">
              <TableHeader className="bg-muted">
                <TableRow>
                  {columns.map((col) => (
                    <TableHead key={col.id ?? "column"} className="px-3 py-3">
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
            <p>거래 내역을 불러오는 중 오류가 발생했습니다.</p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                다시 시도
              </Button>
              <span>{(error as Error)?.message || "네트워크 상태를 확인해 주세요."}</span>
            </div>
          </div>
        )}
        {!isLoading && !error && (
          <>
            <div className="rounded-lg border">
              <Table aria-label="거래 내역 표">
                <caption className="sr-only">
                  거래 ID, 가맹점, 결제수단, 거래일시, 금액, 상태를 포함한 거래 내역
                </caption>
                <TableHeader className="bg-muted">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        const sortState = header.column.getIsSorted();
                        const ariaSort =
                          sortState === "asc"
                            ? "ascending"
                            : sortState === "desc"
                              ? "descending"
                              : "none";
                        return (
                          <TableHead
                            key={header.id}
                            className="px-3 py-3 text-left"
                            aria-sort={ariaSort}
                            scope="col"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="px-3 py-3 text-left">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                        role="status"
                      >
                        데이터가 없습니다.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 flex flex-col gap-3 text-sm text-stone-600 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <span>Rows per page</span>
                <Select
                  value={`${pagination.pageSize}`}
                  onValueChange={(value) => {
                    const size = Number(value);
                    setPagination((prev) => ({ ...prev, pageSize: size, pageIndex: 0 }));
                  }}
                >
                  <SelectTrigger className="h-8 w-20" aria-label="페이지당 행 수 선택">
                    <SelectValue placeholder={pagination.pageSize} />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 50].map((size) => (
                      <SelectItem key={size} value={`${size}`}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 md:ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="이전 페이지"
                >
                  이전
                </Button>
                <span>
                  Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="다음 페이지"
                >
                  다음
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
