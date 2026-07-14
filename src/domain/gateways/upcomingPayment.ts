type GenerateUpcomingPaymentsInput = {
  accountReference: string;
  subscriptionUuid: string;
  startDate: string;
  endDate: string;
};

type UpcomingPaymentGatewayDTO = {
  generateUpcomingPayments(input: GenerateUpcomingPaymentsInput): Promise<void>;
};

export type { UpcomingPaymentGatewayDTO, GenerateUpcomingPaymentsInput };
