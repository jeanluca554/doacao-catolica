import type { CreatePatientUseCase } from "~/app/useCases/patient/createPatientUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { createPatientSchema } from "~/infra/schemas/internal/patient";
import type { RouteDTO } from "~/main/types/route";

class CreatePatientController {
  constructor(private createPatientUseCase: CreatePatientUseCase) {}

  async handle(route: RouteDTO) {
    const body = await DecodeRequestBodyAdapter.decode(route.request);

    const workspaceId = route.params.workspaceId;

    if (!workspaceId) throw new Error("ID do workspace não informado");

    const schemaValidator = new SchemaValidatorAdapter(createPatientSchema);
    const validatedBody = schemaValidator.validate(body);

    return await this.createPatientUseCase.execute(validatedBody, workspaceId);
  }
}

export { CreatePatientController };
