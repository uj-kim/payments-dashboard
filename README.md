# 결제/가맹점 관련 데이터를 시각화하는 대시보드 화면 페이지 구현

결제 거래 현황을 빠르게 파악하기 위한 **관리자용 대시보드**입니다.  
Next.js, shadcn/ui, TanStack Query를 활용해 **KPI 카드, 거래 테이블, 차트 시각화, 검색 기능** 등을 제공합니다.  
API 데이터를 표준화하여 대시보드/거래 목록/검색 페이지에서 일관된 방식으로 가공·표시하도록 구성했습니다.

---

## 1. 프로젝트 개요

- **목적**: 결제 거래 데이터를 조회하고, 지표·트렌드·최근 거래를 한 화면에서 확인할 수 있는 관리자 대시보드 구축  
- **데이터 소스**:  
  - `/payments/list`  
  - `/merchants`  
  - `/codes/pay-method`  
  - `/codes/pay-status`  
  *(기반 URL: `NEXT_PUBLIC_API_BASE_URL`)*
- **라우팅 구조 (App Router)**  
  - `/` — 대시보드 홈  
  - `/transactions` — 거래 목록  
  - `/transactions/search` — 검색 결과 페이지  

---

## 2. 기술 스택 (Tech Stack)

- **Framework**: Next.js 16 (App Router, TypeScript)
- **UI**: Tailwind CSS 4, shadcn/ui, lucide-react
- **State/Data**: TanStack Query, TanStack Table
- **Chart**: Recharts + 커스텀 ChartContainer
- **Other**: ESLint, Prettier, TypeScript, pnpm

---

## 3. 폴더 구조 (Folder Structure)

```
src/
  app/
    (dashboard)/          # 대시보드 전용 레이아웃 및 페이지
      layout.tsx
      page.tsx
      transactions/
        page.tsx
        search/
          page.tsx
    globals.css
    providers.tsx         # TanStack Query Provider 설정
  components/             # 공용 UI (Sidebar, Header 등)
  features/
    dashboard/            # 대시보드 도메인: hooks, services, sections, charts
    transactions/         # 거래 목록 도메인: API, 테이블, 필터
  shared/api/             # API 호출 래퍼 (fetch wrapper, 공통 에러 처리)
  types/                  # 도메인 타입 정의
```

---

## 4. 실행 방법 (Getting Started)

### 1) 패키지 설치
```bash
pnpm install
```

### 2) 환경 변수 설정  
`.env` 파일 생성:

```
NEXT_PUBLIC_API_BASE_URL=https://recruit.paysbypays.com/api/v1
```

### 3) 개발 서버 실행
```bash
pnpm dev
```
→ http://localhost:3000

### 4) 기타 스크립트
```bash
pnpm lint
pnpm build
pnpm start
```

---

## 5. 구현 기능 (Requirements → Implementation Mapping)

### ✔ 대시보드 홈
- 총/평균 거래금액, 성공률, 활성 가맹점 **KPI 카드**
- 일자별 금액/거래수량 **차트(Area/Bar)**  
- 최근 거래 목록 5건
- 로딩 스켈레톤 & 에러 UI
- 관련 파일  
  - `src/app/(dashboard)/page.tsx`  
  - `features/dashboard/ui/sections/*`

### ✔ 거래 목록 테이블
- TanStack Table 기반 정렬/페이지네이션(10/20/30/50)
- 상태 배지·가맹점명 표준화 표시
- `<caption>` · `aria-sort` 적용으로 접근성 준수
- 관련 파일  
  - `src/features/transactions/ui/components/TransactionsDataList.tsx`

### ✔ 검색 & 필터
- 헤더 검색창에서 거래 ID/가맹점명/코드 검색
- `/transactions/search` 페이지에서 즉시 필터링
- 관련 파일  
  - `top-header.tsx`  
  - `filter-transactions.ts`

### ✔ 데이터 가공/병합
- 거래 + 가맹점 + 코드테이블 병합
- 통화/상태 text mapping, 정렬 기준 생성
- 파일  
  - `getTransactionsListData.ts`  
  - `dashboard-calculate-helpers.ts`

### ✔ 차트 컴포넌트
- Recharts 기반 Area/Bar Chart
- 커스텀 Tooltip, Tailwind 기반 디자인 토큰 적용
- 파일  
  - `amount-chart.tsx`  
  - `volume-chart.tsx`

### ✔ 에러/로딩 처리
- 글로벌 404 페이지(`not-found.tsx`)
- 섹션 단위 `refetch` 제공 → 페이지 전체 로딩 없이 복구 가능

---

## 6. 기술적 의사결정 (Technical Decisions)

### 🔹 TanStack Query 기반 데이터 관리
- Provider(`providers.tsx`)에 전역 캐싱·재시도 정책 설정  
- staleTime 관리로 API 호출 최적화  
- 페이지 간 데이터 일관성 유지

### 🔹 도메인 분리(features 구조)
- dashboard / transactions 도메인 단위로  
  API, hooks, services, UI를 완전히 분리  
- 유지보수 및 협업 효율 향상 기대

### 🔹 UX 중심 상태 처리
- Skeleton UI로 초기 로딩 플래시 최소화  
- 에러 발생 시 섹션 단위로만 재시도 가능  

### 🔹 접근성 준수
- `aria-sort` 적용  
- `<caption>` 포함 테이블 구조  
- 모노스페이스 폰트로 숫자/ID 가독성 향상  

### 🔹 ChartContainer 래퍼
- Tooltip/색상/반응형 설정을 중앙에서 관리  
- 일관된 Tailwind 기반 차트 스타일 적용

---

## 7. 스타일/디자인 문서 (기업 요구사항 적용)

### ✔ 사용한 템플릿/라이브러리
- **shadcn/ui**
- **Tailwind CSS**
- **Radix UI primitives**

**출처**  
- https://ui.shadcn.com  
- https://www.radix-ui.com  

### ✔ 그대로 사용한 부분
- Button / Card / Table / Badge 등 **구조적 컴포넌트**
- Radix UI 기반 접근성 구조 및 동작

### ✔ 커스터마이징한 부분
- `globals.css`에서 spacing, radius, 색상 토큰 재정의  
- Sidebar, Header, Stats Card 등은 **직접 Tailwind로 제작**  
- Table / Chart 컨테이너는 spacing, border, 타이포그래피 전면 재설계  
- 금융 대시보드 컨셉에 맞춰 색상·여백·밀도를 최적화

### ✔ 디자인 의도
- 안정적인 중성 컬러 기반의 금융 UI 디자인 채택  
- KPI → 차트 → 테이블 순의 자연스러운 정보 계층화  
- 빠른 의사결정을 위한 시각 밀도 조절 및 핵심 정보 강조  

---

## 8. 한계점 및 향후 개선 사항
- 날짜 범위, 상태, 결제수단 등 **추가 필터 기능** 필요  
- CSV 다운로드, 거래 상세 페이지 등 개선 여지  
- 차트 반응형/상호작용 강화 필요  
- Error Boundary 도입 필요  

---

## 9. 스크린샷 / Demo
로컬 개발 서버 실행 후 아래 주소에서 확인할 수 있습니다:

> http://localhost:3000
