import type { CreateInviteUseCase } from "~/app/useCases/invite/createInviteUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { createInviteSchema } from "~/infra/schemas/internal/collaborator";
import type { RouteDTO } from "~/main/types/route";

class CreateInviteController {
  constructor(private createInviteUseCase: CreateInviteUseCase) {}

  async handle(route: RouteDTO) {
    const body = await DecodeRequestBodyAdapter.decode(route.request);

    const schemaValidator = new SchemaValidatorAdapter(createInviteSchema);
    const validatedBody = schemaValidator.validate(body);

    return await this.createInviteUseCase.execute(validatedBody);
  }
}

export { CreateInviteController };
