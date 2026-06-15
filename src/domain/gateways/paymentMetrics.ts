import type { PaymentMetricsSearchParams } from "~/app/search/paymentMetricsSearchParams";

type PaymentMetricsData = {
  receivedOnline: string;
  released: string;
  awaitingRelease: string;
  pending: string;
  receivedOffline: string;
  overdue: string;
  canceled: string;
  appliedFees: string;
};

type PaymentMetricsGatewayDTO = {
  getPaymentMetrics: (
    campaignPublicId: string,
    searchParams: PaymentMetricsSearchParams,
  ) => Promise<PaymentMetricsData>;
};

export type { PaymentMetricsGatewayDTO, PaymentMetricsData };
