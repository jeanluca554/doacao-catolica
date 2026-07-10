import type { CreateOneTimePaymentUseCase } from "~/app/useCases/createOneTimePayment/createOneTimePaymentUseCase";
import type { RegisterOfflinePaymentUseCase } from "~/app/useCases/createOneTimePayment/registerOfflinePaymentUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { oneTimePaymentSchema } from "~/infra/schemas/internal/oneTimePayment";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class CreateOneTimePaymentController {
  constructor(
    private createOneTimePaymentUseCase: CreateOneTimePaymentUseCase,
    private registerOfflinePaymentUseCase: RegisterOfflinePaymentUseCase,
  ) {}

  async handle(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) throw HttpAdapter.unauthorized("Unauthorized");

    const { campaignId } = route.params;
    if (!campaignId) throw HttpAdapter.badRequest("campaignId is required");

    const body = await DecodeRequestBodyAdapter.decode(route.request);
    const schemaValidator = new SchemaValidatorAdapter(oneTimePaymentSchema);
    const validatedBody = schemaValidator.validate(body);

    if (validatedBody.paymentOption === "onlinePayment") {
      // await this.createOneTimePaymentUseCase.execute({
      //   contactId: validatedBody.contactId,
      //   contactName: validatedBody.contactName,
      //   contactEmail: validatedBody.contactEmail,
      //   contactPhone: validatedBody.contactPhone,
      //   contactCpf: validatedBody.contactCpf,
      //   contactBirthDate: validatedBody.contactBirthDate,
      //   accountId: validatedBody.accountId,
      //   campaignId,
      //   category: validatedBody.category,
      //   token: user.token,
      //   paymentType: validatedBody.paymentType!,
      //   amount: validatedBody.amount!,
      //   description: validatedBody.description,
      // });
    } else {
      // await this.registerOfflinePaymentUseCase.execute({
      //   contactId: validatedBody.contactId,
      //   contactName: validatedBody.contactName,
      //   contactEmail: validatedBody.contactEmail,
      //   contactPhone: validatedBody.contactPhone,
      //   contactCpf: validatedBody.contactCpf,
      //   contactBirthDate: validatedBody.contactBirthDate,
      //   accountId: validatedBody.accountId,
      //   campaignId,
      //   category: validatedBody.category,
      //   token: user.token,
      //   amount: validatedBody.amount!,
      //   paymentDate: validatedBody.paymentDate,
      //   method: validatedBody.method!,
      //   bankAccount: validatedBody.bankAccount,
      //   observations: validatedBody.observations,
      // });
    }
  }
}

export { CreateOneTimePaymentController };
