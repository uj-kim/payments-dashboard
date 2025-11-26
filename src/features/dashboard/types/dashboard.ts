export type DashboardStats = {
  totalAmount: number;
  avgAmount: number;
  successRate: number;
  activeMerchantCount: number;
};

export type DashboardAmountChart = {
  date: string;
  totalAmount: number;
};

export type DashboardOverview = {
  stats: DashboardStats;
  amountsByDay: DashboardAmountChart[];
};
