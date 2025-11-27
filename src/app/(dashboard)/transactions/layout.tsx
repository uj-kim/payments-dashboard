import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "거래 내역",
  description: "전체 거래 내역을 조회하고 검색합니다.",
};

export default function TransactionsLayout({ children }: { children: ReactNode }) {
  return children;
}
