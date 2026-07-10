import type { PaymentMethod } from "~/domain/entities/paymentMethod";
import type { PaymentMethodGatewayDTO } from "~/domain/gateways/paymentMethod";
import { environmentVariables } from "~/main/config/environmentVariables";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { donationApi } from "../http/donationApi";
import { PaymentMethodMapper } from "../mappers/paymentMethod";
import { externalPaymentMethodsSchema } from "../schemas/external/paymentMethod";

class PaymentMethodGateway implements PaymentMethodGatewayDTO {
  private get headers() {
    return { "api-key": environmentVariables.API_KEY_DONATION };
  }

  async list(campaignId: string): Promise<PaymentMethod[]> {
    const apiResponse = await donationApi.get(
      `/api/payment-methods/${campaignId}`,
      { headers: this.headers },
    );

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const validator = new SchemaValidatorAdapter(externalPaymentMethodsSchema);
    const data = validator.validate(apiResponse.response);

    return data.data.map(PaymentMethodMapper.toEntity);
  }

  async create(name: string, campaignId: string): Promise<void> {
    const apiResponse = await donationApi.post("/api/payment-methods", {
      body: { name, account_reference: campaignId },
      headers: this.headers,
    });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }

  async update(id: string, name: string, campaignId: string): Promise<void> {
    const apiResponse = await donationApi.put(
      `/api/payment-methods/${campaignId}/${id}`,
      { body: { name }, headers: this.headers },
    );

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }

  async delete(id: string, campaignId: string): Promise<void> {
    const apiResponse = await donationApi.delete(
      `/api/payment-methods/${campaignId}/${id}`,
      { headers: this.headers },
    );

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }
}

export { PaymentMethodGateway };
