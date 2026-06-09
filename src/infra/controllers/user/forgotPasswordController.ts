import type { ForgotPasswordUseCase } from "~/app/useCases/user/forgotPasswordUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { forgotPasswordSchema } from "~/infra/schemas/internal/user";
import type { RouteDTO } from "~/main/types/route";

class ForgotPasswordController {
  constructor(private forgotPasswordUseCase: ForgotPasswordUseCase) {}

  async handle(route: RouteDTO) {
    const body = await DecodeRequestBodyAdapter.decode(route.request);

    const schemaValidator = new SchemaValidatorAdapter(forgotPasswordSchema);
    const data = schemaValidator.validate(body);

    await this.forgotPasswordUseCase.execute(data);
  }
}

export { ForgotPasswordController };
