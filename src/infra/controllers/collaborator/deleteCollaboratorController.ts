import type { DeleteCollaboratorUseCase } from "~/app/useCases/collaborator/deleteCollaboratorUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { deleteCollaboratorSchema } from "~/infra/schemas/internal/collaborator";
import type { RouteDTO } from "~/main/types/route";

class DeleteCollaboratorController {
  constructor(private deleteCollaboratorUseCase: DeleteCollaboratorUseCase) {}

  async handle(route: RouteDTO) {
    const body = await DecodeRequestBodyAdapter.decode(route.request);

    const schemaValidator = new SchemaValidatorAdapter(
      deleteCollaboratorSchema,
    );
    const validatedBody = schemaValidator.validate(body);

    return await this.deleteCollaboratorUseCase.execute(validatedBody);
  }
}

export { DeleteCollaboratorController };
