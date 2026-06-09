import type { UpdateInviteUseCase } from "~/app/useCases/invite/updateInviteUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { updateInviteSchema } from "~/infra/schemas/internal/collaborator";
import type { RouteDTO } from "~/main/types/route";

class UpdateInviteController {
  constructor(private updateInviteUseCase: UpdateInviteUseCase) {}

  async handle(route: RouteDTO) {
    const body = await DecodeRequestBodyAdapter.decode(route.request);

    const schemaValidator = new SchemaValidatorAdapter(updateInviteSchema);
    const validatedBody = schemaValidator.validate(body);

    return await this.updateInviteUseCase.execute(validatedBody);
  }
}

export { UpdateInviteController };
