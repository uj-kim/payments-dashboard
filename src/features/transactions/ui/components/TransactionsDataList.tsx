"use client";

import * as React from "react";
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
import { useTransactionsListData } from "../../hooks/useTransactionsListData";
import type { TransactionRow } from "../../types/type";
import { StatusBadge } from "./StatusBadge";
import { filterTransactions } from "../../utils/filter-transactions";

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
  const { data, isLoading, error } = useTransactionsListData();
  const rows: TransactionRow[] = data ?? [];
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "dateTime", desc: true }]);
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });

  const filteredRows = React.useMemo(
    () => filterTransactions(rows, searchQuery),
    [rows, searchQuery],
  );

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
        {isLoading && <div className="py-6 text-sm text-stone-500">Loading...</div>}
        {error && (
          <div className="py-6 text-sm text-rose-500">
            거래 내역을 불러오는 중 오류가 발생했습니다.
          </div>
        )}
        {!isLoading && !error && (
          <>
            <div className="rounded-lg border">
              <Table>
                <TableHeader className="bg-muted">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="px-3 py-3 text-left">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
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
                      <TableCell colSpan={columns.length} className="h-24 text-center">
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
                  <SelectTrigger className="h-8 w-20">
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
