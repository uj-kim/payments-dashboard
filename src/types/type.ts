export type Transaction = {
  paymentCode: string;
  mchtCode: string;
  amount: string;
  currency: string;
  parType: "DEVICE" | "ONLINE" | "MOBILE" | "BILLING" | "VACT";
  status: "SUCCESS" | "FAILED" | "PENDING" | "CANCELED";
  paymentAt: string;
};

export type Merchant = {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
};
