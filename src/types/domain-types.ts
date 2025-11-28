export type Transaction = {
  paymentCode: string;
  mchtCode: string;
  amount: string;
  currency: string;
  payType: "DEVICE" | "ONLINE" | "MOBILE" | "BILLING" | "VACT";
  status: "SUCCESS" | "FAILED" | "PENDING" | "CANCELED";
  paymentAt: string;
};

export type Merchant = {
  mchtCode: string;
  mchtName: string;
  status: string;
  bizType: string;
};

export type PayMethodCode = {
  type: string;
  description: string;
};

export type PayStatusCode = {
  code: string;
  description: string;
};
