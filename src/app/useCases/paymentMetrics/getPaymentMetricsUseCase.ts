import { PaymentMetricsSearchParams } from "~/app/search/paymentMetricsSearchParams";
import type {
  PaymentMetricsData,
  PaymentMetricsGatewayDTO,
} from "~/domain/gateways/paymentMetrics";

type InputProps = {
  campaignPublicId: string;
};

class GetPaymentMetricsUseCase {
  constructor(private paymentMetricsGateway: PaymentMetricsGatewayDTO) {}

  async execute(input: InputProps): Promise<PaymentMetricsData> {
    const { campaignPublicId } = input;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const startDate = new Date(year, month, 1).toISOString().slice(0, 10);
    const endDate = new Date(year, month + 1, 0).toISOString().slice(0, 10);

    const searchParams = new PaymentMetricsSearchParams({
      filter: { start_date: startDate, end_date: endDate, per_page: 20 },
    });

    return this.paymentMetricsGateway.getPaymentMetrics(
      campaignPublicId,
      searchParams,
    );
  }
}

export { GetPaymentMetricsUseCase };
