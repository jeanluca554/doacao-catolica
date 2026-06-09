import type { ChangeForgotPasswordUseCase } from "~/app/useCases/user/changeForgotPasswordUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { changeForgotPasswordSchema } from "~/infra/schemas/internal/user";
import type { RouteDTO } from "~/main/types/route";

class ChangeForgotPasswordController {
  constructor(
    private changeForgotPasswordUseCase: ChangeForgotPasswordUseCase,
  ) {}

  async handle(route: RouteDTO) {
    const body = await DecodeRequestBodyAdapter.decode(route.request);

    const schemaValidator = new SchemaValidatorAdapter(
      changeForgotPasswordSchema,
    );

    const data = schemaValidator.validate({ ...body, ...route.params });
    await this.changeForgotPasswordUseCase.execute(data);
  }
}

export { ChangeForgotPasswordController };
