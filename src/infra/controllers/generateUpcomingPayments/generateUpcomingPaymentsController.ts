import type { GenerateUpcomingPaymentsUseCase } from "~/app/useCases/generateUpcomingPayments/generateUpcomingPaymentsUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { upcomingPaymentsSchema } from "~/infra/schemas/internal/upcomingPayments";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class GenerateUpcomingPaymentsController {
  constructor(
    private generateUpcomingPaymentsUseCase: GenerateUpcomingPaymentsUseCase,
  ) {}

  async handle(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) throw HttpAdapter.unauthorized("Unauthorized");

    const { campaignId } = route.params;
    if (!campaignId) throw HttpAdapter.badRequest("campaignId is required");

    const body = await DecodeRequestBodyAdapter.decode(route.request);
    const schemaValidator = new SchemaValidatorAdapter(upcomingPaymentsSchema);
    const validatedBody = schemaValidator.validate(body);

    await this.generateUpcomingPaymentsUseCase.execute({
      accountReference: campaignId,
      subscriptionUuid: validatedBody.subscriptionUuid,
      startDate: validatedBody.startDate,
      endDate: validatedBody.endDate,
    });
  }
}

export { GenerateUpcomingPaymentsController };
