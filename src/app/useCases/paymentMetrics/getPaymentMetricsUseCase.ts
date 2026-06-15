import type {
  PaymentMetricsData,
  PaymentMetricsGatewayDTO,
} from "~/domain/gateways/paymentMetrics";

type InputProps = {
  subAccountId: string;
  token: string;
};

class GetPaymentMetricsUseCase {
  constructor(private paymentMetricsGateway: PaymentMetricsGatewayDTO) {}

  async execute(input: InputProps): Promise<PaymentMetricsData> {
    const { subAccountId, token } = input;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const startDate = new Date(year, month, 1).toISOString().slice(0, 10);
    const endDate = new Date(year, month + 1, 0).toISOString().slice(0, 10);

    return this.paymentMetricsGateway.getPaymentMetrics({
      subAccountId,
      startDate,
      endDate,
      token,
    });
  }
}

export { GetPaymentMetricsUseCase };
