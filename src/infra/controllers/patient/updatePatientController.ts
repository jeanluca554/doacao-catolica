import type { UpdatePatientUseCase } from "~/app/useCases/patient/updatePatientUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { updatePatientSchema } from "~/infra/schemas/internal/patient";
import type { RouteDTO } from "~/main/types/route";

class UpdatePatientController {
  constructor(private updatePatientUseCase: UpdatePatientUseCase) {}

  async handle(route: RouteDTO) {
    const body = await DecodeRequestBodyAdapter.decode(route.request);
    const workspaceId = route.params.workspaceId;

    const schemaValidator = new SchemaValidatorAdapter(updatePatientSchema);
    const validatedBody = schemaValidator.validate(body);

    return await this.updatePatientUseCase.execute(validatedBody, workspaceId);
  }
}

export { UpdatePatientController };
