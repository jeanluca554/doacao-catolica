import type { UpdateCollaboratorUseCase } from "~/app/useCases/collaborator/updateCollaboratorUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { updateCollaboratorSchema } from "~/infra/schemas/internal/collaborator";
import type { RouteDTO } from "~/main/types/route";

class UpdateCollaboratorController {
  constructor(private updateCollaboratorUseCase: UpdateCollaboratorUseCase) {}

  async handle(route: RouteDTO) {
    const body = await DecodeRequestBodyAdapter.decode(route.request);

    const schemaValidator = new SchemaValidatorAdapter(
      updateCollaboratorSchema,
    );
    const validatedBody = schemaValidator.validate(body);

    return await this.updateCollaboratorUseCase.execute(validatedBody);
  }
}

export { UpdateCollaboratorController };
