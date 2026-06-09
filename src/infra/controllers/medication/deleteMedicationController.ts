import type { DeleteMedicationUseCase } from "~/app/useCases/medication/deleteMedicationUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { deleteMedicationSchema } from "~/infra/schemas/internal/medication";
import type { RouteDTO } from "~/main/types/route";

class DeleteMedicationController {
  constructor(private deleteMedicationUseCase: DeleteMedicationUseCase) {}

  async handle(route: RouteDTO) {
    const body = await DecodeRequestBodyAdapter.decode(route.request);

    const schemaValidator = new SchemaValidatorAdapter(deleteMedicationSchema);
    const validatedBody = schemaValidator.validate(body);

    return await this.deleteMedicationUseCase.execute(validatedBody);
  }
}

export { DeleteMedicationController };
