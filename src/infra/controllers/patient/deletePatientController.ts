import type { DeletePatientUseCase } from "~/app/useCases/patient/deletePatientUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { deletePatientSchema } from "~/infra/schemas/internal/patient";
import type { RouteDTO } from "~/main/types/route";

class DeletePatientController {
  constructor(private deletePatientUseCase: DeletePatientUseCase) {}

  async handle(route: RouteDTO) {
    const body = await DecodeRequestBodyAdapter.decode(route.request);

    const schemaValidator = new SchemaValidatorAdapter(deletePatientSchema);
    const validatedBody = schemaValidator.validate(body);

    return await this.deletePatientUseCase.execute(validatedBody);
  }
}

export { DeletePatientController };
