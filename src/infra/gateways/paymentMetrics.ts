import type { PaymentMetricsSearchParams } from "~/app/search/paymentMetricsSearchParams";
import type {
  PaymentMetricsData,
  PaymentMetricsGatewayDTO,
} from "~/domain/gateways/paymentMetrics";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { donationApi } from "../http/donationApi";
import { externalPaymentMetricsSchema } from "../schemas/external/paymentMetrics";
import { environmentVariables } from "~/main/config/environmentVariables";

class PaymentMetricsGateway implements PaymentMetricsGatewayDTO {
  async getPaymentMetrics(
    campaignPublicId: string,
    searchParams: PaymentMetricsSearchParams,
  ): Promise<PaymentMetricsData> {
    let url = `/api/metrics/total-payments/${campaignPublicId}`;
    url += searchParams.toExternal(["page", "pageLimit"]);

    const apiResponse = await donationApi.get(url, {
      headers: { "api-key": environmentVariables.API_KEY_DONATION },
    });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const schemaValidator = new SchemaValidatorAdapter(
      externalPaymentMetricsSchema,
    );
    const data = schemaValidator.validate(apiResponse.response.data);

    const fmt = (n: number) =>
      n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    const received = data.total_by_status.received;
    const confirmed = data.total_by_status.confirmed;
    const awaitingPayment = data.total_by_status.awaiting_payment;
    const manual = data.total_by_status.manual;
    const overdue = data.total_by_status.overdue;
    const canceled = data.total_by_status.canceled;

    return {
      receivedOnline: fmt(received.amount + confirmed.amount),
      released: fmt(received.amount),
      awaitingRelease: fmt(confirmed.amount),
      pending: fmt(awaitingPayment.amount + overdue.amount),
      receivedOffline: fmt(manual.amount),
      overdue: fmt(overdue.amount),
      canceled: fmt(canceled.amount),
      appliedFees: fmt(received.fee_amount + confirmed.fee_amount),
    };
  }
}

export { PaymentMetricsGateway };
