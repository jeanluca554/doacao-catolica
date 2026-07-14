import type { UpcomingPaymentGatewayDTO } from "~/domain/gateways/upcomingPayment";

type GenerateUpcomingPaymentsInput = {
  accountReference: string;
  subscriptionUuid: string;
  startDate: string;
  endDate: string;
};

class GenerateUpcomingPaymentsUseCase {
  constructor(private upcomingPaymentGateway: UpcomingPaymentGatewayDTO) {}

  async execute(input: GenerateUpcomingPaymentsInput): Promise<void> {
    await this.upcomingPaymentGateway.generateUpcomingPayments({
      accountReference: input.accountReference,
      subscriptionUuid: input.subscriptionUuid,
      startDate: input.startDate,
      endDate: input.endDate,
    });
  }
}

export { GenerateUpcomingPaymentsUseCase, type GenerateUpcomingPaymentsInput };
