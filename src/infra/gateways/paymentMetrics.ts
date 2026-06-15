import type {
  GetPaymentMetricsParams,
  PaymentMetricsData,
  PaymentMetricsGatewayDTO,
} from "~/domain/gateways/paymentMetrics";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { externalPaymentMetricsSchema } from "../schemas/external/paymentMetrics";

class PaymentMetricsGateway implements PaymentMetricsGatewayDTO {
  async getPaymentMetrics({
    subAccountId,
    startDate,
    endDate,
    token,
  }: GetPaymentMetricsParams): Promise<PaymentMetricsData> {
    const url = `/api/metrics/total-payments/${subAccountId}?start_date=${startDate}&end_date=${endDate}&per_page=20`;

    const apiResponse = await api.get(url, { token });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const schemaValidator = new SchemaValidatorAdapter(externalPaymentMetricsSchema);
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
