import { PaymentMetricsSearchParams } from "~/app/search/paymentMetricsSearchParams";
import type {
  PaymentMetricsData,
  PaymentMetricsGatewayDTO,
} from "~/domain/gateways/paymentMetrics";
import { getMonthDates } from "~/lib/getMonthDates";

type InputProps = {
  campaignPublicId: string;
};

class GetPaymentMetricsUseCase {
  constructor(private paymentMetricsGateway: PaymentMetricsGatewayDTO) {}

  async execute(input: InputProps): Promise<PaymentMetricsData> {
    const { campaignPublicId } = input;
    const { firstDayOfMonth, lastDayOfMonth } = getMonthDates(0);

    const searchParams = new PaymentMetricsSearchParams({
      filter: { start_date: firstDayOfMonth, end_date: lastDayOfMonth },
    });

    return this.paymentMetricsGateway.getPaymentMetrics(
      campaignPublicId,
      searchParams,
    );
  }
}

export { GetPaymentMetricsUseCase };
