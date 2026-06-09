import type { CreateMedicationUseCase } from "~/app/useCases/medication/createMedicationUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { createMedicationSchema } from "~/infra/schemas/internal/medication";
import type { RouteDTO } from "~/main/types/route";

class CreateMedicationController {
  constructor(private createMedicationUseCase: CreateMedicationUseCase) {}

  async handle(route: RouteDTO) {
    const body = await DecodeRequestBodyAdapter.decode(route.request);

    const treatmentId = route.params.treatmentId;

    if (!treatmentId) throw new Error("ID do tratamento não informado");

    const schemaValidator = new SchemaValidatorAdapter(createMedicationSchema);
    const validatedBody = schemaValidator.validate(body);

    return await this.createMedicationUseCase.execute(
      validatedBody,
      treatmentId,
    );
  }
}

export { CreateMedicationController };
