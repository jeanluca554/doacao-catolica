import type { DeleteInviteUseCase } from "~/app/useCases/invite/deleteInviteUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { deleteInviteSchema } from "~/infra/schemas/internal/collaborator";
import type { RouteDTO } from "~/main/types/route";

class DeleteInviteController {
  constructor(private deleteInviteUseCase: DeleteInviteUseCase) {}

  async handle(route: RouteDTO) {
    const body = await DecodeRequestBodyAdapter.decode(route.request);

    const schemaValidator = new SchemaValidatorAdapter(deleteInviteSchema);
    const validatedBody = schemaValidator.validate(body);

    return await this.deleteInviteUseCase.execute(validatedBody);
  }
}

export { DeleteInviteController };
